import AdminLayoutHoc from '../Layout/AdminLayoutHoc';
import Link from 'next/link';
import Table from '../Table';
import Modal from '../Modal';
import Alert from '../Alert';
import SearchInput from '../SearchInput';
import { withRouter } from 'next/router';

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      block: {
        id: 0,
        name: '',
        reason_block: '',
      },
      search: '',
      total: 0,
      table: {
        pages: 0,
        loading: false,
        header: [
          {title: "#", size: "75px"},
          {title: "Profile", size: "150px"},
          {title: "Name", size: "auto"},
          {title: "Action", size: "200px"}
        ]
      },
      alert: {
        block_danger: '',
        block_success: '',
      }
    }

    this.onBlock = this.onBlock.bind(this)
    this.onChange = this.onChange.bind(this)
    this.queryName = this.queryName.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.submitBlock = this.submitBlock.bind(this)
  }

  onBlock (user) {
    const {block} = this.state
    block.id = user.id
    block.name = user.name

    this.setState({block})
  }

  onChange (event) {
    const {block} = this.state
    block[event.target.name] = event.target.value

    this.setState({block})
  }

  async queryName () {
    await Router.push({
      pathname: '/dashboard/admin/users/active',
      query: {
        page: 1,
        name: this.state.search
      }
    })
    this.onRefresh()
  }

  async onRefresh () {
    const table = this.state.table
    table.loading = true
    this.setState({ table })

    let {page, name} = this.props.router.query
    if (typeof page === "undefined") page = 1
    if (typeof name === "undefined") name = ""

    const response = await fetch(`http://127.0.0.1:8000/fact/user?page=${page}&name=${name}`)
    const json = await response.json()

    const data = json.results.users
    const total = json.results.total
    table.pages = json.results.pages
    table.loading = false

    this.setState({ data, table, total })
  }

  async submitBlock () {
    const alert = this.state.alert
    const body = JSON.stringify(this.state.block)
    const response = await fetch(`http://127.0.0.1:8000/fact/user/` + this.state.block.id, {method: 'DELETE', body})
    const json = await response.json()

    if (typeof json.message === 'undefined' || json.message !== 'Success') {
      alert.block_danger = "500 — Internal Server Error"
      await this.setState({alert})
    }
    else {
      alert.block_success = "Block User, " + this.state.block.name + " — Success"
      const block = {
        id: 0,
        name: '',
        reason_block: '',
      }

      await this.setState({alert, block})
      await this.onRefresh()
    }
  }

  componentDidMount () {
    this.onRefresh()
  }

  render() {
    const tbody = []
    for (let i = 0, l = this.state.data.length; i < l; i++) {
      const user = this.state.data[i];
      tbody.push(
        <tr key={user.id}>
          <td>{i + 1}</td>
          <td>
            <i className="fa fa-user-circle" style={{fontSize: "50px"}}/>
          </td>
          <td>{user.name}</td>
          <td>
            <Link href={`/dashboard/admin/users/active?status=view&id=${user.id}`}>
              <a className="btn btn-link">View</a>
            </Link>
            <button className="btn btn-link text-danger ml-3" data-toggle="modal" data-target="#block" onClick={() =>  this.onBlock(user)}>Delete</button>
          </td>
        </tr>
      )
    }

    return (
      <AdminLayoutHoc contentTitle={`Active Users (${this.state.total})`} contentBreadcrumb={["Home", "Users", "Active Users"]}>
        <Alert type="danger" component={this} attribute="block_danger"/>
        <Alert type="success" component={this} attribute="block_success"/>
        <div className="card">
          <div className="card-body">
            <div className="form-inline">
              <SearchInput placeholder="Search by name" onClick={this.queryName} value={this.state.search} onChange={(event) => this.setState({search: event.target.value})}/>
            </div>
          </div>
        </div>

        <Table table={this.state.table}>
          {tbody}
        </Table>

        <Modal id="block" title="Block User">
          <div className="modal-body">
            <p>Are you sure you want to block {this.state.block.name}?</p>
          </div>
          <div className="modal-footer">
            <div className="col-md-6">
              <button type="button" className="btn btn-light btn-block" data-dismiss="modal">No</button>
            </div>
            <div className="col-md-6">
              <button type="button" className="btn btn-danger btn-block" data-dismiss="modal" data-toggle="modal" data-target="#confirmation">Yes</button>
            </div>
          </div>
        </Modal>

        <Modal id="confirmation" title="Reason for blocking">
          <div className="modal-body">
            <textarea name="reason_block" value={this.state.block.reason_block} onChange={this.onChange} className="form-control" rows="3" />
          </div>
          <div className="modal-footer">
            <div className="col-md-6">
              <button type="button" className="btn btn-danger btn-block" data-dismiss="modal" onClick={this.submitBlock}>Save</button>
            </div>
            <div className="col-md-6">
              <button type="button" className="btn btn-light btn-block" data-dismiss="modal">No</button>
            </div>
          </div>
        </Modal>
      </AdminLayoutHoc>
    )
  }
}

export default withRouter(Index)

import AdminLayoutHoc from '../../../../components/Layout/AdminLayoutHoc';
import Link from 'next/link';
import Table from '../../../../components/Table';
import Modal from '../../../../components/Modal';
import Alert from '../../../../components/Alert';
import { withRouter } from 'next/router';

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      block: {
        id: 0,
        name: '',
        reason_block: 'none',
      },
      total: 0,
      table: {
        pages: 0,
        loading: false,
        header: [
          {title: "#", size: "75px"},
          {title: "Profile", size: "150px"},
          {title: "Name", size: "auto"},
          {title: "Reason", size: "auto"},
          {title: "Action", size: "200px"}
        ]
      },
      alert: {
        block_danger: '',
        block_success: '',
      }
    }

    this.onBlock = this.onBlock.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.submitBlock = this.submitBlock.bind(this)
  }

  onBlock (user) {
    const {block} = this.state
    block.id = user.id
    block.name = user.name

    this.setState({block})
  }

  async onRefresh () {
    const table = this.state.table
    table.loading = true
    this.setState({ table })

    let {page} = this.props.router.query
    if (typeof page === "undefined") page = 1

    const response = await fetch(`http://103.252.100.230:8000/fact/user?status=blocked&page=${page}`)
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
    const response = await fetch(`http://103.252.100.230:8000/fact/user/` + this.state.block.id, {method: 'DELETE', body})
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
        reason_block: 'unblock',
      }

      await this.setState({alert, block})
      await this.onRefresh()
    }
  }

  componentDidMount () {
    if (window.localStorage.getItem("role") !== "1")
      return window.location.href = "/"

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
          <td>{user.reason_block}</td>
          <td>
            <button className="btn btn-link text-danger" data-toggle="modal" data-target="#unblock" onClick={() =>  this.onBlock(user)}>Unblock</button>
          </td>
        </tr>
      )
    }

    return (
      <AdminLayoutHoc contentTitle={`Blocked Users (${this.state.total})`} contentBreadcrumb={["Home", "Users", "Blocked Users"]}>
        <Alert type="danger" component={this} attribute="block_danger"/>
        <Alert type="success" component={this} attribute="block_success"/>

        <Table table={this.state.table}>
          {tbody}
        </Table>

        <Modal id="unblock" title="Unblock User">
          <div className="modal-body">
            <p>Are you sure you want to unblock <b>{this.state.block.name}</b>?</p>
          </div>
          <div className="modal-footer">
            <div className="col-md-6">
              <button type="button" className="btn btn-danger btn-block" data-dismiss="modal" data-toggle="modal" onClick={this.submitBlock}>Yes</button>
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

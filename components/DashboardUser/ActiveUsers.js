import AdminLayoutHoc from '../Layout/AdminLayoutHoc';
import Link from 'next/link';
import Table from '../Table';
import Modal from '../Modal';
import Alert from '../Alert';
import SearchInput from '../SearchInput';
import Router, { withRouter } from 'next/router';
import '../../libraries'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      status: '',
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
          {title: "Status", size: "auto"},
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
    this.filterUser = this.filterUser.bind(this)
  }

  async filterUser (event) {
    await this.setState({ status: event.target.value })
    await this.onRefresh()
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

  async queryName (event) {
    event.preventDefault();

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

    const response = await fetch(`http://103.252.100.230/fact/user?page=${page}&name=${name}&status=${this.state.status}`)
    const json = await response.json()
    // console.log(response.json())

    const data = json.results.users
    const total = json.results.total
    table.pages = json.results.pages
    table.loading = false

    this.setState({ data, table, total })
  }

  async submitBlock () {
    const alert = this.state.alert
    const body = JSON.stringify(this.state.block)
    const response = await fetch(`http://103.252.100.230/fact/user/` + this.state.block.id, {method: 'DELETE', body})
    const json = await response.json()

    if (typeof json.message === 'undefined' || json.message !== 'Success') {
      window.scrollTo(0, 0)
      alert.block_danger = json.message
      await this.setState({alert})
    }
    else {
      window.scrollTo(0, 0)
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
            <span class={`profile-gender-${user.gender}-half`}/>
          </td>
          <td>{user.name}</td>
          <td>{user.status}</td>
          <td>
            <Link href={`/dashboard/admin/users/active?status=view&id=${user.id}`}>
              <a className="btn btn-link">View</a>
            </Link>
          </td>
        </tr>
      )
    }

    return (
      <AdminLayoutHoc contentTitle={`Active Users (${this.state.total})`} contentBreadcrumb={["Home", "Users", "Active Users"]}>
        <Alert type="danger" component={this} attribute="block_danger"/>
        <Alert type="success" component={this} attribute="block_success"/>
        <div className="card">
          <form className="card-body row" onSubmit={this.queryName}>
            <div className="col-md-2">
              <select class="form-control" name="status" onChange={this.filterUser}>
                <option value="">All Status</option>
                <option value="Underweight">Underweight</option>
                <option value="Normal">Normal</option>
                <option value="Overweight">Overweight</option>
                <option value="Class I Obesity">Class I Obesity</option>
                <option value="Class II Obesity">Class II Obesity</option>
                <option value="Class III Obesity">Class III Obesity</option>
              </select>
            </div>
            <div className="col-md-6">
              <div className="form-inline">
                <SearchInput placeholder="Search by name" value={this.state.search} onChange={(event) => this.setState({search: (event.target.value.validsearch()) ? event.target.value : this.state.search})}/>
              </div>
            </div>
          </form>
        </div>

        <Table table={this.state.table}>
          {tbody}
        </Table>
      </AdminLayoutHoc>
    )
  }
}

export default withRouter(Index)

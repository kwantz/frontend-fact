import AdminLayoutHoc from '../Layout/AdminLayoutHoc';
import Modal from '../Modal';
import Table from '../Table';
import SearchInput from '../SearchInput';
import Link from 'next/link';
import Router from 'next/router'
import Alert from '../Alert'
import { withRouter } from 'next/router';

class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: [],
      categories: [],
      total: 0,
      delete: {
        id: -1,
        name: '',
      },
      search: '',
      alert: {
        delete_danger: '',
        delete_success: ''
      },
      table: {
        pages: 0,
        loading: false,
        header: [
          {title: "#", size: "75px"},
          {title: "Name", size: "auto"},
          {title: "Category", size: "auto"},
          {title: "Total Calories (in Kcal)", size: "auto"},
          {title: "Action", size: "200px"}
        ]
      },
    }

    this.onDelete = this.onDelete.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.queryName = this.queryName.bind(this)
    this.deleteFood = this.deleteFood.bind(this)
    this.queryCategory = this.queryCategory.bind(this)
  }

  async onDelete () {
    const alert = this.state.alert
    const response = await fetch(`http://127.0.0.1:8000/fact/food/` + this.state.delete.id, {method: 'DELETE'})
    const json = await response.json()

    if (typeof json.message === 'undefined' || json.message !== 'Success') {
      alert.delete_danger = "500 — Internal Server Error"
      await this.setState({alert})
    }
    else {
      alert.delete_success = "Delete Food, " + this.state.delete.name + " — Success"
      const data = {
        id: -1,
        name: '',
      }
      await this.setState({delete: data, alert})
      this.onRefresh()
    }
  }

  deleteFood (food) {
    const data = this.state.delete
    data.id = food.id
    data.name = food.name

    this.setState({ delete: data })
  }

  async onRefresh () {
    let {page, name, category} = this.props.router.query
    if (typeof page === "undefined") page = 1
    if (typeof name === "undefined") name = ""
    if (typeof category === "undefined") category = 0

    const response = await fetch(`http://127.0.0.1:8000/fact/food?page=${page}&name=${name}&category=${category}`)
    const json = await response.json()

    const data = json.results.foods
    const total = json.results.total
    const categories = json.results.categories
    const table = this.state.table
    table.pages = json.results.pages
    table.loading = false

    this.setState({ data, table, total, categories })
  }

  async queryName () {
    await Router.push({
      pathname: '/dashboard/admin/food/lists',
      query: {
        page: 1,
        name: this.state.search
      }
    })
    this.onRefresh()
  }

  async queryCategory (event) {
    await Router.push({
      pathname: '/dashboard/admin/food/lists',
      query: {
        page: 1,
        category: event.target.value
      }
    })
    this.onRefresh()
  }

  componentDidMount () {
    const table = this.state.table
    table.loading = true

    this.setState({ table })
    this.onRefresh()
  }

  render () {
    const tbody = []
    const page = ((parseInt(this.props.router.query.page) || 1) - 1) * 30
    for (let i = 0, l = this.state.data.length; i < l; i++) {
      const food = this.state.data[i];
      tbody.push(
        <tr key={food.id}>
          <td>{page + i + 1}</td>
          <td>{food.name}</td>
          <td>{food.category}</td>
          <td>{food.calorie}</td>
          <td>
            <Link href={`/dashboard/admin/food/lists?status=view&id=${food.id}`}>
              <a className="btn btn-link">View</a>
            </Link>
            <button className="btn btn-link text-danger ml-3" data-toggle="modal" data-target="#delete" onClick={() =>  this.deleteFood(food)}>Delete</button>
          </td>
        </tr>
      )
    }

    const options = []
    options.push(<option value="0">All Category</option>)
    for (let i = 0, l = this.state.categories.length; i < l; i++) {
      const category = this.state.categories[i];
      options.push(<option value={category.id}>{category.name}</option>)
    }

    return (
      <AdminLayoutHoc contentTitle={`Food Lists (${this.state.total})`} contentBreadcrumb={["Home", "Food", "Food Lists"]}>
        <Alert type="danger" component={this} attribute="delete_danger"/>
        <Alert type="success" component={this} attribute="delete_success"/>
        <div className="card">
          <div className="card-body">
            <div className="form-inline">
              <div className="form-group mr-3">
                <select className="form-control" onChange={this.queryCategory} value={this.props.router.query.category}>
                  {options}
                </select>
              </div>
              <SearchInput placeholder="Search by name" onClick={this.queryName} value={this.state.search} onChange={(event) => this.setState({search: event.target.value})}/>
              <Link href="/dashboard/admin/food/lists?status=add">
                <a className="btn btn-info ml-auto">
                  <i className="fa fa-plus" /> Add Food
                </a>
              </Link>
            </div>
          </div>
        </div>

        <Table table={this.state.table} refresh={this.onRefresh}>
          {tbody}
        </Table>

        <Modal id="delete" title="Delete Food">
          <div className="modal-body">
            <span>Are you sure you want to delete <b>{this.state.delete.name}</b>?</span>
          </div>
          <div className="modal-footer">
            <div className="col-md-6">
              <button type="button" className="btn btn-light btn-block" data-dismiss="modal">No</button>
            </div>
            <div className="col-md-6">
              <button type="button" className="btn btn-danger btn-block" data-dismiss="modal" onClick={this.onDelete}>Yes</button>
            </div>
          </div>
        </Modal>
      </AdminLayoutHoc>
    )
  }
}

export default withRouter(Index)

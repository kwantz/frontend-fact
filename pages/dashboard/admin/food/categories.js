import AdminLayoutHoc from '../../../../components/Layout/AdminLayoutHoc';
import Table from "../../../../components/Table";
import Modal from "../../../../components/Modal";
import SearchInput from "../../../../components/SearchInput";
import Alert from "../../../../components/Alert";
import Router, { withRouter } from 'next/router';

class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: [],
      total: 0,
      search: '',
      add: '',
      edit: {
        id: -1,
        name: '',
      },
      delete: {
        id: -1,
        name: '',
      },
      table: {
        pages: 0,
        loading: false,
        header: [
          {title: "#", size: "75px"},
          {title: "Name", size: "auto"},
          {title: "Total Foods", size: "auto"},
          {title: "Action", size: "200px"}
        ]
      },
      alert: {
        add_danger: '',
        add_success: '',
        edit_danger: '',
        edit_success: '',
        delete_danger: '',
        delete_success: '',
      }
    }

    this.queryName = this.queryName.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.onSubmitAdd = this.onSubmitAdd.bind(this)
    this.onChangeAdd = this.onChangeAdd.bind(this)
    this.onSubmitEdit = this.onSubmitEdit.bind(this)
    this.onChangeEdit = this.onChangeEdit.bind(this)
    this.editCategory = this.editCategory.bind(this)
    this.onSubmitDelete = this.onSubmitDelete.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
  }

  async queryName() {
    await Router.push({
      pathname: '/dashboard/admin/food/categories',
      query: {
        page: 1,
        name: this.state.search
      }
    })
    this.onRefresh()
  }

  async onRefresh() {
    let {page, name} = this.props.router.query
    if (typeof page === "undefined") page = 1
    if (typeof name === "undefined") name = ""

    const response = await fetch(`http://103.252.100.230:8000/fact/food-category?page=${page}&name=${name}`)
    const json = await response.json()

    const data = json.results.categories
    const total = json.results.total
    const table = this.state.table
    table.pages = json.results.pages
    table.loading = false

    this.setState({ data, table, total })
  }

  onChangeAdd (event) {
    this.setState({add: event.target.value})
  }

  async onSubmitAdd () {
    let {add, alert} = this.state
    const body = JSON.stringify({name: add})

    const response = await fetch('http://103.252.100.230:8000/fact/food-category', {method: 'POST', body})
    const json = await response.json()

    if (typeof json.message === 'undefined' || json.message !== 'Success') {
      alert.add_danger = "500 — Internal Server Error"
      await this.setState({alert})
    }
    else {
      alert.add_success = "Add Category, " + add + " — Success"
      add = ''

      await this.setState({add, alert})
      this.onRefresh()
    }
  }

  onChangeEdit (event) {
    let {edit} = this.state
    edit[event.target.name] = event.target.value
    this.setState({ edit })
  }

  async onSubmitEdit () {
    let {edit, alert} = this.state
    const body = JSON.stringify(edit)

    const response = await fetch('http://103.252.100.230:8000/fact/food-category/' + edit.id, {method: 'PUT', body})
    const json = await response.json()

    if (typeof json.message === 'undefined' || json.message !== 'Success') {
      alert.edit_danger = "500 — Internal Server Error"
      await this.setState({alert})
    }
    else {
      alert.edit_success = "Edit Category, " + edit.name + " — Success"
      await this.setState({alert})
      this.onRefresh()
    }
  }

  editCategory (category) {
    let {edit} = this.state
    edit.id = category.id
    edit.name = category.name
    this.setState({edit})
  }

  async onSubmitDelete () {
    let {alert} = this.state
    const body = JSON.stringify(this.state.delete)

    const response = await fetch('http://103.252.100.230:8000/fact/food-category/' + this.state.delete.id, {method: 'DELETE', body})
    const json = await response.json()

    if (typeof json.message === 'undefined' || json.message !== 'Success') {
      window.scrollTo(0, 0)
      alert.delete_danger = "500 — Internal Server Error"
      await this.setState({alert})
    }
    else {
      window.scrollTo(0, 0)
      alert.delete_success = "Delete Category, " + this.state.delete.name + " — Success"
      await this.setState({alert})
      this.onRefresh()
    }
  }

  deleteCategory (category) {
    let data = this.state.delete
    data.id = category.id
    data.name = category.name
    this.setState({delete: data})
  }

  componentDidMount () {
    if (window.localStorage.getItem("role") !== "1")
      return window.location.href = "/"

    const table = this.state.table
    table.loading = true

    this.setState({ table })
    this.onRefresh()
  }

  render () {
    const tbody = []
    for (let i = 0, l = this.state.data.length; i < l; i++) {
      const category = this.state.data[i];
      tbody.push(
        <tr key={category.id}>
          <td>{i + 1}</td>
          <td>{category.name}</td>
          <td>{category.total_foods}</td>
          <td>
            <button className="btn btn-link" data-toggle="modal" data-target="#edit" onClick={() => this.editCategory(category)}>Edit</button>
            <button className="btn btn-link text-danger ml-3" data-toggle="modal" data-target="#delete" onClick={() => this.deleteCategory(category)}>Delete</button>
          </td>
        </tr>
      )
    }

    return (
      <AdminLayoutHoc contentTitle={`Categories (${this.state.total})`} contentBreadcrumb={["Home", "Food", "Categories"]}>
        <Alert type="danger"component={this} attribute="delete_danger"/>
        <Alert type="success"component={this} attribute="delete_success"/>
        <div className="card">
          <div className="card-body">
            <form className="form-inline">
              <SearchInput placeholder="Search by name" onClick={this.queryName} value={this.state.search} onChange={(event) => this.setState({search: event.target.value})}/>
              <button type="button" className="btn btn-info ml-auto" data-toggle="modal" data-target="#add">
                <i className="fa fa-plus" /> Add Category
              </button>
            </form>
          </div>
        </div>

        <Table table={this.state.table}>
          {tbody}
        </Table>

        <Modal id="add" title="Add Category">
          <Alert type="danger"component={this} attribute="add_danger"/>
          <Alert type="success"component={this} attribute="add_success"/>
          <div className="modal-body">
            <div className="form-group">
              <label>Category Name</label>
              <input type="text" className="form-control" placeholder="Enter Category Name" value={this.state.add} onChange={this.onChangeAdd}/>
            </div>
          </div>
          <div className="modal-footer">
            <div className="col-md-6">
              <button type="button" className="btn btn-info btn-block" onClick={this.onSubmitAdd}>Save</button>
            </div>
            <div className="col-md-6">
              <button type="button" className="btn btn-light btn-block" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </Modal>

        <Modal id="edit" title="Edit Category">
          <Alert type="danger"component={this} attribute="edit_danger"/>
          <Alert type="success"component={this} attribute="edit_success"/>
          <div className="modal-body">
            <div className="form-group">
              <label>Category Name</label>
              <input type="text" name="name" className="form-control" placeholder="Enter Category Name" value={this.state.edit.name} onChange={this.onChangeEdit}/>
            </div>
          </div>
          <div className="modal-footer">
            <div className="col-md-6">
              <button type="button" className="btn btn-info btn-block" onClick={this.onSubmitEdit}>Save</button>
            </div>
            <div className="col-md-6">
              <button type="button" className="btn btn-light btn-block" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </Modal>

        <Modal id="delete" title="Delete Category">
          <div className="modal-body">
            <span>Deleting <b>{this.state.delete.name}</b> will delete all the links with food. Are you sure?</span>
          </div>
          <div className="modal-footer">
            <div className="col-md-6">
              <button type="button" className="btn btn-light btn-block" data-dismiss="modal">No</button>
            </div>
            <div className="col-md-6">
              <button type="button" className="btn btn-danger btn-block" data-dismiss="modal" onClick={this.onSubmitDelete}>Yes</button>
            </div>
          </div>
        </Modal>
      </AdminLayoutHoc>
    )
  }
}

export default withRouter(Index)

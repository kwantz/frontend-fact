import AdminLayoutHoc from '../../../components/Layout/AdminLayoutHoc';
import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import Alert from '../../../components/Alert';
import SearchInput from "../../../components/SearchInput";
import Router, { withRouter } from 'next/router';

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      search: '',
      add: {
        name: '',
        met: '',
      },
      edit: {
        id: '',
        name: '',
        met: ''
      },
      delete: {
        id: '',
        name: ''
      },
      total: 0,
      table: {
        pages: 0,
        loading: false,
        header: [
          {title: "#", size: "75px"},
          {title: "Name", size: "auto"},
          {title: "Total Calorie Burnt(in kcal/kg hour)", size: "auto"},
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

    this.onEdit = this.onEdit.bind(this)
    this.onChangeEdit = this.onChangeEdit.bind(this)
    this.onSubmitEdit = this.onSubmitEdit.bind(this)

    this.onDelete = this.onDelete.bind(this)
    this.onSubmitDelete = this.onSubmitDelete.bind(this)

    this.queryName = this.queryName.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.onChangeAdd = this.onChangeAdd.bind(this)
    this.onSubmitAdd = this.onSubmitAdd.bind(this)
  }

  async queryName() {
    await Router.push({
      pathname: '/dashboard/admin/activities',
      query: {
        page: 1,
        name: this.state.search
      }
    })
    this.onRefresh()
  }

  onEdit (activity) {
    const edit = this.state.edit
    edit.id = activity.id
    edit.met = activity.met
    edit.name = activity.name
    this.setState({edit})
  }

  onChangeEdit (event) {
    const edit = this.state.edit
    edit[event.target.name] = event.target.value
    this.setState({edit})
  }

  async onSubmitEdit () {
    const {alert, edit} = this.state
    const body = JSON.stringify(this.state.edit)
    const response = await fetch('http://127.0.0.1:8000/fact/activity/' + edit.id, {method: 'PUT', body})
    const json = await response.json()

    if (typeof json.message === 'undefined' || json.message !== 'Success') {
      alert.edit_danger = "500 — Internal Server Error"
      await this.setState({alert})
    }
    else {
      alert.edit_success = "Edit Activity, " + edit.name + " — Success"
      await this.setState({alert})
      this.onRefresh()
    }
  }

  onDelete (activity) {
    const data = this.state.delete
    data.id = activity.id
    data.name = activity.name
    this.setState({delete: data})
  }

  async onSubmitDelete () {
    const response = await fetch('http://127.0.0.1:8000/fact/activity/' + this.state.delete.id, {method: 'DELETE'})
    const json = await response.json()

    if (typeof json.message === 'undefined' || json.message !== 'Success') {
      alert.delete_danger = "500 — Internal Server Error"
      await this.setState({alert})
    }
    else {
      alert.delete_success = "Delete Activity, " + this.state.delete.name + " — Success"
      await this.setState({alert})
      this.onRefresh()
    }
  }

  async onSubmitAdd () {
    const alert = this.state.alert
    const add = this.state.add
    const body = JSON.stringify(this.state.add)
    const response = await fetch('http://127.0.0.1:8000/fact/activity', {method: 'POST', body})
    const json = await response.json()

    if (typeof json.message === 'undefined' || json.message !== 'Success') {
      alert.add_danger = "500 — Internal Server Error"
      await this.setState({alert})
    }
    else {
      alert.add_success = "Add Activity, " + add.name + " — Success"
      add.name = ''
      add.met = ''

      await this.setState({add, alert})
      this.onRefresh()
    }
  }

  onChangeAdd (event) {
    const add = this.state.add
    add[event.target.name] = event.target.value
    this.setState({ add })
  }

  async onRefresh () {
    let {page, name} = this.props.router.query
    if (typeof page === "undefined") page = 1
    if (typeof name === "undefined") name = ""

    const response = await fetch(`http://127.0.0.1:8000/fact/activity?page=${page}&name=${name}`)
    const json = await response.json()

    const data = json.results.activities
    const total = json.results.total
    const table = this.state.table
    table.pages = json.results.pages
    table.loading = false

    this.setState({ data, table, total })
  }

  componentDidMount () {
    if (window.localStorage.getItem("role") !== "1")
      return window.location.href = "/"

    const table = this.state.table
    table.loading = true

    this.setState({ table })
    this.onRefresh()
  }

  render() {
    const tbody = []
    for (let i = 0, l = this.state.data.length; i < l; i++) {
      const activity = this.state.data[i];
      tbody.push(
        <tr key={activity.id}>
          <td>{i + 1}</td>
          <td>{activity.name}</td>
          <td>{activity.met}</td>
          <td>
            <button className="btn btn-link" data-toggle="modal" data-target="#edit" onClick={() => this.onEdit(activity)}>Edit</button>
            <button className="btn btn-link text-danger ml-3" data-toggle="modal" data-target="#delete" onClick={() => this.onDelete(activity)}>Delete</button>
          </td>
        </tr>
      )
    }

    return (
      <AdminLayoutHoc contentTitle={`Activities (${this.state.total})`} contentBreadcrumb={["Home", "Activities"]}>
        <Alert type="danger"component={this} attribute="delete_danger"/>
        <Alert type="success"component={this} attribute="delete_success"/>
        <div className="card">
          <div className="card-body">
            <form className="form-inline">
              <SearchInput placeholder="Search by name" onClick={this.queryName} value={this.state.search} onChange={(event) => this.setState({search: event.target.value})}/>
              <button type="button" className="btn btn-info ml-auto" data-toggle="modal" data-target="#add">
                <i className="fa fa-plus" /> Add Activity
              </button>
            </form>
          </div>
        </div>

        <Table table={this.state.table}>
          {tbody}
        </Table>

        <Modal id="add" title="Add Activity">
          <Alert type="danger"component={this} attribute="add_danger"/>
          <Alert type="success"component={this} attribute="add_success"/>
          <div className="modal-body">
            <div className="form-group">
              <label>Activity Name</label>
              <input type="text" name="name" onChange={this.onChangeAdd}className="form-control" placeholder="Enter Activity Name"/>
            </div>
            <div className="form-group">
              <label>Calorie Burnt (in kcal/kg hour)</label>
              <input type="number" name="met" onChange={this.onChangeAdd}className="form-control" placeholder="Enter amount of calories"/>
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

        <Modal id="edit" title="Edit Activity">
          <Alert type="danger"component={this} attribute="edit_danger"/>
          <Alert type="success"component={this} attribute="edit_success"/>
          <div className="modal-body">
            <div className="form-group">
              <label>Activity Name</label>
              <input type="text" name="name" className="form-control" placeholder="Enter Activity Name" onChange={this.onChangeEdit} value={this.state.edit.name}/>
            </div>
            <div className="form-group">
              <label>Calorie Burnt (in kcal/kg hour)</label>
              <input type="number" name="met" className="form-control" placeholder="Enter amount of calories" onChange={this.onChangeEdit} value={this.state.edit.met}/>
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

        <Modal id="delete" title="Delete Activity">
          <div className="modal-body">
            <span>
              Are you sure you want to delete <b>{this.state.delete.name}</b>?
            </span>
          </div>
          <div className="modal-footer">
            <div className="col-md-6">
              <button type="button" className="btn btn-light btn-block" data-dismiss="modal">No</button>
            </div>
            <div className="col-md-6">
              <button type="button" className="btn btn-danger btn-block" onClick={this.onSubmitDelete} data-dismiss="modal">Yes</button>
            </div>
          </div>
        </Modal>
      </AdminLayoutHoc>
    )
  }
}

export default withRouter(Index)

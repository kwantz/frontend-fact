import AdminLayoutHoc from '../../../components/Layout/AdminLayoutHoc';
import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import Alert from '../../../components/Alert';

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
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
      }
    }

    this.onEdit = this.onEdit.bind(this)
    this.onChangeEdit = this.onChangeEdit.bind(this)
    this.onSubmitEdit = this.onSubmitEdit.bind(this)

    this.onDelete = this.onDelete.bind(this)

    this.onRefresh = this.onRefresh.bind(this)
    this.onChangeAdd = this.onChangeAdd.bind(this)
    this.onSubmitAdd = this.onSubmitAdd.bind(this)
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
    const alert = this.state.alert
    const edit = this.state.edit
    console.log(this.state.edit)
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
    this.data = this.state.delete
    data.id = activity.id
    data.name = activity.name
    this.setState({delete: data})
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
    const response = await fetch('http://127.0.0.1:8000/fact/activity')
    const json = await response.json()

    const data = json.results.activities
    const total = json.results.total
    const table = this.state.table
    table.pages = json.results.pages
    table.loading = false

    this.setState({ data, table, total })
  }

  componentDidMount () {
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
        <div className="card">
          <div className="card-body">
            <form className="form-inline">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-search"/>
                  </span>
                </div>
                <input type="text" className="form-control bl-0" placeholder="Search by name"/>
                <div className="input-group-append">
                  <button type="submit" className="btn btn-info">Submit</button>
                </div>
              </div>
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

        <div className="modal animate fade" id="testing3">
          <div className="modal-dialog a-zoom modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Activity</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <span>
                    Are you sure you want to delete Activity A?
                  </span>
                </form>
              </div>
              <div className="modal-footer">
                <div className="col-md-6">
                  <button type="button" className="btn btn-light btn-block" data-dismiss="modal">No</button>
                </div>
                <div className="col-md-6">
                  <button type="button" className="btn btn-danger btn-block" >Yes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayoutHoc>
    )
  }
}

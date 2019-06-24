import AdminLayoutHoc from '../../../../components/Layout/AdminLayoutHoc';
import Modal from '../../../../components/Modal';
import Table from '../../../../components/Table';
import Alert from '../../../../components/Alert';

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      total: 0,
      add: {
        desc: '',
        author: ''
      },
      edit: {
        id: -1,
        desc: '',
        author: '',
      },
      delete: {
        id: -1,
        desc: '',
      },
      table: {
        pages: 0,
        loading: false,
        header: [
          {title: "#", size: "75px"},
          {title: "Quotes", size: "auto"},
          {title: "Author", size: "auto"},
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

    this.onRefresh = this.onRefresh.bind(this)
    this.onChangeAdd = this.onChangeAdd.bind(this)
    this.onSubmitAdd = this.onSubmitAdd.bind(this)
    this.editQuote = this.editQuote.bind(this)
    this.onChangeEdit = this.onChangeEdit.bind(this)
    this.onSubmitEdit = this.onSubmitEdit.bind(this)
    this.deleteQuote = this.deleteQuote.bind(this)
    this.onSubmitDelete = this.onSubmitDelete.bind(this)
  }

  async onRefresh() {
    const table = this.state.table
    table.loading = true
    await this.setState({ table })

    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    const response = await fetch('http://103.252.100.230:8000/fact/quote', {headers})
    const json = await response.json()

    const data = json.results.quotes
    const total = json.results.total
    table.pages = json.results.pages
    table.loading = false

    this.setState({ data, table, total })
  }

  onChangeAdd (event) {
    const add = this.state.add
    add[event.target.name] = event.target.value
    this.setState({add})
  }

  async onSubmitAdd () {
    let {add, alert} = this.state
    const body = JSON.stringify(add)

    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    const response = await fetch('http://103.252.100.230:8000/fact/quote', {method: 'POST', body, headers})
    const json = await response.json()

    if (typeof json.message === 'undefined' || json.message !== 'Success') {
      alert.add_danger = "500 — Internal Server Error"
      await this.setState({alert})
    }
    else {
      alert.add_success = "Add Category, " + add.desc + " — Success"
      add = {
        desc: '',
        author: ''
      }

      await this.setState({add, alert})
      this.onRefresh()
    }
  }

  editQuote (quote) {
    let {edit} = this.state
    edit.id = quote.id
    edit.desc = quote.desc
    edit.author = quote.author
    this.setState({edit})
  }

  onChangeEdit (event) {
    const edit = this.state.edit
    edit[event.target.name] = event.target.value
    this.setState({edit})
  }

  async onSubmitEdit () {
    let {edit, alert} = this.state
    const body = JSON.stringify(edit)

    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    const response = await fetch('http://103.252.100.230:8000/fact/quote/' + edit.id, {method: 'PUT', body, headers})
    const json = await response.json()

    if (typeof json.message === 'undefined' || json.message !== 'Success') {
      alert.edit_danger = "500 — Internal Server Error"
      await this.setState({alert})
    }
    else {
      alert.edit_success = "Edit Category, " + edit.desc + " — Success"

      await this.setState({alert})
      this.onRefresh()
    }
  }

  deleteQuote (quote) {
    let data = this.state.delete
    data.id = quote.id
    data.desc = quote.desc
    this.setState({delete: data})
  }

  async onSubmitDelete () {
    let alert = this.state.alert
    let data = this.state.delete
    const body = JSON.stringify(data)

    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    const response = await fetch('http://103.252.100.230:8000/fact/quote/' + data.id, {method: 'DELETE', body, headers})
    const json = await response.json()

    if (typeof json.message === 'undefined' || json.message !== 'Success') {
      alert.delete_danger = "500 — Internal Server Error"
      await this.setState({alert})
    }
    else {
      alert.delete_success = "Delete Category, " + data.desc + " — Success"

      await this.setState({alert})
      this.onRefresh()
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
      const quote = this.state.data[i];
      tbody.push(
        <tr key={quote.id}>
          <td>{i + 1}</td>
          <td>{quote.desc}</td>
          <td>{quote.author}</td>
          <td>
            <button className="btn btn-link" data-toggle="modal" data-target="#edit" onClick={() => this.editQuote(quote)}>Edit</button>
            <button className="btn btn-link text-danger ml-3" data-toggle="modal" data-target="#delete" onClick={() => this.deleteQuote(quote)}>Delete</button>
          </td>
        </tr>
      )
    }

    return (
      <AdminLayoutHoc contentTitle={`Quotes (${this.state.total})`} contentBreadcrumb={["Home", "Newsfeed", "Quotes"]}>
        <Alert type="danger"component={this} attribute="delete_danger"/>
        <Alert type="success"component={this} attribute="delete_success"/>
        <div className="card">
          <div className="card-body">
            <div className="form-inline">
              <button type="button" className="btn btn-info ml-auto" data-toggle="modal" data-target="#add">
                <i className="fa fa-plus" /> Add Quote
              </button>
            </div>
          </div>
        </div>

        <Table table={this.state.table}>
          { tbody }
        </Table>

        <Modal id="add" title="Add Quote">
          <Alert type="danger" component={this} attribute="add_danger"/>
          <Alert type="success" component={this} attribute="add_success"/>
          <div className="modal-body">
            <div className="form-group">
              <label>Quote</label>
              <textarea name="desc" value={this.state.add.desc} onChange={this.onChangeAdd} rows="3" className="form-control" placeholder="Enter quote here"/>
            </div>
            <div className="form-group">
              <label>Author</label>
              <input name="author" value={this.state.add.author} onChange={this.onChangeAdd} type="text" className="form-control" placeholder="Enter author's name"/>
            </div>
          </div>
          <div className="modal-footer">
            <div className="col-md-6">
              <button onClick={this.onSubmitAdd} type="button" className="btn btn-info btn-block" >Save</button>
            </div>
            <div className="col-md-6">
              <button type="button" className="btn btn-light btn-block" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </Modal>

        <Modal id="edit" title="Edit Quote">
          <Alert type="danger" component={this} attribute="edit_danger"/>
          <Alert type="success" component={this} attribute="edit_success"/>
          <div className="modal-body">
            <div className="form-group">
              <label>Quote</label>
              <textarea name="desc" value={this.state.edit.desc} onChange={this.onChangeEdit} rows="3" className="form-control" placeholder="Enter quote here"/>
            </div>
            <div className="form-group">
              <label>Author</label>
              <input name="author" value={this.state.edit.author} onChange={this.onChangeEdit} type="text" className="form-control" placeholder="Enter author's name"/>
            </div>
          </div>
          <div className="modal-footer">
            <div className="col-md-6">
              <button onClick={this.onSubmitEdit} type="button" className="btn btn-info btn-block" >Save</button>
            </div>
            <div className="col-md-6">
              <button type="button" className="btn btn-light btn-block" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </Modal>

        <Modal id="delete" title="Delete Quote">
          <div className="modal-body">
            <span>Are you sure you want to delete <b>{this.state.delete.desc}</b>?</span>
          </div>
          <div className="modal-footer">
            <div className="col-md-6">
              <button type="button" className="btn btn-light btn-block" data-dismiss="modal">No</button>
            </div>
            <div className="col-md-6">
              <button onClick={this.onSubmitDelete} type="button" className="btn btn-danger btn-block" data-dismiss="modal">Yes</button>
            </div>
          </div>
        </Modal>
      </AdminLayoutHoc>
    )
  }
}

import AdminLayoutHoc from '../Layout/AdminLayoutHoc';
import Alert from '../Alert';
import Router from 'next/router'

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        title: '',
        author: '',
        image: '',
        content: ''
      },
      alert: {
        add_danger: '',
        add_success: '',
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onChangeFile = this.onChangeFile.bind(this)
  }

  async onSubmit () {
    const alert = this.state.alert
    const body = JSON.stringify(this.state.data)
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    const response = await fetch('http://103.252.100.230:8000/fact/article', {method: 'POST', body, headers})
    const json = await response.json()

    if (typeof json.message === 'undefined' || json.message !== 'Success') {
      alert.add_danger = "500 — Internal Server Error"
      await this.setState({alert})
    }
    else {
      alert.add_success = "Add Article, " + this.state.data.title + " — Success"
      const data = {
        title: '',
        author: '',
        image: '',
        content: ''
      }

      await this.setState({data, alert})
    }
  }

  onChange (event) {
    const data = this.state.data
    data[event.target.name] = event.target.value
    this.setState({ data })
  }

  async onChangeFile () {
    const input = document.querySelector('input[type="file"]')

    var body = new FormData()
    body.append('uploads', input.files[0])

    const response = await fetch(`http://103.252.100.230:8000/fact/image/upload`, {method: 'POST', body})
    const json = await response.json()

    const data = this.state.data
    data.image = json.results

    this.setState({ data })
  }

  render() {
    console.log(this.props)

    return (
      <AdminLayoutHoc contentTitle={'Add Article'} contentBreadcrumb={["Home", "Newsfeed", "Articles", "Add"]}>
        <Alert type="danger" component={this} attribute="add_danger"/>
        <Alert type="success" component={this} attribute="add_success"/>
        <div className="card">
          <div className="card-body">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Title</label>
              <div className="col-sm-9">
                <input name="title" value={this.state.data.title} onChange={this.onChange} type="text" className="form-control" placeholder="Enter Title"/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Author</label>
              <div className="col-sm-9">
                <input name="author" value={this.state.data.author} onChange={this.onChange} type="text" className="form-control" placeholder="Enter Author's Name"/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Image</label>
              <div className="col-sm-9">
                <div className="custom-file">
                  <input type="file" onChange={this.onChangeFile} className="custom-file-input" id="customFile" accept="image/*"/>
                  <label className="custom-file-label" for="customFile">{(this.state.data.image === '') ? 'Choose file' : this.state.data.image}</label>
                </div>
                <img className="mt-3" src={(this.state.data.image !== '') ? `http://103.252.100.230:8000/fact/image/${this.state.data.image}` : ''}/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Content</label>
              <div className="col-sm-9">
                <textarea name="content" value={this.state.data.content} onChange={this.onChange} className="form-control" id="exampleFormControlTextarea1" rows="5"/>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-5">
                <button onClick={this.onSubmit} type="button" className="btn btn-info btn-block">Save</button>
              </div>
              <div className="col-md-5 offset-md-2">
                <button type="button" className="btn btn-light btn-block" onClick={() => Router.back()}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </AdminLayoutHoc>
    )
  }
}

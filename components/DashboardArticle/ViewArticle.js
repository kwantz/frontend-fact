import AdminLayoutHoc from '../Layout/AdminLayoutHoc';
import Alert from '../Alert';
import Router, { withRouter } from 'next/router';

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        title: '',
        image: '',
        author: '',
        content: ''
      },
      alert: {
        edit_danger: '',
        edit_success: '',
      }
    }

    this.onRefresh = this.onRefresh.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeFile = this.onChangeFile.bind(this)
  }

  async onSubmit (event) {
    event.preventDefault()

    let {alert} = this.state

    if (this.state.data.content.length < 100) {
      window.scrollTo(0, 0)
      alert.edit_danger = "Content should be 100 words or more"
      return await this.setState({alert})
    }

    const body = JSON.stringify(this.state.data)
    const response = await fetch(`http://103.252.100.230/fact/article/${this.props.router.query.id}`, {method: 'PUT', body})
    const json = await response.json()

    if (typeof json.message === 'undefined' || json.message !== 'Success') {
      window.scrollTo(0, 0)
      alert.edit_danger = json.message
      await this.setState({alert})
    }
    else {
      window.scrollTo(0, 0)
      alert.edit_success = "Edit Article, " + this.state.data.title + " — Success"
      await this.setState({alert})
    }
  }

  async onRefresh () {
    const response = await fetch(`http://103.252.100.230/fact/article/${this.props.router.query.id}`)
    const json = await response.json()

    const {data} = this.state
    data.title = json.results.title
    data.image = json.results.image,
    data.author = json.results.author,
    data.content = json.results.content
    this.setState({ data })
  }

  onChange (event) {
    const data = this.state.data
    if (event.target.name === 'title') {
      if (event.target.value === '' || /^[a-zA-Z0-9 ]+$/.test(event.target.value.trim())) {
        data[event.target.name] = event.target.value
        this.setState({ data })
      }
      return
    }
    if (event.target.name === 'author') {
      if (event.target.value === '' || /^[A-Z]+$/.test(event.target.value.trim()) || /^[A-Z][a-zA-Z0-9 ]+$/.test(event.target.value.trim())) {
        data[event.target.name] = event.target.value
        this.setState({ data })
      }
      return
    }

    data[event.target.name] = event.target.value
    this.setState({ data })
  }

  async onChangeFile () {
    const input = document.querySelector('input[type="file"]')

    var body = new FormData()
    body.append('uploads', input.files[0])

    const response = await fetch(`http://103.252.100.230/fact/image/upload`, {method: 'POST', body})
    const json = await response.json()

    const data = this.state.data
    data.image = json.results

    this.setState({ data })
  }

  componentDidMount() {
    this.onRefresh()
  }

  render() {
    return (
      <AdminLayoutHoc contentTitle={'View Article'} contentBreadcrumb={["Home", "Newsfeed", "Articles", "View"]}>
        <Alert type="danger" component={this} attribute="edit_danger"/>
        <Alert type="success" component={this} attribute="edit_success"/>
        <form className="card" onSubmit={this.onSubmit}>
          <div className="card-body">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Title</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" value={this.state.data.title} onChange={this.onChange} name="title" required/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Author</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" value={this.state.data.author} onChange={this.onChange} name="author" required/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Image</label>
              <div className="col-sm-9">
                <div className="custom-file">
                  <input type="file" onChange={this.onChangeFile} className="custom-file-input" id="customFile" accept="image/*" required/>
                  <label className="custom-file-label" for="customFile">{(this.state.data.image === '') ? 'Choose file' : this.state.data.image}</label>
                </div>
                <img className="mt-3" src={`http://103.252.100.230/fact/image/${this.state.data.image}`}/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Content</label>
              <div className="col-sm-9">
                <textarea className="form-control" rows="5" value={this.state.data.content} onChange={this.onChange} name="content" required/>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-5">
                <button type="submit" className="btn btn-info btn-block">Save</button>
              </div>
              <div className="col-md-5 offset-md-2">
                <button type="button" className="btn btn-light btn-block" onClick={() => Router.back()}>Cancel</button>
              </div>
            </div>
          </div>
        </form>
      </AdminLayoutHoc>
    )
  }
}

export default withRouter(Index)

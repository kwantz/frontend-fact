import AdminLayoutHoc from '../Layout/AdminLayoutHoc';
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
      }
    }

    this.onRefresh = this.onRefresh.bind(this)
  }

  async onRefresh () {
    const response = await fetch(`http://103.252.100.230:8000/fact/article/${this.props.router.query.id}`)
    const json = await response.json()

    const {data} = this.state
    data.title = json.results.title
    data.image = json.results.image,
    data.author = json.results.author,
    data.content = json.results.content
    this.setState({ data })
  }

  componentDidMount() {
    this.onRefresh()
  }

  render() {
    return (
      <AdminLayoutHoc contentTitle={'View Article'} contentBreadcrumb={["Home", "Newsfeed", "Articles", "View"]}>
        <div className="card">
          <div className="card-body">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Title</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" value={this.state.data.title}/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Author</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" value={this.state.data.author}/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Image</label>
              <div className="col-sm-9">
                <div className="custom-file">
                  <input type="file" onChange={this.onChangeFile} className="custom-file-input" id="customFile" accept="image/*"/>
                  <label className="custom-file-label" for="customFile">{(this.state.data.image === '') ? 'Choose file' : this.state.data.image}</label>
                </div>
                <img className="mt-3" src={`http://103.252.100.230:8000/fact/image/${this.state.data.image}`}/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Content</label>
              <div className="col-sm-9">
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" value={this.state.data.content}/>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-5">
                <button type="button" className="btn btn-info btn-block">Save</button>
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

export default withRouter(Index)

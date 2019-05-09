import AdminLayoutHoc from '../Layout/AdminLayoutHoc';

export default class Index extends React.Component {
  render() {
    console.log(this.props)

    return (
      <AdminLayoutHoc contentTitle={'Add Article'} contentBreadcrumb={["Home", "Newsfeed", "Articles", "Add"]}>
        <div className="card">
          {/* <div className="overlay">
            <i className="fa fa-sync-alt fa-spin"></i>
          </div> */}
          <div className="card-body">
            <form>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Title</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" placeholder="Enter Food Name"/>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Author</label>
                <div className="col-sm-9">
                  <select className="form-control">
                    <option>All Category</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Image</label>
                <div className="col-sm-9">
                  <img src="http://127.0.0.1:8000/fact/images/6c9149e1-f4c2-4cc5-965d-b373ff632c3b.jpeg"/>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Content</label>
                <div className="col-sm-9">
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"/>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-5">
                  <button type="button" className="btn btn-info btn-block">Save</button>
                </div>
                <div className="col-md-5 offset-md-2">
                  <button type="button" className="btn btn-light btn-block">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </AdminLayoutHoc>
    )
  }
}

import AdminLayoutHoc from '../../Layout/AdminLayoutHoc';

export default class Index extends React.Component {
  render() {
    console.log(this.props)

    return (
      <AdminLayoutHoc contentTitle={'Quotes (5)'} contentBreadcrumb={["Home", "Newsfeed", "Quotes"]}>
        <div className="card">
          <div className="card-body">
            <form className="form-inline">
              <button type="submit" className="btn btn-info ml-auto" data-toggle="modal" data-target="#testing">
                <i className="fa fa-plus" /> Add Quote
              </button>
            </form>
          </div>
        </div>

        <div className="card">
          {/* <div className="overlay">
            <i className="fa fa-sync-alt fa-spin"></i>
          </div> */}
          <div className="card-body p-0">
            <table className="table">
              <tbody>
                <tr>
                  <th style={{width: "50px"}}>#</th>
                  <th>Quotes</th>
                  <th>Author</th>
                  <th style={{width: "200px"}}>Action</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</td>
                  <td>Food 1</td>
                  <td>
                    <button className="btn btn-link" data-toggle="modal" data-target="#testing2">Edit</button>
                    <button className="btn btn-link text-danger" data-toggle="modal" data-target="#testing3">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <ul className="pagination justify-content-end mb-0">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabindex="-1">Previous</a>
              </li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item active"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="modal animate fade" id="testing">
          <div className="modal-dialog a-zoom modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Activity</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Quote</label>
                    <textarea rows="3" className="form-control" placeholder="Enter quote here"/>
                  </div>
                  <div className="form-group">
                    <label>Author</label>
                    <input type="text" className="form-control" placeholder="Enter author's name"/>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <div className="col-md-6">
                  <button type="button" className="btn btn-info btn-block" >Save</button>
                </div>
                <div className="col-md-6">
                  <button type="button" className="btn btn-light btn-block" data-dismiss="modal">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal animate fade" id="testing2">
          <div className="modal-dialog a-zoom modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Activity</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Quote</label>
                    <textarea rows="3" className="form-control" placeholder="Enter quote here"/>
                  </div>
                  <div className="form-group">
                    <label>Author</label>
                    <input type="text" className="form-control" placeholder="Enter author's name"/>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <div className="col-md-6">
                  <button type="button" className="btn btn-info btn-block" >Save</button>
                </div>
                <div className="col-md-6">
                  <button type="button" className="btn btn-light btn-block" data-dismiss="modal">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                    Are you sure you want to delete this quote?
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

import AdminLayoutHoc from '../Layout/AdminLayoutHoc';
import Link from 'next/link';

export default class Index extends React.Component {
  render() {
    console.log(this.props)

    return (
      <AdminLayoutHoc contentTitle={'Edit User'} contentBreadcrumb={["Home", "Users", "Active Users", "Edit"]}>
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" className="form-control" placeholder="Enter new password" />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input type="password" className="form-control" placeholder="Confirm new password" />
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

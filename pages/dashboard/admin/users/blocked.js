import AdminLayoutHoc from '../../../../components/Layout/AdminLayoutHoc';
import Link from 'next/link';

export default class Index extends React.Component {
  render() {
    console.log(this.props)

    return (
      <AdminLayoutHoc contentTitle={'Blocked Users (10)'} contentBreadcrumb={["Home", "Users", "Blocked Users"]}>

        <div className="card">
          {/* <div className="overlay">
            <i className="fa fa-sync-alt fa-spin"></i>
          </div> */}
          <div className="card-body p-0">
            <table className="table">
              <tbody>
                <tr>
                  <th style={{width: "50px"}}>#</th>
                  <th style={{width: "150px"}}>Profile</th>
                  <th>Name</th>
                  <th>Reason</th>
                  <th style={{width: "100px"}}>Action</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>
                    <i className="fa fa-user-circle" style={{fontSize: "50px"}}/>
                  </td>
                  <td>Giacomo Guilizzoni</td>
                  <td>Inactive 2 months</td>
                  <td>
                    <a href="#" className="text-danger">Unblock</a>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <i className="fa fa-user-circle" style={{fontSize: "50px"}}/>
                  </td>
                  <td>Marco Botton</td>
                  <td>-</td>
                  <td>
                    <a href="#" className="text-danger">Unblock</a>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    <i className="fa fa-user-circle" style={{fontSize: "50px"}}/>
                  </td>
                  <td>Mariah Maclachlan</td>
                  <td>-</td>
                  <td>
                    <a href="#" className="text-danger">Unblock</a>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>
                    <i className="fa fa-user-circle" style={{fontSize: "50px"}}/>
                  </td>
                  <td>Valerie Liberty</td>
                  <td>-</td>
                  <td>
                    <a href="#" className="text-danger">Unblock</a>
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>
                    <i className="fa fa-user-circle" style={{fontSize: "50px"}}/>
                  </td>
                  <td>User 10</td>
                  <td>-</td>
                  <td>
                    <button className="btn btn-link text-danger" data-toggle="modal" data-target="#testing">
                      Unblock
                    </button>
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
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
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
                <h5 className="modal-title">Unblock User</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to unblock Marco Botton?</p>
              </div>
              <div className="modal-footer">
                <div className="col-md-6">
                  <button type="button" className="btn btn-danger btn-block" data-dismiss="modal">Yes</button>
                </div>
                <div className="col-md-6">
                  <button type="button" className="btn btn-light btn-block" data-dismiss="modal">No</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayoutHoc>
    )
  }
}

import AdminLayoutHoc from '../Layout/AdminLayoutHoc';
import Link from 'next/link';

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        email: "",
        password: "",
        re_password: "",
      },
      alert: {
        edit_danger: '',
        edit_success: '',
      }
    }

    this.onRefresh = this.onRefresh.bind(this)
  }

  async onRefresh() {
    const response = await fetch(`http://127.0.0.1:8000/fact/user/` + this.props.router.query.id)
    const json = await response.json()
    const data = {
      email: json.results.email,
      password: "",
      re_password: "",
    }

    this.setState({ data })
  }

  async onSubmit() {
    const alert = this.state.alert
    const body = this.state.data
    const response = await fetch(`http://127.0.0.1:8000/fact/user/` + this.props.router.query.id, {method: "PUT", body})
    const json = await response.json()

    if (typeof json.message === 'undefined' || json.message !== 'Success') {
      alert.edit_danger = "500 — Internal Server Error"
      await this.setState({alert})
    }
    else {
      alert.edit_success = "Edit User, " + this.state.data.email + " — Success"
      await this.setState({alert})
    }
  }

  componentDidMount () {
    this.onRefresh()
  }

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

import AdminLayoutHoc from '../Layout/AdminLayoutHoc';
import Link from 'next/link';
import Alert from '../Alert';
import Router, { withRouter } from 'next/router';

class Index extends React.Component {
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

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  onChange (event) {
    const {data} = this.state
    data[event.target.name] = event.target.value
    this.setState({data})
  }

  async onRefresh () {
    const response = await fetch(`http://103.252.100.230/fact/user/` + this.props.router.query.id)
    const json = await response.json()
    const data = {
      email: json.results.email,
      password: "",
      re_password: "",
    }

    this.setState({ data })
  }

  async onSubmit () {
    const alert = this.state.alert
    const body = JSON.stringify(this.state.data)
    const response = await fetch(`http://103.252.100.230/fact/user/` + this.props.router.query.id, {method: "PUT", body})
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
    return (
      <AdminLayoutHoc contentTitle={'Edit User'} contentBreadcrumb={["Home", "Users", "Active Users", "Edit"]}>
        <Alert type="danger" component={this} attribute="edit_danger"/>
        <Alert type="success" component={this} attribute="edit_success"/>
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label>Email address</label>
                <input name="email" value={this.state.data.email} onChange={this.onChange} type="email" className="form-control" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input name="password" value={this.state.data.password} onChange={this.onChange} type="password" className="form-control" placeholder="Enter new password" />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input name="re_password" value={this.state.data.re_password} onChange={this.onChange} type="password" className="form-control" placeholder="Confirm new password" />
              </div>
              <div className="row mt-5">
                <div className="col-md-5">
                  <button type="button" className="btn btn-info btn-block" onClick={this.onSubmit}>Save</button>
                </div>
                <div className="col-md-5 offset-md-2">
                  <button type="button" className="btn btn-light btn-block"onClick={() => Router.back()}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayoutHoc>
    )
  }
}

export default withRouter(Index)

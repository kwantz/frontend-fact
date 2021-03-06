import AdminLayoutHoc from '../Layout/AdminLayoutHoc';
import Link from 'next/link';
import Alert from '../Alert';
import Router, { withRouter } from 'next/router';

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        temp: "",
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
      temp: json.results.email,
      email: json.results.email,
      password: "",
      re_password: "",
    }

    this.setState({ data })
  }

  async onSubmit (event) {
    event.preventDefault();

    const alert = this.state.alert

    if (this.state.data.temp === this.state.data.email && this.state.data.password === "" && this.state.data.re_password === "") {
      return Router.back()
    }

    if (this.state.data.temp !== this.state.data.email && this.state.data.password === "" && this.state.data.re_password === "") {
      window.scrollTo(0, 0)
      alert.edit_danger = "New Password and Confirm are required for new email."
      return await this.setState({alert})
    }

    if (this.state.data.password.invalidpass()) {
      window.scrollTo(0, 0)
      alert.edit_danger = "Password minimum 8 and maximum 16 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number."
      return await this.setState({alert})
    }

    const body = JSON.stringify(this.state.data)
    const response = await fetch(`http://103.252.100.230/fact/user/` + this.props.router.query.id, {method: "PUT", body})
    const json = await response.json()

    if (typeof json.message === 'undefined' || json.message !== 'Success') {
      window.scrollTo(0, 0)
      alert.edit_danger = json.message
      await this.setState({alert})
    }
    else {
      window.scrollTo(0, 0)
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
        <form className="col-md-8 offset-md-2" onSubmit={this.onSubmit}>
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label>Email address</label>
                <input autocomplete="off" name="email" value={this.state.data.email} onChange={this.onChange} type="email" className="form-control" placeholder="Enter email" required/>
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input autocomplete="off" name="password" value={this.state.data.password} onChange={this.onChange} type="password" className="form-control" placeholder="Enter new password"/>
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input autocomplete="off" name="re_password" value={this.state.data.re_password} onChange={this.onChange} type="password" className="form-control" placeholder="Confirm new password"/>
              </div>
              <div className="row mt-5">
                <div className="col-md-5">
                  <button type="submit" className="btn btn-info btn-block">Save</button>
                </div>
                <div className="col-md-5 offset-md-2">
                  <button type="button" className="btn btn-light btn-block"onClick={() => Router.back()}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </AdminLayoutHoc>
    )
  }
}

export default withRouter(Index)

import AdminLayoutHoc from '../components/Layout/AdminLayoutHoc';
import InfoBox from '../components/InfoBox';
import Card from '../components/Card';
import { Pie } from 'react-chartjs-2';
import Router from 'next/router'

export default class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {
        email: '',
        password: ''
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  async onSubmit () {
    const body = JSON.stringify(this.state.data)
    const response = await fetch(`http://127.0.0.1:8000/fact/login`, {method: 'POST', body})
    const json = await response.json()

    if (typeof json.results === 'undefined') {
      // Danger Alert
    }
    else {
      window.localStorage.setItem("token", json.results.token)
      window.localStorage.setItem("role", json.results.role)
      if (json.results.role === 1)
        window.location.href = "/dashboard/admin"
      else
        window.location.href = "/dashboard/user"
    }
    console.log("JSON:", json)
  }

  onChange (event) {
    const data = this.state.data
    data[event.target.name] = event.target.value
    this.setState({ data })
  }

  render() {
    return (
        <div class="login-box">
          <div class="login-logo">
            <a href="../../index2.html"><b>Admin</b>LTE</a>
          </div>
          <div class="card">
            <div class="card-body login-card-body">
              <p class="login-box-msg">Sign in to start your session</p>

      <form action="../../index2.html" method="post">
        <div class="input-group mb-3">
          <input name="email" type="email" class="form-control" placeholder="Email" value={this.state.email} onChange={this.onChange}/>
          <div class="input-group-append">
              <span class="fa fa-envelope input-group-text"></span>
          </div>
        </div>
        <div class="input-group mb-3">
          <input name="password" type="password" class="form-control" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
          <div class="input-group-append">
              <span class="fas fa-user-lock input-group-text"></span>
          </div>
        </div>
        <div class="row">
          <div class="col-4 offset-8">
            <button type="button" class="btn btn-primary btn-block btn-flat" onClick={this.onSubmit}>Sign In</button>
          </div>
        </div>
      </form>

      <p class="mb-1">
        <a href="#">I forgot my password</a>
      </p>
      <p class="mb-0">
        <a href="register.html" class="text-center">Register a new membership</a>
      </p>
    </div>
  </div>
</div>
    )
  }
}

<<<<<<< HEAD
import UserHeader from '../components/Layout/UserHeader';
import Link from 'next/link';
import '../styles/styles.scss'

export default class Register extends React.Component {
    render() {
        return ( 
          <div class="register-page" style={{height:'100%'}}>
            <UserHeader />
            <div className="register-box" style={{marginTop:'1%',marginBottom:'1%'}}>
               <div class="register-logo">
                <Link href="/"><a className="font-weight-bold" style={{fontSize:'1.5rem'}}>SIGN UP</a></Link>
              </div>
              <div class="card">
                <div class="card-body register-card-body">
                  <form action="./index.html" method="post">
                    <div class="form-group">
                      <label>Name</label>
                      <input type="text" class="form-control" placeholder="Enter your name" />
                    </div>
                    <div class="form-group">
                      <label>Email Address</label>
                      <input type="email" class="form-control" placeholder="Enter your email address" />
                    </div>
                    <div class="form-group">
                      <label>Password</label>
                      <input type="password" class="form-control" placeholder="Enter your password" />
                    </div>
                    <div class="form-group">
                      <label>Confirm Password</label>
                      <input type="password" class="form-control" placeholder="Confirm your password" />
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <button type="submit" class="btn btn-info btn-block btn-flat">SIGN UP</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <footer class="d-flex justify-content-center">Copyright by Zro2iro</footer>
          </div>
        )
    }
}
=======
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
        name: '',
        email: '',
        password: '',
        re_password: '',
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  async onSubmit () {
    const body = JSON.stringify(this.state.data)
    const response = await fetch(`http://127.0.0.1:8000/fact/register`, {method: 'POST', body})
    const json = await response.json()

    if (typeof json.results === 'undefined') {
      // Danger Alert
    }
    else {
      window.localStorage.setItem("token", json.results.token)
      if (json.results.role === 'Admin')
        window.location.href = "/"
      else
        window.location.href = "/"
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
          <input name="name" type="text" class="form-control" placeholder="Enter your name" value={this.state.name} onChange={this.onChange}/>
          <div class="input-group-append">
              <span class="fa fa-envelope input-group-text"></span>
          </div>
        </div>
        <div class="input-group mb-3">
          <input name="email" type="email" class="form-control" placeholder="Enter your email address" value={this.state.email} onChange={this.onChange}/>
          <div class="input-group-append">
              <span class="fas fa-user-lock input-group-text"></span>
          </div>
        </div>
        <div class="input-group mb-3">
          <input name="password" type="password" class="form-control" placeholder="Enter your password" value={this.state.password} onChange={this.onChange}/>
          <div class="input-group-append">
              <span class="fa fa-envelope input-group-text"></span>
          </div>
        </div>
        <div class="input-group mb-3">
          <input name="re_password" type="password" class="form-control" placeholder="Confirm your password" value={this.state.re_password} onChange={this.onChange}/>
          <div class="input-group-append">
              <span class="fa fa-envelope input-group-text"></span>
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
>>>>>>> 5f3bbb858ac5a7d03e15a6642e839fb81d0e7cf6

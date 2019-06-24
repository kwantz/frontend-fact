
import UserLayoutHoc from '../UserLayout/UserLayoutHoc'
import Card from '../Card';
import Chart from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        password: '',
        re_password: '',
        old_password: ''
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  async onSubmit() {
    const body = JSON.stringify(this.state.data)
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    const response = await fetch(`http://127.0.0.1:8000/fact/member/user`, {method: 'PUT', body, headers})
    const json = await response.json()

    if (json.message === "Success") {
      window.location.href = "/dashboard/user/profile"
    }
  }

  onChange (event) {
    const data = this.state.data
    data[event.target.name] = event.target.value
    this.setState({ data })
  }

  render() {
    const navbarInfo = (
      <h3 class="my-auto text-center">CHANGE PASSWORD</h3>
    )

    return (
      <UserLayoutHoc navbarInfo={navbarInfo}>
        <div class="row pt-5">
          <div className="card offset-md-3 col-md-6 pt-3">
            <div class="form-group">
              <label for="exampleInputEmail1">Current Password</label>
              <input type="password" class="form-control"  placeholder="Enter Current Password" value={this.state.old_password} name="old_password" onChange={this.onChange}/>
            </div>

            <div class="form-group">
              <label for="exampleInputEmail1">New Password</label>
              <input type="password" class="form-control"  placeholder="Enter New Password" value={this.state.password} name="password" onChange={this.onChange}/>
            </div>

            <div class="form-group">
              <label for="exampleInputEmail1">Confirm New Password</label>
              <input type="password" class="form-control"  placeholder="Confirm New Password" value={this.state.re_password} name="re_password" onChange={this.onChange}/>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <button type="submit" class="btn btn-block btn-info" onClick={this.onSubmit}>SAVE</button>
              </div>
              <div class="col-md-6">
                <button type="submit" class="btn btn-block btn-secondary" onClick={() => Router.back()}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      </UserLayoutHoc>
    )
  }
}

export default withRouter(Index)

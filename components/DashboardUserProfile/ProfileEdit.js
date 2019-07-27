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
        name: '',
        password: '',
        re_password: '',
        old_password: '',
        weight: 0,
        height: 0,
      }
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  onChange (event) {
    const data = this.state.data
    data[event.target.name] = event.target.value
    this.setState({ data })
  }

  async onSubmit (event) {
    event.preventDefault();

    const body = JSON.stringify(this.state.data)
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    let response = await fetch(`http://103.252.100.230/fact/member/user`, {method: 'PUT', body, headers})
    let json = await response.json()

    if (json.message === "Success") {
      window.location.href = "/dashboard/user/profile"
    }
  }

  async onRefresh() {
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    const response = await fetch(`http://103.252.100.230/fact/member/user`, {headers})
    const json = await response.json()

    const data = {
      name: json.results.name,
      weight: json.results.weight,
      height: json.results.height,
    }

    this.setState({ data })
  }

  componentDidMount () {
    this.onRefresh()
  }

  render() {
    const navbarInfo = (
      <h3 class="my-auto text-center">EDIT PROFILE</h3>
    )

    return (
      <UserLayoutHoc navbarInfo={navbarInfo}>
        <form class="row pt-5" onSubmit={this.onSubmit}>
          <div className="card offset-md-2 col-md-8 pt-3">
            <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input autocomplete="off" type="email" class="form-control" value={this.state.data.name} name="name" onChange={this.onChange} required maxLength={30}/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputEmail1">Current Password</label>
                <input autocomplete="off" type="password" class="form-control"  placeholder="Enter Current Password" value={this.state.old_password} name="old_password" onChange={this.onChange}/>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputEmail1">New Password</label>
                <input autocomplete="off" type="password" class="form-control"  placeholder="Enter New Password" value={this.state.password} name="password" onChange={this.onChange}/>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputEmail1">Confirm New Password</label>
                <input autocomplete="off" type="password" class="form-control"  placeholder="Confirm New Password" value={this.state.re_password} name="re_password" onChange={this.onChange}/>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label>Weight</label>
                <div class="input-group">
                  <input autocomplete="off" type="number" class="form-control br-0" placeholder="Enter weight" min="30" max="200" value={this.state.data.weight} name="weight" onChange={this.onChange}/>
                  <div class="input-group-prepend">
                    <div class="input-group-text right">kg</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label>Height</label>
                <div class="input-group">
                  <input autocomplete="off" type="number" class="form-control br-0" placeholder="Enter weight" min="100" max="270" value={this.state.data.height} name="height" onChange={this.onChange}/>
                  <div class="input-group-prepend">
                    <div class="input-group-text right">cm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <button type="button" class="btn btn-block btn-info">SAVE</button>
              </div>
              <div class="col-md-6">
                <button type="button" class="btn btn-block btn-secondary" onClick={() => Router.back()}>CANCEL</button>
              </div>
            </div>
          </div>
        </form>
      </UserLayoutHoc>
    )
  }
}

export default withRouter(Index)

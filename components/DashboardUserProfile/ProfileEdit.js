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
        email: '',
        birth_year: '',
        weight: '',
        height: '',
        gender: '',
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

  async onSubmit () {
    const body = JSON.stringify(this.state.data)
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    let response = await fetch(`http://127.0.0.1:8000/fact/member/user`, {method: 'PUT', body, headers})
    let json = await response.json()

    if (json.message === "Success") {
      window.location.href = "/dashboard/user/profile"
    }
  }

  async onRefresh() {
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    const response = await fetch(`http://127.0.0.1:8000/fact/member/user`, {headers})
    const json = await response.json()

    const data = {
      name: json.results.name,
      email: json.results.email,
      birth_year: json.results.birth_year,
      weight: json.results.weight,
      height: json.results.height,
      gender: json.results.gender,
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
        <div class="row pt-5">
          <div className="card offset-md-2 col-md-8 pt-3">
            <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input type="email" class="form-control" value={this.state.data.name} name="name" onChange={this.onChange}/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputEmail1">Email Address</label>
                <input type="email" class="form-control" value={this.state.data.email} name="email" onChange={this.onChange}/>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label>Gender</label>
                <div class="input-group">
                  <div class="form-check custom-control custom-radio text-center">
                    <label for="male">
                      <i class="fas fa-male" style={{fontSize: '35px'}}/>
                    </label>
                    <br/>
                    <input class="form-check-input custom-control-input" type="radio" name="gender" id="male" value="1" checked={parseInt(this.state.data.gender) === 1} name="gender" onChange={this.onChange}/>
                    <label class="form-check-label custom-control-label" for="male">Male</label>
                  </div>

                  <div class="form-check custom-control custom-radio text-center ml-5">
                    <label for="female">
                      <i class="fas fa-female" style={{fontSize: '35px'}}/>
                    </label>
                    <br/>
                    <input class="form-check-input custom-control-input" type="radio" name="gender" id="female" value="2" checked={parseInt(this.state.data.gender) === 2} name="gender" onChange={this.onChange}/>
                    <label class="form-check-label custom-control-label" for="female">Female</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label>Birth Year</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <i class="far fa-calendar-alt"/>
                    </div>
                  </div>
                  <input type="number" class="form-control bl-0" placeholder="_ _ _ _" value={this.state.data.birth_year} name="birth_year" onChange={this.onChange}/>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label>Weight</label>
                <div class="input-group">
                  <input type="number" class="form-control br-0" placeholder="Enter weight" value={this.state.data.weight} name="weight" onChange={this.onChange}/>
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
                  <input type="number" class="form-control br-0" placeholder="Enter weight" value={this.state.data.height} name="height" onChange={this.onChange}/>
                  <div class="input-group-prepend">
                    <div class="input-group-text right">cm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <button type="button" class="btn btn-block btn-info" onClick={this.onSubmit}>SAVE</button>
              </div>
              <div class="col-md-6">
                <button type="button" class="btn btn-block btn-secondary" onClick={() => Router.back()}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      </UserLayoutHoc>
    )
  }
}

export default withRouter(Index)

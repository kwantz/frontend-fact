import UserLayoutHoc from '../UserLayout/UserLayoutHoc'
import Card from '../Card';
import Chart from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
import Link from 'next/link';
import { withRouter } from 'next/router';

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        name: '',
        email: '',
        birth_year: '',
        status: '',
        weight: '',
        height: '',
        bmi: '',
        carbohydrate: '',
        protein: '',
        fat: '',
        activity_level: '',
      }
    }

    this.onRefresh = this.onRefresh.bind(this)
  }

  async onRefresh() {
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    const response = await fetch(`http://103.252.100.230/fact/member/user`, {headers})
    const json = await response.json()

    const data = {
      name: json.results.name,
      email: json.results.email,
      birth_year: json.results.birth_year,
      status: json.results.status,
      weight: json.results.weight,
      height: json.results.height,
      bmi: json.results.bmi,
      carbohydrate: json.results.carbohydrate,
      protein: json.results.protein,
      fat: json.results.fat,
      activity_level: json.results.activity_level
    }

    this.setState({ data })
  }

  componentDidMount () {
    this.onRefresh()
  }

  render() {
    const navbarInfo = (
      <h3 class="my-auto text-center">Profile</h3>
    )

    return (
      <UserLayoutHoc navbarInfo={navbarInfo}>
        <div class="row pt-5">
        <div className="card offset-md-1 col-md-10">
          <div className="card-body">
            <div class="float-right text-right">
            <Link href="/dashboard/user/profile?status=edit">
              <a class="btn btn-info mb-3">
                <i className="fa fa-pen"/> EDIT
              </a>
              </Link>
              <br/>
              <Link href="/dashboard/user/profile?status=change-password">
                <a class="btn btn-info">
                  <i class="fas fa-lock"/> CHANGE PASSWORD
                </a>
              </Link>
            </div>

            <div className="row">
              <div className="col-md-3">
                <div className="content-center">
                  <p className="text-center"><i className="fa fa-user-circle" style={{fontSize: "150px"}}/></p>
                  <h5 className="text-center mb-0">{this.state.data.name}</h5>
                </div>
              </div>

              <div class="col-md-9">
                <div className="form-group">
                  <label>Email Address:</label>
                  <input type="text" readonly className="form-control-plaintext" value={this.state.data.email}/>
                </div>
                <div className="form-group">
                  <label>Birth Year:</label>
                  <input type="text" readonly className="form-control-plaintext" value={this.state.data.birth_year}/>
                </div>
                <div className="form-group">
                  <label>Status:</label>
                  <input type="text" readonly className="form-control-plaintext" value={this.state.data.status}/>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div class="col-md-6">
                <h3><u>BODY INFORMATION</u></h3>
                <div class="form-group row mb-0">
                  <label class="col-sm-3 col-form-label">Weight</label>
                  <label class="col-form-label">:</label>
                  <div class="col-sm-8">
                    <input type="text" readonly class="form-control-plaintext" value={`${this.state.data.weight} kg`}/>
                  </div>
                </div>
                <div class="form-group row mb-0">
                  <label class="col-sm-3 col-form-label">Height</label>
                  <label class="col-form-label">:</label>
                  <div class="col-sm-8">
                    <input type="text" readonly class="form-control-plaintext" value={`${this.state.data.height} cm`}/>
                  </div>
                </div>
                <div class="form-group row mb-0">
                  <label class="col-sm-3 col-form-label">BMI</label>
                  <label class="col-form-label">:</label>
                  <div class="col-sm-8">
                    <input type="text" readonly class="form-control-plaintext" value={parseFloat(this.state.data.bmi).toFixed(1)}/>
                  </div>
                </div>
              </div>

              <div class="col-md-6 row">
                <h3 class="col-md-12">Nutritions</h3>
                <div class="col-md-4 block">
                  <div class="circle bg-info pt-4 mx-auto">
                    <h3>{this.state.data.carbohydrate}g</h3>
                  </div>
                  <p className="text-center mt-3">Carbohydrate</p>
                </div>
                <div class="col-md-4 block">
                  <div class="circle bg-info pt-4 mx-auto">
                    <h3>{this.state.data.protein}g</h3>
                  </div>
                  <p className="text-center mt-3">Protein</p>
                </div>
                <div class="col-md-4 block">
                  <div class="circle bg-info pt-4 mx-auto">
                    <h3>{this.state.data.fat}g</h3>
                  </div>
                  <p className="text-center mt-3">Fat</p>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div class="col-md-12">
                <h3><u>ACTIVITY LEVEL</u></h3>
                <span>{this.state.data.activity_level.toUpperCase()} Activity</span>
                <div className="clearfix">
                  <div className="float-left mr-3">
                    <img width="100" height="100" src="https://www.ikea.cn/cn/en/images/products/ribba-frame-black__0638328_PE698852_S4.JPG" />
                  </div>
                  <span>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  </span>
                </div>
              </div>
            </div>

            <div class="row mt-5">
              <div class="col-md-5">
                <div class="alert alert-primary" role="alert">
                  <h3>Advices:</h3>
                  Try to exercise more
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </UserLayoutHoc>
    )
  }
}

export default withRouter(Index)

import UserLayoutHoc from '../UserLayout/UserLayoutHoc'
import Card from '../Card'
import Alert from '../Alert'
import Modal from '../Modal'
import Chart from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2';
import Link from 'next/link';

export default class HistoryActivity extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      date: '',
      activity: {
        activity_level: [],
        most_active: [],
        level: '',
      }
    }
  }

  async onRefresh() {
    let date = new Date(this.state.date)
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    let response = await fetch(`http://103.252.100.230/fact/member/history/burnt?year=${date.getFullYear()}&month=${date.getMonth() + 1}&day=${date.getDate()}`, {headers})
    let json = await response.json()

    console.log(json)

    const activity = {
      week: json.results.week,
      month: json.results.month
    }
    this.setState({ activity })
  }

  async componentDidMount () {
    const self = this
    const date = new Date()
    const datestr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    window.$('#datetimepicker1').datetimepicker({
      defaultDate: datestr,
      format: 'D MMM YYYY',
    })
    window.$('#datetimepicker1').on("change.datetimepicker", function(event) {
      self.setState({ date: event.target.value })
      self.onRefresh()
    })

    await this.setState({ date: datestr })
    await this.onRefresh()
  }

  render() {

    const chart = {
      week: {
        labels: ["01 Jul 2019","02 Jul 2019","03 Jul 2019","04 Jul 2019","05 Jul 2019","06 Jul 2019","07 Jul 2019"],
        datasets: [{
          data: [10, 40, 50, 0, 70, 60, 20, 100],
          backgroundColor: '#17a2b8'
        }],
        options: {
          legend: {
             display: false
          },
          tooltips: {
             enabled: false
          },
          responsive: true,
          scales: {
            barThickness: 0.1,
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
        }
      }
    }

    const navbarInfo = (
      <div className="text-center navbar-text col-md-12">
      <Link href="/dashboard/user/history">
        <a class="btn btn btn-link text-light">
          <i className="nav-icon fas fa-chevron-circle-left"/>
        </a>
      </Link>
        <span className="ml-5 mr-5">Activity Level</span>
        <Link href="/dashboard/user/history">
          <a class="btn btn btn-link text-light">
            <i className="nav-icon fas fa-chevron-circle-right"/>
          </a>
        </Link>
      </div>
    )

    return (
      <UserLayoutHoc navbarInfo={navbarInfo}>
        <div className="row pt-5">
          <div className="offset-md-2 col-md-8">
            <div className="form-group row mb-0">
              <label class="col-form-label mr-3 ml-3">Select date:</label>
              <div class="col-sm-5">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i class="far fa-calendar-alt"/>
                    </span>
                  </div>
                  <input autocomplete="off" id="datetimepicker1" data-toggle="datetimepicker" data-target="#datetimepicker1" type="text" className="form-control bl-0 datetimepicker-input" placeholder="_ _ / _ _ / _ _ _ _"/>
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fa fa-tag mr-2"/> WEEK VIEW
                </h3>
              </div>
              <div className="card-body">
                <Bar data={chart.week} options={chart.week.options}/>
              </div>
            </div>

            <div className="card mt-5">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fa fa-tag mr-2"/> MONTH VIEW
                </h3>
              </div>
              <div className="card-body row">
                <div class="col-md-12">
                  <div class="progress">
                    <div class="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div class="col-md-4">Low</div>
                <div class="col-md-4 text-center">Medium</div>
                <div class="col-md-4 text-right">High</div>

                <div class="col-md-12 mt-4">
                  <label class="mb-0">Mostly done activities:</label>
                  <h4>WALKING</h4>
                </div>

                <div class="col-md-12 mt-4 row">
                  <label class="col-md-12 mb-0">Day with the most active hours</label>
                  <div class="col-md-2 block">
                    <div class="circle bg-info pt-2">
                      <p class="mb-0">14th<br/>Feb</p>
                      <span>10 hours</span>
                    </div>
                  </div>
                  <div class="col-md-2 block">
                    <div class="circle bg-info pt-2">
                      <p class="mb-0">14th<br/>Feb</p>
                      <span>10 hours</span>
                    </div>
                  </div>
                </div>

                <div class="col-md-12 mt-4 row">
                  <label class="col-md-12 mb-0">Day with the least active hours</label>
                  <div class="col-md-2 block">
                    <div class="circle bg-info pt-2">
                      <p class="mb-0">14th<br/>Feb</p>
                      <span>10 hours</span>
                    </div>
                  </div>
                  <div class="col-md-2 block">
                    <div class="circle bg-info pt-2">
                      <p class="mb-0">14th<br/>Feb</p>
                      <span>10 hours</span>
                    </div>
                  </div>
                  <div class="col-md-2 block">
                    <div class="circle bg-info pt-2">
                      <p class="mb-0">14th<br/>Feb</p>
                      <span>10 hours</span>
                    </div>
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

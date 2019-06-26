import UserLayoutHoc from '../UserLayout/UserLayoutHoc'
import Card from '../Card'
import Alert from '../Alert'
import Modal from '../Modal'
import Chart from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2';
import Link from 'next/link';

export default class HistoryActivity extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      date: '',
      data: {
        week: [],
        month: {
          below: 0,
          ideal: 0,
          over: 0,
        }
      }
    }

    this.onChangeDate = this.onChangeDate.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  onChangeDate(event) {
    console.log("Date", event.target.value)
  }

  async onRefresh() {
    let date = new Date(this.state.date)
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    const response = await fetch(`http://103.252.100.230/fact/member/history/intake?year=${date.getFullYear()}&month=${date.getMonth() + 1}&day=${date.getDate()}`, {headers})
    const json = await response.json()

    const data = {
      week: json.results.week,
      month: json.results.month
    }
    this.setState({ data })
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
    let date = new Date()
    let monthDate = new Date()
    const weekLabels = []

    if (this.state.date !== '') {
      date = new Date(this.state.date)
      weekLabels.push(date.dateformat('date'))
      for (let i=0; i<6; i++) {
        date.setDate(date.getDate() - 1)
        weekLabels.push(date.dateformat('date'))
      }

      date = new Date(this.state.date)
      monthDate = new Date(date.setDate(date.getDate() - 30))

      date = new Date(this.state.date)
    }

    const chart = {
      week: {
        labels: weekLabels.reverse(),
        datasets: [{
          data: this.state.data.week,
          backgroundColor: '#17a2b8'
        }],
        options: {
          legend: { display: false },
          tooltips: { enabled: false },
          responsive: true,
          scales: {
            barThickness: 0.1,
            xAxes: [{stacked: true}],
            yAxes: [{stacked: true}]
          }
        }
      },
      month: {
        labels: ['Below', 'Ideal', 'Over'],
        datasets: [{
          data: [this.state.data.month.below, this.state.data.month.ideal, this.state.data.month.over],
          backgroundColor: ['#17a2b8', '#ffc107', '#dc3545']
        }],
      }
    }

    const navbarInfo = (
      <div className="text-center navbar-text col-md-12">
        <Link href="/dashboard/user/history?status=activity">
          <a class="btn btn btn-link text-light">
            <i className="nav-icon fas fa-chevron-circle-left"/>
          </a>
        </Link>
        <span className="ml-5 mr-5">Calorie Intake</span>
        <Link href="/dashboard/user/history?status=activity">
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
              <label class="col-form-label mr-3 ml-3">Select range date:</label>
              <div class="col-sm-5">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i class="far fa-calendar-alt"/>
                    </span>
                  </div>
                  <input id="datetimepicker1" data-toggle="datetimepicker" data-target="#datetimepicker1" type="text" className="form-control bl-0 datetimepicker-input" placeholder="_ _ / _ _ / _ _ _ _"/>
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
                  <i className="fa fa-tag mr-2"/> MONTH VIEW ({(this.state.date !== '') ? date.dateformat('date') : ''} - {(this.state.date !== '') ? monthDate.dateformat('date') : ''})
                </h3>
              </div>
              <div className="card-body">
                <Pie data={chart.month} options={{legend: {position: 'bottom'}}}/>
              </div>
            </div>
          </div>
        </div>
      </UserLayoutHoc>
    )
  }
}

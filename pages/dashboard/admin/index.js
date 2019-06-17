import AdminLayoutHoc from '../../../components/Layout/AdminLayoutHoc';
import InfoBox from '../../../components/InfoBox';
import Card from '../../../components/Card';
import { Pie } from 'react-chartjs-2';
import Link from 'next/link';

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        total_users: 0,
        new_users: [],
        online_users: 0,
        insight: {
          underweight: 0,
          overweight: 0,
          normal: 0,
        },
        top_food: [],
        top_user: [],
        algorithm_accuracy: {
          correct: 0,
          incorrect: 0,
        }
      }
    }

    this.onRefresh = this.onRefresh.bind(this)
  }

  async onRefresh () {
    const response = await fetch(`http://127.0.0.1:8000/fact/dashboard`)
    const json = await response.json()
    const data = {
      total_users: json.results.total_users,
      new_users: json.results.new_users,
      online_users: 0,
      insight: {
        underweight: json.results.insight.underweight,
        overweight: json.results.insight.overweight,
        normal: json.results.insight.normal,
      },
      top_food: json.results.top_food,
      top_user: json.results.top_user,
      algorithm_accuracy: {
        correct: json.results.algorithm_accuracy.correct,
        incorrect: json.results.algorithm_accuracy.incorrect,
      }
    }

    this.setState({ data })

    const ws = new WebSocket("ws://127.0.0.1:8000/online-users")
    const self = this
    ws.onmessage = (e) => {
      const results = JSON.parse(e.data)
      const data = self.state.data
      data.online_users = parseInt(results)
      self.setState({ data })
    }
  }

  componentDidMount () {
    if (window.localStorage.getItem("role") !== "1")
      return window.location.href = "/"

    this.onRefresh()
  }

  render() {
    console.log(this.state)
    const {underweight, overweight, normal} = this.state.data.insight
    const chartdata = {
      labels: ['Underweight', 'Normal', 'Overweight'],
      datasets: [{
        data: [underweight, normal, overweight],
        backgroundColor: ['#ffc107', '#17a2b8', '#dc3545'],
      }]
    }

    const {correct, incorrect} = this.state.data.algorithm_accuracy
    const algochartdata = {
      labels: ['Correct', 'Incorrect'],
      datasets: [{
        data: [correct, incorrect],
        backgroundColor: ['#28a745', '#dc3545'],
      }]
    }

    const food1 = []
    const food2 = []
    for (let i = 0; i < Math.min(5, this.state.data.top_food.length); i++)
      food1.push(<p>{i+1}. {this.state.data.top_food[i]}</p>)

    for (let i = 5; i < Math.min(10, this.state.data.top_food.length); i++)
      food2.push(<p>{i+1}. {this.state.data.top_food[i]}</p>)

    const top_user = []
    for (let i = 0; i < Math.min(5, this.state.data.top_user.length); i++)
      top_user.push(<InfoBox size="col-md-4" color="bg-info" icon="fa-user-circle" text={this.state.data.top_user[i][1]} number='"underweight"'/>)

    const new_user = []
    for (let i = 0; i < Math.min(3, this.state.data.new_users.length); i++)
      new_user.push(<InfoBox size="col-md-12" color="bg-info" icon="fa-user-circle" text={this.state.data.new_users[i].name} number={`"${this.state.data.new_users[i].category}"`}/>)

    return (
      <AdminLayoutHoc contentTitle={'Dashboards'} contentBreadcrumb={["Home", "Dashboard"]}>
        <div className="row">
          <InfoBox size="col-md-3" color="bg-info" icon="fa-user-friends" text="Total Users" number={this.state.data.total_users}/>
          <InfoBox size="col-md-3" color="bg-danger" icon="fa-user-plus" text="New Users" number={this.state.data.new_users.length}/>
          <InfoBox size="col-md-3" color="bg-success" icon="fa-user-clock" text="Online Users" number={this.state.data.online_users}/>
        </div>

        <div className="row">
          <Card size="col-md-6" title="USER'S INSIGHT">
            <div className="chart">
              <Pie data={chartdata} options={{legend: {position: 'right'}}}/>
            </div>
          </Card>

          <Card size="col-md-6" title="10 TOP FOODS">
            <div className="row">
              <div className="col-md-6">{food1}</div>
              <div className="col-md-6">{food2}</div>
            </div>
          </Card>
        </div>

        <div className="row">
          <Card size="col-md-12" title="5 TOP USERS TO REACH DAILY TARGET">
            <div className="row">
              {top_user}
            </div>
          </Card>
        </div>

        <div className="row">
          <Card size="col-md-8" title="ALGORITHM ACCURACY TO TRACK">
            <div className="chart">
              <Pie data={algochartdata} options={{legend: {position: 'right'}}}/>
            </div>
          </Card>

          <Card size="col-md-4" title="NEW USERS">
            <div className="row">
              {new_user}
              <div className="col-md-12 text-right">
                <Link href="/dashboard/admin/see-new">
                  <a>See all</a>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </AdminLayoutHoc>
    )
  }
}

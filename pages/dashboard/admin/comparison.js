import AdminLayoutHoc from '../../../components/Layout/AdminLayoutHoc';
import InfoBox from '../../../components/InfoBox';
import Card from '../../../components/Card';
import { Pie } from 'react-chartjs-2';
import Link from 'next/link';

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activities: [],
      activity: '',
      filename: 'Choose file',
      // algorithm: {
      //   elm: {correct: 0, incorrect: 0, accuracy: 0, training: 0, testing: 0},
      //   kelm: {correct: 0, incorrect: 0, accuracy: 0, training: 0, testing: 0},
      //   rkelm: {correct: 0, incorrect: 0, accuracy: 0, training: 0, testing: 0},
      //   rf: {correct: 0, incorrect: 0, accuracy: 0, training: 0, testing: 0},
      //   svm: {correct: 0, incorrect: 0, accuracy: 0, training: 0, testing: 0},
      //   knn: {correct: 0, incorrect: 0, accuracy: 0, training: 0, testing: 0},
      // },
      algorithm: {
        elm: [],
        kelm: [],
        rkelm: [],
        rf: [],
        svm: [],
        knn: []
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeFile = this.onChangeFile.bind(this)
    this.doClasification = this.doClasification.bind(this)
    this.onChangeActivity = this.onChangeActivity.bind(this)
  }

  onSubmit () {
    for (let i = 0; i < 10; i++) {
      this.doClasification('elm')
      this.doClasification('kelm')
      this.doClasification('rkelm')
      this.doClasification('rf')
      this.doClasification('svm')
      this.doClasification('knn')
    }
  }

  async onChangeFile () {
    const input = document.querySelector('input[type="file"]')

    var body = new FormData()
    body.append('uploads', input.files[0])

    await fetch(`http://103.252.100.230/fact/comparison/upload`, {method: 'POST', body})

    let {filename} = this.state
    filename = 'data_test.csv'

    this.setState({ filename })
  }

  async doClasification (algo) {
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    const body = JSON.stringify({
      label: this.state.activity,
      algorithm: algo
    })
    const response = await fetch('http://103.252.100.230/fact/comparison', {method: 'POST', body, headers})
    const json = await response.json()

    const {algorithm} = this.state
    const {correct, incorrect} = json.results.classification

    algorithm[algo].push({
      correct: correct,
      incorrect: incorrect,
      training: json.results.training_time.toFixed(3),
      testing: json.results.testing_time.toFixed(3),
      accuracy: ((correct * 100) / (correct + incorrect)).toFixed(1)
    })

    this.setState({ algorithm })
  }

  async onRefresh () {
    const response = await fetch('http://103.252.100.230/fact/activity?name=all')
    const json = await response.json()

    let {activities, activity} = this.state
    activities = json.results.activities
    activity = json.results.activities[0].name

    this.setState({ activities, activity })
  }

  onChangeActivity (event) {
    this.setState({ activity: event.target.value })
  }

  componentDidMount () {
    if (window.localStorage.getItem("role") !== "1")
      return window.location.href = "/"

    this.onRefresh()
  }

  render() {
    const algochartdata = (algo) => {
      let correct = algo.reduce((total, num) => total += num.correct, 0)
      let incorrect = algo.reduce((total, num) => total += num.incorrect, 0)
      return {
        labels: ['Correct', 'Incorrect'],
        datasets: [{
          data: [correct / algo.length, incorrect / algo.length],
          backgroundColor: ['#28a745', '#dc3545'],
        }]
      }
    }

    const tbody = (algo) => {
      let results = []
      for (let i = 0, l = algo.length; i < l; i++) {
        const activity = algo[i];
        results.push(
          <tr key={activity.id}>
            <td>{i + 1}</td>
            <td>{activity.accuracy}%</td>
            <td>{activity.training}ms</td>
            <td>{activity.testing}ms</td>
          </tr>
        )
      }

      return results
    }

    const options = []
    for (let i = 0, l = this.state.activities.length; i < l; i++) {
      const activity = this.state.activities[i].name
      options.push(<option value={activity}>{activity}</option>)
    }

    return (
      <AdminLayoutHoc contentTitle={'Dashboards'} contentBreadcrumb={["Home", "Dashboard", "New Users"]}>
        <div class="alert alert-info" role="alert">
          <span>This is only for testing use !!</span>
        </div>

        <div className="card">
          <div className="card-body row">
            <div className="col-md-12">
              <button type="button" className="btn btn-info" onClick={this.onSubmit}>Submit</button>
            </div>
          </div>
        </div>

        <div className="row">
          <Card size="col-md-4" title="Extreme Learning Machine">
            <Pie data={algochartdata(this.state.algorithm.elm)} options={{legend: {position: 'right'}}}/>
            <div className="row mt-3">
              <table className="table row">
                <tbody>
                  <tr>
                    <th>#</th>
                    <th>Accuracy</th>
                    <th>Training</th>
                    <th>Testing</th>
                  </tr>
                  {tbody(this.state.algorithm.elm)}
                </tbody>
              </table>
            </div>
          </Card>
          <Card size="col-md-4" title="Kernel Extreme Learning Machine">
            <Pie data={algochartdata(this.state.algorithm.kelm)} options={{legend: {position: 'right'}}}/>
            <div className="row mt-3">
              <table className="table row">
                <tbody>
                  <tr>
                    <th>#</th>
                    <th>Accuracy</th>
                    <th>Training</th>
                    <th>Testing</th>
                  </tr>
                  {tbody(this.state.algorithm.kelm)}
                </tbody>
              </table>
            </div>
          </Card>
          <Card size="col-md-4" title="Reduced Kernel Extreme Learning Machine">
            <Pie data={algochartdata(this.state.algorithm.rkelm)} options={{legend: {position: 'right'}}}/>
            <div className="row mt-3">
              <table className="table row">
                <tbody>
                  <tr>
                    <th>#</th>
                    <th>Accuracy</th>
                    <th>Training</th>
                    <th>Testing</th>
                  </tr>
                  {tbody(this.state.algorithm.rkelm)}
                </tbody>
              </table>
            </div>
          </Card>
          <Card size="col-md-4" title="Random Forest">
            <Pie data={algochartdata(this.state.algorithm.rf)} options={{legend: {position: 'right'}}}/>
            <div className="row mt-3">
              <table className="table row">
                <tbody>
                  <tr>
                    <th>#</th>
                    <th>Accuracy</th>
                    <th>Training</th>
                    <th>Testing</th>
                  </tr>
                  {tbody(this.state.algorithm.rf)}
                </tbody>
              </table>
            </div>
          </Card>
          <Card size="col-md-4" title="Support Vector Machine">
            <Pie data={algochartdata(this.state.algorithm.svm)} options={{legend: {position: 'right'}}}/>
            <div className="row mt-3">
              <table className="table row">
                <tbody>
                  <tr>
                    <th>#</th>
                    <th>Accuracy</th>
                    <th>Training</th>
                    <th>Testing</th>
                  </tr>
                  {tbody(this.state.algorithm.svm)}
                </tbody>
              </table>
            </div>
          </Card>
          <Card size="col-md-4" title="K-Nearest Neighbor">
            <Pie data={algochartdata(this.state.algorithm.knn)} options={{legend: {position: 'right'}}}/>
            <div className="row mt-3">
              <table className="table row">
                <tbody>
                  <tr>
                    <th>#</th>
                    <th>Accuracy</th>
                    <th>Training</th>
                    <th>Testing</th>
                  </tr>
                  {tbody(this.state.algorithm.knn)}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </AdminLayoutHoc>
    )
  }
}

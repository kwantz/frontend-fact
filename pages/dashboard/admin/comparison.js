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
      algorithm: {
        elm: {correct: 0, incorrect: 0, accuracy: 0, training: 0, testing: 0},
        kelm: {correct: 0, incorrect: 0, accuracy: 0, training: 0, testing: 0},
        rkelm: {correct: 0, incorrect: 0, accuracy: 0, training: 0, testing: 0},
        rf: {correct: 0, incorrect: 0, accuracy: 0, training: 0, testing: 0},
        svm: {correct: 0, incorrect: 0, accuracy: 0, training: 0, testing: 0},
        knn: {correct: 0, incorrect: 0, accuracy: 0, training: 0, testing: 0},
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeFile = this.onChangeFile.bind(this)
    this.doClasification = this.doClasification.bind(this)
    this.onChangeActivity = this.onChangeActivity.bind(this)
  }

  onSubmit () {
    this.doClasification('elm')
    this.doClasification('kelm')
    this.doClasification('rkelm')
    this.doClasification('rf')
    this.doClasification('svm')
    this.doClasification('knn')
  }

  async onChangeFile () {
    const input = document.querySelector('input[type="file"]')

    var body = new FormData()
    body.append('uploads', input.files[0])

    await fetch(`http://103.252.100.230:8000/fact/comparison/upload`, {method: 'POST', body})

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
    const response = await fetch('http://103.252.100.230:8000/fact/comparison', {method: 'POST', body, headers})
    const json = await response.json()

    const {algorithm} = this.state
    const {correct, incorrect} = json.results.classification

    algorithm[algo].correct = correct
    algorithm[algo].incorrect = incorrect
    algorithm[algo].training = json.results.training_time.toFixed(3)
    algorithm[algo].testing = json.results.testing_time.toFixed(3)
    algorithm[algo].accuracy = ((correct * 100) / (correct + incorrect)).toFixed(1)

    this.setState({ algorithm })
  }

  async onRefresh () {
    const response = await fetch('http://103.252.100.230:8000/fact/activity?name=all')
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
    const algochartdata = (algo) => ({
      labels: ['Correct', 'Incorrect'],
      datasets: [{
        data: [algo.correct, algo.incorrect],
        backgroundColor: ['#28a745', '#dc3545'],
      }]
    })

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
            <div className="col-md-4">
              <label>Activity</label>
              <select className="form-control" value={this.state.activity} onChange={this.onChangeActivity}>
                {options}
              </select>
            </div>
            <div className="col-md-8">
              <label>File</label>
              <div className="custom-file">
                <input type="file" onChange={this.onChangeFile} className="custom-file-input" id="customFile" accept=".csv"/>
                <label className="custom-file-label text-left" for="customFile">{this.state.filename}</label>
              </div>
            </div>
            <div className="col-md-12 mt-3">
              <button type="button" className="btn btn-info" onClick={this.onSubmit}>Submit</button>
            </div>
          </div>
        </div>

        <div className="row">
          <Card size="col-md-4" title="Extreme Learning Machine">
            <Pie data={algochartdata(this.state.algorithm.elm)} options={{legend: {position: 'right'}}}/>
            <p className="mt-3 mb-0 text-center">Accuracy: {this.state.algorithm.elm.accuracy}%</p>
            <p className="mb-0 text-center">Training: {this.state.algorithm.elm.training}ms</p>
            <p className="mb-0 text-center">Testing: {this.state.algorithm.elm.testing}ms</p>
          </Card>
          <Card size="col-md-4" title="Kernel Extreme Learning Machine">
            <Pie data={algochartdata(this.state.algorithm.kelm)} options={{legend: {position: 'right'}}}/>
            <p className="mt-3 mb-0 text-center">Accuracy: {this.state.algorithm.kelm.accuracy}%</p>
            <p className="mb-0 text-center">Training: {this.state.algorithm.kelm.training}ms</p>
            <p className="mb-0 text-center">Testing: {this.state.algorithm.kelm.testing}ms</p>
          </Card>
          <Card size="col-md-4" title="Reduced Kernel Extreme Learning Machine">
            <Pie data={algochartdata(this.state.algorithm.rkelm)} options={{legend: {position: 'right'}}}/>
            <p className="mt-3 mb-0 text-center">Accuracy: {this.state.algorithm.rkelm.accuracy}%</p>
            <p className="mb-0 text-center">Training: {this.state.algorithm.rkelm.training}ms</p>
            <p className="mb-0 text-center">Testing: {this.state.algorithm.rkelm.testing}ms</p>
          </Card>
          <Card size="col-md-4" title="Random Forest">
            <Pie data={algochartdata(this.state.algorithm.rf)} options={{legend: {position: 'right'}}}/>
            <p className="mt-3 mb-0 text-center">Accuracy: {this.state.algorithm.rf.accuracy}%</p>
            <p className="mb-0 text-center">Training: {this.state.algorithm.rf.training}ms</p>
            <p className="mb-0 text-center">Testing: {this.state.algorithm.rf.testing}ms</p>
          </Card>
          <Card size="col-md-4" title="Support Vector Machine">
            <Pie data={algochartdata(this.state.algorithm.svm)} options={{legend: {position: 'right'}}}/>
            <p className="mt-3 mb-0 text-center">Accuracy: {this.state.algorithm.svm.accuracy}%</p>
            <p className="mb-0 text-center">Training: {this.state.algorithm.svm.training}ms</p>
            <p className="mb-0 text-center">Testing: {this.state.algorithm.svm.testing}ms</p>
          </Card>
          <Card size="col-md-4" title="K-Nearest Neighbor">
            <Pie data={algochartdata(this.state.algorithm.knn)} options={{legend: {position: 'right'}}}/>
            <p className="mt-3 mb-0 text-center">Accuracy: {this.state.algorithm.knn.accuracy}%</p>
            <p className="mb-0 text-center">Training: {this.state.algorithm.knn.training}ms</p>
            <p className="mb-0 text-center">Testing: {this.state.algorithm.knn.testing}ms</p>
          </Card>
        </div>
      </AdminLayoutHoc>
    )
  }
}

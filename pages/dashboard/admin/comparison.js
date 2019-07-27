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
      },
      temp: {
        "accuracy": [],
        "precision": [],
        "recall": [],
        "fscore": [],
        "training": [],
        "testing": []
      },
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeFile = this.onChangeFile.bind(this)
    this.doClasification = this.doClasification.bind(this)
    this.onChangeActivity = this.onChangeActivity.bind(this)
  }

  onSubmit () {
    this.doClasification('elm')
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

    console.log(json.results)

    // const {algorithm} = this.state
    // for (let i = 0; i < 10; i++) {
    //   const {correct, incorrect} = json.results[i].classification
    //   algorithm[algo].push({
    //     correct: correct,
    //     incorrect: incorrect,
    //     training: json.results[i].training_time.toFixed(3),
    //     testing: json.results[i].testing_time.toFixed(3),
    //     accuracy: ((correct * 100) / (correct + incorrect)).toFixed(1)
    //   })
    // }
    // if (algo === 'rf') {
    //   window.my_result = json.pengujian.dataset
    //   console.log("Siap")
    //   // copy(console.table(json.pengujian.dataset[0]))
    //   // console.table(json.pengujian.dataset[1])
    //   // console.table(json.pengujian.dataset[2])
    //   // console.table(json.pengujian.dataset[3])
    //   // console.table(json.pengujian.dataset[4])
    //   // console.table(json.pengujian.dataset[5])
    //   // console.table(json.pengujian.dataset[6])
    //   // console.table(json.pengujian.dataset[7])
    //   // console.table(json.pengujian.dataset[8])
    //   // console.table(json.pengujian.dataset[9])
    // }
    // this.setState({ algorithm })
    this.setState({ temp: json.results })
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
    const tbody = (status, unit) => {
      let base = (unit === '%') ? 100 : 10000

      let results = []
      let elm = 0, kelm = 0, rkelm = 0, rf = 0, svm = 0, knn = 0
      for (let i = 0, l = this.state.temp[status].length; i < l; i++) {
        elm += (Math.round(parseFloat(this.state.temp[status][i].elm) * base) / base)
        kelm += (Math.round(parseFloat(this.state.temp[status][i].kelm) * base) / base)
        rkelm += (Math.round(parseFloat(this.state.temp[status][i].rkelm) * base) / base)
        rf += (Math.round(parseFloat(this.state.temp[status][i].rf) * base) / base)
        svm += (Math.round(parseFloat(this.state.temp[status][i].svm) * base) / base)
        knn += (Math.round(parseFloat(this.state.temp[status][i].knn) * base) / base)
        results.push(
          <tr key={i}>
            <td>{Math.round(parseFloat(this.state.temp[status][i].elm) * base) / base}{unit}</td>
            <td>{Math.round(parseFloat(this.state.temp[status][i].kelm) * base) / base}{unit}</td>
            <td>{Math.round(parseFloat(this.state.temp[status][i].rkelm) * base) / base}{unit}</td>
            <td>{Math.round(parseFloat(this.state.temp[status][i].rf) * base) / base}{unit}</td>
            <td>{Math.round(parseFloat(this.state.temp[status][i].svm) * base) / base}{unit}</td>
            <td>{Math.round(parseFloat(this.state.temp[status][i].knn) * base) / base}{unit}</td>
          </tr>
        )
      }
      results.push(
        <tr key={0} class="bg-warning text-light">
          <td>{Math.round(parseFloat(elm / 10) * base) / base}{unit}</td>
          <td>{Math.round(parseFloat(kelm / 10) * base) / base}{unit}</td>
          <td>{Math.round(parseFloat(rkelm / 10) * base) / base}{unit}</td>
          <td>{Math.round(parseFloat(rf / 10) * base) / base}{unit}</td>
          <td>{Math.round(parseFloat(svm / 10) * base) / base}{unit}</td>
          <td>{Math.round(parseFloat(knn / 10) * base) / base}{unit}</td>
        </tr>
      )
      return results
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
          <Card size="col-md-6" title="Accuracy">
            <table className="table row">
              <tbody>
                <tr>
                  <th>ELM</th>
                  <th>KELM</th>
                  <th>RKELM</th>
                  <th>RF</th>
                  <th>SVM</th>
                  <th>KNN</th>
                </tr>
                {tbody("accuracy", "%")}
              </tbody>
            </table>
          </Card>
          <Card size="col-md-6" title="Presicion">
            <table className="table row">
              <tbody>
                <tr>
                  <th>ELM</th>
                  <th>KELM</th>
                  <th>RKELM</th>
                  <th>RF</th>
                  <th>SVM</th>
                  <th>KNN</th>
                </tr>
                {tbody("precision", "%")}
              </tbody>
            </table>
          </Card>
          <Card size="col-md-6" title="Recall">
            <table className="table row">
              <tbody>
                <tr>
                  <th>ELM</th>
                  <th>KELM</th>
                  <th>RKELM</th>
                  <th>RF</th>
                  <th>SVM</th>
                  <th>KNN</th>
                </tr>
                {tbody("recall", "%")}
              </tbody>
            </table>
          </Card>
          <Card size="col-md-6" title="F1 Score">
            <table className="table row">
              <tbody>
                <tr>
                  <th>ELM</th>
                  <th>KELM</th>
                  <th>RKELM</th>
                  <th>RF</th>
                  <th>SVM</th>
                  <th>KNN</th>
                </tr>
                {tbody("fscore", "%")}
              </tbody>
            </table>
          </Card>
          <Card size="col-md-6" title="Training Time">
            <table className="table row">
              <tbody>
                <tr>
                  <th>ELM</th>
                  <th>KELM</th>
                  <th>RKELM</th>
                  <th>RF</th>
                  <th>SVM</th>
                  <th>KNN</th>
                </tr>
                {tbody("training", "s")}
              </tbody>
            </table>
          </Card>
          <Card size="col-md-6" title="Testing Time">
            <table className="table row">
              <tbody>
                <tr>
                  <th>ELM</th>
                  <th>KELM</th>
                  <th>RKELM</th>
                  <th>RF</th>
                  <th>SVM</th>
                  <th>KNN</th>
                </tr>
                {tbody("testing", "s")}
              </tbody>
            </table>
          </Card>
        </div>
      </AdminLayoutHoc>
    )
  }
}

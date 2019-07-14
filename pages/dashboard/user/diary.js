import UserLayoutHoc from '../../../components/UserLayout/UserLayoutHoc'
import Card from '../../../components/Card'
import Chart from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
import '../../../libraries'

export default class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      date: '',
      calorie: {
        intake: 0,
        total_intake: 0,
        burnt: 0,
        total_burnt: 0,
      },
      nutrient: {
        fat: 0,
        protein: 0,
        carbohydrate: 0
      },
      burnt: [],
      intake: {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
      },
      recommendation_calorie: {
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        snack: 0,
      },
      delete_status: '',
      data_delete: []
    }

    this.onDelete = this.onDelete.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.onDeleteStatus = this.onDeleteStatus.bind(this)
  }

  async onDelete(eat_time) {
    const body = JSON.stringify({
      eat_time,
      data: this.state.data_delete
    })
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    const response = await fetch(`http://103.252.100.230/fact/member/intake`, {method: "DELETE", body, headers})
    const json = await response.json()

    if (json.message === 'Success') {
      this.onRefresh()
    }
  }

  onDeleteStatus(delete_status) {
    const data_delete = []
    this.setState({delete_status, data_delete})
  }

  checkedAll(idx) {
    const data_delete = this.state.intake[idx].map((data) => data.id)
    this.setState({ data_delete })
  }

  toggleChecked(val) {
    let {data_delete} = this.state
    const idx = data_delete.indexOf(val)

    if (idx > -1) data_delete.splice(idx, 1)
    else data_delete.push(val)

    this.setState({data_delete})
    console.log(data_delete)
  }

  async onRefresh () {
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    const response = await fetch(`http://103.252.100.230/fact/member/diary?year=${this.state.date.getFullYear()}&month=${this.state.date.getMonth() + 1}&day=${this.state.date.getDate()}`, {headers})
    const json = await response.json()

    const calorie = json.results.calorie
    const intake = json.results.intake
    const nutrient = json.results.nutrient
    const burnt = json.results.burnt
    const recommendation_calorie = json.results.recommendation_calorie
    const delete_status = ''
    this.setState({ calorie, intake, nutrient, recommendation_calorie, delete_status, burnt })
  }

  async onChangeDate (status) {
    let {date} = this.state
    if (status === "prev") date.setDate(date.getDate() - 1)
    if (status === "next") date.setDate(date.getDate() + 1)

    await this.setState({date})
    await this.onRefresh()
  }

  async componentDidMount() {
    let date = new Date()
    await this.setState({date})
    await this.onRefresh()
  }

  render() {
    Chart.pluginService.register({
      beforeDraw: function (chart) {
        //Get ctx from string
        var ctx = chart.chart.ctx;

        //Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

        if (chart.config.options.elements.calorie) {
          ctx.fillStyle = chart.config.options.elements.calorie.color;

          //Draw text in center
          ctx.font = "30px " + "Arial";
          ctx.fillText(chart.config.options.elements.calorie.text, centerX, centerY - 10);

          ctx.font = "15px " + "Arial";
          ctx.fillText('KCAL LEFT', centerX, centerY + 20);
        }

        if (chart.config.options.elements.nutrient) {
          // ctx.height = "500px";
          ctx.fillStyle = chart.config.options.elements.nutrient.color;

          //Draw text in center
          ctx.font = "15px " + "Arial";
          ctx.fillText(chart.config.options.elements.nutrient.text, centerX, centerY);
        }
      }
    });

    const chart = {
      intake: {
        datasets: [{
          data: [this.state.calorie.intake, this.state.calorie.total_intake - this.state.calorie.intake],
          backgroundColor: ['#ffc107'],
        }],
        options: {
          cutoutPercentage: 90,
          elements: {
            calorie: {
              text: (parseFloat(this.state.calorie.total_intake - this.state.calorie.intake)).display(),
              color: '#ffc107'
            }
          }
        }
      },
      burnt: {
        datasets: [{
          data: [this.state.calorie.burnt, this.state.calorie.total_burnt - this.state.calorie.burnt],
          backgroundColor: ['#dc3545'],
        }],
        options: {
          cutoutPercentage: 90,
          elements: {
            calorie: {
              text: (parseFloat(this.state.calorie.total_burnt - this.state.calorie.burnt)).display(),
              color: '#dc3545'
            }
          }
        }
      }
    }

    const navbarInfo = (
      <div className="text-center navbar-text col-md-12">
        <button class="btn btn btn-link text-light">
          <i className="nav-icon fas fa-chevron-circle-left" onClick={() => this.onChangeDate("prev")}/>
        </button>
        <span className="ml-5 mr-5">{(typeof this.state.date === "object") ? this.state.date.dateformat("date") : ''}</span>
        <button class="btn btn btn-link text-light">
          <i className="nav-icon fas fa-chevron-circle-right" onClick={() => this.onChangeDate("next")}/>
        </button>
      </div>
    )

    const calorieIntake = (idx) => {
      let {intake} = this.state
      let results = []
      for (let i = 0, l = intake[idx].length; i < l; i++) {
        results.push(
          <div className="row mt-3">
            <div className="col-md-1 my-auto">
              <div class={`custom-control custom-checkbox ${this.state.delete_status === idx ? '' : 'hide'}`}>
                <input autocomplete="off" type="checkbox" class="custom-control-input" id={`intake_${intake[idx][i].id}`} checked={this.state.data_delete.indexOf(intake[idx][i].id) > -1} onChange={() => this.toggleChecked(intake[idx][i].id)}/>
                <label class="custom-control-label" for={`intake_${intake[idx][i].id}`}/>
              </div>
            </div>
            <div className="col-md-8">
              <b>{intake[idx][i].name}</b> <br/>
              <span>{intake[idx][i].qty} serving</span>
            </div>
            <div className="col-md-3 my-auto text-right">{ parseFloat(intake[idx][i].calorie).qty(intake[idx][i].qty, "table") } KCAL</div>
          </div>
        )
      }

      return results
    }

    const totalCalorieIntake = (idx) => {
      let {intake} = this.state
      let total = 0
      for (let i = 0, l = intake[idx].length; i < l; i++) {
        total += parseFloat(intake[idx][i].calorie) * parseFloat(intake[idx][i].qty)
      }

      return (total === 0) ? <div /> : (
        <div className={`card-footer bg-info ${this.state.delete_status !== idx ? '' : 'hide'}`}>
          <div className="row">
            <div className="col-md-6">
              <b>Total &nbsp;</b>
            </div>
            <div className="col-md-6 my-auto text-right">
              <b>{total} KCAL</b>
            </div>
          </div>
        </div>
      )
    }

    const convertTimeActivity = (time) => {
      let times = parseInt(time)
      let minutes = (times >= 60) ? parseInt(times / 60) : 0
      let seconds = parseInt(times % 60)

      return `${(minutes > 0) ? minutes + ' min(s) ' : ''}${(seconds > 0) ? seconds + ' sec(s)' : ''}`
    }

    let activity = []
    let totalCalorieActivity = 0
    for (let i = 0, l = this.state.burnt.length; i < l; i++) {
      totalCalorieActivity += parseFloat(this.state.burnt[i].calorie)
      activity.push(
        <div className="row mt-3">
          <div className="col-md-1 my-auto">
            <div class={`custom-control custom-checkbox ${this.state.delete_status === 'exercise' ? '' : 'hide'}`}>
              <input autocomplete="off" type="checkbox" class="custom-control-input" id={`burnt_${this.state.burnt[i].id}`} checked={this.state.data_delete.indexOf(this.state.burnt[i].id) > -1} onChange={() => this.toggleChecked(this.state.burnt[i].id)}/>
              <label class="custom-control-label" for={`burnt_${this.state.burnt[i].id}`}/>
            </div>
          </div>
          <div className="col-md-8">
            <b>{this.state.burnt[i].label}</b> <br/>
            <span>{convertTimeActivity(this.state.burnt[i].duration)}</span>
          </div>
          <div className="col-md-3 my-auto text-right">{parseFloat(this.state.burnt[i].calorie).display("table")} KCAL</div>
        </div>
      )
    }


    return (
      <UserLayoutHoc navbarInfo={navbarInfo}>
        <div className="row pt-5">
          <div className="alert bg-info text-center col-md-6 offset-md-3" role="alert">
            <span>
              <b>Goal:</b> On the way of maintaining body weight
            </span>
          </div>

          <div className="col-md-8 mt-5">
            <div className="card">
              <div className="card-body row text-center">
                <h3 className="col-md-6">CALORIE INTAKE</h3>
                <h3 className="col-md-6">CALORIE BURNT</h3>
                <div className="col-md-6">
                  <Doughnut data={chart.intake} options={chart.intake.options}/>
                </div>
                <div className="col-md-6 bl-1">
                  <Doughnut data={chart.burnt} options={chart.burnt.options}/>
                </div>
                <h4 className="col-md-6 text-info mt-3">{Math.round(parseFloat(this.state.calorie.total_intake) * 100) / 100} KCAL</h4>
                <h4 className="col-md-6 text-info mt-3">{Math.round(parseFloat(this.state.calorie.total_burnt) * 100) / 100} KCAL</h4>
                <h6 className="col-md-6">GOAL</h6>
                <h6 className="col-md-6">GOAL</h6>
              </div>
            </div>
          </div>

          <Card size="col-md-4 mt-5" title="Nutrients">
            <div className="row nutrients-chart">
              <div className="col-md-5">
                <div class="circle-nutrion bg-info">{parseFloat(this.state.nutrient.carbohydrate).display()}g</div>
              </div>
              <h6 className="col-md-7 my-auto">Carbohydrate</h6>
              <div className="col-md-5 mt-3">
                <div class="circle-nutrion bg-info">{parseFloat(this.state.nutrient.protein).display()}g</div>
              </div>
              <h6 className="col-md-7 pt-3 my-auto">Protein</h6>
              <div className="col-md-5 mt-3">
                <div class="circle-nutrion bg-info">{parseFloat(this.state.nutrient.fat).display()}g</div>
              </div>
              <h6 className="col-md-7 pt-3 my-auto">Fat</h6>
            </div>
          </Card>

          <div className="col-md-6 mt-5">
            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">BREAKFAST</h3>
                <div className="card-tools">
                  <button className={`btn btn-tool ${(this.state.intake.breakfast.length !== 0 && this.state.delete_status !== 'breakfast') ? '' : 'hide'}`} onClick={() => this.onDeleteStatus('breakfast')}>
                    <i className="fas fa-trash-alt"/>
                  </button>
                  <div class={`custom-control custom-checkbox ${this.state.delete_status === 'breakfast' ? '' : 'hide'}`}>
                    <input autocomplete="off" type="checkbox" class="custom-control-input" id="intake_breakfast" checked={this.state.data_delete.length === this.state.intake.breakfast.length} onChange={() => this.checkedAll('breakfast')}/>
                    <label class="custom-control-label mt-1" for="intake_breakfast"/>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <h5 className={(this.state.intake.breakfast.length === 0) ? 'mt-3' : 'hide'}>
                  Recommended {parseInt(this.state.recommendation_calorie.breakfast) - 50} - {parseInt(this.state.recommendation_calorie.breakfast) + 50}
                </h5>
                {calorieIntake("breakfast")}
              </div>
              {totalCalorieIntake("breakfast")}
              <div className={`card-footer bg-info ${this.state.delete_status === 'breakfast' ? '' : 'hide'}`}>
                <div className="row">
                  <div className="col-md-6">
                    <button className="btn btn-light btn-block" type="button" onClick={() => this.onDeleteStatus('')}>CANCEL</button>
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-danger btn-block" type="button" onClick={() => this.onDelete(1)}>DELETE</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-5">
            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">LUNCH</h3>
                <div className="card-tools">
                  <button className={`btn btn-tool ${(this.state.intake.lunch.length !== 0 && this.state.delete_status !== 'lunch') ? '' : 'hide'}`} onClick={() => this.onDeleteStatus('lunch')}>
                    <i className="fas fa-trash-alt"/>
                  </button>
                  <div class={`custom-control custom-checkbox ${this.state.delete_status === 'lunch' ? '' : 'hide'}`}>
                    <input autocomplete="off" type="checkbox" class="custom-control-input" id="intake_lunch" checked={this.state.data_delete.length === this.state.intake.lunch.length} onChange={() => this.checkedAll('lunch')}/>
                    <label class="custom-control-label mt-1" for="intake_lunch"/>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <h5 className={(this.state.intake.lunch.length === 0) ? 'mt-3' : 'hide'}>
                  Recommended {parseInt(this.state.recommendation_calorie.lunch) - 50} - {parseInt(this.state.recommendation_calorie.lunch) + 50}
                </h5>
                {calorieIntake("lunch")}
              </div>
              {totalCalorieIntake("lunch")}
              <div className={`card-footer bg-info ${this.state.delete_status === 'lunch' ? '' : 'hide'}`}>
                <div className="row">
                  <div className="col-md-6">
                    <button className="btn btn-light btn-block" type="button" onClick={() => this.onDeleteStatus('')}>CANCEL</button>
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-danger btn-block" type="button" onClick={() => this.onDelete(2)}>DELETE</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-5">
            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">DINNER</h3>
                <div className="card-tools">
                  <button className={`btn btn-tool ${(this.state.intake.dinner.length !== 0 && this.state.delete_status !== 'dinner') ? '' : 'hide'}`} onClick={() => this.onDeleteStatus('dinner')}>
                    <i className="fas fa-trash-alt"/>
                  </button>
                  <div class={`custom-control custom-checkbox ${this.state.delete_status === 'dinner' ? '' : 'hide'}`}>
                    <input autocomplete="off" type="checkbox" class="custom-control-input" id="intake_dinner" checked={this.state.data_delete.length === this.state.intake.dinner.length} onChange={() => this.checkedAll('dinner')}/>
                    <label class="custom-control-label mt-1" for="intake_dinner"/>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <h5 className={(this.state.intake.dinner.length === 0) ? 'mt-3' : 'hide'}>
                  Recommended {parseInt(this.state.recommendation_calorie.dinner) - 50} - {parseInt(this.state.recommendation_calorie.dinner) + 50}
                </h5>
                {calorieIntake("dinner")}
              </div>
              {totalCalorieIntake("dinner")}
              <div className={`card-footer bg-info ${this.state.delete_status === 'dinner' ? '' : 'hide'}`}>
                <div className="row">
                  <div className="col-md-6">
                    <button className="btn btn-light btn-block" type="button" onClick={() => this.onDeleteStatus('')}>CANCEL</button>
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-danger btn-block" type="button" onClick={() => this.onDelete(3)}>DELETE</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-5">
            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">SNACK</h3>
                <div className="card-tools">
                  <button className={`btn btn-tool ${(this.state.intake.snack.length !== 0 && this.state.delete_status !== 'snack') ? '' : 'hide'}`} onClick={() => this.onDeleteStatus('snack')}>
                    <i className="fas fa-trash-alt"/>
                  </button>
                  <div class={`custom-control custom-checkbox ${this.state.delete_status === 'snack' ? '' : 'hide'}`}>
                    <input autocomplete="off" type="checkbox" class="custom-control-input" id="intake_snack" checked={this.state.data_delete.length === this.state.intake.snack.length} onChange={() => this.checkedAll('snack')}/>
                    <label class="custom-control-label mt-1" for="intake_snack"/>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <h5 className={(this.state.intake.snack.length === 0) ? 'mt-3' : 'hide'}>
                  Recommended {parseInt(this.state.recommendation_calorie.snack) - 50} - {parseInt(this.state.recommendation_calorie.snack) + 50}
                </h5>
                {calorieIntake("snack")}
              </div>
              {totalCalorieIntake("snack")}
              <div className={`card-footer bg-info ${this.state.delete_status === 'snack' ? '' : 'hide'}`}>
                <div className="row">
                  <div className="col-md-6">
                    <button className="btn btn-light btn-block" type="button" onClick={() => this.onDeleteStatus('')}>CANCEL</button>
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-danger btn-block" type="button" onClick={() => this.onDelete(4)}>DELETE</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-5">
            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">EXERCISE</h3>
                <div className="card-tools">
                  <button className={`btn btn-tool ${(this.state.burnt.length !== 0 && this.state.delete_status !== 'exercise') ? '' : 'hide'}`} onClick={() => this.onDeleteStatus('exercise')}>
                    <i className="fas fa-trash-alt"/>
                  </button>
                  <div class={`custom-control custom-checkbox ${this.state.delete_status === 'exercise' ? '' : 'hide'}`}>
                    <input autocomplete="off" type="checkbox" class="custom-control-input" id="intake_exercise" checked={this.state.data_delete.length === this.state.burnt.length} onChange={() => this.checkedAll('exercise')}/>
                    <label class="custom-control-label mt-1" for="intake_exercise"/>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <h5 className={(this.state.burnt.length === 0) ? 'mt-3' : 'hide'}>
                  You have no Exercise data yet.
                </h5>
                { activity }
              </div>
              <div className={`card-footer bg-info ${this.state.burnt.length !== 0 ? '' : 'hide'}`}>
                <div className="row">
                  <div className="col-md-6">
                    <b>Total &nbsp;</b>
                  </div>
                  <div className="col-md-6 my-auto text-right">
                    <b>{parseFloat(totalCalorieActivity).display()} KCAL</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 mt-5">
            <div className="alert bg-warning" role="alert">
              <span>
                <b>Note:</b> To add exercise data, <br/>
                you have to use the mobile version!
              </span>
            </div>
          </div>
        </div>
      </UserLayoutHoc>
    )
  }
}

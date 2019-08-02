import UserLayoutHoc from '../UserLayout/UserLayoutHoc'
import Card from '../Card'
import Alert from '../Alert'
import Modal from '../Modal'
import Chart from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
import Router from 'next/router'

export default class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      show: '',
      name: '',
      data: {
        id: -1,
        name: '',
        fat: 0,
        qty: 0,
        calorie: 0,
        protein: 0,
        carbohydrate: 0
      },
      foods: [],
      recent: [],
      meal_foods: [],
      alert: {
        add_danger: '',
        add_success: '',
        edit_danger: '',
        edit_success: '',
        delete_danger: '',
        delete_success: '',
      }
    }

    this.onSearch = this.onSearch.bind(this)
    this.onChangeFood = this.onChangeFood.bind(this)
    this.onAddFood = this.onAddFood.bind(this)
    this.onSelected = this.onSelected.bind(this)
    this.onSubmitMeal = this.onSubmitMeal.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  onChangeFood (event) {
    const {data} = this.state
    data[event.target.name] = event.target.value
    this.setState({ data })
  }

  async onAddFood () {
    let {meal_foods, data} = this.state

    meal_foods.push(data)
    data = {
      id: -1,
      name: '',
      fat: 0,
      qty: 0,
      calorie: 0,
      protein: 0,
      carbohydrate: 0
    }

    this.setState({meal_foods, data})
  }

  async onSearch () {
    if (this.state.data.name !== '') {
      const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
      const response = await fetch(`http://103.252.100.230/fact/member/food?name=${this.state.data.name}`, {headers})
      const json = await response.json()

      let {show, foods} = this.state
      show = (json.results.foods.length) ? 'show' : ''
      foods = json.results.foods

      this.setState({ show, foods })
    }
  }

  onSelected (idx) {
    let {data, foods, show} = this.state

    data.id = foods[idx].id
    data.name = foods[idx].name
    data.fat = foods[idx].fat
    data.qty = 1
    data.calorie = foods[idx].calorie
    data.protein = foods[idx].protein
    data.carbohydrate = foods[idx].carbohydrate
    show = ''

    this.setState({data, show})
  }

  async onSubmitMeal () {
    if (this.state.name !== '' && this.state.meal_foods.length) {
      let {alert} = this.state
      const body = JSON.stringify({
        name: this.state.name,
        food: this.state.meal_foods
      })
      const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
      let response = await fetch(`http://103.252.100.230/fact/member/meal`, {method: 'POST', body, headers})
      let json = await response.json()

      if (typeof json.message === 'undefined' || json.message !== 'Success') {
        window.scrollTo(0, 0)
        alert.add_danger = json.message
        await this.setState({alert})
      }
      else {
        window.scrollTo(0, 0)
        alert.add_success = "Add Meal, " + this.state.name + " — Success"
        const name = ''
        const data = {
          id: -1,
          name: '',
          fat: 0,
          qty: 0,
          calorie: 0,
          protein: 0,
          carbohydrate: 0
        }
        await this.setState({name, data, alert})
      }
    }
    else if (this.state.meal_foods.length === 0) {
      window.alert("Foods need to be added")
    }
    else {
      window.alert("Required fields can’t be empty")
    }
  }

  async onRefresh () {
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    let response = await fetch(`http://103.252.100.230/fact/member/food?name=all&category=0`, {headers})
    let json = await response.json()

    let {foods} = this.state
    foods = json.results.foods

    this.setState({ foods })

    response = await fetch(`http://103.252.100.230/fact/member/recent`, {headers})
    json = await response.json()

    let recent = []
    let haveRecent = []
    for (let i = 0, l = json.results.dates.length; i < l; i++) {
      if (recent.length === 5) break;
      for (let j = 0, k = json.results.foods[json.results.dates[i]].length; j < k; j++) {
        if (recent.length === 5) break;
        if (json.results.foods[json.results.dates[i]][j].type !== 'food') continue;
        if (haveRecent.indexOf(json.results.foods[json.results.dates[i]][j].id) >= 0) continue;
        recent.push(json.results.foods[json.results.dates[i]][j])
        haveRecent.push(json.results.foods[json.results.dates[i]][j].id)
      }
    }
    this.setState({ recent })

    var val = window.$('#search').val()
    for (let i = 0, l = this.state.foods.length; i < l; i++)
      if (parseInt(this.state.foods[i].id) === parseInt(val))
        this.onSelected(i)
  }

  componentDidMount() {
    this.onRefresh()
    let self = this
    window.$(document).ready(function() {
      window.$('#search').select2();
      window.$('#search').on('select2:select', function (e) {
        var data = window.$('#search').val();
        for (let i = 0, l = self.state.foods.length; i < l; i++)
          if (parseInt(self.state.foods[i].id) === parseInt(data))
            self.onSelected(i)
      });
    });
  }

  render() {
    const navbarInfo = (
      <h3 class="my-auto text-center">New Meal</h3>
    )

    let foodContent = []
    let totalCalorie = 0
    let totalCarbohydrate = 0
    let totalProtein = 0
    let totalFat = 0
    for (let i = 0, l = this.state.meal_foods.length; i < l; i++) {
      foodContent.push(
        <p class="mb-0">- {this.state.meal_foods[i].name} ({this.state.meal_foods[i].qty} serving)</p>
      )
      totalCalorie += parseFloat(this.state.meal_foods[i].qty) * parseFloat(this.state.meal_foods[i].calorie)
      totalCarbohydrate += parseFloat(this.state.meal_foods[i].qty) * parseFloat(this.state.meal_foods[i].carbohydrate)
      totalProtein += parseFloat(this.state.meal_foods[i].qty) * parseFloat(this.state.meal_foods[i].protein)
      totalFat += parseFloat(this.state.meal_foods[i].qty) * parseFloat(this.state.meal_foods[i].fat)
    }

    const dropdownFoods = []
    for (let i = 0, l = this.state.foods.length; i < l; i++) {
      dropdownFoods.push(<option value={this.state.foods[i].id}>{this.state.foods[i].name}</option>)
    }

    let recents = []
    for (let i = 0, l = this.state.recent.length; i < l; i++) {
      recents.push(
        <span>
          <button class="btn btn-info badge" onClick={() => this.testing(this.state.recent[i].id)}>{this.state.recent[i].name}</button> &nbsp;
        </span>
      )
    }

    return (
      <UserLayoutHoc navbarInfo={navbarInfo}>
        <div className="row pt-5">
          <div className="offset-md-1 col-md-10">
            <Alert type="danger" component={this} attribute="add_danger"/>
            <Alert type="success" component={this} attribute="add_success"/>
            <div className="card">
              <div className="card-body row">
                <div className="col-md-12">
                  <div className="form-group row">
                    <label class="col-form-label col-sm-2">Meal Name:</label>
                    <div class="col-sm-4">
                      <input autocomplete="off" type="text" className="form-control" placeholder="Enter meal name" maxLength={40} required onChange={(event) => !event.target.value.validate() || this.setState({name: event.target.value})} value={this.state.name}/>
                      <small class="form-text text-muted text-right">*required</small>
                    </div>
                  </div>
                </div>

                <div class="col-sm-6">
                  <div class="form-group col-sm-12 pl-0 mb-0 pb-3 pr-0">
                    <label>Contains of:</label>
                    <p>{foodContent}</p>
                    <button className="btn btn-info" data-toggle="modal" data-target="#add">
                      <i className="fas fa-plus"/> ADD FOOD
                    </button>
                  </div>
                </div>

                <div class="col-sm-6">
                  <label>Meal Information</label>
                  <div class="card">
                    <div class="card-body row">
                      <div className="col-md-4">Calories</div>
                      <div className="col-md-1">:</div>
                      <div className="col-md-7 text-right">{totalCalorie.toFixed(2)} kcal</div>

                      <div className="col-md-4">Carbohydrate</div>
                      <div className="col-md-1">:</div>
                      <div className="col-md-7 text-right">{totalCarbohydrate.toFixed(2)} g</div>

                      <div className="col-md-4">Protein</div>
                      <div className="col-md-1">:</div>
                      <div className="col-md-7 text-right">{totalProtein.toFixed(2)} g</div>

                      <div className="col-md-4">Fat</div>
                      <div className="col-md-1">:</div>
                      <div className="col-md-7 text-right">{totalFat.toFixed(2)} g</div>
                    </div>
                  </div>
                </div>
                <div class="offset-md-3 col-md-3 mt-5">
                  <button className="btn btn-info btn-block" onClick={this.onSubmitMeal}>SAVE</button>
                </div>
                <div class="col-md-3 mt-5">
                  <button className="btn btn-outline-info btn-block" onClick={() => Router.back()}>CANCEL</button>
                </div>
              </div>
            </div>
          </div>

          <Modal id="add" title="Add Food to Meal" size="modal-xl">
            <div className="modal-body row">
              <div className="col-md-12">
                <form className="form-group row" onSubmit={this.onSearch}>
                  <label class="col-form-label col-md-2">Food:</label>
                  <div class="col-md-4">
                    <select className="form-control bl-0" id="search">
                      {dropdownFoods}
                    </select>
                  </div>
                </form>
              </div>

              <div class="col-sm-12">
                <div class="form-group col-sm-6 pl-0">
                  <label>Recent:</label>
                  <p class="form-control">{recents}</p>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="form-group col-sm-4 pl-0 bb-2 mb-0 pb-3 pr-0">
                  <label>Calories Amount:</label>
                  <div class="input-group">
                    <input autocomplete="off" type="number" class="form-control br-0" value={this.state.data.qty} min="1" onChange={this.onChangeFood} name="qty"/>
                    <div class="input-group-prepend">
                      <div class="input-group-text right">serving</div>
                    </div>
                  </div>
                </div>
                <p>Total: &nbsp;<b style={{ fontSize: "1.5rem" }}>{ (parseFloat(this.state.data.qty) * parseFloat(this.state.data.calorie)).toFixed(2) }</b> KCAL</p>
              </div>

              <div class="col-sm-6">
                <label>Nutrition Informations</label>
                <div className="row">
                  <div className="col-md-4">
                    <div class="circle-nutrion bg-info">{ (parseFloat(this.state.data.qty) * parseFloat(this.state.data.carbohydrate)).toFixed(2) }g</div>
                    <h6 className="text-center mt-3">Carbohydrate</h6>
                  </div>
                  <div className="col-md-4">
                    <div class="circle-nutrion bg-info">{ (parseFloat(this.state.data.qty) * parseFloat(this.state.data.protein)).toFixed(2) }g</div>
                    <h6 className="text-center mt-3">Protein</h6>
                  </div>
                  <div className="col-md-4">
                    <div class="circle-nutrion bg-info">{ (parseFloat(this.state.data.qty) * parseFloat(this.state.data.fat)).toFixed(2) }g</div>
                    <h6 className="text-center mt-3">Fat</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mt-5">
                <button className="btn btn-info btn-block" onClick={this.onAddFood}>SAVE AND ADD AGAIN</button>
              </div>
              <div class="col-md-6 mt-5">
                <button className="btn btn-outline-info btn-block" onClick={this.onAddFood} data-dismiss="modal">ONLY SAVE THIS ONE</button>
              </div>
            </div>
          </Modal>
        </div>
      </UserLayoutHoc>
    )
  }
}

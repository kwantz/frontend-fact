import UserLayoutHoc from '../UserLayout/UserLayoutHoc'
import Card from '../Card'
import Alert from '../Alert'
import Modal from '../Modal'
import Chart from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
import Link from 'next/link';

export default class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      show: '',
      id: '',
      name: '',
      foods: [],
      meals: [],
      category_intake: 1
    }

    this.onSearch = this.onSearch.bind(this)
    this.onSelected = this.onSelected.bind(this)
    this.onIntakeMeal = this.onIntakeMeal.bind(this)
  }

  async onSearch () {
    if (this.state.name !== '') {
      const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
      const response = await fetch(`http://103.252.100.230:8000/fact/member/meal?name=${this.state.name}`, {headers})
      const json = await response.json()

      let {show, meals} = this.state
      show = (json.results.meals.length) ? 'show' : ''
      meals = json.results.meals

      this.setState({ show, meals })
    }
  }

  onSelected (idx) {
    let {id, name, foods, meals, show} = this.state

    id = meals[idx].id
    name = meals[idx].name
    foods = meals[idx].meal_detail
    show = ''

    this.setState({id, name, foods, show})
  }

  async onIntakeMeal (back = false) {
    const body = JSON.stringify({
      id: this.state.id,
      category_intake: this.state.category_intake
    })
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    let response = await fetch(`http://103.252.100.230:8000/fact/member/intake/meal`, {method: 'POST', body, headers})
    let json = await response.json()

    if (json.message === "Success") {
      if (back === true) return window.location.href = "/dashboard/user/diary"
      let id = ''
      let name = ''
      let foods = []
      let meals = []
      let category_intake = 1
      this.setState({id, name, foods, meals, category_intake})
    }
  }

  render() {
    const navbarInfo = (
      <div class="form-group row my-auto">
        <label class="offset-sm-3 col-sm-2 col-form-label">Category:</label>
        <div class="col-sm-4">
          <select class="form-control" name="category_intake" onChange={(event) => this.setState({category_intake: event.target.value})} value={this.state.category_intake}>
            <option value="1">Breakfast</option>
            <option value="2">Lunch</option>
            <option value="3">Dinner</option>
            <option value="4">Snack</option>
          </select>
        </div>
      </div>
    )

    let foodContent = []
    let totalCalorie = 0
    let totalCarbohydrate = 0
    let totalProtein = 0
    let totalFat = 0
    for (let i = 0, l = this.state.foods.length; i < l; i++) {
      foodContent.push(
        <p class="mb-0">- {this.state.foods[i].name} ({this.state.foods[i].qty} serving)</p>
      )
      totalCalorie += parseFloat(this.state.foods[i].qty) * parseFloat(this.state.foods[i].calorie)
      totalCarbohydrate += parseFloat(this.state.foods[i].qty) * parseFloat(this.state.foods[i].carbohydrate)
      totalProtein += parseFloat(this.state.foods[i].qty) * parseFloat(this.state.foods[i].protein)
      totalFat += parseFloat(this.state.foods[i].qty) * parseFloat(this.state.foods[i].fat)
    }

    const dropdownFoods = []
    for (let i = 0, l = this.state.meals.length; i < l; i++) {
      dropdownFoods.push(
        <span class="dropdown-item" onClick={() => this.onSelected(i)}>
          {this.state.meals[i].name}
        </span>
      )
    }

    return (
      <UserLayoutHoc navbarInfo={navbarInfo}>
        <div className="row pt-5">
          <div className="offset-md-1 col-md-10">
            <div className="form-group row">
              <label class="col-form-label col-sm-1 pt-0">Add:</label>
              <div class="col-sm-1">
                <div class="custom-control custom-radio custom-control-inline">
                  <input class="custom-control-input" type="radio" name="gridRadios" id="gridRadios1" value="option1"/>
                  <label class="custom-control-label" for="gridRadios1">
                    <Link href="/dashboard/user/intake?status=meal">
                      <a class="text-dark">Food</a>
                    </Link>
                  </label>
                </div>
              </div>
              <div className="col-sm-1">
                <div class="custom-control custom-radio custom-control-inline">
                  <input class="custom-control-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" checked/>
                  <label class="custom-control-label" for="gridRadios2">
                    Meal
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="offset-md-1 col-md-10">
            <div className="card">
              <div className="card-body row">
                <div className="col-md-12">
                  <div className="form-group row">
                    <div class="col-sm-6">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-search"/>
                          </span>
                        </div>
                        <input type="text" className="form-control bl-0" placeholder="Search by food name here..." onChange={(event) => this.setState({name: event.target.value})} value={this.state.name}/>
                        <div className="input-group-append">
                          <button type="button" className="btn btn-info" onClick={this.onSearch}>Submit</button>
                        </div>
                        <div class={`dropdown-menu col-md-12 elevation-2 ${this.state.show}`}>
                          {dropdownFoods}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-sm-6">
                  <div class="form-group">
                    <label>Recent:</label>
                    <p class="form-control">
                      <button class="btn btn-info badge">Nasi Kotak</button> &nbsp;
                    </p>
                  </div>

                  <div class="form-group col-sm-12 pl-0 mb-0 pb-3 pr-0">
                    <label>Contains of:</label>
                    <p>{foodContent}</p>
                  </div>
                </div>

                <div class="col-sm-6">
                  <div class="mb-3">
                    <label class="text-block">Don't have the meal you want?</label>
                    <Link href="/dashboard/user/intake?status=add-meal">
                      <a className="btn btn-info">
                        <i className="fas fa-plus"/> ADD NEW
                      </a>
                    </Link>
                  </div>

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

                <div class="col-md-6 mt-5">
                  <button className="btn btn-info btn-block" onClick={() => this.onIntakeMeal()}>SAVE AND ADD AGAIN</button>
                </div>

                <div class="col-md-6 mt-5">
                  <button className="btn btn-outline-info btn-block" onClick={() => this.onIntakeMeal(true)}>SAVE AND GO TO DIARY</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayoutHoc>
    )
  }
}

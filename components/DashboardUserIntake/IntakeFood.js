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
      data: {
        id: -1,
        name: '',
        fat: 0,
        qty: 0,
        calorie: 0,
        protein: 0,
        carbohydrate: 0,
        category: 0,
        category_intake: 1
      },
      foods: [],
      add: {
        name: '',
        fat: 0,
        calorie: 0,
        protein: 0,
        carbohydrate: 0,
        category: -1
      },
      categories: [],
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
    this.onSubmitIntake = this.onSubmitIntake.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.onSelected = this.onSelected.bind(this)
    this.onAddSubmit = this.onAddSubmit.bind(this)
    this.onAddChange = this.onAddChange.bind(this)
  }

  onChangeFood (event) {
    const {data} = this.state
    data[event.target.name] = event.target.value
    this.setState({ data })
  }

  async onSubmitIntake (back = false) {
    const body = JSON.stringify(this.state.data)
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    const response = await fetch('http://103.252.100.230:8000/fact/member/intake/food', {method: 'POST', body, headers})
    const json = await response.json()

    if (json.message === "Success") {
      if (back === true) return window.location.href = "/dashboard/user/diary"
      let data = {
        id: -1,
        name: '',
        fat: 0,
        qty: 0,
        calorie: 0,
        protein: 0,
        carbohydrate: 0,
        category: 0,
        category_intake: 1
      }

      this.setState({data})
    }
  }

  async onSearch () {
    if (this.state.data.name !== '') {
      const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
      const response = await fetch(`http://103.252.100.230:8000/fact/member/food?name=${this.state.data.name}&category=${this.state.data.category}`, {headers})
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

  async onRefresh () {
    const response = await fetch(`http://103.252.100.230:8000/fact/food-category?name=all`)
    const json = await response.json()

    const categories = json.results.categories

    const data = this.state.add
    data.category = categories[0].id
    this.setState({ categories, add: data })
  }

  async onAddSubmit () {
    let {alert} = this.state
    const body = JSON.stringify(this.state.add)
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    let response = await fetch(`http://103.252.100.230:8000/fact/member/food`, {method: 'POST', body, headers})
    let json = await response.json()

    if (typeof json.message === 'undefined' || json.message !== 'Success') {
      alert.add_danger = "500 — Internal Server Error"
      await this.setState({alert})
    }
    else {
      alert.add_success = "Add Food, " + this.state.add.name + " — Success"
      const add = {
        name: '',
        fat: 0,
        calorie: 0,
        protein: 0,
        carbohydrate: 0,
        category: this.state.categories[0].id
      }

      await this.setState({add, alert})
      this.onRefresh()
    }
  }

  onAddChange (event) {
    const data = this.state.add
    data[event.target.name] = event.target.value
    this.setState({ add: data })
  }

  componentDidMount () {
    this.onRefresh()
  }

  render() {
    const navbarInfo = (
      <div class="form-group row my-auto">
        <label class="offset-sm-3 col-sm-2 col-form-label">Category:</label>
        <div class="col-sm-4">
          <select class="form-control" name="category_intake" onChange={this.onChangeFood} value={this.state.data.category_intake}>
            <option value="1">Breakfast</option>
            <option value="2">Lunch</option>
            <option value="3">Dinner</option>
            <option value="4">Snack</option>
          </select>
        </div>
      </div>
    )

    const options = []
    for (let i = 0, l = this.state.categories.length; i < l; i++) {
      const category = this.state.categories[i];
      options.push(<option value={category.id}>{category.name}</option>)
    }

    const dropdownFoods = []
    for (let i = 0, l = this.state.foods.length; i < l; i++) {
      dropdownFoods.push(
        <span class="dropdown-item" onClick={() => this.onSelected(i)}>
          {this.state.foods[i].name}
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
                  <input class="custom-control-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
                  <label class="custom-control-label btn-link text-dark" for="gridRadios1">Food</label>
                </div>
              </div>
              <div className="col-sm-1">
                <div class="custom-control custom-radio custom-control-inline">
                  <input class="custom-control-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
                  <label class="custom-control-label" for="gridRadios2">
                    <Link href="/dashboard/user/intake?status=meal">
                      <a class="text-dark">Meal</a>
                    </Link>
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
                    <label class="col-form-label col-sm-2">Food Category:</label>
                    <div class="col-sm-4">
                      <select class="form-control" name="category" onChange={this.onChangeFood} value={this.state.data.category}>
                        <option value="0">All Category</option>
                        {options}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div class="col-sm-6">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-search"/>
                          </span>
                        </div>
                        <input type="text" className="form-control bl-0" placeholder="Search by food name here..." name="name" onChange={this.onChangeFood} value={this.state.data.name}/>
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
                      <button class="btn btn-info badge">Fried Noodles</button> &nbsp;
                      <button class="btn btn-info badge">White Rice</button> &nbsp;
                      <button class="btn btn-info badge">Bread</button> &nbsp;
                    </p>
                  </div>

                  <div class="form-group col-sm-4 pl-0 bb-2 mb-0 pb-3 pr-0">
                    <label>Calories Amount:</label>
                    <div class="input-group">
                      <input type="number" class="form-control br-0" value={this.state.data.qty} min="1" onChange={this.onChangeFood} name="qty"/>
                      <div class="input-group-prepend">
                        <div class="input-group-text right">serving</div>
                      </div>
                    </div>
                  </div>
                  <p>Total: &nbsp;<b style={{ fontSize: "1.5rem" }}>{ parseFloat(this.state.data.qty) * parseFloat(this.state.data.calorie) }</b> KCAL</p>
                </div>

                <div class="col-sm-6">
                  <div class="mb-3">
                    <label class="text-block">Don't have the food you want?</label>
                    <button className="btn btn-info" data-toggle="modal" data-target="#add">
                      <i className="fas fa-plus"/> ADD NEW
                    </button>
                  </div>

                  <label>Nutrition Informations</label>
                  <div className="row">
                    <div className="col-md-4">
                      <div class="circle-nutrion bg-info">{ parseFloat(this.state.data.qty) * parseFloat(this.state.data.carbohydrate) }g</div>
                      <h6 className="text-center mt-3">Carbohydrate</h6>
                    </div>
                    <div className="col-md-4">
                      <div class="circle-nutrion bg-info">{ parseFloat(this.state.data.qty) * parseFloat(this.state.data.protein) }g</div>
                      <h6 className="text-center mt-3">Protein</h6>
                    </div>
                    <div className="col-md-4">
                      <div class="circle-nutrion bg-info">{ parseFloat(this.state.data.qty) * parseFloat(this.state.data.fat) }g</div>
                      <h6 className="text-center mt-3">Fat</h6>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 mt-5">
                  <button className="btn btn-info btn-block" onClick={() => this.onSubmitIntake()}>SAVE AND ADD AGAIN</button>
                </div>
                <div class="col-md-6 mt-5">
                  <button className="btn btn-outline-info btn-block" onClick={() => this.onSubmitIntake(true)}>SAVE AND GO TO DIARY</button>
                </div>
              </div>
            </div>
          </div>


          <Modal id="add" title="Add Custom Food">
            <Alert type="danger" component={this} attribute="add_danger"/>
            <Alert type="success" component={this} attribute="add_success"/>
            <div className="modal-body">
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Food Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" placeholder="Enter food" required name="name" value={this.state.add.name} onChange={this.onAddChange}/>
                  <small class="form-text text-muted text-right">*required</small>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Category</label>
                <div class="col-sm-9">
                  <select class="form-control" name="category" value={this.state.add.category} onChange={this.onAddChange}>
                    {options}
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Calories</label>
                <div class="col-sm-5">
                  <input type="number" class="form-control" placeholder="Enter calories" min="0" name="calorie" value={this.state.add.calorie} onChange={this.onAddChange}/>
                  <small class="form-text text-muted text-right">*required</small>
                </div>
                <span class="col-sm-4 col-form-label">
                  (KCAL per serving)
                </span>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Carbohydrate</label>
                <div class="col-sm-5">
                  <input type="number" class="form-control" placeholder="Enter carbohydrate" min="0" name="carbohydrate" value={this.state.add.carbohydrate} onChange={this.onAddChange}/>
                </div>
                <span class="col-sm-4 col-form-label">
                  (g per serving)
                </span>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Protein</label>
                <div class="col-sm-5">
                  <input type="number" class="form-control" placeholder="Enter protein" min="0" name="protein" value={this.state.add.protein} onChange={this.onAddChange}/>
                </div>
                <span class="col-sm-4 col-form-label">
                  (g per serving)
                </span>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Fat</label>
                <div class="col-sm-5">
                  <input type="number" class="form-control" placeholder="Enter fat" min="0" name="fat" value={this.state.add.fat} onChange={this.onAddChange}/>
                </div>
                <span class="col-sm-4 col-form-label">
                  (g per serving)
                </span>
              </div>

              <div class="offset-md-6 col-md-6">
                <button type="button" class="btn btn-info" onClick={this.onAddSubmit}>SAVE</button>
              </div>
            </div>
          </Modal>
        </div>
      </UserLayoutHoc>
    )
  }
}

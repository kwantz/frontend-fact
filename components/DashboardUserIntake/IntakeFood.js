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
      recent: [],
      foods: [],
      add: {
        name: '',
        fat: 0,
        calorie: 0,
        protein: 0,
        carbohydrate: 0,
        category: 1
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
    this.onSearchFocusIn = this.onSearchFocusIn.bind(this)
    this.onSearchFocusOut = this.onSearchFocusOut.bind(this)
    this.testing = this.testing.bind(this)
  }

  async testing(id) {
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    const response = await fetch(`http://103.252.100.230/fact/member/food?name=all&category=0`, {headers})
    const json = await response.json()

    let {data, foods} = this.state
    data.category = 0
    foods = json.results.foods

    this.setState({ data, foods })

    window.$('#search').select2()
    window.$('#search').val(id).trigger('change');  
    var val = window.$('#search').val()

    for (let i = 0, l = json.results.foods.length; i < l; i++)
      if (json.results.foods[i].id === id)
        this.onSelected(i)
  }

  onSearchFocusIn() {
    this.setState({ show: 'show' })
  }

  onSearchFocusOut() {
    this.setState({ show: '', foods: [] })
  }

  onChangeFood (event) {
    const {data} = this.state
    data[event.target.name] = event.target.value
    this.setState({ data })
  }

  async onSubmitIntake (back = false) {
    const body = JSON.stringify(this.state.data)
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    const response = await fetch('http://103.252.100.230/fact/member/intake/food', {method: 'POST', body, headers})
    const json = await response.json()

    if (json.message === "Success") {
      if (back === true) return window.location.href = "/dashboard/user/diary"
      window.alert("Saved")
    }
  }

  async onSearch (event) {
    const {data} = this.state
    data[event.target.name] = event.target.value
    this.setState({ data })

    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    const response = await fetch(`http://103.252.100.230/fact/member/food?name=all&category=${event.target.value}`, {headers})
    const json = await response.json()

    let {foods} = this.state
    foods = json.results.foods

    this.setState({ foods })

    window.$('#search').select2()
    var val = window.$('#search').val()

    for (let i = 0, l = json.results.foods.length; i < l; i++)
      if (parseInt(json.results.foods[i].id) === parseInt(val))
        this.onSelected(i)
  }

  onSelected (idx) {
    let {data, foods} = this.state

    data.id = foods[idx].id
    data.name = foods[idx].name
    data.fat = foods[idx].fat
    data.qty = 1
    data.calorie = foods[idx].calorie
    data.protein = foods[idx].protein
    data.carbohydrate = foods[idx].carbohydrate

    this.setState({data})
  }

  async onRefresh () {
    let response = await fetch(`http://103.252.100.230/fact/food-category?name=all`)
    let json = await response.json()

    const categories = json.results.categories

    const data = this.state.add
    data.category = categories[0].id
    this.setState({ categories, add: data })

    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    response = await fetch(`http://103.252.100.230/fact/member/food?name=all&category=${this.state.data.category}`, {headers})
    json = await response.json()

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

  async onAddSubmit () {
    let {alert} = this.state
    const body = JSON.stringify(this.state.add)
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    let response = await fetch(`http://103.252.100.230/fact/member/food`, {method: 'POST', body, headers})
    let json = await response.json()

    if (typeof json.message === 'undefined' || json.message !== 'Success') {
      window.scrollTo(0, 0)
      alert.add_danger = json.message
      await this.setState({alert})
    }
    else {
      window.scrollTo(0, 0)
      alert.add_success = "Add Food, " + this.state.add.name + " — Success"
      const add = {
        name: '',
        fat: 0,
        calorie: 0,
        protein: 0,
        carbohydrate: 0,
        category: 1
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
            <div className="form-group row">
              <label class="col-form-label col-sm-1 pt-0">Add:</label>
              <div class="col-sm-1">
                <div class="custom-control custom-radio custom-control-inline">
                  <input autocomplete="off" class="custom-control-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
                  <label class="custom-control-label btn-link text-dark" for="gridRadios1">Food</label>
                </div>
              </div>
              <div className="col-sm-1">
                <div class="custom-control custom-radio custom-control-inline">
                  <input autocomplete="off" class="custom-control-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
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
                      <select class="form-control" name="category" onChange={this.onSearch} value={this.state.data.category}>
                        <option value="0">All Category</option>
                        {options}
                      </select>
                    </div>
                  </div>

                  <form className="form-group row" onSubmit={this.onSearch}>
                    <label class="col-form-label col-sm-2">Food:</label>
                    <div class="col-sm-4">
                      <select className="form-control bl-0" id="search">
                        {dropdownFoods}
                      </select>
                    </div>
                  </form>
                </div>

                <div class="col-sm-6">
                  <div class="form-group">
                    <label>Recent:</label>
                    <p class="form-control">{recents}</p>
                  </div>

                  <div class="form-group col-sm-4 pl-0 bb-2 mb-0 pb-3 pr-0">
                    <label>Calories Amount:</label>
                    <div class="input-group">
                      <input autocomplete="off" type="number" class="form-control br-0" value={this.state.data.qty} min="1" onChange={this.onChangeFood} name="qty"/>
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
                  <input autocomplete="off" type="text" class="form-control" placeholder="Enter food" required name="name" value={this.state.add.name} onChange={this.onAddChange}/>
                  <small class="form-text text-muted text-right">*required</small>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Calories</label>
                <div class="col-sm-5">
                  <input autocomplete="off" type="number" class="form-control" placeholder="Enter calories" min="0" name="calorie" value={this.state.add.calorie} onChange={this.onAddChange}/>
                  <small class="form-text text-muted text-right">*required</small>
                </div>
                <span class="col-sm-4 col-form-label">
                  (KCAL per serving)
                </span>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Carbohydrate</label>
                <div class="col-sm-5">
                  <input autocomplete="off" type="number" class="form-control" placeholder="Enter carbohydrate" min="0" name="carbohydrate" value={this.state.add.carbohydrate} onChange={this.onAddChange}/>
                </div>
                <span class="col-sm-4 col-form-label">
                  (g per serving)
                </span>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Protein</label>
                <div class="col-sm-5">
                  <input autocomplete="off" type="number" class="form-control" placeholder="Enter protein" min="0" name="protein" value={this.state.add.protein} onChange={this.onAddChange}/>
                </div>
                <span class="col-sm-4 col-form-label">
                  (g per serving)
                </span>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Fat</label>
                <div class="col-sm-5">
                  <input autocomplete="off" type="number" class="form-control" placeholder="Enter fat" min="0" name="fat" value={this.state.add.fat} onChange={this.onAddChange}/>
                </div>
                <span class="col-sm-4 col-form-label">
                  (g per serving)
                </span>
              </div>

              <div class="offset-md-6 col-md-6">
                <button type="button" class="btn btn-info btn-block" onClick={this.onAddSubmit}>SAVE</button>
              </div>
            </div>
          </Modal>
        </div>
      </UserLayoutHoc>
    )
  }
}

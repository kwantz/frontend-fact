import AdminLayoutHoc from '../Layout/AdminLayoutHoc';
import Alert from '../Alert';
import Link from 'next/link';
import Router from 'next/router'
import '../../libraries'

export default class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {
        fat: 0,
        name: '',
        calorie: 0,
        protein: 0,
        category: [],
        carbohydrate: 0
      },
      categories: [],
      alert: {
        add_danger: '',
        add_success: '',
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  async onSubmit (event) {
    event.preventDefault()

    const {alert, data} = this.state

    data.name = data.name.trim()
    data.calorie = Math.min(Math.max(data.calorie, 0), 5000)
    data.fat = Math.min(Math.max(data.fat, 0), 1000)
    data.protein = Math.min(Math.max(data.protein, 0), 1000)
    data.carbohydrate = Math.min(Math.max(data.carbohydrate, 0), 1000)

    const body = JSON.stringify(data)
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    const response = await fetch('http://103.252.100.230/fact/food', {method: 'POST', body, headers})
    const json = await response.json()

    if (json.message !== 'Success') {
      window.scrollTo(0, 0)
      alert.add_danger = json.message
      await this.setState({alert})
    }
    else {
      window.scrollTo(0, 0)
      alert.add_success = "Add Food, " + this.state.data.name + " — Success"
      const data = {
        fat: '',
        name: '',
        calorie: '',
        protein: '',
        category: '',
        carbohydrate: ''
      }

      await this.setState({data, alert})
    }
  }

  onChange (event) {
    const data = this.state.data
    if (event.target.name === 'name') {
      if (event.target.value.validate()) {
        data[event.target.name] = event.target.value
        this.setState({ data })
      }
      return
    }
    if (event.target.name === 'calorie') {
      let numb = parseFloat(event.target.value)
      if (event.target.value === '' || (!isNaN(numb))) {
        data[event.target.name] = Math.min(Math.max(numb, 0), 5000)
        this.setState({ data })
      }
      return
    }
    if (['fat', 'protein', 'carbohydrate'].includes(event.target.name)) {
      let numb = parseFloat(event.target.value)
      if (event.target.value === '' || (!isNaN(numb))) {
        data[event.target.name] = Math.min(Math.max(numb, 0), 1000)
        this.setState({ data })
      }
      return
    }
    if (event.target.name === 'category') {
      // console.log(event.target.selectedOptions, event.target.selectedOptions[0])
      let result = Array.from(event.target.selectedOptions).map(option => option.value)
      data[event.target.name] = result
      this.setState({ data })
      return
    }

    data[event.target.name] = event.target.value
    this.setState({ data })
  }

  async onRefresh () {
    const response = await fetch(`http://103.252.100.230/fact/food-category?name=all`)
    const json = await response.json()

    const categories = json.results.categories
    const data = this.state.data
    data.category = categories[0].id
    this.setState({ data, categories })
  }

  componentDidMount () {
    this.onRefresh()
  }

  render () {
    const options = []
    for (let i = 0, l = this.state.categories.length; i < l; i++) {
      const category = this.state.categories[i];
      options.push(<option value={category.id}>{category.name}</option>)
    }

    return (
      <AdminLayoutHoc contentTitle={'Add Food'} contentBreadcrumb={["Home", "Food", "Food Lists", "Add"]}>
        <Alert type="danger" component={this} attribute="add_danger"/>
        <Alert type="success" component={this} attribute="add_success"/>
        <form className="card col-md-8 offset-md-2" onSubmit={this.onSubmit}>
          <div className="card-body">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Food Name</label>
              <div className="col-sm-9">
                <input autocomplete="off" name="name" value={this.state.data.name} type="text" className="form-control" placeholder="Enter Food Name" onChange={this.onChange} required/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Category</label>
              <div className="col-sm-9">
                <select name="category" className="form-control" onChange={this.onChange} required multiple>
                  {options}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Total Calories (in kcal)</label>
              <div className="col-sm-9">
                <input autocomplete="off" name="calorie" value={this.state.data.calorie} type="number" min="0" max="5000" className="form-control" placeholder="Enter Amount of Calories" onChange={this.onChange} required/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Total Carbohydrate (in g)</label>
              <div className="col-sm-9">
                <input autocomplete="off" name="carbohydrate" value={this.state.data.carbohydrate} type="number" min="0" max="1000" className="form-control" placeholder="Enter Amount of Carbohydrate" onChange={this.onChange} required/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Total Protein (in g)</label>
              <div className="col-sm-9">
                <input autocomplete="off" name="protein" value={this.state.data.protein} type="number" min="0" max="1000" className="form-control" placeholder="Enter Amount of Protein" onChange={this.onChange} required/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Total Fat (in g)</label>
              <div className="col-sm-9">
                <input autocomplete="off" name="fat" value={this.state.data.fat} type="number" min="0" max="1000" className="form-control" placeholder="Enter Amount of Fat" onChange={this.onChange} required/>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-5">
                <button type="submit" className="btn btn-info btn-block">Save</button>
              </div>
              <div className="col-md-5 offset-md-2">
                <button type="button" className="btn btn-light btn-block" onClick={() => Router.back()}>Cancel</button>
              </div>
            </div>
          </div>
        </form>
      </AdminLayoutHoc>
    )
  }
}

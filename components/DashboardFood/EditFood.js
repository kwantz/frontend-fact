import AdminLayoutHoc from '../Layout/AdminLayoutHoc';
import Alert from '../Alert';
import Link from 'next/link';
import Router from 'next/router'
import { withRouter } from 'next/router';

class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {
        fat: '',
        name: '',
        calorie: '',
        protein: '',
        category: [],
        carbohydrate: ''
      },
      categories: [],
      alert: {
        edit_danger: '',
        edit_success: '',
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  async onSubmit (event) {
    event.preventDefault()

    const alert = this.state.alert
    const body = JSON.stringify(this.state.data)
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    const response = await fetch('http://103.252.100.230/fact/food/' + this.props.router.query.id, {method: 'PUT', body, headers})
    const json = await response.json()

    if (typeof json.message === 'undefined' || json.message !== 'Success') {
      window.scrollTo(0, 0)
      alert.edit_danger = json.message
      await this.setState({alert})
    }
    else {
      window.scrollTo(0, 0)
      alert.edit_success = "Edit Food, " + this.state.data.name + " — Success"
      await this.setState({alert})
    }
  }
// TODO
// [ ] Delfat select option is object, not int array
  onChange (event) {
    const data = this.state.data
    if (event.target.name === 'name') {
      if (event.target.value === '' || /^[A-Z]+$/.test(event.target.value.trim()) || /^[A-Z][a-zA-Z0-9 ]+$/.test(event.target.value.trim())) {
        data[event.target.name] = event.target.value
        this.setState({ data })
      }
      return
    }
    if (['calorie', 'fat', 'protein', 'carbohydrate'].includes(event.target.name)) {
      let numb = parseFloat(event.target.value)
      if (event.target.value === '' || (!isNaN(numb))) {
        data[event.target.name] = Math.max(numb, 0)
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
    let response = await fetch(`http://103.252.100.230/fact/food-category?name=all`)
    let json = await response.json()

    const categories = json.results.categories

    response = await fetch(`http://103.252.100.230/fact/food/` + this.props.router.query.id)
    json = await response.json()

    const data = json.results
    this.setState({ data, categories })
  }

  componentDidMount () {
    this.onRefresh()
  }

  render () {
    const options = []
    for (let i = 0, l = this.state.categories.length; i < l; i++) {
      const category = this.state.categories[i];
      options.push(<option value={category.id} selected={this.state.data.category.map(x => x.id).indexOf(category.id) !== -1}>{category.name}</option>)
    }

    return (
      <AdminLayoutHoc contentTitle={'Edit Food'} contentBreadcrumb={["Home", "Food", "Food Lists", "Edit"]}>
        <Alert type="danger" component={this} attribute="edit_danger"/>
        <Alert type="success" component={this} attribute="edit_success"/>
        <form className="card" onSubmit={this.onSubmit}>
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
                <input autocomplete="off" name="calorie" value={this.state.data.calorie} type="number" className="form-control" placeholder="Enter Amount of Calories" onChange={this.onChange} required/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Total Carbohydrate (in g)</label>
              <div className="col-sm-9">
                <input autocomplete="off" name="carbohydrate" value={this.state.data.carbohydrate} type="number" className="form-control" placeholder="Enter Amount of Carbohydrate" onChange={this.onChange} required/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Total Protein (in g)</label>
              <div className="col-sm-9">
                <input autocomplete="off" name="protein" value={this.state.data.protein} type="number" className="form-control" placeholder="Enter Amount of Protein" onChange={this.onChange} required/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Total Fat (in g)</label>
              <div className="col-sm-9">
                <input autocomplete="off" name="fat" value={this.state.data.fat} type="number" className="form-control" placeholder="Enter Amount of Fat" onChange={this.onChange} required/>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-5">
                <button type="submit" className="btn btn-info btn-block">Save</button>
              </div>
              <div className="col-md-5 offset-md-2">
                <button className="btn btn-light btn-block" onClick={() => Router.back()}>Cancel</button>
              </div>
            </div>
          </div>
        </form>
      </AdminLayoutHoc>
    )
  }
}

export default withRouter(Index)

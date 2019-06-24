import AdminLayoutHoc from '../Layout/AdminLayoutHoc';
import Router from 'next/router'
import Link from 'next/link';
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
        category: '',
        carbohydrate: ''
      },
    }
  }

  async onRefresh () {
    let response = await fetch(`http://103.252.100.230:8000/fact/food-category?name=all`)
    let json = await response.json()

    const categories = json.results.categories

    response = await fetch(`http://103.252.100.230:8000/fact/food/` + this.props.router.query.id)
    json = await response.json()

    const data = json.results
    for (let i = 0, l = categories.length; i < l; i++)
      if (parseInt(categories[i].id) === parseInt(data.category))
        data.category = categories[i].name

    this.setState({ data, categories })
  }

  componentDidMount () {
    this.onRefresh()
  }

  render() {
    return (
      <AdminLayoutHoc contentTitle={'View Food'} contentBreadcrumb={["Home", "Food", "Food Lists", "View"]}>
        <div className="card">
          <div className="card-body">
            <div className="row ml-0 mr-0">
              <Link href={`/dashboard/admin/food/lists?status=edit&id=` + this.props.router.query.id}>
                <a className="btn btn-info ml-auto">
                  <i className="fa fa-pen" /> Edit
                </a>
              </Link>
            </div>
            <form>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Food Name</label>
                <div className="col-sm-9">
                  <input type="text" readonly className="form-control-plaintext" value={this.state.data.name}/>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Category</label>
                <div className="col-sm-9">
                  <input type="text" readonly className="form-control-plaintext" value={this.state.data.category}/>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Total Calories (in kcal)</label>
                <div className="col-sm-9">
                  <input type="text" readonly className="form-control-plaintext" value={this.state.data.calorie}/>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Total Carbohydrate (in g)</label>
                <div className="col-sm-9">
                  <input type="text" readonly className="form-control-plaintext" value={this.state.data.carbohydrate}/>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Total Protein (in g)</label>
                <div className="col-sm-9">
                  <input type="text" readonly className="form-control-plaintext" value={this.state.data.protein}/>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Total Fat (in g)</label>
                <div className="col-sm-9">
                  <input type="text" readonly className="form-control-plaintext" value={this.state.data.fat}/>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <button type="button" className="btn btn-info btn-block" onClick={() => Router.back()}>Back</button>
          </div>
        </div>
      </AdminLayoutHoc>
    )
  }
}

export default withRouter(Index)

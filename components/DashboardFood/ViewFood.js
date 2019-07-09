import AdminLayoutHoc from '../Layout/AdminLayoutHoc';
import Router from 'next/router'
import Link from 'next/link';
import { withRouter } from 'next/router';

class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {
        fat: '0',
        name: '-',
        calorie: '0',
        protein: '0',
        category: '-',
        carbohydrate: '0'
      },
    }
  }

  async onRefresh () {
    let response = await fetch(`http://103.252.100.230/fact/food-category?name=all`)
    let json = await response.json()

    const categories = json.results.categories

    response = await fetch(`http://103.252.100.230/fact/food/` + this.props.router.query.id)
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
            <div className="row">
              <div className="col-sm-3 br-1">
                <div className="form-group row">
                  <label className="col-sm-12 col-form-label">Food Name</label>
                </div>
                <div className="form-group row">
                  <label className="col-sm-12 col-form-label">Category</label>
                </div>
                <div className="form-group row">
                  <label className="col-sm-12 col-form-label">Total Calories</label>
                </div>
                <div className="form-group row">
                  <label className="col-sm-12 col-form-label">Total Carbohydrate</label>
                </div>
                <div className="form-group row">
                  <label className="col-sm-12 col-form-label">Total Protein</label>
                </div>
                <div className="form-group row">
                  <label className="col-sm-12 col-form-label">Total Fat</label>
                </div>
              </div>
              <div className="col-sm-9 bl-1">
                <div className="form-group row">
                  <div class="col-md-12">
                    <input autocomplete="off" type="text" readonly className="form-control-plaintext" value={this.state.data.name}/>
                  </div>
                </div>
                <div className="form-group row">
                  <div class="col-md-12">
                    <input autocomplete="off" type="text" readonly className="form-control-plaintext" value={this.state.data.category}/>
                  </div>
                </div>
                <div className="form-group row">
                  <div class="col-md-12">
                    <input autocomplete="off" type="text" readonly className="form-control-plaintext" value={`${this.state.data.calorie} kcal`}/>
                  </div>
                </div>
                <div className="form-group row">
                  <div class="col-md-12">
                    <input autocomplete="off" type="text" readonly className="form-control-plaintext" value={`${this.state.data.carbohydrate} g`}/>
                  </div>
                </div>
                <div className="form-group row">
                  <div class="col-md-12">
                    <input autocomplete="off" type="text" readonly className="form-control-plaintext" value={`${this.state.data.protein} g`}/>
                  </div>
                </div>
                <div className="form-group row">
                  <div class="col-md-12">
                    <input autocomplete="off" type="text" readonly className="form-control-plaintext" value={`${this.state.data.fat} g`}/>
                  </div>
                </div>
              </div>
            </div>
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

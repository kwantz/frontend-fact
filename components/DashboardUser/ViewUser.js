import AdminLayoutHoc from '../Layout/AdminLayoutHoc';
import Card from '../Card';
import Chart from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        name: "",
        email: "",
        activity: "",
        category: "",
        gender: {
          id: 0,
          name: ''
        },
        old: 0,
        weight: 0,
        height: 0,
        fat: 0,
        protein: 0,
        carbohydrate: 0,
        max_fat: 0,
        max_protein: 0,
        max_carbohydrate: 0,
      }
    }

    this.onRefresh = this.onRefresh.bind(this)
  }

  async onRefresh() {
    const response = await fetch(`http://103.252.100.230/fact/user/` + this.props.router.query.id)
    const json = await response.json()

    const data = {
      name: json.results.name,
      email: json.results.email,
      activity: json.results.activity,
      category: json.results.category,
      gender: json.results.gender,
      old: json.results.old,
      weight: json.results.weight,
      height: json.results.height,
      fat: json.results.fat,
      protein: json.results.protein,
      carbohydrate: json.results.carbohydrate,
      max_fat: json.results.max_fat,
      max_protein: json.results.max_protein,
      max_carbohydrate: json.results.max_carbohydrate,
    }

    this.setState({ data })
  }

  componentDidMount () {
    this.onRefresh()
  }

  render() {
    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          //Get ctx from string
          var ctx = chart.chart.ctx;

          //Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'Arial';
          var txt = centerConfig.text;
          var color = centerConfig.color || '#000';
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
          //Start with a base font of 30px
          ctx.font = "30px " + fontStyle;

          //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = 20;

          //Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse+"px " + fontStyle;
          ctx.fillStyle = color;

          //Draw text in center
          ctx.fillText(txt, centerX, centerY);
        }
      }
    });

    const profileTools = (
      <div className="card-tools">
        <Link href={"/dashboard/admin/users/active?status=edit&id=" + this.props.router.query.id}>
          <a>
            <i className="fa fa-pen"/>
          </a>
        </Link>
      </div>
    )

    const chart = {
      fat: {
        datasets: [{
          data: [this.state.data.fat, this.state.data.max_fat - this.state.data.fat],
          backgroundColor: ['#dc3545'],
        }],
        options: {
          elements: {
            center: {
              text: this.state.data.fat + 'g',
              color: '#dc3545'
            }
          }
        }
      },
      protein: {
        datasets: [{
          data: [this.state.data.protein, this.state.data.max_protein - this.state.data.protein],
          backgroundColor: ['#17a2b8'],
        }],
        options: {
          elements: {
            center: {
              text: this.state.data.protein + 'g',
              color: '#17a2b8'
            }
          }
        }
      },
      carbohydrate: {
        datasets: [{
          data: [this.state.data.carbohydrate, this.state.data.max_carbohydrate - this.state.data.carbohydrate],
          backgroundColor: ['#ffc107'],
        }],
        options: {
          elements: {
            center: {
              text: this.state.data.carbohydrate + 'g',
              color: '#ffc107'
            }
          }
        }
      }
    }

    return (
      <AdminLayoutHoc contentTitle={'View User'} contentBreadcrumb={["Home", "Users", "Active Users", "View"]}>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <div className="content-center">
                  <p className="text-center">
                    <span class={`profile-gender-${this.state.data.gender.id}-half`}/>
                  </p>
                  <h5 className="text-center mb-0">{this.state.data.name}</h5>
                  <p className="text-center">{this.state.data.old} y.o. ({this.state.data.gender.name})</p>
                </div>
              </div>

              <Card size="col-md-9" title="PRIVACY DATA" tools={profileTools}>
                <form>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Email Address</label>
                    <div className="col-sm-9">
                      <input autocomplete="off" type="text" readonly className="form-control-plaintext" value={this.state.data.email}/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Password</label>
                    <div className="col-sm-9">
                      <input autocomplete="off" type="password" readonly className="form-control-plaintext" value="............"/>
                    </div>
                  </div>
                </form>
              </Card>
            </div>

            <div className="row">
              <div className="col-md-3">
                <div className="info-box">
                  <div className="info-box-content">
                    <h3 style={{textAlign: "center"}}>Weight</h3>
                    <p className="mb-0" style={{textAlign: "center"}}>{this.state.data.weight} kg</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-box">
                  <div className="info-box-content">
                    <h3 style={{textAlign: "center"}}>Height</h3>
                    <p className="mb-0" style={{textAlign: "center"}}>{this.state.data.height} cm</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-box">
                  <div className="info-box-content">
                    <h3 style={{textAlign: "center"}}>Category</h3>
                    <p className="mb-0" style={{textAlign: "center"}}>{this.state.data.category}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-box">
                  <div className="info-box-content">
                    <h3 style={{textAlign: "center"}}>Activity</h3>
                    <p className="mb-0" style={{textAlign: "center"}}>{this.state.data.activity}</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="mt-3 mb-3">Nutritions</h3>
            <div className="row">
              <div className="col-md-4">
                <Doughnut data={chart.carbohydrate} options={chart.carbohydrate.options}/>
                <h6 className="text-center mt-3">Carbohydrate</h6>
              </div>
              <div className="col-md-4">
                <Doughnut data={chart.protein} options={chart.protein.options}/>
                <h6 className="text-center mt-3">Protein</h6>
              </div>
              <div className="col-md-4">
                <Doughnut data={chart.fat} options={chart.fat.options}/>
                <h6 className="text-center mt-3">Fat</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <button type="button" className="btn btn-info btn-block" onClick={() => Router.back()}>BACK</button>
        </div>
      </AdminLayoutHoc>
    )
  }
}

export default withRouter(Index)

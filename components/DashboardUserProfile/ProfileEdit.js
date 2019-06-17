import UserLayoutHoc from '../UserLayout/UserLayoutHoc'
import Card from '../Card';
import Chart from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
import Link from 'next/link';
import { withRouter } from 'next/router';

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        name: "",
        email: "",
        activity: "",
        category: "",
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
    const response = await fetch(`http://127.0.0.1:8000/fact/user/` + this.props.router.query.id)
    const json = await response.json()

    const data = {
      name: json.results.name,
      email: json.results.email,
      activity: json.results.activity,
      category: json.results.category,
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
          data: [26, 300 - 26],
          backgroundColor: ['#dc3545'],
        }],
        options: {
          cutoutPercentage: 75,
          responsive:true,
          // maintainAspectRatio: false,
          elements: {
            center: {
              text: 26 + 'g',
              color: '#dc3545'
            }
          }
        }
      },
      protein: {
        datasets: [{
          data: [96, 300 - 96],
          backgroundColor: ['#17a2b8'],
        }],
        options: {
          cutoutPercentage: 75,
          responsive:true,
          // maintainAspectRatio: false,
          elements: {
            center: {
              text: 96 + 'g',
              color: '#17a2b8'
            }
          }
        }
      },
      carbohydrate: {
        datasets: [{
          data: [230, 300 - 230],
          backgroundColor: ['#ffc107'],
        }],
        options: {
          cutoutPercentage: 75,
          responsive:true,
          // maintainAspectRatio: false,
          elements: {
            center: {
              text: 230 + 'g',
              color: '#ffc107'
            }
          }
        }
      }
    }

    const navbarInfo = (
      <h3 class="my-auto text-center">EDIT PROFILE</h3>
    )

    return (
      <UserLayoutHoc navbarInfo={navbarInfo}>
        <div class="row pt-5">
          <div className="card offset-md-2 col-md-8 pt-3">
            <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="Erick Kwantan"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="exampleInputEmail1">Email Address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="testing@gmail.com"/>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label>Gender</label>
                <div class="input-group">
                  <div class="form-check custom-control custom-radio text-center">
                    <label for="male">
                      <i class="fas fa-male" style={{fontSize: '35px'}}/>
                    </label>
                    <br/>
                    <input class="form-check-input custom-control-input" type="radio" name="gender" id="male" value="1"/>
                    <label class="form-check-label custom-control-label" for="male">Male</label>
                  </div>

                  <div class="form-check custom-control custom-radio text-center ml-5">
                    <label for="female">
                      <i class="fas fa-female" style={{fontSize: '35px'}}/>
                    </label>
                    <br/>
                    <input class="form-check-input custom-control-input" type="radio" name="gender" id="female" value="2"/>
                    <label class="form-check-label custom-control-label" for="female">Female</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label>Birth Year</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <i class="far fa-calendar-alt"/>
                    </div>
                  </div>
                  <input type="number" class="form-control bl-0" placeholder="_ _ _ _"/>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label>Weight</label>
                <div class="input-group">
                  <input type="number" class="form-control br-0" placeholder="Enter weight" value="48"/>
                  <div class="input-group-prepend">
                    <div class="input-group-text right">kg</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label>Height</label>
                <div class="input-group">
                  <input type="number" class="form-control br-0" placeholder="Enter weight" value="162"/>
                  <div class="input-group-prepend">
                    <div class="input-group-text right">cm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <button type="submit" class="btn btn-block btn-info">SAVE</button>
              </div>
              <div class="col-md-6">
                <button type="submit" class="btn btn-block btn-secondary">CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      </UserLayoutHoc>
    )
  }
}

export default withRouter(Index)

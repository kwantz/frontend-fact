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
      <h3 class="my-auto text-center">Profile</h3>
    )

    return (
      <UserLayoutHoc navbarInfo={navbarInfo}>
        <div class="row pt-5">
        <div className="card offset-md-1 col-md-10">
          <div className="card-body">
            <div class="float-right text-right">
            <Link href="/dashboard/user/profile?status=edit">
              <a class="btn btn-info">
                <i className="fa fa-pen"/> EDIT
              </a>
              </Link>
              <br/>
              <br/>
              <Link href="/dashboard/user/profile?status=change-password">

              <a class="btn btn-info">
                <i class="fas fa-lock"/> CHANGE PASSWORD
              </a>
              </Link>
            </div>

            <div className="row">
              <div className="col-md-3">
                <div className="content-center">
                  <p className="text-center"><i className="fa fa-user-circle" style={{fontSize: "150px"}}/></p>
                  <h5 className="text-center mb-0">Erick Kwantan</h5>
                </div>
              </div>

              <div size="col-md-9">
                <div className="form-group">
                  <label>Email Address:</label>
                  <input type="text" readonly className="form-control-plaintext" value="testing@gmail.com"/>
                </div>
                <div className="form-group">
                  <label>Birth Year:</label>
                  <input type="text" readonly className="form-control-plaintext" value="1997"/>
                </div>
                <div className="form-group">
                  <label>Status:</label>
                  <input type="text" readonly className="form-control-plaintext" value="underweight"/>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div class="col-md-6">
                <h3><u>BODY INFORMATION</u></h3>
                <div class="form-group row mb-0">
                  <label class="col-sm-3 col-form-label">Weight</label>
                  <label class="col-form-label">:</label>
                  <div class="col-sm-8">
                    <input type="text" readonly class="form-control-plaintext" value="48 kg"/>
                  </div>
                </div>
                <div class="form-group row mb-0">
                  <label class="col-sm-3 col-form-label">Height</label>
                  <label class="col-form-label">:</label>
                  <div class="col-sm-8">
                    <input type="text" readonly class="form-control-plaintext" value="162 cm"/>
                  </div>
                </div>
                <div class="form-group row mb-0">
                  <label class="col-sm-3 col-form-label">BMI</label>
                  <label class="col-form-label">:</label>
                  <div class="col-sm-8">
                    <input type="text" readonly class="form-control-plaintext" value="18,2"/>
                  </div>
                </div>
              </div>

              <div class="col-md-6 row">
                <h3 class="col-md-12">Nutritions</h3>
                <div class="col-md-4 block">
                  <div class="circle bg-info pt-4 mx-auto">
                    <h3>230g</h3>
                  </div>
                  <p className="text-center mt-3">Carbohydrate</p>
                </div>
                <div class="col-md-4 block">
                  <div class="circle bg-info pt-4 mx-auto">
                    <h3>96g</h3>
                  </div>
                  <p className="text-center mt-3">Protein</p>
                </div>
                <div class="col-md-4 block">
                  <div class="circle bg-info pt-4 mx-auto">
                    <h3>26g</h3>
                  </div>
                  <p className="text-center mt-3">Fat</p>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div class="col-md-12">
                <h3><u>ACTIVITY LEVEL</u></h3>
                <span>High Activity</span>
                <div className="clearfix">
                  <div className="float-left mr-3">
                    <img width="100" height="100" src="https://www.ikea.cn/cn/en/images/products/ribba-frame-black__0638328_PE698852_S4.JPG" />
                  </div>
                  <span>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  </span>
                </div>
              </div>
            </div>

            <div class="row mt-5">
              <div class="col-md-5">
                <div class="alert alert-primary" role="alert">
                  <h3>Advices:</h3>
                  Try to exercise more
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </UserLayoutHoc>
    )
  }
}

export default withRouter(Index)

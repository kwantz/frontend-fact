import UserLayoutHoc from '../../../components/UserLayout/UserLayoutHoc'
import Card from '../../../components/Card'
import Chart from 'chart.js'
import { Doughnut } from 'react-chartjs-2';

export default class Index extends React.Component {
  render() {
    Chart.pluginService.register({
      beforeDraw: function (chart) {
        //Get ctx from string
        var ctx = chart.chart.ctx;

        //Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

        if (chart.config.options.elements.calorie) {
          ctx.fillStyle = chart.config.options.elements.calorie.color;

          //Draw text in center
          ctx.font = "30px " + "Arial";
          ctx.fillText(chart.config.options.elements.calorie.text, centerX, centerY - 10);

          ctx.font = "15px " + "Arial";
          ctx.fillText('KCAL LEFT', centerX, centerY + 20);
        }

        if (chart.config.options.elements.nutrient) {
          // ctx.height = "500px";
          ctx.fillStyle = chart.config.options.elements.nutrient.color;

          //Draw text in center
          ctx.font = "15px " + "Arial";
          ctx.fillText(chart.config.options.elements.nutrient.text, centerX, centerY);
        }
      }
    });

    const chart = {
      intake: {
        datasets: [{
          data: [525, 1600-525],
          backgroundColor: ['#ffc107'],
        }],
        options: {
          cutoutPercentage: 90,
          elements: {
            calorie: {
              text: 525,
              color: '#ffc107'
            }
          }
        }
      },
      burnt: {
        datasets: [{
          data: [1200, 1600-1200],
          backgroundColor: ['#dc3545'],
        }],
        options: {
          cutoutPercentage: 90,
          elements: {
            calorie: {
              text: 1200,
              color: '#dc3545'
            }
          }
        }
      },

      fat: {
        datasets: [{
          data: [60, 40],
          backgroundColor: ['#dc3545'],
        }],
        options: {
          cutoutPercentage: 75,
          responsive:true,
          maintainAspectRatio: false,
          elements: {
            nutrient: {
              text: 60 + '%',
              color: '#dc3545'
            }
          }
        }
      },
      protein: {
        datasets: [{
          data: [10, 90],
          backgroundColor: ['#17a2b8'],
        }],
        options: {
          cutoutPercentage: 75,
          responsive:true,
          maintainAspectRatio: false,
          elements: {
            nutrient: {
              text: 10 + '%',
              color: '#17a2b8'
            }
          }
        }
      },
      carbohydrate: {
        datasets: [{
          data: [80, 20],
          backgroundColor: ['#ffc107'],
        }],
        options: {
          cutoutPercentage: 75,
          responsive:true,
          maintainAspectRatio: false,
          elements: {
            nutrient: {
              text: 80 + '%',
              color: '#ffc107'
            }
          }
        }
      }
    }


    const navbarInfo = (
      <div className="text-center navbar-text col-md-12">
        <button class="btn btn btn-link text-light">
          <i className="nav-icon fas fa-chevron-circle-left"/>
        </button>
        <span className="ml-5 mr-5">Today</span>
        <button class="btn btn btn-link text-light">
          <i className="nav-icon fas fa-chevron-circle-right"/>
        </button>
      </div>
    )

    return (
      <UserLayoutHoc navbarInfo={navbarInfo}>
        <div className="row pt-5">
          <div className="alert bg-info text-center col-md-6 offset-md-3" role="alert">
            <span>
              <b>Goal:</b> On the way of maintaining body weight
            </span>
          </div>

          <div className="col-md-8 mt-5">
            <div className="card">
              <div className="card-body row text-center">
                <h3 className="col-md-6">CALORIE INTAKE</h3>
                <h3 className="col-md-6">CALORIE BURNT</h3>
                <div className="col-md-6">
                  <Doughnut data={chart.intake} options={chart.intake.options}/>
                </div>
                <div className="col-md-6 bl-1">
                  <Doughnut data={chart.burnt} options={chart.burnt.options}/>
                </div>
                <h4 className="col-md-6 text-info mt-3">1600 KCAL</h4>
                <h4 className="col-md-6 text-info mt-3">1600 KCAL</h4>
                <h6 className="col-md-6">GOAL</h6>
                <h6 className="col-md-6">GOAL</h6>
              </div>
            </div>
          </div>

          <Card size="col-md-4 mt-5" title="Nutrients">
            <div className="row nutrients-chart">
              <div className="col-md-5">
                <Doughnut data={chart.carbohydrate} options={chart.carbohydrate.options}/>
              </div>
              <h6 className="col-md-7 my-auto">Carbohydrate</h6>

              <div className="col-md-5">
                <Doughnut data={chart.protein} options={chart.protein.options}/>
              </div>
              <h6 className="col-md-7 my-auto">Protein</h6>

              <div className="col-md-5">
                <Doughnut data={chart.fat} options={chart.fat.options}/>
              </div>
              <h6 className="col-md-7 my-auto">Fat</h6>
            </div>
          </Card>

          <div className="col-md-6 mt-5">
            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">BREAKFAST</h3>
                <div className="card-tools">
                  <button className="btn btn-tool">
                    <i className="fas fa-trash-alt"/>
                  </button>
                </div>
              </div>
              <div className="card-body row">
                <div className="col-md-10">
                  <b>Fried Rice</b> <br/>
                  <span>1 serving</span>
                </div>
                <div className="col-md-2 my-auto text-right">
                  120
                </div>
                <div className="col-md-10 mt-3">
                  <b>Sweet Tea</b> <br/>
                  <span>1 cup</span>
                </div>
                <div className="col-md-2 mt-3 my-auto text-right">
                  30
                </div>
              </div>
              <div className="card-footer bg-info">
                <div className="row">
                  <div className="col-md-10">
                    <b>Total &nbsp;</b>
                    <sub>(in KCAL)</sub>
                  </div>
                  <div className="col-md-2 my-auto text-right">
                    <b>150</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-5">
            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">LUNCH</h3>
              </div>
              <div className="card-body">
                RECOMMENDED 100 - 500 KCAL
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-5">
            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">DINNER</h3>
              </div>
              <div className="card-body">
                RECOMMENDED 100 - 500 KCAL
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-5">
            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">SNACK</h3>
              </div>
              <div className="card-body">
                RECOMMENDED 100 - 500 KCAL
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-5">
            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">EXERCISE</h3>
              </div>
              <div className="card-body">
                You have no Exercise data yet.
              </div>
            </div>
          </div>

          <div className="col-md-3 mt-5">
            <div className="alert bg-warning" role="alert">
              <span>
                <b>Note:</b> To add exercise data, <br/>
                you have to use the mobile version!
              </span>
            </div>
          </div>
        </div>
      </UserLayoutHoc>
    )
  }
}

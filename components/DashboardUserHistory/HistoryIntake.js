import UserLayoutHoc from '../UserLayout/UserLayoutHoc'
import Card from '../Card'
import Alert from '../Alert'
import Modal from '../Modal'
import Chart from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2';
import Link from 'next/link';

export default class HistoryActivity extends React.Component {

  componentDidMount () {
    window.$('#datetimepicker1').datetimepicker({
      format: 'L'
    });
    window.$('#datetimepicker2').datetimepicker({
      format: 'L'
    });
  }

  render() {
    // Chart.pluginService.register({
    //   beforeDraw: function (chart) {
    //     //Get ctx from string
    //     var ctx = chart.chart.ctx;

    //     //Set font settings to draw it correctly.
    //     ctx.textAlign = 'center';
    //     ctx.textBaseline = 'middle';
    //     var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
    //     var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

    //     if (chart.config.options.elements.calorie) {
    //       ctx.fillStyle = chart.config.options.elements.calorie.color;

    //       //Draw text in center
    //       ctx.font = "30px " + "Arial";
    //       ctx.fillText(chart.config.options.elements.calorie.text, centerX, centerY - 10);

    //       ctx.font = "15px " + "Arial";
    //       ctx.fillText('KCAL LEFT', centerX, centerY + 20);
    //     }

    //     if (chart.config.options.elements.nutrient) {
    //       // ctx.height = "500px";
    //       ctx.fillStyle = chart.config.options.elements.nutrient.color;

    //       //Draw text in center
    //       ctx.font = "15px " + "Arial";
    //       ctx.fillText(chart.config.options.elements.nutrient.text, centerX, centerY);
    //     }
    //   }
    // });

    const chart = {
      week: {
        labels: [1,2,3,4,5,6,7],
        datasets: [{
          data: [10, 40, 50, 0, 70, 60, 20, 100],
          backgroundColor: '#17a2b8'
        }],
        options: {
          legend: {
             display: false
          },
          tooltips: {
             enabled: false
          },
          responsive: true,
          scales: {
            barThickness: 0.1,
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
        }
      },
      month: {
        labels: ['Below', 'Ideal', 'Over'],
        datasets: [{
          data: [30, 50, 80],
          backgroundColor: ['#17a2b8', '#ffc107', '#dc3545']
        }],
      },
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
        <Link href="/dashboard/user/history?status=activity">
          <a class="btn btn btn-link text-light">
            <i className="nav-icon fas fa-chevron-circle-left"/>
          </a>
        </Link>
        <span className="ml-5 mr-5">Calorie Intake</span>
        <Link href="/dashboard/user/history?status=activity">
          <a class="btn btn btn-link text-light">
            <i className="nav-icon fas fa-chevron-circle-right"/>
          </a>
        </Link>
      </div>
    )

    return (
      <UserLayoutHoc navbarInfo={navbarInfo}>
        <div className="row pt-5">
          <div className="offset-md-2 col-md-8">
            <div className="form-group row mb-0">
              <label class="col-form-label mr-3 ml-3">Select range date:</label>
              <div class="col-sm-3">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i class="far fa-calendar-alt"/>
                    </span>
                  </div>
                  <input id="datetimepicker1" data-toggle="datetimepicker" data-target="#datetimepicker1" type="text" className="form-control bl-0 datetimepicker-input" placeholder="_ _ / _ _ / _ _ _ _"/>
                </div>
              </div>

              <label class="col-form-label">to</label>

              <div class="col-sm-3">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i class="far fa-calendar-alt"/>
                    </span>
                  </div>
                  <input id="datetimepicker2" data-toggle="datetimepicker" data-target="#datetimepicker2" type="text" className="form-control bl-0 datetimepicker-input" placeholder="_ _ / _ _ / _ _ _ _"/>
                </div>
              </div>

              <button type="button" className="btn btn-info">SUBMIT</button>
            </div>

            <div className="card mt-3">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fa fa-tag mr-2"/> WEEK VIEW
                </h3>
              </div>
              <div className="card-body">
                <Bar data={chart.week} options={chart.week.options}/>
              </div>
            </div>

            <div className="card mt-5">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fa fa-tag mr-2"/> MONTH VIEW
                </h3>
              </div>
              <div className="card-body">
                <Pie data={chart.month} options={{legend: {position: 'bottom'}}}/>
              </div>
            </div>
          </div>
        </div>
      </UserLayoutHoc>
    )
  }
}

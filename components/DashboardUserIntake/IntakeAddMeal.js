import UserLayoutHoc from '../UserLayout/UserLayoutHoc'
import Card from '../Card'
import Alert from '../Alert'
import Modal from '../Modal'
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
      <h3 class="my-auto text-center">New Meal</h3>
    )

    return (
      <UserLayoutHoc navbarInfo={navbarInfo}>
        <div className="row pt-5">
          <div className="offset-md-1 col-md-10">
            <div className="card">
              <div className="card-body row">

                <div className="col-md-12">
                  <div className="form-group row">
                    <label class="col-form-label col-sm-2">Meal Name:</label>
                    <div class="col-sm-4">
                      <input type="text" className="form-control" placeholder="Enter meal name"/>
                      <small class="form-text text-muted text-right">*required</small>                    </div>
                  </div>
                </div>

                  <div class="col-sm-6">
                    <div class="form-group col-sm-6 pl-0 mb-0 pb-3 pr-0">
                      <label>Contains of:</label>
                      <p>
                        <span>- White Rice (1 serving)</span> <br/>
                        <span>- Fried Chicken (2 pieces)</span> <br/>
                      </p>
                      <button className="btn btn-info" data-toggle="modal" data-target="#add">
                        <i className="fas fa-plus"/> ADD FOOD
                      </button>
                    </div>
                  </div>


                  <div class="col-sm-6">
                    <label>Meal Information</label>
                      <div class="card">
                        <div class="card-body row">
                          <div className="col-md-4">Calories</div>
                          <div className="col-md-1">:</div>
                          <div className="col-md-7 text-right">450 kcal</div>

                          <div className="col-md-4">Carbohydrate</div>
                          <div className="col-md-1">:</div>
                          <div className="col-md-7 text-right">124 g</div>

                          <div className="col-md-4">Protein</div>
                          <div className="col-md-1">:</div>
                          <div className="col-md-7 text-right">42 g</div>

                          <div className="col-md-4">Fat</div>
                          <div className="col-md-1">:</div>
                          <div className="col-md-7 text-right">86 g</div>
                        </div>
                      </div>
                    </div>

                <div class="offset-md-3 col-md-3 mt-5">
                  <button className="btn btn-info btn-block">
                    SAVE
                  </button>
                </div>

                <div class="col-md-3 mt-5">
                  <button className="btn btn-outline-info btn-block">
                    CANCEL
                  </button>
                </div>

                  </div>

            </div>
          </div>

          <Modal id="add" title="Add Custom Food" size="modal-xl">
            {/* <Alert type="danger" component={this} attribute="add_danger"/>
            <Alert type="success" component={this} attribute="add_success"/> */}
            <div className="modal-body row">
            <div className="col-md-12">
                  <div className="form-group row">
                    <div class="col-sm-6">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-search"/>
                          </span>
                        </div>
                        <input type="text" className="form-control bl-0" placeholder="Search by food name here..."/>
                        <div className="input-group-append">
                          <button type="button" className="btn btn-info">Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="col-sm-12">
                  <div class="form-group col-sm-6 pl-0">
                    <label>Recent:</label>
                    <p class="form-control">
                      <button class="btn btn-info badge">Fried Noodles</button> &nbsp;
                      <button class="btn btn-info badge">White Rice</button> &nbsp;
                      <button class="btn btn-info badge">Bread</button> &nbsp;
                    </p>
                  </div>
                </div>

                <div class="col-sm-6">
                  <div class="form-group col-sm-4 pl-0 bb-2 mb-0 pb-3 pr-0">
                    <label>Calories Amount:</label>
                    <div class="input-group">
                      <input type="number" class="form-control br-0" id="inlineFormInputGroup" value="1" min="1"/>
                      <div class="input-group-prepend">
                        <div class="input-group-text right">serving</div>
                      </div>
                    </div>
                  </div>

                  <p>Total: &nbsp;<b style={{ fontSize: "1.5rem" }}>200</b> KCAL</p>
                </div>

                <div class="col-sm-6">
                  <label>Nutrition Informations</label>
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

                <div class="col-md-6 mt-5">
                  <button className="btn btn-info btn-block">
                    SAVE AND ADD AGAIN
                  </button>
                </div>

                <div class="col-md-6 mt-5">
                  <button className="btn btn-outline-info btn-block">
                    ONLY SAVE THIS ONE
                  </button>
                </div>
            </div>
          </Modal>
        </div>
      </UserLayoutHoc>
    )
  }
}

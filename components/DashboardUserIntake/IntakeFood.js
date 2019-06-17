import UserLayoutHoc from '../UserLayout/UserLayoutHoc'
import Card from '../Card'
import Alert from '../Alert'
import Modal from '../Modal'
import Chart from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
import Link from 'next/link';

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
      <div class="form-group row my-auto">
        <label class="offset-sm-3 col-sm-2 col-form-label">Category:</label>
        <div class="col-sm-4">
          <select class="form-control">
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>
        </div>
      </div>
    )

    return (
      <UserLayoutHoc navbarInfo={navbarInfo}>
        <div className="row pt-5">
          <div className="offset-md-1 col-md-10">
            <div className="form-group row">
              <label class="col-form-label col-sm-1 pt-0">Add:</label>
              <div class="col-sm-1">
                <div class="custom-control custom-radio custom-control-inline">
                  <input class="custom-control-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
                  <label class="custom-control-label" for="gridRadios1">
                    Food
                  </label>
                </div>
              </div>
              <div className="col-sm-1">
                <div class="custom-control custom-radio custom-control-inline">
                  <input class="custom-control-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
                  <label class="custom-control-label" for="gridRadios2">
                    <Link href="/dashboard/user/intake?status=meal">
                      <a class="text-dark">Meal</a>
                    </Link>
                  </label>
                </div>
              </div>
            </div>
          </div>


          <div className="offset-md-1 col-md-10">
            <div className="card">
              <div className="card-body row">

                <div className="col-md-12">
                  <div className="form-group row">
                    <label class="col-form-label col-sm-2">Food Category:</label>
                    <div class="col-sm-4">
                      <select class="form-control">
                        <option>Beef</option>
                        <option>Bread & Bakery</option>
                        <option>Dairy & Eggs</option>
                        <option>Drinks</option>
                      </select>
                    </div>
                  </div>

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


                <div class="col-sm-6">
                  <div class="form-group">
                    <label>Recent:</label>
                    <p class="form-control">
                      <button class="btn btn-info badge">Fried Noodles</button> &nbsp;
                      <button class="btn btn-info badge">White Rice</button> &nbsp;
                      <button class="btn btn-info badge">Bread</button> &nbsp;
                    </p>
                  </div>

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
                  <div class="mb-3">
                    <label class="text-block">Don't have the food you want?</label>
                    <button className="btn btn-info" data-toggle="modal" data-target="#add">
                      <i className="fas fa-plus"/> ADD NEW
                    </button>
                  </div>

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
                    SAVE AND GO TO DIARY
                  </button>
                </div>
              </div>
            </div>
          </div>


          <Modal id="add" title="Add Custom Food">
            {/* <Alert type="danger" component={this} attribute="add_danger"/>
            <Alert type="success" component={this} attribute="add_success"/> */}
            <div className="modal-body">
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Food Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" placeholder="Enter food name" required/>
                  <small class="form-text text-muted text-right">*required</small>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Calories</label>
                <div class="col-sm-5">
                  <input type="number" class="form-control" placeholder="Enter calories"/>
                  <small class="form-text text-muted text-right">*required</small>
                </div>
                <span class="col-sm-4 col-form-label">
                  (KCAL per serving)
                </span>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Carbohydrate</label>
                <div class="col-sm-5">
                  <input type="number" class="form-control" placeholder="Enter carbohydrate"/>
                </div>
                <span class="col-sm-4 col-form-label">
                  (g per serving)
                </span>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Protein</label>
                <div class="col-sm-5">
                  <input type="number" class="form-control" placeholder="Enter protein"/>
                </div>
                <span class="col-sm-4 col-form-label">
                  (g per serving)
                </span>
              </div>

              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Fat</label>
                <div class="col-sm-5">
                  <input type="number" class="form-control" placeholder="Enter fat"/>
                </div>
                <span class="col-sm-4 col-form-label">
                  (g per serving)
                </span>
              </div>
            </div>
          </Modal>
        </div>
      </UserLayoutHoc>
    )
  }
}

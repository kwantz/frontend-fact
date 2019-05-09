import AdminLayoutHoc from '../Layout/AdminLayoutHoc';
import Card from '../Card';
import Chart from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
import Link from 'next/link';

export default class Index extends React.Component {
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

          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (chart.innerRadius * 2);

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
        <Link href="/dashboard/admin/users/active?status=edit">
          <a>
            <i className="fa fa-pen"/>
          </a>
        </Link>
      </div>
    )

    const chartCarbohydrate = {
      datasets: [{
        data: [230, 70],
        backgroundColor: ['#ffc107'],
      }]
    }

    const chartProtein = {
      datasets: [{
        data: [62, 38],
        backgroundColor: ['#17a2b8'],
      }]
    }

    const chartFat = {
      datasets: [{
        data: [70, 120],
        backgroundColor: ['#dc3545'],
      }]
    }

    const chartOptionCarbohydrate = {
      elements: {
        center: {
          text: '230g',
          color: '#ffc107'
        }
      }
    }

    const chartOptionProtein = {
      elements: {
        center: {
          text: '62g',
          color: '#17a2b8'
        }
      }
    }

    const chartOptionFat = {
      elements: {
        center: {
          text: '70g',
          color: '#dc3545'
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
                  <p className="text-center"><i className="fa fa-user-circle" style={{fontSize: "50px"}}/></p>
                  <h5 className="text-center mb-0">Giacomo Guilizzoni</h5>
                  <p className="text-center">20 y.o.</p>
                </div>
              </div>

              <Card size="col-md-9" title="PRIVACY DATA" tools={profileTools}>
                <form>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Email Address</label>
                    <div className="col-sm-9">
                      <input type="text" readonly className="form-control-plaintext" value="email@example.com"/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Password</label>
                    <div className="col-sm-9">
                      <input type="password" readonly className="form-control-plaintext" value="passwordyangkeren"/>
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
                    <p className="mb-0" style={{textAlign: "center"}}>70 kg</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-box">
                  <div className="info-box-content">
                    <h3 style={{textAlign: "center"}}>Height</h3>
                    <p className="mb-0" style={{textAlign: "center"}}>170 cm</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-box">
                  <div className="info-box-content">
                    <h3 style={{textAlign: "center"}}>Category</h3>
                    <p className="mb-0" style={{textAlign: "center"}}>Normal</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-box">
                  <div className="info-box-content">
                    <h3 style={{textAlign: "center"}}>Activity</h3>
                    <p className="mb-0" style={{textAlign: "center"}}>Low Activity</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="mt-3 mb-3">Nutritions</h3>
            <div className="row">
              <div className="col-md-4">
                <Doughnut data={chartCarbohydrate} options={chartOptionCarbohydrate}/>
                <h6 className="text-center mt-3">Carbohydrate</h6>
              </div>
              <div className="col-md-4">
                <Doughnut data={chartProtein} options={chartOptionProtein}/>
                <h6 className="text-center mt-3">Protein</h6>
              </div>
              <div className="col-md-4">
                <Doughnut data={chartFat} options={chartOptionFat}/>
                <h6 className="text-center mt-3">Fat</h6>
              </div>
            </div>
          </div>
        </div>
      </AdminLayoutHoc>
    )
  }
}

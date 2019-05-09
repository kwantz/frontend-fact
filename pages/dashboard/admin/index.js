import AdminLayoutHoc from '../../../components/Layout/AdminLayoutHoc';
import InfoBox from '../../../components/InfoBox';
import Card from '../../../components/Card';
import { Pie } from 'react-chartjs-2';
import Link from 'next/link';

export default class Index extends React.Component {
  render() {
    const chartdata = {
      labels: ['Underweight', 'Normal', 'Overweight'],
      datasets: [{
        data: [12, 19, 3],
        backgroundColor: ['#ffc107', '#17a2b8', '#dc3545'],
      }]
    }

    const algochartdata = {
      labels: ['Correct', 'Incorrect'],
      datasets: [{
        data: [30, 19],
        backgroundColor: ['#28a745', '#dc3545'],
      }]
    }

    return (
      <AdminLayoutHoc contentTitle={'Dashboards'} contentBreadcrumb={["Home", "Dashboard"]}>
        <div className="row">
          <InfoBox size="col-md-3" color="bg-info" icon="fa-user-friends" text="Total Users" number="120"/>
          <InfoBox size="col-md-3" color="bg-danger" icon="fa-user-plus" text="New Users" number="4"/>
          <InfoBox size="col-md-3" color="bg-success" icon="fa-user-clock" text="Online Users" number="42"/>
        </div>

        <div className="row">
          <Card size="col-md-6" title="USER'S INSIGHT">
            <div className="chart">
              <Pie data={chartdata} options={{legend: {position: 'right'}}}/>
            </div>
          </Card>

          <Card size="col-md-6" title="10 TOP FOODS">
            <div className="row">
              <div className="col-md-6">
                <p>1. Fried Rice</p>
                <p>2. Wheat Noodles</p>
                <p>3. Fried Chicken</p>
                <p>4. Oat Meal</p>
                <p>5. Food 5</p>
              </div>
              <div className="col-md-6">
                <p>6. Food 6</p>
                <p>7. Food 7</p>
                <p>8. Food 8</p>
                <p>9. Food 9</p>
                <p>10. Banana</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="row">
          <Card size="col-md-12" title="5 TOP USERS TO REACH DAILY TARGET">
            <div className="row">
              <InfoBox size="col-md-4" color="bg-info" icon="fa-user-circle" text="User One" number='"underweight"'/>
              <InfoBox size="col-md-4" color="bg-info" icon="fa-user-circle" text="User Two" number='"overweight"'/>
              <InfoBox size="col-md-4" color="bg-info" icon="fa-user-circle" text="User Three" number='"underweight"'/>
              <InfoBox size="col-md-4" color="bg-info" icon="fa-user-circle" text="User Four" number='"normal"'/>
              <InfoBox size="col-md-4" color="bg-info" icon="fa-user-circle" text="User Five" number='"overweight"'/>
            </div>
          </Card>
        </div>

        <div className="row">
          <Card size="col-md-8" title="ALGORITHM ACCURACY TO TRACK">
            <div className="chart">
              <Pie data={algochartdata} options={{legend: {position: 'right'}}}/>
            </div>
          </Card>

          <Card size="col-md-4" title="NEW USERS">
            <div className="row">
              <InfoBox size="col-md-12" color="bg-info" icon="fa-user-circle" text="User Six" number='"underweight"'/>
              <InfoBox size="col-md-12" color="bg-info" icon="fa-user-circle" text="User Seven" number='"overweight"'/>
              <InfoBox size="col-md-12" color="bg-info" icon="fa-user-circle" text="User Eight" number='"underweight"'/>
              <div className="col-md-12 text-right">
                <Link href="/dashboard/see-new">
                  <a>See all</a>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </AdminLayoutHoc>
    )
  }
}

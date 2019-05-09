import AdminLayoutHoc from '../../../components/Layout/AdminLayoutHoc';
import InfoBox from '../../../components/InfoBox';
import Card from '../../../components/Card';
import Link from 'next/link';

export default class Index extends React.Component {
  render() {
    return (
      <AdminLayoutHoc contentTitle={'Dashboards'} contentBreadcrumb={["Home", "Dashboard", "New Users"]}>
        <div className="row">
          <Card size="col-md-12" title="NEW USERS">
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
          <div className="col-md-2">
            <Link href="/dashboard">
              <a className="btn btn-info btn-block">BACK</a>
            </Link>
          </div>
        </div>
      </AdminLayoutHoc>
    )
  }
}

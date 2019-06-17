import AdminLayoutHoc from '../../../components/Layout/AdminLayoutHoc';
import InfoBox from '../../../components/InfoBox';
import Card from '../../../components/Card';
import Link from 'next/link';

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      new_users: []
    }

    this.onRefresh = this.onRefresh.bind(this)
  }

  async onRefresh () {
    const response = await fetch(`http://127.0.0.1:8000/fact/dashboard/new-users`)
    const json = await response.json()
    const new_users = json.results.new_users

    this.setState({ new_users })
  }

  componentDidMount () {
    if (window.localStorage.getItem("role") !== "1")
      return window.location.href = "/"

    this.onRefresh()
  }

  render() {

    const new_user = []
    for (let i = 0; i < this.state.new_users.length; i++)
      new_user.push(<InfoBox size="col-md-4" color="bg-info" icon="fa-user-circle" text={this.state.new_users[i].name} number={`"${this.state.new_users[i].category}"`}/>)

    return (
      <AdminLayoutHoc contentTitle={'Dashboards'} contentBreadcrumb={["Home", "Dashboard", "New Users"]}>
        <div className="row">
          <Card size="col-md-12" title="NEW USERS">
            <div className="row">
              {new_user}
            </div>
          </Card>
        </div>

        <div className="row">
          <div className="col-md-2">
            <Link href="/dashboard/admin">
              <a className="btn btn-info btn-block">BACK</a>
            </Link>
          </div>
        </div>
      </AdminLayoutHoc>
    )
  }
}

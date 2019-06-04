import ActiveUsers from '../../../../components/DashboardUser/ActiveUsers';
import ViewUser from '../../../../components/DashboardUser/ViewUser';
import EditUser from '../../../../components/DashboardUser/EditUser';

export default class Index extends React.Component {

  componentDidMount () {
    if (window.localStorage.getItem("role") !== 1)
      return window.location.href = "/"
  }

  render() {
    console.log(this.props.url.query.status)

    if (this.props.url.query.status === "view") return <ViewUser />
    else if (this.props.url.query.status === "edit") return <EditUser />
    else return <ActiveUsers />
  }
}

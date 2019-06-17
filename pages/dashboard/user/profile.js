import ProfileEdit from '../../../components/DashboardUserProfile/ProfileEdit'
import ProfileView from '../../../components/DashboardUserProfile/ProfileView'
import ProfileChangePassword from '../../../components/DashboardUserProfile/ProfileChangePassword'

export default class Index extends React.Component {
  render() {
    console.log(this.props.url.query.status)

    if (this.props.url.query.status === "change-password") return <ProfileChangePassword />
    else if (this.props.url.query.status === "edit") return <ProfileEdit />
    else return <ProfileView />
  }
}

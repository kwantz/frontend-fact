import "../../styles/styles.scss"
import UserHeader from './UserHeader'
import UserSidebar from './UserSidebar'

class UserLayoutHoc extends React.Component {
  render() {
    return (
      <div className="wrapper dashboard-user">
        <UserHeader navbarInfo={this.props.navbarInfo}/>
        <UserSidebar/>
        <div className="content-wrapper" style={{minHeight: '93vh'}}>
          <div className="content">
            <div className="container-fluid">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserLayoutHoc

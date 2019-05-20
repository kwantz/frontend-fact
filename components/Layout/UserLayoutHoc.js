import "../../styles/styles.scss"
import UserHeader from "./UserHeader";
// import UserSidebar from "./UserSidebar";
import PropTypes from 'prop-types';

/**
 * Main user layout - A Higher Order Component
 */
class UserLayoutHoc extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <UserHeader/>
        {/*<UserSidebar/>*/}
        <div className="row">
          <div className="col-md-12">
            {this.props.children}
          </div>
        </div>
        {/* <AdminFooter rightContent={'Some text for the footer'} leftContent={<div>I must be an element</div>}/> */}
      </div>
    )
  }
}

UserLayoutHoc.propTypes = {
  contentTitle: PropTypes.string,
  contentBreadcrumb: PropTypes.array,
};

export default UserLayoutHoc

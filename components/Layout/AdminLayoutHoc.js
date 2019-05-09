import "../../styles/styles.scss"
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminControlSidebar from "./AdminControlSidebar";
import AdminContent from "./AdminContent";
import PropTypes from 'prop-types';

/**
 * Main admin layout - A Higher Order Component
 */
class AdminLayoutHoc extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <AdminHeader/>
        <AdminSidebar/>
        <AdminContent title={this.props.contentTitle} breadcrumb={this.props.contentBreadcrumb}>
          <div className="row">
            <div className="col-md-12">
              {this.props.children}
            </div>
          </div>
        </AdminContent>
        <AdminControlSidebar/>
        {/* <AdminFooter rightContent={'Some text for the footer'} leftContent={<div>I must be an element</div>}/> */}
      </div>
    )
  }
}

AdminLayoutHoc.propTypes = {
  contentTitle: PropTypes.string,
  contentBreadcrumb: PropTypes.array,
};

export default AdminLayoutHoc

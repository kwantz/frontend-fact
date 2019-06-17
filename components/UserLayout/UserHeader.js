import Link from 'next/link';

class UserHeader extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-light bg-info elevation-1 row">
        <ul className="navbar-nav col-md-3">
          <li className="nav-item d-sm-inline-block">
            <Link href="/dashboard/user/diary">
              <a className="nav-link font-weight-bold title-label">
                FACT
              </a>
            </Link>
          </li>
          <span className="d-flex align-items-center title-info">
            Food and Activity Calorie Tracker
          </span>
        </ul>

        <div className="col-md-6">
          {this.props.navbarInfo}
        </div>

        <div className="clearfix col-md-3 mb-0 navbar-text">
          <span className="nav-link float-right ml-3">
            <i className="nav-icon fas fa-user mr-3"/>
            <span>Erick Kwantan</span>
          </span>
          <Link href="/newsfeed">
            <a className="nav-link float-right">
              <i className="nav-icon fas fa-comment-dots mr-0"/>
            </a>
          </Link>
        </div>
      </nav>
    )
  }
}

export default UserHeader

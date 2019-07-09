import Link from 'next/link';

const AdminHeader = (props) => (
  <nav className="main-header navbar navbar-expand bg-white navbar-light border-bottom">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#"><i className="fa fa-bars"/></a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <Link href="/dashboard/admin"><a className="nav-link">Home</a></Link>
      </li>
    </ul>

    <ul className="navbar-nav ml-auto">
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="fa fa-user mr-2"/> Admin <i className="fa fa-caret-down"/>
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <Link href="/">
            <a className="dropdown-item text-danger logout">
              <i className="fa fa-sign-out mr-2"/> Logout
            </a>
          </Link>
        </div>
      </li>
    </ul>
  </nav>
)
export default AdminHeader;

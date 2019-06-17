import navitem from './navitem'
import Link from 'next/link';
import { withRouter } from 'next/router';

class UserSidebar extends React.Component {
  constructor (props) {
    super(props)

    this.signOut = this.signOut.bind(this)
  }

  signOut () {

  }

  render() {
    const { pathname } = this.props.router;

    const navitems = []
    for (let i=0, l=navitem.length; i<l; i++) {
      let active = (pathname === navitem[i].path) ? "active" : ""
      navitems.push(
        <Link href={navitem[i].path}>
          <a className={`nav-link ${active}`}>
            <i className={`nav-icon ${navitem[i].icon} mr-0`}/>
          </a>
        </Link>
      )
    }

    return (
      <aside className="main-sidebar bg-info">
        <div className="sidebar">
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                {navitems}
                <span className="nav-link">
                  <i className="nav-icon fas fa-sign-out-alt mr-0" onClick={this.signOut}/>
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    )
  }
}

export default withRouter(UserSidebar)

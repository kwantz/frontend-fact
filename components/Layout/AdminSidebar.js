import Link from 'next/link';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import navitem from './navitem'

class AdminSidebar extends React.Component {
  render() {
    const { pathname } = this.props.router;

    const isactive = (path) => (pathname === path ? 'active' : '')

    const createNavitem = ({path, name, icon}) => (
      <li className="nav-item" key={name}>
        <Link href={ path }>
          <a className={['nav-link', isactive(path)].join(' ')}>
            <i className={['nav-icon', 'mr-2', icon].join(' ')} />
            <p>{ name }</p>
          </a>
        </Link>
      </li>
    )

    const createNavitemTree = ({name, icon, tree}) => {
      const navitems = []
      let active = ""
      let opened = ""

      for (let i=0, l=tree.length; i<l; i++) {
        if (pathname === tree[i].path && active === "") active = "active"
        if (pathname === tree[i].path && opened === "") opened = "menu-open"
        navitems.push(createNavitem(tree[i]))
      }

      return (
        <li className={["nav-item has-treeview menu-closed", opened].join(" ")} key={name}>
          <a href="#" className={["nav-link", active].join(' ')}>
            <i className={['nav-icon', 'mr-2', icon].join(' ')}/>
            <p>
              { name }
              <i className="right fa fa-angle-left"/>
            </p>
          </a>
          <ul className="nav nav-treeview">{ navitems }</ul>
        </li>
      )
    }

    const navitems = []
    for (let i=0, l=navitem.length; i<l; i++) {
      if (typeof navitem[i].path !== 'undefined')
        navitems.push(createNavitem(navitem[i]))

      if (typeof navitem[i].tree !== 'undefined')
        navitems.push(createNavitemTree(navitem[i]))
    }

    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{minHeight: '846px'}}>
        <Link href="/">
          <a className="brand-link text-center">
            <span className="brand-text font-weight-light">{this.props.projectName && this.props.projectName}</span>
          </a>
        </Link>

        <div className="sidebar">
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              { navitems }
            </ul>
          </nav>
        </div>
      </aside>
    )
  }
}

AdminSidebar.propTypes = {
  projectName: PropTypes.string,
};

AdminSidebar.defaultProps = {
  projectName: 'AdminLTE 3'
};

export default withRouter(AdminSidebar)

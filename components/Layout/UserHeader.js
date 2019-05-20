import Link from 'next/link';

const UserHeader = (props) => (
  <nav className="navbar navbar-expand bg-info navbar-light border-bottom">
    <ul className="navbar-nav">
      <li className="nav-item d-sm-inline-block">
        <Link href="/"><a className="nav-link font-weight-bold" style={{fontSize:'1.5rem'}}>FACT</a></Link>
      </li>
      <span className="d-flex align-items-center" style={{fontSize:'0.7rem',marginTop:'0.6rem'}}>Food and Activity Calorie Tracker</span>
    </ul>
  </nav>
)
export default UserHeader;

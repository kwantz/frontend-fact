import "../../styles/styles.scss"
import Link from 'next/link';

class GuessLayoutHoc extends React.Component {
  render() {
    const childComponent = () => {
      if (typeof this.props.registerbox === 'undefined' || this.props.registerbox === 'false') return (<div>{this.props.children}</div>)
      return (
        <div className="register-box mt-0 mb-0">
          <div class="register-logo mt-4 mb-0">
            <h3 className="font-weight-bold">{this.props.title}</h3>
          </div>
          <div class="card">
            <div class="card-body register-card-body">
              {this.props.children}
            </div>
          </div>
        </div>
      )
    }

    const styles = (typeof this.props.fixed === 'undefined') ? { } : {
      position: "fixed",
      width: "100%",
      zIndex: "999",
    }

    return (
      <div class="register-page pb-3" style={{minHeight: '100vh'}}>
        <nav className="navbar navbar-expand bg-info navbar-light border-bottom row mr-0 ml-0" style={styles}>
          <ul className="navbar-nav col-md-3">
            <li className="nav-item d-sm-inline-block">
              <Link href="/">
                <a className="nav-link font-weight-bold" style={{fontSize:'1.5rem'}}>FACT</a>
              </Link>
            </li>
            <span className="d-flex align-items-center" style={{fontSize:'0.7rem',marginTop:'0.6rem'}}>Food and Activity Calorie Tracker</span>
          </ul>

          <div className="col-md-6">
            <h3 class="my-auto text-center">{this.props.navbarTitle}</h3>
          </div>

        </nav>
        {childComponent()}
        <footer class="d-flex justify-content-center mt-3">Copyright by Zro2iro</footer>
      </div>
    )
  }
}

export default GuessLayoutHoc

import "../../styles/styles.scss"

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

    return (
      <div class="register-page pb-3" style={{minHeight: '100vh'}}>
        <nav className="navbar navbar-expand bg-info navbar-light border-bottom">
          <ul className="navbar-nav">
            <li className="nav-item d-sm-inline-block">
              <a className="nav-link font-weight-bold" style={{fontSize:'1.5rem'}}>FACT</a>
            </li>
            <span className="d-flex align-items-center" style={{fontSize:'0.7rem',marginTop:'0.6rem'}}>Food and Activity Calorie Tracker</span>
          </ul>
        </nav>
        {childComponent()}
        <footer class="d-flex justify-content-center mt-3">Copyright by Zro2iro</footer>
      </div>
    )
  }
}

export default GuessLayoutHoc

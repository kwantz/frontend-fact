import UserHeader from '../components/Layout/UserHeader';
import Link from 'next/link';
import '../styles/styles.scss'

export default class Register extends React.Component {
    render() {
        return ( 
          <div class="register-page" style={{height:'100%'}}>
            <UserHeader />
            <div className="register-box" style={{marginTop:'1%',marginBottom:'1%'}}>
               <div class="register-logo">
                <Link href="/"><a className="font-weight-bold" style={{fontSize:'1.5rem'}}>SIGN UP</a></Link>
              </div>
              <div class="card">
                <div class="card-body register-card-body">
                  <form action="./index.html" method="post">
                    <div class="form-group">
                      <label>Name</label>
                      <input type="text" class="form-control" placeholder="Enter your name" />
                    </div>
                    <div class="form-group">
                      <label>Email Address</label>
                      <input type="email" class="form-control" placeholder="Enter your email address" />
                    </div>
                    <div class="form-group">
                      <label>Password</label>
                      <input type="password" class="form-control" placeholder="Enter your password" />
                    </div>
                    <div class="form-group">
                      <label>Confirm Password</label>
                      <input type="password" class="form-control" placeholder="Confirm your password" />
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <button type="submit" class="btn btn-info btn-block btn-flat">SIGN UP</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <footer class="d-flex justify-content-center">Copyright by Zro2iro</footer>
          </div>
        )
    }
}
import UserHeader from '../components/Layout/UserHeader';
import Link from 'next/link';
import '../styles/styles.scss'

export default class ForgetPassword extends React.Component {
    render() {
        return ( 
          <div class="register-page" style={{height:'100%'}}>
            <UserHeader />
            <div className="register-box">
               <div class="register-logo">
                <Link href="/"><a className="font-weight-bold" style={{fontSize:'1.5rem'}}>FORGET PASSWORD</a></Link>
              </div>
              <div class="card">
                <div class="card-body register-card-body">
                  <form action="./index.html" method="post">
                    <div class="form-group">
                      <label>Please write down your email address below !</label>
                      <input type="email" class="form-control" placeholder="Email address" />
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <button type="submit" class="btn btn-info btn-block btn-flat">SEND RESET LINK</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <footer class="d-flex justify-content-center" style={{marginTop:'12%',paddingBottom:'1%'}}>Copyright by Zro2iro</footer>
          </div>
        )
    }
}
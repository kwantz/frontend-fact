import UserHeader from '../components/Layout/UserHeader';
import Link from 'next/link';
import '../styles/styles.scss'

export default class ResetSuccess extends React.Component {
    render() {
        return ( 
          <div class="register-page" style={{height:'100%'}}>
            <UserHeader />
            <div className="register-box" style={{marginTop:'10%'}}>
               <div class="register-logo">
                <Link href="/"><a className="font-weight-bold" style={{fontSize:'1.5rem'}}>SUCCESSFUL</a></Link>
              </div>
              <div class="card">
                <div class="card-body register-card-body">
                  <form action="./index.html" method="post">
                    <div class="form-group">
                      <label>Your password has been resetted! You can now login with your new password.</label>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <button type="submit" class="btn btn-info btn-block btn-flat">BACK TO LOGIN PAGE</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <footer class="d-flex justify-content-center" style={{marginTop:'10%',paddingBottom:'1%'}}>Copyright by Zro2iro</footer>
          </div>
        )
    }
}
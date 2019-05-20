import UserHeader from '../../../components/Layout/UserHeader';
import InfoBox from '../../../components/InfoBox';
import Card from '../../../components/Card';
import { Pie } from 'react-chartjs-2';
import Link from 'next/link';

export default class Index extends React.Component {
    render() {
        return ( 
          <div class="register-page" style={{height:'100%'}}>
            <UserHeader />
            <div className="register-box">
               <div class="register-logo">
                <Link href="/"><a className="font-weight-bold" style={{fontSize:'1.5rem'}}>Sign Up</a></Link>
              </div>
              <div class="card">
                <div class="card-body register-card-body">
                  <form action="../../index.html" method="post">
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="Full name" />
                      <div class="input-group-append">
                          <span class="fa fa-user input-group-text"></span>
                      </div>
                    </div>
                    <div class="input-group mb-3">
                      <input type="email" class="form-control" placeholder="Email" />
                      <div class="input-group-append">
                          <span class="fa fa-envelope input-group-text"></span>
                      </div>
                    </div>
                    <div class="input-group mb-3">
                      <input type="password" class="form-control" placeholder="Password" />
                      <div class="input-group-append">
                          <span class="fa fa-lock input-group-text"></span>
                      </div>
                    </div>
                    <div class="input-group mb-3">
                      <input type="password" class="form-control" placeholder="Retype password" />
                      <div class="input-group-append">
                          <span class="fa fa-lock input-group-text"></span>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-4">
                        <button type="submit" class="btn btn-primary btn-block btn-flat">Register</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
    }
}
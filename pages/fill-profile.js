import UserHeader from '../components/Layout/UserHeader';
import Link from 'next/link';
import '../styles/styles.scss'

export default class FillProfile extends React.Component {
    render() {
        return ( 
          <div class="register-page" style={{height:'100%'}}>
            <UserHeader />
            <div class="col-md-10" style={{margin:'2% auto'}}>
              <h6>Let us know you more...</h6>
              <div class="card">
                <div class="card-body col-md-12">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Birth Year</label>
                      <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Enter birth year" />
                        <div class="input-group-append">
                            <span class="fas fa-user-lock input-group-text"></span>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Gender</label>
                      <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Enter birth year" />
                        <div class="input-group-append">
                            <span class="fas fa-user-lock input-group-text"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer class="d-flex justify-content-center" style={{marginTop:'12%',paddingBottom:'1%'}}>Copyright by Zro2iro</footer>
          </div>
        )
    }
}
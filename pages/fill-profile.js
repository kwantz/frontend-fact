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
                <div class="card-body col-md-12 row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Birth Year</label>
                      <div class="input-group mb-3">
                        <input type="text" class="form-control col-4" />
                        <div class="input-group-append">
                          <span class="input-group-text"><i class="fa fa-calendar"></i></span>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Gender</label>
                      <div class="input-group mb-3">
                        <div class="form-check">
                          <span class="fa fa-male" style={{display:'block',textAlign:'center',fontSize:'2rem'}}></span>
                          <input class="form-check-input" type="radio" name="gender" id="male" value="male" />
                          <label class="form-check-label" for="male">
                            Male
                          </label>
                        </div>
                        <div class="form-check">
                          <span class="fa fa-female" style={{display:'block',textAlign:'center',fontSize:'2rem'}}></span>
                          <input class="form-check-input" type="radio" name="gender" id="female" value="female" />
                          <label class="form-check-label" for="female">
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Weight</label>
                      <div class="input-group mb-3">
                        <input type="text" class="form-control col-4" />
                        <div class="input-group-append">
                          <span class="input-group-text">kg</span>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Height</label>
                      <div class="input-group mb-3">
                        <input type="text" class="form-control col-4" />
                        <div class="input-group-append">
                          <span class="input-group-text">cm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                   <div class="col-md-6">
                    <div class="form-group">
                      <label>What activity level are you in ?</label>
                      <div class="input-group">
                        <div class="form-check mb-3">
                          <input class="form-check-input" type="radio" name="activity" id="low" value="low" />
                          <label class="form-check-label" for="low">Low Activity Level (Sedentary)</label>
                          <div class="row">
                            <div class="bg-info col-md-3" />
                            <p class="col-md-9">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat orci in dolor faucibus volutpat. Duis tempus lobortis erat, at consectetur sapien dignissim vitae.</p>
                          </div>
                        </div>
                        <div class="form-check mb-3">
                          <input class="form-check-input" type="radio" name="activity" id="med" value="medium" />
                          <label class="form-check-label" for="med">Medium Activity Level</label>
                          <div class="row">
                            <div class="bg-info col-md-3" />
                            <p class="col-md-9">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat orci in dolor faucibus volutpat. Duis tempus lobortis erat, at consectetur sapien dignissim vitae.</p>
                          </div>
                        </div>
                        <div class="form-check mb-3">
                          <input class="form-check-input" type="radio" name="activity" id="high" value="high" />
                          <label class="form-check-label" for="high">High Activity Level</label>
                          <div class="row">
                            <div class="bg-info col-md-3" />
                            <p class="col-md-9">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat orci in dolor faucibus volutpat. Duis tempus lobortis erat, at consectetur sapien dignissim vitae.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-flat bg-info btn-block col-md-2" style={{margin: '0 auto'}}>DONE</button>
            </div>
            <footer class="d-flex justify-content-center" style={{marginTop:'2%',paddingBottom:'1%'}}>Copyright by Zro2iro</footer>
          </div>
        )
    }
}
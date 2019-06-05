class GuessLayoutHoc extends React.Component {
  render() {
    return (
      <div class="col-md-3">
        <div class="form-group">
          <label>Birth Year</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="far fa-calendar-alt"/>
              </div>
            </div>
            <input type="number" class="form-control bl-0" placeholder="_ _ _ _"/>
          </div>
        </div>

        <div class="form-group">
          <label>Gender</label>

          <div class="input-group">
            <div class="form-check custom-control custom-radio text-center">
              <label for="male">
                <i class="fas fa-male" style={{fontSize: '35px'}}/>
              </label>
              <br/>
              <input class="form-check-input custom-control-input" type="radio" name="gender" id="male" value="1"/>
              <label class="form-check-label custom-control-label" for="male">Male</label>
            </div>

            <div class="form-check custom-control custom-radio text-center ml-5">
              <label for="female">
                <i class="fas fa-female" style={{fontSize: '35px'}}/>
              </label>
              <br/>
              <input class="form-check-input custom-control-input" type="radio" name="gender" id="female" value="2"/>
              <label class="form-check-label custom-control-label" for="female">Female</label>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Weight</label>

          <div class="input-group">
            <input type="number" class="form-control br-0" placeholder="Enter weight"/>
            <div class="input-group-prepend">
              <div class="input-group-text right">kg</div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Height</label>

          <div class="input-group">
            <input type="number" class="form-control br-0" placeholder="Enter height"/>
            <div class="input-group-prepend">
              <div class="input-group-text right">cm</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GuessLayoutHoc

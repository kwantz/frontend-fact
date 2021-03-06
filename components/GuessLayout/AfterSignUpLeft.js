class GuessLayoutHoc extends React.Component {
  render() {
    const self = this.props.parent

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
            <input autocomplete="off" type="number" class="form-control bl-0" placeholder="_ _ _ _" name="birth_year" value={self.state.birth_year} onChange={self.onChange} required/>
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
              <input autocomplete="off" class="form-check-input custom-control-input" type="radio" name="gender" id="male" value="1" onChange={self.onChange} required/>
              <label class="form-check-label custom-control-label" for="male">Male</label>
            </div>

            <div class="form-check custom-control custom-radio text-center ml-5">
              <label for="female">
                <i class="fas fa-female" style={{fontSize: '35px'}}/>
              </label>
              <br/>
              <input autocomplete="off" class="form-check-input custom-control-input" type="radio" name="gender" id="female" value="2" onChange={self.onChange} required/>
              <label class="form-check-label custom-control-label" for="female">Female</label>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Weight</label>
          <div class="input-group">
            <input autocomplete="off" type="number" class="form-control br-0" placeholder="Enter weight" min="30" max="200" name="weight" value={self.state.weight} onChange={self.onChange} required/>
            <div class="input-group-prepend">
              <div class="input-group-text right">kg</div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Height</label>
          <div class="input-group">
            <input autocomplete="off" type="number" class="form-control br-0" placeholder="Enter height" min="100" max="270" name="height" value={self.state.height} onChange={self.onChange} required/>
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

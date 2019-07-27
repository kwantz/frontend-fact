class GuessLayoutHoc extends React.Component {
  render() {
    const self = this.props.parent

    return (
      <div class="col-md-8 offset-md-1 bl-1">
        <div class="form-group">
          <label>Which activity level are you in?</label>

          <div class="form-check custom-control custom-radio">
            <input autocomplete="off" class="form-check-input custom-control-input" type="radio" name="activity_level" id="low" value="Low" onChange={self.onChange} required/>
            <label class="form-check-label custom-control-label" for="low">
              <span>Low Activity (Sedentary)</span>
              <div className="clearfix">
                <div className="float-left mr-3">
                  <img width="100" height="100" src="/static/light.png" />
                </div>
                <span>
                  75% of sitting/standing and 25% of standing/moving. Example of jobs : Designer, Office (Desk) Employee, Teacher, Host, and etc. In leisure time, have little or no exercise. Doing housework is included in this level. If doing exercise will be about 1-2 days/week.
                </span>
              </div>
            </label>
          </div>

          <div class="form-check custom-control custom-radio mt-3">
            <input autocomplete="off" class="form-check-input custom-control-input" type="radio" name="activity_level" id="medium" value="Medium" onChange={self.onChange} required/>
            <label class="form-check-label custom-control-label" for="medium">
              <span>Medium Activity</span>
              <div className="clearfix">
                <div className="float-left mr-3">
                  <img width="100" height="100" src="/static/medium.png" />
                </div>
                <span>
                  40% of sitting/standing and 60% of working (moving). Example of jobs : Nurse, Chef, Server at restaurants, Trainer, and etc. Example of exercises such as light swimming/cycling, jogging, playing double tennis and etc. Gardening is included in this level of activity. If doing exercise will be about 3-5 days/week.
                </span>
              </div>
            </label>
          </div>

          <div class="form-check custom-control custom-radio mt-3">
            <input autocomplete="off" class="form-check-input custom-control-input" type="radio" name="activity_level" id="high" value="High" onChange={self.onChange} required/>
            <label class="form-check-label custom-control-label" for="high">
              <span>High Activity</span>
              <div className="clearfix">
                <div className="float-left mr-3">
                  <img width="100" height="100" src="/static/very.png" />
                </div>
                <span>
                  25% of sitting/standing and 75% of working (lifting and moving). Jobs that demand physical strength are included in this level such as construction workers, farmer. athlete and etc. Example of exercises such as swimming laps, running, hiking, jumping rope, playing single tennis and etc. If doing exercise will be about 6-7 days/week and 2 times/day for athlete.
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>
    )
  }
}

export default GuessLayoutHoc

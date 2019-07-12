class GuessLayoutHoc extends React.Component {
  render() {
    const self = this.props.parent

    return (
      <div class="col-md-8 offset-md-1 bl-1">
        <div class="form-group">
          <label>Which activity level are you in?</label>

          <div class="form-check custom-control custom-radio">
            <input autocomplete="off" class="form-check-input custom-control-input" type="radio" name="activity_level" id="low" value="Low" onChange={self.onChange}/>
            <label class="form-check-label custom-control-label" for="low">
              <span>Low Activity (Sedentary)</span>
              <div className="clearfix">
                <div className="float-left mr-3">
                  <img width="100" height="100" src="https://www.ikea.cn/cn/en/images/products/ribba-frame-black__0638328_PE698852_S4.JPG" />
                </div>
                <span>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </span>
              </div>
            </label>
          </div>

          <div class="form-check custom-control custom-radio mt-3">
            <input autocomplete="off" class="form-check-input custom-control-input" type="radio" name="activity_level" id="medium" value="Medium" onChange={self.onChange}/>
            <label class="form-check-label custom-control-label" for="medium">
              <span>Medium Activity</span>
              <div className="clearfix">
                <div className="float-left mr-3">
                  <img width="100" height="100" src="https://www.ikea.cn/cn/en/images/products/ribba-frame-black__0638328_PE698852_S4.JPG" />
                </div>
                <span>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </span>
              </div>
            </label>
          </div>

          <div class="form-check custom-control custom-radio mt-3">
            <input autocomplete="off" class="form-check-input custom-control-input" type="radio" name="activity_level" id="high" value="High" onChange={self.onChange}/>
            <label class="form-check-label custom-control-label" for="high">
              <span>High Activity</span>
              <div className="clearfix">
                <div className="float-left mr-3">
                  <img width="100" height="100" src="https://www.ikea.cn/cn/en/images/products/ribba-frame-black__0638328_PE698852_S4.JPG" />
                </div>
                <span>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
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

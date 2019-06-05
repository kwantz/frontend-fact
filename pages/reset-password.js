import GuessLayoutHoc from '../components/GuessLayout/GuessLayoutHoc'

export default class Index extends React.Component {
  render() {
    return (
      <GuessLayoutHoc registerbox="true" title="RESET PASSWORD">
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
            <button type="submit" class="btn btn-info btn-block">SAVE</button>
          </div>
        </div>
      </GuessLayoutHoc>
    )
  }
}

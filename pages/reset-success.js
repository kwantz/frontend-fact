import GuessLayoutHoc from '../components/GuessLayout/GuessLayoutHoc'

export default class Index extends React.Component {
  render() {
    return (
      <GuessLayoutHoc registerbox="true" title="SUCCESSFUL">
        <div class="form-group">
          <label>Your password has been resetted! You can now login with your new password.</label>
        </div>

        <div class="row">
          <div class="col-12">
            <button type="submit" class="btn btn-info btn-block">BACK TO LOGIN PAGE</button>
          </div>
        </div>
      </GuessLayoutHoc>
    )
  }
}

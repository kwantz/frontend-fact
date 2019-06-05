import GuessLayoutHoc from '../components/GuessLayout/GuessLayoutHoc'

export default class Index extends React.Component {
  render() {
    return (
      <GuessLayoutHoc registerbox="true" title="FORGET PASSWORD">
        <div class="form-group">
          <label>Please write down your email address below!</label>
          <input type="email" class="form-control" placeholder="Email address" />
        </div>

        <div class="row">
          <div class="col-12">
            <button type="submit" class="btn btn-info btn-block">SEND RESET LINK</button>
          </div>
        </div>
      </GuessLayoutHoc>
    )
  }
}

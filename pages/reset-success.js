import GuessLayoutHoc from '../components/GuessLayout/GuessLayoutHoc'
import Link from 'next/link';

export default class Index extends React.Component {
  render() {
    return (
      <GuessLayoutHoc registerbox="true" title="SUCCESSFUL">
        <div class="form-group">
          <label>Your password has been resetted! You can now login with your new password.</label>
        </div>

        <Link href="/">
          <a class="btn btn-info btn-block">BACK TO LOGIN PAGE</a>
        </Link>
      </GuessLayoutHoc>
    )
  }
}

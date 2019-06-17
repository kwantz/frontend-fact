import GuessLayoutHoc from '../components/GuessLayout/GuessLayoutHoc'
import Link from 'next/link';

export default class Index extends React.Component {
  render() {
    return (
      <GuessLayoutHoc registerbox="true" title="FORGET PASSWORD">
        <div class="form-group">
          <label>Please write down your email address below!</label>
          <input type="email" class="form-control" placeholder="Email address" />
        </div>

        <Link href="/reset-password">
          <a class="btn btn-info btn-block">SEND RESET LINK</a>
        </Link>
      </GuessLayoutHoc>
    )
  }
}

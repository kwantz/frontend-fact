import GuessLayoutHoc from '../components/GuessLayout/GuessLayoutHoc'
import Link from 'next/link';

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

        <Link href="/reset-success">
          <a class="btn btn-info btn-block">SAVE</a>
        </Link>
      </GuessLayoutHoc>
    )
  }
}

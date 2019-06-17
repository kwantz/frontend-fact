import GuessLayoutHoc from '../components/GuessLayout/GuessLayoutHoc'
import AfterSignUpLeft from '../components/GuessLayout/AfterSignUpLeft'
import AfterSignUpRight from '../components/GuessLayout/AfterSignUpRight'
import Link from 'next/link';

export default class Index extends React.Component {
  render() {
    return (
      <GuessLayoutHoc registerbox="false">
        <div className="row mt-4">
          <div className="col-md-10 offset-md-1">
            <h4>Let us know you more...</h4>

            <div class="card">
              <div class="card-body row">
                <AfterSignUpLeft />
                <AfterSignUpRight />
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 offset-md-4">
                <Link href="/dashboard/user/diary">
                  <a class="btn btn-info btn-block">DONE</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </GuessLayoutHoc>
    )
  }
}

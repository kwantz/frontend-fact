import GuessLayoutHoc from '../components/GuessLayout/GuessLayoutHoc'
import AfterSignUpLeft from '../components/GuessLayout/AfterSignUpLeft'
import AfterSignUpRight from '../components/GuessLayout/AfterSignUpRight'
import Link from 'next/link';

export default class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {
        birth_year: '',
        gender: '',
        weight: '',
        height: '',
        activity_level: ''
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  async onSubmit () {
    const body = JSON.stringify(this.state.data)
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    let response = await fetch(`http://127.0.0.1:8000/fact/member/user`, {method: 'PUT', body, headers})
    let json = await response.json()

    if (json.message === "Success") {
      response = await fetch(`http://127.0.0.1:8000/fact/member/activity-level`, {method: 'POST', body, headers})
      json = await response.json()

      if (json.message === "Success")
        window.location.href = "/dashboard/user/diary"
    }
  }

  onChange (event) {
    const data = this.state.data
    data[event.target.name] = event.target.value
    this.setState({ data })
  }

  render() {
    return (
      <GuessLayoutHoc registerbox="false">
        <div className="row mt-4">
          <div className="col-md-10 offset-md-1">
            <h4>Let us know you more...</h4>

            <div class="card">
              <div class="card-body row">
                <AfterSignUpLeft parent={this}/>
                <AfterSignUpRight parent={this}/>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 offset-md-4">
                <button type="button" class="btn btn-info btn-block" onClick={this.onSubmit}>DONE</button>
              </div>
            </div>
          </div>
        </div>
      </GuessLayoutHoc>
    )
  }
}

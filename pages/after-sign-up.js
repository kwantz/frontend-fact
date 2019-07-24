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

  async onSubmit (event) {
    event.preventDefault();

    let d = new Date()
    if (d.getFullYear() - this.state.data.birth_year < 20 || d.getFullYear() - this.state.data.birth_year > 70) {
      return alert('Age must be in range 20-70 y.o')
    }

    const body = JSON.stringify(this.state.data)
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    let response = await fetch(`http://103.252.100.230/fact/member/user`, {method: 'PUT', body, headers})
    let json = await response.json()

    if (json.message === "Success") {
      response = await fetch(`http://103.252.100.230/fact/member/activity-level`, {method: 'POST', body, headers})
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

  async componentDidMount() {
    if (typeof this.props.url.query.key === "undefined") {
      return window.location.href = "/"
    }

    let response = await fetch(`http://103.252.100.230/fact/confirm-email/${this.props.url.query.key}`, {method: 'POST'})
    let json = await response.json()

    if (typeof json.results === "undefined") {
      return window.location.href = "/"
    }

    window.localStorage.setItem("name", json.results.name)
    window.localStorage.setItem("token", json.results.token)
    window.localStorage.setItem("role", parseInt(json.results.role))
  }

  render() {
    return (
      <GuessLayoutHoc registerbox="false">
        <div className="row mt-4">
          <form className="col-md-10 offset-md-1" onSubmit={this.onSubmit}>
            <h4>Let us know you more...</h4>

            <div class="card">
              <div class="card-body row">
                <AfterSignUpLeft parent={this}/>
                <AfterSignUpRight parent={this}/>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 offset-md-4">
                <button type="submit" class="btn btn-info btn-block">DONE</button>
              </div>
            </div>
          </form>
        </div>
      </GuessLayoutHoc>
    )
  }
}

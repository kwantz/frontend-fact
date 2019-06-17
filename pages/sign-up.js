import GuessLayoutHoc from '../components/GuessLayout/GuessLayoutHoc'
import Link from 'next/link';

export default class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {
        name: '',
        email: '',
        password: '',
        re_password: '',
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  async onSubmit () {
    const body = JSON.stringify(this.state.data)
    let response = await fetch(`http://127.0.0.1:8000/fact/register`, {method: 'POST', body})
    let json = await response.json()

    if (json.message === 'Success') {
      response = await fetch(`http://127.0.0.1:8000/fact/login`, {method: 'POST', body})
      json = await response.json()

      window.localStorage.setItem("token", json.results.token)
      window.localStorage.setItem("role", parseInt(json.results.role))
      window.location.href = "/after-sign-up"
    }
  }

  onChange (event) {
    const data = this.state.data
    data[event.target.name] = event.target.value
    this.setState({ data })
  }

  render() {
    return (
      <GuessLayoutHoc registerbox="true" title="SIGN UP">
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" placeholder="Enter your name" name="name" value={this.state.name} onChange={this.onChange}/>
        </div>

        <div class="form-group">
          <label>Email Address</label>
          <input type="email" class="form-control" placeholder="Enter your email address" name="email" value={this.state.email} onChange={this.onChange}/>
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.onChange}/>
        </div>

        <div class="form-group">
          <label>Confirm Password</label>
          <input type="password" class="form-control" placeholder="Confirm your password" name="re_password" value={this.state.re_password} onChange={this.onChange}/>
        </div>

        <button type="button" class="btn btn-info btn-block" onClick={this.onSubmit}>SIGN UP</button>
      </GuessLayoutHoc>
    )
  }
}

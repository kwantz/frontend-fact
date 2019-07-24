import GuessLayoutHoc from '../components/GuessLayout/GuessLayoutHoc'
import Link from 'next/link';
import '../libraries'

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

  async onSubmit (event) {
    event.preventDefault()

    console.log(this.state.data.password)

    if (this.state.data.password.invalidpass()) {
      return window.alert("Password minimum 8 and maximum 16 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number.")
    }

    const body = JSON.stringify(this.state.data)
    let response = await fetch(`http://103.252.100.230/fact/register`, {method: 'POST', body})
    let json = await response.json()

    if (json.message === 'Success') {
      window.alert("Please check your email to get link to confirm your email!")
    }
    else {
      window.alert(json.message)
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
        <form onSubmit={this.onSubmit}>
          <div class="form-group">
            <label>Name</label>
            <input autocomplete="off" type="text" class="form-control" placeholder="Enter your name" name="name" value={this.state.name} onChange={this.onChange} required maxLength={30}/>
          </div>

          <div class="form-group">
            <label>Email Address</label>
            <input autocomplete="off" type="email" class="form-control" placeholder="Enter your email address" name="email" value={this.state.email} onChange={this.onChange} required/>
          </div>

          <div class="form-group">
            <label>Password</label>
            <input autocomplete="off" type="password" class="form-control" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.onChange} required/>
          </div>

          <div class="form-group">
            <label>Confirm Password</label>
            <input autocomplete="off" type="password" class="form-control" placeholder="Confirm your password" name="re_password" value={this.state.re_password} onChange={this.onChange} required/>
          </div>

          <button type="submit" class="btn btn-info btn-block">SIGN UP</button>
        </form>
      </GuessLayoutHoc>
    )
  }
}

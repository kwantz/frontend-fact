import GuessLayoutHoc from '../components/GuessLayout/GuessLayoutHoc'

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
    const response = await fetch(`http://127.0.0.1:8000/fact/register`, {method: 'POST', body})
    const json = await response.json()

    if (typeof json.results === 'undefined') {
      // Danger Alert
    }
    else {
      window.localStorage.setItem("token", json.results.token)
      if (json.results.role === 'Admin')
        window.location.href = "/"
      else
        window.location.href = "/"
    }
    console.log("JSON:", json)
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
          <input type="text" class="form-control" placeholder="Enter your name" />
        </div>

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

        <div class="row">
          <div class="col-12">
            <button type="submit" class="btn btn-info btn-block">SIGN UP</button>
          </div>
        </div>
      </GuessLayoutHoc>
    )
  }
}

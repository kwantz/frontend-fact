import GuessLayoutHoc from '../components/GuessLayout/GuessLayoutHoc'
import Link from 'next/link';

export default class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {
        password: '',
        re_password: ''
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  async onSubmit (event) {
    event.preventDefault();

    if (typeof this.props.url.query.key === "undefined") {
      return window.location.href = "/"
    }

    const body = JSON.stringify(this.state.data)
    let response = await fetch(`http://103.252.100.230/fact/reset-password/${this.props.url.query.key}`, {method: 'POST', body})
    let json = await response.json()

    if (json.message === "Success") {
      return window.location.href = "/reset-success"
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

  componentDidMount() {
    if (typeof this.props.url.query.key === "undefined") {
      return window.location.href = "/"
    }
  }

  render() {
    return (
      <GuessLayoutHoc registerbox="true" title="RESET PASSWORD">
        <form onSubmit={this.onSubmit}>
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.onChange} required/>
          </div>

          <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" class="form-control" placeholder="Confirm your password" name="re_password" value={this.state.re_password} onChange={this.onChange} required/>
          </div>

          <button className="btn btn-info btn-block" type="submit">SAVE</button>
        </form>
      </GuessLayoutHoc>
    )
  }
}

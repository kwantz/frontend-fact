import GuessLayoutHoc from '../components/GuessLayout/GuessLayoutHoc'
import Link from 'next/link';

export default class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {
        email: '',
      }
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  async onSubmit () {
    const body = JSON.stringify(this.state.data)
    let response = await fetch(`http://103.252.100.230/fact/forgot-password`, {method: 'POST', body})
    let json = await response.json()

    if (json.message === 'Success') {
      window.alert("Please check your email to get link to reset your password!")
    }
  }

  onChange (event) {
    const data = this.state.data
    data[event.target.name] = event.target.value
    this.setState({ data })
  }

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

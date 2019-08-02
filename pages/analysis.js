import GuessLayoutHoc from '../components/GuessLayout/GuessLayoutHoc'

export default class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        status: ''
      }
    }
  }

  async componentDidMount() {
    const headers = {"Authorization": 'Bearer ' + window.localStorage.getItem("token")}
    const response = await fetch(`http://103.252.100.230/fact/member/user`, {headers})
    const json = await response.json()

    const user = {
      status: json.results.status
    }

    this.setState({ user })
  }

  renderText = (status) => {
    status = status.toLowerCase()
    if (status == "underweight")
      return "You are lighter than you should be. Let's gain more weight! Fulfill your calories intake goal and burn not more than the burnt goal."
    else if (status == "normal")
      return "You have normal body weight. Good!! Let's maintain your body weight! Balance your calories intake and burnt."
    else if (status == "overweight")
      return "You are heavier than you should be. Let's lose some weight! Fulfill not more than your calories intake goal and burn according to the burnt goal."
    else
      return "You are in the obese state. Let's work harder to become normal and healthy. You should never fulfill more than your calories intake goal and burn less than the burnt goal. You also need to watch about the food you eat."
  }

  renderIconName = (status) => {
    status = status.toLowerCase()
    if (status == "underweight")
      return "😢"
    else if (status == "normal")
      return "😊"
    else if (status == "overweight")
      return "😐"
    else
      return "😱"
  }

  render() {
    return (
      <GuessLayoutHoc registerbox="false">
        <div class="d-flex flex-column align-items-center justify-content-center mt-3">
          <h3>From the data analysis, we can conclude that you are</h3>

          <h1 className="mb-4">"{this.state.user.status}"</h1>
          <h1>{this.renderIconName(this.state.user.status)}</h1>
          <p class="col-md-6 text-justify">
            {this.renderText(this.state.user.status)}
          </p>

          <button type="button" class="col-md-2 btn btn-info btn-block mt-3">START</button>
        </div>
      </GuessLayoutHoc>
    )
  }
}

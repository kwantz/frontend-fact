import GuessLayoutHoc from '../components/GuessLayout/GuessLayoutHoc'
import Link from 'next/link';

export default class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {
        email: '',
        password: ''
      },
      articles: []
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  async onSubmit (event) {
    event.preventDefault()

    const body = JSON.stringify(this.state.data)
    const response = await fetch(`http://103.252.100.230/fact/login`, {method: 'POST', body})
    const json = await response.json()

    if (typeof json.results !== 'undefined') {
      window.localStorage.setItem("name", json.results.name)
      window.localStorage.setItem("token", json.results.token)
      window.localStorage.setItem("role", parseInt(json.results.role))

      window.location.href = (json.results.role === 1)
        ? "/dashboard/admin"
        : "/dashboard/user/diary"
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

  async onRefresh () {
    const response = await fetch(`http://103.252.100.230/fact/member/article`)
    const json = await response.json()

    const articles = json.results.articles
    this.setState({ articles })
  }

  componentDidMount() {
    this.onRefresh()
  }

  render() {
    const carouselIntro = []
    const carouselIntroIndicator = []
    for (let i = 0; i < 3; i++) {
      const active = (i == 0) ? ' active' : ''
      carouselIntroIndicator.push(
        <li data-target="#carouIntro" data-slide-to={i} class={`bg-secondary ${active}`}/>
      )
    }

    const carouselArticle = []
    for (let i = 0; i < 3; i++) {
      if (this.state.articles.length !== 0) {
        const active = (i == 0) ? ' active' : ''
        carouselArticle.push(
          <div class={`carousel-item bb-1 bt-1 bg-white ${active}`} style={{height: "400px"}}>
            <div class="clearfix pt-5 pb-5" style={{width: "70%", marginLeft: "15%"}}>
              <div class="float-left mr-3">
              <img width="250" height="250" src={`http://103.252.100.230/fact/image/${this.state.articles[i].image}`}/>
              </div>
              <h5 class="mb-0">{ this.state.articles[i].title }</h5>
              <p class="mb-3">By: { this.state.articles[i].author }</p>
              <p class="article-content">{ this.state.articles[i].content }</p>
              <Link href={`/newsfeed?id=${this.state.articles[i].id}`}>
                <a>Read more...</a>
              </Link>
            </div>
          </div>
        )
      }
    }

    return (
      <GuessLayoutHoc title="">
        <div class="row">
          <div class="col-md-6">
            <div id="carouIntro" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">{carouselIntroIndicator}</ol>
              <div class="carousel-inner">
                <div class={`carousel-item bg-info active`}>
                  <div class="d-flex align-items-center justify-content-center min-vh-100 bg-info">
                    <div>
                      <div class="text-center mb-3"><img src="/static/3.png" height="250" /></div>
                      <h5 class="display-5">For all your goals</h5>
                      <h6 class="display-6">A personalized app to help you lose, <br/>maintain or gain weight with monthly evaluation.</h6>
                    </div>
                  </div>
                </div>

                <div class={`carousel-item bg-info`}>
                  <div class="d-flex align-items-center justify-content-center min-vh-100 bg-info">
                    <div>
                      <div class="text-center mb-3"><img src="/static/2.png" height="250" /></div>
                      <h5 class="display-5">Knowing is half the battle</h5>
                      <h6 class="display-6">Help to calculate your daily calories needed <br/> and provide with weekly & monthly statistics.</h6>
                    </div>
                  </div>
                </div>

                <div class={`carousel-item bg-info`}>
                  <div class="d-flex align-items-center justify-content-center min-vh-100 bg-info">
                    <div>
                      <div class="text-center mb-3"><img src="/static/1.png" height="250" /></div>
                      <h5 class="display-5">Know what you eat</h5>
                      <h6 class="display-6">Easily track your calorie and nutrient intake <br/>based on our provided food database.</h6>
                    </div>
                  </div>
                </div>

                <div class={`carousel-item bg-info`}>
                  <div class="d-flex align-items-center justify-content-center min-vh-100 bg-info">
                    <div>
                      <div class="text-center mb-3"><img src="/static/4.png" height="250" /></div>
                      <h5 class="display-5">Also know what you do</h5>
                      <h6 class="display-6">Lastly, help to track your activity and the calories burnt <br/>based on Human Activity Recognition.</h6>
                    </div>
                  </div>
                </div>
              </div>
              <a class="carousel-control-prev" href="#carouIntro" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"/>
              </a>
              <a class="carousel-control-next" href="#carouIntro" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"/>
              </a>
            </div>
          </div>

          <form class="col-md-6 my-auto" onSubmit={this.onSubmit}>
            <div class="login-box">
              <div class="login-logo">
                <b>LOGIN</b>
              </div>
              <div class="card">
                <div class="card-body login-card-body">
                  <div class="input-group mb-3">
                    <input autocomplete="off" name="email" type="email" class="form-control" placeholder="Email" value={this.state.email} onChange={this.onChange} required/>
                    <div class="input-group-append">
                      <span class="fa fa-envelope input-group-text" style={{fontWeight: "900"}}/>
                    </div>
                  </div>
                  <div class="input-group mb-3">
                    <input autocomplete="off" name="password" type="password" class="form-control" placeholder="Password" value={this.state.password} onChange={this.onChange} required/>
                    <div class="input-group-append">
                      <span class="fas fa-key input-group-text" style={{fontWeight: "900"}}/>
                    </div>
                  </div>
                  <p class="mb-3 text-right">
                    <Link href="/forgot-password">
                      <a>Forgot password?</a>
                    </Link>
                  </p>
                  <div class="row">
                    <div class="col-md-12">
                      <button type="submit" class="btn btn-info btn-block btn-flat">LOGIN</button>
                    </div>
                  </div>
                  <p class="mb-0 mt-3 ">
                    Don't have account yet?
                    <Link href="/sign-up">
                      <a class="text-center ml-2 mr-1">Sign Up</a>
                    </Link>
                    now
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div id="carouArticle" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouArticle" data-slide-to="0" class="active bg-secondary"></li>
            <li data-target="#carouArticle" data-slide-to="1" class="bg-secondary"></li>
            <li data-target="#carouArticle" data-slide-to="2" class="bg-secondary"></li>
            <li data-target="#carouArticle" data-slide-to="3" class="bg-secondary"></li>
          </ol>
          <div class="carousel-inner">
            { carouselArticle }
            <div class="carousel-item bb-1 bt-1 bg-white" style={{height: "400px"}}>
              <div class="text-center" style={{width: "70%", marginLeft: "15%", marginTop: "10%"}}>
                <h5 class="mb-0">Interested?</h5>
                <p class="mb-3">Wanna see more articles about health and lifestyles?</p>
                <Link href="/newsfeed">
                  <a class="btn btn-info">SEE ALL</a>
                </Link>
              </div>
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouArticle" role="button" data-slide="prev">
            <h1 class="fas fa-chevron-left text-info" aria-hidden="true"></h1>
          </a>
          <a class="carousel-control-next" href="#carouArticle" role="button" data-slide="next">
            <h1 class="fas fa-chevron-right text-info" aria-hidden="true"></h1>
          </a>
        </div>

        <div class="row">
          <div class="col-md-12 pt-3 pr-5 pl-5 pb-3">
            <h1 class="text-center">ABOUT US</h1>
            <p>
              About the app — Food and Calorie Activity Tracker (aka FACT) is an application designed and build for those who have problem in managing their body weight. Either they are underweight, overweight or obese. Well, the root cause of these problems is people don't know how to count the calories they consumed and burnt daily. This leads to the inability of balancing both of them. FACT will help those people solve their problems. The mobile version of FACT will also have the ability to track activities you've done. For example, walking, running and going on stairs. Still not interested? No problem, you can still read articles from our website. Go join us if you are interested.
            </p>
            <p>
              About the developer — This application is designed and developed by a team called Zro2iro, consists of 3 persons who share the same goals and work together for it.
            </p>
          </div>
          <div class="col-md-3 offset-md-2">
            <p class="mb-0">Contact Person</p>
            <a>erickkwantantz123@gmail.com</a>
          </div>
          <div class="col-md-3 offset-md-2 text-right">
            <img src="https://play.google.com/intl/en_us/badges/images/badge_new.png"/>
          </div>
        </div>
      </GuessLayoutHoc>
    )
  }
}

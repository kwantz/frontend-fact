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

  async onSubmit () {
    const body = JSON.stringify(this.state.data)
    const response = await fetch(`http://127.0.0.1:8000/fact/login`, {method: 'POST', body})
    const json = await response.json()

    if (typeof json.results !== 'undefined') {
      window.localStorage.setItem("token", json.results.token)
      window.localStorage.setItem("role", parseInt(json.results.role))

      window.location.href = (json.results.role === 1)
        ? "/dashboard/admin"
        : "/dashboard/user/diary"
    }
  }

  onChange (event) {
    const data = this.state.data
    data[event.target.name] = event.target.value
    this.setState({ data })
  }

  async onRefresh () {
    const response = await fetch(`http://127.0.0.1:8000/fact/member/article`)
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
      carouselIntro.push(
        <div class={`carousel-item bg-info ${active}`}>
          <div class="d-flex align-items-center justify-content-center min-vh-100 bg-info">
            <h1 class="display-1">Carol {i + 1}</h1>
          </div>
        </div>
      )
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
              <img width="250" height="250" src={`http://127.0.0.1:8000/fact/image/${this.state.articles[i].image}`}/>
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
              <div class="carousel-inner">{carouselIntro}</div>
              <a class="carousel-control-prev" href="#carouIntro" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"/>
              </a>
              <a class="carousel-control-next" href="#carouIntro" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"/>
              </a>
            </div>
          </div>

          <div class="col-md-6 my-auto">
            <div class="login-box">
              <div class="login-logo">
                <b>LOGIN</b>
              </div>
              <div class="card">
                <div class="card-body login-card-body">
                  <div class="input-group mb-3">
                    <input name="email" type="email" class="form-control" placeholder="Email" value={this.state.email} onChange={this.onChange}/>
                    <div class="input-group-append">
                      <span class="fa fa-envelope input-group-text" style={{fontWeight: "900"}}/>
                    </div>
                  </div>
                  <div class="input-group mb-3">
                    <input name="password" type="password" class="form-control" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
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
                      <button type="button" class="btn btn-primary btn-block btn-flat" onClick={this.onSubmit}>LOGIN</button>
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
          </div>
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
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
          </div>
          <div class="col-md-3 offset-md-2">
            <p class="mb-0">Contact Person</p>
            <a>hello@gmail.com</a>
          </div>
          <div class="col-md-3 offset-md-2 text-right">
            <img src="https://play.google.com/intl/en_us/badges/images/badge_new.png"/>
          </div>
        </div>
      </GuessLayoutHoc>
    )
  }
}

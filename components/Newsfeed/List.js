import GuessLayoutHoc from '../GuessLayout/GuessLayoutHoc'
import Link from 'next/link';

export default class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      page: 1,
      quote: [],
      articles: []
    }

    this.onRefresh = this.onRefresh.bind(this)
  }

  async onRefresh () {
    const response = await fetch(`http://127.0.0.1:8000/fact/member/newsfeed?page=${this.state.page}`)
    const json = await response.json()

    let page = this.state.page
    let quote = this.state.quote
    let articles = this.state.articles

    page += 1
    quote.push.apply(quote, json.results.quotes)
    articles.push.apply(articles, json.results.articles)

    this.setState({ page, quote, articles })
  }

  componentDidMount() {
    this.onRefresh()
  }

  render() {
    const newsfeed = []
    for (let i = 0, l = this.state.articles.length; i < l; i++) {
      newsfeed.push(
        <div class="col-md-8 offset-md-2">
          <div class="card">
            <div class="card-body row">
              <div class="col-md-12">
                <h1 class="mb-0">{this.state.articles[i].title}</h1>
                <div class="clearfix">
                  <p class="mb-3 float-left">By: {this.state.articles[i].author}</p>
                  <p class="mb-3 float-right">
                    <i class="far fa-clock" /> {(new Date(this.state.articles[i].published_on)).dateformat('date')}
                  </p>
                </div>
                <img src={`http://127.0.0.1:8000/fact/image/${this.state.articles[i].image}`}/>
                <p class="article-content mb-0">
                  {this.state.articles[i].content}
                </p>
                <Link href={`/newsfeed?id=${this.state.articles[i].id}`}>
                  <a class="mb-3">Read more...</a>
                </Link>
                <p class="mt-3">
                  <i class="fas fa-users"/> 14 views
                </p>
              </div>
            </div>
          </div>
        </div>
      )

      if (i % 3 == 2) {
        const idx = Math.floor(Math.random() * this.state.quote.length)
        newsfeed.push(
          <div class="col-md-12">
            <div class="card">
              <div class="card-body row">
                <div class="col-md-8 offset-md-2">
                  <h1 class="mb-3">QOTD</h1>
                  <h6>
                    "{this.state.quote[idx].desc}"
                  </h6>
                  <p class="text-right">
                    --{this.state.quote[idx].author}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }

    return (
      <GuessLayoutHoc navbarTitle="NEWSFEED" fixed="true">
        <div class="row" style={{paddingTop: "5rem"}}>
          {newsfeed}
        </div>
      </GuessLayoutHoc>
    )
  }
}

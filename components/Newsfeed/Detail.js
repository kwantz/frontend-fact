import GuessLayoutHoc from '../GuessLayout/GuessLayoutHoc'
import Link from 'next/link';
import Router, { withRouter } from 'next/router';

class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      article: {
        title: '',
        author: '',
        content: '',
        image: '',
        published_on: ''
      }
    }

    this.onRefresh = this.onRefresh.bind(this)
  }

  async onRefresh () {
    const response = await fetch(`http://103.252.100.230/fact/member/article/${this.props.router.query.id}`)
    const json = await response.json()

    const {article} = this.state
    article.title = json.results.title
    article.image = json.results.image,
    article.author = json.results.author,
    article.content = json.results.content
    article.published_on = new Date(json.results.published_on).dateformat()
    this.setState({ article })
  }

  componentDidMount() {
    this.onRefresh()
  }

  render() {
    return (
      <GuessLayoutHoc navbarTitle="VIEW ARTICLE" fixed="true">
        <div class="row" style={{paddingTop: "5rem"}}>
          <div class="col-md-8 offset-md-2">
            <div class="card">
              <div class="card-body row">
                <div class="col-md-12">
                  <h1 class="mb-0">{this.state.article.title}</h1>
                  <div class="clearfix">
                    <p class="mb-3 float-left">By: {this.state.article.author}</p>
                    <p class="mb-3 float-right">
                      <i class="far fa-clock"/> {this.state.article.published_on}
                    </p>
                  </div>
                  <img src={`http://103.252.100.230/fact/image/${this.state.article.image}`}/>
                  <p style={{whiteSpace: 'pre-line'}}>{this.state.article.content}</p>
                  <p>
                    <i class="fas fa-users"></i> 14 views
                  </p>
                </div>
              </div>
            </div>

            <Link href="/">
              <a class="col-md-2 btn btn-secondary">BACK</a>
            </Link>
          </div>
        </div>
      </GuessLayoutHoc>
    )
  }
}

export default withRouter(Index)

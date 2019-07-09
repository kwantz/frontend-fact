import AdminLayoutHoc from '../Layout/AdminLayoutHoc';
import SearchInput from '../SearchInput';
import Table from '../Table';
import Modal from '../Modal';
import Alert from '../Alert';
import Link from 'next/link';
import Router from 'next/router'
import { withRouter } from 'next/router';

class Index extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: [],
      search: '',
      total: 0,
      table: {
        pages: 0,
        loading: false,
        header: [
          {title: "#", size: "50px"},
          {title: "Title", size: "auto"},
          {title: "Author", size: "auto"},
          {title: "Published on", size: "auto"},
          {title: "Published by", size: "auto"},
          {title: "Action", size: "200px"}
        ],
      },
      delete: {
        id: -1,
        title: ""
      },
      alert: {
        delete_danger: '',
        delete_success: ''
      },
    };

    this.onRefresh = this.onRefresh.bind(this);
    this.queryTitle = this.queryTitle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.onSubmitDelete = this.onSubmitDelete.bind(this);
  }

  async onRefresh () {
    const table = this.state.table
    table.loading = true
    await this.setState({ table })

    let {page, title} = this.props.router.query
    if (typeof page === "undefined") page = 1
    if (typeof title === "undefined") title = ""

    const response = await fetch(`http://103.252.100.230/fact/article?page=${page}&title=${title}`)
    const json = await response.json()

    const data = json.results.articles
    const total = json.results.total
    table.pages = json.results.pages
    table.loading = false

    this.setState({ data, table, total })
  }

  componentDidMount() {
    this.onRefresh()
  }

  async queryTitle (event) {
    event.preventDefault();

    await Router.push({
      pathname: '/dashboard/admin/newsfeed/articles',
      query: {
        page: 1,
        title: this.state.search
      }
    })
    this.onRefresh()
  }

  deleteArticle (article) {
    const data = this.state.delete
    data.id = article.id
    data.title = article.title

    this.setState({ delete: data })
  }

  async onSubmitDelete () {
    const {alert} = this.state
    const response = await fetch('http://103.252.100.230/fact/article/' + this.state.delete.id, {method: 'DELETE'})
    const json = await response.json()

    if (typeof json.message === 'undefined' || json.message !== 'Success') {
      window.scrollTo(0, 0)
      alert.delete_danger = json.message
      await this.setState({alert})
    }
    else {
      window.scrollTo(0, 0)
      alert.delete_success = "Delete Article, " + this.state.delete.title + " — Success"
      await this.setState({alert})
      this.onRefresh()
    }
  }

  render() {
    const tbody = []
    for (let i = 0, l = this.state.data.length; i < l; i++) {
      const article = this.state.data[i];
      const date = new Date(article.published_on)

      tbody.push(
        <tr key={article.id}>
          <td>{i + 1}</td>
          <td>{article.title}</td>
          <td>{article.author}</td>
          <td>{date.dateformat()}</td>
          <td>{article.published_by}</td>
          <td>
            <Link href={`/dashboard/admin/newsfeed/articles?status=view&id=${article.id}`}>
              <a className="btn btn-link">View</a>
            </Link>
            <button className="btn btn-link text-danger ml-3" data-toggle="modal" data-target="#delete" onClick={() =>  this.deleteArticle(article)}>Delete</button>
          </td>
        </tr>
      )
    }

    return (
      <AdminLayoutHoc contentTitle={`Articles (${this.state.total})`} contentBreadcrumb={["Home", "Newsfeed", "Articles"]}>
        <Alert type="danger" component={this} attribute="delete_danger"/>
        <Alert type="success" component={this} attribute="delete_success"/>
        <div className="card">
          <div className="card-body">
            <form className="form-inline" onSubmit={this.queryTitle}>
              <SearchInput placeholder="Search by title" value={this.state.search} onChange={(event) => this.setState({search: (event.target.value === '' || /^[a-zA-Z]+$/.test(event.target.value.trim()) || /^[a-zA-Z][a-zA-Z0-9 ]+$/.test(event.target.value.trim())) ? event.target.value : this.state.search})}/>
              <Link href="/dashboard/admin/newsfeed/articles?status=add">
                <a className="btn btn-info ml-auto">
                  <i className="fa fa-plus" /> Add Article
                </a>
              </Link>
            </form>
          </div>
        </div>

        <Table table={this.state.table}>
          {tbody}
        </Table>

        <Modal id="delete" title="Delete Article">
          <div className="modal-body">
            <span>Are you sure you want to delete <b>{this.state.delete.title}</b>?</span>
          </div>
          <div className="modal-footer">
            <div className="col-md-6">
              <button type="button" className="btn btn-light btn-block" data-dismiss="modal">No</button>
            </div>
            <div className="col-md-6">
              <button type="button" className="btn btn-danger btn-block" data-dismiss="modal" onClick={this.onSubmitDelete}>Yes</button>
            </div>
          </div>
        </Modal>
      </AdminLayoutHoc>
    )
  }
}

export default withRouter(Index)

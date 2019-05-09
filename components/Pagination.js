import "../styles/styles.scss"
import Link from 'next/link';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';

class Pagination extends React.Component {
  render() {
    const router = this.props.router
    const last = parseInt(this.props.pages)

    const page = (typeof router.query.page === "undefined") ? 1 : parseInt(router.query.page)
    const disabledPrevious = (page === 1) ? "disabled" : ""
    const disabledNext = (page === last) ? "disabled" : ""
    const pages = []
    const start = Math.max(1, page-2)
    const end = Math.min(last, page+2)

    const createUrl = (page) => {
      const keys = Object.keys(router.query)
      let query = "?page=" + page

      for (let i = 0, l = keys.length; i < l; i++) {
        if (keys[i] === "page") continue;
        query += "&" + keys[i] + "=" + router.query[keys[i]];
      }

      return router.pathname + query;
    }

    const createLink = (link) => {
      const active = (link === page) ? "active" : ""
      if (link === -1) return (
        <li className="page-item disabled" key={link}>
          <a className="page-link">...</a>
        </li>
      )
      return (
        <li className={["page-item", active].join(" ")} key={link}>
          <Link href={createUrl(link)}>
            <a className="page-link">{link}</a>
          </Link>
        </li>
      )
    }

    if (start !== 1) pages.push(createLink(1))
    if (start > 2) pages.push(createLink(-1))

    for (let i = start; i <= end; i++)
      pages.push(createLink(i))

    if (end < last - 1) pages.push(createLink(-1))
    if (end !== last) pages.push(createLink(last))

    return (
      <div className="card-footer">
        <ul className="pagination justify-content-end mb-0">
          <li className={["page-item", disabledPrevious].join(" ")}>
            <Link href={createUrl(page - 1)}>
              <a className="page-link">Previous</a>
            </Link>
          </li>
          { pages }
          <li className={["page-item", disabledNext].join(" ")}>
            <Link href={createUrl(page + 1)}>
              <a className="page-link">Next</a>
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

Pagination.propTypes = {
  last: PropTypes.number,
};

export default withRouter(Pagination)

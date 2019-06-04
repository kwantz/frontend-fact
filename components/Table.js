import "../styles/styles.scss"
import Pagination from './Pagination';

class Table extends React.Component {
  render() {
    const {loading, header, pages} = this.props.table
    const refresh = this.props.refresh

    const hide = (loading) ? "" : "hide";
    const thead = [];

    for (let i = 0, l = header.length; i < l; i++) {
      const style = (header[i].size !== "auto") ? {width: header[i].size} : {}
      thead.push(
        <th style={style} key={i}>
          {header[i].title}
        </th>
      )
    }

    return (
      <div className="card">
        <div className={["overlay", hide].join(" ")}>
          <i className="fa fa-sync-alt fa-spin"></i>
        </div>
        <div className="card-body p-0">
          <table className="table">
            <tbody>
              <tr>{thead}</tr>
              {this.props.children}
            </tbody>
          </table>
        </div>
        <Pagination pages={pages} refresh={refresh}/>
      </div>
    )
  }
}

export default Table

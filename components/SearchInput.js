import "../styles/styles.scss"

class SearchInput extends React.Component {
  render() {
    const {placeholder, value, onClick, onChange} = this.props

    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-search"/>
          </span>
        </div>
        <input type="text" className="form-control bl-0" placeholder={placeholder} value={value} onChange={onChange}/>
        <div className="input-group-append">
          <button type="button" className="btn btn-info" onClick={onClick}>Submit</button>
        </div>
      </div>
    )
  }
}

export default SearchInput

import PropTypes from 'prop-types';

const AdminContent = (props) => {
  const createBreadcrumb = () => {
    const breadcrumb = []
    for (let i=0, l=props.breadcrumb.length; i<l; i++)
      breadcrumb.push(<li className="breadcrumb-item" key={i}>{ props.breadcrumb[i] }</li>)

    return (
      <nav aria-label="breadcrumb" className="float-right">
        <ol className="breadcrumb">{ breadcrumb }</ol>
      </nav>
    )
  }

  return (
    <div className="content-wrapper" style={{minHeight: '93vh'}}>
      <div className="content-header">
        {props.title && <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-5">
              <h1 className="m-0 text-dark">{props.title}</h1>
            </div>
            <div className="col-sm-7 text-right text-muted">
              { createBreadcrumb() }
            </div>
          </div>
        </div>}
      </div>
      <div className="content">
        <div className="container-fluid">
          {props.children}
        </div>
      </div>
    </div>
  )
}

AdminContent.propTypes = {
  title: PropTypes.string,
  breadcrumb: PropTypes.array,
};

export default AdminContent;

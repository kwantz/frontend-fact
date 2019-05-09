import "../styles/styles.scss"
import PropTypes from 'prop-types';

class Modal extends React.Component {
  render() {
    const {id, title, children} = this.props

    return (
      <div className="modal animate fade" id={id}>
        <div className="modal-dialog a-zoom modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
};

export default Modal

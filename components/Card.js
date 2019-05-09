import "../styles/styles.scss"
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const {size, title} = this.props

    return (
      <div className={size}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <i className="fa fa-tag mr-2"/> {title}
            </h3>
            {this.props.tools}
            <div className="card-body">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Card.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string,
};

export default Card

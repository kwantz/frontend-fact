import "../styles/styles.scss"
import PropTypes from 'prop-types';

class InfoBox extends React.Component {
  render() {
    const {size, color, icon, text, number} = this.props

    return (
      <div className={size}>
        <div className="info-box">
          <span className={["info-box-icon", color].join(' ')}>
            <i className={["fa", icon].join(" ")}/>
          </span>
          <div className="info-box-content">
            <span className="info-box-text">{ text }</span>
            <span className="info-box-number">{ number }</span>
          </div>
        </div>
      </div>
    )
  }
}

InfoBox.propTypes = {
  size: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  number: PropTypes.string,
};

export default InfoBox

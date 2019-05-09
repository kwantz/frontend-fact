import "../styles/styles.scss"

class Alert extends React.Component {
  render() {
    let {type, component, attribute} = this.props
    if (typeof type === "undefined") type = "info"

    const color = "alert-" + type
    const display = (component.state.alert[attribute] === '') ? 'hide' : ''
    const clickClose = () => {
      let alert = component.state.alert
      alert[attribute] = ''
      component.setState({ alert })
    }

    return (
      <div class={["alert", color, display].join(" ")} role="alert">
        <span>{component.state.alert[attribute]}</span>
        <button type="button" class="close" onClick={clickClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  }
}

export default Alert

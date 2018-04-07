import React from 'react'

const DURATION = 4000

class SnackBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpened: false,
      message: '',
      duration: DURATION,
      defaultDuration: DURATION,
      callIndex: 0,
    }
    this.displayMessage = this.displayMessage.bind(this)
    this.displayError = this.displayError.bind(this)
    this.close = this.close.bind(this)
  }


  displayMessage(message, duration) {
    this.setState({
      message: message,
      callIndex: this.state.callIndex + 1,
      isOpened: true,
      duration: duration || this.state.defaultDuration
    })

    setTimeout(() => {
      if (this.state.callIndex === 1) {
        this.setState({isOpened: false})
      } else if (this.callIndex > 0) this.setState({callIndex: this.callIndex - 1})
    }, this.state.duration);
  }

  displayError(message, duration) {
    this.setState({
      message: `Error: ${message}`,
      callIndex: this.state.callIndex + 1,
      isOpened: true,
      duration: duration || this.state.defaultDuration
    })
    setTimeout(() => {
      if (this.state.callIndex === 1) {
        this.setState({isOpened: false})
      } else if (this.callIndex > 0) this.setState({callIndex: this.callIndex - 1})
    }, this.state.duration);
  }

  close() {
    this.setState({
      callIndex: 0,
      duration: DURATION,
      message: '',
      isOpened: false,
    })
  }

  render() {
    return (
      this.state.isOpened &&
      <div className={ 'snack-bar' }>
        <div className={ 'snack-bar-wrapper' }
          onClick={ this.close }>
          <span className={ 'snack-bar-info' }
          >
            { this.state.message }
          </span>
        </div>
      </div>
    )
  }
}

export {
  SnackBar
}

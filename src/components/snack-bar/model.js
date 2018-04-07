const DURATION = 4000

class SnackModel {
  @observable isOpened = false
  @observable message = ''
  duration = DURATION
  defaultDuration = DURATION
  callIndex = 0

  @action.bound
  displayMessage(message, duration) {
    this.message = message
    ++this.callIndex
    this.isOpened = true
    this.duration = duration || this.defaultDuration
    setTimeout(() => {
      if (this.callIndex === 1) {
        this.isOpened = false
      }
      if (this.callIndex > 0) --this.callIndex
    }, this.duration);
  }

  displayError(message, duration) {
    this.callIndex++
    this.message = `Error: ${message}`
    this.isOpened = true
    this.duration = duration || this.defaultDuration
    setTimeout(() => {
      if (this.callIndex === 1) {
        this.isOpened = false
      }
      if (this.callIndex > 0) --this.callIndex
    }, this.duration);
  }

  @action.bound
  close() {
    this.callIndex = 0
    this.duration = DURATION
    this.message = ''
    this.isOpened = false
  }
}

const snackModel = new SnackModel()

export {
  snackModel
}

import { action, observable, runInAction } from 'mobx'
import stores from '../store'
import { app as abiApp } from '../../contracts/abi'

const AppAddress = `0x44eB71174782243434c8520180fb61c35017A698`
const ICOAddress = `0x8B167AC7Dcf109355cf48eA4F1567aC8ADDCB9e2`
const ENTER_KEY = 13
const regExp = /-?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?/ig

class AppModel {
  @observable msgText = ``
  @observable isShowingNotifier = false
  @observable isModalOpen = false
  @observable validationErrors = ``
  @observable isMetaMaskOk = false
  @observable appWeb3 = null
  @observable likes = 0
  @observable msg = ``

  @action
  updateProvider = (isMetaMaskOk, web3) => {
    this.isMetaMaskOk = isMetaMaskOk
    this.appWeb3 = web3
  }

  @action.bound
  getCurrentParams = () => {
    let MyContract = this.appWeb3.eth.contract(abiApp);
    let myContractInstance = MyContract.at(AppAddress);
    const self = this
      myContractInstance.likes.call({ from: this.appWeb3.eth.accounts[0] }, function (error, res) {
        if (error) stores.snackModel.displayError(error)
        if (res) self.likes = res.s
      })
      myContractInstance.message.call({ from: this.appWeb3.eth.accounts[0] }, function (error, res) {
        if (error) stores.snackModel.displayError(error)
        if (res) self.msg = res
      })

  }

  @action.bound
  submit = () => {
    if (!this.validationErrors && this.appWeb3.currentProvider) {
      stores.snackModel.displayMessage(`Sign your transaction in MetaMask`)
      let MyContract = this.appWeb3.eth.contract(abiApp);
      let myContractInstance = MyContract.at(AppAddress);
      let functionData = myContractInstance.setMessage.getData(this.msgText);
      this.appWeb3.eth.sendTransaction({
        to: AppAddress,
        from: this.appWeb3.eth.accounts[0],
        data: functionData,
      }, function (error, hash) {
        if (error) stores.snackModel.displayError(`An Error occured`)
        if (hash) {
          console.log(hash)
          stores.snackModel.displayMessage(
            `Success! ${hash}`)
        }
      })
    }
  }

  @action.bound
  handleKeyDown(event) {
    if (event.keyCode !== ENTER_KEY) return
    this.handleSubmitClick()
  }

  @action.bound
  handleSubmitClick = () => {
    if (!this.isMetaMaskOk) return
    this.submit()
  }

  @action.bound
  handleChange(event) {
    this.msgText = event.target.value
  }

}

class TokenModel {
  @observable investValue = ``
  @observable validationErrors = ``
  @observable isMetaMaskOk = false
  @observable appWeb3 = null

  @action
  updateProvider = (isMetaMaskOk, web3) => {
    this.isMetaMaskOk = isMetaMaskOk
    this.appWeb3 = web3
  }

  @action.bound
  submit = () => {
    if (!this.validationErrors && this.appWeb3.currentProvider) {
      stores.snackModel.displayMessage(`Sign your transaction in MetaMask`)
      this.appWeb3.eth.sendTransaction({
        to: ICOAddress,
        from: this.appWeb3.eth.accounts[0],
        value: this.appWeb3.toWei(this.investValue, "ether")
      }, function (error, hash) {
        if (error) stores.snackModel.displayError(`An Error occured`)
        if (hash) {
          console.log(hash)
            stores.snackModel.displayMessage(
            `Success! ${hash}`)
        }
      })
    }
  }

  @action.bound
  clearValidationErrors = () => {
    this.validationErrors = ``
  }
  @action.bound
  validate() {
    //console.log(this.state.investValue, typeof(this.state.investValue))
    if (this.investValue <= 0) {
      this.validationErrors = `Not valid amount`
      return false
    } else {
      this.clearValidationErrors()
      return true
    }
  }
@action.bound
  isFormValid = () => {
    this.validate()
    return !this.validationErrors.length
  }

  @action.bound
  handleKeyDown(event) {
    if (event.keyCode !== ENTER_KEY) return
    runInAction(this.handleSubmitClick)
  }

  @action.bound
  handleSubmitClick = () => {
    if (!this.isMetaMaskOk) return
    runInAction(this.submit)
  }

  @action.bound
  handleChange(event) {
    if (regExp.test(event.target.value.trim())) {
      this.investValue = parseFloat(event.target.value.trim(), 10)
    } else {
      this.validationErrors = `Should match 0,00 number format`
    }
  }
}

export { AppModel, TokenModel }


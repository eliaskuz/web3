import React from 'react'
//import { SnackBar } from '../snack-bar/component'
import logo from '../../assets/logo.svg'


const ENTER_KEY = 13
const provider = window.web3
const regExp = /-?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?/ig

const contractAddress = "0xA22473a7a745D6B767254Eff6E86b33e77965BA4";

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      investValue: ``,
      isShowingNotifier: false,
      isModalOpen: false,
      validationErrors: ``,
      isMetaMaskOk: false,
      appWeb3: null
    }
    this.clearValidationErrors = this.clearValidationErrors.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
    this.validate = this.validate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    this.input.focus()
    if (typeof provider !== 'undefined') {
      this.setState({ isMetaMaskOk: true, appWeb3: new window.Web3(provider.currentProvider) })
    } else {
      alert(`Error: no MetaMask found`)
    }
  }

  submit = () => {
    if (!this.state.validationErrors) {
      const { appWeb3, investValue } = this.state
      console.log(appWeb3.eth.accounts[0], )
      appWeb3.eth.sendTransaction({
        to: contractAddress,
        from: appWeb3.eth.accounts[0],
        value: appWeb3.toWei(investValue, "ether")
      },
        function (error) {
          alert(`An error occured`)
        }
      );
    }
  }

  handleKeyDown(event) {
    if (event.keyCode !== ENTER_KEY) return
    this.handleSubmitClick()
  }

  handleSubmitClick = () => {
    if(!this.state.isMetaMaskOk) return
    this.submit()
  }

  handleChange(event) {
    if (regExp.test(event.target.value.trim())) {
      this.setState({ investValue: parseFloat(event.target.value.trim(), 10) });
    } else {
      this.setState({ validationErrors: `Should match 0,00 number format` })
    }
  }

  clearValidationErrors = () => {
    this.setState({ validationErrors: `` })
  }

  validate() {
    //console.log(this.state.investValue, typeof(this.state.investValue))
    if (this.state.investValue <= 0) {
      this.setState({ validationErrors: `Not valid amount` })
      return false
    } else {
      this.clearValidationErrors()
      return true
    }
  }

  isFormValid = () => {
    this.validate()
    return !this.state.validationErrors.length
  }

  render() {
    return (
      <React.Fragment>
        <div className={ "auth" } >
          <div className={ "container-login" }>
            <div className={ "headline" }>Token DApp</div>
            <div className={ "outer-field outer-field--center" }>
              <img src={ logo } className="App-logo" alt="logo" />
            </div>
            <div className={ "outer-field" }>
              <input className={ "field" }
                placeholder='Expected value more than 0,05 ETH'
                type="number"
                value={ this.state.investValue }
                onChange={ this.handleChange }
                onFocus={ this.clearValidationErrors }
                onKeyDown={ this.handleKeyDown }
                onBlur={ this.validate }
                ref={ input => { this.input = input } }
              />
              <div className={ "error-label" }>
                { this.state.validationErrors }
              </div>
            </div>
            <button className={ this.state.isMetaMaskOk ? "button-submit" : "button-submit button-submit-disabled" } 
              onClick={ this.handleSubmitClick }
            >
              Submit
            </button>
          </div>
        </div>
        {/* <SnackBar/> */ }
      </React.Fragment>
    )
  }
}

export {
  Main
}
import React from 'react'
//import { SnackBar } from '../snack-bar/component'
import logo from '../../assets/logo.svg'


const ENTER_KEY = 13
const provider = window.web3
const regExp = /-?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?/ig

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
      //let web3 = new Web3(web3.currentProvider);
      this.setState({ isMetaMaskOk: true, appWeb3: new window.Web3(provider.currentProvider) })
    } else {
      // set the provider you want from Web3.providers
      alert(`Error`)
    }
  }

  submit = () => {

  }

  handleKeyDown(event) {
    if (event.keyCode !== ENTER_KEY) return
    this.handleSubmitClick()
  }

  handleSubmitClick = () => {
    this.submit()
  }

  handleChange(event) {
    if(regExp.test(event.target.value.trim())) {
      this.setState({ investValue: parseFloat(event.target.value.trim(), 10) });
    } else {
      this.setState({ validationErrors: `Should match 0,00 number format` })
    }
  }

  clearValidationErrors = () => {
    this.setState({ validationErrors: `` })
  }

  validate() {
    console.log(this.state.investValue, typeof(this.state.investValue))
    if (this.state.investValue <= 0) {
      this.setState({ validationErrors: `Not valid amount` })
    } else {
      this.clearValidationErrors()
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
            <button className={ "button-submit" }
              onClick={ this.handleSubmitClick }
            >
              Submit
            </button>
          </div>
        </div>
        {/* <SnackBar/> */}
      </React.Fragment>
    )
  }
}

export {
  Main
}
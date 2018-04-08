import React from 'react'
import { inject, observer } from 'mobx-react'
import logo from '../../assets/logo.svg'

const provider = window.web3

@inject('tokenModel', 'snackModel')
@observer
class Token extends React.Component {

  componentDidMount() {
    this.input.focus()
    if (typeof provider !== 'undefined') {
      this.props.tokenModel.updateProvider(true, new window.Web3(provider.currentProvider))
    } else {
      this.props.snackModel.displayError(`no MetaMask found`)
    }
  }
  
  render() {
    return (
      <div className={ "container-login" }>
        <div className={ "headline" }>Buy Tokens</div>
        <div className={ "outer-field outer-field--center" }>
          <img src={ logo } className="App-logo" alt="logo" />
        </div>
        <div className={ "outer-field" }>
          <input className={ "field" }
            placeholder='Expected value more than 0,05 ETH'
            type="number"
            value={ this.props.tokenModel.investValue }
            onChange={ this.props.tokenModel.handleChange }
            onFocus={ this.props.tokenModel.clearValidationErrors }
            onKeyDown={ this.props.tokenModel.handleKeyDown }
            onBlur={ this.props.tokenModel.validate }
            ref={ input => { this.input = input } }
          />
          <div className={ "error-label" }>
            { this.props.tokenModel.validationErrors }
          </div>
        </div>
        <button className={ this.props.tokenModel.isMetaMaskOk ? "button-submit" : "button-submit button-submit-disabled" }
          onClick={ this.props.tokenModel.handleSubmitClick }
        >
          Submit
            </button>
      </div>
    )
  }
}

export {
  Token
}
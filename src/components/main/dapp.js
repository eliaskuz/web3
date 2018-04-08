import React from 'react'
import { inject, observer } from 'mobx-react'

import logo from '../../assets/logo.svg'
import { app as abiApp } from '../../contracts/abi'


const provider = window.web3

@inject('appModel', 'snackModel')
@observer
class DApp extends React.Component {

  componentDidMount() {
    this.input.focus()
    if (typeof provider !== 'undefined') {
      this.props.appModel.updateProvider(true, new window.Web3(provider.currentProvider))
    } else {
      this.props.snackModel.displayError(`no MetaMask found`)
    }
  }

  render() {
    return (
      <div className={ "container-login" }>
        <div className={ "headline" }>DApp</div>
        <div className={ "outer-field outer-field--center" }>
          <img src={ logo } className="App-logo" alt="logo" />
        </div>
        <div className={ "outer-field" }>
          <input className={ "field" }
            placeholder='Like my APP and set message'
            type="text"
            value={ this.props.appModel.msgText }
            onChange={ this.props.appModel.handleChange }
            onKeyDown={ this.props.appModel.handleKeyDown }
            ref={ input => { this.input = input } }
          />
          <div className={ "error-label" }>
            { this.props.appModel.validationErrors }
          </div>
        </div>
        <button className={ this.props.appModel.isMetaMaskOk ? "button-submit" : "button-submit button-submit-disabled" }
          onClick={ this.props.appModel.handleSubmitClick }
        >
          Submit
            </button>
      </div>
    )
  }
}

export {
  DApp
}
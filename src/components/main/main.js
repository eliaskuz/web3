import React from 'react'
import { SnackBar } from '../snack-bar/component'
import { Token } from './token'
import { DApp } from './dapp'
import logo from '../../assets/logo.svg'

class Main extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className={ "auth" } >
          <Token/>
          <DApp/>
        </div>
        <SnackBar/>
      </React.Fragment>
    )
  }
}

export {
  Main
}
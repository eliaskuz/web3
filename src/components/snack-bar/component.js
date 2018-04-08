import React from 'react'
import { inject, observer } from 'mobx-react'
import { snackModel } from './model'

/**
 * Wrapper for Snackbar
 */
const SnackBar = (inject('snackModel'))(observer((props) => {
  const { snackModel } = props
  return (
    snackModel.isOpened &&
    <div className={ 'snack-bar' }>
      <div className={ 'snack-bar-wrapper' }
        onClick={ snackModel.close }>
        <span className={ 'snack-bar-info' }
        >
          { snackModel.message }
        </span>
      </div>
    </div>
  )
}))

export {
  SnackBar
}

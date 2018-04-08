import React, { Component } from 'react'
import { inject, observer, Provider } from 'mobx-react'
import stores from './components/store'
import { Main } from './components/main'
import '../src/styles/active/main.css'

@observer
class App extends Component {
  render() {
    return (
      <Provider { ...stores }>
        <Main />
      </Provider>
        )
      }
    }
    
export default App
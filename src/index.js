import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.scss'
import App from './containers/App/index.js'
import registerServiceWorker from './registerServiceWorker'
import 'typeface-roboto/index.css'
import 'material-design-icons/iconfont/material-icons.css'

import { reducer } from './reducer'
import { StateProvider } from './state'
import { initialState } from './reducer/initialState'

const Main = () => 
    <Router>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider >
    </Router>


ReactDOM.render(<Main />, document.getElementById('root'))
registerServiceWorker()

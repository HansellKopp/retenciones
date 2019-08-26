import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.scss'
import App from './containers/App/index.js'
import registerServiceWorker from './registerServiceWorker'
import 'typeface-roboto/index.css'
import 'material-design-icons/iconfont/material-icons.css'

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'))
registerServiceWorker()

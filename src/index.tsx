/// <reference types="vitest/globals" />
/// <reference types="@zardoy/vit/twin-sc" />
import React from 'react'
import ReactDOM from 'react-dom'
import './main.scss'

import 'tailwindcss/base.css'

import App from './App'
import Home from './pages/Home'

ReactDOM.render(<Home />, document.querySelector('#root'))

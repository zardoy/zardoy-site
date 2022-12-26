/// <reference types="vitest/globals" />
/// <reference types="@zardoy/vit/twin-sc" />
import ReactDOM from 'react-dom'
import './main.scss'

// import 'tailwindcss/base.css'
import 'tailwindcss/tailwind.css'

import App from './App'

ReactDOM.render(<App />, document.querySelector('#root'))

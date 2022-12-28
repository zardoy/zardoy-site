/// <reference types="vitest/globals" />
/// <reference types="@zardoy/vit/twin-sc" />
import { renderToDom } from '@zardoy/react-util'
import './main.scss'

// import 'tailwindcss/base.css'
import 'tailwindcss/tailwind.css'

import App from './App'

renderToDom(<App />, { strictMode: false })

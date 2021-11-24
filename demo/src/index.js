import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Terminal from '../../src'

import dynamicList from './commands/dynamic'
import staticList from './commands/static'

const cmd = { dynamicList, staticList }
const config = {
  prompt: '(∩｀-´)⊃━☆ﾟ.*･｡ﾟ ',
  version: '0.0.1',
  initialDirectory: '八八',
  bootCmd: 'reboot'
}


ReactDOM.render(
  <React.StrictMode>
    <Terminal className={'fade'} cmd={cmd} config={config} />
  </React.StrictMode>,
  document.querySelector('#demo')
)

const fadeEl = document.querySelectorAll('.fade')
window.addEventListener('load', function () {
  fadeEl.forEach(e => e.classList.add('in'))
})

window.addEventListener('beforeunload', function () {
  fadeEl.forEach(e => e.classList.remove('in'))
})

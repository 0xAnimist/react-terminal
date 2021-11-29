import { ascii } from "./dae0.js";


const getTime = () => {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${hours}${minutes < 10 ? ':0' : ':'}${minutes}${seconds < 10 ? ':0' : ':'}${seconds}`
}

const boot = [
  {
    type: 'system',
    color: 'white',
    content: '<strong>Daemonica Grimoire v0.0.1</strong>'
  },
  "\n","\n","\n","\n","\n","\n","\n",
]

export default {
  reboot: {
    description: 'reboot',
    run(print) {
      let i = 0
      return new Promise(resolve => {
        const interval = setInterval(() => {
          print(boot[i])
          i++
          if (!boot[i]) {
            clearInterval(interval)
            resolve([{ time: getTime(), type: 'system', content: 'interpreter ready' }])
          }
        }, 50)
      })
    }
  },
  echo: {
    description: 'Echoes input\n\n',
    run(print, input, params) {
      return new Promise(resolve => {

        let message = input + ' ' + params.join(' ');


        const width = 240;
        const left = window.innerWidth - width - 30;//30px from right side
        resolve([{label: '(^_^)', type: 'success', color: 'green', content: message }, {type: 'svg', left: left, width: width + 'px', title: "entity", payload: '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: monospace; font-size: 14px; }</style><rect width="100%" height="100%" fill="black"></rect><text x="10" y="20" class="base">blah</text></svg>'}])
      })
    }
  },
  entity: {
    description: 'mint the next or multiple entities, render an entity by id, or list your entities by id with the following commands:\n\nentity animo\nentity animo --n=#\nentity manifest --id=#\nentity hodlings\n\n',
    run(print, input, params) {
      return new Promise(resolve => {

        let message = input + ' ' + params.join(' ');


        const width = 240;
        const left = window.innerWidth - width - 30;//20px from right side
        resolve([{label: '(^_^)', type: 'success', color: 'green', content: message }, {type: 'svg', left: left, width: width + 'px', title: "entity", payload: '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: monospace; font-size: 14px; }</style><rect width="100%" height="100%" fill="black"></rect><text x="10" y="20" class="base">blah</text></svg>'}])
      })
    }
  }
}

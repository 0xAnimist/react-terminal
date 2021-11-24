import { ascii } from "./dae0.js";


const getTime = () => {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${hours}${minutes < 10 ? ':0' : ':'}${minutes}${seconds < 10 ? ':0' : ':'}${seconds}`
}

const boot = [
  ascii[0],ascii[1], ascii[2],ascii[3],ascii[4], ascii[5], ascii[6], ascii[7], ascii[8], ascii[9], ascii[10], ascii[11], ascii[12], ascii[13], ascii[14], ascii[15], ascii[16], ascii[17], ascii[18], ascii[19], ascii[20], ascii[21], ascii[22], ascii[23], ascii[24], ascii[25], ascii[26], ascii[27], ascii[28], ascii[29], ascii[30], ascii[31], ascii[32], ascii[33], ascii[34],
  {
    time: getTime(),
    type: 'system',
    label: 'loaded',
    content: 'entity contract at 0xa8d49c33ea2d86ec5ea8b8a4dd816eb5a64400E4'
  },
  {
    time: getTime(),
    type: 'system',
    label: 'loaded',
    content: 'xe.ntity contract at 0xa8d49c33ea2d86ec5ea8b8a4dd816eb5a64400E4'
  },
  {
    type: 'system',
    label: 'using',
    content: 'OccultMath for *'
  }
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
            resolve([{ type: 'success', label: 'grimoire', content: 'daemonica interpreter 0.0.1 ready' }])
          }
        }, 50)
      })
    }
  },
  echo: {
    description: 'Echoes input.',
    run(print, input) {
      return new Promise(resolve => {
        print({
          time: getTime(),
          label: 'Echo',
          type: 'success',
          content: input
        })
        resolve([{ type: 'success', label: '', content: '' }, {type: 'svg', payload: '<ul><li>svgraphics</li></ul>'}])
      })
    }
  }
}

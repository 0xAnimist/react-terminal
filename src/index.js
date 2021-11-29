import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable';

import {
  StyledTerminalWrapper,
  StyledTerminal,
  StyledTerminalInner,
  StyledInputWrapper,
  StyledInput,
  StyledPrompt,
  StyledLoadingCursor,
  StyledBlinkCursor,
  StyledCommand,
  StyledLine,
} from './style'

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'

import { systemCmdList, tipCmdList } from './commands'

import { setCaretPosition } from './utils'


class Terminal extends PureComponent {
  static propTypes = {
    cmd: PropTypes.shape({
      dynamicList: PropTypes.object,
      staticList: PropTypes.object
    }).isRequired,
    config: PropTypes.shape({
      initialDirectory: PropTypes.string,
      prompt: PropTypes.string,
      version: PropTypes.string,
      bootCmd: PropTypes.string
    }),
    className: PropTypes.string
  }

  static defaultProps = {
    className: 'react-terimnal-app',
    config: {
      initialDirectory: 'src',
      prompt: 'ツ  $ ',
      version: '0.0.1',
      bootCmd: 'reboot'
    }
  }

  historyCmdList = []
  historyCmdIndex = 0

  constructor(props) {
    super(props)
    this.$terminal = React.createRef()
    this.$inputWrapper = React.createRef()
    this.$inputEl = React.createRef()

    const { config, cmd } = props

    this.state = {
      cmdList: [],
      command: '',
      directory: config.initialDirectory,
      isPrinting: true,
      popups: []
    }

    this.supportedCmdList = [
      ...Object.keys(cmd.staticList),
      ...Object.keys(cmd.dynamicList)
    ]
    this.allCmdList = [
      ...this.supportedCmdList,
      ...(Object.keys(systemCmdList).map(key => systemCmdList[key].aliasList).flat(1))

    ]
  }

  componentDidMount() {
    const { config: { bootCmd } } = this.props
    this.run(bootCmd).then(() => {
      const { help, exit } = systemCmdList
      this.print([help, exit])
      this.inputFocus()
    })
  }

  popup = obj => {
    this.setState(prevState => ({
      popups: [...prevState.popups, obj]
    }));
  }

  closePopup = (idx) => () => {
    this.setState({
        popups: this
            .state
            .popups
            .filter((s, sidx) => idx !== sidx)
    });
  }

  run = (command, inputCommand = this.state.command, params) => {
    const { cmd } = this.props
    this.setState({ isPrinting: true })
    return cmd.dynamicList[command]
      .run(this.print, inputCommand, params)
      .then(result => {
        this.print(result[0])
        if(result.length > 1){
          this.popup(result[1])
        }
      }).catch(error => {
        console.error(error)
        this.print(tipCmdList.error)
      }).finally(() => {
        this.setState({ isPrinting: false })
      })
  }

  print = cmd => {
    this.setState(prevState =>
      ({ cmdList: [...prevState.cmdList, ...(Array.isArray(cmd) ? cmd : [cmd])] }))
    this.autoScroll()
  }

  inputFocus = () => {
    this.$inputEl.current.focus()
  }

  autoScroll = () => {
    this.$terminal.current.scrollTop = this.$inputWrapper.current.offsetTop
  }

  handleKeyCommand = e => {
    const { config: { prompt } } = this.props
    const isDownKey = e.keyCode === 40
    const isUpKey = e.keyCode === 38
    const isTabKey = e.keyCode === 9
    const isCKey = e.keyCode === 67
    const isDKey = e.keyCode === 68
    const isLKey = e.keyCode === 76
    const isCtrlCKey = isCKey && e.ctrlKey && !e.shiftKey
    const isCtrlLKey = isLKey && e.ctrlKey && !e.shiftKey

    if (isDownKey) {
      this.historyCmdIndex = Math.min(this.historyCmdIndex + 1, this.historyCmdList.length - 1)
    } else if (isUpKey) {
      this.historyCmdIndex = Math.max(this.historyCmdIndex - 1, 0)
    }
    if (isUpKey || isDownKey) {
      const historyCmd = this.historyCmdList[this.historyCmdIndex]
      if (historyCmd) {
        this.setState({ command: historyCmd })
        setTimeout(() => {
          setCaretPosition(this.$inputEl.current, historyCmd.length + 1)
        }, 0)
      }
    }

    const { command, isPrinting } = this.state
    if (isPrinting) { return }

    if (isTabKey) {
      if (!command) {
        this.setState({ command: 'help' })
      }
      const canExtendCmdList = this.allCmdList.filter(c => c.startsWith(command))
      if (canExtendCmdList && canExtendCmdList.length) {
        this.setState({ command: canExtendCmdList[Math.floor(Math.random() * canExtendCmdList.length)] })
      }
      e.preventDefault()
    }

    if (isCtrlCKey) {
      const commandArray = command.split(' ')
      const action = commandArray[0]
      const commandKey = commandArray[1]
      const params = commandArray.slice(2)
      this.print(`\n`);//`${prompt}${command}`)
      const echoCommand = {
        type: 'system',
        label: null,
        color: 'white',
        content: (commandKey === undefined) ? "<strong>" + action + "</strong>" : "<strong>" + action + " " + commandKey + ' ' + params.join(' ') + "</strong>"
      }
      this.print(echoCommand);
      this.print(`\n`);
      this.setState({ command: '' })
      e.preventDefault()
    }

    if (isCtrlLKey) {
      this.setState({ cmdList: [] })
      e.preventDefault()
    }

    this.autoScroll()
    this.inputFocus()
  }

  handleCommand = e => {
    const { cmd, config: { prompt, version: versionNumber } } = this.props
    const isEnterKey = e.keyCode === 13

    if (!isEnterKey) {
      this.handleKeyCommand(e)
      return
    }

    if (!this.state.command) {
      this.print(prompt)
      return
    }

    const command = this.state.command.toLowerCase().trim()

    this.historyCmdList.push(command)
    this.historyCmdIndex = this.historyCmdList.length

    const cmdList = []

    const commandArray = command.split(' ')
    const action = commandArray[0]
    const commandKey = commandArray[1]
    const params = commandArray.slice(2)

    this.print(`\n`);//`${prompt}${command}`)
    const echoCommand = {
      type: 'system',
      label: null,
      color: 'white',
      content: (commandKey === undefined) ? "<strong>" + action + "</strong>" : "<strong>" + action + " " + commandKey + ' ' + params.join(' ') + "</strong>"
    }
    this.print(echoCommand);
    this.print(`\n`);

    const isStaticCommand = !!cmd.staticList[command]
    const isDynamicCommand = !!cmd.dynamicList[action]

    const { exit, help, clear, version } = systemCmdList
    const { unknown, supporting } = tipCmdList

    if (exit.aliasList.includes(action)) {
      this.print(cmdList)
      window.history.go(-1)
    } else if (help.aliasList.includes(action)) {
      if (commandKey) {
        const command = cmd.staticList[commandKey] || cmd.dynamicList[commandKey]
        cmdList.push(command.description)
        this.print(cmdList)
      } else {
        cmdList.push(supporting)
        const supportedCmdList = this.supportedCmdList.map(commandKey => {
          const command = cmd.staticList[commandKey] || cmd.dynamicList[commandKey]
          return ({ type: 'system', color: 'white', label: commandKey, content: `${command.description}` })
        })
        cmdList.push(...supportedCmdList)
        cmdList.push(clear, exit)
        this.print(cmdList)
      }
    } else if (clear.aliasList.includes(action)) {
      this.setState({ cmdList: [] })
    } else if (version.aliasList.includes(action)) {
      this.print(versionNumber)
    } else if (isStaticCommand) {
      this.print(cmd.staticList[command].list)
    } else if (isDynamicCommand) {
      this.run(action, commandKey, params)
    } else if (action.trim()) {
      unknown.content = unknown.contentWithCommand(action)
      this.print([unknown, help])
    }

    this.setState({ command: '' })
    setTimeout(this.autoScroll, 0)
    this.inputFocus()
  }

  render() {
    const { className, config: { prompt } } = this.props
    const { cmdList, isPrinting, command, directory } = this.state
    return (
      <div>
        <StyledTerminalWrapper className={className}>
          <StyledTerminal ref={this.$terminal}>
            <StyledTerminalInner onClick={this.inputFocus}>
              <TransitionGroup>
                {cmdList.map((item, index) => (
                  <CSSTransition key={index} timeout={500} >
                    <StyledLine>
                      {typeof item === 'string'
                        ? (<StyledCommand className="cmd" color="white" dangerouslySetInnerHTML={{__html: item}}></StyledCommand>)
                        : (<>
                          {item.time && (<StyledCommand className="time">{item.time}</StyledCommand>)}
                          {item.label && (<StyledCommand className={item.type}>{item.label}</StyledCommand>)}
                          {item.content && (<StyledCommand className="cmd" color={item.color} dangerouslySetInnerHTML={{__html: item.content}}></StyledCommand>)}
                        </>)}
                    </StyledLine>
                  </CSSTransition>
                ))}
              </TransitionGroup>
              <StyledInputWrapper ref={this.$inputWrapper} onClick={this.inputFocus} >
                {isPrinting
                  ? (<StyledLoadingCursor>...</StyledLoadingCursor>)
                  : (<>
                    <StyledPrompt>{prompt}</StyledPrompt>
                    <StyledCommand>{command}</StyledCommand>
                    <StyledBlinkCursor>▒</StyledBlinkCursor>
                  </>)}
                <StyledInput value={command} onChange={e => { this.setState({ command: e.target.value }) }}
                  onKeyDown={this.handleCommand} autoFocus ref={this.$inputEl} />
              </StyledInputWrapper >
            </StyledTerminalInner >
          </StyledTerminal >
        </StyledTerminalWrapper >


        { this.state.popups.map((popup, idx) => (
          <Draggable
            key={idx}
            axis="both"
            handle=".handle"
            positionOffset={{x: -20, y: 20}}
            position={null}
            grid={[5, 5]}
            scale={1}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}>
            <div className="draggable-wrapper" style={{
              width: popup.width
            }}>
              <div className="handle">
                <div className="popup-title">{popup.title}</div>
                <div className="popup-x" onClick={this.closePopup(idx)}>×</div>
              </div>
              <div className={popup.type} dangerouslySetInnerHTML={{__html: popup.payload}} />
            </div>
          </Draggable>
        ))}
      </div>
    )
  }
}

export default Terminal

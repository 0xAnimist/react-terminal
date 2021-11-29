import styled, { keyframes } from 'styled-components'



export const StyledTerminalWrapper = styled.div`
  position: fixed;
  top:0;
  left:0;
  z-index:1;
  font-size: 1em;
  margin: 0 !important;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

export const StyledTerminal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow: auto;
  z-index: 1;
  margin-top: 0;
  height: 100vh;
  max-height: 100vh;
`

export const StyledTerminalInner = styled.div`
  min-height: 140px;
  padding: 0;
  margin: 2% 40% 0 12%;
  font-weight: normal;
  font-family: 'VT323', monospace;
  @media screen and (max-width: 760px) {
    padding: 20px 5px 0px 5px;
  }
`

export const StyledInputWrapper = styled.p`
  word-spacing: 0;
  letter-spacing: 0;
  word-break: break-all;
  font-weight: 400;
  -webkit-font-smoothing: antialias;
  position: relative;
  color: #eee;
  margin-bottom:100px;
`

export const StyledInput = styled.input`
  position: relative;
  background: rgb(24, 24, 24);
  border: none;
  width: 1px;
  opacity: 0;
  cursor: default;

  &:focus {
    outline: none;
    border: none;
  }
`

export const StyledPrompt = styled.span`
  word-break: break-all;
  color: #eee;
  padding: 0;
  position: absolute;
  margin-left:-12%;
  text-align: right;
  float: right;
  display: block;
  width: 10%;
`

const loadingDots = keyframes`
  0% {
    color: rgba(246, 246, 246, 1);
  }
  50% {
    color: rgba(246, 246, 246, 0.5);
  }
`

export const StyledLoadingCursor = styled.span`
  animation: ${loadingDots} 500ms steps(5, end) infinite;
`

const blinkDot = keyframes`
  50% {
    visibility: hidden;
  }
`

const colorMap = {
  white: '246, 246, 246',
  black: '24, 24, 24',
  red: '236, 103, 44',
  yellow: '241, 158, 56',
  green: '118, 252, 77'
}

export const StyledBlinkCursor = styled.span`
  margin: 0 0 0 3px;
  font-size:0.9em;
  color: rgba(${colorMap["white"]}, 0.8);
  animation: ${blinkDot} 1s step-end infinite;
`


export const StyledLine = styled.div`
  white-space: pre-wrap;
  /*word-break: break-all;*/
  margin-block-start: 0.3em;
  margin-block-end: 0.3em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  position: relative;

  .cmd {
    line-height: 1em;
    color: ${props => colorMap[props.color]};
  }

  .info {
    color: rgba(${colorMap["white"]}, 0.5);
  }

  .warning {
    color: rgba(${colorMap["yellow"]}, 1);
  }

  .success {
    color: rgba(${colorMap["green"]}, 1);
  }

  .error {
    color: rgba(${colorMap["red"]}, 1);
  }

  .system {
    color: rgba(${colorMap["white"]}, 1);
  }

  .time {
    color: rgba(${colorMap["white"]}, 0.5);
  }

  .black {
    background: #212117;
  }

  .time,
  .system,
  .error,
  .success,
  .warning,
  .info,
  .black {
    padding: 0;
    position: absolute;
    margin-left:-12%;
    text-align: right;
    float: right;
    display: block;
    width: 10%;
  }
`




export const StyledCommand = styled.span`
  white-space: pre-wrap;
  color: rgba(${props => colorMap[props.color]}, 0.5);

  strong {
    color: rgba(${props => colorMap[props.color]}, 1);
    font-weight: normal;
  }
`

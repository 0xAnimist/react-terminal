import styled, { keyframes } from 'styled-components'

export const StyledTerminalWrapper = styled.div`
  position: relative;
  font-size: 0.9em;
  margin: 0 !important;
  width: 60%;
  max-width: 1200px;
  color: #952f34;
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
  background-color: rgb(24, 24, 24);
`

export const StyledTerminalInner = styled.div`
  min-height: 140px;
  padding: 20px;
  font-weight: normal;
  font-family: "Space Mono", monospace;
  color: #952f34;
  @media screen and (max-width: 760px) {
    padding: 20px 5px 0px 5px;
  }
`

export const StyledInputWrapper = styled.p`
  word-spacing: 0;
  letter-spacing: 0;
  word-break: break-all;
  font-weight: 400;
  font-family: "Space Mono",monospace;
  color: #952f34;
  -webkit-font-smoothing: antialias;
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
  color: #952f34;
`

const loadingDots = keyframes`
  0%,
  20% {
    color: #952f34;
    text-shadow: 0.25em 0 0 #952f34, 0.5em 0 0 #952f34;
  }
  40% {
    color: red;
    text-shadow: 0.25em 0 0 #952f34, 0.5em 0 0 #952f34;
  }
  60% {
    color: #952f34;
    text-shadow: 0.25em 0 0 #952f34, 0.5em 0 0 #952f34;
  }
  80%,
  100% {
    color: red;
    text-shadow: 0.25em 0 0 #952f34, 0.5em 0 0 #952f34;
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

export const StyledBlinkCursor = styled.span`
  margin: 0 0 0 5px;
  color: #952f34;
  animation: ${blinkDot} 1s step-end infinite;
`

export const StyledLine = styled.div`
  word-break: break-all;
  margin-block-start: 0.3em;
  margin-block-end: 0.3em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;

  .cmd {
    line-height: 0.9em;
  }

  .info {
    background: #2980b9;
  }

  .warning {
    background: #f39c12;
  }

  .success {
    color: #0000B2;
    background: #28FE14;
  }

  .error {
    background: red;
  }

  .system {
    color: #28FE14;
  }

  .time {
    color: #28FE14;
    background: #0000B2;
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
    margin-right: 8px;
    padding: 0;
  }
`



const backgroundColorMap = {
  red: 'rgb(200, 48, 48)',
  yellow: 'rgb(247, 219, 96)',
  green: 'rgb(46, 201, 113)'
}


export const StyledCommand = styled.span`
  font-size: inherit;
  white-space: pre;
`

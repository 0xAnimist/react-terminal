export const systemCmdList = {
  clear: {
    type: 'system',
    label: 'wizxrd',
    content: 'type "clear" to clear the terminal screen',
    aliasList: ['clear', 'cls']
  },
  help: {
    type: 'system',
    label: 'wizxrd',
    content: 'type "help" for a list of spells',
    aliasList: ['help', 'ls']
  },
  exit: {
    type: 'system',
    label: 'normie',
    content: 'type "exit" to display a (minimal) clickable interface',
    aliasList: ['exit', 'back']
  },
  version: {
    type: 'system',
    label: 'wizxrd',
    content: 'print version of the current grimoire',
    aliasList: ['version']
  }
}

export const tipCmdList = {
  jump: {
    type: 'system',
    label: 'System',
    content: 'Jumping page...'
  },
  unknown: {
    type: 'error',
    label: 'Error',
    contentWithCommand: command => `Command '${command}' not found`
  },
  error: {
    type: 'error',
    label: 'Error',
    content: 'Something went wrong!'
  },
  supporting: 'a list of supported commands'
}

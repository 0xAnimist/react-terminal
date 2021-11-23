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
  pwd: {
    type: 'system',
    label: 'wizxrd',
    content: 'print name of current directory',
    aliasList: ['pwd']
  },
  cd: {
    type: 'system',
    label: 'wizxrd',
    content: 'change current directory',
    aliasList: ['cd']
  },
  version: {
    type: 'system',
    label: 'wizxrd',
    content: 'print version of the current project',
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
  supporting: 'Here is a list of supporting command.'
}

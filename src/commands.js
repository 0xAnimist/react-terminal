export const systemCmdList = {
  clear: {
    type: 'system',
    label: 'system',
    content: 'Type "clear" to clear the terminal screen.',
    aliasList: ['clear', 'cls']
  },
  help: {
    type: 'system',
    label: 'system',
    content: 'Type "help" for a list of spells.',
    aliasList: ['help', 'ls']
  },
  exit: {
    type: 'system',
    label: 'system',
    content: 'Type "exit" to display a (minimal) clickable interface.',
    aliasList: ['exit', 'back']
  },
  pwd: {
    type: 'system',
    label: 'system',
    content: 'Print name of current directory.',
    aliasList: ['pwd']
  },
  cd: {
    type: 'system',
    label: 'system',
    content: 'Change current directory.',
    aliasList: ['cd']
  },
  version: {
    type: 'system',
    label: 'system',
    content: 'Print version of the current project.',
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

export const systemCmdList = {
  clear: {
    type: 'info',
    color: 'white',
    content: 'type <strong>clear</strong> to clear the terminal screen',
    aliasList: ['clear', 'cls']
  },
  exit: {
    type: 'info',
    color: 'white',
    content: 'type <strong>gui</strong> for a (minimal) clickable interface',
    aliasList: ['exit', 'back', 'gui']
  },
  help: {
    type: 'info',
    color: 'white',
    content: 'type <strong>spells</strong> for a list of operations',
    aliasList: ['help','spells']
  },
  version: {
    type: 'info',
    color: 'white',
    content: 'type <strong>version</strong> print version of the current grimoire',
    aliasList: ['version', '-v']
  }
}

export const tipCmdList = {
  unknown: {
    type: 'error',
    label: '(>_<)',
    color: 'red',
    contentWithCommand: command => `command <strong>'${command}'</strong> not found`
  },
  error: {
    type: 'error',
    label: '(>_<)',
    color: 'red',
    content: 'something went wrong'
  },
  supporting: 'Spells allow you to interact with and manipulate the Daemonica universe. They take the form of: <strong>noun verb --param=value</strong>. The use of verbs and params depends on the noun, which are listed below to the left in bright white text. The grey text to the right of each describes what the noun does and whether or not any verbs and params apply and how to use them.\n\n'
}

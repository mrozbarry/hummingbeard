
window.HummingbeardActions = window.HummingbeardActions || {}

window.HummingbeardActions.Account = Reflux.createActions [
  # Reflects online/busy/away/offline
  'stateChange'
  # Changing your display name, or status text (ie reason for being away)
  'statusChange'
  # Sub-data from stateChange
  'login'
  'logout'
  # Contact state change
  'contactStateChange'
  'contactStatusChange'
]



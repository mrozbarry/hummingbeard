
window.HummingbeardActions = window.HummingbeardActions || {}

window.HummingbeardActions.Account = Reflux.createActions [
  # Account state (on/off)
  'stateChange'
  # Account authentication
  'login'
  'logout'
  # Reflects online/busy/away/offline
  'statusChange'
]



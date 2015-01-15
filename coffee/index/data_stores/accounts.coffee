# window.HummingbeardActions.Account = Reflux.createActions [
#   # Account state (on/off)
#   'stateChange'
#   # Account authentication
#   'login'
#   'logout'
#   # Reflects online/busy/away/offline
#   'statusChange'
# ]

window.HummingbeardStores = {} unless window.HummingbeardStores?

window.HummingbeardStores.Account = Reflux.createStore
  init: ->
    @listenTo window.HummingbeardActions.Account.login, @onLogin

    console.log "Account Store :: Init"

  onLogin: (account) ->
    protocol = window.Hummingbeard.Protocol[account.protocol]
    if protocol?
      #
    else
      window.HummingbeardActions.Account.cannot_login(account, 'Protocol not installed.')



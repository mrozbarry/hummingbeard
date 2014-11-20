
{ div, span, a } = React.DOM

MainWindow = React.createClass
  getInitialState: ->
    { current: null, components: { accounts: HummingbeardAccounts(), conversations: HummingbeardConversations() } }

  componentWillMount: ->
    $("a", @props.navDom).click (e) =>
      e.preventDefault()
      valid = [ 'accounts', 'conversations' ] #, 'settings' ]
      page = $(e.target).attr('href').substr(1)
      if page in valid
        $("a.primary", @props.navDom).removeClass("primary").addClass("secondary")
        $(e.target).removeClass("secondary").addClass("primary")
        @setState current: page

    @setState current: 'accounts'

  render: ->
    div {},
      for k, v of @state.components
        div className: (if k == @state.current then 'show' else 'hide'),
          v

window.HummingbeardMainWindow = MainWindow



{ div, span, a } = React.DOM

MainWindow = React.createClass
  getInitialState: ->
    { current: null, components: { accounts: HummingbeardAccounts(), contacts: HummingbeardContacts() } }

  componentWillMount: ->
    $("a", @props.navDom).click (e) =>
      e.preventDefault()
      valid = [ 'accounts', 'contacts' ] #, 'settings' ]
      page = $(e.target).attr('href').substr(1)
      if page in valid
        $("a.primary", @props.navDom).removeClass("primary").addClass("secondary")
        $(e.target).removeClass("secondary").addClass("primary")
        @setState current: page

    @setState current: 'contacts'

  render: ->
    div {},
      for k, v of @state.components
        div key: k, className: (if k == @state.current then 'show' else 'hide'),
          v

window.HummingbeardMainWindow = MainWindow


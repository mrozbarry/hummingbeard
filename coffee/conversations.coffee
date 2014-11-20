{div, span, button, img, h3, input, label, br, fieldset} = React.DOM

ConversationSearch = React.createClass
  showOptionFields: ->
    $(@refs.optionFields.getDOMNode()).removeClass("hide").addClass("show")

  hideOptionFields: ->
    $(@refs.optionFields.getDOMNode()).removeClass("show").addClass("hide")

  componentDidMount: ->
    $("*", @refs.panel.getDOMNode()).blur(@hideOptionFields)
    $("*", @refs.panel.getDOMNode()).focus(@showOptionFields)

  render: ->
    div className: 'small-12 columns',
      div className: 'panel', ref: 'panel',
        label {},
          input className: 'radius', type: 'text', placeholder: 'Search Conversations', ref: 'input'
        div ref: 'optionFields', className: 'hide',
          input id: 'show_online_only', type: 'checkbox'
          label htmlFor: 'show_online_only', "Show online accounts only"
          br {}
          input id: 'hide_archived', type: 'checkbox'
          label htmlFor: 'hide_archived', "Hide archived conversations"


ConversationDisplay = React.createClass

  getInitialState: ->
    { selected: false }

  selectedChange: ->
    @props.changeSelectedAccount @props.account, ($(@refs.selected.getDOMNode()).prop("checked") == true)

  componentDidMount: ->
    { panel, selected } = @refs
    $myInput = $(selected.getDOMNode())
    $panel = $(panel.getDOMNode())
    $myInput.change (e) =>
      @setState selected: $myInput.prop("checked")
      @selectedChange() #if $myInput.prop("checked") == true

    $panel.click (e) =>
      $previous = $ "input[name='selectedAccount']:checked"
      $myInput.prop("checked", !$myInput.prop("checked") )
      $previous.trigger "change" unless $previous[0] == $myInput[0]
      $myInput.trigger "change"

  render: ->
    panel_class = 'panel'
    panel_class = 'panel callout' if @state.selected == true
    div className: 'small-12 columns',
      input type: 'radio', name: 'selectedAccount', className: 'hide', ref: 'selected'
      div className: panel_class, ref: 'panel',
        div className: 'row',
          div className: 'small-2 columns',
            img src: 'http://placehold.it/64x64', alt: 'your profile picture'
          div className: 'small-8 columns',
            div className: 'row',
              div className: 'small-12 columns',
                h3 {}, @props.account.alias
            div className: 'row',
              div className: 'small-12 columns',
                span {}, @props.account.protocol.join " / "
          div className: 'small-2 columns',
            br {}
            div className: 'switch large right round',
              input id: "account-#{@props.key}-active", type: 'checkbox'
              label htmlFor: "account-#{@props.key}-active"

AccountsAction = React.createClass
  render: ->
    button className: 'button action primary text-centered', onClick: @props.action,
      span className: "fa fa-#{@props.button.icon}"
      " #{@props.button.text}"


Conversations = React.createClass
  getInitialState: ->
    account_types = [ ["jabber", "Google Hangouts", "@gmail.com"], ["jabber", "Hipchat", ""], ["irc", "Internet Relay Chat", ""] ]
    account_names = [ "DeepRoy_xXx", "master_cheif_94", "sohawtritenow", "sorrowman", "thATGuy", "Alex", "James" ]
    accounts = []
    for i in [0..10]
      type_idx = Math.floor Math.random() * account_types.length
      type = account_types[ type_idx ]
      name_idx = Math.floor Math.random() * account_names.length
      name = account_names[ name_idx ]
      accounts.push { alias: name, name: name + type[2], protocol: [ type[0], type[1] ] }

    { accounts: accounts, selectedAccount: null }

  render: ->
    div className: 'row with_button main_list',
      ConversationSearch()

window.HummingbeardConversations = Conversations

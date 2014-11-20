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


ContactDisplay = React.createClass
  render: ->
    title = @props.contact.buddies[0].name
    if @props.contact.buddies.length == 2
      title = @props.contact.buddies.map( (buddy) -> buddy.short_name ).join " and "
    else if @props.contact.buddies.length > 2
      other = 'others'
      extra = @props.contact.buddies.length - 2
      other = 'other' if extra == 1
      title = @props.contact.buddies[0..1].map( (buddy) -> buddy.short_name ).join(", ") + ", and #{extra} #{other}"

    panel_class = 'panel'
    c_size = Math.ceil 12 / @props.contact.buddies.length
    avatar_column = 'small-#{c_size}'
    div className: 'small-12 columns',
      input type: 'radio', name: 'selectedAccount', className: 'hide', ref: 'selected'
      div className: panel_class, ref: 'panel',
        div className: 'row',
          div className: 'small-2 columns',
            img src: @props.contact.buddies[0].avatar, alt: 'profile picture'
          div className: 'small-8 columns',
            div className: 'row',
              div className: 'small-12 columns',
                h3 {}, title
              div className: 'small-12 columns',
                span {}, "Last message dd-mm-yyyy"
              div className: 'small-12 columns',
                span {}, @props.contact.account.protocol[0] + " / #{@props.contact.account.alias}"
          div className: 'small-2 columns',
            br {}
            div className: 'right',
              input type: 'checkbox'

Contacts = React.createClass
  getInitialState: ->
    buddy_names = [
      { name: "Alex Barry", short_name: "Alex", username: "alex@mrbarry.com", avatar: "http://placehold.it/128x128" }
      { name: "Bob Belcher", short_name: "Bob", username: "bob@mrbarry.com", avatar: "http://placehold.it/128x128" }
      { name: "Hank Hill", short_name: "Hank", username: "hank@mrbarry.com", avatar: "http://placehold.it/128x128" }
      { name: "Peter Parker", short_name: "Peter", username: "peter@mrbarry.com", avatar: "http://placehold.it/128x128" }
      { name: "Churck Norris", short_name: "Chuck", username: "chuck@mrbarry.com", avatar: "http://placehold.it/128x128" }
      { name: "Eric Cartman", short_name: "Eric", username: "eric@mrbarry.com", avatar: "http://placehold.it/128x128" }
    ]
    buddy_lists = [
      { alias: "Personal", username: "alex+personal@mrbarry.com", protocol: ["Google Hangouts", "Jabber"] }
      { alias: "Work", username: "alex+work@mrbarry.com", protocol: ["Google Hangouts", "Jabber"] }
    ]
    contacts = []
    for i in [0..4]
      conversation = { buddies: [], account: null }
      participants = Math.floor Math.random() * buddy_names.length
      for j in [0..participants]
        conversation.buddies.push buddy_names[ Math.floor Math.random() * buddy_names.length ]
      conversation.account = buddy_lists[ Math.floor Math.random() * buddy_lists.length ]
      contacts.push conversation
    { contacts: contacts }

  newMessage: ->
    console.log "Contacts.newMessage"

  render: ->
    div className: 'row with_button main_list',
      ConversationSearch()
      @state.contacts.map (contact, idx) ->
        ContactDisplay key: idx, contact: contact
      button className: 'button action primary text-centered', onClick: @newMessage,
        span className: 'fa fa-plus'
        " New Message"

window.HummingbeardContacts = Contacts

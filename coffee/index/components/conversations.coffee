{div, span, button, img, h1, input, label, i, p, br} = React.DOM

ConversationSearch = React.createClass
  displayOptions: (e) ->
    e.preventDefault()
    container = @refs.moreOptions.getDOMNode()
    container.style.display = if container.style.display == 'none' then 'block' else 'none'

  render: ->
    return div className: 's12 cols',
      div className: 'card z-depth-2',
        div className: 'card-content',
          span className: 'card-title black-text', 'Find Conversation'
          p {}, #'Main search box goes here'
            input type: 'text', placeholder: 'Search Conversations', ref: 'input'
            div style: { display: 'none' }, ref: 'moreOptions',
              input id: 'show_online_only', type: 'checkbox'
              label htmlFor: 'show_online_only', "Show from online accounts only"
              br {}
              input id: 'hide_archived', type: 'checkbox'
              label htmlFor: 'hide_archived', "Hide archived conversations"

        div className: 'card-action',
          a href: '', onClick: @displayOptions, ref: 'displayOptions', 'More options...'

ConversationItem = React.createClass
  getInitialState: ->
    hexValues = '0123456789ABCDEF'.split('')
    color = '#'
    [0..5].map (i) ->
      color += hexValues[ Math.floor( Math.random() * hexValues.length ) ]
    { color: color, footerDisplay: 'none' }

  toggleFooter: ->
    @setState footerDisplay: if @state.footerDisplay == 'block' then 'none' else 'block'

  render: ->
    div className: 'card',
      div className: 'card-content', style: { background: @state.color, position: 'relative' }, onClick: @toggleFooter,
        a href: '',
          span {}, 
            'Open'
            br {}
            'Conversation'
        #img src: 'http://placehold.it/512x128', alt: 'account-cover-image'
        span className: 'card-title', @props.contact.username
        p {}, @props.contact.status
        p {}, @props.contact.account.protocol
      div className: 'card-footer', style: { display: @state.footerDisplay },
        p {},
          div className: 'row',
            div className: 's8 col',
              a href: '', className: 'waves-effect waves-light btn', 'Archive Conversation'
            div className: 's4 col',
              input type: 'checkbox', id: "conversation-#{@props.contact.guid}-notifications"
              label htmlFor: "conversation-#{@props.contact.guid}-notifications", 'Notifications'

ConversationBox = React.createClass
  render: ->
    div className: 'row',
      div className: 's12 col',
        ConversationSearch {}
      div className: 's12 col',
        [0..5].map (i) ->
          ConversationItem key: i, contact: { guid: "0000-ABCD-000#{i}", username: 'alex.barry@gmail.com', status: 'Online', account: { protocol: 'Google Hangouts' } }
      div className: 's12 col', style: { 'text-align': 'center', 'font-size': '1.5em' },
        br {},
        a href: '', className: 'btn-floating', title: 'Add Account',
          i className: 'mdi-social-person-add'

window.HummingbeardConversations = ConversationBox

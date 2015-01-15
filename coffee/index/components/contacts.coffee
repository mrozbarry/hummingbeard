{div, span, button, img, h1, input, label, i, p, br} = React.DOM


ContactItem = React.createClass
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
      div className: 'card-content', style: { background: @state.color }, onClick: @toggleFooter,
        #img src: 'http://placehold.it/512x128', alt: 'account-cover-image'
        span className: 'card-title', @props.contact.username
        p {}, @props.contact.status
        p {}, @props.contact.account.protocol
      div className: 'card-footer', style: { display: @state.footerDisplay },
        p {},
          div className: 'row',
            div className: 's8 col',
              button className: 'waves-effect waves-light btn', 'Edit'
            div className: 's4 col',
              input type: 'checkbox', id: "contact-#{@props.contact.guid}-enabled"
              label htmlFor: "contact-#{@props.contact.guid}-enabled", 'Enabled'
              br {}
              input type: 'checkbox', id: "contact-#{@props.contact.guid}-notifications"
              label htmlFor: "contact-#{@props.contact.guid}-notifications", 'Notifications'


ContactsBox = React.createClass
  render: ->
    div className: 'row',
      div className: 's12 col',
        [0..5].map (i) ->
          ContactItem key: i, contact: { guid: "0000-ABCD-000#{i}", username: 'alex.barry@gmail.com', status: 'Online', account: { protocol: 'Google Hangouts' } }
      div className: 's12 col', style: { 'text-align': 'center', 'font-size': '1.5em' },
        br {}
        a href: '', className: 'btn-floating', title: 'Add Account',
          i className: 'mdi-social-person-add'

window.HummingbeardContacts = ContactsBox

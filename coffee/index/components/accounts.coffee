{div, span, button, img, h1, input, label, i, p} = React.DOM


AccountsItem = React.createClass
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
        span className: 'card-title', @props.account.username
        p {}, @props.account.protocol
      div className: 'card-footer', style: { display: @state.footerDisplay },
        p {},
          'Status: '
          span {}, @props.account.status
          div className: 'row',
            div className: 's6 col',
              button className: 'waves-effect waves-light btn', 'Edit'
            div className: 's6 col', style: { 'text-align': 'right' },
              input type: 'checkbox', id: "account-#{@props.account.guid}-enabled"
              label htmlFor: "account-#{@props.account.guid}-enabled", 'Enable Account'

AccountsBox = React.createClass
  render: ->
    div className: 'row',
      div className: 's12 col',
        [0..5].map (i) ->
          AccountsItem key: i, account: { guid: "0000-ABCD-000#{i}", username: 'alex.barry@gmail.com', protocol: 'Google Hangouts' }
      div className: 's12 col', style: { 'text-align': 'center', 'font-size': '1.5em' },
        a href: '', className: 'btn-floating', title: 'Add Account',
          i className: 'mdi-content-add'

window.HummingbeardAccounts = AccountsBox

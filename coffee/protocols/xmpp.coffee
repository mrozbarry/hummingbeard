
#sasl
#  [
#    ['Plain', 'PLAIN'],
#    ['MD5', 'DIGEST-MD5'],
#    ['External', 'EXTERNAL']
#  ]
class Xmpp
  client: null
  settings: [
      ['User ID', 'jid', null, ''],
      ['Password', 'password', null, ''],
      ['XMPP Server Address', 'host', null, ''],
      ['SASL Authentication', 'preferred', null, [['Plain', 'PLAIN'], ['Md5', 'DIGEST-MD5'], ['External', 'EXTERNAL']]],
      ['BOSH Endpoint', 'boshURL', null, null],
      ['WebSockets Endpoint', 'websocketsURL', null, null],
      []
    ]
  config:
    host: ''
    boshURL: null
    websocketsURL: null
    register: false
    port: 5222

  constructor: ->


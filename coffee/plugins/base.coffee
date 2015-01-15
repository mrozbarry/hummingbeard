

class Base extends Settings
  constructor: (type, name, config = null) ->
    super config
    @type = type
    @name = name
    @actions = Reflux.createActions ['enabled']
    @addGroup 'general', 'General Settings'
    @addSetting 'enabled', true, [true, false], 'Enabled', 'Whether or not #{@name} is enabled', 'general'

  assert: (truth, message) ->
    console.debug message unless truth

  onEnabledChanged: (enabled) ->
    @set 'enabled', false, 'general'

  install: ->
    @assert false, "Cannot install plugin #{@type}:#{@name} using Base plugin"

  uninstall: ->
    @assert false, "Cannot install plugin #{@type}:#{@name} using Base plugin"

  load: ->
    @assert false, "Cannot load plugin #{@type}:#{@name} using Base plugin!"

  unload: ->
    @assert false, "Cannot unload plugin #{@type}:#{@name} using Base plugin!"


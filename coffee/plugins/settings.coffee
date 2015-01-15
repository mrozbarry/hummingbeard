
class Settings
  constructor: (inherited) ->
    @_groups = []

  hasSettings: ->
    if @_groups.length > 0
      for group in @_groups
        return true if group.settings.length > 0
    false

  mergeOptions: (params, defaults) ->
    opts = params || {}
    for k,v of defaults
      opts[k] = v unless opts[k]?
    opts

  objectKeys: (object, keysAllowed) ->
    o = {}
    for k,v of object
      if keysAllowed.indexOf(k) >= 0
        if v instanceOf Object
          o[k] = @objectKeys(v, keysAllowed)
        else
          o[k] = v
    return o

  addGroup: (name, displayName) ->
    @_groups << { name: name, display: displayName, settings: [] }
    (@_groups.length-1)

  findGroupId: (name) ->
    for group, index in @_groups
      return index if group.name == name
    null

  findGroup: (name) ->
    index = @findGroupId(name)
    return @_groups[index] if index
    null

  findSettingId: (name, group = null) ->
    for grp, grp_idx in @_groups
      continue if group? && ( !(grp.name == group) || !(grp_idx == group) )
      for setting, s_idx in group.settings
        return [grp_idx, s_idx] if setting.name == name
    null

  findSetting: (name, group = null) ->
    indexes = @findSettingId name, group
    return @_group[indexes[0]].settings[indexes[1]] if indexes?
    return null


  addSetting: (name, default_value = null, restrict = null, displayName = null, helpText = null, group = "main") ->
    # if the current settings group does not exist, create it
    # add the setting to the group
    # sets the current setting option to this option
    index = findGroupId(group)
    index = addGroup(group, group[0].toUpperCase + group.substr(1).toLowerCase()) unless index
    display = displayName || (name[0].toUppercase + name.substr(1).toLowerCase())
    @_groups[index].settings << {name: name, display: display, help: helpText, value: default_value, restrict: restrict}

  set: (name, value, group = null) ->



  settings: (options) ->
    opts = @mergeOptions(options, {grouped: true, minimal: true})
    settings = null
    if opts.grouped
      settings = @_groups
    else
      settings = []
      for group in @_groups
        settings += group.settings
    if settings && settings.length > 0 && opts.minimal
      settings = settings.map (setting) =>
        @objectKeys(setting, ['name', 'value', 'settings'])

    settings

window.HummingBeard.Protocol._Settings = Settings

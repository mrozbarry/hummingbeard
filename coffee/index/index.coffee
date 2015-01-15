
$(document).ready ->
  #React.renderComponent(
  #  HummingbeardMainWindow( navDom: document.getElementById("mainNav") ),
  #  document.getElementById("body")
  #)
  React.renderComponent HummingbeardConversations(), document.getElementById('conversations')
  React.renderComponent HummingbeardContacts(), document.getElementById('contacts')

  $('ul.tabs').tabs()
  $('.card-content, .card-content *').mousedown((e) ->
    $(this).data 'mouse-down', Date.now()
  ).mouseup((e) ->
    total = Date.now() - $(this).data('mouse-down')
    if (total <= 150)
      $(this).parent(".card").find(".card-footer a:first").trigger 'click'
    else
      $(this).parent(".card").children(".card-footer").toggle()
  )

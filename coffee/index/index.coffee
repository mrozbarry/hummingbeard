
$(document).ready ->
  React.renderComponent(
    HummingbeardMainWindow( navDom: document.getElementById("mainNav") ),
    document.getElementById("body")
  )

  $("#quit").click (e) ->
    e.preventDefault()
    window.close()

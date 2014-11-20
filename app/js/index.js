
(function($){
  $(document).ready(function(){
    React.renderComponent(
      HummingbeardMainWindow({
        navDom: document.getElementById("mainNav")
      }),
      document.getElementById("body")
    );

    $(".custom-nav > a, #mainNav > li > a").click(function(e){
      e.preventDefault();
      if ( $(this).attr("href") == "#quit" ) window.close()
    });
  });
})(jQuery);


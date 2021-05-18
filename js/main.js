
window.onload = function(){
    $(".select-wrap").each(function(){
        $(this).hide();
    });
  };

function showFilter(){
    $(".select-wrap").toggle();
}

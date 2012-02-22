client.studio.formhelpers = function () {
    var that = client.studio.formhelpers;
    $('form').each(function (){
        var name = $(this).attr("name");

        if(typeof that[name] ===  'function'){
            that[name]($(this));
        }
    });

};

client.studio.formhelpers.createApp = function (form){
  form.submit(function (){
      var name =$('input[name="appname"]',this).val();
      // TODO: validation on this form. 
      // In event of failure, prevent default

     return false;
  });
};
$('document').ready(function () {
    $('body').bind('firedup',function () {
       client.studio.formhelpers();
    });
});
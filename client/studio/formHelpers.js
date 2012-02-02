/**
 * Created by JetBrains WebStorm.
 * User: kelly
 * Date: 02/02/2012
 * Time: 20:55
 * To change this template use File | Settings | File Templates.
 */
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
      console.log(name);
     $.post("/apps/create",{"appname":name},function (data){
         console.log(data);
     });

     return false;
  });
};
$('document').ready(function () {
    console.log("ready");
    $('body').bind('fireitup',function () {
        console.log("fireitup");
       client.studio.formhelpers();
    });
});
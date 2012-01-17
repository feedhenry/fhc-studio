$(function() {
    var editors = [];
    var active = {};
    $('.edittab').each(function(){

        editors.push(ace.edit($(this).attr("id")));
    });
    active = editors[0];
    var loadSnippet = function (){
        var id = $(this).attr("id");
        console.log(id);
        active.getSession().setValue(id);
    };
    $('#tab1').click(function(){active = editors[0]; console.log(active);});
    $('.snippet').click(loadSnippet);


});
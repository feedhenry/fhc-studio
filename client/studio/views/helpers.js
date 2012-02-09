var helpers = {
  getTpl : function(chunk,context){
    var tpl = context.get("tpl");
    if(tpl && tpl!== ""){
        chunk.partial(tpl.toLowerCase(),context);
    }
  },
  tabLayoutHelper : function (chunk,context){
      //context is the data and chunk is the piece of template
      var tab = context.get("tab");
      if(_.isString(tab) && tab !== ""){
          chunk.partial('app/' + tab.toLowerCase(),context);
      }
  },
  appBarHelper : function(chunk, context){
    
  },
  filesTreeHelper : function(chunk, context){
    var tab = context.get("tab");
    if (tab==='editor'){
      chunk.partial('filestree', context);
    }
    
  },
  navigationHelper : function(chunk, context){
    var page = context.get("tpl");
    var tab = context.get("tab");
    if (tab && tab==='editor'){
      chunk.partial('navigation/editor', context);
    }else{
      chunk.partial('navigation/default', context);
    }
  },
  renderAppBar : function(chunk, context){
    
    var active = context.get('tab');
    if (!active || active.trim()===""){
      active = context.get('tpl');
    }
    
    $('body').on('firedup', function(){
      $('.appBar ul li').removeClass('active');
      $('.appBar ul li#' + active + 'Link').addClass('active');
    });
    
    var obj = {};
    obj[active + 'Active'] = true;
    context.stack.head[active + 'Active'] = true; // TODO: Fix this. Dust silly, or Cian silly?
    
    chunk.partial('appbar', context);
  },
};
// Some hax to make this file work both clientside and serverside

var exports = exports || {};
exports.helpers = helpers;

var client = client || null;
if (client){
  client.studio.views = client.studio.views || {};
  client.studio.views.helpers = dust.makeBase(helpers);
}

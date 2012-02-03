client.studio.views = client.studio.views || {};
client.studio.views.helpers = dust.makeBase({
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
    }
});
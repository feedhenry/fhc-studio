client.studio.views = client.studio.views || {};
client.studio.views.helpers = dust.makeBase({
    tabLayoutHelper : function (chunk,context){
        //context is the data and chunk is the piece of template
        var tab = context.get("tab");
        if(_.isString(tab) && tab !== ""){
            chunk.partial(tab.toLowerCase(),context);
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

    isNthItem : function(chunk, context, bodies, params) {
      if (context.stack.index === parseInt(params.n, 10)) {
        return bodies.block(chunk, context);
      } else {
        return chunk;
      }
    },

    configInput : function(chunk, context) {
      var inputName = 'config[' + context.get('platform') + '][' + context.get('name') + ']',
          constraint = context.get('constraint'),
          value = context.get('value'),
          options;
      chunk.write('<label for="' + inputName + '">' + context.get('title') + '</label>');
      switch(context.get('type')) {
        case "string":
          return chunk.write('<input type="text" name="' + inputName + ']" value="' + value + '"/>');
        case "boolean":
          return chunk.write('<input type="checkbox" name="' + inputName + ']" value="true" checked="' + (value === 'true') + '"/>');
        case "select":
          options = !constraint ? '' : constraint.map(function(o, idx) { return '<option' + (o === value ? ' selected="true">' : '>') + o + '</option>'; });
          return chunk.write('<select name="' + inputName + ']">' + options + '</select>');
      }
    }
});

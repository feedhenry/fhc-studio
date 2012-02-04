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
      var platform = context.get('platformName'),
          key = context.get('name'),
          value = context.get('value'),
          inputId = ['input', 'config', platform, name].join('_'),
          constraint = context.get('constraint'),
          options;
      chunk.write('<label for="' + inputId + '">' + context.get('title') + '</label>');
      chunk.write('<input type="hidden" name="platform" value="' + platform + '"/>');
      chunk.write('<input type="hidden" name="key" value="' + key + '"/>');
      switch(context.get('type')) {
        case "string":
          return chunk.write('<input name="value" type="text" id="' + inputId + '" value="' + value + '"/>');
        case "boolean":
          return chunk.write('<input name="value" type="checkbox" id="' + inputId + '" value="true" checked="' + (value === 'true') + '"/>');
        case "select":
          options = !constraint ? '' : constraint.map(function(o, idx) { return '<option' + (o === value ? ' selected="true">' : '>') + o + '</option>'; });
          return chunk.write('<select name="value" id="' + inputId + '">' + options + '</select>');
      }
    }
});

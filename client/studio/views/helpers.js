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
          inputName = 'config[' + platform + '][' + context.get('name') + ']',
          inputId = 'input_' + inputName.replace(/[][]+/g, '_'),
          constraint = context.get('constraint'),
          value = context.get('value'),
          options;
      chunk.write('<label for="' + inputId + '">' + context.get('title') + '</label>');
      switch(context.get('type')) {
        case "string":
          return chunk.write('<input type="text" id="' + inputId + '" name="' + inputName + '" value="' + value + '"/>');
        case "boolean":
          return chunk.write('<input type="checkbox" id="' + inputId + '" name="' + inputName + '" value="true" checked="' + (value === 'true') + '"/>');
        case "select":
          options = !constraint ? '' : constraint.map(function(o, idx) { return '<option' + (o === value ? ' selected="true">' : '>') + o + '</option>'; });
          return chunk.write('<select id="' + inputId + '" name="' + inputName + '">' + options + '</select>');
      }
    }
});

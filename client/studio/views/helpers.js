function translateKey(context, key) {
  var path = key.split('.'),
      lookup = context.get('lang'),
      i;

  console.log(path);
  for (i = 0; i < path.length && (typeof lookup === "object"); i++) {
    lookup = lookup[path[i]];
  }

  if (lookup === undefined) {
    return '<span style="color:red;">MISSING TRANSLATION ' + path.join('.') + '</span>';
  } else {
    return lookup;
  } //TODO another case – lookup is not a string
}

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
    previewHelper : function(chunk, context){
      var tab = context.get('tab'),
      compact = false;
      if (tab==="dashboard"){
        compact = true;
      }
      context = context.push({ compact : compact });
      chunk.partial('app/preview', context);
    },
    filesTreeHelper : function(chunk, context){
    	var tab = context.get("tab");
    	if (tab==='editor'){
    		chunk.partial('filestree', context);
    	}
    },

    t : function(chunk, context, bodies, params) {
      //TODO Fixing stuff below would enable possibility to have keys like "one.two.{three}".
      //if (typeof params.key === 'function') {
      //  //return chunk.map(function(chk) {
      //  //  chunk.capture(params.key, context, function(out, chunk) {
      //  //    return chunk.end(translateKey(out));
      //  //  });
      //  //});
      //} else {
        return chunk.write(translateKey(context, params.key));
      //}
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
          inputName = 'config[' + key + ']',
          inputId = ['input', 'config', platform, key].join('_'),
          constraint = context.get('constraint'),
          options;
      chunk.write('<label for="' + inputId + '">');
      //context.get('t')(chunk, context, null, {key: context.get('title')});
      chunk.write(translateKey(context, context.get('title')));
      chunk.write('</label>');
      switch(context.get('type')) {
        case "string":
          return chunk.write('<input name="' + inputName + '" type="text" id="' + inputId + '" value="' + value + '"/>');
        case "boolean":
          return chunk.write('<input name="' + inputName + '" type="checkbox" id="' + inputId + '" value="true" checked="' + (value === 'true') + '"/>');
        case "select":
          options = !constraint ? '' : constraint.map(function(o, idx) { return '<option' + (o === value ? ' selected="true">' : '>') + translateKey(context, 'config.values.' + o) + '</option>'; });
          return chunk.write('<select name="' + inputName + '" id="' + inputId + '">' + options + '</select>');
      }

    },
    filesTreeHelper : function(chunk, context){
      var tab = context.get("tab");
      if (tab==='editor'){
        chunk.partial('filestree', context);
      }

    },
    navigationHelper : function(chunk, context){
      var page = context.get("tpl");
      var tab = context.get("tab") || "";
      
      switch(tab){
      case 'editor':
        chunk.partial('navigation/editor', context);
        break;
        
      case 'preview':
        chunk.partial('navigation/preview', context);
        break;
      default:
        chunk.partial('navigation/default', context);
        break;
        
      
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
    }
});

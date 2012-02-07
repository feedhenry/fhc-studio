client.util.keyboard = function(shortcuts, editorId){
  for (var i=0; i<shortcuts.length; i++){
    $(editorId).bind('keydown', shortcuts[i].binding, shortcuts[i].handler);
  }  
};
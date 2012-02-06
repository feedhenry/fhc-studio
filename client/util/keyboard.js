client.util.keyboard = function(shortcuts){
  for (var i=0; i<shortcuts.length; i++){
    console.log("DESC: " + shortcuts[i].description + "--- BINDING:" + shortcuts[i].binding);
    $(document).bind('keydown', shortcuts[i].binding, shortcuts[i].handler);
  }  
};
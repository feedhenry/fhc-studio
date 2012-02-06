client.util.keyboard = function(shortcuts, editorId){
  console.log("Bind to "+ editorId+" textarea");
  for (var i=0; i<shortcuts.length; i++){
    console.log("DESC: " + shortcuts[i].description + "--- BINDING: " + shortcuts[i].binding);
    $("#"+editorId + " textarea").bind('keydown', shortcuts[i].binding, shortcuts[i].handler);
  }  
};

client.util.keyboard = function(shortcuts, editorId){
  var OSX=false;
  if (navigator.appVersion.indexOf("Mac")!=-1) OSX=true;	

  if (OSX) {
  	for (var i=0; i<shortcuts.length; i++){	
  	  var binding = shortcuts[i].binding;
  	  var newBinding;

  	  if (binding.search('ctrl')!=-1){
  	    newBinding = binding.replace('ctrl', 'cmd');	
  	  }
      $(editorId).unbind('keydown').bind('keydown', newBinding, shortcuts[i].handler);
    }
  } else {
	  for (var i=0; i<shortcuts.length; i++){
        $(editorId).unbind('keydown').bind('keydown', shortcuts[i].binding, shortcuts[i].handler);
      }  
    }
};

client.util.keyboard.listShortcuts = function(shortcuts){
  var html = "";
  var OSX=false;
  if (navigator.appVersion.indexOf("Mac")!=-1) OSX=true;

  if (OSX) {
    for (var i=0; i<shortcuts.length; i++){ 
      var binding = shortcuts[i].binding;
      var newBinding;

      if (binding.search('ctrl')!=-1){
        newBinding = binding.replace('ctrl', 'cmd');  
      }
    }
  } else {
      for (var i=0; i<shortcuts.length; i++){
        html+= "<li>"+shortcuts[i].title+": "+shortcuts[i].binding.toUpperCase();+"</li>"; 
      }  
  }

  return html;
}
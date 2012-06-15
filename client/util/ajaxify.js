// Bind all internal anchor links so that when clicked they actually do some clever ajaxery
// Snippet cut down from https://gist.github.com/854622
$(function() { // JQuery onready

  // Add an :internal selsector to JQ
  // Internal Helper
  $.expr[':'].internal = function(obj, index, meta, stack){
    // Prepare
    var
      $this = $(obj),
      url = $this.attr('href')||'',
      isInternalLink,
      rootUrl = History.getRootUrl();
  
    // Check link
    isInternalLink = url.substring(0,rootUrl.length) === rootUrl || url.indexOf(':') === -1;
  
    // Ignore or Keep
    return isInternalLink;
  };
  $.fn.ajaxify = function(cb){
    
    $(this).find('a:internal:not(.no-ajax)').click( function(event){
      // Prepare
      var $this = $(this),
      url = $this.attr('href'),
      title = $this.attr('title')||null;
  
      // Continue as normal for cmd clicks etc
      if ( event.which == 2 || event.metaKey || url==="#" || !url ) { return true; }
      
      // Ajaxify this link - do a studio.go rather than a full page nav & prevent the default event
      cb(url, {
      	container: "#container"
      });
      event.preventDefault();
      return false;
    });

  };
}); // end JQ OnReady

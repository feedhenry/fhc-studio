// Init History.JS
(function(window,undefined){

    var History = window.History; // Note: We are using a capital H instead of a lower h
    if ( !History.enabled ) {
         // History.js is disabled for this browser.
         // This is because we can optionally choose to support HTML4 browsers or not.
        return false;
    }
    
    // Bind to StateChange Event
    History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        // First, Get the data we passed with the pushState 
        var state = History.getState();
        
        // Then, extract the info needed to do a studio.update()
        var res = state.data;
        if (!res || !res.data){
          return;
        }
        
        var tpl = res.template,
        title = res.data.title,
        data = res.data;
        studio.update(tpl, data); // TODO: Decide based on res.tpl (template title) if we need a full $.ajax reload or not
    });
    
    // Push our homepage state, with the path set to whatever it is at entry
    History.pushState({}, 'Home', window.location.pathname);


})(window);


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
  $.fn.ajaxify = function(){
    $(this).find('a:internal:not(.no-ajax)').click( function(event){
      // Prepare
      var $this = $(this),
      url = $this.attr('href'),
      title = $this.attr('title')||null;
  
      // Continue as normal for cmd clicks etc
      if ( event.which == 2 || event.metaKey || url==="#" || !url ) { return true; }
  
      // Ajaxify this link - do a studio.go rather than a full page nav & prevent the default event
      studio.go(url + '.jstpl');
      event.preventDefault();
      return false;
    });
  };
  $(document.body).ajaxify();
}); // end JQ OnReady



var studio = studio || {};
studio.go = function(path, callback){
    $.ajax({
      url: path,
      context: document.body,
      success: function(res){
        if (callback){
          callback(res);
        }else{
          var title = (res && res.data && res.data.title) ? res.data.title : "Studio";
          path = path.replace(".jstpl", "");
          History.pushState(res, title, path);  
        }
        
      }
    });
};
studio.update = function(tpl, data){
    var html = new EJS({text: tpl}).render(data);
    // Set HTML content of our container to be our newly rendered template. 
    // Remember, any new A's we need to ajaxify so their click event 
    // does a single page app navigate rather than full page refresh
    
    $('#container').html(html).ajaxify();
};
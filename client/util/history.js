(function () {
    
    client.util.History = window.History; // Note: We are using a capital H instead of a lower h
    if ( !client.util.History.enabled ) {
         // History.js is disabled for this browser.
         // This is because we can optionally choose to support HTML4 browsers or not.
        return false;
    }
    
   
    client.util.History.pushState({}, 'Home', window.location.pathname);

}(window));
/*
 * Dispatch controls all studio navigation within the single-page app.
 * It tracks history, and does requests to the API for new JSON data
 */

client.studio.dispatch = (function () {
    var self,container;

    self = {
        url:"",
        update:function (path, opts) {
            if(!opts) opts = {};
            self.url = (path === "/") ? "/home" : path;
            self.url = self.url.replace(/\.+[a-zA-Z]+$/, ""); // strip file extension from URL - always doing JSON req here
            if (self.url[self.url.length-1]==="/"){
              self.url = self.url.substring(0, self.url.length-1);
            }
            container = opts.container || "body";
            // if we haven't specified a callback function, this happens by default
            var callback = opts.callback || function(data){
              var placeInHistory = 0;
              if (History.savedStates && History.savedStates.length){
                placeInHistory = History.savedStates.length;
              }else{
                placeInHistory = (History.savedHashes.length) ? History.savedHashes.length : 0;
              }
              data.historyPosition = placeInHistory;
              client.util.History.pushState(data,data.title,self.url)
            };
            //ajax call
            $.get(self.url + ".json", callback).error(function(){
              client.util.messages.error("Error Changing Page", "Unable to change page - check internet connectivity?");
            });
        },
        render : function (){
            var state = History.getState(),
            url = state.url,
                res, tpl, title, data;
            res = state.data;
            if (!res || !res.data) {
                return;
            }
            tpl = res.data.tpl;
            title = res.data.title;
            data = res.data;
            if ((res.historyPosition!==History.savedStates.length-1)){
                $.get(url + ".json", renderDust); // Only doing this for backwards state
            }else{
                renderDust();    
            }
            
            
            function renderDust(res){
              var newData = (res) ? res.data : data;
              //render dust template client side
              dust.render(tpl, client.studio.views.helpers.push(newData), function (err, out) {
                if (err){
                  client.util.messages.error(err.message);
                  return;
                }

                $(container).html(out);
                //add update as a call back to the internal a href
                // clicks
                $(container).ajaxify(self.update);


                // Try to determine our active link by state.url //TODO: Move this into a view util
                var rex = /http:\/\/[a-zA-Z0-9:.-]+\/([a-zA-Z]+)\/?/g
                var rexRes = rex.exec(state.url);
                if (rexRes  && rexRes.length && rexRes.length>1){
                  rexRes = rexRes[1];
                  rexRes = (rexRes==="app") ? "apps" : rexRes;
                  $('ul.nav.studioNav li').removeClass('active');
                  $('ul.nav.studioNav li.' + rexRes).addClass('active');
                }else{
                  $('ul.nav.studioNav li.home').addClass('active');
                }
                
                $(container).trigger('firedup');
                $(container).unbind('firedup');
              }); 
            }
            
        }
    };
    //bind render to state change
    client.util.History.Adapter.bind(window, 'statechange', self.render );

    return self;
})();

$(function () {
    client.studio.dispatch.update(window.location.pathname, {
    	container: "#container"
    });
});
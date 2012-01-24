client.studio.dispatch = function () {
    var self,container;

    self = {
        url:"",
        update:function (path, opts) {
            if(!opts) opts = {};
            self.url = (path === "/") ? "/home" : path;
            container = opts.container || "#container";
            //ajax call
            $.get(self.url + ".json", function(data){
                client.util.History.pushState(data,data.title,self.url);
            });
        },
        render : function () {
            var state = History.getState(),
                res, tpl, title, data;
            res = state.data;
            if (!res || !res.data) {
                return;
            }
            tpl = res.data.tpl;
            title = res.data.title;
            data = res.data;
            //render dust template client side
            dust.render(tpl, client.studio.helpers.dusthelpers.push(data), function (err, out) {
                $(container).html(out);
                //add update as a call back to the internal a href
                // clicks
                $(container).ajaxify(self.update);
            });
        }
    };
    //bind render to state change
    client.util.History.Adapter.bind(window, 'statechange', self.render );

    return self;
};

$('document').ready(function () {

    client.studio.dispatch().update(window.location.pathname);
});
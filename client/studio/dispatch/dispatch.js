client.studio.dispatch = function () {
    var self;
    //bind render to state change
    client.util.History.Adapter.bind(window, 'statechange', function () {
        var state = History.getState(),
            res, tpl, title, data;

        res = state.data;
        if (!res || !res.data) {
            return;
        }

        tpl = res.template;
        title = res.data.title;
        data = res.data;
        self.render({'data':data, 'tpl':tpl});
    });


    self = {
        url:"",
        update:function (path) {
            self.url = (path === "/") ? "/home" : path;
            $.get(path + ".json", self.render);
        },

        render:function (opts) {
            var options = opts.data || {},
                data = options.data || {},
                tpl = options.tpl || {},
                container = options.container || "#container";
            //push state

            client.util.History.pushState(options,options.title,self.url);

            //render dust template client side
            dust.render(tpl, client.studio.helpers.dusthelpers.push(options), function (err, out) {
                $(container).html(out);
                $(container).ajaxify(self.update);
            });
        }
    };
    return self;
};

$('document').ready(function () {
    client.studio.dispatch().update(window.location.pathname);
});
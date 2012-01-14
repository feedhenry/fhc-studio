/**
 * Created by JetBrains WebStorm.
 * User: kelly
 * Date: 13/01/2012
 * Time: 21:29
 * To change this template use File | Settings | File Templates.
 */
$('document').ready(function () {

    var engine = renderer({});
    $.get("/home", function (data) {
        engine.render({name:"home", 'data':data});
    });

    $('a .singlepage').bind("click", function () {
        var engine = renderer({path:$(this).attr("href")}).render()
    });

});


var renderer = function (opts) {
    var path        = opts.path || "/home",
        template    = "",
        parse       = function () {
            var retPath;
            if(path === "/home"){ return "home";}
            else{
                retPath = (path.substr(path.length -1) === "/") ? path.substr(1, path.length -1) : path.substr(1);
                console.log(path);
                console.log(path.split("/"));
            }
        };

        template = parse();
        console.log(template);
        self = {
            render:function (params) {
                var method  = params.method  || "get",
                    cache   = params.cache   || false,
                    ele     = params.element || "container";
                $.ajax({
                    url:    path,
                    cache:  params.cache || false,
                    type:   method,
                    success:function (html) {
                        dust.render(params.name, params.data, function (err, out) {
                            if (err) {
                                //err
                            }
                            else {
                                console.log(params);
                                console.log(out);
                                $('body').html(out);
                            }
                        });
                    },
                    error:  function () {

                    }
                });

            }
        };

    return self;
};
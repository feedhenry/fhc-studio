/**
This function renders the dust template with the data from
 an ajax request.
the links provide data about their intention. As in the provide a command in the element
here in the class definitions. I like this structure because it maintains the pretty url.

<a href="/apps" class="element:container template:apps content:json">apps</a>
or in the url either is fine
 <a href="/apps?el=container&t=apps"></a>
 */



$('document').ready(function () {

    var engine = renderer({path:window.location.pathname}).render();

});
/**
 * this is the base object. Add new functionality that you wish to
 * use in templates here
 */
var renderBase = dust.makeBase({
    tabLayoutHelper : function (chunk,context){
        //context is the data and chunk is the piece of template
        var data = context.get("data");
        if(data && data.hasOwnProperty("tab")){
            console.log(data.tab);
                chunk.partial(data.tab.toLowerCase(),context);
        }
    }
});

var renderer = function (opts) {
    var opts = opts || {},
        path        =  (typeof opts.path === undefined || opts.path === "/" || opts.path === "/home")? "/home" : opts.path,
        parse       = function () {
            console.log(path);
            var retPath;
            if(path === "/home" || path === "/"){ console.log("returning home"); return "home";}
            else{
                retPath = (path.substr(path.length -1) === "/") ? path.substr(1, path.length -1) : path.substr(1);
                console.log(retPath);
                if(retPath.indexOf("/") === -1){
                    return retPath;
                }else{
                    retPath = path.split("/");
                    console.log(retPath);
                    return retPath[1];
                }
            }
        },
        template    = opts.template || parse();
    console.log(template);

        self = {
            render:function (params) {
                var params  = params || {},
                    method  = params.method  || "get",
                    ele     = params.element || "container";
                $.ajax({
                    url:    path+".json",
                    cache:  params.cache || false,
                    type:   method,
                    success:function (jdata) {

                        console.log("template set to " +  template +" retdata ");
                        dust.render(template, renderBase.push(jdata), function (err, out) {
                            if (err) {
                                //err
                                console.log(err);
                            }
                            else {
                                console.log(params);

                                $('#container').html(out);

                                $('#container').find('.singlepage').click( function () {
                                    console.log("clicked single page link");
                                    renderer({path:$(this).attr("href")}).render();
                                    return false;
                                });
                            }
                        });
                    },
                    error:  function () {
                            console.log("Ajax error");
                        return false;
                    }
                });

            }
        };

    return self;
};
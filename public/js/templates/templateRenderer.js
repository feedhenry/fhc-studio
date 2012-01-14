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

    var engine = renderer();
    $.get("/home", function (data) {
        engine.render({name:"home", 'data':data});
    });



});


var renderer = function (opts) {
    var opts = opts || {},
        path        =  opts.path || "/home",
        parse       = function () {
            var retPath;
            if(path === "/home"){ return "home";}
            else{
                retPath = (path.substr(path.length -1) === "/") ? path.substr(1, path.length -1) : path.substr(1);
                console.log(retPath);
                if(retPath.indexOf("/") === -1){
                    return retPath;
                }else{
                    retPath = path.split("/");
                    return retPath[0];
                }
            }
        },
        template    = opts.template || parse(),


        self = {
            render:function (params) {
                var method  = params.method  || "get",
                    ele     = params.element || "container";
                $.ajax({
                    url:    path+".json",
                    cache:  params.cache || false,
                    type:   method,
                    success:function (jdata) {
                        console.log(jdata);
                        console.log("template set to " +  template +" retdata "+ jdata);
                        dust.render(template, jdata, function (err, out) {
                            if (err) {
                                //err
                                console.log(err);
                            }
                            else {
                                console.log(params);

                                $('body').html(out);

                                $('body').find('.singlepage').click( function () {

                                    console.log("clicked single page link");

                                    var engine = renderer({path:$(this).attr("href")}).render({});
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
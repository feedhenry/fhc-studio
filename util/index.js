/**
 * Created by JetBrains WebStorm.
 * User: kelly
 * Date: 12/01/2012
 * Time: 19:13
 * To change this template use File | Settings | File Templates.
 */



var fs          = require('fs'),
    doResponse,
    doError;


 doResponse = function (req, res, json, d) {
        // setup stuff that goes into every response
        if (req && req.session) {
            console.log(req.session.user);
            console.log(req.session.domain);
            d.user = req.session.user;
            d.domain = req.session.domain;
        }

        if (json) {
            var template = getTemplateString(d);
            // API request - sending back JSON data with a template
            res.send({
                data:d,
                template:template
            });
        } else {
            // HTML page GET request - sending back a rendered page
            res.render(d.tpl, d);
        }
};


doError = function (res,req, msg) {
    //var json = (req.params.json && req.params.json==="json") ? true : false;
    var json = false;
    var d = {
        tpl:'error',
        title:'Oops! An error has occured.',
        error:msg
    };
    doResponse(req, res, json, d);
};

//private function
function getTemplateString(d) {
    var tpl = d.tpl;

    var template = fs.readFileSync('public/views/' + tpl + '.ejs', 'utf8'); // TODO: Make async so we can err handle

    // This is a bit crazy - EJS deprecated partials with no alternative, so we're implementing it using regex.
    // No better templating engine exists at the moment, so sticking with EJS.
    // Look for partials & replace them with content

    // 1.) First look for quote-includes like <%- partial("someFile") %>
    var rex = /<%- ?partial\( ?"([a-zA-Z\/.]*)" ?\) ?%>/g;
    var match = rex.exec(template);
    while (match != null) {
        if (match.length > 0) {
            // Recursively call ourselves with the TPL name we need
            var include = getTemplateString({tpl:match[1]});
            template = template.replace(match[0], include);
        }
        match = rex.exec(template);
    }


    // 2.) Then look for nonqute-includes like <%- partial(someVariable) %>
    var rex = /<%- ?partial\(( ?[a-zA-Z\/.]* ?)\) ?%>/g;


    var match = rex.exec(template);
    while (match != null) {
        if (match.length > 0) {
            // Now we're going to lookup the variable name in the data to see what the template should be called
            var variable = d[match[1]];
            // Recursively call ourselves with the TPL name we need
            var include = getTemplateString({tpl:variable});

            template = template.replace(match[0], include);
        }
        match = rex.exec(template);
    }

    // <%- someVar %> isn't valid on the client side - replace with <%=
    var rex = /<%- ([a-zA-Z])+ %>/g
    var match = rex.exec(template);
    while (match != null) {
        template = template.replace(match[0], "<%= filesTree %>");
        match = rex.exec(template);
    }
    // End crazyness

    return template;
}



exports.doResponse  = doResponse;
exports.doError     = doError;
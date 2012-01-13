var userController,
    renderer = require("../util"),
    fhc = require("fh-fhc");

userController = {
    signupAction:function (req, res) {
        var d;
        if (req.method === "POST") {
            //handle signup alternatively we could create a second method for
            //proccessing new signup and use app.post route
        } else if (req.method === "GET") {
            d = {
                tpl:'signup',
                title:'signup'
            };
            renderer.doResponse(req, res, d);
        }
    },
    loginAction:function (req, res) {
        var username, password, d, body, args;
        if (req.method === "POST") {
            //again this could be moved to a seperate method if it was
            //thought neccessary
            try {
                body = req.body,
                    username = body.username,
                    password = body.password;
                req.session.username = username,
                    args = [username, password];

                fhc.login(args, function (err, data) {
                    if (err) {
                        renderer.doError(res,req, "Error logging in as user <strong>" + username + "</strong>. Please verify credentials and try again.");
                        return;
                    }
                    // Success! Let's set some session properties.
                    req.session.user = {
                        username:username,
                        timestamp:data.timestamp,
                        role:'dev', //TODO: Have FHC pass this through
                        login:data.login
                    }
                    req.session.domain = (data.domain) ? data.domain : "apps";
                    res.redirect('/apps');
                });
            } catch (ex) {

            }
        } else if (req.method === "GET") {

            d = {
                tpl:'login',
                title:'login'
            };
            renderer.doResponse(req, res, d);
        }
    },
    logoutAction:function (req, res) {
        try {
            fhc.logout([], function (err, data) {
                console.log(arguments);
                if (err) {
                    renderer.doError(res,req, "Error logging out");
                    return; // TODO: Show error logging out page
                }
                delete req.session.user;
                res.redirect('/');
            });
        } catch (ex) {
            renderer.doError(res,req,"error");
        }
    }
};


module.exports = userController;
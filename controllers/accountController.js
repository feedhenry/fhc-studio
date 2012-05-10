var accountController,
    renderer = require("../util"),
    fhc = require("fh-module");

accountController = {
    indexAction: function(req, res) {
      var page = (req.params.page && req.params.page.length>0) ? req.params.page : "profile",
      device = req.params.device;
      var d;
      d = {
        tpl: 'account/account',
        title: 'My Account',
        page: page,
        //init: "client.studio.account.init"
      };
      if (device){
        d.page = "provisioning/device";
        d.device =  device;
        d.init = "client.studio.account.provisioning.init";

        fhc.resources.getFields(device, function(err, data){
          if (err || !data || data.length<1){
            return renderer.doError(res,req, "Error retrieving device resource information for " + device);
          }
          d.fields = data;
          return renderer.doResponse(req, res, d);
        });
      }else{
        return renderer.doResponse(req, res, d);
      }

    },
    apiKeys : function(req, res){
      var d;
      d = {
        tpl: 'account/account',
        page: 'apikeys',
        title: "API Keys",
        apikeys: [ // TODO: fhc.account.api??
          {
            label: "My Key",
            key: "414cfa6db059a9e4a96123e5234ebdabc7b12f520"
          },
          {
            label: "iOS Development",
            key: "ded7147c0991d8d0e71760fb2943f7eb680n000b",
            revoked: true,
            revokeDate: "22/05/11 22:05",
            revokedBy: "some@example.com"
          }
        ]
        //init: "client.studio.account.init"
      };
      return renderer.doResponse(req, res, d);
    },
    addApiKey: function(req, res){
      var label = req.body.label;

      console.log('adding key with label ' + label);

      var error = false; // TODO: FHC.account.apiKey.revoke or similar?
      if (error){
        return renderer.doError(res,req, "Error adding API key " + label);
      }
      res.redirect("/account/apikeys");
    },
    revokeApiKey : function(req, res){
      var key = req.body.key,
      label = req.body.label;

      console.log('revoking key ' + key + 'with label ' + label);

      var error = false; // TODO: FHC.account.apiKey.revoke or similar?
      if (error){
        return renderer.doError(res,req, "Error deleting API key " + label);
      }
      res.redirect("/account/apikeys");
    },
    resourceUpload: function(req, res) {
      // Dan has done some magic here...
      console.log('doing magics!');

      fhc.resources.upload(req.session, req, function(err, data) {
        console.log('magics doned!');
        if(err) {
          res.send({ err: err });
        } else {
          res.send(data);
        }
      });
    }
};


module.exports = accountController;
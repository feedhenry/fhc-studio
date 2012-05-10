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
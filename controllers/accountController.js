var accountController,
    renderer = require("../util"),
    fhc = require("fh-module");

accountController = {
    indexAction: function(req, res) {
      var page = (req.params.page && req.params.page.length>0) ? req.params.page : "profile";
      if (req.params.device){
        page = "provisioning/" + req.params.device;
      }

      var d;
      d = {
        tpl: 'account/account',
        title: 'My Account',
        device: req.params.device,
        page: page
      };
      renderer.doResponse(req, res, d);
      
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
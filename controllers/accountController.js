var accountController,
    renderer = require("../util"),
    fhc = require("fh-module");

accountController = {
    indexAction: function(req, res){
      var d;
      d = {
        tpl:'account',
        title:'My Account'
      };
      renderer.doResponse(req, res, d);


    },
    resourceUpload: function(req, res){
       // Dan does magics here
       console.log('magics');

      res.send({success: true});

    }
};


module.exports = accountController;
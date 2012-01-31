var https = require("https");

module.exports = function (){
  //set up vars
    var HOST = "api.github.com",
      self;
    function makeApiCall (httpsopts, cb){
        console.log("called make api call");
        var content="",error = undefined;
        console.log(httpsopts);
        req = https.request(httpsopts,function (res) {

            if(res.statusCode === 200){
                res.setEncoding("UTF-8");
                res.on('data',function (data) {
                    content+=data;
                });
                res.on('end',function(){
                   cb(null,content);
                });
            }else{
                error = {code : res.statusCode, message : 'request failed'};
            }
        });
        req.end();
        req.on('error', function (e) {
            return cb({code:503,message:'failed request'}, null);
        });

    };

   self = {
       listGists : function () {
           //as we can't use login details here maybe store the gist ids we want for the
           //studio remotely allowing them to be updated. this method could then call for them
           // and use getGist to return the actual gist. Or the remote could do the call and return
           // the response
       },

       getGist : function (gistId,cb){
           console.log("gist id "+gistId);
           var content  = undefined,
           httpopts     = {host : HOST};
           
           httpopts.path    = "/gists/"+gistId;
           httpopts.methods = "GET";
           httpopts.port    = 443;
           makeApiCall(httpopts, cb);
       }
   };

  return self;

};



var https = require("https");

module.exports = function (){
  //set up vars
    var httpopts = {host:"api.github.com",path:"",method:'GET'},
      self;

   self = {
       listGists : function () {
           //as we can't use login details here maybe store the gist ids we want for the
           //studio remotely allowing them to be updated. this method could then call for them
           // and use getGist to return the actual gist. Or the remote could do the call and return
           // the response
       },

       getGist : function (gistId){
           var content = undefined;
           httpopts.path = "/gists/"+gistId;
           https.get(httpopts,function(res){
               if(res.statusCode === 200){
                    res.on('data',function (data){
                        content+=data;
                    });
                   res.on('end',function (){
                        if(content){
                            content = JSON.parse(content);
                            return content.files['gistfile1.js'].content;
                        }
                   });
               }else{


                   return
               }


           });
       }
   };

  return self;

};
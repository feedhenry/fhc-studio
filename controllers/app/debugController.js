var debugController,
    renderer = require("../../util"),
    fhc      = require('../../fh-module'),
    http     = require("http"),
    async    = require("async");

  debugController = {
    // every app gets the indexAction, which gets the file tree & passes on
    indexAction: function(req, res, next){
      var id = req.params.id,
      target = req.params.target || "development",
      logname = (req.params.name) ? req.params.name + '.log' : "";
      // get our log files, passing no logname to get all
      
      async.parallel(
        [
          function(callback){
            fhc.logs.read(req.session, id, logname, 'development', callback);
          },
          function(callback){
            fhc.logs.read(req.session, id, logname, 'development', callback); //TODO: Stop FHC throwing an error here if not staged?
          }
        ],
        function(err, results){ // async callback
          if ((err && err.indexOf("App not found")==-1) || results.length<1){
            // TODO: Patch FHC to not throw an error when we request the live logs of an unstaged app
            renderer.doError(res, req, err);
            return;
          }
          // Otherwise, we may have an error but it's just because this app isn't staged to production.
          var development = massageLogs(results[0]);
          var production = massageLogs(results[1]);

          var d = req.d || {};
          d.apply({
              tpl:'app',
              title:'Debug',
              appId: id,
              tab:'debug',
              logs: { 
                development: development,
                production: production 
              }
          });
          renderer.doResponse(req, res, d);
        } // end async.paralell callback
      ); // end async.paralell
    }
};
  
function massageLogs(data){
  if (!data){
    // app isn't yet staged
    return [{ name: "App not yet staged" , contents: ""}];
  }
  var logs = data.log,
  logsArray = [];
  if (logs && logs.name){
    // when we're listing just 1 log
    logs.contents = logs.contents || ""; // incase contents is undefined (stderr often is)
    logsArray.push(logs);
  }else{
    // When we're listing all logs
    // Take our objects from an object to an array
    for (l in logs){
      var log = {
          name: l,
          contents: logs[l]
      }
      logsArray.push(log);
    }
  }
  return logsArray
}

module.exports = debugController;



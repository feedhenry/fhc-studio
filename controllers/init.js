var init,
fhc = require('fh-fhc');

init = function (target) {
  //Load FHC
  var target = target || null;
  fhc.fhc.load({}, function (err) {
      if (err) {
          throw new Error(err);
      }
      if (target){
        fhc.target(['https://' + target + '.feedhenry.com'],
          function(err, data) {
           
            if (err){
              throw new Error(err);
            }else{
              console.log('successfully targetted ' + target);
            }
          }
        );
      }
      
  });
        
};

module.exports = init;

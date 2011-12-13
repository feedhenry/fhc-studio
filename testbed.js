  var fhc = require('fh-fhc');
  fhc.conf = fhc.confi || {};
  fhc.conf_exit = true;
  console.log(fhc.conf);
  
fhc.target(['https://vmware.feedhenry.com/'], 
  function(){
    //success
    console.log('succ');
    console.log(arguments);
  },
  function(){
    console.log('err');
    console.log(arguments);
  }
);

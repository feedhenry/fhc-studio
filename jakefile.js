/**
 * Build file
 **/

var /*nodeunit = require("nodeunit"),*/
    sys = require("util"),
    fs = require("fs"),
    dust = require("dust"),
    UNITDIR = "./test",
    DUSTDIR = "./client/studio/views/dust",
    DUSTWRITE = "./client/js/templates/compiledTemplates.js";


console.log("starting build tasks");

desc("compiling dust templates");
task('ct', [], function () {
    //find any .dust files
    walk(DUSTDIR, function(err, files) {
      var compiled = "",
      data = "";
      if (err) throw err;
      files.forEach(function (f, i) {
        if (f.substr(f.length - 5).toLowerCase() === ".dust") {
            console.log("dust file found", f);
            data = fs.readFileSync(f, "UTF-8");
            
            var dustTplName = f.replace(DUSTDIR + '/','').replace('', '');
            dustTplName = dustTplName.replace(/.dust/, '').toLowerCase();
           
            compiled+= dust.compile(data, dustTplName);
           
        }
      });
      // Now that we've iterated over the directory, write the files to a compiled string
      if (compiled !== "") {
        fs.writeFile(DUSTWRITE, compiled, function (err) {
            if (err)throw err;
            else console.log("templates compiled");
        })
      } else {
          console.log("no files compiled");
      }
    });
    
});

/*desc("running tests");
task('test', [], function () {
    //load tests into array
    console.log("testing");
    fs.readdir(UNITDIR, function (err, data) {
        data.forEach(function (f, i) {
            if (f.substr(f.length - 7) === "Test.js") {
                nodeunit.reporters.
            default.
                run(["./test/" + f]);
            }
        });
    });
});
*/

var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

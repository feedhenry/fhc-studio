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
    var compiled = "";
    var data = "";
    var indentBy = function(times, str) {
      var arr = new Array(times + 1);
      arr[times] = str;
      return arr.join(" ");
    };
    var handleFile = function(relativePath) {
        var absPath = [DUSTDIR].concat(relativePath).join('/'),
            stats = fs.statSync(absPath),
            fname = relativePath[relativePath.length - 1];
        if (stats.isDirectory()) {
            relativePath.length && console.log(indentBy(relativePath.length * 2, fname));
            fs.readdirSync(absPath).forEach(function(n) { handleFile(relativePath.concat([n])); });
        } else if (/.+\.dust$/i.test(fname)) {
            console.log(indentBy(relativePath.length * 2, fname));
            content = fs.readFileSync(absPath, "UTF-8");
            compiled += dust.compile(content, relativePath.join('/').replace(/\.dust$/i, '').toLowerCase());
        }
    };

    console.log(">>> Compiling templates");
    handleFile([]);
    if (compiled !== "") {
        fs.writeFile(DUSTWRITE, compiled, function (err) {
            if (err)throw err;
            else console.log(">>> Templates compiled");
        })
    } else {
        console.log("no files compiled");
    }
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

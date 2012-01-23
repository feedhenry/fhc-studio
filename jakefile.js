/**
 * Build file
 **/

var nodeunit = require("nodeunit"),
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
    var files = fs.readdirSync(DUSTDIR);
    var compiled = "";
    var data = "";
    files.forEach(function (f, i) {
        if (f.substr(f.length - 5).toLowerCase() === ".dust") {
            console.log("dust file found", f);
            data = fs.readFileSync(DUSTDIR + "/" + f, "UTF-8");
            compiled+= dust.compile(data, f.replace(/.dust/, '').toLowerCase());
           
        }
    });
    if (compiled !== "") {
        fs.writeFile(DUSTWRITE, compiled, function (err) {
            if (err)throw err;
            else console.log("templates compiled");
        })
    } else {
        console.log("no files compiled");
    }
});

desc("running tests");
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
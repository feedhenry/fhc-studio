/**
*   dispatcher uses history.js to decide what data to read, if it needs refreshing and which template
 *   to ultimately render. An optional callback can be specified to customise the render behavior
*
 */
//general namespace
var studio = studio || {};

/**
 *
 * @param opts {path:"",container:"",data : {}}
 * @param cb function
 *
 * dispatcher is called with History.js
 *
 */
studio.dispatcher = function (opts, cb) {
        //load any date if needed
        //the callback is a custom render function
    var self, path  = opts.path      || "/home",
        container   = opts.container || "#container",
        data        = opts.data      || {},
        noRender    = ('function' === typeof cb);

    self = {
        update : function (cb) {
            //update any needed data for the path by making ajax call for fresh json
            // if a call back is specified send the data their allowing for extra modification
           // else call render
        },
        render : function (opts) {
            //if refresh call update. the refresh flag should be set by
            // any user action which indicates that a change to the data has taken place
            //render a template with any data required.
            //meta code
            /**
             * if refresh
             * return self.update();
             * else
             *   find template and fill with data pass into cb for any other modifications
             *   render to opts.container
             */
        }
    };

    return self;
};
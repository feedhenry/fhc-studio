/**
 * used for common validation tasks
 */


var invalidCallBackException =  {name:"InvalidCallBackException", message:"call back must be a function"};
module.exports = {
    appName:function (name, cb){
        if('function' !== typeof cb)throw invalidCallBackException;
        if('string' !== typeof name || name === "")return cb("invalid appname : "+name, null);
        if(name.match(/^\-|[^\d\w\s\-]/)!== null) return cb("invalid appname "+name,null);
        return cb(null,name);
    },
    guid : function (guid,cb){
        if('function' !== typeof cb)throw invalidCallBackException;
        if('string' !== typeof guid  || guid.length !==24)return cb("invalid guid requires 24 chars");
        return cb(null,guid);
    }
};
client.util.string = {
    /*
     * Strip a filename from a string containing a path and filename
     * e.g. /path/to/file.js becomes /path/to/
     */
    stripFileNameFromPathString: function(str){
      return str.replace(/[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, "");
    }
};
jsonUtils = function () {
  Object.defineProperty(Object.prototype, "apply", {
    enumerable: false,
    value: function(from) {
      var props = Object.getOwnPropertyNames(from);
      var dest = this;
      props.forEach(function(name) {

          var destination = Object.getOwnPropertyDescriptor(from, name);
          Object.defineProperty(dest, name, destination);

      });
      return this;
    }
  });
};



module.exports = jsonUtils;

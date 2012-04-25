client.studio = client.studio || {};
client.studio.build = {

  configs: [
    "debug",
    "distribution",
    "release"
  ],
  destinations: [
    "android", 
    "iphone", 
    "ipad",
    "blackberry",
    "windowsphone7"
  ],

  init: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    $("#android-build").unbind().bind("click", function(e) {
        client.studio.build.build("android");
        e.preventDefault();
        return false;
    });
  },

  build: function(destination) {
    client.studio.dock.init();

    $.ajax({
      type : 'POST',
      url : "build/start.json",
      data : {
        config: "debug",
        version: "2.3",
        destination: destination
      },
      success : function(res) {
        client.studio.dock.add("app", res.data.cacheKey);
      }
    });
  }
}
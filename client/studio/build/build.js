client.studio = client.studio || {};
client.studio.build = {
  appId: undefined,
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
    this.appId = $('input#appId').remove().val();
  },
  bindEvents: function() {
    
    $('.buildButton').unbind().on("click", this.buildHandler);
  },
  buildHandler: function(){
    var me = client.studio.build;
    // Do a build function according to the data-platform of the element
    
    var platform = $(this).data('platform'),
    config = $('.' + platform + ' .config .active').text(),
    version = $('.' + platform + ' .version .active').text();
    
    // iOS can be universal, iPhone or iPad..
    if (platform=="iOS"){
      platform = $('.iOS .target .active').text();
    }
    
    var buildRequest = {
        destination: platform.toLowerCase(),
        config: config.toLowerCase(),
        version: version.toLowerCase(),
        appId: me.appId
    };
    console.log(JSON.stringify(buildRequest));
  },
  build: function(req) {
    $.post({

    });
  }
}
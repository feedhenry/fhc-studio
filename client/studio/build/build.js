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
        platform: platform,
        config: config,
        version: version
    };
    console.log(JSON.stringify(buildRequest));
    
    
  },
  buildiOS : function(){
    
  },
  buildAndroid : function(){
    
  },
  buildBlackberry : function(){
    
  },
  buildWP7 : function(){
    
  },
  build: function() {
    $.post({

    });
  }
}
client.studio = client.studio || {};
client.studio.dashboard = {    
    init: function(){
      var me = client.studio.dashboard;
      me.vimeoGallery();
      me.bindEvents();
      me.getBlogPosts();
      
      $('#videosCarousel').carousel({
          interval: 2000
      });
    },
    bindEvents: function(){
      var me = client.studio.dashboard;
      // Contains bindings for all default events
      $('#clientLink').unbind().on("click", me.showClient);
      $('#cloudLink').unbind().on("click", me.showCloud);
      $('#usageLink').unbind().on("click", me.showUsage);
    },
    showCloud: function(){
      $('#apiDocs').hide();
      $('#cloud').show('fast');
      $('#client').hide('fast');
      $('#apis .sublinks a.active').removeClass('active');
      $('#cloudLink').addClass('active');
    },
    showClient: function(){
      $('#apiDocs').hide();
      $('#client').show('fast');
      $('#cloud').hide('fast');
      $('#apis .sublinks a.active').removeClass('active');
      $('#clientLink').addClass('active');
    },
    showUsage: function(){
      $('#apiDocs').show('fast');
      $('#client').hide('fast');
      $('#cloud').hide('fast');
      $('#apis .sublinks a.active').removeClass('active');
      $('#usageLink').addClass('active');
      return false;
    },
    getBlogPosts: function(){
      $().ready(function(){ 
        var url = 'http://developer.feedhenry.com/blog/';
        $.get(url, function(jsonp) {
          console.log(jsonp);
        });
      });
    },
    vimeoCallback: function(videos){
      var oEmbedEndpoint = 'http://vimeo.com/api/oembed.json';
      var oEmbedCallback = 'switchVideo';
      // Set the user's thumbnail and the page title
      $('#vimeoFeed h2').text(videos[0].user_name + "'s Videos");

      // Load the first video
      getVideo(videos[0].url);

      // Add the videos to the gallery
      for (var i = 0; i < videos.length; i++) {
        var html = '<li><a href="' + videos[i].url + '">';
        html += '<p>' + videos[i].title + '</p></a></li>';
        $('#thumbs ul').append(html);
      }

      // Switch to the video when a thumbnail is clicked
      $('#thumbs a').click(function(event) {
        event.preventDefault();
        getVideo(this.href);
        return false;
      });
      
      function getVideo(url) {
        $.getScript(oEmbedEndpoint + '?url=' + url + '&width=504&height=280&callback=' + oEmbedCallback);
      }
      
    },
    vimeoGallery: function(){
      var apiEndpoint = 'http://vimeo.com/api/v2/';
      
      
      var videosCallback = 'client.studio.dashboard.vimeoCallback';
      var vimeoUsername = 'feedhenry';
      

      $.getScript(apiEndpoint + vimeoUsername + '/videos.json?callback=' + videosCallback);
    }
};



function switchVideo(video) { // TODO: This shouldn't be global
  $('#embed').html(unescape(video.html));
}

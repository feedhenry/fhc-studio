client.studio = client.studio || {};
client.studio.dashboard = {    
    init: function(){
      this.vimeoGallery();
    },
    bindEvents: function(){
      
    },
    vimeoCallback: function(videos){
      var oEmbedEndpoint = 'http://vimeo.com/api/oembed.json';
      var oEmbedCallback = 'switchVideo';
      // Set the user's thumbnail and the page title
      $('#vimeoFeed h3').text(videos[0].user_name + "'s Videos");

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

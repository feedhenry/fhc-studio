client.studio = client.studio || {};
client.studio.dashboard = {    
    init: function(){
      var me = client.studio.dashboard;
      me.bindEvents();
      
      $('#videosCarousel').carousel();
    },
    bindEvents: function(){
      var me = client.studio.dashboard;
      // Contains bindings for all default events
      $('#clientLink').unbind().on("click", me.showClient);
      $('#cloudLink').unbind().on("click", me.showCloud);
      $('#usageLink').unbind().on("click", me.showUsage);
//      $('#templatesTabs .nav-tabs a').unbind().on("click", me.showTemplate);
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
    showTemplate: function(){
      // NB Hardcoded URL, is this bad?
      $('#templatesTabs .nav-tabs li.active').removeClass('active');
      $(this).parent().addClass('active');
      var url = $(this).attr('data-templateUrl')
      var originalFrame = $('#templates .previewContainer iframe');
      var iFrame = originalFrame.clone().attr('src', 'https://www.google.com');
      originalFrame.remove();
      $('#templates .previewContainer').append(iFrame);
      
      
      
    }
};



function switchVideo(video) { // TODO: This shouldn't be global
  $('#embed').html(unescape(video.html));
}

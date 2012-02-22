client.studio = client.studio || {};
client.studio.debug = {
    editors: [],
    init: function(){
      var me = client.studio.debug;
      this.bindEvents();
      $('pre.log').each(function(){
        var id = $(this).attr('id');
        if (id){
          var editor = ace.edit(id);
          editor.resize();
          editor.setShowPrintMargin(false);
          editor.setReadOnly(true);
          me.editors.push(editor);
        }
      });
    },
    bindEvents: function(){
      var me = client.studio.debug; 
      $('.logSwitch a').unbind().on('click', function(){
        if ($(this).hasClass('btn-primary')){
          return;
        }
        $('.logSwitch a').removeClass('btn-primary');
        $(this).addClass('btn-primary');
        var id = $(this).attr('data-logs');
        $('.logsection').hide();
        $('#' + id).fadeIn('fast');
        var editors = me.editors;
        for (var i=0; i<editors.length; i++){
          editors[i].resize();
        }
      });
    }
};

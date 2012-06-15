client.studio = client.studio || {};
client.studio.apps= {
    init : function(val){
      this.bindEvents();
    },
    bindEvents: function(){
      $('#fromScratchLink').unbind().on('click', this.appFromScratch);
      
      $('#fromGitRepoLink').unbind().on('click', this.appFromGit);
    },
    appFromScratch: function(){
      var title, message, buttons;
      title = "Create An App From Scratch";
      message = [
        '<form id="createapp" name="createApp">',
        '<label>App Name:</label>',
        '<input name="appname" type="text" class="span3" placeholder="Enter App Name"> <span class="form-error help-inline"></span>',
        '</form>'
      ].join("");
      
      buttons = [ 
        {
          text : 'Cancel',
          callback : function() {
            // Just cancel this modal dialog
            return true;
          }
        }, 
        {
          text : 'Create',
          type : 'primary',
          callback : function() {
            var name = $('input[name="appname"]',this).val(); //FIXME: appname is no longer in the DOM by now as modal manager has already fired it's callback
            $.post("/apps/create",{"appname":name},function (res){
              if (!res || !res.data || res.data.error){
                client.util.messages.error(res.data.error);
              }else{
                client.util.messages.info('App created successfully!');
                //TODO: Refresh apps view
              }
              console.log(res);
            });
          }
        }
      ];
      client.util.modal(title, message, buttons);
    },
    appFromGit: function(){
      
    }
};



client.studio.editor = client.studio.editor || {};
client.studio.editor.shortcuts = [ 
    {
      title : "Open File",
      description : "Open a file in the editor",
      binding : "ctrl+o",
      handler : function() {
        client.studio.editor.openFile();
        return false;
      }
    }, 
    {
      title : "New File",
      description : "Open a new blank file in the editor",
      binding : "ctrl+q",
      handler : function() {
        var res = {
          data : {
            fileContents : '',
            fileId : '',
            mode : ''
          }
        };

        client.studio.editor.newTab(res);
        return false;
      }
    }, 
    {
      title : "Save",
      description : "Save the currently open file",
      binding : "ctrl+s",
      handler : function(e) {
        if (!e.shiftKey){
          var me = client.studio.editor;
          client.studio.editor.save(me.activeTab);
        }
      }
    }, 
    {
      title : "Save As",
      description : "Save currently open file as",
      binding : "ctrl+shift+s",
      handler : function() {
        client.studio.editor.saveAs();
        console.log("called save as");
        return false;
      }
    }, 
    {
      title : "Close",
      description : "Close the currently open file",
      binding : "ctrl+e",
      handler : function() {
        var me = client.studio.editor;
        me.closeTab(me.activeTab);
        return false;
      }
    }, 
    {
      title : "Open Resource",
      description : "Open a file resource",
      binding : "ctrl+shift+r",
      handler : function() {
        var me = client.studio.editor;
        me.openResource();
      }
    }, 
    {
      title : "Next Tab",
      description : "Switch to your next file tab",
      binding : "ctrl+]",
      handler : function() {
        client.studio.editor.tabForward();
        return false;
      }
    }, 
    {
      title : "Previous Tab",
      description : "Switch to your previous file tab",
      binding : "ctrl+[",
      handler : function() {
        client.studio.editor.tabBack();
        return false;
      }
    }, 
  ];
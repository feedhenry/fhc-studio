client.studio.editor = client.studio.editor || {};
client.studio.editor.open = function(guid) {
    // Navigate to that file using an ajax request with a callback
    var path = "/app/" + this.appId + "/editor/" + guid;
    client.studio.dispatch().update(path, {
      callback : this.newTab
    });

}
  /*
   * Performs an 'update' operation in the studio
   */
client.studio.editor.save = function(index, callback) {
    var me = client.studio.editor, 
    appId = me.appId, 
    index = (typeof index === "number") ? index : me.activeTab,
    tab = me.getTabByIndex(index), 
    tabId = 'tab' + index, 
    editor = tab.ace, 
    editorSession = editor.getSession(), 
    editorContents = editorSession.getValue(), 
    fileId = tab.fileId, 
    successCallback = callback || undefined;

    if (!fileId || fileId.trim() === "") {
      me.saveAs(index);
      return;
    }

    var data = {
      fileId : fileId,
      fileContents : editorContents
    };

    $.ajax({
      type : 'POST',
      url : '/app/' + appId + '/update/' + fileId + '.json',
      data : data,
      success : function(res) {
        if (res && res.data && res.data.msg && !res.data.error) {
          client.util.messages.success(res.data.msg);
          successCallback();
          if (tab) {
            tab.dirty = false;
            $('#' + tabId + 'Link strong.modifiedStar').hide();
          }
        } else {
          client.util.messages.error('Error Saving File', res.data.error);
        }
      }
    });
};

  /*
   * Saves all open files, any previously unsaved files will cause a saveAs prompt
   */
client.studio.editor.saveAll = function(){
    var me = client.studio.editor;
    var currentTab; 
    var newFileIndex=0;;

    for (var i=0; i<me.tabs.length; i++){
      currentTab = me.getTabByIndex(i);

      if (!currentTab.fileId || currentTab.fileId.trim() === "") {
        newFileIndex = i;
      } else {
        me.save(i);
        console.log("Saved file "+i);
      }
    }
    var title, message, buttons;
    title = "New Files";
    message = "You have a new file to save. Would you like to save it now?";
    buttons = [ {
      text : 'Cancel',
      callback : function() {
        // Just cancel this modal dialog
        return true;
      }
    }, {
      text : 'Save',
      type : 'primary',
      callback : function() {
        me.save(newFileIndex);
      }
    } ];
    client.util.modal(title, message, buttons);

};

/*
 * Opens a modal save dialog with a files tree before creating a new file with
 * a create operation
 */
client.studio.editor.saveAs = function() {
    var title = "Save As", 
    me = client.studio.editor,
    index = me.activeTab,
    tab = me.getTabByIndex(index), 
    tabId = 'tab' + index, 
    editor = tab.ace, 
    editorSession = editor.getSession(), 
    editorContents = editorSession.getValue(); 
    debugger;
    /*
     * Setup our modal dialog popup
     */
    var message = "Choose where to save this file <br /> "
        + "<div id='_modalGenTree'>Loading files tree...</div>"
        + "<form class='pathForm form-horizontal'>"
        + "<fieldset><label for='fileName'>Filename: </label><input class='span6' id='fileName'></fieldset>"
        + "<fieldset><label for='filePath'>Path: </label><input  class='span6' id='filePath'></fieldset>"
        + "</form>", 
    buttons = [ {
      text : 'Cancel',
      callback : client.util.modalRemove
    },
    {
      text : 'Save',
      type : 'primary',
      callback : submitSaveAs
    }
    ];
    client.util.modal(title, message, buttons);
    
    /*
     * Function to send the request back to the server
     */
    function submitSaveAs(){
      // TODO: Filename dialog already destroyed by now
      var filename = $('input#fileName').trim(),
      path = $('input#filePath').trim(),
      contents = "";
      
      var data = {
          contents: editorContents
      };
      $.ajax({
        type : 'POST',
        url : '/app/' + appId + '/create/' + fileId + '.json',
        data : data,
        success : function(res) {
          if (res && res.data && res.data.msg && !res.data.error) {
            client.util.messages.success(res.data.msg);
            
            if (tab) {
              tab.dirty = false;
              $('#' + tabId + 'Link strong.modifiedStar').hide();
            }
          } else {
            client.util.messages.error('Error Saving File', res.data.error);
          }
        }
      });
      client.util.modalRemove();
      
    }
    
    /*
     * Setup our files tree in the modal dialog view
     */
    $('#_modalGenTree').bind("loaded.jstree", function() {
      // once the tree is loaded, remove the files from the tree, just leaving
      // the folders
      $('#_modalGenTree .jstree-leaf').remove(); // hide all files, leaving one
                                                  // file per level
    }).jstree(me.filesTree).bind("select_node.jstree", me.tree.pathFolderClick);
    
};
/*
 * Opens a modal save dialog with a files tree before creating a new file with
 * a create operation
 */
client.studio.editor.openResource = function() {
    var title = "Open Resource",
    me = client.studio.editor,
    message = "<form class='typeaheadForm form-horizontal'>"
        + "<fieldset>"
          + '<input id="fileName" placeholder="Enter a filename to see suggestions..." type="text" class="span6" data-provide="typeahead" data-items="4" >' 
        + "</fieldset>"
        + "</form>", 
    buttons = [
      {
        text : 'Cancel',
        callback : function() {
          // Just cancel this modal dialog
          return true;
        }
      }, 
      {
        text : 'Open',
        type : 'primary',
        callback : function() {
          // TODO: Perform a $.ajax new file operation with some path...
        }
      } 
    ];
    
    client.util.modal(title, message, buttons, { backdrop: false });
    setTimeout(function(){ // needs to happen within a timeout
      $('#_modalGen input').focus();
    }, 100);
    
    var filesTree = client.studio.editor.filesTree.json_data.data;
    me.filesList = filesTree = flatList(filesTree, []);
    
    // Transform our flat files list to something the typeahead can consume
    var pathList = [];
    for (var i=0; i<filesTree.length; i++){
      var f = filesTree[i];
      if (f.type==="file"){
        pathList.push(f.path);
      }
    }
    
    
    $('input#fileName').typeahead({
      //source: ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],
      source: pathList, 
      matcher: function(record){
        var query = this.query;
        if (record.indexOf(query)!=-1){
          return record;
        }
        
      }
    });
    $('input#fileName').on('keyup', function(e){ 
      switch(e.keyCode) {
        case 27: // escape
          client.util.modalRemove();
          break
  
        case 13: // enter
          submit(e);
          client.util.modalRemove();
          break
      }
    });
    
    $('form.typeaheadForm').unbind().on('submit', submit);
    
    
    
    function submit(e){
      e.preventDefault();
      var path = $('input#fileName').val();
      var fL = me.filesList;
      for (var i=0; i<fL.length; i++){
        var f = fL[i];
        if (f.path === path){
          me.open(f.guid);
          return;
        }
      }
      client.util.messages.error("Couldn't find a file " + path);
      return false;
    }
    
    // Recursive utility function to flatten the list
    function flatList(tree, flat){
      for (var i=0; i<tree.length; i++){
        var t = tree[i];
        if (t.children){
          flat = flatList(t.children, flat);
        }
        flat.push(t);
      }
      return flat;
    }
};
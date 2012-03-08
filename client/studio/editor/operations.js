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

          if (typeof successCallback !== "undefined") {
            successCallback();
          }
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
   * TODO: Deprecate? This probably isn't needed, bad UX with danger of error.
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
    appId = me.appId,
    index = me.activeTab,
    tab = me.getTabByIndex(index), 
    tabId = 'tab' + index, 
    editor = tab.ace, 
    editorSession = editor.getSession(), 
    editorContents = editorSession.getValue(); 
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
      var filename = $('input#fileName').val().trim();
      path = $('input#filePath').val().trim(),
      type = "txt";
      
      var data = {
          path : path,
          name: filename,
          fileContents : editorContents,
          type: type
      };
      $.ajax({
        type : 'POST',
        url : '/app/' + appId + '/create.json',
        data : data,
        success : function(res) {
          if (res && res.data && res.data.msg && !res.data.error) {
            client.util.messages.success(res.data.msg);
            me.tree.refresh();
            if (tab) {
              tab.dirty = false;
              $('#' + tabId + 'Link strong.modifiedStar').hide();
            }
          } else {
            client.util.messages.error('Error Saving File', res.data.error);
          }

          // Update the tree
          client.studio.editor.refreshTree(appId);
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
    }).jstree(me.filesTree).bind("click.jstree", me.tree.pathFolderClick);
    
};

client.studio.editor.deleteFile = function(guid){
  var title = "Delete File",
  me = client.studio.editor,
  appId = me.appId,
  selectedNodes = $('#treeContainer .jstree-clicked.selected');
  
  // if we haven't selected anything in the tree, throw an info message
  if (!selectedNodes || !selectedNodes.length || selectedNodes.length<1){
    client.util.messages.info("No files selected!");
    return;
  }
  
  // Determine the selected node from the jstree
  var firstSelectedNode = selectedNodes[0],
  li = $(firstSelectedNode).closest("li"),
  nodeData = li.data();
  
  // if we fail to retrieve this node's data, file an error
  if (!nodeData || !nodeData.guid || !nodeData.path || !nodeData.title){
    client.util.messages.error("Error retrieving file data - are you sure you selected a file?");
    return;
  }
  
  nodeData.path = client.util.string.stripFileNameFromPathString(nodeData.path);
  
  // Construct our object going out with the $.ajax
  var dataToSend = {
      path : nodeData.path,
      name: nodeData.title,
      fileId: nodeData.guid,
      type: nodeData.type || "file"
  };
  /*
   * Setup our modal dialog popup
   */
  var message = "Are you sure you want to delete " + dataToSend.name + "?",
  buttons = [ {
    text : 'Cancel',
    callback : client.util.modalRemove
  },
  {
    text : 'Delete',
    type : 'danger',
    callback : submitDelete
  }
  ];
  client.util.modal(title, message, buttons);
  
  /*
   * Function to send the request back to the server
   */
  function submitDelete(){
    $.ajax({
      type : 'POST',
      url : '/app/' + appId + '/delete/' + dataToSend.fileId + '.json',
      data : dataToSend,
      success : function(res) {
        client.studio.editor.refreshTree(function() {
          if (res && res.data && res.data.msg && !res.data.error) {
            client.util.messages.success(res.data.msg);
            me.tree.refresh();
          } else {
            client.util.messages.error('Error Saving File', res.data.error);
          }
        });      
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
  }).jstree(me.filesTree).bind("click.jstree", me.tree.pathFolderClick);
}

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
        callback : submit
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

client.studio.editor.refreshTree = function(callback) {
  var me = client.studio.editor,
  appId  = me.appId;

  console.log("refreshTree");
  $.ajax({
    type: 'GET',
    url: '/app/' + appId + '/files',
    success: function(res) {
      var fileList = JSON.parse(res.data.files);

      client.studio.editor.tree.init(fileList);

      if (typeof callback !== "undefined") {
        callback();
      }
    }
  });
};
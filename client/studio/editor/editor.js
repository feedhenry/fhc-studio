client.studio.editor = {
  tabs: [],
  appId: "",
  activeTab: 0,
  editorTabPrefix : "tab",
  editorInstancePrefix : "editor",
  init: function(){
    var fileTree = $('input[name="filestree"]').remove().val();
    this.tree(JSON.parse(fileTree));
    var appId =  $('input#appId').remove().val(),
    fileContents = $('pre#editor0').html(),
    fileId = $('input#fileId').remove().val(), // this gets put into a hidden input in the HTML - we'll remove it now
    mode = 'js';
    //ready the actions
    $('.save').unbind().bind("click",client.studio.editor.save);
    $('.snippet').unbind().bind("click",client.studio.editor.snippet);
    // Set our appId on the editor object
      console.log(appId);
    this.appId = appId;
    
    // Transform our data into something newTab expects
    var res = {
      data: {
       fileContents: fileContents,
       fileId: fileId,
       mode: ''
      }
    };
    
    this.newTab(res);
  
  },
  tree: function(tree){
    var me = this;
    if (!tree.children){
      throw new Error("Error loading tree children");
    }
    // Root node of the tree is /, with children of client, cloud and shared. Let's make them the root instead.
  
    for (var i=0; i<tree.children.length; i++){
      parseChildren(tree.children[i]);
    }
    parseChildren(tree);
    var treeData = {
      data: tree.children // init the tree with the children array of / as it's root  
    };
    
    
    $(function () {
    
      $("#treeContainer").jstree({ 
        "json_data" : treeData,
        "plugins" : [ "themes", "json_data", "ui" ],
        "themes" : {
                    "theme" : "default",
                    "dots" : false,
                    "icons" : true
        },
      }).bind("select_node.jstree", function (e, data) {
        var el = $(data.rslt.obj),
        guid = data.rslt.obj.data("guid"),
        type = data.rslt.obj.data("type");
        
        if (!type || type!="file"){
          $("#treeContainer").jstree('toggle_node', el);
        }
        
        if ( data.inst.is_leaf() == true && type=="file"){
          me.open(guid);
        }
      });
    });

    function parseChildren(tree){
      tree.data = tree.data || {};
      tree.data.title = tree.name;
      tree.data.icon = tree.type;
      tree.metadata = {
        title: tree.name,
        path: tree.path,
        status: tree.status,
        type: tree.type,
        guid: tree.guid
      };
      
      
      if (tree.children){
        var children = tree.children;
        for (var i=0; i<children.length; i++){
          parseChildren(children[i]);
        }
      }
    };
  
  }, // end client.studio.editor.tree
  open: function(guid){
    //Navigate to that file using an ajax request with a callback
    var path = window.location.pathname;
    var path = "/app/" + this.appId + "/editor/" + guid;
    client.studio.dispatch().update(path, { callback: this.newTab } ); 
    
  }, 
  save: function(){
    var me = client.studio.editor,
    appId = me.appId,
    index = me.activeTab || 0,
    tab = me.tabs[index],
    editor = tab.ace, 
    editorSession = editor.getSession(),
    editorContents = editorSession.getValue(),
    fileId = tab.fileId;
    
    var data = {
        fileId : fileId,
        fileContents: editorContents
    };
     
    $.ajax({
      type: 'POST',
      url: '/app/' + appId + '/update/' + fileId + '.json',
      data: data,
      success: function(res){
        if (res && res.data && res.data.msg){
          client.studio.util.messages.info(res.data.msg);
        }else{
          client.studio.util.messages.error('Error saving file');
        }
      }
    });
  },
  /*
   * Opens a new tab in the editor with the param's contents
   */
  newTab: function(res){
    // Some locals for use in this function
    var fileContents = res.data.fileContents,
    fileName = res.data.title || "",
    fileId = res.data.fileId,
    mode = res.data.mode,
    me = client.studio.editor,
    index = me.tabs.length || 0,
    editor = undefined,
    modeString = undefined,
    extension = undefined;
    
    
    
    // Extract the filename extension using a regex if possible
    var extensionResults = fileName.match(/\.+[a-zA-Z]+$/);
    if (extensionResults && extensionResults.length==1){
      extension = extensionResults[0];
      extension = extension.replace(".", "");
    } 
    mode = extension || "";
    
    
 // If this is the first file we're opening, let's nuke that plaintext tab
    if (me.tabs.length===1){ // we've only 1 tab
      var t = me.tabs[0]; 
      if (!t.dirty && t.fileId.trim() === ""){ // and it's file name is blank
        me.closeTab(0); // TODO: Base index off 0 rather than 1 first
        index = 0;
        me.appendTabWithIndex(index, fileName);  
      }
    }
    
    
    // 2) Add the DOM elements for a new tab 
    if (index!=0){
      me.appendTabWithIndex(index, fileName);  
    }
    
    // 3) Check for image files - if so, break out of this function
    if (extension && 
        (extension==="jpg" || extension==="jpeg" || extension === "png" || extension=== "gif")){
      //TODO: Create a base-64 encoded image <img src="base64:/...." />"
      return;
    }
    
    // 4) Append the file contents into our new pre dom element
    if (mode!="html"){
      $('pre#editor' + index).html(fileContents);  
    }
    
    
    // 5) Construct an object to represent this tab
    var tab = {
        fileId: fileId,
        fileName: fileName,
        fileExtension: mode,
        originalFileContents: fileContents, // is this needed?
        dirty: false
    };
        
    // 6) Setup ACE 
    var editor = tab.ace = ace.edit("editor" + index); // instantiate the editor on it's dom el, apply it to the tab object
    editor.getSession().on('change', function(){
      me.tabs[me.activeTab].dirty = true;
    });
    editor.setTheme("ace/theme/chrome");
    editor.renderer.setShowPrintMargin(false);
    
    switch(mode){
      case 'js':
        modeString = "javascript";
        break;
        
      case 'css':
        modeString = "css";
        break;
        
      case 'html':
        modeString = "html";
        break;
        
      case 'htm':
        modeString = "html";
        break;
        
      case 'xhtml':
        modeString = "html";
        break;
        
      default:
        modeString = false; // plaintext
        break;
      
    }
    
    if(modeString){
      if (modeString=="html"){ // HTML Can't be injected using $.html() - need to use setValue..
        editor.getSession().setValue(fileContents);
      }
      var Mode = require("ace/mode/" + modeString).Mode;
      editor.getSession().setMode(new Mode());
    
    }
    
    // 7) Push the tab onto our studio.editor.tabs array, and show the tab (also sets activeTab)
    me.tabs.push(tab);
    me.showTab(index);
    
  },
  showTab: function(index){
    var me = client.studio.editor;
    me.activeTab = index;
    $('a[href="#' + me.editorTabPrefix + index + '"]').click();
    if (me.tabs[index] && me.tabs[index].ace){
      me.tabs[index].ace.resize();
      me.tabs[index].ace.focus();  
    }
    
  },
  closeTab: function(index){
    var me = client.studio.editor;
    // only close if there isn't a pending save
    if (!me.tabs[index].dirty){
      $('a[href="#' + me.editorTabPrefix + index + '"]').parent().remove(); // remove the tab
      $('#' + me.editorTabPrefix + index).remove(); // remove the editor body  
    }else{
      //TODO: Modal 'save without closing?' dialog
    }

  },
  updateTab: function(index){ // TODO: Call this after showing each tab
    var me = client.studio.editor;
    var t = me.tabs[index];
    if (t){
      if (t.ace){
        t.ace.resize();
        t.ace.focus();
      }
    }
  },
  /*
   * Helper function to do the dom manipulation to add the container wiring for a new tab
   */
  appendTabWithIndex: function(index, title){
    var me = client.studio.editor,
    fileName = title || "";
    // 1) Append the li to the top tabs
    var li = document.createElement("li");
    var a = document.createElement("a");
    var strong = document.createElement("strong");
    strong.innerHTML = "x";
    $(strong).click(function(){
      me.closeTab(index);
    });
    a.appendChild(strong);
    a.className = "no-ajax";
    a.href = "#" + me.editorTabPrefix + index;
    a.setAttribute('data-toggle', 'tab');
    
    li.appendChild(a);
    a.innerHTML = title;
    $('.app.editor .editorTabs').append(li); // add the tab element into our UL
    
    // 2) Create the tab content el div and pre tags for the tab
    var tabContentEl = document.createElement("div");
    tabContentEl.id = me.editorTabPrefix + index;
    tabContentEl.className = "tab tab-pane";
    var preEl = document.createElement("pre");
    preEl.id = me.editorInstancePrefix+ index;
    tabContentEl.appendChild(preEl);
    
    $('.app.editor .tab-content').append(tabContentEl); // add the tab body into our tab content DOM el
  },
  snippet: function(id){
      var me = client.studio.editor;


    //need to know the gist id and send that through
    var path = "/editor/gist";
    $.ajax({
      url: path,
      context: this,
      success: function(res){
          console.log(res);

          me.tabs[me.activeTab].ace.insert(res);
      }
    });
    

  }
};

var studio = studio || {};
studio.editor = {
  tabs: [],
  appID: "",
  activeTab: 0,
  init: function(){
    var appID =  $('input#appID').remove().val(),
    fileContents = $('pre#editor0').html(),
    fileID = $('input#fileID').remove().val(), // this gets put into a hidden input in the HTML - we'll remove it now
    mode = 'js';
    
    // Set our appID on the editor object
    this.appID = appID;
    
    // Transform our data into something openTab expects
    var res = {
      data: {
       fileContents: fileContents,
       fileID: fileID,
       mode: ''
      }
    };
    
    this.openTab(res);
  
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
  
  }, // end studio.editor.tree
  open: function(guid){
    //Navigate to that file using an ajax request with a callback
    var path = window.location.pathname;
    var path = "/apps/" + this.appID + "/editor/" + guid + ".json";
    studio.go(path, this.openTab);  
    
  }, 
  save: function(){
    debugger;
    var tab = this.tabs[0],
    editor = tab.ace, 
    editorSession = editor.getSession(),
    editorContents = editorSession.getValue(),
    fileID = tab.fileID;
    
    var data = {
        fileID : fileID,
        fileContents: editorContents
    };
     
    $.ajax({
      type: 'POST',
      url: '/apps/someGUIDFIXME/update/' + fileID + '.json',
      data: data,
      success: function(res){
        if (res && res.data && res.data.msg){
          studio.info(res.data.msg);
        }else{
          studio.error('Error saving file');
        }
      }
    });
  },
  openTab: function(res){
    // TODO: The object has all the stuff required to open based on activeTab // tabs.length
    // this now just needs dom manip to construct a new tab
    
    var fileContents = res.data.fileContents,
    fileID = res.data.fileID,
    mode = res.data.mode,
    index = studio.editor.tabs.length || 0;
    $('pre#editor' + index).html(fileContents);
    
    var tab = {
        fileID: fileID,
        originalFileContents: fileContents,
    };
    
    //TODO: Switch on Mode to transform 'js' to 'javascript' etc, and include the new Mode() by string
    
    var editor = tab.ace = ace.edit("editor" + index);
    editor.setTheme("ace/theme/cobalt");
    editor.renderer.setShowPrintMargin(false);
    
    
    
    if(mode && mode=="js"){
      var JavaScriptMode = require("ace/mode/javascript").Mode;
      editor.getSession().setMode(new JavaScriptMode());
    
    }if (mode && mode== "html"){
      var htmlMode = require("ace/mode/html").Mode;
      editor.getSession().setMode(new htmlMode());
    }
    
    if (!mode){
      var JavaScriptMode = require("ace/mode/javascript").Mode;
      editor.getSession().setMode(new JavaScriptMode());
    }
    
    // Construct an object to represent this tab, and push it to the editor object's tabs array
    
    
    studio.editor.tabs.push(tab);
    
  },
  snippet: function(id){
    this.ace.insert(id);
    return;
    var path = "http://raw.github.com/gist/1099663/gistfile1.js";
    $.ajax({
      url: path,
      context: this,
      success: function(res){
        this.ace.insert(res);
      }
    });
    

  }
};

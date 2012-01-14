var studio = studio || {};
studio.editor = {
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
    //Navigate to that file using a browser nav
    var path = window.location.pathname;
    if (path[path.length-1]=="/"){
      studio.go(window.location.pathname + guid + '.json', this.openTab);  
    }else{
      studio.go(window.location.pathname + '/' + guid + '.json', this.openTab);
    }
  }, 
  save: function(){
    
  },
  openTab: function(res){
    if (res){
      var file = res.data.file,
      mode = res.data.mode;
      $('pre#editor').html(file);
    }else{
      var mode = 'js';
    }
    //TODO: Switch on Mode to transform 'js' to 'javascript' etc, and include the new Mode() by string
    
    var editor = this.ace  = ace.edit("editor");
    editor.setTheme("ace/theme/cobalt");
    editor.renderer.setShowPrintMargin(false);
    
    
    
    if(mode && mode=="js"){
      try{
      var JavaScriptMode = require("ace/mode/javascript").Mode;
        console.log(JavaScriptMode);
      editor.getSession().setMode(new JavaScriptMode());
       }catch(ex){
          console.log(ex);
      }
    
    }if (mode && mode== "html"){
      var htmlMode = require("ace/mode/html").Mode;
      editor.getSession().setMode(new htmlMode());
    }
    
    if (!mode){
      var JavaScriptMode = require("ace/mode/javascript").Mode;
      editor.getSession().setMode(new JavaScriptMode());
    }
    
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

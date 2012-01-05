var studio = studio || {};
studio.tree = function(tree){
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
                    "theme" : "apple",
                    "dots" : true,
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
          //Navigate to that file
          
          var path = window.location.pathname;
          if (path[path.length-1]=="/"){
            studio.go(window.location.pathname + guid);  
          }else{
            studio.go(window.location.pathname + '/' + guid);
          }
          
        }
      });
    });
  
    function parseChildren(tree){
      tree.data = tree.name,
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
    
    
}// end studio.tree

client.studio.editor = client.studio.editor || {};
client.studio.editor.tree = {
    click : function(e) {
      var me = client.studio.editor,
      node = $(e.target).closest("li"),
      data = node.data(),
      guid = data.guid, 
      type = data.type;

      if (!type || type != "file") {
        $("#treeContainer").jstree('toggle_node', node);
      }
      
      if (type == "file") {
        me.open(guid);
      }
    },
    pathFolderClick : function(e, data) {
      var me = client.studio.editor, 
      path = data.rslt.obj.data("path");
      $('#filePath').val(path);
      me.tree.click(e, data);
    },
    init : function(tree) {
      var me = client.studio.editor;
      if (!tree.children) {
        
        client.util.messages.error('Error', 'Error loading the files tree - is this a git app?'); // TODO: Localise
        tree.children = [{
          guid: '',
          name: 'Error loading files',
          path: '',
          type: 'file'
        }];
      }else{
        // Root node of the tree is /, with children of client, cloud and shared.
        // Let's make them the root instead.

        for ( var i = 0; i < tree.children.length; i++) {
          parseChildren(tree.children[i]);
        }

        

      }
      parseChildren(tree);
      var treeData = {
          data : tree.children
        // init the tree with the children array of / as it's root
      };
      
      $(function() {
        me.filesTree = {
          "json_data" : treeData,
          "plugins" : [ "themes", "json_data", "ui", "search", "hotkeys" ],
          "themes" : {
            "theme" : "default",
            "dots" : false,
            "icons" : true
          },
          "core" : { 
              "animation" : 125 
          },
          'hotkeys': {
            'up' : function(){
              var o = this.data.ui.selected || this.data.ui.last_selected || -1;
              this.deselect_node();
              this.select_node(this._get_prev(o));
              return false;
            },
            'down' : function(){
              var o = this.data.ui.selected || this.data.ui.last_selected || -1;
              this.deselect_node();
              this.select_node(this._get_next(o));
              return false;
            },
            'space' : function () { // TODO: Make this enter? 
              var o = this.data.ui.selected || this.data.ui.last_selected;
              var d = o.data();
              if (o.type && o.type==="file"){
                me.open(o.guid);
              }
              if(this.data.ui.hovered) { this.data.ui.hovered.children("a:eq(0)").click(); }
              
              return false; 
            },  
            "left" : function () {
              var o = this.data.ui.selected || this.data.ui.last_selected;
              if(o) {
                var d = o.data();
                if (o.data && o.data.type==="file"){
                  return false;
                }
                if(o.hasClass("jstree-open")) { this.close_node(o); }
                else { 
                  this.deselect_node(); 
                  this.select_node(this._get_prev(o)); 
                  }
              }
              return false;
            },
            'right' : function(){
              var o = this.data.ui.selected || this.data.ui.last_selected;
              if(o && o.length) {
                var d = o.data();
                if (o.data && o.data.type==="file"){
                  return false;
                }
                if(o.hasClass("jstree-closed")) { this.open_node(o); }
                else { 
                  this.deselect_node();
                  this.select_node(this._get_next(o)); 
                }
              }
              return false;
            }
          }
        };

        $("#treeContainer").jstree(me.filesTree).bind("dblclick.jstree",
            me.tree.click);
      }); // end jqclosure

      function parseChildren(tree) {
        tree.data = tree.data || {};
        tree.data.title = tree.name;
        tree.data.icon = tree.type;
        tree.metadata = {
          title : tree.name,
          path : tree.path,
          status : tree.status,
          type : tree.type,
          guid : tree.guid
        };

        if (tree.children) {
          var children = tree.children;
          for ( var i = 0; i < children.length; i++) {
            parseChildren(children[i]);
          }
        }
      }
      ;
    } // end client.studio.editor.tree.init
  }; // end client.studio.editor.tree
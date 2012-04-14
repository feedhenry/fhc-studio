client.studio.editor = client.studio.editor || {};
client.studio.editor.tree = {
    bindEvents: function(){
      var me = client.studio.editor;
      $('#treeRefreshLink').unbind().on('click', me.refreshTree);
      $('#treeDeleteLink').unbind().on("click", me.deleteFile);
      $('#treeRenameLink').unbind().on("click", me.renameFile);
      $('#treeSearchLink').unbind().on("click", me.openResource);
      $('#treeNewLink').unbind().on("click", me.newFile);
    },
    doubleclick : function(e) {
      var me = client.studio.editor,
      node = $(e.target).closest("li"),
      data = node.data() || "",
      guid = data.guid || null, 
      type = data.type || null;

      if (!type || type != "file") {
        $("#treeContainer").jstree('toggle_node', node);
        return;
      }
      
      if (type == "file") {
        me.open(guid);
      }
    },
    click: function(e){
      var me = client.studio.editor,
      a = $(e.target),
      node = a.closest("li"),
      data = node.data() || null;
    },
    select : function(event, data){
      var node = data.rslt.obj,
      inst = data.inst,
      a = $(node).children('a');
      if (a){
        if (a.hasClass('selected')){
          a.removeClass('selected');
          // disable buttons
          $('#treeButtons a.btn.enabled').removeClass('enabled').addClass('disabled');
          data.inst.deselect_node();
        }else{
          $('#treeContainer a.selected').removeClass('selected');
          // enable buttons
          $('#treeButtons a.btn.disabled').removeClass('disabled').addClass('enabled');
          a.addClass('selected');
        }
      }
      
    
      
      
    },
    deselect : function(event, data){
      // disable buttons
      //debugger;
      //$('#treeButtons a.btn.enabled').removeClass('enabled').addClass('disabled');

    },
    pathFolderClick : function(e, data) {
      var me = client.studio.editor,
      node = $(e.target).closest("li"),
      data = node.data() || "",
      path = data.path || "";
      // strip trailing /
      if (path && path[0]==='/'){
        path = path.substring(1, path.length);
      }
      if (path && path[path.length]!=='/'){
        path += '/';
      }
      $('#filePath').val(path);
      me.tree.doubleclick(e, data);
    },
    init : function(tree) {
      var me = client.studio.editor;
      me.tree.bindEvents();
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
          "plugins" : [ "themes", "json_data", "ui", "search", "hotkeys"],
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
            'return' : function () { // TODO: Make this enter?
              var o = this.data.ui.selected || this.data.ui.last_selected;
              var d = o.data();
              if (d.type && d.type==="file"){
                me.open(d.guid);
                return;
              }
              if(o.hasClass("jstree-closed")) { 
                this.open_node(o); 
              }
              else { 
                this.close_node(o); 
              }
              
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
          }// end hotkeys
        };

        $("#treeContainer").jstree(me.filesTree)
        .bind("dblclick.jstree",me.tree.doubleclick)
        .bind("click.jstree",me.tree.click)
        .bind("select_node.jstree", me.tree.select)
        .bind("deselect_node.jstree", me.tree.deselect);
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
    }, // end client.studio.editor.tree.init
    refresh: function(){
      //TODO: Complete refresh operation using READ operation of CRUDL set defined in operationController

    }
  }; // end client.studio.editor.tree
client.util.messages  = {
    error: function(title, msg){
      var me = client.util.messages;
      var node = me.createNode(title, msg, 'error');
      me.doMessage(node);
      //throw new Error(title + " : " + msg);
    },
    info: function(title, msg){
      var me = client.util.messages;
      var node = me.createNode(title, msg, 'info');
      me.doMessage(node);
    },
    success: function(title, msg){
      var me = client.util.messages;
      var node = me.createNode(title, msg, 'success');
      me.doMessage(node);
    },
    doMessage: function(node){
      var container = document.getElementById('messageContainer');
      //container.innerHTML = "";
      container.appendChild(node);
    },
    createNode: function(title, msg, type){
      var title = (typeof title === "string") ? title : "";
      var msg = (typeof msg === "string") ? msg : "";
      
      var me = this;
      type = type || 'error',
      title = title || type,
      msg = msg || "\f",
      dialogId = "_messageGen" + title.split(" ")[0]; // ID is only the first word
      
      var alert = document.createElement("div");
      alert.className = "alert alert-" + type;
      alert.id = dialogId;
        var a = document.createElement("a");
        a.innerHTML = 'x';
        a.className = "close no-ajax";
        a.href = "#";
        a.onclick = function(){
          me.removeMessage(dialogId)
        }
        var strong = document.createElement("strong");
        strong.innerHTML = title;
        var message = document.createTextNode(' ' + msg);
      alert.appendChild(a);
      alert.appendChild(strong);
      alert.appendChild(message);
      return alert;    
    },
    removeMessage : function(id){
      $('#' + id).remove();
    }
    
    
};
client.util.messages  = {
    error: function(title, msg){
      var node = this.createNode(title, msg, 'error');
      this.doMessage(node);
    },
    info: function(title, msg){
      var node = this.createNode(title, msg, 'info');
      this.doMessage(node);
    },
    success: function(title, msg){
      var node = this.createNode(title, msg, 'success');
      this.doMessage(node);
    },
    doMessage: function(node){
      var container = document.getElementById('messageContainer');
      //container.innerHTML = "";
      container.appendChild(node);
    },
    createNode: function(title, msg, type){
      var me = this;
      type = type || 'error',
      title = title || type,
      msg = msg || "\f",
      dialogId = "_messageGen" + title;
      
      var alert = document.createElement("div");
      alert.className = "alert alert-" + type;
      alert.id = dialogId;
        var a = document.createElement("a");
        a.innerHTML = 'x';
        a.className = "close no-ajax";
        a.href = "#";
        var strong = document.createElement("strong");
        strong.innerHTML = title;
        var message = document.createTextNode(msg);
      alert.appendChild(a);
      alert.appendChild(strong);
      alert.appendChild(message);
      alert.onclick = function(){
        me.removeMessage(dialogId)
      }
      return alert;    
    },
    removeMessage : function(id){
      $('#' + id).remove();
    }
    
    
};
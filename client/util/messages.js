client.util.messages  = {
  
  messageTime: 5000,   // How long should the message be visible for?
  transitionTime: 500, // How long should the animation transition last

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
    /*
    var container = document.getElementById('messageContainer');
    container.style.display = 'none'; // Hide the element

    if (!container) container = document.body;
    //container.innerHTML = "";
    container.appendChild(node);
    */
    var container = $("#messageContainer");
    var nodeEl    = $(node).css("display", "none");

    container.append(nodeEl);

    nodeEl.show(this.transitionTime);
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
    alert.className = "message alert " + type;
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

    // Remove the message after set number of seconds.
    (function(alert, me) {
      setTimeout(function() {
        var alertMsg = $(alert);

        alertMsg.hide(me.transitionTime, function() {
          alertMsg.remove();
        });
      }, me.messageTime);
    })(alert, me);

    return alert;    
  },
  removeMessage : function(id){
    console.log(id);

    $('#' + id).hide(this.transitionTime, function() {
      $('#' + id).remove();
    });
  }
    
};
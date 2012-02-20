client.studio = client.studio || {};
client.studio.preview = {
    containerId: 'previewContainer',
    scaleVal : 0,
    rotateVal : "0deg",
    translateVal: "0px, 0px",

    init: function(){
      $('.previewContainer iframe').on('load', function(){
        $(this).css('background-color', '#fff');
      });
      $('#previewBrandLink').on('click', this.toggleWidget);
      var val =  $('#scaleSlider')[0].value;
      this.scale(val);
      
      // Make draggable
      Drag.init(document.getElementById("previewContainer"));
    },
    scale : function(val){
        var container = document.getElementById(this.containerId);
        val = val / 100;
        this.scaleVal = val;
        this.appendTransform(container);
    },
    rotate: function(){
        var container = document.getElementById(this.containerId);
        if (this.rotateVal=="0deg"){
            this.rotateVal = "90deg";
            this.translateVal = "0px, -" + container.clientHeight + "px";
        } else {
            this.rotateVal = "0deg";
            this.translateVal = "0px, 0px";
        }
        this.appendTransform(container);
    },
    appendTransform: function(node, property){
        var prefixedTransform = "scale(" + this.scaleVal + ") rotate(" + this.rotateVal + ") translate(" + this.translateVal + ")";
        node.style.webkitTransform = prefixedTransform;
        node.style.MozTransform = prefixedTransform;
        node.style.transform = prefixedTransform;
    },
    change: function(device){
        var container = document.getElementById(this.containerId);
        container.className = "previewContainer " + device;

        // Reset transform
        if (this.rotateVal === "90deg") {
            this.rotate();
        }
    },
    toggleWidget: function(){
      var widget = $('section.preview.dashboardPreview');
      if (widget.hasClass('collapsed')){
        widget.removeClass('collapsed');
        var url = $('#previewUrl').val();
        var iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.frameborder = 0;
        iframe.onload = function(){
            $(this).css('background-color', '#fff');
        }
        $('#previewContainer').append(iframe);
        //<iframe src="{previewUrl}" frameborder="0"></iframe>
      }else{
        widget.addClass('collapsed');
        $('#previewContainer iframe').remove();
      }
    }
};



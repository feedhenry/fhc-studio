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
            // Rotate the container
            this.rotateVal = "90deg";
            this.translateVal = "0px, -" + container.clientHeight + "px";

            // rotate the iFrame inside the container
            this.iFrameRotate(container, -90);
        } else {
            this.rotateVal = "0deg";
            this.translateVal = "0px, 0px";

            // rotate the iFrame inside the container
            this.iFrameRotate(container, 0);
        }
        this.appendTransform(container);
    },
    iFrameRotate: function(node, degrees) {
      var iFrame    = node.getElementsByTagName('iframe')[0];
      var scale     = 2;
      var width     = iFrame.clientHeight; 
      var height    = iFrame.clientWidth;
      var rotate    = degrees + 'deg';
      var translate = -(width * scale) + 'px, 0px';
      var transform;

      if (degrees === 0) {
        transform = 'rotate(0deg) translate(0px, 0px) scale(' + scale + ')';
      } else {
        transform = 'rotate(' + rotate + ') translate(' + translate + ') scale(' + scale + ')';
      }

      iFrame.style.webkitTransform = transform;
      iFrame.style.MozTransform    = transform;
      iFrame.style.transform       = transform;

      // Swap the width and height
      iFrame.style.width  = width  + 'px';
      iFrame.style.height = height + 'px';
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

        // Reset size
        var iFrame = container.getElementsByTagName('iframe')[0];
        iFrame.style.width  = '';
        iFrame.style.height = '';
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



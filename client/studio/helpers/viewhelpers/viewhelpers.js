client.studio.helpers.viewhelpers = {};
client.studio.helpers.viewhelpers.preview = {
    containerId: 'previewContainer',
    scaleVal : 0,
    rotateVal : "0deg",
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
        }else{
            this.rotateVal = "0deg";
        }

        this.appendTransform(container);

    },
    appendTransform: function(node, property){
        node.style.webkitTransform = "scale(" + this.scaleVal + ") rotate(" + this.rotateVal + ")";
    },
    change: function(device){
        var container = document.getElementById(this.containerId);
        container.className = "previewContainer " + device;

    }
};



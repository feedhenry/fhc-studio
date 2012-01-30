client.studio = client.studio || {};
client.studio.preview = {
    containerId: 'previewContainer',
    scaleVal : 0,
    rotateVal : "0deg",
    translateVal: "0px, 0px",

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
        node.style.webkitTransform = "scale(" + this.scaleVal + ") rotate(" + this.rotateVal + ") translate(" + this.translateVal + ")";
    },
    change: function(device){
        var container = document.getElementById(this.containerId);
        container.className = "previewContainer " + device;

    }
};



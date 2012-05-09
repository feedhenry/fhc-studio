client.studio = client.studio || {};
client.studio.account = {
  forms: null,
  init: function() {
    var self = this;

    // initialize our tooltip popovers
    $('a[rel=popover]').popover({placement: 'bottom'});

    this.forms = $("form").unbind().on("submit", function(e) {
      self.uploadResource(this);
      e.preventDefault();
      return false;
    });

    this.forms.each(function() {
      var form = this;
      var dropBox = $(form).find(".fileBox"),
        dropBoxEl = dropBox[0];


      dropBoxEl.addEventListener("dragenter", function() {
        dropBox.addClass("dragging");
      });
      dropBoxEl.addEventListener("dragleave", function() {
        dropBox.removeClass("dragging");
      });

      dropBoxEl.addEventListener("dragover", function(e) {
        e.stopPropagation();
        e.preventDefault();

        dropBox.addClass("dragging");

        e.dataTransfer.dropEffect = 'copy';
      }, false);

      dropBoxEl.addEventListener("drop", function(e) {
        e.stopPropagation();
        e.preventDefault();

        dropBox.removeClass("dragging");

        var file = e.dataTransfer.files[0];
        if(file) {
          self.uploadResource(form, file);
        }
      }, false);

    });

  },

  uploadResource: function(form, file) {
    var formData = new FormData(form);

    if(file) {
      formData.append("file", file);
    }
    if(file || form.file) {
      var xhr = new XMLHttpRequest();

      xhr.open("POST", "/account/upload", true);

      xhr.onprogress = function(e) {
        // Cian is going to do some magics with progress
        console.log(e);
      };

      xhr.onload = function(e) {
        var result = JSON.parse(xhr.responseText);
        console.log(result);

        if(result.result === "ok") {
          //success, the file has been uploaded
          //client.util.messages.success("File uploaded successfully");
        }
      };

      xhr.onerror = function(e) {
        console.log(e);
      }

      xhr.send(formData);

    }
  }

};
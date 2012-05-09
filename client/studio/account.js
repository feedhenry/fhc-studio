client.studio = client.studio || {};
client.studio.account = {
  form: null,

  init: function() {
    var self = this;

    // initialize our tooltip popovers
    $('a[rel=popover]').popover({placement: 'bottom'});

    this.form = $("form").unbind().on("submit", function(e) {
      self.uploadResource();
      e.preventDefault();
      return false;
    }).on("dragenter", function(e) {
      e.stopPropagation();
      e.preventDefault();
    }).on("dragexit", function(e) {
      self.form.removeClass("drag-over");
    }).on("dragover", function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      self.form.addClass("drag-over");
    }).on("drop", function(e) {
      console.log(e.originalEvent.dataTransfer);

      e.preventDefault();
    });

  },

  uploadResource: function() {
    var formEl = this.form[0];
      formData = new FormData(formEl);

    console.log(formData);

  }

};
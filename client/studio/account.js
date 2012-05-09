client.studio = client.studio || {};
client.studio.account = {
  form: null,

  init: function() {
    var self = this;

    this.form = $("form").unbind().on("submit", function(e) {
      self.uploadResource();
      e.preventDefault();
      return false;
    });
    var formEl = this.form[0];

    formEl.addEventListener("dragenter", function(e) {

      e.preventDefault();

      e.dataTransfer.dropEffect = 'link';

      return false;
    }, false);
    formEl.addEventListener("dragover", function(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'link';

    }, false);

    formEl.addEventListener("drop", function(e) {
      console.log(e.dataTransfer.dropEffect);
      e.preventDefault();
      e.stopPropagation();

    }, false);

  },

  uploadResource: function() {
    var formEl = this.form[0];
      formData = new FormData(formEl);

    console.log(formData);

  }

};
/*
 * Bootstrap Modal manager v1.0
 * Allows creation of Bootstrap modal dialogs with optional params
 * Licensed under the MIT license
 * @author cianclarke
 * https://github.com/cianclarke/Bootstrap-Modal-Manager
 *  
 * @param t : title string
 * @param m : message string or HTML
 * @param b : array of buttons, like [{text: 'Cancel'}, {text: 'Save', type: 'primary', callback: function(){}}]
 * where type is one of primary, info, success, danger
 * @param opts: object of options from boostrap modal, namedly backdrop and keyboard
 * 
 * An example with a close button, no backdrop and no keyboard controls:
 * var buttons = [
 *  {
 *    text: 'Save',
 *    type: 'primary'
 *  },
 *  {
 *    text: 'Close',
 *    callback: function(){
 *      // This is an ID appended onto all popups we make. This call will hide the window & remove it.
 *      $('#_modalGen').modal('hide');
 *      $('.modal').remove();
 *    }
 *  }
 * ];
 * modal("My Modal Dialog", "My Modal Message", buttons, { backdrop: false, keyboard: false });
 */
client.util.modalRemove = function(){
  $('#_modalGen').remove(); // close the dialog
  $('.modal-backdrop').remove();
}

client.util.modal  = function(t, m, b, opts){
  var title = t || "",
  message = m || "",
  buttons = b || [ { type: '', text: 'Close' }],
  opts = opts || {},
  backdrop = opts.backdrop || true,
  keyboard = opts.keyboard || true; 
  
  // Close && remove all previous modals
  $('.modal').modal('hide');
  $('.modal').remove();
  
  var html = [
  '<div class="modal" id="_modalGen">',
    '<div class="modal-header">',
      '<a href="#" class="close js-dismiss">×</a>',
      '<h3>' + title + '</h3>',
    '</div>',
    '<div class="modal-body">',
      '<p>' + message + '</p>',
    '</div>',
    '<div class="modal-footer" id="_modalGenFooter">',
    '</div>',
  '</div>'].join("");
  
  $('body').append(html);
  
  // Append in our modal buttons
  var buttons = buildButtons(buttons);
  $('#_modalGenFooter').append(buttons);
  
  // Setup our dialog with events & make the call to bootstrap's modal()
  $('#_modalGen a.js-dismiss.close').on('click', function(){
    $('#_modalGen').modal('hide');
    $('#_modalGen').remove();
  });
  $('#_modalGen').modal({backdrop: backdrop, keyboard: keyboard});
  
  function buildButtons(buttons){
    var ret = [];
    if (!buttons.length){
      buttons = [buttons];
    }
    for (var i=buttons.length-1; i>=0; i--){
      var b = buttons[i],
      text = b.text || "Button",
      type = (b.type) ? "btn btn-" + b.type : "btn",
      callback = b.callback || null;
      
      var a = document.createElement('a');
      a.className = type;
      a.innerHTML = text;
      a.href = "#";
      
      // Register what happens after clicking this button, but always close the modal
      $(a).unbind().on('click', function(){
        $('#_modalGen').modal('hide');
        $('#_modalGen').remove();
      });
      if (callback){
        $(a).on('click', callback);  
      }
      
      ret.push(a);
    }
    return ret;
  }
  
};
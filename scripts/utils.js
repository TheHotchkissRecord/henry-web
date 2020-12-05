// from https://stackoverflow.com/questions/2794137/sanitizing-user-input-before-adding-it-to-the-dom-in-javascript
function sanitize(string) {
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
      "`": '&grave;'
  };
  const reg = /[&<>"'/`]/ig;
  return string.replace(reg, (match)=>(map[match]));
}

function unsanitize(string) {
  const map = {
      '&amp;' : '&',
      '&lt;'  : '<',
      '&gt;'  : '>',
      '&quot;': '"',
      '&#x27;': "'",
      '&#x2F;': "/",
      '&grave;': "`"
  };
  const reg = /&amp;|&lt;|&gt;|&quot;|&#x27;|&#x2F;|&grave;/ig;
  return string.replace(reg, (match)=>(map[match]));
}

// code from https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.click();
}

Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

function isUrl(s) {
   var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
   return regexp.test(s);
}

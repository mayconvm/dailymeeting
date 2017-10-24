/**
 * Abre janelas
 * @param  {string}   url
 * @param  {Function} callback 
 */
function openWindow (url, callback) {
  chrome.app.window.create(
    url,
    {
      bounds: {
          width: 600,
          height: 400
      },
      id: "win_" + hash(5),
      // alwaysOnTop: true
  }, callback);
}
  
/**
 * Gera um hash
 * @param  {integer} length 
 * @return {string}
 */
function hash(length) {

  let result = '';

  for (let i=0; i<length; i++) {
    result += rand();
  }

  function rand() {
    let i = parseInt(Math.random() * 4);
    let letter = "abcdefghijlmnopqrstuvxzABCDEFGHIJLMNOPQRSTUVXZ1234567890";

    return letter[i];
  }

  return result;
}

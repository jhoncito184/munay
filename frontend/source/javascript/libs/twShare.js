/**
 * Modulo para compartir en Twitter
 *
 * @param  {String} message  Mensaje de menos de 140 carácteres
 * @param  {String} link     URL a compartir
 * @param  {String} hashtag  Hashtag o lista de hashtags, ejem:"peru,color,etc"
 */
var twShare = function ( message, link, hashtag ) {

    var uri;

    uri = 'https://twitter.com/intent/tweet?url=' + link + '&text=' +
          encodeURI(message) + ' &hashtags=' + hashtag + '&display=popup';


    window.open(
        uri,
        "",
        "status = 1, height = 450, width = 620, resizable = 0"
    );
}

module.exports = twShare;
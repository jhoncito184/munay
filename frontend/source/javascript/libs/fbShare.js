/**
 * Modulo que contiene los métodos para compartir en FB:
 * fbDialog.share_url
 * fbDialog.share_dialog
 *
 * Requerimientos: Debes configurar una Facebook App
 *                 https://developers.facebook.com/docs/javascript/quickstart/v2.5
 */
var fbDialog = {

    /**
     * FB Share Dialog: Puedes compartir un sitio en FB con una simple URL.
     * Incluir info en la metadata de la página (URL) para personalizar el
     * contenido compartido en Facebook.
     * Más info: https://developers.facebook.com/docs/sharing/reference/share-dialog
     *
     * @param  {String}   url Link a compartir
     * @return {Function}     Función que devuelve el estado de la operación
     */
    share_url: function ( url ) {

        FB.ui({
            method: 'share',
            href: url,
        }, function ( response ) {

        });
    },

    /**
     * [share_simple description]
     * @param  {String} url URL a compartir
     * @return PopUp de facebook para compartir
     */
    share: function ( url ) {
        var href = "http://www.facebook.com/share.php?u=" + url;

        window.open(
            href,
            '',
            'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'
        );
    },



    /**
     * FB Feed Dialog: Añade un diálogo en la aplicación para que la gente
     * pueda publicar historias individuales a su línea de tiempo.
     * Más info: https://developers.facebook.com/docs/sharing/reference/feed-dialog/v2.5
     *
     * @param  {String} title    Título de info
     * @param  {String} descrip  Descripción de la info
     * @param  {String} image    Imagen de referencia
     * @param  {String} url      Link de la info
     * @return {Function}        Función que devuelve el estado de la operación
     */
    share_dialog: function ( title, descrip, image, url ) {

        FB.ui({
            method:      "feed",
            picture:     image,
            name:        title,
            description: descrip,
            link:        url
        }, function(response) {
            if (response && !response.error_code) {

            }
        });
    }
};

module.exports = fbDialog;
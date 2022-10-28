/**
 * Ubigeo module: para rellenar los combos con los datos de ubigeo
 * @modulo libs/ubigeo
 */
var Ubigeo = function() {

    var self = this;

    /**
     *
     * @param data
     * @param id
     * @param title
     * @returns {void|*|jQuery}
     */
    this.fillOptions = function ( data, id, title ) {

        var arrayHTML, i, item, len;

        arrayHTML = [];

        $(id).empty();
        $(id).append('<option value="">' + title + '</option>');

        i   = 0;
        len = data.length;

        while (i < len) {
            item = '<option value="' + data[i]['id'] + '">' + data[i]['name'] + '</option>';
            arrayHTML.push(item);
            i++;
        }

        return $(id).append(arrayHTML);
    };


    /**
     *
     * @param code
     * @param id
     * @param title
     */
    this.callToAjax = function ( code, id, title ) {

        var ubigeo = $("#ubigeo_url").val();

        $.ajax({
            type: 'GET',
            url: ubigeo + '?parent='+code,
            success: function(data) {

                self.fillOptions( data.ubigeos, id, title );
            },
            dataType: 'JSON'
        });
    };
};

module.exports = Ubigeo;
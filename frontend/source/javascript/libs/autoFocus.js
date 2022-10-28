/**
 * AutoFocus module cambia el foco (focus) de un campo a otro, despues de
 * teclear en un campo. El modulo esta hecho especialmente para el login de
 * submiller
 * @modulo libs/autofocus
 *
 * @param {String} id_inputDay     Id del campo día
 * @param {String} id_inputMonth   Id del campo mes
 * @param {String} id_inputYear    Id del campo año
 * @param {String} id_inputDni     Id del campo DNI
 * @constructor
 */
var AutoFocus = function ( id_inputDay, id_inputMonth, id_inputYear, id_inputDni ) {
    "use strict";

    var self = this;

    var campoDia  = document.getElementById( id_inputDay ),
        campoMes  = document.getElementById( id_inputMonth ),
        campoAnho = document.getElementById( id_inputYear ),
        campoDNI  = document.getElementById( id_inputDni );


    this.saltoInput = function ( campo ) {

        var campoActual = campo.id,
            numDigitos  = campo.value.length,
            charCode    = (campo.which) ? campo.which : campo.keyCode,
            nextInput;

        if ( charCode > 31 && (charCode < 48 || charCode > 57) ) {

            return false;

        } else {

            if ( campoActual !== id_inputYear ) {

                if ( numDigitos == 2 && campoActual !== id_inputDni ) {

                    if (campoActual == id_inputDay) nextInput = id_inputMonth;
                    else if (campoActual == id_inputMonth) nextInput = id_inputYear;
                    else if (campoActual == id_inputYear) nextInput = id_inputDni;

                    setTimeout(function () {
                        document.getElementById(nextInput).focus();
                    }, 10);
                }

            } else {

                if ( numDigitos == 4 && campoActual !== id_inputDni ) {

                    if (campoActual == id_inputDay) nextInput = id_inputMonth;
                    else if (campoActual == id_inputMonth) nextInput = id_inputYear;
                    else if (campoActual == id_inputYear) nextInput = id_inputDni;

                    setTimeout(function () {
                        document.getElementById(nextInput).focus();
                    }, 10);
                }
            }
        }
    };

    campoDNI.onkeyup = function () {
        self.saltoInput(this);
    };

    campoDia.onkeyup = function () {
        self.saltoInput(this);
    };

    campoMes.onkeyup = function () {
        self.saltoInput(this);
    };

    campoAnho.onkeyup = function () {
        self.saltoInput(this);
    };

};

module.exports = AutoFocus;
var validateFormLogin = {
    debug: false,
    errorClass: 'form-error',
    errorElement: 'em',
    errorPlacement: function(error, element) {

        $("#errors" ).text( error.text() ) ;
    },
    highlight: function(element, errorClass, validClass) {
        if ( $(element).attr('type') === 'checkbox') {
          $(element).parent().addClass(errorClass).removeClass(validClass);
        }
        else {
          $(element).parent().addClass(errorClass).removeClass(validClass);
        }
    },
    unhighlight: function(element, errorClass, validClass) {
        if ( $(element).attr('type') === 'checkbox' ) {
          $(element).parent().removeClass(errorClass).addClass(validClass);
        } else{
          $(element).parent().removeClass(errorClass).addClass(validClass);
        }
    },
    ignore: ':disabled',
    invalidHandler: function(form, validator) {
      var errors = validator.numberOfInvalids();

      if (errors) {
          if ( $(validator.errorList[0].element).attr('id') == 'birth_date' ) {
              $('#year_born').focus();
          }
          else {
              validator.errorList[0].element.focus();
          }
      }
    },
    messages: {
        day_born: {
            required: 'Ingrese un día válido',
            range: 'Ingrese un día válido',
            rangelength: 'El día debe tener dos dígitos'
        },
        month_born: {
            required: 'Ingrese un mes válido',
            range: 'Ingrese un mes válido',
            rangelength: 'El mes debe tener dos dígitos'
        },
        year_born: {
          required: 'Ingrese un año válido',
          rangelength: 'Ingrese un año válido'
        },
        birth_date: {
            required: 'Campo requerido',
            check_exist: 'La fecha debe existir',
            check_age: 'Debes ser mayor de edad',
            no_mummy: 'Fecha de nacimiento inválida',
            valid_date: 'La fecha es incorrecta'
        },
        dni: {
            required: 'Ingresa un DNI correcto',
            digits: 'Ingresa un DNI correcto',
            rangelength: 'Ingresa un DNI correcto'
        }
    },
    rules: {
        day_born: {
            required: true,
            range: [1,31],
            rangelength: [2, 2]
        },
        month_born: {
            required: true,
            range: [1,12],
            rangelength: [2, 2]
        },
        year_born: {
          required: true,
          rangelength: [4, 4]
        },
        birth_date: {
          required: true,
          check_exist: true,
          check_age: true,
          no_mummy: true,
          valid_date: true
        },
        dni: {
          required: true,
          digits: true,
          rangelength: [8, 8]
        }
    }
};

module.exports = validateFormLogin;
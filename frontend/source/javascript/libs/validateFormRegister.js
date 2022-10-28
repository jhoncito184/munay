var validateFormRegister = {
    debug: false,
    errorClass: 'form-error',
    errorElement: 'em',
    errorPlacement: function(error, element) {

        $("#errors" ).text( error.text() );
    },
    highlight: function(element, errorClass, validClass) {
        if ( $(element).attr('type') === 'checkbox' ) {
            $(element).parent().addClass(errorClass).removeClass(validClass);
        } else {
            $(element).parent().addClass(errorClass).removeClass(validClass);
        }
    },
    unhighlight: function(element, errorClass, validClass) {
        if ( $(element).attr('type') === 'checkbox') {
            $(element).parent().removeClass(errorClass).addClass(validClass);
        } else{
            $(element).parent().removeClass(errorClass).addClass(validClass);
        }
    },
    ignore: ':disabled',
    invalidHandler: function(form, validator) {
        var errors = validator.numberOfInvalids();
        if (errors) {
            if ( $(validator.errorList[0].element).attr('id') == 'birth_date' )  {
                $('#birth_day').focus();
            } else {
                validator.errorList[0].element.focus();
            }
        }
    },
    messages: {
        dni: {
          required: 'Campo requerido',
          minlength: 'Campo inválido',
          nowspace_names: 'Campo inválido'
        },
        day_born: {
          required: 'Campo requerido',
          minlength: 'Campo inválido',
          nowspace_names: 'Campo inválido'
        },
        month_born: {
          required: 'Campo requerido',
          minlength: 'Campo inválido',
          nowspace_names: 'Campo inválido'
        },
        year_born: {
          required: 'Campo requerido',
          minlength: 'Campo inválido',
          nowspace_names: 'Campo inválido'
        },
        name: {
            required: 'Campo requerido',
            minlength: 'Campo inválido',
            nowspace_names: 'Campo inválido'
        },
        lastname_father: {
            required: 'Campo requerido',
            minlength: 'Campo inválido',
            nowspace_names: 'Campo inválido'
        },
        lastname_mother: {
            required: 'Campo requerido',
            minlength: 'Campo inválido',
            nowspace_names: 'Campo inválido'
        },
        email: {
          required: 'Campo requerido',
          email: 'Campo inválido'
        },
        department: {
          required: 'Campo requerido',
        },
        province: {
          required: 'Campo requerido',
        },
        district: {
          required: 'Campo requerido',
        },
        mobile: {
            required: 'Campo requerido',
            digits: 'Campo inválido',
            rangelength: 'Campo inválido'
        },
        terms: {
          required: 'Campo requerido'
        }
    },

    rules: {
        dni: {
          required: true,
          digits: true,
          rangelength: [8, 8]
        },
        day_born: {
          required: true,
          digits: true,
          rangelength: [2, 2]
        },
        month_born: {
          required: true,
          digits: true,
          rangelength: [2, 2]
        },
        year_born: {
          required: true,
          digits: true,
          rangelength: [4, 4]
        },
        name: {
          required: true,
          minlength: 2,
          nowspace_names: true
        },
        lastname_father: {
          required: true,
          minlength: 2,
          nowspace_names: true
        },
        lastname_mother: {
          required: true,
          minlength: 2,
          nowspace_names: true
        },
        mobile: {
          required: true,
          digits: true,
          rangelength: [9, 9]
        },
        email: {
          required: true,
          validEmail: true
        },
        department: {
          required: true,
        },
        province: {
          required: true,
        },
        district: {
          required: true,
        },
        terms: {
          required: true
        }
    }
};

module.exports = validateFormRegister;
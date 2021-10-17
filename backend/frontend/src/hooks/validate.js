export default function validateField(name,value) {

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    let errors = {}

    if ( name == 'email') {
        const email = validateEmail(value);
        if (!email) {
            errors.mes = "Введите правльный адресс email";
            errors.error = true;
        } 
        else{
            errors.mes = "";
            errors.error = false;
        }
    }
    else {
        if (!value || value == '') {
            errors.mes = "Введите пароль";
            errors.error = true;
        }
        else if (value.length < 6) {
            errors.mes = "Пароль должен быть больше 6 ти символов";
            errors.error = true;
        }
        else{
            errors.mes = '';
            errors.error = false;
        }
    }
    

    return errors
}
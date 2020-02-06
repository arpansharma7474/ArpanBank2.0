import config from '../Utils/config';
import { log } from './Logger';

export const ValidateLogin = (email, password) => {
    const obj = {};
    return new Promise(function (resolve, reject) {
        if (isEmpty(email)) {
            obj.email = config.strings.error_empty_email;
        } else if (!obj.email && !config.strings.regExEmail.test(email.trim())) {
            obj.email = config.strings.error_invalid_email;
        }
        if (isEmpty(password)) {
            obj.password = config.strings.error_empty_password;
        } else if (!obj.password && password.startsWith(' ')) {
            obj.password = config.strings.error_password_startspace;
        } else if (!obj.password && password.endsWith(' '))
            obj.password = config.strings.error_password_endspace;
        if (Object.keys(obj).length != 0) reject({ validationMessage: obj });
        else {
            resolve('Login Successfull');
        }
    });
};

const isEmpty = str => {
    return str.length == 0;
};
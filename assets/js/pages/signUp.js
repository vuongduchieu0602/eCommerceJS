const btnSignUp = document.querySelector('.btn-signup');

const inputAllSelector = document.querySelectorAll('.form-group input');
const messageErrorAll = document.querySelectorAll('.error_message');

const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

function handleSignUp(event) {
    event.preventDefault();
    let isFormValid = true;

    for(let i = 0; i < inputAllSelector.length; i++) {
        let inputSelector = inputAllSelector[i];
        let valueInputSelector = inputSelector.value;
        let errorSelector = inputSelector.closest('.form-group').querySelector('.error_message');
        let name = inputSelector.name;

        if(name === 'name') {
            requireValidate(inputSelector, name);
        } else if(name === 'email') {
            let requiredValidateResult = requireValidate(inputSelector, name);
            let minLengthValidateResult;
            let regexEmailValidateResult;


            if(requiredValidateResult) {
                minLengthValidateResult = minLengthValidate(inputSelector, name);
            }

            if(requiredValidateResult && minLengthValidateResult) {
                regexEmailValidateResult = regexEmailValidate(inputSelector, name);
            };

            if(requiredValidateResult && minLengthValidateResult && regexEmailValidateResult) {
                successValidate(inputSelector, errorSelector)
            }
        } else if(name === 'password') {
            let requiredValidateResult = requireValidate(inputSelector, name);
            let minLengthValidateResult;

            if(requiredValidateResult) {
                minLengthValidateResult = minLengthValidate(inputSelector, name, 'Password cần nhiều hơn 8 kí tự');
            }

            if(requiredValidateResult && minLengthValidateResult) {
                successValidate(inputSelector, errorSelector)
            }
        } else if(name === 'confirm_password') {
            let requiredValidateResult = requireValidate(inputSelector, name);
            let minLengthValidateResult;
            let compareValidateResult;

            if(requiredValidateResult) {
                minLengthValidateResult = minLengthValidate(inputSelector, name, 'Comfirm password cần nhiều hơn 8 kí tự');
            }

            if(requiredValidateResult && minLengthValidateResult) {
                compareValidateResult = compareValidate(inputSelector, name);
            }

            if(requiredValidateResult && minLengthValidateResult && compareValidateResult) {
                successValidate(inputSelector, errorSelector)
            }
        } else {
            successValidate(inputSelector, errorSelector)
        }
    }

    for(let i = 0; i < messageErrorAll.length; i++) {
        let errorMessage = messageErrorAll[i];
        if(errorMessage.textContent !== '') {
            isFormValid = false;
        }
    }

    if(isFormValid) {
        console.log('go to Login');
    }
}

function requireValidate(inputSelector, name, message) {
    let isValid = true;
    let valueInputSelector = inputSelector.value;
    let errorSelector = inputSelector.closest('.form-group').querySelector('.error_message');

    if(valueInputSelector === '') {
        isValid = false;
        inputSelector.classList.add('error');
        let messageError = `${name} không được để trống`;
        if(message) {
            messageError = message;
        }
        errorSelector.textContent = messageError; 
    } else {
        successValidate(inputSelector, errorSelector)
    }
    return isValid;
}

function successValidate(inputSelector, errorSelector) {
    inputSelector.classList.remove('error');
    errorSelector.textContent = '';
}


function minLengthValidate(inputSelector, name, message) {
    let isValid = true;
    let minLength = inputSelector.getAttribute('minLength'); 
    let valueInputSelector = inputSelector.value;
    let errorSelector = inputSelector.closest('.form-group').querySelector('.error_message');

    if(valueInputSelector.length < minLength) {
        isValid = false;
        inputSelector.classList.add('error');
        let messageError = `${name} tối thiểu ${minLength} kí tự`;
        if(message) {
            messageError = message;
        }
        errorSelector.textContent = messageError;
    } else {
        errorSelector.textContent = ''
    }
    return isValid;
}

function regexEmailValidate (inputSelector, name, message) {
    let isValid = true;
    let resultRegexEmail = regexEmail.test(inputSelector.value);
    let errorSelector = inputSelector.closest('.form-group').querySelector('.error_message');

    if(!resultRegexEmail) {
        isValid = false;
        inputSelector.classList.add('error');
        let messageError = `${name} không đúng định dạng`;
        if(message) {
            errorSelector = message;
        }
        errorSelector.textContent = messageError;
    } else {
        inputSelector.classList.remove('error');
        errorSelector.textContent = ''
    }
    return isValid;
}

function compareValidate (inputSelector, name, message) {
    let isValid = true;
    let errorSelector = inputSelector.closest('.form-group').querySelector('.error_message');
    let comparedAttribute =  inputSelector.getAttribute('selector_compared');
    let comparedClass = document.querySelector('.' + comparedAttribute);
    let comparedValue = comparedClass.value;

    if(comparedValue !== inputSelector.value) {
        isValid = false;
        inputSelector.classList.add('error');
        let messageError = `${name} không trùng với ${comparedAttribute}`;
        if(message) {
            errorSelector = message;
        }
        errorSelector.textContent = messageError;
    }

    return isValid;
}

btnSignUp.addEventListener('click', handleSignUp);
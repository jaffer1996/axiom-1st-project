const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.classList.add('invalid');
    const small = formControl.querySelector('small');
    small.innerHTML = message; 
}

const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.classList.add('success');
}

function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( re.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, 'Email not valid')
    }
}

const checkrequired = (inputarray) => {
    inputarray.forEach(element => {
        if (element.value === ''){
            showError (element,`${nameformat(element)} is required`)
        }
        else {
            showSuccess(element);
        }
    });
} 

const checklength = (input, min, max) => {
    if (input.value.length < min) {
        showError(input, 'not enough characters')
    } else if (input.value.length > max){
        showError(input, 'too many characters')
    } else {
        showSuccess(input)
    }
}

const checkpasswordmatch = (input1, input2) => {
    if (input1.value !== input2.value ) {
        showError (input2, 'passwords do not match')
    } else {
        showSuccess (input2)
    }
}

const nameformat = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    checkrequired([username,email,password,password2]);
    checklength(username,3,10);
    checklength(password,6,30);
    checkEmail(email);
    checkpasswordmatch(password,password2);
})
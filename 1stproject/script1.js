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

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

password.addEventListener('change', (e) => {
    if(e.target.value.length <= 5){
        showError(password, 'Password is too weak');
        console.log(e.target.value);
    } else {
        showSuccess(password);
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if(username.value === ''){
        showError(username, 'Username is required');
    } else {
        showSuccess(username);
    }

    if(email.value === ''){
        showError(email, 'Email is required');
    } else if(!validateEmail(email.value)) {
        showError(email, 'Email is invalid');
    } 
    else {
        showSuccess(email);
    }

    if(password.value.length <= 5){
        passwordchecker(password, 'Password is too weak');
    } else {
        showSuccess(password);
    }

    if(password.value === ''){
        showError(password, 'Please confirm Password');
    } else if (password.value.length <= 5  ){
        passwordchecker(password, 'Password is too weak');
    } else {
        showSuccess(password);
    }

    if(password2.value === ''){
        showError(password2, 'Please confirm Password');
    } else {
        showSuccess(password2);
    }
})
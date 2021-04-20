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

const passwordchecker = (input, message) => {
    const formControl = input.parentElement;
    formControl.classList.add('invalid');
    const small = formControl.querySelector('small');
    small.innerHTML = message;
    console.log(input.value)
}

password.addEventListener('change', (e) => {
    if(e.target.value <= 5){
        passwordchecker(password, 'Password is too weak');
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
    } else {
        showSuccess(email);
    }

    if(password.value.length <= 5){
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
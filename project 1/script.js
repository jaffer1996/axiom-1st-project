const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

let showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.classList.add('invalid');
    const small = formControl.querySelector('small');
    small.innerHTML = message; 
}

let showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.classList.add('success');
}

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

    if(password.value === ''){
        showError(password, 'Password is required');
    } else {
        showSuccess(password);
    }

    if(password2.value === ''){
        showError(password2, 'Please confirm Password');
    } else {
        showSuccess(password2);
    }
})
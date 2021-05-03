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

const nameformat = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    checkrequired([username,email,password,password2]);

})
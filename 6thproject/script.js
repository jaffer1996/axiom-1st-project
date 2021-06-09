const closebtn = document.getElementById('close');
const togglebtn = document.getElementById('toggle');
const openbtn = document.getElementById('open');
const modal = document.getElementById('modal');

togglebtn.addEventListener('click',() => {
    document.body.classList.toggle('show-nav');
})

openbtn.addEventListener('click',() => {
    modal.classList.add('show-modal');
})

closebtn.addEventListener('click',() => {
    modal.classList.remove('show-modal');
})

window.addEventListener('click', e => {
    e.target === modal ? modal.classList.remove('show-modal') : false;
})


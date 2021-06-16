const logo = document.getElementById('logo');
const contactlist = document.getElementById('contactlist')

logo.addEventListener('mouseover', () => {
    document.body.classList.add('show-contact');
})

contactlist.addEventListener('mouseleave', () => {
    document.body.classList.remove('show-contact');
})

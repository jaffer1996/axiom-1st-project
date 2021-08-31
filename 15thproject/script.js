const form = document.getElementById('form');
const search = document.getElementById('search');
const resultscontainer = document.getElementById('resultscontainer');
const pagination = document.getElementById('pagination');
const alert = document.getElementById('alert')

const api = 'https://api.lyrics.ovh';

// async function searchsongs(searchtext) {
//     const res = await fetch(`${api}/suggest/${searchtext}`)
//     const data = await res.json();

//     console.log(data);
// }

form.addEventListener('submit', e => {
    e.preventDefault();

    const searchtext = search.value.trim();

    if (searchtext) {
        // searchsongs(searchtext);
    } else {
        alert.classList.add('show');
        setTimeout(() => {
            alert.classList.remove('show');   
        }, 1000);
    }

})
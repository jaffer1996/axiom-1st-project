const filter = document.getElementById('filter');
const timelinecontainer = document.getElementById('timeline-container');
const loader = document.getElementById('loader');

let limit = 10;
let page = 1;

async function getData () {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();

    return data;
}

async function updateDOM () {
    const posts = await getData();
    
    posts.forEach( post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        postDiv.innerHTML = `
            <div class="post-id">${post.id}</div>
            
            <div class="post-content">
                <h3 class="post-title">${post.title}</h3>

                <p class="post-body">${post.body}</p>
            </div>
        `;

        timelinecontainer.appendChild(postDiv);

    })
}

function filterPosts (e) {
    const filterText = e.target.value.toLowerCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach( post => {
        const title = post.querySelector('.post-title').innerText;
        const body = post.querySelector('.post-body').innerText;

        if ( title.indexOf(filterText) >= 0 || body.indexOf(filterText) >= 0 ) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    })

}

updateDOM();

window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    console.log(scrollTop, scrollHeight, clientHeight);

    if ( scrollTop + clientHeight == scrollHeight) {
        loader.classList.add('show');
        page++;
        updateDOM();
    } else {
        loader.classList.remove('show');
    }
})

filter.addEventListener('input', filterPosts);

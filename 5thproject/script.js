const main = document.getElementById('main');
const adduserbtn = document.getElementById('add-user');
const doublemoneybtn = document.getElementById('double');
const filterbtn = document.getElementById('filter');
const sortbtn = document.getElementById('sort');
const sumbtn = document.getElementById('sum');

let data = [];

async function getrandomuser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    
    const user = data.results[0];

    const newuser = {
        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
        balance: Math.floor(Math.random()*1000000)
    }

    adduser(newuser);
}

const adduser = (newuser) => {
    data.push(newuser);
    updateDOM();
}

const formatnumbertocurrency = (number) => {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

const doublemoney = () => {
    data = data.map(user => {
        return { ...user, balance: user.balance*2 }
    })

    updateDOM();
}

const filter = () => {
    data = data.filter(user => user.balance >= 1000000);

    updateDOM();
}

const sortbywealth = () => {
    data = data.sort(( a , b ) => (a.balance > b.balance ? -1 : 1));

    updateDOM();
}

const addallwealth = () => {
    const total = data.reduce((acc, user) => (acc += user.balance), 0);

    const totalbalancediv = document.createElement('div');
    totalbalancediv.innerHTML = `<h3>Total balance: ${formatnumbertocurrency(total)} </h3>`;
    main.appendChild(totalbalancediv);
}

const updateDOM = (userdata = data) => {
    main.innerHTML = '<h2><strong>User</strong> Wealth </h2>';
    userdata.forEach(user => {
       const userdiv = document.createElement('div');
       userdiv.classList.add('user');
       userdiv.innerHTML = `<strong>${user.name}</strong> ${formatnumbertocurrency(user.balance)}`;
       main.appendChild(userdiv);
    });
    console.log(data);
}

adduserbtn.addEventListener('click', getrandomuser)

doublemoneybtn.addEventListener('click', doublemoney)

filterbtn.addEventListener('click', filter)

sortbtn.addEventListener('click', sortbywealth)

sumbtn.addEventListener('click', addallwealth)
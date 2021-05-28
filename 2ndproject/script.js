const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieselect = document.getElementById('movie');

populateUI();

let ticketprice = +movieselect.value;

const Updateselectedcount = () => {
    const selectedseats = document.querySelectorAll('.row .seat.selected');
    const seatindex = [...selectedseats].map(seat => [...seats].indexOf(seat));
    console.log(seatindex);
    const selectedseatscount = selectedseats.length;
    count.innerText = selectedseatscount;
    total.innerText = selectedseatscount * ticketprice;
    localStorage.setItem('selectedseats', JSON.stringify(seatindex));
}

const setmoviedata = (movieindex, ticketprice) => {
    localStorage.setItem('selectedmovieindex', movieindex);
    localStorage.setItem('selectedmovieticketprice', ticketprice);
}

function populateUI() {
    const selectedseats = JSON.parse(localStorage.getItem('selectedseats'));
    if (selectedseats !== null && selectedseats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedseats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }
    const selectedmovieindex = localStorage.getItem('selectedmovieindex');
    if (selectedmovieindex !== null) {
        movieselect.selectedIndex = selectedmovieindex;
    }
}


container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        Updateselectedcount();
    }
})

movieselect.addEventListener('change', e => {
    ticketprice = +e.target.value;
    setmoviedata(e.target.selectedIndex, e.target.value);
    Updateselectedcount();
})

Updateselectedcount();
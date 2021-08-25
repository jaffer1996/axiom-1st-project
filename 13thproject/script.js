const addcardbtn = document.getElementById("add-card");
const removecardsbtn = document.getElementById("remove-cards");
const cardscontainer = document.getElementById("cards-container");
const prevbtn = document.getElementById("prev-btn");
const currentcard = document.getElementById("current-card");
const nextbtn = document.getElementById("next-btn");
const cancelbtn = document.getElementById("cancel-btn");
const questioninput = document.getElementById("question");
const answerinput = document.getElementById("answer");
const addcardsubmitbtn = document.getElementById("add-card-btn");
const addcardcontainer = document.getElementById("add-card-container");

let currentcardID = 0;

const cards = [];

const cardsData = getcardsdata();

// const cardsData = [
//     {
//         question: 'what is React ?',
//         answer: 'React is a free and open-source front-end JavaScript library for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.'
//     },
//     {
//         question: 'what is HTML ?',
//         answer: 'The HyperText Markup Language, or HTML is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript.'    
//     },
//     {
//         question: 'what is MongoDB ?',
//         answer: 'MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License.'    
//     },
//     {
//         question: 'what is Node ?',
//         answer: 'Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.'    
//     },
//     {
//         question: 'what is Django ?',
//         answer: 'Django is a Python-based free and open-source web framework that follows the model–template–views architectural pattern. It is maintained by the Django Software Foundation, an American independent organization established as a 501 non-profit.'    
//     }
// ]

function SavecardData(cardsData) {
    localStorage.setItem('cards', JSON.stringify(cardsData));
    window.location.reload();
}

function getcardsdata() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards; 
}

function generatecards () {
    cardsData.forEach(( data , index ) => generatecard(data, index) );
}

function updatecurrentcard() {
    currentcard.innerText = `${currentcardID + 1} / ${cards.length}`;
}

function generatecard (data, index) {
    const card = document.createElement('div');
    
    card.classList.add('card');

    if ( index === 0 ) {
        card.classList.add('active');
    }

    card.innerHTML = `
        <div class="inside-card">

            <div class="card-front">
                <p>${data.question}</p>
            </div>

            <div class="card-back">
                <p>${data.answer}</p>
            </div>

        </div>
    `

    card.addEventListener('click', () => card.classList.toggle('show-answer'));

    cards.push(card);

    cardscontainer.appendChild(card);

    updatecurrentcard();
}

generatecards();

nextbtn.addEventListener('click', () => {
    cards[currentcardID].className = 'card left';

    currentcardID++;

    if (currentcardID > cards.length - 1) {
        currentcardID = 0;
    }

    cards[currentcardID].className = 'card active';

    updatecurrentcard();
})

prevbtn.addEventListener('click', () => {
    cards[currentcardID].className = 'card right';

    currentcardID--;

    if (currentcardID < 0) {
        currentcardID = cards.length - 1;
    }

    cards[currentcardID].className = 'card active';

    updatecurrentcard();
})

addcardbtn.addEventListener('click', () => addcardcontainer.classList.add('active'));

cancelbtn.addEventListener('click', () => addcardcontainer.classList.remove('active'));

addcardsubmitbtn.addEventListener('click', () => {
    const question = questioninput.value;
    const answer = answerinput.value;

    if (question.trim() && answer.trim()) {
        const nextcardData = { question, answer };
        
        generatecard(nextcardData);

        questioninput.value = '';
        answerinput.value = '';

        addcardcontainer.classList.remove('active');

        cardsData.push(nextcardData);

        SavecardData(cardsData);
    }
})

removecardsbtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
});
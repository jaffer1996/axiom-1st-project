const word = document.getElementById('word');
const definitioncontainer = document.getElementById('definition');
const incorrectletters = document.getElementById('incorrect-letters');
const playbtn = document.getElementById('playbutton');
const popupcontainer = document.getElementById('popup-container');
const finalmessage = document.getElementById('final-message');
const notificationcontainer = document.getElementById('notification-container');
const figureparts = document.querySelectorAll('.figure-part');

let selectedword;
let definition;

function randomwordgetter() {
    fetch('https://random-words-api.vercel.app/word',{
    method : "GET",
    })
    .then(res => res.json())
    .then(data => {
        selectedword = data[0].word.toLowerCase();
        definition = data[0].definition;
        displayword();
    });
}

randomwordgetter();

const correctlettersarray = [];
const incorrectlettersarray = [];

function displayword() {
      word.innerHTML = `
        ${selectedword
            .split('')
            .map(letter => `
                <span class="letter">
                    ${correctlettersarray.includes(letter) ? letter : ""}
                </span>
            `     
            )  
            .join('')
        }
      `;

      definitioncontainer.innerText = `Definition: ${definition}`; 

      const innerword = word.innerText.replace(/\n/g , '')

      if (innerword === selectedword) {
          finalmessage.innerText = 'Congratulations !!! You won the Game';
          popupcontainer.style.display = 'flex';
      }

};

function shownotification () {
    notificationcontainer.classList.add('show');
    setTimeout(() => {
        notificationcontainer.classList.remove('show');
    }, 2000);
}

function updateincorrectletters () {
    incorrectletters.innerHTML = `
        ${incorrectlettersarray.length > 0 ? '<p>Incorrect letters</p>' : ''}
        ${incorrectlettersarray.map(letter => `<span>${letter}</span>`)}
    `;

    figureparts.forEach((part, index) => {
        const errors = incorrectlettersarray.length; 

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    })

    if (incorrectlettersarray.length === 6) {
        finalmessage.innerHTML = `Game Lost !!!  correct word was "${selectedword}" <br> <br> click below to try again `;
        popupcontainer.style.display = 'flex';
    }

    if (incorrectlettersarray.length === 5) {
        notificationcontainer.innerText = "Last Try !!! be careful with the next letter";

        setTimeout(() => {
            notificationcontainer.innerText = "This letter has already been guessed, please try another One";
        }, 2500);

        shownotification();
    }

}

window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90){ 
        const letter = e.key; 
        if (selectedword.includes(letter)) {
            if(!correctlettersarray.includes(letter)) {
                    correctlettersarray.push(letter)
                    displayword();
                }else {
                    shownotification();
                }
            }else {
                if(!incorrectlettersarray.includes(letter)){
                    incorrectlettersarray.push(letter);
                    updateincorrectletters();
                } else {
                    shownotification();
                }
            }
        }
    }
)

playbtn.addEventListener('click', () => {
    correctlettersarray.splice(0);
    incorrectlettersarray.splice(0);

    randomwordgetter();

    updateincorrectletters();
    
    popupcontainer.style.display = 'none';

    displayword();
})



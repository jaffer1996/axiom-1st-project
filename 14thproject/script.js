const main = document.getElementById('main');
const togglebtn = document.getElementById('toggle');
const customtextcontainer = document.getElementById('custom-text');
const closebtn = document.getElementById('close-btn');
const selectvoices = document.getElementById('voices');
const customtext = document.getElementById('text');
const readbtn = document.getElementById('read');

const data = [
    {
        image: './img/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
    },
    {
        image: './img/food.jpg',
        text: "I'm Hungry"
    },
    {
        image: './img/grandma.jpg',
        text: "I Miss Grandma"
    },
    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: './img/home.jpg',
        text: "I want to go home"
    },
    {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        image: './img/outside.jpg',
        text: "I like the outdoors"
    },
    {
        image: './img/sad.jpg',
        text: "I don't like being sad"
    },
    {
        image: './img/scared.jpg',
        text: "I'm scary"
    },
    {
        image: './img/school.jpg',
        text: "Long time since I went to school"
    },
    {
        image: './img/tired.jpg',
        text: "I'm so tired"
    },
];

data.forEach(createBox);

function createBox(imageobj) {
    const { image, text } = imageobj;
    const box = document.createElement('div');
    box.classList.add('box');
    box.innerHTML = `
        <img src='${image}' alt='${text}' />
        <p class='imagetext'> ${text} </p>
    `

    box.addEventListener('click', () => {
        setmessage(text);
        speakmessage();
    })

    main.appendChild(box);
}

const message = new SpeechSynthesisUtterance();

function setmessage(text) {
    message.text = text;
}

function speakmessage() {
    speechSynthesis.speak(message);
}

function populateVoiceList() {
    if(typeof speechSynthesis === 'undefined') {
      return;
    }

    var voices = speechSynthesis.getVoices();
  
    for(var i = 0; i < voices.length; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
  
      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }
  
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      selectvoices.appendChild(option);
    }
}
  
populateVoiceList();

if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
speechSynthesis.onvoiceschanged = populateVoiceList;
}

togglebtn.addEventListener('click', () => customtextcontainer.classList.toggle('show'));

closebtn.addEventListener('click', () => customtextcontainer.classList.remove('show'));

speechSynthesis.addEventListener('voiceschanged', populateVoiceList);

// selectvoices.addEventListener('change', (e) => {
    
//     message.voice = e.target.value;

// })

readbtn.addEventListener('click', () => {
    setmessage(customtext.value);
    speakmessage();
})
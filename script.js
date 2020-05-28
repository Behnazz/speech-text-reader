const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textArea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    img: './img/drink.jpg',
    text: "I'm thirsty",
  }, 
  {
    img: './img/food.jpg',
    text: "I'm hungry",
  },
  {
    img: './img/tired.jpg',
    text: "I'm tired",
  },
  {
    img: './img/hurt.jpg',
    text: "I'm hurt",
  },
  {
    img: './img/happy.jpg',
    text: "I'm happy",
  },
  {
    img: './img/angry.jpg',
    text: "I'm angry",
  },
  {
    img: './img/sad.jpg',
    text: "I'm sad",
  },
  {
    img: './img/scared.jpg',
    text: "I'm scared",
  },
  {
    img: './img/outside.jpg',
    text: "I want to go outside",
  },
  {
    img: './img/home.jpg',
    text: "I want to go home",
  },
  {
    img: './img/school.jpg',
    text: "I want to go to school",
  },
  {
    img: './img/grandma.jpg',
    text: "I want to go to grandmas",
  },
];

//create box for each image
const createBox = (item) => {
  const box = document.createElement('div');
  const { img, text } = item;
  box.classList.add('box');
  box.innerHTML = `
  <img src="${img}" alt= "${text}"/>
  <p class="info">${text}</p>
  `;

  //speech event
  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();
    //add active effect
    box.classList.add('active');
    setTimeout(() => {
      box.classList.remove('active')
    }, 800);
  });
  main.appendChild(box);
};
data.forEach(createBox);

//init speech synth.
const message = new SpeechSynthesisUtterance();

//store the voices
let voices = [];
const getVoices = () => {
  voices = speechSynthesis.getVoices();
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
};

//set the text
const setTextMessage = (text) => {
  message.text = text;
};

//speak the text 
const speakText = () => {
  speechSynthesis.speak(message);
};

//change voice
const setVoice = (e) => {
  message.voice = voices.find(voice => voice.name === e.target.value);
};

//voices change
speechSynthesis.addEventListener('voiceschanged', getVoices);

//toggle text box event listener
toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

//close button event listener
closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

//change voice event listener
voicesSelect.addEventListener('change', setVoice);

//read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textArea.value);
  speakText();

});

getVoices();
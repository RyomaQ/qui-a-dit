const p = document.querySelector("#lyrics");
const answer = document.querySelectorAll(".answer");
const randomNumber3 = Math.floor(Math.random() * answer.length);
const pointsCount = document.querySelector("#points");
const resetPoints = document.querySelector("#reset");
const quizBox = document.querySelector("#quiz-box");

const songList = [
  {titre : "Au DD" , artist : "PNL"},
  {titre : "Le piège" , artist : "Alpha Wann"},
  {titre : "Pitbull" , artist : "Booba"},
  {titre : "Amour" , artist : "Deen Burbigo"},
  {titre : "A7" , artist : "SCH"},
  {titre : "Mauvaise graine" , artist : "Nekfeu "},
  {titre : "Spleen" , artist : "Dinos"},
  {titre : "Placebo" , artist : "Dinos"},
  {titre : "Temps mort" , artist : "Booba"},
  {titre : "60 année" , artist : "Damso"},
  {titre : "Feu de bois" , artist : "Damso"},
  {titre : "Carré bleu" , artist : "Disiz"},
  {titre : "La Boulette" , artist : "Diam's"},
  {titre : "Pour que tu m'aimes encore" , artist : "Céline Dion"},
  {titre : "Alexandri Alexandra" , artist : "Claude François"},
  {titre : "Une Jolie Fleur" , artist : "George Brassens"},
  {titre : "Ella, elle l'a" , artist : "France Gall"},   
]
  
// Shuffle the copied array using the Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(songList);

innerHTML = fetch("http://localhost:3000/");

for(i=0; i<answer.length; i++){
    answer[i].innerHTML = songList[i].artist;
    songList.splice(i, 1);
    console.log(songList);
}

fetch("http://localhost:3000/")
  .then((response) => response.json())
  .then((result) => {
    answer[randomNumber3].innerHTML = result.artist;
    let phrases = result.data.split("\n");
    phrases = phrases.filter((item) => !item.startsWith("[") && !item == "");
    const randomNumber = Math.floor(Math.random() * (phrases.length - 2));
    console.log(randomNumber);
    let selectedPhrases = "";
    for (let i = randomNumber; i < randomNumber + 3; i++) {
      selectedPhrases += phrases[i] + "\n";
    }
    p.innerHTML = selectedPhrases.replace(/\n/g, "<br>");
  })


// Score, buttons


if (!localStorage.getItem("question")) {
  localStorage.setItem("question", 0);
}
let question = parseInt(localStorage.getItem("question"));

if (!localStorage.getItem("points")) {
  localStorage.setItem("points", 0);
}
let points = parseInt(localStorage.getItem("points"));
pointsCount.innerHTML = points;

console.log(points + " / " + question);

// Add event listeners to all buttons
for (let i = 0; i < answer.length; i++) {
  // Skip the answer element at index randomNumber3
  if (i === randomNumber3) {
    continue;
  }

  answer[i].onclick = function () {
    answer[i].style.backgroundColor = "red";
    answer[i].style.color = "white";
    answer[i].style.border = "none";
    answer[randomNumber3].style.backgroundColor = "green";
    answer[randomNumber3].style.color = "white";
    answer[randomNumber3].style.border = "none";
    question++;
    localStorage.setItem("question", question);
    setTimeout(() => {
        if (question > 4) {
            quizBox.style.display = "none";
            pointsCount.style.fontSize = "8rem";
            return;
          }
      }, 800);
    setTimeout(function () {
      location.reload();
    }, 1000);
  };
}

// Add event listener to answer[randomNumber3]
answer[randomNumber3].onclick = function () {
  answer[randomNumber3].style.backgroundColor = "green";
  answer[randomNumber3].style.color = "white";
  answer[randomNumber3].style.border = "none";
  points++;
  question++;
  localStorage.setItem("question", question);
  localStorage.setItem("points", points);
  pointsCount.innerHTML = points;
  setTimeout(() => {
    if (question > 4) {
        quizBox.style.display = "none";
        pointsCount.style.fontSize = "8rem";
        return;
      }
  }, 800);
  setTimeout(function () {
    location.reload();
  }, 1000);
};

function resetScore() {
  question = 0;
  points = 0;
  localStorage.setItem("question", question);
  localStorage.setItem("points", points);
  pointsCount.innerHTML = points;
}

reset.onclick = function () {
  resetScore();
  location.reload();
};

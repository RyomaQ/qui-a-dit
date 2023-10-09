var express = require("express");
var router = express.Router();

exports.getLyrics = require("../lib/getLyrics");
exports.getAlbumArt = require("../lib/getAlbumArt");
exports.getSong = require("../lib/getSong");
exports.searchSong = require("../lib/searchSong");
exports.getSongById = require("../lib/getSongById");

const { getLyrics, getSong } = require("genius-lyrics-api");

let options = {
  apiKey: "Ok-8KtmtmQKX79dcDK4DbOrC3oMZAIUsl6974Bw7F0ayvS6sZ8lOTpy0vSnx9j9V",
  title: "",
  artist: "",
  optimizeQuery: true,
};

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

const randomNumber2 = Math.floor(Math.random() * 4);

// console.log(songList[randomNumber2].titre);

options.title = songList[randomNumber2].titre;
options.artist = songList[randomNumber2].artist;

/* GET home page. */
// router.get("/", function (req, res, next) {
//   getLyrics(options).then((lyrics) => {
//     res.json({ data: lyrics });

//   })
// });

router.get("/", function (req, res, next) {
  const rdmSong = getRandomSong();
  getLyrics(rdmSong).then((lyrics) => {
    res.json({ artist: options.artist, data: lyrics});
  });
});

module.exports = router;

function getRandomSong() {
  const randomNumber = Math.floor(Math.random() * songList.length);
  options.title = songList[randomNumber].titre;
  options.artist = songList[randomNumber].artist;
  return options;
}


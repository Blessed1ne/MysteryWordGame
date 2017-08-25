const express = require("express")
const app = express()
const mustache = require("mustache-express")
const bodyParser = require("body-parser")
const url = require("url")
const session = require("express-session")
const expressValidator = require("express-validator")

const words = require("./words")
//go to the word.js file find the function randomWord and pull a word at random
const randomWord = words.randomWord


app.engine("mustache", mustache())
app.set("view engine", "mustache")
app.use(expressValidator())
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))

var sess = {
  secret: "hangman",
  cookie: {},
  saveUninitialized: true,
  resave: true
}

app.use(session(sess))
//Instalation of node packages ends here


//Below begins the function's that will determine how the game operates
//We will begin by creating an empty array for letters gussed
//and we will add stipulations to count how many times a user can guess

let lettersGuessed = []
let guessCount = 0
//This function will determine how many chances a user has to guess
//It will all be determined by the length of the random word they have to guess
function guessChange() {
  if (randomWord.length <= 9) {
    guessCount = 8
  } else if
    (randomWord.length <= 13)
    guessCount = 12
   else {
    guessCount = 16
   }
}

guessChange()

//This part gets information. This function area directs where the gussed word
//goes to. It defines our blank spaces and the ".split" is used to split
//a string into an array of substrings, and returns the new array.
app.get("/", function(req, res) {
  let blanks = randomWord.split('')
  let blankSpace = false
  for (var i = 0; i < randomWord.length; i++) {
    if (lettersGuessed.indexOf(randomWord[i]) >= 0) {
      blanks[i] = randomWord[i]
    } else {
      blanks[i] = "_"
      blankSpace = true
    }
  }
  if (!blankSpace) {
    res.redirect("/win")
  } else {
    res.render("index", {
      lettersGuessed: lettersGuessed,
      blanks: blanks,
      randomWord: randomWord,
      guessCount: guessCount,
    })
  }
})

app.get("/lost", function(req, res) {
  res.render('lost', {});
});

app.get("/win", function(req, res) {
  res.render('win', {});
});

app.post('/', function (req, res, next) {
  lettersGuessed.push(req.body.letter)
    guessCount = guessCount - 1
    if (guessCount === 0) {
    res.redirect("/lost")
  }
  res.redirect('/')
})


app.listen('3000', function() {
  console.log("The robots are listening")
});

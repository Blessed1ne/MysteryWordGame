const fs = require("fs")
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

const randomWord = words[Math.floor(Math.random() * words.length)]



module.exports = {
  randomWord: randomWord
}

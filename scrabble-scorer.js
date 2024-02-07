// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  0: [" "],
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
        score += Number(pointValue);
        break;
      }
    }
  }
  // return letterPoints;
  return score;
}

function scrabbleScorer(word) {
  word = word.toLowerCase();
  score = 0;

  for (letter of word) {
    score += newPointStructure[letter];
  }
  return score;
}

function simpleScorer(word) {
  word = word.toUpperCase();
  let score = word.length;
  return score;
}

function vowelBonusScorer(word) {
  word = word.toUpperCase();
  let score = 0;
  for (letter of word) {
    if (
      letter === "A" ||
      letter === "E" ||
      letter === "I" ||
      letter === "O" ||
      letter === "U"
    ) {
      score += 3; //vowel score
    } else {
      score += 1; //consonant score
    }
  }
  return score;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  inputWord = input.question(`Let's play some Scrabble!
  
Enter a word to score: `);

  for (i = 0; i < inputWord.length; i++) {
    // let test = inputWord.charCodeAt(i);
    // console.log(inputWord[i]);
    // console.log(inputWord.charCodeAt(i));
    if (
      (inputWord.charCodeAt(i) >= 65 && inputWord.charCodeAt(i) <= 90) || //only accepts English letters...will have to learn how to check any letter
      (inputWord.charCodeAt(i) >= 97 && inputWord.charCodeAt(i) <= 122)
      // (inputWord.charCodeAt(i) >= 97 && inputWord.charCodeAt(i) <= 122) ||
      // inputWord.charCodeAt(i) === 32
    ) {
      // console.log(`Hello I'm in the right range ${inputWord[i]}`);
    } else {
      console.log(
        `${inputWord[i]} invalid input..'no spaces'...Please try again`
      );
      initialPrompt();
    }
  }
  return;
}

easyScorer = {
  name: "Simple Score",
  description: "Each Letter is worth 1 point.",
  // scorerFunction() {return (score = simpleScorer(inputWord));},
  scorerFunction: () => {
    return (score = simpleScorer(inputWord));
  },
};

vowelBonus = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  // scorerFunction() {return (score = vowelBonusScorer(inputWord));},
  scorerFunction: () => {
    return (score = vowelBonusScorer(inputWord));
  },
};

scrabbleScorerNew = {
  name: "Scrabble",
  description: "The traditional scoring algorithm",
  // scorerFunction() {return (score = scrabbleScorer(inputWord));},
  scorerFunction: () => {
    return (score = scrabbleScorer(inputWord));
  },
};

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point. ",
    scorerFunction: simpleScorer,
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt. ",
    scorerFunction: vowelBonusScorer,
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm. ",
    scorerFunction: scrabbleScorer,
  },
];

const scoringAlgorithms2 = [easyScorer, vowelBonus, scrabbleScorerNew];

function scorerPrompt(word) {
  let ans = 0;
  let score = 0;
  console.log(`Which scoring algorithm would you like to use? 

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system`);
  do {
    ans = input.question(`Enter 0, 1 or 2: `);
    if (Number(ans) >= 0 && Number(ans) <= 2) {
      score = scoringAlgorithms2[ans].scorerFunction();
    } else {
      console.log(`'${ans}' - Invalid input...Please try again`);
    }
  } while (score === 0);
  console.log(`Score for '${inputWord}': '${score}'`);
}

function transform(choices) {
  let newValues = {};
  let newKeyValue = "";

  for (item in choices) {
    for (let i = 0; i <= choices[item].length - 1; i++) {
      newKeyValue = choices[item][i].toLowerCase();
      newValues[newKeyValue] = Number(item); //add the letter to temp array New Values that's returned to newPointStructure
      newKeyValue = "";
    }
  }
  // console.log(newValues);
  return newValues;
}
let newPointStructure = transform(oldPointStructure);
// console.log(newPointStructure)

let inputWord = "";

function runProgram() {
  initialPrompt();
  scorerPrompt();
}

module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};

String.prototype.replaceAt = function (index, replacement) {
  index = Number.parseInt(index);
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}; //the replaceAt function extends the JavaScript String prototype to replace a substring at a specific index with a given replacement string.

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
} //The sleep function causes a synchronous delay, pausing code execution for the specified number of milliseconds.

const fruits = [
  "raspberry", "pumpkin", "plum", "kiwi", "guava", "coconut", "apple", "watermelon",
  "orange", "pear", "cherry", "strawberry", "grape", "mango", "blueberry", "pomegranate",
  "plum", "banana", "papaya", "kiwi", "pineapple", "apricot", "grapefruit", "melon",
  "avocado", "peach", "blackberry", "mulberry", "kumquat", "date",
]; //The given code defines an array called fruits, which contains a list of various fruit names.

let randNum = Math.floor(Math.random() * 30);
let randFruit = fruits[randNum]; 
//This code generates a random integer between 0 and 29 (inclusive) and then selects a fruit from the fruits array using that random number as an index, assigning the chosen fruit to the variable randFruit.

let mysteryWord = randFruit;
let mw = "";
for (let index = 0; index < randFruit.length; index++) {
  mw += "*";
}
mysteryWord = mw;
//The code initializes a "mysteryWord" variable with a random fruit name from the "fruits" array, and then replaces the fruit name with a string of asterisks of the same length, creating a "mystery" word.

let tries = 5; //default tries are 5 which will be decremented by one after every wrong guess
let guess; //it contains the character guessed by the user

let guessedChar = []; //every guessed character is stored in this array whether it is right or wrong to prevent duplicate attempts
let firstGuess = false; //for not checking the guessedChar array only for the first time

let str1 = "Guess This Fruit"; 
let str2 = "The Fruit Was";
//strings to be displayed on the page

let alertMsgOnCorrect = "Correct Guess! Nicely Done.";
let alertMsgOnWrong = "Wrong Guess! Try Again.";
let alertMsgOnGuessed = "You Already Guessed This Character! Please Guess Another.";
//alert messages shown after every attempt

let displayTries = "Tries Left: " + tries;
//to display tries left which is updated when its shown

let colorRed = "red";
let colorGreen = "green";
let colorblue = "blue";
let fontSize8 = "8px";
//colors which will be used ro change the color of text of alert messages

function sentMessage(message, className) {
  let DivEle = document.getElementById("myDiv");
  let para = document.createElement("p");
  para.innerHTML = message;
  para.classList.add(className);
  DivEle.appendChild(para);
  document.querySelector("#myDiv > form").classList.add("d-none");
} //The sentMessage function appends a new paragraph element containing a given message with a specified class to an HTML div element with the ID "myDiv," and also hides a form element within the same div.

function displayVariable(message, id) {
  let myVariable = message;
  let variableDisplayElement = document.getElementById(id);
  variableDisplayElement.textContent = myVariable;
} //The displayVariable function assigns a message to a variable and updates the text content of an HTML element with a specified ID to display that variable's value.

function displayVariableWithColor(message, id, colorName, fontSize) {
  let myVariable = message;
  let variableDisplayElement = document.getElementById(id);
  variableDisplayElement.textContent = myVariable;
  variableDisplayElement.style.color = colorName;
  variableDisplayElement.style.fontSize = fontSize;
} //works same as above function but also updates its color and font-size 

let label1 = "label1";
let label2 = "label2";
let label3 = "tries";
let label4 = "alertMessage";
//labels which contains IDs of the HTML tags

displayVariable(str1, label1);
displayVariable(mysteryWord, label2);
displayVariable(displayTries, label3);
//these functions will display the given string on the page 

function checkKeyPress(event) {
  //this fuction will be called every time any key is pressed
  if (event.keyCode === 13) {
    //key code 13 represents enter key and this if statement will be true when enter key is pressed

    event.preventDefault(); //event.preventDefault() is a method that prevents the default behavior of an event from occurring.
    
    guess = document.getElementById("guess").value; //this will give the guessed character by user to guess variable

    let correctGuess = false; //its false because no guess has been correct (till yet)

    let guessRepeated = false; // it'll become true if guess is repeated

    if (firstGuess == true) {
      for (let i = 0; i < guessedChar.length; i++) {
        if (guessedChar[i] == guess) {
          displayVariableWithColor(alertMsgOnGuessed, label4, colorblue, fontSize8);
          guessRepeated = true;
        }
      }
    } //this will only run after first guess dispite of correct or false 

    if (guessRepeated == true) {
      document.getElementById("guess").value = "";
      guess = "";
      return null;
    } // this will make the input field empty and the guess variable empty

    guessedChar.push(guess); //pushes the guessed character in the array to prevent duplicacy

    firstGuess = true; //it'll help to check the duplicacy after first attempt

    for (let i = 0; i < randFruit.length; i++) {
      if (randFruit[i] == guess) {
        mysteryWord = mysteryWord.replaceAt(i, guess);
        correctGuess = true;
      }
    } //The code iterates through the characters of a randomly chosen fruit (randFruit) and updates a "mystery word" (mysteryWord) by replacing matching characters with the guessed character (guess).

    if (correctGuess == true) {
      //it'll be true after every correct guess
      if (mysteryWord == randFruit) {
        //it'll check if user guessed the word?
        displayVariable(str2, label1);
        sentMessage("You Win!", "text-success");
      } //this will show you msg that you have won

      displayVariable(mysteryWord, label2);
      displayVariable(displayTries, label3);
      displayVariableWithColor(alertMsgOnCorrect, label4, colorGreen, fontSize8);
      document.getElementById("guess").value = "";
      guess = "";
      return null;
    }

    if (correctGuess == false) {
      //if guessed character is false then this conditional statement will be followed
      displayVariable(str1, label1);
      displayVariable(mysteryWord, label2);
      displayVariableWithColor(alertMsgOnWrong, label4, colorRed, fontSize8);

      tries--;
      displayTries = "Tries Left: " + tries;
      displayVariable(displayTries, label3);
      document.getElementById("guess").value = "";
      guess = "";
    } // this will show you an alert message, decrement the tries and update them to be shown on page

    if (tries == 0) {
      displayVariable(str2, label1);
      displayVariable(randFruit, label2);
      sentMessage("You Lose!", "text-danger");
    } // you'll lose when tries will be 0

  }
}

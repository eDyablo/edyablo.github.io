function say(message) {
  let element = document.createElement('p');
  element.innerText = message;
  document.body.appendChild(element);
  element.scrollIntoView();
}

function claim(message) {
  let element = document.createElement('h2');
  element.innerText = message;
  document.body.appendChild(element);
  element.scrollIntoView();
}

function yell(message) {
  let element = document.createElement('h1');
  element.innerText = message;
  document.body.appendChild(element);
  element.scrollIntoView();
}

function announceLevel(level) {
  let element = document.createElement('p');
  element.id = 'level';
  element.style.color = 'blueviolet';
  element.innerText = 'Level ' + level;
  document.body.appendChild(element);
  element.scrollIntoView();
}

async function ask(message) {
  let dialog = new Promise(function(resolve, reject) {
    let dialogFrame = document.createElement('div');
    dialogFrame.innerHTML = '<p>' + message + '</p>';
    
    let input = document.createElement('input');
    input.type = 'text';
    input.onchange = function(event) {
      document.body.removeChild(dialogFrame);
      resolve(event.target.value);
    };
    dialogFrame.appendChild(input);
    document.body.appendChild(dialogFrame);
    dialogFrame.scrollIntoView();
    input.focus();
  });
  return await dialog;
}

async function confirm(message) {
  let dialog = new Promise(function(resolve, reject) {
    let dialogFrame = document.createElement('div');
    let creditsDisplay = document.createElement('div');
    creditsDisplay.innerText = credits;
    dialogFrame.appendChild(creditsDisplay);
    function endDialog(answer) {
      clearInterval(tickerId);
      document.body.removeChild(dialogFrame);
      resolve(answer);
    }
    let ticker = function() {
      credits -= tickerStep;
      creditsDisplay.innerText = credits;
      if (credits <= 0) {
        endDialog(null);
      }
    }
    let tickerId = setInterval(ticker, tickerInterval);
    let messageDisplay = document.createElement('p');
    messageDisplay.innerText = message;
    dialogFrame.appendChild(messageDisplay);
    let yesButton = document.createElement('button');
    yesButton.innerText = 'Yes';
    yesButton.onclick = function(event) {
      endDialog(true);
    }
    let noButton = document.createElement('button');
    noButton.innerText = 'No';
    noButton.onclick = function(event) {
      endDialog(false);
    }
    dialogFrame.appendChild(yesButton);
    dialogFrame.appendChild(noButton);
    yesButton.focus();
    document.body.appendChild(dialogFrame);
    dialogFrame.scrollIntoView();
  });
  return await dialog;
}

async function choose(message, choices) {
  let dialog = new Promise(function(resolve, reject) {
    let dialogFrame = document.createElement('div');
    dialogFrame.style.display = 'inline-block';
    let creditsDisplay = document.createElement('div');
    creditsDisplay.innerText = credits;
    dialogFrame.appendChild(creditsDisplay);
    function endDialog(answer) {
      clearInterval(tickerId);
      document.body.removeChild(dialogFrame);
      resolve(answer);
    }
    let ticker = function() {
      credits -= tickerStep;
      creditsDisplay.innerText = credits;
      if (credits <= 0) {
        endDialog(null)
      }
    }
    let tickerId = setInterval(ticker, tickerInterval);
    let messageDisplay = document.createElement('p');
    messageDisplay.innerText = message;
    dialogFrame.appendChild(messageDisplay);
    let choicesList = document.createElement('ul');
    choicesList.style.listStyleType = 'none';
    choicesList.style.paddingLeft = 0;
    choicesList.style.listStyle = 'none';
    choicesList.style.display = 'inline=block';
    dialogFrame.appendChild(choicesList);
    for (var i = 0; i < choices.length; i++) {
      let choiceLine = document.createElement('li');
      choiceLine.innerText = choices[i];
      choiceLine.id = i + 1;
      choiceLine.style.lineHeight = '2';
      choiceLine.onmouseover = function(event) {
        event.target.style.fontWeight = 'bold';
        event.target.style.fontSize = '120%';
      }
      choiceLine.onmouseout = function(event) {
        event.target.style.fontWeight = 'normal';
        event.target.style.fontSize = '100%';
      }
      choiceLine.onclick = function(event) {
        endDialog(event.target.id);
      }
      choicesList.appendChild(choiceLine);
    }
    document.body.appendChild(dialogFrame);
    dialogFrame.scrollIntoView();
  });
  return await dialog;
}

function right(message) {
  say(message);
  if (playerName == 'Joker') {
    credits *= 2;
  }
  return true;
}

function wrong(message) {
  say(message);
  return false;
}

async function nameYourself() {
  let name = await ask('Enter your name');
  if (name == 'Dart Wader') {
    document.bgColor = 'black';
    document.fgColor = 'white';
    credits = 1000;
  }
  if (name == 'Luke Skywalker') {
    document.bgColor = 'lightblue';
    claim('I am your father, Luke');
    credits = 50;
  }
  if (name == 'Yoda') {
    document.bgColor = 'lightgreen';
    claim('Train yourself to let go of everything you fear to lose');
    tickerInterval = 2000;
  }
  if (name == 'Deadpool') {
    document.bgColor = 'darkred';
    credits = 1;
    tickerInterval = 1000 * 60 * 60 * 24;
  }
  if (name == 'Joker') {
    document.bgColor = 'purple';
    document.fgColor = 'darkgray';
    credits = 1;
    tickerInterval = 1000 * 60 * 60 * 24;
  }
  if (name == 'Scrooge McDuck') {
    document.bgColor = 'gold';
    credits = 100;
    tickerStep = -1;
    tickerInterval = 100;
  }
  say('Nice to meet you, ' + name);
  return name;
}

async function howOldAreYou() {
  let age = await ask('Enter your age');
  if (age) {
    say('Your age is ' + age);
    if (age < 10) {
      return wrong('You are too young');
    }
    if (age > 100) {
      return wrong('You are too old');
    }
    else if (age >= 10 && age <= 100) {
      return right('You can pass');
    }
  }
  else {
      return false;
  }
}

async function canWeMoveForward() {
  let moveForward = await confirm('Can we move forward?');
  if (moveForward == false) {
    return wrong('You decided to stop playing. Good bye!');
  }
  else {
    if (playerName == 'Luke Skywalker')
      credits += 50;
    return right('Wow! Lets move on!');
  }
}

async function javaScriptAndJava() {
  let answer = await confirm('JavaScript is some kind of Java?');
  if (answer == false) {
    return right('You are right! JavaScript is completelly different language');
  }
  else {
    return wrong('Wrong. It has nothing to do with Java');
  }
}

async function unSupportedType() {
  let answer = await choose('What data type is not supported by JavaScript?',
    ['numerical',
    'textual',
    'graphical',
    'object']);
  if (answer) {
    if (answer != 3) {
      return wrong('Nope! JavaScript knows the type');
    }
    else {
      return right('Well done! Keep it up');
    }
  }
  else {
      return false;
  }
}

async function howToWriteThings() {
  let answer = await choose('How would you write "hello" to the document?',
    ['alert("hello")',
    'document.say("hello")',
    'document.write("hello")',
    'document("hello")']);
  if (answer) {
    if (answer == 3) {
      return right('Super! You know how to write things');
    }
    else {
      return wrong('Unfortunately it is not a correct way to say hello to the document');
    }
  }
  else {
    return false;
  }
}

async function logicalExpression() {
  let answer = await choose('What the expression A <= B means?',
    ['A is less then B',
    'A is not equal to B',
    'Move B to A',
    'B is not less then A']);
  if (answer) {
    if (answer == 4) {
      return right('Fantastic! It is hard to confuse you');
    }
    else {
      return wrong('Oops! The expression means something else');
    }
  }
  else {
    return false;
  }
}

async function ecma() {
  let answer = await choose('JavaScript is known as ECMAScript. What ECMA means?',
    ['Electronic Components and Maintenance Applications',
    'Electronic Components of Microsoft and Apple',
    'European Computer Maintainers Association',
    'European Computer Manufacturers Association']);
  if (answer) {
    if (answer == 4) {
      return right('Unbelivable! You know more then others');
    }
    else {
      return wrong('It was a hard question and you are failed');
    }
  }
  else {
    return false;
  }
}

async function notANumber() {
  let answer = await choose('What Nan means?',
    ['Number and name',
    'Not a number',
    'Not a name',
    'Never ask noone']);
  if (answer) {
    if (answer == 2) {
      return right('Your have exceptional knowledge');
    }
    else {
      return wrong('You were close');
    }
  }
  else {
    return false;
  }
}

async function yourTeacher() {
  let answer = await ask("What is your teacher's name?");
  if (answer) {
    return right('' + answer + ' taught you very well');
  }
  else {
    return false;
  }
}

async function howToStartJavaScript() {
  let answer = await choose('How can we start or include JavaScript?',
    ['language tag',
    'none of above',
    'script tag',
    'javascript tag']);
  if (answer == 3) {
    return right('Right. You know how to start javascript');
  }
  else {
    return wrong('Nope. You have to review javascript basics');
  }
}

async function caseSensitivity() {
  let answer = await choose('Is JavaScript case sensitive?',
    ['True', 'False']);
  if (answer == 1) {
    return right('Sure. It is case sensitive');
  }
  else {
    return wrong('Please remember that JavaScript is case sensitive');
  }
}

async function mathCeil() {
  let rightAnswer = Math.ceil(-45.95);
  let answer = await choose('var value = Math.ceil(-45.95)',
    [rightAnswer - 1,
    rightAnswer,
    rightAnswer + 1]);
  if (answer == 2) {
    return right('Excelent! You know basic math functions');
  }
  else {
    return wrong('Unfortunately it is wrong. We recomend you to learn basic math functions')
  }
}

async function lengthOfThisString() {
  let answer = await choose('Which of the following is the correct way of returning the length of this string?',
    ["'string',length",
    "string,length",
    "string.length",
    "'string'.length"]);
  if (answer == 4) {
    return right('Perfect! It looks like you know how to deal with strings');
  }
  else {
    return wrong('Wrong answer. Be careful next time');
  }
}

async function commentTheText() {
  let answer = await choose('Which of the following will correctly comment the text?',
    ['// "the text" //',
    '/ "the text" /',
    '*/ "the text" /*',
    '\\\\ "the text" \\\\']);
  if (answer == 1) {
    return right('Nice. It is a useful to know how to comment things in your code');
  }
  else {
    return wrong("Sorry, but you don't know how to use comments");
  }
}

async function logToConsole() {
  let answer = await choose('Which of the following is the correct way to log a statement to the console?',
    ['consolelog("Hello world")',
    'console.log("Hello world")',
    'console.log{"Hello world"}',
    'consolelog("Hello world")']);
  if (answer == 2) {
    return right('Great job. Logging is a good tool and you know how to use it');
  }
  else {
    return wrong("Failure. Logging is a good tool, you have to know it");
  }
}

async function notAComparator() {
  let answer = await choose('Which of the following is <b>not</b> a comparator operation in JavaScript?',
    ['<',
    '<==',
    '!==',
    '===',
    '>']);
  if (answer == 2) {
    return right('Very good. You are good at the comparison operations');
  }
  else {
    return wrong("You didn't recognize wrong comparator operation");
  }
}

async function whatFollowsIfExpression() {
  let answer = await choose('What follows after the expression in an <b>if</b> statement?',
    ['a colon',
    'curly braces',
    'square brackets',
    'brackets']);
  if (answer == 2) {
    return right('Very nice. The if statement is known to you');
  }
  else {
    return wrong("It can't follow after the expression in an if statment");
  }
}

async function whatRetunsFalse() {
  let answer = await choose('Which of the following statements returns false?',
    ["'myName'.length > 2",
    '3 * 4 < 15',
    '4 / 2 == 2',
    "'inputColor'.length < 4"]);
  if (answer == 4) {
    return right('Good shot. You are very good at logical expressions');
  }
  else {
    return wrong("The answer is wrong. The statement returns true");
  }
}

async function whatReturnsValueOfTwo() {
  let answer = await choose('Which statement returns the value of 2?',
    ['7 + 3 / 5',
    "'hi'.length - 1 * 2",
    "(3 + 1) / 'hi'.length",
    '4 + (4 / 8)']);
  if (answer == 3) {
    return right('You are right again! You did calculations very good');
  }
  else {
    return wrong("I did wrong calculations");
  }
}

async function whatBestDescribesVariables() {
  let answer = await choose('What best describes the variables in JavaScript?',
    ['To allow the user to change language settings',
    "To allow the user to change a value's data type",
    'To allow the user to save and call values',
    'To allow the user to declare a new data type']);
  if (answer == 3) {
    return right('Perfect choice. The main purpose of variables is to store values');
  }
  else {
    return wrong("Wrong choice. You have to review a main purpose of variables");
  }
}

async function wayToDeclareVariable() {
  let answer = await choose('Which of the following is the correct way to declare a variable?',
    ['variable myName',
    'Var myName',
    'vary myName',
    'var myName']);
  if (answer == 4) {
    return right('Perfect match. You are good to go');
  }
  else {
    return wrong("Nice try. But it's wrong");
  }
}

var playerName;
var credits = 100;
var tickerInterval = 1000;
var tickerStep = 1;

async function game() {
  let levels = [
    javaScriptAndJava,
    howToStartJavaScript,
    caseSensitivity,
    howToWriteThings,
    lengthOfThisString,
    commentTheText,
    wayToDeclareVariable,
    whatFollowsIfExpression,
    canWeMoveForward,
    whatBestDescribesVariables,
    logToConsole,
    mathCeil,
    unSupportedType,
    notAComparator,
    logicalExpression,
    whatRetunsFalse,
    whatReturnsValueOfTwo,
    ecma,
    notANumber,
    yourTeacher
  ];

  document.body.style.textAlign = 'center';

  yell('The Quiz');

  playerName = await nameYourself();

  var pass = false;
  var index;
  for (index = 0; index < levels.length; index++) {
    var level = levels[index];
    announceLevel(index + 1);
    pass = await level();
    if (pass == false)
      break;
  }

  if (pass) {
    document.bgColor = 'darkseagreen';
    document.fgColor = 'black';
    yell('You win!');
    claim('Your score is ' + credits + ' points');
  }
  else {
    document.bgColor = 'lightcoral';
    document.fgColor = 'black';
    yell('Game over');
    say('You passed ' + index + ' level(s)');
    say('You have ' + credits + ' points left');
  }
}

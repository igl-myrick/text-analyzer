// utility logic

function isEmpty() {
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
    if (arguments[i].trim().length === 0) {
      return true;
    }
  }
  return false; 
}

// business logic

function wordCounter(text) {
  if (isEmpty(text)) {
    return 0;
  }
  let wordCount = 0;
  const textArray = text.split(" ");
  textArray.forEach(function(element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (isEmpty(word)) {
    return 0;
  }
  const textArray = text.split(" ");
  let wordCount = 0;
  textArray.forEach(function(element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

function filterOffensiveWords(text) {
  const filterArray = ["zoinks", "muppeteer", "biffaroni", "loopdaloop"];
  const inputArray = text.toLowerCase().split(" ");
  inputArray.forEach(function(element, index) {
    if (filterArray.includes(element)) {
      inputArray.splice(index, 1);
    }
  });
  return inputArray.join(" ");
};

function firstInstanceOfWord(word, text) {
  const textArray = text.split(" ");
  for (let i = 0; i < textArray.length; i++) {
    console.log(i);
    if (word === textArray[i]) {
      return i;
    }
  }
  return -1;
}

// ui logic

function handleFormSubmission(event) {
  event.preventDefault();
  const passage = document.getElementById("text-passage").value;
  const word = document.getElementById("word").value;
  const wordCount = wordCounter(passage);
  const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
  document.getElementById("total-count").innerText = wordCount;
  document.getElementById("selected-count").innerText = occurrencesOfWord;
  let boldedPassage = boldPassage(word, passage);
  if (boldedPassage) {
    document.querySelector("div#bolded-passage").append(boldedPassage)
  } else {
    document.querySelector("div#bolded-passage").innerText = null;
  }
  countCommonWords(passage);
  let firstInstance = firstInstanceOfWord(word, passage)
  if (word) {
    let p = document.createElement("p");
    p.append("Your word appears " + (firstInstance + 1) + " words into the text.");
    let wordCountDiv = document.getElementById("common-word-count");
    wordCountDiv.append(p);
  }
}

window.addEventListener("load", function() {
  document.querySelector("form#word-counter").addEventListener("submit", handleFormSubmission);
});

function boldPassage(word, text) {
  if (isEmpty(word, text)) {
    return null;
  }
  const p = document.createElement("p");
  let textArray = text.split(" ");
  textArray.forEach(function(element, index) {
    if (word === element) {
      const bold = document.createElement("strong");
      bold.append(element);
      p.append(bold);
    } else {
      p.append(element);
    }
    if (index !== (textArray.length - 1)) {
      p.append(" ");
    }
  });
  return p;
}

function countCommonWords(text) {
  if (isEmpty(text)) {
    return null;
  }
  const textArray = text.toLowerCase().split(" ").sort();
  let wordCount = 1;
  let counterArray = [];
  textArray.forEach(function(element, index) {
    if (element === textArray[index + 1]) {
      wordCount++;
    } else {
      counterArray.push(element + "; " + wordCount);
      wordCount = 1;
    }
  })
  counterArray.sort(function(string1, string2) {
    let string1Array = string1.split(" ");
    let string2Array = string2.split(" ");
    let a = parseInt(string1Array[1]);
    let b = parseInt(string2Array[1]);
    return b - a;
  })
  let ul = document.createElement("ul");
  counterArray.forEach(function(element) {
    let li = document.createElement("li");
    li.append(element);
    ul.append(li);
  })
  document.querySelector("div#common-word-count").append(ul);
}
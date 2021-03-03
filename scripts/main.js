Split(["#one", "#two", "#three"]);
var threeSplit = Split(["#top", "#mid", "#bot"], {direction: "vertical"});

// default newsletter onload
var news = new Newsletter();
var art1 = new Article();
var art2 = new Article();
var art3 = new Article();
var art4 = new Article();
var art5 = new Article();
art1.title = "Welcome to Henry!";
art2.title = "Click titles to switch between articles.";
art3.title = "Drag and drop to reorder articles.";
art4.title = "Remember to export the newsletter JSON before leaving!";
art5.title = "Have fun :)";
news.add(art1);
news.add(art2);
news.add(art3);
news.add(art4);
news.add(art5);

var theNewsletter = news;
var theArticleId = 0;

// do we actually need this function? sequential search
function findArticleById(theId) {
  for (var i = 0; i < theNewsletter.articleOrder.length; i++) {
    if (theNewsletter.articles[i].id === Number(theId)) {
      return i;
    }
  }
  return -1;
}

// list out all the articles
function listArticles() {
  listBox = document.getElementById("articles-list");
  listBox.innerHTML = "";
  for (var i = 0; i < theNewsletter.articleOrder.length; i++) {
    articleP = document.createElement("p");

    theArticle = theNewsletter.articles[findArticleById(theNewsletter.articleOrder[i])];
    articleP.id = theArticle.id;
    articleP.appendChild(document.createTextNode((i + 1) + ". " + theArticle.title));

    articleP.addEventListener("click", function (event){
      theArticleId = event.target.id;
      console.log(theArticleId);
      fillFields();
    });

    listBox.appendChild(articleP);
  }
}

// populate article input fields and title
function fillFields() {
  theArticle = theNewsletter.articles[findArticleById(theArticleId)];
  document.getElementById("title").value = theArticle.title;
  document.getElementById("article-link").value = theArticle.articleLink;
  document.getElementById("byline").value = theArticle.byline;
  document.getElementById("content-preview").value = theArticle.contentPreview;
  document.getElementById("thumbnail-caption").value = theArticle.thumbnailCaption;
  document.getElementById("thumbnail-link").value = theArticle.thumbnailLink;
  document.getElementById("thumbnail-credit").value = theArticle.thumbnailCredit;
  document.getElementById("article-id").innerHTML = theArticleId;

  document.getElementById("now-editing").innerHTML = "Now editing: <b>" + theArticle.title + "</b> in <b>" + theNewsletter.yyyymmdd() + "</b>";

  document.getElementById("email-preview").value = theNewsletter.emailPreview;
  document.getElementById("email-intro").value = theNewsletter.intro;
  document.getElementById("errata").value = theNewsletter.errata;

  if (isUrl(theArticle.thumbnailLink)) {
    document.getElementById("image-preview-box").style.display = "block";
    document.getElementById("image-preview").src = theArticle.thumbnailLink;
    document.getElementById("invalid-thumbnail").classList.add("hidden");
  } else {
    document.getElementById("image-preview-box").style.display = "none";
    if (theArticle.thumbnailLink !== "") {
      document.getElementById("invalid-thumbnail").classList.remove("hidden");
    } else {
      document.getElementById("invalid-thumbnail").classList.add("hidden");
    }
  }
  if (isUrl(theArticle.articleLink)) {
    document.getElementById("invalid-link").classList.add("hidden");
  } else if (theArticle.articleLink !== "") {
    document.getElementById("invalid-link").classList.remove("hidden");
  } else {
    document.getElementById("invalid-link").classList.add("hidden");
  }
}

// update newsletter fields
function updateNewsletter () {
  var articlePos = findArticleById(theArticleId);
  theNewsletter.articles[articlePos].title = document.getElementById("title").value;
  theNewsletter.articles[articlePos].articleLink = document.getElementById("article-link").value;
  theNewsletter.articles[articlePos].byline = document.getElementById("byline").value;
  theNewsletter.articles[articlePos].contentPreview = document.getElementById("content-preview").value;
  theNewsletter.articles[articlePos].thumbnailCaption = document.getElementById("thumbnail-caption").value;
  theNewsletter.articles[articlePos].thumbnailLink = document.getElementById("thumbnail-link").value;
  theNewsletter.articles[articlePos].thumbnailCredit = document.getElementById("thumbnail-credit").value;

  theNewsletter.emailPreview = document.getElementById("email-preview").value;
  theNewsletter.intro = document.getElementById("email-intro").value;
  theNewsletter.errata = document.getElementById("errata").value;

  fillAll();
}
document.getElementById("title").addEventListener("input", updateNewsletter);
document.getElementById("article-link").addEventListener("input", updateNewsletter);
document.getElementById("byline").addEventListener("input", updateNewsletter);
document.getElementById("content-preview").addEventListener("input", updateNewsletter);
document.getElementById("thumbnail-caption").addEventListener("input", updateNewsletter);
document.getElementById("thumbnail-link").addEventListener("input", updateNewsletter);
document.getElementById("thumbnail-credit").addEventListener("input", updateNewsletter);
document.getElementById("article-id").addEventListener("input", updateNewsletter);
document.getElementById("email-preview").addEventListener("input", updateNewsletter);
document.getElementById("email-intro").addEventListener("input", updateNewsletter);
document.getElementById("errata").addEventListener("input", updateNewsletter);

// update code box
function updateCode() {
  Rainbow.color(sanitize(theNewsletter.toMJML()), "html", function(highlightedCode) {
    document.getElementById("code-box").innerHTML = highlightedCode;
  });
}

// fill and update all the fields
function fillAll() {
  listArticles();
  fillFields();
  updateCode();
}

// add and delete articles
document.getElementById("add-button").addEventListener("click", function () {
  art = new Article();
  theNewsletter.add(art);
  fillAll();
});
document.getElementById("delete-button").addEventListener("click", function () {
  if (!confirm("Delete this article? This action cannot be undone.")) {
    return;
  }
  formerPos = theNewsletter.delete(Number(theArticleId));
  if (formerPos != 0) {
    theArticleId = theNewsletter.articleOrder[formerPos - 1]; // switch to the previous article, unless we are deleting the first article
  } else {
    theArticleId = theNewsletter.articleOrder[0];
  }
  fillAll();
});

document.getElementById("previous-button").addEventListener("click", function () {
  previousPos = theNewsletter.articleOrder.indexOf(Number(theArticleId)) - 1;
  if (previousPos >= 0) {
    theArticleId = theNewsletter.articleOrder[previousPos];
    fillFields();
  }
});
document.getElementById("next-button").addEventListener("click", function () {
  nextPos = theNewsletter.articleOrder.indexOf(Number(theArticleId)) + 1;
  if (nextPos < theNewsletter.articleOrder.length) {
    theArticleId = theNewsletter.articleOrder[nextPos];
    fillFields();
  }
});

// auto-fill articles
document.getElementById("auto-fill-button").addEventListener("click", async function() {
  var art = await scrape(document.getElementById("article-link").value);

  document.getElementById("title").value = art.title;
  document.getElementById("byline").value = art.byline;
  document.getElementById("content-preview").value = art.contentPreview;
  document.getElementById("thumbnail-caption").value = art.thumbnailCaption;
  document.getElementById("thumbnail-link").value = art.thumbnailLink;
  document.getElementById("thumbnail-credit").value = art.thumbnailCredit;

  document.getElementById("now-editing").innerHTML = "Now editing: <b>" + art.title + "</b> in <b>" + theNewsletter.yyyymmdd() + "</b>";

  if (isUrl(art.thumbnailLink)) {
    document.getElementById("image-preview-box").style.display = "block";
    document.getElementById("image-preview").src = art.thumbnailLink;
  } else {
    document.getElementById("image-preview-box").style.display = "none";
  }

  updateNewsletter();
  fillAll();
});

// export the json file
document.getElementById("export-button").addEventListener("click", function() {
  download(theNewsletter.yyyymmdd() + ".json", JSON.stringify(theNewsletter));
});
// using code from https://stackoverflow.com/questions/16215771/how-to-open-select-file-dialog-via-js
document.getElementById("open-button").addEventListener("click", function() {
  var input = document.createElement("input");
  input.type = "file";

  input.onchange = e => {
    // getting a hold of the file reference
    var file = e.target.files[0];
    // setting up the reader
    var reader = new FileReader();
    reader.readAsText(file,"UTF-8");
    // here we tell the reader what to do when it's done reading...
    reader.onload = readerEvent => {
      var content = readerEvent.target.result; // this is the content!
      theNewsletter = newsletterFromJSON(content);
      fillAll();
    };
  };
  input.click();
});

// copy mjml to clipboard
document.getElementById("copy-mjml-button").addEventListener("click", function() {
  const textArea = document.createElement("textarea");
  textArea.textContent = theNewsletter.toMJML();
  document.body.append(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.parentNode.removeChild(textArea);
});
// download mjml code
document.getElementById("download-mjml-button").addEventListener("click", function() {
  download(theNewsletter.yyyymmdd() + ".mjml", theNewsletter.toMJML());
});

document.getElementById("date-button").addEventListener("click", function() {
  var year, month, day;
  while (true) {
    year = prompt("Enter the year (yyyy):", "2020");
    if (year === null) {
      return;
    }
    if (!(isNaN(year) || Number(year) < 0)) {
      break;
    }
  }
  while (true) {
    month = prompt("Enter the month (mm):");
    if (month === null) {
      return;
    }
    if (!(isNaN(month) || Number(month) > 12 || Number(month) < 1)) {
      break;
    }
  }
  while (true) {
    day = prompt("Enter the day (dd):");
    if (day === null) {
      return;
    }
    if (!(isNaN(day) || Number(day) > 31 || Number(day) < 1)) {
      break;
    }
  }
  theNewsletter.date = new Date(Number(year), Number(month) - 1, Number(day));
  fillAll();
});

// new newsletter
document.getElementById("new-news-button").addEventListener("click", function() {
  if (!confirm("Create a new newsletter? Changes to the current newsletter will not be saved.")) {
    return;
  }
  theNewsletter = new Newsletter();
  document.getElementById("date-button").click();
  while (true) {
    numArticles = prompt("Number of articles:");
    if (numArticles === null) {
      return;
    }
    if (!(isNaN(numArticles) || Number(numArticles) < 0)) {
      break;
    }
  }
  for (var i = 0; i < numArticles; i++) {
    addArticle();
  }
});

// ask before leaving
window.onbeforeunload = function() {
  return "Changes you made may not be saved.";
};

// drag and drop to move articles
dragula([document.getElementById("articles-list")]).on("drop", function(el, target, source, sibling) {
  var newPosition;
  if (sibling != null) {
    sibPos = theNewsletter.articleOrder.indexOf(Number(sibling.id));
    myPos = theNewsletter.articleOrder.indexOf(Number(el.id));
    if (sibPos > myPos) {
      newPosition = sibPos - 1;
    } else {
      newPosition = sibPos;
    }
  } else {
    newPosition = theNewsletter.articleOrder.length - 1;
  }
  theNewsletter.move(Number(el.id), newPosition);
  fillAll();
});

// refresh the html preview
document.getElementById("refresh-html-button").addEventListener("click", async function () {
  var username = "0b94397d-c3de-4b1b-962b-8ff53b2083fe";
  var password = "d98bd758-f1f5-4749-83be-c9f816b590f9";
  let response = await fetch("https://cors.reeceyang.workers.dev/?https://api.mjml.io/v1/render", {
    method: "POST",
    headers: {
      "Authorization": "Basic " + btoa(username+":"+password)
    },
    body: JSON.stringify({mjml:theNewsletter.toMJML()})
  });

  let result = await response.json();
  document.getElementById("html-preview-box").innerHTML = result.html;
  Rainbow.color(sanitize(result.html), "html", function(highlightedCode) {
    document.getElementById("html-code-box").innerHTML = highlightedCode;
  });
});

// copy html preview
document.getElementById("copy-preview-button").addEventListener("click", () => {
  // from https://stackoverflow.com/questions/23934656/javascript-copy-rich-text-contents-to-clipboard
  function listener(e) {
    e.clipboardData.setData("text/html", document.getElementById("html-preview-box").innerHTML);
    e.preventDefault();
  }
  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);
});

// download html code
document.getElementById("download-html-button").addEventListener("click", function() {
  download("index.html", document.getElementById("html-preview-box").innerHTML);
});

// copy html code
document.getElementById("copy-html-button").addEventListener("click", function() {
  const textArea = document.createElement("textarea");
  textArea.textContent = document.getElementById("html-preview-box").innerHTML;
  document.body.append(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.parentNode.removeChild(textArea);
});

// resize the boxes correctly
function toggleThreeSplit() {
  var hiddenBoxes = [document.getElementById("html-preview-box").classList[0] === "hidden",
    document.getElementsByClassName("rainbow-show")[0].classList[1] === "hidden",
    document.getElementsByClassName("rainbow-show")[2].classList[1] === "hidden"];
  if (hiddenBoxes[0] === hiddenBoxes[1] && hiddenBoxes[1] === hiddenBoxes[2]) {
    threeSplit.setSizes([33, 33, 33]);
  } else if (hiddenBoxes.filter((k) => {return k === false;}).length === 1){
    // only one hidden
    threeSplit.setSizes([!hiddenBoxes[0] ? 90 : 10,
      !hiddenBoxes[1] ? 90 : 10,
      !hiddenBoxes[2] ? 90 : 10]);
  } else {
    // two hidden
    threeSplit.setSizes([!hiddenBoxes[0] ? 45 : 10,
      !hiddenBoxes[1] ? 45 : 10,
      !hiddenBoxes[2] ? 45 : 10]);
  }
}

// hide or show preview div
document.getElementById("show-preview-button").addEventListener("click", () => {
  document.getElementById("html-preview-box").classList.toggle("hidden");
  toggleThreeSplit();
  document.getElementById("show-preview-button").innerHTML = document.getElementById("show-preview-button").innerHTML === "Hide Preview" ? "Show Preview" : "Hide Preview";
});

// hide or show html code div
document.getElementById("show-html-button").addEventListener("click", () => {
  document.getElementsByClassName("rainbow-show")[0].classList.toggle("hidden");
  toggleThreeSplit();
  document.getElementById("show-html-button").innerHTML = document.getElementById("show-html-button").innerHTML === "Hide HTML Code" ? "Show HTML Code" : "Hide HTML Code";
});

// hide or show html code div
document.getElementById("show-mjml-button").addEventListener("click", () => {
  document.getElementsByClassName("rainbow-show")[2].classList.toggle("hidden");
  toggleThreeSplit();
  document.getElementById("show-mjml-button").innerHTML = document.getElementById("show-mjml-button").innerHTML === "Hide MJML Code" ? "Show MJML Code" : "Hide MJML Code";
});

// startup
fillAll();
setTimeout(() => {
  document.getElementById("show-html-button").click();
  document.getElementById("show-mjml-button").click();
}, 200);
// dark mode
darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

document.getElementById("dark-button").addEventListener("click", function() {
  document.body.classList.toggle("dark");
  if (darkMode) {
    document.getElementById("color-scheme").href = "styles/tomorrow-twilight.css";
  } else {
    document.getElementById("color-scheme").href = "styles/tomorrow-day.css";
  }
  darkMode = !darkMode;
});

if (darkMode) {
  document.getElementById("dark-button").click();
}

// move the main div down to adjust for tab size changing
function moveMain() {
  document.getElementById("main").style.marginTop = document.getElementsByClassName("tab")[0].offsetHeight + "px";
}
new ResizeObserver(moveMain).observe(document.getElementsByClassName("tab")[0]);
moveMain();

// hide or show email info div
document.getElementById("hide-button").addEventListener("click", () => {
  document.getElementById("email-info").classList.toggle("hidden");
  document.getElementById("hide-button").innerHTML = document.getElementById("hide-button").innerHTML === "Hide Intro/Preview/Errata" ? "Show Intro/Preview/Errata" : "Hide Intro/Preview/Errata";
});

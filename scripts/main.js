Split(['#one', '#two', '#three']);

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
    if (theNewsletter.articles[i].id == theId) {
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

    listBox.appendChild(articleP)
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
  } else {
    document.getElementById("image-preview-box").style.display = "none";
  }
}

// update newsletter fields
function updateNewsletter() {
  articlePos = findArticleById(theArticleId);
  theNewsletter.articles[articlePos].title = document.getElementById("title").value;
  theNewsletter.articles[articlePos].articleLink = document.getElementById("article-link").value;
  theNewsletter.articles[articlePos].byline = document.getElementById("byline").value;
  theNewsletter.articles[articlePos].contentPreview = document.getElementById("content-preview").value;
  theNewsletter.articles[articlePos].thumbnailCaption = document.getElementById("thumbnail-caption").value;
  theNewsletter.articles[articlePos].thumbnailLink = document.getElementById("thumbnail-link").value; console.log(document.getElementById("thumbnail-link").value);
  theNewsletter.articles[articlePos].thumbnailCredit = document.getElementById("thumbnail-credit").value;

  theNewsletter.emailPreview = document.getElementById("email-preview").value;
  theNewsletter.intro = document.getElementById("email-intro").value;
  theNewsletter.errata = document.getElementById("errata").value

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
  Rainbow.color(sanitize(theNewsletter.toMJML()), 'html', function(highlightedCode) {
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
function addArticle() {
  art = new Article();
  theNewsletter.add(art);
  fillAll();
}
document.getElementById("add-button").addEventListener("click", addArticle);

function deleteArticle() {
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
}
document.getElementById("delete-button").addEventListener("click", deleteArticle);

// export the json file
document.getElementById("export-button").addEventListener("click", function() {
  download(theNewsletter.yyyymmdd() + ".json", JSON.stringify(theNewsletter));
});
// using code from https://stackoverflow.com/questions/16215771/how-to-open-select-file-dialog-via-js
document.getElementById("open-button").addEventListener("click", function() {
  var input = document.createElement('input');
  input.type = 'file';

  input.onchange = e => {
     // getting a hold of the file reference
     var file = e.target.files[0];
     // setting up the reader
     var reader = new FileReader();
     reader.readAsText(file,'UTF-8');
     // here we tell the reader what to do when it's done reading...
     reader.onload = readerEvent => {
        var content = readerEvent.target.result; // this is the content!
        theNewsletter = newsletterFromJSON(content);
        fillAll();
     }
  }
  input.click();
});

// copy mjml to clipboard
document.getElementById("copy-mjml-button").addEventListener("click", function() {
  const textArea = document.createElement('textarea');
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
    if (year == null) {
      return;
    }
    if (!(isNaN(year) || Number(year) < 0)) {
      break;
    }
  }
  while(true) {
    month = prompt("Enter the month (mm):");
    if (month == null) {
      return;
    }
    if (!(isNaN(month) || Number(month) > 12 || Number(month) < 1)) {
      break;
    }
  }
  while(true) {
    day = prompt("Enter the day (dd):");
    if (day == null) {
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
    if (numArticles == null) {
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
  return 'Changes you made may not be saved.';
};

// drag and drop to move articles
dragula([document.getElementById("articles-list")]).on('drop', function(el, target, source, sibling) {
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
  theNewsletter.move(Number(el.id), newPosition)
  fillAll();
});

// startup
fillAll();
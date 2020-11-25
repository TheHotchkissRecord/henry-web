Split(['#one', '#two', '#three']);

// just for testing right now
var news = new Newsletter();
var art1 = new Article();
var art2 = new Article();
var art3 = new Article();

art1.title = "article 1";
art2.title = "article 2";
art3.title = "article 3";

news.add(art1);
news.add(art2);
news.add(art3);

var theNewsletter = news;//new Newsletter();
var theArticleId = 0;//-1;

// sequential search
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

// populate article input fields
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
}

// update newsletter fields
function updateNewsletter() {
  articleId = findArticleById(theArticleId);
  theNewsletter.articles[articleId].title = document.getElementById("title").value;
  theNewsletter.articles[articleId].articleLink = document.getElementById("article-link").value;
  theNewsletter.articles[articleId].byline = document.getElementById("byline").value;
  theNewsletter.articles[articleId].contentPreview = document.getElementById("content-preview").value;
  theNewsletter.articles[articleId].thumbnailCaption = document.getElementById("thumbnail-caption").value;
  theNewsletter.articles[articleId].thumbnailLink = document.getElementById("thumbnail-link").value;
  theNewsletter.articles[articleId].thumbnailCredit = document.getElementById("thumbnail-credit").value;
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

// from https://stackoverflow.com/questions/2794137/sanitizing-user-input-before-adding-it-to-the-dom-in-javascript
function sanitize(string) {
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
      "`": '&grave;'
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match)=>(map[match]));
}

// update code box
function updateCode() {
  document.getElementById("code-box").innerHTML = sanitize(theNewsletter.toMJML());
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
  theNewsletter.delete(Number(theArticleId));
  theArticleId -= 1;
  fillAll();
  console.log("clicked");
}
document.getElementById("delete-button").addEventListener("click", deleteArticle);

// export the json file
// code from https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.click();
}
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
        theNewsletter = JSON.parse(content);
        fillAll();
     }
  }
  input.click();
});

fillAll();

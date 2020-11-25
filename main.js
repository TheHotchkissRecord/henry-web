Split(['#one', '#two', '#three']);

var news = new Newsletter();
var art1 = new Article();
var art2 = new Article();
var art3 = new Article();

art1.title = "1";
art2.title = "2";
art3.title = "3";

news.add(art1);
news.add(art2);
news.add(art3);

var theNewsletter = news;//new Newsletter();
var theArticleId = 0;//-1;

function findArticleById(theId) {
  for (var i = 0; i < theNewsletter.articleOrder.length; i++) {
    if (theNewsletter.articles[i].id == theId) {
      return i;
    }
  }
  return -1;
}


function listArticles() {
  listBox = document.getElementById("articles-list");
  listBox.innerHTML = "";
  for (var i = 0; i < theNewsletter.articleOrder.length; i++) {
    articleP = document.createElement("p");
    console.log(findArticleById(theNewsletter.articleOrder[i]));
    theArticle = theNewsletter.articles[findArticleById(theNewsletter.articleOrder[i])];
    articleP.id = theArticle.id;
    articleP.appendChild(document.createTextNode((i + 1) + ". " + theArticle.title));

    articleP.addEventListener("click", function (event){
      console.log("clicked");
      theArticleId = event.target.id;
      fillFields();
    });

    listBox.appendChild(articleP)
  }
}

function fillFields() {
  theArticle = theNewsletter.articles[theArticleId];
  document.getElementById("title").value = theArticle.title;
  document.getElementById("article-link").value = theArticle.articleLink;
  document.getElementById("byline").value = theArticle.byline;
  document.getElementById("content-preview").value = theArticle.contentPreview;
  document.getElementById("thumbnail-caption").value = theArticle.thumbnailCaption;
  document.getElementById("thumbnail-link").value = theArticle.thumbnailLink;
  document.getElementById("thumbnail-credit").value = theArticle.thumbnailCredit;
  document.getElementById("article-id").innerHTML = theArticleId;
}

function updateNewsletter() {
  theNewsletter.articles[theArticleId].title = document.getElementById("title").value;
  theNewsletter.articles[theArticleId].articleLink = document.getElementById("article-link").value;
  theNewsletter.articles[theArticleId].byline = document.getElementById("byline").value;
  theNewsletter.articles[theArticleId].contentPreview = document.getElementById("content-preview").value;
  theNewsletter.articles[theArticleId].thumbnailCaption = document.getElementById("thumbnail-caption").value;
  theNewsletter.articles[theArticleId].thumbnailLink = document.getElementById("thumbnail-link").value;
  theNewsletter.articles[theArticleId].thumbnailCredit = document.getElementById("thumbnail-credit").value;
}

document.getElementById("title").addEventListener("input", updateNewsletter);
document.getElementById("article-link").addEventListener("input", updateNewsletter);
document.getElementById("byline").addEventListener("input", updateNewsletter);
document.getElementById("content-preview").addEventListener("input", updateNewsletter);
document.getElementById("thumbnail-caption").addEventListener("input", updateNewsletter);
document.getElementById("thumbnail-link").addEventListener("input", updateNewsletter);
document.getElementById("thumbnail-credit").addEventListener("input", updateNewsletter);
document.getElementById("article-id").addEventListener("input", updateNewsletter);

function fillAll() {
  listArticles();
  fillFields();
}

fillAll();

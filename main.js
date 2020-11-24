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
  for (var i = 0; i < theNewsletter.articleOrder.length; i++) {
    articleP = document.createElement("p");
    console.log(findArticleById(theNewsletter.articleOrder[i]));
    theArticle = theNewsletter.articles[findArticleById(theNewsletter.articleOrder[i])];
    articleP.id = theArticle.id;
    articleP.appendChild(document.createTextNode((i + 1) + ". " + theArticle.title));
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

function fillAll() {
  listArticles();
  fillFields();
}

fillAll();

function Article() {
  this.id = -1; // article is not assigned a unique id until added to a newsletter object
  this.title = "";
  this.articleLink = "";
  this.byline = "";
  this.contentPreview = "";
  this.thumbnailLink = "";
  this.thumbnailCaption = "";
  this.thumbnailCredit = "";

  this.toMJML = function() {
    mjml = ARTICLE_TEXT;

    // some of this stuff should not be included if it is empty
    // should also check if links are valid
    if (isUrl(this.thumbnailLink)) {
      mjml = mjml.replace("<!-- Thumbnail", "");
      mjml = mjml.replace("Thumbnail -->", "");
    }
    if (this.thumbnailCaption != "") {
      mjml = mjml.replace("<!-- Caption", "");
      mjml = mjml.replace("Caption -->", "");
    }
    if (this.thumbnailCredit != "") {
      mjml = mjml.replace("<!-- Credit", "");
      mjml = mjml.replace("Credit -->", "");
    }
    mjml = mjml.replaceAll("%Thumbnail", this.thumbnailLink);
    mjml = mjml.replaceAll("%Caption", this.thumbnailCaption);
    mjml = mjml.replaceAll("%Credit", this.thumbnailCredit);
    mjml = mjml.replaceAll("%Title", this.title);
    mjml = mjml.replaceAll("%Author", this.byline);
    mjml = mjml.replaceAll("%Preview", this.contentPreview);
    mjml = mjml.replaceAll("%Link", this.articleLink);
    //console.log(mjml)
    return mjml;
  }
}

function Newsletter() {
  this.date = new Date();
  this.intro = "";
  this.emailPreview = "";
  this.errata = "";
  this.articleOrder = [];
  this.highestID = -1;
  this.articles = [];

  this.add = function(article) {
    this.highestID++;
    article.id = this.highestID;
    this.articles.push(article);
    this.articleOrder.push(article.id);
  }

  this.move = function(id, newPosition) {
    oldPosition = this.articleOrder.indexOf(id);
    if (oldPosition != -1) {
      this.articleOrder.move(oldPosition, newPosition);
    } else {
      throw "Article ID not found in articleOrder";
    }
  }

  // returns position of former article in articleOrder
  this.delete = function(id) {
    orderPosition = this.articleOrder.indexOf(id);
    articlesPosition = this.articles.findIndex(element => element.id == id);
    if (orderPosition != -1 && articlesPosition != -1) {
      this.articleOrder.splice(orderPosition, 1);
      this.articles.splice(articlesPosition, 1);
    } else {
      throw "Article ID not found in either articleOrder or articles"
    }
    return orderPosition;
  }

  this.toMJML = function() {
    articlesMJML = "";
    for (id of this.articleOrder) {
      articlesMJML = articlesMJML + this.articles.find(element => element.id == id).toMJML();
    }
    mjml = MAIN_TEXT;
    // might not work in Internet Explorer
    mjml = mjml.replaceAll(/%YYYYMMDD/g, this.date.getFullYear().toString() + (this.date.getMonth() + 1).toString().padStart(2, "0") + this.date.getDate().toString().padStart(2, "0"));
    mjml = mjml.replaceAll(/%Month/g, this.date.toLocaleString('default', { month: 'long' }));
    mjml = mjml.replaceAll(/%DD/g, this.date.getDate().toString().padStart(2, "0"))
    mjml = mjml.replaceAll(/%YYYY/g, this.date.getFullYear());
    mjml = mjml.replaceAll(/%Weekday/g, this.date.toLocaleDateString('default', { weekday: 'long' }))
    mjml = mjml.replaceAll("%Description", this.emailPreview);
    mjml = mjml.replaceAll("%Editorial", this.intro);
    mjml = mjml.replaceAll("%Errata", this.errata);
    mjml = mjml.replaceAll("%Articles", articlesMJML);

    return mjml;
  }

  this.yyyymmdd = function() {
    return this.date.getFullYear().toString() + (this.date.getMonth() + 1).toString().padStart(2, "0") + this.date.getDate().toString().padStart(2, "0");
  }
}

function newsletterFromJSON(jsonData) {
  obj = JSON.parse(jsonData);
  news = new Newsletter();
  news.date = new Date(obj.date);
  news.intro = obj.intro;
  news.emailPreview = obj.emailPreview;
  news.errata = obj.errata;
  news.articleOrder = obj.articleOrder;
  news.highestID = obj.highestID;

  for (article of obj.articles) {
    newArt = new Article();
    newArt.id = article.id;
    newArt.title = article.title;
    newArt.articleLink = article.articleLink;
    newArt.byline = article.byline;
    newArt.contentPreview = article.contentPreview;
    newArt.thumbnailLink = article.thumbnailLink;
    newArt.thumbnailCaption = article.thumbnailCaption;
    newArt.thumbnailCredit = article.thumbnailCredit;
    news.articles.push(newArt);
  }

  return news;
}

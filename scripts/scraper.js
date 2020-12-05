var parser = new DOMParser();

// returns an Article object
async function scrape(url) {
  let response = await fetch("https://cors.reeceyang.workers.dev/?" + url);
  let text = await response.text();
  var articleHtml = parser.parseFromString(text, 'text/html');

  var art = new Article();
  art.title = unsanitize(articleHtml.getElementById("storyheadline").innerHTML);

  var metaLine = articleHtml.getElementById("storymeta").childNodes[0].innerHTML.trim();
  art.byline = unsanitize(metaLine.substring(0, metaLine.indexOf("<")));

  art.contentPreview = unsanitize(innermostNode(articleHtml.getElementsByClassName("storycontent")[0].childNodes[0]).innerHTML);

  // only get the photo if there is a credit
  if (articleHtml.getElementsByClassName("photocredit").length != 0) {
    art.thumbnailCredit = unsanitize(articleHtml.getElementsByClassName("photocredit")[0].innerHTML);
    art.thumbnailLink = articleHtml.getElementsByClassName("catboxphoto")[0].src;
  }
  if (articleHtml.getElementsByClassName("photocaption").length != 0) {
    art.thumbnailCaption = unsanitize(articleHtml.getElementsByClassName("photocaption")[0].innerHTML);
  }
  //console.log(art);
  return art;
}

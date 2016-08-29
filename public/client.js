function buildContent() {
  
  console.log("The function was called");
  var start = document.getElementById("addHere");
  var remove = document.getElementById("remove");
    
  $.get("/buildIt", function(data){
    $(data).find("item").each(function () {
      var el = $(this);
      console.log("------------------------");
      
      var container = document.createElement("div");
      container.setAttribute("class", "container");
      
      var card = document.createElement("div");
      card.setAttribute("class", "card");
      
      var cardContent = document.createElement("div");
      cardContent.setAttribute("class", "card-content");
      card.appendChild(cardContent);
      
      var cardTitle = document.createElement("span");
      cardTitle.setAttribute("class", "card-title");
      
      var text = el.find("title").text();
      
      while(text.includes("&#039;")){
        text = text.replace("&#039;", "'");
      }
      
      var cardTitleText = document.createTextNode(text);
      cardTitle.appendChild(cardTitleText);
      cardContent.appendChild(cardTitle);
      
      var p = document.createElement("p");
      
      // var StrippedString = .replace(/(<([^>]+)>)/ig,"");
      var pText = el.find("description").text();
      
      while(pText.includes("&lt;iframe src=\"http://www.sltrib.com/csp/mediapool/sites/sltrib/pages/garss.csp\" height=\"1\" width=\"1\" &gt; &lt;/frame&gt;")){
        pText = pText.replace("&lt;iframe src=\"http://www.sltrib.com/csp/mediapool/sites/sltrib/pages/garss.csp\" height=\"1\" width=\"1\" &gt; &lt;/frame&gt;", "");
      }
      
      p.innerHTML = pText;
      
      // p.appendChild(pText);
      
      cardContent.appendChild(p);
      card.appendChild(cardContent);
      
      var cardAction = document.createElement("div");
      cardAction.setAttribute("class", "card-action");
      
      var row = document.createElement("div");
      row.setAttribute("class", "row");
      
      var link = document.createElement("a");
      link.setAttribute("class", "btn black col s12");
      link.setAttribute("href", el.find("link").text());
      link.innerHTML = "Link To Article";
      
      row.appendChild(link);
      cardAction.appendChild(row);
      
      card.appendChild(cardAction);
      container.appendChild(card);
      start.appendChild(container);
      
      console.log("title      : " + el.find("title").text());
      console.log("link       : " + el.find("link").text());
      console.log("description: " + el.find("description").text());
    });
  });
  remove.removeChild(document.getElementById("preLoader"));
}
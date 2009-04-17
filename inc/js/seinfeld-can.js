function seinfeldCan(username) {
    var username = "lachlanhardy";
    $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.calendaraboutnothing.com%2F~" + username + "%22%20and%20xpath%3D'%2F%2Fdiv%5B%40id%3D%22stats%22%5D%2Fdiv'%0A%20%20%20%20&format=json&callback=?", function(data){
      var currentStreak = $("<p>My current streak of successive days committing public code is </p>").append(data.query.results.div[0].span[1].content);
      
      var longestAnchor = $("<a/>").attr("href", data.query.results.div[1].a.href).text(data.query.results.div[1].a.span[1].content);
      
      var longestStreak = $("<p>and my longest streak is </p>").append(longestAnchor);

      $("#seinfeld-can").append(currentStreak).append(longestStreak);
      
  }); 
  
 $.getJSON("http://pipes.yahoo.com/pipes/pipe.run?_id=bDVGIHwj3hGmWk5qZMag4A&_render=json&_callback=?", function(calendar){
      
      var table = $("<div id=\"calendar\"/>").html(calendar.value.items[0].content);
      
      table.find("thead th:contains('Month')").remove()
      $("th.monthName", table).attr("colspan", "8");
      
      $("#seinfeld-can").append(table);
  });
  
}
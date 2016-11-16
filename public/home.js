var blogPage = new BlogPage();

$(function() {

  var ajaxSettings = {
    url: "/api/blogPageQuery",
    type: "POST",
    dataType: "JSON"
  };

  $("#prevPage").on("click", function() {
    blogPage.prevPage(ajaxSettings).done(function(data) {
      if(data.ErrorCode == 0) {
        showHtml(data.blogs);
      } else {
        alert(data.ErrorInfo);
      }
    });
    return false;
  });

  $("#nextPage").on("click", function() {
    blogPage.nextPage(ajaxSettings).done(function(data) {
      if(data.ErrorCode == 0) {
        showHtml(data.blogs);
      } else {
        alert(data.ErrorInfo);
      }
    });
    return false;
  });


  $("#nextPage").click();

});

function showHtml(blogs) {
  if(blogs.length == 0) {

    $("#blogList").html($("#noDataTpl")[0].text);
  
  } else {

    var tplText = $("#blogTpl")[0].text;
    var tplFunc = doT.template(tplText);
    $("#blogList").html(tplFunc(blogs));
  }
}
var curPage = 0;
var pageSize = 10;

$(function() {

  pageQuery();

  $("#prevPage").on("click", function() {

    if(curPage == 0) {
      alert("已到首页");
    }

    if(curPage != 0) {
      curPage --;
      pageQuery();
    }

    return false;
  });

  $("#nextPage").on("click", function() {

    curPage ++;
    pageQuery();

    return false;
  });

});

function pageQuery() {

  $.ajax({
    url: "/api/blogPageQuery",
    type: "POST",
    dataType: "JSON",
    data: {
      curPage: curPage,
      pageSize: pageSize
    }
  }).done(function(data) {

    if(data.ErrorCode == 0) {
      showHtml(data.blogs);
    } else {
      alert(data.ErrorInfo);
    }

  }).fail(function(err) {
    alert(err.responseText);
  })

}

function showHtml(blogs) {
  if(blogs.length == 0) {

    $("#blogList").html($("#noDataTpl")[0].text);
  
  } else {

    var tplText = $("#blogTpl")[0].text;
    var tplFunc = doT.template(tplText);
    $("#blogList").html(tplFunc(blogs));
  }
}
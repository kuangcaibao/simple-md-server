var blogPage = new BlogPage();

$(function() {

  var ajaxSettings = {
    url: "/api/blogPageQuery",
    type: "POST",
    dataType: "JSON",
    data: {}
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

  // 获取label标签
  $.ajax({
    url: "/api/labelQuery",
    type: "POST",
    dataType: "JSON"
  }).done(function(data) {
    if(data.ErrorCode == 0) {
      var tplText = $("#labelListTpl")[0].text;
      var tplFunc = doT.template(tplText);
      $("#labelList").html(tplFunc(data.labels));
    } else {
      console.error(data.ErrorInfo);
    }
  })

});

function showHtml(blogs) {
  if(blogs.length == 0) {

    $("#blogList").html($("#noDataTpl")[0].text);
    $("#prevPage").hide();
    $("#nextPage").hide();
  
  } else {

    var tplText = $("#blogTpl")[0].text;
    var tplFunc = doT.template(tplText);
    $("#blogList").html(tplFunc(blogs));

    if(blogPage.isFirstPage) {
      $("#prevPage").hide();
    } else {
      $("#prevPage").show();
    }

    if(blogPage.isLastPage) {
      $("#nextPage").hide();
    } else {
      $("#nextPage").show();
    }
  }
}
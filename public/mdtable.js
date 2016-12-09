var mdTable = function() {

  var sufix = "$$tb";

  var fmtTable = function(id, tbs) {

    var $tb = $("#" + id);
    $tb.html("");

    tbs.map(function(index, tb) {

      var $el = $(tb);
      var tag = $el[0].tagName.toLowerCase();
      $el[0].id = sufix + index;
      $tb.append("<li><a class='tb" + tag + "' href='#" + sufix + index + "'>" + $el.text() + "</a></li>");

    })

  }

  return fmtTable;

}();
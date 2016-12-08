var BlogPage = function(initSettings) {
  initSettings = initSettings || {};
  this.page = initSettings.page || -1;
  this.pageSize = initSettings.pageSize || 10;
  this.isLastPage = false;
  this.isFirstPage = true;
}

BlogPage.prototype.prevPage = function(ajaxSettings) {

  var _that = this;
  if(_that.isFirstPage) {
    alert("已是首页");
    return {done: function() {}};
  }

  _that.page --;
  if(_that.page <= 0) {
    _that.isFirstPage = true;
  }

  Object.assign(ajaxSettings.data, {curPage: _that.page, pageSize: _that.pageSize});

  return $.ajax(ajaxSettings).done(function(data) {
    
    if(data.ErrorCode == 0) {
      _that.isLastPage = false;
    } else {
      _that.page ++;
      if(_that.page > 0) {
        _that.isFirstPage = false;
      }
    }

    return data;
  });

}

BlogPage.prototype.nextPage = function(ajaxSettings) {

  var _that = this;
  if(_that.isLastPage) {
    alert("已是最后一页");
    return {done: function() {}};
  }

  _that.page ++;
  if(_that.page > 0) {
    _that.isFirstPage = false;
  }

  Object.assign(ajaxSettings.data, {curPage: _that.page, pageSize: _that.pageSize});

  return $.ajax(ajaxSettings).done(function(data) {
    if(data.ErrorCode == 0) {
      if(data.blogs.length < _that.pageSize) {
        _that.isLastPage = true;
      }
    } else {
      _that.page --;
      if(_that.page <= 0) {
        this.isFirstPage = true;
      }
    }

    return data;
  })

}
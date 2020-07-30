// pages/dietsearch/dietsearch.js
var http = require("../../utils/httputils.js");
var WxSearch = require('../../search/search.js');
Page({

  data: {},

  onLoad: function (data) {
    var that = this;
    WxSearch.init(
     that,
     JSON.parse(data.hotKeys),
     that.mySearchFunction,
     that.myGoBackFunction
   );
  },
  wxSearchInput: WxSearch.wxSearchInput,
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll,
  wxSearchConfirm: WxSearch.wxSearchConfirm,
  wxSearchClear: WxSearch.wxSearchClear,
  //搜索函数
  mySearchFunction: function (value) {
    wx.redirectTo({
      url: '../map1detail/map1detail?herbName=' + value,
    })
  },
  //返回函数
  myGoBackFunction: function () {
    wx.navigateTo({
      url: '../map1/map1',
    })
  },

  /**
   * 查询提示词
   */
  getTip: function () {
    let inputValue = this.data.wxSearchData.value;
    if (inputValue != "") {
      http.get("herb/search", {
          prefix: inputValue
        }, data => {
          this.data.wxSearchData.tipKeys = data;
          this.setData({
            wxSearchData: this.data.wxSearchData
          })
        },
        res => {
          console.log(res);
        })
    }
  },
})
// pages/dietdetail/dietdetail.js
var http = require("../../utils/httputils.js");
Page({
  data:{
  hasData:true
  },
  onLoad: function (options) {
    let dietName = options.dietName;
    this.getDietData(dietName);
  },

  getDietData:function(dietName){
    let that = this;
      http.get("diet/detail", {name: dietName}, data => {
      that.setData({
        dietdetail: data
      })
    wx.setNavigationBarTitle({
      title: data.name,
    })
    }, res => {
      that.setData({
        hasData:false,
      })
    })
  }
})
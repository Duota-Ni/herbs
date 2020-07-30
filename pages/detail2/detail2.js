// pages/detail2/detail2.js
var http = require("../../utils/httputils.js");

Page({
   onLoad: function (options) {
    let id = options.id;
    this.getStoryData(id);
  },

  getStoryData: function(id) {
    let that = this;
    http.get("doctor/story", {id: id}, data => {
      let pictureUrl= data.pictureUrl
      that.setData({
        doctor: data
      })
      wx.setNavigationBarTitle({
        title: data.name,
      })
    }, res => {
      console.log(res)
    })
  },
  previewImage:function(e){
    let pictureUrl=e.currentTarget.dataset.picUrl
    wx.previewImage({
      urls: [pictureUrl],
    })
  }
})
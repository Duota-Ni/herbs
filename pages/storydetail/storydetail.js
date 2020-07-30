// pages/storydetail/storydetail.js
var http = require("../../utils/httputils.js");
Page({
  onLoad: function (options) {
  let storyId = options.storyId
  this.getStoryData(storyId)
  },
  
  getStoryData:function(id){
    let that =this
    http.get("herb/story",{id:id},data=>{
      that.setData({
        storydetail:data
      })
      wx.setNavigationBarTitle({
        title: data.title,
      })
    },res=>{
      console.log(res)
    })
  }
})
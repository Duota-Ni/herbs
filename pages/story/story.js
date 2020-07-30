// pages/story/story.js
var http = require("../../utils/httputils.js")
Page({
  onLoad: function (options) {
  let that = this
  that.loadName()
  },
  
  loadName:function(){
    let that =this;
    //配置只需要title和id
    http.get('herb/stories', null, data => {
      let hrebStory=[]
      that.setData({
        herbStory: data
      })
    },
    res => {
      console.log(res)
    })
  },
  getStoryDetail:function(e){
    let that = this
    let storyId = e.currentTarget.dataset.storyId
    wx.navigateTo({
      url: '../storydetail/storydetail?storyId='+storyId,
    })
  }
})
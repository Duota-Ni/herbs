var http = require("../../utils/httputils.js")
Page({
  onLoad: function (options) {
    this.getSort()
    this.getPoem()
  },
  getSort: function() {
    let that = this;
    http.get('herb/category', null, data => {
      that.setData({
        sortList: data
      })
    },
    res => {
      console.log(res)
    })
  },
    //搜索入口
    wxSearchTab: function(){
      http.get("herb/hot_key", null, data => {
        wx.navigateTo({
          url: '../map1search/map1search?hotKeys='+JSON.stringify(data),
        });
      })
    },
    goToHerb: function (e) {
      let value = e.currentTarget.dataset.herbName
      wx.navigateTo({
        url: '../map1detail/map1detail?herbName=' + value,
      })
    },
    goToMap1:function(){
      wx.navigateTo({
        url: '../map1/map1',
      })
    },
    goToDoctor: function () {
      wx.navigateTo({
        url: '../map2/map2',
      })
    },
    goToSort: function (e) {
      let sortId =e.currentTarget.dataset.id
      wx.navigateTo({
        url: '../sort/sort?sort='+this.data.sortList[sortId],
      })
    },
    goToDiet:function(){
      wx.navigateTo({
        url: '../diet/diet',
      })
    },
    goToStory:function(){
      wx.navigateTo({
        url: '../story/story',
      })
    },
    goToProtect:function(){
      wx.navigateTo({
        url: '../protect/protect',
      })
    },
    goToLaw:function(){
      wx.navigateTo({
        url: '../law/law',
      })
    },
    goToPoem:function(){
      wx.navigateTo({
        url: '../discovery/discovery',
      })
    },
    getPoem: function () {
      let that = this;
      http.get('poem/random_poem', {}, data => {
        let poemData = data
        that.setData({
          poemData: poemData,
        })
      }, res => {
        console.log(res)
      })
    },
})
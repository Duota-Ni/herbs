// pages/law/law.js
var http = require("../../utils/httputils.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

 
  onLoad: function (options) {
  this.getLawData()
  },

  getLawData:function(){
    http.get('law/law.json',null,data=>{
      this.setData({
        title:data.title,
        subtitle:data.subtitle,
        overview:data.overview,
        law:data.law
      })
    },res=>{console.log(res)})
  }
})
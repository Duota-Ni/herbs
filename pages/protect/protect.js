// pages/protect/protect.js
var http = require("../../utils/httputils.js")
Page({
  onLoad: function (options) {
   this.getProtctLevel()
  },
  
  getProtctLevel(){
    http.get('law/protectlevel.json',null,data=>{
      this.setData({
        protectlevel2:data.level2,
        protectlevel3:data.level3
      })
    },res=>{console.log(res)})
  },

  //跳转到药草详情页
  getProtectDetail:function(e){
  let value = e.currentTarget.dataset.protectName
  //通过name索引
  wx.redirectTo({
    url: '../map1detail/map1detail?herbName='+value,
  })
  }
})
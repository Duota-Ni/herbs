// pages/dietsickname/dietsickname.js
var http = require("../../utils/httputils.js");
Page({
onLoad:function(options){
  let sickName = options.sickName
  this.getDietSick(sickName)
},

getDietSick:function(sickName){
  let that = this;
      http.get("diet/search_by_disease", {disease:sickName}, data => {
      let diets = data.diets
      if (diets[0]!=null) {
      that.setData({
        hasData:true,
        disease:data.disease,
        diets:data.diets,
      })
      }else{
        that.setData({
          hasData:false
        })
      }
    wx.setNavigationBarTitle({
      title: data.disease+"适用药膳",
    })
    }, res => {
      console.log(res)
    })
  },
  //点击查看详情
  viewDetail: function (e) {
    var dietName = e.currentTarget.dataset.dietName
    wx.navigateTo({
      url: '../dietdetail/dietdetail?dietName=' + dietName,
    })
  }
})
// pages/sort/sort.js
var http = require("../../utils/httputils.js");
Page({
  data: {
    actionSheetHidden:true
  },

  onLoad: function (options) {
    this.getSortData(options.sort);
  },

  getSortData:function(sort){
    let that = this;
    http.get("herb/category/"+sort, null, data => {
      that.setData({
        type: data
      })
      wx.setNavigationBarTitle({
       title: data[0].sort
      })
    }, res => {
      console.log(res)
    })
  },
  actionSheetTap:function(){
    this.setData({
      actionSheetHidden:!this.data.actionSheetHidden
    })
  },
  actionSheetbindchange:function(){
    this.setData({
      actionSheetHidden:!this.data.actionSheetHidden
    })
  },
  //跳转到指定结点（本页）
  jumpTo:function(e){
    let target = e.currentTarget.dataset.opt;
    console.log(target)
    this.setData({
      toView:target,
      actionSheetHidden:!this.data.actionSheetHidden
    })
  }
})
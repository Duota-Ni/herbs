// pages/diet/diet.js
var http = require("../../utils/httputils.js");
Page({
  data: {
    pageNum: 1, //页码
    goodList: [], //存储
    hasMoreData: true
  },
  onLoad: function (options) {
    this.loadDiet();
  },
  //加载初始数据（药膳部分）
  loadDiet: function (res) {
    let that = this;
    let pageNum = that.data.pageNum;
    //let pageSize = that.data.pageSize;
    let allDiet = []
    let initDiet = that.data.goodList ? that.data.goodList : [] //获取已加载的
    http.get("diet/list", {
      pageNum: pageNum
    }, data => {
      let newDiet = data //获取新加载的商品
      let newDietLength = newDiet.length; //新获取的商品数量
      if (pageNum <= 1) {
        allDiet = data
      } else {
        allDiet = initDiet.concat(newDiet)
      }
      if (newDietLength < 10) { ////如果新加载的一页药膳数量小于10，则没有下一页
        that.setData({
          hasMoreData: false
        })
      }
      let goodList = allDiet
      that.setData({
        diet: allDiet,
        pageNum: pageNum,
        goodList: goodList
      })
    }, res => {
      //分页失败，分页数据回退
      if (pageNum > 1) {
        that.setData({
          pageNum: --pageNum
        })
      }
    }, res => {
      console.log(res)
    })
  },

  onPullDownRefresh: function () {
    let that = this;
    let pageNum = that.data.pageNum;
    //下拉刷新，下拉跳转到上一页
    that.setData({
      pageNum: --pageNum,
      pageSize: 10,
      diet: []
    })
    that.loadDiet();
    wx.stopPullDownRefresh({
      complete: (res) => {
        console.log(res)
      },
    })
  },
  
  onReachBottom: function () {
    //上拉分页，将页面加1，然后调用分页函数loadRoom()
    let that = this;
    let pageNum = that.data.pageNum;
    if (that.data.hasMoreData) {
      pageNum++
      that.setData({
        pageNum: pageNum,
      })
      that.loadDiet();
    }
  },


  //点击查看详情
  viewDetail: function (e) {
    var dietName = e.currentTarget.dataset.dietName
    wx.navigateTo({
      url: '../dietdetail/dietdetail?dietName=' + dietName,
    })
  },
  //药膳名称搜索
  wxSearchTab: function () {
    http.get("diet/hot_key", null, data => {
      wx.navigateTo({
        url: '../dietsearch/dietsearch?hotKeys=' + JSON.stringify(data),
      });
    })
  },

  //疾病种类搜索
  wxSearchSick:function(){
    //修改为sick_key
    http.get("diet/search_by_disease_hot_key", null, data => {
      wx.navigateTo({
        url: '../dietsicksearch/dietsicksearch?hotKeys=' + JSON.stringify(data),
      });
    })
  }
})
// pages/discovery/discovery.js
var http = require("../../utils/httputils.js");
Page({
  data: {
    pageNum: 1,
    goodList: [],
    hasMoreData: true
  },

  onLoad: function (options) {
    this.loadPoem()
  },

  loadPoem: function (e) {
    let that = this
    let pageNum = that.data.pageNum
    let allPoem = []
    let initPoem = that.data.goodList ? that.data.goodList : []
    http.get('herb/poem_list', { pageNum: pageNum }, data => {
      let newPoem = data //获取新加载的诗歌
      let newPoemLength = newPoem.length
      //先连接数组
      if(pageNum<=1){
        allPoem = data
      }else{
        allPoem = initPoem.concat(newPoem)
      }
      if(newPoemLength<10){
        that.setData({
          hasMoreData:false
        })
      }
      //给poemList添加isShow字段
      allPoem.map((item, index) => {
        allPoem[index].isShow = false
      })
      let goodList = allPoem
      that.setData({
        poemList: allPoem,
        pageNum:pageNum,
        goodList:goodList
      })
    }, res => {
      wx.showToast({
        title: '加载数据失败',
        icon: 'none',
        duration: 1000
      });
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

  //隐藏显示按钮
  showList: function (e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let current = "poemList[" + index + "].isShow"
    if (that.data.poemList[index].isShow === true) {
      that.setData({
        [current]: false
      })
    } else {
      that.setData({
        [current]: true
      })
    }
  },

  onPullDownRefresh: function () {
    let that = this;
    let pageNum = that.data.pageNum;
    //下拉刷新，下拉跳转到上一页
    that.setData({
      pageNum: --pageNum,
      pageSize: 10,
      poemList: []
    })
    that.loadPoem();
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
    that.loadPoem();
  }
  },

  goToherb: function (e) {
    let value = e.currentTarget.dataset.herbName
    wx.navigateTo({
      url: '../map1detail/map1detail?herbName=' + value,
    })
  }
})
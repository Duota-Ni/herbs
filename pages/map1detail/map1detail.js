// pages/map1detail/map1detail.js
import geoJson from "../../ec-canvas/mapData.js";
import * as echarts from "../../ec-canvas/echarts";
var http = require("../../utils/httputils.js")
var dataList = []
var Chart = null
Page({

  data: {
    ec: {
      lazyLoad:true
    },
    hasData:false
  },

  onLoad: function (options) {
    this.echartsComponet = this.selectComponent('#mychart')
    let herbName=options.herbName
    this.getHerbData(herbName)//获取数据(通过http)
  },
  
  getHerbData:function(herbName){
    let that = this;
    http.get('herb/detail/'+herbName,null, data => {
      // 设置地图数据
      let habitat = data.habitat
     let all = ["北京","天津","河北","山西","内蒙古","宁夏","青海","陕西","甘肃","新疆","辽宁","吉林","黑龙江","山东","江苏","上海","浙江","安徽","福建","江西","河南","湖南","湖北","四川","贵州","云南","重庆",'西藏',"广东","广西","海南","香港","澳门","台湾"]
      for (let i = 0; i < all.length; i++) {
        if (habitat=="各地") {
          dataList.push({
             name:all[i],
             value:1,
             plant:data.name
          })
        } else {
          dataList = data.provinces
        }
      }
      this.init_echarts(); //初始化图表
      //获取数据到视图层
      let content = data.content.replace(/\r\n/g,"")
      that.setData({
        hasData: true,
        content: content,
        habitat: data.habitat,
        img: data.img
      })
      if (!Chart) {
        this.init_echarts(); //初始化图表
      } else {
        this.setOption(Chart); //更新数据
      }
      wx.setNavigationBarTitle({
        title: data.name,
      })
    },
    res => {
      if (res.code == 1001) {
        that.setData({
          hasData: false,
          msg: "该药草不存在，请重新搜索"
        })
      }
    })
    },
    //初始化图表
    init_echarts: function () {
      this.echartsComponet.init((canvas, width, height) => {
        Chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        this.setOption(Chart)
        echarts.registerMap('china', geoJson);
         // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return Chart
      })
    },
    setOption:function(Chart){
      Chart.setOption(this.getOption())//获取新数据
    },
    getOption:function(){
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: function (obj) {
            console.log(obj)
            return `${obj.data.name}：${obj.data.plant}`
          }
        },
        //这里是连续型数据
        visualMap: {
          min: 0,
          max: 1,
          left: 'left',
          top: 'bottom',
          inRange: {
            color: ['rgba(255,255,255,1)', '#69cfff'],
            symbolSize: [1, 0]
          }
        },
    
        series: [{
          type: 'map',
          mapType: 'china',
          //地图省份名字
          label: {
            emphasis: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: 8
              }
            },
          },
    
          //地图区域的多边形 图形样式
          itemStyle: {
            normal: {
              borderColor: "#AAAAAA",
              areaColor: "transparent"
              //   fontSize:8,
            },
            emphasis: {
              areaColor: "#69cfff",
              borderWidth: 0
              //   fontSize:8,
            }
          },
          animation: false,
          //高亮省份数据
          data: dataList
        }]
      }
      return option;
    },
  previewImage:function(e){
    let pictureUrl=e.currentTarget.dataset.picUrl
    wx.previewImage({
      urls: [pictureUrl],
    })
  }
})
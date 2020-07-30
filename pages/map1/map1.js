import geoJson from "../../ec-canvas/mapData.js";
import * as echarts from "../../ec-canvas/echarts";
var http = require("../../utils/httputils.js")
var dataList = []
var Chart = null
Page({
  data: {
    ec: {
      lazyLoad:true
    }
  },
  onLoad:function(options){
    this.echartsComponet = this.selectComponent('#mychart')
    this.getData()//获取数据(初始化时)
  },
  getData:function(){
    let that = this;
    http.get('plant/special.json', null, data => {
      dataList = data
      that.init_echarts(); //初始化图表
      that.setData({
        dataList:dataList
      })
    }, res => {
      console.log(res)
    })
    this.init_echarts() //初始化图表
     //如果是第一次绘制
     if (!Chart) {
      this.init_echarts(); //初始化图表
    } else {
      this.setOption(Chart); //更新数据
    }
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
          return `${obj.data.name}：${obj.data.plant}`
        }
      },
      roam:'true',
      zoom:1,
      scaleLimit:{
        min:1,
        max:9
      },
      //这里是连续型数据
      visualMap: {
        min: 0,
        max: 34,
        left: 'left',
        top: 'bottom',
        inRange: {
          color: ['#3cf8a0','#ffd700','#f83c3c'],
          symbolSize: [1, 0]
        }
      },
      series: [{
        type: 'map',
        mapType: 'china',
        // 缩放
        zoom:1,
        roam:true,
        scaleLimit:{
          min:1,
          max:5
        },
        //地图省份名字
        label: {
          normal: {
            show: true,
            textStyle: {
              color: "#bfbfbf",
              fontSize: 8
            }
          },
          emphasis: {
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
            areaColor: "#fff"
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
  onPullDownRefresh: function () {
    this.echartsComponet = this.selectComponent('#mychart')
    this.getData()
  }
});
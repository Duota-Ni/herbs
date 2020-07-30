// pages/map2/map2.js
var http = require('../../utils/httputils.js');

Page({
  data: {
    latitude:30.990636,
    longitude:114.307250,
  },
  onLoad: function() {
    this.getLocationData()
    this.setScale()
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('map')
  },
  bindcallouttap: function (e) {
    const markerId = e.markerId;
    wx.navigateTo({
      url: '../detail2/detail2?id='+markerId,
    })
  },
  getLocationData: function() {
    let that = this;
    let markers = [];
    http.get('doctor/location', {}, data => {
      for (let i = 0; i < data.doctors.length; i++) {
        let doctor = data.doctors[i];
        markers.push({
          callout: {
            content: doctor.name,
            padding: 5,
            borderRadius: 2,
            display: 'BYCLICK'
          },
          iconPath: "../../images/icons/doctorblue.png",
          id: doctor.id,
          latitude: doctor.latitude,
          longitude: doctor.longitude,
          width: 30,
          height: 30
        })
      }
      that.setData({
        markers: markers
      })
    },
      res => {
        console.log(res)
      })
  },
  //每两秒缩小一个级别
  setScale:function(){
    let that = this;
    let scale;
    for(let i=7;i>2;i--){
      setTimeout(function(){
        scale = i;
        that.setData({
          scale: scale
        })
      },(7-i)*2000)
    }
    }
  
})
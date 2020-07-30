//搜索回调函数
var __searchFunction = null;
//返回函数
var __goBackFunction = null;
//应用变量
var __that = null;

//初始化函数
function init(that, hotKeys, searchFunction, goBackFunction) {
  __that = that;
  __searchFunction = searchFunction;
  __goBackFunction = goBackFunction;

  var temData = {};
  var barHeight = 43;
  var view = {
    barHeight: barHeight
  }
  temData.hotKeys = hotKeys;

  //获取系统信息这里获取窗口高度
  wx.getSystemInfo({
    success: function (res) {
      var wHeight = res.windowHeight;
      view.searchHeight = wHeight - barHeight;
      temData.view = view;
      __that.setData({
        wxSearchData: temData
      });
    }
  });
  getHisKeys(__that);
}

//搜索框输入时的操作
function wxSearchInput(e) {
  let inputValue = e.detail.value;
  __that.data.wxSearchData.value = inputValue;
  __that.setData({
    wxSearchData: __that.data.wxSearchData
  });
  // 去查询提示词
  __that.getTip();
}

//清空输入
function wxSearchClear() {
  let temData = __that.data.wxSearchData;
  temData.value = "";
  temData.tipKeys = [];
  __that.setData({
    wxSearchData: temData
  })
}

//点击提示/历史/热点标签的操作
function wxSearchKeyTap(e) {
  //检索标签的字符串
  search(e.target.dataset.key);
}

//确认
function wxSearchConfirm(e) {
  let key = e.target.dataset.key;
  if (key == "back") {
    __goBackFunction();
  } else {
    search(__that.data.wxSearchData.value);
  }
}

function search(inputValue) {
  if (inputValue && inputValue.length > 0) {
    //添加缓存到历史记录
    wxSearchAddHisKey(inputValue);

    var temData = __that.data.wxSearchData;
    temData.value = inputValue;
    __that.setData({
      wxSearchData: temData
    });
    //回调搜索
    __searchFunction(inputValue);
  }
}

//读取缓存
function getHisKeys() {
  let value = [];
  try {
    value = wx.getStorageSync("wxSearchHisKeys")
    if (value) {
      let temData = __that.data.wxSearchData;
      temData.his = value;
      __that.setData({
        wxSearchData: temData
      })
    }
  } catch (e) {
    console.log(e)
  }
}

//添加缓存
function wxSearchAddHisKey(inputValue) {
  if (!inputValue || inputValue.length == 0) {
    return;
  }
  let value = wx.getStorageSync('wxSearchHisKeys');
  if (value) {
    if (value.indexOf(inputValue) < 0) {
      value.unshift(inputValue);
    }
    wx.setStorage({
      data: value,
      key: 'wxSearchHisKeys',
      success: () => {
        getHisKeys(__that)
      }
    })
  }else{
    value=[];
    value.push(inputValue);
    wx.setStorage({
      data: value,
      key: 'wxSearchHisKeys',
      success:function(){
        getHisKeys(__that);
      }
    })
  }
}

//删除缓存
function wxSearchDeleteAll() {
  wx.removeStorage({
    key: 'wxSearchHisKeys',
    success: res => {
      let value = []
      let temData = __that.data.wxSearchData;
      temData.his = value;
      __that.setData({
        wxSearchData: temData
      })
    }
  })
}


module.exports = {
  init: init,
  wxSearchInput: wxSearchInput,
  wxSearchKeyTap: wxSearchKeyTap,
  wxSearchDeleteAll: wxSearchDeleteAll,
  wxSearchConfirm: wxSearchConfirm,
  wxSearchClear: wxSearchClear
}
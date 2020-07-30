var host = "https://herbs.ayatsuji.top:8081/";
function httpGet(url, params, success, fail) {
  request(url, params, "GET", success, fail)
}
function httpPost(url, params, success, fail) {
  request(url, params, "POST", success, fail)
}

function request(url, params, method, success, fail) {
  wx.request({
    url: host + url,
    data: params,
    method: method,
    success: res => {
      if (res.data.code == 200) {
        // 响应正常就直接传入data
        success(res.data.data);
      } else {
        // 否则就传入整个响应，在fail中根据code执行操作
        fail(res.data)
      }
    },
    fail: res => {
      console.log(res)
    }
  })
}

module.exports = {
  post: httpPost,
  get: httpGet,
}
var app = getApp()

function post(params) {
  wx.request({
    url: params.url,
    data: params.data,
    header: { 'Content-Type': 'application/json' },
    method: 'POST',
    dataType: 'txt',
    success: function (res) {
      if (params.success != undefined) {
        params.success(res)
      }
      var model = JSON.parse(res.data)

      if (model.code == '000002') {
        // token失效
        wx.showModal({
          title: '',
          content: '账号在另一设备上被注销，请重新登录',
          showCancel: false,
          success: function (res) {
            app.globalData.wsjUserInfo = null
            // delete user data
            wx.removeStorageSync('wsjUserInfo')

            var root = ''
            var pages = getCurrentPages()
            if (pages.length > 0) {
              console.log(pages[pages.length - 1].route)
              var paths = pages[pages.length - 1].route.split('\/')
              for (var i = 1; i< paths.length; i++) {
                root += '../'
              }
            }

            wx.redirectTo({
                url: root + 'pages/login/login',
            })
          }
        })
      }
    },
    fail: function (res) {
      if (params.fail != undefined) {
        params.fail(res)
      }

      wx.showModal({
        title: '',
        showCancel: false,
        content: '网络异常，请稍后重试',
      })
    },
    complete: function (res) {
      if (params.complete != undefined) {
        params.complete(res)
      }
    }
  })
}

function get(params) {
  wx.request({
    url: params.url,
    data: params.data,
    header: { 'Content-Type': 'application/json' },
    method: 'GET',
    dataType: 'txt',
    success: function (res) {
      if (params.success != undefined){
        params.success(res)
      }
    },
    fail: function (res) {
      if (params.fail != undefined){
        params.fail(res)
      }
    },
    complete: function (res) {
      if (params.complete != undefined){
        params.complete(res)
      }
    }
  })
}

module.exports = {
  post: post,
  get: get
}
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
    },
    fail: function (res) {
      if (params.fail != undefined) {
        params.fail(res)
      }
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
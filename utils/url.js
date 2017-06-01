var app = getApp()

function init(root, path, version) {
  var url = ''

  function getURL(token) {
    if (token === undefined) {
      url = root + '/' + path
    } else if (token === null) {
      url = root + '/' + path + (version == undefined ? '/1.0?token=' : '/' + version + '?token=') + '(null)'
    } else {
      url = root + '/' + path + (version == undefined ? '/1.0?token=' : '/' + version + '?token=') + token
    }
    return url
  }
  return {
    getURL: getURL
  }
}

function getSYSTEM(){
  if (app.globalData.wsjUserInfo != null || app.globalData.wsjUserInfo != undefined) {
    return {
      "system": "02",
      "imei": "2EB8A25A-AA83-4BA0-80AB-ABC035F674B0",
      "currentVersion": "1.0.5",
      "model": "iPhone 6 (A1549\/A1586)",
      "inteVersion": "1.2.3",
      "systemVersion": "10.0.2",
      "sig": "0000000000",
      "siteId": app.globalData.wsjUserInfo.siteId,
      "userId": app.globalData.wsjUserInfo.userId
    }
  } else {
    return {
      "system": "02",
      "imei": "2EB8A25A-AA83-4BA0-80AB-ABC035F674B0",
      "currentVersion": "1.0.5",
      "model": "iPhone 6 (A1549\/A1586)",
      "inteVersion": "1.2.3",
      "systemVersion": "10.0.2",
      "sig": "0000000000"
    }
  }
}

module.exports = {
  init: init,
  getSYSTEM: getSYSTEM,

  // urlRoot: 'http://172.31.60.189/wsj/m',
  urlRoot: 'http://www.jointem.com/wsj/m/',

  urlGetAppVersion: 'sys/getAppVersion',
  urlLogin: 'login/login',
  urlAutoLogin: 'login/appAutoLogin',
  urlLogout: 'login/appLogout',
  urlGetGoodsOrderList: 'store/order/getOrderList',
  urlGetOrderDetails: 'store/order/getOrderDetails',
  urlgetLogisticsList: 'store/order/getLogisticsList',
  urlSaveLogisticsInfo: 'store/order/saveLogisticsInfo',
  urlGetReplyList: 'store/order/getReplyList',
  urlAddReplay: 'store/order/addReply',
  urlGetGoodsList: 'store/prd/getPrdList',
  urlUpdateGoodsInfo: 'store/prd/updatePrdInfo',
  urlGetCousumeList: 'store/consume/getConsumeList',
  urlValidateConsume: 'store/consume/validateConsume',
  urlGetListByType: 'store/coupon/getListByType',
  urlGetCouponInfo: 'store/coupon/getCouponInfo',
  urlGetListByStatus: 'store/coupon/getListByStatus',
  urlUseConsumCoupon: 'store/consume/useConsumeVolume',
  urlUseDiscountCoupon: 'store/coupon/useCouponVolume'
}
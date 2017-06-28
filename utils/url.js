var app = getApp()

function init(root, path, version) {
  var url = ''

  function getURL(token) {
    if (token === undefined) {
      url = root + '/' + path
    } else if (token === null) {
      url = root + '/' + path + (version == undefined ? '?token=' : '/' + version + '?token=') + '(null)'
    } else {
      url = root + '/' + path + (version == undefined ? '?token=' : '/' + version + '?token=') + token
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

  urlRoot: 'http://www.jointem.com/wsj',
  urlTestRoot: 'http://172.31.60.189/wsj',

  urlGetConfig: 'public/getConfig',
  urlGetAppVersion: 'sys/getAppVersion',
  urlLogin: 'm/login/login',
  urlAutoLogin: 'm/login/appAutoLogin',
  urlLogout: 'm/login/appLogout',
  urlGetGoodsOrderList: 'm/store/order/getOrderList',
  urlGetOrderDetails: 'm/store/order/getOrderDetails',
  urlgetLogisticsList: 'm/store/order/getLogisticsList',
  urlSaveLogisticsInfo: 'm/store/order/saveLogisticsInfo',
  urlGetReplyList: 'm/store/order/getReplyList',
  urlAddReplay: 'm/store/order/addReply',
  urlGetGoodsList: 'm/store/prd/getPrdList',
  urlUpdateGoodsInfo: 'm/store/prd/updatePrdInfo',
  urlGetCousumeList: 'm/store/consume/getConsumeList',
  urlValidateConsume: 'm/store/consume/validateConsume',
  urlGetListByType: 'm/store/coupon/getListByType',
  urlGetCouponInfo: 'm/store/coupon/getCouponInfo',
  urlGetListByStatus: 'm/store/coupon/getListByStatus',
  urlUseConsumCoupon: 'm/store/consume/useConsumeVolume',
  urlUseDiscountCoupon: 'm/store/coupon/useCouponVolume'
}
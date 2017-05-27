// fillLogisticsInfo.js
var root = '../../../../'
var util = require(root + 'utils/util')
var URL = require(root + 'utils/url')
var networkManager = require(root + 'utils/networkManager')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logisticsList: [],
    logisticsStrArr: [],
    orderId: '',
    index: 3,
    logisticsName: '',
    logisticsURL: '',
    logisticsCode: '',
    // btnDisabled: false,
    btnLoading: false,
    imgRightArrow: root + 'resource/onlineStore/goodsOrder/dongt@2x.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.orderId)

    this.orderId = options.orderId

    var _this = this
    var params = URL.getSYSTEM()

    params['pageNum'] = '1'
    params['pageSize'] = '100'

    networkManager.post({
      url: URL.init(URL.urlRoot, URL.urlgetLogisticsList).getURL(app.globalData.wsjUserInfo.token),
      data: params,
      success: function (res) {
        var model = JSON.parse(res.data)

        if ('000000' == model.code) {
          console.log(util.obj2string(model.data))
          var array = [];

          for (var index in model.data.logisticsList) {
            array.push(model.data.logisticsList[index].companyName)
          }

          _this.setData({
            logisticsStrArr: array,
            logisticsList: model.data.logisticsList
          })
        } else {
          _this.logisticsList = []
          wx.showToast({
            title: model.msg,
            image: root + 'resource/common/gb@2x.png',
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 监听普通picker选择器
   */
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value,
      logisticsName: this.data.logisticsList[e.detail.value].companyName,
      logisticsURL: this.data.logisticsList[e.detail.value].companyUrl
    });
  },

  isValidParameters: function () {
    if (this.data.logisticsName.length > 0 && this.data.logisticsURL.length > 0
      && this.data.logisticsCode.length > 0) {
      return true
    } else {
      return false
    }
  },

  logisticsNameInputHandler: function (event) {
    this.setData({
      logisticsName: event.detail.value
    })
  },

  logisticsURLInputHandler: function (event) {
    this.setData({
      logisticsURL: event.detail.value
    })
  },

  logisticsCodeInputHandler: function (event) {
    this.setData({
      logisticsCode: event.detail.value
    })
  },

  tapSubmitHandler: function (event) {
    if (!this.isValidParameters()) {
      wx.showToast({
        title: '参数不合法',
        image: root + 'resource/common/gb@2x.png',
        duration: 2000
      })
    } else {
      var _this = this

      var params = URL.getSYSTEM()

      params['logisticsCode'] = this.data.logisticsCode
      params['orderId'] = this.data.orderId
      params['companyUrl'] = this.data.logisticsURL
      params['companyName'] = this.data.logisticsName

      networkManager.postByJson({
        url: URL.init(URL.urlRoot, URL.urlSaveLogisticsInfo).getURL(app.globalData.wsjUserInfo.token),
        data: params,
        success: function (res) {
          // var model = JSON.parse(res.data)

          // if ('000000' == res['code']) {
          //   console.log(util.obj2string(model.data))

          //   wx.showToast({
          //     title: '发货成功',
          //     icon: 'success',
          //     duration: 2000
          //   })

          //   wx.navigateBack({

          //   })
          // } else {
          //   wx.showToast({
          //     title: model.msg,
          //     image: root + 'resource/common/gb@2x.png',
          //     duration: 2000
          //   })
          // }
          console.log(res)
        }
      })
    }
  }
})
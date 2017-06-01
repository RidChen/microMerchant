// discountConfirm.js
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
    userCouponId: '',
    couponCode: '',
    couponName: '',
    couponStatus: '',
    userMobile: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userCouponId: options.userCouponId,
      couponCode: options.couponCode,
      couponName: options.couponName,
      couponStatus: options.couponStatus == '0' ? '未使用' : (options.couponStatus == '1' ? '已使用' : '已失效'),
      userMobile: options.userMobile,
      btnDisabled: options.couponStatus == '0' ? false : true
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

  tapConfirmButton: function (event) {
    if (this.data.status == '未使用') {
      var params = URL.getSYSTEM();

      params["userCouponId"] = this.data.userCouponId

      wx.showLoading({
        title: '',
        mask: true
      })

      var _this = this
      networkManager.post({
        url: URL.init(URL.urlRoot, URL.urlUseDiscountCoupon).getURL(app.globalData.wsjUserInfo.token),
        data: params,
        success: function (res) {
          var model = JSON.parse(res.data)

          if (model.data != undefined) {
            console.log(util.obj2string(model.data))
          } else {
            console.log(model)
          }

          if ('000000' == model.code) {
            wx.showModal({
              title: '',
              content: '消费券使用成功',
              showCancel: false,
              success: function (res) {
                wx.navigateBack()
              }
            })
          } else {
            wx.showModal({
              title: '',
              content: model.msg,
              showCancel: false
            })
          }
        },
        complete: function (res) {
          wx.hideLoading()
        }
      })
    } else {
      wx.showToast({
        title: '消费券' + this.data.status,
        image: root + 'resource/common/gb@2x.png',
        duration: 2000
      })
    }
  }
})
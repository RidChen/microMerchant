// homePage.js
var root = '../../'
var util = require(root + 'utils/util')
var URL = require(root + 'utils/url')
var networkManager = require(root + 'utils/networkManager')

var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {
        id: 'order',
        src: root + 'resource/onlineStore/dingdan@2x.png',
        auth: 'ROLE_STORE_TO_STORE_ORDER',
        hidden: true
      },
      {
        id: 'product',
        src: root + 'resource/onlineStore/guanli@2x.png',
        auth: 'ROLE_STORE_PRODUCT',
        hidden: true
      },
      {
        id: 'consume',
        src: root + 'resource/onlineStore/xiaofei@2x.png',
        auth: 'ROLE_STORE_CONSUME',
        hidden: true
      },
      {
        id: 'coupon',
        src: root + 'resource/onlineStore/dayouhui@2x.png',
        auth: 'ROLE_COUPON_MANAGE',
        hidden: true
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.wsjUserInfo != undefined) {
      console.log(util.obj2string(app.globalData.wsjUserInfo))
    } else {
      console.log(app.globalData.wsjUserInfo)
    }

    if (app.globalData.wsjUserInfo != undefined) {
      for (var i = 0; i < this.data.items.length; i++) {
        for (var j = 0; j < app.globalData.wsjUserInfo.auth.length; j++) {
          if (this.data.items[i].auth == app.globalData.wsjUserInfo.auth[j]) {
            this.data.items[i].hidden = false
          }
        }
      }
      this.setData({
        items: this.data.items
      })
    }
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  tapHandler: function (event) {
    console.log(event.currentTarget.id)
    var destination;

    switch (event.currentTarget.id) {
      case 'order':
        destination = root + 'pages/homePage/goodsOrder/goodsOrder'
        break

      case 'product':
        destination = root + 'pages/homePage/goodsManagement/goodsManagement'
        break

      case 'consume':
        destination = root + 'pages/homePage/consumptionCoupon/consumptionCoupon'
        break

      case 'coupon':
        destination = root + 'pages/homePage/discountCoupon/discountCoupon'
        break

      default:
        break
    }

    if (destination != undefined) {
      wx.navigateTo({
        url: destination
      })
    }
  }
})
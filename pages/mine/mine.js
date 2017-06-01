// mine.js
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
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.wsjUserInfo != undefined){
      this.setData({
        name: app.globalData.wsjUserInfo.username
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

  tapLogoutButton: function(e) {
    wx.showModal({
      title: '',
      content: '确认退出登录',
      success: function(res) {
        if (res.confirm) {
          var _this = this
          networkManager.post({
            url: URL.init(URL.urlRoot, URL.urlLogout).getURL(app.globalData.wsjUserInfo.token),
            data: URL.getSYSTEM(),
            success: function (res) {
              var model = JSON.parse(res.data)
              if ('000000' == model.code) {
                app.globalData.wsjUserInfo = null
                // delete user data
                wx.removeStorageSync('wsjUserInfo')
                wx.showToast({
                  title: model.msg,
                  icon: 'success',
                  duration: 2000,
                  mask: true,
                  complete: function (res) {
                    wx.redirectTo({
                      url: root + 'pages/login/login',
                    })
                  }
                })
              } else {
                wx.showToast({
                  title: model.msg,
                  image: root + 'resource/common/gb@2x.png',
                  duration: 2000,
                  mask: true,
                })
              }
            },
          })
        }
      }
    })
  }
})
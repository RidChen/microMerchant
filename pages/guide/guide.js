// guide.js
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
    src: root + 'resource/guide/1136.png',
    animationData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    app.globalData.wsjUserInfo = wx.getStorageSync('wsjUserInfo')
    var _this = this

    // var animation = wx.createAnimation({
    //   duration: 1500,
    //   timingFunction: "linear"
    // })
    // this.animation = animation
    // this.animation.opacity(0).step()
    // _this.setData({
    //   animationData: animation.export()
    // })

    setTimeout(function(){
      if (app.globalData.wsjUserInfo == undefined || app.globalData.wsjUserInfo == "") {
        wx.navigateTo({
          url: root + 'pages/login/login',
        })
      } else {
        console.log(util.obj2string(app.globalData.wsjUserInfo))

        var params = URL.getSYSTEM()

        networkManager.post({
          url: URL.init(URL.urlRoot, URL.urlAutoLogin).getURL(app.globalData.wsjUserInfo.token),
          data: params,
          success: function (res) {
            // console.log(util.obj2string(res.data))
            var model = JSON.parse(res.data)
            if ('000000' == model.code) {
              wx.switchTab({
                url: root + 'pages/homePage/homePage'
              })
            } else {
              wx.showToast({
                title: model.msg,
                image: root + 'resource/common/gb@2x.png',
                duration: 2000
              })
              wx.navigateTo({
                url: root + 'pages/login/login',
              })
            }
          },
          complete: function (res) {
            _this.setData({
              loading: !_this.data.loading
            })
          },
        })
      }
    }.bind(this), 1500)
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
  
  }
})
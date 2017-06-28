// login.js
var root = '../../'
var util = require(root + 'utils/util')
var URL = require(root + 'utils/url')
var networkManager = require(root + 'utils/networkManager')
var encryption = require(root + 'utils/des')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo: root + 'resource/login/weishangjia@2x.png',
    bgImage: root + 'resource/login/beijing@2x.png',
    toastText: '',
    loading: false,
    disabled: false,
    //秘钥
    key: '123456789012345678901234',
    //向量
    iv: '01234567'
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

  formSubmit: function (e) {
    console.log(e.detail.value);

    //获得表单数据
    var objData = e.detail.value;

    if (objData.userName && objData.userPassword) {
      this.setData({
        loading: !this.data.loading,
        disable: !this.data.disable
      })

      var _this = this
      networkManager.post({
        url: URL.init(URL.urlRoot, URL.urlLogin).getURL(),
        data: {
          'username': objData.userName,
          'password': encryption.base64encode(encryption.des(this.data.key, objData.userPassword, 1, 1, this.data.iv, 1))
        },
        success: function (res) {
          // console.log(util.obj2string(res.data))
          var model = JSON.parse(res.data)
          if ('000000' == model.code) {
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000,
              mask: true,
              complete: function (res) {
                wx.switchTab({
                  url: root + 'pages/homePage/homePage'
                })
              }
            })
            // save user data
            app.globalData.wsjUserInfo = model.data
            wx.setStorage({
              key: "wsjUserInfo",
              data: model.data
            })
          } else {
            wx.showToast({
              title: '登录失败',
              image: root + 'resource/common/gb@2x.png',
              duration: 2000,
              mask: true,
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
  }
})
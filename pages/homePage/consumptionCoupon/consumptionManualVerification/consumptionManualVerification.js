// manualVerification.js
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
    touchStartTime: 0,
    touchEndTime: 0,
    verificationData: {
      root: root,
      inputValue: '输入消费码进行验证',
      textAlign: 'center',
      isCleanButtonHidden: true,
    }
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

  tapNumber: function (e) {
    console.log('touch number ' + e.currentTarget.id)

    if (this.data.verificationData.inputValue == '输入消费码进行验证') {
      this.data.verificationData.inputValue = e.currentTarget.id;
    } else {
      this.data.verificationData.inputValue += e.currentTarget.id;
    }

    this.setData({
      verificationData: {
        inputValue: util.formatCouponCode(this.data.verificationData.inputValue),
        textAlign: 'left',
        isCleanButtonHidden: false
      }
    })
  },

  tapClean: function (e) {
    //触摸时间距离页面打开的毫秒数
    var touchTime = this.data.touchEndTime - this.data.touchStartTime
    //如果按下时间大于350为长按 
    if (touchTime > 350) {
      this.setData({
        verificationData: {
          inputValue: '输入消费码进行验证',
          textAlign: 'center',
          isCleanButtonHidden: true
        }
      })
    } else {
      if (this.data.verificationData.inputValue.length > 0) {
        var newStr = this.data.verificationData.inputValue.replace(/\s/g, '')
        var isHidden = false
        var align = 'left'

        if (newStr.length == 1) {
          newStr = '输入消费码进行验证'
          isHidden = true
          align = 'center'
        } else {
          newStr = newStr.substring(0, newStr.length - 1)
          newStr = util.formatCouponCode(newStr)
        }
        this.setData({
          verificationData: {
            inputValue: newStr,
            textAlign: align,
            isCleanButtonHidden: isHidden
          }
        })
      }
    }
  },

  touchStart: function (e) {
    this.setData({
      touchStartTime: e.timeStamp
    })
  },

  touchEnd: function (e) {
    this.setData({
      touchEndTime: e.timeStamp
    })
  },

  tapSubmit: function (e) {
    if (this.data.verificationData.inputValue.length > 0) {
      var params = URL.getSYSTEM();

      params["consumeCode"] = this.data.verificationData.inputValue.replace(/\s/g, '')

      wx.showLoading({
        title: '',
        mask: true
      })

      var _this = this
      networkManager.post({
        url: URL.init(URL.urlRoot, URL.urlValidateConsume).getURL(app.globalData.wsjUserInfo.token),
        data: params,
        success: function (res) {
          var model = JSON.parse(res.data)

          if (model.data != undefined) {
            console.log(util.obj2string(model.data))
          } else {
            console.log(model)
          }

          if ('000000' == model.code) {
            wx.navigateTo({
              url: root + 'pages/homePage/consumptionCoupon/consumptionConfirm/consumptionConfirm' +
              "?status=" + model.data.status +
              "&&orderCode=" + model.data.orderCode +
              "&&consumerCode=" + model.data.consumerCode +
              "&&buyTime=" + model.data.buyTime +
              "&&consumeId=" + model.data.consumeId +
              "&&orderUserId" + model.data.orderUserId +
              "&&prdName=" + model.data.prdName +
              "&&prdNum=" + model.data.prdNum +
              "&&totalPrice=" + model.data.totalPrice +
              "&&mobile=" + model.data.mobile
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
        title: '请输入正确的消费码',
        image: root + 'resource/common/gb@2x.png',
        duration: 2000
      })
    }
  }
})
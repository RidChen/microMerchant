// consumptionCoupon.js
var root = '../../../'
var util = require(root + 'utils/util')
var URL = require(root + 'utils/url')
var networkManager = require(root + 'utils/networkManager')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      barButtons: [
        {
          id: "unused",
          title: "未使用",
          count: 0,
          selected: true
        },
        {
          id: "used",
          title: "已使用",
          count: 0,
          selected: false
        },
        {
          id: "cancelled",
          title: "已作废",
          count: 0,
          selected: false
        }
      ]
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

  tapHandler: function (event) {
    console.log(event.currentTarget.id)

    var status

    switch (event.currentTarget.id) {
      case 'unused':
        status = '0'
        break

      case 'used':
        status = '1'
        break

      case 'cancelled':
        status = '2'
        break

      default:
        break
    }

    if (status != undefined) {
      for (var index = 0; index < this.data.barButtons.length; index++) {
        if (this.data.barButtons[index].id == event.currentTarget.id) {
          this.data.barButtons[index].selected = true
        } else {
          this.data.barButtons[index].selected = false
        }
      }

      this.data.currentPageStatus = status;

      this.setData({
        barButtons: this.data.barButtons
      })

      // this.data.pageNum = 1
      // this.getGoodsList(1, status)
    }
  },

  tapNoDataHandler: function (event) {
    console.log(event.currentTarget.id)

    // this.data.pageNum = 1
    // this.getGoodsList(1, this.data.currentPageStatus)
  }
})
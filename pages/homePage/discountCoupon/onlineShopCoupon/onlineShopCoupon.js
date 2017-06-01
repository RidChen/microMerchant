// onlineShopCoupon.js
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
    couponStatus: '1',
    couponId: '0',
    barButtons: [
      {
        id: "unused",
        title: "未使用",
        count: '0',
        selected: true
      },
      {
        id: "invalid",
        title: "已失效",
        count: '0',
        selected: false
      }
    ],
    pageNum: 1,
    totalPage: 1,
    currentPageStatus: '0',
    root: root,
    tableData: {
      root: root,
      isStarHidden: true,
      isSendHidden: true,
      footerText: '',
      scrollTop: 0,
      dataList: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('couponId=' + options.couponId + ', couponStatus=' + options.status)
    this.setData({
      couponId: options.couponId,
      couponStatus: options.status
    })

    this.getDiscountCouponInfo(1, options.couponId, options.status)
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

  getDiscountCouponInfo: function (pageNum, couponId, couponStatus) {
    this.data.pageNum = pageNum <= this.data.totalPage ? pageNum : 1

    var params = URL.getSYSTEM();

    params["pageNum"] = "" + this.data.pageNum
    params["pageSize"] = "" + 20
    params["couponStatus"] = couponStatus
    params["couponId"] = couponId

    wx.showLoading({
      title: '',
      mask: true
    })

    var _this = this
    networkManager.post({
      url: URL.init(URL.urlRoot, URL.urlGetListByStatus).getURL(app.globalData.wsjUserInfo.token),
      data: params,
      success: function (res) {
        var model = JSON.parse(res.data)

        if (model.data != undefined) {
          console.log(util.obj2string(model.data))
        } else {
          console.log(model)
        }

        if ('000000' == model.code) {
          _this.data.totalPage = parseInt(model.data.totalPage)
          _this.data.barButtons[0].count = model.data.stateDescription.noUsecouPonNum
          _this.data.barButtons[1].count = model.data.stateDescription.lapsedNum

          var footer = (_this.data.pageNum == _this.data.totalPage) ? '加载完成' : '正在加载更多数据...'

          if (this.data.pageNum == 1) {
            _this.setData({
              barButtons: _this.data.barButtons,
              tableData: {
                root: root,
                dataList: model.data.userCouponList,
                scrollTop: 0,
                footerText: footer
              }
            })
          } else {
            if (model.data.userCouponList != undefined) {
              _this.data.tableData.dataList = _this.data.tableData.dataList.concat(model.data.userCouponList)
              _this.setData({
                barButtons: _this.data.barButtons,
                tableData: {
                  root: root,
                  dataList: _this.data.tableData.dataList,
                  footerText: footer
                }
              })
            }
          }
        } else {
          _this.data.tableData.dataList = []
          wx.showToast({
            title: model.msg,
            image: root + 'resource/common/gb@2x.png',
            duration: 2000
          })
        }
      },
      complete: function (res) {
        wx.hideLoading()
        // wx.stopPullDownRefresh()
      }
    })
  },

  pullUpToTheBottom: function (event) {
    if (this.data.pageNum < this.data.totalPage) {
      this.getDiscountInfo(++this.data.pageNum, this.data.currentPageStatus)
    }
  },

  tapHandler: function (event) {
    console.log(event.currentTarget.id)

    var status = ''

    switch (event.currentTarget.id) {
      case 'unused':
        status = '0'
        break

      case 'invalid':
        status = '1'
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
        barButtons: this.data.barButtons,
      })

      this.getDiscountCouponInfo(1, this.data.couponId, status)
    }
  },

  tapNoDataHandler: function (event) {
    console.log(event.currentTarget.id)

    this.getDiscountCouponInfo(1, this.data.couponId, this.data.currentPageStatus)
  },

  tapScanButton: function (event) {
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res.errMsg)
        if (res.errMsg == 'scanCode:ok') {
          console.log(res.result)

          var result = JSON.parse(res.result)

          if (result.type == '1' && result.code != undefined
            && result.code.length != 0) {
            var params = URL.getSYSTEM();

            params["couponCode"] = result.code

            wx.showLoading({
              title: '',
              mask: true
            })

            var _this = this
            networkManager.post({
              url: URL.init(URL.urlRoot, URL.urlGetCouponInfo).getURL(app.globalData.wsjUserInfo.token),
              data: params,
              success: function (res) {
                var model = JSON.parse(res.data)

                if (model.data != undefined) {
                  console.log(util.obj2string(model.data))
                } else {
                  console.log(model)
                }

                if ('000000' == model.code) {

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
            wx.showModal({
              title: '',
              showCancel: false,
              content: '此二维码错误，不能接待。请与消费者确认提供的二维码是否正确'
            })
          }
        } else {
          wx.showModal({
            title: '',
            content: res.errMsg,
            showCancel: false
          })
        }
      }
    })
  },

  tapContactHandler: function (event) {
    console.log('tap contact button' + event.currentTarget.id)

    if (this.data.tableData.dataList[event.currentTarget.id].userMobile != undefined) {
      wx.makePhoneCall({
        phoneNumber: this.data.tableData.dataList[event.currentTarget.id].userMobile,
      })
    }
  },

  tapVerificationButton: function (event) {
    wx.navigateTo({
      url: root + 'pages/homePage/discountCoupon/discountManualVerification/discountManualVerification',
    })
  },

  tapCellHandler: function(event) {
    
  }
})
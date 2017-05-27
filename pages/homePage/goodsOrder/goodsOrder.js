// goodsOrder.js
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
        id: "unpaid",
        title: "待付款",
        count: 0,
        selected: true
      },
      {
        id: "unSend",
        title: "待发货",
        count: 0,
        selected: false
      },
      {
        id: "alreadySent",
        title: "已发货",
        count: 0,
        selected: false
      },
      {
        id: "unConmment",
        title: "待评价",
        count: 0,
        selected: false
      },
      {
        id: "finish",
        title: "已完成",
        count: 0,
        selected: false
      }
    ],

    tableData: {
      imgNoData: root + 'resource/onlineStore/goodsOrder/zwsj@2x.png',
      imgSend: root + 'resource/onlineStore/goodsOrder/fahuo@2x.png',
      imgContact: root + 'resource/onlineStore/goodsOrder/lianxi@2x.png',
      imgStar: root + 'resource/onlineStore/goodsOrder/xinxin@2x.png',
      isStarHidden: true,
      isSendHidden: true,
      footerText: '',
      scrollTop: 0,
      orderList: {}
    },

    pageNum: 1,
    totalPage: 1,
    currentPageStatus: '0',
    modelDataList: null,
  },

  getGoodsList: function (pageNum, orderStatus) {
    var params = URL.getSYSTEM();

    params["pageNum"] = "" + pageNum
    params["pageSize"] = "" + 20
    params["orderStatus"] = "" + orderStatus

    wx.showLoading({
      title: '',
      mask: true
    })

    var _this = this
    networkManager.post({
      url: URL.init(URL.urlRoot, URL.urlGetGoodsOrderList).getURL(app.globalData.wsjUserInfo.token),
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
          if (this.data.pageNum == 1) {
            _this.data.modelDataList = model.data
          } else {
            if (model.data.orderList != undefined) {
              _this.data.modelDataList.orderList = _this.data.modelDataList.orderList.concat(model.data.orderList)
            }
          }
        } else {
          _this.data.modelDataList = null
          wx.showToast({
            title: model.msg,
            image: root + 'resource/common/gb@2x.png',
            duration: 2000
          })
        }
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {
        wx.hideLoading()

        if (_this.data.modelDataList != null) {
          _this.data.barButtons[0].count = _this.data.modelDataList.stateDescription.waitPayNum
          _this.data.barButtons[1].count = _this.data.modelDataList.stateDescription.waitDeliveryNum
          _this.data.barButtons[2].count = _this.data.modelDataList.stateDescription.waitReceiptsNum
          _this.data.barButtons[3].count = _this.data.modelDataList.stateDescription.waitAssessNum
          _this.data.barButtons[4].count = _this.data.modelDataList.stateDescription.overNum

          _this.setData({
            barButtons: _this.data.barButtons
          })
        }

        var hasSendButton = orderStatus == '1' ? false : true
        var hasStarButton = orderStatus == '4' ? false : true

        if (_this.data.modelDataList != null && _this.data.modelDataList.orderList != null) {

          for (var index = 0; index < _this.data.modelDataList.orderList.length; index++) {
            if (_this.data.modelDataList.orderList[index].commentStar != undefined) {
              _this.data.modelDataList.orderList[index].commentStarNum = parseInt(_this.data.modelDataList.orderList[index].commentStar)
            }
          }

          var footer = (_this.data.pageNum == _this.data.totalPage) ? '加载完成' : '正在加载更多数据...'

          if (_this.data.pageNum == 1) {
            _this.setData({
              tableData: {
                isSendHidden: hasSendButton,
                isStarHidden: hasStarButton,
                barButtons: _this.data.tableData.barButtons,
                orderList: _this.data.modelDataList.orderList,
                scrollTop: 0,
                footerText: footer
              }
            })
          } else {
            _this.setData({
              tableData: {
                isSendHidden: hasSendButton,
                isStarHidden: hasStarButton,
                barButtons: _this.data.tableData.barButtons,
                orderList: _this.data.modelDataList.orderList,
                footerText: footer
              }
            })
          }
        } else {
          _this.setData({
            tableData: {
              isSendHidden: hasSendButton,
              isStarHidden: hasStarButton,
              barButtons: _this.data.barButtons,
              orderList: {},
              footerText: footer
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsList(1, 0)
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
    console.log('pull down')
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

  orderTableScroll: function (e) {
    console.log(e)
  },

  tapHandler: function (event) {
    console.log(event.currentTarget.id)

    var status

    switch (event.currentTarget.id) {
      case 'unpaid':
        status = '0'
        break

      case 'unSend':
        status = '1'
        break

      case 'alreadySent':
        status = '2'
        break

      case 'unConmment':
        status = '3'
        break

      case 'finish':
        status = '4'
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
        tableData: {
          barButtons: this.data.barButtons
        }
      })

      this.data.pageNum = 1
      this.getGoodsList(1, status)
    }
  },

  tapNoDataHandler: function (event) {
    console.log(event.currentTarget.id)

    this.data.pageNum = 1
    this.getGoodsList(1, this.data.currentPageStatus)
  },

  tapCellHandler: function (event) {
    console.log('tap the cell:' + event.currentTarget.id)

    if (this.data.modelDataList.orderList[event.currentTarget.id].prdId != undefined) {
      wx.navigateTo({
        url: root + 'pages/homePage/goodsOrder/goodsOrderDetails/goodsOrderDetails?prdId=' + this.data.modelDataList.orderList[event.currentTarget.id].prdId + '&&status=' + this.data.currentPageStatus,
      })
    }
  },

  tapSendHandler: function (event) {
    console.log('tap send button' + event.currentTarget.id)

    if (this.data.modelDataList.orderList[event.currentTarget.id].orderId != undefined) {
      wx.navigateTo({
        url: root + 'pages/homePage/goodsOrder/fillLogisticsInfo/fillLogisticsInfo?orderId=' + this.data.modelDataList.orderList[event.currentTarget.id].orderId,
      })
    }
  },

  tapContactHandler: function (event) {
    console.log('tap contact button' + event.currentTarget.id)

    if (this.data.modelDataList.orderList[event.currentTarget.id].userMobile != undefined) {
      wx.makePhoneCall({
        phoneNumber: this.data.modelDataList.orderList[event.currentTarget.id].userMobile,
      })
    }
  },

  pullUpToTheBottom: function (e) {
    if (this.data.pageNum < this.data.totalPage) {
      this.data.pageNum += 1
      this.getGoodsList(this.data.pageNum, this.data.currentPageStatus)
    }
  },

  pullDownToReload: function (e) {
    this.data.pageNum = 1
    this.getGoodsList(this.data.pageNum, this.data.currentPageStatus)
  }
})
// goodsOrderDetails.js
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
    orderInfo: {},
    accountInfo: {},
    logisticsInfo: {},
    commentInfos: {},
    replyList: {},
    isBasicHidden: true,
    isAccountHidden: true,
    isCommentHidden: true,
    isLogisticsHidden: true,
    isStarHidden: true,
    isReplyTableHidden: true,
    isReplyButtonHidden: true,
    prdId: '',
    imgStar: root + 'resource/onlineStore/goodsOrder/xinxin@2x.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.prdId)
    console.log(options.status)

    this.getOrderDetails(options.prdId)

    this.data.prdId = options.prdId

    if (options.status == "4") {
      this.getReplyList(options.prdId)
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

  getOrderDetails: function (prdId) {
    wx.showLoading({
      title: '',
    })

    var params = URL.getSYSTEM()

    params["prdId"] = prdId

    var _this = this

    networkManager.post({
      url: URL.init(URL.urlRoot, URL.urlGetOrderDetails).getURL(app.globalData.wsjUserInfo.token),
      data: params,
      success: function (res) {
        var model = JSON.parse(res.data)

        if ('000000' == model.code) {
          console.log(util.obj2string(model.data))

          var isBasicHidden = true
          var isAccountHidden = true
          var isLogisticsHidden = true
          var isCommentHidden = true

          var leftHeight = _this.data.windowHeight

          // 订单基本信息
          if (!util.isEmptyObject(model.data.orderInfo)) {
            isBasicHidden = false
            _this.data.orderInfo = model.data.orderInfo
            var status = parseInt(model.data.orderInfo.status)
            //0-待付款 1-待发货 2待收货 3待评价 4完成
            if (status < 5) {
              var strArr = ['待付款', '待发货', '待收货', '待评价', '完成']
              _this.data.orderInfo['statusStr'] = strArr[status]
            } else {
              _this.data.orderInfo['statusStr'] = '未知'
            }
          } else {
            _this.data.orderInfo = model.data.orderInfo
          }

          // 账户信息
          if (!util.isEmptyObject(model.data.accountInfo)) {
            isAccountHidden = false
          }

          // 物流信息
          if (!util.isEmptyObject(model.data.logisticsInfo)) {
            isLogisticsHidden = false
          }

          // 评价信息
          if (!util.isEmptyObject(model.data.commentInfos)) {
            isCommentHidden = false
            _this.data.commentInfos = model.data.commentInfos
            _this.data.commentInfos['commentStarNum'] = parseInt(_this.data.commentInfos.star)
          } else {
            _this.data.commentInfos = model.data.commentInfos
          }

          _this.setData({
            orderInfo: _this.data.orderInfo,
            logisticsInfo: model.data.logisticsInfo,
            commentInfos: _this.data.commentInfos,
            accountInfo: model.data.accountInfo,
            isBasicHidden: isBasicHidden,
            isAccountHidden: isAccountHidden,
            isLogisticsHidden: isLogisticsHidden,
            isCommentHidden: isCommentHidden,
            isReplyButtonHidden: false
          })

        } else {
          console.log(model)
          wx.showToast({
            title: model.msg,
            image: root + 'resource/common/gb@2x.png',
            duration: 2000
          })
          _this.data.orderInfo = {}
          _this.data.logisticsInfo = {}
          _this.data.commentInfos = {}
          _this.data.accountInfo = {}
        }
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  },

  getReplyList: function (prdId) {
    var _this = this
    var params = URL.getSYSTEM()

    params["prdId"] = prdId

    networkManager.post({
      url: URL.init(URL.urlRoot, URL.urlGetReplyList).getURL(app.globalData.wsjUserInfo.token),
      data: params,
      success: function (res) {
        var model = JSON.parse(res.data)

        if ('000000' == model.code) {
          if (model.data.replyList != undefined && model.data.replyList.length != 0) {
            console.log(util.obj2string(model.data))
            _this.data.replyList = model.data.replyList

            for (var index in _this.data.replyList) {
              _this.data.replyList[index]['date'] =
                util.dateDiff(new Date(_this.data.replyList[index].createTime))

              if (_this.data.replyList[index].type == '1') {
                _this.data.replyList[index].sendName = '我'
              }
            }

            _this.setData({
              replyList: _this.data.replyList,
              isReplyTableHidden: false
            })
          } else {
            console.log(model)
          }
        } else {
          console.log(res.data)
        }
      }
    })
  },

  tapReplyHandler: function (event) {
    if (event.detail.value.input == undefined || event.detail.value.input.length == 0) {
      wx.showToast({
        title: '评论内容不能为空',
        image: root + 'resource/common/gb@2x.png',
        duration: 2000,
        mask: true,
      })
    } else {
      var params = URL.getSYSTEM()

      params['commentId'] = this.data.commentInfos.commentId
      params['senderId'] = app.globalData.wsjUserInfo.userId
      params['type'] = '1'
      params['receiverId'] = '-1'
      params['replyContent'] = event.detail.value.input
      params['senderName'] = '店家回复'

      var _this = this

      networkManager.post({
        url: URL.init(URL.urlRoot, URL.urlAddReplay).getURL(app.globalData.wsjUserInfo.token),
        data: params,
        success: function (res) {
          var model = JSON.parse(res.data)

          if ('000000' == model.code) {
            console.log(util.obj2string(model.data))

            _this.setData({
              inputValue: ''
            })

            wx.showToast({
              title: '回复成功',
              icon: 'success',
              duration: 2000,
              success: function(res){
                _this.getReplyList(_this.data.prdId)
              }
            })

          } else {
            wx.showToast({
              title: model.msg,
              image: root + 'resource/common/gb@2x.png',
              duration: 2000
            })
          }
        }
      })
    }
  }
})
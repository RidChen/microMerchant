// goodsManagement.js
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
    goodsList: null,
    imgEdit: root + 'resource/onlineStore/goodsManagement/bianji@2x.png',
    totalPage: 1,
    pageNum: 1,
    pageSize: 20,
    footerText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsList(this.data.pageNum)
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
    this.data.pageNum = 1
    this.getGoodsList(this.data.pageNum)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.pageNum < this.data.totalPage) {
      this.data.pageNum += 1
      this.getGoodsList(this.data.pageNum)
    } else {
      this.setData({
        footerText: '加载完成'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  tapEditHandler: function (event) {
    // 0 - 统一规格; 1 - 多规格
    var index = parseInt(event.currentTarget.id)
    if (this.data.goodsList != undefined && index < this.data.goodsList.length) {
      var item = this.data.goodsList[index]
      if (item.standard == '0') {
        wx.navigateTo({
          url: root + 'pages/homePage/goodsManagement/editGoodsInfo/editGoodsInfo'
          + '?id=' + item.id + '&&name=' + item.name + '&&price=' + item.price + '&&totalStock=' + item.totalStock + '&&discount=' + item.discount,
        })
      } else {
        wx.showToast({
          title: '暂不支持多规格商品编辑功能',
        })
      }
    }
  },

  getGoodsList: function (pageNum) {
    var _this = this

    var params = URL.getSYSTEM()

    params['pageSize'] = '' + this.data.pageSize
    params['pageNum'] = '' + pageNum

    wx.showLoading({
      title: '',
    })

    networkManager.post({
      url: URL.init(URL.urlRoot, URL.urlGetGoodsList).getURL(app.globalData.wsjUserInfo.token),
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
          if (model.data.length != 0) {

            if (_this.data.pageNum > 1) {
              var footerStr =
                (_this.data.pageNum == _this.data.totoal) ? '加载完成' : '正在加载更多数据...'
              _this.data.goodsList = _this.data.goodsList.concat(model.data.prdList)
              _this.setData({
                goodsList: _this.data.goodsList,
                footerText: footerStr
              })
            } else {
              _this.setData({
                goodsList: model.data.prdList
              })
            }
          }
        } else {
          _this.data.goodsList = null
          wx.showToast({
            title: model.msg,
            image: root + 'resource/common/gb@2x.png',
            duration: 2000
          })
        }
      },
      fail: function (res) {

      },
      complete: function (res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  }
})
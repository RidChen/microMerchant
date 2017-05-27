// editGoodsInfo.js
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
    id: '',
    name: '',
    price: '',
    totalStock: '',
    discount: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      name: options.name,
      price: options.price,
      totalStock: options.totalStock,
      discount: options.discount
    })
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

  inputDiscount: function (event) {
    if (event.detail.value != '') {
      var value = parseFloat(event.detail.value)
      if (value < 10 && value >= 0) {
        this.setData({
          discount: event.detail.value
        })
      } else {
        this.setData({
          discount: this.data.discount
        })
      }
    } else {
      this.setData({
        discount: event.detail.value
      })
    }
  },

  tapSaveHandler: function (event) {
    console.log(event.detail.value)

    var item = event.detail.value
    if (item.name.length > 0 && item.price.length > 0 && item.totalStock > 0) {
      var params = URL.getSYSTEM()
      var _this = this

      params['id'] = this.data.id
      params['prdPrices'] = [{
        price: item.price,
        totalStock: item.totalStock,
        discount: item.discount
      }]
      // 后台兼容时需要
      params['doorId'] = app.globalData.wsjUserInfo.siteId
      params['name'] = item.name
      // discountType "优惠方式：0-不优惠，1-现金优惠，2-折扣优惠"
      params['discountType'] = (item.discount.length > 0 ? '2' : '0')

      networkManager.post({
        url: URL.init(URL.urlRoot, URL.urlUpdateGoodsInfo, '2.0').getURL(app.globalData.wsjUserInfo.token),
        data: params,
        success: function (res) {
          var model = JSON.parse(res.data)

          if (model.data != undefined) {
            console.log(util.obj2string(model.data))
          } else {
            console.log(model)
          }

          if ('000000' == model.code) {
            wx.showModal({
              title: '商品修改成功',
              showCancel: false,
              success: function(e){
                wx.navigateBack({})
              }
            })
          } else {
            _this.data.goodsList = null
            wx.showToast({
              title: model.msg,
              image: root + 'resource/common/gb@2x.png',
              duration: 2000
            })
          }
        }
      })
    } else {
      // 参数不完整
      wx.showModal({
        title: '信息不能为空',
        showCancel: false
      })
    }
  }
})
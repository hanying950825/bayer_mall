// pages/cart/trueOrder/trueOrder.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isEmpty: false,
    ownName: '韩莹',
    ownPhone: '173****6621',
    ownAdd: '江苏省南京市玄武区xxxx路xxx栋xx号cxdjfng',
    defaultAdd: {},
    iconStyle: 'arrow',
    goodsLength: '1', // 商品个数
    totalPrice: '4', // 总价
    postage: '0', // 邮费
    orderList: [],
    imageURL: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    showAdd: false
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
    this._fetchOrderDetail()
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

  // 获取商品信息
  _fetchOrderDetail() {
    const url = app.globalData.url
    const shopDetail = app.globalData.shopDetail
    const amount = app.globalData.amount
    const _this = this
    let data = {}
    console.log(shopDetail)
    if (shopDetail != {}) {
      const data = { goodsId: shopDetail.goodsId, productId: shopDetail.productId, amount: amount }
    }
    wx.request({
      url: url + '/user/order/confirmInfo',
      method: 'POST',
      data: data,
      success: function(data) {
        console.log(data.data.data)
        const res = data.data.data
        _this.setData({
          totalPrice: res.productTotalPrice,
          postage: res.postagePrice,
          orderList: res.orderItemList,
          defaultAdd: res.defaultAddress
        })
        app.globalData.defaultAdd = _this.data.defaultAdd
        if (_this.data.defaultAdd) {
          _this.setData({
            ownName: res.defaultAddress.name,
            ownPhone: res.defaultAddress.phone,
            ownAdd: res.defaultAddress.province + res.defaultAddress.city + res.defaultAddress.district + res.defaultAddress.address,
            showAdd: true
          })
        } else if (_this.data.defaultAdd == {}) {
          _this.setData({
            showAdd: false
          })
        }
      }
    })
  },
  // 去支付
  onSubmitOrder() {
    wx.navigateTo({
      url: '../success/success',
    })
  },

  // 切换地址
  onChangeAdd() {
    wx.navigateTo({
      url: '../../personal/address/address',
    })
  }
})
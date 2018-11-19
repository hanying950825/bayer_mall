// pages/cart/trueOrder/trueOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEmpty: false,
    ownName: '韩莹',
    ownPhone: '173****6621',
    ownAdd: '江苏省南京市玄武区xxxx路xxx栋xx号cxdjfng',
    iconStyle: 'arrow',
    goodsLength: '1', // 商品个数
    totalPrice: '4', // 总价
    postage: '0', // 邮费
    imageURL: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
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
  // 去支付
  onSubmitOrder() {
    wx.navigateTo({
      url: '../success/success',
    })
  }
})
// pages/personal/logistics/logistics.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    isShowList: true,
    isWaitPay: true,
    isWaitDeliver: true,
    isGoDeliver: true,
    isFinish: true,
    imageURL: '../../images/cart.png'
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
    this.setData({
      active: app.globalData.active
    })
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
  // 切换选项对应内容
  onChange(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.index + 1}`,
    //   icon: 'none'
    // });
  },
  // 去支付
  onGoPay() {
    wx.navigateTo({
      url: '../../cart/trueOrder/trueOrder',
    })
  },
  // 取消订单
  onCancelOrder() {
    wx.showModal({
      title: '取消订单',
      content: '您是否确定要取消该订单？',
      success: function() {
        console.log(111)
      }
    })
  },
  // 订单详情
  onOrderDetail() {
    wx.navigateTo({
      url: '../orderDetail/orderDetail',
    })
  },
  // 物流信息
  onPostMsg() {
    wx.navigateTo({
      url: '../postMsg/postMsg',
    })
  }
})
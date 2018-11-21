var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
    showAva: false,
    showLoginBtn: true,
    userInfo: {}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    const _this = this
    if (app.globalData.userInfo) {
      _this.setData({
        showAva: true,
        showLoginBtn: false,
        userInfo: app.globalData.userInfo
      })
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
  onLogin(data) {
    if (data.detail.userInfo) {
      this.setData({
        showAva: true,
        showLoginBtn: false,
        userInfo: data.detail.userInfo
      })
    }
    console.log(data.detail.userInfo)
  },
  // 跳转收藏
  onCollection() {
    wx.navigateTo({
      url: 'collection/collection',
    })
  },
  // 跳转到所有订单页
  onAllOrder() {
    app.globalData.active = 0
    wx.navigateTo({
      url: 'logistics/logistics',
    })
  },
  // 跳转到待支付页面
  onPay() {
    app.globalData.active = 1
    wx.navigateTo({
      url: 'logistics/logistics',
    })
  },
  // 跳转到待发货页面
  onWaitDeliver() {
    app.globalData.active = 2
    wx.navigateTo({
      url: 'logistics/logistics',
    })
  },
  // 跳转到已发货页面
  onDeliver() {
    app.globalData.active = 3
    wx.navigateTo({
      url: 'logistics/logistics',
    })
  },
  // 跳转到已完成页面
  onFinish() {
    app.globalData.active = 4
    wx.navigateTo({
      url: 'logistics/logistics',
    })
  },
  // 跳转地址管理
  onAddress() {
    wx.navigateTo({
      url: 'address/address',
    })
  },
  // 关于我们页面
  onAboutUs() {
    wx.navigateTo({
      url: 'aboutus/aboutus',
    })
  }
})
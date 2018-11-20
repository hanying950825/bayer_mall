// pages/home/home.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
    ],
		imageURL: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    console.log(options)
    console.log(app.globalData.userInfo)
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
  // 搜索结果列表
  onInputFocus() {
    app.globalData.isSearch = true
    app.globalData.isShowList = false
    wx.navigateTo({
      url: '../category/list/list',
    })
  },
  // 全部列表
  onAllList() {
    app.globalData.isSearch = true
    app.globalData.isShowList = true
    app.globalData.searchType = 'all'
    wx.navigateTo({
      url: `../category/list/list`,
    })
  },
  // 推荐列表
  onRecList() {
    app.globalData.isSearch = false
    app.globalData.isShowList = true
    app.globalData.searchType = 'recommend'
    wx.navigateTo({
      url: `../category/list/list`,
    })
  },
  // 新品列表
  onNewList() {
    app.globalData.isSearch = false
    app.globalData.isShowList = true
    app.globalData.searchType = 'new'
    wx.navigateTo({
      url: `../category/list/list`,
    })
  }
})
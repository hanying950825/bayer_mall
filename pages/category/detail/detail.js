// pages/category/detail/detail.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		indicatorDots: true,
		autoplay: true,
		interval: 2500,
		duration: 300,
    checked: true,
    icon: {
      normal: '../../../images/icon3.png',
      active: '../../../images/shoucang.png'
    },
		imgUrls: [
			'../../../images/buou6.jpg',
			'../../../images/buou5.jpg',
			'../../../images/buou4.jpg',
			'../../../images/buou3.jpg'
		],
		goodsTitle: '这是一直颜值巨高的布偶猫,很可爱呦~~',
		goodsPrice : 8888,
		goodsPrivilegePrice: 20000,
		goodsDetailImg:[
			'../../../images/buou5.jpg',
			'../../../images/buou.png',
			'../../../images/buou1.png',
			'../../../images/buou2.png',
			'../../../images/buou3.jpg',
			'../../../images/buou4.jpg',
			'../../../images/buou6.jpg'
		],
		info: 5
	},
	//预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
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
  onChange(event) {
    this.setData({
      checked: event.detail
    });
  }
})
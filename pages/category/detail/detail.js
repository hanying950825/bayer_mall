// pages/category/detail/detail.js
var app = getApp();
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
    stock: 100,
    show: false,
    btnColor: 'default',
    productList: [],
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
    this.onShopDetails()
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

  // 加载商品详情
  onShopDetails() {
    const url = app.globalData.url
    const shopDetail = app.globalData.shopDetail
    const data = { goodsId: shopDetail.id }
    const _this = this
    wx.request({
      url: url + '/mall/goods/detail',
      method: 'POST',
      data: data,
      success: function(res) {
        console.log(res.data.data)
        const result = res.data.data
        console.log(result.marketPrice)
        _this.setData({
          // imgUrls: result.subImages,
          goodsTitle: result.goodsName,
          goodsPrivilegePrice: result.retailPrice,
          goodsPrice: result.marketPrice,
          stock: result.stock,
          productList: result.productList
        })
      }
    })
  },

  // 加入购物车按钮
  onShoppingCart() {
    this.setData({
      show: true
    })
  },

  onClose() {
    this.setData({
      show: false
    })
  },

  onSaveShop() {
    this.setData({
      btnColor: 'danger'
    })
  },

  onChange(event) {
    this.setData({
      checked: event.detail
    });
  }
})
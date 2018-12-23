const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
	data: {
		active:0,
    isShowClassify: true,
    firstClassify: [],
    secClassify: []
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
    this.onClassify()
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

  onClassify() {
    const url = app.globalData.url
    const _this = this
    wx.request({
      url: url + '/mall/category/list/0',
      method: 'POST',
      success: function(data) {
        console.log(data.data.data[0].next)
        _this.setData({
          firstClassify: data.data.data,
          secClassify: data.data.data[0].next
        })
      }
    })
  },

  onChange(event) {
    console.log(event.detail)
    console.log(this.data.firstClassify[event.detail])
    this.setData({
      secClassify: this.data.firstClassify[event.detail].next
    })
  },
  onClassifyList(classify) {
    app.globalData.isSearch = false
    app.globalData.isShowList = true
    app.globalData.searchType = classify
    wx.navigateTo({
      url: `../category/list/list`,
    })
  },
  onShopsList(obj) {
    console.log(obj.target.dataset.id.id)
    app.globalData.categoryId = obj.target.dataset.id.id
    app.globalData.searchType = ''
    wx.navigateTo({
      url: 'list/list',
    })
  }
})

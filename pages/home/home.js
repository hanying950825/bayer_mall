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
    wx.login({
      success(data) {
        if (data.code) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: 'wxacbe5f1d59932ff7',
              js_code: data.code,
              secret: '270b17bc4e9dc93c343f35a1471f12da',
              grant_type: 'authorization_code'
              },
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: 'post',
            success(res) {
              console.log(res.data)

            }
          })
        }
      }
    })
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
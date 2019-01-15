// pages/home/home.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
    imgUrls: {},
    noticeText: {},
		list: [],
    count: 10,
    oParams: {
      page: 0,
      size: 10
    }
  },
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
    this._fetchBanner()
    this._fetchList()
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
    this._fetchList()
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},
  // 轮播广告等首页加载内容
  _fetchBanner() {
    const url = app.globalData.url
    const _this = this
    // 轮播
    wx.request({
      url: url + '/mall/banner/list',
      method: 'POST',
      success: function (data) {
        _this.setData({
          imgUrls: data.data.data
        })
      },
      fail: function (data) {
        wx.showModal({
          title: '提示',
          content: '加载失败！检查你的网络！'
        })
      }
    })
    // 广告提示
    wx.request({
      url: url + '/mall/notice/list/0-1',
      method: 'POST',
      success: function(data) {
        const notice = data.data.data.data
        let text = {}
        for (let i = 0; i<notice.length; i++) {
          text = notice[i]
        }
        _this.setData({
          noticeText: text.content
        })
      },
      fail: function (data) {
        wx.showModal({
          title: '提示',
          content: '加载失败！检查你的网络！'
        })
      }
    })
  },
  _fetchList() {
    const url = app.globalData.url
    const _this = this
    if (_this.data.count == 10) {
      // 热销列表
      wx.request({
        url: url + `/mall/goods/hotSales/${this.data.oParams.page}-${this.data.oParams.size}`,
        method: 'POST',
        success: function(data) {
          const res = data.data.data.data
          if (res.length > 0 || _this.data.list) {
            var momentList = _this.data.list
            for (var i = 0; i < res.length; i++) {
              momentList.push(res[i]);
            }
          }
          _this.setData({
            list: momentList,
            count: data.data.data.counts
          })
          let j = _this.data.oParams.page
          j++
          _this.setData({
            oParams: {
              page: j,
              size: 10
            }
          })
        },
        fail: function(data) {
          wx.showModal({
            title: '提示',
            content: '加载失败！检查你的网络！'
          })
        }
      })
    }
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
  },
  // 商品详情
  onDetails(obj) {
    app.globalData.shopDetail = obj.target.dataset.id
    wx.navigateTo({
      url: '../category/detail/detail',
    })
  }
})
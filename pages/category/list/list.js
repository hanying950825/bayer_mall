// pages/category/list/list.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowList: true,
    fixed: false,
    active: 0,
    isShowSearch: true,
    count: 10,
    searchValue: '',
    list: [],
    oParams: {
      page: 0,
      size: 10
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isShowSearch: app.globalData.isSearch,
      isShowList: app.globalData.isShowList
    })
    this._fetchList(this.data.active)
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
    this._fetchList(this.data.active)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  _fetchList(active) {
    const searchType = app.globalData.searchType
    const url = app.globalData.url
    const _this = this
    if (_this.data.count == 10) {
      if (searchType == 'recommend') {
        let data = {}
        data.page = _this.data.oParams.page
        data.size = _this.data.oParams.size
        data.recommend = true
        if (active == 1) {
          data.priceOrder = 'ASC'
        } else if (active == 2) {
          data.priceOrder = 'DESC'
        } else if (active == 3) {
          data.salesOrder = 'DESC'
        }
        wx.request({
          url: url + '/mall/goods/list',
          method: 'POST',
          data: data,
          success: function(data) {
            _this.setData({
              list: data.data.data.data,
              count:data.data.data.counts
            })
            let i = _this.data.oParams.page
            i++
            _this.setData({
              oParams: {
                page: i,
                size: 10
              }
            })
          },
          fail: function() {
            wx.showModal({
              title: '提示',
              content: '加载失败！检查你的网络！'
            })
          }
        })
      } else if (searchType == 'new') {
        let data = {}
        data.page = _this.data.oParams.page
        data.size = _this.data.oParams.size
        data.newGoods = true
        if (active == 1) {
          data.priceOrder = 'ASC'
        } else if (active == 2) {
          data.priceOrder = 'DESC'
        } else if (active == 3) {
          data.salesOrder = 'DESC'
        }
        wx.request({
          url: url + '/mall/goods/list',
          method: 'POST',
          data: data,
          success: function (data) {
            _this.setData({
              list: data.data.data.data,
              count: data.data.data.counts
            })
            let i = _this.data.oParams.page
            i++
            _this.setData({
              oParams: {
                page: i,
                size: 10
              }
            })
          },
          fail: function () {
            wx.showModal({
              title: '提示',
              content: '加载失败！检查你的网络！'
            })
          }
        })
      } else if (searchType == 'all') {
        let data = {}
        data.page = _this.data.oParams.page
        data.size = _this.data.oParams.size
        if (active == 1) {
          data.priceOrder = 'ASC'
        } else if (active == 2) {
          data.priceOrder = 'DESC'
        } else if (active == 3) {
          data.salesOrder = 'DESC'
        }
        wx.request({
          url: url + '/mall/goods/list',
          method: 'POST',
          data: data,
          success: function (data) {
            _this.setData({
              list: data.data.data.data,
              count: data.data.data.counts
            })
            let i = _this.data.oParams.page
            i++
            _this.setData({
              oParams: {
                page: i,
                size: 10
              }
            })
          },
          fail: function () {
            wx.showModal({
              title: '提示',
              content: '加载失败！检查你的网络！'
            })
          }
        })
      } else {
        let data = {}
        data.page = _this.data.oParams.page
        data.size = _this.data.oParams.size
        data.name = _this.data.searchValue
        if (active == 1) {
          data.priceOrder = 'ASC'
        } else if (active == 2) {
          data.priceOrder = 'DESC'
        } else if (active == 3) {
          data.salesOrder = 'DESC'
        }
        wx.request({
          url: url + '/mall/goods/list',
          method: 'POST',
          data: data,
          success: function (data) {
            _this.setData({
              list: data.data.data.data,
              count: data.data.data.counts
            })
            let i = _this.data.oParams.page
            i++
            _this.setData({
              oParams: {
                page: i,
                size: 10
              }
            })
          },
          fail: function () {
            wx.showModal({
              title: '提示',
              content: '加载失败！检查你的网络！'
            })
          }
        })
      }
    }
  },
  onChangeSearch(event) {
    const _this = this
    const url = app.globalData.url
    this.setData({
      oParams: {
        page: 0,
        size: 10
      }
    })
    _this.setData({
      isShowList: true,
      searchValue: event.detail
    })
    wx.request({
      url: url + '/mall/goods/list',
      method: 'POST',
      data: {
        page: _this.data.oParams.page,
        size: _this.data.oParams.size,
        name: event.detail
      },
      success: function (data) {
        _this.setData({
          list: data.data.data.data,
          count: data.data.data.counts
        })
        let i = _this.data.oParams.page
        i++
        _this.setData({
          oParams: {
            page: i,
            size: 10
          }
        })
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '加载失败！检查你的网络！'
        })
      }
    })
  },
  onChange(event) {
    this.setData({
      active: event.detail,
      count: 10,
      oParams: {
        page: 0,
        size: 10
      }
    })
    this._fetchList(this.data.active)
  }
})
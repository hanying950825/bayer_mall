// pages/personal/collection/collection.js
var Dialog = require('../../../dist/dialog/dialog')
import Toast from '../../../dist/toast/toast'
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShowList: true,
    isLogin: true,
    imageURL: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    oParams: {
      page: 0,
      size: 10
    },
    collectList: []
  },
	jumpToDetail: function(obj) {
    app.globalData.shopDetail = obj.target.dataset.id
    wx.navigateTo({
      url: '../../category/detail/detail',
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
    this.setData({
      oParams: {
        size: 10,
        page: 0,
        collectList: []
      }
    })
    this._fetchCollectList()
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
  // 去首页
  goHome() {
    wx.switchTab({
      url: '../../home/home',
    })
  },
  // 去登陆
  goLogin() {
    wx.switchTab({
      url: '../personal',
    })
  },

  // 右划点击删除按钮
  onClose(event) {
    const shops = event.target.dataset.id
    const { position, instance } = event.detail;
    const url = app.globalData.url
    const _this = this

    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        wx.showModal({
          title: '提示',
          content: '确定删除吗？',
          success: function (obj) {
            instance.close();
            if (obj.confirm) {
              wx.request({
                url: url + `/user/favorite/cancel/${shops.id}`,
                method: 'POST',
                data: { goodsId: shops.goodsId, productId: shops.productId },
                success: function (data) {
                  // const res = data.data.data
                  Toast.success({ mask: true, message: '删除成功！', duration: 1000 })
                  _this.setData({
                    oParams: {
                      size: 10,
                      page: 0,
                      collectList: []
                    }
                  })
                  _this._fetchCollectList()
                  
                }
              })
            }
          }
        })
        break;
    }
  },

  _fetchCollectList() {
    const url = app.globalData.url
    const _this = this
    wx.request({
      url: url + `/user/favorite/list/${_this.data.oParams.page}-${_this.data.oParams.size}`,
      method: 'POST',
      success: function(data) {
        const res = data.data.data.data
        if (res.length > 0 && _this.data.collectList) {
          var momentList = _this.data.collectList
          for (var i = 0; i < res.length; i++) {
            momentList.push(res[i]);
          }
          _this.setData({
            collectList: momentList,
            isShowList: true
          })
          _this.setData({
            oParams: {
              size: 10,
              page: _this.data.oParams.page + 1
            }
          })
        } else if (res.length <= 0 && _this.data.collectList.length == 0) {
          _this.setData({
            isShowList: false
          })
        }
      }
    })
  }
})
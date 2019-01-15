// pages/personal/address/address.js
var app = getApp();
import Toast from '../../../dist/toast/toast';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '张三',
    phone: '138****8888',
    address: '江苏省南京市玄武区孝陵卫街道双拜巷151号',
    isShow: true,
    adsList: [],
    oParams: {
      page: 0,
      size: 10
    }
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
    this._fetchAddress()
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
  // 删除
  onDelete(opt) {
    const id = opt.currentTarget.dataset.id
    console.log(id)
    const url = app.globalData.url
    const _this = this
    wx.showModal({
      title: '删除地址',
      content: '您是否确定删除该地址？',
      success: function(data) {
        if (data.confirm) {
          wx.request({
            url: url + `/user/address/delete/${id}`,
            method: 'POST',
            success: function(data) {
              Toast.success({ mask: true, message: '删除成功！', duration: 1000 })
              _this.setData({
                oParams: {
                  size: 10,
                  page: 0
                },
                adsList: []
              })
              _this._fetchAddress()
            }
          })
        }
      }
    })
  },
  // 编辑
  onEdit(opt) {
    console.log(opt)
  },
  // 设为默认
  onDefault(opt) {
    const id = opt.currentTarget.dataset.id
    console.log(id)
    const url = app.globalData.url
    const _this = this
    wx.showModal({
      title: '提示',
      content: '您是否确定设为默认地址？',
      success: function (data) {
        if (data.confirm) {
          wx.request({
            url: url + `/user/address/setDefault/${id}`,
            method: 'POST',
            success: function (data) {
              Toast.success({ mask: true, message: '已设为默认！', duration: 1000 })
              _this.setData({
                oParams: {
                  size: 10,
                  page: 0
                },
                adsList: []
              })
              _this._fetchAddress()
            }
          })
        }
      }
    })
  },
  // 添加地址
  onAddAddress() {
    wx.navigateTo({
      url: '../adsDetail/adsDetail',
    })
  },

  _fetchAddress() {
    const url = app.globalData.url
    const _this = this
    wx.request({
      url: url + `/user/address/list/${_this.data.oParams.page}-${_this.data.oParams.size}`,
      method: 'POST',
      success: function(data) {
        console.log(data)
        const res = data.data.data.data
        if (res.length > 0 && _this.data.adsList) {
          var momentList = _this.data.adsList
          for (var i = 0; i < res.length; i++) {
            momentList.push(res[i]);
          }
          _this.setData({
            adsList: momentList,
            isShow: true
          })
          _this.setData({
            oParams: {
              size: 10,
              page: _this.data.oParams.page + 1
            }
          })
        } else if (res.length <= 0 && _this.data.adsList.length == 0) {
          _this.setData({
            isShow: false
          })
        }
      }
    })
  }
})
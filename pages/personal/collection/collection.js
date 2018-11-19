// pages/personal/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowList: false,
    isShowNone: false,
    isLogin: false,
    imageURL: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
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
  }
})
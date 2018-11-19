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
    this.setData({
      isShowSearch: app.globalData.isSearch,
      isShowList: app.globalData.isShowList
    })
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
  onChangeSearch() {

  },
  onChange(event) {
    console.log(event.detail);
  }
})
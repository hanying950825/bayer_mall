// pages/personal/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '张三',
    phone: '138****8888',
    address: '江苏省南京市xx区西乡街道xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
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
  // 删除
  onDelete() {
    wx.showModal({
      title: '删除地址',
      content: '您是否确定删除该地址？',
      success: function(data) {
        console.log(111)
      }
    })
  },
  // 添加地址
  onAddAddress() {
    wx.navigateTo({
      url: '../adsDetail/adsDetail',
    })
  }
})
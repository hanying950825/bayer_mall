// pages/personal/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expressStatus: '您的快递已经到达xxxxxxxxxx',
    expresstime: '2018-1-1 11:11:11',
    expressName: '张三',
    expressPhone: ' 138****8888',
    expressAds: '江苏省南京市xx区xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    imageURL: '../../images/cart.png',
    totalPrice: '2',
    goodPrice: '1',
    postPrice: '2',
    serviceTime: '9:00-24:00',
    orderNum: '31231123',
    orderTime: '2018-1-1 11:11:11'
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
  // 复制订单编号
  onCopyNum() {
    wx.setClipboardData({
      data: this.data.orderNum,
      success(res) {
       wx.showToast({
         title: '复制成功！',
       })
      }
    })
  },
  // 删除订单
  onDelete() {
    wx.showModal({
      title: '删除订单',
      content: '您是否确认要删除该订单？',
      success: function() {
        
      }
    })
  }
})
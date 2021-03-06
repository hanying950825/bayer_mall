// pages/personal/orderDetail/orderDetail.js
const app = getApp()  
Page({
  /**
   * 页面的初始数据
   */
  data: {
    serviceTime: '9:00-24:00',
    orderNo: '',
    orderDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      orderNo: options.orderDetail
    })
    this._fetchOrderDetail()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (opt) {
   
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
  //跳转到退货退款页面
  toRefund: function () {
    wx.navigateTo({
      url: 'refunds/refunds',
    })
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
    const url = app.globalData.url
    const _this = this
    wx.showModal({
      title: '删除订单',
      content: '您是否确认要删除该订单？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: url + `/user/order/delete/${_this.data.orderDetail.orderNo}`,
            method: 'POST',
            success: function (data) {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      }
    })
  },

  _fetchOrderDetail() {
    const url = app.globalData.url
    const _this = this
    wx.request({
      url: url + `/user/order/detail/${_this.data.orderNo}`,
      method: 'POST',
      success: function(data) {
        console.log(data.data.data)
        _this.setData({
          orderDetail: data.data.data
        })
      }
    })
  }
})
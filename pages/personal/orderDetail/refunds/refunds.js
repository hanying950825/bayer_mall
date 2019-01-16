// pages/personal/orderDetail/refunds/refunds.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsImage:'',
    goodsPrice: 5869,
    productName: '华为Mate 20',
    goodsName: '亮黑色 6GB+128GB',
    goodsCounts: 1,
    refundReason: '请选择',
    logisticsCompany: '请选择物流公司',
    isRefundReason: false,
    isShow: false,
    reasonList: [
      { name:'拍错/效果不好/不喜欢' },
      { name:'尺寸问题' },
      { name:'颜色/款式/体型外貌与商品描述不符' },
      { name:'其他' }
    ],
    logisticsList: [
      { name: '顺丰快递' },
      { name: '圆通快递' },
      { name: '中通快递' },
      { name: '申通快递' },
      { name: '韵达快递' },
      { name: '天天快递' },
      { name: '安能快递' },
      { name: '汇通快递' },
      { name: 'EMS' },
      { name: '中国邮政包裹' },
    ]
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
  onChangeStatus: function () {
    this.setData({
      isShow: true
    })
  },
  onClose: function () {
    this.setData({ 
      isShow: false
    })
  },
  onSelect(event) {
    console.log(event.detail.name)
    this.setData({
      isShow: false,
      refundReason: event.detail.name,
      logisticsCompany: event.detail.name
    })
  }
})
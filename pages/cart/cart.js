// pages/cart/cart.js
var Dialog = require('../../dist/dialog/dialog');    
Page({
  
	/**
	 * 页面的初始数据
	 */
	data: {
    isClean: false,
    checked: true,
    list: ['1','2'],
    result: ['1','2'],
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
  // 右划点击删除按钮
  onClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        wx.showModal({
          title: '提示',
          content: '确定删除吗？',
          success: function() {
            instance.close();
          }
        })
        break;
    }
  },
  // 是否点击全选
  onChange(event) {
    const _this = this
    if (event.detail == true) {
      this.setData({
        checked: event.detail,
        result: _this.data.list
      })
    } else {
      this.setData({
        checked: event.detail,
        result: []
      })
    }
    
  },
  // 是否选择单件商品
  onGoodsChange(event) {
    this.setData({
      result: event.detail
    })
    if (this.data.result.length == this.data.list.length) {
      this.setData({
        checked: true
      })
    } else {
      this.setData({
        checked: false
      })
    }
  },
  // 增加数量
  onStepChange(e) {
    console.log(e.detail)
  },
  onSubmit() {
    wx.navigateTo({
      url: `../cart/trueOrder/trueOrder`,
    })
  }
})
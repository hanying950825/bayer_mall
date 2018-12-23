// pages/cart/cart.js
var Dialog = require('../../dist/dialog/dialog')
const app = getApp()  
Page({
  
	/**
	 * 页面的初始数据
	 */
	data: {
    isClean: false,
    checked: true,
    list: [],
    value: [],
    result: [],
    imageURL: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    totalPrice: 0,
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
    this.onCartList()
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
        value: _this.data.result
      })
    } else {
      this.setData({
        checked: event.detail,
        value: [],
        totalPrice: 0
      })
    }
    
  },
  // 是否选择单件商品
  onGoodsChange(event) {
    this.setData({
      value: event.detail
    })
    if (this.data.value.length == this.data.result.length) {
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
  },

  onCartList() {
    const url = app.globalData.url
    const _this = this
    wx.request({
      url: url + '/user/cart/list',
      method: 'POST',
      success: function(data) {
        _this.setData({
          list: data.data.data.cartProductList,
          totalPrice: data.data.data.cartTotalPrice * 100
        })
        let result = []
        for (let i = 0; i < data.data.data.cartProductList.length; i++) {
          result.push(data.data.data.cartProductList[i].id.toString())
        }
        _this.setData({
          result: result,
          value: result
        })

      }
    })
  }
})
// pages/cart/cart.js
var Dialog = require('../../dist/dialog/dialog')
import Toast from '../../dist/toast/toast'
const app = getApp()  
Page({
  
	/**
	 * 页面的初始数据
	 */
	data: {
    isClean: false,
    checked: true,
    list: [],
    result: [],
    value: [],
    imageURL: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
    totalPrice: 0,
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
    this.onCartList()
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
    this.onCartList()
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

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
          success: function(obj) {
            console.log(obj)
            instance.close();
            if (obj.confirm) {
              wx.request({
                url: url + '/user/cart/delete',
                method: 'POST',
                data: { goodsId: shops.goodsId, productId: shops.productId},
                success: function(data) {
                  const res = data.data.data
                  Toast.success({ mask: true, message: '删除成功！', duration: 1000 })
                  if (res.cartProductList.length == 0) {
                    _this.setData({
                      isClean: true,
                      list: res.cartProductList
                    })
                  } else {
                    _this.setData({
                      isClean: false,
                      list: res.cartProductList,
                      totalPrice: res.cartTotalPrice * 100,
                      checked: res.allChecked
                    })
                  }
                }
              })
            }
          }
        })
        break;
    }
  },
  // 是否点击全选
  onChange(event) {
    const _this = this
    const url = app.globalData.url
    if (event.detail == true) {
      wx.request({
        url: url + '/user/cart/selectAll/true',
        method: 'POST',
        success: function(data) {
          _this.setData({
            list: data.data.data.cartProductList,
            totalPrice: data.data.data.cartTotalPrice * 100,
            checked: data.data.data.allChecked
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
      this.setData({
        checked: event.detail,
        value: _this.data.result
      })
    } else {
      wx.request({
        url: url + '/user/cart/selectAll/false',
        method: 'POST',
        success: function (data) {
          _this.setData({
            list: data.data.data.cartProductList,
            totalPrice: data.data.data.cartTotalPrice * 100,
            checked: data.data.data.allChecked
          })
          let result = []
          for (let i = 0; i < data.data.data.cartProductList.length; i++) {
            result.push(data.data.data.cartProductList[i].id.toString())
          }
          _this.setData({
            result: result
          })
        }
      })
      this.setData({
        checked: event.detail,
        value: []
      })
    }
    
  },
  // 是否选择单件商品
  onGoodsChange(event) {
    const url = app.globalData.url
    const shops = event.target.dataset.id
    const _this = this

    for (let i=0;i<_this.data.list.length;i++) {
      if (this.data.list[i].id == event.target.dataset.id.id) {
        wx.request({
          url: url + '/user/cart/select',
          method: 'POST',
          data: {
            goodsId: shops.goodsId,
            productId: shops.productId,
            checked: _this.data.list[i].checked == true ? false : true
          },
          success: function(data) {
            const res = data.data.data
            _this.setData({
              list: res.cartProductList,
              totalPrice: res.cartTotalPrice * 100,
              checked: res.allChecked
            })
            let result = []
            for (let i = 0; i < res.cartProductList.length; i++) {
              if (res.cartProductList[i].checked) {
                result.push(res.cartProductList[i].id.toString())
              }
            }
            _this.setData({
              result: result,
              value: result
            })
          }
        })
      }
    }
  },
  // 增加数量
  onStepChange(e) {
    const shops = e.target.dataset.id
    const url = app.globalData.url
    const _this = this

    wx.request({
      url: url + '/user/cart/update',
      method: 'POST',
      data: {
        goodsId: shops.goodsId,
        productId: shops.productId,
        amount: e.detail
      },
      success: function(data) {
        _this.setData({
          list: data.data.data.cartProductList,
          totalPrice: data.data.data.cartTotalPrice * 100,
          checked: data.data.data.allChecked
        })
      }
    })
  },
  onSubmit() {
    app.globalData.shopDetail = {}
    wx.navigateTo({
      url: `../cart/trueOrder/trueOrder`,
    })
  },

  // 获取购物车列表
  onCartList() {
    const url = app.globalData.url
    const _this = this
    wx.request({
      url: url + '/user/cart/list',
      method: 'POST',
      success: function(data) {
        const res = data.data.data
        console.log(res.cartProductList)
        if (res.cartProductList.length == 0) {
          console.log(res)
          _this.setData({
            isClean: true
          })
        } else if (res.cartProductList.length > 0 && _this.data.list) {
          _this.setData({
            isClean: false,
            list: res.cartProductList,
            totalPrice: res.cartTotalPrice * 100,
            checked: res.allChecked
          })
          let result = []
          for (let i = 0; i < res.cartProductList.length; i++) {
            if (res.cartProductList[i].checked) {
              result.push(res.cartProductList[i].id.toString())
            }
          }
          _this.setData({
            result: result,
            value: result
          })
        }
      }
    })
  },
  // 去逛逛
  goHome() {
    wx.switchTab({
      url: './../home/home'
    })
  }
})
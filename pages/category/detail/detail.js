// pages/category/detail/detail.js
var app = getApp();
import Toast from '../../../dist/toast/toast'
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		indicatorDots: true,
		autoplay: true,
		interval: 2500,
		duration: 300,
    checked: false,
    stock: 100,
    show: false,
    btnColor: 'default',
    goCartTit: '加入购物车',
    productList: [],
    icon: {
      normal: '../../../images/icon3.png',
      active: '../../../images/shoucang.png'
    },
		imgUrls: [
			'../../../images/buou6.jpg',
			'../../../images/buou5.jpg',
			'../../../images/buou4.jpg',
			'../../../images/buou3.jpg'
		],
		goodsTitle: '这是一直颜值巨高的布偶猫,很可爱呦~~',
    goodsPrice : 8888,
		goodsPrivilegePrice: 20000,
		goodsDetailImg:[
			'../../../images/buou5.jpg',
			'../../../images/buou.png',
			'../../../images/buou1.png',
			'../../../images/buou2.png',
			'../../../images/buou3.jpg',
			'../../../images/buou4.jpg',
			'../../../images/buou6.jpg'
		],
		info: 5,
    cartNum: 5,
    showModalStatus: false,//是否显示
    gg_id: 0,//规格ID
    gg_txt: '',//规格文本
    gg_price: 0,//规格价格
    guigeList: [{ guige: '100', price: '150' }, { guige: '200', price: '150' }, { guige: '300', price: '150' }],
    shopsData: {},
    shopsNum: 1
	},

  filter: function (e) {
    var _this = this, 
      id = e.currentTarget.dataset.id.id, 
      txt = e.currentTarget.dataset.id.productName, 
      price = e.currentTarget.dataset.id.retailPrice
    _this.setData({
      shopsData: e.currentTarget.dataset.id,
      gg_id: id,
      gg_txt: txt,
      gg_price: price,
      shopsNum: 1
    });
  },

  /* 点击加号 */
  bindPlus: function (e) {
    this.setData({
      shopsNum: e.detail
    })
  },

  //显示对话框
  showModal: function (e) {
    const cartTxt = e.target.dataset.id
    const shopDetail = app.globalData.shopDetail

    if (this.data.productList != []) {
      if (cartTxt == '购物车') {
        this.setData({
          goCartTit: '加入购物车'
        })
      } else {
        this.setData({
          goCartTit: '立即购买'
        })
      }
      // 显示遮罩层
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      this.animation = animation
      animation.translateY(300).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: true
      })
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 200)
    } else {
      if (cartTxt == '购物车') {
        wx.request({
          url: url + '/user/cart/add',
          method: 'POST',
          data: { productId: _this.data.shopsData.id, goodsId: shopDetail.id, amount: 1 },
          success: function (data) {
            Toast.success({ mask: true, message: '加入成功！', duration: 1000 })
            _this.hideModal()
          }
        })
      } else {
        app.globalData.amount = _this.data.shopsNum
        wx.navigateTo({
          url: `../../cart/trueOrder/trueOrder`,
        })
      }
    }
  },

  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

	//预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
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
    this.onShopDetails()
    this.onCartNum()
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

  // 加载商品详情
  onShopDetails() {
    const url = app.globalData.url
    const shopDetail = app.globalData.shopDetail
    const data = { goodsId: shopDetail.id }
    const _this = this
    wx.request({
      url: url + '/mall/goods/detail',
      method: 'POST',
      data: data,
      success: function(res) {
        const result = res.data.data
        _this.setData({
          imgUrls: result.subImages,
          goodsTitle: result.goodsName,
          goodsPrivilegePrice: result.retailPrice,
          goodsPrice: result.marketPrice,
          stock: result.stock,
          productList: result.productList,
          goodsDetailImg: result.detailImages,
          guigeList: result.productList,
          checked: result.favorite
        })
      }
    })
  },
  
  // 购物车数量
  onCartNum() {
    const url = app.globalData.url
    const _this = this
    wx.request({
      url: url + '/user/cart/amount',
      method: 'POST',
      success: function(data) {
        _this.setData({
          cartNum: data.data.data
        })
      }
    })
  },

  // 加入购物车按钮
  onShoppingCart() {
    this.setData({
      show: true
    })
  },

  onClose() {
    this.setData({
      show: false
    })
  },

  onSaveShop() {
    this.setData({
      btnColor: 'danger'
    })
  },

  onChange(event) {
    const shopDetail = app.globalData.shopDetail
    const url = app.globalData.url
    const _this = this
    if (event.detail == true) {
      wx.request({
        url: url + `/user/favorite/add/${shopDetail.id}`,
        method: 'POST',
        success: function(data) {
          _this.setData({
            checked: event.detail
          })
          Toast.success({ mask: true, message: '收藏成功！', duration: 1000 })
        }
      })
    } else {
      wx.request({
        url: url + `/user/favorite/add/${shopDetail.id}`,
        method: 'POST',
        success: function (data) {
          _this.setData({
            checked: event.detail
          })
          Toast.success({ mask: true, message: '取消收藏！', duration: 1000 })
        }
      })
    }
    this.setData({
      checked: event.detail
    })
  },

  onCartPage() {
    wx.switchTab({
      url: './../../cart/cart'
    })
  },

  addCart(opt) {
    const url = app.globalData.url
    const shopDetail = app.globalData.shopDetail
    const _this = this

    if (_this.data.goCartTit == '加入购物车') {
      if (_this.data.shopsData.id) {
        wx.request({
          url: url + '/user/cart/add',
          method: 'POST',
          data: { productId: _this.data.shopsData.id, goodsId: shopDetail.id, amount: _this.data.shopsNum},
          success: function(data) {
            Toast.success({ mask: true, message: '加入成功！', duration: 1000 })
            _this.hideModal()
          }
        })
      } else {
        Toast.fail({ mask: true, message: '请先选择商品', duration: 1000 })
      }
    } else {
      app.globalData.amount = _this.data.shopsNum
      wx.navigateTo({
        url: `../../cart/trueOrder/trueOrder`,
      })
    }
  }
})
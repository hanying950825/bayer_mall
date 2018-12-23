// pages/category/detail/detail.js
var app = getApp();
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
    num: 1,//初始数量
	},

  filter: function (e) {
    var self = this, id = e.currentTarget.dataset.id, txt = e.currentTarget.dataset.txt, price = e.currentTarget.dataset.price
    self.setData({
      gg_id: id,
      gg_txt: txt,
      gg_price: price
    });
  },

  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },

  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },

  //显示对话框
  showModal: function () {
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
        console.log(result)
        _this.setData({
          imgUrls: result.subImages,
          goodsTitle: result.goodsName,
          goodsPrivilegePrice: result.retailPrice,
          goodsPrice: result.marketPrice,
          stock: result.stock,
          productList: result.productList,
          goodsDetailImg: result.detailImages,
          guigeList: result.productList,
          // checked: result.favorite
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
    console.log(shopDetail)
    console.log(event.detail)
    if (event.detail == true) {
      wx.request({
        url: url + `/user/favorite/add/${shopDetail.id}`,
        method: 'POST',
        success: function(data) {
          _this.setData({
            checked: event.detail
          })
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
        }
      })
    }
    this.setData({
      checked: event.detail
    })
  },

  onCartPage() {
    wx.switchTab({
      url: './../../cart/cart',
      fail: function (e) {
        console.log(e)
        console.log(321123)
      }
    })
  }
})
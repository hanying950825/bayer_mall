// pages/personal/logistics/logistics.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    isShowList: true,
    orderList: [],
    orderImg: [],
    oParams: {
      page: 0,
      size: 10
    }
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
    this.setData({
      orderList: [],
      oParams: {
        page: 0,
        size: 10
      },
      active: app.globalData.active
    })
    this._fetchOrderList()
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
    this._fetchOrderList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 切换选项对应内容
  onChange(event) {
    this.setData({
      active: event.detail.index,
      orderList: [],
      oParams: {
        page: 0
      }
    })
    this._fetchOrderList()
  },
  // 去支付/直接支付 支付接口
  onGoPay(event) {
    console.log(event.target.dataset.id)
    // wx.navigateTo({
    //   url: '../../cart/trueOrder/trueOrder',
    // })
  },
  // 取消订单
  onCancelOrder(event) {
    const num = event.target.dataset.id
    const url = app.globalData.url
    const _this = this
    wx.showModal({
      title: '取消订单',
      content: '您是否确定要取消该订单？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: url + `/user/order/cancel/${num}`,
            method: 'POST',
            success: function (data) {
              _this._fetchOrderList()
            }
          })
        }
      }
    })
  },
  // 订单详情
  onOrderDetail(event) {
    wx.navigateTo({
      url: `../orderDetail/orderDetail?orderDetail=${event.target.dataset.id}`,
    })
  },
  // 物流信息
  onPostMsg() {
    wx.navigateTo({
      url: '../postMsg/postMsg',
    })
  },
  _fetchOrderList() {
    const url = app.globalData.url
    const _this = this
    const list = []
    let i = _this.data.oParams.page
    if (_this.data.active == 0) {
      _this.setData({
        oParams: {
          size: 10,
          page: i
        }
      }) 
    } else if (_this.data.active == 1) {
      _this.setData({
        oParams: {
          size: 10,
          page: i,
          orderStatus: 'WAIT_PAY'
        }
      }) 
    } else if (_this.data.active == 2) {
      _this.setData({
        oParams: {
          size: 10,
          page: i,
          orderStatus: 'WAIT_SEND'
        }
      }) 
    } else if (_this.data.active == 3) {
      _this.setData({
        oParams: {
          size: 10,
          page: i,
          orderStatus: 'SENT'
        }
      }) 
    } else if (_this.data.active == 4) {
      _this.setData({
        oParams: {
          size: 10,
          page: i,
          orderStatus: 'FINISH'
        }
      }) 
    }
    wx.request({
      url: url + '/user/order/list',
      method: 'POST',
      data: _this.data.oParams,
      success: function(data) {
        const res = data.data.data.data
        console.log(res.length)
        console.log(_this.data.orderList)
        if (res.length > 0 && _this.data.orderList) {
          var momentList = _this.data.orderList
          for (var i = 0; i < res.length; i++) {
            momentList.push(res[i]);
          }
          _this.setData({
            orderList: momentList,
            isShowList: true
          })
          _this.setData({
            oParams: {
              size: 10,
              page: _this.data.oParams.page + 1
            }
          })
        } else if (res.length <= 0 && _this.data.orderList.length == 0) {
          console.log(3213123123)
          _this.setData({
            isShowList: false
          })
        }
       
      }
    })
  }
})
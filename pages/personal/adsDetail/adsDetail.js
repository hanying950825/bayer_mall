// pages/personal/adsDetail/adsDetail.js
var app = getApp();
import Toast from '../../../dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userPhone: '',
    userLocal: '',
    userAddress: '',
    show: false,
    location: [],
    regionList: [],
    errorName: '',
    errorPhone: '',
    errorRegion: '',
    asdId: 0,
    errorAddress: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options) {
      this.setData({
        asdId: options.adsId,
        userName: options.userName,
        userPhone: options.userPhone,
        userLocal: options.province + '-' + options.city + '-' + options.district,
        userAddress: options.address
      })
    }
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
  // 获取微信地址
  onWxAds() {
    const _this = this
    wx.chooseAddress({
      success: function (data) {
        _this.setData({
          userName: data.userName,
          userPhone: data.telNumber,
          userLocal: data.provinceName + '-' + data.cityName + '-' + data.countyName,
          userAddress: data.detailInfo,
          userPostCode: data.postalCode
        })
      }
    })
  },
  // 姓名输入框发生改变
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      value: event.detail
    })
  },
  onGetLocal() {
    this.setData({ show: true })
  },
  // 关闭按钮
  onClose() {
    this.setData({ show: false });
  },
  // 点击确定按钮
  onChangeLocal(e) {
    const location = e.detail.detail.province + '-' + e.detail.detail.city + '-' + e.detail.detail.county
    this.setData({ 
      show: false,
      userLocal: location
    });
  },
  // 获取地区
  onChangeRegion(e) {
    console.log(e.detail)
    this.setData({
      regionList: e.detail.value,
      userPostCode: e.detail.postcode,
      userLocal: e.detail.value[0] + '-' + e.detail.value[1] + '-' + e.detail.value[2],
      errorRegion: ''
    })
  },

  // 获取姓名
  onGetName(e) {
    this.setData({
      userName: e.detail.value
    })
    if (!this.data.userName) {
      this.setData({
        errorName: '请输入姓名！'
      })
    } else {
      this.setData({
        errorName: ''
      })
    }
  },

  // 点击清除按钮
  onCleanName() {
    this.setData({
      userName: ''
    })
  },

  // 获取电话号码
  onGetPhone(e) {
    this.setData({
      userPhone: e.detail.value
    })
    if (!this.data.userPhone) {
      this.setData({
        errorPhone: '请输入手机号！'
      })
    } else if (!/(^1[0-9]{10}$)/.test(this.data.userPhone)) {
      this.setData({
        errorPhone: '请输入正确格式的手机号！'
      })
    } else {
      this.setData({
        errorPhone: ''
      })
    }
  },

  // 点击清除电话号码
  onCleanPhone() {
    this.setData({
      userPhone: ''
    })
  },

  // 获取详细地址
  onGetAds(e) {
    this.setData({
      userAddress: e.detail.value
    })
    if (!this.data.userAddress) {
      this.setData({
        errorAddress: '请输入详细地址！'
      })
    } else {
      this.setData({
        errorAddress: ''
      })
    }
  },

  // 获取邮编
  onGetPostCode(e) {
    this.setData({
      userPostCode: e.detail.value
    })
  },

  // 点击清除邮编
  onCleanpost() {
    this.setData({
      userPostCode: ''
    })
  },

  onFinish() {
    const url = app.globalData.url
    const _this = this
    if (!this.data.userName || !this.data.userPhone || !this.data.userLocal || !this.data.userAddress) {
      Toast.fail({ mask: true, message: '请输入详细信息后再提交！', duration: 1000 })
      return false
    } else {
      const province = this.data.userLocal.substring(0, this.data.userLocal.indexOf('省') + 1)
      const city = this.data.userLocal.substring(this.data.userLocal.indexOf('省') + 2, this.data.userLocal.indexOf('市') + 1)
      const district = this.data.userLocal.substring(this.data.userLocal.indexOf('市') + 2, this.data.userLocal.indexOf('区') + 1 )
      
      const data = { name: this.data.userName, phone: this.data.userPhone, province: province, city: city, district: district, address: this.data.userAddress}
      wx.showModal({
        title: '提示',
        content: '是否要确认提交收货地址？',
        success: function (res) {
          wx.request({
            url: url + '/user/address/add',
            method: 'POST',
            data: data,
            success: function (data) {
              console.log(data.data)
              if (data.data.state == 400) {
                Toast.fail({ mask: true, message: data.data.message, duration: 1000 })
                return false
              } else {
                Toast.success({ mask: true, message: '新增成功！', duration: 1000 })
                wx.navigateBack({
                  delta: 1,
                  success: function () {
                    var pages = getCurrentPages();
                    var lastpage = pages[1]
                    lastpage.setData({
                      oParams: {
                        page: 0,
                        size: 10
                      },
                      adsList: []
                    })
                    lastpage._fetchAddress()
                  }
                })
              }
            }
          })
        }
      })
    }
  }
})
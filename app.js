//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const _this = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: 'wxacbe5f1d59932ff7',
              secret: '773f0e319119ef76b25ff73bdc294c59',
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            success: function(data) {
              _this.globalData.data = data.data
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    data: null,
    userInfo: null,
    isSearch: true, // 是否显示搜索框
    searchType: 'none', // 搜索类型
    isShowList: false, // 是否加载时iu显示列表
    active: 0, // 判断订单列表页是哪个页面
		phoneNumber: '13631183760', //商家号码
    shopDetail: {}, // 商品详情
    url: 'http://seasins.vipgz1.idcfengye.com/baiermall'
  }
})
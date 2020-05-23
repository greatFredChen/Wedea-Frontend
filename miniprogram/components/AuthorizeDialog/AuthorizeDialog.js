// components/AuthorizeDialog/AuthorizeDialog.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    authorizeHidden: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    logged: false,
    avatarUrl: '',
    userInfo: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo: function (e) {
      if (e.detail.userInfo) {
        this.setData({
          logged: true,
          avatarUrl: e.detail.userInfo.avatarUrl,
          userInfo: e.detail.userInfo
        })
        app.globalData.logged = true
        app.globalData.avatarUrl = e.detail.userInfo.avatarUrl
        app.globalData.userInfo = e.detail.userInfo
      } else {
        wx.showToast({
          title: 'Get userInfo failed!',
          icon: 'none',
          duration: 2000
        })
      }
      app.event.emit('authorizeHidden', true)
    }
  }
})

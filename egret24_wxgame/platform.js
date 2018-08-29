/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */

class WxgamePlatform {

    name = 'wxgame'

    login() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    let code = res.code
                    // 获取openid
                    let appId = 'wx511181d90ca0be0b'
                    let secret = '672c46608bbd05fcaebbca3291f4d0f0'
                    wx.request({
                      url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
                      data: {},
                      header: {
                      'content-type': 'json'
                     },
                      success: function (res) {
                        resolve(res.data.openid )
                      }
                    })
                }
            })
        })
    }

    getUserInfo() {
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                withCredentials: true,
                success: function (res) {
                    var userInfo = res.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    var gender = userInfo.gender //性别 0：未知、1：男、2：女
                    var province = userInfo.province
                    var city = userInfo.city
                    var country = userInfo.country
                    resolve(userInfo);
                }
            })
        })
    }

    showShareMenu () {
        return new Promise((resolve, reject) => {
            wx.showShareMenu({
                widthShareTicket: true
            })
            wx.onShareAppMessage(() => {
                return  {
                    title: '24点游戏！等你来战～',
                    imageUrl: 'resource/assets/home_page/homebgc.png'
                }
            })
        })
    }

    shareAppMessage () {
        return new Promise((resolve, reject) => {
            wx.shareAppMessage({
                titile: '24点游戏！等你来战～',
                imageUrl: 'resource/assets/home_page/homebgc.png',
                // 返回Promise的状态
                success: () => {resolve()},
                fail: () => {reject()}
            })
        })
    }

    // setUserCloudStorage (KVDataList, openId) {
    //     return new Promise((resolve, reject) => {
    //         wx.setUserCloudStorage({
    //             KVDataList: KVDataList,
    //             success: () => {
    //                 console.log(KVDataList)
    //                 let openDataContext = wx.getOpenDataContext()
    //                 openDataContext.postMessage({
    //                     title: openId,
    //                     command: 'updateMaxScore'
    //                 })
    //             },
    //             fail: () => {
    //                 console.log('保存失败')
    //             }
    //         })
    //     })
    // }

    openDataContext = new WxgameOpenDataContext();
}

class WxgameOpenDataContext {

    createDisplayObject(type, width, height) {
        const bitmapdata = new egret.BitmapData(sharedCanvas);
        bitmapdata.$deleteSource = false;
        const texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        const bitmap = new egret.Bitmap(texture);
        bitmap.width = width;
        bitmap.height = height;

        if (egret.Capabilities.renderMode == "webgl") {
            const renderContext = egret.wxgame.WebGLRenderContext.getInstance();
            const context = renderContext.context;
            ////需要用到最新的微信版本
            ////调用其接口WebGLRenderingContext.wxBindCanvasTexture(number texture, Canvas canvas)
            ////如果没有该接口，会进行如下处理，保证画面渲染正确，但会占用内存。
            if (!context.wxBindCanvasTexture) {
                egret.startTick((timeStarmp) => {
                    egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
                    bitmapdata.webGLTexture = null;
                    return false;
                }, this);
            }
        }
        return bitmap;
    }


    postMessage(data) {
        const openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage(data);
    }
}


window.platform = new WxgamePlatform();
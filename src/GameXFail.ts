class GameXFail extends eui.Component {
    private gp_share:eui.Group
    private rect_bg:eui.Rect
    private game_close_replay:eui.Image
    constructor (self) {
        super()
        this.skinName = 'resource/eui_skins/GameFail.exml'
        
        DisUtil.get(this).beCon()
        
        let rect = new egret.Shape()
        rect.graphics.beginFill(0x000000, 0.6)
        rect.graphics.drawRect(0, 0, self.$parent.width, self.$parent.height)
        rect.graphics.endFill()
        this.addChildAt(rect, 0)
        DisUtil.get(rect).cover()

        this.game_close_replay.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.handleClose(self)
        }, this)
        this.share_icon.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.handleShare(self)
        }, this)
        this.share_label.addEventListener(egret.TouchEvent.TOUCH_TAP, function() {
            this.handleShare(self)
        }, this)
    }

    private handleClose (self) {
        // 立马更新数据
        platform.openDataContext.postMessage({
            score: self.c_game_score.text.toString(),
            openId: egret.localStorage.getItem('openId'),
            command: 'updateMaxScore'
        })

        self.$parent.addChild(new GameOver(self.c_game_score.text, self))
        self.$parent.removeChild(self)
        this.$parent.removeChild(this)
    }

    // 分享功能，电脑端无法执行回调，只有手机上可见回调
    private share_icon:eui.Image
    private share_label:eui.Label

    private handleShare (self) {
        platform.shareAppMessage().then(() => {
             this.$parent.removeChild(this)
             self.replay(self.makeFourNum())
             self.timeNumX = 30
             self.timeId.start()
        }).catch(() => {
            console.log('分享失败');
        })
    }
}
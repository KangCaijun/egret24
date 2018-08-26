class GameXFail extends eui.Component {
    private gp_share:eui.Group
    private game_close_replay:eui.Image
    constructor (self) {
        super()
        this.skinName = 'resource/eui_skins/GameFail.exml'
        
        DisUtil.get(this).beCon()

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
        self.$parent.addChild(new GameOver(self.c_game_score.text, self))
        self.$parent.removeChild(self)
        this.$parent.removeChild(this)
    }

    private share_icon:eui.Image
    private share_label:eui.Label

    private handleShare (self) {
        platform.shareAppMessage().then(() => {
            console.log('success');
            
        this.$parent.removeChild(this)
        self.timeNumX = 30
        self.timeId.start()
        self.replay(self.makeFourNum())
        }).catch(() => {
            console.log('分享失败了啊');
        })
    }
}
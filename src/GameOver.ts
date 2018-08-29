class GameOver extends eui.Component {
    private final_score:eui.Label
    private go_home:eui.Image
    private new_gameX:eui.Label
    private game_share:eui.Label
    private total_rank:eui.Label
    private the_best:eui.Group  

    constructor (finalScore, self) {
        super()
        this.skinName = 'resource/eui_skins/GameOver.exml'

        DisUtil.get(this).beCon()

        let rect = new egret.Shape()
        rect.graphics.beginFill(0x05B2DF)
        rect.graphics.drawRect(0, 0, self.$parent.width, self.$parent.height)
        rect.graphics.endFill()
        this.addChildAt(rect, 0)
        DisUtil.get(rect).cover()

        this.final_score.text = finalScore

        this.go_home.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goHome, this)
        this.new_gameX.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.newGame(self)
        }, this)

        this.game_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this)
        this.total_rank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTotalRank, this)

        this.the_best.addChild(platform.openDataContext.createDisplayObject(null, this.the_best.width, this.the_best.height))
        platform.openDataContext.postMessage({
            avatarWidth: this.width,
            avatarHeight: this.height,
            command: 'drawAvatar'
        })
    }

    private goHome () {
        this.$parent.addChild(new HomePage())
        this.$parent.removeChild(this)
    }

    private newGame (self) {
        if (self.gameName === 'X') {
            this.$parent.addChild(new Game('X'))
        } else if(self.gameName === 'C') {
            this.$parent.addChild(new Game('C'))
        }
        this.$parent.removeChild(this)
    }

    private share () {
        platform.shareAppMessage()
    }

    private showTotalRank () {
        // platform.openDataContext.postMessage({
        //     command: 'close'
        // })
        // let _self = this
        // setTimeout(function() {
          this.$parent.addChild(new ShowRank(this, true))   
        // }, 1000)
    }
}
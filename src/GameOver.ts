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

        platform.openDataContext.postMessage({
            score: finalScore.toString(),
            openId: egret.localStorage.getItem('openId'),
            command: 'updateMaxScore'
        })

        DisUtil.get(this).beCon()

        this.final_score.text = finalScore

        this.go_home.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goHome, this)
        this.new_gameX.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.newGame(self)
        }, this)

        this.game_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this)
        this.total_rank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTotalRank, this)

        // console.log(this.width);
        // console.log(this.$parent);
        // console.log(this);
        // console.log(this.$parent);
        
        
        // console.log(this.$parent.width);
        // console.log(this.stage);
        

        this.addChild(platform.openDataContext.createDisplayObject(null, this.width, this.height))
        platform.openDataContext.postMessage({
            avatorWidth: this.width,
            avatorHeight: this.height,
            command: 'drawAvator'
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
        platform.openDataContext.postMessage({
            command: 'open'
        })        
    }
}
class HomePage extends eui.Component {
    private game_x:eui.Label
    private game_c:eui.Label
    private game_p:eui.Label
    private home_bg:egret.Bitmap;

    constructor () {
        super()
        this.skinName = "resource/eui_skins/HomePage.exml"

        this.game_x.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goToGameX, this, true)
        this.game_c.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goToGameC, this, true)
        this.game_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goToGameP, this, true)

        this.home_bg = new egret.Bitmap()
        this.home_bg.texture = RES.getRes('homebgc_png')
        
        this.addChildAt(this.home_bg, 0)
        DisUtil.get(this).beCon()
        DisUtil.get(this.home_bg).cover()
    }

    private goToGameX () {
        this.$parent.addChild(new Game('X'))
        this.$parent.removeChild(this)
    }

    private goToGameC () {
        this.$parent.addChild(new Game('C'))
        this.$parent.removeChild(this)
    }

    private maskShp:egret.Shape
    private rankList:egret.Bitmap
    private closeBtn:eui.Label
    private goToGameP () {
        // 禁止点击
        this.touchChildren = false
        // mask
        this.maskShp = new egret.Shape()
        this.maskShp.graphics.beginFill(0x000000, 0.6)
        this.maskShp.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight)
        this.maskShp.graphics.endFill()
        this.$parent.addChildAt(this.maskShp, this.$parent.numChildren + 1)

        // 添加排行榜
        this.rankList = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight)
        this.$parent.addChildAt(this.rankList, this.$parent.numChildren + 1)
        platform.openDataContext.postMessage({
            command: 'open'
        })

        // 添加删除按钮
        this.closeBtn = new eui.Label()
        this.closeBtn.size = this.$parent.height / 20
        this.closeBtn.textAlign = egret.HorizontalAlign.CENTER
        this.closeBtn.textColor = 0x00ff00
        this.closeBtn.lineSpacing = 6
        this.closeBtn.text = '点击关闭'
        this.closeBtn.x = this.$parent.stage.stageWidth/2 - this.closeBtn.width/2
        this.closeBtn.y = this.$parent.stage.stageHeight * 37 / 40
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleClose, this)
        this.$parent.addChildAt(this.closeBtn, this.$parent.numChildren + 1)
    }

    private handleClose () {
        console.log('被点击了')
        this.$parent.removeChild(this.closeBtn)
        this.$parent.removeChild(this.maskShp)
        platform.openDataContext.postMessage({
            command: 'close'
        })
        this.$parent.removeChild(this.rankList)
        this.touchChildren = true
    }
}
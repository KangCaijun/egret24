class ShowRank extends eui.Component {
    private maskShp:egret.Shape
    private rankList:egret.Bitmap
    private closeBtn:eui.Label
    constructor (self) {
        super()
        this.showRank(self)
    }
    public showRank (self) {
        // 禁止点击
        self.touchChildren = false
        // mask
        this.maskShp = new egret.Shape()
        this.maskShp.graphics.beginFill(0x000000, 0.6)
        this.maskShp.graphics.drawRect(0, 0, self.stage.stageWidth, self.stage.stageHeight)
        this.maskShp.graphics.endFill()
        self.$parent.addChildAt(this.maskShp, self.$parent.numChildren + 1)

        // 添加排行榜
        this.rankList = platform.openDataContext.createDisplayObject(null, self.stage.stageWidth, self.stage.stageHeight)
        self.$parent.addChildAt(this.rankList, self.$parent.numChildren + 1)
        platform.openDataContext.postMessage({
            command: 'open'
        })

        // 添加删除按钮
        this.closeBtn = new eui.Label()
        this.closeBtn.size = self.height / 20
        this.closeBtn.textAlign = egret.HorizontalAlign.CENTER
        this.closeBtn.textColor = 0x00ff00
        this.closeBtn.lineSpacing = 6
        this.closeBtn.text = '点击关闭'
        this.closeBtn.x = self.stage.stageWidth/2 - this.closeBtn.width/2
        this.closeBtn.y = self.stage.stageHeight * 37 / 40
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function() {
            this.handleClose(self)
        }, this)
        self.$parent.addChildAt(this.closeBtn, self.numChildren + 1)
    }

    private handleClose (self) {
        self.$parent.removeChild(this.closeBtn)
        self.$parent.removeChild(this.maskShp)
        platform.openDataContext.postMessage({
            command: 'close'
        })
        self.$parent.removeChild(this.rankList)
        self.$parent.removeChild(this)
        self.touchChildren = true
    }
}
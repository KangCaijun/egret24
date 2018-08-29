// class GameSuccess extends eui.Component {
//     public constructor (x, y, round) {
//         super()
//         this.skinName = 'resource/eui_skins/GameXSuccess.exml'
//     }
// }



class GameSuccess extends egret.DisplayObjectContainer {
    private shape:egret.Shape
    private titleLabel:egret.TextField = new egret.TextField()
    private roundLabel:egret.TextField = new egret.TextField()
    constructor (x, y, round, screenWidth) {
        super()
        this.initCircle(x, y)
        this.initText(round, screenWidth)
    }

     //先画一个小圆
    private circleImg:egret.Bitmap
    private initCircle (x, y) {
        this.drawCircle(x, y)
        this.scaleToFull()
    }

    private drawCircle (x, y) {
        this.circleImg = new egret.Bitmap()
        this.circleImg.texture = RES.getRes('circle_png')
        this.circleImg.width = 6
        this.circleImg.height = 6
        this.circleImg.anchorOffsetX = 3
        this.circleImg.anchorOffsetY = 3
        this.circleImg.x = x
        this.circleImg.y = y
        this.addChild(this.circleImg)
    }

    //画文本
    private initText (round, screenWidth) {
        let titleLabel:egret.TextField = this.titleLabel
        let roundLabel:egret.TextField = this.roundLabel

        titleLabel.text = 'Round'
        titleLabel.y = 280
        titleLabel.height = 72
        titleLabel.size = 72
        titleLabel.textColor = 0x515151
        titleLabel.bold = true
        titleLabel.x = screenWidth / 2 - titleLabel.width / 2
        titleLabel.visible = false

        roundLabel.text = round
        roundLabel.y = 400
        roundLabel.height = 112
        roundLabel.size = 112
        roundLabel.textColor = 0x515151
        roundLabel.bold = true
        roundLabel.italic = true
        roundLabel.x = screenWidth / 2 - roundLabel.width / 2
        roundLabel.visible = false

        setTimeout(() => {
            titleLabel.visible = true
            roundLabel.visible = true
        }, 200)

        this.addChild(titleLabel)
        this.addChild(roundLabel)
    }

    //放大的动画效果
    public scaleToFull () {
        let scaleBase = 0
        let scaleStep = 0.05

        this.addEventListener(egret.Event.ENTER_FRAME, (evt:egret.Event) => {
            if (this.circleImg.scaleX > 300 || this.scaleY > 300) {
                return
            }
            // 正弦函数放大 在300倍内
            this.circleImg.scaleX = this.circleImg.scaleY = 1 + 300 * Math.abs(scaleBase += scaleStep)
        }, this)
    }
}

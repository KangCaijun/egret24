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
    private initCircle (x, y) {
        this.shape = new egret.Shape()
        this.addChild(this.shape)
        let shape:egret.Shape = this.shape
        this.shape.anchorOffsetX = this.shape.width / 2
        this.shape.anchorOffsetY = this.shape.height / 2 
        this.point_x = x
        this.point_y = y
        this.drawCircle()
        this.scaleToFull()
    }

    private point_x
    private point_y
    // private r:number = 5

    private circleImg:egret.Bitmap

    private drawCircle () {
        // this.shape.graphics.beginFill(0x8dd9ed, 1)
        // this.shape.graphics.drawCircle(this.point_x, this.point_y, r)
        // this.shape.graphics.endFill()
        this.circleImg = new egret.Bitmap()
        this.circleImg.texture = RES.getRes('circle_png')
        this.circleImg.width = 6
        this.circleImg.height = 6
        this.circleImg.anchorOffsetX = 3
        this.circleImg.anchorOffsetY = 3
        this.circleImg.x = this.point_x
        this.circleImg.y = this.point_y
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
        console.log(this.circleImg)
        let scaleBase = 0
        let scaleStep = 0.04

        this.addEventListener(egret.Event.ENTER_FRAME, (evt:egret.Event) => {
            if (this.circleImg.scaleX > 300 || this.scaleY > 300) {
                return
            }
            // 
            this.circleImg.scaleX = this.circleImg.scaleY = 1 + 300 * Math.abs(scaleBase += scaleStep)
        }, this)
        // let timeId = setInterval(() => {
        //      this.r = this.r + 128
        //     this.drawCircle(this.r)
        //     if (this.r > 1200) {
        //         clearInterval(timeId)
        //     }
        // }, 16.7)

            //   egret.Tween.get(this.shape)
            //       .to({
            //           width: 1000,
            //           height: 1200
            //       }, 400, egret.Ease.cubicOut)
                  
        
        // this.addEventListener(egret.Event.ENTER_FRAME, (evt:egret.Event) => {
        //     this.r = this.r + 60
        //     this.drawCircle(this.r)
        // }, this)
    }
}

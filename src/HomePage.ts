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

        // 适配
        this.home_bg = new egret.Bitmap()
        this.home_bg.texture = RES.getRes('homebgc_png')
        
        this.addChildAt(this.home_bg, 0)
        DisUtil.get(this).beCon()
        DisUtil.get(this.home_bg).cover()
    }

    // 跳转⬇侠模式
    private goToGameX () {
        this.$parent.addChild(new Game('X'))
        this.$parent.removeChild(this)
    }

    // 跳转禅模式
    private goToGameC () {
        this.$parent.addChild(new Game('C'))
        this.$parent.removeChild(this)
    }

    // 跳转排行榜
    private goToGameP () {  
        // 将this传过去，方便添加children
        this.$parent.addChild(new ShowRank(this))
    }
}
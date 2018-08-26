var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver(finalScore, self) {
        var _this = _super.call(this) || this;
        _this.skinName = 'resource/eui_skins/GameOver.exml';
        _this.final_score.text = finalScore;
        _this.go_home.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.goHome, _this);
        _this.new_gameX.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.newGame(self);
        }, _this);
        return _this;
    }
    GameOver.prototype.goHome = function () {
        this.$parent.addChild(new HomePage());
        this.$parent.removeChild(this);
    };
    GameOver.prototype.newGame = function (self) {
        console.log(self.gameName);
        if (self.gameName === 'X') {
            this.$parent.addChild(new Game('X'));
        }
        else if (self.gameName === 'C') {
            this.$parent.addChild(new Game('C'));
        }
        this.$parent.removeChild(this);
    };
    return GameOver;
}(eui.Component));
__reflect(GameOver.prototype, "GameOver");

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
var GameXFail = (function (_super) {
    __extends(GameXFail, _super);
    function GameXFail(self) {
        var _this = _super.call(this) || this;
        _this.skinName = 'resource/eui_skins/GameFail.exml';
        _this.game_close_replay.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.handleClose(self);
        }, _this);
        return _this;
    }
    GameXFail.prototype.handleClose = function (self) {
        self.$parent.addChild(new GameOver(self.c_game_score.text, self));
        self.$parent.removeChild(self);
    };
    return GameXFail;
}(eui.Component));
__reflect(GameXFail.prototype, "GameXFail");

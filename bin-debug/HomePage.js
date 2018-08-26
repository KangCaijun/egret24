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
var HomePage = (function (_super) {
    __extends(HomePage, _super);
    function HomePage() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/HomePage.exml";
        _this.game_x.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.goToGameX, _this, true);
        _this.game_c.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.goToGameC, _this, true);
        _this.game_p.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.goToGameP, _this, true);
        return _this;
    }
    HomePage.prototype.goToGameX = function () {
        this.$parent.addChild(new Game('X'));
        this.$parent.removeChild(this);
    };
    HomePage.prototype.goToGameC = function () {
        this.$parent.addChild(new Game('C'));
        this.$parent.removeChild(this);
    };
    HomePage.prototype.goToGameP = function () {
    };
    return HomePage;
}(eui.Component));
__reflect(HomePage.prototype, "HomePage");

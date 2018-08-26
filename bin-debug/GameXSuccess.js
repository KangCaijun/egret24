// class GameSuccess extends eui.Component {
//     public constructor (x, y, round) {
//         super()
//         this.skinName = 'resource/eui_skins/GameXSuccess.exml'
//     }
// }
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
var GameSuccess = (function (_super) {
    __extends(GameSuccess, _super);
    function GameSuccess(x, y, round, screenWidth) {
        var _this = _super.call(this) || this;
        _this.titleLabel = new egret.TextField();
        _this.roundLabel = new egret.TextField();
        _this.r = 5;
        _this.initCircle(x, y);
        _this.initText(round, screenWidth);
        return _this;
    }
    //先画一个小圆
    GameSuccess.prototype.initCircle = function (x, y) {
        this.shape = new egret.Shape();
        this.addChild(this.shape);
        var shape = this.shape;
        this.shape.anchorOffsetX = this.shape.width / 2;
        this.shape.anchorOffsetY = this.shape.height / 2;
        this.point_x = x;
        this.point_y = y;
        this.drawCircle(this.r);
        this.scaleToFull();
    };
    GameSuccess.prototype.drawCircle = function (r) {
        this.shape.graphics.beginFill(0x8dd9ed, 1);
        this.shape.graphics.drawCircle(this.point_x, this.point_y, r);
    };
    //画文本
    GameSuccess.prototype.initText = function (round, screenWidth) {
        var titleLabel = this.titleLabel;
        var roundLabel = this.roundLabel;
        titleLabel.text = 'Round';
        titleLabel.y = 280;
        titleLabel.height = 72;
        titleLabel.size = 72;
        titleLabel.textColor = 0x515151;
        titleLabel.bold = true;
        titleLabel.x = screenWidth / 2 - titleLabel.width / 2;
        titleLabel.visible = false;
        roundLabel.text = round;
        roundLabel.y = 400;
        roundLabel.height = 112;
        roundLabel.size = 112;
        roundLabel.textColor = 0x515151;
        roundLabel.bold = true;
        roundLabel.italic = true;
        roundLabel.x = screenWidth / 2 - roundLabel.width / 2;
        roundLabel.visible = false;
        setTimeout(function () {
            titleLabel.visible = true;
            roundLabel.visible = true;
        }, 200);
        this.addChild(titleLabel);
        this.addChild(roundLabel);
    };
    //放大的动画效果
    GameSuccess.prototype.scaleToFull = function () {
        var _this = this;
        this.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
            _this.r = _this.r + 60;
            _this.drawCircle(_this.r);
        }, this);
    };
    return GameSuccess;
}(egret.DisplayObjectContainer));
__reflect(GameSuccess.prototype, "GameSuccess");

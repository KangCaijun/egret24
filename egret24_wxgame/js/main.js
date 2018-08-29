var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var HomePage = (function (_super) {
    __extends(HomePage, _super);
    function HomePage() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/HomePage.exml";
        _this.game_x.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.goToGameX, _this, true);
        _this.game_c.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.goToGameC, _this, true);
        _this.game_p.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.goToGameP, _this, true);
        // 适配
        _this.home_bg = new egret.Bitmap();
        _this.home_bg.texture = RES.getRes('homebgc_png');
        _this.addChildAt(_this.home_bg, 0);
        DisUtil.get(_this).beCon();
        DisUtil.get(_this.home_bg).cover();
        return _this;
    }
    // 跳转⬇侠模式
    HomePage.prototype.goToGameX = function () {
        this.$parent.addChild(new Game('X'));
        this.$parent.removeChild(this);
    };
    // 跳转禅模式
    HomePage.prototype.goToGameC = function () {
        this.$parent.addChild(new Game('C'));
        this.$parent.removeChild(this);
    };
    // 跳转排行榜
    HomePage.prototype.goToGameP = function () {
        // 将this传过去，方便添加children
        this.$parent.addChild(new ShowRank(this));
    };
    return HomePage;
}(eui.Component));
__reflect(HomePage.prototype, "HomePage");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
var Game = (function (_super) {
    __extends(Game, _super);
    /**
     * name: 取值为 'X' ==>   侠模式
     *          'C'  ==> 禅模式
     */
    function Game(name) {
        var _this = _super.call(this) || this;
        _this.timeNum = 0;
        // 侠模式计时
        _this.timeNumX = 30;
        // 计算逻辑
        _this.tempArr = []; //存放被点击的数字或自负
        _this.successNum = 0; //计算的次数，等于3的时候游戏结束
        _this.total_score = 1; //获取的分数
        _this.gameName = name;
        // 引入贴图        ===================== 判断1 ============
        // 设置定时器，计算总的时间 =================判断2===================
        if (_this.gameName === 'C') {
            _this.skinName = "resource/eui_skins/GameC.exml";
            _this.setTimeC();
        }
        else if (_this.gameName === 'X') {
            _this.skinName = "resource/eui_skins/GameX.exml";
            _this.setTimeX();
            // 初始化一次round1
            // this.gameXSuccess(this.gp_num.$children[1])
        }
        // 适配屏幕 == 中间show all，背景覆盖
        _this.home_bg = new egret.Bitmap();
        _this.home_bg.texture = RES.getRes('gamebgc_png');
        _this.addChildAt(_this.home_bg, 0);
        DisUtil.get(_this).beCon();
        DisUtil.get(_this.home_bg).cover();
        //监听数字被点击事件
        for (var i = 0; i < _this.gp_num.$children.length; i++) {
            _this.gp_num.$children[i].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.handleTouch, _this, true);
        }
        // 监听符号被点击事件
        for (var j = 0; j < _this.gp_symbol.$children.length; j++) {
            _this.gp_symbol.$children[j].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.handleTouch, _this, true);
        }
        _this.initFourText(_this.makeFourNum());
        //监听事件：刷新：重新开始游戏 === 关卡不变
        _this.c_replay.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.replay(JSON.parse(egret.localStorage.getItem('localFourNum')));
        }, _this);
        //监听事件：结束游戏
        _this.game_over.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.gameOver, _this);
        return _this;
    }
    // 禅模式计时
    Game.prototype.setTimeC = function () {
        this.timer = new egret.Timer(1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFuncC, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFuncC, this);
        this.timer.start();
    };
    /**
     * 将秒数转化成分秒显示
     */
    Game.prototype.timerFuncC = function () {
        this.timeNum += 1;
        var tempMinute = Math.floor(this.timeNum / 60);
        var minutes = tempMinute >= 10 ? tempMinute : '0' + tempMinute;
        var seconds = this.timeNum % 60 >= 10 ? this.timeNum % 60 : '0' + this.timeNum % 60;
        this.c_game_time.text = minutes + ' : ' + seconds;
    };
    Game.prototype.timerComFuncC = function () {
    };
    Game.prototype.setTimeX = function () {
        this.timeId = new egret.Timer(1000, 0);
        this.timeId.addEventListener(egret.TimerEvent.TIMER, this.reduceTime, this);
        this.timeId.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFuncC, this);
        this.timeId.start();
    };
    Game.prototype.reduceTime = function () {
        this.timeNumX -= 1;
        this.c_game_time.text = this.timeNumX.toString() + 's';
        if (this.timeNumX === 0) {
            this.timeId.stop();
            //TODO: 弹出失败对话框，是否继续
            this.gameXFail();
        }
    };
    // 文本初始化：将生成的四个数字放入到块中
    // 本地保存四个数，便于刷新时使用
    Game.prototype.initFourText = function (fourNumArr) {
        egret.localStorage.setItem('localFourNum', JSON.stringify(fourNumArr));
        this.label1.text = fourNumArr[0];
        this.label2.text = fourNumArr[1];
        this.label3.text = fourNumArr[2];
        this.label4.text = fourNumArr[3];
    };
    Game.prototype.initFourButton = function (buttonGroup) {
        for (var i = 0; i < buttonGroup.$children.length; i++) {
            buttonGroup.$children[i].visible = true;
            buttonGroup.$children[i].$children[0].$children[0].source = RES.getRes('normal_png');
            buttonGroup.$children[i].$children[1].touchEnabled = true;
            buttonGroup.$children[i].$children[1].enabled = true;
        }
    };
    // ======== 因此将事件对象挂在到这个界面对象上。
    // 当数字或者是符号被点击的时候，处理相关逻辑
    Game.prototype.handleTouch = function (e) {
        // 用户获取当前被点击对象的值
        var value = e.$target.text || e.$target.name;
        // 只有当值存在的时候才执行计算逻辑
        if (value || value === 0) {
            switch (this.tempArr.length) {
                //  数组的第一个必须为数字，数组长度加1，改变背景颜色
                case 0:
                    if (Number(value) || Number(value) === 0) {
                        this.tempArr.push(e.$target);
                        this.changeImg(e.$target.$parent.$children[0]);
                    }
                    break;
                // 数组的第二个必须为符号，
                // 如果为数字，将第一个数字去除掉，将当前数字存储，并使用排他功能改变颜色
                // 如果是字符，将字符添加到数组，并是的第一个数字不能被点击
                case 1:
                    if (Number(value) || Number(value) === 0) {
                        this.tempArr.pop();
                        this.tempArr.push(e.$target);
                        this.changeImg(e.$target.$parent.$children[0]);
                    }
                    else {
                        this.tempArr.push(value);
                        this.tempArr[0].touchEnabled = false;
                        this.tempArr[0].enabled = false;
                    }
                    break;
                // 数组的第三个必须是数字
                // 如果不是数字，将前一个符号移除，添加新的符号
                // 如果是数字，添加数字，计算结果
                // 如果结果中为负值或者是小数，则不支持这种运算，将数字移除
                // 如果能计算出结果，改变背景颜色，并执行动画函数
                case 2:
                    if (Number(value) || Number(value) === 0) {
                        this.tempArr.push(e.$target);
                        var result_1 = this.calResult(Number(this.tempArr[0].text), this.tempArr[1], Number(this.tempArr[2].text));
                        if (result_1 === '不支持这种运算') {
                            this.tempArr.pop();
                            return;
                        }
                        else {
                            this.changeImg(e.$target.$parent.$children[0]);
                            this.blockAnimation(this.tempArr[0].$parent, this.tempArr[2].$parent);
                            this.currentEvent = e.$target;
                            // 动画结束后立马重置数据
                            var timer = new egret.Timer(250, 1);
                            // timer.addEventListener(egret.TimerEvent.TIMER, () => {}, this)
                            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                                var _this = this;
                                // 重置结果，得出结果，临时保存第二个数字对应的对象，再清除存储数组，成功计算数加1
                                this.tempArr[2].text = result_1;
                                var tempElement = { $target: this.tempArr[2] };
                                this.successNum += 1;
                                this.tempArr = [];
                                if (this.successNum === 3) {
                                    // 防止成功或失败了还在计时
                                    if (this.timeId) {
                                        console.log(this.timeId);
                                        console.log(1);
                                        this.timeId.stop();
                                    }
                                    if (result_1 === 24) {
                                        // 成功后的初始化；分数增加，背景颜色改变，不可点击
                                        this.total_score++;
                                        this.currentEvent.$parent.$children[0].$children[0].source = RES.getRes('success_png');
                                        this.currentEvent.touchEnabled = false;
                                        this.currentEvent.enabled = false;
                                        // 重新开始游戏 ============== 判断3 =================
                                        // 生成新的数组
                                        var tempFourNumArr_1 = this.makeFourNum();
                                        if (this.gameName === 'X') {
                                            setTimeout(function () {
                                                // 弹出成功界面，执行完动画效果后进入新的界面
                                                _this.gameXSuccess(_this.currentEvent.$parent); //弹出成功页面1s
                                                setTimeout(function () {
                                                    _this.c_score.text = _this.total_score.toString();
                                                    _this.c_game_score.text = ((_this.total_score - 1) * 100).toString();
                                                    _this.replay(tempFourNumArr_1);
                                                }, 500); // 在弹出成功页面的过程中，改变分数和重新开始游戏
                                            }, 300); //等待成功的那个按钮的显示 300ms
                                        }
                                        else {
                                            // 分数先变后重新开始
                                            this.c_score.text = this.total_score.toString();
                                            this.c_game_score.text = ((this.total_score - 1) * 100).toString();
                                            setTimeout(function () {
                                                _this.replay(tempFourNumArr_1);
                                            }, 500);
                                        }
                                        //这个return最后需要去掉
                                        return;
                                    }
                                    else {
                                        if (this.gameName === 'X') {
                                            this.gameXFail();
                                        }
                                        else {
                                            this.handleFail(this.currentEvent);
                                        }
                                    }
                                }
                                // 如果此时是属于计算的过程，那么相当于直接点击了第二个数字。
                                this.handleTouch(tempElement);
                                return;
                            }, this);
                            timer.start();
                        }
                    }
                    else {
                        this.tempArr.pop();
                        this.tempArr.push(value);
                    }
                    break;
            }
        }
    };
    //处理错误结果
    Game.prototype.handleFail = function (e) {
        var _this = this;
        e.touchEnabled = false;
        e.enabled = false;
        setTimeout(function () {
            _this.replay(JSON.parse(egret.localStorage.getItem('localFourNum')));
        }, 400);
    };
    Game.prototype.gameXSuccess = function (group) {
        var _this = this;
        var instance = new GameSuccess(group.x + group.width / 2 + this.gp_num.x, group.y + group.height / 2 + this.gp_num.y, Number(this.c_score.text) + 1, this.gameX_bgc.width);
        this.addChild(instance);
        setTimeout(function () {
            _this.removeChild(instance);
            _this.timeNumX = 30;
            _this.timeId.start();
        }, 1000);
    };
    Game.prototype.gameXFail = function () {
        //添加失败页面，并把该页面传过去，以便最后关闭该页面
        this.$parent.addChild(new GameXFail(this));
    };
    // 第一个数字的块运动到第二个数字的块 
    Game.prototype.blockAnimation = function (element1, element2) {
        var currentX = element1.x;
        var currentY = element1.y;
        //移动过去后立马不可见并回到原位置待命
        egret.Tween.get(element1)
            .to({
            x: element2.x,
            y: element2.y,
        }, 240, egret.Ease.cubicOut)
            .to({
            visible: false
        }, 0)
            .to({
            x: currentX,
            y: currentY
        }, 0);
    };
    Game.prototype.calResult = function (num1, symbol, num2) {
        switch (symbol) {
            case '+':
                return num1 + num2;
            case '-':
                if (num1 - num2 >= 0) {
                    return num1 - num2;
                }
                else {
                    return '不支持这种运算';
                }
            case '*':
                return num1 * num2;
            case '/':
                if (num2 !== 0 && num1 % num2 === 0) {
                    return num1 / num2;
                }
                else {
                    return '不支持这种运算';
                }
        }
    };
    Game.prototype.changeImg = function (target) {
        for (var i = 0; i < this.gp_num.$children.length; i++) {
            target.$parent.$parent.$children[i].$children[0].$children[0].source = RES.getRes('normal_png');
        }
        target.$children[0].source = RES.getRes('select_png');
    };
    /* 生成四个符合计算要求的随机数 */
    Game.prototype.makeFourNum = function () {
        var tempArr = this.makeFourNumArr(Number(this.c_score.text));
        while (!tempArr) {
            tempArr = this.makeFourNumArr(Number(this.c_score.text));
        }
        return tempArr;
    };
    Game.prototype.makeFourNumArr = function (num) {
        var s = [];
        // 不同关卡的数据生成
        if (num < 10) {
            var select = [4, 6, 8];
            for (var i = 0; i < 4; i++) {
                s.push(select[parseInt((Math.random() * 4).toString())]);
            }
        }
        else if (num < 20) {
            var select = [2, 4, 6, 8];
            for (var i = 0; i < 4; i++) {
                s.push(select[parseInt((Math.random() * 4).toString())]);
            }
        }
        else if (num < 40) {
            var select = [2, 3, 4, 6, 8];
            for (var i = 0; i < 4; i++) {
                s.push(select[parseInt((Math.random() * 4).toString())]);
            }
        }
        else if (num < 80) {
            for (var i = 0; i < 4; i++) {
                s.push(Math.floor(Math.random() * 10 + 1));
            }
        }
        else {
            for (var i = 0; i < 4; i++) {
                s.push(Math.floor(Math.random() * 13 + 1));
            }
        }
        /* 存储符号 */
        var O = [{
                name: "-",
                f: function (m, n) {
                    return m - n;
                }
            }, {
                name: "+",
                f: function (m, n) {
                    return m + n;
                }
            }, {
                name: "/",
                f: function (m, n) {
                    return m / n;
                }
            }, {
                name: "*",
                f: function (m, n) {
                    return m * n;
                }
            }];
        /* 四个数字保存在b[1] b[2] b[4] b[8]中 */
        var b = [];
        for (var i = 0; i < s.length; i++) {
            b[1 << i] = Math.floor(s[i]);
        }
        // for (let i in s)
        //     b[1 << i] = parseInt(s[i])
        /* 存放式子，用于判断式子是否已经存在 */
        var result = {};
        /* 存放式子，输出之后可查看所有解析出来的结果 */
        var resultArr = [];
        /* 遍历所有的可能性，查找符合要求的式子 */
        for (var i1 = 1; i1 <= 8; i1 <<= 1)
            for (var i2 = 1; i2 <= 8; i2 <<= 1)
                for (var i3 = 1; i3 <= 8; i3 <<= 1)
                    for (var i4 = 1; i4 <= 8; i4 <<= 1) {
                        //所有数字排列组合，简单去掉重复数字
                        if ((i1 | i2 | i3 | i4) != 0xf)
                            continue;
                        for (var f1 = 0; f1 <= 3; f1++)
                            for (var f2 = 0; f2 <= 3; f2++)
                                for (var f3 = 0; f3 <= 3; f3++) {
                                    var of1 = O[f1];
                                    var of2 = O[f2];
                                    var of3 = O[f3];
                                    // ((1,2)3)4
                                    var m = of3.f(of2.f(of1.f(b[i1], b[i2]), b[i3]), b[i4]);
                                    if (Math.abs(m - 24) < 1e-5) {
                                        return s;
                                    }
                                    // if (writeResult("((N%N)%N)%N")) return false
                                    // 1((2,3)4)
                                    m = of1.f(b[i1], of3.f(of2.f(b[i2], b[i3]), b[i4]));
                                    if (Math.abs(m - 24) < 1e-5) {
                                        return s;
                                    }
                                    // if (writeResult("N%((N%N)%N)")) return false
                                    //  (1(2,3))4
                                    m = of3.f(of1.f(b[i1], of2.f(b[i2], b[i3])), b[i4]);
                                    if (Math.abs(m - 24) < 1e-5) {
                                        return s;
                                    }
                                    // if (writeResult("(N%(N%N))%N")) return false
                                    //1(2(3,4))
                                    m = of1.f(b[i1], of2.f(b[i2], of3.f(b[i3], b[i4])));
                                    if (Math.abs(m - 24) < 1e-5) {
                                        return s;
                                    }
                                    // if (writeResult("N%(N%(N%N))")) return false
                                    //(1,2)(3,4)
                                    m = of2.f(of1.f(b[i1], b[i2]), of3.f(b[i3], b[i4]));
                                    if (Math.abs(m - 24) < 1e-5) {
                                        return s;
                                    }
                                    // if (writeResult("(N%N)%(N%N)")) return false
                                }
                    }
        /* 将生成的 数字 和 所有可行的式子 返回 */
        // return {s: s, resultArr: resultArr}
    };
    //==========================================
    //重置功能
    Game.prototype.replay = function (initFourNumArr) {
        this.tempArr.length = 0;
        this.successNum = 0;
        this.initFourText(initFourNumArr);
        this.initFourButton(this.gp_num);
    };
    Game.prototype.gameOver = function () {
        // 立马更新数据
        platform.openDataContext.postMessage({
            score: this.c_game_score.text.toString(),
            openId: egret.localStorage.getItem('openId'),
            command: 'updateMaxScore'
        });
        if (this.timer) {
            this.timer.stop();
        }
        if (this.timeId) {
            this.timeId.stop();
        }
        this.$parent.addChild(new GameOver(this.c_game_score.text, this));
        this.$parent.removeChild(this);
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game");
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver(finalScore, self) {
        var _this = _super.call(this) || this;
        _this.skinName = 'resource/eui_skins/GameOver.exml';
        // 内容show all
        DisUtil.get(_this).beCon();
        // 画背景并覆盖
        var rect = new egret.Shape();
        rect.graphics.beginFill(0x05B2DF);
        rect.graphics.drawRect(0, 0, self.$parent.width, self.$parent.height);
        rect.graphics.endFill();
        _this.addChildAt(rect, 0);
        DisUtil.get(rect).cover();
        _this.final_score.text = finalScore;
        // 回到首页，再玩一次，分享，排行榜事件监听
        _this.go_home.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.goHome, _this);
        _this.new_gameX.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.newGame(self);
        }, _this);
        _this.game_share.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.share, _this);
        _this.total_rank.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.showTotalRank, _this);
        _this.the_best.addChild(platform.openDataContext.createDisplayObject(null, _this.the_best.width, _this.the_best.height));
        platform.openDataContext.postMessage({
            avatarWidth: _this.width,
            avatarHeight: _this.height,
            command: 'drawAvatar'
        });
        return _this;
    }
    GameOver.prototype.goHome = function () {
        this.$parent.addChild(new HomePage());
        this.$parent.removeChild(this);
    };
    GameOver.prototype.newGame = function (self) {
        if (self.gameName === 'X') {
            this.$parent.addChild(new Game('X'));
        }
        else if (self.gameName === 'C') {
            this.$parent.addChild(new Game('C'));
        }
        this.$parent.removeChild(this);
    };
    GameOver.prototype.share = function () {
        platform.shareAppMessage();
    };
    GameOver.prototype.showTotalRank = function () {
        this.$parent.addChild(new ShowRank(this, true));
    };
    return GameOver;
}(eui.Component));
__reflect(GameOver.prototype, "GameOver");
var GameXFail = (function (_super) {
    __extends(GameXFail, _super);
    function GameXFail(self) {
        var _this = _super.call(this) || this;
        _this.skinName = 'resource/eui_skins/GameFail.exml';
        DisUtil.get(_this).beCon();
        var rect = new egret.Shape();
        rect.graphics.beginFill(0x000000, 0.6);
        rect.graphics.drawRect(0, 0, self.$parent.width, self.$parent.height);
        rect.graphics.endFill();
        _this.addChildAt(rect, 0);
        DisUtil.get(rect).cover();
        _this.game_close_replay.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.handleClose(self);
        }, _this);
        _this.share_icon.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.handleShare(self);
        }, _this);
        _this.share_label.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.handleShare(self);
        }, _this);
        return _this;
    }
    GameXFail.prototype.handleClose = function (self) {
        // 立马更新数据
        platform.openDataContext.postMessage({
            score: self.c_game_score.text.toString(),
            openId: egret.localStorage.getItem('openId'),
            command: 'updateMaxScore'
        });
        self.$parent.addChild(new GameOver(self.c_game_score.text, self));
        self.$parent.removeChild(self);
        this.$parent.removeChild(this);
    };
    GameXFail.prototype.handleShare = function (self) {
        var _this = this;
        platform.shareAppMessage().then(function () {
            _this.$parent.removeChild(_this);
            self.replay(self.makeFourNum());
            self.timeNumX = 30;
            self.timeId.start();
        }).catch(function () {
            console.log('分享失败');
        });
    };
    return GameXFail;
}(eui.Component));
__reflect(GameXFail.prototype, "GameXFail");
// class GameSuccess extends eui.Component {
//     public constructor (x, y, round) {
//         super()
//         this.skinName = 'resource/eui_skins/GameXSuccess.exml'
//     }
// }
var GameSuccess = (function (_super) {
    __extends(GameSuccess, _super);
    function GameSuccess(x, y, round, screenWidth) {
        var _this = _super.call(this) || this;
        _this.titleLabel = new egret.TextField();
        _this.roundLabel = new egret.TextField();
        _this.initCircle(x, y);
        _this.initText(round, screenWidth);
        return _this;
    }
    GameSuccess.prototype.initCircle = function (x, y) {
        this.drawCircle(x, y);
        this.scaleToFull();
    };
    GameSuccess.prototype.drawCircle = function (x, y) {
        this.circleImg = new egret.Bitmap();
        this.circleImg.texture = RES.getRes('circle_png');
        this.circleImg.width = 6;
        this.circleImg.height = 6;
        this.circleImg.anchorOffsetX = 3;
        this.circleImg.anchorOffsetY = 3;
        this.circleImg.x = x;
        this.circleImg.y = y;
        this.addChild(this.circleImg);
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
        var scaleBase = 0;
        var scaleStep = 0.05;
        this.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
            if (_this.circleImg.scaleX > 300 || _this.scaleY > 300) {
                return;
            }
            // 正弦函数放大 在300倍内
            _this.circleImg.scaleX = _this.circleImg.scaleY = 1 + 300 * Math.abs(scaleBase += scaleStep);
        }, this);
    };
    return GameSuccess;
}(egret.DisplayObjectContainer));
__reflect(GameSuccess.prototype, "GameSuccess");
/**
 * 显示对象的封装
 */
var DisUtil = (function () {
    function DisUtil() {
    }
    /**
     * 设置大小
     * @param disObj 目标容器
     * @param width 宽
     * @param height 高
     */
    DisUtil.size = function (disObj, width, height) {
        disObj.width = width;
        disObj.height = height;
    };
    /**
     * 设置锚点
     * @param disObj 显示对象
     * @param anchoX x锚点
     * @param anchoY y锚点
     */
    DisUtil.ancho = function (disObj, anchoX, anchoY) {
        disObj.anchorOffsetX = anchoX;
        disObj.anchorOffsetY = anchoY;
    };
    /**
     * 设置坐标
     * @param disObj 显示对象
     * @param x 横坐标
     * @param y 纵坐标
     */
    DisUtil.location = function (disObj, x, y) {
        disObj.x = x;
        disObj.y = y;
    };
    /**
     * 获取一个复制显示对象枚举属性的显示对象
     * @param disObj 复制对象的宽高，坐标设置为0
     */
    DisUtil.getCloneBase = function (disObj) {
        var clone = new egret.DisplayObject();
        DisUtil.location(clone, 0, 0);
        DisUtil.size(clone, disObj.width, disObj.height);
        return clone;
    };
    /**
     * 定义“基础型显示对象”为锚点位于左上角，x缩放、y缩放均为1的显示对象
     * 获取对于显示对象A而言，B显示对象的“基础型显示对象”,A为B的祖先
     * @param child 显示对象B
     * @param ancient 显示对象A
     */
    DisUtil.getRelaRect = function (child, ancient) {
        var rect = DisUtil.getCloneBase(child);
        rect = DisUtil.getInRectRelaRect(rect, child, ancient);
        return rect;
    };
    /**
     * 获取对于显示对象A而言的"基础型显示对象"B 对于C而言的 “基础型显示对象”D
     * @param rect “基础型显示对象”B
     * @param parent 显示对象A
     * @param ancient 显示对象C
     */
    DisUtil.getInRectRelaRect = function (rect, parent, ancient) {
        var parX, parY, parScaleX, parScaleY;
        while (parent != ancient) {
            if (!egret.is(parent, "egret.Stage")) {
                parX = parent.x;
                parY = parent.y;
                parScaleX = parent.scaleX;
                parScaleY = parent.scaleY;
            }
            else {
                parX = 0;
                parY = 0;
                parScaleX = 1;
                parScaleY = 1;
            }
            rect.x = parX + (rect.x - parent.anchorOffsetX) * parScaleX;
            rect.y = parY + (rect.y - parent.anchorOffsetY) * parScaleY;
            rect.width *= parScaleX;
            rect.height *= parScaleY;
            parent = parent.parent;
        }
        return rect;
    };
    /**
     * 给显示对象布局
     * @param disObj 目标显示对象
     * @param ancient 参考对象，无则默认为浏览器窗口
     */
    DisUtil.get = function (disObj, ancient) {
        var relRect = DisUtil.getRelaRect(disObj, ancient);
        return new situate(relRect, disObj, ancient);
    };
    /**
     * 设置显示对象的缩放
     * @param disObj 设置对象
     * @param scalNum 缩放值
     */
    DisUtil.setScal = function (disObj, scalNum) {
        disObj.scaleX = disObj.scaleY = scalNum;
    };
    /**
     * 缩放当前显示对象
     * @param disObj 缩放对象
     * @param scaleNum 缩放值
     */
    DisUtil.scale = function (disObj, scalNum) {
        disObj.scaleX *= scalNum;
        disObj.scaleY *= scalNum;
    };
    /**
     * 通过改变宽高来达到缩放的效果
     * @param disObj 显示对象
     * @param scaleNum 缩放大小
     */
    DisUtil.scalLen = function (disObj, scaleNum) {
        disObj.width *= scaleNum;
        disObj.height *= scaleNum;
    };
    /**
     * 输出显示对象的状态
     * @param disObj 显示对象
     */
    DisUtil.disShow = function (disObj, fixNum) {
        fixNum = fixNum ? fixNum : 1;
        console.log("x:" + disObj.x.toFixed(fixNum) + ",y:" + disObj.y.toFixed(fixNum) + ",anchorOffsetX:" + disObj.anchorOffsetX.toFixed(fixNum) + ",anchorOffsetY:" + disObj.anchorOffsetY.toFixed(fixNum) + ",scaleX:" + disObj.scaleX.toFixed(fixNum) + ",scaleY:" + disObj.scaleY.toFixed(fixNum) + ",width:" + disObj.width.toFixed(fixNum) + ",height:" + disObj.height.toFixed(fixNum) + ",alpha:" + disObj.alpha);
    };
    return DisUtil;
}());
__reflect(DisUtil.prototype, "DisUtil");
/**
 * 用于链式对显示对象进行布局
 */
var situate = (function () {
    function situate(relRect, disObj, ancient) {
        this.relRect = relRect;
        this.disObj = disObj;
        this.ancient = ancient;
        if (ancient) {
            this.conWidth = ancient.width;
            this.conHeight = ancient.height;
        }
        else {
            this.conWidth = window.innerWidth;
            this.conHeight = window.innerHeight;
        }
        this.anRateX = disObj.anchorOffsetX / disObj.width;
        this.anRateY = disObj.anchorOffsetY / disObj.height;
    }
    /**
     * 进行缩放的同时进行其他处理
     * @param scaleNum 缩放大小
     */
    situate.prototype.scale = function (scaleNum) {
        var self = this;
        var relDistanceX = this.anRateX * (scaleNum - 1) * self.relRect.width;
        var relDistanceY = this.anRateY * (scaleNum - 1) * self.relRect.height;
        DisUtil.scale(self.disObj, scaleNum);
        DisUtil.scalLen(self.relRect, scaleNum);
        //更正坐标
        self.relRect.x -= relDistanceX;
        self.relRect.y -= relDistanceY;
    };
    /**
     * 水平移动同时进行其他处理
     * @param distance 相对距离
     * @param scaleNum 缩放大小
     */
    situate.prototype.moveX = function (distance, scaleNum) {
        var self = this;
        self.relRect.x += distance;
        self.disObj.x += (distance *= scaleNum);
    };
    /**
     * 竖直移动同时进行其他处理
     * @param distance 相对距离
     * @param scaleNum 缩放大小
     */
    situate.prototype.moveY = function (distance, scaleNum) {
        var self = this;
        self.relRect.y += distance;
        self.disObj.y += (distance *= scaleNum);
    };
    /**
     * 适应宽度
     */
    situate.prototype.fitW = function () {
        var self = this;
        if (self.relRect.width == 0) {
            egret.error("\u5BBD\u5EA6\u4E3A0\u7684\u663E\u793A\u5BF9\u8C61\u65E0\u6CD5\u5E94\u7528\u201C\u9002\u5E94\u5BBD\u5EA6\u201D\u7684\u7F29\u653E\u6A21\u5F0F");
            return this;
        }
        //获取父容器、目标容器缩放比
        var scaleNum = self.conWidth / self.relRect.width;
        self.scale(scaleNum);
        self.cenHor();
        return self;
    };
    /**
     * 适应高度
     */
    situate.prototype.fitH = function () {
        var self = this;
        if (self.relRect.height == 0) {
            egret.error("\u9AD8\u5EA6\u4E3A0\u7684\u663E\u793A\u5BF9\u8C61\u65E0\u6CD5\u5E94\u7528\u201C\u9002\u5E94\u9AD8\u5EA6\u201D\u7684\u7F29\u653E\u6A21\u5F0F");
            return this;
        }
        //获取父容器、目标容器缩放比
        var scaleNum = self.conHeight / self.relRect.height;
        self.scale(scaleNum);
        self.cenVer();
        return self;
    };
    /**
     * 被包含在内
     */
    situate.prototype.beCon = function () {
        var self = this;
        var conRate = self.conWidth / self.conHeight;
        var rectRate = self.relRect.width / self.relRect.height;
        var scaleNum = rectRate >= conRate ? self.conWidth / self.relRect.width : self.conHeight / self.relRect.height;
        self.scale(scaleNum);
        self.center();
        return this;
    };
    /**
     * 覆盖全部
     */
    situate.prototype.cover = function () {
        var self = this;
        var conRate = self.conWidth / self.conHeight;
        var rectRate = self.relRect.width / self.relRect.height;
        var scaleNum = rectRate >= conRate ? self.conHeight / self.relRect.height : self.conWidth / self.relRect.width;
        self.scale(scaleNum);
        self.center();
        return this;
    };
    /**
     * 水平垂直居中
     */
    situate.prototype.center = function () {
        this.cenVer();
        this.cenHor();
        return this;
    };
    /**
     * 垂直居中
     */
    situate.prototype.cenVer = function () {
        var self = this;
        var yDistance = self.conHeight / 2 - self.relRect.y - self.relRect.height / 2;
        var scaleNumY = self.disObj.height * self.disObj.scaleY / self.relRect.height;
        self.moveY(yDistance, scaleNumY);
        return self;
    };
    /**
     * 水平居中
     */
    situate.prototype.cenHor = function () {
        var self = this;
        var xDistance = self.conWidth / 2 - self.relRect.x - self.relRect.width / 2;
        var scaleNumX = self.disObj.width * self.disObj.scaleX / self.relRect.width;
        self.moveX(xDistance, scaleNumX);
        return self;
    };
    /**
     * 居左
     * @param distance 距离
     */
    situate.prototype.left = function (distance) {
        distance = distance == null ? 0 : distance;
        var self = this;
        var scaleNumX = self.disObj.width * self.disObj.scaleX / self.relRect.width;
        var xDistance = distance - self.relRect.x;
        self.moveX(xDistance, scaleNumX);
        return this;
    };
    /**
     * 居右
     * @param distance 距离
     */
    situate.prototype.right = function (distance) {
        var self = this;
        distance = distance == null ? 0 : distance;
        var scaleNumX = self.disObj.width * self.disObj.scaleX / self.relRect.width;
        var xDistance = self.conWidth - self.relRect.x - self.relRect.width - distance;
        self.moveX(xDistance, scaleNumX);
        return this;
    };
    /**
     * 居顶
     * @param distance 距离
     */
    situate.prototype.top = function (distance) {
        distance = distance == null ? 0 : distance;
        var self = this;
        var scaleNumY = self.disObj.height * self.disObj.scaleY / self.relRect.height;
        var yDistance = distance - self.relRect.y;
        self.moveY(yDistance, scaleNumY);
        return this;
    };
    /**
     * 居底
     * @param distance 距离
     */
    situate.prototype.bottom = function (distance) {
        distance = distance == null ? 0 : distance;
        var self = this;
        distance = distance == null ? 0 : distance;
        var scaleNumY = self.disObj.height * self.disObj.scaleY / self.relRect.height;
        var yDistance = self.conHeight - self.relRect.y - self.relRect.height - distance;
        self.moveY(yDistance, scaleNumY);
        return this;
    };
    /**
     * 输出当前“基础型对象的坐标和宽高”
     * @param fixNum 精度
     */
    situate.prototype.show = function (fixNum) {
        fixNum = fixNum ? fixNum : 1;
        var rect = this.relRect;
        console.log("x:" + rect.x.toFixed(fixNum) + ",y:" + rect.y.toFixed(fixNum) + ",width:" + rect.width.toFixed(fixNum) + ",height:" + rect.height.toFixed(fixNum));
        return this;
    };
    return situate;
}());
__reflect(situate.prototype, "situate");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        platform.openDataContext.postMessage({
            command: 'loadRes'
        });
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // await platform.openDataContext.postMessage({
                    //     command: 'loadRes'
                    // })
                    return [4 /*yield*/, this.loadResource()];
                    case 1:
                        // await platform.openDataContext.postMessage({
                        //     command: 'loadRes'
                        // })
                        _a.sent();
                        this.createGameScene();
                        // const result = await RES.getResAsync("description_json")
                        // this.startAnimation(result);
                        return [4 /*yield*/, platform.login().then(function (res) {
                                // console.log(res)
                                egret.localStorage.setItem('openId', res);
                            })];
                    case 2:
                        // const result = await RES.getResAsync("description_json")
                        // this.startAnimation(result);
                        _a.sent();
                        // const userInfo = await platform.getUserInfo();
                        return [4 /*yield*/, platform.getUserInfo().then(function (res) {
                                // console.log(res)
                                // let KVDataList = [{key: 'maxScore', value: '0'}]
                                // platform.setUserCloudStorage(KVDataList)
                            })];
                    case 3:
                        // const userInfo = await platform.getUserInfo();
                        _a.sent();
                        return [4 /*yield*/, platform.showShareMenu()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        this.addChild(new HomePage());
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.showShareMenu = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.shareAppMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.setUserCloudStorage = function (score) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
var ShowRank = (function (_super) {
    __extends(ShowRank, _super);
    function ShowRank(self, smallRank) {
        var _this = _super.call(this) || this;
        _this.showRank(self);
        if (smallRank) {
            _this.smallRank = smallRank;
        }
        return _this;
    }
    ShowRank.prototype.showRank = function (self) {
        // 禁止点击
        self.touchChildren = false;
        // mask
        this.maskShp = new egret.Shape();
        this.maskShp.graphics.beginFill(0x000000, 0.6);
        this.maskShp.graphics.drawRect(0, 0, self.stage.stageWidth, self.stage.stageHeight);
        this.maskShp.graphics.endFill();
        self.$parent.addChildAt(this.maskShp, self.$parent.numChildren + 1);
        // 添加排行榜
        this.rankList = platform.openDataContext.createDisplayObject(null, self.stage.stageWidth, self.stage.stageHeight);
        self.$parent.addChildAt(this.rankList, self.$parent.numChildren + 1);
        platform.openDataContext.postMessage({
            command: 'open'
        });
        // 添加删除按钮
        this.closeBtn = new eui.Label();
        this.closeBtn.size = self.height / 40;
        this.closeBtn.textAlign = egret.HorizontalAlign.CENTER;
        this.closeBtn.textColor = 0x00ff00;
        this.closeBtn.lineSpacing = 6;
        this.closeBtn.text = '点击关闭';
        this.closeBtn.x = self.stage.stageWidth / 2 - this.closeBtn.width / 2;
        this.closeBtn.y = self.stage.stageHeight * 37 / 40;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.handleClose(self);
        }, this);
        self.$parent.addChildAt(this.closeBtn, self.numChildren + 1);
    };
    ShowRank.prototype.handleClose = function (self) {
        self.$parent.removeChild(this.closeBtn);
        self.$parent.removeChild(this.maskShp);
        platform.openDataContext.postMessage({
            command: 'close'
        });
        self.$parent.removeChild(this.rankList);
        self.$parent.removeChild(this);
        if (this.smallRank) {
            platform.openDataContext.postMessage({
                command: 'drawAvatar'
            });
        }
        self.touchChildren = true;
    };
    return ShowRank;
}(eui.Component));
__reflect(ShowRank.prototype, "ShowRank");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
;window.Main = Main;
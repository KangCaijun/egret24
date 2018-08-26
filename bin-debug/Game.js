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
var Game = (function (_super) {
    __extends(Game, _super);
    function Game(name) {
        var _this = _super.call(this) || this;
        _this.timeNum = 0;
        _this.timeNumX = 30;
        // 计算逻辑
        _this.tempArr = [];
        _this.successNum = 0;
        _this.total_score = 1;
        _this.gameName = name;
        // 引入贴图            ======================判断1============
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
        // 设置定时器，计算总的时间 =================判断2===================
        // //this.setTime()
        //生成4个数，用于计算
        for (var i = 0; i < _this.gp_num.$children.length; i++) {
            _this.gp_num.$children[i].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.handleTouch, _this, true);
        }
        for (var j = 0; j < _this.gp_symbol.$children.length; j++) {
            _this.gp_symbol.$children[j].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.handleTouch, _this, true);
        }
        _this.initFourText(_this.makeFourNum());
        //重新开始游戏
        _this.c_replay.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.replay(JSON.parse(egret.localStorage.getItem('localFourNum')));
        }, _this);
        //结束游戏
        _this.game_over.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.gameOver, _this);
        return _this;
    }
    Game.prototype.setTimeC = function () {
        var timer = new egret.Timer(1000, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.timerFuncC, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFuncC, this);
        timer.start();
    };
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
        var timeId = new egret.Timer(1000, 0);
        this.timeId = timeId;
        this.timeId.addEventListener(egret.TimerEvent.TIMER, this.reduceTime, this);
        this.timeId.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFuncC, this);
        this.timeId.start();
    };
    Game.prototype.reduceTime = function () {
        this.timeNumX -= 1;
        this.c_game_time.text = this.timeNumX.toString() + 's';
        if (this.timeNumX === 0) {
            this.timeId.stop();
            //TODO: 弹出失败对话框，是否继续===============================》》》》》》》》》
            this.gameXFail();
        }
    };
    // 文本初始化
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
    Game.prototype.handleTouch = function (e) {
        var value = e.$target.text || e.$target.name;
        console.log(value);
        if (value) {
            // e.$target.touchEnabled = false
            // e.$target.enabled = false
            // e.$target.alpha = 0.5
            // e.$target.$parent.$children[0].$children[0].alpha = 0.5
            if (e.$target.text) {
                this.changeImg(e.$target.$parent.$children[0]);
            }
            // e.$target.text // e.$target.$parent.$x / $y
            //    console.log(e.$target.name);
            switch (this.tempArr.length) {
                case 0:
                    if (Number(value)) {
                        this.tempArr.push(e.$target);
                    }
                    break;
                case 1:
                    if (Number(value)) {
                        this.tempArr.pop();
                        this.tempArr.push(e.$target);
                    }
                    else {
                        this.tempArr.push(value);
                        this.tempArr[0].touchEnabled = false;
                        this.tempArr[0].enabled = false;
                    }
                    break;
                case 2:
                    if (Number(value)) {
                        this.tempArr.push(e.$target);
                        var result_1 = this.calResult(Number(this.tempArr[0].text), this.tempArr[1], Number(this.tempArr[2].text));
                        if (result_1 === '不支持这种运算') {
                            this.tempArr.pop();
                            return;
                        }
                        else {
                            this.blockAnimation(this.tempArr[0].$parent, this.tempArr[2].$parent);
                            //setTimeout 无法接收到事件对象
                            this.currentEvent = e.$target;
                            var timer = new egret.Timer(300, 1);
                            console.log(e.$target);
                            timer.addEventListener(egret.TimerEvent.TIMER, function () { }, this);
                            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                                var _this = this;
                                console.log(this.currentEvent);
                                this.tempArr[2].text = result_1;
                                var tempElement = { $target: this.tempArr[2] };
                                this.successNum += 1;
                                this.tempArr = [];
                                if (this.successNum === 3) {
                                    if (result_1 === 24) {
                                        this.total_score++;
                                        this.currentEvent.$parent.$children[0].$children[0].source = RES.getRes('success_png');
                                        this.currentEvent.touchEnabled = false;
                                        this.currentEvent.enabled = false;
                                        console.log(2);
                                        // TODO 重新开始游戏
                                        var tempFourNumArr_1 = this.makeFourNum();
                                        if (this.gameName === 'X') {
                                            setTimeout(function () {
                                                //TODO :弹出成功对话框
                                                console.log(3);
                                                _this.gameXSuccess(_this.currentEvent.$parent);
                                                setTimeout(function () {
                                                    console.log(4);
                                                    _this.c_score.text = _this.total_score.toString();
                                                    _this.c_game_score.text = ((_this.total_score - 1) * 100).toString();
                                                    _this.replay(tempFourNumArr_1);
                                                    console.log(5);
                                                }, 800);
                                            }, 500);
                                        }
                                        else {
                                            setTimeout(function () {
                                                _this.c_score.text = _this.total_score.toString();
                                                _this.c_game_score.text = ((_this.total_score - 1) * 100).toString();
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
                                this.handleTouch(tempElement);
                                return;
                            }, this);
                            timer.start();
                            // setTimeout((e) => {
                            // this.tempArr[2].text = result
                            // let tempElement = {$target: this.tempArr[2]}
                            // this.successNum += 1
                            // this.tempArr = []
                            // if (this.successNum === 3) {
                            //     if (result === 24) {
                            //         this.total_score++
                            //         e.$parent.$children[0].$children[0].source = RES.getRes('success_png')
                            //         e.touchEnabled = false
                            //         e.enabled = false
                            //         // TODO 重新开始游戏
                            //         let tempFourNumArr = this.makeFourNum()
                            //         if (this.gameName === 'X') {  
                            //             setTimeout(() => {
                            //                 //TODO :弹出成功对话框
                            //                 this.gameXSuccess(e.$parent)
                            //                 setTimeout(() => {
                            //                     this.c_score.text = this.total_score.toString()
                            //                     this.c_game_score.text = ((this.total_score - 1) * 100).toString()
                            //                     this.replay(tempFourNumArr)
                            //                 }, 800)
                            //             }, 500)
                            //         } else {
                            //             setTimeout(() => {
                            //                  this.c_score.text = this.total_score.toString()
                            //                  this.c_game_score.text = ((this.total_score - 1) * 100).toString()
                            //                  this.replay(tempFourNumArr)
                            //             }, 500)
                            //         }              
                            //         //这个return最后需要去掉
                            //         return
                            //     } else {
                            //         if (this.gameName === 'X') {
                            //             //TODO: 弹出失败对话框  // =================>>>>>>》》》》》》》
                            //             this.gameXFail()
                            //         } else {
                            //             this.handleFail(e)
                            //         }
                            //     }
                            // }
                            // this.handleTouch(tempElement)
                            // return
                            // }, 300, e.$target)
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
        e.text = 'X';
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
        }, 1400);
    };
    Game.prototype.gameXFail = function () {
        this.timeId.stop();
        this.addChild(new GameXFail(this));
    };
    Game.prototype.blockAnimation = function (element1, element2) {
        var currentX = element1.x;
        var currentY = element1.y;
        egret.Tween.get(element1)
            .to({
            x: element2.x,
            y: element2.y
        }, 300, egret.Ease.circOut)
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
                return num1 - num2;
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
        var tempArr = this.makeFourNumArr();
        while (!tempArr) {
            tempArr = this.makeFourNumArr();
        }
        return tempArr;
    };
    Game.prototype.makeFourNumArr = function () {
        /* 生成四个随机数 */
        var s = [];
        for (var i = 0; i < 4; i++) {
            s.push(Math.floor(Math.random() * 10 + 1));
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
        this.successNum = 0;
        this.initFourText(initFourNumArr);
        this.initFourButton(this.gp_num);
    };
    Game.prototype.gameOver = function () {
        this.$parent.addChild(new GameOver(this.c_game_score.text, this));
        this.$parent.removeChild(this);
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game");

class Game extends eui.Component {
    private gameName:string
    private c_replay
    private c_score:eui.Label
    private c_game_score:eui.Label
    private home_bg:egret.Bitmap

    public constructor (name:string) {
        super()
        this.gameName = name

        // 引入贴图            ======================判断1============
        if (this.gameName === 'C') {
            this.skinName = "resource/eui_skins/GameC.exml"
            this.setTimeC()
        } else if (this.gameName === 'X') {
            this.skinName = "resource/eui_skins/GameX.exml"
            this.setTimeX()
            // 初始化一次round1
            // this.gameXSuccess(this.gp_num.$children[1])
        }

        // 适配屏幕
        this.home_bg = new egret.Bitmap()
        this.home_bg.texture = RES.getRes('gamebgc_png')
        
        this.addChildAt(this.home_bg, 0)
        DisUtil.get(this).beCon()
        DisUtil.get(this.home_bg).cover()

        // 设置定时器，计算总的时间 =================判断2===================

        // //this.setTime()

        //生成4个数，用于计算
        for (let i = 0; i < this.gp_num.$children.length; i++) {
            this.gp_num.$children[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTouch, this, true)
        }
        for (let j = 0; j < this.gp_symbol.$children.length; j++) {
            this.gp_symbol.$children[j].addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTouch, this, true)
        }
        this.initFourText(this.makeFourNum())

        //重新开始游戏
        this.c_replay.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.replay(JSON.parse(egret.localStorage.getItem('localFourNum')))
        }, this)

        //结束游戏
        this.game_over.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameOver, this)
    }
// =======================================================
    // 计时器部分 =============p判断2====================
    private c_game_time:eui.Label
    private timeNum = 0
    private timer
    private setTimeC() {
        this.timer = new egret.Timer(1000, 0)
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFuncC, this)
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFuncC, this)
        this.timer.start()
    }

    private timerFuncC () {
        this.timeNum += 1
        let tempMinute = Math.floor(this.timeNum / 60)
        let minutes = tempMinute >= 10 ? tempMinute : '0' + tempMinute
        let seconds = this.timeNum % 60 >= 10 ? this.timeNum % 60 : '0' + this.timeNum % 60
        this.c_game_time.text = minutes + ' : ' + seconds
    }

    private timerComFuncC () {
    }

    private timeNumX = 30
    private timeId
    private setTimeX () {
        let timeId:egret.Timer = new egret.Timer(1000, 0)
        this.timeId = timeId
        this.timeId.addEventListener(egret.TimerEvent.TIMER, this.reduceTime, this)
        this.timeId.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFuncC, this)
        this.timeId.start()
    }
    private reduceTime () {
        this.timeNumX -= 1
        this.c_game_time.text = this.timeNumX.toString() + 's'
        if (this.timeNumX === 0) {
            this.timeId.stop()
                //TODO: 弹出失败对话框，是否继续===============================》》》》》》》》》
            this.gameXFail()
        }
    }
// =============================================================
    // 四个块的显示 和 文本数字
    private gp_num:eui.Group
    private label1:eui.Label
    private label2:eui.Label
    private label3:eui.Label
    private label4:eui.Label
    // 文本初始化
    private initFourText (fourNumArr) {
        egret.localStorage.setItem('localFourNum', JSON.stringify(fourNumArr))
        this.label1.text = fourNumArr[0]
        this.label2.text = fourNumArr[1]
        this.label3.text = fourNumArr[2]
        this.label4.text = fourNumArr[3]
    }

    //按钮初始化 + 文本点击开启
    private btn1:eui.Button
    private btn2:eui.Button
    private btn3:eui.Button
    private btn4:eui.Button

    private initFourButton (buttonGroup) {
        for (let i = 0; i < buttonGroup.$children.length; i++) {
            buttonGroup.$children[i].visible = true
            buttonGroup.$children[i].$children[0].$children[0].source = RES.getRes('normal_png')
            buttonGroup.$children[i].$children[1].touchEnabled = true
            buttonGroup.$children[i].$children[1].enabled = true
        }
    }

    // 计算逻辑
    private tempArr = []
    private gp_symbol:eui.Group
    private successNum:number = 0
    private total_score:number = 1
    private currentEvent 

    private handleTouch (e) {
        let value = e.$target.text || e.$target.name  
        
        if (value) {
        // e.$target.touchEnabled = false
        // e.$target.enabled = false
        // e.$target.alpha = 0.5
        // e.$target.$parent.$children[0].$children[0].alpha = 0.5

        // if (e.$target.text) {
        //      this.changeImg(e.$target.$parent.$children[0])
        // }

       // e.$target.text // e.$target.$parent.$x / $y
    //    console.log(e.$target.name);
           
       switch (this.tempArr.length) {
           case 0:
                if (Number(value)) {
                    this.tempArr.push(e.$target)
                    if (e.$target.text) {
                            this.changeImg(e.$target.$parent.$children[0])
                    }
                }
                break
           case 1:
                if (Number(value)) {
                    this.tempArr.pop()
                    this.tempArr.push(e.$target)
                    if (e.$target.text) {
                        this.changeImg(e.$target.$parent.$children[0])
                    }
                } else {
                    this.tempArr.push(value)  
                    this.tempArr[0].touchEnabled = false   
                    this.tempArr[0].enabled = false               
                }
                break
           case 2:
                if (Number(value)) {
                    this.tempArr.push(e.$target)
                    let result = this.calResult(Number(this.tempArr[0].text), this.tempArr[1], Number(this.tempArr[2].text))
                    if (result === '不支持这种运算') {
                        this.tempArr.pop()
                        return
                    } else {
                        if (e.$target.text) {
                            this.changeImg(e.$target.$parent.$children[0])
                        }
                        this.blockAnimation(this.tempArr[0].$parent, this.tempArr[2].$parent)
 
                        //setTimeout 无法接收到事件对象
                        this.currentEvent = e.$target 

                        let timer:egret.Timer = new egret.Timer(300, 1)
                       
                        timer.addEventListener(egret.TimerEvent.TIMER, () => {}, this)
                        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                            
                            this.tempArr[2].text = result
                            let tempElement = {$target: this.tempArr[2]}
                            this.successNum += 1
                            this.tempArr = []
                            if (this.successNum === 3) {
                                if (result === 24) {
                                    
                                    this.total_score++
                                    this.currentEvent.$parent.$children[0].$children[0].source = RES.getRes('success_png')
                                    this.currentEvent.touchEnabled = false
                                    this.currentEvent.enabled = false

                                    // TODO 重新开始游戏
                                    let tempFourNumArr = this.makeFourNum()
                                    if (this.gameName === 'X') {  
                                        setTimeout(() => {
                                            //TODO :弹出成功对话框
                                            this.gameXSuccess(this.currentEvent.$parent)
                                            setTimeout(() => {
                                                this.c_score.text = this.total_score.toString()
                                                this.c_game_score.text = ((this.total_score - 1) * 100).toString()
                                                this.replay(tempFourNumArr)
                                            }, 800)
                                        }, 500)
                                    } else {
                                        setTimeout(() => {
                                            this.c_score.text = this.total_score.toString()
                                            this.c_game_score.text = ((this.total_score - 1) * 100).toString()
                                            this.replay(tempFourNumArr)
                                        }, 500)
                                    }              
                                    //这个return最后需要去掉
                                    return
                                } else {
                                    if (this.gameName === 'X') {
                                        this.gameXFail()
                                    } else {
                                        this.handleFail(this.currentEvent)
                                    }
                                }
                            }
                            this.handleTouch(tempElement)
                            return
                        }, this)
                        timer.start()
                        
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
                } else {
                    this.tempArr.pop()
                    this.tempArr.push(value)
                }
                break
         }
      }  
   }

   //处理错误结果
   private handleFail (e) {
    //    e.text = 'X'
       e.touchEnabled = false
       e.enabled = false
       setTimeout(() => {
           this.replay(JSON.parse(egret.localStorage.getItem('localFourNum')))
       }, 400)
   }
  
    //成功状态
    private gameX_bgc:eui.Image
    private gameXSuccess(group) {
        // 防止成功了还在计时
        this.timeId.stop()
        let instance = new GameSuccess(group.x + group.width / 2 + this.gp_num.x, group.y + group.height / 2 + this.gp_num.y, Number(this.c_score.text) + 1, this.gameX_bgc.width)
        this.addChild(instance)
        setTimeout(() => {
            this.removeChild(instance)
            this.timeNumX = 30
            this.timeId.start()
        }, 1400)
    }   

    private failInstance
    private gameXFail() {
        this.timeId.stop()
        //添加失败页面，并把该页面传过去，以便最后关闭该页面
        this.$parent.addChild(new GameXFail(this))
    }

   private blockAnimation(element1, element2) {
       let currentX = element1.x
       let currentY = element1.y
       
       egret.Tween.get(element1)
                  .to({
                      x: element2.x,
                      y: element2.y,
                  }, 280, egret.Ease.cubicOut)
                  .to({
                      visible: false
                  }, 0)
                  .to({
                      x: currentX,
                      y: currentY
                  }, 0)           
   }

   private calResult (num1, symbol, num2) {
       switch (symbol) {
           case '+':
             return num1 + num2
           case '-':
             if (num1 - num2 >= 0) {
                 return num1 - num2
             } else {
                 return '不支持这种运算'
             }
           case '*':
             return num1 * num2
           case '/':
             if (num2 !== 0 && num1 % num2 === 0) {
                 return num1 / num2
             } else {
                 return '不支持这种运算'
             }
       }
   }

    private changeImg (target) {
        for (let i = 0; i < this.gp_num.$children.length; i++) {
            target.$parent.$parent.$children[i].$children[0].$children[0].source = RES.getRes('normal_png')
        }
        target.$children[0].source = RES.getRes('select_png')
    }

    /* 生成四个符合计算要求的随机数 */
    private makeFourNum () {
        let tempArr = this.makeFourNumArr()
        while (!tempArr) {
            tempArr = this.makeFourNumArr()
        }
        return tempArr
    }

    private makeFourNumArr () {
    /* 生成四个随机数 */
    let s = []
    for (let i = 0; i < 4; i++) {
        s.push(Math.floor(Math.random() * 10 + 1))
    }

    /* 存储符号 */
    let O = [{
        name: "-",
        f: function (m, n) {
        return m - n
        }
    }, {
        name: "+",
        f: function (m, n) {
        return m + n
        }
    }, {
        name: "/",
        f: function (m, n) {
        return m / n
        }
    }, {
        name: "*",
        f: function (m, n) {
        return m * n
        }
    }]

    /* 四个数字保存在b[1] b[2] b[4] b[8]中 */
    let b = []
    for (let i = 0; i < s.length; i++) {
        b[1 << i] = Math.floor(s[i])
    }
    // for (let i in s)
    //     b[1 << i] = parseInt(s[i])

    /* 存放式子，用于判断式子是否已经存在 */
    let result = {}
    /* 存放式子，输出之后可查看所有解析出来的结果 */
    let resultArr = []

    /* 遍历所有的可能性，查找符合要求的式子 */
    for (var i1 = 1; i1 <= 8; i1 <<= 1)
        for (var i2 = 1; i2 <= 8; i2 <<= 1)
        for (var i3 = 1; i3 <= 8; i3 <<= 1)
            for (var i4 = 1; i4 <= 8; i4 <<= 1) {
            //所有数字排列组合，简单去掉重复数字
            if ((i1 | i2 | i3 | i4) != 0xf) continue;
            for (var f1 = 0; f1 <= 3; f1++)
                for (var f2 = 0; f2 <= 3; f2++)
                for (var f3 = 0; f3 <= 3; f3++) {
                    var of1 = O[f1]
                    var of2 = O[f2]
                    var of3 = O[f3]

                    // ((1,2)3)4
                    let m = of3.f(of2.f(of1.f(b[i1], b[i2]), b[i3]), b[i4]);
                    if (Math.abs(m - 24) < 1e-5) {
                    return s
                    }
                    // if (writeResult("((N%N)%N)%N")) return false

                    // 1((2,3)4)
                    m = of1.f(b[i1], of3.f(of2.f(b[i2], b[i3]), b[i4]));
                    if (Math.abs(m - 24) < 1e-5) {
                    return s
                    }
                    // if (writeResult("N%((N%N)%N)")) return false

                    //  (1(2,3))4
                    m = of3.f(of1.f(b[i1], of2.f(b[i2], b[i3])), b[i4]);
                    if (Math.abs(m - 24) < 1e-5) {
                    return s
                    }
                    // if (writeResult("(N%(N%N))%N")) return false

                    //1(2(3,4))
                    m = of1.f(b[i1], of2.f(b[i2], of3.f(b[i3], b[i4])));
                    if (Math.abs(m - 24) < 1e-5) {
                    return s
                    }
                    // if (writeResult("N%(N%(N%N))")) return false


                    //(1,2)(3,4)
                    m = of2.f(of1.f(b[i1], b[i2]), of3.f(b[i3], b[i4]));
                    if (Math.abs(m - 24) < 1e-5) {
                    return s
                    }
                    // if (writeResult("(N%N)%(N%N)")) return false
                }
            }

    /* 将生成的 数字 和 所有可行的式子 返回 */
    // return {s: s, resultArr: resultArr}
    }


//==========================================
    //重置功能
    private replay (initFourNumArr) {
       this.successNum = 0
       this.initFourText(initFourNumArr)
       this.initFourButton(this.gp_num)
    }

    //结束游戏
    private game_over:eui.Image
    private gameOver () {
          // 立马更新数据
        platform.openDataContext.postMessage({
            score: this.c_game_score.text.toString(),
            openId: egret.localStorage.getItem('openId'),
            command: 'updateMaxScore'
        })

        this.timer.stop()
        this.timeId.stop()
        this.$parent.addChild(new GameOver(this.c_game_score.text, this))
        this.timeId.stop()
        this.$parent.removeChild(this)
    }
}

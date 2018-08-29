class Game extends eui.Component {
    private gameName:string
    private c_replay
    private c_score:eui.Label
    private c_game_score:eui.Label
    private home_bg:egret.Bitmap

    /**
     * name: 取值为 'X' ==>   侠模式
     *          'C'  ==> 禅模式
     */
    public constructor (name:string) {
        super()
        this.gameName = name

        // 引入贴图        ===================== 判断1 ============
        // 设置定时器，计算总的时间 =================判断2===================
        if (this.gameName === 'C') {
            this.skinName = "resource/eui_skins/GameC.exml"
            this.setTimeC()
        } else if (this.gameName === 'X') {
            this.skinName = "resource/eui_skins/GameX.exml"
            this.setTimeX()
            // 初始化一次round1
            // this.gameXSuccess(this.gp_num.$children[1])
        }

        // 适配屏幕 == 中间show all，背景覆盖
        this.home_bg = new egret.Bitmap()
        this.home_bg.texture = RES.getRes('gamebgc_png')
        
        this.addChildAt(this.home_bg, 0)
        DisUtil.get(this).beCon()
        DisUtil.get(this.home_bg).cover()

        //监听数字被点击事件
        for (let i = 0; i < this.gp_num.$children.length; i++) {
            this.gp_num.$children[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTouch, this, true)
        }
        // 监听符号被点击事件
        for (let j = 0; j < this.gp_symbol.$children.length; j++) {
            this.gp_symbol.$children[j].addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleTouch, this, true)
        }
        this.initFourText(this.makeFourNum())

        //监听事件：刷新：重新开始游戏 === 关卡不变
        this.c_replay.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.replay(JSON.parse(egret.localStorage.getItem('localFourNum')))
        }, this)

        //监听事件：结束游戏
        this.game_over.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameOver, this)
    }
// =======================================================
    // 计时器部分 =============p判断2====================
    private c_game_time:eui.Label
    private timeNum = 0
    private timer
    // 禅模式计时
    private setTimeC() {
        this.timer = new egret.Timer(1000, 0)
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFuncC, this)
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFuncC, this)
        this.timer.start()
    }

    /**
     * 将秒数转化成分秒显示
     */
    private timerFuncC () {
        this.timeNum += 1
        let tempMinute = Math.floor(this.timeNum / 60)
        let minutes = tempMinute >= 10 ? tempMinute : '0' + tempMinute
        let seconds = this.timeNum % 60 >= 10 ? this.timeNum % 60 : '0' + this.timeNum % 60
        this.c_game_time.text = minutes + ' : ' + seconds
    }

    private timerComFuncC () {
    }

    // 侠模式计时
    private timeNumX = 30
    private timeId:egret.Timer
    private setTimeX () {
        this.timeId = new egret.Timer(1000, 0)
        this.timeId.addEventListener(egret.TimerEvent.TIMER, this.reduceTime, this)
        this.timeId.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFuncC, this)
        this.timeId.start()
    }
    private reduceTime () {
        this.timeNumX -= 1
        this.c_game_time.text = this.timeNumX.toString() + 's'
        if (this.timeNumX === 0) {
            this.timeId.stop()
                //TODO: 弹出失败对话框，是否继续
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

    // 文本初始化：将生成的四个数字放入到块中
    // 本地保存四个数，便于刷新时使用
    private initFourText (fourNumArr) {
        egret.localStorage.setItem('localFourNum', JSON.stringify(fourNumArr))
        this.label1.text = fourNumArr[0]
        this.label2.text = fourNumArr[1]
        this.label3.text = fourNumArr[2]
        this.label4.text = fourNumArr[3]
    }

    //按钮初始化：按钮背景颜色普通，可点击，可见
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
    private tempArr = []    //存放被点击的数字或自负
    private gp_symbol:eui.Group
    private successNum:number = 0   //计算的次数，等于3的时候游戏结束
    private total_score:number = 1  //获取的分数
    private currentEvent  //在setTimeout等延迟执行的函数中无法获取当前的事件对象
            // ======== 因此将事件对象挂在到这个界面对象上。

    // 当数字或者是符号被点击的时候，处理相关逻辑
    private handleTouch (e) {
        // 用户获取当前被点击对象的值
        let value = e.$target.text || e.$target.name  
        
        // 只有当值存在的时候才执行计算逻辑
        if (value || value === 0) {
         switch (this.tempArr.length) {

            //  数组的第一个必须为数字，数组长度加1，改变背景颜色
           case 0:
                if (Number(value) || Number(value) === 0) {
                    this.tempArr.push(e.$target)
                    this.changeImg(e.$target.$parent.$children[0])
                }
                break

            // 数组的第二个必须为符号，
            // 如果为数字，将第一个数字去除掉，将当前数字存储，并使用排他功能改变颜色
            // 如果是字符，将字符添加到数组，并是的第一个数字不能被点击
           case 1:
                if (Number(value) || Number(value) === 0) {
                    this.tempArr.pop()
                    this.tempArr.push(e.$target)
                    this.changeImg(e.$target.$parent.$children[0])
                } else {
                    this.tempArr.push(value)  
                    this.tempArr[0].touchEnabled = false   
                    this.tempArr[0].enabled = false               
                }
                break

            // 数组的第三个必须是数字
            // 如果不是数字，将前一个符号移除，添加新的符号
            // 如果是数字，添加数字，计算结果
                // 如果结果中为负值或者是小数，则不支持这种运算，将数字移除
                // 如果能计算出结果，改变背景颜色，并执行动画函数

           case 2:
                if (Number(value) || Number(value) === 0) {
                    this.tempArr.push(e.$target)
                    let result = this.calResult(Number(this.tempArr[0].text), this.tempArr[1], Number(this.tempArr[2].text))
                    if (result === '不支持这种运算') {
                        this.tempArr.pop()
                        return
                    } else {
                        this.changeImg(e.$target.$parent.$children[0])
                        this.blockAnimation(this.tempArr[0].$parent, this.tempArr[2].$parent)
 
                        this.currentEvent = e.$target 

                        // 动画结束后立马重置数据
                        let timer:egret.Timer = new egret.Timer(250, 1)
                       
                        // timer.addEventListener(egret.TimerEvent.TIMER, () => {}, this)
                        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {

                            // 重置结果，得出结果，临时保存第二个数字对应的对象，再清除存储数组，成功计算数加1
                            this.tempArr[2].text = result
                            let tempElement = {$target: this.tempArr[2]}
                            this.successNum += 1
                            this.tempArr = []

                            if (this.successNum === 3) {
                                if (result === 24) {
                                    
                                    // 防止成功或失败了还在计时
                                    if (this.timeId) {
                                         this.timeId.stop()
                                    }
                                    
                                    // 成功后的初始化；分数增加，背景颜色改变，不可点击
                                    this.total_score++
                                    this.currentEvent.$parent.$children[0].$children[0].source = RES.getRes('success_png')
                                    this.currentEvent.touchEnabled = false
                                    this.currentEvent.enabled = false

                                    // 重新开始游戏 ============== 判断3 =================
                                    // 生成新的数组
                                    let tempFourNumArr = this.makeFourNum()

                                    if (this.gameName === 'X') {  
                                        setTimeout(() => {
                                            // 弹出成功界面，执行完动画效果后进入新的界面
                                            this.gameXSuccess(this.currentEvent.$parent) //弹出成功页面1s
                                            setTimeout(() => {
                                                this.c_score.text = this.total_score.toString()
                                                this.c_game_score.text = ((this.total_score - 1) * 100).toString()
                                                this.replay(tempFourNumArr)
                                            }, 500) // 在弹出成功页面的过程中，改变分数和重新开始游戏
                                        }, 300)  //等待成功的那个按钮的显示 300ms
                                    } 


                                    else {
                                        // 分数先变后重新开始
                                        this.c_score.text = this.total_score.toString()
                                        this.c_game_score.text = ((this.total_score - 1) * 100).toString()
                                        setTimeout(() => {
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

                            // 如果此时是属于计算的过程，那么相当于直接点击了第二个数字。
                            this.handleTouch(tempElement)
                            return
                        }, this)
                        timer.start()
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
       e.touchEnabled = false
       e.enabled = false
       setTimeout(() => {
           this.replay(JSON.parse(egret.localStorage.getItem('localFourNum')))
       }, 400)
   }
  
    //成功状态
    private gameX_bgc:eui.Image
    private gameXSuccess(group) {
        let instance = new GameSuccess(group.x + group.width / 2 + this.gp_num.x, group.y + group.height / 2 + this.gp_num.y, Number(this.c_score.text) + 1, this.gameX_bgc.width)
        this.addChild(instance)
        setTimeout(() => {
            this.removeChild(instance)
            this.timeNumX = 30
            this.timeId.start()
        }, 1000)
    }   

    private failInstance
    private gameXFail() {
        //添加失败页面，并把该页面传过去，以便最后关闭该页面
        this.$parent.addChild(new GameXFail(this))
    }

    // 第一个数字的块运动到第二个数字的块 
   private blockAnimation(element1, element2) {
       let currentX = element1.x
       let currentY = element1.y
       
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
                  }, 0)           
   }

   private calResult (num1, symbol, num2) {
       switch (symbol) {
           case '+':
           console.log('jai')
             return num1 + num2
           case '-':
             if (num1 - num2 >= 0) {
                 console.log('jian')
                 return num1 - num2
             } else {
                 return '不支持这种运算'
             }
           case '*':
             return num1 * num2
           case '/':
           console.log('chu')
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
        let tempArr = this.makeFourNumArr(Number(this.c_score.text) )
        while (!tempArr) {
            tempArr = this.makeFourNumArr(Number(this.c_score.text) )
        }
        return tempArr
    }

    private makeFourNumArr (num) {
    let s = []
    
    // 不同关卡的数据生成
    if (num < 10) {
        let select = [6, 8]
        for (let i = 0; i < 4; i ++) {
            s.push(select[parseInt((Math.random() * 4).toString())])
        }
    } 
    else if (num < 20) {
        let select = [4, 6, 8]
        for (let i = 0; i < 4; i ++) {
            s.push(select[parseInt((Math.random() * 4).toString())])
        }
    }
    else if (num < 40) {
        let select = [3, 4, 6, 8]
        for (let i = 0; i < 4; i ++) {
            s.push(select[parseInt((Math.random() * 4).toString())])
        }
    }
    else if (num < 80) {
        for (let i = 0; i < 4; i++) {
            s.push(Math.floor(Math.random() * 10 + 1))
        }
    }
    else {
        for (let i = 0; i < 4; i++) {
            s.push(Math.floor(Math.random() * 13 + 1))
        }
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
       this.tempArr.length = 0
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

        if (this.timer) {
            this.timer.stop()            
        }
        if (this.timeId) {
            this.timeId.stop()
        }

        this.$parent.addChild(new GameOver(this.c_game_score.text, this))
        this.$parent.removeChild(this)
    }
}

namespace zj {
    // author liyunlong  hexiaowei
    // 2018.11.8
    export class TavernScene extends Scene {
        public groupAnimation: eui.Group;
        public btnRum: eui.Button;
        public groupBtn: eui.Group;
        public btn1: eui.Button;
        public btn2: eui.Button;
        public btn3: eui.Button;
        public groupRecruit: eui.Group;
        public labelTime1: eui.Label;
        public GroupUpchi: eui.Group;
        public imgSchedule: eui.Image;
        public imgScheduleMask: eui.Image;
        public labelcont: eui.Label;
        public imgRunFrame: eui.Image;
        public imgRunIcon: eui.Image;
        public imglingqu: eui.Image;
        public jewel: eui.Image;
        public labelToken: eui.Label;
        public labelIntegrate: eui.Label;
        public btnAdddiamond: eui.Button;
        public groupRum1: eui.Group;
        public btnRum1: eui.Button;
        public groupButtonArchive: eui.Group;
        public buttonArchive: eui.Button;
        public imageNew2: eui.Image;
        public buttonShop: eui.Button;
        public imageNew: eui.Image;
        public groupBeerGift: eui.Group;
        public buttonBeerGift: eui.Button;
        public groupTime: eui.Group;
        public labelTime: eui.Label;
        public imageGiftNewLog: eui.Image;
        public groupTimeLimit: eui.Group;
        public groupActivity: eui.Group;
        public groupGiftTime: eui.Group;
        public labelGiftTime: eui.Label;
        public btnReturn: eui.Button;
        public group: eui.Group;
        public groupBeer: eui.Group;
        public group2: eui.Group;
        public labelTips1: eui.Label;
        public labelBeer: eui.Label;
        public LabelCost1_2: eui.Label;
        public groupOpenActivities: eui.Group;
        public group3: eui.Group;
        public labelTips5: eui.Label;
        public labelBeer10: eui.Label;
        public groupSoda: eui.Group;
        public btnDrinkOneSoda: eui.Group;
        public labelTips4: eui.Label;
        public labelSoda: eui.Label;
        public groupTeachSoda: eui.Group;
        public btnDrinkFiveSoda: eui.Group;
        public labelTips: eui.Label;
        public labelSoda1: eui.Label;
        public groupTeachSoda0: eui.Group;
        public groupSeniorWine: eui.Group;
        public groupRedWine: eui.Group;
        public labelTips2: eui.Label;
        public labelWine: eui.Label;
        public groupChampagne: eui.Group;
        public labelTips3: eui.Label;
        public labelBubbly: eui.Label;
        public groupRum: eui.Group;
        public btnDrinkOneRum: eui.Group;
        public labelTips7: eui.Label;
        public labelRum: eui.Label;
        public btnDrinkFiveRum: eui.Group;
        public labelTips8: eui.Label;
        public labelRum1: eui.Label;
        public labelCloseTheTip: eui.Label;
        public imageRect: eui.Image;
        public labelRunNumber: eui.Label;

        public teach_pop: boolean;  //teach 新手多苏打水弹出喝多杯
        private timenpc: Array<number> = [];

        private callback_this: any; // 回调接收者
        private callback_function_ok: () => void; // 回调函数
        public groupKeelAnimation: any;//抽奖炫光动画
        public tavernPeopleKeelAnimation: dragonBones.EgretArmatureDisplay;//酒馆主界面人物动画	
        public tavernDoorKeelAnimation;//酒馆门动画
        private gameinfo: message.GameInfo = new message.GameInfo();
        private timeGift: number = 0;

        //标记按钮状态
        private generalHistory: Array<number> = [];
        private touchSoda: boolean;
        private touchBeer: boolean;
        private ttype: number = 0;
        private num: number = 0;
        private lotter: number;
        private ani_Delay_Time: number = 2500;
        public animationType: boolean = false;
        private timer: number = 0;
        private Timer: egret.Timer;
        private RumInfo: message.ActivityInfo;
        private update: number;

        public constructor() {
            super();
            this.skinName = "resource/skins/tavern/TavernSceneSkin.exml";
            //创建一个计时器对象
            this.Timer = new egret.Timer(999, 0);
            this.Timer.start();

            this.imgSchedule.mask = this.imgScheduleMask;
            //注册事件侦听器
            this.Timer.addEventListener(egret.TimerEvent.TIMER, this.updateTip, this);
            this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnReturn, this);
            this.group2.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnGroup2End, this);
            this.group2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnGroup2Begin, this);
            this.group3.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnGroup3End, this);
            this.group3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnGroup3Begin, this);
            this.btnDrinkFiveSoda.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnDrinkFiveSoda, this);
            this.btnDrinkOneSoda.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnDrinkOneSoda, this);
            this.buttonArchive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonArchive, this);
            this.buttonShop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonShop, this);
            this.groupRedWine.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnRedWineEnd, this);
            this.groupRedWine.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnRedWineBegin, this);
            this.groupChampagne.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnChampagneEnd, this);
            this.groupChampagne.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnChampagneBegin, this);
            // this.groupNpc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupDialogue, this);
            this.buttonBeerGift.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonBeerGift, this);
            this.btnRum1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRum1, this);
            this.groupActivity.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openServerActive, this);
            this.btnAdddiamond.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAdddiamond, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                egret.Tween.removeTweens(this.labelCloseTheTip); // 因为是循环播放，需要特别处理
            }, null);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeGroup, this);
            this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn1, this);
            this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn2, this);
            this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn3, this);
            this.btnRum.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRum, this);
            this.btnDrinkOneRum.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnDrinkOneRum, this);
            this.btnDrinkOneRum.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnDrinkOneRum1, this);
            this.btnDrinkFiveRum.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnDrinkFiveRum, this);
            this.btnDrinkFiveRum.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnDrinkFiveRum1, this);
            this.imgRunFrame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setonimgGift, this);
            this.imgRunIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setonimgGift, this);
            this.btnDrinkOneSoda.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnDrinkOneSuDa, this);
            this.btnDrinkFiveSoda.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnDrinkOneSuDa1, this);

            Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.updateUIStates, this);
            Game.EventManager.on(GameEvent.PLAYER_COIN_CHANGE, this.updateUIStates, this);
            Game.EventManager.on(GameEvent.PLAYER_ACTIVITY_INFO_CHANGE, this.updateUIStates, this)
            this.RumInfo = Table.FindR(Game.PlayerActivitySystem.Activities, (k, v: message.ActivityInfo) => {
                return v.type == 23;
            })[0];
            if (this.RumInfo) {
                this.groupRecruit.visible = true;
                this.GroupUpchi.visible = true;
                this.btnRum.visible = true;
                this.update = egret.setInterval(this.Update, this, 1000);
                this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                    egret.clearInterval(this.update);
                    egret.Tween.removeTweens(this);
                }, this);
                this.Update();
                this.groupBtn.y = 265;
                this.onBtnRum();
            } else {
                this.GroupUpchi.visible = false;
                this.groupRecruit.visible = false;
                this.btnRum.visible = false;
                this.groupBtn.y = 100;
                this.onBtn2();
            }
            this.updateUIStates();
            this.imageRect.visible = false;
            this.width = UIManager.StageWidth;
            this.height = UIManager.StageHeight;
            this.touchSoda = false;
            this.touchBeer = false;
            this.labelCloseTheTip.visible = false;
            this.setUI();
            this.initFunction();


            this.ttype = 0;
            this.num = 0;
            //酒馆主场景龙骨动画
            let dbname = "jg_zhaomu";
            if (RES.getRes("jg_zhaomu_large_tex_png")) dbname = "jg_zhaomu_large";
            Game.DragonBonesManager.playAnimation(this, dbname, "armatureName", null, 0)
                .then(display => {
                    display.x = this.width * 0.45;
                    display.y = this.height / 2;
                    if (this.height - 50 > 640) {
                        let a = this.height;
                        let n = (this.height - 50) / 640
                        display.scaleX = n;
                        display.scaleY = n;
                    }
                    this.groupAnimation.addChild(display);
                    // this.addAnimatoin("role");

                })
                .catch(reason => {
                    toast(reason);
                });
            this.setTavernActivityPage();
            this.addActivityAnimatoin("icon_fuli", "005_huodong");
            this.addBeerOpenActivities("pijiu_dazhe", null);
            if (Device.isReviewSwitch) {
                this.groupSoda.visible = false;
                this.groupSeniorWine.visible = false;
                this.groupBeerGift.visible = false;
                this.groupActivity.visible = false;
                this.groupGiftTime.visible = false;
                this.groupButtonArchive.visible = false;

                this.jewel.width = 40;
                this.jewel.height = 40;
                this.btnAdddiamond.width = 30;
                this.btnAdddiamond.height = 30;
                this.btnAdddiamond.y = 7;
            }
            //图鉴暂时隐藏
            this.groupButtonArchive.visible = false;
            this.btnReturn.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
                Game.EventManager.event(GameEvent.GET_MOUDLE_SIZE, { isGetSize: true });
            }, null);
        }

        private Update() {
            let infotime = (this.RumInfo.closeTime - this.RumInfo.openTime) - (Game.Controller.curServerTime - this.RumInfo.openTime);//- Math.floor(egret.getTimer() / 1000) 
            let day = Math.floor(infotime / 3600 / 24);
            let hour = Math.floor(infotime / 3600 % 24);
            let min = Math.floor(infotime / 60 % 60);
            let miao = Math.floor(infotime % 60);
            this.labelTime1.text = "活动时间:" + day + "天" + hour + ":" + min + ":" + miao;
        }

        public removeEvent() {
            this.imageRect.visible = false;
        }

        public AddEvent() {
            this.imageRect.visible = true;
        }

        /**UP池招募奖励领取或展示 */
        private setonimgGift() {
            let type = 0;
            for (let i = 0; i < this.RumInfo.missions.length; i++) {
                let vis = Table.FindF(this.RumInfo.rewardIndex, (k, v: number) => {
                    return v == i + 1;
                })
                if (!vis) {
                    type = i;
                    i = 4;
                    break;
                }
            }
            //判断朗姆酒数量是否满足
            if (this.RumInfo.itemCount >= this.RumInfo.missions[type].mission_condition) { //&& !vis
                Game.PlayerActivitySystem.activityReward(this.RumInfo.type, this.RumInfo.index, type + 1, true)
                    .then((resp: message.GameInfo) => {
                        loadUI(CommonGetDialog)
                            .then((dialog: CommonGetDialog) => {
                                dialog.init(resp.getGoods);
                                dialog.setCB(() => {
                                    this.updateUIStates();
                                })
                                dialog.show();
                            })
                    }).catch(() => {

                    });
            } else {
                //展示奖励
                let bFinish = false;
                let bReward = true;
                // loadUI(Daily_AwardPop)
                //     .then((dialog: Daily_AwardPop) => {
                //         dialog.SetInfoGift(this.RumInfo.missions[type].rewards, bFinish, bReward, null);
                //         dialog.show(UI.SHOW_FROM_TOP)
                //     })
                loadUI(TavernSceneRun)
                    .then((dialog: TavernSceneRun) => {
                        dialog.show(UI.SHOW_FROM_TOP)
                    })

            }
        }
        /**点击左侧红酒&香槟 */
        private onBtn1() {
            this.setGroupVisible(1)
        }
        /**点击左侧冰爽啤酒 */
        private onBtn2() {
            this.setGroupVisible(2)
        }
        /**点击左侧苏打水 */
        private onBtn3() {
            this.setGroupVisible(3)
        }
        /**点击朗姆酒礼包 */
        private onBtnRum() {
            this.setGroupVisible(4)
        }

        //设置酒水种类的隐藏与否
        private setGroupVisible(type: number) {
            this.groupBeer.visible = false;
            this.groupSoda.visible = false;
            this.groupSeniorWine.visible = false;
            this.groupRum.visible = false;
            this.groupRecruit.visible = false;
            this.groupRum1.visible = false;
            this.groupBeerGift.visible = false;
            this.GroupUpchi.visible = false;
            this.btnRum.enabled = true;
            this.btn1.enabled = true;
            this.btn2.enabled = true;
            this.btn3.enabled = true;
            switch (type) {
                case 1:
                    this.btn1.enabled = false;
                    this.groupSeniorWine.visible = true;
                    break;
                case 2:
                    this.groupBeer.visible = true;
                    this.groupBeerGift.visible = true;
                    this.btn2.enabled = false;
                    break;
                case 3:
                    this.groupSoda.visible = true;
                    this.btn3.enabled = false;
                    break;
                case 4:
                    this.groupRum.visible = true;
                    this.btnRum.enabled = false;
                    this.groupRecruit.visible = true;
                    this.GroupUpchi.visible = true;
                    if (this.RumInfo.missions.length == this.RumInfo.rewardIndex.length) {
                        this.GroupUpchi.visible = false;
                    }
                    let vis = Table.FindF(Game.PlayerGiftSystem.giftInfos, (k, v) => {
                        return v.gift_index == 100211;
                    })
                    this.btnRum1.visible = vis;
                    this.groupRum1.visible = true;
                    break;
            }
        }

        //更新金币 钻石
        private updateUIStates() {
            let token = Game.PlayerInfoSystem.Token;
            if (token > 100000) {
                this.labelToken.text = Math.floor((token / 10000) * 100) / 100 + "万";
            } else {
                this.labelToken.text = token.toString();
            }

            let lotteryscore = Game.PlayerInfoSystem.LotteryScore;
            if (lotteryscore > 100000) {
                this.labelIntegrate.text = Math.floor((lotteryscore / 10000) * 10) / 10 + "万";
            } else {
                this.labelIntegrate.text = lotteryscore.toString();
            }
            this.RumInfo = Table.FindR(Game.PlayerActivitySystem.Activities, (k, v: message.ActivityInfo) => {
                return v.type == 23;
            })[0];
            this.labelSoda.text = Game.PlayerInfoSystem.Soda.toString();
            this.labelSoda1.text = Game.PlayerInfoSystem.Soda.toString();
            this.labelRum1.text = Game.PlayerInfoSystem.Rum.toString();
            this.labelBeer.text = Game.PlayerInfoSystem.Beer.toString();
            if (Game.PlayerMixUnitInfoSystem.mixunitinfo.uplotter_dayfree.length == 0) {
                this.labelRum.text = "首次免费"
            } else {
                this.labelRum.text = Game.PlayerInfoSystem.Rum.toString();
            }
            let visnumber = 0;

            if (this.RumInfo) {
                if (this.RumInfo.missions.length == this.RumInfo.rewardIndex.length) {
                    this.GroupUpchi.visible = false;
                } else {
                    for (let i = 0; i < this.RumInfo.missions.length; i++) {
                        let vis = Table.FindF(this.RumInfo.rewardIndex, (k, v: number) => {
                            return v == i + 1;
                        })
                        if (!vis) {
                            visnumber = i;
                            i = 4;
                            break;
                        }
                    }
                    this.labelcont.text = "当前阶段：" + this.RumInfo.itemCount + "/" + this.RumInfo.missions[visnumber].mission_condition;
                    let generalId = this.RumInfo.missions[visnumber].rewards[0].goodsId;
                    let count = this.RumInfo.missions[visnumber].rewards[0].count;
                    this.labelRunNumber.text = Set.NumberUnit2(count);
                    this.imgRunFrame.source = cachekey(PlayerItemSystem.Set(generalId, null, count).Frame, this);
                    this.imgRunIcon.source = cachekey(PlayerItemSystem.ItemPath(generalId), this);
                    let scx = this.RumInfo.itemCount / this.RumInfo.missions[visnumber].mission_condition;
                    this.imglingqu.visible = scx >= 1 && (this.RumInfo.rewardIndex.length != this.RumInfo.missions.length);
                    this.imgScheduleMask.width = (scx > 1 ? 1 : scx) * 200;
                }
            }
            this.SetCountFirst();
        }

        //酒馆开服活动动画
        public addActivityAnimatoin(dbName: string, animationName: string, armatureName: string = "armatureName") {
            Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, 0)
                .then(display => {
                    display.x = 65;
                    display.y = 65;
                    //this.groupAnimation.addChild(display);
                    this.groupActivity.addChild(display);
                })
                .catch(reason => {
                    toast(reason);
                });
        }

        //酒馆开服活动动画
        public addBeerOpenActivities(dbName: string, animationName: string, armatureName: string = "armatureName") {
            Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, 0)
                .then(display => {
                    display.x = 25;
                    display.y = 25;
                    //this.groupAnimation.addChild(display);
                    this.groupOpenActivities.addChild(display);
                })  
                .catch(reason => {
                    toast(reason);
                });
        }

        //酒馆啤酒八折动画
        public addBeerEightActivities(dbName: string, animationName: string, armatureName: string = "armatureName") {
            Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, 0)
                .then(display => {
                    display.x = this.groupTimeLimit.width / 2;
                    display.y = this.groupTimeLimit.height / 2;
                    //this.groupAnimation.addChild(display);
                    this.groupTimeLimit.addChild(display);
                })
                .catch(reason => {
                    toast(reason);
                });
        }


        //酒馆抽奖播放动画
        private addAnimatoin001_putong(dbName: string, animationName: string, playTimes: number, armatureName: string = "armatureName") {
            Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(display => {
                    display.x = UIManager.StageWidth * 0.45;
                    display.y = UIManager.StageHeight / 2;
                    this.groupAnimation.addChild(display);
                    this.tavernDoorKeelAnimation = display;

                })
                .catch(reason => {
                    toast(reason);
                });
        }


        public nPCDialog() {
            // this.onGroupDialogue();
        }

        public SetInfoOpen(id) {
            let sound = TableClientSoundResource.Item(id);
            let textDrop = sound.sound_path;
            let strs = new Array()
            strs = textDrop.split("/");
            let soundtext = strs[2];
            soundtext = soundtext.replace('.', '_');
            return soundtext;
        }

        private setInfo() {

        }

        private initFunction() {
            // Teach.addTeaching();
            for (let i = 1; i <= 6; i++) {
                this[`group_${i}`] = () => {
                    if (i == 1 && Game.PlayerInfoSystem.Soda == 0) {
                        this.setUI();
                    } else if (i == 1 && Game.PlayerInfoSystem.Soda > 1) {
                        this.teach_pop = true;
                        if (!this.touchSoda) {
                            // this.group4.visible = false;
                        } else {
                        }

                        if (Game.PlayerInfoSystem.Soda >= 5) {
                            // this.labelMore.text = TextsConfig.TextsConfig_Hunter_Tavern.again
                        }

                        else {
                            let formatString = TextsConfig.TextsConfig_Hunter_Tavern.again_next
                            // this.labelMore.text = HelpUtil.textConfigFormat(formatString, Game.PlayerInfoSystem.Soda)
                        }
                        this.setUI();
                        this.touchSoda = !this.touchSoda;
                        this.touchBeer = false
                    } else if (i == 1 && Game.PlayerInfoSystem.Soda == 1) {
                    } else if (i == 2) {
                        if (Game.PlayerInfoSystem.Beer > 1) {
                            this.reqFindHero(i, 1)
                        }
                    } else if (i == 3) {
                        if (Game.PlayerInfoSystem.Beer > 10) {
                            this.reqFindHero(i, 10)
                        }
                    } else if (i == 4) {
                        this.setUI();
                        this.touchBeer = !this.touchBeer;
                        this.touchSoda = false
                    } else {
                    }
                }
            }
            return;

        }

        //酒馆数据初始化
        public setUI() {

            //显示免费/啤酒数量（每天4点免费一次）
            if (Game.PlayerMixUnitInfoSystem.mixunitinfo.first_beer) {
                this.LabelCost1_2.text = Game.PlayerInfoSystem.BaseInfo.beer.toString();
                this.LabelCost1_2.visible = false;
                this.labelBeer.visible = true;
            } else {
                this.LabelCost1_2.text = TextsConfig.TextConfig_League.freeName;
                this.LabelCost1_2.visible = true;
                this.labelBeer.visible = false;
            }

            if (Game.PlayerInfoSystem.Level >= 2) {
                let beerGiftInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (k, v) {
                    return v.gift_index == 100202
                });
                let date = Game.Controller.serverNow();
                let humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
                let serverTime: number = humanDate.getTime() / 1000 - 8 * 60 * 60;
                let beerTblInfo = PlayerGiftSystem.Instance_item(100202)
                if (beerTblInfo != null) {
                    if (beerGiftInfo[0] != null) {
                        let timenew = (beerGiftInfo[0].trigger_time + beerTblInfo.duration) - serverTime;
                        if (timenew > 0) {

                        }
                    }
                }
            }

            this.setInfoBeerGift();
            this.labelBeer.text = Game.PlayerInfoSystem.Beer.toString();
            if (Game.PlayerInfoSystem.Beer < 10) {
                //Helper.RGBToHex("r:255,g:0,b:0");
                this.labelBeer10.textColor = Helper.RGBToHex("r:255,g:0,b:0");
            } else {
                this.labelBeer10.textColor = Helper.RGBToHex("r:212,g:224,b:238");
            }

            this.labelBeer10.text = Game.PlayerInfoSystem.Beer.toString();
            this.labelSoda.text = Game.PlayerInfoSystem.Soda.toString();
            this.labelSoda1.text = Game.PlayerInfoSystem.Soda.toString();
            this.labelWine.text = Game.PlayerInfoSystem.RedWine.toString();
            this.labelBubbly.text = Game.PlayerInfoSystem.Champagne.toString();
            if (Game.PlayerMixUnitInfoSystem.mixunitinfo.uplotter_dayfree.length == 0) {
                this.labelRum.text = "首次免费"
            } else {
                this.labelRum.text = Game.PlayerInfoSystem.Rum.toString();
            }
            this.labelRum1.text = Game.PlayerInfoSystem.Rum.toString();

            this.labelTips1.textFlow = Util.RichText(TextsConfig.TextsConfig_Hunter_Tavern.tavern_tips_1);
            this.labelTips2.textFlow = Util.RichText(TextsConfig.TextsConfig_Hunter_Tavern.tavern_tips_2);
            this.labelTips3.textFlow = Util.RichText(TextsConfig.TextsConfig_Hunter_Tavern.tavern_tips_3);
            this.labelTips4.textFlow = Util.RichText(TextsConfig.TextsConfig_Hunter_Tavern.tavern_tips_4);
            this.labelTips.textFlow = Util.RichText(TextsConfig.TextsConfig_Hunter_Tavern.tavern_tips_4);
            this.labelTips5.textFlow = Util.RichText(TextsConfig.TextsConfig_Hunter_Tavern.tavern_tips_5);
            // this.labelTips6.textFlow = Util.RichText(TextsConfig.TextsConfig_Hunter_Tavern.tavern_tips_6);
            this.labelTips7.textFlow = Util.RichText(TextsConfig.TextsConfig_Hunter_Tavern.tavern_tips_7);
            this.labelTips8.textFlow = Util.RichText(TextsConfig.TextsConfig_Hunter_Tavern.tavern_tips_8);
            let lotteryscore = Game.PlayerInfoSystem.LotteryScore;
            if (lotteryscore > 100000) {
                this.labelIntegrate.text = Math.floor((lotteryscore / 10000) * 10) / 10 + "万";
                //this.labelIntegrate.text =(lotteryscore/10000).toFixed(1)+"万";
            } else {
                this.labelIntegrate.text = lotteryscore.toString();
            }

            //钻石数量
            let token = Game.PlayerInfoSystem.Token;
            if (token > 100000) {
                this.labelToken.text = Math.floor((token / 10000) * 100) / 100 + "万";
                //this.labelToken.text = (token / 10000).toFixed(2) + "万";
            } else {
                this.labelToken.text = token.toString();
            }

            this.updateTip();
            this.SetInfoTavernMallNewProduct();
        }
        public SetInfoTavernMallNewProduct() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.MALL)) {
                let times = Tips.GetSaveByMallNewProduct(message.EMallType.MALL_TYPE_HONOR);
                // this.imageNew.visible = (times < 3);
            }
        }

        private updateTip() {
            if (!Device.isReviewSwitch) {
                this.imageNew2.visible = this.allItemImage();
            } else {
                this.imageNew2.visible = false;
            }
        }

        private allItemImage() {
            return false;
        }

        private SetCountFirst() {
            // 显示免费/啤酒数量（每天4点免费一次）
            if (Game.PlayerMixUnitInfoSystem.mixunitinfo.first_beer) {
                this.LabelCost1_2.text = Game.PlayerInfoSystem.BaseInfo.beer.toString();
                this.labelBeer10.text = Game.PlayerInfoSystem.BaseInfo.beer.toString();
            }
            else {
                this.LabelCost1_2.text = TextsConfig.TextConfig_League.freeName
                this.labelBeer10.text = Game.PlayerInfoSystem.BaseInfo.beer.toString();
            }
        }

        //苏打水按钮抬起
        private onBtnEnd() {
            if (Game.PlayerInfoSystem.Soda == 0) {
                toast_warning(TextsConfig.TextsConfig_Hunter_Tavern.soda);
                this.setUI();
            } else if (Game.PlayerInfoSystem.Soda > 1) {
                if (Game.PlayerInfoSystem.Soda >= 5) {
                    // this.labelMore.text = TextsConfig.TextsConfig_Hunter_Tavern.again
                }
                else {
                    let formatString = TextsConfig.TextsConfig_Hunter_Tavern.again_next
                    // this.labelMore.text = HelpUtil.textConfigFormat(formatString, Game.PlayerInfoSystem.Soda)
                }
                this.setUI();
            } else if (Game.PlayerInfoSystem.Soda == 1) {
                let num = 1;
                this.reqFindHero(4, num)
                this.setUI();

            }
        }

        /**朗姆酒1杯 */
        public onBtnDrinkOneRum() {
            if (Game.PlayerInfoSystem.Rum < 1 && Game.PlayerMixUnitInfoSystem.mixunitinfo.uplotter_dayfree.length != 0) {
                this.removeEvent();
                this.updateUIStates();
                loadUI(TavernBuyPop)
                    .then((tavernBuyPop: TavernBuyPop) => {
                        tavernBuyPop.init(this);
                        tavernBuyPop.setInfo(20032, Game.PlayerInfoSystem.Rum, 1);
                        tavernBuyPop.show(UI.SHOW_FROM_TOP);
                        this.setUI();
                    });
            } else {
                if (this.vis == true) {
                    this.vis = false;
                    this.num = 1;
                    this.ttype = 1;
                    Game.PlayerInfoSystem.playAnnouce = false;
                    PlayerInfoSystem.ActivityLotterPond(1, 1)
                        .then((data: any) => {
                            egret.Tween.get(this).wait(1000).call(() => {
                                this.vis = true;
                            })
                            this.reqFindHero_Visit(data);
                        })
                        .catch((reason) => {
                            this.vis = true;
                            this.removeEvent();
                        });
                }
            }

        }
        /**朗姆酒10杯 */
        private onBtnDrinkFiveRum() {
            if (Game.PlayerInfoSystem.Rum < 10) {
                this.removeEvent();
                this.updateUIStates();
                loadUI(TavernBuyPop)
                    .then((tavernBuyPop: TavernBuyPop) => {
                        tavernBuyPop.init(this);
                        tavernBuyPop.setInfo(20032, Game.PlayerInfoSystem.Rum, 10);
                        tavernBuyPop.show(UI.SHOW_FROM_TOP);
                        this.setUI();
                    });
            } else {
                if (this.vis == true) {
                    this.vis = false;
                    this.num = 10;
                    this.ttype = 1;
                    Game.PlayerInfoSystem.playAnnouce = false;
                    PlayerInfoSystem.ActivityLotterPond(1, 10)
                        .then((data: any) => {
                            egret.Tween.get(this).wait(1000).call(() => {
                                this.vis = true;
                            })
                            this.reqFindHero_Visit(data);
                        })
                        .catch((reason) => {
                            this.vis = true;
                            this.removeEvent();
                        });
                }
            }

        }

        //再喝十杯朗姆酒
        public onBtnDrinkAnother10Run() {
            this.onBtnDrinkFiveRum();
            this.setUI();
        }

        private onBtnDrinkOneRum1() {
            this.btnDrinkOneRum.scaleX = 1.2;
            this.btnDrinkOneRum.scaleY = 1.2;
        }

        private onBtnDrinkFiveRum1() {
            this.btnDrinkFiveRum.scaleX = 1.2;
            this.btnDrinkFiveRum.scaleY = 1.2;
        }

        //1杯啤酒按钮抬起
        private onBtnGroup2End() {
            this.AddEvent();
            this.group2.scaleX = 1;
            this.group2.scaleY = 1;

            let a = Game.PlayerInfoSystem.Beer;
            if (Game.PlayerInfoSystem.Beer < 1 && Game.PlayerMixUnitInfoSystem.mixunitinfo.first_beer) {
                this.removeEvent();
                loadUI(TavernBuyPop)
                    .then((tavernBuyPop: TavernBuyPop) => {
                        tavernBuyPop.init(this);
                        tavernBuyPop.setInfo(20020, Game.PlayerInfoSystem.Beer, 1);
                        tavernBuyPop.show(UI.SHOW_FROM_TOP);
                        this.setUI();
                    });
            } else {
                this.reqFindHero(1, 1)
                this.setUI();
            }
        }

        //1杯啤酒按钮按下
        private onBtnGroup2Begin() {
            this.group2.scaleX = 1.2;
            this.group2.scaleY = 1.2;
        }

        //喝冰爽啤酒10杯按钮抬起
        public onBtnGroup3End() {
            this.AddEvent();
            this.group3.scaleX = 1;
            this.group3.scaleY = 1;
            if (Game.PlayerInfoSystem.Beer >= 10) {
                this.reqFindHero(5, 10);
                this.setUI();
            } else {
                this.removeEvent();
                loadUI(TavernBuyPop)
                    .then((tavernBuyPop: TavernBuyPop) => {
                        tavernBuyPop.init(this);
                        tavernBuyPop.setInfo(20020, Game.PlayerInfoSystem.Beer, 10);
                        tavernBuyPop.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        //再喝十杯啤酒
        public onBtnDrinkAnother10Beel() {
            this.reqFindHero(5, 10);
            this.setUI();
        }

        //弹出十杯啤酒之后的页面
        private onBtn10Beer(info: message.GoodsInfo) {

            loadUI(TavernPopA)
                .then((tavernpopa: TavernPopA) => {
                    tavernpopa.init(this, (this.btnRum.enabled == false));
                    tavernpopa.setInfo(info);
                    this.addChild(tavernpopa);
                    tavernpopa.setInfoAni(1);

                    this.ontaverngetgeneralpop(10, 1, info);
                });
        }

        //喝冰爽啤酒10杯按钮按下
        public onBtnGroup3Begin() {
            this.group3.scaleX = 1.2;
            this.group3.scaleY = 1.2;
        }

        //高级美酒按钮抬起
        private onBtn4End() {
        }

        //高级美酒按钮按下
        private onBtn4Begin() {
        }

        //返回主界面
        private onBtnReturn() {
            // Teach.addTeaching();
            Game.EventManager.off(GameEvent.PLAYER_TOKEN_CHANGE, this.updateUIStates, this);
            Game.EventManager.off(GameEvent.PLAYER_COIN_CHANGE, this.updateUIStates, this);
            Game.EventManager.off(GameEvent.PLAYER_ACTIVITY_INFO_CHANGE, this.updateUIStates, this)
            this.Timer.stop();
            this.Timer.reset();
            Game.PlayerInfoSystem.playAnnouce = true;
            this.close();
        }

        //连喝n杯苏打水
        public onBtnDrinkFiveSoda() {
            //toast("n杯");  
            this.AddEvent();
            let num = Game.PlayerInfoSystem.Soda > 5 ? 5 : Game.PlayerInfoSystem.Soda;
            if (num < 1) {
                num = 1;
            }
            this.reqFindHero(4, num)
            this.setUI();
        }

        //再喝n杯苏打水
        public onBtnxxxSoda(popNum: number) {
            //toast("再喝n杯");
            this.reqFindHero(4, popNum)
            this.setUI();
        }

        //连喝多瓶苏打水弹出的页面
        private onBtnNSoda(info: message.GoodsInfo) {
            loadUI(TavernPop)
                .then((tavernPop: TavernPop) => {
                    tavernPop.init(this);
                    tavernPop.setInfo(info);
                    this.addChild(tavernPop);  //tavernPop.show(); 
                    tavernPop.setInfoAni(1);
                });

        }

        private onBtnDrinkOneSuDa() {
            this.btnDrinkOneSoda.scaleX = 1.2;
            this.btnDrinkOneSoda.scaleY = 1.2;
        }
        private onBtnDrinkOneSuDa1() {
            this.btnDrinkFiveSoda.scaleX = 1.2;
            this.btnDrinkFiveSoda.scaleY = 1.2;
        }

        //喝一杯苏打水
        public onBtnDrinkOneSoda() {
            //toast("1杯");

            this.AddEvent();
            let num = 1;
            this.reqFindHero(4, num)
            this.setUI();

        }
        private vis = true;
        //传协议
        // type (抽奖类型)  num(抽奖数量)
        private reqFindHero(type: number, num: number) {
            if (this.vis) {
                this.vis = false;
                this.ttype = type
                this.num = num
                if (type == 5) {
                    type = 1
                }
                Game.PlayerInfoSystem.playAnnouce = false;
                PlayerInfoSystem.compose(type, num)
                    .then((data: any) => {
                        egret.Tween.get(this).wait(1000).call(() => {
                            this.vis = true;
                        })
                        this.reqFindHero_Visit(data);
                    })
                    .catch((reason) => {
                        this.vis = true;
                        this.removeEvent();
                    });
            }
        }


        //抽取单个猎人（1杯（苏打水、红酒、啤酒、香槟））
        // i 等于1时为单个猎人抽取，等于2时为十连抽出现A-S级猎人
        // type 抽奖类型
        // num 猎人的初始化等级（星级）
        public onCommonTavern(i: number, goodsId: number, info?: message.GoodsInfo, type?: number, num?: number) {
            loadUI(TavernGetGeneral)
                .then((taverngetgeneral: TavernGetGeneral) => {
                    taverngetgeneral.init(this);
                    taverngetgeneral.setInfo(goodsId, type, num);
                    this.addChild(taverngetgeneral); //taverngetgeneral.show();
                    taverngetgeneral.name = "getGeneral";
                    Game.EventManager.event(GameEvent.SHOW_UI, { typeName: "getGeneral" });
                    if (i == 1) {
                        this.ontaverngetgeneralpop(1, 1, info);
                    }
                    else { return }
                    this.setUI();
                });

        }

        //十连抽啤酒出现A-S级猎人调用的回调方法
        public test(callback_function_ok: () => void, callback_this: any, goodsId: number) {
            this.callback_function_ok = callback_function_ok;
            this.callback_this = callback_this;
            console.log(this.callback_function_ok);
            this.onCommonTavern(2, goodsId);
            this.setUI();
        }

        //解锁猎人界面
        // num  总循环次数
        // i    第几次循环
        public ontaverngetgeneralpop(num: number, i: number, info: message.GoodsInfo) {
            if (i > num || num == 0) return;
            if (Table.FindK(this.generalHistory, PlayerHunterSystem.Table(info[i - 1].goodsId).general_id) != -1) {
                this.ontaverngetgeneralpop(num, i++, info);
            } else {
                this.setUI();
            }
        }

        //恭喜获得页面
        //  i (等于1时，是为十连抽，等于2时为单个猎人抽取)
        //  type(抽奖类型（啤酒、苏打、红酒等）)
        //  num（抽的数量）
        public onEarnPoint(i: number = 0, goodsId?: number, type?: number, num?: number) {
            if (this.callback_function_ok) {
                if (i == 1) {
                    loadUI(TavernGet)
                        .then((tavernget: TavernGet) => {
                            tavernget.init(this);
                            tavernget.setInfo(1);
                            tavernget.show(); //this.addChild(tavernget);
                            tavernget.setInfoAni();
                        });

                } else {
                    console.log("LOG");
                    this.callback_function_ok.call(this.callback_this);
                    this.callback_function_ok;
                }
            }
            else {
                if (i == 2) {
                    loadUI(TavernGet)
                        .then((tavernget: TavernGet) => {
                            tavernget.init(this);
                            tavernget.setInfo(2, goodsId, type, num);
                            tavernget.show(); //this.addChild(tavernget);
                            tavernget.setInfoAni();
                        });

                } else {
                    loadUI(TavernGet)
                        .then((tavernget: TavernGet) => {
                            tavernget.init(this);
                            tavernget.setInfo(1);
                            tavernget.show(); //this.addChild(tavernget);
                            tavernget.setInfoAni();
                        });
                }
            }
        }

        //操作一杯（苏打、啤酒、红酒）计算所得酒馆积分
        // type  抽奖类型
        // num   抽奖数量
        public onEarnPointOne(goodsId?: number, type?: number, num?: number) {
            loadUI(TavernGet)
                .then((tavernget: TavernGet) => {
                    tavernget.init(this);
                    tavernget.setInfo(2, goodsId, type, num);
                    tavernget.show(); //this.addChild(tavernget); 
                    tavernget.setInfoAni();
                    console.log("——————————————————————————" + "新手引导： 酒馆恭喜获得打开" + "——————————————————————————");

                });
        }

        //啤酒十连抽最后一次出现A级以上猎人
        public onTavernget() {
            loadUI(TavernGet)
                .then((dialog: TavernGet) => {
                    dialog.init(this);
                    dialog.setInfo(1);
                    dialog.show();
                    //this.addChild(dialog);
                    dialog.setInfoAni();
                });
        }

        //红酒按钮抬起操作
        public onBtnRedWineEnd() {
            this.AddEvent();
            //toast("红酒");
            this.groupRedWine.scaleX = 1;
            this.groupRedWine.scaleY = 1;
            if (Game.PlayerInfoSystem.RedWine == 0) {
                this.removeEvent();
                toast_warning("红酒不足");
                this.setUI();
            } else {
                this.reqFindHero(2, 1)
                this.setUI();
            }
        }


        //红酒按钮按下操作
        public onBtnRedWineBegin() {
            //toast("红酒");
            this.groupRedWine.scaleX = 1.2;
            this.groupRedWine.scaleY = 1.2;
        }

        //香槟抬起操作
        public onBtnChampagneEnd() {
            this.AddEvent();
            this.groupChampagne.scaleX = 1;
            this.groupChampagne.scaleY = 1;
            if (Game.PlayerInfoSystem.Champagne == 0) {
                this.removeEvent();
                toast_warning("香槟不足");
                this.setUI();
            } else {
                this.reqFindHero(3, 1)
                this.setUI();
            }
        }

        //香槟按下操作
        public onBtnChampagneBegin() {
            //toast("香槟");
            this.groupChampagne.scaleX = 1.2;
            this.groupChampagne.scaleY = 1.2;
        }

        private typerEffect(obj, content: string = "", interval: number = 200, backFun: Function = null): void {
            var strArr: Array<any> = content.split("");
            var len: number = strArr.length;
            obj.text = "";
            this.timenpc = [];
            for (let i = 0; i < len; i++) {

                let timenum = egret.setTimeout(function () {
                    obj.appendText(strArr[Number(this)]);
                }, i, interval * i);

                this.timenpc.push(timenum);
            }

        }

        //接受协议传回来的值
        public reqFindHero_Visit(msg) {
            let tavernmask = new TavernMask();
            if (Teach.BeInTeaching() == false) {
                //点击任意区域关闭
                this.labelCloseTheTip.visible = true;
                egret.Tween.get(this.labelCloseTheTip, { loop: true })
                    .to({ alpha: 1 }, 1000)
                    .to({ alpha: 0 }, 1000);

                tavernmask.init(this);
                this.addChild(tavernmask);
                tavernmask.name = "tavernmask";
                this.removeEvent();
            }
            // this.group6.visible = false;

            if (this.num == 1 || this.num == 0) {
                let heroId = 0
                if (PlayerItemSystem.ItemType(msg.gameInfo.getGoods[0].goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    heroId = msg.gameInfo.getGoods[0].goodsId
                } else if (msg.gameInfo.getGoods[0].index > 0 && PlayerItemSystem.ItemType(msg.gameInfo.getGoods[0].index) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    heroId = msg.gameInfo.getGoods[0].index
                }

                if (heroId != 0) {
                    let info = PlayerHunterSystem.Table(heroId)
                    let dbname = "jg_zhaomu";
                    if (RES.getRes("jg_zhaomu_large_tex_png")) dbname = "jg_zhaomu_large";
                    if (info.aptitude >= 13) {
                        this.addAnimatoin001_putong(dbname, "002_gaoji", 1);
                        //this.sence.ChangeAction(2)
                    } else {
                        this.addAnimatoin001_putong(dbname, "001_putong", 1);
                        //this.sence.ChangeAction(1)
                    }
                } else {
                    // this.sence.ChangeAction(1)
                }
                //this.sence.SetLoop(false)
                egret.Tween.get(this).wait(30).call(() => {
                    Game.SoundManager.playMusic(this.SetInfoOpen(31053), 1);
                }).wait(500).call(() => {
                    Game.SoundManager.playMusic(this.SetInfoOpen(31054), 1);
                }).wait(2800).call(() => {
                    Game.SoundManager.playMusic(this.SetInfoOpen(31055), 1);
                }).wait(2800).call(() => {
                    Game.SoundManager.playMusic("city_mp3", 0);
                })

                let cur_time = 0
                this.timer = setInterval(() => {
                    cur_time = cur_time + 500
                    if (cur_time >= this.ani_Delay_Time || this.animationType == true) {
                        //this.sence.ChangeAction(0)
                        //this.sence.SetLoop(true)
                        this.labelCloseTheTip.visible = false;
                        if (tavernmask.parent) this.removeChild(tavernmask);
                        this.animationType = false;
                        this.onCommonTavern(1, heroId, msg.gameInfo.getGoods, this.ttype, this.num);
                        Game.PlayerInfoSystem.playAnnouce = true
                        msg.gameInfo.getGoods.push(this.lotter);
                        let [hero] = Table.FindR(msg.gameInfo.getGoods, function (key, var_) {
                            return (PlayerItemSystem.ItemType(var_.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) ||
                                (var_.index > 0 && PlayerItemSystem.ItemType(var_.index) == message.EGoodsType.GOODS_TYPE_GENERAL)
                        })

                        if (hero != null) {
                            let hunterId = 0
                            if (hero.index > 0 && PlayerItemSystem.ItemType(hero.index) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                                hunterId = hero.index
                            } else {
                                hunterId = hero.goodsId
                            }

                        } else {
                            let mn = msg.gameInfo.getGoods;
                            //TipMgr.GetList(msg.gameInfo.getGoods, this, this.SetUI,null,null,TableEnum.Enum.HXHGetGoodsFromType.Tavern)
                        }
                        clearInterval(this.timer)
                        //this.labelMap.LabelCloseTip.node.active = false;
                    }
                }, 500)
            }

            //喝多杯苏打水
            else if (this.ttype == 4 && this.num > 1) {
                let has_high_aptitude = false
                for (const k in msg.gameInfo.getGoods) {
                    if (msg.gameInfo.getGoods.hasOwnProperty(k)) {
                        if (PlayerItemSystem.ItemType(msg.gameInfo.getGoods[1].goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                            const v = msg.gameInfo.getGoods[k];
                            if (PlayerHunterSystem.Table(v.goodsId).aptitude >= 13) {
                                has_high_aptitude = true
                                break
                            }
                        }
                    }
                }

                let dbname = "jg_zhaomu";
                if (RES.getRes("jg_zhaomu_large_tex_png")) dbname = "jg_zhaomu_large";
                this.addAnimatoin001_putong(dbname, "001_putong", 1);
                if (has_high_aptitude) {
                    //this.sence.ChangeAction(2)
                } else {
                    //this.sence.ChangeAction(1)
                }

                egret.Tween.get(this).wait(30).call(() => {
                    Game.SoundManager.playMusic("tavern1_mp3", 1);
                }).wait(500).call(() => {
                    Game.SoundManager.playMusic("tavern2_mp3", 1);
                }).wait(2800).call(() => {
                    Game.SoundManager.playMusic("tavern3_mp3", 1);
                }).wait(3000).call(() => {
                    Game.SoundManager.playMusic("city_mp3", 0);
                })

                let cur_time = 0
                this.timer = setInterval(() => {
                    cur_time = cur_time + 500
                    if (cur_time >= this.ani_Delay_Time || this.animationType == true) {
                        this.labelCloseTheTip.visible = false;
                        if (tavernmask.parent) this.removeChild(tavernmask);
                        this.animationType = false;
                        this.onBtnNSoda(msg.gameInfo.getGoods);
                        clearInterval(this.timer);
                    }
                }, 500)

            }
            //10杯啤酒
            else if (this.ttype == 5 || this.ttype == 1 && this.num == 10) {
                let has_high_aptitude = false
                for (const k in msg.gameInfo.getGoods) {
                    if (msg.gameInfo.getGoods.hasOwnProperty(k)) {
                        if (PlayerItemSystem.ItemType(msg.gameInfo.getGoods[1].goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                            const v = msg.gameInfo.getGoods[k];
                            if (PlayerHunterSystem.Table(v.goodsId).aptitude >= 13) {
                                has_high_aptitude = true
                                break
                            }
                        }
                    }
                }
                let dbname = "jg_zhaomu";
                if (RES.getRes("jg_zhaomu_large_tex_png")) dbname = "jg_zhaomu_large";
                this.addAnimatoin001_putong(dbname, "002_gaoji", 1);

                egret.Tween.get(this).wait(30).call(() => {
                    Game.SoundManager.playMusic("tavern1_mp3", 1);
                }).wait(500).call(() => {
                    Game.SoundManager.playMusic("tavern2_mp3", 1);
                }).wait(2800).call(() => {
                    Game.SoundManager.playMusic("tavern3_mp3", 1);
                }).wait(2800).call(() => {
                    Game.SoundManager.playMusic("city_mp3", 0);
                })

                let cur_time = 0
                this.timer = setInterval(() => {
                    cur_time = cur_time + 500
                    if (cur_time >= this.ani_Delay_Time || this.animationType == true) {
                        this.labelCloseTheTip.visible = false;
                        if (tavernmask.parent) this.removeChild(tavernmask);
                        this.animationType = false;
                        this.onBtn10Beer(msg.gameInfo.getGoods);
                        clearInterval(this.timer);
                    }
                }, 500);

                console.log("gogo" + this.timer + cur_time);
                if (has_high_aptitude) {
                    //this.sence.ChangeAction(2)
                } else {
                    //this.sence.ChangeAction(1)
                }
                console.log("gogo" + this.timer);

            }
            this.setUI();
            if (Game.TeachSystem.curPart == 3001) {
                Teach.addTeaching();
            }
        }

        //开服活动
        private openServerActive() {

            loadUI(TavemAdversePage)
                .then((tavemadversepage: TavemAdversePage) => {
                    tavemadversepage.init(this);
                    tavemadversepage.show(UI.SHOW_FILL_OUT); //this.addChild(tavemadversepage);
                });
        }

        //猎人图鉴
        private onButtonArchive() {
            loadUI(HeroesPokedexScene)
                .then((scene: HeroesPokedexScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                });
        }

        //进入商店
        private onButtonShop() {
            var d = new Date().getDay();
            if (Game.PlayerInfoSystem.Level == 5) {
                loadUI(ShopMallDialog)
                    .then((dialog: ShopMallDialog) => {
                        dialog.load(5, false, this);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            } else if (Game.PlayerInfoSystem.Level < 5) {
                toast_warning("队伍达到5级后开启商店");
            } else {
                if (PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_MALL, true))
                    if (PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_MALL))
                        loadUI(ShopMallDialog)
                            .then((dialog: ShopMallDialog) => {
                                dialog.load(5, false, this);
                                dialog.show(UI.SHOW_FROM_TOP);
                            });
            }
        }

        //进入商城
        private onBtnAdddiamond() {
            loadUI(PayMallScene)
                .then((scene: PayMallScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    scene.init();
                });
        }

        private setTavernActivityPage() {

            let lastTime = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime - (7 * 86400 - CommonConfig.activity_lottery_survival_time);
            let bOpen = ((lastTime > 0) && (!Device.isReviewSwitch));

            let unixTimestamp = this.giftTimeShow(lastTime);
            if (!bOpen) {
                this.groupActivity.visible = false;
                this.groupGiftTime.visible = false;
                this.groupOpenActivities.visible = false;
            } else {
                this.groupActivity.visible = true;
                this.groupGiftTime.visible = true;
                this.groupOpenActivities.visible = true;
            }
            this.labelGiftTime.text = unixTimestamp;

            let bShowToday: boolean = Tips.tips_oneday_get(Tips.SAVE.TAVERN_ACTIVITY);
            if (/*bOpen == true && bShowToday == true && !Teach.BeInTeaching()*/bOpen == true && bShowToday == true && Game.TeachSystem.curPart != 3001) {
                loadUI(TavemAdversePage)
                    .then((tavemadversepage: TavemAdversePage) => {
                        tavemadversepage.init(this);
                        tavemadversepage.show(UI.SHOW_FILL_OUT);
                    });
            }

        }

        //显示那种啤酒礼包（打折、非打折）
        private setInfoBeerGift() {
            if (Game.PlayerInfoSystem.Level >= 2) {
                this.buttonBeerGift.visible = false;
                this.imageGiftNewLog.visible = false;
                this.groupTime.visible = false;
                this.groupBeerGift.visible = false;
                if (Game.PlayerGiftSystem.beerGift() == 100201) {
                    //this.addBeerEightActivities("dazhe_eff","001_dazhe_xunhuan");
                    this.groupTimeLimit.visible = false;
                    if (!Device.isReviewSwitch && this.groupBeer.visible == true) {
                        this.groupBeerGift.visible = true;
                    }
                    this.buttonBeerGift.visible = true;
                    this.timeGift = Tips.GetSaveIntValue(1, "TAVERN");
                    if (this.timeGift >= 1) {
                        this.imageGiftNewLog.visible = false;
                    } else {
                        this.imageGiftNewLog.visible = true;
                    }

                } else if (Game.PlayerGiftSystem.beerGift() == 100202) {
                    let beerGiftInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (k, v) {
                        return v.gift_index == 100202
                    })
                    this.addBeerEightActivities("dazhe_eff", "001_dazhe_xunhuan");
                    if (!Device.isReviewSwitch && this.groupBeer.visible == true) {
                        this.groupBeerGift.visible = true;
                    }
                    this.buttonBeerGift.visible = true;
                    this.groupTime.visible = true;
                    let date = Game.Controller.serverNow();
                    let humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
                    let serverTime: number = humanDate.getTime() / 1000 - 8 * 60 * 60;
                    let beerTblInfo = PlayerGiftSystem.Instance_item(100202)
                    let timenew = (beerGiftInfo[0].trigger_time + beerTblInfo.duration) - serverTime;
                    let unixTimestamp = this.giftTimeShow(timenew);
                    this.labelTime.text = unixTimestamp;

                }
                else {
                    this.groupBeerGift.visible = false;
                }

            }
            else {
                this.groupBeerGift.visible = false;
            }
        }

        //礼包剩余时间
        private giftTimeShow(ms: number) {
            ms = ms >= 0 && ms || 0;
            let a = 0;
            let tmp = ms;
            let b = Math.floor(tmp / 3600);
            let c = Math.floor((tmp % 3600) / 60);

            let day = a;
            let hour = b;
            let min = c;

            if (a == 0 && b != 0 && c != 0) {
                return hour + TextsConfig.TextsConfig_Time.hour + min + TextsConfig.TextsConfig_Time.min
            }
            else if (a == 0 && b == 0) {
                return min + TextsConfig.TextsConfig_Time.min
            }
            else if (a != 0 && b == 0 && c == 0) {
                return day + TextsConfig.TextsConfig_Time.day
            }
            else if (a == 0 && b != 0 && c == 0) {
                return hour + TextsConfig.TextsConfig_Time.hour
            }

            return day + TextsConfig.TextsConfig_Time.day + " " + hour + ":" + min

        }

        //啤酒礼包
        private onButtonBeerGift() {
            let info = null;
            let beerGiftInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.gift_index == 100201;
            })

            let giftBTime = PlayerGiftSystem.Instance_item(100202).buy_times
            let beerGiftInfoB = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.gift_index == 100202 && v.buy_times < giftBTime
            })

            if (beerGiftInfoB[0] == null && beerGiftInfo[0] != null) {
                this.timeGift = Tips.GetSaveIntValue(1, "TAVERN");
                Tips.SetSaveIntValue(1, this.timeGift + 1, "TAVERN");
            }

            info = beerGiftInfoB[0] != null ? beerGiftInfoB[0] : (beerGiftInfo[0] != null ? beerGiftInfo[0] : null)
            //info=beerGiftInfo;
            if (info == null) {
                toast(TextsConfig.TextsConfig_Hunter_Tavern.limitBeer)
            } else {
                loadUI(GiftFirstPopC)
                    .then((gift: GiftFirstPopC) => {
                        gift.setInfo(info, this, true);
                        gift.show(UI.SHOW_FROM_TOP);

                        this.setUI();
                    });
            }
        }

        /**朗姆酒礼包 */
        private onBtnRum1() {
            let info = Table.FindR(Game.PlayerGiftSystem.giftInfos, (k, v) => {
                return v.gift_index == 100211;
            })[0];
            if (info == null) {
                toast(TextsConfig.TextsConfig_Hunter_Tavern.limitBeer)
            } else {
                loadUI(GiftFirstPopC)
                    .then((gift: GiftFirstPopC) => {
                        gift.setInfo(info, this, true);
                        gift.show(UI.SHOW_FROM_TOP);
                        this.setUI();
                    });
            }
        }

        private removeGroup() {
            this.groupSoda.scaleX = 1;
            this.groupSoda.scaleY = 1;
            this.group2.scaleX = 1;
            this.group2.scaleY = 1;
            this.group3.scaleX = 1;
            this.group3.scaleY = 1;
            this.groupSeniorWine.scaleX = 1;
            this.groupSeniorWine.scaleY = 1;
            this.groupRedWine.scaleX = 1;
            this.groupRedWine.scaleY = 1;
            this.groupChampagne.scaleX = 1;
            this.groupChampagne.scaleY = 1;
            this.btnDrinkOneSoda.scaleX = 1;
            this.btnDrinkOneSoda.scaleY = 1;
            this.btnDrinkFiveSoda.scaleX = 1;
            this.btnDrinkFiveSoda.scaleY = 1;
            this.btnDrinkFiveRum.scaleX = 1;
            this.btnDrinkFiveRum.scaleY = 1;
            this.btnDrinkOneRum.scaleX = 1;
            this.btnDrinkOneRum.scaleY = 1;
        }
    }

}
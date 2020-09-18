namespace zj {
    //许愿屋
    //yuqingchao
    //2019.05.06
    export class ActivityXuyuanBoom extends Dialog {
        private btnClose: eui.Button;           //关闭按钮
        private btnShwoAward: eui.Button;       //本期奖励
        private btnChangeItem: eui.Button;      //兑换礼物
        private btnOne: eui.Button;             //许愿一次
        private btnMore: eui.Button;            //许愿十次
        private groupAni: eui.Group;
        private groupAni0: eui.Group;
        private groupCurrency: eui.Group;
        private groupAll: eui.Group;
        private rectMask: eui.Image;
        private lbTime: eui.Label;              //活动时间
        private lbThisTime: eui.Label;          //本期剩余次数
        private lbOne: eui.Label;
        private lbOneFree: eui.Label;
        private lbMore: eui.Label;
        private lbCore: eui.Label;              //星星数量
        private imgOne: eui.Image;
        private lbGemstone: eui.Label;          //钻石数量
        private btnAddGemstone: eui.Button;     //加钻石按钮 
        private lbGemstone0: eui.Label;         //许愿牌数量
        private btnAddGemstone0: eui.Button;    //加许愿牌
        private imgTip: eui.Image;              //红点

        private topicId: any;
        private leftTime: number;
        public curTopicInfo: any;
        private donghua: dragonBones.EgretArmatureDisplay;
        public takeNum: number = null;
        public AniTimer: egret.Timer;
        private popGoods;
        private canBuyNum: number = 0;

        private maxTime: number = null;
        private useTime: number = null;
        private ownNum: number = null;

        public constructor() {
            super();
            this.skinName = "resource/skins/activity/ActivityXuyuanBoomSkin.exml";
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnShwoAward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnShwoAward, this);
            this.btnChangeItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChangeItem, this);
            this.btnOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOne, this);
            this.btnMore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMore, this);
            this.btnAddGemstone0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone0, this);
            this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
            Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.setFrech, this);

            this.rectMask = Util.getMaskImgBlack(this.skin.width, this.skin.height);
            this.rectMask.alpha = 0;
            this.rectMask.horizontalCenter = 0;
            this.rectMask.verticalCenter = 0;
            this.groupAll.addChild(this.rectMask);
            this.rectMask.visible = false;
            Game.EventManager.on(GameEvent.XUYUAN_UPDATE, this.upDate, this);

            // this.AniTimer = new egret.Timer(3.5, 0);

            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                Game.EventManager.off(GameEvent.XUYUAN_UPDATE, this.upDate, this);
                Game.EventManager.off(GameEvent.PLAYER_TOKEN_CHANGE, this.setFrech, this);
                if (this.AniTimer) this.AniTimer.stop();
            }, null);
        }
        private upDate() {
            this.lbCore.text = Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_currentScore.toString();
        }

        public Init() {
            Game.DragonBonesManager.playAnimation(this, "NPC_Wish", "armatureName", null, 0)
                .then(display => {
                    display.anchorOffsetX = -display.width / 2;
                    display.anchorOffsetY = -display.height;
                    display.x = -150;
                    display.y = -50;
                    this.groupAni0.addChild(display);
                });
            Game.DragonBonesManager.getAnimationWithBindImages(this, "wishspine", null, [null], ["role"])
                .then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                    // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                    //     armatureDisplay.animation.stop();
                    //     armatureDisplay.animation.reset();
                    //     armatureDisplay.armature.dispose();
                    //     armatureDisplay.dbClear();
                    //     armatureDisplay.dispose(true);
                    //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                    // }, null);
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                        armatureDisplay.animation.stop();
                    }, this)
                    this.donghua = armatureDisplay;
                    armatureDisplay.animation.play("normal", 0);
                    armatureDisplay.x = 180;
                    armatureDisplay.y = 10;
                    this.groupAni.addChild(armatureDisplay);
                });

            this.setInfo();
            this.gemsTone();
        }
        public isFullScreen() {
            return true;
        }
        private gemsTone() {
            if (Game.PlayerInfoSystem.Token > 100000) {
                if (((Game.PlayerInfoSystem.Token / 1000) >>> 0) % 10 == 0) {
                    this.lbGemstone.text = ((Game.PlayerInfoSystem.Token / 10000) >>> 0).toFixed(1) + "万";
                } else {
                    this.lbGemstone.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
                }
            } else {
                this.lbGemstone.text = Game.PlayerInfoSystem.Token.toString();
            }
            this.lbGemstone0.text = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_PROMISE);
        }

        private setInfo() {
            let xuyuanTbl = Game.ConfigManager.getTable(StringConfig_Table.xuyuan_random + ".json");         //读表
            let len = Object.keys(xuyuanTbl).length;
            let index = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].info % len;
            index = index == 0 && len || index;
            this.topicId = index;
            this.leftTime = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].leftTime - Math.floor(egret.getTimer() / 1000);
            this.curTopicInfo = xuyuanTbl[this.topicId];



            this.setInfoTime();
            this.setFrech();
            this.FreshRedTips();
        }

        private setInfoTime() {
            let beginTime = Date.parse(Game.Controller.serverNow().toString()) / 1000 + this.leftTime - this.curTopicInfo.subject_duration;
            let endTime = Date.parse(Game.Controller.serverNow().toString()) / 1000 + this.leftTime;
            let strOpen = Helper.GetTMStrForActivity(beginTime);
            let strClose = Helper.GetTMStrForActivity(endTime);

            this.lbTime.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.timeOpenAndClose, strOpen, strClose);
        }

        private setInfoXuyuanAni(goods) {
            let actionId = 1;
            let haveGoodThing = Table.FindF(goods, function (k, v) {
                let goodTbl = PlayerItemSystem.Item(v.goodsId) as any;
                return goodTbl.quality >= 5;
            })
            if (this.takeNum != 1 || haveGoodThing) {
                actionId = 2;
            }

            let curTime = 0;
            let aniDelayTime = 3.5;
            this.popGoods = goods;

            this.AniTimer = new egret.Timer(3500, 1);
            this.AniTimer.addEventListener(egret.TimerEvent.TIMER, this.xuyuanPop, this);
            this.AniTimer.start();
        }
        private xuyuanPop() {
            loadUI(ActivityXuyuanPop)
                .then((scene: ActivityXuyuanPop) => {
                    scene.setInfo(this.popGoods, this);
                    scene.show(UI.SHOW_FROM_TOP);
                });
        }

        private setFrech() {
            this.btnAddGemstone.enabled = true;
            this.btnAddGemstone0.enabled = true;
            let curTimes = Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_time;
            let allTimes = this.curTopicInfo.max_time;
            let lastTime = allTimes - curTimes;
            let timeStr = lastTime + "/" + allTimes;
            this.lbThisTime.text = timeStr;

            let curScore = Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_currentScore;
            let bFree = TableLicence.Item(Game.PlayerInfoSystem.LecenceLevel).xuyuan_free > Game.PlayerVIPSystem.vipInfo.xuyuan_free;
            let freeTime = TableLicence.Item(Game.PlayerInfoSystem.LecenceLevel).xuyuan_free - Game.PlayerVIPSystem.vipInfo.xuyuan_free;

            if (bFree) {
                this.lbOne.text = TextsConfig.TextsConfig_Egg_Random.free;
            } else {
                this.lbOne.text = this.curTopicInfo.consume_token;
            }
            this.imgOne.visible = !bFree;
            this.lbOne.visible = !bFree;
            this.lbOneFree.visible = bFree;
            this.lbOneFree.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.wishing_tree_free, freeTime);
            this.lbOne.text = this.curTopicInfo.consume_pai;
            this.lbMore.text = this.curTopicInfo.consume_pai_ten;
            this.lbCore.text = curScore.toString();

            if (Game.PlayerInfoSystem.Token > 100000) {
                if (((Game.PlayerInfoSystem.Token / 1000) >>> 0) % 10 == 0) {
                    this.lbGemstone.text = ((Game.PlayerInfoSystem.Token / 10000) >>> 0).toFixed(1) + "万";
                } else {
                    this.lbGemstone.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
                }
            } else {
                this.lbGemstone.text = Game.PlayerInfoSystem.Token.toString();
            }
            this.lbGemstone0.text = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_PROMISE);

        }

        //本期奖励
        private onBtnShwoAward() {
            loadUI(ActivityXuyuanAward)
                .then((dialog: ActivityXuyuanAward) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                    dialog.setInfo(this.topicId);
                });
        }

        //兑换礼物
        private onBtnChangeItem() {
            loadUI(ActivityXuyuanLive)
                .then((dialog: ActivityXuyuanLive) => {
                    dialog.init(this);
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        //许愿一次
        public onBtnOne() {
            this.xuyuanVisit(1);
        }

        //许愿十次
        public onBtnMore() {
            this.xuyuanVisit(10);
        }

        public OnAbovePop() {
            this.FreshRedTips();
        }

        private xuyuanVisit(time: number) {
            this.xuyuanLotteryReqBody_Visit(time).then((data: message.XuyuanLotteryResponse) => {
                if (data.header.result == 0) {
                    this.gemsTone();
                    this.setInfoXuyuanAni(data.body.gameInfo.getGoods);
                    this.setFrech();
                    this.FreshRedTips();
                    this.takeNum = time;
                    if (time == 1) {
                        this.rectMask.visible = true;
                        this.donghua.animation.stop();
                        this.donghua.animation.play("summon1", 1);
                        this.donghua.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                            this.donghua.animation.play("normal", 0);
                            this.rectMask.visible = false;
                        }, this)
                    } else if (time == 10) {
                        this.rectMask.visible = true;
                        this.donghua.animation.stop();
                        this.donghua.animation.play("summon2", 1);
                        this.donghua.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                            this.donghua.animation.play("normal", 0);
                            this.rectMask.visible = false;
                        }, this)
                    }
                } else if (data.header.result == message.EC.XG_LACK_TOKEN) {
                    Game.PlayerInfoSystem.playAnnouce = false;
                    loadUI(PayMallScene)
                        .then((scene: PayMallScene) => {
                            scene.show(UI.SHOW_FROM_TOP);
                            scene.init();
                            scene.setCB(() => { this.setFrech() });
                        });
                } else if (data.header.result == message.EC.XG_LACK_PROMISE) {
                    let costXuyuan = 9;
                    if (time == 10) {
                        costXuyuan = 10 - this.curTopicInfo.consume_pai_ten;
                    }
                    if (!this.buyXuyuanTime(false, costXuyuan)) {
                        console.log(data.header.result);
                    }
                } else {
                    Game.PlayerInfoSystem.playAnnouce = false;
                    console.log(data.header.result);
                }
            })
        }

        private xuyuanLotteryReqBody_Visit(time: number) {
            return new Promise((resolve, reject) => {
                let request = new message.XuyuanLotteryRequest();
                request.body.lottery_time = time;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.XuyuanLotteryResponse>resp;
                    console.log(response);
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_TOKEN && response.header.result != message.EC.XG_LACK_PROMISE) {
                        toast_warning(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false, true);
                return;
            });
        }

        private onBtnClose() {
            this.close(UI.HIDE_TO_TOP);
        }
        private buyXuyuanTime(needError, initialNum) {
            let bOpen = (Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].info != 0)
                && (Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].leftTime - Math.floor(egret.getTimer() / 1000) != 0)
            if (!bOpen) {
                toast(TextsConfig.TextsConfig_Xuyuan.bEnd);
                return;
            }
            let xuyuanTbl = Game.ConfigManager.getTable(StringConfig_Table.xuyuan_random + ".json");         //读表

            let quickMallInfo = Game.ConfigManager.getTable(StringConfig_Table.fastMall + ".json")[message.EResourceType.RESOURCE_PROMISE];
            let index = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].info % Object.keys(xuyuanTbl).length;
            index = index == 0 && Object.keys(xuyuanTbl).length || index;
            let openIndex = index
            let xuyuanTbl0 = Game.ConfigManager.getTable(StringConfig_Table.xuyuan_random + ".json")[openIndex];
            if (xuyuanTbl0 != null) {
                this.maxTime = xuyuanTbl0.max_time;
                this.useTime = Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_time;
                this.ownNum = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_PROMISE);
                this.canBuyNum = this.maxTime - this.useTime - this.ownNum;
                if (this.canBuyNum <= 0) {
                    toast_warning(TextsConfig.TextsConfig_Xuyuan.cannotBuyTime);
                    return;
                } else {
                    let tokenCanBuyNum = Math.floor(PlayerItemSystem.Resource(message.EResourceType.RESOURCE_TOKEN) / quickMallInfo.consume_num);
                    this.canBuyNum = this.canBuyNum < tokenCanBuyNum ? this.canBuyNum : tokenCanBuyNum;
                    this.canBuyNum = this.canBuyNum > 99 ? 99 : this.canBuyNum;
                }
            }
            let canPush = false;
            if (this.canBuyNum <= 0 && needError && (Math.floor(PlayerItemSystem.Resource(message.EResourceType.RESOURCE_TOKEN) / quickMallInfo.consume_num)) != 0) {
                toast(TextsConfig.TextsConfig_Xuyuan.cannotBuyTime);
                return;
            } else {
                canPush = true;
                let firstTime = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_PROMISE);

                let num = firstTime;
                loadUI(TavernBuyPop)
                    .then((tavernBuyPop: TavernBuyPop) => {
                        tavernBuyPop.init(this);
                        tavernBuyPop.setInfo(message.EResourceType.RESOURCE_PROMISE, firstTime, this.canBuyNum);
                        tavernBuyPop.show(UI.SHOW_FROM_TOP);
                    });
            }
            return canPush;
        }
        public setUI() {
            this.lbGemstone0.text = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_PROMISE);
        }
        private onBtnAddGemstone() {
            Game.UIManager.loadUI(PayMallScene)
                .then((scene: PayMallScene) => {
                    scene.init();
                    scene.show(UI.SHOW_FROM_TOP);
                    // scene.setCB(() => { this.setFrech() });
                });
            this.gemsTone();
        }
        private onBtnAddGemstone0() {

            this.buyXuyuanTime(false, null)
            this.gemsTone();
        }

        private FreshRedTips() {
            if (Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_exchangeZone == null) return;
            let canConvert: boolean = false;
            let canAward: boolean = false;
            for (let k in this.curTopicInfo.exchange_goods) {
                let v = this.curTopicInfo.exchange_goods[k];
                let buy_times = Table.FindR(Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_exchangeZone, function (k, v) {
                    return v.key == k - 1;
                })[0];
                let coreCanGet = Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_currentScore >= this.curTopicInfo.exchange_xuyuan[k];
                let timeCanGet = (buy_times == null) || (buy_times.value < this.curTopicInfo.exchange_count[k]);
                if (coreCanGet && coreCanGet) {
                    canConvert = true;
                }
            }
            for (let i = 0; i < this.curTopicInfo.step_score.length; i++) {
                let any = Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_allScore;
                let score = this.curTopicInfo.step_score[i];
                if (Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_allScore >= this.curTopicInfo.step_score[i]) {
                    if (!Table.VIn(Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_freeZone, (i))) {
                        canAward = true;
                    }
                }
            }
            this.imgTip.visible = canAward || canConvert;
        }
    }
}
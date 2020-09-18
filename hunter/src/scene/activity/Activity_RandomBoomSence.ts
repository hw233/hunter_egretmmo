namespace zj {
    // 抓娃娃 -- 首页
    // wangshenzhuo
    // 2019/04/08
    export class Activity_RandomBoomSence extends Scene {

        private imageTitle: eui.Image;
        private labelTextTime: eui.Label;
        private buttonClose: eui.Button;
        private groupAni: eui.Group;
        private groupLight1: eui.Group;
        private groupLight2: eui.Group;
        private groupGift: eui.Group;
        private listTableView: eui.List;
        private listTableViewB: eui.List;
        private labelCore: eui.BitmapLabel;
        private buttonChangeItem: eui.Button;
        private buttonOne: eui.Button;
        private imageOne: eui.Image;
        private labelOne: eui.Label;
        private labelOneFree: eui.Label;
        private buttonMore: eui.Button;
        private labelMore: eui.Label;
        private imageNew: eui.Image;
        private groupListMain: eui.Group;
        private imageRect: eui.Image;
        private btnAddGemstone: eui.Button;
        private lbGemstone: eui.Label;
        private imgRedTip: eui.Image;
        public AllGeneralHistory: any;
        private btnRank: eui.Button;

        private topicId: number;
        private leftTime: number;
        public curTopicInfo: any;
        private page: number;
        private babyNum: number;
        public takeNum: number;

        private TableViewItem: eui.ArrayCollection;
        private TableViewIndex: number = 0;
        // private timer: egret.Timer;

        public constructor() {
            super();
            this.skinName = "resource/skins/activity/Activity_RandomBoomSenceSkin.exml";
            // //创建一个计时器对象
            // this.timer = new egret.Timer(999, 0);
            // //注册事件侦听器
            // this.timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
            // this.timer.start();
            this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnReturn, this);
            this.buttonOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonOne, this);
            this.buttonMore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonMore, this);
            this.groupGift.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupGift, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this);
            this.buttonChangeItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonChange, this);
            this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
            Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.SetFresh, this);
            this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRank, this);
            this.imageRect.visible = false;
        }

        public Init() {
            this.imageRect.visible = false;
            Game.DragonBonesManager.playAnimation(this, "ui_wawa_libao_eff", "armatureName", "000_libao", 0)
                .then((display: dragonBones.EgretArmatureDisplay) => {
                    display.x = this.groupGift.x + display.width / 2 - 10;
                    display.y = this.groupGift.y + display.height / 2 - 13;
                    this.groupGift.addChild(display);
                });

            this.babyNum = 0;
            this.SetInfo();
            this.FreshRedTips();

            let info: message.ActivityInfo = Table.FindR(Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == message.ActivityType.ACT_TYPE_RANK;
            })[0];

            if (info != null && Game.Controller.curServerTime > info.openTime && Game.Controller.curServerTime < info.closeTime && info.consumeType == message.ConsumeType.CONSUME_TYPE_INTEGRAL) {
                this.btnRank.visible = true;
            }
            else {
                this.btnRank.visible = false;
            }

        }

        public update() {

        }

        public SetInfo() {
            let randomTbl = TableIntegralEgg.Table();
            let index = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG].info % Object.keys(randomTbl).length;
            index = index == 0 && Object.keys(randomTbl).length || index;
            this.topicId = index;
            this.leftTime = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG].leftTime;
            let tblConsume = Game.ConfigManager.getTable(StringConfig_Table.egg_random + ".json");  //读表
            this.curTopicInfo = tblConsume[this.topicId];
            this.page = 1;

            this.SetInfoGoodsList();
            this.SetInfoTime();
            this.SetFresh();
            this.addAnimatoin("ui_wawaji_eff", "000_daiji", 0, this.groupAni);

            if (this.groupLight1 != null && this.groupLight2 != null) {
                Game.DragonBonesManager.playAnimation(this, "ui_wawaji_eff", "armatureName", "004_dengzu_02", 0)
                    .then((display: dragonBones.EgretArmatureDisplay) => {
                        display.x = this.groupLight1.x;
                        display.y = this.groupLight1.y;
                        this.groupLight1.addChild(display);
                    });

                Game.DragonBonesManager.playAnimation(this, "ui_wawaji_eff", "armatureName", "003_dengzu_01", 0)
                    .then((display: dragonBones.EgretArmatureDisplay) => {
                        display.x = this.groupLight2.x / 2;
                        display.y = 0;
                        this.groupLight2.addChild(display);
                    });
            }
        }

        public SetInfoGoodsList() {
            let goodsList1 = [];
            let goodsList2 = [];
            for (const k in this.curTopicInfo.client_goods) {
                const v = this.curTopicInfo.client_goods[k];
                let good = new message.GoodsInfo;
                good.goodsId = v[0];
                good.count = v[1];
                good.showType = 1;
                if (Number(k) <= 9) {
                    goodsList1.push(good);
                } else {
                    goodsList2.push(good);
                }
            }

            this.listTableView.selectedIndex = -1; // 默认选中
            this.listTableView.itemRenderer = Activity_RandomBoomAwardItem;//
            this.TableViewItem = new eui.ArrayCollection();
            for (let i = 0; i < goodsList1.length; i++) {
                let data = new Activity_RandomBoomAwardItemData();
                data.father = this;
                data.good = goodsList1[i];
                data.index = i;
                this.TableViewItem.addItem(data);
            }

            this.listTableView.dataProvider = this.TableViewItem;
            this.TableViewIndex = this.listTableView.selectedIndex;
        }


        public SetInfoTime() {
            Game.PlayerInstanceSystem.curServerTime = Date.parse(Game.Controller.serverNow().toString());
            let begin_time = Game.PlayerInstanceSystem.curServerTime + this.leftTime * 1000 - (this.curTopicInfo.subject_duration * 1000);
            let end_time = Game.PlayerInstanceSystem.curServerTime + this.leftTime * 1000;

            let str_open = this.formatMsTimeCh(begin_time);
            let str_close = this.formatMsTimeCh(end_time);
            this.labelTextTime.text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.wishing_tree_time, str_open, str_close);
            this.imageTitle.source = cachekey(this.curTopicInfo.background, this);
        }

        public SetFresh() {
            let cur_score = Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_currentScore;
            let b_first = Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_isFree;
            if (!b_first) {
                this.labelOne.text = TextsConfig.TextsConfig_Egg_Random.free;
            } else {
                this.labelOne.text = Game.PlayerInfoSystem.BaseInfo.dollCoin.toString();
            }

            this.imageOne.visible = b_first;
            this.labelOne.visible = b_first;
            this.labelOneFree.visible = !b_first;
            this.labelMore.text = Game.PlayerInfoSystem.BaseInfo.dollCoin.toString();
            this.labelCore.text = cur_score.toString();
            // this.imageNew.visible = true;
            this.imageNew.visible = Tips.tips_Random_get(999);

            if (Game.PlayerInfoSystem.Token > 100000) {
                this.lbGemstone.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
            } else {
                this.lbGemstone.text = Game.PlayerInfoSystem.Token.toString();
            }
        }

        //点击抓一次
        public onButtonOne() {
            this.AllGeneralHistory = Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds();
            this.imageRect.visible = true;
            this.babyNum = this.curTopicInfo.consume_token;
            this.LotteryReq(1);
        }

        //点击抓10次
        public onButtonMore() {
            this.AllGeneralHistory = Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds();
            this.imageRect.visible = true;
            this.babyNum = 10 - Game.PlayerInfoSystem.BaseInfo.dollCoin;
            this.LotteryReq(10);
        }

        private LotteryReq(time) {
            this.takeNum = time;
            Game.PlayerInfoSystem.playAnnouce = false;
            this.IntegralLotteryReqBody_Visit(time).then((data: message.IntegralLotteryResponse) => {
                if (data.header.result == 0) {
                    // let resetPosTbl = this.ResetFirstBlue(data.body.gameInfo.getGoods);
                    this.SetInfoEggAni(data.body.gameInfo.getGoods);
                    this.SetFresh();
                    this.FreshRedTips();
                } else if (data.header.result == message.EC.XG_LACK_TOKEN) {
                    Game.PlayerInfoSystem.playAnnouce = false;
                    this.imageRect.visible = false;
                    loadUI(PayMallScene)
                        .then((scene: PayMallScene) => {
                            scene.init();
                            scene.show(UI.SHOW_FROM_TOP);
                            scene.setCB(() => { this.SetFresh() });
                        });
                } else if (data.header.result == message.EC.XG_DOLL_COIN_NOT_ENOUGH) {
                    this.imageRect.visible = false;
                    loadUI(TavernBuyPop)
                        .then((tavernBuyPop: TavernBuyPop) => {
                            tavernBuyPop.init(this);
                            tavernBuyPop.setInfo(message.EResourceType.RESOURCE_DOLL_COIN, Game.PlayerInfoSystem.BaseInfo.dollCoin, this.babyNum);
                            tavernBuyPop.show(UI.SHOW_FROM_TOP);
                        });
                } else {

                    this.imageRect.visible = false;
                }
            }).catch((reason) => {
                if (reason == "猎人数量达到上限") {
                    toast_warning(reason);
                    this.imageRect.visible = false;
                }
            });
        }

        public setUI() {

        }

        public FreshRedTips() {
            if (Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_exchangeZone == null) {
                return;
            }
            let canConvert = false;
            for (const k in this.curTopicInfo.exchange_goods) {
                const v = this.curTopicInfo.exchange_goods[k];
                let num: any = (Number(k) - 1);
                let buy_times = Table.FindR(Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_exchangeZone, function (kk, vv) {
                    return vv.key == num;
                })
                let coreCanGet = Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_currentScore >= this.curTopicInfo.exchange_integral[k];
                let timeCanGet = (buy_times[0] == null) || (buy_times[0].value < this.curTopicInfo.exchange_count[k]);
                if (coreCanGet && coreCanGet) {
                    canConvert = true;
                    break;
                }
            }
            this.imgRedTip.visible = canConvert;
        }

        private SetInfoEggAni(goods) {
            let ani = null;
            if (this.takeNum == 1) {
                this.groupAni.removeChildren();
                // this.addAnimatoin("ui_wawaji_eff", "001_zhuaqu_01", 1, this.groupAni);
                Game.DragonBonesManager.playAnimation(this, "ui_wawaji_eff", "armatureName", "001_zhuaqu_01", 1)
                    .then(display => {
                        display.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                            this.animationEventBox(goods);
                            this.imageRect.visible = false;
                        }, this)
                        display.x = this.groupAni.x + display.width / 2;
                        display.y = this.groupAni.y + display.height / 2;
                        display.scaleX = 1.2;
                        display.scaleY = 1.2;
                        this.groupAni.addChild(display);
                    });
            } else if (this.takeNum == 10) {
                this.groupAni.removeChildren();
                Game.DragonBonesManager.playAnimation(this, "ui_wawaji_eff", "armatureName", "002_zhuaqu_02", 1)
                    .then(display => {
                        display.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                            this.animationEventBox(goods);
                            this.imageRect.visible = false;
                        }, this)
                        display.x = this.groupAni.x + display.width / 2;
                        display.y = this.groupAni.y + display.height / 2;
                        display.scaleX = 1.2;
                        display.scaleY = 1.2;
                        this.groupAni.addChild(display);
                    });
            }

        }


        private animationEventBox(goods) {
            this.groupAni.removeChildren();
            this.addAnimatoin("ui_wawaji_eff", "000_daiji", 0, this.groupAni);
            loadUI(Activity_RandomPop)
                .then((dialog: Activity_RandomPop) => {
                    dialog.SetInfo(goods, this);
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private ResetFirstBlue(tbl) {
            let [value, key] = Table.FindR(tbl, function (k, v) {
                let a = v;
                let b = k;
                if (PlayerItemSystem.ItemType(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    if (PlayerHunterSystem.Table(v.goodsId).aptitude < 13) {
                        return true;
                    }
                } else {
                    return true;
                }
                return false;
            })
            if (key != null && value != null) {
                tbl.splice(key);
                tbl.push(value);
            }
            return tbl;
        }

        public IntegralLotteryReqBody_Visit(time: number) {
            return new Promise((resolve, reject) => {
                let request = new message.IntegralLotteryRequest();
                request.body.lottery_time = time;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.IntegralLotteryResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_TOKEN && response.header.result != message.EC.XG_DOLL_COIN_NOT_ENOUGH) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
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

        //返回主界面
        private onBtnReturn() {
            Game.PlayerInfoSystem.playAnnouce = true;
            this.close(UI.HIDE_TO_TOP);
        }

        //跳转 娃娃币礼包 界面
        private onGroupGift() {
            Tips.tips_Random_set(999);
            loadUI(ActivityTimeGiftFirstPopCEgg)
                .then((dialog: ActivityTimeGiftFirstPopCEgg) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                    dialog.SetInfo(this.curTopicInfo);
                    dialog.setCB(() => { this.SetFresh() });
                });
        }

        //跳转 兑换礼物  界面
        private onButtonChange() {
            loadUI(Activity_RandomLive)
                .then((dialog: Activity_RandomLive) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                    dialog.SetInfo(this);
                });
        }

        //跳转商城
        private onBtnAddGemstone() {
            loadUI(PayMallScene)
                .then((scene: PayMallScene) => {
                    scene.init();
                    scene.show(UI.SHOW_FROM_TOP);
                });
        }

        // 鼠标点击 物品详情
        public onChooseItemTap(isTouchBegin: boolean, data: Activity_RandomBoomAwardItemData) {
            let _type = PlayerItemSystem.ItemType(data.good.goodsId);

            let dialog = this.groupListMain.getChildByName("Item-skill-common") as CommonDesGeneral;
            if (dialog) this.groupListMain.removeChild(dialog);
            let posY: number;
            let posX: number;
            let index: number;

            if (data.index > 5) {
                posY = 70;
                index = data.index - 5;
            } else if (data.index > 2) {
                posY = -120;
                index = data.index - 2;
            } else {
                posY = 85;
                index = data.index + 1;
            }

            if (data.index == 0) {
                index = 2.8;
                posY = -80;
            } else if (data.index == 3) {
                index = 2.8;
                posY = 100;
            } else if (data.index == 6) {
                index = 2.8;
                posY = 185;
            }

            posX = -250 + index * 130;

            if (isTouchBegin) {
                if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    loadUI(CommonDesGeneral).then((dialog: CommonDesGeneral) => {
                        dialog.x = posX;
                        dialog.y = posY;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.good.goodsId, data.good.count);
                        this.groupListMain.addChild(dialog);
                    });
                } else
                    if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                        loadUI(Common_DesRandom).then((dialog: Common_DesRandom) => {
                            dialog.x = posX;
                            dialog.y = posY;
                            dialog.name = "Item-skill-common";
                            dialog.setInfo(data.good.goodsId, data.good.count);
                            this.groupListMain.addChild(dialog);
                        });
                    } else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                        loadUI(Common_DesRes).then((dialog: Common_DesRes) => {
                            dialog.x = posX;
                            dialog.y = posY;
                            dialog.name = "Item-skill-common";
                            dialog.setInfo(data.good.goodsId, data.good.count);
                            this.groupListMain.addChild(dialog);
                        });
                    }
                    else {
                        loadUI(CommonDesProp).then((dialog: CommonDesProp) => {
                            dialog.x = posX;
                            dialog.y = posY;
                            dialog.name = "Item-skill-common";
                            dialog.init(data.good.goodsId, data.good.count);
                            this.groupListMain.addChild(dialog);
                        });

                    }
            }
        }

        //鼠标抬起，移除 物品详情
        private onRemoveAward() {
            let dialog = this.groupListMain.getChildByName("Item-skill-common");
            if (dialog) this.groupListMain.removeChild(dialog);
        }

        private formatMsTimeCh(times: number) {
            var time = new Date(times);
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            let m1: string;
            let d1: string;
            let mm1: string;
            if (m < 10) {
                m1 = ("0" + m);
            } else {
                m1 = m.toString();
            }
            if (d < 10) {
                d1 = ("0" + d);
            } else {
                d1 = d.toString();
            }
            if (mm < 10) {
                mm1 = ("0" + mm);
            } else {
                mm1 = mm.toString();
            }
            return y + "-" + m1 + "-" + d1 + " " + h + ":" + mm1;
        }

        //添加龙骨动画
        public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
            Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(display => {
                    display.x = group.x + display.width / 2;
                    display.y = group.y + display.height / 2;
                    display.scaleX = 1.2;
                    display.scaleY = 1.2;
                    group.addChild(display);
                })
                .catch(reason => {
                    toast(reason);
                });
        }

        private onBtnRank() {
            let info: message.ActivityInfo = Table.FindR(Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == message.ActivityType.ACT_TYPE_RANK;
            })[0];

            if (info != null && Game.Controller.curServerTime > info.openTime && Game.Controller.curServerTime < info.closeTime && info.consumeType == message.ConsumeType.CONSUME_TYPE_INTEGRAL) {
                loadUI(Activity_RanklistMain).then((dialog: Activity_RanklistMain) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                });
            }
            else {
                toast_success("活动未开启!");
            }
        }

    }
}
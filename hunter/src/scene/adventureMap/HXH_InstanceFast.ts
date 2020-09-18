namespace zj {
    /**
     * 副本扫荡挑战UI(外部跳转调用)
     * created by Lian Lei
     * 2019.03.01
     */
    export class HXH_InstanceFast extends Dialog {
        private btnClose: eui.Button;
        private imgName: eui.Image;
        // top
        private imgCurrTitilBG: eui.Image;
        private imgCurrIcon: eui.Image;
        private lbTitle: eui.Label;
        private lbName: eui.Label;
        private imgPassStars: eui.Image[];
        private groupLeftTimes: eui.Group;
        private labelTimeNum: eui.Label;
        private btnTimeAdd: eui.Button;

        // bottom
        private groupBottom: eui.Group;
        private listDrag: eui.List;
        private groupFirst: eui.Group;
        private imgFrameFirst: eui.Image;// 首杀奖励框
        private imgIconFirst: eui.Image;// 首杀奖励图标
        private groupFirstBlood: eui.Group;// 首杀动画group
        private labelFirstBlood: eui.BitmapLabel;// 首杀奖励数量
        private imgGiftGet: eui.Image;

        private btnSweep5: eui.Button;// 扫荡N次
        private btnSweep: eui.Button;// 扫荡
        private btnDekaron: eui.Button;// 进入战斗

        private btnAdd: eui.Button;
        private labelPowerNum: eui.Label;
        private energy1: eui.Image

        // private imgMask: eui.Image;

        private father;
        private callBack: () => void;
        private listData: eui.ArrayCollection = new eui.ArrayCollection();
        private instanceId: number;
        private instanceInfo: TableInstance;
        private curMobInfo;
        private needNum: number;
        private needId: number;

        private id: number = 0;

        private mobId: number;

        private timer: number;

        private energy: eui.Image;

        public constructor() {
            super();
            this.skinName = "resource/skins/adventureMap/HXH_InstanceFastSkin.exml";
            this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddPower, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnDekaron.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDekaron, this);
            this.btnSweep.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSweep, this);
            this.btnSweep5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSweep5, this);
            this.groupFirst.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnTouchBeginFirstBlood, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveDialog, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                this.father = null;
                egret.clearInterval(this.timer);
            }, null);
            this.timer = egret.setInterval(this.update, this, 1000);

            this.imgPassStars = [this["imgPassStar0"], this["imgPassStar1"], this["imgPassStar2"]];

            this.setInfo();
        }

        private setInfo() {
            this.labelPowerNum.text = Helper.StringFormat("%s/%d", PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_POWER),
                PlayerVIPSystem.LowItem().power_add + PlayerVIPSystem.Item().role_power);
        }

        public setOutPut(mobId: number, needNum: number, needId: number, callBack) {
            this.mobId = mobId;
            this.callBack = callBack;
            this.instanceId = mobId;
            this.needNum = needNum;
            this.needId = needId;
            this.instanceInfo = TableInstance.Item(mobId);
            let [areaId, chapIdx] = Game.PlayerInstanceSystem.ChapterIdx(this.instanceInfo.instance_id);

            this.imgName.source = cachekey("ui_instancenew_area_name_" + areaId + "_png", this);

            this.lbTitle.text = areaId + "-" + (Number(chapIdx) + 1);
            this.lbName.text = this.instanceInfo.instance_name;

            let star: number = 0;
            let mobInfo = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].mobsMap[mobId];

            let cardInfo = TableItemPotato.Table();
            let cardId: boolean = Table.FindF(cardInfo, (_k, _v) => {
                return _v.id == this.instanceInfo.first_reward[0][0];
            });

            if (mobInfo != null) {
                star = mobInfo.star;
                this.imgGiftGet.visible = mobInfo.firstReward;
            }
            else {
                this.imgGiftGet.visible = false;
            }

            for (let i = 0; i < 3; ++i) {
                if (i < star) {
                    this.imgPassStars[i].source = cachekey("ui_instancenew_dialog_star_png", this.father);
                } else {
                    this.imgPassStars[i].source = cachekey("ui_instancenew_dialog_star_gary_png", this.father);
                }
            }

            this.btnSweep5.visible = (star != 0);
            this.btnSweep.visible = (star != 0);

            let maxMobID: number = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID;
            this.imgCurrIcon.visible = (maxMobID == mobId);
            this.imgCurrTitilBG.source = maxMobID == mobId
                ? cachekey("ui_instancenew_dialog_item_title_bg1_png", this.father)
                : cachekey("ui_instancenew_dialog_item_title_bg0_png", this.father);
            (this.btnDekaron["labelCount"] as eui.Label).text = "" + (this.instanceInfo.challenge_win + this.instanceInfo.challenge_start);

            // this.imgMask.visible = (maxMobID < mobId);
            // this.imgMask.visible = false;

            this.freshInfo();

            // 添加common_Item
            this.loadList();
        }
        public FreshInfo(levelUp?: boolean) {
            this.freshInfo(levelUp);
        }
        public freshInfo(levelUp?: boolean) {
            this.groupLeftTimes.visible = (this.instanceInfo.challenge_num > 0 && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= this.instanceId);

            if (this.instanceInfo.challenge_num == 0) {
                let star = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].mobsMap[this.mobId].star;
                if (this.needNum - PlayerItemSystem.Count(this.needId) <= 0) {
                    this.btnSweep5.visible = false;
                }
                else {
                    this.btnSweep5.visible = (star != 0);
                    this.btnSweep5.label = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Common.sweepCount, Math.min(10, this.needNum - PlayerItemSystem.Count(this.needId)));
                }
                return;
            }

            if (Game.PlayerInstanceSystem.Mob(this.instanceId) != null) {
                let cur: number = Game.PlayerInstanceSystem.Mob(this.instanceId).dayTime;
                let total: number = this.instanceInfo.challenge_num * (1 + Game.PlayerInstanceSystem.Mob(this.instanceId).buyTime);
                let left: number = total - cur;
                this.labelTimeNum.text = TextsConfig.TextsConfig_Common.remainder + ":" + (left + "/" + this.instanceInfo.challenge_num);
                if (left <= 0) {
                    this.btnTimeAdd.visible = true;
                    this.btnSweep5.label = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Common.sweepCount, this.instanceInfo.challenge_num.toString());
                }
                else {
                    this.btnTimeAdd.visible = false;
                    this.btnSweep5.label = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Common.sweepCount, left.toString());
                }
            }
        }

        private onBtnDekaron() {
            let power: number = Game.PlayerInfoSystem.BaseInfo.power;
            let num: number = this.instanceInfo.challenge_win + this.instanceInfo.challenge_start;
            if (power < num) {
                loadUI(HXH_HunterUserStrength)
                    .then((dialog: HXH_HunterUserStrength) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                        dialog.SetInfo();
                    });
            }
            else {
                this.curMobInfo = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].mobsMap[this.instanceId];
                Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curMobID = this.curMobInfo.mobId;
                Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curChapterID = Game.PlayerInstanceSystem.Chapter(this.curMobInfo.mobId).chapter_id;
                if (this.father instanceof AdventureDialog) {
                    Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curAreaID = this.father.getCurrAreaId();
                }
                this.id = this.instanceId;
                Game.PlayerInstanceSystem.MobsInfo_Req(this.instanceId)
                    .then((value: {}) => {
                        Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
                        Game.PlayerFormationSystem.blowGuide = this.instanceId;
                        loadUI(CommonFormatePveMain)
                            .then((dialog: CommonFormatePveMain) => {
                                dialog.show(UI.SHOW_FROM_TOP);
                                dialog.setInfo(this.id);
                            });
                    })
                    .catch((reason) => {
                        toast(Helper.GetErrorString(reason));
                    });
                // Teach.addTeaching();
            }
        }

        private loadList() {
            this.listData.removeAll();
            for (let i = 0; i < this.instanceInfo.challenge_goods.length; i++) {
                let itemData = new Common_ItemData();
				itemData.info = this.instanceInfo.challenge_goods[i];
				itemData.father = this;
				itemData.type = itemData.CurState.GetBadge;
				itemData.scale = 0.74;
				this.listData.addItem(itemData);
            }
            this.listDrag.dataProvider = this.listData;
            this.listDrag.itemRenderer = Common_Item;

            let itemSet = PlayerItemSystem.Set(this.instanceInfo.first_reward[0][0], 1, this.instanceInfo.first_reward[0][1]) as any;
            this.imgFrameFirst.source = cachekey(itemSet.Frame, this.father);
            this.imgIconFirst.source = cachekey(itemSet.Path, this.father);
            this.labelFirstBlood.text = "x" + Set.NumberUnit3(this.instanceInfo.first_reward[0][1]);
            // this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupFirstBlood, "daojuguang");
            this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupFirstBlood);
        }

        //添加龙骨动画
        private addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
            Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(display => {
                    display.x = group.explicitWidth / 2
                    //display.y =this.height*0.25;
                    display.y = group.explicitHeight / 2;
                    group.addChild(display);
                    display.scaleX = 0.5;
                    display.scaleY = 0.5;
                })
                .catch(reason => {
                    toast(reason);
                });
        }

        private onBtnSweep() {
            if (Game.PlayerInstanceSystem.CheckPower(this.instanceInfo.instance_id, 0) == false) {
                this.buyPower();
            }
            else {
                this.goSweep(1, false);
            }
        }

        private buyPower() {
            loadUI(HXH_HunterUserStrength)
                .then((dialog: HXH_HunterUserStrength) => {
                    dialog.SetInfo();
                    dialog.show(UI.SHOW_FROM_TOP);
                });
            this.freshInfo();
            // this.setOutPut(this.data);
        }

        private goSweep(times: number, is_down: boolean) {
            // this.close();
            // this.visible = false;
            this.alpha = 0;
            this.touchEnabled = false;
            this.touchChildren = false;
            this.CheckChallengeTime();

            if (times == 0) {
                times = 5;
            }
            let mobInfo = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].mobsMap[this.instanceId];
            if (mobInfo.star < message.EBattleStar.BATTLE_STAR_3) {
                let costUnit = CommonConfig.instance_normal_sweep_consume_token;
                let des = Helper.StringFormat(TextsConfig.TextConfig_Instance.warnWipe, costUnit * times, times);
                TipManager.ShowConfirmCancel(des, () => {
                    Game.PlayerInstanceSystem.SweepMobsReq(times, is_down, mobInfo)
                        .then((value: any) => {
                            Game.PlayerInstanceSystem.canSyncLevel = false;
                            loadUI(HXH_InstanceSweepFive)
                                .then((dialog: HXH_InstanceSweepFive) => {
                                    dialog.father = this;
                                    dialog.setSweepGoods(value.body.sweepGoods, value.body.gameInfo.getGoods);
                                    dialog.show(UI.SHOW_FROM_TOP);
                                });
                            if (this.callBack) {
                                this.callBack();
                            }
                        })
                        .catch((reason) => {
                            // toast(Helper.GetErrorString(reason));
                        })
                });
            }
            else if (this.CheckChallengeTime() == false) {
                this.onBtnTimeAdd();
            }
            else {
                Game.PlayerInstanceSystem.SweepMobsReq(times, is_down, mobInfo)
                    .then((value: message.SweepMobsResponse) => {
                        Game.PlayerInstanceSystem.canSyncLevel = false;
                        loadUI(HXH_InstanceSweepFive)
                            .then((dialog: HXH_InstanceSweepFive) => {
                                dialog.father = this;
                                dialog.setSweepGoods(value.body.sweepGoods, value.body.gameInfo.getGoods);
                                dialog.setCB(() => {
                                    this.freshInfo();
                                    this.isVisBtnSweep();
                                    this.closeThis();

                                });
                                dialog.show(UI.SHOW_FROM_TOP);
                            });
                    })
                    .catch((reason) => {
                        toast(Helper.GetErrorString(reason));
                    })
            }
        }

        private isVisBtnSweep() {
            if (this.btnSweep5.visible == false) {
                if (this.callBack) {
                    this.callBack();
                }
                this.close();
            }
        }

        private closeThis() {
            if (this.btnSweep5.visible == false) {
                this.alpha = 0;
                this.touchEnabled = false;
                this.touchChildren = false;
                this.close();
            }
            else {
                this.alpha = 1;
                this.touchEnabled = true;
                this.touchChildren = true;
            }
        }



        private CheckChallengeTime() {
            if (this.instanceInfo.challenge_num > 0 && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= this.instanceId) {
                if (Game.PlayerInstanceSystem.Mob(this.instanceId) != null) {
                    let cur = Game.PlayerInstanceSystem.Mob(this.instanceId).dayTime;
                    let total = this.instanceInfo.challenge_num * (1 + Game.PlayerInstanceSystem.Mob(this.instanceId).buyTime);
                    let left = total - cur;
                    return left > 0;
                }
            }
            else {
                return true;
            }
        }

        private onBtnSweep5() {
            if (PlayerVIPSystem.LowLevel().is_sweep == 1 || Game.PlayerInfoSystem.BaseInfo.level >= 30) {
                this.call();
            }
            else {
                let str = TextsConfig.TextConfig_Instance.errWipeTen;
                TipManager.ShowConfirmCancel(str, () => {
                    loadUI(PayMallScene)
                        .then((scene: PayMallScene) => {
                            scene.show(UI.SHOW_FROM_TOP);
                            scene.init(true);
                        });
                });
            }
        }

        private call() {
            let mobInfo = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].mobsMap[this.instanceId];

            if (Game.PlayerInstanceSystem.InstanceFun(mobInfo.mobId).challenge_num == 0) {
                let times = 0;
                times = Math.min(10, this.needNum - PlayerItemSystem.Count(this.needId));

                if (Game.PlayerInstanceSystem.CheckPower(mobInfo.mobId, times) == false) {
                    this.buyPower();
                }
                else {
                    this.goSweep(times, true);
                }
            }
            else {
                let cur = Game.PlayerInstanceSystem.Mob(this.instanceId).dayTime;
                let total = Game.PlayerInstanceSystem.InstanceFun(mobInfo.mobId).challenge_num * (1 + Game.PlayerInstanceSystem.Mob(this.instanceId).buyTime);
                if (Game.PlayerInstanceSystem.CheckPower(mobInfo.mobId, total - cur) == false) {
                    this.buyPower();
                }
                else {
                    this.goSweep(total - cur, true);
                }
            }
        }


        private onBtnTimeAdd() {
            this.buyMobsTime();
        }

        private buyMobsTime() {
            let str = Helper.StringFormat(TextsConfig.TextConfig_Instance.errCount, CommonConfig.changlle_time(Game.PlayerInstanceSystem.Mob(this.instanceId).buyTime),
                // Game.PlayerInstanceSystem.Level(null).buy_mobs - Game.PlayerInstanceSystem.Mob(this.instanceId).buyTime,
                // Game.PlayerInstanceSystem.Level(null).buy_mobs);
                PlayerVIPSystem.Level().buy_mobs - Game.PlayerInstanceSystem.Mob(this.instanceId).buyTime,
                PlayerVIPSystem.Level().buy_mobs);

            TipManager.ShowConfirmCancel(str, () => {
                this.buyMobsTime_Req();
            });
        }

        private buyMobsTime_Req() {

            Game.PlayerInstanceSystem.BuyMobsTime_Req(this.instanceId)
                .then((value: any) => {
                    // this.freshInfo();
                    this.setOutPut(this.instanceId, this.needNum, this.needId, this.callBack);
                })
                .catch((reason) => {
                    if (reason == message.EC.XG_INSTANCE_BUY_TIMES_MAX) {
                        toast(TextsConfig.TextsConfig_Error.buy_mobs_error);
                    }
                    else if (reason == message.EC.XG_LACK_TOKEN) {
                        // TipManager.ShowAddGemStone()
                    }
                    else {
                        toast_warning(Helper.GetErrorString(reason));
                    }
                });
        }

        private onBtnAddPower() {
            loadUI(HXH_HunterUserStrength)
                .then((dialog: HXH_HunterUserStrength) => {
                    dialog.SetInfo();
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnClose() {
            if (this.callBack) {
                this.callBack();
            }
            this.close(UI.HIDE_TO_TOP);
        }

        private onBtnTouchBeginFirstBlood(e: egret.TouchEvent) {
            let newThis = this;
            let touchX = e.stageX;
            let groupY: number;
            let type: number = 0;// type == 1 点击位置大于父类高度的一半
            if (e.stageY >= this.height / 2) {
                groupY = e.stageY - e.localY;
                type = 1;
            }
            else {
                groupY = e.stageY + 10;
            }

            let cardInfo = TableItemPotato.Table();
            let cardId: boolean = Table.FindF(cardInfo, (_k, _v) => {
                return _v.id == this.instanceInfo.first_reward[0][0];
            });

            if (!cardId) {
                let _type = PlayerItemSystem.ItemType(this.instanceInfo.first_reward[0][0]);
                if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    loadUI(CommonDesGeneral).then((dialog: CommonDesGeneral) => {
                        dialog.name = "First_Blood";
                        dialog.x = touchX - dialog.width / 2 - 20;
                        if (type == 1) {
                            dialog.y = groupY - dialog.height;
                        }
                        else {
                            dialog.y = groupY;
                        }
                        dialog.setInfo(newThis.instanceInfo.first_reward[0][0], newThis.instanceInfo.first_reward[0][1]);
                        newThis.addChild(dialog);
                    });
                } else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                    loadUI(Common_DesRes).then((dialog: Common_DesRes) => {
                        dialog.name = "First_Blood";
                        dialog.x = touchX - dialog.width / 2 - 20;
                        if (type == 1) {
                            dialog.y = groupY - dialog.height;
                        }
                        else {
                            dialog.y = groupY;
                        }
                        dialog.setInfo(newThis.instanceInfo.first_reward[0][0], newThis.instanceInfo.first_reward[0][1]);
                        newThis.addChild(dialog);
                    });
                } else {
                    loadUI(CommonDesProp).then((dialog: CommonDesProp) => {
                        dialog.name = "First_Blood";
                        dialog.x = touchX - dialog.width / 2 - 20;
                        if (type == 1) {
                            dialog.y = groupY - dialog.height;
                        }
                        else {
                            dialog.y = groupY;
                        }
                        dialog.init(newThis.instanceInfo.first_reward[0][0], newThis.instanceInfo.first_reward[0][1]);
                        newThis.addChild(dialog);
                    });
                }
            }
            else {
                let showCardInfo: TableItemPotato = cardInfo[this.instanceInfo.first_reward[0][0]];
                loadUI(PlayerCardPopDialog)
                    .then((dialog: PlayerCardPopDialog) => {
                        dialog.loadNotGet(showCardInfo, false, () => {
                            dialog.close();
                        });
                        dialog.name = "First_Blood";
                        dialog.show();
                    });
            }
        }

        public onRemoveDialog() {
            let dialogFirstBlood = this.getChildByName("First_Blood");
            if (dialogFirstBlood) this.removeChild(dialogFirstBlood);

            let dialogDropOrAward = this.getChildByName("DropOrAward");
            if (dialogDropOrAward) this.removeChild(dialogDropOrAward);
        }

        private update() {
            this.setInfo();
        }
    }
}
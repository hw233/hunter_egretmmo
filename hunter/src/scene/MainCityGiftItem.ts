namespace zj {
    // HXH_MainCityGiftItem
    // lizhengiang
    // 20190415
    export class MainCityGiftItem extends eui.ItemRenderer {
        private groupItem: eui.Group;
        private groupAni: eui.Group;
        private groupGift: eui.Group;
        private imgIcon: eui.Image;
        private imgTip: eui.Image;
        private imgBoard: eui.Image;
        private lbTime: eui.Label;


        private SelectTransferId = 100213;
        private JingXi1 = 900001; // 惊喜礼包A
        private JingXi2 = 900002; // 惊喜礼包B
        private FirstQuality = 1000001; // 猎人品质（一次）
        private EveryQuality = 500001; // 猎人品质（每次）
        private TIMESHOW = 10; //10天以内显示倒计时

        private index: number = null;
        private info;
        private refresh: number = 0;

        public constructor() {
            super();
            this.skinName = "resource/skins/MainCityGiftItemSkin.exml";
            cachekeys(<string[]>UIResource["MainCityGiftItem"], null);
            this.groupItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItem, this);

            Game.DragonBonesManager.playAnimation(this, "ui_tongyong_huodongguang_eff", "armatureName", null, 0).then(display => {
                this.groupAni.addChild(display);
            }).catch(reason => {
                toast(reason);
            });

            Game.DragonBonesManager.playAnimation(this, "shenmishangdian_eff", "armatureName", null, 0).then(display => {
                this.groupGift.addChild(display);
            }).catch(reason => {
                toast(reason);
            });
        }

        protected dataChanged() {
            this.index = this.data.index;
            this.info = this.data.info;
            this.refresh = 0;

            if (Game.UIManager.topScene() instanceof MainCityUI && this.info["name"] == "doubleGift" && !Teach.isDone(teachBattle.teachPartID_GiftBag) && Teach.isDone(teachBattle.teachPartID_First_Charge)) { // 
                let ui: any = Game.UIManager.topScene();
                if(ui instanceof MainCityUI){
                    if((ui as MainCityUI).sceneUI.isGetVip() || !Game.TeachSystem.isShowGetVip){
                        this.showGift({ data: { curPart: teachBattle.teachPartID_GiftBag } });
                    }
                }
            } else {
                if (this.info["name"] == "doubleGift" && !Teach.isDone(teachBattle.teachPartID_GiftBag) && Teach.isDone(teachBattle.teachPartID_First_Charge)) {
                    Game.EventManager.off(GameEvent.START_NEW_TEACHING, this.showGift, this);
                    Game.EventManager.on(GameEvent.START_NEW_TEACHING, this.showGift, this);
                }
            }

            this.setInfo();
        }

        private showGift(e) {
            if (e.data.curPart == teachBattle.teachPartID_GiftBag) {
                Game.TeachSystem.curPart == teachBattle.teachPartID_GiftBag;
                Teach.teachingNow = true;
                Game.EventManager.off(GameEvent.START_NEW_TEACHING, this.showGift, this);
                loadUI(GiftTimeUC)
                    .then((scene: GiftTimeUC) => {
                        scene.show(UI.SHOW_FILL_OUT);
                        let giftInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, (k, v) => {
                            return v.index == this.info["index"];
                        })[0];
                        scene.setInfo(true, giftInfo, this.data.father);
                        scene.setCB2(() => { this.data.father.setInfoGiftList(); });
                    });
                Teach.removeMask();
                Teach.SaveTeachPart(null, teachBattle.teachPartID_GiftBag);
                Teach.SaveTeachPartLocal(teachBattle.teachPartID_GiftBag);
                Teach.EndCurPart(false);
            }
        }

        private setInfo() {
            this.groupGift.visible = false;
            this.imgIcon.visible = true;

            if (this.info["name"] == "secretMall") {
                this.imgIcon.visible = false;
                this.imgTip.visible = false;
                this.groupGift.visible = true;
            } else if (this.info["name"] == "seven") {
                this.imgIcon.source = cachekey("ui_mainui_ButtonMainPreterentailNor_png", this);
                this.lbTime.visible = false;
                this.imgBoard.visible = false;
            } else if (this.info["name"] == "doubleGift") {
                let giftInfo = PlayerGiftSystem.Instance_index(this.info["cityIndex"]);
                this.imgIcon.source = cachekey(giftInfo.pic, this);
            } else if (this.info["name"] == "pushingGift") {
                let giftInfo: message.GiftInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, (k, v) => {
                    return v.index == this.info["index"];
                })[0];
                if (giftInfo.gift_index == 1100001) {
                    this.imgIcon.source = cachekey("ui_mall_icon_button_chengkabutton_png", this);
                } else if (giftInfo.gift_index == 1100002) {
                    this.imgIcon.source = cachekey("ui_mall_icon_button_hongkabutton_png", this);
                } else {
                    let paths = ["ui_mall_icon_button_xianshibutton_png", "ui_mall_icon_button_chaozhibutton_png"];
                    let picIndex = 1 - this.index % 2;
                    this.imgIcon.source = cachekey(paths[picIndex], this);
                    this.lbTime.visible = false;
                    this.imgBoard.visible = false;
                }
            } else if (this.info["name"] == "monthGift") {
                let newGiftInfo = PlayerGiftSystem.Instance_newGiftIndex(this.info["refrence"]);
                this.imgIcon.source = cachekey(newGiftInfo.pic, this);
            } else if (this.info["name"] == "otherGift") {
                let giftTbl = PlayerGiftSystem.Instance_item(this.info["giftId"]);
                this.imgIcon.source = cachekey(giftTbl.city_path, this);
                this.lbTime.visible = false;
                this.imgBoard.visible = false;
            }

            this.update();
        }

        private update() {
            if (this.info["name"] == "secretMall") {
                let activityInfo: message.ActivityInfo = Table.FindR(Game.PlayerActivitySystem.Activities, function (k, v) {
                    return v.type == message.ActivityType.ACT_TYPE_SECRET_MALL;
                })[0];

                if (activityInfo == null) {
                    return;
                }

                // 开启时间
                let lastTime: number = activityInfo.closeTime - Game.Controller.curServerTime;
                let show: boolean = (lastTime <= 3600 * 24 * this.TIMESHOW && lastTime > 0);
                this.imgBoard.visible = show;
                this.lbTime.visible = show;
                let strEnd = PlayerGiftSystem.upToTime3(lastTime);
                this.lbTime.textFlow = Util.RichText(strEnd);
            } else if (this.info["name"] == "seven") {
                Tips.SetTipsOfId(Tips.TAG.SEVEN, Tips.TAG.SEVEN_Gift);
                this.imgTip.visible = (Tips.GetTipsOfId(Tips.TAG.SEVEN, Tips.TAG.SEVEN_Reward) || Tips.GetTipsOfId(Tips.TAG.SEVEN, Tips.TAG.SEVEN_Gift));
            } else if (this.info["name"] == "monthGift") {
                let refrenceTbl = PlayerGiftSystem.AllGiftByRefrence(this.info["refrence"]);
                if (refrenceTbl[0] == null) {
                    this.imgBoard.visible = false;
                    this.lbTime.visible = false;
                }
                let [openTime, durantion] = [refrenceTbl[0].open_time, refrenceTbl[0].duration];
                let currentMonthDays = function () {
                    let cur = Game.Controller.serverNow();
                    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    let year = cur.getFullYear();
                    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                        days[1] = 29;
                    }
                    return days[cur.getMonth()];
                };
                let current = Game.Controller.serverNow();
                let currentDays = currentMonthDays();
                let currentDaysSecconds = currentDays * 86400;
                let lastTime = 0;
                if (openTime + durantion >= currentDaysSecconds) {
                    lastTime = currentDaysSecconds - current.getDate() * 86400 - current.getHours() * 3600 - current.getMinutes() * 60 - current.getSeconds();
                } else {
                    lastTime = openTime + durantion - (current.getDate() - 1) * 86400 - current.getHours() * 3600 - current.getMinutes() * 60 - current.getSeconds();
                }

                let show: boolean = (lastTime <= 3600 * 24 * this.TIMESHOW && lastTime > 0);
                this.imgBoard.visible = show;
                this.lbTime.visible = show;
                let strEnd = PlayerGiftSystem.upToTime3(lastTime);
                this.lbTime.textFlow = Util.RichText(strEnd);
            } else if (this.info["name"] == "doubleGift" || this.info["name"] == "pushingGift" || this.info["name"] == "otherGift") {
                if (this.info["end_time"] == 0) {
                    return;
                }

                let strEnd = PlayerGiftSystem.upToTime3(Number(this.info["end_time"]) - Game.Controller.curServerTime);
                this.lbTime.textFlow = Util.RichText(strEnd);

                let show: boolean = ((Number(this.info["end_time"]) - Game.Controller.curServerTime) <= 3600 * 24 * this.TIMESHOW && (Number(this.info["end_time"]) - Game.Controller.curServerTime) > 0);
                this.imgBoard.visible = show;
                this.lbTime.visible = show;

                if (this.refresh == 0 && this.info["end_time"] != 0 && Number(this.info["end_time"]) <= Game.Controller.curServerTime) {
                    this.refresh = 1;
                    Game.PlayerGiftSystem.getNewGift().then((gameInfo: message.GameInfo) => {
                        if (gameInfo.giftInfos.length > 0) {
                            this.data.father.setInfoGiftList();
                        }
                    });
                }
            }
        }

        private onClickItem() {
            if (this.info["name"] == "secretMall") {
                // HXH_PublicGift
                // 神秘商店
                loadUI(PublicGift)
                    .then((scene: PublicGift) => {
                        scene.show(UI.SHOW_FROM_TOP);
                        scene.init();
                    });
            } else if (this.info["name"] == "seven") {
                // Activity_HappySeven
                // 七日奖
                loadUI(ActivityHappySeven)
                    .then((scene: ActivityHappySeven) => {
                        scene.show(UI.SHOW_FROM_TOP);
                        // scene.init();
                    });
            } else if (this.info["name"] == "doubleGift") {
                // HXH_GiftTimeUC
                // 新手礼包
                loadUI(GiftTimeUC)
                    .then((scene: GiftTimeUC) => {
                        scene.show(UI.SHOW_FROM_TOP);
                        let giftInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, (k, v) => {
                            return v.index == this.info["index"];
                        })[0];
                        scene.setInfo(true, giftInfo, this.data.father);
                        scene.setCB2(() => { this.data.father.setInfoGiftList(); });
                    });
            } else if (this.info["name"] == "pushingGift") {
                // HXH_NewPushingGift
                loadUI(HXH_NewPushingGift)
                    .then((scene: HXH_NewPushingGift) => {
                        scene.show(UI.SHOW_FROM_TOP);
                        scene.SetInfo(this.info.index, () => { this.data.father.setInfoGiftList(); });
                    });
            } else if (this.info["name"] == "monthGift") {
                // HXH_GiftMonthList
                let index = this.info.refrence;
                loadUI(HXH_GiftMonthList)
                    .then((scene: HXH_GiftMonthList) => {
                        scene.show(UI.SHOW_FROM_TOP);
                        scene.SetInfo(index, () => { this.data.father.setInfoGiftList(); });
                    });
            } else if (this.info["name"] == "otherGift") {
                if (this.info["giftId"] == this.SelectTransferId) {
                    // Activity_Main
                    loadUI(ActivityMain)
                        .then((scene: ActivityMain) => {
                            scene.init(18)
                            scene.show(UI.SHOW_FROM_TOP);
                        });
                } else if (this.info["giftId"] == this.JingXi1 || this.info["giftId"] == this.JingXi2) {
                    // Activity_TimeGiftFirstPopM
                    // 惊喜包
                    loadUI(Activity_TimeGiftFirstPopM)
                        .then((scene: Activity_TimeGiftFirstPopM) => {
                            scene.show(UI.SHOW_FROM_TOP);
                            scene.setInfo(this.info["index"], () => { this.data.father.setInfoGiftList(); });
                        });
                } else if (this.info["giftId"] == this.FirstQuality) {
                    // Activity_TimeGiftFirstPopN
                    // 人偶礼包
                    loadUI(Activity_TimeGiftFirstPopN)
                        .then((scene: Activity_TimeGiftFirstPopN) => {
                            scene.show(UI.SHOW_FROM_TOP);
                            scene.setInfo(this.info["index"], () => { this.data.father.setInfoGiftList(); });
                        });
                } else if (this.info["giftId"] == this.EveryQuality) {
                    // Activity_TimeGiftFirstPopL
                    // 高级觉醒礼包
                    loadUI(Activity_TimeGiftFirstPopL)
                        .then((scene: Activity_TimeGiftFirstPopL) => {
                            scene.show(UI.SHOW_FROM_TOP);
                            scene.setInfo(this.info["index"], () => { this.data.father.setInfoGiftList(); });
                        });
                }
            }
        }
    }
}
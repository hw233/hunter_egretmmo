namespace zj {
    /**
     * @author xing li wei
     * 
     * @date 2019-1-24
     * 
     * @class 本服格斗场主界面
     */
    export const enum ArenaMainButtonState {
        ButtonNone = 0,
        /**换对手 */
        ButtonFresh = 1,
        /**购买次数 */
        ButtonBuy = 2,
    }

    export class ArenaLadder extends Dialog {
        public imgbg: eui.Image;
        public btnClose: eui.Button;
        public btnDiamond: eui.Button;
        public jewel: eui.Image;
        public labelDiamondNumber: eui.Label;
        public scroll: eui.Scroller;
        public listRival: eui.List;
        public btnChange: eui.Button;
        public btnBuy: eui.Button;
        public imgConSume: eui.Image;
        public labelConsume: eui.Label;
        public labelSurplusNumber: eui.Label;
        public groupRanking: eui.Group;
        public labelMyRank: eui.BitmapLabel;
        public imgFrame1: eui.Image;
        public imgIcon1: eui.Image;
        public label1: eui.Label;
        public imgFrame2: eui.Image;
        public imgIcon2: eui.Image;
        public label2: eui.Label;
        public imgFrame3: eui.Image;
        public imgIcon3: eui.Image;
        public label3: eui.Label;
        public imgFrame4: eui.Image;
        public imgIcon4: eui.Image;
        public label4: eui.Label;
        public btnShop: eui.Button;
        public btnRank: eui.Button;
        public btnReport: eui.Button;
        public btnAward: eui.Button;
        public imgTipShop: eui.Image;
        public imgTipReport: eui.Image;
        public btnFormat: eui.Button;
        public listSupport: eui.List;
        public listGeneral: eui.List;
        public btnLeft: eui.Button;
        public btnRight: eui.Button;

        private challengeTblNum: number = 0;

        public ladders: Array<message.SimpleRoleFormationInfo> = [];
        private currentNumber: number = 0;
        private buttonState: number = ArenaMainButtonState.ButtonNone;
        private callback: Function;
        private update: number;
        private timer: egret.Timer;
        /**1向左 2向右 */
        private timerType: number;
        private array: eui.ArrayCollection = new eui.ArrayCollection();
        constructor() {
            super();
            this.skinName = "resource/skins/arena/ArenaLadderSkin.exml";
        }

        private init() {
            if (this.imgbg.width < UIManager.StageWidth) {
                this.imgbg.width = UIManager.StageWidth;
            }

            let tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            this.btnDiamond.addEventListener(tap, this.onBtnDiamond, this);
            this.btnShop.addEventListener(tap, this.onBtnShop, this);
            this.btnRank.addEventListener(tap, this.onBtnRank, this);
            this.btnReport.addEventListener(tap, this.onBtnReport, this);
            this.btnAward.addEventListener(tap, this.onBtnAward, this);
            this.btnChange.addEventListener(tap, this.onBtnChange, this);
            this.btnBuy.addEventListener(tap, this.onBtnBuy, this);
            this.btnFormat.addEventListener(tap, this.onBtnFormat, this);
            this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnLeft, this);
            this.btnRight.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnRight, this);
            this.imgTipShop.visible = false;
            this.imgTipReport.visible = false;
            Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.refresh, this);
            this.listRival.useVirtualLayout = false;
            if (Teach.isDone(teachBattle.teachPartID_Arena) == false && Teach.isDone(1003) == true) {
                Teach.CheckAndSetTeach(teachBattle.teachPartID_Arena);
            }
            this.update = egret.setInterval(this.UpdateTips, this, 1000);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                egret.clearInterval(this.update);
            }, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, () => {
                this.timer.stop();
            }, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, () => {
                this.timer.stop();
            }, this);

            this.timer = new egret.Timer(1, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.update1, this);


            if (Device.isReviewSwitch) {
                this.btnRank.visible = false;
                this.btnReport.visible = false;
                this.btnAward.visible = false;
                this.imgTipReport.visible = false;
                this.groupRanking.visible = false;

                this.jewel.x = 8;
                this.jewel.y = 0;
                this.jewel.width = 40;
                this.jewel.height = 40;

                this.btnDiamond.x = 100;
                this.btnDiamond.y = 3;
                this.btnDiamond.width = 30;
                this.btnDiamond.height = 30;

                this.imgConSume.width = 40;
                this.imgConSume.height = 40;
                this.imgConSume.y = 150;

                this.labelDiamondNumber.width = 85;
            }
        }

        private onBtnLeft() {
            this.timerType = 1;
            this.timer.start();
        }

        private onBtnRight() {
            this.timerType = 2;
            this.timer.start();
        }

        private update1() {
            if (this.timerType == 1 && this.scroll.viewport.scrollH <= 1450) {
                this.scroll.viewport.scrollH += 10;
            } else if (this.timerType == 2 && this.scroll.viewport.scrollH >= 0) {
                this.scroll.viewport.scrollH -= 10;
            } else {
                this.timer.stop();
            }
        }

        public isFullScreen() {
            return true;
        }
        public setInfo(roleFormationInfo: Array<message.SimpleRoleFormationInfo>, cb: Function) {
            this.init();
            this.ladders = roleFormationInfo;
            this.callback = cb;

            this.refresh();
            this.UpdateTips();
        }

        private UpdateTips() {
            if (!Device.isReviewSwitch) {
                let bTips1 = Tips.GetTipsOfMail(message.MailType.MAIL_TYPE_LADDER)
                this.imgTipReport.visible = bTips1;
            }

            let bTips2 = Tips.GetTipsOfId(Tips.TAG.LADDER, Tips.TAG.LADDER_MALL)
            this.imgTipShop.visible = bTips2;
        }

        private refresh() {
            let token = Game.PlayerInfoSystem.Token;
            // this.labelDiamondNumber.text = PlayerItemSystem.Str_Resoure(token);
            if (token > 100000) {
                this.labelDiamondNumber.text = (token / 10000).toFixed(1) + TextsConfig.TextsConfig_Common.wan;
            } else {
                this.labelDiamondNumber.text = token.toString();
            }
            if (this.labelDiamondNumber.width < 80) {
                this.labelDiamondNumber.width = 80;
            }

            let rank = Game.PlayerInfoSystem.BaseInfo.ladderRank;
            this.labelMyRank.text = "第" + rank + "名";

            let vipInfo = Game.PlayerVIPSystem.vipInfo;
            this.currentNumber = vipInfo.buyPvpPower + CommonConfig.ladder_challenge_time - vipInfo.pvpPower;//CommonConfig.ladder_challenge_time * 
            this.labelSurplusNumber.text = this.currentNumber.toString() + "/" + CommonConfig.ladder_challenge_time.toString();

            this.loadRivalList();

            this.updateButon();

            this.loadAwardInfo();

            this.loadFormationList();

            this.loadDefList();
        }

        private loadRivalList() {
            let start = 0;
            let count = CommonConfig.rank_list_max - 1;
            let thisOne = this;
            this.array.removeAll();
            Game.PlayerArenaSystem.rankItemInfo(message.ERankType.RANK_TYPE_LADDER, start, count).then((body: message.RankItemsZip) => {
                for (let i = 0; i < 10; i++) {
                    let v = body.rankItemsInfo[i] as message.RankBaseItemInfo;
                    let v1 = body.praiseInfo as Array<message.IIKVPairs>;
                    let data = new ArenaRivalItemData();
                    data.info = v;
                    data.info1 = v1;
                    data.index = i + 1;
                    data.father = this;
                    data.rivalCount = this.currentNumber;
                    this.array.addItem(data);
                }

                for (let i = 0; i < this.ladders.length; i++) {
                    if (i == 2 && this.ladders.length != 3) {
                        continue;
                    }
                    let v = this.ladders[i];
                    let data = new ArenaRivalItemData();
                    data.info = v;
                    data.index = i + 1 + 10;
                    data.father = this;
                    data.rivalCount = this.currentNumber;
                    thisOne.array.addItem(data);
                }
                thisOne.listRival.dataProvider = this.array;
                thisOne.listRival.itemRenderer = ArenaRivalItem;
            });
        }

        private rivalItems: Array<ArenaRivalItem> = [];

        private getitemList() {
            this.rivalItems = [];
            for (let i = 0; i < this.listRival.numChildren; i++) {
                let item = this.listRival.getChildAt(i) as ArenaRivalItem;
                this.rivalItems.push(item);
            }
        }

        private updateButon() {
            let setBuyConsumeInfo = (open: boolean) => {
                this.imgConSume.visible = open;
                this.labelConsume.visible = open;
                if (open) {
                    let vipInfo = Game.PlayerVIPSystem.vipInfo;
                    let consume = CommonConfig.ladder_challenge_token(vipInfo.buyPvpPower);
                    this.labelConsume.text = consume.toString();
                }
            };

            if (this.currentNumber <= 0) {
                if (this.buttonState != ArenaMainButtonState.ButtonBuy) {
                    this.buttonState = ArenaMainButtonState.ButtonBuy;
                    setBuyConsumeInfo(true);
                }
            } else {
                if (this.buttonState != ArenaMainButtonState.ButtonFresh) {
                    this.buttonState = ArenaMainButtonState.ButtonFresh;
                    setBuyConsumeInfo(false);
                }
            }

            this.btnBuy.visible = (this.buttonState == ArenaMainButtonState.ButtonBuy);
            this.btnChange.visible = (this.buttonState == ArenaMainButtonState.ButtonFresh);
        }

        private loadAwardInfo() {
            let currentRank = Game.PlayerInfoSystem.BaseInfo.ladderRank;
            let [info,] = Helper.GetArenaScoreInfo(currentRank);
            if (info == null) {
                for (let i = 1; i <= 4; i++) {
                    (this[`imgFrame${i}`] as eui.Image).visible = false;
                    (this[`imgIcon${i}`] as eui.Image).visible = false;
                    (this[`label${i}`] as eui.Label).visible = false;
                }
                return;
            }
            let paths = [];
            for (let i = 0; i < info.reward_goods.length; i++) {
                let v = info.reward_goods[i];
                let itemInfo = PlayerItemSystem.Table(v) as any;
                let icon = itemInfo.path;
                let frame = PlayerItemSystem.Set(v, null, info.reward_count[i]);
                (this[`imgFrame${i + 1}`] as eui.Image).source = cachekey(frame.Frame, this);
                (this[`imgIcon${i + 1}`] as eui.Image).source = cachekey(icon, this);
                paths.push(frame.Frame);
                paths.push(icon);
                (this[`label${i + 1}`] as eui.Label).text = "x" + Set.NumberUnit3(info.reward_count[i]);
            }
            if (info.reward_goods.length < 4) {
                for (let i = 1; i <= 4; i++) {
                    if (i > info.reward_goods.length) {
                        (this[`imgFrame${i}`] as eui.Image).visible = false;
                        (this[`imgIcon${i}`] as eui.Image).visible = false;
                        (this[`label${i}`] as eui.Label).visible = false;
                    }
                }
            }
        }

        private loadFormationList() {
            // let formations = Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_LADDER_DEFENCE - 1];
            // for (let i = 0; i < formations.generals.length; i++) {
            //     let v = formations.generals[i];

            // }
        }

        private loadDefList() {
            Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_LADDER_DEFENCE;
            let a = Game.PlayerFormationSystem.curFormations;
            let formation = new message.FormationInfo();
            for (let i = 0; i < a.length; i++) {
                if (a[i] != null) {
                    if (a[i].formationType == Game.PlayerInstanceSystem.curInstanceType) {
                        let b = new message.FormationInfo();
                        b.generals = a[i].generals;
                        b.supports = a[i].supports;
                        if (b instanceof message.FormationInfo) {
                            formation = a[i];
                        }
                    }
                }
            }
            if (formation.generals.length == 0) {
                for (let i = 0; i < 4; i++) {
                    formation.generals[i] = 0;
                }
            }
            if (formation.supports.length == 0) {
                for (let i = 0; i < 4; i++) {
                    formation.supports[i] = 0;
                }
            }

            this.loadDeftGenerals(formation.generals);
            this.loadDefSupports(formation.supports);
        }

        private loadDeftGenerals(generals: number[]) {
            let dataProvider = new eui.ArrayCollection();
            for (let i = generals.length; i > 0; i--) {
                let v = this.ladders[i - 1];
                let data = new ArenaMainDefendItemData();
                data.generalId = generals[i - 1];
                data.isMain = true;
                if (generals[i - 1] != 0 && Game.PlayerHunterSystem.allHuntersMap()[generals[i - 1]] != null) {
                    data.isEmpty = true;
                } else {
                    data.isEmpty = false;
                }
                dataProvider.addItem(data);
            }
            this.listGeneral.dataProvider = dataProvider;
            this.listGeneral.itemRenderer = ArenaMainDefendItem;
        }

        private loadDefSupports(supports: number[]) {
            let dataProvider = new eui.ArrayCollection();
            for (let i = supports.length; i > 0; i--) {
                let v = this.ladders[i - 1];
                let data = new ArenaMainDefendItemData();
                data.generalId = supports[i - 1];
                data.isMain = false;
                if (supports[i - 1] != 0 && Game.PlayerHunterSystem.allHuntersMap()[supports[i - 1]] != null) {
                    data.isEmpty = true;
                } else {
                    data.isEmpty = false;
                }
                dataProvider.addItem(data);
            }
            this.listSupport.dataProvider = dataProvider;
            this.listSupport.itemRenderer = ArenaMainDefendItem;
        }

        private onBtnRule() {
            loadUI(Common_RuleDialog)
                .then((dialog: Common_RuleDialog) => {
                    dialog.init(RuleConfig.arena);
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnDiamond() {
            loadUI(PayMallScene)
                .then((scene: PayMallScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    scene.init(false);
                });
        }

        private onBtnShop() {
            loadUI(ShopMallDialog)
                .then((dialog: ShopMallDialog) => {
                    dialog.load(2);
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnRank() {
            loadUI(ArenaLadderRank)
                .then((dialog: ArenaLadderRank) => {
                    dialog.setInfo(message.ERankType.RANK_TYPE_LADDER, () => {

                    });
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnReport() {
            loadUI(MailMainReport)
                .then((dialog: MailMainReport) => {
                    dialog.loadFrom(this, TableEnum.Enum.Mail.ARENA);
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnAward() {
            loadUI(ArenaLadderAward)
                .then((dialog: ArenaLadderAward) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        public onBtnChange() {
            Game.PlayerArenaSystem.ladderList(false).then((data: Array<message.SimpleRoleFormationInfo>) => {
                this.ladders = data;
                for (let i = 0; i < this.ladders.length; i++) {
                    if (i == 2) {
                        continue;
                    }
                    let v = this.ladders[i];
                    let data1 = new ArenaRivalItemData();
                    data1.info = v;
                    data1.index = i + 1 + 10;
                    data1.father = this;
                    data1.rivalCount = this.currentNumber;
                    let index = i
                    if (i == 3) {
                        index -= 1;
                    }
                    this.array.replaceItemAt(data1, index + 10);
                }
                ArenaMainScene.roleFormationInfo = data;
                // this.refresh();
            });
        }

        private onBtnBuy() {
            let licenceLevel = Game.PlayerInfoSystem.BaseInfo.licenceLevel;
            let licenceInfo = TableLicence.Item(licenceLevel);
            let vipInfo = Game.PlayerVIPSystem.vipInfo;
            if (vipInfo.buyPvpPower >= licenceInfo.ladder) {
                if (Device.isReviewSwitch) {
                    toast_warning(TextsConfig.TextsConfig_Arena.ladderChallengeNumEmpty);
                } else {
                    if (Device.isVipOpen) {
                        let cb = () => {
                            this.challengeTblNum = PlayerVIPSystem.Level().ladder;
                        }
                        TipManager.ShowTipsAndGoVip(TextsConfig.TextsConfig_Arena.ladderChallengeNumEmptyToVip, this, TableEnum.Enum.Vip.CHARGE, cb)
                    } else {
                        toast_warning(TextsConfig.TextsConfig_Arena.ladderChallengeNumEmpty)
                    }
                }
            } else {
                let token = CommonConfig.ladder_challenge_token(vipInfo.buyPvpPower);
                let time = CommonConfig.ladder_challenge_time;
                let msg = Helper.StringFormat(TextsConfig.TextsConfig_Arena.buyNumTip, token, "1", licenceInfo.ladder - vipInfo.buyPvpPower, licenceInfo.ladder);

                TipManager.ShowConfirmCancel(msg, () => {
                    Game.PlayerArenaSystem.ladderChallengeAdd()
                        .then(() => {
                            toast_success(TextsConfig.TextsConfig_Arena.buyChallengeNumSuccessTip);
                            // this.refresh();
                            let vipInfo = Game.PlayerVIPSystem.vipInfo;
                            this.currentNumber = vipInfo.buyPvpPower + CommonConfig.ladder_challenge_time - vipInfo.pvpPower;
                            this.labelSurplusNumber.text = this.currentNumber.toString() + "/" + CommonConfig.ladder_challenge_time.toString();
                            this.updateButon();
                        }).catch((reason) => {
                            if (reason == "钻石不足") {
                                TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Money.demstone, () => {
                                    this.onBtnDiamond();
                                });
                            } else {
                                toast_warning(reason);
                            }
                        });
                });
            }

            //
        }

        /**点击调整阵容 */
        private onBtnFormat() {
            Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_LADDER_DEFENCE;
            loadUI(CommonFormationPvpArena)
                .then((dialog: CommonFormationPvpArena) => {
                    dialog.setInfo(() => {
                        this.loadDefList();
                    });
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnClose() {
            if (this.callback) this.callback();
            this.close(UI.HIDE_TO_TOP);
        }

        public onBtnFight(data: ArenaRivalItemData, info) { //////////////信息
            if (this.buttonState == ArenaMainButtonState.ButtonBuy) {
                toast_warning(TextsConfig.TextsConfig_Arena.ladderChallengeNumEmptyError);
            } else {
                // let progressInfo = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_LADDER];
                // if (progressInfo != null && progressInfo.leftTime > 0) {
                //     let token = CommonConfig.ladder_cooling_token(progressInfo.leftTime);
                //     let tip = Helper.StringFormat(TextsConfig.TextsConfig_Arena.clearCoolingTip, token);
                //     TipManager.ShowConfirmCancel(tip, () => {
                //         Game.PlayerArenaSystem.ladderCollingClear().then(() => {
                //             toast_warning(TextsConfig.TextsConfig_Arena.clearCoolingSuccessTip);
                //         }).catch(() => {

                //         })
                //     });
                // } else {
                //toast_success("上阵 比试");
                Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_LADDER_ATTACK;
                loadUI(CommonFormatePveMain)
                    .then((dialog: CommonFormatePveMain) => {
                        Game.EventManager.event(GameEvent.FIGHT_FIELD_ITEM, { info: info, a: this.ladders });
                        dialog.show(UI.SHOW_FROM_TOP);
                        let index = 0;
                        if (data.index == 11) {
                            index = 1;
                        } else if (data.index == 12) {
                            index = 2;
                        } else if (data.index == 14 || data.index == 13) {
                            index = 4;
                        }
                        dialog.setInfo(index - 1);
                    });
                // }
            }
        }

        public onBtnFive(data: ArenaRivalItemData) {
            if (this.buttonState == ArenaMainButtonState.ButtonBuy) {
                toast_warning(TextsConfig.TextsConfig_Arena.ladderChallengeNumEmptyError);
            } else {
                Game.PlayerArenaSystem.ladderQuickReward(data.info.baseInfo.id).then((goods: Array<message.GoodsInfo>) => {
                    loadUI(CommonGetDialog).then((dialog: CommonGetDialog) => {
                        dialog.init(goods);
                        dialog.show();
                    });

                    this.refresh();
                });
            }
        }
    }
}
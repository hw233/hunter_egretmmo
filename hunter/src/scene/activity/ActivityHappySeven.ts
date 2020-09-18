namespace zj {
    /**
     * @class 开服七天乐
     * 
     * @author LianLei
     * 
     * @date 2019-12-04
     */
    export class ActivityHappySeven extends Scene {
        private btnClose: eui.Button;
        private day1: zj.ActivityHappySevenBtn;
        private day2: zj.ActivityHappySevenBtn;
        private day3: zj.ActivityHappySevenBtn;
        private day4: zj.ActivityHappySevenBtn;
        private day5: zj.ActivityHappySevenBtn;
        private day6: zj.ActivityHappySevenBtn;
        private day7: zj.ActivityHappySevenBtn;
        private groupAward: eui.Group;
        private labelDay: eui.BitmapLabel;
        private listAward: eui.List;
        private btnGet: eui.Button;
        private imgGet: eui.Image;
        private groupTR: eui.Group;
        private groupbtnAddGold: eui.Group;
        private lbGold: eui.Label;
        private btnAddGold: eui.Button;
        private imgFlagGold: eui.Image;
        private groupbtnAddGemstone: eui.Group;
        private lbGemstone: eui.Label;
        private jewel: eui.Image;
        private btnAddGemstone: eui.Button;
        private imgFlagGemstone: eui.Image;
        private groupbtnAddStrength: eui.Group;
        private lbStrength: eui.Label;
        private energy: eui.Image;
        private btnAddStrength: eui.Button;
        private imgFlagStrength: eui.Image;

        private listAwardData: eui.ArrayCollection = new eui.ArrayCollection();
        private day: number = 0;
        private timer: number = 0;
        private sevenDay: number = 1; // 相对凌晨四点现在是创建号的第几天

        public constructor() {
            super();
            this.skinName = "resource/skins/activity/ActivityHappySevenSkin.exml";
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
            Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
            Game.EventManager.on(GameEvent.PLAYER_COIN_CHANGE, this.update, this);
            Game.EventManager.on(GameEvent.PLAYER_POWER_CHANGE, this.update, this);
            Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.update, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
            }, null);

            this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
            this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
            this.btnAddStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddStrength, this);
            Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.init, this);
            for (let i = 1; i <= 7; i++) (<ActivityHappySevenBtn>this[`day${i}`]).addEventListener(egret.TouchEvent.TOUCH_TAP, this[`onBtnDay${i}`], this);

            this.timer = egret.setInterval(this.updateDay, this, 1000);
            this.init();
        }

        private init() {
            this.updateDay();
            this.setInfo();
            this.setAward(null);
            this.update();
        }

        private updateDay() {
            let day = Helper.getDayIdx(Game.PlayerInfoSystem.BaseInfo.createTime * 1000, Game.Controller.curServerTime * 1000);
            if (day != 0 && day <= 7 && day != this.sevenDay) {
                this.sevenDay = Math.min(7, day);
                this.setInfo();
                this.setAward(null);
                this.update();
            }
            this.sevenDay = Math.min(7, day);
        }

        private update() {
            if (Game.PlayerInfoSystem.Coin > 100000) {
                if (((Game.PlayerInfoSystem.Coin / 1000) >>> 0) % 10 == 0) {
                    this.lbGold.text = ((Game.PlayerInfoSystem.Coin / 10000) >>> 0) + "万";
                } else {
                    this.lbGold.text = (Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
                }
            } else {
                this.lbGold.text = Game.PlayerInfoSystem.Coin.toString();
            }
            if (Game.PlayerInfoSystem.Token > 100000) {
                if (((Game.PlayerInfoSystem.Token / 1000) >>> 0) % 10 == 0) {
                    this.lbGemstone.text = ((Game.PlayerInfoSystem.Token / 10000) >>> 0) + "万";
                } else {
                    this.lbGemstone.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
                }
            } else {
                this.lbGemstone.text = Game.PlayerInfoSystem.Token.toString();
            }
            let str = "";
            if (Game.PlayerInfoSystem.Power > 100000) {
                if (((Game.PlayerInfoSystem.Power / 1000) >>> 0) % 10 == 0) {
                    str += ((Game.PlayerInfoSystem.Power / 10000) >>> 0) + "万";
                } else {
                    str += (Game.PlayerInfoSystem.Power / 10000).toFixed(1) + "万";
                }
            } else {
                str += Game.PlayerInfoSystem.Power.toString();
            }
            let str_energy = Helper.StringFormat("%d/%d", str, (TableLevel.Item(Game.PlayerInfoSystem.Level).role_power + PlayerVIPSystem.LowLevel().power_add));
            this.lbStrength.text = str_energy;
        }

        private setInfo() {
            let awardInfo: { [key: string]: TableContinueLogin } = TableContinueLogin.Table();
            for (const key in awardInfo) {
                if (awardInfo.hasOwnProperty(key)) {
                    const element = awardInfo[key];
                    if (this[`day${element.dayIndex}`]) {
                        let bReward = element.dayIndex <= this.sevenDay && Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.indexOf(element.dayIndex) != -1; // 是否已经领取
                        let isHaveGot = element.dayIndex <= this.sevenDay && Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.indexOf(element.dayIndex) == -1; // 是否可领取
                        (<ActivityHappySevenBtn>this[`day${element.dayIndex}`]).setInfo(element, bReward, false, isHaveGot);
                    }
                }
            }
        }

        private setAward(time: number) {
            let day = (time == null ? this.sevenDay : time);
            this.day = day;
            // let bReward = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward, (k, v) => {
            //     return k == (this.day - 1) && v == 1;
            // });
            let bReward = this.day <= day && Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.indexOf(this.day) != -1; // 是否已经领取

            this.btnGet.enabled = (this.day <= this.sevenDay && !bReward);
            this.btnGet.visible = !bReward;
            this.imgGet.visible = (this.imgGet.visible = (this.day <= this.sevenDay && bReward));

            let awardInfo: TableContinueLogin = TableContinueLogin.Item(this.day);
            if (!awardInfo) return;
            this.labelDay.text = day == 0 ? 1 + "" : this.day.toString();

            this.listAwardData.removeAll();
            for (let i = 0; i < awardInfo.reward_goods.length; i++) this.listAwardData.addItem({ goodsId: awardInfo.reward_goods[i], count: awardInfo.reward_count[i], showType: awardInfo.show_type[i], isAwardList: true });
            this.listAward.dataProvider = this.listAwardData;
            this.listAward.itemRenderer = ActivityHappySevenAwardItem;
        }

        private onBtnGet() {
            let allGeneralHistory = Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds();

            let tbl: { [key: string]: TableContinueLogin } = TableContinueLogin.Table();
            // let day: number = Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length == 0 ? 1 : Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length;
            Game.PlayerMixUnitInfoSystem.loginReward(this.day).then((gameInfo: message.GameInfo) => {
                if (gameInfo.getGoods.length > 0) {
                    let hasGeneral: boolean = false;
                    let goods: message.GoodsInfo = null;
                    for (const v of gameInfo.getGoods) {
                        if (Math.floor(v.goodsId / 10000) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                            hasGeneral = true;
                            goods = v;
                            break;
                        }
                    }

                    if (hasGeneral && goods != null) {
                        loadUI(CommonGetGeneral).then((dialog: CommonGetGeneral) => {
                            dialog.setInfo(goods.goodsId, 0, () => {
                                loadUI(CommonGetDialog).then((dialog: CommonGetDialog) => {
                                    dialog.show();
                                    dialog.init(gameInfo.getGoods);
                                    dialog.setCB(() => { this.init() });
                                });
                            });
                            dialog.show(UI.SHOW_FILL_OUT);

                            let general = Table.FindK(allGeneralHistory, PlayerHunterSystem.Table(goods.goodsId).general_id);
                            if (general == -1) {
                                // setTimeout(() => {
                                //     // 图鉴解锁成功
                                //     let ui = <TavernGetGeneralPop>newUI(TavernGetGeneralPop);
                                //     ui.setInof(goods);
                                //     this.addChild(ui);
                                //     egret.Tween.get(ui.group1)
                                //         .to({ alpha: 1 }, 100)
                                //         .to({ y: 10 }, 150, egret.Ease.sineInOut)
                                //         .wait(300, false)
                                //         .to({ y: -10 }, 150, egret.Ease.sineInOut)
                                //         .wait(300, false)
                                //         .call(() => { ui.close(); });
                                // }, 300);
                            }
                        });
                    } else {
                        loadUI(CommonGetDialog).then((dialog: CommonGetDialog) => {
                            dialog.show();
                            dialog.init(gameInfo.getGoods);
                            dialog.setCB(() => { this.init() });
                        });
                    }
                }
            });
        }

        private onBtnDay1() {
            this.setAward(1);
        }

        private onBtnDay2() {
            this.setAward(2);
        }

        private onBtnDay3() {
            this.setAward(3);
        }

        private onBtnDay4() {
            this.setAward(4);
        }

        private onBtnDay5() {
            this.setAward(5);
        }

        private onBtnDay6() {
            this.setAward(6);
        }

        private onBtnDay7() {
            this.setAward(7);
        }

        private onBtnClose() {
            egret.clearInterval(this.timer);
            this.timer = -1;
            this.close(UI.HIDE_TO_TOP);
        }

        //添加金币
        private onBtnAddGold() {
            loadUI(HelpGoldDialog).then((dialog: HelpGoldDialog) => {
                dialog.SetInfoList(true);
                dialog.show(UI.SHOW_FROM_TOP);
            });
        }

        private onBtnAddGemstone() {
            // toast_success("加钻石功能未开启");
            loadUI(PayMallScene).then((scene: PayMallScene) => {
                scene.show(UI.SHOW_FROM_TOP);
                scene.init(true);
            });
        }

        private onBtnAddStrength() {
            //增加体力
            loadUI(HXH_HunterUserStrength).then((dialog: HXH_HunterUserStrength) => {
                dialog.SetInfo();
                dialog.show(UI.SHOW_FROM_TOP);
            });
        }

        private removeShow() {
            let show = this.getChildByName("details");
            if (show) this.removeChild(show);
        }

        private showGoodsProperty(ev: egret.Event) {
            let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        }
    }
}
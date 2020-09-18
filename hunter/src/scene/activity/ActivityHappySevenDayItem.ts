namespace zj {
// 
// lizhengiang
// 20190413
export class ActivityHappySevenDayItem extends eui.ItemRenderer {
    private imgSelect: eui.Image;
    private imgSelects: eui.Image;
    private btnGet: eui.Button;
    private imgDay: eui.Image;
    private imgGet: eui.Image;
    private lstViewAward: eui.List;

    private day: number = null;
    private info = null;
    private father = null;

    public constructor() {
        super();
        this.skinName = "resource/skins/activity/ActivityHappySevenDayItemSkin.exml";
        cachekeys(<string[]>UIResource["ActivityHappySevenDayItem"], null);
        this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
    }

    protected dataChanged() {
        this.day = this.data.day;
        this.info = this.data.info;
        this.father = this.data.father;

        this.setInfoItem();
        this.setInfoDay();
        this.setInfoGet();
    }

    private setInfoItem() {
        let arrCollection = new eui.ArrayCollection();
        for (let i = 0; i < this.info["reward_goods"].length; i++) {
            let goods = new message.GoodsInfo;
            goods.goodsId = this.info["reward_goods"][i];
            goods.count = this.info["reward_count"][i];
            goods.index = 0;
            goods.showType = this.info["show_type"][i];
            arrCollection.addItem({ info: goods });
        }
        this.lstViewAward.dataProvider = arrCollection;
        this.lstViewAward.itemRenderer = ActivityAwardItem;
    }

    private setInfoDay() {
        this.imgDay.source = cachekey(UIConfig.UIConfig_Activity.day[this.day], this);
    }

    private setInfoGet() {
        let bReward = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward, (k, v) => {
            return k == (this.day - 1) && v == 1;
        });

        this.btnGet.visible = !bReward;
        this.btnGet.enabled = (this.day <= Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length && !bReward);
        this.imgGet.visible = (this.day <= Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length && bReward);

        if (bReward) {
            this.imgSelect.visible = false;
            this.imgSelects.visible = true;
        } else {
            this.imgSelect.visible = true;
            this.imgSelects.visible = false;
        }
    }

    private onBtnGet() {
        let allGeneralHistory = Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds();

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
                            loadUI(CommonGetDialog)
                                .then((dialog: CommonGetDialog) => {
                                    dialog.show();
                                    dialog.init(gameInfo.getGoods);
                                    dialog.setCB(() => {
                                        this.setInfoGet();
                                        this.father.setInfoReward();
                                        this.btnGet.visible = false;
                                    });
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
                    loadUI(CommonGetDialog)
                        .then((dialog: CommonGetDialog) => {
                            dialog.show();
                            dialog.init(gameInfo.getGoods);
                            dialog.setCB(() => {
                                this.setInfoGet();
                                this.father.setInfoReward();
                                this.btnGet.visible = false;
                            });
                        });
                }
            }

            this.father.setInfoTipReward();
        });
    }

}
}
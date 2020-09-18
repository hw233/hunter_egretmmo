namespace zj {
// 礼包 Activity_TimeGiftFirstPopC
// hexiaowei
// 2018-12-06
export class GiftFirstPopC extends Dialog {
    private imageInfolcon: eui.Image; //礼包活动背景
    private labelCanBuy: eui.Label;//礼包购买次数提示
    private labelEndTime: eui.Label;//礼包说明
    private buttonGet_2: eui.Button;//购买
    private imageIcon: eui.Image;//购买礼包需要那种货币
    private labelValue_2: eui.Label;//购买礼包需要花费货币数量
    private labelTipname: eui.Label;//礼包名称
    private imageLimit: eui.Image;//限时限购提示
    private imageEight: eui.Image//打折提示
    private labelCloseTheTip: eui.Label//任意区域关闭
    private listItem: eui.List;//物品
    private groupAll: eui.Group;
    private groupMain: eui.Group;

    private info; //礼包 
    private tavernShow: boolean; //判断是否是从酒馆进入
    private father; // 父级属性
    private TOKEN = 20002;
    private buy: boolean;
    private change: boolean;

    public constructor() {
        super();
        this.skinName = "resource/skins/gift/GiftFirstPopCSkin.exml";
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;
        this.groupAll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.buttonGet_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGet_2, this);

        Game.EventManager.on(GameEvent.SERVER_NOTICE_ROLE_INFO, this.refreshInfo, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);

        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            egret.Tween.removeTweens(this.labelCloseTheTip); // 因为是循环播放，需要特别处理
            Game.EventManager.off(GameEvent.SERVER_NOTICE_ROLE_INFO, this.refreshInfo, this);
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        }, null);
    }

    // 初始化礼包
    public setInfo(info, father?, tavernShow: boolean = false) {
        this.imageEight.visible = false;
        this.info = info;
        this.father = father;
        this.change = false;
        this.buy = false;
        this.tavernShow = tavernShow;

        if (this.father != null && !this.tavernShow) {
            this.father.openDown();
        }

        this.req();
        this.setInfoItem();
        this.setInfoUpdate();
        this.setInfoList();

        //点击任意区域关闭
        egret.Tween.get(this.labelCloseTheTip, { loop: true })
            .to({ alpha: 1 }, 1000)
            .to({ alpha: 0 }, 1000)
    }

    // 更新礼包的可购买次数
    public setInfoUpdate() {
        let gift_info = PlayerGiftSystem.Instance_item(this.info.gift_index);

        this.buttonGet_2.enabled = (this.info["buy_times"] < gift_info.buy_times);

        // 限购一次
        if (gift_info.buy_times == 1) {
            this.imageLimit.source = cachekey(UIConfig.UIConfig_Gift.buy_type3[1], this);
        } else if (gift_info.buy_times > 100) { // 不限购
            this.imageLimit.visible = false;
        } else {
            this.imageLimit.source = cachekey(UIConfig.UIConfig_Gift.buy_type3[2], this);
        }

        let str = "";
        // gift_info.gift_form => 1.限时限次2.每日限购3.无需购买-触发每日领取4.每周限购5.购买后每日领取6.买后按等级领取
        if (gift_info.gift_form == 1) {
            let get_str = null;
            //限时限购 时间永久
            let cur_str = "";
            if (gift_info.buy_times > this.info.buy_times) {
                cur_str = Helper.StringFormat(TextsConfig.TextsConfig_Activity.greenstr_light, gift_info.buy_times - this.info.buy_times) + "<color>r=60,g=255,b=0</color><text>/" + gift_info.buy_times + "</text>";
            }
            else {
                cur_str = Helper.StringFormat(TextsConfig.TextsConfig_Activity.redstr_light, gift_info.buy_times - this.info.buy_times) + "<color>r=60,g=255,b=0</color><text>/" + gift_info.buy_times + "</text>";
                this.buttonGet_2.enabled = false;
            }
            str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.popc[1], cur_str);
        }

        else if (gift_info.gift_form == 2) {
            if (gift_info.buy_times < 100) {
                let cur_str = ""
                if (gift_info.buy_times > this.info.buy_times) {
                    cur_str = Helper.StringFormat(TextsConfig.TextsConfig_Activity.greenstr_light, gift_info.buy_times - this.info.buy_times) + "<color>r=60,g=255,b=0</color><text>/" + gift_info.buy_times + "</text>";
                }
                else {
                    cur_str = Helper.StringFormat(TextsConfig.TextsConfig_Activity.redstr_light, gift_info.buy_times - this.info.buy_times) + "<color>r=60,g=255,b=0</color><text>/" + gift_info.buy_times + "</text>";
                }
                str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.popc[2], cur_str);
            }
            else {
                str = TextsConfig.TextsConfig_Gift.gift.popc[5];
            }
        }

        else if (gift_info.gift_form == 4) {
            if (gift_info.buy_times < 100) {
                let cur_str = ""
                if (gift_info.buy_times > this.info.buy_times) {
                    cur_str = Helper.StringFormat(TextsConfig.TextsConfig_Activity.greenstr_light, gift_info.buy_times - this.info.buy_times) + "<color>r=60,g=255,b=0</color><text>/" + gift_info.buy_times + "</text>";
                }
                else {
                    cur_str = Helper.StringFormat(TextsConfig.TextsConfig_Activity.redstr_light, gift_info.buy_times - this.info.buy_times) + "<color>r=60,g=255,b=0</color><text>/" + gift_info.buy_times + "</text>";
                }
                str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.popc[4], cur_str)
            }
            else {
                str = TextsConfig.TextsConfig_Gift.gift.popc[5]
            }
        }

        this.labelCanBuy.textFlow = Util.RichText(str);
    }

    // 赋值
    public setInfoItem() {
        // tip
        let tip_index = Number((<string>this.info.gift_index) + (<string>this.info.index));
        if (Tips.tips_oneday_get(tip_index)) {
            Tips.tips_oneday_set(tip_index, true)
            this.change = true;
        }
        let gift_info = PlayerGiftSystem.Instance_item(this.info.gift_index);
        if (this.info.mark == 0) {
            this.labelTipname.text = gift_info.name;
        }
        else {
            this.labelTipname.text = gift_info.name + PlayerHunterSystem.Table(this.info.mark).general_name;
        }
        this.imageInfolcon.source = cachekey(gift_info.path, this);
        if (gift_info.pay_type == 1 && this.info.pay_tbl != null && this.info.pay_tbl != undefined) {
            let str_money = this.info.pay_tbl["amount"];
            this.labelValue_2.text = str_money;
            this.imageIcon.source = cachekey(UIConfig.UIConfig_Hunter_Pay.donate[0], this);
        }
        else {
            this.labelValue_2.text = (gift_info.price).toString();
            this.imageIcon.source = cachekey(UIConfig.UIConfig_Hunter_Pay.donate[1], this);
        }
        // 元宝付费类型 折扣
        if (gift_info.pay_type == 2 && (gift_info.price != gift_info.primer)) {
            this.imageEight.visible = true;
        }
    }

    //赋值
    public setInfoList() {
        let gift_info = PlayerGiftSystem.Instance_item(this.info.gift_index)
        let reward_list = [];
        for (const k in gift_info.goods_id) {
            if (gift_info.goods_id.hasOwnProperty(k)) {
                const v = gift_info.goods_id[k];
                let good = new message.GoodsInfo();
                good.goodsId = v;
                if (v == this.TOKEN) {
                    good.count = gift_info.goods_count[k] + gift_info.raw_token;
                }
                else {
                    good.count = gift_info.goods_count[k];
                }
                reward_list.push(good);
            }
        }
        let good = new message.GoodsInfo();
        good.goodsId = 20002;
        good.count = gift_info.raw_token;

        let find_token = Table.FindF(reward_list, function (_k, _v) {
            return _v.goodsId == 20002;
        });

        if (!find_token && good.count != 0) {
            reward_list.splice(0, 0, good);
        }

        let arrayCollection = new eui.ArrayCollection();
        for (const v of reward_list) {
            arrayCollection.addItem(v);
        }

        this.listItem.dataProvider = arrayCollection;
        this.listItem.itemRenderer = GiftCommonAwardItem;
    }

    private req() {
        Game.PlayerGiftSystem.getNewGift().then((gameInfo: message.GameInfo) => {
            if (gameInfo.giftInfos.length > 0) {
                let pay_tbl = this.info["pay_tbl"];
                let currentInfo = Table.FindR(gameInfo.giftInfos, (k, v) => {
                    return v.index == this.info["index"];
                });
                if (currentInfo[1] != null) {
                    this.info = currentInfo[0];
                }
                this.info["pay_tbl"] = pay_tbl;
                this.setInfoUpdate();
            }
        });
    };

    //购买礼包
    private onButtonGet_2() {
        let giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
        if (giftInfo.pay_type == 1) {
            Game.PlayerGiftSystem.getNewGift().then(() => {
                Game.PlayerGiftSystem.newGiftExist(this.info["index"]).then(() => {
                    this.reqButtonBuy();
                });
            });
        } else {
            this.reqButtonBuy();
        }

    }

    //购买礼包方式（目前就一种测试的）
    private reqButtonBuy() {
        this.buttonGet_2.enabled = false;
        let gift_info = PlayerGiftSystem.Instance_item(this.info.gift_index);
        if (gift_info.pay_type == 1) {
            if (Util.getAppVersionInfo().channel == "test") {
                Game.PlayerPaySystem.simulateCharge(this.info["index"]).then((gameInfo: message.GameInfo) => {
                    this.simulateCharge(gameInfo, 0);
                }).catch((err) => {
                    this.simulateCharge(null, err);
                });
            } else {
                let strIndex = this.info["index"];
                if (this.info["pay_tbl"]) {
                    platform.pay(PlayerPaySystem.GetProductId(gift_info.pay_index), 1, PlayerPaySystem.GetCpExtJson(strIndex));
                }
            }
        } else {
            Game.PlayerGiftSystem.rewardNewGift(this.info["index"]).then((gameInfo: message.GameInfo) => {
                this.simulateCharge(gameInfo, 0);
            }).catch((err) => {
                this.simulateCharge(null, err);
            });
        }
    }

    private simulateCharge(gameInfo: message.GameInfo, result) {
        this.buttonGet_2.enabled = true;
        if (result == message.EC.SUCCESS) {
            if (gameInfo.giftInfos.length > 0) {
                for (let v of gameInfo.giftInfos) {
                    if (v.index == this.info["index"]) {
                        Game.PlayerGiftSystem.giftInfos = gameInfo.giftInfos;
                        let pay_tbl = this.info["pay_tbl"];
                        this.info = Table.FindR(Game.PlayerGiftSystem.giftInfos, (k, v) => {
                            return v.index == this.info["index"];
                        })[0];
                        this.info["pay_tbl"] = pay_tbl;

                        if (this.info["buy_times"] == 0) {
                            this.change = true;
                        }
                    }
                }
            }

            let bExit = Table.FindF(Game.PlayerGiftSystem.giftInfos, (k, v) => {
                return v.index == this.info["index"];
            });

            if (!bExit) {
                let giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
                this.info["buy_times"] = giftInfo.buy_times;
            }

            if (gameInfo.getGoods.length > 0) {
                loadUI(CommonGetDialog)
                    .then((dialog: CommonGetDialog) => {
                        dialog.show();
                        dialog.init(gameInfo.getGoods);
                        dialog.setCB(() => {
                            this.followUp();
                        });
                    });
            }
        } else if (result == message.EC.XG_LACK_TOKEN) {
            loadUI(ConfirmCancelDialog)
                .then((dialog: ConfirmCancelDialog) => {
                    dialog.setInfo(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Money.demstone));
                    dialog.show(UI.SHOW_FILL_OUT);
                    dialog.setCB(() => {
                        setTimeout(() => {
                            loadUI(PayMallScene)
                                .then((scene: PayMallScene) => {
                                    scene.show(UI.SHOW_FROM_TOP);
                                    scene.init();
                                });
                        }, 500)

                    });
                });
        } else {
            this.buttonGet_2.enabled = true;
            toast_warning(Game.ConfigManager.getAone2CodeReason(result));
        }
    }

    //更新页面
    private followUp() {
        let gift_info = PlayerGiftSystem.Instance_item(this.info.gift_index);

        if (this.info.buy_times == gift_info.buy_times) {
            let cb = () => {
                this.setInfoUpdate();
                if (this.father != null && this.tavernShow != true) {
                    this.father.updateItemList();
                } else if (this.tavernShow) {
                    this.father.setUI();
                }
            };
            cb();
        } else {
            this.setInfoUpdate();
            if (this.tavernShow) {
                this.father.setUI()
            }
        }
    }

    private refreshInfo(ev: egret.Event) {
        this.buy = true;
        this.buttonGet_2.enabled = true;

        let msg = (<message.RoleInfoNoticeRequest>ev.data).body;

        if (msg.gameInfo.giftInfos.length > 0) {
            for (let v of msg.gameInfo.giftInfos) {
                if (v.index == this.info["index"]) {
                    Game.PlayerGiftSystem.giftInfos = msg.gameInfo.giftInfos;
                    let pay_tbl = this.info["pay_tbl"];
                    this.info = Table.FindR(Game.PlayerGiftSystem.giftInfos, (k, v) => {
                        return v.index == this.info["index"];
                    })[0];
                    this.info["pay_tbl"] = pay_tbl;

                    if (this.info["buy_times"] == 0) {
                        this.change = true;
                    }
                }
            }
        }

        let bExit = Table.FindF(Game.PlayerGiftSystem.giftInfos, (k, v) => {
            return v.index == this.info["index"];
        });

        if (!bExit) {
            let giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            this.info["buy_times"] = giftInfo.buy_times;
        }

        if (msg.gameInfo.getGoods.length > 0) {
            loadUI(CommonGetDialog)
                .then((dialog: CommonGetDialog) => {
                    dialog.show();
                    dialog.init(msg.gameInfo.getGoods);
                    dialog.setCB(() => {
                        this.followUp();
                    });
                });
        } else {
            this.followUp();
        }
    }

    private removeShow() {
        let show = this.getChildByName("details");
        if (show) {
            this.removeChild(show);
        }
    }

    private showGoodsProperty(ev: egret.Event) {
        let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
        show.name = "details";
        this.addChild(show);
    }

    // 关闭页面
    private onButtonClose() {
        if (this.father) {
            if (this.father.setUI) this.father.setUI();
            if (this.father.updateItemList) this.father.updateItemList();
            if (this.father.closeUp) this.father.closeUp();
        }

        Game.EventManager.event(GameEvent.ON_ABOVE_POP);

        this.close(UI.HIDE_TO_TOP);
    }
}

}
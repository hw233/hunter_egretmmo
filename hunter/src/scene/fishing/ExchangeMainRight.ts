namespace zj {
/**
 * @author wang shen zhuo
 * 
 * @date 2019-05-21
 * 
 * @class 
 */
export class ExchangeMainRight extends UI {

    public imageBoard: eui.Image;
    public groupMidB: eui.Group;
    public labelExchangeTime: eui.Label;
    public buttonExchange: eui.Button;
    public group1: eui.Group;
    public group3: eui.Group;
    public group2: eui.Group;
    public num: number = 0;
    private groupNode = [];
    private CB: Function = null;

    public father: ExchangeMainSence;
    public convert;

    public constructor() {
        super();
        this.skinName = "resource/skins/fishing/ExchangeMainRightSkin.exml";
        this.buttonExchange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonExchange, this);
        this.groupNode = [
            this.group1,
            this.group2,
            this.group3,
        ]
    }

    public SetInfo(father) {
        this.buttonExchange.touchEnabled = true;
        this.father = father;
        this.SetInfoState();
        this.SetInfoUI();
    }

    public SetInfoState() {
        let valueNum = 0;
        if (this.father.getList != null) {
            let listId = this.father.getList.id;
            this.convert = Table.FindR(Game.PlayerMixUnitInfoSystem.mixunitinfo.exchangeMalls, function (k, v) {
                return listId == v.key;
            })
            if (this.convert[0] != null) {
                valueNum = this.convert[0].value;
            }
            let can_convert = this.convert == null && true || (valueNum < this.father.getList.exchange_times);
            this.buttonExchange.enabled = can_convert;
            this.labelExchangeTime.visible = (this.convert[0] != null);

            if (this.convert[0] != null) {
                if (can_convert) {
                    if (this.father.getList.is_only == 1) {
                        this.labelExchangeTime.text = TextsConfig.TextsConfig_Convert.once_buy;
                    } else if (this.father.getList.daily_refresh == 1) {
                        this.labelExchangeTime.text = Helper.StringFormat(TextsConfig.TextsConfig_Convert.t_day_times, this.father.getList.exchange_times - valueNum);
                    } else if (this.father.getList.week_refresh == 1) {
                        this.labelExchangeTime.text = Helper.StringFormat(TextsConfig.TextsConfig_Convert.t_week_times, this.father.getList.exchange_times - valueNum);
                    }
                } else {
                    if (this.father.getList.is_only == 1) {
                        this.labelExchangeTime.text = TextsConfig.TextsConfig_Convert.once_buy;
                    } else if (this.father.getList.daily_refresh == 1) {
                        this.labelExchangeTime.text = TextsConfig.TextsConfig_Convert.day_times_sold_out;
                    } else if (this.father.getList.week_refresh == 1) {
                        this.labelExchangeTime.text = TextsConfig.TextsConfig_Convert.week_times_sold_out;
                    }
                }
            }
        } else {
            this.buttonExchange.enabled = false;
            this.labelExchangeTime.visible = false;
        }
    }

    public SetInfoUI() {
        let num = 3;
        let isVisible = true;
        if (this.father.getList != null) {
            if (this.father.getList.exchange_goods >= 5) {
                num = 5;
            } else if (this.father.getList.exchange_goods < 3) {
                num = 3;
            } else {
                num = this.father.getList.exchange_goods.length;
            }
        } else {
            isVisible = false;
        }
        this.num = num;
        this.imageBoard.source = cachekey(UIConfig.UIConfig_Random.board[num], this);

        if (isVisible) {

            for (const k in this.groupNode) {
                const v = this.groupNode[k];
                // v.visible = (Number(k) + 2 == num);
            }

            this.group1.removeChildren();
            this.group2.removeChildren();
            this.group3.removeChildren();

            for (let i = 0; i < num; i++) {
                let exchangeNeedItem = new ExchangeNeedItem();
                this["group" + (i + 1)].addChild(exchangeNeedItem);
                exchangeNeedItem.x = -50;
                exchangeNeedItem.y = -10;
                exchangeNeedItem.SetFather(this);
                exchangeNeedItem.SetInfo(i, false, i + 1);
            }

            this.groupMidB.removeChildren();

            let exchangeNeedItem = new ExchangeNeedItem();
            this.groupMidB.addChild(exchangeNeedItem);
            exchangeNeedItem.x = -50;
            exchangeNeedItem.y = -10;
            exchangeNeedItem.SetFather(this);
            exchangeNeedItem.SetInfo(null, true, 10);
        }
    }

    private onButtonExchange() {
        if (PlayerConvertSystem.CanConvert(this.father.getList.id)) {
            this.buttonExchange.touchEnabled = false;
            this.father.imageBack.visible = true;
            this.father.ReqExchangeMall();
        } else {
            this.buttonExchange.touchEnabled = true;
            this.father.imageBack.visible = false;
            toast_warning(TextsConfig.TextsConfig_Convert.not_enough);
        }
    }

    public SetInfoAni(cb?: Function) {
        let cssName = TableClientAniCssSource.Item(3005);
        let names = cssName.name;
        let str = "00" + ((this.num - 3) * 2) + "_duihua0" + (this.num - 3);
        Game.DragonBonesManager.playAnimation(this, names, "armatureName", str, 1)
            .then((display: dragonBones.EgretArmatureDisplay) => {
                display.x = 40;
                display.y = 40;
                this.groupMidB.addChild(display);
            });
        Game.DragonBonesManager.playAnimation(this, names, "armatureName", "001_duihua_di_00", 1)
            .then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                    if (cb != null) {
                        cb();
                    }
                    this.buttonExchange.touchEnabled = true;
                }, this)
                armatureDisplay.x = 40;
                armatureDisplay.y = 40;
                this.groupMidB.addChild(armatureDisplay);
            });

    }
}
}
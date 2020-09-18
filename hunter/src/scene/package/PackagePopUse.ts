namespace zj {
// 背包-物品使用-常规
// lizhengqiang
// 2018/11/13

export class PackagePopUse extends Dialog {
    public groupUse: eui.Group;
    private btnClose: eui.Button;

    private groupItem: eui.Group;
    private imgFrame: eui.Image;
    private imgIcon: eui.Image;
    private lbName: eui.Label;
    private lbType: eui.Label;
    private lbNum: eui.Label;
    private lbCount: eui.Label;

    private btnSub: eui.Button;
    private btnAdd: eui.Button;
    private btnMax: eui.Button;
    private imgCost: eui.Image;
    private lbIncome: eui.Label;
    private btnUse: eui.Button;

    private timer: egret.Timer;
    private father: PackageMainScene;
    private itemId: number = 0;
    private price: number = 0;
    private power: number = 0;
    private count: number = 1;
    private max: number = 0;
    readonly MAX_CIMELIA: number = 100;

    private imgMask: eui.Image; // 碎片遮罩
    private rectMask: eui.Image; // 徽章遮罩

    public constructor() {
        super();

        this.skinName = "resource/skins/package/PackagePopUseSkin.exml";
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);

        this.btnSub.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSub, this);
        this.btnSub.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSubBegin, this);
        this.btnSub.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnSubEnd, this);

        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAdd, this);
        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnAddBegin, this);
        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnAddEnd, this);

        this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMax, this);
        this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUse, this);

        // 碎片遮罩
        this.imgMask = new eui.Image;
        this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
        this.imgMask.horizontalCenter = 0;
        this.imgMask.verticalCenter = 0;
        this.groupItem.addChild(this.imgMask);
        this.imgMask.visible = false;

        // 徽章遮罩
        this.rectMask = Util.getMaskImgBlack(73, 70);
        this.rectMask.horizontalCenter = 0;
        this.rectMask.verticalCenter = 0;
        this.groupItem.addChild(this.rectMask);
        this.rectMask.visible = false;

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            if (this.timer != null) {
                this.timer.stop();
                this.timer = null;
            };
        }, null);
    }

    public init(father) {
        this.father = father;
        this.itemId = this.father.itemId;

        this.setInfoProp();
        this.setInfoCount();

        this.timer = new egret.Timer(170, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
    }

    private setInfoProp() {
        let config = PlayerItemSystem.ItemConfig(this.itemId);

        this.price = config["price"];
        this.power = config["power"];
        this.max = Game.PlayerItemSystem.itemCount(this.itemId);
        if (PlayerItemSystem.ItemType(this.itemId) == message.EGoodsType.GOODS_TYPE_CIMELIA) {
            if (this.max > this.MAX_CIMELIA) {
                this.max = this.MAX_CIMELIA;
            }
        }

        this.imgFrame.source = cachekey(PlayerItemSystem.ItemFrame(this.itemId), this);
        this.imgIcon.source = cachekey(config["path"], this);
        this.lbName.text = config["name"];
        this.lbType.text = PlayerItemSystem.ItemTypeDesc(this.itemId);
        this.lbNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Package.has, this.max);
        this.lbIncome.text = config["price"].toString();

        // 遮罩
        this.imgMask.visible = false;
        this.rectMask.visible = false;
        this.imgIcon.mask = null;
        if (PlayerItemSystem.IsImgMask(this.itemId)) {
            this.imgMask.visible = true;
            this.imgIcon.mask = this.imgMask;
        } else if (PlayerItemSystem.IsRectMask(this.itemId)) {
            this.rectMask.visible = true;
            this.imgIcon.mask = this.rectMask;
        }
    }

    private setInfoCount() {
        let type = PlayerItemSystem.ItemType(this.itemId);
        let config = PlayerItemSystem.ItemConfig(this.itemId);

        if (type == message.EGoodsType.GOODS_TYPE_PROP) {
            let resType = PlayerItemSystem.UseOfResource(this.itemId);
            this.imgCost.visible = true;
            this.imgCost.source = cachekey(PlayerItemSystem.ItemConfig(resType)["path"], this);
            if(resType == message.EResourceType.RESOURCE_MONEY) {
                this.lbIncome.text = (config["price"] * this.count).toString();
            } else if(resType == message.EResourceType.RESOURCE_POWER) {
                this.lbIncome.text = (config["power"] * this.count).toString();
            } 
        }
        else if (type == message.EGoodsType.GOODS_TYPE_CIMELIA || type == message.EGoodsType.GOODS_TYPE_SECRET) {
            this.imgCost.visible = false;
            this.lbIncome.text = Helper.StringFormat(TextsConfig.TextsConfig_Package.sell_rand, this.count);
        }

        this.lbCount.text = this.count.toString();
    }

    private onTimer() {
        if (this.btnSub.currentState == "down") this.onBtnSub();
        if (this.btnAdd.currentState == "down") this.onBtnAdd();
    }

    private onBtnSub() {
        if (this.count > 1) {
            this.count = this.count - 1;
            this.setInfoCount();
        }
    }

    private onBtnSubBegin() {
        this.timer.start();
    }

    private onBtnSubEnd() {
        this.timer.stop();
    }

    private onBtnAdd() {
        if (this.count < this.max) {
            this.count = this.count + 1;
            this.setInfoCount();
        }
    }

    private onBtnAddBegin() {
        this.timer.start();
    }

    private onBtnAddEnd() {
        this.timer.stop();
    }

    private onBtnMax() {
        this.count = this.max;
        this.setInfoCount();
    }

    private onBtnUse() {
        let goodsInfo = new message.GoodsInfo();
        goodsInfo.count = this.count;
        goodsInfo.goodsId = this.itemId;
        goodsInfo.index = 0;
        goodsInfo.showType = 0;
        Game.PlayerItemSystem.useProp([goodsInfo]).then((resp: message.GameInfo) => {
            this.father.update();
            this.onBtnClose();

            let type = Math.floor(this.itemId / 10000);
            if (type == message.EGoodsType.GOODS_TYPE_PROP) {
                let text = "+" + this.count * (this.power ? this.power: this.price);
                let source = PlayerItemSystem.ItemConfig(PlayerItemSystem.UseOfResource(this.itemId))["path"];
                Game.EventManager.event(GameEvent.SHOW_COMMON_MESSAGE, { source: source, text: text });
            }
            else if (type == message.EGoodsType.GOODS_TYPE_CIMELIA || type == message.EGoodsType.GOODS_TYPE_SECRET) {
                setTimeout(() => {
                    loadUI(CommonGetDialog)
                        .then((dialog: CommonGetDialog) => {
                            dialog.init(resp.getGoods);
                            dialog.show();
                        });
                }, 500);
            }

        });
    }

    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
        egret.Tween.get(this.father.groupMain).to({ scaleX: 1, scaleY: 1 }, 300);
    }

}

}
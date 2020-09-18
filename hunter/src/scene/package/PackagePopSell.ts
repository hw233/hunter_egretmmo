namespace zj {
// 背包-物品出售
// lizhengqiang
// 2018/11/13

export class PackagePopSell extends Dialog {
    public groupSell: eui.Group;
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
    private lbIncome: eui.Label;
    private btnSell: eui.Button;

    private timer: egret.Timer;
    private father: PackageMainScene;
    private itemId: number = 0;
    private price: number = 0;
    private count: number = 1;
    private max: number = 0;

    private imgMask: eui.Image; // 碎片遮罩
    private rectMask: eui.Image; // 徽章遮罩

    public constructor() {
        super();

        this.skinName = "resource/skins/package/PackagePopSellSkin.exml";
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);

        this.btnSub.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSub, this);
        this.btnSub.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSubBegin, this);
        this.btnSub.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnSubEnd, this);

        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAdd, this);
        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnAddBegin, this);
        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnAddEnd, this);

        this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMax, this);
        this.btnSell.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSell, this);

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
        this.max = Game.PlayerItemSystem.itemCount(this.itemId);

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
        this.lbCount.text = this.count.toString();
        this.lbIncome.text = (this.count * this.price).toString();
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

    private onBtnSell() {
        this.onBtnClose();

        let goodsInfo = new message.GoodsInfo();
        goodsInfo.count = this.count;
        goodsInfo.goodsId = this.itemId;
        goodsInfo.index = 0;
        goodsInfo.showType = 0;
        Game.PlayerItemSystem.sellGoods([goodsInfo]).then(() => {
            this.father.update();
            Game.EventManager.event(GameEvent.SHOW_COMMON_MESSAGE, { source: "ui_iconresources_jinbi3_png", text: "+" + this.count * this.price });
        });
    }

    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
        egret.Tween.get(this.father.groupMain).to({ scaleX: 1, scaleY: 1 }, 300);
    }

}

}
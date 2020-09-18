namespace zj {
//购买All
//yuqingchao
//2019/2/19
export class LeagueMatchMallMainBuyAll extends Dialog {
    private Min_Count: number = 1;      //最小
    private Max_Count: number = 100;        //最大
    private count: any;

    public imgSpriteFrame: eui.Image;
    public imgSpriteIcon: eui.Image;
    public imgSpriteLogo: eui.Image;
    public LableTextNum: eui.BitmapLabel;
    public tableOwn: eui.Label;
    public tableName: eui.Label;
    public imgCC9Sprite1: eui.Image;
    public lableTextInfo: eui.Label;
    public btnBuy: eui.Button;
    public imgSprite2: eui.Image;
    public btnSub: eui.Button;
    public btnAdd: eui.Button;
    public btnMax: eui.Button;
    public labelTextCount: eui.Label;
    public imgSpriteCost2: eui.Image;
    public labelTextCost2: eui.Label;

    public mallid: number = 0;

    private groupWhole: eui.Group;

    private num: number = 0;
    private info: message.MallItem;
    private father: LeagueMatchMallMain;
    private save_cost: any;

    private imgMask: eui.Image;
    private rectMask: eui.Image;
    private rectMaskCommon: eui.Image;
    private groupAnimate: eui.Group;

    public constructor() {
        super();
        this.skinName = "resource/skins/shop/ShopBuyAllSkin.exml";
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            this.father = null;
        }, null);
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;

        // 碎片遮罩
        this.imgMask = new eui.Image;
        this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
        this.imgMask.horizontalCenter = 0;
        this.imgMask.verticalCenter = 0;
        this.groupAnimate.addChild(this.imgMask);
        this.imgMask.visible = false;

        // 徽章遮罩
        this.rectMask = Util.getMaskImgBlack(73, 70);
        this.rectMask.horizontalCenter = 0;
        this.rectMask.verticalCenter = 0;
        this.groupAnimate.addChild(this.rectMask);
        this.rectMask.visible = false;

        //普通物品遮罩
        this.rectMaskCommon = Util.getMaskImgBlack(83, 84);
        this.rectMaskCommon.horizontalCenter = 0;
        this.rectMaskCommon.verticalCenter = -2;
        this.groupAnimate.addChild(this.rectMaskCommon);
        this.rectMaskCommon.visible = false;

        this.groupWhole.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.btnSub.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonSub, this);
        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonAdd, this);
        this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonMax, this);
        this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonBuy, this);

    }

    public init() {
        this.count = 1;
        this.imgSpriteLogo.visible = false;

    }

    public setInfo(info: message.MallItem, father: LeagueMatchMallMain) {
        this.info = info;
        this.father = father;
        this.SetInfoMall()
        this.mallid = info.mall_id;

    }

    private SetInfoMall() {
        let id = this.info.goods_id[0];
        let show = this.info.show_type[0];
        let count: any = this.info.goods_count[0];
        let itemSet: any = PlayerItemSystem.Set(id, this.info.show_type[0], count);
        let own_count = PlayerItemSystem.Count(this.info.goods_id[0]);
        let itemIcon: any = PlayerItemSystem.Item(this.info.consume_type);
        let str_count = Helper.StringFormat("%s%d", TextsConfig.TextsConfig_Mall.buy_count, own_count);
        if (this.father.getDiscount()) {
            let discount = TableLevel.Item(Game.PlayerLeagueSystem.BaseInfo.level).league_mall;
            this.save_cost = this.info.original_price * discount / 10;
        } else {
            this.save_cost = this.info.discount_price;
        }
        this.Max_Count = this.info.remain;

        this.imgSpriteFrame.source = cachekey(itemSet.Frame, this);
        this.tableName.text = itemSet.Info.name;
        this.LableTextNum.text = count;
        this.tableOwn.text = str_count;
        this.lableTextInfo.textFlow = Util.RichText(itemSet.Info.des + "");
        this.labelTextCost2.text = this.save_cost;
        this.imgSpriteCost2.source = cachekey(itemIcon.icon, this);

        this.labelTextCount.text = this.count;
        this.imgSpriteIcon.source = cachekey(PlayerItemSystem.ItemPath(this.info.goods_id[0]), this);
        this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupAnimate);

        if (this.isImgMask(this.info.goods_id[0])) {
            this.imgMask.visible = true;
            this.imgSpriteIcon.mask = this.imgMask;
        } else if (this.isRectMask(this.info.goods_id[0])) {
            this.rectMask.visible = true;
            this.imgSpriteIcon.mask = this.rectMask;
        } else {
            this.imgMask.visible = false;
            this.rectMask.visible = false;
            this.rectMaskCommon.visible = true;
            this.imgSpriteIcon.mask = this.rectMaskCommon;
        }



    }

    // 物品遮罩
    private isImgMask(goodsId: number): boolean {
        if (PlayerItemSystem.ItemType(goodsId) == 4
            || TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
            || TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
            || TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
            || Math.floor(goodsId / 1000) == 37
            || TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
            return true;
        }
        return false;
    }

    // 徽章遮罩
    private isRectMask(goodsId: number): boolean {
        if (TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || PlayerItemSystem.ItemType(goodsId) == 6) {
            return true;
        }
        return false;
    }

    private SetInfoCount() {
        this.labelTextCount.text = this.count;
        this.labelTextCost2.text = (this.save_cost * this.count).toString();
    }

    private onButtonSub() {
        this.count = this.count - 1;
        if (this.count <= this.Min_Count) {
            this.count = this.Min_Count;
        }

        this.SetInfoCount();
    }

    //添加按钮
    private onButtonAdd() {
        let money = this.father.nowMoney;
        let num = (money / this.save_cost);
        if (num <= 1) {
            this.count = this.Min_Count;
        } else {
            this.count = this.count + 1;
        }

        if (this.count >= this.Max_Count) {
            this.count = this.Max_Count;
        }

        this.SetInfoCount();
    }

    //添加龙骨动画
    public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
        Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
            .then(display => {
                display.x = group.explicitWidth / 2
                //display.y =this.height*0.25;
                display.y = group.explicitHeight / 2;
                group.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }

    private onButtonMax() {
        let money = this.father.nowMoney;
        let num = Math.floor(money / this.save_cost);

        if (num <= 0) {
            this.count = this.Min_Count;
        } else if (num < this.Max_Count) {
            this.count = num;
        } else if (num > this.Max_Count) {
            this.count = this.Max_Count;
        }

        this.SetInfoCount();
    }

    private onButtonBuy() {

        let nowGold = Game.PlayerInfoSystem.Coin.toString();
        if (this.save_cost > nowGold) {
            loadUI(ConfirmCancelDialog)
                .then((dialog: ConfirmCancelDialog) => {
                    dialog.show(UI.SHOW_FILL_OUT);
                });
        } else {
            this.father.buy(this.mallid, this.count);
            Game.EventManager.event(GameEvent.LEAGUE_MATCH_MALL_MAIN_UPDATE);
        }
    }

    public onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
    }

}

}
namespace zj {
//购买
//yuqingchao
//2019.02.19
export class LeagueMatchMallMainBuyOne extends Dialog {
    private imgCCScale9Sprite: eui.Image;
    private imgCCSprite: eui.Image;
    private imgCCScale9Sprite_1: eui.Image;
    private imgCCScale9Sprite_2: eui.Image;
    private imgSpriteFrame: eui.Image;
    private imgSpriteIcon: eui.Image;
    private imgSpriteLogo: eui.Image;
    private LabelNum: eui.Label;        //单个数量
    private labelName: eui.Label;       //物品名
    private labelOwn: eui.Label;        //拥有数量
    private labelInfo: eui.Label;       //物品介绍
    private btnBuy: eui.Button;     //购买按钮
    private labelTTF: eui.Label;
    private imgSpriteCost: eui.Image;       //货币类型
    private labelCost: eui.Label;       //价格
    private groupWhole: eui.Group;

    private info: message.MallItem;
    private father: LeagueMatchMallMain;
    private mallid: number;

    private imgMask: eui.Image;
    private rectMask: eui.Image;
    private rectMaskCommon: eui.Image;
    private groupAnimate: eui.Group;

    private nowPrice: number;

    public constructor() {
        super();
        this.skinName = "resource/skins/league/LeagueMatchMallMainBuyOneSkin.exml";
        this.groupWhole.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuy, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            this.father = null;
        }, null);

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


    }

    public setInfo(info: message.MallItem, father: LeagueMatchMallMain) {
        this.info = info;
        this.father = father;
        this.mallid = info.mall_id;

        this.setInfoMall();
    }

    //添加龙骨动画
    public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
        Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
            .then(display => {
                display.x = group.explicitWidth / 2
                display.y = group.explicitHeight / 2;
                group.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }

    private setInfoMall() {
        let id = this.info.goods_id[0];
        let count = this.info.goods_count[0];
        let itemSet: any = PlayerItemSystem.Set(id, this.info.show_type[0], count);
        let itemCount = this.info.goods_count[1];
        let item: any = PlayerItemSystem.Item(this.info.consume_type);
        let itemIcon = item.icon;

        let own_count = Game.PlayerItemSystem.itemCount(this.info.goods_id[0]);

        let str_count = Helper.StringFormat("%s%d", TextsConfig.TextsConfig_Mall.buy_count, own_count);
        let str_cost = this.info.discount_price;

        this.imgSpriteFrame.source = cachekey(itemSet.Frame, this);
        this.imgSpriteIcon.source = cachekey(PlayerItemSystem.ItemPath(this.info.goods_id[0]), this);

        this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupAnimate);
        this.labelName.text = itemSet.Info.name;
        this.labelOwn.text = str_count;
        this.LabelNum.text = count.toString();
        this.labelInfo.textFlow = Util.RichText(itemSet.Info.des + "")
        this.imgSpriteCost.source = cachekey(itemIcon, this);
        if (this.father.getDiscount()) {
            let discount = TableLevel.Item(Game.PlayerLeagueSystem.BaseInfo.level).league_mall;
            this.nowPrice = this.info.original_price * discount / 10;
            this.labelCost.text = (this.info.original_price * discount / 10).toString();
        } else {
            this.nowPrice = this.info.discount_price;
            this.labelCost.text = (this.info.discount_price).toString();
        }

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

    //购买
    private onBtnBuy() {
        let nowGold = Game.PlayerInfoSystem.Coin;
        if (this.nowPrice > nowGold) {
            loadUI(ConfirmCancelDialog)
                .then((dialog: ConfirmCancelDialog) => {
                    dialog.setInfo(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Money.moneys));
                    dialog.setCB(() => {
                        loadUI(HelpGoldDialog)
                            .then((dialog: HelpGoldDialog) => {
                                dialog.SetInfoList();
                                dialog.show(UI.SHOW_FILL_OUT);
                            });
                    });
                    dialog.show(UI.SHOW_FILL_OUT);
                });
        } else {
            this.father.buy(this.mallid, 1);
            Game.EventManager.event(GameEvent.LEAGUE_MATCH_MALL_MAIN_UPDATE);
        }
    }

    public onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
    }

}

}
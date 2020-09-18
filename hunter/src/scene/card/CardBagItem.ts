namespace zj {
// created by hhh in 2018/11/13

/************** 卡包item ****************/

export class CardBagItem extends eui.ItemRenderer {
    private btnSel: eui.Button;
    private btnGetCardBag: eui.Button;

    private groupCardLevel: eui.Group;

    private labelCardNum: eui.BitmapLabel;

    private imageAni: eui.Image;

    private info: message.GoodsInfo;

    private groupAniSel: eui.Group;

    public constructor() {
        super();

        this.skinName = "resource/skins/card/CardBagItemSkin.exml";

        cachekeys(<string[]>UIResource["CardBagItem"], null);

        this.init();
    }

    private init() {
        this.btnGetCardBag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGetCardBag, this);

        this.imageAni.visible = false;
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, ()=>{
            Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, {isAni: true});
        },this);
    }

    private onBtnGetCardBag() {
        // loadUI(ConfirmOkDialog)
        // .then((dialog: ConfirmOkDialog) => {
        //     dialog.setInfo(TextsConfig.TextsConfig_Hunter_Card.card_bag_tips);
        //     dialog.show(UI.SHOW_FILL_OUT);
        // });
        TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Hunter_Card.card_bag_tips);
    }

    private playAni() {
        // this.imageAni.visible = true;

        // egret.Tween.get(this.imageAni, { loop: true })
        //     .to({ scaleX: 1.03, scaleY: 1.03 }, 800, egret.Ease.sineIn)
        //     .to({ scaleX: 1, scaleY: 1 }, 800, egret.Ease.sineOut);

        Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", "003_xuanzhong_anniu3", 0)
            .then(display => {
                display.x = this.groupAniSel.explicitWidth / 2;
                display.y = this.groupAniSel.explicitHeight / 2;
                this.groupAniSel.addChild(display);
                display.scaleX = 1;
                display.scaleY = 1;
            })
            .catch(reason => {
                toast(reason);
            });
    }

    protected dataChanged() {
        if (this.data == null) {
            this.btnGetCardBag.visible = true;
            this.btnSel.visible = false;
            this.groupCardLevel.visible = false;
            this.imageAni.visible = false;
        }
        else {
            this.btnGetCardBag.visible = false;
            this.btnSel.visible = true;
            this.groupCardLevel.visible = true;

            if (this.data.ani == true) {
                this.groupAniSel.removeChildren();
                this.playAni();
            }
            else {
                this.imageAni.visible = false;
                this.groupAniSel.removeChildren();
            }

            this.info = this.data.info;

            this.labelCardNum.text = this.info.count + "";

            let imagePath = (<TableItemCimelia>PlayerItemSystem.ItemConfig(this.info.goodsId)).path;
            let btnSelImage: eui.Image = <eui.Image>this.btnSel.getChildAt(0);
            btnSelImage.source = cachekey(imagePath, this);
        }
    }
} 
}
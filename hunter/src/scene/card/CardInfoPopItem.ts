namespace zj {
// created by hhh in 2018/11/13

/************** 猎人及卡片部分item ****************/

export class CardInfoPopItem extends eui.ItemRenderer {
    private groupCache: eui.Group;
    private groupAll: eui.Group;
    private groupAniSel: eui.Group;
    private groupStar: eui.Group;

    // private btnSel: eui.Button;
    private btnCardGet: eui.Button;

    private labelLevel: eui.BitmapLabel;
    private labelCardName: eui.Label;

    private imageCardType: eui.Image;
    private imageHunterType: eui.Image;
    private imageCard: eui.Image;
    private imageFrame: eui.Image;
    private imageLock: eui.Image;

    private cardType: number;
    private hostShowType: number;
    private info: message.PotatoInfo;
    private imgNew: eui.Image;

    public constructor() {
        super();

        this.skinName = "resource/skins/card/CardInfoPopItemSkin.exml";

        cachekeys(<string[]>UIResource["CardInfoPopItem"], null);

        this.init();
    }

    private init() {
        this.btnCardGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardGet, this);

        this.labelCardName.anchorOffsetX = this.labelCardName.width / 2;
    }

    protected dataChanged() {
        closeCache(this.groupCache);
        this.cardType = this.data.cardType;
        this.hostShowType = this.data.hostShowType;
        this.info = this.data.cardInfo;

        this.btnCardGet.visible = true;
        this.groupAll.visible = true;

        if (this.info == null) {
            this.btnCardGet.visible = false;
            this.groupAll.visible = false;

            return;
        }

        this.imgNew.visible = false;

        if (this.data.ani == true) {
            Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0)
                .then(display => {
                    if (!this.groupAniSel.getChildByName("dzGF")) {
                        display.x = this.groupAniSel.explicitWidth / 2;
                        display.y = this.groupAniSel.explicitHeight / 2;
                        display.name = "dzGF";
                        this.groupAniSel.addChild(display);
                    }
                    else {
                        display.animation.stop();
                        display.animation.reset();
                        display.armature.dispose();
                        display.dbClear();
                        display.dispose(true);
                    }
                })
                .catch(reason => {
                    toast(reason);
                });
        }
        else {
            let obj = this.groupAniSel.getChildByName("dzGF");
            if (obj) {
                this.groupAniSel.removeChild(obj);
            }
        }

        this.groupAll.visible = this.groupAniSel.visible = (this.info.id != null);
        this.btnCardGet.visible = (this.info.id == null);
        if (this.info.id != null) {
            let tbl = TableItemPotato.Item(this.info.id);
            if (this.cardType == 1 || (this.cardType == 2 && this.hostShowType == 2)) {
                this.labelCardName.text = tbl.name;
                this.labelCardName.textColor = 0x000000;
                this.imageHunterType.visible = false;
                this.labelCardName.x = this.width / 2;
            }
            else {
                let cHostId = Game.PlayerCardSystem.getCardToHunterInfo(this.info.index).cHostId;
                if (cHostId != null && this.info.pos != 0)
                    this.imageHunterType.visible = true;
                this.labelCardName.text = PlayerHunterSystem.Table(cHostId).general_name;
                this.labelCardName.textColor = 0xffffff;
                this.labelCardName.x = this.width / 2 + 10;
            }

            this.imageCardType.source = cachekey(UIConfig.UIConfig_Hunter_Card.card_type_right[tbl.type - 1], this);
            this.imageCard.source = cachekey(tbl.path, this);
            let [framePic, _, __] = PlayerCardSystem.GetItemFrame(this.info.id);
            this.imageFrame.source = cachekey(framePic, this);

            this.labelLevel.text = this.info.level + "";
            this.imageLock.visible = this.info.is_lock;

            if (this.info.add_attri.length + 1 == 5 && this.info.star < 6 || this.info.add_attri.length == 5 && this.info.star >= 6) {
                Helper.SetStar(this.groupStar, this.info.star, UIConfig.UIConfig_Hunter_Card.card_star_next, 0.8, 10, this);
            }
            else {
                Helper.SetStar(this.groupStar, this.info.star, UIConfig.UIConfig_Hunter_Card.card_star, 0.8, 10, this);
            }
        }

        if (this.cardType == 1) {
            this.imgNew.visible = this.info.index > Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex;
            if (this.info.index > Game.PlayerCardSystem.newCardExceptEquip.maxPocketIndex) {
                Game.PlayerCardSystem.setIsCardChange(false);
            }
        }
        setCache(this.groupCache);
    }

    private onBtnCardGet() {
        let clientId = TableEnum.Enum.CardTypeDropId[this.cardType - 1];

        loadUI(Common_OutPutDialog)
            .then((dialog: Common_OutPutDialog) => {
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }
}
}
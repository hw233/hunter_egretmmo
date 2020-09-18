namespace zj {
//获得资源
//wangshenzhuo
//2.19/4/3
export class Common_ShortMsg extends UI {

    public labelTextNum: eui.BitmapLabel;
    public imageIcon: eui.Image;
    public imageDouble: eui.Image;
    public labelTip: eui.BitmapLabel;


    public constructor() {
        super();
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;

        this.skinName = "resource/skins/common/Common_ShortMsgSkin.exml";
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            egret.Tween.removeTweens(this);
        }, this);
    }

    public SetInfo(text, id, posY, multiple?) {
        this.y = posY / 2;
        this.imageDouble.visible = false;
        this.labelTip.visible = false;
        if (multiple != null) {
            this.labelTip.visible = true;
            this.labelTip.scaleX = 0.7;
            this.labelTip.scaleY = 0.7;
            if (multiple < 3) {
                this.labelTip.font = UIConfig.UIConfig_Money.nameFont[0];
                this.labelTip.text = Helper.StringFormat(TextsConfig.TextsConfig_Common.multiple1, multiple);
            } else if (multiple >= 3 && multiple <= 5) {
                this.labelTip.font = UIConfig.UIConfig_Money.nameFont[1];
                this.labelTip.text = Helper.StringFormat(TextsConfig.TextsConfig_Common.multiple1, multiple);
            } else if (multiple >= 6 && multiple <= 8) {
                this.labelTip.font = UIConfig.UIConfig_Money.nameFont[2];
                this.labelTip.text = Helper.StringFormat(TextsConfig.TextsConfig_Common.multiple1, multiple);
            } else if (multiple >= 9 && multiple <= 10) {
                this.labelTip.font = UIConfig.UIConfig_Money.nameFont[3];
                this.labelTip.text = Helper.StringFormat(TextsConfig.TextsConfig_Common.multiple1, multiple);
            } else {
                this.labelTip.font = UIConfig.UIConfig_Money.nameFont[4];
                this.labelTip.text = Helper.StringFormat(TextsConfig.TextsConfig_Common.multiple1, multiple);
            }
        }

        let item: any = PlayerItemSystem.Item(id);
        let path = item.icon || item.path;
        this.imageIcon.source = cachekey(path, this);
        this.labelTextNum.text = text;

        if (id == message.EResourceType.RESOURCE_MONEY) {
            Game.SoundManager.playEffect(this.SoundOpen(30021), 100);
        } else if (PlayerItemSystem.Type2(id) == message.EGoodsType.GOODS_TYPE_RESOURCE) {
            Game.SoundManager.playEffect(this.SoundOpen(30022), 100);
        }

        setTimeout(() => {
            egret.Tween.get(this.imageIcon)
                .to({ x: 430 }, 0)
                .to({ x: 480 }, 100, egret.Ease.backOut);

            egret.Tween.get(this.labelTextNum)
                .to({ x: 600 }, 0)
                .to({ x: 550 }, 100, egret.Ease.backOut);

            egret.Tween.get(this).wait(400)
                .to({ y: posY / 2 }, 0)
                .to({ y: 0 }, 500)
                .call(() => {
                    this.removeChildren();
                })
        }, 100);

    }

    public static promptBattleValue(text, id, posY, multiple?) {
        let tip = new Common_ShortMsg();
        tip.SetInfo(text, id, posY, multiple);
        Game.UIManager.AnimationGroup.addChild(tip);
        tip.y = posY;
    }

    public SoundOpen(id) {
        let sound = TableClientSoundResource.Item(id);
        let textDrop = sound.sound_path;
        let strs = new Array()
        strs = textDrop.split("/");
        let soundtext = strs[2];
        soundtext = soundtext.replace('.', '_');
        return soundtext;
    }
}
}
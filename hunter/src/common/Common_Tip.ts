namespace zj {
/**
 * 领取体力提示
 */
export class Common_Tip extends UI {

    public imageBoard: eui.Image;
    public labelTextAttri: eui.Label;
    public imageRes: eui.Image;
    public labelTextRes: eui.Label;


    public constructor() {
        super();
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;

        this.skinName = "resource/skins/common/Common_TipSkin.exml";
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            egret.Tween.removeTweens(this);
        }, this);
    }

    public SetInfo(textStr, posY, posX, picStr?, tipStr?) {
        this.x = posX / 2 - 100;
        this.y = posY / 2;
        if (picStr == null) {
            this.labelTextAttri.visible = true;
            this.labelTextRes.visible = false;
            this.imageRes.visible = false;
            this.labelTextAttri.textFlow = Util.RichText(textStr) || Util.RichText("");
        } else {
            this.labelTextAttri.visible = false;
            this.labelTextRes.visible = true;
            this.imageRes.visible = true;
            this.labelTextRes.text = textStr || "";
            this.imageRes.source = cachekey(picStr, this);
        }
        if (tipStr != null) {
            this.imageBoard.source = cachekey(tipStr, this);
            this.labelTextAttri.x = 70;
        }

        egret.Tween.get(this).wait(500)
            .to({ y: posY / 2, x: posX / 2 - 100 }, 0)
            .to({ y: posY / 2 - 50 }, 500).wait(500)
            .to({ y: posY / 2 - 100 }, 500).wait(500)
            .call(() => {
                this.removeChildren();
            })
    }

    public static AddTip(txtStr, posY, posX, picStr?, tipStr?) {
        let tip = new Common_Tip();
        tip.SetInfo(txtStr, posY, posX, picStr, tipStr);
        Game.UIManager.AnimationGroup.addChild(tip);
        tip.y = posY / 2;
        tip.x = posX / 2;
    }
}
}
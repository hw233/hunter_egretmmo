namespace zj {
// TavernProb
//hexiaowei
// 2018/11/15
export class TavernProb extends Dialog {
    private group2: eui.Group;
    private labelSoda: eui.Label;
    private labelBeer: eui.Label;
    private labelRedWine: eui.Label;
    private labelChampagne: eui.Label;

    private group1: eui.Group;
    public labelCloseTheTip: eui.Label;
    private tavern: TavernScene;//父级

    private sodaWater: eui.Group;
    private IceBeer: eui.Group;
    private redWine: eui.Group;
    private champagne: eui.Group;

    public constructor() {
        super();
        this.skinName = "resource/skins/tavern/TavernProbSkin.exml";
        this.group1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroup1Close, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            egret.Tween.removeTweens(this.labelCloseTheTip); // 因为是循环播放，需要特别处理
        }, null);

        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;
        this.labelSoda.textFlow = Util.RichText(RuleConfig.Tavern[1]);
        this.labelBeer.textFlow = Util.RichText(RuleConfig.Tavern[2]);
        this.labelRedWine.textFlow = Util.RichText(RuleConfig.Tavern[3]);
        this.labelChampagne.textFlow = Util.RichText(RuleConfig.Tavern[4]);
        //点击任意区域关闭
        egret.Tween.get(this.labelCloseTheTip, { loop: true })
            .to({ alpha: 1 }, 1000)
            .to({ alpha: 0 }, 1000)
    }

    public init(tavern: TavernScene) {
        this.tavern = tavern;
        if (Device.isReviewSwitch) {
            this.sodaWater.visible = false;
            this.redWine.visible = false;
            this.champagne.visible = false;

            this.IceBeer.x = 26;
            this.IceBeer.y = 75;
        } else {
            this.sodaWater.visible = true;
            this.redWine.visible = true;
            this.champagne.visible = true;
        }
    }

    public onGroup1Close() {
        this.close(UI.HIDE_TO_TOP);

    }

}

}
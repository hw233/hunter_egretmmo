namespace zj {
//TavernCommon
//hexiaowei
// 2018/11/28
export class TavernCommon extends UI {
  private labelHint: eui.Label;
  private tavern: TavernScene;

  public constructor() {
    super();
    this.skinName = "resource/skins/tavern/TavernCommonSkin.exml";
    this.width = UIManager.StageWidth;
    this.height = UIManager.StageHeight;
  }

  public init(tavern) {
    this.tavern = tavern;
  }

  private setInfo(info: string) {
    this.labelHint.text = info;
  }

  public onButtonClose() {
    egret.Tween.get(this)
      .wait(1000, true)
      .to({ x: 155, y: -350 }, 1000, egret.Ease.backOut)
      .call(() => { this.tavern.removeChild(this); });
  }
}

}
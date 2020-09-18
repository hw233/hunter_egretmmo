namespace zj {
/**
 * 连续挑战
 */
export class SuccessionBattlePopTip extends Dialog {
    public ButtonGetAward: eui.Button;
    public ButtonClose: eui.Button;
    public NodeOpenTip: eui.Group;
    public LabelContent1: eui.Label;
    public LabelContent2: eui.Label;
    public LabelContent3: eui.Label;
    public NodeCloseTip: eui.Group;
    public LabelCloseTip: eui.Label;

    private confirmCB: Function = null

    public constructor() {
        super();
        this.skinName = "resource/skins/formation/SuccessionBattlePopTipSkin.exml";
        this.registerEvents();
    }

    public setInfo(msg1, msg2, msg3) {
        this.LabelContent1.text = msg1; // Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Instance.continue_battle_content1, Gmgr.Instance.maxContinueBattleSum);
        this.LabelContent2.text = msg2; // TextsConfig.TextsConfig_Hunter_Instance.continue_battle_content2;
        this.LabelContent3.text = msg3; // Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Instance.continue_battle_content3, Gmgr.Instance.maxContinueBattleSum);

    }

    /**
     * 事件监听
     */
    public registerEvents() {
        this.ButtonGetAward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGetAward, this);// 确定
        this.ButtonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);// 关闭
    }

    /**
     * 确定按钮
     */
    public onButtonGetAward() {
        Game.EventManager.event(GameEvent.BUTTON_Get_AWARD);// 其他阵型 
    }


    public setCB(confirmCB?: Function) {
        this.confirmCB = confirmCB;
    }

    /**
     * 关闭按钮
     */
    public onButtonClose() {
        this.close();
    }
}
}
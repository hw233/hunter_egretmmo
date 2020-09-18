namespace zj {
// 公会-奖励预览
// lizhengqiang
// 20190103

export class LeagueInstanceViewAward extends Dialog {
    private lstAward: eui.List;
    private btnClose: eui.Button;

    public constructor() {
        super();

        this.skinName = "resource/skins/league/LeagueInstanceViewAwardSkin.exml";
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this);

        this.setList();
    }

    public setList() {
        let instance = Game.PlayerLeagueSystem.getAllInstance();
        let arrCollection = new eui.ArrayCollection();
        for (let v of Object.keys(instance)) {
            arrCollection.addItem({
                instance: instance[v],
                father: this
            });
        }
        this.lstAward.itemRenderer = LeagueInstanceViewAwardItemIR;
        this.lstAward.dataProvider = arrCollection;
    }

    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
    }
    //鼠标抬起，移除  掉落 材料说明
	private onRemoveAward() {
		let dialog = this.getChildByName("Item-skill-common");
		if (dialog) this.removeChild(dialog);
	}
}

}
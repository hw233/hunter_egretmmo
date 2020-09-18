namespace zj {
/**
 * @author xing li wei 
 * 
 * @date 2019-1-25
 * 
 * @class 奖励说明界面
 */
export class ArenaLadderAward extends Dialog {
	private groupCache: eui.Group;
	private labelRushTime: eui.Label;
	private labelRank: eui.Label;
	private btnClose: eui.Button;
	private listAward: eui.List;
	public constructor() {
		super();
		this.skinName = "resource/skins/arena/ArenaLadderAwardSkin.exml";
		this.init();
	}

	private init() {
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.awardUp, this);
		this.labelRushTime.text = TextsConfig.TextsConfig_Arena.final;
		this.labelRank.text = Helper.StringFormat(TextsConfig.TextsConfig_Arena.myRank, Game.PlayerInfoSystem.BaseInfo.ladderRank);

		this.loadAwardList();
	}

	private loadAwardList() {
		let scoreTbl = TableLadderScore.Table();
		let array = new eui.ArrayCollection();
		for (let i = 0; i < 7; i++) {
			let data = new ArenaLadderAwardItemData();
			data.info = scoreTbl[i + 1];
			data.father = this;
			array.addItem(data);
		}
		this.listAward.dataProvider = array;
		this.listAward.itemRenderer = ArenaLadderAwardItem;

		setCache(this.groupCache);
	}

	/**奖励详情 */
	public awardParticulars(xy: number, cx: number, cy: number, info: message.GoodsInfo) {
		let commonDesSkill = TipManager.ShowProp(info, this, xy, cx, cy);
		commonDesSkill.name = "UI";
		this.addChild(commonDesSkill);
	}

	/**抬起移除奖励详情界面 */
	private awardUp() {
		let ui = this.getChildByName("UI");
		if (ui) {
			this.removeChild(ui);
		}
	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}
}

}
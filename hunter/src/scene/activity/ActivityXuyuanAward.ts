namespace zj {
//ActivityXuyuanAward
//yuqingchao
//2019.05.07
export class ActivityXuyuanAward extends Dialog {
	private btnClose: eui.Button;
	private lstView: eui.List;
	private arrayCollection: eui.ArrayCollection;

	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityXuyuanAwardSkin.exml";
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this)
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
		Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
		}, null);
	}

	public setInfo(topicId) {
		let tbl = Game.ConfigManager.getTable(StringConfig_Table.xuyuan_random + ".json")[topicId];         //读表
		this.arrayCollection = new eui.ArrayCollection();
		for (let i = 0; i < tbl.client_award.length; i++) {
			let height = Math.ceil(tbl.client_award[i].length / 7) * 70;
			let pic = tbl.client_award_pic[i];
			height = height < 120 && 120 || height;
			let cellHight = Math.ceil(tbl.client_award[i].length / 5) > 1 && 70 || 95;
			this.arrayCollection.addItem({
				i,
				info: tbl.client_award[i],
				pic,
				height,
				cellHight,
			})
		}
		this.lstView.dataProvider = this.arrayCollection;
		this.lstView.itemRenderer = ActivityXuyuanAwardItem;
	}
	private removeShow() {
		let show = this.getChildByName("details");
		if (show) {
			this.removeChild(show);
		}
	}

	private showGoodsProperty(ev: egret.Event) {
		let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
		show.name = "details";
		this.addChild(show);
	}
	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}

}
}
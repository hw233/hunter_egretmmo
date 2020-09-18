namespace zj {
//奖励预览
//yuqingchao
//2019.05.28
export class DoubleColorViewAward extends Dialog {
	private groupCache: eui.Group;
	private btnClose: eui.Button;
	private lstRed: eui.List;
	private arrayCollection: eui.ArrayCollection;
	private rewardTbl = [];
	public constructor() {
		super();
		this.skinName = "resource/skins/fishing/DoubleColorViewAwardSkin.exml";
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
		}, null);
		this.init();
	}

	private init() {
		let tbl = Game.ConfigManager.getTable(StringConfig_Table.color_fruit_reward + ".json");
		for (let i = 1; i < Object.keys(tbl).length + 1; i++) {
			this.rewardTbl.push(tbl[i]);
		}
		this.rewardTbl.sort((a, b) => {
			return b.id - a.id;
		});
		this.setInfoList();
		setCache(this.groupCache);
	}

	private setInfoList() {
		this.arrayCollection = new eui.ArrayCollection();
		for (let i = 0; i < this.rewardTbl.length; i++) {
			this.arrayCollection.addItem({
				i,
				info: this.rewardTbl[i],
				father: this,
			})
		}
		this.lstRed.dataProvider = this.arrayCollection;
		this.lstRed.itemRenderer = DoubleColorViewAwardItem;
	}

	//移除详情
	private removeShow() {
		let show = this.getChildByName("details");
		if (show) {
			this.removeChild(show);
		}
	}

	//长按详情添加
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
namespace zj {
//查询结果
//yuqingchao
//2019.05.28
export class DoubleColorViewEnd extends Dialog {
	private groupCache: eui.Group;
	private scroller: eui.Scroller;
	private btnClose: eui.Button;
	private lstRed: eui.List;
	private viewArr: eui.ArrayCollection;
	public constructor() {
		super();
		this.skinName = "resource/skins/fishing/DoubleColorViewEndSkin.exml";
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
	}
	public setInfo(msg) {
		closeCache(this.groupCache);
		let info = msg;
		info.sort((a, b) => {
			return b.creatTime - a.creatTime;
		})
		this.viewArr = new eui.ArrayCollection();
		for (let i = 0; i < info.length; i++) {
			this.viewArr.addItem({
				info: info[i],
			})
		}
		this.lstRed.dataProvider = this.viewArr;
		this.lstRed.itemRenderer = DoubleColorViewEndItem;

		// this.lstRed.removeChildren();

		// for (let i = 0; i < info.length; i++) {
		// 	let item = new DoubleColorViewEndItem();
		// 	item.dataChanged(info[i]);
		// 	this.lstRed.addChild(item);
		// }
		setCache(this.groupCache);
	}
	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}
}
}
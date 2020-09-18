namespace zj {
//DoubleColorPopItemTop
//yuqingchao
export class DoubleColorPopItemTop extends eui.ItemRenderer {
	private groupAll: eui.Group;
	private groupIcon: eui.Group;
	private imgBoard: eui.Image;
	private imgIcon: eui.Image;
	private lbNunID: eui.Label;
	private curFruitID: number = null;
	private id: number = null;
	private color: number = null;
	private father: DoubleColorPop;
	public constructor() {
		super();
		this.skinName = "resource/skins/fishing/DoubleColorPopItemTopSkin.exml";
		cachekeys(<string[]>UIResource["DoubleColorPopItemTop"], null);
		this.groupAll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupAll, this);
		this.init();
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.father = null;
		}, null)
	}
	private init() {
		this.groupIcon.visible = false;
		this.curFruitID = null;
		this.groupAll.scaleX = 0.8;
		this.groupAll.scaleY = 0.8;
		// this.groupAll.anchorOffsetX = this.groupAll.width / 2;
		// this.groupAll.anchorOffsetY = this.groupAll.height / 2;
	}
	public setInfo(id, color, _father) {
		this.id = id;
		this.color = color;
		this.imgIcon.source = cachekey(UIConfig.UIConfig_Hunter_DoubleColor.RedOrBlue2[color], this);
		this.father = _father
	}
	public Add(num) {
		this.groupIcon.visible = true;
		this.lbNunID.text = Game.PlayerDoubleBallSystem.fruitId(num).toString();
		this.curFruitID = num;
	}
	public Change(num) {
		this.lbNunID.text = Game.PlayerDoubleBallSystem.fruitId(num).toString();
		this.curFruitID = num;
	}
	public Delete() {
		this.groupIcon.visible = false;
		this.curFruitID = null;
	}
	public SetAni(index) {
		let cb = () => {
			if (this.id == 3) {
				this.father.btnViewEnd.enabled = true;
			}
		}
		if (this.curFruitID == null) {
			cb();
		}
	}
	private onGroupAll() {
		this.father.DeleteFromMyBet(this.curFruitID, this.color);
		this.father.SetBetAni();
	}
}
}
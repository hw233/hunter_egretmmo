namespace zj {
//DoubleColorItem
//yuqingchao
export class DoubleColorItem extends eui.ItemRenderer {
	private imgBoard: eui.Image;
	private imgIcon: eui.Image;
	private lbNameID: eui.Label;
	private imgNode: eui.Image;
	private imgEnd: eui.Image;
	private groupIcon: eui.Group;
	private index: number = null;
	private isMy: boolean = null;
	private enab: boolean = null;
	private groupDown: eui.Group;
	private father: DoubleColorSence;
	public constructor() {
		super();
		this.skinName = "resource/skins/fishing/DoubleColorItemSkin.exml";
		cachekeys(<string[]>UIResource["DoubleColorItem"], null);
		this.groupDown.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupDown, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.father = null;
		}, null)
	}
	public setInfo(index, _father, is_my?: boolean, enab?: boolean) {
		this.imgEnd.visible = false;
		this.index = index;
		this.isMy = is_my;
		this.enab = enab;
		this.father = _father;
		let isRed = index == 4 ? 0 : 1;
		this.imgIcon.source = cachekey(UIConfig.UIConfig_Hunter_DoubleColor.RedOrBlue2[isRed], this);
		if (this.isMy) {
			this.groupIcon.visible = (!(Game.PlayerDoubleBallSystem.my_id[index] == 0));
			this.imgNode.visible = (Game.PlayerDoubleBallSystem.my_id[index] == 0);
			this.lbNameID.text = Game.PlayerDoubleBallSystem.fruitId(Game.PlayerDoubleBallSystem.my_id[index]).toString();
		} else {
			this.groupIcon.visible = true;
			this.lbNameID.text = "?";
			this.imgNode.visible = false;
		}
		// if (enab == true) {
		// 	this.groupDown.touchEnabled = true;
		// } else {
		// 	this.groupDown.touchEnabled = false;
		// }
	}
	public upData() {
		if (this.isMy) {
			let [ann, reward] = Game.PlayerDoubleBallSystem.betReward(Game.PlayerDoubleBallSystem.my_id, Game.PlayerDoubleBallSystem.public_id);
			let isRight = reward[this.index] && 0 || 1;
			let any = Game.PlayerDoubleBallSystem.my_id[this.index];
			this.imgEnd.visible = Game.PlayerDoubleBallSystem.my_id[this.index] != 0;
			this.imgEnd.source = cachekey(UIConfig.UIConfig_Hunter_DoubleColor.RightOrWrong[isRight], this);
		} else {
			this.lbNameID.text = Game.PlayerDoubleBallSystem.public_id[this.index].toString();
		}
	}
	private onGroupDown() {
		if (this.enab) {
			if (this.father.btnOK.enabled){
				this.father.onBtnOk();
			}
		}
	}
}
}
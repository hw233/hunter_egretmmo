namespace zj {
/**
 * @author xing li wei
 * 
 * @date 2019-7-1
 * 
 * @class 滚屏
 */
export class CommonAnnouce extends eui.Component {
	private labelDes: eui.Label;
	private labelBg: eui.Image;
	private string = [];
	private cell;
	private father: AnnouceManger;
	private vis: boolean = true;
	public constructor() {
		super();
		this.skinName = "resource/skins/common/CommonAnnouceSkin.exml";
		this.init();
	}

	private init() {
		this.labelDes.mask = this.labelBg;
		this.addEventListener(egret.Event.ENTER_FRAME, this.Update, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onClose, this);
		this.touchEnabled = false;
	}

	public SetInfo(cell, father) {
		this.father = father;
		let ui = this.getChildByName("__rect_back");
		if (ui) {
			this.removeChild(ui);
		}
		this.cell = cell;
		for (let i = 0; i < cell.length; i++) {
			for (let j = 0; j < cell[i].cellsOrig.length; j++) {
				this.string.push(cell[i].cellsOrig[j]._ui_data);
			}
		}
		if (this.vis == true) {
			this.vis = false;
			this.labelDes.textFlow = Util.RichText(this.string[0]);
			this.labelDes.x = 600;
			this.doAction();
		}
	}

	private doAction() {
		let time_unit = ConstantConfig_Common.actionTime.annouceTime
	}

	private Update() {
		if (!Game.PlayerInfoSystem.playAnnouce) {
			this.string = [];
			this.onClose();
		}
		this.labelDes.x -= 3;
		if (this.labelDes.x <= -this.labelDes.width) {
			this.string.splice(0, 1);
			if (this.string.length == 0) {
				this.onClose();
			} else {
				this.labelDes.textFlow = Util.RichText(this.string[0]);
				this.labelDes.x = 600;
			}
		}
	}

	private onClose() {
		this.removeEventListener(egret.Event.ENTER_FRAME, this.Update, this);
		if (this.father) {
			this.father.CommonAnnouce = null;
		}
		Game.UIManager.AnimationGroup.removeChild(this);
	}
}
}
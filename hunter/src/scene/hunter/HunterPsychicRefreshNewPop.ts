namespace zj {
/**
 * @author xingliwei
 * 
 * @date 2019-7-23
 * 
 * @class 猎人念力修炼选择猎人材料界面
 */
export class HunterPsychicRefreshNewPop extends Dialog {
	public btnClose: eui.Button;
	public listViewDrop: eui.List;
	public btnUse: eui.Button;
	public imgNode: eui.Image;

	private consumeSels;
	private hunterInfo = [];
	private csmCounts;
	private father: commonHunterConsume;
	public constructor() {
		super();
		this.skinName = "resource/skins/hunter/HunterPsychicRefreshNewPopSkin.exml";

		this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUse, this);
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.father = null;
		}, this);
	}

	public SetInfo(consumeSels, hunterInfo, csmCounts, father) {
		this.father = father;
		this.initData(consumeSels, hunterInfo, csmCounts)
		this.initView()
	}

	private initData(consumeSels, hunterInfo, csmCounts) {
		this.consumeSels = consumeSels;
		this.hunterInfo = hunterInfo;
		this.csmCounts = csmCounts;
	}

	private initView() {
		this.initTableView();
	}

	/**加载猎人材料列表 */
	public initTableView() {
		let array = new eui.ArrayCollection();
		for (let i = 0, length = this.hunterInfo.length; i < length; i++) {
			let data = new HunterPsychicRefreshNewPopItemData();
			data.index = i;
			data.consumeSels = this.consumeSels;
			data.hunterInfo = Table.DeepCopy(this.hunterInfo[i]);
			data.csmCounts = this.csmCounts;
			data.father = this;
			array.addItem(data);
		}
		this.listViewDrop.dataProvider = array;
		this.listViewDrop.itemRenderer = HunterPsychicRefreshNewPopItem;

		if (this.hunterInfo.length > 1) {
			this.imgNode.visible = false;
		} else {
			this.imgNode.visible = true;
		}
	}

	private onBtnUse() {
		this.father.SetConsumeSelection(this.consumeSels);
		this.close(UI.HIDE_TO_TOP);
	}

	private onBtnClose() {
		this.father.SetConsumeSelection([]);
		this.close(UI.HIDE_TO_TOP);
	}
}
}
namespace zj {
//ACtivityUplevelActivityPop
//yuqingchao
//2019.04.01
export class ACtivityUplevelActivityPop extends Dialog {
	private index: number;
	private uplevelItems;
	private upLevel;
	private btnClose: eui.Button;		//退出按钮
	private lstView: eui.List;
	private arrayCollection: eui.ArrayCollection;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ACtivityUplevelActivityPopSkin.exml";
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
	}
	public init(index, uplevelItems, upLevel) {
		this.index - index;
		this.uplevelItems = uplevelItems;
		this.upLevel = upLevel;
		Game.PlayerActivitySystem.upLevelRankReward(this.index).then((resq: message.ActivityUpLevelRankItem) => {
			this.setList(resq);
		})
	}
	private setList(rankItem) {
		let rewardNum = [];
		let allNum = 0
		for (let k in this.uplevelItems) {
			let v = this.uplevelItems[k];
			allNum = allNum + v.rewardCount;
			rewardNum.push(v.rewardCount);
		}
		let findLevel = (index) => {
			let level = 0;
			let allNum = 0;
			let add = () => {
				if (rewardNum[level] != null) {
					allNum = allNum + rewardNum[level]
				} else {
					return level + 1
				}
				if (index < allNum) {
					return level
				} else {
					level = level + 1
					return add()
				}
			}
			return add()
		}
		this.arrayCollection = new eui.ArrayCollection();
		for (let i = 0; i < 50; i++) {
			this.arrayCollection.addItem({
				info: rankItem[i],
				i,
				find: findLevel(i)
			})
		}
		this.lstView.dataProvider = this.arrayCollection;
		this.lstView.itemRenderer = ActivityUplevelActivityPopItem;
	}
	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}
}
}
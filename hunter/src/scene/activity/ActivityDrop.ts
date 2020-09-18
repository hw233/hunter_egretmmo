namespace zj {
//兑换活动
//yuqingchao
//2019.04.04
export class ActivityDrop extends UI {
	private info;
	private lbTime: eui.Label;				//活动时间
	private lbInfo: eui.Label;				//活动内容
	private lstItem: eui.List;
	private arrayCollection: eui.ArrayCollection;
	private btnFight: eui.Button;			//前往挑战
	private father: ActivityMain;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityDropSkin.exml";
		this.btnFight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFight, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.father = null;
		}, null);
	}
	public setInfo(info, father) {
		this.info = info;
		this.father = father;
		this.setInfoText();
		this.listView();
	}
	private time(timestamp: number) {
		let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		let Y = date.getFullYear();
		let M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
		let D = date.getDate();
		let h = date.getHours();
		let m = date.getMinutes();
		let s = date.getSeconds();
		return { Y: Y, M: M, D: D, h: h, m: m, s: s };		//年月日时分秒
	}
	private setInfoText() {
		let strOpen = this.time(this.info.openTime);
		let timeOpen;
		if (strOpen.m < 10) {
			timeOpen = strOpen.Y + "-" + strOpen.M + "-" + strOpen.D + "  " + strOpen.h + ":" + "0" + strOpen.m;
		} else {
			timeOpen = strOpen.Y + "-" + strOpen.M + "-" + strOpen.D + "  " + strOpen.h + ":" + strOpen.m;
		}
		let strColse = this.time(this.info.closeTime);
		let timeColse;
		if (strColse.m < 10) {
			timeColse = strColse.Y + "-" + strColse.M + "-" + strColse.D + "  " + strColse.h + ":" + "0" + strColse.m;
		} else {
			timeColse = strColse.Y + "-" + strColse.M + "-" + strColse.D + "  " + strColse.h + ":" + strColse.m;
		}
		this.lbTime.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.timeOpenAndClose, timeOpen, timeColse);
		this.lbInfo.text = singLecraft.decodeGroupName(this.info.des, "&", false);
	}
	private listView() {
		this.arrayCollection = new eui.ArrayCollection();
		for (let i = 0; i < this.info.collectItems.length; i++) {
			this.arrayCollection.addItem({
				info: this.info.collectItems[i],
				father: this
			});
		}
		this.lstItem.dataProvider = this.arrayCollection;
		this.lstItem.itemRenderer = ActivityDropItem;
	}
	private onBtnFight() {
		// loadUI(AdventureMapScene)
		// 	.then((scene: AdventureMapScene) => {
		// 		scene.show(UI.SHOW_FROM_TOP);
		// 	});
		this.father.close(UI.HIDE_TO_TOP);
		SceneManager.instance.EnterAdventure();
	}
	private onRemoveAward() {
		let dialog = this.getChildByName("Item-skill-common");
		if (dialog) this.removeChild(dialog);
	}
}
}
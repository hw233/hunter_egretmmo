namespace zj {
//周末登陆活动Item
//yuqingchao
//2019.03.23
export class ActivityStarSeverItem extends eui.ItemRenderer {
	private imgDay: eui.Image;
	private btnGet: eui.Button;				//领取按钮
	private imgGet: eui.Image;				//已领取图片
	private lstAward: eui.List;
	private arrayCollection: eui.ArrayCollection;
	private info;
	private activities;
	private i: number = 0;
	private father: null;
	private main: ActivityMain;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityStarSeverItemSkin.exml";
		cachekeys(<string[]>UIResource["ActivityStarSeverItem"], null);
		this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.main = null;
			this.father = null;
		}, null);
	}
	protected dataChanged() {
		this.info = this.data.info;
		this.main = this.data.main;
		this.activities = this.data.activities;
		this.i = this.data.i;
		this.father = this.data.father;
		this.imgDay.source = cachekey(UIConfig.UIConfig_Activity.day[this.i + 1], this);
		this.setInfoGoods();
		this.setInfoGet();
	}
	private setInfoGoods() {
		this.arrayCollection = new eui.ArrayCollection();
		for (let i = 0; i < this.info.length; i++) {
			this.arrayCollection.addItem({
				j: i,
				i: this.data.i,
				info: this.info[i],
				main: this.main
			})
		}
		this.lstAward.dataProvider = this.arrayCollection;
		this.lstAward.itemRenderer = ActivityAwardItem;
	}
	private setInfoGet() {
		let [today, isGet] = (this.father as ActivityStarSever).getInfoToday();
		let bStart = (this.father as ActivityStarSever).getInfoStart();
		let bNotGet = this.i + 1 == today && !isGet && bStart;
		let bIsGet = this.i + 1 < today || (this.i + 1 == today && isGet);
		this.btnGet.enabled = bNotGet;
		this.btnGet.visible = !bIsGet;
		this.imgGet.visible = bIsGet;
	}
	private onBtnGet() {
		let [today, isGet] = (this.father as ActivityStarSever).getInfoToday();
		let bStart = (this.father as ActivityStarSever).getInfoStart();
		if (bStart && this.i + 1 == today && !isGet) {
			let type = this.activities.type;
			let index = this.activities.index;
			let rewardIndex = this.data.i;
			Game.PlayerActivitySystem.activityReward(type, index, rewardIndex, true).then((resp: message.GameInfo) => {
				loadUI(CommonGetDialog)
					.then((dialog: CommonGetDialog) => {
						dialog.init(resp.getGoods);
						dialog.show();
						dialog.setCB(() => {
							this.data.father.onLstView();
							Game.EventManager.event(GameEvent.ACTIVITY_TYPE_UPDATE);
						})
					})
			})
		}
	}

	//添加龙骨动画

}
}
namespace zj {
	//累计充值送大礼（特效卡，累计充值）Item
	//yuqingchao
	//2019.03.23
	export class ActivityTopUpActivityItem extends eui.ItemRenderer {
		private btnGet: eui.Button;			//领取按钮
		private imgGet: eui.Image;			//已领取图片
		private lbTitle: eui.Label;			//累计充值
		private lbNum: eui.Label;			//充值钻石数	
		private lstViewAward: eui.List;		//奖励列表
		private arrayCollection: eui.ArrayCollection;
		private saveGet: boolean = false;
		private father: null;
		private main: ActivityMain;
		private activities;
		private i: number = 0;
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityTopUpActivityItemSkin.exml";
			cachekeys(<string[]>UIResource["ActivityTopUpActivityItem"], null);
			this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				this.main = null;
				// this.father = null;
			}, null);
		}
		protected dataChanged() {
			this.i = this.data.i;
			let info = this.data.info;
			this.main = this.data.main;
			let index = this.data.father.index;
			this.activities = this.data.activities;
			this.father = this.data.father;

			let bStart = this.data.father.getInfoStart();				//活动是否开启
			let bIsGet = Table.VIn(this.activities.rewardIndex, this.i + 1);				//已领取
			let bNotGet: boolean = this.data.father.info.itemCount >= this.data.info.rankZone[0] && bIsGet != true && bStart;
			this.lbNum.text = this.data.info.rankZone[0];
			this.btnGet.enabled = bNotGet;
			this.btnGet.visible = !bIsGet;
			this.imgGet.visible = bIsGet;
			if (this.saveGet && bIsGet) {
				this.runActionGet();
			}
			this.saveGet = bNotGet;
			this.setAwardList(info);
		}
		private runActionGet() {
			let bStart = this.data.father.getInfoStart();				//活动是否开启
			let bIsGet = Table.VIn(this.activities.rewardIndex, this.i + 1);				//已领取
			let bNotGet: boolean = this.activities.itemCount >= this.data.info.rankZone[0] && bIsGet;
			// this.lbNum.text = this.data.father.info.rewardZone[this.i];
			this.btnGet.enabled = bNotGet;
			this.btnGet.visible = !bIsGet;
			this.imgGet.visible = bIsGet;
		}
		private setAwardList(info) {
			this.arrayCollection = new eui.ArrayCollection();
			for (let i = 0; i < info.goodsInfo.length; i++) {
				this.arrayCollection.addItem({
					j: i,
					i: this.i,
					info: info.goodsInfo[i],
					main: this.main,
				})
			}
			this.lstViewAward.dataProvider = this.arrayCollection;
			this.lstViewAward.itemRenderer = ActivityAwardItem1;
		}
		private btnEnabled() {
			(this.father as ActivityTopUpActivity).onLstView();
		}
		private onBtnGet() {
			let bStart = this.data.father.getInfoStart();				//活动是否开启
			let bIsGet = Table.VIn(this.activities.rewardIndex, this.data.i + 1);				//已领取
			let bNotGet: boolean = this.activities.itemCount >= this.data.info.rankZone[0] && bIsGet != true && bStart;
			if (bNotGet) {
				this.saveGet = true;
				let any = this.activities;
				let type = this.activities.type;
				let index = this.activities.index;
				let rewardIndex = this.data.i + 1;
				Game.PlayerActivitySystem.activityReward(type, index, rewardIndex, bNotGet).then((resp: message.GameInfo) => {
					loadUI(CommonGetDialog)
						.then((dialog: CommonGetDialog) => {
							dialog.init(resp.getGoods);
							dialog.show();
							dialog.setCB(() => {
								this.btnEnabled();
								Game.EventManager.event(GameEvent.ACTIVITY_TYPE_UPDATE);
							})
						});
				})
			}
		}
	}
}
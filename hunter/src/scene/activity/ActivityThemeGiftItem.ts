namespace zj {
	//ActivityThemeGiftItem
	//yuqingchao
	//2019.03.23
	export class ActivityThemeGiftItem extends eui.ItemRenderer {
		private btnGet: eui.Button;				//领取按钮	
		private imgGet: eui.Image;				//“已领取”图片
		private lsstViewAward: eui.List;
		private arrayCollection: eui.ArrayCollection
		private lbTitle: eui.Label;				//任务
		private father: null;
		private main: ActivityMain;
		private info;
		private alnum: number = 0;
		private activities;
		private i: number;
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityThemeGiftItemSkin.exml";
			cachekeys(<string[]>UIResource["ActivityThemeGiftItem"], null);
			this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				this.main = null;
			}, null);
		}
		protected dataChanged() {
			this.info = this.data.info;			//活动奖励信息
			this.i = this.data.i;
			this.main = this.data.main;
			this.activities = this.data.activities;			//全部信息
			this.father = this.data.father;
			this.setInfoGoods();
			this.setInfoGet(this.activities);
		}
		private setInfoGoods() {
			this.arrayCollection = new eui.ArrayCollection();
			for (let i = 0; i < this.info.rewards.length; i++) {
				this.arrayCollection.addItem({
					j: i,
					i: this.i,
					info: this.info.rewards[i],
					main: this.main,
				})
			}
			this.lsstViewAward.dataProvider = this.arrayCollection;
			this.lsstViewAward.itemRenderer = ActivityAwardItem;
		}
		private setInfoGet(activityInfo) {
			this.alnum = 0;
			this.lbTitle.text = "";
			for (let kk in activityInfo.kvInfos) {
				let vv = activityInfo.kvInfos[kk];
				if (vv.key == this.info.mission_type) {
					this.alnum = vv.value;
				}
			}
			let start = (this.father as ActivityThemeGift).saveStart;
			let starTime: number = 0;
			if (this.info.mission_type < message.ActivityMissionType.ACTIVITY_MISSION_TYPE_END) {
				if (this.info.mission_type == message.ActivityMissionType.ACTIVITY_MISSION_LOGIN && start) {
					this.lbTitle.text = TextsConfig.TextsConfig_Activity.mission_login;
				}
				else if (this.info.mission_type == 37) {
					if (this.alnum < this.info.mission_condition) {
						starTime = 0;
					} else {
						starTime = 1;
					}
					this.lbTitle.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.mission_type_text[this.info.mission_type], this.info.mission_condition)
						+ HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.mission_times, starTime, (this.info.mission_condition / this.info.mission_condition));
				}
				else {
					this.lbTitle.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.mission_type_text[this.info.mission_type], this.info.mission_condition)
						+ HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.mission_times, this.alnum, this.info.mission_condition);
				}
				let beReward = Table.FindK(activityInfo.rewardIndex, this.info.mission_type) != -1;		//已领取
				//可领取
				let canGet = (this.alnum >= this.info.mission_condition || this.info.mission_type == message.ActivityMissionType.ACTIVITY_MISSION_LOGIN) && !beReward && start

				this.imgGet.visible = beReward;
				this.btnGet.visible = !beReward;
				this.btnGet.enabled = canGet;
				if ((this.alnum >= this.info.mission_condition || this.info.mission_type == message.ActivityMissionType.ACTIVITY_MISSION_LOGIN) && start) {
					this.lbTitle.textColor = 0x3CFF00;
				} else {
					this.lbTitle.textColor = 0xFFFFFF;
				}
			}
		}
		private onBtnGet() {
			let type = this.activities.type;
			let index = this.activities.index;
			let rewardIndex = this.info.mission_type;
			Game.PlayerActivitySystem.activityReward(type, index, rewardIndex, false).then((resp: message.GameInfo) => {
				let hasGeneral: boolean = false;
				let goods: message.GoodsInfo = null;
				for (const v of resp.getGoods) {
					if (Math.floor(v.goodsId / 10000) == message.EGoodsType.GOODS_TYPE_GENERAL) {
						hasGeneral = true;
						goods = v;
						break;
					}
				}
				if (hasGeneral && goods != null) {
					loadUI(CommonGetGeneral).then((dialog: CommonGetGeneral) => {
						dialog.setInfo(goods.goodsId, 0, () => {
							loadUI(CommonGetDialog)
								.then((dialog: CommonGetDialog) => {
									dialog.show();
									dialog.init(resp.getGoods);
									dialog.setCB(() => {
										(this.father as ActivityThemeGift).onLstView();
									});
								});
						});
						dialog.show(UI.SHOW_FILL_OUT);
					})
				} else {
					loadUI(CommonGetDialog)
						.then((dialog: CommonGetDialog) => {
							dialog.init(resp.getGoods, null, true);
							dialog.show();
							dialog.setCB(() => {
								(this.father as ActivityThemeGift).onLstView();
								Game.EventManager.event(GameEvent.ACTIVITY_TYPE_UPDATE);
							})
						});
				}
			})
		}

	}
}
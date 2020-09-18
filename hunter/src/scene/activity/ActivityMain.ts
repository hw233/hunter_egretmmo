namespace zj {
	//活动主界面
	//yuqingchao
	//2019.03.23
	export class ActivityMain extends Scene {
		private groupMain: eui.Group;
		public lstViewType: eui.List;
		private btnClose: eui.Button;
		private selectTransferId = 100213
		public dataList = [];
		private arrayCollection: eui.ArrayCollection;
		private timer: egret.Timer;
		private groupBgAni: eui.Group;
		private imgActivity: eui.Image;
		public moveLocation: number = 0;		//列表下拉移动位置
		private scrollerInfo: eui.Scroller;
		private groupJoin: eui.Group;
		private index: number = null;
		private ui: any = {
			"1": <ActivityStarSever>newUI(ActivityStarSever),//周末登陆活动
			"2": <ActivityChargeActivity>newUI(ActivityChargeActivity),//任意充值送好礼
			"3": <ActivityTopUpActivity>newUI(ActivityTopUpActivity),//累计充值
			"6": <ActivityExchangeActivity>newUI(ActivityExchangeActivity),//道具兑换
			"7": <ActivityConsumptionActivity>newUI(ActivityConsumptionActivity),//累计消耗
			"8": <ActivityUplevelActivity>newUI(ActivityUplevelActivity),//开服冲级赢大奖
			"15": <ActivityThemeGift>newUI(ActivityThemeGift),//主题活动
			"18": <ActivityDoubleMouthCard>newUI(ActivityDoubleMouthCard),//购双月卡送A级猎人
			"19": <ActivityDoubleTaver>newUI(ActivityDoubleTaver),//酒馆畅饮
			"22": <Activity_ActivityBoss>newUI(Activity_ActivityBoss),//年兽BOSS入口
			"28": <Activity_InstanceRank >newUI(Activity_InstanceRank),//随机副本(鼠崽闹春)
			"29": <Activity_redPackage>newUI(Activity_redPackage),//抢红包
			"30": <ActivityDoublGemstone>newUI(ActivityDoublGemstone),//双倍钻石
		}
		private id;
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityMainSkin.exml";
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnclose, this);
			this.lstViewType.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLstViewType, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
			Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			Game.EventManager.on(GameEvent.ACTIVITY_TYPE_UPDATE, this.updateTips, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
				Game.EventManager.off(GameEvent.ACTIVITY_TYPE_UPDATE, this.updateTips, this);
				egret.Tween.removeTweens(this.imgActivity);
				if (this.timer) this.timer.stop();
				for (let k in this.ui) {
					let v: UI = this.ui[k];
					v.close();
				};
				this.ui = {};
			}, null);
			this.init();
		}
		public init(id?: number) {
			this.groupBgAni.removeChildren();
			this.lstViewType.selectedIndex = 0;
			this.setSort();
			this.setInit();
			this.setInfo();
			this.SetInfoSwitch();
			this.id = this.dataList[this.lstViewType.selectedIndex];
			Game.DragonBonesManager.playAnimation(this, "hd_tongyong_biaotidiban", "armatureName", null, 0).then(display => {
				this.groupBgAni.addChild(display);
			}).catch(reason => {
				toast(reason);
			});
			egret.Tween.get(this.imgActivity, { loop: true })
				.to({ y: 36 }, 500)
				.to({ y: 40 }, 1000)
				.to({ y: 38 }, 500);
			if (this.id != "double token") {
				if (this.id != null) {
					this.ui[this.id.type].setInfo(this.dataList[this.lstViewType.selectedIndex], this);
					this.getItemUi(this.lstViewType.selectedIndex);
					if (this.dataList[this.lstViewType.selectedIndex].type == 19) {
						this.ui[this.id.type].init();
					}
				}
			} else {
				this.getItemUi(this.lstViewType.selectedIndex);
			}
			if (id != null) {
				let index: number;
				for (let i = 0; i < this.dataList.length; i++) {
					if (id == this.dataList[i].type) {
						index = i;
						this.lstViewType.selectedIndex = i;
					}
				}
				if (index == null || index == undefined) {
					toast_warning("活动暂未开启");
					return;
				}
				this.ui[id].setInfo(this.dataList[index], this);
				this.join(id);
				return;
			}
			this.join();
			Tips.tips_25_set(false);
			Tips.SetTipsOfId(Tips.TAG.ACTIVITY);
		}
		private updateTips() {
			Tips.SetTipsOfAllActivity();
			Tips.tips_25_set(false);
			Tips.SetTipsOfId(Tips.TAG.ACTIVITY);
		}
		private setSort() {
			let sortByValue = (a, b) => {
				let itemA = this.getLoginTime(a.openTime, a.closeTime);
				let itemB = this.getLoginTime(b.openTime, b.closeTime);

				if (a.topTime == b.topTime) {
					if (itemA == itemB) {
						if (a.type == b.type) {
							return b.index - a.index
						}
						else {
							return b.type - a.type;
						}
					}
					else {
						return itemB - itemA
					}
				}
				else {
					return b.topTime - a.topTime
				}
			}
			Game.PlayerActivitySystem.Activities.sort(sortByValue);
		}
		public setInit(down?: boolean) {
			this.dataList = PlayerActivitySystem.GetActivityUI();
			let findcollect = Table.FindR(Game.PlayerActivitySystem.Activities, function (k, v) {
				let arr = v.collectItems;
				return v.type == message.ActivityType.ACT_TYPE_COLLECT && v.collectItems.length != 0;
			})[0]
			if (findcollect != null) {
				let collectClientData = Table.DeepCopy(findcollect);
				collectClientData.bClient = true
				this.dataList.push(collectClientData);					//搜集兑换
			}
			this.dataList.push("double token");
			for (let k in this.dataList) {
				let v = this.dataList[k];
				this.dataList[k].quality = 1;
				if (v.type == null) {
					if (v[0] == "gift bag") {
						if (!Tips.tips_useTime_get(Tips.SAVE.GIFT_BAG_ACTIVITY)) {
							this.dataList[k].quality = 0;
						} else {
							this.dataList[k].quality = 3;
						}
					}
					else if (v[0] == "double token") {
						if (!Tips.tips_useTime_get(Tips.SAVE.DOUBLE_TOKEN_ACTIVITY)) {
							this.dataList[k].quality = 0;
						} else {
							this.dataList[k].quality = 3;
						}
					}
					else {
						if (v.topTime != null && v.topTime != 0) {
							this.dataList[k].quality = 4;
						}
					}
				}
			}
			let sortByValue = (a, b) => {
				//活动排序 topTime > 客户端活动有红点 > 其他服务器活动 >  客户端活动没红点
				let itemA = this.getLoginTime(a.openTime, a.closeTime);
				let itemB = this.getLoginTime(b.openTime, b.closeTime);
				a.topTime = a.topTime == null && 0 || a.topTime;
				b.topTime = b.topTime == null && 0 || b.topTime;
				if (a.quality == b.quality) {
					if (a.topTime == b.topTime) {
						if (itemA > 0 && itemB > 0)
							return itemB - itemA;
						else {
							return itemA - itemB;
						}
					}
					else {
						return b.topTime - a.topTime;
					}
				}
				else {
					return b.quality - a.quality;
				}
			}
			this.dataList.sort(sortByValue);
			if (down == true) {
				this.onLstViewType();
			}
		}

		private isCollectUI: boolean = false; // 是否为前往收集活动UI
		private getItemUi(index) {
			let info = this.dataList[index];
			let ui = null;
			if (info.type == null) {
				if (info == "gift bag") {

				} else if (info == "double token") {
					//双倍钻石
					this.groupJoin.addChild(this.ui[30]);
					this.ui[30].setInfo(this.dataList[this.lstViewType.selectedIndex], this);
				}
			} else if (info.type == message.ActivityType.ACT_TYPE_COLLECT && info.bClient) {
				this.groupJoin.removeChildren();
				this.ui["drop"] = new ActivityDrop();
				this.ui["drop"].setInfo(this.dataList[this.lstViewType.selectedIndex], this);
				this.groupJoin.addChild(this.ui["drop"]);
				this.isCollectUI = true;
			}
		}
		private setInfo() {
			this.setInfoType();
		}
		private setInfoType() {
			this.arrayCollection = new eui.ArrayCollection();
			for (let k in this.dataList) {
				let v = this.dataList[k];
				this.arrayCollection.addItem({
					k,
					info: v
				})
			}
			this.lstViewType.dataProvider = this.arrayCollection;
			this.lstViewType.itemRenderer = ActivityMainItem;

			this.scrollerInfo.viewport = this.lstViewType;
			this.scrollerInfo.validateNow();
			this.scrollerInfo.viewport.scrollV = this.moveLocation;
		}
		private SetInfoSwitch(num?) {
			if (num == null || num == undefined) {
				for (let k in this.dataList) {
					let v = this.dataList[k];
					this.index = Number(k);
				}
			} else {
				this.index = num;
			}
			let dList = this.dataList;
			let id = this.index;
			let activity_index = Table.FindR(Game.PlayerActivitySystem.Activities, function (k, v) {
				return v.index == dList[id].index && v.type == dList[id].type;
			})[1];
			if (activity_index != null) {

			}
			if (this.dataList[this.index].type != null && this.dataList[this.index].bClient != true) {
				//已经开启,点击后，红点消失
				if (Game.Controller.curServerTime > 0
					&& Game.PlayerActivitySystem.Activities[activity_index].openTime <= Game.Controller.curServerTime
					&& Game.PlayerActivitySystem.Activities[activity_index].closeTime > Game.Controller.curServerTime) {
					//设置红点被点击
					let a = this.dataList[this.index].type;
					let b = this.dataList[this.index].index;
					Tips.tips_activity_set(this.dataList[this.index].type, this.dataList[this.index].index);
					//设置活动红点
					Tips.SetTipsOfId(Tips.TAG.ACTIVITY);
				}
			} else {
				if (this.dataList[this.index] == "double token") {
					//双倍钻石红点
					Tips.tips_useTime_set(Tips.SAVE.DOUBLE_TOKEN_ACTIVITY);
				} else if (this.dataList[this.index].bClient == true && this.dataList[this.index].type == message.ActivityType.ACT_TYPE_COLLECT) {
					let tip_index = this.dataList[this.index].openTime
					Tips.tips_oneday_set(tip_index, true);
				}
			}
		}
		private getLoginTime(open, close) {
			open = open == null && Game.PlayerInstanceSystem.curServerTime || open;
			close = close == null && Game.PlayerInstanceSystem.curServerTime || close;
			let start = open - Game.PlayerInstanceSystem.curServerTime;
			let stop = close - Game.PlayerInstanceSystem.curServerTime;
			let str, color = null;
			if (start > 0) 			//活动未开启 
				return -start
			else                	//活动已开启
				return stop
		}
		public onLstViewType(id?: number) {
			// this.setInit();
			this.isCollectUI = false;
			this.scrollerInfo.viewport = this.lstViewType;
			this.scrollerInfo.validateNow();
			this.moveLocation = this.scrollerInfo.viewport.scrollV;
			this.setInfoType();
			this.id = this.dataList[this.lstViewType.selectedIndex];
			this.join();
			this.SetInfoSwitch(this.lstViewType.selectedIndex);
			if (this.id != "double token") {
				if (this.id != null) {
					this.ui[this.id.type].setInfo(this.dataList[this.lstViewType.selectedIndex], this);
					this.getItemUi(this.lstViewType.selectedIndex);
					if (this.dataList[this.lstViewType.selectedIndex].type == 19) {
						this.ui[this.id.type].init();
					}
				}
			} else {
				this.getItemUi(this.lstViewType.selectedIndex);
			}
			this.updateTips();

		}
		public openDown = () => {
			egret.Tween.get(this.groupMain).to({ scaleX: 0.9, scaleY: 0.9 }, 300);
		};

		public closeUp = () => {
			egret.Tween.get(this.groupMain).to({ scaleX: 1, scaleY: 1 }, 200);
		};
		public join(id?: number) {
			if (this.isCollectUI) return;
			this.groupJoin.removeChildren();
			if (this.id == "double token") {
				this.groupJoin.addChild(this.ui[30]);
			}
			if (this.ui[this.id.type] == null) {
				return;
			}
			if (id != null) {
				this.groupJoin.addChild(this.ui[id]);
				return;
			}
			this.groupJoin.addChild(this.ui[this.id.type]);
		}

		private removeShow() {
			let show = this.getChildByName("details");
			if (show) {
				this.removeChild(show);
			}
		}

		private showGoodsProperty(ev: egret.Event) {
			if (Game.UIManager.dialogCount() >= 1) return;
			let ui = this.getChildByName("details");
			if (ui) {
				return;
			}
			let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
			show.name = "details";
			this.addChild(show);
		}

		public onBtnclose() {
			this.close(UI.HIDE_TO_TOP);
		}
	}
}
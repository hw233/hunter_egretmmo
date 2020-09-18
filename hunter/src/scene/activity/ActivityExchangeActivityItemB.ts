namespace zj {
	//兑换活动
	//yuqingchao
	//2019.05.28
	export class ActivityExchangeActivityItemB extends eui.ItemRenderer {
		private info;
		private index: number = 0;
		private btnGet: eui.Button;			//兑换按钮
		private imgGot: eui.Image;			//售罄图片
		private lbLimit: eui.Label;			//限购次数
		private labelHasChange: eui.Label;  //已兑次数
		private imgEqual: eui.Image;
		// private lbBeforNum: eui.Label;		//收集个数/总个数
		private lstItem0: eui.List;
		private arrItem0: eui.ArrayCollection;
		private lstItem1: eui.List;
		private arrItem1: eui.ArrayCollection;
		private exchangeInfo;
		private goods;
		private bRefresh: boolean = false;
		private canGet: boolean = false;
		private saveGet: boolean = false;
		private father: null;
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityExchangeActivityItemBSkin.exml";
			cachekeys(<string[]>UIResource["ActivityExchangeActivityItemB"], null);
			this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				// this.father = null;
			}, null);
		}
		protected dataChanged() {
			this.index = this.data.i;
			this.info = this.data.info;
			this.father = this.data.father;
			this.exchangeInfo = this.info.exchanges[this.index];
			this.goods = this.exchangeInfo.goodsInfo;
			if (!this.bRefresh) {
				this.setInfoGoods();
				this.bRefresh = true;
			}
			this.setInfoGet();
		}
		private setInfoGoods() {
			this.arrItem0 = new eui.ArrayCollection();
			this.arrItem1 = new eui.ArrayCollection();
			for (let i = 0; i < 2; i++) {
				if (i == 1) {
					this.arrItem0.addItem({
						index: i,
						info: this.exchangeInfo.goodsInfo[0],
					});
				} else {
					this.arrItem1.addItem({
						index: i,
						info: this.exchangeInfo.exchangeInfo[0]
					});
				}
			}
			this.lstItem0.dataProvider = this.arrItem0;
			this.lstItem0.itemRenderer = ActivityAwardItemB;
			this.lstItem1.dataProvider = this.arrItem1;
			this.lstItem1.itemRenderer = ActivityAwardItemB;
		}
		private setInfoGet() {
			let itemSet01 = PlayerItemSystem.Set(this.exchangeInfo.exchangeInfo[0].goodsId) as any;
			let item01_get = Game.PlayerItemSystem.itemCount(this.exchangeInfo.exchangeInfo[0].goodsId);
			let item01_getStr = itemSet01.Count;
			let item01_num = this.exchangeInfo.exchangeInfo[0].count;
			// this.lbBeforNum.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.get, item01_getStr, item01_num);
			// if (item01_get < item01_num) {
			// 	this.lbBeforNum.textColor = ConstantConfig_Common.Color.red;
			// } else {
			// 	this.lbBeforNum.textColor = ConstantConfig_Common.Color.green;
			// }
			this.canGet = item01_get >= item01_num;
			//活动时间
			let bStart = (this.father as ActivityExchangeActivity).getInfoStart();
			let bIsGet: boolean = false;
			for (let i = 0; i < Game.PlayerActivitySystem.Activities.length; i++) {
				if (Game.PlayerActivitySystem.Activities[i].index == this.info.index) {
					for (let j = 0; j < Game.PlayerActivitySystem.Activities[i].kvInfos.length; j++) {
						if (Game.PlayerActivitySystem.Activities[i].kvInfos[j].key == this.exchangeInfo.index && Game.PlayerActivitySystem.Activities[i].kvInfos[j].value >= this.exchangeInfo.exchangeCount) {
							bIsGet = true;
						}
					}
					break;
				}
			}

			// let bIsGet = Table.FindF(Game.PlayerActivitySystem.Activities[this.index].kvInfos, (k, v) => {
			// 	return v.key == this.exchangeInfo.index && v.value >= this.exchangeInfo.exchangeCount;
			// });
			let bNotGet = this.canGet && !bIsGet && bStart;
			// let getVar = Table.FindR(Game.PlayerActivitySystem.Activities[this.index].kvInfos, (k, v: message.IIKVPairs) => {
			// 	return v.key == this.exchangeInfo.index;
			// })[0];
			let getVar;
			for (let i = 0; i < Game.PlayerActivitySystem.Activities.length; i++) {
				if (Game.PlayerActivitySystem.Activities[i].index == this.info.index) {
					for (let j = 0; j < Game.PlayerActivitySystem.Activities[i].kvInfos.length; j++) {
						if (this.exchangeInfo.index == Game.PlayerActivitySystem.Activities[i].kvInfos[j].key) {
							getVar = Game.PlayerActivitySystem.Activities[i].kvInfos[j];
						}
					}
					break;
				}
			}
			let getNum = null;
			if (getVar == null) {
				getNum = 0;
			} else {
				getNum = getVar.value
			}
			// this.lbLimit.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.get, getNum, this.exchangeInfo.exchangeCount);
			this.lbLimit.text = "活动期间可兑换" + this.exchangeInfo.exchangeCount + "次";
			this.labelHasChange.text = "已兑" + getNum + "次";
			this.btnGet.enabled = bNotGet;
			this.labelHasChange.visible = bNotGet;
			this.imgGot.visible = bIsGet;

			// if (this.saveGet && bIsGet) {
			// 	this.runActionGet();
			// }
			this.saveGet = bNotGet;
		}
		private runActionGet() { };
		private onBtnGet() {
			let type = this.info.type;
			let index = this.info.index;
			let rewardIndex = this.exchangeInfo.index;
			Game.PlayerActivitySystem.activityReward(type, index, rewardIndex, false).then((resp: message.GameInfo) => {
				setTimeout(() => {
					loadUI(CommonGetDialog)
						.then((dialog: CommonGetDialog) => {
							dialog.init(resp.getGoods);
							dialog.show();
							dialog.setCB(() => {
								this.data.father.setInfoAward();
							})
						});
				}, 300)
			})
		}
	}
}
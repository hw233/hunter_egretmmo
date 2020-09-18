namespace zj {
	export class HXH_InstanceSweepFive extends Dialog {
		private groupTableViewDrops: eui.Group;
		private scroller: eui.Scroller;
		private list: eui.List;
		private labelTTF: eui.Label;
		private btnGet: eui.Button;

		public listSize: number = 0;
		public bNeedAdd: boolean = true;
		private timer: egret.Timer = new egret.Timer(1000, 0); // 创建一个计时器对象
		private sweepOrg: Array<message.SweepGoods> = [];
		public sweepDrps: Array<Array<message.GoodsInfo>> = [];
		private isWanted: boolean;
		public father: any;
		private callBack: () => void;

		private listData: eui.ArrayCollection = new eui.ArrayCollection();

		public constructor() {
			super();
			this.skinName = "resource/skins/adventureMap/HXH_InstanceSweepFiveSkin.exml";
			this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
			this.timer.addEventListener(egret.TimerEvent.TIMER, this.updateList, this);
			this.timer.start();
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveDialog, this);
			this.listData.removeAll();
		}

		public setSweepGoods(sweeps: Array<message.SweepGoods>, exps: Array<message.GoodsInfo>) {

			this.sweepOrg = sweeps;
			this.sweepDrps = [];
			for (let i = 0; i < sweeps.length; i++) {
				this.sweepDrps[i] = [];
				let goodsInfo = sweeps[i].goodsInfo;
				for (let j = 0; j < goodsInfo.length; j++) {
					let good = goodsInfo[j];
					this.sweepDrps[i].push(good);
				}
			}
			let tblExp = []; // 临时table 用于存储经验物品
			let tblBasic = []; // 存储基础奖励 经验
			for (let i = 0; i < exps.length; i++) {
				let good = exps[i];
				if (PlayerItemSystem.ItemType(good.goodsId) == message.EGoodsType.GOODS_TYPE_RESOURCE) {
					tblBasic.push(good);
				}
				else {
					tblExp.push(good);
				}
			}

			this.sweepDrps.push(tblExp); // 经验补偿
			this.sweepDrps.push(tblBasic); // 基础收益
			this.listSize = this.sweepDrps.length - 1;
		}

		private deleteFun() {
			let levelUp = Game.PlayerInfoSystem.BaseInfo.level > Game.PlayerInfoSystem.baseInfo_pre.level;
			this.father.FreshInfo();
		}

		private onBtnGet() {
			this.timer.stop();
			this.timer.removeEventListener(egret.TimerEvent.TIMER, this.updateList, this);
			if (Game.PlayerInfoSystem.BaseInfo.level > Game.PlayerInfoSystem.baseInfo_pre.level) {
				egret.Tween.get(this).wait(200).call(() => {
					TipManager.LevelUp();
				});
			}
			if (this.callBack) {
				this.callBack();
			}
			// this.father.FreshInfo();
			this.close(UI.HIDE_TO_TOP);
		}

		private loadList() {
			if (this.listSize > 0) {
				if (this.bNeedAdd == true) {
					this.listData.removeAll();
					for (let i = 0; i < this.sweepDrps.length - 1; i++) {
						let itemData = new HXH_InstanceSweepFiveItemData();
						itemData.index = i;
						itemData.father = this;
						this.listData.addItem(itemData);
						this.bNeedAdd = false;
						this.listSize = this.listSize - 1;
						if (this.listSize == 0) {
							itemData = new HXH_InstanceSweepFiveItemBData();
							itemData.index = i;
							itemData.father = this;
							this.listData.addItem(itemData);
							this.bNeedAdd = false;
						}
					}
					this.list.dataProvider = this.listData;
					this.list.itemRendererFunction = this.listItemRenderer;
				}
			}
		}

		private listItemRenderer(data: HXH_InstanceSweepFiveItemData | HXH_InstanceSweepFiveItemBData) {
			if (data instanceof HXH_InstanceSweepFiveItemData) {
				return HXH_InstanceSweepFiveItem;
			}
			else {
				return HXH_InstanceSweepFiveItemB;
			}
		}

		private i: number = 0;

		private updateList() {
			if (this.listSize >= 0) {
				if (this.bNeedAdd == true) {
					if (this.listSize > 0) {
						let itemData = new HXH_InstanceSweepFiveItemData();
						itemData.index = this.i;
						itemData.father = this;
						this.listData.addItem(itemData);
						this.bNeedAdd = false;
						this.listSize = this.listSize - 1;
						this.i += 1;
						if (this.i >= 3) {
							// this.scroller.viewport.scrollV += 160;
							this.list.scrollV += 160;
						}
					}
					else if (this.listSize == 0) {
						let itemData = new HXH_InstanceSweepFiveItemBData();
						itemData.index = this.i;
						itemData.father = this;
						this.listData.addItem(itemData);
						this.bNeedAdd = false;
						this.listSize = this.listSize - 1;
						// this.scroller.viewport.scrollV += 75;
						this.list.scrollV += 75;
					}
					this.list.dataProvider = this.listData;
					this.list.itemRendererFunction = this.listItemRenderer;
				}
			}

			// this.scroller.viewport = this.list;
			// this.scroller.validateNow();

			if (this.listSize < 0) {
				this.timer.stop();
				this.timer.removeEventListener(egret.TimerEvent.TIMER, this.updateList, this);
			}
			this.scroller.touchEnabled = this.listSize <= 0;
		}

		private setWantedSweepGoods(goods) {
			this.isWanted = true;
			// egret.clearTimeout(this.timer);
			for (let [v, k] of HelpUtil.GetKV(goods)) {

			}
		}

		private onRemoveDialog() {
			let dialog = this.getChildByName("DropOrAward") as Common_Item;
			if (dialog) this.removeChild(dialog);
		}


		public setCB(cb: () => void) {
			this.callBack = cb;
		}

	}

}
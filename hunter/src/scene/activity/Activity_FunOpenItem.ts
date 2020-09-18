namespace zj {
	/**
	 * @class 功能开启得奖Item
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-02
	 */
	export class Activity_FunOpenItem extends eui.ItemRenderer {
		private imgFunOpenIcon: eui.Image;
		private groupGoods1: eui.Group;
		private imgAwardFrame1: eui.Image;
		private imgAwardIcon1: eui.Image;
		private labelAwardNum1: eui.BitmapLabel;
		private groupGoods2: eui.Group;
		private imgAwardFrame2: eui.Image;
		private imgAwardIcon2: eui.Image;
		private labelAwardNum2: eui.BitmapLabel;
		private labelFunName: eui.Label;
		private labelFunTip: eui.Label;
		private labelLevelState: eui.Label;
		private btnGet: eui.Button;
		private imgGet: eui.Image;

		private tbl: TableUplevelReward = null;

		public constructor() {
			super();
			this.skinName = "resource/skins/activity/Activity_FunOpenItemSkin.exml";
			cachekeys(<string[]>UIResource["Activity_FunOpenItem"], null);
			this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
			this.groupGoods1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty1, this);
			this.groupGoods2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty2, this);
		}

		protected dataChanged() {
			this.updateView(this.data);
		}

		private updateView(data: Activity_FunOpenItemData) {
			if (data.info == null) return;
			this.imgFunOpenIcon.source = cachekey(data.info.path, this);
			this.labelFunName.text = data.info.name;
			this.labelFunTip.text = "玩家达到" + data.info.condition + "级解锁"; //data.info.unopen_tip;
			this.labelLevelState.textColor = Game.PlayerInfoSystem.BaseInfo.level >= data.info.condition ? 0x1B7F01 : 0xff0000;
			this.labelLevelState.text = "(" + Game.PlayerInfoSystem.BaseInfo.level + "/" + data.info.condition + ")";

			for (const key in TableUplevelReward.Table()) {
				if (TableUplevelReward.Table().hasOwnProperty(key)) {
					const element = TableUplevelReward.Table()[key];
					if (element.index > 1000) {
						if (element.level == data.info.condition) {
							this.tbl = element;
							break;
						}
					}
				}
			}

			let itemSet1 = PlayerItemSystem.Set(this.tbl.level_reward[0][0], null, this.tbl.level_reward[0][1]) as any;
			let itemSet2 = PlayerItemSystem.Set(this.tbl.level_reward[1][0], null, this.tbl.level_reward[0][1]) as any;
			this.imgAwardFrame1.source = cachekey(itemSet1.Frame, this);
			this.imgAwardFrame2.source = cachekey(itemSet2.Frame, this);
			this.imgAwardIcon1.source = cachekey(itemSet1.Path, this);
			this.imgAwardIcon2.source = cachekey(itemSet2.Path, this);
			this.labelAwardNum1.text = this.tbl.level_reward[0][1].toString();
			this.labelAwardNum2.text = this.tbl.level_reward[1][1].toString();

			let levelReward = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.levelReward, (k, v) => {
				return v == this.tbl.index;
			});
			if (levelReward) { // 已经领取过奖励
				this.btnGet.enabled = false;
				this.btnGet.visible = false;
				this.imgGet.visible = true;
				// this.btnGet.currentState = "disabled1";
				let btnLabel = <eui.Label>this.btnGet.getChildAt(this.btnGet.numChildren - 1);
				if (btnLabel) btnLabel.text = "已领取";
			}
			else { // 没领取奖励
				if (Game.PlayerInfoSystem.BaseInfo.level >= data.info.condition) { // 满足领奖条件
					this.btnGet.enabled = true;
					this.btnGet.visible = true;
					this.imgGet.visible = false;
					// this.btnGet.currentState = "up";
					let btnLabel = <eui.Label>this.btnGet.getChildAt(this.btnGet.numChildren - 1);
					if (btnLabel) btnLabel.text = "领取";
				}
				else { // 未满足领奖条件
					this.btnGet.enabled = false;
					this.btnGet.visible = true;
					this.imgGet.visible = false;
					// this.btnGet.currentState = "disabled";
					let btnLabel = <eui.Label>this.btnGet.getChildAt(this.btnGet.numChildren - 1);
					if (btnLabel) btnLabel.text = "领取";
				}
			}
		}

		private onBtnGet() {
			let self = this;
			Game.PlayerActivitySystem.upLevelReward(this.tbl.index).then((value: message.GameInfo) => {
				loadUI(CommonGetDialog).then((dialog: CommonGetDialog) => {
					dialog.init(value.getGoods);
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setCB(() => {
						self.data.father.setInfoList();
						Game.EventManager.event(GameEvent.GET_LEVELUP_REWARD);
					});
				});
			});
		}

		private onShowGoodProperty1(e: egret.TouchEvent) {
			let goodsInfo: message.GoodsInfo = new message.GoodsInfo();
			goodsInfo.goodsId = this.tbl.level_reward[0][0];
			goodsInfo.count = this.tbl.level_reward[0][1];
			Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
		}

		private onShowGoodProperty2(e: egret.TouchEvent) {
			let goodsInfo: message.GoodsInfo = new message.GoodsInfo();
			goodsInfo.goodsId = this.tbl.level_reward[1][0];
			goodsInfo.count = this.tbl.level_reward[1][1];
			Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
		}
	}

	export class Activity_FunOpenItemData {
		index: number;
		info: TableFunctionOpen;
		father: Activity_FunOpen;
	}
}
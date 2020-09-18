namespace zj {
	/**
	 * @class 通行证主界面奖励UI 每级奖励Item
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-20
	 */
	export class HXH_BattlePassRewardItem extends eui.ItemRenderer {
		private groupLow: eui.Group;
		private imgBoardLow: eui.Image;
		private imgIconLow: eui.Image;
		private labelNumLow: eui.BitmapLabel;
		private imgGetLow: eui.Image;
		private imgBlackLow: eui.Image;
		private groupAni1: eui.Group;
		private groupHigh: eui.Group;
		private imgBoardHigh: eui.Image;
		private imgIconHigh: eui.Image;
		private labelNumHigh: eui.BitmapLabel;
		private imgGetHigh: eui.Image;
		private imgBlackHigh: eui.Image;
		private groupAni2: eui.Group;
		private groupLv: eui.Group;
		private labelPassLv: eui.Label;
		private imgBlackLv: eui.Image;

		private index: number;
		private info: TablePermitReward;
		private high: boolean;
		private father: HXH_BattlePassGift;

		public constructor() {
			super();
			this.skinName = "resource/skins/battlePass/HXH_BattlePassRewardItemSkin.exml";
			cachekeys(<string[]>UIResource["HXH_BattlePassRewardItem"], null);
			this.groupLow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonCheckLow_CallBack, this);
			this.groupLow.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ButtonCheckLow_OnTouchDown, this);
			this.groupHigh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonCheckHigh_CallBack, this);
			this.groupHigh.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ButtonCheckHigh_OnTouchDown, this);
		}

		protected dataChanged() {
			this.updateView(this.data);
		}

		private updateView(data: HXH_BattlePassRewardItemData) {
			this.index = data.index;
			this.info = data.info;
			this.high = data.high;
			this.father = data.father;

			this.imgBlackLv.visible = data.index > Game.PlayerInfoSystem.BaseInfo.permitLevel && data.high == null;
			this.labelPassLv.text = "Lv." + data.index;
			let itemSetL = PlayerItemSystem.Set(data.info.free_reward[0], null, data.info.free_reward[1]) as any;
			let itemSetH = PlayerItemSystem.Set(data.info.pay_reward[0], null, data.info.pay_reward[1]) as any;

			// 免费通行证奖励是否领取
			let findLow = Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.indexOf(data.index) != -1;

			// 高级通行证奖励是否领取
			let findHigh = Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.indexOf(data.index) != -1;

			this.imgBlackLow.visible = data.index > Game.PlayerInfoSystem.BaseInfo.permitLevel;
			this.imgBlackHigh.visible = Game.PlayerInfoSystem.BaseInfo.permitLevel < data.index || Game.PlayerInfoSystem.BaseInfo.permitPay == 0;

			this.imgGetLow.visible = findLow;
			this.imgGetHigh.visible = findHigh;

			if (itemSetL != null) {
				this.imgBoardLow.source = cachekey(itemSetL.Frame, this);
				this.imgIconLow.source = cachekey(itemSetL.Path, this);
				this.labelNumLow.text = data.info.free_reward[1].toString();
				this.groupLow.visible = true;
			}
			else {
				this.groupLow.visible = false;
			}

			if (itemSetH != null) {
				this.imgBoardHigh.source = cachekey(itemSetH.Frame, this);
				this.imgIconHigh.source = cachekey(itemSetH.Path, this);
				this.labelNumHigh.text = data.info.pay_reward[1].toString();
				this.groupHigh.visible = true;
			}
			else {
				this.groupHigh.visible = false;
			}

			if (!this.selected) {
				this.groupAni1.removeChildren();
				this.groupAni2.removeChildren();
			}
			else {
				if (this.father.touchWhich == TOUCHWHICH.default) {
					this.SetSelect(data.index, Game.PlayerInfoSystem.BaseInfo.permitPay == 1);
				}
				else {
					if (this.father.touchWhich != TOUCHWHICH.right) this.SetSelect(data.index, this.father.touchWhich == TOUCHWHICH.low ? false : (this.father.touchWhich == TOUCHWHICH.high ? true : false));
				}
			}
		}

		private ButtonCheckLow_CallBack() {
			if (!this.high) {
				this.father.touchWhich = TOUCHWHICH.low;
				this.SetSelect(this.index, false);
				Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_REWARD, { goodsId: this.info.free_reward[0], count: this.info.free_reward[1], is_senior: false, level: this.index });
			}
		}

		private ButtonCheckHigh_CallBack() {
			if (!this.high) {
				this.father.touchWhich = TOUCHWHICH.high;
				this.SetSelect(this.index, true);
				Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_REWARD, { goodsId: this.info.pay_reward[0], count: this.info.pay_reward[1], is_senior: true, level: this.index });
			}
		}

		private ButtonCheckLow_OnTouchDown() {
			if (this.high) {
				Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_REWARD, { goodsId: this.info.free_reward[0], count: this.info.free_reward[1], is_senior: false, level: this.index, isRight: true });
			}
		}

		private ButtonCheckHigh_OnTouchDown() {
			if (this.high) {
				Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_REWARD, { goodsId: this.info.pay_reward[0], count: this.info.pay_reward[1], is_senior: true, level: this.index, isRight: true });
			}
		}

		private SetSelect(level: number, enabled: boolean) {
			this.groupAni1.removeChildren();
			this.groupAni2.removeChildren();
			if (this.selected) {
				if (this.index == level && !enabled) this.addAnimation(this.groupAni1);
				if (this.index == level && enabled) this.addAnimation(this.groupAni2);
			}
		}

		private addAnimation(group: eui.Group) {
			Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0).then(display => {
				display.name = "selAni";
				display.scaleX = 0.8;
				display.scaleY = 0.8;
				group.addChild(display);
			}).catch(reason => {
				toast(reason);
			});
		}
	}

	export class HXH_BattlePassRewardItemData {
		index: number;
		info: TablePermitReward;
		father: HXH_BattlePassGift;
		high: boolean;
	}
}
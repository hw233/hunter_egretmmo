namespace zj {
	export enum TOUCHWHICH {
		low = 1, // 标准通行证奖励
		high = 2, // 高级通行证奖励
		right = 3, // 右侧10级奖励
		default = 4 // 初始状态
	}

	/**
	 * @class 通行证主界面奖励UI
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-16
	 */
	export class HXH_BattlePassGift extends UI {
		private groupLeftTop: eui.Group;
		private imgTipPass: eui.Image;
		private imgExpBar: eui.Image;
		private barMask: eui.Rect;
		private labelLvNow: eui.BitmapLabel;
		private labelExp: eui.Label;
		private btnPassUp: eui.Button;
		private btnExpUp: eui.Button;
		private groupRight: eui.Group;
		private labelSeason: eui.BitmapLabel;
		private labelOver: eui.Label;
		private groupShow: eui.Group;
		private imgFrame: eui.Image;
		private imgIcon: eui.Image;
		private labelItemName: eui.Label;
		private labelItemDes: eui.Label;
		private labelNum: eui.BitmapLabel;
		private btnGetGift: eui.Button;
		private groupSoul: eui.Group;
		private groupNotBuy: eui.Group;
		private imgHighPass1: eui.Image;
		private btnCheckGift: eui.Button;
		private groupLeftBottom: eui.Group;
		private groupHighPassLock: eui.Group;
		private btnHighUnLock: eui.Button;
		private scrollerItemA: eui.Scroller;
		private listItemA: eui.List;
		private listItemB: eui.List;

		private size: number;
		private offestLevel: number;
		private rewardList: Array<TablePermitReward>;
		private listItemAData: eui.ArrayCollection;
		private listItemBData: eui.ArrayCollection;
		private level: number = 0;
		private is_senior: boolean;
		private itemIndex: number;
		public touchWhich: number = TOUCHWHICH.default;

		public constructor() {
			super();
			this.skinName = "resource/skins/battlePass/HXH_BattlePassGiftSkin.exml";
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.closeUI, this);
			Game.EventManager.on(GameEvent.UPDATE_BATTLEPASS_GIFT, this.SetInfo, this);
			this.scrollerItemA.addEventListener(eui.UIEvent.CHANGE, this.scrollerItemAChange, this);
			this.btnGetGift.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGetGift, this);
			this.btnPassUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPassUp, this);
			this.btnExpUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnExpUp, this);
			this.btnCheckGift.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtnCheckGift, this);
			this.btnHighUnLock.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHighUnLock, this);
			Game.EventManager.on(GameEvent.UPDATE_BATTLEPASS_REWARD, this.RefreshReward, this);
			this.Init();
		}

		private Init() {
			this.size = this.imgExpBar.width;
			this.offestLevel = 10;
			this.imgExpBar.mask = this.barMask;
			this.listItemAData = new eui.ArrayCollection();
			this.listItemBData = new eui.ArrayCollection();
			this.initData();
		}

		private initData() {
			this.rewardList = [];
			let season = Math.floor((Set.TimeFormatBeijing().getMonth()) + 1);
			let tblInfo = TablePermitReward.Table();
			for (let [k, v] of HelpUtil.GetKV(tblInfo)) {
				if (v.season == season) this.rewardList.push(v);
			}

			if (season != CommonConfig.permit_season_zone_month.length) {
				this.labelOver.text = Helper.StringFormat(TextsConfig.TextsConfig_BattlePass.timeOver, Set.TimeFormatBeijing().getFullYear(), CommonConfig.permit_season_zone_month[season]);
			}
			else {
				this.labelOver.text = Helper.StringFormat(TextsConfig.TextsConfig_BattlePass.timeOver, Set.TimeFormatBeijing().getFullYear() + 1, CommonConfig.permit_season_zone_month[0]);
			}

			this.labelSeason.text = season.toString();
		}

		private SetInfo() {
			this.setInstance();
			egret.setTimeout(this.scrollerItemAChange, this, 200);
		}

		private setInstance() {
			this.setUIItemsList();
			this.setUIItemsListHigh();

			let high_gift_id = 100210;
			let highGiftInfo: message.GiftInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (k, v) {
				return v.gift_index == high_gift_id;
			})[0];
			let isBuyHigh: boolean = Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_monthgift.indexOf(high_gift_id) == -1 ? (highGiftInfo != null && highGiftInfo.buy_times < 1) : false
			this.btnExpUp.visible = isBuyHigh;

			let is_senior = Game.PlayerInfoSystem.BaseInfo.permitPay == 1
			let goodId = is_senior ? this.rewardList[this.listItemA.selectedIndex].pay_reward[0] : this.rewardList[this.listItemA.selectedIndex].free_reward[0];
			let count = is_senior ? this.rewardList[this.listItemA.selectedIndex].pay_reward[1] : this.rewardList[this.listItemA.selectedIndex].free_reward[1];
			this.SetBuyGiftHigh(goodId, count, is_senior, this.rewardList[this.listItemA.selectedIndex].level);
		}

		private setUIItemsList() {
			this.rewardList.sort((a, b) => { return a.id - b.id; });
			this.listItemAData.removeAll();
			for (let i = 0; i < this.rewardList.length; i++) {
				let itemData = new HXH_BattlePassRewardItemData();
				itemData.index = this.rewardList[i].level;
				itemData.info = this.rewardList[i];
				itemData.father = this;
				this.listItemAData.addItem(itemData);
			}
			this.listItemA.dataProvider = this.listItemAData;
			this.listItemA.itemRenderer = HXH_BattlePassRewardItem;

			let offSet = (this.scrollerItemA.width - this.rewardList.length * this.scrollerItemA.width / 5) / 2;
			offSet = offSet > 0 ? offSet : 0;
			this.scrollerItemA.viewport.scrollH = offSet;

			let level = 0;
			let max = 0;

			let level_1 = 0;
			let max_1 = 0;

			for (let i = 0; i < this.rewardList.length; i++) {
				let index = i + 1;
				let vv = this.rewardList[i];
				let getAward = Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.indexOf(vv.level) != -1;
				if (index <= Game.PlayerInfoSystem.BaseInfo.permitLevel && !getAward) {
					if (index > max && vv.free_reward[0] != null) level = vv.level;
				}
			}

			for (let i = 0; i < this.rewardList.length; i++) {
				let index = i + 1;
				let vv = this.rewardList[i];
				let getAward_1 = Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.indexOf(vv.level) != -1;
				if (index <= Game.PlayerInfoSystem.BaseInfo.permitLevel && !getAward_1) {
					if (index > max_1) {
						max_1 = index;
						level_1 = vv.level;
					}
				}
			}

			if (Game.PlayerInfoSystem.BaseInfo.permitPay != 1) {
				this.listItemA.selectedIndex = (level - 1) == -1 ? Game.PlayerInfoSystem.BaseInfo.permitLevel - 1 : (level - 1);
			}
			else if (level_1 >= level) {
				this.listItemA.selectedIndex = (level_1 - 1) < 0 ? Game.PlayerInfoSystem.BaseInfo.permitLevel - 1 : (level_1 - 1);
			}
			else {
				this.listItemA.selectedIndex = (level - 1) < 0 ? Game.PlayerInfoSystem.BaseInfo.permitLevel - 1 : (level - 1);
			}
			this.itemIndex = this.listItemA.selectedIndex;

			this.listItemA.validateNow();
			this.scrollerItemA.viewport = this.listItemA;
			egret.Tween.get(this).wait(100).call(() => { this.listSlide(); });
		}

		private listSlide() {
			if (this.listItemA.selectedIndex != -1) { //86.5=item宽+两个item之间空隙
				if (this.rewardList.length * 86.5 - this.listItemA.selectedIndex * 86.5 > this.scrollerItemA.width) {
					this.listItemA.scrollH = this.listItemA.selectedIndex * 86.5;
				}
				else { // 不够一个scroller的宽
					this.listItemA.scrollH = this.rewardList.length * 86.5 - this.scrollerItemA.width;
				}
			}
			else {
				this.listItemA.scrollH = 0;
			}
		}


		private setUIItemsListHigh() {
			this.listItemBData.removeAll();
			for (let i = 0; i < 1; i++) {
				let itemData = new HXH_BattlePassRewardGoodItemData();
				itemData.level = this.offestLevel;
				this.listItemBData.addItem(itemData);
			}
			this.listItemB.dataProvider = this.listItemBData;
			this.listItemB.itemRenderer = HXH_BattlePassRewardGoodItem;
		}

		private RefreshReward(ev: egret.Event) {
			if (ev == null) return;
			this.SetBuyGiftHigh(ev.data.goodsId, ev.data.count, ev.data.is_senior, ev.data.level, false);
			if (ev.data.isRight == true) {
				this.touchWhich = TOUCHWHICH.right;
				for (let i = 0; i < this.listItemAData.source.length; i++) {
					let item = this.listItemA.getElementAt(i) as HXH_BattlePassRewardItem;
					if (item != null) {
						item['groupAni1'].removeChildren();
						item['groupAni2'].removeChildren();
					}
				}
			}
		}

		public SetBuyGiftHigh(goodIdSel: number, counts: number, is_senior: boolean, index: number, isSlide: boolean = true) {
			let self = this;
			if (Game.PlayerInfoSystem.BaseInfo.permitPay == 1 || goodIdSel != null) {
				this.groupShow.visible = true;
				this.groupNotBuy.visible = false;
			}
			else if (Game.PlayerInfoSystem.BaseInfo.permitPay == 0 && Game.PlayerInfoSystem.BaseInfo.permitLevel > Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length) {
				this.groupShow.visible = true;
				this.groupNotBuy.visible = false;
			}
			else {
				this.groupShow.visible = false;
				this.groupNotBuy.visible = true;
			}

			if (Game.PlayerInfoSystem.BaseInfo.permitPay == 1) {
				this.groupHighPassLock.visible = false;
			}
			else {
				this.groupHighPassLock.visible = true;
			}

			// 经验进度条
			let exp = TableLevel.Item(Game.PlayerInfoSystem.BaseInfo.permitLevel).permit_exp;
			let percent = Game.PlayerInfoSystem.BaseInfo.permitExp / exp;
			if (percent > 1 || Game.PlayerInfoSystem.BaseInfo.permitLevel == 100) percent = 1;

			this.barMask.width = this.size * percent;

			this.level = 0;
			this.is_senior = false;
			if (is_senior != null) {
				this.is_senior = is_senior;
			}
			else if (Game.PlayerInfoSystem.BaseInfo.permitPay == 1) {
				this.is_senior = true;
			}

			// 奖励预览
			let show_level = 0;
			let goodId = 0;
			let count = 0;
			let Buy_goods = Table.DeepCopy(Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward);
			let max = 0;
			let max_high = 0;
			let goods_low = 0;
			let goods_high = 0;
			let counts_low = 0;
			let counts_high = 0;
			let level_low = 0;
			let level_high = 0;
			let m = 0;

			if (goodIdSel != null) {
				goodId = goodIdSel;
				count = counts;
				this.level = index;
			}
			else if (Game.PlayerInfoSystem.BaseInfo.permitPay == 0 && Game.PlayerInfoSystem.BaseInfo.permitLevel > Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length) {
				for (let i = 0; i < this.rewardList.length; i++) {
					let index = i + 1;
					let vv = this.rewardList[i];
					let getAward = Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.indexOf(vv.level) != -1;
					if (index <= Game.PlayerInfoSystem.BaseInfo.permitLevel && !getAward) {
						if (index > m && vv.free_reward[0] != null) show_level = vv.level;
					}
				}
				goodId = this.rewardList[show_level - 1].free_reward[0];
				count = this.rewardList[show_level - 1].free_reward[1];
				this.level = show_level;
			}
			else if (Game.PlayerInfoSystem.BaseInfo.permitPay == 1 && Game.PlayerInfoSystem.BaseInfo.permitLevel == Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.length && Game.PlayerInfoSystem.BaseInfo.permitLevel == Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length) {
				show_level = Math.ceil(Game.PlayerInfoSystem.BaseInfo.permitLevel / 10) * 10 && 1;
				goodId = this.rewardList[show_level - 1].pay_reward[0];
				count = this.rewardList[show_level - 1].pay_reward[1];
				this.level = show_level;
				this.is_senior = true;
			}
			// else if (Game.PlayerInfoSystem.BaseInfo.permitPay == 1 && Game.PlayerInfoSystem.BaseInfo.permitLevel == Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.length && Game.PlayerInfoSystem.BaseInfo.permitLevel == Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length) {
			// 	show_level = Math.ceil(Game.PlayerInfoSystem.BaseInfo.permitLevel / 10) * 10 && 1;
			// 	goodId = this.rewardList[show_level - 1].free_reward[0];
			// 	count = this.rewardList[show_level - 1].free_reward[1];
			// 	this.level = show_level;
			// 	this.is_senior = false;
			// }
			else if (Game.PlayerInfoSystem.BaseInfo.permitPay == 1 && Game.PlayerInfoSystem.BaseInfo.permitLevel >= Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.length) {
				for (let i = 0; i < this.rewardList.length; i++) {
					let index = i + 1;
					let vv = this.rewardList[i];
					let getAwards = Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.indexOf(vv.level) != -1 && vv.free_reward[0] != null;
					if (index <= Game.PlayerInfoSystem.BaseInfo.permitLevel && !getAwards) {
						if (index >= max && vv.free_reward[0] != null) {
							max = index;
							goods_low = vv.free_reward[0];
							counts_low = vv.free_reward[1];
							level_low = vv.level;
						}
					}
				}

				for (let i = 0; i < this.rewardList.length; i++) {
					let index = i + 1;
					let vv = this.rewardList[i];
					let getAward = Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.indexOf(vv.level) != -1;
					if (index <= Game.PlayerInfoSystem.BaseInfo.permitLevel && !getAward) {
						if (index > max_high) {
							max_high = index;
							goods_high = vv.pay_reward[0];
							counts_high = vv.pay_reward[1];
							level_high = vv.level;
						}
					}
				}

				if (level_high >= level_low && Game.PlayerInfoSystem.BaseInfo.permitPay == 1) {
					goodId = goods_high;
					count = counts_high;
					this.level = level_high;
					this.is_senior = true;
					this.touchWhich = TOUCHWHICH.high;
				}
				else {
					goodId = goods_low;
					count = counts_low;
					this.level = level_low;
					this.is_senior = false;
					this.touchWhich = TOUCHWHICH.low;
				}

				if (this.itemIndex == this.listItemA.selectedIndex) {
					this.listItemA.selectedIndex = this.level - 1;
					this.listItemAData.replaceItemAt(this.listItemAData.source[this.level], this.level);
					this.listItemAData.replaceItemAt(this.listItemAData.source[this.level - 1], this.level - 1);
					this.listSlide();
				}
				else {
					this.itemIndex = this.listItemA.selectedIndex;
					this.listItemA.selectedIndex = (this.level - 1) <= 0 ? Game.PlayerInfoSystem.BaseInfo.permitLevel : (this.level - 1);
				}
			}

			let one = Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.indexOf(1) != -1;
			let one_low = Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.indexOf(1) != -1;

			// if (Game.PlayerInfoSystem.BaseInfo.permitPay == 1 && this.level == 1 && one && one_low) {
			// 	let flag = (Game.PlayerInfoSystem.BaseInfo.permitLevel - Game.PlayerInfoSystem.BaseInfo.permitLevel % 10) + 10;
			// 	if (flag > 100) flag = 1;
			// 	goodId = this.rewardList[flag - 1].pay_reward[0];
			// 	count = this.rewardList[flag - 1].pay_reward[1];
			// }

			if (Game.PlayerInfoSystem.BaseInfo.permitPay == 1 || goodIdSel != null || (Game.PlayerInfoSystem.BaseInfo.permitPay == 0 && Game.PlayerInfoSystem.BaseInfo.permitLevel > Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length)) {
				let itemSet = PlayerItemSystem.Set(goodId, null, counts == null ? count : counts) as any;
				this.labelItemDes.textFlow = Util.RichText(itemSet.Info.des);
				this.imgFrame.source = cachekey(itemSet.Frame, this);
				this.imgIcon.source = cachekey(itemSet.Path, this);
				this.labelItemName.text = itemSet.Info.name;
				this.labelNum.text = (counts == null ? count : counts).toString();

				// if (this.is_senior == null) {
				// 	this.touchWhich = Game.PlayerInfoSystem.BaseInfo.permitPay == 1 ? TOUCHWHICH.high : TOUCHWHICH.low;
				// }
				// else {
				// 	this.touchWhich = this.is_senior ? TOUCHWHICH.high : TOUCHWHICH.low;
				// }

				if (this.itemIndex == this.listItemA.selectedIndex) {
					this.listItemA.selectedIndex = this.level - 1;
					if (this.is_senior == null) {
						this.touchWhich = Game.PlayerInfoSystem.BaseInfo.permitPay == 1 ? TOUCHWHICH.high : TOUCHWHICH.low;
					}
					else {
						this.touchWhich = this.is_senior ? TOUCHWHICH.high : TOUCHWHICH.low;
					}
					this.listItemAData.replaceItemAt(this.listItemAData.source[this.level - 1], this.level - 1);
					if (isSlide) this.listSlide();
				}
			}

			let isLowGet = Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.indexOf(this.level) != -1;
			let isHighGet = Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.indexOf(this.level) != -1;

			// 判断领取按钮是否可见
			if (this.level > Game.PlayerInfoSystem.BaseInfo.permitLevel) {
				this.btnGetGift.visible = false;
			}
			else if (Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length != 0 && !isLowGet && this.touchWhich == TOUCHWHICH.low) {
				this.btnGetGift.visible = true;
			}
			else if (Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.length != 0 && !isHighGet && (this.is_senior || this.is_senior == null) && Game.PlayerInfoSystem.BaseInfo.permitPay == 1 && this.touchWhich == TOUCHWHICH.high) {
				this.btnGetGift.visible = true;
			}
			else if (Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length == 0 && this.level <= Game.PlayerInfoSystem.BaseInfo.permitLevel && (!this.is_senior || this.is_senior == null) && this.touchWhich == TOUCHWHICH.low) {
				this.btnGetGift.visible = true;
			}
			else if (Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.length == 0 && this.level <= Game.PlayerInfoSystem.BaseInfo.permitLevel && Game.PlayerInfoSystem.BaseInfo.permitPay == 1 && this.touchWhich == TOUCHWHICH.high) {
				this.btnGetGift.visible = true;
			}
			else if (Game.PlayerInfoSystem.BaseInfo.permitPay == 0 && this.level <= Game.PlayerInfoSystem.BaseInfo.permitLevel && !isLowGet && !this.is_senior && this.touchWhich == TOUCHWHICH.low) {
				this.btnGetGift.visible = true;
			}
			else if (Game.PlayerInfoSystem.BaseInfo.permitPay == 1 && this.level <= Game.PlayerInfoSystem.BaseInfo.permitLevel && !isLowGet && this.touchWhich == TOUCHWHICH.low) {
				this.btnGetGift.visible = true;
			}
			else {
				this.btnGetGift.visible = false;
			}

			if (Game.PlayerInfoSystem.BaseInfo.permitLevel >= 100) {
				this.labelExp.text = TextsConfig.TextsConfig_BattlePass.expMAN;
			}
			else {
				this.labelExp.text = Helper.StringFormat(TextsConfig.TextsConfig_BattlePass.exp, Game.PlayerInfoSystem.BaseInfo.permitExp, exp);
			}

			if (Game.PlayerInfoSystem.BaseInfo.permitPay == 0) {
				this.imgTipPass.source = cachekey(UIConfig.UIConfig_BattlePass.lowPass, this);
				this.labelLvNow.text = Game.PlayerInfoSystem.BaseInfo.permitLevel.toString();
				this.btnPassUp.visible = true;
			}
			else {
				this.imgTipPass.source = cachekey(UIConfig.UIConfig_BattlePass.highPass, this);
				this.labelLvNow.text = Game.PlayerInfoSystem.BaseInfo.permitLevel.toString();
				this.btnPassUp.visible = false;
			}

			if (this.itemIndex == this.listItemA.selectedIndex) return;
			this.listItemAData.replaceItemAt(this.listItemAData.source[this.itemIndex], this.itemIndex);
			this.listItemAData.replaceItemAt(this.listItemAData.source[this.listItemA.selectedIndex], this.listItemA.selectedIndex);
			this.itemIndex = this.listItemA.selectedIndex;
			if (isSlide) this.listSlide();
		}

		private onBtnGetGift() {
			if (Game.PlayerInfoSystem.BaseInfo.permitPay == 1 && Game.PlayerInfoSystem.BaseInfo.permitLevel == Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.length && this.is_senior) {
				toast_warning(TextsConfig.TextsConfig_BattlePass.NoReward);
			}
			else if (Game.PlayerInfoSystem.BaseInfo.permitPay == 0 && Game.PlayerInfoSystem.BaseInfo.permitLevel == Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length && !this.is_senior) {
				toast_warning(TextsConfig.TextsConfig_BattlePass.NoReward);
			}
			else {
				this.ContendQueryListReqData();
			}
		}

		private ContendQueryListReqData() {
			let req = new message.RewardPermitLevelRequest();
			req.body.is_senior = this.is_senior;
			req.body.level = this.level;
			Game.Controller.send(req, this.ContendQueryListReqData_Visit, null, this, false);
		}

		private ContendQueryListReqData_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
			let response = <message.RewardPermitLevelResponse>resp;
			if (response.header.result != 0) {
				// toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
				return;
			}
			this.touchWhich = TOUCHWHICH.default;
			Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_REDTIP);
			if (!this.is_senior) {
				let max = 0;
				let max_high = 0;
				let goods_low = 0;
				let goods_high = 0;
				let counts_low = 0;
				let counts_high = 0;
				let level_low = 0;
				let level_high = 0;

				for (let i = 0; i < this.rewardList.length; i++) {
					let v = this.rewardList[i];
					let index = i + 1;
					let getAwards = (Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.indexOf(v.level) != -1 && v.free_reward[0] != null);
					if (index <= Game.PlayerInfoSystem.BaseInfo.permitLevel && !getAwards) {
						if (index >= max && v.free_reward[0] != null) {
							max = index;
							goods_low = v.free_reward[0];
							counts_low = v.free_reward[1];
							level_low = v.level;
						}
					}
				}

				for (let i = 0; i < this.rewardList.length; i++) {
					let v = this.rewardList[i];
					let index = i + 1;
					let getAward = Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.indexOf(v.level) != -1;
					if (index <= Game.PlayerInfoSystem.BaseInfo.permitLevel && !getAward) {
						if (index >= max_high) {
							max_high = index;
							goods_high = v.pay_reward[0];
							counts_high = v.pay_reward[1];
							level_high = v.level;
						}
					}
				}

				if (level_high >= level_low && Game.PlayerInfoSystem.BaseInfo.permitPay == 1) {
					if (goods_high != null && goods_high != 0) {
						this.touchWhich = TOUCHWHICH.high;

						this.SetBuyGiftHigh(goods_high, counts_high, true, max_high);
						this.itemIndex = this.listItemA.selectedIndex;
						this.listItemA.selectedIndex = max_high - 1;
					}
					else {
						let info = this.returnGoodsInfo();

						this.SetBuyGiftHigh(info[1], info[2], this.is_senior, Game.PlayerInfoSystem.BaseInfo.permitLevel);
						this.itemIndex = this.listItemA.selectedIndex;
						this.listItemA.selectedIndex = Game.PlayerInfoSystem.BaseInfo.permitLevel - 1;
					}
				}
				else {
					if (goods_low != null && goods_low != 0) {
						this.touchWhich = TOUCHWHICH.low;

						this.SetBuyGiftHigh(goods_low, counts_low, false, max);
						this.itemIndex = this.listItemA.selectedIndex;
						this.listItemA.selectedIndex = max - 1;
					}
					else {

						let info = this.returnGoodsInfo();
						this.SetBuyGiftHigh(info[1], info[2], this.is_senior, Game.PlayerInfoSystem.BaseInfo.permitLevel);
						this.itemIndex = this.listItemA.selectedIndex;
						this.listItemA.selectedIndex = Game.PlayerInfoSystem.BaseInfo.permitLevel - 1;
					}
				}
			}
			else {
				// this.SetBuyGiftHigh(null, null, this.is_senior, null);
				this.SetBuyGiftHigh(null, null, false, null);
			}
			toast_success(TextsConfig.TextsConfig_Adviser.adviser_success);
		}

		/**
		 * @return [is_senior, goodsId, count];
		 */
		private returnGoodsInfo(): [boolean, number, number] {
			// let is_senior = Game.PlayerInfoSystem.BaseInfo.permitPay == 1
			for (let i = 0; i < this.rewardList.length; i++) {
				if (this.rewardList[i].level == Game.PlayerInfoSystem.BaseInfo.permitLevel) {
					return [Game.PlayerInfoSystem.BaseInfo.permitPay == 1, this.is_senior ? this.rewardList[i].pay_reward[0] : this.rewardList[i].free_reward[0], this.is_senior ? this.rewardList[i].pay_reward[1] : this.rewardList[i].free_reward[1]];
				}
			}
			return [null, null, null];
		}

		private scrollerItemAChange() {
			let temp: number = 4.39; // listItemA一行显示多少item
			let nextIndex: number = 1;
			let off: number = this.scrollerItemA.viewport.scrollH;
			let perSizeX: number = this.scrollerItemA.width / temp;
			nextIndex = Math.ceil((1 * off + temp * perSizeX) / (perSizeX * 10));
			if (nextIndex <= 0) {
				nextIndex = 1
			}
			else if (nextIndex > Math.floor(this.rewardList.length / 10)) {
				nextIndex = Math.floor(this.rewardList.length / 10);
			}

			if (this.offestLevel != (nextIndex * 10)) {
				this.offestLevel = nextIndex * 10;
				this.setUIItemsListHigh();
			}
		}

		private onBtnPassUp() {
			loadUI(HXH_BattlePassPay).then((dialog: HXH_BattlePassPay) => {
				dialog.show(UI.SHOW_FROM_TOP);
			});
		}

		private onBtnExpUp() {
			loadUI(HXH_BattlePassPay).then((dialog: HXH_BattlePassPay) => {
				dialog.show(UI.SHOW_FROM_TOP);
			});
		}

		private onbtnCheckGift() {
			loadUI(HXH_BattlePassAllReward).then((dialog: HXH_BattlePassAllReward) => {
				dialog.show(UI.SHOW_FROM_TOP);
			});
		}

		private onBtnHighUnLock() {
			loadUI(HXH_BattlePassAllReward).then((dialog: HXH_BattlePassAllReward) => {
				dialog.show(UI.SHOW_FROM_TOP);
			});
		}

		private closeUI() {
			this.close();
		}
	}
}
namespace zj {
	/** 
	 * @author xing li wei
	 * 
	 * @date 2019-3-25
	 * 
	 * @class 新手狂欢奖励list子项
	 */
	export class ActivityNoviceItemItem extends eui.ItemRenderer {
		public imgFrame: eui.Image;
		public imgIcon: eui.Image;
		public lableLevel: eui.Label;
		public groupStrar: eui.Group;
		public imgIconGrade: eui.Image;
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityNoviceItemItemSkin.exml";
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
			cachekeys(<string[]>UIResource["ActivityNoviceItemItem"], null);
		}

		protected dataChanged() {
			let data = this.data as ActivityNoviceItemItemData;
			let itemSet = PlayerItemSystem.Set(data.itemInfo[0]);
			let count = data.itemInfo[1];

			this.imgFrame.source = cachekey(itemSet.Frame, this);
			this.imgIcon.source = cachekey(itemSet.Clip, this);
			this.lableLevel.text = "x" + Set.NumberUnit2(count);
			this.groupStrar.visible = false;
			this.imgIconGrade.visible = false;
			if (data.itemInfo[0] == 10074 || data.itemInfo[0] == 10057 || data.itemInfo[0] == 10058 || data.itemInfo[0] == 10059) {
				let info = TableBaseGeneral.Item(data.itemInfo[0]);
				Helper.SetHeroAwakenStar(this.groupStrar, info.init_star, 1);
				this.imgIconGrade.visible = true;
				this.lableLevel.text = "Lv " + 1;
				this.imgIconGrade.source = cachekey(UIConfig.UIConfig_General.hunter_grade[PlayerHunterSystem.Table(data.itemInfo[0]).aptitude], this)
			}

			if (data.itemInfo[0] == 100076) {
				Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0)
					.then(display => {
						display.width = this.width;
						display.height = this.height;
						display.x = this.width / 2;
						display.y = this.height / 2;
						display.name = "ui_tongyong_daojuguang";
						this.addChild(display);
					})
					.catch(reason => {
						toast(reason);
					});
			} else {
				let a = this.getChildByName("ui_tongyong_daojuguang");
				if (a) {
					this.removeChild(a);
				}
			}
		}

		private touchBegin(e: egret.TouchEvent) {
			let data = this.data as ActivityNoviceItemItemData;
			let info = new message.GoodsInfo();
			info.goodsId = data.itemInfo[0];
			info.count = data.itemInfo[1];
			data.father.data.father.awardParticulars(e.localY * 0.75, e.stageX, e.stageY, info);
		}
	}

	export class ActivityNoviceItemItemData {
		index: number;
		itemInfo: Array<number>;
		father: ActivityNoviceItem | ActivityNoviceItemB | ActivityWeekMissionGiftItem | ActivityWeekMissionItem;
	}
}
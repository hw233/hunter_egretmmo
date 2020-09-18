namespace zj {
	/**
	 * 日常--奖励Item
	 * created by lian lei
	 * 2019.03.16
	 */
	export class Daily_AwardItem extends eui.ItemRenderer {
		private imgLogo: eui.Image;
		private imgIcon: eui.Image;
		private imgFrame: eui.Image;
		private labelNum: eui.Label;
		private groupHead: eui.Group;
		private groupAnimate: eui.Group;

		private goodsId: number;
		private count: number;
		private type: number;

		private imgMask: eui.Image; // 碎片遮罩
		private rectMask: eui.Image; // 徽章遮罩

		public constructor() {
			super();
			this.skinName = "resource/skins/daily/Daily_AwardItemSkin.exml";
			this.groupHead.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchShow, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveDialog, this);
			cachekeys(<string[]>UIResource["Daily_AwardItem"], null);
			this.init();
		}

		private init() {
			// 碎片遮罩
			this.imgMask = new eui.Image;
			this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
			this.imgMask.horizontalCenter = 0;
			this.imgMask.verticalCenter = 0;
			this.groupAnimate.addChild(this.imgMask);
			this.imgMask.visible = false;

			// 徽章遮罩
			this.rectMask = Util.getMaskImgBlack(30, 30);
			this.rectMask.horizontalCenter = -1;
			this.rectMask.verticalCenter = 0;
			this.groupAnimate.addChild(this.rectMask);
			this.rectMask.visible = false;

			cachekey(UIConfig.UIConfig_Role.mask.soul, this);
		}

		protected dataChanged() {
			this.updateView(this.data);
		}

		private updateView(data: Daily_AwardItemData) {
			this.goodsId = data.goodsId;
			this.count = data.count;
			this.type = this.data.type;

			if (data.goodsId == 0) {
				this.imgIcon.source = cachekey(UIConfig.UIConfig_Role.daily_live, this);
				this.labelNum.text = ("x" + data.count);
				this.imgLogo.source = cachekey(UIConfig.UIConfig_Common.nothing, this);
				this.imgFrame.source = cachekey(UIConfig.UIConfig_Role.itemFrame[0], this);
			}
			else {
				let itemSet = PlayerItemSystem.Set(data.goodsId, null, data.count) as any;
				let strCount = Set.NumberUnit2(data.count);
				this.imgIcon.source = cachekey(itemSet.Path, this);
				this.labelNum.text = ("x" + strCount);
				this.imgLogo.source = cachekey(itemSet.Logo, this);
				this.imgFrame.source = cachekey(itemSet.Frame, this);
			}

			// 遮罩
			this.imgMask.visible = false;
			this.rectMask.visible = false;
			this.imgIcon.mask = null;
			if (PlayerItemSystem.IsImgMask(this.goodsId)) {
				this.imgMask.visible = true;
				this.imgMask.width = 32;
				this.imgMask.height = 40;
				this.imgIcon.mask = this.imgMask;
			} else if (PlayerItemSystem.IsRectMask(this.goodsId)) {
				this.rectMask.visible = true;
				this.rectMask.width = 32;
				this.rectMask.height = 40;
				this.imgIcon.mask = this.rectMask;
			}
		}

		private onTouchShow(e: egret.TouchEvent) {
			if (egret.getQualifiedClassName(this.data.father) == "zj.Daily_AchieveItem" && this.data.father['imgGet'].visible) return;
			let newThis = this;
			let touchX = e.stageX;
			let groupY: number;
			let groupX: number;
			let type: number = 0;// type == 1 点击位置大于父类高度的一半

			if (e.stageY >= this.data.Ffather.groupAddDialog.height / 2) {
				groupY = e.stageY - e.localY - this.data.father.height / 2;
				type = 1;
			}
			else {
				groupY = e.stageY + e.localY - this.data.father.height / 2 - 20;
			}

			if (e.stageX >= UIManager.StageWidth - 240) {
				groupX = UIManager.StageWidth - 240;
			}
			else {
				groupX = touchX;
			}

			if (this.goodsId == 0) {
				return;
			}
			let _type = PlayerItemSystem.ItemType(this.goodsId);
			if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
				loadUI(CommonDesGeneral).then((dialog: CommonDesGeneral) => {
					dialog.name = "award";
					dialog.x = groupX - dialog.width;
					if (type == 1) {
						dialog.y = groupY - dialog.height;
					}
					else {
						dialog.y = groupY;
					}
					dialog.setInfo(newThis.goodsId, newThis.count);
					newThis.data.Ffather.groupAddDialog.addChild(dialog);
				});
			} else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
				loadUI(Common_DesRes).then((dialog: Common_DesRes) => {
					dialog.name = "award";
					dialog.x = groupX - dialog.width;
					if (type == 1) {
						dialog.y = groupY - dialog.height;
					}
					else {
						dialog.y = groupY;
					}
					dialog.setInfo(newThis.goodsId, newThis.count);
					newThis.data.Ffather.groupAddDialog.addChild(dialog);
				});
			} else {
				loadUI(CommonDesProp).then((dialog: CommonDesProp) => {
					dialog.name = "award";
					dialog.x = groupX - dialog.width;
					if (type == 1) {
						dialog.y = groupY - dialog.height;
					}
					else {
						dialog.y = groupY;
					}
					dialog.init(newThis.goodsId, newThis.count);
					newThis.data.Ffather.groupAddDialog.addChild(dialog);
				});
			}

		}

		private onRemoveDialog() {
			this.data.Ffather.onRemoveDialog();
		}
	}

	export class Daily_AwardItemData {
		goodsId: number;
		count: number;
		Ffather: Daily_Main;
		father: Daily_LiveItem | Daily_AchieveItem;
		CurState = {
			/**日常 */
			daily_live: 1,
			/**成就 */
			daily_achieve: 2,
			/** */
			daily_task: 3
		};
		type: number;
	}
}
namespace zj {
	/**
	 * @author 
	 * 
	 * @date 2019-1-29
	 * 
	 * @class 奖励说明List子项的子项
	 */
	export class ArenaWholeAwardItemItem extends eui.ItemRenderer {
		private imgFrame: eui.Image;//头像框
		private imgFrame1: eui.Image;
		private imgIcon: eui.Image;//头像
		private groupClip: eui.Group;
		private imgLogo: eui.Image;
		private labelNum: eui.BitmapLabel;//奖励数量	
		private cx: number;
		private cy: number;
		private groupAll: eui.Group;
		private imgMask: eui.Image;
		private rectMaskCommon: eui.Rect;
		public constructor() {
			super();
			this.skinName = "resource/skins/arena/ArenaWholeAwardItemItemSkin.exml";
			cachekeys(<string[]>UIResource["ArenaWholeAwardItemItem"], null);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
			this.imgMask = new eui.Image;
			this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
			this.imgMask.horizontalCenter = 0;
			this.imgMask.verticalCenter = 0;
			this.groupAll.addChild(this.imgMask);
			this.imgMask.visible = false;

			//普通物品遮罩
			this.rectMaskCommon = new eui.Rect(83, 84, 0x000000);
			this.rectMaskCommon.horizontalCenter = 0;
			this.rectMaskCommon.verticalCenter = -2;
			this.groupAll.addChild(this.rectMaskCommon);
			this.rectMaskCommon.visible = false;
		}
		protected dataChanged() {
			let data = this.data as ArenaWholeAwardItemItemData;
			let itemSet = PlayerItemSystem.Set(data.info.goodsId, data.info.showType, data.info.count) as any;
			if (!itemSet) return;

			this.imgFrame.source = cachekey(itemSet.Frame, this);
			this.imgIcon.source = cachekey(itemSet.Path, this);
			this.imgIcon.scaleX = 1.1;
			this.imgIcon.scaleY = 1.1;
			this.labelNum.text = "x" + Set.NumberUnit3(data.info.count);

			this.imgLogo.source = cachekey(itemSet.Logo, this);
			if (this.isRectMask(data.info.goodsId)) {
				this.imgMask.visible = true;
				this.imgIcon.mask = this.imgMask;
			} else {
				this.imgMask.visible = false;
				this.imgIcon.mask = this.rectMaskCommon;
			}

			if (Number(data.info.goodsId) == 33006) {
				this.imgIcon.scaleX = 1.3;
				this.imgIcon.scaleY = 1.3;
			}
			let type = PlayerItemSystem.ItemType(data.info.goodsId);
			if (type == message.EGoodsType.GOODS_TYPE_TITLE) {
				this.groupClip.removeChildren();
				Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0)
					.then(display => {
						display.width = this.groupClip.width;
						display.height = this.groupClip.height;
						display.x = this.groupClip.width / 2;
						display.y = this.groupClip.height / 2;
						this.groupClip.addChild(display);
					})
					.catch(reason => {
						toast(reason);
					});
			}

		}
		private touchBegin(e: egret.TouchEvent) {
			let data = this.data as ArenaWholeAwardItemItemData;
			data.father.data.father.awardParticulars(e.localY * 0.75, e.stageX, e.stageY, data.info);
		}
		//根据奖励类型判断是否添加遮罩
		private isRectMask(goodsId: number): boolean {

			let m = PlayerItemSystem.ItemType(goodsId);
			if (PlayerItemSystem.ItemType(goodsId) == 6 || PlayerItemSystem.ItemType(goodsId) == 3 && goodsId != 39101 && goodsId != 39102 && goodsId != 39103 && goodsId != 34002 && goodsId != 34003) {
				return true;
			}

			return false;
		}
	}
	export class ArenaWholeAwardItemItemData {
		/**信息 */
		info: message.GoodsInfo;
		index: number;
		father: ArenaWholeAwardItem | ArenaWholeAwardItemB;
	}
}
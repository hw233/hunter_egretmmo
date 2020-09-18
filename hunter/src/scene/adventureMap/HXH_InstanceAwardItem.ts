namespace zj {
	/**
	 * @class 副本神秘海域通关奖励Item
	 * 
	 * @author LianLei
	 * 
	 * @date 2019.07.16
	 */
	export class HXH_InstanceAwardItem extends eui.ItemRenderer {

		private groupAll: eui.Group;
		private imgFrame: eui.Image;
		private imgIcon: eui.Image;
		private labelTextNum: eui.BitmapLabel;
		private groupAnimate: eui.Group;

		private goodsId: number;
		private goodsCount: number;
		private father = null;

		private imgMask: eui.Image;
		private rectMask: eui.Rect;
		private rectMaskCommon: eui.Rect;

		public constructor() {
			super();
			this.skinName = "resource/skins/adventureMap/HXH_InstanceAwardItemSkin.exml";

			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginShowAward, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndRemoveAward, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				this.father = null;
			}, this);

			// 碎片遮罩
			this.imgMask = new eui.Image;
			this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
			this.imgMask.horizontalCenter = 0;
			this.imgMask.verticalCenter = 0;
			this.imgMask.width = 60;
			this.imgMask.height = 60;
			this.groupAnimate.addChild(this.imgMask);
			this.imgMask.visible = false;

			// 徽章遮罩
			this.rectMask = new eui.Rect(52, 47, 0x000000);
			this.rectMask.horizontalCenter = 0;
			this.rectMask.verticalCenter = 2;
			this.groupAnimate.addChild(this.rectMask);
			this.rectMask.visible = false;

			//普通物品遮罩
			this.rectMaskCommon = new eui.Rect(60, 60, 0x000000);
			this.rectMaskCommon.horizontalCenter = 0;
			this.rectMaskCommon.verticalCenter = -2;
			this.groupAnimate.addChild(this.rectMaskCommon);
			this.rectMaskCommon.visible = false;
		}

		protected dataChanged() {
			this.setInfo(this.data);
		}

		private setInfo(data: HXH_InstanceAwardItemData) {
			let itemSet = PlayerItemSystem.Set(data.info) as any;
			this.goodsId = data.info;
			this.goodsCount = data.count;
			this.father = data.father;

			this.imgFrame.source = cachekey(itemSet.Frame, this);
			this.imgIcon.source = cachekey(itemSet.Path, this);

			this.labelTextNum.visible = (data.count != null);

			if (data.count != null) {
				this.labelTextNum.text = data.count.toString();
			}

			if (data.scale == null || data.scale == 0) {
				data.scale = 1;
			}
			this.groupAll.scaleX = data.scale;
			this.groupAll.scaleY = data.scale;

			if (this.isImgMask(this.goodsId)) {
				this.imgMask.visible = true;
				this.rectMask.visible = false;
				this.rectMaskCommon.visible = false;
				this.imgIcon.mask = this.imgMask;
			} else if (this.isRectMask(this.goodsId)) {
				this.rectMask.visible = true;
				this.rectMaskCommon.visible = false;
				this.imgMask.visible = false;
				this.imgIcon.mask = this.rectMask;
			} else {
				this.imgMask.visible = false;
				this.rectMask.visible = false;
				this.rectMaskCommon.visible = true;
				this.imgIcon.mask = this.rectMaskCommon;
			}
		}

		// 物品遮罩
		private isImgMask(goodsId: number): boolean {
			if (PlayerItemSystem.ItemType(goodsId) == 4
				//||(PlayerItemSystem.ItemType(goodsId)==3 && mn % 32000 > 500 &&  mn % 32000 < 1000)
				|| TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
				|| TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
				|| TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
				|| Math.floor(goodsId / 1000) == 37
				|| TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
				return true; //UIConfig.UIConfig_Role.mask.soul
			}

			return false;
		}

		// 徽章遮罩
		private isRectMask(goodsId: number): boolean {
			if (TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || PlayerItemSystem.ItemType(goodsId) == 6) {
				return true;
			}

			return false;
		}

		private touchBeginShowAward(e: egret.TouchEvent) {
			let goodsInfo = new message.GoodsInfo();
			goodsInfo.goodsId = this.goodsId;
			goodsInfo.count = this.goodsCount;
			let show = TipManager.ShowProp(goodsInfo, this.father, 30, e.stageX, e.stageY);
			show.name = "award";
			this.father.addChild(show);
		}

		private touchEndRemoveAward() {
			this.data.father.touchEndRemoveShowSkill();
		}
	}

	export class HXH_InstanceAwardItemData {
		info: number;
		count: number;
		scale: number;
		father: any;
	}
}
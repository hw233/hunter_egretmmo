namespace zj {
	export class Mail_AttachItem extends eui.ItemRenderer {
		private groupAll: eui.Group;
		private gropHead: eui.Group;
		private imgFrame: eui.Image;
		private imgIcon: eui.Image;
		private labelNum: eui.Label;
		private groupAnimate: eui.Group;

		private imgMask: eui.Image; // 碎片遮罩
		private rectMask: eui.Image; // 徽章遮罩
		private rectMaskCommon: eui.Image;// 普通遮罩

		public constructor() {
			super();
			this.skinName = "resource/skins/daily/Mail_AttachItemSkin.exml";
			cachekeys(<string[]>UIResource["Mail_AttachItem"], null);

			// 碎片遮罩
			this.imgMask = new eui.Image;
			this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
			this.imgMask.horizontalCenter = 0;
			this.imgMask.verticalCenter = 0;
			this.groupAnimate.addChild(this.imgMask);
			this.imgMask.visible = false;

			// 徽章遮罩
			this.rectMask = Util.getMaskImgBlack(50, 50);
			this.rectMask.horizontalCenter = -1;
			this.rectMask.verticalCenter = 0;
			this.groupAnimate.addChild(this.rectMask);
			this.rectMask.visible = false;

			//普通物品遮罩
			this.rectMaskCommon = Util.getMaskImgBlack(50, 50);
			this.rectMaskCommon.horizontalCenter = 0;
			this.rectMaskCommon.verticalCenter = 0;
			this.groupAnimate.addChild(this.rectMaskCommon);
			this.rectMaskCommon.visible = false;

			// this.groupAll.cacheAsBitmap = true;
		}

		protected dataChanged() {
			this.updateView(this.data);
		}

		private updateView(data: Mail_AttachItemData) {
			let itemSet = PlayerItemSystem.Set(data.goodsId, null, data.count) as any;

			this.imgFrame.source = cachekey(itemSet.Frame, this);
			this.imgIcon.source = cachekey(itemSet.Path, this);

			if (data.battleResult == null || data.battleResult == undefined) {
				let strNum = Helper.StringFormat("x%d", data.count);
				this.labelNum.text = strNum;
			}
			else {
				let bWin: boolean = (data.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN);
				let strNum = bWin ? "x" + data.count : "-" + data.count;
				let color = bWin ? this.labelNum.textColor : Helper.RGBToHex("r:241,g:34,b:0");

				this.labelNum.text = strNum;
				this.labelNum.textColor = color;
			}

			// 遮罩
			this.imgMask.visible = false;
			this.rectMask.visible = false;
			this.rectMaskCommon.visible = false;
			this.imgIcon.mask = null;
			if (PlayerItemSystem.IsImgMask(data.goodsId)) {
				this.imgMask.visible = true;
				this.imgMask.width = 50;
				this.imgMask.height = 50;
				this.imgIcon.mask = this.imgMask;
			} else if (PlayerItemSystem.IsRectMask(data.goodsId)) {
				this.rectMask.visible = true;
				this.rectMask.width = 50;
				this.rectMask.height = 50;
				this.imgIcon.mask = this.rectMask;
			} else {
				this.rectMaskCommon.visible = true;
				this.rectMaskCommon.width = 42;
				this.rectMaskCommon.height = 42;
				this.imgIcon.mask = this.rectMaskCommon;
			}
		}

	}

	export class Mail_AttachItemData {
		goodsId: number;
		count: number;
		father: HXH_GrowUp;
		battleResult;
	}
}
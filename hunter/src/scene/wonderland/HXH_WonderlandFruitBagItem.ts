namespace zj {
	export class HXH_WonderlandFruitBagItem extends eui.ItemRenderer {
		private groupClose: eui.Group;
		private imgBoard: eui.Image;
		private imgIcon: eui.Image;
		private labelNum: eui.BitmapLabel;
		private labelNumID: eui.Label;
		private imgPoint: eui.Image;

		// private index: number;
		// private info: message.GoodsInfo;
		// private father: HXH_WonderlandFruitBag;

		public constructor() {
			super();
			this.skinName = "resource/skins/wonderland/HXH_WonderlandFruitBagItemSkin.exml";
		}

		protected dataChanged() {
			this.init();
			this.updateView(this.data);
		}

		private init() {
			this.groupClose.visible = true;
			this.imgBoard.visible = true;
			this.imgIcon.visible = true;
			this.labelNum.visible = true;
			this.labelNumID.visible = true;
			this.imgPoint.visible = false;
		}

		private updateView(data: HXH_WonderlandFruitBagItemData) {
			this.setInfoItem();
		}

		public setInfoItem() {
			if (this.data.info.goodsId == 0 || this.data.info.goodsId == null) {
				this.groupClose.visible = false;
				return;
			}
			let itemSet = PlayerItemSystem.Set(this.data.info.goodsId, this.data.info.showType, this.data.info.count) as any;
			this.labelNumID.text = itemSet.FruitID;
			this.imgIcon.source = cachekey(itemSet.Path, this);
			this.imgBoard.source = cachekey(itemSet.Frame, this);
			this.labelNum.text = itemSet.Count;
			this.imgPoint.visible = false;
			this.SetSelect();
		}

		public SetSelect() {
			if (this.selected && !this.getChildByName("ani")) {
				this.addAnimation();
			}
			else {
				let last = this.getChildByName("ani");
				if (last) this.removeChild(last);
			}
		}

		private addAnimation() {
			Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0)
				.then(display => {
					display.x = this.imgBoard.x + this.imgBoard.width / 2;
					display.y = this.imgBoard.y + this.imgBoard.height / 2;
					display.name = "ani";
					this.addChild(display);
				})
				.catch(reason => {
					toast(reason);
				});

		}
	}

	export class HXH_WonderlandFruitBagItemData {
		index: number;
		info: message.GoodsInfo;
		father: HXH_WonderlandFruitBag;
	}
}
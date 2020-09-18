namespace zj {
	//ActivityDropItem
	//yuqingchao
	//2018.04.23
	export class ActivityDropItem extends eui.ItemRenderer {
		private imgFrame: eui.Image;			//头像框
		private imgIcon: eui.Image;				//头像
		private lbItemName: eui.Label;			//数量
		private info;
		private father: ActivityDrop;
		private groupDown: eui.Group;
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityDropItemSkin.exml";
			cachekeys(<string[]>UIResource["ActivityDropItem"], null);
			this.groupDown.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onChooseItemTap, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				this.father = null;
			}, null);
		}
		protected dataChanged() {
			this.info = this.data.info;
			this.father = this.data.father;
			let itemSet = PlayerItemSystem.Set(this.info.goodId, 1, 0)
			this.imgFrame.source = cachekey(itemSet.Frame, this);
			this.imgIcon.source = cachekey(itemSet.Clip, this);
			let allNum = this.info.dailyNum;
			let todayNum = 0;
			let goods = Game.PlayerMixUnitInfoSystem.mixunitinfo.collect_goods;
			let self = this;
			let todayInfo = Table.FindR(Game.PlayerMixUnitInfoSystem.mixunitinfo.collect_goods, (_k, _v) => {
				return _v.key == this.info.goodId;
			})[0];
			if (todayInfo != null) {
				todayNum = todayInfo.value;
			}
			this.lbItemName.text = (todayNum + "/" + allNum).toString();
			this.groupDown.removeChildren();
			this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupDown);
		}
		//添加龙骨动画
		private addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
			Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
				.then(display => {
					display.x = group.explicitWidth / 2 + 1;
					display.y = group.explicitHeight / 2;
					group.addChild(display);
					display.scaleX = 0.8;
					display.scaleY = 0.8;
				})
				.catch(reason => {
					toast(reason);
				});
		}

		// 鼠标点击 掉落 材料说明
		private onChooseItemTap() {
			let type = PlayerItemSystem.ItemType(this.info.goodId);
			let itemY: number;
			let count: number = 0;

			count = 1;
			let dialog = this.getChildByName("Item-skill-common") as CommonDesGeneral;
			if (dialog) this.removeChild(dialog);
			if (type == message.EGoodsType.GOODS_TYPE_CLIENT) {
				loadUI(Common_DesRandom).then((dialog: Common_DesRandom) => {
					dialog.x = this.father.width / 6;
					dialog.y = this.father.height / 7;
					dialog.name = "Item-skill-common";
					dialog.setInfo(this.info.goodId, this.info.count)
					this.father.addChild(dialog);
				});
			} else if (type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
				loadUI(Common_DesRes).then((dialog: Common_DesRes) => {
					dialog.x = this.father.width / 6;
					dialog.y = this.father.height / 7;
					dialog.name = "Item-skill-common";
					dialog.setInfo(this.info.goodId, this.info.count);
					this.father.addChild(dialog);
				});
			} else if (type == message.EGoodsType.GOODS_TYPE_GENERAL) {
				loadUI(CommonDesGeneral).then((dialog: CommonDesGeneral) => {
					dialog.x = this.father.width / 6;
					dialog.y = this.father.height / 7;
					dialog.name = "Item-skill-common";
					dialog.setInfo(this.info.goodId, count);
					this.father.addChild(dialog);
				});
			}
			else {
				loadUI(CommonDesProp).then((dialog: CommonDesProp) => {
					dialog.x = this.father.width / 6;
					dialog.y = this.father.height / 7;
					dialog.name = "Item-skill-common";
					dialog.init(this.info.goodId, this.info.count);
					this.father.addChild(dialog);
				});
			}

		}
	}
}
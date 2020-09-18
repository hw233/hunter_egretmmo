namespace zj {
//ZorkBossMainAwardItem
//yuqingchao
export class ZorkBossMainAwardItem extends eui.ItemRenderer {
	private imgFrame: eui.Image;		//头像框
	private imgIcon: eui.Image;		//头像
	private imgLogo: eui.Image;		//
	private lbNum: eui.BitmapLabel;		//物品数量（位图文本）
	private info;
	private boold: boolean;
	private groupAni: eui.Group;
	public constructor() {
		super();
		this.skinName = "resource/skins/zork/ZorkBossMainAwardItemSkin.exml";
		cachekeys(<string[]>UIResource["ZorkBossMainAwardItem"], null);
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
	}
	private touchBegin(e: egret.TouchEvent) {
		this.onChooseItemTap(this.data, e);
	}
	protected dataChanged() {
		this.info = this.data.info;
		this.boold = this.data.boold;
		let itemSet: any = PlayerItemSystem.Set(this.info.goodsId, this.info.showType, this.info.count);
		this.imgIcon.source = cachekey(PlayerItemSystem.ItemPath(this.info.goodsId), this);
		this.imgFrame.source = cachekey(itemSet.Frame, this);
		this.lbNum.text = this.info.count;
		if (this.boold) {
			this.groupAni.removeChildren();
		} else {
			this.groupAni.removeChildren();
			this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupAni);
		}
	}
	// 鼠标点击 掉落 材料说明
	public onChooseItemTap(data, e) {
		let num = data.info.count;
		let reward = data.info.goodsId;
		let type = PlayerItemSystem.ItemType(reward);
		let index = data.i;
		let itemY: number;
		let count: number = 0;
		if (e.stageY >= data.father.height / 2) {
			itemY = e.stageY - e.localY;
			count = 1;
		}
		else {
			itemY = e.stageY + this.skin.height - e.localY;
		}
		let dialog = this.getChildByName("Item-skill-common") as CommonDesGeneral;
		if (dialog) this.removeChild(dialog);


		if (type == message.EGoodsType.GOODS_TYPE_CLIENT) {
			loadUI(Common_DesRandom).then((dialog: Common_DesRandom) => {
				dialog.x = this.data.father.width / 2 + index * 40;
				if (count == 1) {
					dialog.y = itemY - dialog.height;
				}
				else dialog.y = itemY;
				dialog.name = "Item-skill-common";
				dialog.setInfo(reward, num);
				data.father.addChild(dialog);
			});
		} else if (type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
			loadUI(Common_DesRes).then((dialog: Common_DesRes) => {
				dialog.x = this.data.father.width / 2 + index * 40;
				if (count == 1) {
					dialog.y = itemY - dialog.height;
				}
				else dialog.y = itemY;
				dialog.name = "Item-skill-common";
				dialog.setInfo(reward, num);
				data.father.addChild(dialog);
			});
		}
		else {
			loadUI(CommonDesProp).then((dialog: CommonDesProp) => {
				if (index == "2") {
					dialog.x = this.data.father.width / 2 + index * 140 - dialog.width;
					dialog.y = itemY - dialog.height * 0.5
				}
				else {
					let wid = this.data.father.width / 2;
					dialog.x = this.data.father.width / 2 + index * 80;
					if (count == 1) {
						dialog.y = itemY - dialog.height;
					}
					else dialog.y = itemY;
				}
				dialog.name = "Item-skill-common";
				dialog.init(reward, num);
				data.father.addChild(dialog);
			});
		}

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
}
}
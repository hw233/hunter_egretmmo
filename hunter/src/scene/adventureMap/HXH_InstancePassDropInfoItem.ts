namespace zj {
/**
 * 冒险通关奖励Item
 * created by Lian Lei
 * 2019.1.16
 */
export class HXH_InstancePassDropInfoItem extends eui.ItemRenderer {
	private groupAll: eui.Group;
	private imgInstanceName: eui.Image;
	private groupAward1: eui.Group;
	private imgName1: eui.Image;
	private btnAward1: eui.Group;
	private imgFrame1: eui.Image;
	private imgIcon1: eui.Image;
	private groupClip1: eui.Group;
	private labelItemNum1: eui.BitmapLabel;
	private groupAward2: eui.Group;
	private imgName2: eui.Image;
	private btnAward2: eui.Group;
	private imgFrame2: eui.Image;
	private imgIcon2: eui.Image;
	private groupClip2: eui.Group;
	private labelItemNum2: eui.BitmapLabel;
	private groupAward3: eui.Group;
	private imgName3: eui.Image;
	private btnAward3: eui.Group;
	private imgFrame3: eui.Image;
	private imgIcon3: eui.Image;
	private groupClip3: eui.Group;
	private labelItemNum3: eui.BitmapLabel;
	private groupAni1: eui.Group;
	private groupAni2: eui.Group;
	private groupAni3: eui.Group;
	private id: number;
	private father: HXH_InstancePassDropInfo;
	private btn1: eui.Group;
	private btn2: eui.Group;
	private btn3: eui.Group;
	private goodsTblNormal: Array<number>;
	private countTblNormal: Array<number>;
	private goodsTblElite: Array<number>;
	private countTblElite: Array<number>;

	private groupAnimate1: eui.Group;
	private groupAnimate2: eui.Group;
	private groupAnimate3: eui.Group;

	private imgMask: eui.Image;
	private rectMask: eui.Image;
	private rectMaskCommon: eui.Image;

	private info: TableInstanceArea;
	private index: number;

	public constructor() {
		super();
		this.skinName = "resource/skins/adventureMap/HXH_InstancePassDropInfoItemSkin.exml";
		this.btn1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnAwardBegin1, this);
		this.btn2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnAwardBegin2, this);
		this.btn3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnAwardBegin3, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnAwardEnd, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.father = null;
		}, null);

		cachekeys(<string[]>UIResource["HXH_InstancePassDropInfoItem"], null);

		// 碎片遮罩
		this.imgMask = new eui.Image;
		this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
		this.imgMask.horizontalCenter = 0;
		this.imgMask.verticalCenter = 0;
		this.imgMask.width = this.imgIcon1.width;
		this.imgMask.height = this.imgIcon1.height;
		this.groupAnimate1.addChild(this.imgMask);
		this.groupAnimate2.addChild(this.imgMask);
		this.groupAnimate3.addChild(this.imgMask);
		this.imgMask.visible = false;

		// 徽章遮罩
		this.rectMask = Util.getMaskImgBlack(53, 53);
		this.rectMask.horizontalCenter = 0;
		this.rectMask.verticalCenter = 2;
		this.groupAnimate1.addChild(this.rectMask);
		this.groupAnimate2.addChild(this.rectMask);
		this.groupAnimate3.addChild(this.rectMask);
		this.rectMask.visible = false;

		//普通物品遮罩
		this.rectMaskCommon = Util.getMaskImgBlack(53, 53);
		this.rectMaskCommon.horizontalCenter = 0;
		this.rectMaskCommon.verticalCenter = -2;
		this.groupAnimate1.addChild(this.rectMaskCommon);
		this.groupAnimate2.addChild(this.rectMaskCommon);
		this.groupAnimate3.addChild(this.rectMaskCommon);
		this.rectMaskCommon.visible = false;
	}

	protected dataChanged() {
		this.updateView(this.data);
	}

	private updateView(data: HXH_InstancePassDropInfoItemData) {
		this.groupAni1.removeChildren();
		this.groupAni2.removeChildren();
		this.groupAni3.removeChildren();
		for (let i = 0; i < 3; i++) {
			this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this[`groupAni${i + 1}`]);
		}

		this.id = data.id;
		this.info = data.info;
		this.index = data.index;
		this.father = data.father;
		// if (data.info.area_search.length == 0) {
		// 	this.groupAward3.visible = false;
		// }
		// else {
		// 	this.groupAward3.visible = true;
		// }

		if (data.info.area_id == 1 || data.info.area_id == 2) {
			this.groupAward2.alpha = 0;
			this.groupAward3.x = this.groupAward1.x + 170;
		}
		else {
			this.groupAward2.alpha = 1;
			this.groupAward3.x = this.groupAward1.x + 170 * 2;
		}

		if (data.info.area_id == 8 || data.info.area_id == 9) {
			this.groupAward3.alpha = 0;
		}
		else {
			this.groupAward3.alpha = 1;
		}

		let namePic = Game.PlayerInstanceSystem.AreaInstance(data.id).area_name_pic_big;
		this.imgInstanceName.source = cachekey(namePic, this);
		let instanceData: TableInstanceArea = Game.PlayerInstanceSystem.AreaInstance(data.id);
		if (instanceData == null) {
			return;
		}

		let chapterList: Array<number> = instanceData.area_normal;
		let eliteList: Array<number> = instanceData.area_elite;
		let instanceList: Array<number> = [];
		let instanceListElite: Array<number> = [];

		for (let i = 0; i < chapterList.length; i++) {
			let vv: number = chapterList[i];
			let chapterData: TableChapterNormal = null;
			chapterData = Game.PlayerInstanceSystem.ChapterInstance(vv);
			instanceList.push(chapterData.chapter_pack[chapterData.chapter_pack.length - 1]);
		}

		for (let i = 0; i < eliteList.length; i++) {
			let vv: number = eliteList[i];
			let eliteData: TableChapterElite = null;
			eliteData = Game.PlayerInstanceSystem.EliteInstance(vv);
			instanceListElite.push(eliteData.chapter_pack[eliteData.chapter_pack.length - 1]);
		}

		for (let i = 0; i < instanceList.length; i++) {
			let vv: number = instanceList[i];
			this.goodsTblNormal = Game.PlayerInstanceSystem.ChestItem(vv).goods_ids;
			this.countTblNormal = Game.PlayerInstanceSystem.ChestItem(vv).goods_counts;
			let itemSet = PlayerItemSystem.Set(this.goodsTblNormal[0], 1, this.countTblNormal[0]) as any;

			if (i > instanceList.length) {
				this[`groupClip${i + 1}`].visible = false;
				this[`imgFrame${i + 1}`].visible = false;
				this[`imgIcon${i + 1}`].visible = false;
				this[`labelItemNum${i + 1}`].visible = false;
				this[`imgName${i + 1}`].visible = false;
			}
			else {
				this[`groupClip${i + 1}`].visible = true;
				this[`imgFrame${i + 1}`].visible = true;
				this[`imgIcon${i + 1}`].visible = true;
				this[`labelItemNum${i + 1}`].visible = true;
				this[`imgName${i + 1}`].visible = true;
				this[`imgFrame${i + 1}`].source = cachekey(itemSet.Frame, this);
				this[`groupClip${i + 1}`].removeChildren();
				this[`labelItemNum${i + 1}`].text = this.countTblNormal[0].toString();
				this[`imgIcon${i + 1}`].source = cachekey(itemSet.Path, this);


				if (this.isImgMask(this.goodsTblNormal[0])) {
					this.imgMask.visible = true;
					this.rectMask.visible = false;
					this.rectMaskCommon.visible = false;
					(<eui.Image>this[`imgIcon${i + 1}`]).mask = this.imgMask;
				} else if (this.isRectMask(this.goodsTblNormal[0])) {
					this.rectMask.visible = true;
					this.rectMaskCommon.visible = false;
					this.imgMask.visible = false;
					(<eui.Image>this[`imgIcon${i + 1}`]).mask = this.rectMask;
				} else {
					this.imgMask.visible = false;
					this.rectMask.visible = false;
					this.rectMaskCommon.visible = true;
					(<eui.Image>this[`imgIcon${i + 1}`]).mask = this.rectMaskCommon;
				}

			}

			let num: number = 0;
			if ((i + 1) == 1) {
				num = 3;
			}
			else if ((i + 1) == 2) {
				num = 2;
			}
			if (data.id <= 2) {
				this[`imgName${i + 1}`].source = cachekey(UIConfig.UIConfig_Hunter.instance_chapter[data.id + i - 1], this);
			}
			else {
				this[`imgName${i + 1}`].source = cachekey(UIConfig.UIConfig_Hunter.instance_chapter[(2 * data.id) - num - 1], this);
			}
		}

		for (let i = 0; i < instanceListElite.length; i++) {
			let vv = instanceListElite[i];
			let ids: number = i + 3;
			this.goodsTblElite = Game.PlayerInstanceSystem.ChestItem(vv).goods_ids;
			this.countTblElite = Game.PlayerInstanceSystem.ChestItem(vv).goods_counts;
			let itemSet = PlayerItemSystem.Set(this.goodsTblElite[0], 1, this.countTblElite[0]) as any;

			this[`imgFrame${ids}`].source = cachekey(itemSet.Frame, this);
			this[`groupClip${ids}`].removeChildren();
			this[`imgIcon${ids}`].visible = true;
			this[`labelItemNum${ids}`].text = this.countTblElite[0].toString();
			this[`imgIcon${ids}`].source = cachekey(itemSet.Path, this);
		}

		// if (instanceList.length == 1 && instanceListElite.length != 0) {
		// 	this.groupAward3.visible = true;
		// 	this.groupAward2.visible = false;
		// 	this.groupAward3.x = this.groupAward1.x + 170;
		// }

	}

	//添加龙骨动画
	private addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
		Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
			.then(display => {
				display.x = group.explicitWidth / 2
				//display.y =this.height*0.25;
				display.y = group.explicitHeight / 2;
				group.addChild(display);
				display.scaleX = 0.7;
				display.scaleY = 0.7;
			})
			.catch(reason => {
				toast(reason);
			});
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

	private onBtnAwardBegin1(e: egret.TouchEvent) {
		let instanceData: TableInstanceArea = Game.PlayerInstanceSystem.AreaInstance(this.id);
		if (instanceData == null) return;
		let chapterList: Array<number> = instanceData.area_normal;
		let instanceList: Array<number> = [];

		for (let i = 0; i < chapterList.length; i++) {
			let chapterData: TableChapterNormal = null;
			chapterData = Game.PlayerInstanceSystem.ChapterInstance(chapterList[i]);
			instanceList.push(chapterData.chapter_pack[chapterData.chapter_pack.length - 1]);
		}

		let newThis = this;
		for (let i = 0; i < instanceList.length; i++) {
			let goodsTbl = Game.PlayerInstanceSystem.ChestItem(instanceList[i]).goods_ids;
			let countTbl = Game.PlayerInstanceSystem.ChestItem(instanceList[i]).goods_counts;
			let _type = PlayerItemSystem.ItemType(goodsTbl[0]);
			let groupY: number;
			let type: number = 0;
			if (e.stageY >= this.father.height / 2) {
				groupY = e.stageY - e.localY;
				type = 1;
			}
			else {
				groupY = e.stageY - e.localY + this.height;
			}

			if (i == 0) {
				if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
					loadUI(CommonDesGeneral).then((dialog: CommonDesGeneral) => {
						dialog.x = newThis.data.father.groupDesProp.x;
						if (type == 1) {
							dialog.y = groupY - dialog.height;
						}
						else {
							dialog.y = groupY;
						}
						dialog.name = "Award";
						dialog.setInfo(goodsTbl[0], countTbl[0]);
						newThis.father.addChild(dialog);
					});
				} else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
					loadUI(Common_DesRes).then((dialog: Common_DesRes) => {

						dialog.x = newThis.data.father.groupDesProp.x;
						if (type == 1) {
							dialog.y = groupY - dialog.height;
						}
						else {
							dialog.y = groupY;
						}
						dialog.name = "Award";
						dialog.setInfo(goodsTbl[0], countTbl[0]);
						newThis.father.addChild(dialog);
					});
				} else {
					loadUI(CommonDesProp).then((dialog: CommonDesProp) => {
						dialog.x = newThis.data.father.groupDesProp.x;
						if (type == 1) {
							dialog.y = groupY - dialog.height;
						}
						else {
							dialog.y = groupY;
						}
						dialog.name = "Award";
						dialog.init(goodsTbl[0], countTbl[0]);
						newThis.father.addChild(dialog);
					});
				}
			}
		}
	}

	private onBtnAwardBegin2(e: egret.TouchEvent) {
		let instanceData: TableInstanceArea = Game.PlayerInstanceSystem.AreaInstance(this.id);
		if (instanceData == null) return;
		let chapterList: Array<number> = instanceData.area_normal;
		let instanceList: Array<number> = [];

		for (let i = 0; i < chapterList.length; i++) {
			let chapterData: TableChapterNormal = null;
			chapterData = Game.PlayerInstanceSystem.ChapterInstance(chapterList[i]);
			instanceList.push(chapterData.chapter_pack[chapterData.chapter_pack.length - 1]);
		}

		let newThis = this;
		for (let i = 0; i < instanceList.length; i++) {
			let goodsTbl = Game.PlayerInstanceSystem.ChestItem(instanceList[i]).goods_ids;
			let countTbl = Game.PlayerInstanceSystem.ChestItem(instanceList[i]).goods_counts;
			let _type = PlayerItemSystem.ItemType(goodsTbl[0]);
			let groupY: number;
			let type: number = 0;
			if (e.stageY >= this.father.height / 2) {
				groupY = e.stageY - e.localY;
				type = 1;
			}
			else {
				groupY = e.stageY - e.localY + this.height;
			}

			if (i == 1) {
				if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
					loadUI(CommonDesGeneral).then((dialog: CommonDesGeneral) => {
						dialog.x = newThis.data.father.groupDesProp.x + 150;
						if (type == 1) {
							dialog.y = groupY - dialog.height;
						}
						else {
							dialog.y = groupY;
						}
						dialog.name = "Award";
						dialog.setInfo(goodsTbl[0], countTbl[0]);
						newThis.father.addChild(dialog);
					});
				} else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
					loadUI(Common_DesRes).then((dialog: Common_DesRes) => {

						dialog.x = newThis.data.father.groupDesProp.x + 150;
						if (type == 1) {
							dialog.y = groupY - dialog.height;
						}
						else {
							dialog.y = groupY;
						}
						dialog.name = "Award";
						dialog.setInfo(goodsTbl[0], countTbl[0]);
						newThis.father.addChild(dialog);
					});
				} else {
					loadUI(CommonDesProp).then((dialog: CommonDesProp) => {
						dialog.x = newThis.data.father.groupDesProp.x + 150;
						if (type == 1) {
							dialog.y = groupY - dialog.height;
						}
						else {
							dialog.y = groupY;
						}
						dialog.name = "Award";
						dialog.init(goodsTbl[0], countTbl[0]);
						newThis.father.addChild(dialog);
					});
				}
			}
		}
	}

	private onBtnAwardBegin3(e: egret.TouchEvent) {
		let instanceData: TableInstanceArea = Game.PlayerInstanceSystem.AreaInstance(this.id);
		if (instanceData == null) return;
		let eliteList: Array<number> = instanceData.area_elite;
		let instanceListElite: Array<number> = [];

		for (let i = 0; i < eliteList.length; i++) {
			let eliteData: TableChapterElite = null;
			eliteData = Game.PlayerInstanceSystem.EliteInstance(eliteList[i]);
			instanceListElite.push(eliteData.chapter_pack[eliteData.chapter_pack.length - 1]);
		}

		let newThis = this;
		for (let i = 0; i < instanceListElite.length; i++) {
			let goodsTbl = Game.PlayerInstanceSystem.ChestItem(instanceListElite[i]).goods_ids;
			let countTbl = Game.PlayerInstanceSystem.ChestItem(instanceListElite[i]).goods_counts;

			let _type = PlayerItemSystem.ItemType(goodsTbl[0]);
			let groupY: number;
			let type: number = 0;
			if (e.stageY >= this.father.height / 2) {
				groupY = e.stageY - e.localY;
				type = 1;
			}
			else {
				groupY = e.stageY - e.localY + this.height;
			}

			if (i == 0) {
				if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
					loadUI(CommonDesGeneral).then((dialog: CommonDesGeneral) => {
						dialog.x = newThis.data.father.groupDesProp.x + 300;
						if (type == 1) {
							dialog.y = groupY - dialog.height;
						}
						else {
							dialog.y = groupY;
						}
						dialog.name = "Award";
						dialog.setInfo(goodsTbl[0], countTbl[0]);
						newThis.father.addChild(dialog);
					});
				} else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
					loadUI(Common_DesRes).then((dialog: Common_DesRes) => {

						dialog.x = newThis.data.father.groupDesProp.x + 300;
						if (type == 1) {
							dialog.y = groupY - dialog.height;
						}
						else {
							dialog.y = groupY;
						}
						dialog.name = "Award";
						dialog.setInfo(goodsTbl[0], countTbl[0]);
						newThis.father.addChild(dialog);
					});
				} else {
					loadUI(CommonDesProp).then((dialog: CommonDesProp) => {
						dialog.x = newThis.data.father.groupDesProp.x + 300;
						if (type == 1) {
							dialog.y = groupY - dialog.height;
						}
						else {
							dialog.y = groupY;
						}
						dialog.name = "Award";
						dialog.init(goodsTbl[0], countTbl[0]);
						newThis.father.addChild(dialog);
					});
				}
			}
		}
	}

	private onBtnAwardEnd() {
		this.data.father.onRemoveDialog();
	}

}

/**
 * 冒险通关奖励Item数据
 */
export class HXH_InstancePassDropInfoItemData {
	id: number;
	info: TableInstanceArea;
	index: number;
	father: HXH_InstancePassDropInfo;
}
}
namespace zj {
/**
 * 掉落奖励Item
 * created by Lian Lei
 */
export class Common_Item extends eui.ItemRenderer {

	private groupAll: eui.Group;
	private imgFrame: eui.Image;
	private groupLight: eui.Group;
	private imgIcon: eui.Image;
	private imgPiece: eui.Image;
	private imgMask: eui.Image;
	private labelTextNum: eui.BitmapLabel;
	private groupLP: eui.Group;
	private groupIcon: eui.Group;
	private groupAnimate: eui.Group;
	private goodsId: number;
	private goodsCount: number;
	private idx: number;
	private father;

	private type: number;
	private CurState = {
		/**加载冒险列表掉落物品 */
		Drop: 1,
		/**扫荡副本 */
		Sweep: 2,
		/**探索奖励预览 */
		Reward: 3,
		/**猎人获取徽章 */
		GetBadge: 4
	};

	private imageMask: eui.Image;
	private rect: eui.Rect;

	public constructor() {
		super();
		this.skinName = "resource/skins/common/Common_ItemSkin.exml";
		this.imgMask.visible = false;
		this.type = this.CurState.Drop;

		this.groupAll.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnTouchBeginShow, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveDialog, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.father = null;
		}, null);
		cachekeys(<string[]>UIResource["Common_Item"], null);

		// 碎片遮罩
		this.imageMask = new eui.Image;
		this.imageMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
		this.imageMask.horizontalCenter = 0;
		this.imageMask.verticalCenter = 0;
		this.imageMask.width = this.imgIcon.width;
		this.imageMask.height = this.imgIcon.height;
		this.imgMask.visible = false;

	}

	protected dataChanged() {
		this.setInfo(this.data);
	}

	private setInfo(data: Common_ItemData) {
		this.father = data.father;
		this.type = data.type;

		if (data.type == data.CurState.Drop || data.type == data.CurState.GetBadge) {
			this.setInfoProp(data.info, null);
			this.scaleX = 0.5;
			this.scaleY = 0.5;
		}
		else if (data.type == data.CurState.Sweep) {
			this.setInfoProp(data.info, null);
			this.setWipeTenDropInfo(data.index);
			this.scaleX = 1;
			this.scaleY = 1;
		}
		else if (data.type == data.CurState.Reward) {
			this.setInfoProp(data.info, data.count);
			this.scaleX = 0.5;
			this.scaleY = 0.5;
		}

		if(data.scale > 0){
			this.scaleX = data.scale;
			this.scaleY = data.scale;
		}
	}

	// 显示数量的
	private setInfoItem(itemId: number, itemCount: number) {
		this.goodsId = itemId;
		this.goodsCount = itemCount;

		let itemSet = PlayerItemSystem.Set(itemId) as any;

		this.imgFrame = itemSet.Frame;
		this.groupLight.removeChildren();
		this.imgPiece.source = cachekey(itemSet.Logo, this);
		this.imgIcon.source = cachekey(itemSet.Path, this);

		this.chooseMask(this.goodsId);

		this.labelTextNum.visible = (itemCount != null);
		this.labelTextNum.text = itemCount.toString();
	}

	// 显示道具数量的
	private setInfoProp(itemId: number, itemCount?: number) {
		let itemSet = PlayerItemSystem.Set(itemId) as any;
		this.goodsId = itemId;
		this.goodsCount = itemCount;

		this.imgFrame.source = cachekey(itemSet.Frame,this);
		this.groupLight.removeChildren();
		this.imgPiece.source = cachekey(itemSet.Logo, this);
		this.imgIcon.source = cachekey(itemSet.Path, this);

		this.chooseMask(this.goodsId);

		this.labelTextNum.visible = (itemCount != null);

		if (itemCount != null) {
			this.labelTextNum.text = itemCount.toString();
		}
	}

	// 伏牛寨用 
	private setInfoAdd(path, name, award, info) {
		this.imgIcon.source = cachekey(path, this);

		this.chooseMask(this.goodsId);
		this.imgPiece.visible = false;
		this.labelTextNum.text = "";
	}

	// 武将界面羁绊卡用
	private setInfoPartner(itemId: number) {
		this.goodsId = itemId;
		this.goodsCount = PlayerItemSystem.Count(itemId);

		let itemSet = PlayerItemSystem.Set(itemId) as any;

		this.imgFrame.source = cachekey(itemSet.Frame, this);
		this.imgIcon.visible = false;
		this.imgMask.source = cachekey(itemSet.Mask, this);
		this.imgPiece.source = cachekey(itemSet.Logo, this);

		this.chooseMask(this.goodsId);

		this.labelTextNum.visible = false;
	}

	// 扫荡副本专用
	private setWipeTenDropInfo(index: number) {
		let goods: message.GoodsInfo = this.father.father.sweepDrps[this.father.id][index];
		this.setInfoItem(goods.goodsId, goods.count);
		this.idx = index;

		this.goodsId = goods.goodsId;
		this.goodsCount = goods.count;
	}

	// 不显示道具数量的
	private setInfoPropNoNum(itemId: number) {
		this.goodsId = itemId;

		let itemSet = PlayerItemSystem.Set(itemId) as any;
		this.imgFrame.source = cachekey(itemSet.Frame, this);
		this.imgIcon.visible = false;
		this.imgPiece.source = cachekey(itemSet.Logo, this);
		this.imgIcon.source = cachekey(itemSet.Path, this);

		this.chooseMask(this.goodsId);

		this.labelTextNum.visible = false;
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

	private chooseMask(goodsId: number) {
		this.groupAnimate.removeChildren();
		if (this.isImgMask(goodsId)) {
			this.imgMask.visible = true;
			this.imgIcon.mask = this.imageMask;
			this.groupAnimate.addChild(this.imageMask);
		} else if (this.isRectMask(goodsId)) {
			this.rect.visible = true;
			this.imgMask.visible = false;
			this.imgIcon.mask = this.rect;
			this.groupAnimate.addChild(this.rect);
		}
	}

	private onBtnTouchBeginShow(e: egret.TouchEvent) {
		if (Game.TeachSystem.curPart == 3002) return;
		let newThis = this;
		let touchX = e.stageX;
		let groupY: number;
		let type: number = 0;// type == 1 点击位置大于父类高度的一半
		let _type: number = PlayerItemSystem.ItemType(newThis.goodsId);

		if (egret.getQualifiedClassName(newThis.data.father) == "zj.HXH_InstanceAdventureItem") {
			newThis.data.father.data.isOpen = !newThis.data.father.data.isOpen;
		}

		if (newThis.type == newThis.CurState.Sweep) {
			if (e.stageY >= this.data.father.father.height / 2) {
				groupY = e.stageY - e.localY;
				type = 1;
			}
			else {
				groupY = e.stageY + 10;
			}
		}
		else if (newThis.type == newThis.CurState.GetBadge) {
			if (e.stageY >= this.data.father.height / 2) {
				groupY = e.stageY - e.localY;
				type = 1;
			}
			else {
				groupY = e.stageY + 10;
			}
		}
		else {
			// if (e.stageY >= this.data.father.father.father.height / 2) {
			if (e.stageY >= UIManager.StageHeight / 2) {
				groupY = e.stageY - e.localY;
				type = 1;
			}
			else {
				groupY = e.stageY + 10;
			}
		}

		if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
			loadUI(CommonDesGeneral).then((dialog: CommonDesGeneral) => {
				dialog.name = "DropOrAward";
				dialog.x = touchX - dialog.width / 2 - 10;
				if (type == 1) {
					dialog.y = groupY - dialog.height;
				}
				else {
					dialog.y = groupY;
				}
				dialog.setInfo(newThis.goodsId, newThis.goodsCount);

				if (newThis.type == newThis.CurState.Sweep) {
					newThis.data.father.father.addChild(dialog);
				}
				else if (newThis.type == newThis.CurState.GetBadge) {
					newThis.data.father.addChild(dialog);
				}
				else {
					newThis.data.father.father.father.addChild(dialog);
				}
			});
		} else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
			loadUI(Common_DesRes).then((dialog: Common_DesRes) => {
				dialog.name = "DropOrAward";
				dialog.x = touchX - dialog.width / 2 - 10;
				if (type == 1) {
					dialog.y = groupY - dialog.height;
				}
				else {
					dialog.y = groupY;
				}
				dialog.setInfo(newThis.goodsId, newThis.goodsCount);
				if (newThis.type == newThis.CurState.Sweep) {
					newThis.data.father.father.addChild(dialog);
				}
				else if (newThis.type == newThis.CurState.GetBadge) {
					newThis.data.father.addChild(dialog);
				}
				else {
					newThis.data.father.father.father.addChild(dialog);
				}
			});
		} else if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
			loadUI(Common_DesRandom).then((dialog: Common_DesRandom) => {
				dialog.name = "DropOrAward";
				dialog.x = touchX - dialog.width / 2 - 10;
				if (type == 1) {
					dialog.y = groupY - dialog.height;
				}
				else {
					dialog.y = groupY;
				}
				dialog.setInfo(newThis.goodsId, newThis.goodsCount);
				if (newThis.type == newThis.CurState.Sweep) {
					newThis.data.father.father.addChild(dialog);
				}
				else if (newThis.type == newThis.CurState.GetBadge) {
					newThis.data.father.addChild(dialog);
				}
				else {
					newThis.data.father.father.father.addChild(dialog);
				}
			});
		} else {
			loadUI(CommonDesProp).then((dialog: CommonDesProp) => {
				dialog.name = "DropOrAward";
				dialog.x = touchX;
				dialog.x = touchX - dialog.width / 2 - 10;
				if (type == 1) {
					dialog.y = groupY - dialog.height;
				}
				else {
					dialog.y = groupY;
				}
				dialog.init(newThis.goodsId, newThis.goodsCount);
				if (newThis.type == newThis.CurState.Sweep) {
					newThis.data.father.father.addChild(dialog);
				}
				else if (newThis.type == newThis.CurState.GetBadge) {
					newThis.data.father.addChild(dialog);
				}
				else {
					newThis.data.father.father.father.addChild(dialog);
				}
			});
		}
	}

	private onRemoveDialog() {
		if (this.type == this.CurState.Sweep) {
			this.data.father.father.onRemoveDialog();
		}
		else if (this.type == this.CurState.GetBadge) {
			this.data.father.onRemoveDialog()
		}
		else {
			this.data.father.father.father.onRemoveDialog();
		}

	}
}

export class Common_ItemData {
	info: number;
	count: number;
	father;
	type: number;
	index: number;
	scale: number;
	CurState = {
		/**加载冒险列表掉落物品 */
		Drop: 1,
		/**扫荡副本 */
		Sweep: 2,
		/**探索奖励预览 */
		Reward: 3,
		/**猎人获得徽章 */
		GetBadge: 4
	};
}
}
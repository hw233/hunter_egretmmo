namespace zj {
/**
 * 冒险主场景可领取奖励UI
 * created by LianLei
 * 2019.2.27
 */
export class HXH_InstanceGiftView extends UI {

	private groupAll: eui.Group;
	private imgFrame: eui.Image;
	private imgIcon: eui.Image;
	private groupClip: eui.Group;
	private labelAwardNum: eui.BitmapLabel;
	private labelLayer: eui.Label;
	private groupAni: eui.Group;
	private imgGet: eui.Image;
	private groupAnimate: eui.Group;
	private imgMask: eui.Image;
	private rectMask: eui.Image;
	private rectMaskCommon: eui.Image;

	public constructor() {
		super();
		this.skinName = "resource/skins/adventureMap/HXH_InstanceGiftViewSkin.exml";
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			egret.Tween.removeTweens(this); // 因为是循环播放，需要特别处理
		}, null);

		this.runAni();
		// 碎片遮罩
		this.imgMask = new eui.Image;
		this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
		this.imgMask.horizontalCenter = 0;
		this.imgMask.verticalCenter = 0;
		this.imgMask.width = 56;
		this.imgMask.height = 56;
		this.groupAnimate.addChild(this.imgMask);
		this.imgMask.visible = false;

		// 徽章遮罩
		this.rectMask = Util.getMaskImgBlack(53, 53);
		this.rectMask.horizontalCenter = 0;
		this.rectMask.verticalCenter = 2;
		this.groupAnimate.addChild(this.rectMask);
		this.rectMask.visible = false;

		//普通物品遮罩
		this.rectMaskCommon = Util.getMaskImgBlack(53, 53);
		this.rectMaskCommon.horizontalCenter = 0;
		this.rectMaskCommon.verticalCenter = -2;
		this.groupAnimate.addChild(this.rectMaskCommon);
		this.rectMaskCommon.visible = false;
	}

	/**
	 * 刷新区域上方浮动奖励
	 * @param areaId 区域ID
	 */
	private fresh(areaId: number) {
		if (areaId > Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID) {
			this.groupAll.visible = false;
			return;
		}

		let instanceData: TableInstanceArea = Game.PlayerInstanceSystem.AreaInstance(areaId);
		if (instanceData == null) return;

		let chapterList: Array<number> = instanceData.area_normal;
		let eliteList: Array<number> = instanceData.area_elite;
		let instanceListNormal: Array<number> = [];
		let instanceListElite: Array<number> = [];

		for (let i = 0; i < chapterList.length; i++) {
			let vv: number = chapterList[i];
			let chapterData: TableChapterNormal = null;
			chapterData = Game.PlayerInstanceSystem.ChapterInstance(vv);
			instanceListNormal.push(chapterData.chapter_pack[chapterData.chapter_pack.length - 1]);
		}

		for (let i = 0; i < eliteList.length; i++) {
			let vv: number = eliteList[i];
			let eliteData: TableChapterElite = null;
			eliteData = Game.PlayerInstanceSystem.EliteInstance(vv);
			instanceListElite.push(eliteData.chapter_pack[eliteData.chapter_pack.length - 1]);
		}

		let giftInfoNormal: Array<any> = Table.DeepCopy(instanceListNormal);
		let giftInfoElite: Array<any> = Table.DeepCopy(instanceListElite);

		// normal
		for (let i = 0; i < instanceListNormal.length; i++) {
			let vv: number = instanceListNormal[i];
			let mobInfos: Array<message.MobInfo> = Game.PlayerInstanceSystem.mobInfos;
			let instance: message.MobInfo = null;

			for (let j = 0; j < mobInfos.length; j++) {
				if (mobInfos[j].mobId == vv) {
					instance = mobInfos[j];
					break;
				}
			}

			if (instance != null && instance.star != 0) {
				giftInfoNormal[i] = instance;
			}

			if (typeof giftInfoNormal[i] === "number" || giftInfoNormal[i].star == 0 || giftInfoNormal[i].chestReward == false) {
				if (giftInfoNormal[i] instanceof Object && giftInfoNormal[i].star != 0 && giftInfoNormal[i].chestReward == false) {
					this.imgGet.visible = true;
					let path: string = "ui_instance_WordsBoxCanGet_png";
					this.imgGet.source = cachekey(path, this);
				}
				else {
					this.imgGet.visible = false;
				}

				let goods_tbl: Array<number> = Game.PlayerInstanceSystem.ChestItem(vv).goods_ids;
				let count_tbl: Array<number> = Game.PlayerInstanceSystem.ChestItem(vv).goods_counts;
				let itemSet = PlayerItemSystem.Set(goods_tbl[0], 0, count_tbl[0]) as any;

				this.groupClip.removeChildren();
				this.imgFrame.source = cachekey(itemSet.Frame, this);
				this.imgIcon.source = cachekey(itemSet.Path, this);

				// if (this.isImgMask(goods_tbl[0])) {
				// 	this.imgMask.visible = true;
				// 	this.rectMask.visible = false;
				// 	this.rectMaskCommon.visible = false;
				// 	this.imgIcon.mask = this.imgMask;
				// } else if (this.isRectMask(goods_tbl[0])) {
				// 	this.rectMask.visible = true;
				// 	this.rectMaskCommon.visible = false;
				// 	this.imgMask.visible = false;
				// 	this.imgIcon.mask = this.rectMask;
				// } else {
				// 	this.imgMask.visible = false;
				// 	this.rectMask.visible = false;
				// 	this.rectMaskCommon.visible = true;
				// 	this.imgIcon.mask = this.rectMaskCommon;
				// }
				if (this.isImgMask(goods_tbl[0]) && goods_tbl[0] == 40008) {
					this.imgMask.visible = true;
					this.rectMask.visible = false;
					this.rectMaskCommon.visible = false;
					this.imgIcon.mask = this.imgMask;
				}
				else {
					this.imgMask.visible = false;
					this.rectMask.visible = false;
					this.rectMaskCommon.visible = false;
					this.imgIcon.mask = null;
				}
				this.labelAwardNum.text = ("x" + Set.NumberUnit2(count_tbl[0]));
				return;
			}
		}

		for (let i = 0; i < instanceListElite.length; i++) {
			let vv: number = instanceListElite[i];
			let mobInfos: Array<message.MobInfo> = Game.PlayerInstanceSystem.mobInfos;
			let instance: message.MobInfo = null;

			for (let j = 0; j < mobInfos.length; j++) {
				if (mobInfos[j].mobId == vv) {
					instance = mobInfos[j];
					break;
				}
			}

			if (instance != null && instance.star != 0) {
				giftInfoElite[i] = instance;
			}

			if (typeof giftInfoElite[i] === "number" || giftInfoElite[i].star == 0 || giftInfoElite[i].chestReward == false) {
				if (giftInfoElite[i] instanceof Object && giftInfoElite[i].star != 0 && giftInfoElite[i].chestReward == false) {
					this.imgGet.visible = true;
					let path: string = "ui_instance_WordsBoxCanGet_png";
					this.imgGet.source = cachekey(path, this);
				}
				else {
					this.imgGet.visible = false;
				}

				let goods_tbl: Array<number> = Game.PlayerInstanceSystem.ChestItem(vv).goods_ids;
				let count_tbl: Array<number> = Game.PlayerInstanceSystem.ChestItem(vv).goods_counts;
				let itemSet = PlayerItemSystem.Set(goods_tbl[0], 0, count_tbl[0]) as any;

				this.groupClip.removeChildren();
				this.imgFrame.source = cachekey(itemSet.Frame, this);
				this.imgIcon.source = cachekey(itemSet.Path, this);
				this.labelAwardNum.text = ("x" + Set.NumberUnit2(count_tbl[0]));

				return;
			}
		}
		this.groupAll.visible = false;
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

	/**上下浮动动画 */
	private runAni() {
		let off: number = 5 + 2 * Math.random();
		let time: number = (1 + 0.5 * Math.random()) * 1000;
		let groupY: number = this.y;
		if (Math.random() > 0.5) {
			egret.Tween.get(this, { loop: true }).to({ y: -off }, time, egret.Ease.sineInOut).to({ y: off }, time, egret.Ease.sineInOut).to({ y: groupY }, time, egret.Ease.sineInOut);
		}
		else {
			egret.Tween.get(this, { loop: true }).to({ y: off }, time, egret.Ease.sineInOut).to({ y: -off }, time, egret.Ease.sineInOut).to({ y: groupY }, time, egret.Ease.sineInOut);
		}
	}

	/**
	 * 刷新方法(外部调用)
	 * @param areaId 区域ID
	 */
	public onTapFresh(areaId: number) {
		this.fresh(areaId);
	}
}
}
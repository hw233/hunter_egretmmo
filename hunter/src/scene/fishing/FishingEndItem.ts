namespace zj {
//FishingEndItem
//yuqingchao
//2019.05.18
export class FishingEndItem extends eui.ItemRenderer {
	private imgFish: eui.Image;
	private imgFrame: eui.Image;
	private imgClid: eui.Image;
	public imgDouble: eui.Image;//二倍
	private groupAni: eui.Group;
	private groupAll: eui.Group;
	private groupItem: eui.Group;
	private groupBoard: eui.Group;
	private groupFish: eui.Group;
	private imgLableBoard: eui.Image;
	private imgLable: eui.Image;
	private lbNum: eui.Label;
	private lbName: eui.Label;
	private goods;
	private id: number = null;
	private itemSet: any;
	private good;
	public constructor() {
		super();
		this.skinName = "resource/skins/fishing/FishingEndItemSkin.exml";
		cachekeys(<string[]>UIResource["FishingEndItem"], null);
		Game.EventManager.on(GameEvent.FISHING_ENDITEM, this.setDouble, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			Game.EventManager.off(GameEvent.FISHING_ENDITEM, this.setDouble, this);
		}, null);
		this.goods = this.goods;
	}
	protected dataChanged() {
		this.goods = this.data.info;
		this.id = this.data.id;

		let fish = this.fishInstance(this.goods.index);
		this.imgLable.source = cachekey(fish.image_title, this);
		this.imgFish.source = cachekey(fish.fish_image, this);
		this.groupItem.visible = false;
		if (this.data.double) {
			setTimeout(() => {
				this.imgLable.visible = false;
				this.imgFish.visible = false;
				this.playAni();
			}, 1000);
		} else {
			this.setGoods(this.data.double);
		}

		this.lbNum.visible = false;
	}
	public setGoods(double?: boolean) {
		this.imgLable.visible = false;
		this.groupItem.visible = true;
		this.imgFish.visible = false;
		this.itemSet = PlayerItemSystem.Set(this.goods.goodsId) as any;
		this.imgFrame.source = cachekey(UIConfig.UIConfig_Common.itemFrame[this.goods.index], this);
		this.imgClid.source = cachekey(this.itemSet.Clip, this);
		if (double == false) {
			this.imgDouble.visible = true;
			let itemSet = PlayerItemSystem.Set(this.goods.goodsId) as any;
			this.lbName.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextConfig_League.fish_giftAndNumDouble, itemSet.Info.name, this.goods.count * 2));
		}
		else {
			this.imgDouble.visible = false;
			this.lbName.text = Helper.StringFormat(TextsConfig.TextConfig_League.fish_giftAndNum, this.itemSet.Info.name, this.goods.count);
		}
	}
	private fishInstance(id) {
		if (ckid(this.id)) {
			return null;
		};
		let tbl = Game.ConfigManager.getTable(StringConfig_Table.leagueFish + ".json");
		return tbl[id];
	}
	private playAni() {
		Game.DragonBonesManager.playAnimation(this, "tlzd_buyu_eff", null, "000_buyu", 1)
			.then((display: dragonBones.EgretArmatureDisplay) => {
				this.groupAni.removeChildren();
				this.groupAni.addChild(display);
				this.setGoods();
			})
			.catch(reason => {
				toast(reason);
			});
	}
	private setDouble() {
		this.imgDouble.visible = true;
		let itemSet = PlayerItemSystem.Set(this.goods.goodsId) as any;
		this.lbName.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextConfig_League.fish_giftAndNumDouble, itemSet.Info.name, this.goods.count * 2));
	}
}
}
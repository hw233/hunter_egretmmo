namespace zj {
/**
 * @author xing li wei
 * 
 * @date 2019-5-6
 * 
 * @class 赏金特训list子项
 */
export class ActivityWeekMissionGiftItem extends eui.ItemRenderer {
	private imgSelect: eui.Image;
	private TableViewAward: eui.List;
	private ButtonBuy: eui.Button;
	private SpriteIcon: eui.Image;
	private LabelToken: eui.BitmapLabel;
	private SpriteTips5: eui.Image;
	private LabelTimes: eui.Label;
	private SpriteBuy: eui.Image;

	private buyTimes: number;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityWeekMissionGiftItemSkin.exml";
		cachekeys(<string[]>UIResource["ActivityWeekMissionGiftItem"], null);
		this.ButtonBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuy, this);
	}

	protected dataChanged() {
		let data = this.data as ActivityWeekMissionGiftItemData;
		this.buyTimes = data.payAward.buyTimes;
		this.SpriteTips5.visible = false;
		this.freshUI();
		this.setInfoAward(data);
	}

	private freshUI() {
		let data = this.data as ActivityWeekMissionGiftItemData;
		this.LabelToken.text = data.payAward.token.toString();
		if (data.payAward.buyTimes >= data.payAward.canBuyTimes) {
			this.LabelTimes.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Activity.Jewel.r_lastTimes, data.payAward.canBuyTimes - this.buyTimes, data.payAward.canBuyTimes));
			this.SpriteBuy.visible = true;
			this.ButtonBuy.enabled = false;
		} else {
			this.LabelTimes.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Activity.Jewel.g_lastTimes, data.payAward.canBuyTimes - this.buyTimes, data.payAward.canBuyTimes));
			this.SpriteBuy.visible = false;
			this.ButtonBuy.enabled = true;
		}
	}

	private setInfoAward(data: ActivityWeekMissionGiftItemData) {
		let itemInfo = data.payAward.goods;
		let array = new eui.ArrayCollection();
		for (let i = 0; i < itemInfo.length; i++) {
			let data = new ActivityNoviceItemItemData();
			data.index = i;
			let a = [];
			a[0] = itemInfo[i].id;
			a[1] = itemInfo[i].count;
			data.itemInfo = a;
			data.father = this;
			array.addItem(data);
		}
		this.TableViewAward.dataProvider = array;
		this.TableViewAward.itemRenderer = ActivityNoviceItemItem
	}

	public setInfoTag(id) {

	}

	private onBtnBuy() {
		let data = this.data as ActivityWeekMissionGiftItemData;
		let info = Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds();
		data.father.MissionWeekMallReqBody(data.payAward.id)
			.then((getGoods: message.GoodsInfo[]) => {
				data.payAward.buyTimes += 1;
				let goods = Table.DeepCopy(getGoods);
				let hero = Table.FindR(goods, (k: number, v: message.GoodsInfo) => {
					return PlayerItemSystem.ItemType(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL;
				})
				if (hero[0] != null) {
					loadUI(CommonGetGeneral)
						.then((dialog: CommonGetGeneral) => {
							dialog.setInfo(hero[0].goodsId, null, () => {
								loadUI(CommonGetDialog)
									.then((dialog: CommonGetDialog) => {
										dialog.init(goods);
										dialog.setCB(() => {
											this.freshUI();
										});
										dialog.show(UI.SHOW_FROM_TOP);
									});
							}, info);
							dialog.show(UI.SHOW_FROM_TOP);
						});
				} else {
					loadUI(CommonGetDialog)
						.then((dialog: CommonGetDialog) => {
							dialog.init(goods);
							dialog.setCB(() => {
								this.freshUI();
							});
							dialog.show(UI.SHOW_FROM_TOP);
						});
				}
			}).catch((result) => {
				if (result == "钻石不足") {
					TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Money.demstone, () => {
						loadUI(PayMallScene)
							.then((scene: PayMallScene) => {
								scene.show(UI.SHOW_FROM_TOP);
								scene.init(true);
							});
					})
				} else {
					toast_warning(result);
				}
			})
	}

}

export class ActivityWeekMissionGiftItemData {
	index: number;
	payAward: {
		goods: {
			id: number;
			count: number;
		}[];
		canBuyTimes: number;
		token: number;
		buyTimes: number;
		id: number;
	};
	father: weekActBase;
}
}
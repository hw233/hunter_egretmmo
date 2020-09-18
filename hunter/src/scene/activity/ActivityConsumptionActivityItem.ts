namespace zj {
//累计消耗Item
//yuqingchao
//2019.04.01
export class ActivityConsumptionActivityItem extends eui.ItemRenderer {
	private lbInfo: eui.Label;				//条件
	private lbMoney: eui.Label;
	private lstView: eui.List;
	private arrayCollection: eui.ArrayCollection;
	private btnGet: eui.Button;				//领取按钮
	private imgGet: eui.Image;				//已领取图片
	private info;
	private main: ActivityMain;
	private father: null;
	private reward;
	private index: number = 0;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityConsumptionActivityItemSkin.exml";
		cachekeys(<string[]>UIResource["ActivityConsumptionActivityItem"], null);
		this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			// this.father = null;
			this.main = null;
		}, null);
	}
	protected dataChanged() {
		this.index = this.data.i - 1;
		this.info = this.data.info;
		this.father = this.data.father;
		this.main = this.data.main;
		this.reward = this.data.info.rewardZone[this.index];
		this.setInfoText();
		this.setInfoGoods();
		this.setInfoGet();
	}
	private setInfoText() {
		let strCount = HelpUtil.textConfigFormat((this.father as ActivityConsumptionActivity).saveInfo.acount, this.reward);
		this.lbInfo.textFlow = Util.RichText(strCount)
	}
	private setInfoGoods() {
		this.arrayCollection = new eui.ArrayCollection();
		let arr = this.info.rewards;
		for (let i = 0; i < this.info.rewards[this.index].goodsInfo.length; i++) {
			this.arrayCollection.addItem({
				i: this.index,
				j: i,
				info: this.info.rewards[this.index].goodsInfo[i],
				main: this.main,
			})
		}
		this.lstView.dataProvider = this.arrayCollection;
		this.lstView.itemRenderer = ActivityAwardItem;
	}
	private setInfoGet() {
		let bStart = (this.father as ActivityConsumptionActivity).getInfoStart();
		let bIsGet = Table.VIn(this.info.rewardIndex, this.data.i);
		let bNotGet = this.info.itemCount >= this.reward && !bIsGet && bStart;

		this.btnGet.enabled = bNotGet;
		this.btnGet.visible = !bIsGet;
		this.imgGet.visible = bIsGet;
	}
	private onBtnGet() {
		let type = this.info.type;
		let index = this.info.index;
		let rewardIndex = this.data.i;
		Game.PlayerActivitySystem.activityReward(type, index, rewardIndex, false).then((resp: message.GameInfo) => {
			loadUI(CommonGetDialog)
				.then((dialog: CommonGetDialog) => {
					dialog.init(resp.getGoods);
					dialog.show();
					dialog.setCB(() => {
						this.data.father.onLstView();
						Game.EventManager.event(GameEvent.ACTIVITY_TYPE_UPDATE);
					})
				});
		});
	}
}
}
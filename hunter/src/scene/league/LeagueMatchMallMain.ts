namespace zj {
//战功商店
//yuqingchao
//2019.01.26
export class LeagueMatchMallMain extends Dialog {
	private lstViewItem: eui.List;
	private lbTimeTips: eui.Label;		//更新时间
	private lbMoney: eui.Label;		//拥有战功币
	private imgCost: eui.Image;		//战功币图片
	private btnClose: eui.Button;		//退出按钮
	private buyInfo: any;
	private array: eui.ArrayCollection;
	private isLeague = [TableEnum.Enum.Mall.LEAGUE];
	private scrollerInfo: eui.Scroller;
	public nowMoney: any;
	private index: number = 0;
	private moveLocation: number = 0;		//列表下拉移动位置

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueMatchMallMainSkin.exml";
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.lstViewItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.AddShopmallList, this);
		this.lbTimeTips.text = TextsConfig.TextsConfig_Mall.fourfresh;
		this.SetUpdateRes();
		this.ReqMall();
		this.lstViewItem.selectedIndex = 0;		//默认选中
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			egret.Tween.removeTweens(this);
		}, this)
		Game.EventManager.on(GameEvent.LEAGUE_MATCH_MALL_MAIN_UPDATE, this.SetUpdate, this);
	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}

	private SetUpdate() {
		this.ReqMall();
		this.SetUpdateRes();
	}

	private SetUpdateRes() {
		let index = this.index != 0 ? this.index : TableEnum.Enum.Mall.NORMAL;
		let _COST_MALL = message.EResourceType.RESOURCE_LEAGUE_SCORE;
		let id = _COST_MALL;
		let str_res = PlayerItemSystem.Str_Resoure(id);

		this.lbMoney.text = str_res;

		let count = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_LEAGUE_SCORE);
		this.nowMoney = count;

		let time = (Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MALL_LEAGUE_SCORE].leftTime - Math.floor(egret.getTimer() / 1000));
		if (time <= 0) {
			Game.PlayerProgressesSystem.checkProcess([message.EProcessType.PROCESS_TYPE_MALL_LEAGUE_SCORE]).then(() => {
				this.SetUpdate();
			});
		}
	}

	//折扣
	public getDiscount() {
		return Table.VIn(this.isLeague, 6);
	}

	//商店数据
	private _mall_data = [];
	private ReqMall() {
		let type = TableEnum.Enum.Mall[6];
		PlayerProgressesSystem.ReqGain(type)
			.then((data: any) => {
				this._mall_data[6] = [];
				this._mall_data[6] = data.body.items;
				this.SetInfoMall();
			})
	}

	//点击购买物品
	public buy(mallId, count: number) {
		let type = TableEnum.Enum.Mall[6];
		PlayerProgressesSystem.ReqBuy(type, mallId, count)
			.then((data: any) => {
				egret.Tween.get(this)
					.call(() => {
						this.buyInfo.onBtnClose();
					})
					.wait(500, true)
					.call(() => {
						loadUI(CommonGetDialog)
							.then((dialog: CommonGetDialog) => {
								dialog.init(data.body.gameInfo.getGoods);
								dialog.show();
							});
					});

				this.scrollerInfo.viewport = this.lstViewItem;
				this.scrollerInfo.validateNow();
				this.moveLocation = this.scrollerInfo.viewport.scrollV;
				Game.EventManager.event(GameEvent.LEAGUE_MATCH_MALL_MAIN_UPDATE);
			}).catch(reason => { });
	}

	private SetInfoMall() {
		this.array = new eui.ArrayCollection();
		for (let i = 0; i < this._mall_data[6].length; i++) {
			this.array.addItem({
				malldata: this._mall_data[6][i]
			})
		}

		this.lstViewItem.dataProvider = this.array;
		this.lstViewItem.itemRenderer = LeagueMatchMallMainItem;

		this.scrollerInfo.viewport = this.lstViewItem;
		this.scrollerInfo.validateNow();
		this.scrollerInfo.viewport.scrollV = this.moveLocation;
	}

	//购买商品界面
	private AddShopmallList(e: eui.ItemTapEvent) {
		let lastData: any = this._mall_data[6][this.lstViewItem.selectedIndex];
		if (lastData.remain <= 0) {

		} else {
			if (lastData.remain >= 10) {
				loadUI(LeagueMatchMallMainBuyAll)
					.then((dialog: LeagueMatchMallMainBuyAll) => {
						this.buyInfo = dialog;
						dialog.init();
						dialog.setInfo(lastData, this);
						dialog.show(UI.SHOW_FROM_TOP);
					});
			} else {
				loadUI(LeagueMatchMallMainBuyOne)
					.then((dialog: LeagueMatchMallMainBuyOne) => {
						this.buyInfo = dialog;
						dialog.setInfo(lastData, this);
						dialog.show(UI.SHOW_FROM_TOP);
					});
			}
		}
	}
}
}
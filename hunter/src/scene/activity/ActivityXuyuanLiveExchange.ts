namespace zj {
// ActivityXuyuanLiveExchange
// yuqingchao
// 2019.05.10
export class ActivityXuyuanLiveExchange extends Dialog {
	private btnClose: eui.Button;
	private imgFrame: eui.Image;				//头像框
	private imgIcon: eui.Image;					//头像
	private lbNum: eui.Label;					//数量
	private lbName: eui.Label;					//资源名
	private lbType: eui.Label;
	private lbOwn: eui.Label;
	private lbDes: eui.Label;					//介绍
	private btnBuy: eui.Button;					//确认兑换
	private btnSub: eui.Button;					//减
	private btnAdd: eui.Button;					//加
	private btnMax: eui.Button;					//最大
	private lbCount: eui.Label;					//兑换数量
	private lbCost2: eui.Label;					//共计花费
	private count: number = 1;
	private father: ActivityXuyuanLiveItem;
	private maxCount: any = null;
	private saveCost: any = null;
	private MIN_COUNT = 1;
	private MAX_COUNT = 100;
	private _start: boolean = false;
	private _time: number = null;
	private _sount: number = null;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityXuyuanLiveExchangeSkin.exml";
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.btnSub.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSub, this);
		this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAdd, this);
		this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBntMax, this);
		this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuy, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			// this.father = null;
		}, null);
	}
	private init() {

	}
	public setInfo(father) {
		this.father = father;
		let buyTimes = Table.FindR(Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_exchangeZone, (k, v) => {
			return v.key == this.father.index;
		})[0];
		this.maxCount = buyTimes == null && this.father.exchangeTimes || this.father.exchangeTimes - buyTimes.value;
		this.setInfoMall();

		let num = Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_currentScore / this.saveCost;
		this.maxCount = num >= this.maxCount && this.maxCount || Math.floor(num);
	}
	private setInfoMall() {
		let id = this.father.goods.goodsId;
		let show = this.father.goods.showType;
		let count = this.father.goods.count;
		let itemSet = PlayerItemSystem.Set(id, show, count);
		let ownCount = PlayerItemSystem.Count(id);
		let strCount = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Mall.buy_count, ownCount);
		let strCost = this.father.score;
		this.saveCost = strCost;

		let iSet = itemSet as any;
		this.imgFrame.source = cachekey(itemSet.Frame, this);
		this.imgIcon.source = cachekey(itemSet.Clip, this);
		let info = itemSet.Info as any;
		this.lbName.text = info.name;
		this.lbType.text = iSet.TyprDes;
		this.lbDes.textFlow = Util.RichText(info.des);
		this.lbNum.text = count;
		this.lbOwn.text = strCount;
		this.lbCost2.text = strCost.toString();
		this.lbCount.text = this.count.toString();
	}
	private setInfoCount() {
		this.lbCount.text = this.count.toString();
		this.lbCost2.text = (this.saveCost * this.count).toString();
	}
	private onBtnSub() {
		this.count = this.count - 1;
		if (this.count <= this.MIN_COUNT) {
			this.count = this.MIN_COUNT;
		}

		this.setInfoCount();
	}
	private onBtnAdd() {
		let num = Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_currentScore / this.saveCost;
		if (num <= 1) {
			this.count = this.MIN_COUNT;
		} else {
			this.count = this.count + 1;
		}

		if (this.count >= this.MAX_COUNT) {
			this.count = this.MAX_COUNT;
		}

		this.setInfoCount();
	}
	private onBntMax() {
		let num = Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_currentScore / this.saveCost;
		this.count = num >= this.maxCount && this.maxCount || Math.floor(num);
		this.count = this.count > 0 && this.count || 1;
		this.setInfoCount();
	}
	private onBtnBuy() {
		if (this.getExchange()) {
			this.xuyuanStepReqBody_Visit(this.father.index, this.count).then((data: message.XuyuanExchangeResponse) => {
				if (data.header.result == 0) {
					setTimeout(() => {
						this.close(UI.HIDE_TO_TOP);
					}, 300)
					loadUI(CommonGetDialog)
						.then((dialog: CommonGetDialog) => {
							dialog.init(data.body.gameInfo.getGoods);
							dialog.show();
							dialog.setCB(() => {
								this.father.father.refreshScoreList();
								this.father.setInfoOther();
								Game.EventManager.event(GameEvent.XUYUAN_UPDATE);
							})
						});

				}
			})
		}
	}
	private getExchange() {
		let bBuy = Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_currentScore >= this.saveCost * this.count;
		if (!bBuy) {
			toast(TextsConfig.TextsConfig_Xuyuan.not_enough);
		}
		return bBuy;
	}
	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}
	private xuyuanStepReqBody_Visit(exchangeId: number, exchange_time: number) {
		return new Promise((resolve, reject) => {
			let request = new message.XuyuanExchangeRequest();
			request.body.exchangeId = exchangeId;
			request.body.exchange_time = exchange_time;
			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.XuyuanExchangeResponse>resp;
				console.log(response);
				if (response.header.result != 0) {
					//console.log(Game.ConfigManager.getAone2CodeReason(response.header.result));
					return;
				}
				resolve(response);
				return;
			}, (req: aone.AoneRequest): void => {
				reject(LANG("请求超时"));
				return;
			}, this, false, true);
			return;
		});
	}
}
}
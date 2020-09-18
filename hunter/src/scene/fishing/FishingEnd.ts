namespace zj {
//钓鱼结束奖励
//yuqingchao
//2019.05.18
export class FishingEnd extends Dialog {
	private btnDouble: eui.Button;
	private btnGet: eui.Button;
	private lstAward: eui.List;
	private arrLstAward: eui.ArrayCollection;
	private groupGold: eui.Group;
	private lbGold: eui.Label;
	private imgGold: eui.Image;
	private isDouble: boolean = false;
	private father;
	private child: FishingEndItem;
	private id: number;
	private item_list = [];
	private good = [];
	public constructor() {
		super();
		this.skinName = "resource/skins/fishing/FishingEndSkin.exml";
		this.btnDouble.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDouble, this);
		this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
		this.child = new FishingEndItem();
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.father = null;
			this.child = null;
		}, null);
	}
	public init(father) {
		this.isDouble = false;
		this.father = father;
		this.lbGold.text = CommonConfig.refresh_double_token(Game.PlayerMixUnitInfoSystem.mixunitinfo.refresh_double_time + 1).toString();
		this.setList();
		this.setCanNotClick();
		setTimeout(() => {
			this.setCanClick();
		}, 2000);
	}
	private freashInfo() {
		if (Game.PlayerMixUnitInfoSystem.mixunitinfo.goodses.length == 0 && !this.isDouble) {
			this.father.freashInfo(false);
		} else if (this.isDouble) {
			this.btnDouble.enabled = false;
			this.setList();
		}
	}
	private setList() {
		this.arrLstAward = new eui.ArrayCollection();
		let num = Game.PlayerMixUnitInfoSystem.mixunitinfo.goodses.length;
		if (this.btnDouble.enabled) {
			for (let i = 0; i < Game.PlayerMixUnitInfoSystem.mixunitinfo.goodses.length; i++) {
				this.good.push(Game.PlayerMixUnitInfoSystem.mixunitinfo.goodses[i]);
				this.arrLstAward.addItem({
					info: Game.PlayerMixUnitInfoSystem.mixunitinfo.goodses[i],
					id: i,
					double: this.btnDouble.enabled
				})
			}
		} else {
			for (let i = 0; i < this.good.length; i++) {
				this.arrLstAward.addItem({
					info: this.good[i],
					id: i,
					double: this.btnDouble.enabled
				})
			}

		}

		this.lstAward.dataProvider = this.arrLstAward;
		this.lstAward.itemRenderer = FishingEndItem;
	}
	private setCanNotClick() {
		this.btnDouble.visible = false;
		this.btnGet.visible = false;
		this.groupGold.visible = false;
	}
	private setCanClick() {
		this.btnDouble.visible = true;
		this.btnGet.visible = true;
		this.groupGold.visible = true;
		Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, {isAni: true});
	}
	private onBtnDouble() {
		this.isDouble = true;
		this.leagueFishingReward_Visit(true).then((data: message.LeagueFishingRewardResponse) => {
			if (data.header.result == 0) {
				this.freashInfo();
			} else {
				if (this.isDouble) {
					this.isDouble = false;
				}
				if (data.header.result == 10200 && Device.isTestSwitch) {
					toast(LANG(TextsConfig.TextsConfig_Error.tk_error));
				} else if (data.header.result == 10200 && !Device.isTestSwitch) {
					if (Device.isVipOpen) {
						return;
					} else {
						toast(LANG(TextsConfig.TextsConfig_Error.tk_error));
					}
				}
			}
		});;
	}
	private onBtnGet() {
		if (this.isDouble) {
			this.father.freashInfo(false);
			this.close(UI.HIDE_TO_TOP);
		} else {
			this.leagueFishingReward_Visit(false).then((data: message.LeagueFishingRewardResponse) => {
				if (data.header.result == 0) {
					this.freashInfo();
				} else {
					if (this.isDouble) {
						this.isDouble = false;
					}
					if (data.header.result == 10200 && Device.isTestSwitch) {
						toast(LANG(TextsConfig.TextsConfig_Error.tk_error));
					}
				}
			});
			this.close(UI.HIDE_TO_TOP);
		}
	}


	//
	private leagueFishingReward_Visit(is_double: boolean) {
		return new Promise((resolve, reject) => {
			let request = new message.LeagueFishingRewardRequest();
			request.body.is_double = is_double;
			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.LeagueFishingRewardResponse>resp;
				console.log(response);
				if (response.header.result != 0) {
					toast(LANG(Game.ConfigManager.getAone2CodeReason(response.header.result)));
					// reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
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
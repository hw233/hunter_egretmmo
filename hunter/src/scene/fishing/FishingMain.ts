namespace zj {
//钓鱼主界面
// yuqingchao
//2019.05.15
export class FishingMain extends Dialog {
	private lbLeft: eui.Label;				//剩余垂钓数
	private btnGift: eui.Button;			//开奖一览按钮
	private btnClose: eui.Button;			//关闭
	private lstView: eui.List;
	private arrListView: eui.ArrayCollection;
	private lbTime: eui.Label;				//垂钓时间
	private btnPull: eui.Button;			//收杆
	private groupPush: eui.Group			//右下方按钮组
	private btnPush: eui.Button;			//下杆
	private btnFreshPurple: eui.Button;		//一键刷紫
	private btnFresh: eui.Button;			//刷新品质
	private imgCopper: eui.Image;			//金币图
	private imgGold: eui.Image;				//钻石图
	private lbFree: eui.Label;				//免费
	private lbCopper: eui.Label;			//花费金币
	private lbGold: eui.Label;				//花费钻石
	private allGold: boolean = false;
	private timer: egret.Timer;

	private exTime: number = null;
	private status: number = null;

	public constructor() {
		super();
		this.skinName = "resource/skins/fishing/FishingMainSkin.exml";
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this)
		this.btnGift.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGift, this);
		this.btnPush.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPush, this);
		this.btnPull.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPull, this);
		this.btnFreshPurple.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFreashPurple, this);
		this.btnFresh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFresh, this);
		this.timer = new egret.Timer(1000, 0);
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.upDate, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			if (this.timer) this.timer.stop();
		}, null);
		this.init();
	}

	private init() {
		this.exTime = Game.PlayerMixUnitInfoSystem.mixunitinfo.process.leftTime;
		this.setStatus();
		this.upDate();
		this.setFishTimes();
		this.initFishList();

		this.mixInfoo_Visit().then((data: message.GetLotteryFruitInfoResponse) => {
			if (data.header.result == 0) {
				this.freashInfo();
			}
		});
		//Teach
		if (Teach.isDone(teachBattle.teachPartID_WONDER_ENTER_4) == false) {
			Teach.SetTeachPart(teachBattle.teachPartID_WONDER_ENTER_4);
		}
	}

	private upDate() {
		if (this.status == TableEnum.Enum.LeagueFishStatus.Fishing) {
			this.setTimeDes();
			if (this.exTime - Math.floor(egret.getTimer() / 1000) <= 0) {
				this.exTime = Game.PlayerMixUnitInfoSystem.mixunitinfo.process.leftTime;
				this.timer.stop();
				this.freashInfo(false);
			}
		}
	}

	private setTimeDes() {
		let time = Helper.GetTimeStr(this.exTime - Math.floor(egret.getTimer() / 1000), false);
		this.lbTime.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextConfig_League.fish_curTime, time));
	}

	private setStatus() {
		if (this.exTime - (Math.floor(egret.getTimer() / 1000)) > 0) {
			this.timer.start();
			this.status = TableEnum.Enum.LeagueFishStatus.Fishing;
			this.setPush(false);
			this.btnPull.enabled = false;
		} else if (Game.PlayerMixUnitInfoSystem.mixunitinfo.goodses.length != 0) {
			this.status = TableEnum.Enum.LeagueFishStatus.CanGet;
			this.setPush(false);
			loadUI(FishingEnd)
				.then((dialog: FishingEnd) => {
					dialog.init(this);
					dialog.show(UI.SHOW_FROM_TOP);
				});
		} else if (Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info == 0) {
			this.status = TableEnum.Enum.LeagueFishStatus.CanPush;
			this.setPush(true);

		} else if (Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info != 0) {
			this.status = TableEnum.Enum.LeagueFishStatus.CanPull;
			this.setPush(false);
			this.btnPull.enabled = true;
		}
	}

	public freashInfo(playAni?: boolean) {
		this.exTime = Game.PlayerMixUnitInfoSystem.mixunitinfo.process.leftTime;
		this.setStatus();
		this.setFishTimes();
		this.freashFishList(playAni);
		this.setFreeFreashTimes();
	}

	private initFishList() {
		if (Device.firstFish) {
			this.freashFishList(true);
			Device.firstFish = false;
		} else {
			this.freashFishList(false);
		}
	}

	private freashFishList(playAni) {
		this.setCostAllTime();
		this.arrListView = new eui.ArrayCollection();
		if (Teach.m_bOpenTeach && playAni && Device.firstFish) {
			let tbl = [1, 1, 1];
			for (let i = 0; i < tbl.length; i++) {
				this.arrListView.addItem({
					id: tbl[i],
					playAni,
					father: this,
				})
			}
			this.lstView.dataProvider = this.arrListView;
			this.lstView.itemRenderer = FishingMainItem;
		} else {
			for (let j = 0; j < Game.PlayerMixUnitInfoSystem.mixunitinfo.already_fish.length; j++) {
				this.arrListView.addItem({
					id: Game.PlayerMixUnitInfoSystem.mixunitinfo.already_fish[j],
					playAni,
					father: this,
				})
			}
			this.lstView.dataProvider = this.arrListView;
			this.lstView.itemRenderer = FishingMainItem;
		}
		this.allGold = true;
		for (let k in Game.PlayerMixUnitInfoSystem.mixunitinfo.already_fish) {
			let v = Game.PlayerMixUnitInfoSystem.mixunitinfo.already_fish[k];
			if (v != 4) {
				this.allGold = false;
				return;
			}
		}
	}

	private onBtnGift() {
		loadUI(FishingAwardView)
			.then((dialog: FishingAwardView) => {
				dialog.show(UI.SHOW_FROM_TOP);
			})
	}

	private setCostAllTime() {
		let fishInstance = Game.ConfigManager.getTable(StringConfig_Table.leagueFish + ".json");
		if (this.status == TableEnum.Enum.LeagueFishStatus.CanPull) {
			this.lbTime.textFlow = Util.RichText(TextsConfig.TextConfig_League.fish_canPull);
		} else if (this.status != TableEnum.Enum.LeagueFishStatus.CanPull) {
			let costAllTime = 0;
			for (let k in Game.PlayerMixUnitInfoSystem.mixunitinfo.already_fish) {
				let v = Game.PlayerMixUnitInfoSystem.mixunitinfo.already_fish[k];
				costAllTime = fishInstance[v].fishing_duration + costAllTime;
			}
			this.lbTime.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextConfig_League.fish_costTimeAll, this.formatTime(costAllTime)));
		}
	}

	private formatTime(sec) {
		let time = null;
		if (sec < 60) {
			time = sec + TextsConfig.TextConfig_League.fish_costTime_sec;
		} else if (sec % 60 != 0) {
			time = Math.ceil(sec / 60) + TextsConfig.TextConfig_League.fish_costTime_min + sec % 60 + TextsConfig.TextConfig_League.fish_costTime_sec;
		} else {
			time = Math.ceil(sec / 60) + TextsConfig.TextConfig_League.fish_costTime_min;
		}
		return time;
	}

	private onBtnClose() {
		this.timer.stop();
		this.close(UI.HIDE_TO_TOP);
	}

	private setFishTimes() {
		this.lbLeft.text = PlayerVIPSystem.Level().league_fishing - Game.PlayerVIPSystem.vipInfo.league_fishing + "/" + PlayerVIPSystem.Level().league_fishing;
	}

	private setFreeFreashTimes() {
		if (CommonConfig.league_fishing_free_refresh + PlayerVIPSystem.LowItem().fishing_free_time > Game.PlayerMixUnitInfoSystem.mixunitinfo.fishing_refresh) {
			this.lbFree.visible = true;
			this.imgCopper.visible = false;
			this.lbCopper.visible = false;
			this.lbFree.text = Helper.StringFormat(TextsConfig.TextConfig_League.fish_freeFreash,
				(CommonConfig.league_fishing_free_refresh + PlayerVIPSystem.LowItem().fishing_free_time - Game.PlayerMixUnitInfoSystem.mixunitinfo.fishing_refresh));
		} else {
			this.lbFree.visible = false;
			this.imgCopper.visible = true;
			this.lbCopper.visible = true;
			this.lbCopper.text = CommonConfig.league_fishing_refresh_money.toString();
		}
		this.lbGold.text = CommonConfig.refresh_purple_token(Game.PlayerMixUnitInfoSystem.mixunitinfo.refresh_purple_time + 1).toString();
	}

	private setPush(bPush) {
		this.groupPush.visible = bPush;
		this.btnPull.visible = !bPush;
		if (this.btnPull.visible == true) {
			Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, {isAni: true});
		}
	}

	private setCanRefresh(can) {
		this.btnFresh.enabled = can;
		this.btnFreshPurple.enabled = can;
	}

	//下杆
	private onBtnPush() {
		this.leagueFishingStart_Visit().then((data: message.LeagueFishingStartResponse) => {
			if (data.header.result == 0) {
				this.freashInfo(false);
				console.log(TextsConfig.TextConfig_League.fish_start);
			}
		})
	}

	//收杆
	private onBtnPull() {
		this.leagueFishingEnd_Visit().then((data: message.LeagueFishingEndResponse) => {
			if (data.header.result == 0) {
				this.freashInfo(false);
			}
		})
	}

	//一键刷紫
	private onBtnFreashPurple() {
		let bTeach = Teach.bInTeaching && Teach.m_bOpenTeach;
		if (this.allGold && !bTeach) {
			loadUI(ConfirmCancelDialog).then((dialog: ConfirmCancelDialog) => {
				dialog.show(UI.SHOW_FROM_TOP);
				dialog.setInfo(TextsConfig.TextConfig_League.fish_all_gold_tips);
				dialog.setCB(() => { this.leagueFishingRefresh(true) })
			});
		} else {
			this.leagueFishingRefresh(true);
		}
	}
	private leagueFishingRefresh(isPurple: boolean) {
		if (isPurple) {
			this.leagueFishingRefresh_Visit(isPurple).then((data: message.LeagueFishingRefreshResponse) => {
				if (data.header.result == 0) {
					this.freashInfo(true);
				} else if (data.header.result == message.EC.XG_LACK_MONEY) {
					this.setCanRefresh(true);
					//addMoney
				} else if (data.header.result == message.EC.XG_LACK_TOKEN) {
					this.setCanRefresh(true);
					loadUI(PayMallScene)
						.then((scene: PayMallScene) => {
							scene.show(UI.SHOW_FROM_TOP);
							scene.init(true);
						});
				} else {
					this.setCanRefresh(true);
					if (data.header.result == message.EC.XG_VIP_LEVEL_NOT_ENOUGH) {
						if (Device.isVipOpen) {
							let str = PlayerVIPSystem.League_FishingRefresh();

						} else {
							toast(LANG(TextsConfig.TextsConfig_Error.tk_error));
						}
					}
				}
			})
		} else {
			this.leagueFishingRefresh_Visit(isPurple).then((data: message.LeagueFishingRefreshResponse) => {
				if (data.header.result == 0) {
					this.freashInfo(true);
				} else if (data.header.result == message.EC.XG_LACK_MONEY) {
					this.setCanRefresh(true);
					//addMoney
				} else if (data.header.result == message.EC.XG_LACK_TOKEN) {
					this.setCanRefresh(true);
					loadUI(PayMallScene)
						.then((scene: PayMallScene) => {
							scene.show(UI.SHOW_FROM_TOP);
							scene.init(true);
						});
				}
			})
		}
	}

	//刷新品质
	private onBtnFresh() {
		let bTeach = Teach.bInTeaching && Teach.m_bOpenTeach;
		if (this.allGold && !bTeach) {
			loadUI(ConfirmCancelDialog).then((dialog: ConfirmCancelDialog) => {
				dialog.show(UI.SHOW_FROM_TOP);
				dialog.setInfo(TextsConfig.TextConfig_League.fish_all_gold_tips);
				dialog.setCB(() => { this.leagueFishingRefresh(false) })
			});
		} else {
			this.leagueFishingRefresh(false);
		}
	}

	//拉取数据杂项
	private mixInfoo_Visit() {
		return new Promise((resolve, reject) => {
			let request = new message.GetLotteryFruitInfoRequest();
			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.GetLotteryFruitInfoResponse>resp;
				console.log(response);
				if (response.header.result != 0) {
					toast_warning(LANG(Game.ConfigManager.getAone2CodeReason(response.header.result)));
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
	/**
	 * 下杆协议
	 * */
	private leagueFishingStart_Visit() {
		return new Promise((resolve, reject) => {
			let request = new message.LeagueFishingStartRequest();
			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.LeagueFishingStartResponse>resp;
				console.log(response);
				if (response.header.result != 0) {
					toast_warning(LANG(Game.ConfigManager.getAone2CodeReason(response.header.result)));
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

	/**
	 * 收杆协议
	 */
	private leagueFishingEnd_Visit() {
		return new Promise((resolve, reject) => {
			let request = new message.LeagueFishingEndRequest();
			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.LeagueFishingEndResponse>resp;
				console.log(response);
				if (response.header.result != 0) {
					toast_warning(LANG(Game.ConfigManager.getAone2CodeReason(response.header.result)));
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

	/**
	 * 刷新品质
	 * */
	private leagueFishingRefresh_Visit(isPurple) {
		return new Promise((resolve, reject) => {
			let request = new message.LeagueFishingRefreshRequest();
			request.body.is_key = isPurple;
			request.body.is_teach = Teach.BeInTeaching();
			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.LeagueFishingRefreshResponse>resp;
				console.log(response);
				if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY
					&& response.header.result != message.EC.XG_LACK_TOKEN) {
					toast_warning(LANG(Game.ConfigManager.getAone2CodeReason(response.header.result)));
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
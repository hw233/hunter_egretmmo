namespace zj {
//公会建设
//yuqingchao
//2018/11/28
export class LeagueDonate extends Dialog {
	private btnClose: eui.Button;
	private lstDonateChoice: eui.List;
	private lbTextLevel: eui.Label;	 // 帮会等级
	private lbTextProgress: eui.Label; // 帮会经验数字
	private btnDonate: eui.Button; // 建设按钮
	private imgSpriteBarExp: eui.Image; // 帮会经验条
	private rectMask: eui.Image; // 经验条遮罩
	private lbRightTip: eui.Label; // 建设剩余次数/总次数
	private groupBackdrop: eui.Group;
	private groupExp: eui.Group;
	private imgTop: eui.Image;
	private imgDonate: eui.Image;

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueDonateSkin.exml";

		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.btnDonate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDonate, this);
		this.lstDonateChoice.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onLstDonateChoice, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			egret.Tween.removeTweens(this.imgTop); // 因为是循环播放，需要特别处理
			egret.Tween.removeTweens(this.imgDonate); // 因为是循环播放，需要特别处理
		}, null);

		this.init();
	}

	private init() {
		this.rectMask = Util.getMaskImgBlack(this.imgSpriteBarExp.width, this.imgSpriteBarExp.height);
		this.rectMask.verticalCenter = 0;
		this.rectMask.left = 7;
		this.rectMask.visible = false;
		this.groupExp.addChild(this.rectMask);
		this.setInfo();
		this.lstDonateChoice.selectedIndex = 0;
		this.loadList();

		this.addBackdropAnimatoin("ui_tongyong_beijingguang", "001_beijignguang_02", 0, this.groupBackdrop);
		egret.Tween.get(this.imgTop)
			.to({ scaleX: 1, scaleY: 1, y: -18 }, 400)
			.to({ y: 12 }, 600)
			.to({ y: -8 }, 400)
			.to({ y: 2 }, 200);
		egret.Tween.get(this.imgDonate)
			.to({ scaleX: 1, scaleY: 1, y: -3 }, 400)
			.to({ y: 27 }, 600)
			.to({ y: 7 }, 400)
			.to({ y: 17 }, 200);

		egret.Tween.get(this.imgTop, { loop: true })
			.to({ y: -1 }, 300)
			.to({ y: 5 }, 600)
			.to({ y: 2 }, 300);
		egret.Tween.get(this.imgDonate, { loop: true })
			.to({ y: 14 }, 300)
			.to({ y: 20 }, 600)
			.to({ y: 17 }, 300);
	}

	private setInfo(isdonate?: number) {
		this.lbTextLevel.text = HelpUtil.textConfigFormat(TextsConfig.TextConfig_League.donateLevel, Game.PlayerLeagueSystem.BaseInfo.level);
		let tbLevel = TableLevel.Table();//StringConfig_Table.level ;
		let expCur = Game.PlayerLeagueSystem.BaseInfo.exp;
		let expTotal = tbLevel[Game.PlayerLeagueSystem.BaseInfo.level].league_exp; // 公会升到下一级所需的贡献
		this.lbTextProgress.text = HelpUtil.textConfigFormat(TextsConfig.TextConfig_League.donateProgress, expCur, expTotal);
		let percent = expCur / expTotal;
		if (percent > 1) {
			percent = 1;
		}
		//经验条
		this.rectMask.visible = true;
		this.rectMask.width = this.imgSpriteBarExp.width * percent;
		this.imgSpriteBarExp.mask = this.rectMask;

		let bDonateValid: number = Game.PlayerLeagueSystem.Member.is_donate; // 建设点击次数
		if (isdonate != null) {
			bDonateValid = isdonate;
		}
		/**判断公会等级是否大于规定的最高等级 */
		if (Game.PlayerLeagueSystem.BaseInfo.level == CommonConfig.league_level_max) {
			this.lbTextProgress.text = TextsConfig.TextsConfig_HeroMain.level_max;
		}
		this.lbRightTip.text = HelpUtil.textConfigFormat(TextsConfig.TextConfig_League.donateLast, CommonConfig.league_donate_daily_times - bDonateValid, CommonConfig.league_donate_daily_times);
		/**判断建设次数是否大于零 */
		if (CommonConfig.league_donate_daily_times - bDonateValid > 0) {
			this.btnDonate.enabled = true;
		} else {
			this.btnDonate.enabled = false;
			//改变button的状态
			this.btnDonate.currentState = "disabled";
		}
	}

	private loadList() {
		let arrCollection = new eui.ArrayCollection();
		for (let k in TableLeagueDonate.Table()) {
			arrCollection.addItem({
				num: k
			})
		}
		this.lstDonateChoice.itemRenderer = LeagueDonateItem;
		this.lstDonateChoice.dataProvider = arrCollection;
	}

	private onLstDonateChoice(e: eui.ItemTapEvent) {
		this.lstDonateChoice.selectedIndex = e.itemIndex;
		this.loadList(); // 刷新list中的数据
	}

	//添加龙骨动画背景发光
	public addBackdropAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
		Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
			.then(display => {
				display.x = group.explicitWidth / 2;
				display.y = group.explicitHeight;
				group.addChild(display);
			})
			.catch(reason => {
				toast(reason);
			});
	}

	private onBtnDonate() {
		Game.PlayerLeagueSystem.leagueDonate(this.lstDonateChoice.selectedItem.num).then((response: message.LeagueDonateResponse) => {
			this.setInfo(response.body.members[0].is_donate)
			let tblDonate = TableLeagueDonate.Table();
			let str = HelpUtil.textConfigFormat("+%d", tblDonate[this.lstDonateChoice.selectedItem.num].reward_token);
			Game.SoundManager.playEffect("ui_tili_zengjia_mp3", 500);
			setTimeout(() => {
				let ui = <CommonMessage>newUI(CommonMessage);
				this.addChild(ui);
				ui.init("ui_iconresources_gonghuibi3_png", str);
			}, 300);

			Game.EventManager.event(GameEvent.LEAGUE_HOME_UPDATE);
		}).catch((result) => {
			if (result == message.EC.XG_LACK_TOKEN) {
				loadUI(ConfirmCancelDialog)
					.then((dialog: ConfirmCancelDialog) => {
						dialog.show(UI.SHOW_FROM_TOP);
						dialog.setInfo(TextsConfig.TextsConfig_Money.demstone);
						dialog.setCB(this.addStone);
					});
			} else if (result == message.EC.XG_LACK_MONEY) {
				loadUI(ConfirmCancelDialog)
					.then((dialog: ConfirmCancelDialog) => {
						dialog.show(UI.SHOW_FROM_TOP);
						dialog.setInfo(TextsConfig.TextsConfig_Money.moneys);
						dialog.setCB(this.addMoney);
					});
			} else {
				toast_warning(Game.ConfigManager.getAone2CodeReason(result));
			}
		});
	}

	private addStone = () => {
		loadUI(PayMallScene)
			.then((scene: PayMallScene) => {
				scene.show(UI.SHOW_FROM_TOP);
				scene.init();
			});
	}

	private addMoney = () => {
		loadUI(HelpGoldDialog)
			.then((dialog: HelpGoldDialog) => {
				dialog.SetInfoList();
				dialog.show(UI.SHOW_FROM_TOP);
			});
	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}

}

}
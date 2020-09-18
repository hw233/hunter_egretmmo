namespace zj {
//公会管理
//yuqingchao
//2018.11.29
export class LeagueMain extends Dialog {
	private groupCache: eui.Group;
	public groupMain: eui.Group;
	private btnClose: eui.Button;	// 退出公会

	private imgFrame: eui.Image; // 公会头像框
	private imgHead: eui.Image; // 公会头像
	private lbLevel: eui.Label; // 公会等级	

	private lbName: eui.Label; // 公会名称
	private lbActiveNum: eui.Label; // 在线人数
	private lbID: eui.Label; // 公会ID
	private lbNum: eui.Label; // 公会活跃度
	private lbText: eui.Label; // 公告

	public scrollerInfo: eui.Scroller;
	public lstItem: eui.List;
	private gruopList: eui.Group;

	private btnRankingList: eui.Button; // 公会排行榜
	private btnLog: eui.Button; // 公会日志
	private btnManager: eui.Button; // 管理公会
	private btnExit: eui.Button; // 退出公会

	private arrCollectionPop: eui.ArrayCollection;
	private num: number = 0;
	private popY: number = 0; // 鼠标点击坐标

	public moveLocation: number = 0;		//列表下拉移动位置

	private memberInfo: message.MemberInfo;

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueMainSkin.exml";

		this.btnRankingList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRankingList, this); // 管理公会按钮监听
		this.btnLog.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonLog, this); // 公会日志按钮监听
		this.btnManager.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonManager, this); // 管理公会按钮监听
		this.btnExit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnExit, this); // 公会日志按钮监听
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this); // 退出按钮监听
		this.lstItem.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onLstDonateChoice, this); // 列表点击监听
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDown, this);

		Game.EventManager.on(GameEvent.LEAGUE_MAIN_UPDATE, this.update, this);
		Game.EventManager.on(GameEvent.LEAGUE_MAIN_TWEEN, this.tween, this);
		Game.EventManager.on(GameEvent.SERVER_NOTICE_LEAGUE_MEMBER, this.update, this);

		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			Game.EventManager.off(GameEvent.LEAGUE_MAIN_UPDATE, this.update, this);
			Game.EventManager.off(GameEvent.LEAGUE_MAIN_TWEEN, this.tween, this);
			Game.EventManager.off(GameEvent.SERVER_NOTICE_LEAGUE_MEMBER, this.update, this);
		}, null);
	}
	private tween() {
		egret.Tween.get(this.groupMain).to({ scaleX: 1.1, scaleY: 1.1 }, 200).to({ scaleX: 1, scaleY: 1 }, 200);
	}
	public init() {
		this.update();
	}

	private update() {
		closeCache(this.groupCache);
		this.setInfo();
		this.LoadListMember();
		setCache(this.groupCache);
	}

	private setInfo() {
		this.imgHead.source = cachekey(TableItemPic.Item(Game.PlayerLeagueSystem.BaseInfo.picId).path, this);
		this.imgFrame.source = cachekey(TableItemPicFrame.Item(Game.PlayerLeagueSystem.BaseInfo.picFrameId).path, this);
		this.lbLevel.text = Helper.StringFormat(TextsConfig.TextConfig_League.levelDes, Game.PlayerLeagueSystem.BaseInfo.level.toString());
		this.lbName.text = Game.PlayerLeagueSystem.BaseInfo.name;
		this.lbID.text = Helper.StringFormat(TextsConfig.TextConfig_League.idDes, Game.PlayerLeagueSystem.BaseInfo.leagueId);
		this.lbNum.text = Helper.StringFormat(TextsConfig.TextConfig_League.memberDes, Game.PlayerLeagueSystem.BaseInfo.curNum, TableLevel.Item(Game.PlayerLeagueSystem.BaseInfo.level).league_people);
		this.lbActiveNum.text = Game.PlayerLeagueSystem.BaseInfo.enliven_all + "/" + TableLevel.Item(Game.PlayerLeagueSystem.BaseInfo.level).league_enliven_all
		this.lbText.text = Helper.StringFormat(TextsConfig.TextConfig_League.home_pop_notice, Game.PlayerLeagueSystem.getNotice(Game.PlayerLeagueSystem.BaseInfo.notice));
	}

	private touchDown(e: egret.TouchEvent) {
		this.popY = e.stageY;
		let pop = this.getChildByName("pop");
		if (pop) {
			if ((pop as egret.Sprite).contains(e.target) == false) {
				this.removeChild(pop);
			}
		}
		else {
			this.lstItem.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onLstDonateChoice, this); 	// 添加列表监听事件
		}

	}

	private ManagePop(y: number) {
		if (Game.PlayerInfoSystem.RoleID == Game.PlayerLeagueSystem.Members[this.lstItem.selectedIndex].monarchbase.id) return;
		if (Game.PlayerLeagueSystem.Member.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_ELDER) {
			let pop;
			pop = new LeagueMemberPopElder();
			pop.name = "pop";
			pop.init(this.stage.stageWidth / 2 - pop.width / 2, this.popY, this.lstItem.selectedIndex, this);
			this.addChild(pop);
			this.scrollerInfo.viewport = this.lstItem;
			this.scrollerInfo.validateNow();
			this.moveLocation = this.scrollerInfo.viewport.scrollV;
		}
		else if (Game.PlayerLeagueSystem.Member.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_LEADER) {
			let pop;
			pop = new LeagueMemberPopLeader();
			pop.name = "pop";
			pop.init(this.stage.stageWidth / 2 - pop.width / 2, this.popY, this.lstItem.selectedIndex, this);
			this.addChild(pop);
			// if (pop.btnElevate.currentState == "down" && pop.btnElevate1.currentState == "down") {
			this.scrollerInfo.viewport = this.lstItem;
			this.scrollerInfo.validateNow();
			this.moveLocation = this.scrollerInfo.viewport.scrollV;
			// }
		}
		else {
			let pop;
			pop = new LeagueMemberPopNormal();
			pop.name = "pop";
			pop.init(this.stage.stageWidth / 2 - pop.width / 2, this.popY, this.lstItem.selectedIndex, this);
			this.addChild(pop);
			this.scrollerInfo.viewport = this.lstItem;
			this.scrollerInfo.validateNow();
			this.moveLocation = this.scrollerInfo.viewport.scrollV;
		}
	}

	private onLstDonateChoice(e: egret.TouchEvent) {
		this.arrCollectionPop.itemUpdated(this.arrCollectionPop.source[this.lstItem.selectedIndex]);
		this.arrCollectionPop.itemUpdated(this.arrCollectionPop.source[this.num]);
		this.num = this.lstItem.selectedIndex;
		let pop = this.getChildByName("pop");
		// let listY = this.lstItem.getChildAt(this.lstItem.selectedIndex).y;
		// this.popY = this.gruopList.y + this.scrollerInfo.y + listY - this.moveLocation;
		this.ManagePop(1);
		this.lstItem.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onLstDonateChoice, this);		//移除列表点击事件
	}

	private LoadListMember() {
		this.arrCollectionPop = new eui.ArrayCollection();
		let member: Array<message.MemberInfo> = Game.PlayerLeagueSystem.Members;
		member.sort(function (a, b) {
			if (a.officialId == b.officialId) return b.monarchbase.level - a.monarchbase.level;
			return b.officialId - a.officialId;
		});
		for (let i = 0; i < member.length; i++) {
			this.arrCollectionPop.addItem({
				i,
				mem: member[i],
			});
		}
		this.lstItem.itemRenderer = LeagueMainMemberltem;
		this.lstItem.dataProvider = this.arrCollectionPop;

		this.scrollerInfo.viewport = this.lstItem;
		this.scrollerInfo.validateNow();
		this.scrollerInfo.viewport.scrollV = this.moveLocation;
	}

	// 公会排行榜
	private onBtnRankingList() {
		loadUI(LeagueRankingListNew)
			.then((dialog: LeagueRankingListNew) => {
				dialog.show(UI.SHOW_FROM_TOP);
			});
	}


	// 公会日志
	private onButtonLog() {
		// toast("公会日志");
		egret.Tween.get(this.groupMain).to({ scaleX: 0.8, scaleY: 0.8 }, 300).call(() => { this.groupMain.touchChildren = false; });
		Game.PlayerLeagueSystem.leagueLog(1).then((value: Array<message.LeagueRecord>) => {
			loadUI(LeagueLog).then((dialog: LeagueLog) => {
				dialog.init(TableEnum.Enum.League_LogType.NORMAL, value, this);
				dialog.show(UI.SHOW_FROM_TOP);
			});
		}).catch((reason) => {
			toast(Helper.GetErrorString(reason));
		})
	}

	// 管理工会
	private onButtonManager() {
		// toast("管理公会");
		if (Game.PlayerLeagueSystem.Member.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_NORMAL) {
			toast_warning(LANG(TextsConfig.TextConfig_League.noAuthManage));
		} else {
			loadUI(LeagueManageMian).then((dialog: LeagueManageMian) => {
				dialog.show(UI.SHOW_FROM_TOP);
			});
		}
	}

	// 退出公会
	private onBtnExit() {
		if (Game.PlayerLeagueSystem.Member.officialId ==

			message.ELeagueOfficial.LEAGUE_OFFICIAL_LEADER) {
			if (Game.PlayerLeagueSystem.Members.length == 1) {
				// 公会没有成员，盟主可以解散公会
				loadUI(ConfirmCancelDialog).then((dialog: ConfirmCancelDialog) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setInfo(TextsConfig.TextConfig_League.dismiss);
					dialog.setCB(this.exit);
				});
			} else {
				loadUI(ConfirmCancelDialog).then((dialog: ConfirmCancelDialog) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setInfo(TextsConfig.TextConfig_League.transferFirst);
				});
			}
		} else if (Game.PlayerLeagueSystem.Member.leagueOutNumber == 0) { // 首次退出公会
			loadUI(ConfirmCancelDialog).then((dialog: ConfirmCancelDialog) => {
				dialog.show(UI.SHOW_FROM_TOP);
				dialog.setInfo(TextsConfig.TextConfig_League.exit1);
				dialog.setCB(this.exit);
			});
		} else {
			loadUI(ConfirmCancelDialog)
				.then((dialog: ConfirmCancelDialog) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setInfo(TextsConfig.TextConfig_League.exit2);
					dialog.setCB(this.exit);
				});
		}
	}

	private exit = () => {
		Game.PlayerLeagueSystem.leagueQuit().then(() => {
			setTimeout(() => {
				this.close();
				Game.EventManager.event(GameEvent.LEAGUE_HOME_CLOSE, { type: 1 });
				Game.EventManager.event(GameEvent.LEAGUE_CHOOSE_CLOSE, { type: 1 });
			}, 510);

		});
	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}
}
}
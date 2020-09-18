namespace zj {
//公会管理-管理公会
//yuqingchao
//2018/12/04
export class LeagueManageMian extends Dialog {
	private groupAll: eui.Group;
	private btnClose: eui.Button;
	private btnMsgSet: eui.Button; // 公会信息
	private btnApplication: eui.Button; // 入会申请

	// 入会申请
	public groupApplication: eui.Group;
	private lstItem: eui.List;
	private lbApplyCount: eui.Label;
	private lbMemberCount: eui.Label;
	private btnRefuseAll: eui.Button;
	private btnPassAll: eui.Button;

	private arrCollection: eui.ArrayCollection;
	private arrRoleId: Array<number> = [];

	// 公会信息
	private groupMsgSet: eui.Group;
	private imgFrame: eui.Image;
	private imgHead: eui.Image;
	private btnHead: eui.Button; // 改头像
	private lbName: eui.Label;
	private btnName: eui.Button; // 改名
	private lbNotice: eui.Label;
	private btnNotice: eui.Button; // 改公告
	private btnConditionLeft: eui.Button;
	private lbLimitCondition: eui.Label;
	private btnConditionRight: eui.Button;
	private btnLevelLeft: eui.Button;
	private lbLimitLevel: eui.Label;
	private btnLevelRight: eui.Button;
	private lbIntroduce: eui.Label;
	private btnIntroduce: eui.Button; // 改宣传语
	private btnSave: eui.Button; // 保存设置
	private imgColor: eui.Image;
	private imgColor1: eui.Image;

	private joinConditionX: number = 0;
	private joinLevelX: number = 0;

	private pictureIdCurrent: number = 0;
	private pictureFrameIdCurrent: number = 0;
	private nameCurrent: string = "";
	private noticeCurrent: string = "";
	private introduceCurrent: string = "";
	private joinConditionCurrent: number = 0;
	private joinLevelCurrent: number = 0;

	private pictureIdPrevious: number = 0;
	private pictureFrameIdPrevious: number = 0;
	private namePrevious: string = "";
	private noticePrevious: string = "";
	private introducePrevious: string = "";
	private joinConditionPrevious: number = 0;
	private joinLevelPrevious: number = 0;


	public constructor() {
		super();

		this.skinName = "resource/skins/league/LeagueManagerMainSkin.exml";
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);

		this.btnApplication.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnApplication, this);
		this.btnMsgSet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMsgSet, this);

		this.btnRefuseAll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRefuseAll, this);
		this.btnPassAll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPassAll, this);

		this.btnHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHead, this);
		this.btnName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnName, this);
		this.btnNotice.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnNotice, this);
		this.btnConditionLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConditionLeft, this);
		this.btnConditionRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConditionRight, this);
		this.btnLevelLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLevelLeft, this);
		this.btnLevelRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLevelRight, this);
		this.btnIntroduce.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnIntroduce, this);
		this.btnSave.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSave, this);

		Game.EventManager.on(GameEvent.LEAGUE_MANAGER_MAIN_TWEEN, this.tween, this);
		Game.EventManager.on(GameEvent.SERVER_NOTICE_LEAGUE_APPLY, this.setInfo, this);
		Game.EventManager.on(GameEvent.LEAGUE_MANAGE_MAIN_REMOVEITEM, this.removeItem, this);

		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			Game.EventManager.off(GameEvent.LEAGUE_MANAGER_MAIN_TWEEN, this.tween, this);
			Game.EventManager.off(GameEvent.SERVER_NOTICE_LEAGUE_APPLY, this.setInfo, this);
			Game.EventManager.off(GameEvent.LEAGUE_MANAGE_MAIN_REMOVEITEM, this.removeItem, this);
		}, null);

		//图片滤镜改颜色
		let colorMatrix = [
			1, 0, 0, 0, 0,
			0, 1, 0, 0, -16,
			0, 0, 1, 0, -31,
			0, 0, 0, 1, 0
		]
		let colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		this.imgColor.filters = [colorFlilter];
		this.imgColor1.filters = [colorFlilter];
		this.onBtnApplication();
	}

	private tween(data: { type: number }) {
		switch (data.type) {
			case 1:
				egret.Tween.get(this.groupAll).to({ scaleX: 0.9, scaleY: 0.9 }, 100);
				break;
			case 2:
				egret.Tween.get(this.groupAll).to({ scaleX: 1.1, scaleY: 1.1 }, 200).to({ scaleX: 1, scaleY: 1 }, 100);
				break;
		}
	}

	private onBtnApplication() {
		// toast("入会申请");
		this.btnApplication.currentState = "down";
		this.btnMsgSet.currentState = "up";
		this.groupApplication.visible = true;
		this.groupMsgSet.visible = false;

		this.setInfo();
	}

	public onBtnMsgSet() {
		// toast("公会信息");
		this.btnApplication.currentState = "up";
		this.btnMsgSet.currentState = "down";
		this.groupApplication.visible = false;
		this.groupMsgSet.visible = true;

		this.init();
	}

	// League_ManageApplication.lua
	/* ***************** 入会申请 ***************** */
	private setInfo() {
		this.lbApplyCount.text = Helper.StringFormat(TextsConfig.TextConfig_League.applyCnt, Game.PlayerLeagueSystem.Applicants.length);
		this.lbMemberCount.text = Helper.StringFormat(TextsConfig.TextConfig_League.memberCnt, Game.PlayerLeagueSystem.BaseInfo.curNum, TableLevel.Item(Game.PlayerLeagueSystem.BaseInfo.level).league_people);

		this.loadList();
	}

	private loadList() {
		this.arrCollection = new eui.ArrayCollection();

		for (let k in Game.PlayerLeagueSystem.Applicants) {
			this.arrRoleId.push(Game.PlayerLeagueSystem.Applicants[k].monarchbase.id);
			this.arrCollection.addItem({
				"index": k
			});
		}

		this.lstItem.itemRenderer = LeagueManageApplicationItemIR;
		this.lstItem.dataProvider = this.arrCollection;
	}

	private removeItem(ev: egret.Event) {
		this.lbApplyCount.text = Helper.StringFormat(TextsConfig.TextConfig_League.applyCnt, Game.PlayerLeagueSystem.Applicants.length);
		this.lbMemberCount.text = Helper.StringFormat(TextsConfig.TextConfig_League.memberCnt, Game.PlayerLeagueSystem.BaseInfo.curNum, TableLevel.Item(Game.PlayerLeagueSystem.BaseInfo.level).league_people);

		let index: number = <number>ev.data;
		if (index == undefined || index < 0) return;
		this.arrCollection.removeItemAt(index);
	}

	// 全部拒绝
	private onBtnRefuseAll() {
		if (this.arrRoleId.length == 0) return;
		Game.PlayerLeagueSystem.leagueApplyDeal(this.arrRoleId, false).then(() => {
			this.arrCollection.removeAll();
			this.setInfo();
			this.arrRoleId = [];
			Game.EventManager.event(GameEvent.LEAGUE_MAIN_UPDATE);
			Game.EventManager.event(GameEvent.LEAGUE_HOME_UPDATE);
		});
	}

	// 全部同意
	private onBtnPassAll() {
		if (this.arrRoleId.length == 0) return;
		Game.PlayerLeagueSystem.leagueApplyDeal(this.arrRoleId, true).then(() => {
			this.arrCollection.removeAll();
			this.setInfo();
			this.arrRoleId = [];
			Game.EventManager.event(GameEvent.LEAGUE_MAIN_UPDATE);
			Game.EventManager.event(GameEvent.LEAGUE_HOME_UPDATE);
		});
	}

	// League_ManageMsgSet.lua
	/* ***************** 公会信息 ***************** */
	private init() {
		let leagueBase = Game.PlayerLeagueSystem.BaseInfo;

		this.pictureIdCurrent = leagueBase.picId;
		this.pictureFrameIdCurrent = leagueBase.picFrameId;
		this.nameCurrent = leagueBase.name;
		this.noticeCurrent = Game.PlayerLeagueSystem.getNotice(leagueBase.notice);
		this.introduceCurrent = leagueBase.introduce;
		this.joinConditionCurrent = leagueBase.join_condition;
		this.joinLevelCurrent = leagueBase.join_level;
		if (this.joinLevelCurrent < 1) this.joinLevelCurrent = 1;

		this.pictureIdPrevious = this.pictureIdCurrent;
		this.pictureFrameIdPrevious = this.pictureFrameIdCurrent;
		this.namePrevious = this.nameCurrent;
		this.noticePrevious = this.noticeCurrent;
		this.introducePrevious = this.introduceCurrent;
		this.joinConditionPrevious = this.joinConditionCurrent;
		this.joinLevelPrevious = this.joinLevelCurrent;

		this.joinConditionX = this.lbLimitCondition.x;
		this.joinLevelX = this.lbLimitLevel.x;

		this.setInfo1();
	}

	private setInfo1() {
		this.imgFrame.source = cachekey(TableItemPicFrame.Item(this.pictureFrameIdCurrent).path, this);
		this.imgHead.source = cachekey(TableItemPic.Item(this.pictureIdCurrent).path, this);

		this.lbName.text = Helper.StringFormat(TextsConfig.TextConfig_League.nameDes, this.nameCurrent);
		this.lbNotice.text = Helper.StringFormat(TextsConfig.TextConfig_League.noticeDes, this.noticeCurrent);
		this.lbIntroduce.text = Helper.StringFormat(TextsConfig.TextConfig_League.introduceDes, this.introduceCurrent);
		this.lbLimitCondition.text = TextsConfig.TextConfig_League.limitCondition[this.joinConditionCurrent - 1];
		if (this.joinLevelCurrent <= 1) {
			this.lbLimitLevel.text = TextsConfig.TextConfig_League.limitLevelNone;
		} else {
			this.lbLimitLevel.text = Helper.StringFormat(TextsConfig.TextConfig_League.limitLevel, this.joinLevelCurrent);
		}
	}

	private update1() {
		this.init();
	}

	// 改头像
	private onBtnHead() {
		Game.EventManager.event(GameEvent.LEAGUE_MANAGER_MAIN_TWEEN, { type: 1 });
		if (Game.PlayerLeagueSystem.Member.officialId != message.ELeagueOfficial.LEAGUE_OFFICIAL_LEADER) {
			toast_warning(LANG(TextsConfig.TextConfig_League.noAuthHead));
		} else {
			loadUI(Common_ChangeIconDialog)
				.then((dialog: Common_ChangeIconDialog) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setCB(this.setHead);
					dialog.loadList(TableEnum.TableIconListState.LEAGUE);
				});
		}
	}

	private setHead = (picId: number) => {
		Game.EventManager.event(GameEvent.LEAGUE_MANAGER_MAIN_TWEEN, { type: 2 });
		if (picId == undefined || picId == 0 || picId == this.pictureIdCurrent) return;
		this.imgHead.source = cachekey(TableItemPic.Item(picId).path, this);
		this.pictureIdCurrent = picId;
	}

	// 改名
	private onBtnName() {
		Game.EventManager.event(GameEvent.LEAGUE_MANAGER_MAIN_TWEEN, { type: 1 });
		if (Game.PlayerLeagueSystem.Member.officialId != message.ELeagueOfficial.LEAGUE_OFFICIAL_LEADER) {
			toast_warning(LANG(TextsConfig.TextConfig_League.noAuthName));
		} else {
			loadUI(Common_InputShortDialog)
				.then((dialog: Common_InputShortDialog) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setCB(this.setName);
					dialog.setLeagueInfo();
				});
		}
	}

	private setName = (name: string, cb) => {
		Game.EventManager.event(GameEvent.LEAGUE_MANAGER_MAIN_TWEEN, { type: 2 });
		if (name == undefined) return;
		if (name == "") {
			toast_warning(LANG(TextsConfig.TextConfig_League.nameNone));
		} else if (name.length > CommonConfig.limit_league_name_max) {
			toast_warning(LANG(TextsConfig.TextConfig_League.nameOver));
		} else {
			Game.PlayerLeagueSystem.leagueModifyName(name).then(() => {
				if (cb) {
					cb();
				}
				this.lbName.text = Helper.StringFormat(TextsConfig.TextConfig_League.nameDes, name);
				Game.EventManager.event(GameEvent.LEAGUE_MAIN_UPDATE);
				Game.EventManager.event(GameEvent.LEAGUE_HOME_UPDATE);
				toast_warning(LANG(TextsConfig.TextConfig_League.nameSuccess));
			});
		}
	}

	// 改公告
	private onBtnNotice() {
		Game.EventManager.event(GameEvent.LEAGUE_MANAGER_MAIN_TWEEN, { type: 1 });
		loadUI(Common_InputLongDialog)
			.then((dialog: Common_InputLongDialog) => {
				dialog.show(UI.SHOW_FROM_TOP);
				dialog.setInfo(TextsConfig.TextConfig_League.inputNotice, 1);
				dialog.setCB(this.setNotice);
			});
	}

	private setNotice = (notice: string) => {
		Game.EventManager.event(GameEvent.LEAGUE_MANAGER_MAIN_TWEEN, { type: 2 });
		if (notice == undefined) return;
		if (notice == "") {
			toast_warning(LANG(TextsConfig.TextConfig_League.noticeNone));
		} else {
			this.lbNotice.text = Helper.StringFormat(TextsConfig.TextConfig_League.noticeDes, notice);
			this.noticeCurrent = notice;
		}
	}


	private joinConditionDelegate(isLeft: boolean = false) {
		let distanceX: number = this.joinConditionX;
		if (isLeft) {
			this.joinConditionCurrent = this.joinConditionCurrent - 1;
			distanceX = distanceX - 60;
		} else {
			this.joinConditionCurrent = this.joinConditionCurrent + 1;
			distanceX = distanceX + 60;
		}

		if (this.joinConditionCurrent < message.LeagueJoinCondition.LEAGUE_JOIN_ALL) {
			this.joinConditionCurrent = message.LeagueJoinCondition.LEAGUE_JOIN_NOT;
		} else if (this.joinConditionCurrent > message.LeagueJoinCondition.LEAGUE_JOIN_NOT) {
			this.joinConditionCurrent = message.LeagueJoinCondition.LEAGUE_JOIN_ALL;
		}

		egret.Tween.get(this.lbLimitCondition)
			.to({ x: distanceX, alpha: 0.5 }, 300, egret.Ease.backInOut)
			.call(() => { this.resetJoinCondition(); });
	}

	private resetJoinCondition() {
		this.lbLimitCondition.x = this.joinConditionX;
		this.lbLimitCondition.alpha = 1;
		this.lbLimitCondition.text = TextsConfig.TextConfig_League.limitCondition[this.joinConditionCurrent - 1];
	}

	private onBtnConditionLeft() {
		this.joinConditionDelegate(true);
	}

	private onBtnConditionRight() {
		this.joinConditionDelegate(false);
	}

	private joinLevelDelegate(isLeft: boolean = false) {
		let distanceX: number = this.joinLevelX;
		if (isLeft) {
			this.joinLevelCurrent = this.joinLevelCurrent - 1;
			distanceX = distanceX - 60;
		} else {
			this.joinLevelCurrent = this.joinLevelCurrent + 1;
			distanceX = distanceX + 60;
		}

		if (this.joinLevelCurrent < 1) {
			this.joinLevelCurrent = 60;
		} else if (this.joinLevelCurrent > 60) {
			this.joinLevelCurrent = 1;
		}

		egret.Tween.get(this.lbLimitLevel)
			.to({ x: distanceX, alpha: 0.5 }, 300, egret.Ease.backInOut)
			.call(() => { this.resetJoinLevel(); });
	}

	private resetJoinLevel() {
		this.lbLimitLevel.x = this.joinLevelX;
		this.lbLimitLevel.alpha = 1;
		if (this.joinLevelCurrent <= 1) {
			this.lbLimitLevel.text = TextsConfig.TextConfig_League.limitLevelNone;
		} else {
			this.lbLimitLevel.text = Helper.StringFormat(TextsConfig.TextConfig_League.limitLevel, this.joinLevelCurrent)
		}
	}

	private onBtnLevelLeft() {
		this.joinLevelDelegate(true);
	}

	private onBtnLevelRight() {
		this.joinLevelDelegate(false);
	}

	// 改宣传语
	private onBtnIntroduce() {
		Game.EventManager.event(GameEvent.LEAGUE_MANAGER_MAIN_TWEEN, { type: 1 });
		loadUI(Common_InputLongDialog)
			.then((dialog: Common_InputLongDialog) => {
				dialog.show(UI.SHOW_FROM_TOP);
				dialog.setInfo(TextsConfig.TextConfig_League.inputIntroduce, 2);
				dialog.setCB(this.setIntroduce);
			});
	}

	private setIntroduce = (introduce: string) => {
		Game.EventManager.event(GameEvent.LEAGUE_MANAGER_MAIN_TWEEN, { type: 2 });
		if (introduce == undefined) return;
		if (introduce == "") {
			toast_warning(LANG(TextsConfig.TextConfig_League.introduceNone));

		} else {
			this.lbIntroduce.text = Helper.StringFormat(TextsConfig.TextConfig_League.introduceDes, introduce);
			this.introduceCurrent = introduce;
		}
	}

	// 保存设置
	private onBtnSave() {
		let isNone: boolean = true;
		if (this.pictureIdCurrent != this.pictureIdPrevious || this.pictureFrameIdCurrent != this.pictureFrameIdPrevious) {
			Game.PlayerLeagueSystem.leaguePic(this.pictureIdCurrent, this.pictureFrameIdCurrent);
			isNone = false;
		}

		if (this.noticeCurrent != this.noticePrevious) {
			Game.PlayerLeagueSystem.leagueNotice(this.noticeCurrent);
			isNone = false;
		}

		if (this.joinConditionCurrent != this.joinConditionPrevious || this.joinLevelCurrent != this.joinLevelPrevious) {
			Game.PlayerLeagueSystem.leagueJoinCondition(this.joinConditionCurrent, this.joinLevelCurrent);
			isNone = false;
		}

		if (this.introduceCurrent != this.introducePrevious) {
			Game.PlayerLeagueSystem.leagueIntroduce(this.introduceCurrent);
			isNone = false;
		}

		if (!isNone) {
			toast_warning(LANG(TextsConfig.TextConfig_League.setSuccess));
			setTimeout(() => {
				this.update1();
				Game.EventManager.event(GameEvent.LEAGUE_MAIN_UPDATE);
				Game.EventManager.event(GameEvent.LEAGUE_HOME_UPDATE);
			}, 800);
		} else {
			toast_warning(LANG(TextsConfig.TextConfig_League.setNone));
		}
	}

	private onBtnClose() {
		Game.EventManager.event(GameEvent.LEAGUE_MAIN_TWEEN);
		this.close(UI.HIDE_TO_TOP);
	}
}

}
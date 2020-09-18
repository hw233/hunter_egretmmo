namespace zj {
//工会管理List点击后的小界面(id = 盟主)
//yuqingchao
//2018.12.24
export class LeagueMemberPopLeader extends UI {
	private groupMain: eui.Group;
	private btnCheck: eui.Button;
	private btnFriend: eui.Button;
	private btnMail: eui.Button;
	private btnPrivate: eui.Button;
	private btnThreePk: eui.Button;
	private btnElevate: eui.Button;
	private btnElevate1: eui.Button;
	private btnAbdicate: eui.Button;
	private btnKick: eui.Button;
	private btnOnePk: eui.Button;
	private father: LeagueMain;

	private memberInfo: message.MemberInfo;
	private index: number = null;

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueMemberPopLeaderSkin.exml";

		this.btnCheck.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnCheck, this);
		this.btnFriend.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnFriend, this);
		this.btnMail.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnMail, this);
		this.btnPrivate.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnPrivate, this);
		this.btnThreePk.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnThreePk, this);
		this.btnElevate.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnElevate, this);
		this.btnElevate1.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnElevate1, this);
		this.btnAbdicate.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnAbdicate, this);
		this.btnKick.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnKick, this);
		this.btnOnePk.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnOnePk, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			// this.father = null;
		}, null);
	}

	public init(x: number, y: number, num: number, father: LeagueMain) {
		this.father = father;
		this.groupMain.scaleX = 0.1;
		this.groupMain.scaleY = 0.1;
		egret.Tween.get(this.groupMain).to({ scaleX: 1.1 }, 250).to({ scaleX: 1 }, 80).to({ scaleX: 1.1 }, 80);
		egret.Tween.get(this.groupMain).to({ scaleY: 1.1 }, 250).to({ scaleY: 1 }, 80).to({ scaleY: 1.1 }, 80);
		this.x = x;
		this.y = y - 175;

		this.index = num;

		this.memberInfo = Game.PlayerLeagueSystem.Members[num];
		this.setInfo();

		if (this.memberInfo.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_ELDER) {
			this.btnElevate1.visible = true;
			this.btnElevate.visible = false;
		}
		if (this.memberInfo.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_NORMAL) {
			this.btnElevate1.visible = false;
			this.btnElevate.visible = true;
		}
	}

	private setInfo() {
		this.btnOnePk.visible = true;
		this.btnThreePk.visible = true;
		if (this.memberInfo.monarchbase.level < 8) {
			this.btnOnePk.visible = false;
		}
		if (this.memberInfo.monarchbase.level < 40) {
			this.btnThreePk.visible = false;
		}
	}

	private onBtnCheck() {
		// toast("查看详情");
		Game.PlayerInfoSystem.queryRoleInfo(this.memberInfo.monarchbase.id, this.memberInfo.monarchbase.group_id).then((resp: message.RoleInfoZip) => {
			let name: string = "";
			if (resp.baseInfo.group_name != "") {
				name = resp.baseInfo.group_name;
			} else {
				name = TextsConfig.TextsConfig_Chat.serverSelf;
			}

			if (resp.generals.length == 0) {
				toast_warning(LANG(TextsConfig.TextsConfig_Common.noHunter));
			} else {
				// "Common_Player"
				loadUI(CommonPlayer).then((dialog: CommonPlayer) => {
					dialog.setInfo(resp, name);
					dialog.show(UI.SHOW_FROM_TOP);
					this.father.removeChild(this);
				});
			}
		});
	}

	private onBtnFriend() {
		// toast("加为好友");
		let roleId: number = this.memberInfo.monarchbase.id;
		if (roleId != Game.PlayerLeagueSystem.Member.monarchbase.id) {
			Game.PlayerLeagueSystem.relationAdd(message.ERelationType.RELATION_TYPE_FRIEND, roleId).then(() => {
				this.father.removeChild(this);
				toast_success(LANG(TextsConfig.TextsConfig_Friend.applySend));
			});
		} else {
			toast_warning(LANG(TextsConfig.TextsConfig_Error.chat_self));
		}
	}

	private onBtnMail() {
		// toast("发送信件");
		let info = new message.MailInfo();
		info.type = message.MailType.MAIL_TYPE_NORMAL;
		info.from_id = this.memberInfo.monarchbase.id;
		info.roleBaseInfo = [this.memberInfo.monarchbase];
		loadUI(Common_Letter)
			.then((dailog: Common_Letter) => {
				dailog.show();
				dailog.setInfo(info);
				this.father.removeChild(this);
			});
	}

	private onBtnPrivate() {
		// toast("设为私聊");
		let role = this.memberInfo.monarchbase;
		loadUI(Chat_Main)
			.then((dialog: Chat_Main) => {
				Game.EventManager.event(GameEvent.FRIEND_CHAT, { id: role.id, name: role.name, group_id: null });
				dialog.show();
				this.father.removeChild(this);
			});
	}

	private onBtnOnePk() {
		// toast("单队切磋");
		let formation = message.EFormationType.FORMATION_TYPE_PVP_SIMPLE;
		let playerInfo = ["Lv." + this.memberInfo.monarchbase.level + " " + this.memberInfo.monarchbase.name, "groupStr", ":", this.memberInfo.monarchbase.picId, this.index];
		if (PlayerHunterSystem.LevelDBFunOpenTo(message.EFormationType.FORMATION_TYPE_PVP_SIMPLE, true)) {
			TipManager.PVPLadderBattle_Req(this.memberInfo.monarchbase.id, null, formation, null, this.memberInfo.monarchbase, playerInfo, this);
		}
	}

	private onBtnThreePk() {
		// toast("三队切磋");
		let formation = message.EFormationType.FORMATION_TYPE_PVP_THIRD;
		let playerInfo = ["Lv." + this.memberInfo.monarchbase.level + " " + this.memberInfo.monarchbase.name, "groupStr", ":", this.memberInfo.monarchbase.picId, this.index];
		if (PlayerHunterSystem.LevelDBFunOpenTo(message.EFormationType.FORMATION_TYPE_PVP_THIRD)) {
			TipManager.PVPLadderBattle_Req(this.memberInfo.monarchbase.id, null, formation, null, this.memberInfo.monarchbase, playerInfo, this);
		}
	}

	private onBtnElevate() {
		// toast("升为副会长");
		if (this.memberInfo.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_ELDER) {
			toast(LANG(TextsConfig.TextConfig_League.elder_already));
		} else {
			Game.PlayerLeagueSystem.leagueOfficial(this.memberInfo.monarchbase.id, message.ELeagueOfficial.LEAGUE_OFFICIAL_ELDER).then(() => {
				this.father.removeChild(this);
				this.father.scrollerInfo.viewport = this.father.lstItem;
				this.father.scrollerInfo.validateNow();
				this.father.moveLocation = this.father.scrollerInfo.viewport.scrollV;
				Game.EventManager.event(GameEvent.LEAGUE_MAIN_UPDATE);
			});
		}
	}
	private onBtnElevate1() {
		// toast("罢免副会长");
		if (this.memberInfo.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_NORMAL) {
			toast(LANG(TextsConfig.TextConfig_League.elder_notyet));
		} else {
			Game.PlayerLeagueSystem.leagueOfficial(this.memberInfo.monarchbase.id, message.ELeagueOfficial.LEAGUE_OFFICIAL_NORMAL).then(() => {
				this.father.removeChild(this);
				this.father.scrollerInfo.viewport = this.father.lstItem;
				this.father.scrollerInfo.validateNow();
				this.father.moveLocation = this.father.scrollerInfo.viewport.scrollV;
				Game.EventManager.event(GameEvent.LEAGUE_MAIN_UPDATE);
			});
		}
	}

	private onBtnAbdicate() {
		// toast("禅让会长");
		Game.PlayerLeagueSystem.leagueTransfer(this.memberInfo.monarchbase.id).then(() => {
			this.father.removeChild(this);
			this.father.scrollerInfo.viewport = this.father.lstItem;
			this.father.scrollerInfo.validateNow();
			this.father.moveLocation = this.father.scrollerInfo.viewport.scrollV;
			Game.EventManager.event(GameEvent.LEAGUE_MAIN_UPDATE);
		});
	}

	private onBtnKick() {
		// toast("踢出公会");
		loadUI(ConfirmCancelDialog).then((dialog: ConfirmCancelDialog) => {
			dialog.show(UI.SHOW_FROM_TOP);
			dialog.setInfo(Helper.StringFormat(TextsConfig.TextConfig_League.kick, this.memberInfo.monarchbase.name));
			dialog.setCB(this.kick);
		});
	}

	private kick = () => {
		Game.PlayerLeagueSystem.leagueKickOut(this.memberInfo.monarchbase.id).then(() => {
			this.father.scrollerInfo.viewport = this.father.lstItem;
			this.father.scrollerInfo.validateNow();
			this.father.moveLocation = this.father.scrollerInfo.viewport.scrollV;
			this.father.removeChild(this);
			Game.EventManager.event(GameEvent.LEAGUE_MAIN_UPDATE);
		});
	}
}
}
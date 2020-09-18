namespace zj {
//工会管理List点击后的小界面(id = 长老)
//yuqingchao
//2018.12.24
export class LeagueMemberPopElder extends UI {
	private groupMain: eui.Group;
	private btnCheck: eui.Button;
	private btnFriend: eui.Button;
	private btnMail: eui.Button;
	private btnPrivate: eui.Button;
	private btnKick: eui.Button;
	private btnOnePk: eui.Button;
	private btnThreePk: eui.Button;

	private father: LeagueMain;
	private memberInfo: message.MemberInfo;
	private index: number = null;

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueMemberPopElderSkin.exml";

		this.btnCheck.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnCheck, this);
		this.btnFriend.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnFriend, this);
		this.btnMail.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnMail, this);
		this.btnPrivate.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnPrivate, this);
		this.btnKick.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnKick, this);
		this.btnOnePk.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnOnePk, this);
		this.btnThreePk.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnThreePk, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.father = null;
		}, null);
	}

	public init(x: number, y: number, num: number, father: LeagueMain) {
		this.groupMain.scaleX = 0.1;
		this.groupMain.scaleY = 0.1;
		egret.Tween.get(this.groupMain).to({ scaleX: 1.1 }, 250).to({ scaleX: 1 }, 80).to({ scaleX: 1.1 }, 80);
		egret.Tween.get(this.groupMain).to({ scaleY: 1.1 }, 250).to({ scaleY: 1 }, 80).to({ scaleY: 1.1 }, 80);
		this.x = x;
		this.y = y - 175;

		this.index = num;

		this.memberInfo = Game.PlayerLeagueSystem.Members[num];
		this.father = father;
		this.setInfo();
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

	private onBtnKick() {
		// toast("踢出公会");
		if (this.memberInfo.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_LEADER) {
			toast_warning(LANG(TextsConfig.TextConfig_League.err_kick_leader));
		} else if (this.memberInfo.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_ELDER) {
			toast_warning(LANG(TextsConfig.TextConfig_League.err_kick_elder));
		} else {
			loadUI(ConfirmCancelDialog)
				.then((dialog: ConfirmCancelDialog) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setInfo(Helper.StringFormat(TextsConfig.TextConfig_League.kick, this.memberInfo.monarchbase.name));
					dialog.setCB(this.kick);
				});
		}
	}

	private kick = () => {
		Game.PlayerLeagueSystem.leagueKickOut(this.memberInfo.monarchbase.id).then(() => {
			Game.EventManager.event("LEAGUE_MAIN_UPDATE");
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
}
}
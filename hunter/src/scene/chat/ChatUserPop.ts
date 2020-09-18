namespace zj {
const BATTLELEVEL = 8;
const BATTLELEVELS = 40;

export class ChatUserPop extends Dialog {
	private groupAdaptBoard: eui.Group;
	private imgBG: eui.Image;
	private imgBoard: eui.Image;
	private imgIcon: eui.Image;
	private labelPlayerName: eui.Label;
	private labelTitleName: eui.Label;
	private labelLeagueName: eui.Label;
	private labelServerName: eui.Label;
	private groupLeagueInfo: eui.Group;
	private labelLeagueInfo: eui.Label;
	private labelLeagueInfoLine: eui.Label;
	private imgLeagueInfo: eui.Image;
	private btnPrivate: eui.Button;
	private btnAdd: eui.Button;
	private btnOnePk: eui.Button;
	private btnThreePk: eui.Button;
	private btnCheck: eui.Button;
	private btnJoin: eui.Button;
	private btnShow: eui.Button;
	private btnHide: eui.Button;
	private closeWindow: eui.Image;

	private msgInfo: message.RoleBriefInfo;
	private msg: message.RoleInfoZip;
	private index: number;
	private senderGroupName: string;
	private msgInfos: message.ChatMessage;
	private splitList: Array<string>;
	private _name: string;

	public personage: number = 0;
	public type: number = 0;

	public constructor() {
		super();
		this.skinName = "resource/skins/chat/ChatUserPopSkin.exml";
		this.init();
		this.monitorEvent();
	}

	public init() {
		this.personage = 1;
		this.closeWindow.visible = true;
	}

	/**
	 * 初始化
	 */
	public setMsgInfo(msg: message.RoleInfoZip, msgInfos: message.ChatMessage,id) {
		// 查看详情的信息
		this.msgInfo = msg.baseInfo;
		this.msg = msg;
		// 分区名字
		this.senderGroupName = msg.baseInfo.group_name;
		// 聊天协议返回的信息
		this.msgInfos = msgInfos;
		this.imgBoard.source = cachekey(PlayerItemSystem.ItemPath(msg.baseInfo.picFrameId), this);
		this.groupLeagueInfo.visible = Number(this.msgInfo.leagueId) != 0;

		if (id != this.msgInfo.server_id && this.senderGroupName != "") {
			this.btnJoin.visible = false;
			if (this.senderGroupName != "") {
				let sn: string = Set.DecodeJson(this.senderGroupName);
				let splitList = sn.split("&");
				this.splitList = sn.split("&");
				this.labelServerName.text = Helper.StringFormat(TextsConfig.TextsConfig_Login.serverDesSimple, splitList[0], splitList[1]);
				this._name = sn.split("&")[1];
			} else {
				this.labelServerName.text = this.senderGroupName;
				this._name = this.senderGroupName;
			}
		} else if ((id == this.msgInfo.server_id && msgInfos.receiver_id == 0) || this.senderGroupName == "") {
			this.labelServerName.text = TextsConfig.TextsConfig_Chat.serverSelf;
			this._name = TextsConfig.TextsConfig_Chat.serverSelf;
		} else {
			this.labelServerName.visible = false;
		}

		let titleName = TableItemTitle.Item(this.msgInfo.titleId).name;
		this.imgIcon.source = cachekey(PlayerItemSystem.ItemPath(this.msgInfo.picId), this);
		this.labelPlayerName.text = this.msgInfo.name;
		if (this.msgInfo.leagueName != "") {
			this.labelLeagueName.text = this.msgInfo.leagueName;
		} else {
			this.labelLeagueName.text = TextsConfig.TextsConfig_Rank.ally_no;
		}

		this.labelTitleName.text = titleName;

		if (!Device.isReviewSwitch) {
			// 设置单队切磋是否显示
			if (this.msgInfo.level < BATTLELEVEL) {
				this.btnOnePk.visible = false;
			} else {
				this.btnOnePk.visible = true;
			}
		}

		// 设置三队切磋是否显示
		if (this.msgInfo.level < BATTLELEVELS) {
			this.btnThreePk.visible = false;
		} else {
			this.btnThreePk.visible = true;
		}

		this.btnHide.visible = (Table.FindK(Game.PlayerChatDataSystem.chatShieldTbl, this.msgInfo.id) == -1);
		this.btnShow.visible = (Table.FindK(Game.PlayerChatDataSystem.chatShieldTbl, this.msgInfo.id) != -1);
		Game.PlayerRelateSystem.serverName = this._name;
	}

	/**
	 * 监听事件
	 */
	public monitorEvent() {
		if (!Device.isReviewSwitch) {
			this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAdd, this);// 加为好友
			this.btnCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCheck, this);// 查看详情
			this.btnHide.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHide, this);// 屏蔽此人聊天
			this.btnJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnJoin, this);// 加入公会 
			this.btnOnePk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOnePk, this);// 单队切磋
			this.btnPrivate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPrivate, this);// 设为私聊
			this.btnShow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnShow, this);// 显示此人聊天
			this.btnThreePk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnThreePk, this);// 三队切磋
			this.groupLeagueInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLeagueInfo, this);// 查看工会详细信息
			this.closeWindow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseWindow, this);// 关闭界面		
		} else {
			this.groupLeagueInfo.visible = false;
			this.btnAdd.visible = false;
			this.btnThreePk.visible = false;
			this.btnJoin.visible = false;
			this.btnCheck.visible = false;
			this.btnOnePk.visible = false;
			this.btnPrivate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPrivate, this);// 设为私聊
			this.btnHide.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHide, this);// 屏蔽此人聊天
			this.closeWindow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseWindow, this);// 关闭界面		
		}
	}

	/**
	 * 屏蔽此人聊天 
	 */
	private onBtnHide() {
		Game.PlayerChatDataSystem.chatShieldTbl.push(this.msgInfo.id);
		this.btnHide.visible = (Table.FindK(Game.PlayerChatDataSystem.chatShieldTbl, this.msgInfo.id) == -1);
		this.btnShow.visible = (Table.FindK(Game.PlayerChatDataSystem.chatShieldTbl, this.msgInfo.id) != -1);
	}

	/**
	 * 显示此人聊天
	 */
	private onBtnShow() {
		for (let i = 0; i < Game.PlayerChatDataSystem.chatShieldTbl.length; i++) {
			let v = Game.PlayerChatDataSystem.chatShieldTbl[i];
			if (v == this.msgInfo.id) {
				Game.PlayerChatDataSystem.chatShieldTbl.splice(i, 1);
			}
		}

		this.btnHide.visible = (Table.FindK(Game.PlayerChatDataSystem.chatShieldTbl, this.msgInfo.id) == -1);
		this.btnShow.visible = (Table.FindK(Game.PlayerChatDataSystem.chatShieldTbl, this.msgInfo.id) != -1);
	}

	/**
	 * 单队切磋
	 */
	private onBtnOnePk() {
		let Formation = message.EFormationType.FORMATION_TYPE_PVP_SIMPLE;
		if (PlayerMissionSystem.FunOpenTo(FUNC.ONEBATTEL, true)) {
			TipManager.PVPLadderBattle_Req(this.msgInfo.id, this.msgInfo.group_id, Formation, this._name, this.msgInfo, null, this)
		}
	}

	/**
	 * 三队切磋
	 */
	private onBtnThreePk() {
		let Formation = message.EFormationType.FORMATION_TYPE_PVP_THIRD;
		if (PlayerMissionSystem.FunOpenTo(FUNC.THREEBATLEE, true)) {
			this.type = 100;
			TipManager.PVPLadderBattle_Req(this.msgInfo.id, this.msgInfo.group_id, Formation, this._name, this.msgInfo, this.type, null, this);
		}
	}

	/**
	 * 设为私聊 
	 */
	private onBtnPrivate() {
		this.onCloseWindow();
		Game.EventManager.event(GameEvent.FRIEND_CHAT, { id: this.msgInfos.sender_id, name: this.msgInfos.sender_name, group_id: this.msgInfo.group_id, type: this.personage });
	}

	/**
	 * 查看详情
	 */
	private onBtnCheck() {
		if (this.msg == null || this.msg.generals.length == 0) {
			toast_warning(TextsConfig.TextsConfig_Common.noHunter);
		} else {
			if (this.msg.baseInfo.server_id != this.msgInfo.server_id && this.senderGroupName != "") {
				loadUI(CommonPlayer).then((dialog: CommonPlayer) => {
					dialog.setInfo(this.msg, this.splitList);
					dialog.show(UI.SHOW_FROM_TOP);
				});
			} else {
				loadUI(CommonPlayer).then((dialog: CommonPlayer) => {
					dialog.setInfo(this.msg, this.labelServerName.text);
					dialog.show(UI.SHOW_FROM_TOP);
				});
			}
		}
	}

	/**
	 * 加为好友
	 */
	private onBtnAdd() {
		TipManager.RelationAdd(this.msgInfo.id, () => {
			this.alpha = 0;
			this.close(UI.HIDE_TRAIL_OFF);
		});
	}

	/**
	 * 加入公会
	 */
	private onBtnJoin() {
		if (PlayerMissionSystem.FunOpenTo(FUNC.LEAGUE, true)) {
			TipManager.LeagueApply(this.msgInfo.leagueId);
		}
	}

	/**
	 * 查看工会详细信息
	 */
	private onBtnLeagueInfo() {
		let sameServer = ((this.msg.baseInfo.server_id == this.msgInfo.server_id && this.msgInfos.receiver_id == 0) || this.senderGroupName == "");
		Game.PlayerChatDataSystem.guildQuery(this.msgInfo)
			.then((msg: Array<message.LeagueBase>) => {
				let cb = () => {
					this.groupAdaptBoard.visible = true;
				}
				if (msg.length != 0) {
					this.groupAdaptBoard.visible = false;
					loadUI(LeagueJoinMini)
						.then((dialog: LeagueJoinMini) => {
							dialog.SetInfo(msg[0], sameServer);
							dialog.SetCB(cb);
							dialog.show(UI.SHOW_FROM_TOP);
						});
				}
			})
			.catch(() => {

			});
	}

	/**
	 * 关闭
	 */
	public onCloseWindow() {
		this.close();
	}
}
}
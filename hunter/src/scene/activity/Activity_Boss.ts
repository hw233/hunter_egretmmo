namespace zj {
	/**
 * @class 年兽BOSS 进入战场UI
 * 
 * @author Yu Qingchao
 * 
 * 2019.07.18
 */
	export class Activity_Boss extends Dialog {
	private btnClose: eui.Button;
	private btnPlayer: eui.Button;//屏蔽玩家
	private btnRank: eui.Button;//积分排行榜
	private btnAttack: eui.Button;//挑战
	private btnFightA: eui.Button;//激励（金币）
	private btnFightB: eui.Button;//激励（钻石）
	private btnAddGemstone: eui.Button;//加钻石
	private btnAddGold: eui.Button;//加金币

	private groupLeftTime: eui.Group;//挑战时间
	private groupList: eui.Group;//排行榜Group
	private groupWord: eui.Group;//激励Group

	private groupMiniChat: eui.Group;
	private imgChatBack: eui.Image;
	private labelInfoList: eui.List;
	private groupChat: eui.Group;
	private btnChat: eui.Button;
	private messageHistoryChat: eui.Group;
	private simpleChat: eui.List;
	private labelInfoDate: eui.ArrayCollection = new eui.ArrayCollection();
	private groupDie: eui.Group;
	private listTableViewRankData: eui.ArrayCollection = new eui.ArrayCollection();
	private labelInfoListDate: eui.ArrayCollection = new eui.ArrayCollection();

	private labelStartTime: eui.Label;//剩余时间
	private lbFightWord: eui.Label;//积分加成百分比
	private labelMyRank: eui.Label;//自身排行
	private labelMyName: eui.Label;//猎人姓名
	private labelMyValue: eui.Label;//积分
	private lbGemstone: eui.Label;//钻石数量
	private lbGold: eui.Label;//金币数量
	private lbAttackTime: eui.Label;//挑战次数
	private lbZuanshi: eui.Label;//激励消耗钻石数
	private lbGold0: eui.Label;//激励消耗金币数
	public chatInfosMini = Game.PlayerChatDataSystem.chatInfosMini;

	private listTableViewRank: eui.List;
	private arrTableViewRank: eui.ArrayCollection;

	private listPop: boolean = true;//是否弹出伤害列表

	private _normal: number = 0;
	private _high: number = 0;
	private _rank: any = null;
	private scene: any;
	private bHidePerson: boolean;
	private updata: any = null;
	private updatas: any = null;
	private time;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/Activity_BossSkin.exml";
		Game.EventManager.on(GameEvent.PLAYER_COIN_CHANGE, this.gemsGold, this);
		Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.gemsToken, this);
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.btnPlayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPlayer, this);
		this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRank, this);
		this.btnFightA.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFightA, this);
		this.btnFightB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFightB, this);
		this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
		this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
		this.btnChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.AddChatMini, this);
		this.messageHistoryChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.AddChatMini, this);
		Game.EventManager.on(GameEvent.SERVER_NOTICE_CHAT_MESSAGE, this.LoadListZorkBossChat, this);
		this.btnAttack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAttack, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			Game.EventManager.off(GameEvent.PLAYER_COIN_CHANGE, this.gemsGold, this);
			Game.EventManager.off(GameEvent.PLAYER_TOKEN_CHANGE, this.gemsToken, this);
			egret.clearInterval(this.updata);
			egret.clearInterval(this.updatas);
		}, null)
		this.init();
		this.time = egret.setTimeout(this.timeFun, this, 200);
	}

	private timeFun() {
		egret.clearTimeout(this.time);
		let ui = this.getChildByName("__rect_back");
		if (ui) {
			this.removeChild(ui);
		}
	}

	public init() {
		this.scene = StageSceneManager.Instance.GetCurScene();
		this.gemsToken();
		this.gemsGold();
		this.SetScorePer();
		this.UpdateRank();
		this.updata = egret.setInterval(this.UpdateRank, this, 990);
		this.updatas = egret.setInterval(this.UpdateScore, this, 990);
		egret.setTimeout(this.onClose1, this, 10000);
	}

	public onClose1() {
		this.labelInfoDate.removeAll();
		this.messageHistoryChat.visible = false;
	}

	private UpdateScore() {
		let [bOpen, lastTime] = Game.PlayerBossSystem.ActivityBossOpenTime();
		let time = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_ACTIVITY_BOSS].leftTime;
		let leftTime = time - Math.floor(egret.getTimer() / 1000);
		let str_time = Set.timeLeaveSec(Number(lastTime));
		let zeroTime = Set.timeLeaveSec(0);
		if (!bOpen) {
			this.labelStartTime.text = zeroTime;
			loadUI(Activity_BossEnd)
				.then((dialog: Activity_BossEnd) => {
					egret.clearInterval(this.updatas);
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.init();
				})
		} else {
			this.labelStartTime.text = str_time;
		}
	}

	//玩家积分排行更新
	private UpdateRank() {
		this.arrTableViewRank = new eui.ArrayCollection();
		if (Gmgr.Instance.bDisconnectNet == true) return;
		let display_num = 20;
		Game.PlayerBossSystem.darklandBossScoreRank().then((msg: message.DarklandBossScoreRankResponse) => {
			this._rank = msg.body.ranks;
			let _rank = this._rank
			if (this.listPop) {
				display_num = _rank.length >= display_num ? display_num : _rank.length;
				for (let i = 0; i < display_num; i++) {
					this.arrTableViewRank.addItem({
						info: _rank[i],
						num: 1
					})
				}
				this.listTableViewRank.dataProvider = this.arrTableViewRank;
				this.listTableViewRank.itemRenderer = Activity_BossItem;
			}
			this.UpdateMyRank(msg.body.self_rank);
		}).catch(reason => { });
	}

	//我的排行
	private UpdateMyRank(rankInfo) {
		let rank = 0
		if (Game.PlayerBossSystem.ActivityBoss.myRank == 0 || rankInfo.score == 0) {
			this.labelMyRank.text = TextsConfig.TextConfig_League.noRank;
		} else {
			this.labelMyRank.text = rankInfo.rank;
		}

		this.labelMyName.text = rankInfo.roleName;
		this.labelMyValue.text = rankInfo.score;
		// this.labelPoints.text = rankInfo.score;
	}

	//金币与钻石数量
	private gemsToken() {
		if (Game.PlayerInfoSystem.Token > 100000) {
			if (((Game.PlayerInfoSystem.Token / 1000) >>> 0) % 10 == 0) {
				this.lbGemstone.text = ((Game.PlayerInfoSystem.Token / 10000) >>> 0) + "万";
			} else {
				this.lbGemstone.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
			}
		} else {
			this.lbGemstone.text = Game.PlayerInfoSystem.Token.toString();
		}
		if (this.lbGemstone.text.length > 6) {
			this.lbGemstone.size = 12;
		} else {
			this.lbGemstone.size = 16;
		}
	}

	private gemsGold() {
		if (Game.PlayerInfoSystem.Coin > 100000) {
			if (((Game.PlayerInfoSystem.Coin / 1000) >>> 0) % 10 == 0) {
				this.lbGold.text = ((Game.PlayerInfoSystem.Coin / 10000) >>> 0) + "万";
			} else {
				this.lbGold.text = (Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
			}
		} else {
			this.lbGold.text = Game.PlayerInfoSystem.Coin.toString();
		}
		if (this.lbGold.text.length > 6) {
			this.lbGold.size = 12;
		} else {
			this.lbGold.size = 16;
		}
	}

	private onBtnRank() {
		let call = () => {
			this.listPop = !this.listPop;
			if (this.listPop) {
				this.UpdateRank();
			}
		}
		let action = null;
		if (this.listPop) {
			Set.ButtonBackgroud(this.btnRank, cachekey("ui_activity_boss_ButtonTopHitRankNor2_png", this), cachekey("ui_activity_boss_ButtonTopHitRankSel2_png", this));
			egret.Tween.get(this.groupList)
				.to({ y: -138 }, 500, egret.Ease.backIn)
				.call(() => {
					this.btnRank.enabled = true;
					this.listPop = !this.listPop
					if (this.listPop) {
						this.UpdateRank();
					}
				});
		} else {
			Set.ButtonBackgroud(this.btnRank, cachekey("ui_activity_boss_ButtonTopHitRankNor1_png", this), cachekey("ui_activity_boss_ButtonTopHitRankSel1_png", this));
			egret.Tween.get(this.groupList)
				.to({ y: 60 }, 500, egret.Ease.bounceOut)
				.call(() => {
					this.btnRank.enabled = true;
					this.listPop = !this.listPop
					if (this.listPop) {
						this.UpdateRank();
					}
				});
		}
	}

	//设置文本
	private SetScorePer() {
		let a = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_ACTIVITY_BOSS].info;
		let num = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_ACTIVITY_BOSS].info % 10;
		let bossCommonInspire = 0;
		let bossSeniorInspire = 0;
		if (Game.PlayerMixUnitInfoSystem.mixunitinfo.bossCommonInspire.length != 0) {
			for (let k in Game.PlayerMixUnitInfoSystem.mixunitinfo.bossCommonInspire) {
				let v = Game.PlayerMixUnitInfoSystem.mixunitinfo.bossCommonInspire[k];
				if (num == 0) {
					bossCommonInspire = this._normal;
				} else if (v.key == num) {
					bossCommonInspire = v.value;
				}
			}
		}

		if (Game.PlayerMixUnitInfoSystem.mixunitinfo.bossSeniorInspire.length != 0) {
			for (let k in Game.PlayerMixUnitInfoSystem.mixunitinfo.bossSeniorInspire) {
				let v = Game.PlayerMixUnitInfoSystem.mixunitinfo.bossSeniorInspire[k];
				if (num == 0) {
					bossSeniorInspire = this._high;
				} else if (v.key == num) {
					bossSeniorInspire = v.value;
				}
			}
		}
		let nums = 0;
		if (bossCommonInspire == null) {
			bossCommonInspire = 0;
		}
		if (bossSeniorInspire == null) {
			bossSeniorInspire = 0
		}
		let str = bossCommonInspire * CommonConfig.darkland_boss_inspire_percent[0] + bossSeniorInspire * CommonConfig.darkland_boss_inspire_percent[1];
		this.lbFightWord.text = str + "%";

		if (Game.PlayerMixUnitInfoSystem.mixunitinfo.bossBattleTime.length == 0) {
			this.lbAttackTime.text = Helper.StringFormat(TextsConfig.TextsConfig_Error.battle_num, CommonConfig.darkland_boss_battle_times);
		} else {
			for (let k in Game.PlayerMixUnitInfoSystem.mixunitinfo.bossBattleTime) {
				let v = Game.PlayerMixUnitInfoSystem.mixunitinfo.bossBattleTime[k];
				if (v.key == num) {
					nums = v.value;
				}
			}
			this.lbAttackTime.text = Helper.StringFormat(TextsConfig.TextsConfig_Error.battle_num, (CommonConfig.darkland_boss_battle_times - nums));
		}
			if ((CommonConfig.darkland_boss_battle_times - nums) <= 0) {
				this.btnAttack.enabled = false;
			} else {
				this.btnAttack.enabled = true;
			}

		this.lbGold0.text = CommonConfig.darkland_boss_inspire_consume[0][1].toString();
		this.lbZuanshi.text = CommonConfig.darkland_boss_inspire_consume[1][1].toString();
	}

	/**进入聊天(点击聊天按钮) */
	public AddChatMini() {
		loadUI(Chat_Main)
			.then((dialog: Chat_Main) => {
				dialog.show();
				dialog.inittypr(1);
			});
	}

	/**
	 * 对boss伤害简易聊天
	 */
	public LoadListZorkBossChat(msg, result) {
		msg = msg.data.body;
		Game.PlayerChatDataSystem.LoadServerData_ChatInfos(msg.chatinfos);
		// if (Game.PlayerMissionSystem.tableLength(Game.PlayerZorkSystem.zorkBoss.chatInfosMini) == 0) {
		// 	this.imgChatBack.alpha = 0;
		// 	this.imgChatBack.visible = false;
		// 	return;
		// }
		//egret.Tween.removeTweens(this.imgChatBack);
		//this.imgChatBack.alpha = 1;
		//this.imgChatBack.visible = true;

		this.groupMiniChat.visible = true;
		this.labelInfoListDate.removeAll();
		// 聊天  对炸弹魔的伤害
		for (let i = 0; i < Game.PlayerZorkSystem.zorkBoss.chatInfosMini.length; i++) {
			let v = Game.PlayerZorkSystem.zorkBoss.chatInfosMini[i];
			this.labelInfoListDate.addItem(v);
		}
		this.labelInfoList.dataProvider = this.labelInfoListDate;
		this.labelInfoList.itemRenderer = Chat_ItemMini;

		//egret.Tween.get(this.imgChatBack).wait(100).to({ alpha: 0 });

		egret.Tween.get(this.imgChatBack).wait(100).to({ alpha: 0 })
			.call(() => {
				this.groupMiniChat.visible = false;
			});
	}

	public combatChat(e) {
		this.messageHistoryChat.visible = true;
		//this.LabelInfo.text = "【" + e.data.name + "】" + " " + JSON.parse(e.data.content)[0].content;
		this.InitChatList();
	}

	/**
     * 简易聊天内容list列表
     */
	public InitChatList() {
		this.labelInfoDate.removeAll();
		for (let i = 0; i < this.chatInfosMini.length; i++) {
			let v = this.chatInfosMini[i];
			let ChatItem = new FormatChatItem();
			let content = Game.PlayerChatDataSystem.GetChatInfo(v);
			let lineNum = Game.PlayerChatDataSystem.getStrlineNum(HelpUtil.textConfigFormat(content[0]), 350);
			if (lineNum == 1) {
				if (v.type == 5 && v.content != "") {
					ChatItem.itemNum = 40;
				} else {
					ChatItem.itemNum = 20;
				}
			} else {
				ChatItem.itemNum = 40;
			}
			ChatItem.Data = v;
			this.labelInfoDate.addItem(ChatItem);
		}
		this.simpleChat.dataProvider = this.labelInfoDate;
		this.simpleChat.itemRenderer = HXH_ChatItem;
	}

	//金币激励
	private onBtnFightA() {
		this.DarklandBossInspire(1);
	}

	//钻石激励
	private onBtnFightB() {
		this.DarklandBossInspire(2);
	}

	private DarklandBossInspire(inspireType) {
		Game.PlayerBossSystem.DarklandBossInspire(inspireType).then(() => {
			toast_success("激励成功");
			this.MixInfo();
		}).catch(reason => { });
	}

	//加金币
	private onBtnAddGold() {
		loadUI(HelpGoldDialog)
			.then((dialog: HelpGoldDialog) => {
				dialog.SetInfoList(true);
				dialog.show(UI.SHOW_FROM_TOP);
			});
	}

	//加钻石
	private onBtnAddGemstone() {
		Game.UIManager.loadUI(PayMallScene)
			.then((scene: PayMallScene) => {
				scene.init();
				scene.show(UI.SHOW_FROM_TOP);
			});
	}

	/**
	 * 挑战
	 */
	private onBtnAttack() {
		if (this.scene.playerLeader.otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
			toast_warning(TextsConfig.TextsConfig_Wonderland.die_error_tips);
			return;
		}
		this.MobsInfo_Visit().then((data: any) => {
			this.scene.loadFormation();
		}).catch(reason => { toast_warning(reason) });
	}

	/**
	 * 拉取年兽BOSS怪物信息
	 */
	private MobsInfo_Visit() {
		return new Promise((resolve, reject) => {
			let request = new message.MobsInfoRequest();
			request.body.battleType = message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS;
			request.body.mobsId = Game.PlayerBossSystem.ActivityBoss.bossId;
			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.MobsInfoResponse>resp;
				console.log(response);
				if (response.header.result != 0) {
					return;
				}
				resolve(response);
				return;
			}, (req: aone.AoneRequest): void => {
				reject(LANG("请求超时"));
				return;
			}, this, false);
			return;
		});
	}

	//屏蔽玩家
	private onBtnPlayer() {
		let a = this.scene.bHidePerson;
		if (this.scene.bHidePerson == false) {
			this.btnPlayer.currentState = "down";
			Set.ButtonBackgroud(this.btnPlayer, cachekey("ui_wonderland_boss_ButtonTopClosePlayerSel_png", this), cachekey("ui_wonderland_boss_ButtonTopClosePlayerSel_png", this), cachekey("ui_wonderland_boss_ButtonTopClosePlayerSel_png", this));
			this.scene.hidePerson(true);
		}
		else {
			this.bHidePerson = false;
			this.btnPlayer.currentState = "up";
			Set.ButtonBackgroud(this.btnPlayer, cachekey("ui_wonderland_boss_ButtonTopClosePlayerNor_png", this), cachekey("ui_wonderland_boss_ButtonTopClosePlayerSel_png", this), cachekey("ui_wonderland_boss_ButtonTopClosePlayerNor_png", this));
			this.scene.hidePerson(false);
		}
	}

	private onBtnClose() {
		TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Wonderland.return_tip, () => {
			Game.PlayerBossSystem.closeActivityBoss();
		});
		// loadUI(ConfirmCancelDialog).then((dialog: ConfirmCancelDialog) => {
		// 	dialog.show(UI.SHOW_FROM_TOP);
		// 	dialog.setInfo(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Wonderland.return_tip, this));
		// 	dialog.setCB(dark);
		// });
		// let dark = () => {
		// 	Game.PlayerBossSystem.DarklandBossLeave().then(() => {
		// 		this.close(UI.HIDE_TO_TOP);
		// 	}).catch(reason => { });
		// }
	}

	//拉取杂项信息
	private MixInfo() {
		Game.PlayerDoubleBallSystem.GetLotteryFruitInfoReqBody_Visit().then((data: message.GetLotteryFruitInfoResponse) => {
			this.SetScorePer();
		}).catch(() => { })
	}

	public dealFightUi() {

	}
	}
}
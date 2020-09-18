namespace zj {
	/**
	 * @class 贪婪之岛 寿富拉比进入战场UI
	 * 
	 * @author Lian Lei
	 * 
	 * 2019.06.17
	 */
	const _freshRank = 5;

	export class Zork_Boss extends Dialog {
		private groupResource: eui.Group;
		private groupAB2: eui.Group;
		private groupButton: eui.Group;
		private btnAttack: eui.Button;
		private groupAB: eui.Group;
		private groupBlood: eui.Group;
		private imgBossIcon: eui.Image;
		private imgBossBlood: eui.Image;
		private labelBlood: eui.Label;
		private groupScaleB: eui.Group;
		private groupList: eui.Group;
		private scrollerTableViewRank: eui.Scroller;
		private listTableViewRank: eui.List;
		private labelMyRank: eui.Label;
		private labelMyName: eui.Label;
		private labelMyValue: eui.Label;
		private groupRank: eui.Group;
		private btnRank: eui.Button;
		private groupPlayer: eui.Group;
		private btnPlayer: eui.Button;
		private groupMiniChat: eui.Group;
		private imgChatBack: eui.Image;
		private labelInfoList: eui.List;
		private groupChat: eui.Group;
		private btnChat: eui.Button;
		private messageHistoryChat: eui.Group;
		private simpleChat: eui.List;
		private groupDie: eui.Group;
		private labelDieTips: eui.Label;
		private groupDieCost: eui.Group;
		private labelConsume: eui.Label;
		private labelLeftTime: eui.Label;
		private groupAddDie: eui.Group;
		private btnRevive: eui.Button;
		private btnCancel: eui.Button;
		private imgDieTipsBack: eui.Image;
		private groupLeftTime: eui.Group;
		private labelStartTime: eui.BitmapLabel;
		private groupMid: eui.Group;
		private groupGo: eui.Group;
		private lbGemstone: eui.Label;
		private btnAddGemstone: eui.Button;
		private imgFlagGemstone: eui.Image;
		private btnClose: eui.Button;

		private scene: any;
		private tagMainMenu: string;
		private tokenBefore: number;
		private plantBefore: number;
		private listPop: boolean;
		private bossState: number;
		private _rank: Array<any> = [];
		private curBoss: any;
		private bossBlood: number;
		private bossBloodPre: number;
		private bloodBarWidth: number;
		private bloodBarHeight: number;
		private barSize: Array<number>;
		private selfHp: number;
		private wonderlandChatList: Array<any> = [];
		private timer1: number;
		private timer2: number;
		private listTableViewRankData: eui.ArrayCollection = new eui.ArrayCollection();
		private labelInfoListDate: eui.ArrayCollection = new eui.ArrayCollection();
		private labelInfoDate: eui.ArrayCollection = new eui.ArrayCollection();
		private time_meter: number;
		private time_id: number;
		private bHidePerson: boolean;
		private time;
		public chatInfosMini = Game.PlayerChatDataSystem.chatInfosMini;
		private timer: number;

		public constructor() {
			super();
			this.skinName = "resource/skins/zork/Zork_BossSkin.exml";
			this.timer1 = egret.setInterval(this.Update, this, 990);
			this.timer2 = egret.setInterval(this.UpdateRank, this, _freshRank * 100);
			this.btnChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.AddChatMini, this);
			this.groupRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRank, this);
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnReturn, this);
			this.btnAttack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAttack, this);
			this.groupPlayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPlayer, this);
			this.btnRevive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRevive, this);
			this.messageHistoryChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.AddChatMini, this);
			this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);

			this.timer = egret.setInterval(this.update, this, 1000);

			//Game.EventManager.on(GameEvent.COMBAT_CHAT, this.combatChat, this);

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
			this.tagMainMenu = "ZorkBossMenu"; // 标记为主菜单UI

			this.groupAB.scaleX = Device.scaleFactor;
			this.groupAB.scaleY = Device.scaleFactor;
			this.groupScaleB.scaleX = Device.scaleFactor;
			this.groupScaleB.scaleY = Device.scaleFactor;
			this.groupAB2.scaleX = Device.scaleFactor;
			this.groupAB2.scaleY = Device.scaleFactor;
			this.groupBlood.visible = false;
			this.groupButton.visible = false;

			// TipManager.ShowResourcesInfo(this.groupResource, this, [2], null, null);

			this.tokenBefore = -1;  // 元宝数
			this.plantBefore = -1;  // 金币数
			this.listPop = true;    // 伤害排行弹出
			this.bossState = 0;     // 打boss阶段
			this._rank = [];        // 排行

			this.curBoss = this.scene.getLiveBoss();
			this.bossBlood = this.curBoss.getMaxHp(); // boss总血量
			this.bossBloodPre = -1; // 临时血量
			this.bloodBarWidth = this.imgBossBlood.width;
			this.bloodBarHeight = this.imgBossBlood.height;
			this.barSize = [this.imgBossBlood.height, this.imgBossBlood.width];
			this.selfHp = 0;

			this.labelMyRank.visible = true;
			this.labelMyRank.text = "99+";
			// this.SpriteMyRank:setVisible(false)
			this.labelMyValue.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.perDemage, Set.numberUnit4(0), 0);

			Game.EventManager.on(GameEvent.SERVER_NOTICE_CHAT_MESSAGE, this.LoadListZorkBossChat, this);

			this.labelMyName.text = Game.PlayerInfoSystem.BaseInfo.name;

			this.wonderlandChatList = [];

			this.SetInfo()
			this.Update()
			this.UpdateRank()

			//this.LoadListZorkBossChat();
			//this.AddChatMini();

			egret.setTimeout(this.onClose1, this, 10000);
		}

		public onClose1() {
			this.labelInfoDate.removeAll();
			this.messageHistoryChat.visible = false;
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

		public SetInfo() {
			this.btnCancel.visible = false;
			let icon_id = Game.PlayerZorkSystem.zorkBoss.bossInfo.monster_roleId != null ? Game.PlayerZorkSystem.zorkBoss.bossInfo.monster_roleId : 27;
			this.imgBossIcon.source = cachekey(TableMapRole.Item(icon_id).head_path, this);
			let cur = this.curBoss.getCurHp();
			let max = this.curBoss.getMaxHp();
			this.labelBlood.text = (Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.lastPerBlood, (cur * 100 / max).toFixed(2)));
		}

		public Update() {
			this.UpdateUI();
			this.UpdateBossBlood();
			Game.PlayerZorkSystem.bossInfo().then(() => { });
		}

		public UpdateUI() {
			let time: number = 0;
			let progress = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS];

			if (progress != null) {
				if (this.bossState != progress.info) {
					this.bossState = progress.info
				}
			}

			if (this.scene.prepareTime <= 0) {
				time = progress.leftTime;
				if (this.groupBlood.visible == false) {
					this.groupBlood.visible = true;
				}
				if (this.groupButton.visible == false) {
					this.groupButton.visible = true;
				}
			}
			else {
				time = this.scene.prepareTime / 1000;
				if (this.groupBlood.visible == true) {
					this.groupBlood.visible = false;
				}
				if (this.groupButton.visible == true) {
					this.groupButton.visible = false;
				}
			}
			this.labelStartTime.text = Helper.GetTimeStr1(time);
		}

		public UpdateRank() {
			if (Gmgr.Instance.bDisconnectNet == true || Game.PlayerZorkSystem.zorkBoss.isZorkBossEnd == true) return;
			if (Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS].info != 0) {
				Game.PlayerZorkSystem.bossRank()
					.then((value: any) => {
						this.BossRankReqBody_Visit();
					})
					.catch((reason) => {
						// toast_warning(reason);
					});
			}
		}

		public BossRankReqBody_Visit() {
			let display_num = 10;
			this._rank = Game.PlayerZorkSystem.zorkBoss.rankItems;
			let _rank = this._rank;
			if (this.listPop) {
				display_num = _rank.length >= display_num ? display_num : _rank.length;
				this.listTableViewRankData.removeAll();
				for (let i = 0; i < display_num; i++) {
					let itemData = new Zork_BossItemData();
					itemData.info = _rank[i];
					itemData.blood = this.bossBlood;
					this.listTableViewRankData.addItem(itemData);
				}
				this.listTableViewRank.dataProvider = this.listTableViewRankData;
				this.listTableViewRank.itemRenderer = Zork_BossItem;
			}

			this.UpdateMyRank();
		}

		public UpdateMyRank() {
			let rank = 0;
			if (Game.PlayerZorkSystem.zorkBoss.myRank == 0) {
				this.labelMyRank.text = CommonConfig.scene_boss_hurt_rank_number + "+"
			}
			else {
				this.labelMyRank.text = Game.PlayerZorkSystem.zorkBoss.myRank.toString();
			}
			this.labelMyValue.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.perDemage,
				Number(Set.numberUnit4(Game.PlayerZorkSystem.zork.roleInfo.bossHurt)).toFixed(2),
				(Game.PlayerZorkSystem.zork.roleInfo.bossHurt / this.bossBlood * 100).toFixed(2));

			for (let [k, v] of HelpUtil.GetKV(this._rank)) {
				if (Game.PlayerInfoSystem.BaseInfo.id == v.baseInfo.id) {
					let rank = v.rank;
					let persent = v.value / this.bossBlood * 100;
					this.labelMyRank.text = rank;
					this.labelMyValue.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.perDemage, Set.numberUnit4(v.value), persent.toFixed(2));
				}
			}
		}

		public refreshRank() {

		}

		/**进入聊天(点击聊天按钮) */
		public AddChatMini() {
			loadUI(Chat_Main)
				.then((dialog: Chat_Main) => {
					dialog.show();
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
			this.labelInfoList.itemRenderer = Chat_HarmBoss;

			//egret.Tween.get(this.imgChatBack).wait(100).to({ alpha: 0 });

			egret.Tween.get(this.imgChatBack).wait(100).to({ alpha: 0 })
				.call(() => {
					this.groupMiniChat.visible = false;
				});
		}

		public SetDieTime(time: number) {
			this.groupDie.visible = true;
			this.time_meter = this.scene.playerLeader.dieProtectTime;
			this.labelLeftTime.text = Math.floor(this.time_meter / 1000).toString();
			// egret.clearInterval(this.time_id);
			// this.time_id = egret.setInterval(this.OnthisTimeKeeper, this, 330);
			this.labelConsume.text = CommonConfig.scene_clear_dead_cooling_consume[this.scene.sceneType].toString();
			egret.setTimeout(this.OnthisTimeKeeper, this, 30);
		}

		public OnthisTimeKeeper() {
			// if (this.time_id == -1) return;
			if (!this.scene || !this.scene.playerLeader) return;
			this.time_meter = this.scene.playerLeader.dieProtectTime;
			let _posState = this.scene.playerLeader.posState;
			let realTime = Math.floor(this.time_meter / 1000);
			if (realTime >= 0 && this.scene.playerLeader.otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
				this.labelLeftTime.text = realTime.toString();
			}
			else {
				// egret.clearInterval(this.time_id);
				this.groupDie.visible = false;
				this.time_id = -1;
			}
		}

		public RefreshRes() {
			// this.SetInfoUser();
		}

		private rect;
		private barX = 172 + 339;
		public UpdateBossBlood() {
			if (this.curBoss == null) return;
			let cur = this.curBoss.getCurHp();
			let max = this.curBoss.getMaxHp();

			if (cur != this.bossBloodPre) {
				this.bossBloodPre = cur;
				let w = this.bloodBarWidth * (cur / max)
				if (!this.rect) {
					this.rect = Util.getMaskImgBlack(339, 22);
					this.groupBlood.addChild(this.rect);
					this.imgBossBlood.mask = this.rect;
					this.rect.y = 9.5;
				}
				this.rect.x = this.barX - 339 * (cur / max);

				this.labelBlood.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.lastPerBlood, (cur * 100 / max).toFixed(2));
			}
		}

		public UpdateUserBlood() {
			if (this.selfHp != this.scene.playerLeader.uiHp) {
				this.selfHp = this.scene.playerLeader.uiHp;
				let size_bar = getPercentSize(this.barSize, this.selfHp / 100)
				// this.BarHeroBlood.width = size_bar.width;
				// this.BarHeroBlood.height = size_bar.height;
			}
		}

		/**Boss出现龙骨动画 */
		public BossAppearUi() {
			Game.DragonBonesManager.playAnimation(this, "tlzd_boss_chuxian", "armatureName", null, 0)
				.then(display => {
					display.x = this.groupMid.explicitWidth / 2;
					display.y = this.groupMid.explicitHeight / 2;
					display.name = "boss_chuxian"
					this.groupMid.addChild(display);
					display.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, () => {
						let ani = this.groupMid.getChildByName("boss_chuxian");
						if (ani != null) this.groupMid.removeChild(ani);
					}, this);
				})
				.catch(reason => {

				});
		}

		public onBtnReturn() {
			TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Wonderland.return_tip, () => {
				Game.PlayerZorkSystem.closeZorkBoss(this.closeFinish, this);
			});
		}

		public closeFinish() {
			SceneManager.initType = 3;
			SceneManager.instance.EnterSceneZorkBoss();
		}

		public onBtnAddGemstone() {
			loadUI(PayMallScene)
				.then((scene: PayMallScene) => {
					scene.show(UI.SHOW_FROM_TOP);
					scene.init(true);
				});
		}

		/**立即复活 */
		public onBtnRevive() {
			let cb = () => {
				this.time_id = -1;
				egret.clearInterval(this.time_id);
				this.groupDie.visible = false;
			}

			this.scene.revivePersonReq(cb);
		}

		/**屏蔽玩家按钮 */
		public onBtnPlayer() {
			if (this.scene.bHidePerson == false) {
				this.btnPlayer.enabled = true;
				// Set.ButtonBackgroud(this.btnPlayer,cachekey("ui_wonderland_boss_ButtonTopClosePlayerSel_png",this),cachekey("ui_wonderland_boss_ButtonTopClosePlayerSel_png",this),cachekey("ui_wonderland_boss_ButtonTopClosePlayerSel_png",this));
				this.scene.hidePerson(true);
			}
			else {
				this.bHidePerson = false;
				this.btnPlayer.enabled = false;
				// Set.ButtonBackgroud(this.btnPlayer,cachekey("ui_wonderland_boss_ButtonTopClosePlayerNor_png",this),cachekey("ui_wonderland_boss_ButtonTopClosePlayerSel_png",this),cachekey("ui_wonderland_boss_ButtonTopClosePlayerNor_png",this));
				this.scene.hidePerson(false);
			}
		}

		/**伤害排行按钮 */
		public onBtnRank() {
			this.btnRank.enabled = false;

			egret.Tween.removeTweens(this.groupList);
			if (this.listPop) {
				egret.Tween.get(this.groupList)
					.to({ y: -138 }, 500, egret.Ease.backIn)
					.call(() => {
						this.btnRank.enabled = true;
						this.listPop = !this.listPop
						if (this.listPop) {
							this.UpdateRank();
						}
					});
			}
			else {
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

		/**挑战按钮 */
		public onBtnAttack() {
			if (this.scene.prepareTime > 0) {
				toast_warning(TextsConfig.TextsConfig_WonderlandBoss.not_start);
				return;
			}

			if (this.scene.playerLeader.otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
				toast_warning(TextsConfig.TextsConfig_Wonderland.die_error_tips);
				return;
			}

			this.scene.dealFight();
		}
		public close() {
			super.close();
			egret.Tween.removeTweens(this.imgChatBack);
			this.scene = null;
			this.curBoss = null;
			egret.clearInterval(this.timer1);
			egret.clearInterval(this.timer2);
			egret.clearInterval(this.time_id);
			egret.clearInterval(this.time);
		}

		public dealFightUi() {

		}

		private update() {
			if (Game.PlayerInfoSystem.Token > 100000) {
				if (((Game.PlayerInfoSystem.Token / 1000) >>> 0) % 10 == 0) {
					this.lbGemstone.text = ((Game.PlayerInfoSystem.Token / 10000) >>> 0) + "万";
				} else {
					this.lbGemstone.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
				}
			} else {
				this.lbGemstone.text = Game.PlayerInfoSystem.Token.toString();
			}
		}
	}
}
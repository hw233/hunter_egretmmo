namespace zj {

	export class Fight_RoleMsg extends UI {
		public LayerTopLeft: eui.Group;
		public SpriteBoard: eui.Image;
		public ButtonPause: eui.Button;
		public SpriteClock: eui.Image;
		public ButtonBuffShow: eui.Button;
		public NodeRelic: eui.Group;
		public ButtonChestBox1: eui.Button;
		public ButtonChestBox2: eui.Button;
		public ButtonChestBox3: eui.Button;
		public ButtonChestBox4: eui.Button;
		public ButtonChestBox5: eui.Button;
		public chat: eui.Group;
		public NodeHave: eui.Group;
		public SpriteChatClip: eui.Image;
		public ButtonClickLeft: eui.Button;
		public LabelInfo: eui.Label;
		public ButtonClickRight: eui.Button;
		public ButtonSend: eui.Button;
		public LayerBattleMain: eui.Group;
		public handBox: eui.Group;
		public SpriteBoardLeft: eui.Image;
		public SpriteHeadLeft: eui.Image;
		public NodeSupportLeft: eui.Group;
		public SpriteSupportHeadLeft: eui.Image;
		public SpriteSupportMaskLeft: eui.Image;
		public SpriteBarAngryLeft: eui.Image;
		public SpriteBoardMid: eui.Image;
		public SpriteHeadMid: eui.Image;
		public NodeSupportMid: eui.Group;
		public SpriteBoardMid1: eui.Image;
		public SpriteSupportHeadMid: eui.Image;
		public SpriteBarAngryMid: eui.Image;
		public SpriteBoardRight: eui.Image;
		public SpriteHeadRight: eui.Image;
		public NodeSupportRight: eui.Group;
		public SpriteBoardRight1: eui.Image;
		public SpriteSupportHeadRight: eui.Image;
		public SpriteBarAngryRight: eui.Image;
		public SpriteBoardRightR: eui.Image;
		public SpriteHeadRightR: eui.Image;
		public NodeSupportRightR: eui.Group;
		public SpriteBoardRightR1: eui.Image;
		public SpriteSupportHeadRightR: eui.Image;
		public SpriteBarAngryRightR: eui.Image;
		public BarAngryNodeRightR: eui.Group;
		public BarAngryNodeRight: eui.Group;
		public BarAngryNodeMid: eui.Group;
		public BarAngryNodeLeft: eui.Group;
		public BarCdNodeMid: eui.Group;
		public SpriteOrnSkillMid: eui.Image;
		public SpriteCdTipMid: eui.Image;
		public LabelCdMid: eui.BitmapLabel;
		public BarCdNodeLeft: eui.Group;
		public SpriteOrnSkillLeft: eui.Image;
		public SpriteCdTipLeft: eui.Image;
		public LabelCdLeft: eui.BitmapLabel;
		public BarCdNodeRight: eui.Group;
		public SpriteOrnSkillRight: eui.Image;
		public SpriteCdTipRight: eui.Image;
		public LabelCdRight: eui.BitmapLabel;
		public BarCdNodeRightR: eui.Group;
		public SpriteOrnSkillRightR: eui.Image;
		public SpriteCdTipRightR: eui.Image;
		public LabelCdRightR: eui.BitmapLabel;
		public NodeTouchMid: eui.Group;
		public NodeTouchLeft: eui.Group;
		public NodeTouchRight: eui.Group;
		public NodeTouchRightR: eui.Group;
		public LayerAuto: eui.Group;
		public ButtonSpeed: eui.Button;
		public NodeSpeedAni: eui.Group;
		public ButtonAuto: eui.Button;
		public NodeAutoAni: eui.Group;
		public SpriteIconLock: eui.Image;
		public SpriteBoardOpen: eui.Image;
		public LabelSuccessionBattleNum: eui.BitmapLabel;
		public LabelBattleTime: eui.Label;

		public groupYH: eui.Group;
		public SpriteSupport: eui.Image;
		public SpriteBarAngry: eui.Image;
		public SpriteBarAngryMask: eui.Image;
		// public SpriteBarAni;

		public tableRoleYH: StagePersonLocalHelp;// 援护对象

		public scene;
		public tableRoles;
		public tableKey = [];
		public tableRageProgress;
		public tableCdTip;
		public tableTeachRage;
		public tableTeach;
		public tableTeachAngry;
		public tableCdProgress = [];
		public tableCdLabel;
		public tableHpValue;
		public tableRageValue;
		public tableCdValue;
		public tableDeadSprite;
		public tableHunterDeadAni;
		public tableHunterCdAni;
		public tableHunterSupportAni;
		public tableHeadGLState;
		public selIndex;
		public location: egret.Point;
		public load_id;
		public load_step;
		public speedMax;
		public speedActioning;
		public chatClickPop;
		public nodeChatClip;
		public LabelChat;
		public ChatClipWidth;
		public LabelChatWidth;
		public bHideLabel;
		public nChatTick;
		public bChatActioning;
		public tableRageAni;
		public tableTouch = [];
		public tableBoard;
		public tableHead = [];
		public tableHeadNode;
		public tableCdNode;
		public tableRagePos = [];
		public tableCdPos = [];
		public tableRageTouch = [];
		public tableRageNode = [];
		public tableCdBoard;
		public tableSupportNode;
		public tableSupportHead;
		// public tableSupportLight = [];
		// public tableSupportMask = [];
		public tableNodeCdAni = [];
		public tableNodeSupportAni = [];
		public speedAni;
		public autoAni;
		public _buffUI;
		public constructor() {
			super();
			this.skinName = "resource/skins/fight/FightRoleMsgSkin.exml";
			this.scene = StageSceneManager.Instance.GetCurScene();
			this.tableRoles = this.scene.getAllys();
			this.tableKey = this.scene.tablePosKey;
			this.tableRoleYH = this.scene.tableRoleYH;
			this.tableRageProgress = [];
			this.tableCdTip = {};
			this.tableTeachRage = {};
			this.tableTeach = {};
			this.tableTeachAngry = {};

			this.tableCdProgress = [];
			this.tableCdLabel = [];

			this.tableHpValue = {};
			this.tableRageValue = {};
			this.tableCdValue = {};

			this.tableDeadSprite = [];

			this.tableHunterDeadAni = [];
			this.tableHunterCdAni = [];
			this.tableHunterSupportAni = [];

			this.tableHeadGLState = {};
			this.selIndex = -1;
			this.location = new egret.Point(0, 0);
			this.load_id = -1
			this.load_step = 0;
			if (Gmgr.Instance.fightType == TableEnum.TableEnumFightType.FIGHT_TYPE_REPLAY || Gmgr.Instance.fightType == TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH) {
				this.speedMax = 3;
			} else {
				this.speedMax = Helper.getSpeedMaxIndex(Game.PlayerInfoSystem.BaseInfo.level);
			}
			this.speedActioning = false;
			this.chatClickPop = false;
			this.nodeChatClip = null;
			this.LabelChat = null;
			this.ChatClipWidth = 0;
			this.LabelChatWidth = 0;
			this.bHideLabel = false;
			this.nChatTick = 0;
			this.bChatActioning = false;
			this.NodeAutoAni.touchEnabled = true;
			this.NodeAutoAni.touchChildren = false;
			this.NodeSpeedAni.touchEnabled = true;
			this.NodeSpeedAni.touchChildren = false;
			Gmgr.Instance.bakeSpeedIndex = Gmgr.Instance.backupSpeedTbl[Gmgr.Instance.fightType];
		}
		public OnExit() {
			this.tableTouch = [];
			this.tableBoard = {}

			this.tableHead = []
			this.tableHeadNode = []

			this.tableCdNode = []

			this.tableRagePos = [];
			this.tableCdPos = []

			this.tableCdLabel = []

			this.tableRageTouch = [];


			this.tableRageProgress = [];

			this.tableCdTip = {}
			this.tableTeachRage = {}
			this.tableTeach = {}
			this.tableTeachAngry = {}

			this.tableCdProgress = [];


			this.tableHpValue = {}
			this.tableRageValue = {}
			this.tableCdValue = {}

			this.tableRageAni = {}

			this.tableDeadSprite = {}


			this.clearAni(this.tableHunterDeadAni);
			this.clearAni(this.tableHunterCdAni);
			this.clearAni(this.tableHunterSupportAni);

			this.tableHunterDeadAni = {};
			this.tableHunterCdAni = {};
			this.tableHunterDeadAni = {};
			egret.clearInterval(this.update);
			this.update = -1;
			egret.clearInterval(this.load_id);
			this.load_id = -1;
			this.scene = null;
			this.tableRoles = null;
			this.tableKey = null;
			if (this.speedAni) {
				this.speedAni.clearSpine();
				this.speedAni = null;
			}
			if (this.autoAni) {
				this.autoAni.clearSpine();
				this.autoAni = null;
			}

		}
		public clearAni(tbl) {
			for (let k in tbl) {
				let v = tbl[k];
				v.spx.clearSpine();
				v = null;
			}
			tbl = {};
		}
		public _buffShow;
		public _buffAniRun;
		//初始化ui

		public Init() {
			// this.visible=false;
			// this.handBox.cacheAsBitmap = true;
			// this.chat.cacheAsBitmap = true;
			// this.LayerTopLeft.cacheAsBitmap = true;
			this.ButtonPause.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonPause_CallBack, this);
			this.ButtonBuffShow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonBuffShow_CallBack, this);
			this.NodeAutoAni.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonAuto_CallBack, this);
			this.NodeSpeedAni.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonSpeed_CallBack, this);

			this.ButtonClickLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonClickLeft_CallBack, this);
			//this.ButtonClickRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonClickRight_CallBack, this);
			this.ButtonSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonSend_CallBack, this);

			Game.EventManager.on(GameEvent.COMBAT_CHAT, this.combatChat, this);
			this.tableTouch = [this.NodeTouchRightR, this.NodeTouchRight, this.NodeTouchMid, this.NodeTouchLeft]
			this.tableBoard = [this.SpriteBoardRightR, this.SpriteBoardRight, this.SpriteBoardMid, this.SpriteBoardLeft]

			this.tableHead = [this.SpriteHeadRightR, this.SpriteHeadRight, this.SpriteHeadMid, this.SpriteHeadLeft]

			// 战斗频死时的动画
			this.tableHeadNode = [this.NodeTouchRightR, this.NodeTouchRight, this.NodeTouchMid, this.NodeTouchLeft]

			this.tableRageNode = [this.BarAngryNodeRightR, this.BarAngryNodeRight, this.BarAngryNodeMid, this.BarAngryNodeLeft]

			this.tableCdNode = [this.BarCdNodeRightR, this.BarCdNodeRight, this.BarCdNodeMid, this.BarCdNodeLeft]

			this.tableRagePos = [this.SpriteBarAngryRightR, this.SpriteBarAngryRight, this.SpriteBarAngryMid, this.SpriteBarAngryLeft]

			this.tableCdPos = [this.SpriteCdTipRightR, this.SpriteCdTipRight, this.SpriteCdTipMid, this.SpriteCdTipLeft]

			this.tableCdBoard = [this.SpriteOrnSkillRightR, this.SpriteOrnSkillRight, this.SpriteOrnSkillMid, this.SpriteOrnSkillLeft]
			this.tableCdLabel = [this.LabelCdRightR, this.LabelCdRight, this.LabelCdMid, this.LabelCdLeft]

			// this.tableRageTouch = [this.RageTouchRightR, this.RageTouchRight, this.RageTouchMid, this.RageTouchLeft]

			this.tableSupportNode = [this.NodeSupportRightR, this.NodeSupportRight, this.NodeSupportMid, this.NodeSupportLeft]
			this.tableRageTouch = this.tableSupportNode;
			this.tableSupportHead = [this.SpriteSupportHeadRightR, this.SpriteSupportHeadRight, this.SpriteSupportHeadMid, this.SpriteSupportHeadLeft]
			// this.tableSupportLight = [this.SpriteSupportLIghtRightR, this.SpriteSupportLIghtRight, this.SpriteSupportLIghtMid, this.SpriteSupportLIghtLeft]
			// this.tableSupportMask = [this.SpriteSupportMaskRightR, this.SpriteSupportMaskRight, this.SpriteSupportMaskMid, this.SpriteSupportMaskLeft]

			// this.tableNodeCdAni = [this.NodeCdAniRightR, this.NodeCdAniRight, this.NodeCdAniMid, this.NodeCdAniLeft]
			this.tableNodeCdAni = [this.NodeTouchRightR, this.NodeTouchRight, this.NodeTouchMid, this.NodeTouchLeft]
			// this.tableNodeSupportAni = [this.NodeSupportAniRightR, this.NodeSupportAniRight, this.NodeSupportAniMid, this.NodeSupportAniLeft];
			this.tableNodeSupportAni = [this.BarAngryNodeRightR, this.BarAngryNodeRight, this.BarAngryNodeMid, this.BarAngryNodeLeft];
			this._buffShow = false;
			this._buffAniRun = false;

			if (this.tableRoleYH) {
				// this.tableRageNode.push(this.groupYH);
				// this.tableRagePos.push(this.SpriteBarAngry);
				this.groupYH.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonYH, this);
			} else {
				this.groupYH.visible = false;
			}

			// if (this.scene.bLockKey == false) {
			//this.EnableTouchEvent();
			// }
			this.ClearUi();
			this.loadBase();
			this.InitSupport();
			this.InitPause();
			this.update = egret.setInterval(this.Update, this, 0);


			//this.LoadChat();
			this.ButtonClickLeft_CallBack();
			this.doLoad();
			// Game.EventManager.on(GameEvent.SERVER_NOTICE_CHAT_MESSAGE,ChatMessageNotice_Visit,this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegan, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnded, this);
		}
		private update;
		public doLoad() {
			this.load_id = egret.setInterval(this.doLoadStep, this, 250);
		}
		public doLoadStep() {
			if (this.load_step == -1) {
				return;
			}
			this.load_step++;
			if (this.load_step == 1) {
				this.InitAni();
			} else if (this.load_step == 2) {
				this.InitHead();
			} else if (this.load_step == 3) {
				this.LoadAutoAni()
				this.InitAuto()
				this.loadSpeed()
			} else if (this.load_step == 4) {
				egret.clearInterval(this.load_id);
				this.load_step = -1;
			}
		}
		public loadSpeed() {

		}
		public loadBase() {
			//计时
			this.scene.battleTime = this.scene.stageMaxTime;
			this.scene.bTimingOn = true;

			for (let i = 0; i < this.tableHead.length; i++) {
				let role = this.tableRoles[this.tableKey[i]];
				this.tableHead[i].width = 95;
				this.tableHead[i].height = 93;
				if (role != null) {
					this.tableHead[i].visible = true;
					if (Device.isReviewSwitch && Util.isWxMiniGame()) {
						this.tableHead[i].source = cachekey("wx_" + role.battleHead, this);
					} else {
						this.tableHead[i].source = cachekey(role.battleHead, this);
					}
					//self.tableHeadGLState[role.roleId] = set.GetGLState( self.tableHead[i] )
				} else {
					let generalId = this.scene.tableTimelyPos[i];
					if (generalId != null) {
						this.tableHead[i].visible = true;
						if (Device.isReviewSwitch && Util.isWxMiniGame()) {
							this.tableHead[i].source = cachekey("wx_" + fromGeneral(PlayerHunterSystem.GetGeneralId(generalId)).battle_head, this);
						} else {
							this.tableHead[i].source = cachekey(fromGeneral(PlayerHunterSystem.GetGeneralId(generalId)).battle_head, this);
						}

						// self.tableHeadGLState[generalId] = set.GetGLState( self.tableHead[i] )
						Helper.SetImageFilterColor(this.tableHead[i], "gray");
					}
				}
			}
			for (let i = 0; i < this.tableCdPos.length; i++) {
				let role = this.tableRoles[this.tableKey[i]];
				if (role != null) {
					this.tableCdTip[role.roleId] = this.tableCdPos[i]
					this.tableTeachRage[role.roleId] = this.tableRageTouch[i]
					this.tableTeach[role.roleId] = this.tableBoard[i]
					this.tableTeachAngry[role.roleId] = this.tableRagePos[i]
				}
			}
			for (let i = 0; i < this.tableRagePos.length; i++) {
				let x = this.tableRagePos[i].x;
				let y = this.tableRagePos[i].y;
				this.tableRageNode[i].x = x;
				this.tableRageNode[i].y = y;
				this.tableRagePos[i].visible = false;
			}
			this.SpriteBarAngry.visible = false;
			for (let i = 0; i < this.tableCdPos.length; i++) {
				let x = this.tableCdPos[i].x;
				let y = this.tableCdPos[i].y;
				this.tableCdPos[i].x = x;
				this.tableCdPos[i].y = y;
				this.tableCdPos[i].visible = false;
			}
			for (let i = 0; i < this.tableHead.length; i++) {
				let x = this.tableHead[i].x;
				let y = this.tableHead[i].y;
				this.tableHead[i].x = x;
				this.tableHead[i].y = y;
			}
			// for (let i = 0; i < this.tableSupportLight.length; i++) {
			// 	this.tableSupportLight[i].visible = false;
			// }
			// for (let i = 0; i < this.tableSupportMask.length; i++) {
			// 	this.tableSupportMask[i].visible = false;
			// }
			if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK
				|| Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_THIRD
				|| Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_GROUP_FIGHT
			) {
				let len = this.scene.curFormation.generals.length;
				let diff = 4 - len;
				if (diff > 0) {
					// for (let i = 0; i < diff; i++) {
					// 	this.tableLayers[i].visible = false;
					// }
				}
			}
		}
		public ClearUi() {
			this.LayerAuto.visible = false;
			this.NodeRelic.visible = false;
			for (let i = 0; i < this.tableHead.length; i++) {
				this.tableHead[i].visible = false;
			}
			for (let i = 0; i < this.tableRageNode.length; i++) {
				this.tableRageNode[i].visible = false;
			}
			for (let i = 0; i < this.tableCdNode.length; i++) {
				this.tableCdNode[i].visible = false;
			}
			for (let i = 0; i < this.tableCdLabel.length; i++) {
				this.tableCdLabel[i].visible = false;
			}
		}
		public checkAndOpenAni(tbl, index, playOrnIndex) {
			if (!tbl[index].spx.spine.visible) {
				tbl[index].spx.setVisibleSpx(true);
				tbl[index].spx.stopAllActions();
				tbl[index].index = playOrnIndex;
				tbl[index].spx.ChangeAction(playOrnIndex);
			}
		}
		public checkAndCloseAni(tbl, index) {
			if (tbl[index].spx.spine.visible) {
				tbl[index].spx.stopAllActions();
				tbl[index].spx.setVisibleSpx(false);
			}
		}
		private createSpxInfo(name, tblAni, pos, playOrnIndex, playNextIndex) {
			let info = { spx: null, index: null };
			info.index = playOrnIndex;

			function animationEvent(e: dragonBones.AnimationEvent) {
				if (tblAni[pos].index == playOrnIndex) {
					tblAni[pos].index = playNextIndex;
					let spine: dragonBones.EgretArmatureDisplay = e.currentTarget;
					this.actionId = playNextIndex;
					let names = spine.armature._armatureData.animationNames;
					for (let i = 0; i < names.length; i++) {
						if (this.actionId == i) {
							this.spineState = spine.animation.play(names[i], 0);
							break;
						}
					}
				}
			}
			let [spx,] = HunterSpineX(1, 1, null, TableClientAniSpxSource.Item(name).name);
			info.spx = spx;
			spx.setVisibleSpx(false)
			spx.stopAllActions();
			spx.ChangeAction(info.index);
			spx.spine.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, animationEvent, this);
			return info;
		}
		public LoadAutoAni() {
			let [body,] = HunterSpineX(1011, 1, null, TableClientAniSpxSource.Item(1011).name);
			body.stopAllActions();
			body.ChangeAction(3);
			this.NodeSpeedAni.addChild(body.spine);
			body.spine.x = this.NodeSpeedAni.width / 2;
			body.spine.y = this.NodeSpeedAni.height / 2;
			this.speedAni = body;

			let [body1,] = HunterSpineX(1011, 1, null, TableClientAniSpxSource.Item(1011).name);
			body1.stopAllActions();
			body1.ChangeAction(0);
			this.NodeAutoAni.addChild(body1.spine);
			body1.spine.x = this.NodeAutoAni.width / 2;
			body1.spine.y = this.NodeAutoAni.height / 2;
			this.autoAni = body1;

			Game.EventManager.event(GameEvent.GET_MOUDLE_SIZE, { isGetSize: true });
		}
		public InitAni() {
			let name = 1004;
			for (let i = 0; i < this.tableNodeCdAni.length; i++) {
				let key = this.tableKey[i];
				if (key == null) {
					continue;
				}
				let role = this.tableRoles[key];
				if (role == null) {
					continue;
				}
				let info = this.createSpxInfo(name, this.tableHunterCdAni, role.eTeamNum + 1, UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.cd_index, UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.cd_index + 1);
				let box: eui.Group = this.tableNodeCdAni[i];
				box.addChild(info.spx.spine);
				info.spx.spine.x = box.width / 2;
				info.spx.spine.y = box.height / 2;
				this.tableHunterCdAni[role.eTeamNum + 1] = info;
			}

			for (let i = 0; i < this.tableNodeSupportAni.length; i++) {
				let key = this.tableKey[i];
				if (key == null) {
					continue;
				}
				let role = this.tableRoles[key];
				if (role == null) {
					continue;
				}
				let info = this.createSpxInfo(name, this.tableHunterSupportAni, role.eTeamNum + 1, UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.support_index, UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.support_index + 1);
				this.tableNodeSupportAni[i].addChild(info.spx.spine);
				info.spx.spine.x = this.tableNodeSupportAni[i].width / 2;
				info.spx.spine.y = this.tableNodeSupportAni[i].height / 2;
				this.tableHunterSupportAni[role.eTeamNum + 1] = info;
			}

			let i = FightHelper.FIGHT_ASSISTANCE_IDX;
			let info = this.createSpxInfo(name, this.tableHunterSupportAni, i, UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.support_index, UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.support_index + 1);
			this.groupYH.addChild(info.spx.spine);
			info.spx.spine.x = this.groupYH.width / 2;
			info.spx.spine.y = this.groupYH.height / 2;
			this.tableHunterSupportAni[i] = info;

			for (let i = 0; i < this.tableHeadNode.length; i++) {
				let key = this.tableKey[i];
				if (key == null) {
					continue;
				}
				let role = this.tableRoles[key];
				if (role == null) {
					continue;
				}
				this.tableHpValue[key] = 0;
				let info = this.createSpxInfo(name, this.tableHunterDeadAni, role.eTeamNum + 1, UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.hp_index, UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.hp_index + 1);
				this.tableHeadNode[i].addChild(info.spx.spine);
				info.spx.spine.x = this.tableHeadNode[i].width / 2;
				info.spx.spine.y = this.tableHeadNode[i].height / 2;
				this.tableHunterDeadAni[role.eTeamNum + 1] = info;
			}
		}
		public InitSupport() {
			let generals = this.scene.curFormation.generals;
			let supports = this.scene.curFormation.supports;
			for (let i = 0; i < this.tableHeadNode.length; i++) {
				let general = null;
				let general_id = this.tableKey[i];
				if (general_id != null) {
					general = this.tableRoles[general_id];
				}
				let support = null;
				let support_id = this.scene.tableAllySptKey[i];
				if (support_id != null) {
					support = this.scene.tableAllySupports[support_id];
				}
				if (support == null) {
					if (general != null) {
						this.tableSupportNode[i].visible = true;
						this.tableSupportHead[i].visible = false;
					} else {
						this.tableSupportNode[i].visible = false;
					}
				} else {
					if (Device.isReviewSwitch && Util.isWxMiniGame()) {
						this.tableSupportHead[i].source = cachekey("wx_" + support.supportHead, this);
					} else {
						this.tableSupportHead[i].source = cachekey(support.supportHead, this);
					}
					//this.tableHeadGLState[support.roleId] = set.GetGLState( self.tableSupportHead[i] );

					let ret = this.scene.tableTimelyPos[i];
					if (general == null && ret != null) {
						Helper.SetImageFilterColor(this.tableSupportHead[i], "gray");
					}
				}
			}
			if (this.tableRoleYH) {
				if (Device.isReviewSwitch && Util.isWxMiniGame()) {
					this.SpriteSupport.source = cachekey("wx_" + this.tableRoleYH.supportHead, this);
				} else {
					this.SpriteSupport.source = cachekey(this.tableRoleYH.supportHead, this);
				}
			}
		}
		public InitHead() {
			for (let i = 0; i < this.tableRageNode.length; i++) {
				let key = this.tableKey[i];
				if (key == null) {
					continue;
				}
				let role = this.tableRoles[key];
				if (role == null) {
					continue;
				}
				if (role.relySupportRole == null) {
					continue;
				}
				let progress: eui.Image = new eui.Image(UIConfig.UIConfig_BattleUi.roleBarAngryPng);
				let progressMask: eui.Image = Util.getMaskImgBlack(75, 68);
				progress.alpha = 0.5;
				progress.mask = progressMask;
				this.tableRageNode[i].addChild(progressMask);
				this.tableRageNode[i].addChild(progress);
				this.tableRageNode[i].visible = true;
				this.tableRageProgress[role.eTeamNum + 1] = progressMask;

				let _tmp_rage = -1;
				this.tableRageValue[key] = _tmp_rage;
			}

			if (this.tableRoleYH) {
				let progressMask: eui.Image = Util.getMaskImgBlack(75, 68);
				this.groupYH.addChild(progressMask);
				progressMask.x = this.SpriteBarAngry.x;
				progressMask.y = this.SpriteBarAngry.y;
				this.SpriteBarAngry.alpha = 0.5;
				this.SpriteBarAngry.mask = progressMask;
				this.SpriteBarAngryMask = progressMask;
				this.SpriteBarAngry.visible = true;
			}

			for (let i = 0; i < this.tableCdNode.length; i++) {
				let key = this.tableKey[i];
				if (key == null) {
					continue;
				}
				let role = this.tableRoles[key];
				if (role == null) {
					continue;
				}
				//this.tableCdProgress[role.eTeamNum+1] = "haha"
				let label = this.tableCdLabel[i];
				label.visible = false;
				this.tableCdLabel[role.eTeamNum + 1] = label;
				this.tableCdNode[i].visible = true;
			}
		}
		public Update(dt) {
			if (Gmgr.Instance.bPause) {
				return;
			}
			if (this.scene.sceneState == TableEnum.TableSceneState.SCENE_STATE_SETTLE) {
				return;
			}
			for (let k in this.tableRoles) {
				let v = this.tableRoles[k];
				if (v.bAlreadyDead) {
					continue;
				}
				this.FreshDying(v);
				this.FreshRage(v);
				this.FreshCdLabel(v);
			}
			this.FreshYH();
			this.FreshTime();
			//this.UpdateChat(dt);
		}
		public FreshYH() {
			let general = this.tableRoleYH;
			if (!general || !this.SpriteBarAngryMask) {
				return;
			}
			let percent = general.getRage() / general.getMaxRage();
			this.SpriteBarAngryMask.y = this.SpriteBarAngry.y + 68 - 68 * percent;
			let index = FightHelper.FIGHT_ASSISTANCE_IDX;
			if (percent >= 1) {
				this.SpriteBarAngryMask.y = this.SpriteBarAngry.y + 68;
				if (general.isPlaySkillUiLegeal() && !this.scene.isAllDie()) {
					this.checkAndOpenAni(this.tableHunterSupportAni, index, UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.support_index)
					Game.EventManager.event(GameEvent.SKILL_CD_OK, { isOk: true });
				} else {
					this.checkAndCloseAni(this.tableHunterSupportAni, index);
				}
			} else {
				this.checkAndCloseAni(this.tableHunterSupportAni, index);
			}
		}
		public FreshTime() {
			if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY || Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_EXP) {
				return;
			}
			if (this.LabelBattleTime) {
				this.LabelBattleTime.text = Helper.GetTimeStr1(this.scene.battleTime / 1000);
			}
		}
		public FreshRage(general) {
			if (general != null && general.relySupportRole != null) {
				if (this.tableRageValue[general.roleId] == null) {
					return;
				}
				this.tableRageValue[general.roleId] = general.getRage();
				let _max_rage = general.getMaxRage();
				let percent = general.getRage() * 100 / _max_rage;
				this.tableRageProgress[general.eTeamNum + 1].y = 68 - (68 / 100) * percent;
				let index = general.eTeamNum + 1;
				if (percent >= 100) {
					// if (this.tableSupportMask[index].visible) {
					// 	this.tableSupportMask[index].visible = false;
					// }
					this.tableRageProgress[general.eTeamNum + 1].y = 68;
					if (general.isPlaySkillUiLegeal()) {
						this.checkAndOpenAni(this.tableHunterSupportAni, index, UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.support_index)
						Game.EventManager.event(GameEvent.SKILL_CD_OK, { isOk: true });
					} else {
						this.checkAndCloseAni(this.tableHunterSupportAni, index);
					}
				} else {
					// if(!this.tableSupportMask[index].visible){
					// 	this.tableSupportMask[index].visible = true;
					// }
					this.checkAndCloseAni(this.tableHunterSupportAni, index);
				}
			}
		}
		public FreshDying(general) {
			if (general != null) {
				if (this.tableHpValue[general.roleId] == null) {
					return;
				}
				if (this.tableHpValue[general.roleId] != general.getHp()) {
					this.tableHpValue[general.roleId] = general.getHp();
				}
				let index = general.eTeamNum + 1;
				let realPercet = general.getHp() / general.getMaxHp();
				if (realPercet <= ConstantConfig_RoleBattle.DYING_SHOW_PERCENT) {
					this.checkAndOpenAni(this.tableHunterDeadAni, index, UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.hp_index)
				} else {
					this.checkAndCloseAni(this.tableHunterDeadAni, index);
				}
			}
		}
		public FreshCdLabel(general) {
			if (general != null && general.bDead == false) {
				if (this.tableHunterCdAni[general.eTeamNum + 1] == null) {
					return;
				}
				let cd = SkillCdMgr.Instance.getCurCd(general.getPressSkill());
				if (cd == null) {
					return;
				}
				let cur = cd.getTime();
				let max = cd.getMaxTime();
				let label = this.tableCdLabel[general.eTeamNum + 1];
				if (label == null) {
					return;
				}
				let value = Math.floor(cur / 1000) + 1;
				let beanNum = general.getCurBeanNum();
				if (cur == 0 || beanNum != 0) {
					label.visible = false;
				} else {
					if (this.tableCdValue[general.roleId] != value) {
						label.visible = true;
						label.text = value;
						this.tableCdValue[general.roleId] = value;
					}
				}
				let index = general.eTeamNum + 1;
				if (general.isHandleCdOk()) {
					//this.tableCdProgress[index].visible=false;
					this.tableCdBoard[index].visible = false;
					if (general.isPlaySkillUiLegeal()) {
						this.checkAndOpenAni(this.tableHunterCdAni, index, UIConfig.UIConfig_CommonBattleCss.HUNTER_FIGHT_UI.cd_index)
					} else {
						this.checkAndCloseAni(this.tableHunterCdAni, index);
					}
				} else {
					//this.tableCdProgress[index].visible=true;
					this.tableCdBoard[index].visible = true;
					let percent = 100;
					if (max != 0) {
						percent = 100 - cur * 100 / max;
						// self.tableCdProgress[index]:setPercentage(percent);
						this.checkAndCloseAni(this.tableHunterCdAni, index);
					}
				}
			}
		}
		public OnTouchBegan(e: egret.TouchEvent) {
			if (this.scene.bBossPause) {
				return;
			}
			// if (Gmgr.Instance.bFightAuto) {
			// 	return;
			// }
			let x = e.stageX;
			let y = e.stageY;
			for (let i = 0; i < this.tableTouch.length; i++) {
				let v = this.tableTouch[i];
				if (Helper.bInNodeRect(v, x, y)) {
					this.selIndex = i;
					this.location.setTo(x, y);
					return
				}
			}

			for (let i = 0; i < this.tableRageTouch.length; i++) {
				let v = this.tableRageTouch[i];
				if (Helper.bInNodeRect(v, x, y)) {
					this.selIndex = i;
					this.location.setTo(x, y);
					return
				}
			}
		}
		private ButtonYH() {
			if (this.scene.bBossPause) {
				return;
			}
			if (Gmgr.Instance.bFightAuto) {
				return;
			}
			if (this.tableRoleYH) {
				let general = this.tableRoleYH;
				if (general.getRage() < general.getMaxRage()) {
					return;
				}
				if (!general.isPlaySkillLegeal()) {
					return;
				}
				if (this.scene.checkAllEnemyDead()) {
					return;
				}
				this.scene.dealYH(general);
			}
		}
		public TouchRage(general, k) {
			if (general != null && this.scene.sceneState == TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
				if (general.relySupportRole == null || general.getRage() < general.relySupportRole.getSupportConsume()) {
					return
				}
				if (!general.isPlaySkillLegeal()) {
					return;
				}
				if (!general.relySupportRole.isPlaySkillLegeal()) {
					return;
				}
				if (this.scene.checkAllEnemyDead()) {
					return;
				}
				this.scene.dealSupport(general);
				if (Gmgr.Instance.isTeachBattleEnd()) {
					Teach.addTeaching();
				}
			}
		}
		public TouchPress(general, k) {
			if (general != null && this.scene.sceneState == TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
				if (Gmgr.Instance.isTeachBattleEnd()) {
					if (this.scene.checkAllEnemyDead()) {
						return;
					}
					if (general.playSkillAtk(0)) {
						
						Teach.addTeaching();
					}
				} else {
					if (!general.isPlaySkillLegeal()) {
						return;
					}
					if (this.scene.checkAllEnemyDead()) {
						return;
					}
					general.setNoticeTouchType(message.ESkillType.SKILL_TYPE_HANDLE);
				}
			}	
		}
		public OnTouchMoved(x, y) {
			if (this.scene.bBossPause) {
				return;
			}
			if (Gmgr.Instance.bFightAuto) {
				return;
			}
			for (let i = 0; i < this.tableRageTouch.length; i++) {
				let v = this.tableRageTouch[i];
				if (Helper.bInNodeRect(v, x, y)) {
					let general = this.tableRoles[this.tableKey[i]];
					this.TouchRage(general, i);
					return
				}
			}
		}
		public OnTouchEnded(e: egret.TouchEvent) {
			if (this.selIndex >= 0) {
				let x = e.stageX;
				let y = e.stageY;
				for (let i = 0; i < this.tableTouch.length; i++) {
					let v = this.tableTouch[i];
					if (Helper.bInNodeRect(v, x, y)) {
						if (i == this.selIndex) {
							let general = this.tableRoles[this.tableKey[i]];
							this.TouchPress(general, i);
						}
					}
				}

				for (let i = 0; i < this.tableRageTouch.length; i++) {
					let v = this.tableRageTouch[i];
					if (Helper.bInNodeRect(v, x, y)) {
						if (i == this.selIndex) {
							let general = this.tableRoles[this.tableKey[i]];
							this.TouchRage(general, i);
						}
					}
				}
			}
			this.selIndex = -1;
			this.location.setTo(0, 0);

			if (this.buffView && this.buffView.scaleX != 0) {
				this.buffScale();
			}
		}
		public ButtonPause_CallBack() {
			this.scene.pauseAll();
			loadUI(Fight_Pop)
				.then((dialog: Fight_Pop) => {
					dialog.show(UI.SHOW_FROM_TOP);
				});
		}

		public buffView: Fight_BuffView;
		public ButtonBuffShow_CallBack() {
			if (!this.buffView) {
				loadUI(Fight_BuffView)
					.then((dialog: Fight_BuffView) => {
						this.setView(dialog);
						this.buffScale();
					});
			} else {
				this.buffScale();
			}
		}

		public setView(dialog) {
			this.buffView = dialog;
			this.buffView.scaleX = this.buffView.scaleY = 0;
			this.addChild(this.buffView);
			this.buffView.y = this.ButtonBuffShow.y + this.ButtonBuffShow.height;
		}
		private buffScale() {
			egret.Tween.removeTweens(this.buffView);
			if (this.buffView.scaleX == 0) {
				this.buffView.visible = true;
				egret.Tween.get(this.buffView)
					.to({ scaleX: 1, scaleY: 1 }, 300);
			} else {
				egret.Tween.get(this.buffView)
					.to({ scaleX: 0, scaleY: 0 }, 300).call(() => {
						this.buffView.visible = false;
					})
			}
		}
		public ButtonAuto_CallBack() {
			if (this.scene.bHideAuto) {
				return;
			}
			if (this.scene.bLockAuto) {
				return;
			}
			if (Gmgr.Instance.bContinueBattle && !Gmgr.Instance.bStopContinueFromBattle) {

			} else {
				if (this.speedActioning) {
					return;
				}
				if (Gmgr.Instance.debugLocalFight) {
					Gmgr.Instance.bFightAuto = !Gmgr.Instance.bFightAuto;
					// Gmgr.Instance.bFightAuto = true;
				} else {
					let tag = yuan3(Gmgr.Instance.backupAutoTbl[Gmgr.Instance.fightType], false, true);
					Gmgr.Instance.bFightAuto = tag;
					// Gmgr.Instance.bFightAuto = true;
					Gmgr.Instance.backupAutoTbl[Gmgr.Instance.fightType] = Gmgr.Instance.bFightAuto;
				}
				this.DealAutoButton();
				this.modifySpeedAni(Gmgr.Instance.bakeSpeedIndex);
				Teach.addTeaching();
			}
		}
		public ButtonSpeed_CallBack() {
			if (this.speedMax == 1 && Gmgr.Instance.bakeSpeedIndex == 1) {
				let _tmp = Helper.StringFormat(TextsConfig.TextsConfig_Error.speed_next_open, ConstantConfig_BattleTbl.FIGHT_AUTO_SPEED_LIMIT[1]);
				toast(_tmp);
				return;
			}
			if (this.speedMax == 2 && Gmgr.Instance.bakeSpeedIndex == 2) {
				if (Gmgr.Instance.firstTouchSpeed == false) {
					Gmgr.Instance.firstTouchSpeed = true;
					let _tmp = Helper.StringFormat(TextsConfig.TextsConfig_Error.speed_max_open, ConstantConfig_BattleTbl.FIGHT_AUTO_SPEED_LIMIT[2], ConstantConfig_BattleTbl.FIGHT_AUTO_SPEED_LIMIT_VIP[2]);
					toast(_tmp);
					return;
				}
			}
			Gmgr.Instance.bakeSpeedIndex = Gmgr.Instance.bakeSpeedIndex + 1;
			if (Gmgr.Instance.bakeSpeedIndex > this.speedMax) {
				Gmgr.Instance.bakeSpeedIndex = 1.0;
			}
			this.modifySpeedAni(Gmgr.Instance.bakeSpeedIndex);
			this.scene.modifySpeedData(Gmgr.Instance.bakeSpeedIndex);
			this.scene.speedRecord(Gmgr.Instance.bakeSpeedIndex);

			if (Gmgr.Instance.debugLocalFight == false) {
				Gmgr.Instance.backupSpeedTbl[Gmgr.Instance.fightType] = Gmgr.Instance.bakeSpeedIndex
			}
			Teach.addTeaching();
		}

		public onButtonClickLeft() {

		}

		public DealSpeedButton() {
			this.modifySpeedAni(Gmgr.Instance.bakeSpeedIndex);
			this.scene.modifySpeedData(Gmgr.Instance.bakeSpeedIndex);
		}
		public modifySpeedAni(speedIndex) {
			if (this.speedAni != null) {
				let aniTbl = [0, 2, 4, 6];
				let tmpValue = yuan3(Gmgr.Instance.bFightAuto, 1, 0);
				this.speedAni.stopAllActions();
				this.speedAni.ChangeAction(aniTbl[speedIndex] + tmpValue);
			}
		}
		public ButtonHelp_CallBack() {
			if (Gmgr.Instance.bReplay) {
				if (this.scene != null) {
					Teach.addTeaching();
					this.scene.startHelp();
				}
			}
		}
		public Pause() {
			for (let i = 0; i < this.tableCdProgress.length; i++) {
				let v = this.tableCdProgress[i];
				v.Pause();
			}
		}
		public resume() {
			for (let i = 0; i < this.tableCdProgress.length; i++) {
				let v = this.tableCdProgress[i];
				v.resume();
			}
		}
		public InitPause() {
			if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
				if (Game.TeachSystem.curPart == teachBattle.teachPartId_1_1
					|| Game.TeachSystem.curPart == teachBattle.teachPartId_1_3
					|| Game.TeachSystem.curPart == teachBattle.teachPartId_1_5
					|| Game.TeachSystem.curPart == teachBattle.teachPartId_1_10
				) {
					this.ButtonPause.touchEnabled = false;
					this.ButtonPause.enabled = false;
					this.ButtonSend.touchEnabled = false;
				}
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {
				this.ButtonPause.touchEnabled = false;
				this.ButtonPause.enabled = false;
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK) {
				this.ButtonPause.touchEnabled = false;
				this.ButtonPause.enabled = false;
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ZORK) {
				this.ButtonPause.touchEnabled = false;
				this.ButtonPause.enabled = false;
			} else if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY) {
				this.SpriteClock.visible = false;
				this.LabelBattleTime.visible = false;
			}
		}
		public ForceLockPause() {
			// this.ButtonPause.touchEnabled = false;
		}
		public InitAuto() {
			if (this.scene.bHideAuto == false) {
				this.LayerAuto.visible = true;
				if (this.scene.bLockAuto == false) {
					this.SpriteIconLock.visible = false;
				}
				this.SpriteBoardOpen.visible = false;
			}
			if (Gmgr.Instance.bContinueBattle && !Gmgr.Instance.bStopContinueFromBattle) {
				this.DealAutoButton(9);
			} else {
				this.DealAutoButton();
			}
			this.DealSpeedButton();
			if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK && !Gmgr.Instance.debugLocalFight) {
				// this.NodeAutoAni.enabled = false;
				this.NodeAutoAni.touchEnabled = false;
			}
			if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE && !Gmgr.Instance.debugLocalFight) {
				// this.NodeAutoAni.enabled = false;
				this.NodeAutoAni.touchEnabled = false;
			}
			if (Gmgr.Instance.bContinueBattle && !Gmgr.Instance.bStopContinueFromBattle) {
				this.LabelSuccessionBattleNum.visible = false;
				this.LabelSuccessionBattleNum.text = Gmgr.Instance.currContinueBattleSum + "/" + Gmgr.Instance.maxContinueBattleSum;
			} else {
				this.LabelSuccessionBattleNum.visible = false;
			}
		}
		public DealAutoButton(index?) {
			if (index != null) {
				if (this.autoAni != null) {
					this.autoAni.stopAllActions();
					this.autoAni.ChangeAction(index);
				}
			} else {
				if (this.NodeAutoAni != null) {
					if (Gmgr.Instance.bFightAuto == false) {
						if (this.autoAni != null) {
							this.autoAni.stopAllActions();
							this.autoAni.ChangeAction(0);
						}
					} else {
						if (this.autoAni != null) {
							this.autoAni.stopAllActions();
							this.autoAni.ChangeAction(1);
						}
					}
				}
			}
		}
		public FreshReviveUi(role) {
			let num = role.eTeamNum + 1;
			this.tableCdNode[num].visible = true;
			this.tableCdLabel[num].visible = true;
			if (this.tableRageProgress[num] != null) {
				this.tableRageProgress[num].visible = true;
			}
		}
		public FreshDeadUi(role) {
			let num = role.eTeamNum + 1;
			//自身头像变灰
			if (this.tableHead[num] != null) {
				Helper.SetImageFilterColor(this.tableHead[num], "gray");
			}
			//援护头像变灰
			if (this.tableSupportHead[num] != null) {
				Helper.SetImageFilterColor(this.tableSupportHead[num], "gray");
			}
			// this.tableCdNode[num].visible = false;
			this.tableCdLabel[num].visible = false;

			if (this.tableRageProgress[num] != null) {
				this.tableRageProgress[num].visible = false;
			}
			if (this.tableHunterCdAni[num] != null) {
				this.tableHunterCdAni[num].spx.spine.visible = false;
			}
			if (this.tableHunterSupportAni[num] != null) {
				this.tableHunterSupportAni[num].spx.spine.visible = false;
			}
			if (this.tableHunterDeadAni[num] != null) {
				this.tableHunterDeadAni[num].spx.spine.visible = false;
			}
		}
		public FreshNewUi(role) {
			let num = role.eTeamNum + 1;
			this.tableHeadNode[num].visible = false;
			this.tableCdNode[num].visible = true;
			this.tableCdLabel[num].visible = true;

			this.tableHead[num].visible = true;
			this.tableHead[num].source = cachekey(role.battleHead, this);
			this.tableHead[num].width = 95;
			this.tableHead[num].height = 93;

			this.tableHpValue[role.roleId] = 0;
			this.tableRageValue[role.roleId] = -1;
			this.tableCdValue[role.roleId] = -1;

			this.tableCdTip[role.roleId] = this.tableCdPos[num];
			this.tableTeachRage[role.roleId] = this.tableRageTouch[num];
			this.tableTeach[role.roleId] = this.tableBoard[num];
			//this.tableTeachAngry[role.roleId] = this.tableRagePos[i];
		}
		private point: egret.Point = new egret.Point();
		public GetCdTipPos(num, type) {
			let x = 0;
			let y = 0;
			if (num == 4) {
				let pos = Helper.GetWolrdPoint(this.SpriteSupport, this.point);
				x = pos.x;
				y = pos.y;
			} else if (type == 1) {
				if (num >= 0 && num < 4) {
					let pos = Helper.GetWolrdPoint(this.tableHeadNode[num], this.point);
					x = pos.x;
					y = pos.y;
				}
			} else if (type == 2) {
				if (num >= 0 && num < 4) {
					if (this.tableSupportNode[num] == null) {
						x = 0;
						y = 0;
					} else {
						let pos = Helper.GetWolrdPoint(this.tableSupportNode[num], this.point);
						x = pos.x;
						y = pos.y;
					}
				}
			}
			return [x, y];
		}
		public TouchSkillUiEffect(general, index) {

		}
		public PushUi(ui, btn) {
			//按钮高亮
			// let _button = btn;

			// //界面加载
			// loadUI(HXH_HunterUserStrength)
			//     .then((dialog: HXH_HunterUserStrength) => {
			//         dialog.SetInfo();
			//         dialog.show(UI.SHOW_FROM_TOP);
			//     });
		}

		/**
		 * 左边图标
		 */
		public ButtonClickLeft_CallBack() {
			if (this.bChatActioning) {
				return;
			}
			this.ButtonClickLeft.enabled = false;
			let action = null;
			if (this.chatClickPop) {
				this.ButtonClickLeft.scaleX = -1;
				egret.Tween.get(this.NodeHave).to({ x: 0, y: 0 }, 500, egret.Ease.backOut).call(() => {
					this.call();
				});
			} else {
				this.ButtonClickLeft.scaleY = 1;
				egret.Tween.get(this.NodeHave).to({ x: -430, y: 0 }, 500, egret.Ease.backOut).call(() => {
					this.call();
				});
			}
			this.bChatActioning = true;
		}

		public call() {
			this.bChatActioning = false;
			this.ButtonClickLeft.enabled = true;
			this.chatClickPop = !this.chatClickPop;
			if (this.LabelChat != null && !this.bHideLabel) {
				this.LabelChat.visible = !this.chatClickPop;
			}
		}

		/**
		 * 聊天界面
		 */
		public ButtonSend_CallBack() {
			loadUI(Chat_Main).then((dialog: Chat_Main) => {
				dialog.show();
				dialog.inittypr(1);
			});
		}

		public combatChat(e) {
			this.chatClickPop = true;
			this.ButtonClickLeft_CallBack();
			this.LabelInfo.text = "【" + e.data.name + "】" + " " + JSON.parse(e.data.content)[0].content;
		}

		public LoadChat() {
			let x = this.SpriteChatClip.x;
			let y = this.SpriteChatClip.y;
			this.ChatClipWidth = this.SpriteChatClip.width;
			this.SpriteChatClip.visible = false;
			this.LabelInfo.visible = false;
			this.ButtonClickLeft.scaleX = -1;
		}

		public LoadChatInfo() {

		}
		public CloseAni() {

		}
		public SetRelicBox(step) {
			let maxStep = TableInstanceRelic.Item(Game.PlayerMissionSystem.fightExt + 1).max_step;
			this.NodeRelic.visible = true;
			if (step == 1) {
				for (let i = 0; i < maxStep; i++) {
					let chestId = TableInstanceRelic.Item(Game.PlayerMissionSystem.fightExt + 1).open_chest[i];
					let chestPic = TableInstanceRelicChest.Item(chestId).path;
					chestPic[1] = chestPic[0];
					Set.ButtonBackgroud(this["ButtonChestBox" + (i + 1)], chestPic[0], chestPic[0], chestPic[2]);
					this["ButtonChestBox" + (i + 1)].enabled = false;
				}
				this.SpriteBoard.scaleX = this.SpriteBoard.scaleY = 1.1;
				let scale = Device.screenWidth / 960 >= 1 && 1 || (Device.screenWidth / 960);
				this.LayerTopLeft.scaleX = this.LayerTopLeft.scaleY = scale;
			}
			if (this["ButtonChestBox" + (step - 1)] != null) {
				this["ButtonChestBox" + (step - 1)].enabled = true;
			}
		}
	}
}
namespace zj {
	export class StageScenePlayer extends StageObject {
		public static SP_DEFAULT_X: number = 0.24;//0.28;//0.35;//0.21;
		public static SP_DEFAULT_Y: number = 0.10;//0.12;//0.15;//0.09;

		public constructor(node, order) {
			super();
			this.rootNode = node;
			this.nodeRoot = new eui.Group();
			this.rootNode.addChild(this.nodeRoot)

			this.nodePos = new eui.Group();
			this.nodeRoot.addChild(this.nodePos)

			this.nodeSpecial = new eui.Group();
			this.nodeRoot.addChild(this.nodeSpecial)

			this.order = order
			this.saveOrder = order

			this.curScene = StageSceneManager.Instance.GetCurScene();

			// 人物底层
			this.nodeDown = new eui.Group();
			this.nodePos.addChild(this.nodeDown)

			// 人物基础   
			this.nodeNormal = new eui.Group();
			this.nodePos.addChild(this.nodeNormal);

			// 标题
			this.titleSpace = new eui.Group();
			this.nodePos.addChild(this.titleSpace)

			// 人物上层ui
			this.nodeUp = new eui.Group();
			this.nodePos.addChild(this.nodeUp)

			// 上层layer
			this.nodeEffect = new eui.Group();
			this.nodePos.addChild(this.nodeEffect)

			// 击打光效
			this.nodeHit = new eui.Group();
			this.nodeRoot.addChild(this.nodeHit);

			//人物信息相关
			this.playerState = EnumPlayerState.PLAYER_STATE_NONE;
			this.memberInfo = null
			this.playerInfo = null
			this.mapRoleId = 0
			this.name = null;

			this.ePosition = TableEnum.TablePositionType.POSITION_NONE;
			this.bEnemy = false
			this.x = 0
			this.y = 0
			this.fp_dir = TableEnum.TableEnumDir.Dir_None
			this.fpX = 0
			this.fpY = 0
			this.scale = 1.0
			this.dir = TableEnum.TableEnumDir.Dir_Right
			this.walkDir = TableEnum.EnumDepthDir.Dir_None
			this.saveDir = TableEnum.TableEnumDir.Dir_None
			this.state = TableEnum.TableEnumBaseState.State_None
			this.otherState = TableEnum.TableEnumOtherState.OtherState_None
			this.actionId = -1
			this.actionLastId = -1
			this.trans = 1;

			this.targetPos = { x: 0, y: 0 };
			this.moveDistance = 0
			this.verDistance = 0
			this.preMoveDis = 0
			this.preVerDis = 0
			this.path = null

			this.aniUpOffsetX = 0
			this.aniUpOffsetY = 0
			this.bodyWidth = 0
			this.bodyHeight = 0

			// skill
			this.tableMagicSkillIds = []
			this.tableMagicSkills = []
			this.tableEffects = []
			this.tableHits = []
			this.curSkill = null
			this.curSkillIdx = -1;

			// 动画相关
			this.body = null
			this.bodySpxId = -1
			this.resafeParticleEffects = null    // 复活粒子特效

			this.nameBoard = null
			this.ttfName = null
			this.nameColor = null

			this.ttfOffical = null
			this.ttfLv = null
			this.bloodBoard = null
			this.designation = null
			this.auraFront = null
			this.auraBack = null
			this.bloodBar = null
			this.leagueBoard = null
			this.ttfLeagueName = null
			this.ttfGroupName = null
			this.leagueStar = null
			this.progressBoard = null
			this.progressBar = null

			// bool
			this.bVisible = false
			this.bActLoop = false
			this.bBodyActEnd = false
			this.bRunTarget = false
			this.bRunAstar = false
			this.bInZone = false
			this.bInView = true
			this.bRevived = false
			this.bHidden = false

			// talker
			this.spriteTalk = null
			this.ttfTalk = null
			this.talkRect = null

			this.bTalkStay = false
			this.talkStayMax = Helper.getRandom2(ConstantConfig_LeagueHome.LEAGUE_CHAT_STAY_TIME, ConstantConfig_LeagueHome.LEAGUE_CHAT_STAY_TIME * 2)
			this.talkStayTime = 0

			this.talkTextTbl = {}
			this.tableSceneBuffs = {};

			// fish
			this.bInFish = 0
			this.fishCss = null

			//led
			this.commonLedAni = null
			this.ledIndex = -1

			// fun
			this.targetCB = null
			this.showCB = null
			this.endCB = null
			this.dieCB = null

			// fight show
			this.showFrame = 0
			this.showNum = 0
			this.showY = 0
			this.showHpMaxFrame = ConstantConfig_RoleBattle.FIGHT_SCENE_SHOW_MAX_NUM + 1
			this.showHpCurFrame = 0
			this.showHpRecord = 0;

			// scene notice data    
			this.sceneHpPercent = 100
			this.lastHpPercent = 100
			this.destHpPercent = 100
			this.showHp = 100
			this.uiHp = -1
			this.recoveryHpProgress = 0

			this.dieProtectTime = 0
			this.dieStayMs = ConstantConfig_RoleBattle.FIGHT_SCENE_DIE_STAY_MS

			this.fasterTime = 0
			this.addBloodLeftTime = 0
			this.addSpeedLeftTime = 0
			this.invincibleTime = 0
			this.frozenTime = 0

			// control build
			this.bProgressing = false
			this.controlBuildId = 0
			this.controlFrame = 0

			// league title
			this.cacheOfficialId = null
			this.cacheName = null
			this.cacheLv = null
			this.officalFrame = 0

			// zork skill    
			this.maxBeanNum = 1
			this.curBeanNum = this.maxBeanNum

			// sound
			this.press_sound_path = null
			this.kill_sound_path = null

			// storage 
			this.storageSpx = null

			// buff 
			this.tablePlayerBuffs = [];
		}
		public pre_fish_state;
		public shadow;
		public cacheOfficialId;
		public cacheName;
		public cacheLv;
		public officalFrame;
		public maxBeanNum;
		public kill_sound_path;
		public curBeanNum;
		public press_sound_path;
		public storageSpx;
		public tablePlayerBuffs = [];

		public sceneHpPercent;
		public lastHpPercent;
		public destHpPercent;
		public showHp;
		public uiHp;
		public recoveryHpProgress;
		public dieProtectTime;
		public dieStayMs;
		public fasterTime;
		public addSpeedLeftTime;
		public addBloodLeftTime;
		public invincibleTime;
		public bProgressing;
		public frozenTime;
		public controlBuildId;
		public controlFrame;

		public bInFish;
		public fishCss;
		public channelCss;
		public commonLedAni: Spx;
		public ledIndex;
		public targetCB;
		public targetCBThis;
		public showCB;
		public endCB;
		public dieCB;
		public showFrame;
		public showNum;
		public showY;
		public showHpMaxFrame;
		public showHpCurFrame;
		public showHpRecord;


		public ttfOffical;
		public ttfName: eui.Label;
		public nameColor;
		public resafeParticleEffects;
		public bodySpxId;
		public nameBoard;

		public tableSceneBuffs;
		public talkTextTbl;
		public talkStayMax;
		public talkStayTime;
		public bTalkStay;
		public talkRect;
		public spriteTalk;
		public ttfTalk;
		public bHidden;
		public bInView;
		public bRevived;
		public bInZone;
		public bRunAstar;
		public bRunTarget;
		public bloodBoard;
		public bBodyActEnd;
		public bActLoop;
		public bVisible;
		public progressBar: eui.Image;
		public progressBoard;
		public leagueStar;
		public ttfGroupName: eui.Label;
		public ttfLeagueName: eui.Label;
		public leagueBoard;
		public body: Spx;
		public bloodBar: eui.Image;
		public auraBack;
		public auraFront;
		public designation;
		public titleBG: eui.Image;// 称号底图
		public titlePic: eui.Image;// 称号图
		public targetPos;

		public ttfLv: eui.Label;
		/**人物在地图上的X坐标 */
		public moveDistance;
		/**人物在地图上的Y坐标 */
		public verDistance;
		public preMoveDis;
		public preVerDis;
		public path;
		public aniUpOffsetX;
		public aniUpOffsetY;
		public bodyWidth;
		public bodyHeight;
		public tableMagicSkillIds;
		public tableMagicSkills = [];
		public tableEffects = [];
		public tableHits = [];
		public curSkill;
		public curSkillIdx;

		public bEnemy;
		public x;
		public y;
		public fp_dir;
		public fpX;
		public fpY;
		public scale;
		public dir;
		public walkDir;
		public saveDir;
		public state;
		public otherState;
		public actionId;
		public actionLastId;
		public trans;
		public ePosition;
		public memberInfo;
		public playerInfo;
		public mapRoleId;
		public name;
		public playerState;
		public titleSpace;
		public nodeUp;
		public nodeHit;
		public nodeEffect;
		public curScene;
		public rootNode;
		public nodePos;
		public nodeRoot;
		public nodeSpecial;
		public order;
		public saveOrder;
		public nodeDown;
		public nodeNormal;
		public profession;
		public scenePosInfo;
		public frameKv = { [1]: 12, [2]: 33, [3]: 55, [7]: -30, [8]: -25, [9]: -20, [10]: -13, [11]: -9, [12]: -3 };

		public loadLedAni() {
			[this.commonLedAni,] = HunterSpineX(null, 1, null, TableClientAniCssSource.Item(UIConfig.UIConfig_RpgScene.ledEffect.jsonId).name);
			this.commonLedAni.setVisibleSpx(false);
			this.nodeEffect.addChild(this.commonLedAni.spine);
		}
		public flashLedAni(action) {
			if (this.commonLedAni == null) {
				return;
			}
			if (action == -1) {
				this.ledIndex = -1;
				this.commonLedAni.setVisibleSpx(false);
			} else {
				this.commonLedAni.setVisibleSpx(true);
				if (action != this.ledIndex) {
					this.ledIndex = action;
					this.commonLedAni.stopAllActions();
					this.commonLedAni.ChangeAction(UIConfig.UIConfig_RpgScene.ledEffect.actionIds[action]);
				}
			}
		}
		public release() {
			let i = 0;
			while (i < this.tableEffects.length) {
				CC_SAFE_DELETE(this.tableEffects[i]);
				i = i + 1;
			}
			this.tableEffects = [];

			i = 0;
			while (i < this.tableHits.length) {
				CC_SAFE_DELETE(this.tableHits[i]);
				i = i + 1;
			}
			this.tableHits = [];
			let nodeFun = function (body) {
				if (body && body.parent) {
					body.parent.removeChild(body);
				}
			}
			if (this.fishCss) {
				this.fishCss.removeChildren();
			}
			if (this.channelCss) {
				this.channelCss.removeChildren();
			}
			if (this.auraBack && this.auraBack.parent) {
				this.auraBack.parent.removeChild(this.auraBack);
			}
			if (this.auraFront && this.auraBack.parent) {
				this.auraBack.parent.removeChild(this.auraFront);
			}
			if (this.body) {
				this.body.clearSpine();
				this.body = null;
			}
			nodeFun(this.auraFront);
			nodeFun(this.auraBack);

			nodeFun(this.nameBoard);
			nodeFun(this.ttfName);
			nodeFun(this.ttfOffical);
			nodeFun(this.ttfLv);
			nodeFun(this.bloodBoard);
			nodeFun(this.designation);
			nodeFun(this.bloodBar);
			nodeFun(this.leagueBoard);
			nodeFun(this.ttfLeagueName);
			nodeFun(this.ttfGroupName);
			nodeFun(this.leagueStar);

			if (this.commonLedAni != null) {
				this.nodeEffect.removeChild(this.commonLedAni.spine);
				this.commonLedAni = null;
			}
			if (this.resafeParticleEffects != null) {
				this.nodeEffect.removeChild(this.resafeParticleEffects);
				this.resafeParticleEffects = null;
			}
			if (this.storageSpx != null) {
				this.storageSpx.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationTimeEvent, this);
				this.nodeEffect.removeChild(this.storageSpx);
				this.storageSpx = null;
			}
			this.nodeRoot.removeChild(this.nodePos);
			this.nodeRoot.removeChild(this.nodeSpecial);
			this.nodeRoot.removeChild(this.nodeHit);

			this.rootNode.removeChild(this.nodeRoot);
		}
		public createPlayer(memberInfo, floor, x, y, dir, moveDis, verDis, ePosType?, bEnemy?) {
			this.setMemberInfo(memberInfo);
			this.setPlayerInfo(memberInfo.monarchbase);
			// todo
			this.commonCreate(floor, x, y, dir, moveDis, verDis);
		}
		public createZorkPlayer(baseInfo, floor, x, y, dir, moveDis, verDis) {
			this.setPlayerInfo(baseInfo);
			this.commonCreate(floor, x, y, dir, moveDis, verDis);
		}
		public commonCreate(floor, x, y, dir, moveDis, verDis) {
			this.init();
			this.changeScale();
			this.setFloor(floor);
			this.setRoot(x, y);
			this.setMoveDistance(moveDis);
			this.setVerDistance(verDis);
			this.changeDir(dir);
			this.setActLoop(true);
			this.changeState(TableEnum.TableEnumBaseState.State_None);
			this.procState(0);
		}
		public parseInfo() {
			let tbl = TableItemPic.Table();
			this.mapRoleId = this.playerInfo.picId;
			this.mapRoleId = PlayerVIPSystem.GetMapRoleInfo(this.playerInfo) || this.mapRoleId;
			this.name = this.playerInfo.name;
		}
		public init() {
			this.parseInfo();
			this.loadDB();
			this.loadNormalSpx();
			this.loadBody();
			this.loadDesignation();
			this.loadAura();
			this.loadNameTitle();
			this.loadSpeed();
			this.loadScale();
		}
		public initSpecial() {
			this.parseInfo()
			this.loadDB()
			this.loadNormalSpx()
			this.loadBody()
			this.loadDesignation()
			this.loadAura()
			this.loadLvTitle()
			this.loadNameTitle()
			this.loadLeagueNameTitle()

			this.loadSpeed()
			this.loadScale()
		}
		public resetBody(mapRoleId) {
			this.mapRoleId = mapRoleId
			this.loadDB()
			this.loadNormalSpx()
			this.loadBody()
			this.loadScale()
			this.adjustAniPos()

			this.changeScale()
			this.changeState(TableEnum.TableEnumBaseState.State_None)
			this.actionLastId = -1;
			this.procState(0)
			this.setRoot(this.x, this.y);
		}
		public adjustAniPos() {

		}
		public loadBody() {
			// [this.body] = HunterSpineX(0,this.scale,null,MapSceneLoading.BlackRole);
			if (this.body) {
				this.body.clearSpine();
				this.body = null;
			}
			let scle = this.scale;
			this.bodySpxId = TableMapRole.Item(this.mapRoleId).body_spx_id;
			if (this.bodySpxId != -1) {
				[this.body] = HunterSpineX(this.bodySpxId, scle);
				if (!this.body) {
					[this.body] = HunterSpineX(0, scle, null, MapSceneLoading.BlackRole);
					let spineTable: TableClientFightAniSpineSource = TableClientFightAniSpineSource.Item(this.bodySpxId);
					Game.DragonBonesManager.preloadDragonbone(StageSceneManager.Instance.temporaryScene, spineTable.json)
						.then(() => {
							if (this.body) {
								this.body.clearSpine();
								this.body = null;
							}
							[this.body] = HunterSpineX(this.bodySpxId, scle);
							this.nodeNormal.addChildAt(this.body.spine, 2);
							this.actionId = -1;
							this.body.ChangeAction(TableEnum.TableEnumOtherState.OtherState_Stand);
							this.titlePos();
						})
						.catch((error) => {

						});
				}
				this.nodeNormal.addChildAt(this.body.spine, 2);
				this.body.ChangeAction(TableEnum.TableEnumOtherState.OtherState_Stand);
			}
			this.loadSlots();
		}
		public titlePos() {
			this.loadScale();
			this.setTitlePos(0, 0);
			this.adjustAniPos();
		}
		public updateSpineX(tick) {
			if (this.body != null) {
				this.body.UpdataAni(tick);
			}
		}
		public updateEndBody() {
			if (this.bBodyActEnd == true) {
				return;
			}
			if (this.body.IsActEnd()) {
				this.bBodyActEnd = true;
			}
		}
		//脚底黑圈
		public loadSlots() {
			if (this.shadow == null) {
				this.shadow = new eui.Image(UIConfig.UIConfig_CommonBattle.common_shadow);
				this.nodeDown.addChild(this.shadow);
				this.shadow.x = -55;
				this.shadow.y = -10;
			}
		}
		public addSceneBuff(type, time) {

		}
		public updateSceneBuff(tick) {
			//let rt = tick * 1000;
			//for(let k in this.tableSceneBuffs)
		}
		public hurtNumOffsetNorX;
		public hurtNumOffsetNorY;

		public hitEffectOffsetSpeX;
		public hitEffectOffsetSpeY;

		public hitEffectOffsetNorX;
		public hitEffectOffsetNorY;

		public hurtNumOffsetSpeX;
		public hurtNumOffsetSpeY;

		public roleAniOffsetNorUpX;
		public roleAniOffsetNorUpY;

		public roleAniOffsetSpeUpX;
		public roleAniOffsetSpeUpY;

		public offsetNorMidX;
		public offsetNorMidY;
		public loadDB() {
			let instance = TableMapRole.Item(this.mapRoleId);
			this.profession = instance.model_profession

			this.aniUpOffsetX = instance.role_title_pos[0]
			this.aniUpOffsetY = instance.role_title_pos[1]
			this.bodyWidth = instance.body_size[0]
			this.bodyHeight = instance.body_size[1]

			this.hurtNumOffsetNorX = instance.hurt_num_offset_nor[0]
			this.hurtNumOffsetNorY = instance.hurt_num_offset_nor[1]
			this.hurtNumOffsetSpeX = instance.hurt_num_offset_spe[0]
			this.hurtNumOffsetSpeY = instance.hurt_num_offset_spe[1]

			this.hitEffectOffsetNorX = instance.hit_effect_offset_nor[0]
			this.hitEffectOffsetNorY = instance.hit_effect_offset_nor[1]
			this.hitEffectOffsetSpeX = instance.hit_effect_offset_spe[0]
			this.hitEffectOffsetSpeY = instance.hit_effect_offset_spe[1]

			this.roleAniOffsetNorUpX = instance.role_ani_offset_nor_up[0]
			this.roleAniOffsetNorUpY = instance.role_ani_offset_nor_up[1]
			this.roleAniOffsetSpeUpX = instance.role_ani_offset_spe_up[0]
			this.roleAniOffsetSpeUpY = instance.role_ani_offset_spe_up[1]

			this.offsetNorMidX = instance.offset_nor_mid[0]
			this.offsetNorMidY = instance.offset_nor_mid[1]

			this.tableMagicSkillIds = instance.xj_skill_id;

			let tableSound = TableClientSoundResource.Table();
			let sound_id = instance.press_xuli_effect_sound;
			if (sound_id != -1) {
				this.press_sound_path = tableSound[sound_id].sound_path;
			}
			sound_id = instance.kill_xuli_effect_sound;
			if (sound_id != -1) {
				this.kill_sound_path = tableSound[sound_id].sound_path;
			}
		}
		public setMapRoleId(mapRoleId) {
			// if(TableMapRole.Item(mapRoleId) == null){

			// }
			this.mapRoleId = mapRoleId;
		}
		public uiScale;
		public loadNormalSpx() {
			if (Gmgr.Instance.layerId == TableEnumLayerId.LAYER_WONDERLAND || Gmgr.Instance.layerId == TableEnumLayerId.LAYER_DARKLAND || Gmgr.Instance.layerId == TableEnumLayerId.LAYER_ZORKBOSS) {
				this.scale = TableMapRole.Item(this.mapRoleId).body_scale;
				this.uiScale = this.scale * 1.1;
			} else {
				this.scale = 1.0;
				this.uiScale = 1.0;
			}

		}
		public moveSpeedX;
		public moveSpeedY;
		public loadSpeed() {
			this.moveSpeedX = StageScenePlayer.SP_DEFAULT_X;//0.35//common.league_scene_move_speed_x;
			this.moveSpeedY = StageScenePlayer.SP_DEFAULT_Y;//0.15//common.league_scene_move_speed_y;
		}
		public loadScale() {
			let bone_up_x = this.body.spine.armature.getBone("buff_up").global.x;
			let bone_up_y = this.body.spine.armature.getBone("buff_up").global.y;

			if (bone_up_y < 0) {
				bone_up_y = Math.abs(bone_up_y);
			}
			this.bodyHeight = this.uiScale * bone_up_y;
			this.aniUpOffsetY = this.bodyHeight + 10;

			this.bodyWidth = this.uiScale * this.bodyWidth;
		}
		public loadBloodBarBoard() {
			if (this.hpProgressVisible()) {
				let board = new eui.Image(UIConfig.UIConfig_LeagueWarScene.roleBloodBoard);
				board.anchorOffsetX = 77 / 2;
				board.anchorOffsetY = 6 / 2;
				this.bloodBoard = board;
				this.titleSpace.addChild(this.bloodBoard);
			}
		}
		public barPath;
		public bloodBarWidth
		public bloodBarHeight;
		public loadBloodBarProgress(path) {
			if (this.hpProgressVisible()) {
				let bar = new eui.Image(path);
				bar.addEventListener(egret.Event.COMPLETE, (e) => {
					///在图片的载入完成事件中获得图片的宽高。
					let img: eui.Image = e.currentTarget;
					//egret.log( "宽度:" + img.width,"高度:" + img.height);
					this.bloodBarWidth = img.width;
					this.bloodBarHeight = img.height;
					// img.anchorOffsetY = img.height / 2;
				}, this);
				this.barPath = path;
				this.bloodBar = bar;
				this.titleSpace.addChild(this.bloodBar);
			}
		}
		public loadBloodBar() {
			this.loadBloodBarBoard();
			this.loadBloodBarProgress(yuan3(this.bEnemy == false, UIConfig.UIConfig_LeagueWarScene.roleBloodMyBar, UIConfig.UIConfig_LeagueWarScene.roleBloodEnemyBar));
		}
		//头顶称号ui_wonderland_BurHunterBlood_png
		public loadDesignation() {
			if (this.playerInfo == null) {
				return;
			}
			// else if (this.playerInfo.titleId == null) {
			// 	return;
			// }
			let pathPic = null;
			let pathBG = "";
			let scale = 0.8;
			// 暂时无称号逻辑，称号显示执照的N星猎人图标
			// let titleId = this.playerInfo.titleId;
			// if(titleId){// 称号图片
			// 	let table = TableItemTitle.Item(this.playerInfo.titleId);
			// 	pathPic = table ? table.logo : null;
			// }

			if (!pathPic) {// l猎人星级图片
				let licencelevel = this.playerInfo.licenceLevel;
				pathPic = `ui_license_examination_WordsTitle${licencelevel}_png`;
				if (licencelevel == 0) {
					pathBG = "";//UIConfig.UIConfig_Task.board[2];
					pathPic = "ui_title_titlebig_titlebig1_png";
					scale = 1;
				} else if (licencelevel > CommonConfig.licence_max_level) {
					pathBG = UIConfig.UIConfig_Task.board[3];
				} else {
					pathBG = UIConfig.UIConfig_Task.board[1];
				}
			}
			// let table = TableItemTitle.Item(this.playerInfo.titleId);
			// let path = table ? table.logo : null;
			// if (path == "" || path == null) {
			// 	return;
			// }
			// 如果玩家猎人星级为0，则显示新手猎人
			if (!this.designation) {
				this.designation = new eui.Group();
				this.designation.width = 160;
				this.designation.height = 62;
				this.designation.anchorOffsetX = this.designation.width / 2;
				this.designation.anchorOffsetY = this.designation.height / 2;
			}

			if (!this.titleBG) {
				this.titleBG = new eui.Image();// 称号底图
				this.titleBG.horizontalCenter = "0";
				this.titleBG.verticalCenter = "0";
				this.designation.addChild(this.titleBG);
			}
			this.titleBG.source = pathBG;

			if (!this.titlePic) {
				this.titlePic = new eui.Image();
				this.titlePic.addEventListener(egret.Event.COMPLETE, (e) => {
					this.setTitlePos(0, 0);
				}, this);
				this.titlePic.horizontalCenter = "0";
				this.titlePic.verticalCenter = "0";
				this.designation.addChild(this.titlePic);
			}
			this.titlePic.scaleX = this.titlePic.scaleY = scale;
			this.titlePic.source = pathPic;

			// let designation = new eui.Image(pathPic);
			// designation.addEventListener(egret.Event.COMPLETE, (e) => {
			// 	///在图片的载入完成事件中获得图片的宽高。
			// 	let img: eui.Image = e.currentTarget;
			// 	//egret.log( "宽度:" + img.width,"高度:" + img.height);
			// 	img.anchorOffsetX = img.width / 2;
			// 	img.anchorOffsetY = img.height / 2;
			// 	this.setTitlePos(0, 0);
			// }, this);
			// this.designation = designation;
			this.titleSpace.addChild(this.designation);
		}
		//脚底光环
		public loadAura() {
			if (this.auraBack) {
				this.nodeNormal.removeChild(this.auraBack);
				this.auraBack = null;
			}
			if (this.auraFront) {
				this.nodeNormal.removeChild(this.auraFront);
				this.auraFront = null;
			}
			if (this.playerInfo == null || this.playerInfo.haloId == null) {
				return;
			}
			//光环 是否生效
			if ((this.curScene.sceneType != message.ESceneType.SCENE_TYPE_WONDERLAND && this.curScene.sceneType != message.ESceneType.SCENE_TYPE_DARKLAND) ||
				this.playerInfo.haloId == 0 || !TableHalo.Item(this.playerInfo.haloId)) {
				return;
			}
			let haloTbl = TableHalo.Item(this.playerInfo.haloId);
			let auraCssIdFront = haloTbl.halo_front_aniId;
			let auraCssIdBack = haloTbl.halo_back_aniId;
			if (auraCssIdFront != null) {
				let ccitem = TableClientAniUi.Item(auraCssIdFront);
				let item = TableClientAniCssSource.Item(ccitem.css_id);
				let name = item.name + "_" + item.number;
				Game.DragonBonesManager.playAnimation(this, name, null, ccitem.index, 0).then((display) => {
					this.auraFront = display
					this.nodeNormal.addChildAt(this.auraFront, 1);
				});
			}
			if (auraCssIdBack != null) {
				let ccitem = TableClientAniUi.Item(auraCssIdBack);
				let item = TableClientAniCssSource.Item(ccitem.css_id);
				let name = item.name + "_" + item.number;
				Game.DragonBonesManager.playAnimation(this, name, null, ccitem.index, 0).then((display) => {
					this.auraBack = display
					this.nodeNormal.addChildAt(this.auraBack, 0);
				});
			}
		}
		public flashBarTexture(path) {
			if (this.barPath != path && this.bloodBar != null) {
				this.barPath = path;
				let rt = { width: this.bloodBar.width, height: this.bloodBar.height };
				this.bloodBar.source = path;
				this.bloodBar.width = rt.width;
				this.bloodBar.height = rt.height;
			}
		}
		public progressBarWidth;
		public progressBarHeight;
		public loadProgressBar() {
			if (this.hpProgressVisible()) {
				let board = new eui.Image(UIConfig.UIConfig_LeagueWarScene.roleProgressBoard);
				board.anchorOffsetX = 77 / 2;
				board.anchorOffsetY = 6 / 2;
				board.visible = false;
				this.progressBoard = board;
				this.titleSpace.addChild(this.progressBoard);

				let bar = new eui.Image(UIConfig.UIConfig_LeagueWarScene.roleBuildProgressBar);
				bar.anchorOffsetX = 77 / 2;
				bar.anchorOffsetY = 6 / 2;
				bar.visible = false;
				this.progressBarWidth = bar.width;
				this.progressBarHeight = bar.height;
				this.progressBar = bar;
				this.titleSpace.addChild(this.progressBar);
			}
		}
		public hpProgressVisible() {
			return !this.curScene.isMainCity;
		}
		public loadNameBoard() {
			let pic = new eui.Image(UIConfig.UIConfig_LeagueWarScene.sceneNameBoard);
			pic.anchorOffsetX = 158 / 2;
			pic.anchorOffsetY = 27 / 2;

			this.nameBoard = pic;
			this.titleSpace.addChild(this.nameBoard);
		}
		public loadNameTitle() {
			this.cacheName = this.name;
			this.ttfName = new eui.Label("Lv" + this.playerInfo.level + " " + this.name);
			this.ttfName.size = 20;
			this.ttfName.bold = true;
			let _color = this.getNameColor();
			this.nameColor = _color;
			this.ttfName.textColor = _color;
			this.ttfName.anchorOffsetY = this.ttfName.height / 2;
			this.titleSpace.addChild(this.ttfName);
			this.setNameStroke(this.ttfName);
		}
		public getNameColor() {
			return 0x000000;
		}
		public setNameStroke(lbName: eui.Label) {
			lbName.strokeColor = ConstantConfig_Common.Color.wonderland_color.stroke;
			lbName.stroke = 1;
		}
		public loadLvTitle() {
			this.cacheLv = this.playerInfo.level;
			let _text = "";//Lv" + this.playerInfo.level;
			this.ttfLv = new eui.Label(_text);
			this.ttfLv.size = 20;
			this.ttfLv.bold = true;
			this.ttfLv.textColor = this.getNameColor();//ConstantConfig_Common.Color.white;
			this.ttfLv.anchorOffsetY = this.ttfLv.height / 2;
			this.titleSpace.addChild(this.ttfLv);
			this.setNameStroke(this.ttfLv);
		}
		public loadLeagueBoard() {
			let path = null;
			if (Gmgr.Instance.layerId == TableEnumLayerId.LAYER_WONDERLAND || Gmgr.Instance.layerId == TableEnumLayerId.LAYER_DARKLAND) {
				path = UIConfig.UIConfig_LeagueWarScene.sceneNameBoard;
			} else {
				path = yuan3(this.ePosition == TableEnum.TablePositionType.POSITION_LEFT, "", "")//UIConfig.UIConfig_LeagueWarScene.leftLeagueNameBoard
			}
			let board = new eui.Image(path);
			board.addEventListener(egret.Event.COMPLETE, (e) => {
				///在图片的载入完成事件中获得图片的宽高。
				let img: eui.Image = e.currentTarget;
				//egret.log( "宽度:" + img.width,"高度:" + img.height);
				img.anchorOffsetX = img.width / 2;
				img.anchorOffsetY = img.height / 2;
			}, this);
			this.leagueBoard = board;
			this.titleSpace.addChild(this.leagueBoard);
		}
		private getttfLeagueName(): eui.Label{
			let ttfLeagueName = new eui.Label(this.playerInfo.leagueName);
			ttfLeagueName.size = 20;
			ttfLeagueName.bold = true;
			ttfLeagueName.textColor = ConstantConfig_Common.Color.rpg_color.league_title_color;
			ttfLeagueName.anchorOffsetY = ttfLeagueName.height / 2;
			this.setNameStroke(ttfLeagueName);
			return ttfLeagueName;
		}
		public reloadLeagueNameTitle(){
			if (this.ttfLeagueName) {
				if (this.ttfLeagueName.parent) {
					this.ttfLeagueName.parent.removeChild(this.ttfLeagueName);
				}
				this.ttfLeagueName = null;
			}
			if (this.leagueStar) {
				if (this.leagueStar.parent) {
					this.leagueStar.parent.removeChild(this.leagueStar);
				}
				this.leagueStar = null;
			}
			if (this.playerInfo.leagueId == 0) {
				return;
			}
			this.ttfLeagueName = this.getttfLeagueName();
			this.titleSpace.addChild(this.ttfLeagueName);

			egret.setTimeout(()=>{
				this.setTitlePos(0, 0);
			}, this, 50);
		}
		public loadLeagueNameTitle() {
			if (this.playerInfo.leagueId == 0) {
				return;
			}
			this.ttfLeagueName = this.getttfLeagueName();
			this.titleSpace.addChild(this.ttfLeagueName);

			if (this.playerInfo.matchScore == null) {
				return;
			}
			let starPath = Helper.GetSegmentStar(this.playerInfo.matchScore, null);
			if (starPath == null) {
				return;
			}
			let leagueStar = new eui.Image(starPath);
			leagueStar.addEventListener(egret.Event.COMPLETE, (e) => {
				///在图片的载入完成事件中获得图片的宽高。
				let img: eui.Image = e.currentTarget;
				//egret.log( "宽度:" + img.width,"高度:" + img.height);
				img.anchorOffsetX = img.width;
				img.anchorOffsetY = img.height / 2;
			}, this);
			leagueStar.scaleX = leagueStar.scaleY = 0.45;
			this.leagueStar = leagueStar;
			this.titleSpace.addChild(this.leagueStar);
		}
		public loadGroupNameTitle() {
			if (this.playerInfo.group_name == "" || this.curScene.sceneType != message.ESceneType.SCENE_TYPE_DARKLAND) {
				return;
			}
			let groupStr = Helper.StringFormat(TextsConfig.TextsConfig_Login.serverDesSimple, singLecraft.decodeGroupName(this.playerInfo.group_name, "&", false), singLecraft.decodeGroupName(this.playerInfo.group_name, "&", true));
			this.ttfGroupName = new eui.Label(groupStr);
			this.ttfGroupName.size = 20;
			this.ttfGroupName.bold = true;
			this.ttfGroupName.textColor = ConstantConfig_Common.Color.rpg_color.league_title_color;
			this.ttfGroupName.anchorOffsetX = this.ttfGroupName.width / 2;
			this.ttfGroupName.anchorOffsetY = this.ttfGroupName.height / 2;
			this.titleSpace.addChild(this.ttfGroupName);
		}
		public loadLeagueTitle(id) {
			if (this.memberInfo == null) {
				return;
			}
			let officalId = this.memberInfo.officialId;
			this.cacheOfficialId = officalId;
			this.ttfOffical = null;

			if (officalId <= message.ELeagueOfficial.LEAGUE_OFFICIAL_NORMAL || officalId >= message.ELeagueOfficial.LEAGUE_OFFICIAL_END) {
				return;
			}
			this.ttfOffical = new eui.Label(TextsConfig.TextConfig_League.officalName[officalId]);
			this.ttfOffical.size = 20;
			this.ttfOffical.bold = true;
			this.ttfOffical.textColor = ConstantConfig_Common.Color.league_color.offical_color[officalId];
			this.ttfOffical.anchorOffsetY = this.ttfOffical.height / 2;
			this.titleSpace.addChild(this.ttfOffical);
		}
		public loadStorageSpx() {

			let name = UIConfig.UIConfig_CommonBattleCss.json_xuli;
			let [armature] = HunterSpineX(name, 1, null, TableClientAniSpxSource.Item(name).name);
			armature.setVisibleSpx(false);
			this.nodeEffect.addChild(armature.spine);
			armature.spine.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationTimeEvent, this);
			this.storageSpx = armature;
		}
		private animationTimeEvent() {
			this.storageSpx.spine.removeDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.animationTimeEvent, this);
			this.storageSpx.clearSpine();
			this.storageSpx = null;
		}
		public Update(tick) {
			this.updateZone();
			this.updateSpineX(tick);
			this.updateEndBody();
			this.procPlayerBuff(tick);
			this.procState(tick);
			// //this.procResafeEffect();
			// this.updateSceneBuff(tick);
		}
		public endWillFight() {
			this.bWillFight = false;
		}
		public bWillFight;
		public posState;
		public setSceneHpPercent(hpPercent, recoveryHp) {
			this.lastHpPercent = this.sceneHpPercent;
			//this.sceneHpPercent = hpPercent * 100;
			this.sceneHpPercent = recoveryHp * 100;
			this.destHpPercent = hpPercent * 100;
			this.recoveryHpProgress = (hpPercent - recoveryHp) * 100 / 20;

			if (Gmgr.Instance.bInLoading == false) {
				if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_BATTLE
					|| this.posState == message.ESceneItemState.SCENE_ITEM_STATE_BATTLED
					|| this.posState == message.ESceneItemState.SCENE_ITEM_STATE_DEAD
					|| this.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE) {
					this.showHp = this.lastHpPercent;
					this.bWillFight = true;

					if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_BATTLE) {
						if (this.sceneHpPercent > 0) {
							this.showHpMaxFrame = ConstantConfig_RoleBattle.FIGHT_SCENE_SHOW_MAX_NUM;
						} else {
							this.showHpMaxFrame = ConstantConfig_RoleBattle.FIGHT_SCENE_SHOW_MAX_NUM + 1;
						}
					} else if (this.posState == message.ESceneItemState.SCENE_ITEM_STATE_BATTLED || this.posState == message.ESceneItemState.SCENE_ITEM_STATE_DEAD || this.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE) {
						this.showHpMaxFrame = ConstantConfig_RoleBattle.FIGHT_SCENE_SHOW_MAX_NUM + 1;
					}
				} else {
					this.bWillFight = false;
					this.showHp = this.sceneHpPercent;
				}
			}
		}
		public setInvincibleTime(time) {
			this.invincibleTime = time * 1000;
		}
		public setDieProtectTime(time) {
			this.dieProtectTime = time * 1000;
		}
		public setFasterTime(time) {
			this.fasterTime = time * 1000;
		}
		public setFrozenTime(time) {
			this.frozenTime = time * 1000;
		}
		public setAddBloodLeftTime(time) {
			this.addBloodLeftTime = time * 1000;
		}
		public setAddSpeedLeftTime(time) {
			this.addSpeedLeftTime = time * 1000;
		}
		public setControlBuild(buildId) {
			this.controlBuildId = buildId;
		}
		//复活动画
		public createDeadCss(x, y, cb) {

		}
		public reSafe() {
			let tmp = function () {

			}
			this.changeState(TableEnum.TableEnumBaseState.State_None);
			this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_GetUp);
			this.createDeadCss(this.x, this.y, tmp);
		}
		public isFightShowing() {
			let tag = true;
			if (this.otherState == TableEnum.TableEnumOtherState.OtherState_None ||
				this.otherState == TableEnum.TableEnumOtherState.OtherState_Die ||
				this.otherState == TableEnum.TableEnumOtherState.OtherState_GetUp) {
				tag = false;
			}
			return tag;
		}
		public procPlayerBuff(tick) {
			let i = 0;
			while (i < this.tablePlayerBuffs.length) {
				let tBuff = this.tablePlayerBuffs[i]
				let bFinish = tBuff.getIsFinish();
				if (bFinish == true) {
					this.deleteBuff(i);
				} else {
					tBuff.update(tick);
					i = i + 1;
				}
			}
		}
		public newBuff(buff_type, buff_time, buff_value) {
			//生成此类buff
		}
		public deleteBuff(index) {

		}
		public procOtherCurve(tick) {
			return false;
		}
		public procState(tick) {
			let tag;
			if (this.state == TableEnum.TableEnumBaseState.State_None) {
				tag = this.procStateNone(tick);
			} else if (this.state == TableEnum.TableEnumBaseState.State_Walk) {
				this.updateTargetWalk();
				this.updatePathWalk();
				tag = this.procStateWalk(tick);
			}
			this.procActId();

			if (this.otherState == TableEnum.TableEnumOtherState.OtherState_Appear) {
				this.procOtherNone(tick);
			} else if (this.otherState == TableEnum.TableEnumOtherState.OtherState_Curve) {
				this.procOtherAppear(tick);
			} else if (this.otherState == TableEnum.TableEnumOtherState.OtherState_Curve) {
				this.procOtherCurve(tick);
			} else if (this.otherState == TableEnum.TableEnumOtherState.OtherState_Hurt) {
				this.procOtherHurt(tick);
			} else if (this.otherState == TableEnum.TableEnumOtherState.OtherState_StirUp) {
				this.procOtherStirUp(tick);
			} else if (this.otherState == TableEnum.TableEnumOtherState.OtherState_StirDown) {
				this.procOtherStirDown(tick);
			} else if (this.otherState == TableEnum.TableEnumOtherState.OtherState_FallDown) {
				this.procOtherFallDown(tick);
			} else if (this.otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
				this.procOtherDie(tick);
			} else if (this.otherState == TableEnum.TableEnumOtherState.OtherState_GetUp) {
				this.procOtherGetUp(tick);
			} else if (this.otherState == TableEnum.TableEnumOtherState.OtherState_FightShowAtk) {
				this.procOtherFightShow(tick);
			} else if (this.otherState == TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk) {
				this.procOtherFightShow(tick);
			} else if (this.otherState == TableEnum.TableEnumOtherState.OtherState_Attack) {
				this.procCurSkill(tick);
			}
			this.procActId();
		}
		public procCurSkill(tick) {

		}
		public procStateNone(tick) {
			false;
		}
		public faster_ratio;
		public procStateWalk(tick) {
			let rt = 0.03 * 1000//tick * 1000;
			let ratio_x = 0;
			let ratio_y = 0;
			if (this.walkDir == TableEnum.EnumDepthDir.Dir_Left_Up) {
				ratio_x = -1;
				ratio_y = -1;
			} else if (this.walkDir == TableEnum.EnumDepthDir.Dir_Left_Down) {
				ratio_x = -1;
				ratio_y = 1;
			} else if (this.walkDir == TableEnum.EnumDepthDir.Dir_Right_Up) {
				ratio_x = 1;
				ratio_y = -1;
			} else if (this.walkDir == TableEnum.EnumDepthDir.Dir_Right_Down) {
				ratio_x = 1;
				ratio_y = 1;
			} else if (this.walkDir == TableEnum.EnumDepthDir.Dir_Down) {
				ratio_y = 1;
			} else if (this.walkDir == TableEnum.EnumDepthDir.Dir_Up) {
				ratio_y = -1;
			} else if (this.walkDir == TableEnum.EnumDepthDir.Dir_Left) {
				ratio_x = -1;
			} else if (this.walkDir == TableEnum.EnumDepthDir.Dir_Right) {
				ratio_x = 1;
			}

			let bseSpeed = 1;             //基本速度
			let auraSpeed = 0;           // 光环加成速度
			let fastSpeed = yuan3(this.fasterTime > 0, ConstantConfig_RoleBattle.FASTER_SPEED_PROMOTE_PERCENT - bseSpeed, 0);

			if ((this.playerInfo.haloId != null) && (this.playerInfo.haloId != 0 && PlayerVIPSystem.HaloItem(this.playerInfo.haloId) != null) &&
				(this.curScene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND || this.curScene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND)) {
				auraSpeed = PlayerVIPSystem.HaloItem(this.playerInfo.haloId).scene_speed_add;
			}
			let totalSpeed = bseSpeed + auraSpeed + fastSpeed;
			this.faster_ratio = totalSpeed;
			this.moveMap(this.moveSpeedX * ratio_x * rt * this.faster_ratio, this.moveSpeedY * ratio_y * rt * this.faster_ratio);
			this.setPos(this.x, this.y);
			return false;
		}
		public procOtherNone(tick) {

		}
		public stirUpSpeed;
		public stirSpeedX;
		public procOtherStirUp(tick) {
			let rt = tick * 1000;
			let distance = 0;
			distance = this.stirUpSpeed * rt;
			this.moveMap(0, distance)
			this.stirUpSpeed = this.stirUpSpeed - ConstantConfig_RoleBattle.GRAVITY * rt;
			if (this.stirUpSpeed <= 0) {
				this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_StirDown)
				this.stirUpSpeed = 0;
			}
			this.setPosY(this.y);
			if (this.dir == TableEnum.TableEnumDir.Dir_Right) {
				distance = -this.stirSpeedX * rt;
			} else {
				distance = this.stirSpeedX * rt;
			}
			this.moveMap(distance, 0);
			this.setPosX(this.x);
			return false;
		}
		public procOtherStirDown(tick) {
			let rt = tick * 1000;
			let distance = 0;
			distance = this.stirUpSpeed * rt;
			this.moveMap(0, -distance);
			if (parseInt(this.y) >= parseInt(this.showY)) {
				this.y = this.showY;
				this.stirUpSpeed = this.stirUpSpeed * ConstantConfig_RoleBattle.STIR_UP_RATIO_SPEC;
				this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_FallDown);
				this.setPosY(this.y);
				return true;
			}
			this.setPosY(this.y);
			this.stirUpSpeed = this.stirUpSpeed + ConstantConfig_RoleBattle.GRAVITY * rt;

			if (this.dir == TableEnum.TableEnumDir.Dir_Right) {
				distance = -this.stirSpeedX * rt;
			} else {
				distance = this.stirSpeedX * rt;
			}
			this.moveMap(distance, 0);
			this.setPosX(this.x);
			return false;
		}
		public procOtherFallDown(tick) {
			let rt = tick * 1000;
			let distance = 0;
			if (this.body != null && this.isBodyActEnd() == true) {
				this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Die);
			}
			return false;
		}
		public procOtherDie(tick) {
			if (this.body == null) {
				return true;
			}
			let bEnd = this.isBodyActEnd();
			if (bEnd == true) {
				if (this.dieCB != null) {
					this.dieCB();
					this.dieCB = null;
				}
			}
			return false;
		}
		public procDieProtect(tick) {
			let rt = tick * 1000;
			if (this.dieProtectTime != 0) {
				this.dieProtectTime = this.dieProtectTime - rt;
				if (this.dieProtectTime <= 0) {
					this.dieProtectTime = 0;
				}
			}
			if (this.otherState == TableEnum.TableEnumOtherState.OtherState_Die && this.posState == message.ESceneItemState.SCENE_ITEM_STATE_RELIVE) {
				this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_GetUp);
			}
		}
		public procFastTime(tick) {
			let rt = tick * 1000;
			this.fasterTime = this.fasterTime - rt;
			if (this.fasterTime <= 0) {
				this.fasterTime = 0;
			}
		}
		public procFrozenTime(tick) {
			let rt = tick * 1000;
			this.frozenTime = this.frozenTime - rt;
			if (this.frozenTime <= 0) {
				this.frozenTime = 0;
			}
			if (this.otherState == TableEnum.TableEnumOtherState.OtherState_None && this.frozenTime > 0 && (this.tableSceneBuffs[TableEnum.Enum.SceneBuffType.Frozen] == null || (this.tableSceneBuffs[TableEnum.Enum.SceneBuffType.Frozen] != null && this.tableSceneBuffs[TableEnum.Enum.SceneBuffType.Frozen].finish == true))) {
				this.addSceneBuff(TableEnum.Enum.SceneBuffType.Frozen, this.frozenTime);
			}
		}
		public endFrozen() {
			if ((this.tableSceneBuffs[TableEnum.Enum.SceneBuffType.Frozen] != null && this.tableSceneBuffs[TableEnum.Enum.SceneBuffType.Frozen].finish == false)) {
				this.tableSceneBuffs[TableEnum.Enum.SceneBuffType.Frozen].continueTime = 0
				this.tableSceneBuffs[TableEnum.Enum.SceneBuffType.Frozen].finish = true
				this.tableSceneBuffs[TableEnum.Enum.SceneBuffType.Frozen].spx.setVisible(false);
			}
		}
		public procInvincibleTime(tick) {
			let rt = tick * 1000;
			this.invincibleTime = this.invincibleTime - rt;
			if (this.invincibleTime <= 0) {
				this.invincibleTime = 0;
			}
			if (this.otherState != TableEnum.TableEnumOtherState.OtherState_Die && this.dieProtectTime <= 0 && this.invincibleTime > 0 && (this.tableSceneBuffs[TableEnum.Enum.SceneBuffType.Invincible] == null || (this.tableSceneBuffs[TableEnum.Enum.SceneBuffType.Invincible] != null && this.tableSceneBuffs[TableEnum.Enum.SceneBuffType.Invincible].finish == true))) {
				this.addSceneBuff(TableEnum.Enum.SceneBuffType.Invincible, this.invincibleTime);
			}
		}
		public procCooling(tick) {
			let rt = tick * 1000;
			this.addBloodLeftTime = this.addBloodLeftTime - rt;
			if (this.addBloodLeftTime <= 0) {
				this.addBloodLeftTime = 0;
			}
			this.addSpeedLeftTime = this.addSpeedLeftTime - rt;
			if (this.addSpeedLeftTime <= 0) {
				this.addSpeedLeftTime = 0;
			}
		}
		public controlMaxFrame;
		public controlType;
		public dealProgress() {
			if (this.controlBuildId > 0 && this.bProgressing == false) {
				this.bProgressing = true;
				this.controlFrame = 0;
				//if(this.curScene.sceneType == message.ESceneType.SCENE_TYPE_LEAGUE_WAR){

				if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND || this.curScene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
					if (this.curScene.tableTrees[this.controlBuildId] != null) {
						let preTime = this.curScene.tableTrees[this.controlBuildId].info.collection_time * 1000;
						let reduceTime = Adviserdb.PassiveGrassTime(this.scenePosInfo.roleBase.petInfo) * 1000;
						let actualTime = (preTime - reduceTime) > 0 && (preTime - reduceTime) || 0;
						this.controlMaxFrame = actualTime - 500;
					} else {
						this.controlMaxFrame = ConstantConfig_RoleBattle.CONTROL_BUILD_MAX_TIME;
					}
					this.controlType = TableEnum.Enum.RpgControlType.Tree;
					if (this.progressBar != null) {
						this.progressBar.source = UIConfig.UIConfig_LeagueWarScene.roleCollectProgressBar;
					}
				}
				this.startControl();
				this.resetMoveNet();
			}
			if (this.bProgressing == true && this.otherState != TableEnum.TableEnumOtherState.OtherState_None) {
				this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None);
			}
			if (this.bProgressing == true && this.controlBuildId == 0) {
				this.endProgress();
			}
		}
		public startControl() {

		}
		public resetMoveNet() {

		}
		public endProgress() {
			let b_break = false;
			if (this.bProgressing == true) {
				this.bProgressing = false;
				this.endControl();
				b_break = true;
			}
			return b_break;
		}
		public endControl() {

		}
		public procProgress(tick) {
			if (this.bProgressing == true) {
				let rt = tick * 1000;
				this.controlFrame = this.controlFrame + rt;
				if (this.controlFrame >= this.controlMaxFrame) {
					this.controlFrame = this.controlFrame - this.controlMaxFrame;
					if (this.curScene.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND ||
						this.curScene.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
						this.endProgress();
					}
				}
				if (this.progressBar) {
					this.progressBar.width = this.controlFrame * this.progressBarWidth / this.controlMaxFrame;
					this.progressBar.height = this.progressBarHeight;
				}
			}
		}
		public procOtherAppear(tick) {
			let rt = tick * 1000;
			if (this.body != null && this.isBodyActEnd() == true) {
				this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None);
			}
			return false;
		}
		public procOtherHurt(tick) {
			let rt = tick * 1000;
			if (this.body != null && this.isBodyActEnd() == true) {
				this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None);
			}
			return false
		}
		public procOtherGetUp(tick) {
			if (this.body == null) {
				return true;
			}
			let bEnd = this.isBodyActEnd();
			if (bEnd == true) {
				this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None);
			}
			return false;
		}
		public endFightShow() {

		}
		public procOtherFightShow(tick) {
			//攻击者置为0
			//被打者置为20
			if (this.showFrame >= 38) {
				this.showFrame = 0;
				this.showNum = this.showNum + 1;
			}
			let [x, y] = this.getPos();
			if (this.showFrame == 0) {
				this.changeAction(TableEnum.TableEnumOtherState.OtherState_Stand);
			} else if (this.showFrame == 6) {
				this.changeAction(TableEnum.TableEnumBaseState.State_None);
			} else if (this.showFrame == 15) {
				let max = yuan3(this.otherState == TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk && Math.floor(this.sceneHpPercent) > 0, ConstantConfig_RoleBattle.FIGHT_SCENE_SHOW_MAX_NUM + 1, ConstantConfig_RoleBattle.FIGHT_SCENE_SHOW_MAX_NUM);
				if (this.showNum >= max) {
					if (this.sceneHpPercent > 0) {
						this.endFightShow();
					}
				}
			} else if (this.showFrame == 23) {
				this.changeAction(TableEnum.TableEnumOtherState.OtherState_Hurt);
			} else if (this.showFrame == 24) {
				this.showHpCurFrame = this.showHpCurFrame + 1;
				let max = ConstantConfig_RoleBattle.FIGHT_SCENE_SHOW_MAX_NUM;
				if (this.showNum >= max) {
					if (this.sceneHpPercent <= 0) {
						this.showY = this.y;
						this.stirUpSpeed = ConstantConfig_RoleBattle.STIR_UP_AGAIN_SPEED;
						this.stirSpeedX = 0;
						this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_StirUp);

						if (this.showCB != null) {
							this.showCB();
							this.showCB = null;
						}
						if (this.endCB != null) {
							this.endCB();
							this.endCB = null;
						}
					}
				}
			} else if (this.showFrame == 31) {
				this.changeAction(TableEnum.TableEnumBaseState.State_None);
			} else {
				if (this.frameKv[this.showFrame] != null) {
					let dis = yuan3(this.dir == TableEnum.TableEnumDir.Dir_Right, this.frameKv[this.showFrame], -1 * this.frameKv[this.showFrame]);
					this.setPosX(x + dis);
				}
			}
			this.showFrame = this.showFrame + 1;
		}
		public isSelf() {
			if (this.playerInfo && this.playerInfo.id) {
				return this.playerInfo.id == Game.PlayerInfoSystem.RoleID;
			}
			return false;
		}
		public isAgreeEnter() {
			return this.playerInfo && this.playerInfo.agree_enter;
		}
		public setPlayerVisible(visible: boolean) {
			this.nodeRoot.visible = visible && this.isAgreeEnter();
		}
		public isStateWalk() {
			return this.state == TableEnum.TableEnumBaseState.State_Walk;
		}
		public changeState(state) {
			if (this.state != state) {
				this.state = state;
			}
			if (state == TableEnum.TableEnumBaseState.State_None) {
				let aaa;
				Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
			}
		}
		public changeOtherState(otherState) {
			if (this.otherState == otherState) {
				return;
			}
			if (otherState == TableEnum.TableEnumOtherState.OtherState_None) {
				this.changeOtherNone();
			} else if (otherState == TableEnum.TableEnumOtherState.OtherState_Run) {
				this.changeOtherRun();
			} else if (otherState == TableEnum.TableEnumOtherState.OtherState_Appear) {
				this.changeOtherAppear();
			}
			else if (otherState == TableEnum.TableEnumOtherState.OtherState_Curve) {
				this.changeOtherCurve();
			}
			else if (otherState == TableEnum.TableEnumOtherState.OtherState_Hurt) {
				this.changeOtherHurt();
			}
			else if (otherState == TableEnum.TableEnumOtherState.OtherState_StirUp) {
				this.changeOtherStirUp();
			}
			else if (otherState == TableEnum.TableEnumOtherState.OtherState_StirDown) {
				this.changeOtherStirDown();
			}
			else if (otherState == TableEnum.TableEnumOtherState.OtherState_FallDown) {
				this.changeOtherFallDown();
			}
			else if (otherState == TableEnum.TableEnumOtherState.OtherState_Die) {
				this.changeOtherDie();
			}
			else if (otherState == TableEnum.TableEnumOtherState.OtherState_GetUp) {
				this.changeOtherGetUp();
			}
			else if (otherState == TableEnum.TableEnumOtherState.OtherState_FightShowAtk) {
				this.changeOtherFightShowAtk();
			}
			else if (otherState == TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk) {
				this.changeOtherFightShowBeAtk();
			}
			this.otherState = otherState;
		}
		public changeOtherGetUp() {
			this.setActLoop(false);
			if (this.playerPet != null) {
				this.playerPet.changeOtherGetUp();
			}
		}
		public changeOtherNone() {

		}
		public changeOtherRun() {
			this.setActLoop(true);
		}
		public changeOtherAppear() {
			this.setActLoop(false);
		}
		public changeOtherHurt() {
			this.setActLoop(false);
		}
		public changeOtherCurve() {
			this.setActLoop(false);
		}
		public changeOtherStirUp() {
			this.setActLoop(false);
		}
		public changeOtherStirDown() {
			this.setActLoop(false);
		}
		public changeOtherFallDown() {
			this.setActLoop(false);
		}
		public changeOtherDie() {
			this.dieStayMs = ConstantConfig_RoleBattle.FIGHT_SCENE_DIE_STAY_MS;
			this.setActLoop(false);

			if (this.playerPet != null) {
				this.playerPet.changeOtherDie();
			}
		}
		public changeOtherFightShowAtk() {
			if (this.playerPet != null) {
				this.playerPet.changeOtherFightShowAtk();
			}
		}
		public playerPet;
		public changeOtherFightShowBeAtk() {
			if (this.playerPet != null) {
				this.playerPet.changeOtherFightShowAtk();
			}
		}
		public updateTargetWalk() {
			if (this.bRunTarget == false) {
				return;
			}
			let [tmp_x, tmp_y] = this.getTargetPos();
			let [dir, walkDir] = this.judgeDir(tmp_x, tmp_y);
			if (dir != this.dir) {
				this.changeDir(dir);
			}
			this.walkDir = walkDir;
			[tmp_x, tmp_y] = this.getTargetPos();
			if (Math.abs(tmp_x - this.x) <= ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_X && Math.abs(tmp_y - this.y) <= ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_Y) {
				this.bRunTarget = false;
				this.saveDir = TableEnum.TableEnumDir.Dir_None;
				this.walkDir = TableEnum.EnumDepthDir.Dir_None;
				this.changeState(TableEnum.TableEnumBaseState.State_None);
				if (this.targetCB != null) {
					this.targetCB();
				}
			}
		}
		public getTargetPos() {
			return [0, 0];
		}
		public updatePathWalk() {

		}
		public procActId() {
			let actId = this.actionId;
			if (this.otherState != TableEnum.TableEnumOtherState.OtherState_None) {
				if (this.otherState == TableEnum.TableEnumOtherState.OtherState_FightShowAtk || this.otherState == TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk) {
					actId = this.actionId;
				} else {
					actId = this.otherState;
				}
			} else {
				actId = this.state;
			}
			this.changeAction(actId);
		}
		public changeDir(dir) {
			this.dir = dir;
		}
		public changeScale() {
			if (this.body != null) {
				this.body.SetScale(this.scale);
			}
		}
		public getClickDir(point) {
			let dir = this.dir;
			if (point != null) {
				let [screen_x, screen_y] = this.converScreenPos(point);
				if (screen_x > this.x) {
					dir = TableEnum.TableEnumDir.Dir_Right;
				} else if (screen_x < this.x) {
					dir = TableEnum.TableEnumDir.Dir_Left
				}
			}
			return dir;
		}
		public converScreenPos(point) {
			return [0, 0];
		}
		//设置方向
		public judgeDir(x, y) {
			let dir = this.dir;
			let walk_dir = this.walkDir;

			let tmp_x = x;
			let tmp_y = y;

			if ((tmp_x <= this.x && tmp_y >= this.y) && Math.abs(tmp_x - this.x) > ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_X && Math.abs(tmp_y - this.y) > ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_Y) {
				//左下
				walk_dir = TableEnum.EnumDepthDir.Dir_Left_Down;
				dir = TableEnum.TableEnumDir.Dir_Left;
			} else if ((tmp_x <= this.x && tmp_y <= this.y) && Math.abs(tmp_x - this.x) > ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_X && Math.abs(tmp_y - this.y) > ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_Y) {
				//左上
				walk_dir = TableEnum.EnumDepthDir.Dir_Left_Up;
				dir = TableEnum.TableEnumDir.Dir_Left;
			} else if ((tmp_x > this.x && tmp_y >= this.y) && Math.abs(tmp_x - this.x) > ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_X && Math.abs(tmp_y - this.y) > ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_Y) {
				//右下
				walk_dir = TableEnum.EnumDepthDir.Dir_Right_Down;
				dir = TableEnum.TableEnumDir.Dir_Right;
			} else if ((tmp_x > this.x && tmp_y <= this.y) && Math.abs(tmp_x - this.x) > ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_X && Math.abs(tmp_y - this.y) > ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_Y) {
				//右上
				walk_dir = TableEnum.EnumDepthDir.Dir_Right_Up;
				dir = TableEnum.TableEnumDir.Dir_Right;
			} else if (tmp_x <= this.x && Math.abs(tmp_x - this.x) > ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_X) {
				//左
				walk_dir = TableEnum.EnumDepthDir.Dir_Left;
				dir = TableEnum.TableEnumDir.Dir_Left;
			} else if (tmp_x > this.x && Math.abs(tmp_x - this.x) > ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_X) {
				//右
				walk_dir = TableEnum.EnumDepthDir.Dir_Right;
				dir = TableEnum.TableEnumDir.Dir_Right;
			} else if (tmp_y >= this.y && Math.abs(tmp_y - this.y) > ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_Y) {
				//下
				walk_dir = TableEnum.EnumDepthDir.Dir_Down;
			} else if (tmp_y < this.y && Math.abs(tmp_y - this.y) > ConstantConfig_RoleBattle.MOVE_TARGET_LIMIT_Y) {
				//上
				walk_dir = TableEnum.EnumDepthDir.Dir_Up;
			}
			return [dir, walk_dir];
		}
		public moveMap(x, y) {
			let w = UIManager.StageWidth;
			let h = UIManager.StageHeight;
			let HalfScreenWidth = UIManager.StageWidth / 2;
			let HalfScreenHeight = UIManager.StageHeight / ConstantConfig_RoleBattle.VERTICAL_SPLIT_SCREEN * 2;
			let OtherScreenHeight = UIManager.StageHeight - HalfScreenHeight;
			let mapLength = this.curScene.mapWidth;
			let mapHeight = this.curScene.mapHeight;

			if (this.playerState == EnumPlayerState.PLAYER_STATE_LEADER || this.playerState == EnumPlayerState.PLAYER_STATE_FIGHT_LEADER || this.playerState == EnumPlayerState.PLAYER_STATE_ZORK_LEADER) {
				let adaptX = Gmgr.Instance.offsetX + ConstantConfig_RoleBattle.MOVE_DIS_OFFSET_LEADER;
				if (x > 0) {
					if (this.moveDistance >= 0 && this.moveDistance < HalfScreenWidth) {
						if (mapLength > w && this.moveDistance + x > HalfScreenWidth) {
							this.curScene.UpdateMap(this.moveDistance + x - HalfScreenWidth, 0);
							this.x = this.x + (HalfScreenWidth - this.moveDistance);
						} else {
							this.x = this.x + x;
						}
					} else if (this.moveDistance >= HalfScreenWidth && this.moveDistance < mapLength - HalfScreenWidth) {
						if (this.moveDistance + x > mapLength - HalfScreenWidth) {
							this.curScene.UpdateMap(mapLength - HalfScreenWidth - this.moveDistance, 0);
							this.x = this.x + this.moveDistance + x - (mapLength - HalfScreenWidth);
						} else {
							this.curScene.UpdateMap(x, 0);
						}
					} else if (this.moveDistance >= mapLength - HalfScreenWidth) {
						this.x = this.x + x;
						if (this.x >= w - adaptX) {
							this.x = w - adaptX;
						}
					}
				} else if (x < 0) {
					if (this.moveDistance > 0 && this.moveDistance < HalfScreenWidth) {
						this.x = this.x + x;
						if (this.x <= adaptX) {
							this.x = adaptX;
						}
					} else if (this.moveDistance >= HalfScreenWidth && this.moveDistance <= mapLength - HalfScreenWidth) {
						if (this.moveDistance + x < HalfScreenWidth) {
							this.curScene.UpdateMap(-(this.moveDistance - HalfScreenWidth), 0)
							this.x = this.x - (HalfScreenWidth - (this.moveDistance + x));
						} else {
							this.curScene.UpdateMap(x, 0);
						}
					} else if (this.moveDistance > mapLength - HalfScreenWidth && this.moveDistance <= mapLength) {
						if (mapLength > w && this.moveDistance + x < mapLength - HalfScreenWidth) {
							this.curScene.UpdateMap(-(mapLength - HalfScreenWidth - (this.moveDistance + x)), 0);
							this.x = this.x - (this.moveDistance - (mapLength - HalfScreenWidth));
						} else {
							this.x = this.x + x;
						}
					}
				}
				this.moveDistance = this.moveDistance + x;
				if (this.moveDistance <= adaptX) {
					this.moveDistance = adaptX;
				} else if (this.moveDistance >= mapLength - adaptX) {
					this.moveDistance = mapLength - adaptX;
				}
			} else {
				this.x = this.x + x;
			}
			if (this.playerState == EnumPlayerState.PLAYER_STATE_FIGHT_LEADER || this.playerState == EnumPlayerState.PLAYER_STATE_ZORK_LEADER) {
				let adaptY = Gmgr.Instance.offsety + ConstantConfig_RoleBattle.VER_DIS_OFFSET_LEADER;
				if (y > 0) {
					if (this.verDistance + y >= this.curScene.mapMaxCritY - adaptY) {
						y = this.curScene.mapMaxCritY - adaptY - this.verDistance;
					}
					if (this.verDistance >= 0 && this.verDistance < HalfScreenHeight) {
						if (mapHeight > h && this.verDistance + y > HalfScreenHeight) {
							this.curScene.UpdateMap(0, this.verDistance + y - HalfScreenHeight);
							this.y = this.y + (HalfScreenHeight - this.verDistance);
						} else {
							this.y = this.y + y;
						}
					} else if (this.verDistance >= HalfScreenHeight && this.verDistance < mapHeight - OtherScreenHeight) {
						if (this.verDistance + y > mapHeight - OtherScreenHeight) {
							this.curScene.UpdateMap(0, mapHeight - OtherScreenHeight - this.verDistance);
							this.y = this.y + this.verDistance + y - (mapHeight - OtherScreenHeight);
						} else {
							this.curScene.UpdateMap(0, y);
						}
					} else if (this.verDistance >= mapHeight - OtherScreenHeight) {
						this.y = this.y + y;
						if (this.y >= h - adaptY) {
							this.y = h - adaptY;
						}
					}
				} else if (y < 0) {
					if (this.verDistance + y <= this.curScene.mapMinCritY - adaptY) {
						y = this.curScene.mapMinCritY - adaptY - this.verDistance;
					}
					if (this.verDistance > 0 && this.verDistance < HalfScreenHeight) {
						this.y = this.y + y;
						if (this.y <= adaptY) {
							this.y = adaptY;
						}
					} else if (this.verDistance >= HalfScreenHeight && this.verDistance <= mapHeight - OtherScreenHeight) {
						if (this.verDistance + y < HalfScreenHeight) {
							this.curScene.UpdateMap(0, - (this.verDistance - HalfScreenHeight));
							this.y = this.y - (HalfScreenHeight - (this.verDistance + y));
						} else {
							this.curScene.UpdateMap(0, y);
						}
					} else if (this.verDistance > mapHeight - OtherScreenHeight && this.verDistance <= mapHeight) {
						if (mapHeight > h && this.verDistance + y < mapHeight - OtherScreenHeight) {
							this.curScene.UpdateMap(0, -(mapHeight - OtherScreenHeight - (this.verDistance + y)));
							this.y = this.y - (this.verDistance - (mapHeight - OtherScreenHeight));
						} else {
							this.y = this.y + y;
						}
					}
				}
				this.verDistance = this.verDistance + y;
			} else if (this.playerState == EnumPlayerState.PLAYER_STATE_FIGHT_OTHER || this.playerState == EnumPlayerState.PLAYER_STATE_ZORK_OTHER) {
				this.y = this.y + y;
				if (this.y + (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y) >= this.curScene.mapMaxCritY) {
					this.y = this.curScene.mapMaxCritY - (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);
				}
				if (this.y + (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y) <= this.curScene.mapMinCritY) {
					this.y = this.curScene.mapMinCritY - (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);
				}
			} else {
				//y值的移动不会影响地图的移动
				this.y = this.y + y;
				if (this.y >= this.curScene.mapMaxCritY) {
					this.y = this.curScene.mapMaxCritY;
				} else if (this.y <= this.curScene.mapMinCritY) {
					this.y = this.curScene.mapMinCritY;
				}
				this.verDistance = this.y;
			}
		}
		public startTarget(x, y, cb) {
			this.setTargetCB(cb);
			this.setTargetPos(x, y);
			let [dir, walkDir] = this.judgeDir(x, y);
			this.walkDir = walkDir;
			this.changeDir(dir);
			this.changeState(TableEnum.TableEnumBaseState.State_Walk);
			this.setActLoop(true);
			this.bRunTarget = true;
		}
		public changeScaleX(scaleX) {
			if (this.body != null) {
				this.body.setScaleX(scaleX);
			}
		}
		public lastDir;
		public changeAction(actionId) {
			if (this.actionId == actionId && this.lastDir == this.dir) {
				return;
			}
			if (this.playerState == EnumPlayerState.PLAYER_STATE_BOSS) {

			}
			this.actionId = actionId;
			this.lastDir = this.dir;
			if (this.actionId < ConstantConfig_RoleBattle.BODY_ACTION_CUT) {
				this.actionLastId = actionId + this.dir;
			}
			if (this.body != null) {
				this.bBodyActEnd = false;
				let bFlipX = yuan3(this.dir == TableEnum.TableEnumDir.Dir_Right, false, true);
				this.setFlipX(bFlipX);
				this.body.SetLoop(this.bActLoop);
				this.body.ChangeAction(actionId);
			}
		}
		public setPlayerState(playerState) {
			this.playerState = playerState;
		}
		public setMemberInfo(memberInfo) {
			this.memberInfo = memberInfo;
		}
		public setPlayerInfo(playerInfo) {
			this.playerInfo = playerInfo;
			if (!this.isSelf()) {
				let scene = StageSceneManager.Instance.GetCurScene();
				if(scene.isMainCity){
					this.setPlayerVisible(Game.PlayerInfoSystem.getIsLookOtherPlayer() && Game.PlayerInfoSystem.IsAgreeEnter);
				} else {
					this.setPlayerVisible(true);
				}
			}
		}
		public setPositionType(eType) {
			this.ePosition = eType;
		}
		public setIsEnemy(tag) {
			this.bEnemy = tag;
		}
		public joinView() {
			this.bInView = true;
			if (this.bHidden == true) {
				return;
			}
			this.setObjectVisible(true);
		}
		public leaveView() {
			this.bInView = false;
			this.setObjectVisible(false);
			if (this.commonLedAni != null) {
				this.commonLedAni.setVisibleSpx(false);
			}
			this.leaveControl();
			this.changeOtherState(TableEnum.TableEnumOtherState.OtherState_None);
		}
		public leaveControl() {

		}
		//设置是否翻转
		public setFlipX(flip) {
			if (this.body != null) {
				this.body.setFlipX(flip);
			}
		}
		public setObjectVisible(tag) {
			if (this.nodePos != null) {
				this.nodePos.visible = tag;
				console.log("**************************************************:" + tag);

			}
		}
		public setVisible(tag) {
			this.bVisible = tag;
			this.setObjectVisible(tag);
		}
		public setHidden(tag) {
			this.bHidden = tag;
			this.setObjectVisible(tag);
		}
		public updateZone() {
			let tag = false;
			if (this.x + this.bodyWidth / 2 >= 0 && this.y + this.bodyHeight >= 0 && this.x - this.bodyWidth / 2 <= UIManager.StageWidth && this.y <= UIManager.StageHeight) {
				tag = true;
			}
			this.bInZone = tag;
			if (this.bHidden == true) {
				return;
			}
			if (tag == false && this.bVisible == true) {
				this.setVisible(false);
			} else if (tag == true && this.bVisible == false) {
				this.setVisible(true);
			}
		}
		public setTrans(trans) {
			if (this.trans == trans) {
				return;
			}
			this.trans = trans;
			if (this.body != null) {
				this.body.setOpacity(trans);
			}
		}
		public setActLoop(bLoop) {
			this.bActLoop = bLoop;
		}
		public floor;
		public setFloor(h) {
			this.floor = h;
		}
		public setPosX(x) {
			this.setPos(x, this.y);
		}
		public setPosY(y) {
			this.setPos(this.x, this.y);
		}
		public setPos(x, y) {
			// y = UIManager.StageHeight - Math.abs(UIManager.StageHeight - y);
			this.x = x;
			this.y = y;
			this.nodePos.x = x;
			this.nodePos.y = y;
		}
		public setOffX(offx: number) {
			this.setPosX(this.x + offx);
		}
		public fpMoveDistance;
		public fpVerDistance;
		public setRecPetFpPos(dir, x, y) {
			this.fp_dir = dir
			this.fpX = x
			this.fpY = y

			this.fpMoveDistance = this.curScene.playerLeader.moveDistance;
			this.fpVerDistance = this.curScene.playerLeader.verDistance;
		}
		public setRoot(x, y) {
			this.setPos(x, y);
			this.setBodyPos(0, 0);
			this.setTitlePos(0, 0);
		}
		public setTargetPos(x, y) {
			this.targetPos = new egret.Point(x, y);
		}
		public setBodyPos(x, y) {
			if (this.body != null) {
				this.body.SetPosition(x, y);
			}
			if (this.auraFront != null && this.body != null) {
				// this.auraBack:setZOrder(0)
				// this.body:setZOrder(1)
				// this.auraFront:setZOrder(2)
			}
		}
		public setTitlePos(x, y) {
			let w1 = 0;
			let w2 = 0;
			let w3 = 0;
			let w4 = 0;
			let _x = x + this.aniUpOffsetX;
			let _y = y + this.aniUpOffsetY;

			if (this.ttfName != null) {
				w1 = this.ttfName.width;
			}
			if (this.ttfOffical != null) {
				w2 = this.ttfOffical.width;
			}
			let dis = (w1 + w2 + ConstantConfig_LeagueHome.OFFICAL_NAME_X_OFFSET) / 2;
			if (this.ttfName != null) {
				this.ttfName.x = _x - dis;
				this.ttfName.y = _y;
			}
			if (this.designation != null) {
				this.designation.x = _x;
				this.designation.y = _y - 40;
			}
			if (this.ttfOffical != null) {
				let [t_x, t_y] = [this.ttfName.x, this.ttfName.y];
				this.ttfOffical.x = t_x + w1 + ConstantConfig_LeagueHome.OFFICAL_NAME_X_OFFSET;
				this.ttfOffical.y = t_y;
			}
		}
		public setSpecialTitlePos(x, y) {
			let [w0, w1, w2, w3, w4, w5, w6, w7] = [0, 0, 0, 0, 0, 0, 0, 0];
			let [h0, h1, h2, h3, h4, h5, h6, h7] = [0, 0, 0, 0, 0, 0, 0, 0];

			let _x = x + this.aniUpOffsetX;
			let _y = y + this.aniUpOffsetY;

			if (this.ttfName != null) {
				w1 = this.ttfName.width;
				h1 = this.ttfName.height;
			}
			_y = _y + h0 / 2 + h1 / 2;

			if (this.ttfLv != null) {
				w2 = this.ttfLv.width;
			}
			if (this.ttfName != null) {
				w3 = this.ttfName.width;
			}
			let dis = (w2 + w3 + ConstantConfig_LeagueHome.LV_NAME_X_OFFSET) / 2;
			if (this.ttfLv != null) {
				_y = _y + ConstantConfig_LeagueHome.BLOOD_NAME_Y_OFFSET;
				this.ttfLv.x = _x - dis;
				this.ttfLv.y = _y;
			}
			if (this.ttfName != null) {
				let [t_x, t_y] = [this.ttfLv.x, this.ttfLv.y];
				this.ttfName.x = t_x + w2 + ConstantConfig_LeagueHome.LV_NAME_X_OFFSET;
				this.ttfName.y = t_y;
			}
			if (this.ttfName != null) {
				w4 = this.ttfName.width;
				h4 = this.ttfName.height;
			}
			_y = _y + h1 / 2 + h4 / 2;
			if (this.ttfLeagueName != null) {
				w4 = this.ttfLeagueName.width;
				h4 = this.ttfLeagueName.height;
			}
			if (this.leagueStar != null) {
				w5 = w5 + this.leagueStar.width * this.leagueStar.scaleX + 5;
			}
			if (this.leagueStar != null) {
				_y = _y + ConstantConfig_LeagueHome.NAME_LEAGUE_Y_OFFSET;
				this.leagueStar.x = x - w5 / 2;
				this.leagueStar.y = _y + 5;
			}
			if (this.ttfLeagueName != null) {
				_y = _y + ConstantConfig_LeagueHome.NAME_LEAGUE_Y_OFFSET;
				this.ttfLeagueName.x = _x + w5 / 2 - this.ttfLeagueName.width;
				this.ttfLeagueName.y = _y;
			}
			_y = _y + h5 / 2 + h6 / 2;
			if (this.ttfGroupName != null) {
				w6 = this.ttfGroupName.width;
				h6 = this.ttfGroupName.height;
			}
			if (this.ttfGroupName != null) {
				_y = _y + ConstantConfig_LeagueHome.NAME_LEAGUE_Y_OFFSET;
				this.ttfGroupName.x = _x;
				this.ttfGroupName.y = _y;
			}
			if (this.designation != null) {
				w7 = this.designation.width;
				h7 = this.designation.height;
			}
			_y = _y + h6 / 2 + h7 / 2;
			if (this.designation != null) {
				this.designation.x = _x;
				this.designation.y = _y;
			}
		}
		public setMoveDistance(dis) {
			this.moveDistance = dis;
		}
		public setVerDistance(dis) {
			this.verDistance = dis;
		}
		public setTargetCB(CB, thispbj?) {
			this.targetCB = CB;
			this.targetCBThis = thispbj;
		}
		public setShowCB(CB) {
			this.showCB = CB;
		}
		public setEndCB(CB) {
			this.endCB = CB;
		}
		public setDieCB(CB) {
			this.dieCB = CB;
		}
		public bCanRemove;
		public setCanRemove() {
			this.bCanRemove = true;
		}
		public getPlayerId() {
			return this.playerInfo.id;
		}
		public getPos() {
			return [this.x, this.y];
		}
		public getPosX() {
			return this.x;
		}
		public getPosY() {
			return this.y;
		}
		public getDir() {
			return this.dir;
		}
		public getMoveDistance() {
			return this.moveDistance;
		}
		public getPlayActionSpeed() {
			return 1;
		}
		public getBodySpx() {
			return this.body;
		}
		public getScale() {
			return this.scale;
		}
		public getBuffNode(pos) {
			let bone = null;
			if (pos == "up") {
				bone = this.body.spine.armature.getSlot(UIConfig.UIConfig_CommonBattle.commonArtUpName);
			} else if (pos == "mid") {
				bone = this.body.spine.armature.getSlot(UIConfig.UIConfig_CommonBattle.commonArtBuffName);
			}
			return bone.getDisplay();
		}
		public isBodyActEnd() {
			return this.bBodyActEnd;
		}
		public isRunTarget() {
			return this.bRunTarget;
		}
		public isShowAtk() {
			let tag = false;
			if (this.otherState == TableEnum.TableEnumOtherState.OtherState_FightShowAtk || this.otherState == TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk) {
				tag = true;
			}
			return tag;
		}
		public isVisible() {
			return this.bVisible;
		}
		public OnTouchDown(touchs) {

		}
		public OnTouchMove(touchs) {

		}
		public OnTouchUp(touchs) {

		}
	}
}
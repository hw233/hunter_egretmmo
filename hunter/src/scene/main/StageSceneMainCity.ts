namespace zj {
	export class StageSceneMainCity extends StageSceneRpg {
		public static ani_names = [
			"main_ani_door",//0大门粒子光
			"main_ani_car",//1电车扫光
			"main_ani_smoke1",//2烟雾前
			"main_ani_smoke2",//3烟雾后
			"main_ani_dove",//4鸽子
			"main_ani_wave",//5海浪
			"main_ani_fountain",//6喷泉
			"main_ani_shop",//7商店扫光
			"main_ani_screen_large",//8前屏幕大
			"main_ani_screen_lit_a",//9前屏幕小
			"main_ani_screen_lit_b",//10前屏幕小
			"main_ani_screen_lit_c",//11前屏幕小
			"main_ani_screen_lit_d",//12前屏幕小
			"main_ani_screen_lit_e",//13前屏幕小
			"main_ani_pub"//14酒馆
		];
		private static checkDoorPos: number = 3040;// 副本大门检测线（X值）
		private static advDoorX: number = 3200;// 进入副本大门的固定坐标
		private static advDoorY: number = 500;

		private static checkDoorPosLeft: number = 448;// 贪婪之岛检测线
		private static leftDoorX: number = 258;// 进入贪婪之岛的固定坐标
		private static leftDoorY: number = 413;

		private ownerScene: MainCityUI;
		public orderCnt;
		private aniManager: MainAniManager;
		private aniList: AnimationBody[];
		private banner: MainCityBanner;
		private teachBuildX: number;
		private teachBuildFun: Function;
		private teachThisObj: any;
		public mapLockTurn: boolean;// 是否锁定地图
		private isTeachBuild: boolean;
		public isIntoMapComp: boolean;// 是否已进入地图
		private isGoToDoor: boolean;
		private isLeaveDoor: boolean;
		private isInDoor: boolean;
		private doorType: number;// 进入的大门类型：0-副本，1-贪婪之岛
		private touchGroupType: message.FunctionOpen;// 当前点击的建筑类型
		private currGroupType: message.FunctionOpen;// 当前选定的建筑类型
		private mapMoveType: number;// 0-根据角色移动
		private mapMovePos: egret.Point;
		private mapOffX: number;
		private isMapAniMove: boolean;// 地图自动移动中，不能控制
		private isCanMoveMap: boolean;// 是否可以拖拽移动地图
		private sendX: number = -1;
		private sendY: number = -1;
		private doorX: number;
		private doorY: number;
		private isDoorAni: boolean;
		private isSceneExit: boolean;
		public constructor() {
			super();
			this.playerLeader = null;
			this.orderCnt = 1;
			this.mapMovePos = new egret.Point();
			this.mapOffX = 0;
			this.mapMoveType = 0;
			this.isMapAniMove = false;
			this.isGoToDoor = false;
			this.isInDoor = false;
			this.mapLockTurn = false;
			// mainUI = MainCityPanel;
		}

		public init() {
			this.isMainCity = true;
			super.init();
		}

		public show() { }

		public Init() {
			super.Init();
			this.isIntoMapComp = false;
			this.isSceneExit = false;
			Gmgr.Instance.preLayerId = Gmgr.Instance.layerId;
			Gmgr.Instance.setLayerId(TableEnumLayerId.LAYER_WONDERLAND);
			Gmgr.Instance.bInSceneFight = false;
			this.mainMenu = null;
			this.aniManager = new MainAniManager(this);
			this.checkMapType();
		}

		private isInMap(): boolean {
			return true;
		}
		private checkMapType() {
			if (this.isInMap()) {
				this.SetFormatReq();
			} else {
				this.checkTeach();
			}
		}

		private checkTeach() {
			Game.EventManager.event(GameEvent.CLOSE_LOGING_SCENE);
			super.show();
		}
		private initList() {
			let generalList: Array<{ level: number, star: number, step: number, battle: number, id: number, hp: number, rage: number, maxHp: number, preBattle: number, isNew: boolean }>;

			let serverFormat = Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1];
			let generalIdList = [];
			let serverFormatTogether = [];
			for (let [k, v] of HelpUtil.GetKV(serverFormat.generals)) {
				serverFormatTogether.push(v);
			}

			for (let [k, v] of HelpUtil.GetKV(serverFormat.reserves)) {
				serverFormatTogether.push(v);
			}

			let hasServerFormat = Table.FindF(serverFormatTogether, (k, v) => {
				let haveSame = false;
				for (let [kk, vv] of HelpUtil.GetKV(serverFormat.generals)) {
					if (vv != 0 && vv != v && PlayerHunterSystem.GetGeneralId(v)) {
						haveSame = true;
					}
				}

				if (v != 0 && !haveSame) {
					return true;
				}
				return false;
			});

			if (hasServerFormat) {
				for (let i = 0; i < serverFormat.generals.length; i++) {
					let v = serverFormat.generals[i];
					if (v != 0) {
						generalIdList.push(v);
					}
				}

				for (let i = 0; i < serverFormat.reserves.length; i++) {
					let v = serverFormat.reserves[i];
					if (v != 0) {
						generalIdList.push(v);
					}
				}
				generalList = Game.PlayerHunterSystem.getWonderlandGeneral(serverFormat)[0];
			}
			else {
				generalList = Game.PlayerHunterSystem.getWonderlandGeneral(null)[0];
			}

			Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].generals = [];
			Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].reserves = [];

			for (let [k, v] of HelpUtil.GetKV(generalList)) {
				if (Number(k) < 4) {
					Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].generals.push(v.id);
				}
				else {
					Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].reserves.push(v.id);
				}
			}
		}
		private SetFormatReq() {// 设置阵型
			this.initList();
			let req = new message.SetFormationRequest();
			let formation = Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1];
			formation.formationType = message.EFormationType.FORMATION_TYPE_WONDERLAND;
			req.body.formations.push(formation);
			Game.Controller.send(req, (req: aone.AoneRequest, resp: aone.AoneResponse) => {
				let response = <message.SetFormationResponse>resp;
				if (response.header.result != 0) {
					toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
					return;
				}
				this.mapEnterReq();
			}, null, this, false);
		}

		private mapEnterReq() {// 进入地图
			let req = new message.WonderlandEnterRequest();
			req.body.id = 2;
			// req.body.id = this.info.wonderland_id//this.teachId || this.info.wonderland_id;
			Game.PlayerWonderLandSystem.willGoRpg();
			Game.Controller.send(req, this.mapEnterResp, null, this, false);
		}

		private mapEnterResp(req: aone.AoneRequest, resp: aone.AoneResponse) {
			let response = <message.WonderlandEnterResponse>resp;
			if (response.header.result != 0) {
				toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
				return;
			}
			Game.PlayerWonderLandSystem.OpenMainCity(response);
			Game.PlayerWonderLandSystem.wonderlandId = 0;
			this.intoScene();
			this.mainMenu = newUI(MainCitySceneNew);
			(this.mainMenu as MainCitySceneNew).init();

			let _ownerScene = newUI(MainCityUI);
			_ownerScene.setMap(this);
			_ownerScene.setUI(this.mainMenu);
			this.ownerScene = _ownerScene;
			_ownerScene.show();

			this.initTouchTitles();

			Game.EventManager.event(GameEvent.CLOSE_LOGING_SCENE);
			this.isIntoMapComp = true;

			if (SceneManager.loginLoadingScene) {
				Game.UIManager.removeScene(SceneManager.loginLoadingScene);
				SceneManager.loginLoadingScene = null;
			}
			// super.show();// 先添加地图Scene，再添加UI Scene
			// this.mainMenu.show();
		}

		// // 重新进入地图（新手玩家完成任务后，需重新拉取地图玩家）
		// private reMapEnterReq(){
		// 	let req = new message.WonderlandEnterRequest();
		// 	req.body.id = 2;
		// 	// req.body.id = this.info.wonderland_id//this.teachId || this.info.wonderland_id;
		// 	Game.PlayerWonderLandSystem.willGoRpg();
		// 	Game.Controller.send(req, this.reMapEnterResp, null, this, false);
		// }

		// private reMapEnterResp(req: aone.AoneRequest, resp: aone.AoneResponse){
		// 	let response = <message.WonderlandEnterResponse>resp;
		// 	if (response.header.result != 0) {
		// 		toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
		// 		return;
		// 	}
		// 	Game.PlayerWonderLandSystem.OpenMainCity(response);
		// 	Game.PlayerWonderLandSystem.wonderlandId = 0;
		// 	this.resetScene();
		// }

		private intoScene() {
			this.InitRes();
			this.initMapBlock();
			let posItem = Game.PlayerWonderLandSystem.roleInfo.posInfo.posItem;
			if (SceneManager.initType == 1) {
				SceneManager.initType = 0;
				posItem.scene_x = StageSceneMainCity.checkDoorPos - Util.randomValue(20, 100);// TODO 服务器传的坐标
				posItem.scene_y = Util.randomValue(440, 560);
				this.getPlayerLeader().changeDir(TableEnum.TableEnumDir.Dir_Left);
			} else if (SceneManager.initType == 2) {
				SceneManager.initType = 0;
				posItem.scene_x = StageSceneMainCity.checkDoorPosLeft + Util.randomValue(20, 100);
				posItem.scene_y = Util.randomValue(430, 550);
			} else {
				posItem.scene_x = 1570 + Util.randomValue(-50, 50);//280;// TODO 服务器传的坐标
				posItem.scene_y = 450 + Util.randomValue(-10, 80);
			}
			this.proofLeaderPos(posItem);
			this.reqLeaderPos(this.playerLeader.moveDistance, this.playerLeader.verDistance, null);
			this.bPosFinished = true;

			this.initMobs();
			this.initMember();

			// Helper.PlaybgmByID(100001);
			Game.SoundManager.playMusic("city_mp3", 0);
			Game.EventManager.on(GameEvent.RESET_PLAYER_AVATA, this.resetPlayerAvata, this);
			Game.EventManager.on(GameEvent.MAIN_CITY_UPDATE, this.updateUIStates, this);
			Game.EventManager.on(GameEvent.PLAYER_LEVEL_UP, this.updateUIStates, this);
			Game.EventManager.on(GameEvent.SERVER_LINE_CHANGE, this.updateServerLine, this);
			Game.EventManager.on(GameEvent.PLAYER_LICENCELEVEL_CHANGE, this.updateLicenceLevel, this);
			Game.EventManager.on(GameEvent.CLOSE_SCENE, this.closeScene, this);
			// Game.EventManager.on(GameEvent.MAIN_CITY_MEMBER_LIST, this.reMapEnterReq, this);
			//更新时间差值
			this.updateNoticePos(Game.PlayerWonderLandSystem.loadingPosInfo);
			this.proofTime();
			Game.PlayerWonderLandSystem.loadingPosInfo = {};
			Game.EventManager.on(GameEvent.SERVER_NOTICE_SCENE_ITEM_POS, this.SceneItemPosNotice_Visit, this);
			Game.EventManager.on(GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO, this.SceneItemPosInfoNotice_Visit, this);
			Game.EventManager.on(GameEvent.SERVER_NOTICE_BATTLE_IMITATE_RESULT, this.LeagueWarBattleResultNotice_Visit, this);
		}

		public resetScene() {
			for (let key in this.tableMembers) {
				let role = this.tableMembers[key];
				this.delMember(role.getPlayerId());
			}
			this.initMobs();
			this.initMember();

			if (this.playerLeader) {
				this.reqLeaderPos(this.playerLeader.moveDistance, this.playerLeader.verDistance, null);
			}
		}

		public LoadMap(name) {
			this.isDoorAni = false;
			super.LoadMap(name);
		}

		public InitRes() {
			this.sceneType = Game.PlayerWonderLandSystem.roleInfo.posInfo.posItem.sceneType;
			// let MapId = TableWonderland.Item(Game.PlayerWonderLandSystem.wonderlandId).map_id;
			this.LoadMap(SceneManager.cityMapId);

			this.initCellNode();
			this.initTmx();

			this.initLeader();
			this.initLeaderPet();

			this.initBuilds(StringConfig_Table.wonderlandMap, SceneManager.cityMapId);

			this.flashSceneLeaderColor();
		}

		public initBuilds(csvName, sceneId) {
			super.initBuilds(StringConfig_Table.wonderlandMap, SceneManager.cityMapId);
			// 主城NPC头顶只有文字，不显示黑底儿(特殊处理)
			let list = this.tableNpcs;
			for (let key in list) {
				let npc: StageRpgNpc = list[key];
				npc.back1.visible = false;
				if (npc.labelOpen) {
					npc.labelOpen.size = 16;
					npc.labelOpen.y = npc.back1.y + 44;
					npc.labelOpen.x = npc.info.name_pos[0] - npc.labelOpen.textWidth / 2;
				}
			}
		}

		public closeScene(ev: egret.Event) {
			if ("zj.LeagueHomeScene" == ev.data.typeName) {
				this.updateLeague();
			}
		}

		private updateLeague() {
			if (this.playerLeader && this.playerLeader.playerInfo) {
				if (this.playerLeader.playerInfo.leagueId != Game.PlayerInfoSystem.LeagueId) {
					this.playerLeader.playerInfo.leagueId = Game.PlayerInfoSystem.LeagueId;
					this.playerLeader.playerInfo.leagueName = Game.PlayerInfoSystem.leagueName;
					this.playerLeader.reloadLeagueNameTitle();
				}
			}
		}

		private updateLicenceLevel() {
			if (this.playerLeader) {
				this.playerLeader.playerInfo.licenceLevel = Game.PlayerInfoSystem.LecenceLevel;
				this.playerLeader.loadDesignation();
			}
		}

		private updateServerLine() {
			this.resetScene();
		}

		private initTouchTitles() {
			let touchUI = newUI(MainCityTouchs);
			let touchTitles = touchUI.initTitles(this);
			(this.mainMenu as MainCitySceneNew).initTouchTitle(touchTitles);
			this.banner = touchUI.getBanner(this);
			(this.mainMenu as MainCitySceneNew).initBanner(this.banner);
			if (this.aniManager) {
				this.initImgClouds(touchUI.initMainAnis(MainCityTouchs.key_img_cloud));
				this.initAnis(touchUI.initMainAnis(MainCityTouchs.key_ani));
				this.initImgFlashs(touchUI.initMainAnis(MainCityTouchs.key_img_flash));
				this.initImgCar(touchUI.initMainAnis(MainCityTouchs.key_img_car));
				this.initImgMoves(touchUI.initMainAnis(MainCityTouchs.key_img_move));
				this.initImgStatic(touchUI.initMainAnis(MainCityTouchs.key_img_static));
				this.initDragon(touchUI.initMainAnis(MainCityTouchs.key_dragon));
				this.initImgLight(touchUI.initMainAnis(MainCityTouchs.key_img_light));
			}
		}
		private initImgLight(items: egret.DisplayObject[]) {
			if (!items) {
				return;
			}
			let layerExt = "_node_map_ani";
			for (let i = 0; i < items.length; ++i) {
				let data = items[i];
				let group: eui.Group = this[data[0] + layerExt];
				let img: eui.Image = data[1];
				if (group && img) {
					if (img.parent) {
						img.parent.removeChild(img);
					}
					group.addChild(img);
					Util.setBlendMode(img);
					this.aniManager.addImgLight(img);
				}
			}
		}
		private initDragon(items: egret.DisplayObject[]) {
			if (!items) {
				return;
			}
			let layerExt = "_node_map_ani";
			for (let i = 0; i < items.length; ++i) {
				let data = items[i];
				let group: eui.Group = this[data[0] + layerExt];
				this.addDragon(group, data[1]);
			}
		}
		private addDragon(group: eui.Group, data: eui.Group) {
			Game.DragonBonesManager.getArmatureDisplayAsync(this.ownerScene, data.name)
				.then((display: dragonBones.EgretArmatureDisplay) => {
					display.x = data.x;
					display.y = data.y;
					display.scaleX = data.scaleX;
					display.scaleY = data.scaleY;
					setDragonBonesRemove(display);
					group.addChild(display);
					let names = display.animation.animationNames;
					display.animation.play(names[0]);
				});
		}
		private initImgCar(items: egret.DisplayObject[]) {
			if (!items) {
				return;
			}
			let layerExt = "_node_map_ani";
			for (let i = 0; i < items.length; ++i) {
				let data = items[i];
				let group: eui.Group = this[data[0] + layerExt];
				let img: eui.Image = data[1];
				if (group && img) {
					if (img.parent) {
						img.parent.removeChild(img);
					}
					group.addChild(img);
					this.aniManager.addCar(img);
				}
			}
			this.aniManager.initCar();
		}
		private initImgStatic(items: egret.DisplayObject[]) {
			if (!items) {
				return;
			}
			let layerExt = "_node_map_ani";
			for (let i = 0; i < items.length; ++i) {
				let data = items[i];
				let group: eui.Group = this[data[0] + layerExt];
				let img: eui.Image = data[1];
				if (group && img) {
					if (img.parent) {
						img.parent.removeChild(img);
					}
					group.addChild(img);
				}
			}
		}
		private initImgClouds(items: any[]) {
			if (!items || !this.aniManager) {
				return;
			}
			let layerExt = "_node_map_ani";
			for (let i = 0; i < items.length; ++i) {
				let data = items[i];
				let group: eui.Group = this[data[0] + layerExt];
				let img: eui.Image = data[1];
				if (group && img) {
					if (img.parent) {
						img.parent.removeChild(img);
					}
					group.addChild(img);
					this.aniManager.addCloud(img);
				}
			}
		}
		private initImgMoves(items: any[]) {
			if (!items) {
				return;
			}
			let layerExt = "_node_map_ani";
			for (let i = 0; i < items.length; ++i) {
				let data = items[i];
				let group: eui.Group = this[data[0] + layerExt];
				let img: eui.Image = data[1];
				if (group && img) {
					if (img.parent) {
						img.parent.removeChild(img);
					}
					group.addChild(img);
					this.aniManager.addImgMove(img);
				}
			}
		}

		private initImgFlashs(items: any[]) {
			if (!items) {
				return;
			}
			let layerExt = "_node_map_ani";
			for (let i = 0; i < items.length; ++i) {
				let data = items[i];
				let group: eui.Group = this[data[0] + layerExt];
				let img: eui.Image = data[1];
				if (group && img) {
					if (img.parent) {
						img.parent.removeChild(img);
					}
					group.addChild(img);
					this.aniManager.addImgFlash(img);
				}
			}
		}
		private initAnis(items: any[]) {
			if (!items) {
				return;
			}
			this.aniList = [];
			let layerExt = "_node_map_ani";
			for (let i = 0; i < items.length; ++i) {
				let data = items[i];
				let res = StageSceneMainCity.ani_names[i];
				let ani: AnimationBody = null;
				if (i == 1 || i == 7) {
					ani = Game.AnimationManager.createTime(res, 2000, 8000);
				} else {
					ani = Game.AnimationManager.create(res);
				}
				if (ani) {
					ani.x = data[1].x;
					ani.y = data[1].y;
					// ani.setBlendMode();
					let group: eui.Group = this[data[0] + layerExt];
					group.addChild(ani);
					ani.onPlay();
					this.aniList.push(ani);
					if (i == 4) {// 鸽子单独处理
						this.aniManager.addDove(ani);
					}
				}
			}
		}

		public initLeader() {
			let order = this.orderCnt;
			let leader = new StageSceneCityLeader(this.map, this.MapBlockH);
			let x = 0;
			let y = 0;
			let scenePosInfo: message.ScenePosInfo = SceneManager.scenePosInfo;
			if (Game.PlayerMixUnitInfoSystem.mixunitinfo.modifyName == 0) {
				scenePosInfo.roleBase.name = TextsConfig.TextsConfig_Common.nameDefault;
			}
			let dir = TableEnum.TableEnumDir.Dir_Right;
			leader.createWonderlandPlayer(scenePosInfo, 100, x, y, dir, x, y);
			leader.dealWonderlandRoleInfo(Game.PlayerWonderLandSystem.roleInfo);
			leader.dealSceneNotice(scenePosInfo);
			if (scenePosInfo.hpPre == 0) {
				leader.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Die);
			}
			this.playerLeader = leader;
			this.orderCnt = this.orderCnt + 1;
		}

		public initLeaderPet() {
			let pet = new StageScenePlayerPet(this.map, this.MapBlockH);
			let x = -70
			let y = 0
			let scenePosInfo = Game.PlayerWonderLandSystem.scenePosInfo[Game.PlayerInfoSystem.RoleID];
			let dir = TableEnum.TableEnumDir.Dir_Right;

			pet.createPlayerPet(this.playerLeader, x, y, dir);
			this.playerLeaderPet = pet

			this.orderCnt = this.orderCnt + 1

			this.playerLeader.setPlayerPet(pet);
		}

		public getPlayerLeader(): StageSceneCityLeader {
			return this.playerLeader;
		}

		public onEntryTopScene() {
			super.onEntryTopScene();
			this.updateUIStates();
			this.reloadSpx();
			// this.resetPlayerAvata();
			this.aniManager.onEntryTopScene();
		}

		public onLeaveTopScene() {
			super.onLeaveTopScene();
			this.aniManager.onLeaveTopScene();
		}
		private reloadSpx() {
			let list = this.tableMembers;
			for (let id in list) {
				let role = list[id] as StageScenePersonPath;
				role.loadBody();
			}
			// let listpet = this.tableMemberPets;
			// for (let id in listpet) {
			// 	let pet = listpet[id] as StageScenePlayer;
			// 	pet.loadBody();
			// }
		}

		public updateUIStates() {
			if (this.playerLeader) {
				this.playerLeader.name = Game.PlayerInfoSystem.RoleName;
				this.playerLeader.ttfName.text = "Lv" + Game.PlayerInfoSystem.Level + " " + this.playerLeader.name;
				// this.playerLeader.ttfLv.text = "Lv" + Game.PlayerInfoSystem.Level;

				if (SceneManager.scenePosInfo && Game.PlayerInfoSystem.BaseInfo.haloId != SceneManager.scenePosInfo.roleBase.haloId) {
					SceneManager.scenePosInfo.roleBase.haloId = Game.PlayerInfoSystem.BaseInfo.haloId;
					this.playerLeader.playerInfo.haloId = Game.PlayerInfoSystem.BaseInfo.haloId;
					this.getPlayerLeader().loadAura();
				}
			}
		}

		private resetPlayerAvata() {
			if (SceneManager.scenePosInfo.roleBase.picId != Game.PlayerInfoSystem.BaseInfo.picId) {
				// || SceneManager.scenePosInfo.roleBase.fashionId != Game.PlayerInfoSystem.BaseInfo.fashionId) {
				SceneManager.scenePosInfo.roleBase.picId = Game.PlayerInfoSystem.BaseInfo.picId;
				// SceneManager.scenePosInfo.roleBase.fashionId = Game.PlayerInfoSystem.BaseInfo.fashionId;
				let id = PlayerVIPSystem.GetMapRoleInfo(Game.PlayerInfoSystem.BaseInfo);
				Gmgr.Instance.preLayerId = Gmgr.Instance.layerId;
				Gmgr.Instance.setLayerId(TableEnumLayerId.LAYER_WONDERLAND);
				Gmgr.Instance.bInSceneFight = false;
				this.getPlayerLeader().resetBody(id);
			}
		}

		public loadMyImageComplete(name: string) {
			if (name.indexOf("men") != -1) {
				let men1 = this.tableObjByNames["men1"];
				let men2 = this.tableObjByNames["men2"];
				if (men1 && men2) {
					let w1 = men1.width / 2;
					let h1 = men1.height / 2;
					let w2 = men2.width / 2;
					let h2 = men2.height / 2;

					let mleft = men1.x - w1;
					let mtop = men2.y - h2;
					let mright = men2.x + w2;
					let mbottom = men2.y + h2;
					let mrect = Util.getMaskImgBlack(mright - mleft, mbottom - mtop);
					mrect.x = mleft;
					mrect.y = mtop;
					men1.parent.addChild(mrect);
					men1.mask = mrect;

					mrect = Util.getMaskImgBlack(mright - mleft, mbottom - mtop);
					mrect.x = mleft;
					mrect.y = mtop;
					men2.parent.addChild(mrect);
					men2.mask = mrect;
					this.isDoorAni = true;
				}
			}
		}

		private startDoorAni() {
			if (this.isDoorAni) {
				let men1 = this.tableObjByNames["men1"];
				let men2 = this.tableObjByNames["men2"];
				let x1 = men1.x;
				let y1 = men1.y;
				let w1 = men1.width;
				let x2 = men2.x;
				let y2 = men2.y;
				let w2 = men2.width;
				// 左侧小门动画
				let tw1 = egret.Tween.get(men1);
				let dis1 = -14;
				let scale1 = 0.88;
				tw1.to({ x: x1 - w1 * scale1, y: y1 + dis1, scaleX: scale1, scaleY: scale1 }, 600);
				tw1.call(() => {
					egret.Tween.removeTweens(men1);
				}, this);

				// 右侧大门动画
				let scale2 = 1.12;
				let dis2 = 15;
				let tw2 = egret.Tween.get(men2);
				tw2.to({ x: x2 + w2 * scale1, y: y2 + dis2, scaleX: scale2, scaleY: scale2 }, 600);
				tw2.call(() => {
					egret.Tween.removeTweens(men2);
					this.ownerScene.EnterAdventure();
				}, this);
			} else {
				this.ownerScene.EnterAdventure();
			}
		}

		public flashSceneLeaderColor() {
			let _path = Helper.getWonderlandBloodPath(this.playerLeader.battleMode);
			let _color = ConstantConfig_Common.Color.wonderland_color.leader_color;
			this.playerLeader.flashTtfNameColor(_color);
			this.playerLeader.flashBarTexture(_path);
		}

		public initMobs() {
			for (let k in Game.PlayerWonderLandSystem.scenePosInfo) {
				let v = Game.PlayerWonderLandSystem.scenePosInfo[k];
				if (v.posItem.joinerType != message.ESceneItemType.SCENE_ITEM_TYPE_MOBS) {
					continue;
				}
				if (this.tableMembers[v.roleBase.id] != null) {
					continue;
				}
				this.addMob(v, null, null);
			}
		}

		public addMob(scenePosInfo: message.ScenePosInfo, x, y) {
			// if (!scenePosInfo.roleBase.agree_enter) {
			// 	return;
			// }
			let order = this.orderCnt;
			let mob = new StageSceneFightMob(this.map, this.MapBlockH);
			let floor = 200;
			let dir = TableEnum.TableEnumDir.Dir_Left;

			let [map_x, map_y] = this.proofMobPos(scenePosInfo.posItem.scene_x, scenePosInfo.posItem.scene_y);
			let screen_x = map_x - (this.playerLeader.moveDistance - this.playerLeader.x);
			let screen_y = map_y - (this.playerLeader.verDistance - this.playerLeader.y);
			mob.createWonderlandMob(scenePosInfo, floor, screen_x, screen_y, dir, screen_x, screen_y);
			mob.setPos(screen_x, screen_y);
			this.tableMembers[scenePosInfo.roleBase.id] = mob;
			this.orderCnt = this.orderCnt + 1;
			this.willDelMobs[scenePosInfo.roleBase.id] = false;
		}

		public initMember() {
			for (let k in Game.PlayerWonderLandSystem.scenePosInfo) {
				let v = Game.PlayerWonderLandSystem.scenePosInfo[k];
				if (v.posItem.joinerType != message.ESceneItemType.SCENE_ITEM_TYPE_ROLE) {
					continue;
				}
				if (v.roleBase.id == Game.PlayerInfoSystem.RoleID) {
					continue;
				}
				if (this.tableMembers[v.roleBase.id] != null) {
					continue;
				}
				this.addMember(v, null, null);
			}
		}

		public addMember(scenePosInfo, x, y) {
			let order = this.orderCnt
			let member = new StageSceneFightInLeauge(this.map, this.MapBlockH);
			let floor = 200
			let dir = TableEnum.TableEnumDir.Dir_Right

			let screen_x = scenePosInfo.posItem.scene_x - (this.playerLeader.moveDistance - this.playerLeader.x)
			let screen_y = scenePosInfo.posItem.scene_y - (this.playerLeader.verDistance - this.playerLeader.y)

			//scenePosInfo.roleBase.picId = 140001

			member.createWonderlandPlayer(scenePosInfo, floor, screen_x, screen_y, dir, screen_x, screen_y);
			member.dealSceneNotice(scenePosInfo);

			this.tableMembers[scenePosInfo.roleBase.id] = member;
			this.orderCnt = this.orderCnt + 1;
			this.addmemberPet(member);
		}

		public addmemberPet(member) {
			let carry = member.getCarryPet();
			if (carry) {
				let pet = new StageScenePlayerPet(this.map, this.MapBlockH);
				let x = -70
				let y = 0
				let dir = TableEnum.TableEnumDir.Dir_Right

				pet.createPlayerPet(member, x, y, dir)
				this.tableMemberPets[member.scenePosInfo.roleBase.id] = pet

				this.orderCnt = this.orderCnt + 1;

				this.tableMembers[member.scenePosInfo.roleBase.id].setPlayerPet(pet);
			}
		}

		public delMember(key_id) {
			if (this.tableMembers[key_id] != null) {
				CC_SAFE_DELETE(this.tableMembers[key_id]);
				CC_SAFE_DELETE(this.tableMemberPets[key_id]);
			} else if (this.cacheMembers[key_id] != null) {
				CC_SAFE_DELETE(this.cacheMembers[key_id]);
			}
			delete this.tableMembers[key_id];
			delete this.tableMemberPets[key_id];
			delete this.cacheMembers[key_id];
			delete Game.PlayerWonderLandSystem.scenePosInfo[key_id];
		}

		private mobBattle(v, key_id) {
			if (this.tableMembers[key_id].isVisible() == true
				&& v.otherBase.length != 0
				&& ((this.tableMembers[v.otherBase[0].id] != null
				) || v.otherBase[0].id == Game.PlayerInfoSystem.RoleID)) {
				this.tableMembers[key_id].dealSceneNotice(v)
				this.memberNoticeResult(key_id, v.otherBase[0].id);
				return true;
			}
			return false;
		}
		public updateNoticePos(tbl) {
			for (let k in tbl) {
				let v = tbl[k];
				// if (v.roleBase.agree_enter) {
				if (v.posItem.joinerType == message.ESceneItemType.SCENE_ITEM_TYPE_COLLECTION) {
					let key_id = v.roleBase.id;
					if (this.tableTrees[key_id] == null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
						// let tree = this.addTree(v);
						// if (tree != null) {
						// 	this.SetTreeBlock(tree);
						// 	Astar.getInstance().clear_cached_paths();
						// }
					} else if (this.tableTrees[key_id] != null) {
						this.tableTrees[key_id].dealSceneNotice(v);
					}
				} else if (v.posItem.joinerType == message.ESceneItemType.SCENE_ITEM_TYPE_MOBS) {
					let key_id = v.roleBase.id;
					if (this.tableMembers[key_id] == null && this.cacheMembers[key_id] != null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
						this.tableMembers[key_id] = this.cacheMembers[key_id];
						delete this.cacheMembers[key_id];
						this.tableMembers[key_id].joinView();
						this.tableMembers[key_id].dealSceneNotice(v);
					} else if (this.tableMembers[key_id] == null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
						this.addMob(v, null, null);
					} else if ((this.tableMembers[key_id] != null || this.cacheMembers[key_id] != null) && ((v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE))) {
						if (!this.willDelMobs[key_id]) {
							this.delMember(key_id);
						}
					} else if (this.tableMembers[key_id] != null && (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_LEAVE && v.otherBase.length == 0)) {
						this.tableMembers[key_id].leaveView();
						this.cacheMembers[key_id] = this.tableMembers[key_id];
						delete this.tableMembers[key_id]
					} else if (this.tableMembers[key_id] != null) {
						//死亡和被动战斗
						if (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_DEAD) {
							if (!this.mobBattle(v, key_id)) {
								this.delMember(key_id);
							} else {
								this.willDelMobs[key_id] = true;
							}
						} else if (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_BATTLED) {
							this.mobBattle(v, key_id)
						} else if (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE) {
							this.tableMembers[key_id].dealSceneNotice(v)
						}
					} else if (this.cacheMembers[key_id] != null) {
						if (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_DEAD || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE) {
							this.delMember(key_id);
						}
					}
				} else {
					if (v.roleBase.id == Game.PlayerInfoSystem.RoleID) {
						if (v.posItem.posState != message.ESceneItemState.SCENE_ITEM_STATE_LEAVE) {
							if (this.playerLeader != null) {
								this.playerLeader.dealSceneNotice(v);
							}
						}
					} else {
						let key_id = v.roleBase.id;
						if (this.tableMembers[key_id] == null && this.cacheMembers[key_id] != null
							&& (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
							this.tableMembers[key_id] = this.cacheMembers[key_id];
							delete this.cacheMembers[key_id]
							this.tableMembers[key_id].joinView();
							this.tableMembers[key_id].dealSceneNotice(v);
						} else if (this.tableMembers[key_id] == null && this.cacheMembers[key_id] == null
							&& (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_NONO || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_MOVE
								|| v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_JOIN || v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_JOIN)) {
							this.addMember(v, null, null);
						} else if ((this.tableMembers[key_id] != null || this.cacheMembers[key_id] != null)
							&& (v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_LEAVE)) {
							this.delMember(key_id);
						} else if (this.tableMembers[key_id] != null && v.posItem.posState == message.ESceneItemState.SCENE_ITEM_STATE_VIEW_LEAVE) {
							this.tableMembers[key_id].leaveView();
							this.cacheMembers[key_id] = this.tableMembers[key_id];
							delete this.tableMembers[key_id];
						} else if (this.tableMembers[key_id] != null) {
							this.tableMembers[key_id].dealSceneNotice(v);
							if (this.tableMembers[key_id].bVisible == true && this.tableMembers[key_id].otherState == TableEnum.TableEnumOtherState.OtherState_None && v.otherBase.length != 0) {
								this.memberNoticeResult(key_id, v.otherBase[0].id);
							}
						}
					}
				}
				// }
			}
		}

		public SceneItemPosNotice_Visit(ev: egret.Event) {
			let body = (<message.SceneItemPosNoticeRequest>ev.data).body;
			if (body == undefined || body == null) return;
			this.updateSimplePos(Game.PlayerWonderLandSystem.noticePosInfo);
			Game.PlayerWonderLandSystem.noticePosInfo = {};
		}
		public SceneItemPosInfoNotice_Visit(ev: egret.Event) {
			let body = (<message.SceneItemPosInfoNoticeRequest>ev.data).body;
			if (body == undefined || body == null) return;
			if (Helper.getObjLen(Game.PlayerWonderLandSystem.loadingPosInfo) > 0) {
				this.updateNoticePos(Game.PlayerWonderLandSystem.loadingPosInfo);
				Game.PlayerWonderLandSystem.loadingPosInfo = {};
			}
			// Game.PlayerWonderLandSystem.timePosInfo
			this.updateNoticePos(Game.PlayerWonderLandSystem.timePosInfo);
			Game.PlayerWonderLandSystem.timePosInfo = {};
		}
		public LeagueWarBattleResultNotice_Visit(ev: egret.Event) {
			let body = (<message.BattleImitateResultNoticeRequest>ev.data).body;
			if (body == undefined || body == null) return;
			this.beAtkNoticeResult();
		}
		public updateSimplePos(tbl) {
			for (let k in tbl) {
				let v = tbl[k];
				if (this.tableMembers[k] != null) {
					this.tableMembers[k].dealSimpleMoveNotice(v);
				}
			}
		}
		public updateMember(tick) {
			for (let k in this.tableMembers) {
				let v = this.tableMembers[k];
				if (v.bCanRemove) {
					CC_SAFE_DELETE(v);
					delete this.tableMembers[k];
					delete this.cacheMembers[k];
					v = null;
					continue;
				}
				v.Update(tick)
				// this.flashMemberColor(v);
			}

			for (let k in this.tableMemberPets) {
				let v = this.tableMemberPets[k];
				if (v.master.bCanRemove == true) {
					CC_SAFE_DELETE(v);
					delete this.tableMemberPets[k];
					v = null;
					continue;
				}
				v.Update(tick);
			}
		}

		public Update(tick) {
			if (!this.isIntoMapComp) {
				return;
			}

			this.updateMember(tick);

			if (!this.ownerScene.visible) {
				return;
			}

			if (this.playerLeader != null) {
				this.playerLeader.Update(tick);
			}
			if (this.playerLeaderPet != null) {
				this.playerLeaderPet.Update(tick);
			}

			super.Update(tick);

			if (this.aniManager) {
				this.aniManager.Update(tick);
			}

			if (this.banner) {
				this.banner.Update(tick);
			}

			// this.updateBuilds(tick);
			// this.updateTrees(tick);
			this.updateNpcs(tick);
			// this.updateTreeTrans(null);
			// this.flashTree();

			//教学
			// Teach.checkTeachId();
			// Teach.proOperateTeach();
			this.updateTeachBuild(tick);

			this.updateMapFollow(tick);
			// 用方向键控制角色移动
			this.updatePlayerWalk(tick);

			this.checkGoToAdventurn();
		}
		private updateTeachBuild(tick) {
			if (this.isTeachBuild) {
				if (this.teachBuildX == 0) {
					this.onTeachBuildFinish();
				} else {
					let off = tick * 1000;
					let dis = Math.abs(this.teachBuildX);
					off = off > dis ? dis : off;
					if (this.teachBuildX < 0) {// 负数
						off = - off;
					}
					this.teachBuildX -= off;
					this.onMoveMap(off);
				}
			}
		}
		private playerMoveToPos(player, tox, toy) {
			let arc = 180 - Util.angleTo360(player.moveDistance, player.verDistance, tox, toy);
			let disp = Util.pDisPoint(player.moveDistance, player.verDistance, tox, toy);
			let moveDisp = player.moveMapWalk(arc);
			if (moveDisp >= disp) {
				return true;
			}
			return false;
		}
		/**
		 * 检测是否进入右侧门
		 */
		private checkGoToAdventurn() {
			let player = this.getPlayerLeader();
			if (this.isLeaveDoor) {
				if (this.playerMoveToPos(player, this.doorX, this.doorY)) {
					player.onWalkEnd();
					this.isInDoor = false;
					this.isGoToDoor = false;
					this.isLeaveDoor = false;
				}
			} else if (this.isGoToDoor) {
				if (!this.isInDoor) {
					if (this.playerMoveToPos(player, this.doorX, this.doorY)) {
						if (this.doorType == 0) {
							this.isInDoor = true;
							player.changeState(TableEnum.TableEnumBaseState.State_None);
							this.startDoorAni();
						} else {
							if (SceneManager.instance.EnterSceneZorkBoss()) {
								player.changeState(TableEnum.TableEnumBaseState.State_None);
								this.isInDoor = true;
							} else {
								this.doorX = StageSceneMainCity.checkDoorPosLeft + Util.randomValue(20, 100);
								this.doorY = Util.randomValue(420, 550);
								this.isLeaveDoor = true;
							}
						}
					}
				}
			} else if (player.moveDistance >= StageSceneMainCity.checkDoorPos) {
				// if ((this.mainMenu as MainCitySceneNew).isTouchWalk()) {
				this.onWalkEnd();
				// }
				this.doorX = StageSceneMainCity.advDoorX + Util.randomValue(-30, 30);
				this.doorY = StageSceneMainCity.advDoorY + Util.randomValue(-10, 10);
				player.changeState(TableEnum.TableEnumBaseState.State_Walk);
				this.doorType = 0;
				this.isLeaveDoor = false;
				this.isGoToDoor = true;
			} else if (player.moveDistance <= StageSceneMainCity.checkDoorPosLeft) {
				// if ((this.mainMenu as MainCitySceneNew).isTouchWalk()) {
				this.onWalkEnd();
				// }
				this.doorX = StageSceneMainCity.leftDoorX + Util.randomValue(-30, 30);
				this.doorY = StageSceneMainCity.leftDoorY + Util.randomValue(-10, 10);
				player.changeState(TableEnum.TableEnumBaseState.State_Walk);
				this.doorType = 1;
				this.currGroupType = this.touchGroupType = -1;
				this.isLeaveDoor = false;
				this.isGoToDoor = true;
			}
		}

		private updatePlayerWalk(tick) {
			if (!this.isGoToDoor && !this.isMapAniMove && (this.mainMenu as MainCitySceneNew).isTouchWalk()) {
				if (this.mapOffX != 0) {
					this.mapMovePos.setTo(-1, -1);
					this.isMapAniMove = true;
				} else {
					let arc = (this.mainMenu as MainCitySceneNew).getWalkArc();
					this.playerLeader.moveMapWalk(arc);
				}
			}
		}
		public onWalkStart() {
			this.currGroupType = -1;
			this.playerLeader.onWalkStart();
		}
		public onWalkEnd() {
			this.playerLeader.onWalkEnd();
		}
		private updateMapFollow(tick) {
			if (this.isMapAniMove) {
				if (this.mapOffX == 0) {
					this.isMapAniMove = false;
					this.setMove(this.mapMovePos.x, this.mapMovePos.y);
				} else {
					let offx = tick * 2400;
					if (this.mapOffX > 0) {
						offx = offx > this.mapOffX ? this.mapOffX : offx;
					} else {
						offx = -offx;
						offx = offx < this.mapOffX ? this.mapOffX : offx;
					}
					// this.map.x -= offx;
					this.getPlayerLeader().setOffX(-offx);
					super.UpdateMap(offx, 0);
					this.mapMovePos.x -= offx;
					this.mapOffX -= offx;
				}
			} else {
				if (this.currGroupType >= 0 && this.playerLeader.state == TableEnum.TableEnumBaseState.State_None) {
					let type = this.currGroupType;
					this.currGroupType = -1;
					this.touchGroupType = -1;
					this.mainMenu.toJump(type);
				}
			}
		}
		//安全区操作检测
		public delSafeAreaCheck(touch_type, id) {
			return true;
		}
		public dealTriggerAreaThings(x, y, trigger_Tbl) {
			return [];
		}
		public reqLeaderPos(x, y, successCB) {
			// if (!Game.PlayerInfoSystem.IsAgreeEnter) {
			// 	if (successCB) {
			// 		successCB();
			// 	}
			// 	if (this.playerLeader) {
			// 		this.playerLeader.resetMoveNet();
			// 	}
			// 	return;
			// }
			if (x <= 0) {
				x = 1;
			}
			if (Math.abs(x - this.sendX) < 6 && Math.abs(y - this.sendY) < 6) {
				return;
			}
			// 移动数据同步
			let visit_func = function func(req: aone.AoneRequest, resp: aone.AoneResponse) {
				let response = <message.WonderlandMoveResponse>resp;
				if (response.header.result != 0) {
					// toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
					SceneManager.instance.ReEnterMainCityNew();
					return;
				}
				if (successCB != null) {
					successCB();
				}
				if (this.playerLeader) {
					this.playerLeader.resetMoveNet();
				}
				if (response.body.roleInfo.length != 0) {
					Game.PlayerWonderLandSystem.roleInfo = response.body.roleInfo[0];
					this.playerLeader.dealWonderlandRoleInfo(Game.PlayerWonderLandSystem.roleInfo);
					if (this.playerLeader.sceneHpPercent == 0) {
						this.playerLeader.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Die);
					}
				}
			}
			this.sendX = x;
			this.sendY = y;
			let req = new message.WonderlandMoveRequest();
			req.body.scene_x = x;
			y = PlayerWonderLandSystem.MapHeight - y;
			req.body.scene_y = y;
			Game.Controller.send(req, visit_func, null, this, true);
		}

		public getEventThings(x, y) {
			let t = [];
			for (let k in this.tableBuilds) {
				let v = this.tableBuilds[k];
				if (v.isCanBeAtk() == false) {
					continue;
				}
				if (v.beInScope(x, y) == true) {
					let info = {};
					info["type"] = TableEnum.Enum.LeagueWarTouchType.Building;
					info["data"] = v;
					t.push(info);
				}
			}
			for (let k in this.tableMapCells) {
				let v = this.tableMapCells[k];
				if (v.info.build_type != 5) {
					continue;
				}
				if (v.isCanBeTouch() == false) {
					continue;
				}
				if (v.beInScope(x, y) == false) {
					continue;
				}
				let [tree_x, tree_y] = v.getEventPos();
				if (this.playerLeader.isValidEventDis(tree_x, tree_y) == false) {
					continue;
				}
				let info = {};
				info["type"] = TableEnum.Enum.LeagueWarTouchType.Npc;
				info["data"] = v;
				t.push(info);
			}
			for (let k in this.tableTrees) {
				let v = this.tableTrees[k];
				if (v.beInScope(x, y) == false) {
					continue;
				}
				let [tree_x, tree_y] = v.getEventPos();
				if (this.playerLeader.isValidEventDis(tree_x, tree_y) == false) {
					continue;
				}
				let info = {};
				info["type"] = TableEnum.Enum.LeagueWarTouchType.Grass;
				info["data"] = v;
				t.push(info);
			}
			let tbl_move = [];
			for (let k in this.tableMembers) {
				let v = this.tableMembers[k];
				if (v.beInScope(x, y) == false) {
					continue;
				}
				if (v.otherState != TableEnum.TableEnumOtherState.OtherState_None) {
					continue;
				}
				if (v.otherState != message.ESceneItemType.SCENE_ITEM_TYPE_MOBS) {
					let info = {};
					info["type"] = TableEnum.Enum.LeagueWarTouchType.Mob;
					info["data"] = v;
					t.push(info);
					continue;
				}
				tbl_move.push(k);
			}

			let still_len = t.length;
			let move_len = tbl_move.length;
			let real_person = Math.min(move_len, ConstantConfig_RoleBattle.OVERLAP_SELECT_MAX_NUM - still_len);
			let tbl_rand = [];
			while (true) {
				if (tbl_rand.length >= real_person) {
					break;
				}
				let rand = TsMtirand();
				let rand_value = rand % move_len + 1;
				let value = tbl_move[rand_value - 1];
				if (Table.VIn(tbl_rand, value) == false) {
					tbl_rand.push(value);
					let info = {};
					let bMember = yuan3(this.tableMembers[value].getLegId() != 0 && this.tableMembers[value].getLegId() == this.playerLeader.getLegId(), true, false);
					info["type"] = Helper.getWonderlandPlayerType(this.playerLeader.getBattleMode(), bMember);
					info["data"] = this.tableMembers[value];
					t.push(info);
				}
			}
			t.sort((a, b) => {
				return a.type - b.type;
			});
			return t;
		}

		public checkEventThings(x, y) {
			let t = this.getEventThings(x, y);
			return yuan3(t.length == 0, false, true);
		}
		public dealEventThings(x, y) {
			let t = this.getEventThings(x, y);
			let doSomeThing = false;
			if (t.length > 1) {
				// loadUI(League_WarSelectThings).then((dialog: League_WarSelectThings) => {
				// 	dialog.SetInfo(t);
				// 	dialog.show();
				// 	doSomeThing = true;
				// });
			} else if (t.length == 1) {
				if (t[0].type == TableEnum.Enum.LeagueWarTouchType.Person) {
					//碰撞人物
					// this.collideObjectReq(t[0].data.playerInfo.id, null);
					doSomeThing = true;
				} else if (t[0].type == TableEnum.Enum.LeagueWarTouchType.Mob) {
					//碰撞怪物 
					// this.collideObjectReq(t[0].data.playerInfo.id, null);
					doSomeThing = true;
				} else if (t[0].type == TableEnum.Enum.LeagueWarTouchType.Building) {

				} else if (t[0].type == TableEnum.Enum.LeagueWarTouchType.Grass) {
					//采集
					// this.wonderlandCollectionReq(t[0].data.scenePosInfo.roleBase.id, null);
					doSomeThing = true;
				} else if (t[0].type == TableEnum.Enum.LeagueWarTouchType.Partner) {
					// this.pushPersonInterface(t[0].data.playerInfo);
					doSomeThing = true;
				} else if (t[0].type == TableEnum.Enum.LeagueWarTouchType.Npc) {
					//采集
					this.pushNpcUi(t[0].data.info);
					doSomeThing = true;
				}
			}
			return doSomeThing;
		}
		public pushNpcUi(info) {
			if (info.build_id == TableEnum.Enum.WonderlandPeaceNpc.PassCheck) {// 工作派遣
				if (PlayerHunterSystem.LevelDBFunOpenTo(67, true)) {
					loadUI(WorkSendMain).then((scene: WorkSendMain) => {
						scene.show(UI.SHOW_FROM_TOP);
					});
				}
			}
		}
		public getScreenLeft() {
			if (this.playerLeader) {
				return this.playerLeader.moveDistance - this.playerLeader.x;
			}
			return 0;
		}
		public getScreenRight() {
			return this.getScreenLeft() + UIManager.StageWidth;
		}
		public print() {
			// let type: message.FunctionOpen = message.FunctionOpen.FUNCTION_OPEN_TYPE_WONDERLAND_3;
			// console.log("moveDistance: " + (this.playerLeader as StageSceneCityLeader).moveDistance);
			// this.setTeachBuild(type, null, null);
		}
		/**
		 * 设置新手引导指定地图移动到某个建筑
		 */
		public setTeachBuild(type: message.FunctionOpen, callback: Function, objThis: any) {
			this.teachBuildFun = callback;
			this.teachThisObj = objThis;
			let item: MainCityTouchTitle = this.ownerScene.sceneUI.getTouchTitle(type);
			this.teachBuildX = -(MainCityTouchTitle.movePosList[type][0] - Math.max(this.playerLeader.moveDistance, UIManager.StageWidth / 2));
			this.ownerScene.sceneUI.clearActivity();
			this.isTeachBuild = true;
		}

		/**
		 * 新手引导指定建筑移动完成
		 */
		private onTeachBuildFinish() {
			this.isTeachBuild = false;
			this.ownerScene.sceneUI.openActivity();
			if (this.teachBuildFun) {
				this.teachBuildFun.call(this.teachThisObj);
			}
		}
		public isLockMap() {// 锁定地图，不可操作
			return this.mapLockTurn || this.isLeaveDoor || this.isGoToDoor || !this.isIntoMapComp || this.isMapAniMove || this.isGoToDoor || this.isTeachBuild;
		}
		private isTouchUI() {
			if (this.banner && this.banner.isTouchDown) {
				return true;
			}
			return false;
		}
		private checkMoveUI(touchs: egret.TouchEvent) {
			if (this.banner && this.banner.isTouchDown) {
				this.banner.OnTouchMoved(touchs);
				return true;
			}
			return false;
		}
		private clearTouchUI(touchs: egret.TouchEvent) {
			if (this.banner) {
				this.banner.setTouchEnded(touchs);
			}
		}
		public OnTouchDown(touchs: egret.TouchEvent) {
			if (this.isLockMap()) {
				return;
			}
			if (this.isTouchUI()) {
				return;
			}
			this.mapMoveType = 0;
			this.mapMovePos.setTo(touchs.stageX - Game.UIManager.x, touchs.stageY - Game.UIManager.y);
			this.isCanMoveMap = true;
			if (this.currGroupType != -1) {
				this.touchGroupType = this.currGroupType = -1;
			}
		}
		public OnTouchMove(touchs: egret.TouchEvent) {
			// if (this.playerLeader != null) {
			// 	this.playerLeader.OnTouchMove(touchs);
			// }
			if (this.checkMoveUI(touchs)) {
				return;
			}
			if (this.isLockMap()) {
				return;
			}
			if (!this.isCanMoveMap) {
				return;
			}
			let stageX = touchs.stageX - Game.UIManager.x;
			switch (this.mapMoveType) {
				case 0:
					if (Math.abs(stageX - this.mapMovePos.x) > 20) {
						this.mapMoveType = 1;
						this.touchGroupType = -1;
					}
					break;
				case 1:
					if (!this.playerLeader.isStateWalk()) {
						let offx = stageX - this.mapMovePos.x;
						this.onMoveMap(offx);
					}
					this.mapMovePos.setTo(stageX, touchs.stageY - Game.UIManager.y);
					break;
			}
		}
		private onMoveMap(offx: number) {
			let newBaseX = this.baseX - offx;
			if (newBaseX < 0) {
				offx = this.baseX;
			} else if (newBaseX > this.mapWidth - UIManager.StageWidth) {
				offx = -((this.mapWidth - UIManager.StageWidth) - this.baseX);
			}
			if (offx != 0) {
				this.mapOffX += offx;
				// this.map.x += offx;
				this.getPlayerLeader().setOffX(offx);
				super.UpdateMap(-offx, 0);
			}
		}
		public OnTouchUp(touchs: egret.TouchEvent) {
			this.clearTouchUI(touchs);
			if (this.isLockMap()) {
				return;
			}
			if (!this.isCanMoveMap) {
				return;
			}
			this.isCanMoveMap = false;
			if (this.playerLeader != null) {
				switch (this.mapMoveType) {
					case 0:
						this.mapMovePos.setTo(touchs.stageX - Game.UIManager.x, touchs.stageY - Game.UIManager.y);
						this.isMapAniMove = true;
						break;
					case 1:
						break;
				}
			}
		}
		public onTouchGroup(item: MainCityTouchTitle, touchType: number) {
			if (this.isLeaveDoor || this.isGoToDoor) {
				return;
			}
			if (touchType == 0) {
				this.touchGroupType = item.type;
				this.currGroupType = -1;
			} else if (touchType == 1) {
				if (this.touchGroupType == item.type) {
					this.currGroupType = this.touchGroupType;
					let pos: number[] = MainCityTouchTitle.movePosList[this.currGroupType];
					if (pos) {
						let random = item.getTouchRandom();
						this.mapMovePos.setTo(pos[0] + Util.randomValue(-random, random) - this.playerLeader.moveDistance + this.playerLeader.x, pos[1]);
						this.isMapAniMove = true;
					} else {
						egret.error("move pos is null: " + this.currGroupType);
					}
				} else {
					this.currGroupType = this.touchGroupType = -1;
				}
			}
		}
		private setMove(x, y) {
			if (y > 0) {
				this.getPlayerLeader().OnTouchDownPos(x, y);
				this.getPlayerLeader().OnTouchUpPos(x, y);
			}
		}

		private onReleaseAni() {
			if (this.aniList) {
				for (let i = 0; i < this.aniList.length; ++i) {
					this.aniList[i].onRelease();
					this.aniList[i] = null;
				}
				this.aniList = null;
			}
		}
		public release() {
			super.release();
			this.onReleaseAni();
			this.isSceneExit = true;
			this.playerLeaderPet = null;
			if (this.aniManager) {
				this.aniManager.onRelease();
				this.aniManager = null;
			}
			if (this.banner) {
				if (this.banner.parent) {
					this.banner.parent.removeChild(this.banner);
				}
				this.banner = null;
			}
			Game.EventManager.off(GameEvent.SERVER_NOTICE_SCENE_ITEM_POS, this.SceneItemPosNotice_Visit, this);
			Game.EventManager.off(GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO, this.SceneItemPosInfoNotice_Visit, this);
			Game.EventManager.off(GameEvent.SERVER_NOTICE_BATTLE_IMITATE_RESULT, this.LeagueWarBattleResultNotice_Visit, this);
			Game.EventManager.off(GameEvent.RESET_PLAYER_AVATA, this.resetPlayerAvata, this);
			Game.EventManager.off(GameEvent.MAIN_CITY_UPDATE, this.updateUIStates, this);
			Game.EventManager.off(GameEvent.PLAYER_LEVEL_UP, this.updateUIStates, this);
			Game.EventManager.off(GameEvent.SERVER_LINE_CHANGE, this.updateServerLine, this);
			// Game.EventManager.off(GameEvent.MAIN_CITY_MEMBER_LIST, this.reMapEnterReq, this);
			Game.EventManager.off(GameEvent.PLAYER_LICENCELEVEL_CHANGE, this.updateLicenceLevel, this);
			Game.EventManager.off(GameEvent.CLOSE_SCENE, this.closeScene, this);
		}
		public close() { }
		public OnExit() {
			if (this.ownerScene) {
				this.ownerScene.close();
				this.ownerScene = null;
			}
		}
	}
}
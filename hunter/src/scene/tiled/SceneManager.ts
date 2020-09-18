namespace zj {
	/**
	 * tiledMap 管理类
	 * zhaiweili
	 * 2019.10.24
	 */
	export class SceneManager {
		public static loginLoadingScene: Scene = null;
		public static adventureOpenMax: number = 16;// 最大开启到16章，第17章不开放
		public static cityMapId: number = 98;// 主场景地图编号(唯一)
		public static mapIdAdventure: number = 99;// 副本场景地图编号(唯一)
		public static adventureClassStr:string = "zj.SceneMapTiledAdventureUI";// 副本类名
		public static mainCityClassStr:string = "zj.MainCityUI";// 主城类名
		public static instance: SceneManager = new SceneManager();
		public static scenePosInfo: message.ScenePosInfo = null;
		public static initType: number;//0-普通进入主城，1-副本退出进入主城, 2-退出大草原
		public static teachId: number;// 新手引导地图id
		public static adventurePos: egret.Point;

		private openMainCityCallback: Function[];

        public info;
		private constructor() {
			this.openMainCityCallback = [];
		}

		public static uninit(){
			SceneManager.initType = 0;
		}

		// 只有第一次进入城镇，loading与加载用同一个
		public EnterMainCityLogin() {
			let scene = Game.UIManager.topScene();
			Game.UIManager.popAllUIs();
			MapSceneLoading.getInstance().loadFightResLoading(SceneManager.cityMapId, () => {
				StageSceneManager.Instance.ChangeSceneLoading(StageSceneMainCity);
			}, this);
			scene.show();
			SceneManager.loginLoadingScene = scene;
		}
		// 进入城镇，单独的加载机制（重新创建场景）
		public EnterMainCityNew(callback: Function = null) {
			MapSceneLoading.getInstance().loadFightRes(SceneManager.cityMapId, () => {
				StageSceneManager.Instance.ChangeSceneLoading(StageSceneMainCity);
				if(callback){
					this.openMainCityCallback.push(callback)
				}
			}, this);
		}
		// 进入城镇后回调
		public callbackMainCity(){
			while(this.openMainCityCallback.length > 0){
				let callback: Function = this.openMainCityCallback.shift();
				callback.call(null);
			}
		}
		// 主城断网后，重新进入主城
		public ReEnterMainCityNew(){
			Game.UIManager.popAllUIs();
			this.EnterMainCityNew();
		}
		// 处理服务器返回错误消息时的逻辑
		public dealCodeError(code){
			if(code == 10300){// 猎人不存在
				SceneManager.instance.ReEnterMainCityNew();
			}
		}
		// 返回主城，用于有多个UI界面的时候
		public EnterMainCityBack(){
			let uimanager = Game.UIManager;
			uimanager.popAllDialogs();// 清除所有dialog
			while(uimanager.sceneCount() > 0){// 逐层删除scene
				if(this.isMainCityScene()){
					return;
				} else {
					if(uimanager.sceneCount() == 1){
						uimanager.popScene();
						return;
					}
					uimanager.popScene();
				}
			}
		}
		// 检测战斗场景结束后，是否有其他场景，如果没有，则创建主场景
		public checkFightOver(){
			let scene = Game.UIManager.topScene();
			if(!scene){
				this.EnterMainCityNew();
			}
		}
		/**
		 * 进入副本 openType: 打开类型(在弹出UI时打开dialog), 
		 * 默认0-只打开地图,
		 * 1-打开当前最高普通副本列表，
		 * 2-打开当前最高挑战副本列表, 
		 * -1-打开openArea副本(普通)， 
		 * -2-打开openArea副本（挑战）
		 */
		public EnterAdventure(openType: number = 0, openArea: number = -1) {
			let topScene = Game.UIManager.topScene();
			if (topScene instanceof SceneMapTiledAdventureUI) {
				if (openType != 0) {
					topScene.setOpenType(openType, openArea);
					topScene.checkOpenType();
				}
			} else {
				Game.EventManager.event(GameEvent.OPEN_LOGING_SCENE);
				loadUI(SceneMapTiledAdventureUI, true)
					.then((scene: SceneMapTiledAdventureUI) => {
						Game.EventManager.event(GameEvent.LOGING_SCENE_PROGRESS, 1);
						scene.onInit();
						scene.setOpenType(openType, openArea);
						scene.onLoadMap();
					});
			}
		}
		/**
		 * 顶层UI是否为主城
		 */
		public isMainCityScene(ui: Scene = null){
			if(!ui){
				ui = zj.Game.UIManager.topScene();
			}
			// egret.getQualifiedClassName(zj.Game.UIManager.topScene()) == "zj.MainCityScene"
			return ui instanceof MainCityUI;
		}
		/**
		 * 顶层UI是否为副本
		 */
		public isAdventureScene(ui: Scene = null){
			if(!ui){
				ui = zj.Game.UIManager.topScene();
			}
			return ui instanceof SceneMapTiledAdventureUI;
		}
		
		/**
		 * 进入世界大平原界面
		 */
		public EnterSceneZorkBoss(){
            if (PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_WONDERLAND_3, true)) {
                this.info = TableWonderland.Item(3);
                this.SetFormatReqOnly();
				return true;
            }
			return false;
        }
        private SetFormatReqOnly() {
            let req = new message.SetFormationRequest();
            let formation = Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1];
            formation.formationType = message.EFormationType.FORMATION_TYPE_WONDERLAND;
            req.body.formations.push(formation);
            Game.Controller.send(req, this.SetFormatOnly_Visit, null, this, false);
        }
        private SetFormatOnly_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
            let response = <message.SetFormationResponse>resp;
            if (response.header.result != 0) {
                toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            this.WonderlandEnterReq();
        }
        private WonderlandEnterReq() {
            let req = new message.WonderlandEnterRequest();
            // req.body.id = this.info.wonderland_id;
            req.body.id = SceneManager.teachId || this.info.wonderland_id;
            Game.PlayerWonderLandSystem.willGoRpg();
            Game.Controller.send(req, this.WonderlandEnter_Visit, null, this, false);
        }
        private WonderlandEnter_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
            let response = <message.WonderlandEnterResponse>resp;
            if (response.header.result != 0) {
                toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            Game.PlayerWonderLandSystem.OpenwonderlandScene(response);
            Game.PlayerWonderLandSystem.mapBlockIndex = this.info.block_index;
            Game.PlayerWonderLandSystem.wonderlandId = SceneManager.teachId || this.info.wonderland_id;
			SceneManager.teachId = null;
            let MapId = TableWonderland.Item(Game.PlayerWonderLandSystem.wonderlandId).map_id;
            MapSceneLoading.getInstance().loadFightRes(MapId, this.wonderland, this);

            Teach.addTeaching();
        }
        private wonderland() {
            StageSceneManager.Instance.ChangeScene(StageSceneWonderland);
        }
	}

	export class TILEDMAP_KEY {// 图层名类型(其他均为地表层)
		public static block: string = "block";// 碰撞层
		public static objects: string = "objects";// 对象层
		public static order: string = "order";// 单位元素层
		public static cloud: string = "cloud";// 云层
		public static born: string = "born";// 出生点
		public static surface: string = "surface";
		// public static decorate: string = "decorate";
		public static box: string = "box";// 出生点类型
		public static npc: string = "npc";// NPC类型
	}

	export enum LAYER_TYPE {
		surface = 0,
		unit = 1,
		top = 2,
		sky = 3,
		max
	}
}
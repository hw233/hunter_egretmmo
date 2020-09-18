namespace zj {
	export class MapSceneLoading {
		private static instance;
		public constructor() {
			Game.EventManager.on(GameEvent.LOGING_SCENE, this.openPanel, this);
		}
		public static getInstance(): MapSceneLoading {
			if (this.instance == null) {
				this.instance = new MapSceneLoading();
			}
			return this.instance;
		}
		public comfun: Function;
		public thisAny: any;
		private countAll = 2;
		private count;
		private mapId;
		public loadFightRes(id, fun, _thisAny) {
			this.mapId = id;
			this.comfun = fun;
			this.thisAny = _thisAny;
			Game.EventManager.event(GameEvent.OPEN_LOGING_SCENE);
			StageSceneManager.Instance.clearScene();
			StageSceneManager.Instance.newTemporaryScene();
		}
		
		public loadFightResLoading(id, fun, _thisAny) {
			this.mapId = id;
			this.comfun = fun;
			this.thisAny = _thisAny;
			// Game.EventManager.event(GameEvent.OPEN_LOGING_SCENE);
			StageSceneManager.Instance.clearScene();
			StageSceneManager.Instance.newTemporaryScene();
			this.openPanel();
		}
		/**地图数据 */
		public data;
		public url: string = "";
		private openPanel() {
			if (!this.comfun) return
			let resArr = [];
			this.url = AppConfig.ProjectUrlRoot + "resource/config/map/" + this.mapId + "/" + this.mapId + ".tmx";
			resArr = this.resMap(this.mapId);
			resArr.push(UIConfig.UIConfig_LeagueWarScene.roleBloodBoard
				, UIConfig.UIConfig_LeagueWarScene.roleProgressBoard
				, UIConfig.UIConfig_LeagueWarScene.roleBuildProgressBar
				, UIConfig.UIConfig_LeagueWarScene.sceneNameBoard
				, UIConfig.UIConfig_LeagueWarScene.roleBloodMyBar
				, UIConfig.UIConfig_LeagueWarScene.roleBloodEnemyBar
				, UIConfig.UIConfig_LeagueWarScene.roleCollectProgressBar
			);
			let bossui = UIResource["Zork_Boss"];
			for (let i = 0; i < bossui.length; i++) {
				resArr.push(bossui[i]);
			}
			let uiArr = UIResource["WonderLandChoose"];
			for (let i = 0; i < uiArr.length; i++) {
				resArr.push(resArr[i]);
			}
			let groupName = "mapScene" + egret.getTimer();
			if (!RES.createGroup(groupName, resArr, true)) {
				let str = LANG("创建资源组失败:") + groupName;
				//toast(str);
				return;
			}
			this.countAll = 2;
			this.startLoadFight();
			Game.RESGroupManager.loadGroup(groupName).then(() => {//加载成功
				this.resComplete();
			}).catch((error) => {
				//失败
				//toast(error);
				return;
			});
			RES.getResAsync(this.mapId + "_tmx", (value?: any, key?: string) => {
				var data: egret.XML = egret.XML.parse(value);
				this.data = data;
				this.resComplete();
			}, this);

		}
		public static BlackRole = "wj_hei";
		private startLoadFight() {
			this.count = 0;
			//
			let uispine = ["nianshou", "ui_tongyong_xinshou", "wj_032_xisuo", "wj_040_zhadanmo", "wj_034_niteluo", "npc_card_girl", "wj_031_xiaojie", "wj_002_xiaodi", "wj_007_banzang", "wj_023_menqi", "ui_tongyong_kongbai", "ui_tanlanzhidao_02", "ui_tanlanzhidao_01", "ui_tanlanzhidao_guoshu_da", "ui_tanlanzhidao_guoshu_xiao", "ui_tanlanzhidao_chuansongmen", "matou_guoshu_da", MapSceneLoading.BlackRole];
			this.countAll = this.countAll + uispine.length;
			for (let i = 0; i < uispine.length; i++) {
				let dbName = uispine[i];
				Game.DragonBonesManager.preloadDragonbone(StageSceneManager.Instance.temporaryScene, dbName)
					.then(() => {
						this.resComplete();
					})
					.catch((error) => {
						let _dbName = dbName;
						//toast(error);
					});
			}
		}
		public resComplete() {
			this.count = this.count + 1;
			if (this.count == this.countAll) {//加载完成回调成功
				this.comfun.call(this.thisAny);
				this.comfun = null;
				this.thisAny = null;
			}
			Game.EventManager.event(GameEvent.LOGING_SCENE_PROGRESS, this.count / this.countAll);
		}
		private resMap(id) {
			let _json = Game.ConfigManager.getTable(id + ".json");
			let urlArr: string[] = [];
			for (let i = 0; i < _json["gameobjects"].length; i++) {
				let mainTbl = _json["gameobjects"][i];
				for (let k = 0; k < mainTbl["gameobjects"].length; k++) {
					let obj = mainTbl["gameobjects"][k];
					for (let j = 0; j < obj["gameobjects"].length; j++) {
						let data = obj["gameobjects"][j];
						for (let l = 0; l < data["components"].length; l++) {
							let fData = data["components"][l];
							let fileData = fData.fileData;
							let imgUrl = fileData.path;
							let egretUrl = this.CocosUrlToEgretUrl(imgUrl);
							if (imgUrl != "" && imgUrl.indexOf("wu.png") == -1 && urlArr.indexOf(egretUrl) == -1) {
								urlArr.push(egretUrl);
							}
						}
					}
				}
			}
			return urlArr;
		}
		/**cocos场景配置坐标转换成Egret坐标 */
		private CocosUrlToEgretUrl(url: string) {
			let arrS: string[] = url.split(".");
			let sourceArr: string[] = arrS[0].split("/");
			let source: string = sourceArr[sourceArr.length - 1];
			return "map_" + sourceArr[sourceArr.length - 2] + "_" + source + "_png";
		}
	}
}
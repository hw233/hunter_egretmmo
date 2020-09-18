namespace zj {

	// 改版主城容器
	// 翟伟利
	// 2019.11.7

	export class MainCityUI extends Scene {

		public sceneMap: StageSceneMainCity;
		public sceneUI: MainCitySceneNew;
		private temporaryScene: TemporaryScene;
		public constructor() {
			super();
			this.width = UIManager.StageWidth;
            this.height = UIManager.StageHeight;
		}
        public onStageResize() {
			if(this.sceneUI){
				this.sceneUI.width = UIManager.StageWidth;
				this.sceneUI.height = UIManager.StageHeight;
			}
		}

		public setMap(sceneMap: StageSceneMainCity) {
			this.sceneMap = sceneMap;
			this.addChildAt(this.sceneMap, 0);
			this.temporaryScene = StageSceneManager.Instance.gettemporaryScene;
		}

		public setUI(sceneUI: MainCitySceneNew) {
			this.sceneUI = sceneUI;
			sceneUI.width = UIManager.StageWidth;
            sceneUI.height = UIManager.StageHeight;
			sceneUI.setOwnerScene(this);
			this.addChild(this.sceneUI);
		}

		public onWalkStart(){
            this.sceneMap.onWalkStart();
		}

		public onWalkEnd(){
			this.sceneMap.onWalkEnd();
		}

		// 场景进入栈顶
		public onEntryTopScene() {
			if(this.sceneMap && this.sceneUI){
				if (this.sceneMap) {
					this.sceneMap.onEntryTopScene();
				}
				if (this.sceneUI) {
					this.sceneUI.onEntryTopDialog();
				}
			} else {
				super.close();
			}
		}

		// 场景离开栈顶
		public onLeaveTopScene() {
			if (this.sceneMap) {
				this.sceneMap.onLeaveTopScene();
			}
			if (this.sceneUI) {
				this.sceneUI.onLeaveTopDialog();
			}
		}
		/**
		 * 开门进入副本
		 */
		public EnterAdventure(){
			Game.PlayerWonderLandSystem.WonderlandLeave().then(() => {
				StageSceneManager.Instance.GetCurScene().delMember(Game.PlayerInfoSystem.BaseInfo.id);
				StageSceneManager.Instance.clearScene();
				Game.PlayerWonderLandSystem.scenePosInfo = {};
				Game.PlayerWonderLandSystem.timePosInfo = {};
				SceneManager.instance.EnterAdventure();
			}).catch(() => {

			})
		}
		public show(animation?: string) {
			super.show();
			SceneManager.instance.callbackMainCity();
        }

		// 关闭场景
		public close(animation?: string) {
			// super.close();
			let isTop = Game.UIManager.topScene() == this;
			if(isTop){
				super.close();
				Game.UIManager.removeScene(this.temporaryScene);
			} else {
				let sceneName = egret.getQualifiedClassName(this);
				this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.close, this);
				Game.UIManager.removeScene(this);
				Game.EventManager.event(GameEvent.CLOSE_SCENE,{typeName: sceneName});
				Game.UIManager.removeScene(this.temporaryScene);
			}
			if (this.sceneUI) {
				if(this.sceneUI.parent){
					this.removeChild(this.sceneUI);
				}
				this.sceneUI = null;
			}
			if (this.sceneMap) {
				this.sceneMap.release();
				if(this.sceneMap.parent){
					this.removeChild(this.sceneMap);
				}
				this.sceneMap = null;
			}
		}
	}
}
namespace zj {
	/**
	 * 地图UI基类
	 * zhaiweili
	 * 2019.10.24
	 */
	export class SceneMapUIBase extends Scene{
		public sceneMap: SceneMapBase;
		public constructor() {
			super();
			this.onSkinName();
			this.width = UIManager.StageWidth;
			this.height = UIManager.StageHeight;
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
		}
		protected onSkinName(){

		}
		public onInit(){
			// Game.UIManager.openWaitingUI();
			// Game.EventManager.event(GameEvent.OPEN_LOGING_SCENE);
		}
		public onLoadMap(){
			
		}
		// 地图加载完成
		public mapLoadFinish(ani?: string){
			// Game.UIManager.closeWaitingUI();
			Game.EventManager.event(GameEvent.CLOSE_LOGING_SCENE);
			this.show(ani);
		}
        // 场景进入栈顶
        public onEntryTopScene() {
            if(this.sceneMap){
				this.sceneMap.onEntryTopScene();
			} else {
				egret.error("SceneMapUIBase - onEntryTopScene - error: sceneMap is null");
			}
			this.resize();
			this.addEventListener(egret.Event.RESIZE, this.resize, this);
			// egret.startTick(this.Update, this);
			// egret.Ticker.getInstance().register(this.Update, this);
			this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);

        }

        // 场景离开栈顶
        public onLeaveTopScene() {
            if(this.sceneMap){
				this.sceneMap.onLeaveTopScene();
			}
			// egret.stopTick(this.Update, this);
			// egret.Ticker.getInstance().unregister(this.Update, this);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
			this.removeEventListener(egret.Event.RESIZE, this.resize, this);
        }

		protected resize() {
			this.width = UIManager.StageWidth;
			this.height = UIManager.StageHeight;
			if(this.sceneMap){
				this.sceneMap.resize();
			}
		}

		private timerNum = 0;
		private Ticktimer: number = 0;
		private enterFrame() {
			this.timerNum = (egret.getTimer() - this.Ticktimer) / 1000;
			if (this.timerNum > 0.033) {
				this.timerNum = 0.033;
			}
			this.Update(this.timerNum);
			this.Ticktimer = egret.getTimer();
		}

		protected Update(tick) {
			tick /= 1000;// 转换为毫秒
			if(this.sceneMap){
				this.sceneMap.Update(tick);
			}
			return false;
		}

		/**
		 * 地图被移出屏幕时调用
		 */
		protected onRemoveFromStage() {
			
		}

	}
}
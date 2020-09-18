namespace zj {

	/**
	 * 副本界面-关卡跑图
	 * zhaiweili
	 * 2019.11.7
	 */
	export class SceneMapArea1 extends SceneMapBase {
		private currData: TableInstanceArea;
		public constructor() {
			super();
		}
		protected initUI() {
			super.initUI();
			
		}
		public init(ui:SceneMapUIBase, param: any = null) {
			super.init(ui, param);
			
		}
		public setData(data: TableInstanceArea) {
			this.currData = data;
		}

		// 场景进入栈顶
		public onEntryTopScene() {
		}

		// 场景离开栈顶
		public onLeaveTopScene() {
		}
		/**
		 * 单位移动中调用
		 */
		public playerMove(unit: egret.DisplayObjectContainer, offx: number, offy: number) {

		}
		/**
		 * 单位移动结束
		 */
		public playerMoveFinish(unit: egret.DisplayObjectContainer) {

		}
	}
}
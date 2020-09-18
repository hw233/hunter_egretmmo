namespace zj {

	/**
	 * 副本界面-关卡跑图ui
	 * zhaiweili
	 * 2019.11.7
	 */
	export class SceneMapAreaUI extends SceneMapUIBase{
		private currData: TableInstanceArea;
		private btnClose: eui.Button;
		public constructor() {
			super();
		}
		/**
		 * 为dialog添加UI皮肤(UI皮肤在tiledMap地图上层)
		 */
		protected onSkinName() {
			this.skinName = "resource/skins/adventure/AdventureMapRunSkin.exml";
		}
		public onInit(){
			super.onInit();
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTouchClose, this);
		}
		public onLoadMap(){
			// let curMobInfo = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].mobsMap[this.instanceId];
			// Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curMobID = this.curMobInfo.mobId;
			// Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curChapterID = Game.PlayerInstanceSystem.Chapter(this.curMobInfo.mobId).chapter_id;
			// Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curAreaID = this.father.getZoneIndex();
			// Game.PlayerInstanceSystem.MobsInfo_Req(this.instanceId)
			// 	.then((value: {}) => {
			// 		Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
			// 		this.id = this.instanceId;
			// 		Game.PlayerFormationSystem.blowGuide = this.instanceId;
			// 		loadUI(CommonFormatePveMain)
			// 			.then((dialog: CommonFormatePveMain) => {
			// 				dialog.show(UI.SHOW_FROM_TOP);
			// 				dialog.setInfo(this.id);
			// 			});
			// 	})
			// 	.catch((reason) => {
			// 		// toast(Helper.GetErrorString(reason));
			// 	});


			// let instanceId = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID;
			
			
			let mobID = this.currData.area_normal[0];
			let chapterId = TableChapterNormal.Table()[mobID].chapter_pack[0];
			let mapId = TableInstance.Table()[chapterId].battle_bg;

			this.sceneMap = newUI(SceneMapNodeBase);
			(this.sceneMap as SceneMapNodeBase).init(this, mapId);
			this.addChildAt(this.sceneMap, 0);

		}
		public setData(data: TableInstanceArea) {
			this.currData = data;
		}
		private OnTouchClose() {
			this.close();
		}
	}
}
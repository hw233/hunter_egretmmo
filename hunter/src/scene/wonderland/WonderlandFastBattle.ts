namespace zj {
	/**
	 * @author xingliwei
	 * 
	 * @date 2019-5-20
	 * 
	 * @class 贪婪之岛战报
	 */
	export class WonderlandFastBattle extends Dialog {
		public btnClose: eui.Button;
		public listTable: eui.List;
		public btnTurn: eui.ToggleSwitch;

		private scene;
		private Type: number = 0;
		private resultList = [];
		private picId;
		public constructor() {
			super();
			this.skinName = "resource/skins/wonderland/WonderlandFastBattleSkin.exml";
			this.init();
			let fastBattleSwitch = Device.GetSaveBoolInfo(Game.PlayerInfoSystem.BaseInfo.id + StringConfig_Save.fastBattleSwitch);
			if (fastBattleSwitch == null) {
				Device.fastBattleSwitch = false;
			} else {
				Device.fastBattleSwitch = fastBattleSwitch;
			}
			this.btnTurn.addEventListener(eui.UIEvent.CHANGE, this.onBtnTurn, this);
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		}

		private init() {
			Game.EventManager.on(GameEvent.SERVER_NOTICE_BATTLE_IMITATE_RESULT, this.loadinfo, this)
			this.scene = StageSceneManager.Instance.GetCurScene()
			if (Gmgr.Instance.layerId == TableEnumLayerId.LAYER_WONDERLAND) {
				this.Type = message.ESceneType.SCENE_TYPE_WONDERLAND
				this.resultList = Game.PlayerWonderLandSystem.resultList;
			} else if (Gmgr.Instance.layerId == TableEnumLayerId.LAYER_DARKLAND) {
				this.Type = message.ESceneType.SCENE_TYPE_WONDERLAND
				this.resultList = Game.PlayerWonderLandSystem.resultList;
			} else if (Gmgr.Instance.layerId == TableEnumLayerId.LAYER_LEAGUE_FIGHT) {
				// this.Type = message.ESceneType.SCENE_TYPE_LEAGUE_WAR
				this.resultList = Game.PlayerWonderLandSystem.resultList;
			}

			this.InitList();
			this.SetButtonTurn();
		}

		private loadinfo(ev: egret.Event) {
			this.picId = ev.data;

		}

		private InitList() {
			let array = new eui.ArrayCollection();
			for (let i = 0; i < this.resultList.length; i++) {
				let data = new WonderlandFastBattleItemData();
				data.index = i;
				data.info = this.resultList[i];
				array.addItem(data);
			}
			this.listTable.dataProvider = array;
			this.listTable.itemRenderer = WonderlandFastBattleItem
		}

		private onBtnTurn(e: eui.UIEvent) {
			let btn: eui.ToggleButton = e.target;
			zj.Device.fastBattleSwitch = !zj.Device.fastBattleSwitch
			zj.Device.SetSaveBoolInfo(Game.PlayerInfoSystem.BaseInfo.id + StringConfig_Save.fastBattleSwitch, zj.Device.fastBattleSwitch);
		}

		private SetButtonTurn() {
			this.btnTurn.selected = !Device.GetSaveBoolInfo(Game.PlayerInfoSystem.BaseInfo.id + StringConfig_Save.fastBattleSwitch);
			let selected = zj.Device.GetSaveBoolInfo(Game.PlayerInfoSystem.BaseInfo.id + StringConfig_Save.fastBattleSwitch);
			if (selected == null) {
				zj.Device.fastBattleSwitch = false;
			} else {
				zj.Device.fastBattleSwitch = selected;
			}
		}


		private onBtnClose() {
			this.close(UI.HIDE_TO_TOP);
		}
	}
}
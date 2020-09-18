namespace zj {
	/**
	 * @class 通行证主界面任务UI
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-19
	 */
	export class HXH_BattlePassMission extends UI {
		private imgTipPass: eui.Image;
		private labelRefresh: eui.Label;
		private labelLv: eui.BitmapLabel;
		private scrollerMission: eui.Scroller;
		private listMission: eui.List;

		private listMissionData: eui.ArrayCollection = new eui.ArrayCollection();

		public constructor() {
			super();
			this.skinName = "resource/skins/battlePass/HXH_BattlePassMissionSkin.exml";
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.closeUI, this);
			Game.EventManager.on(GameEvent.UPDATE_BATTLEPASS_MISSION, this.SetInfo, this);
			Game.EventManager.on(GameEvent.PLAYER_PERMITLEVEL_CHANGE, this.SetInfo, this);
		}

		private SetInfo(ev: egret.Event) {
			this.scrollerMission.stopAnimation();
			this.scrollerMission.viewport.scrollV = 0;
			if (Game.PlayerInfoSystem.BaseInfo.permitPay == 0) {
				this.imgTipPass.source = cachekey(UIConfig.UIConfig_BattlePass.lowPass, this);
			}
			else {
				this.imgTipPass.source = cachekey(UIConfig.UIConfig_BattlePass.highPass, this);
			}

			this.labelLv.text = ev.data == null ? Game.PlayerInfoSystem.BaseInfo.permitLevel.toString() : ev.data.toString();

			let tblInfo;
			let type: number;
			switch (HXH_BattlePass.missionIndex) {
				case 1:
					tblInfo = TablePermitMission.Table();
					type = 1;
					this.labelRefresh.text = "每天四点刷新";
					break;
				case 2:
					tblInfo = Game.PlayerMissionSystem.GetBattlePassWeekMission();
					type = 2;
					this.labelRefresh.text = "每周一四点刷新";
					break;
				case 3:
					tblInfo = Game.PlayerMissionSystem.GetBattlePassMonthMission();
					type = 3;
					this.labelRefresh.text = "每月一号四点刷新";
					break;
			}

			this.listMissionData.removeAll();
			for (let [k, v] of HelpUtil.GetKV(tblInfo)) {
				let itemData = new HXH_BattlePassMissionItemData();
				itemData.id = Number(k);
				itemData.info = v;
				itemData.type = type;
				this.listMissionData.addItem(itemData);
			}
			this.listMission.dataProvider = this.listMissionData;
			this.listMission.itemRenderer = HXH_BattlePassMissionItem;
		}

		private closeUI() {
			this.close();
		}
	}
}
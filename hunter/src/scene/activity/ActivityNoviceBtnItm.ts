namespace zj {
	/** 
	 * @author xing li wei
	 * 
	 * @date 2019-11-13
	 * 
	 * @class 新手狂欢按钮
	 */
	export class ActivityNoviceBtnItm extends eui.ItemRenderer {
		public btn: eui.Button;
		public imgRed: eui.Image;
		private vis: boolean = true;
		private missionGift: Array<TableMissionGift[]> = [];
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityNoviceBtnItmSkin.exml";
			cachekeys(<string[]>UIResource["ActivityNoviceBtnItm"], null);
			for (let i = 1; i <= 7; i++) {
				let a = [];
				for (let j = 1; j <= 4; j++) {
					a.push(TableMissionGift.Table()[(j + "0" + i)]);
				}
				this.missionGift.push(a);
			}
		}

		protected dataChanged() {
			let data = this.data as ActivityNoviceBtnItmData;
			if (this.vis) {
				this.vis = false;
				Set.ButtonBackgroud(this.btn, "ui_acitivity_novicenew_qieye" + data.index + "-2_png", "ui_acitivity_novicenew_qieye" + data.index + "-2_png", "ui_acitivity_novicenew_qieye" + data.index + "-1_png")
			}
			if (data.father.btnIndex == data.index) {
				this.imgRed.x = 155;
				this.btn.enabled = false;
			} else {
				this.imgRed.x = 130;
				this.btn.enabled = true;
			}
			let a = (index): boolean => {
				return Table.FindF(data.father.data[index].state, (k, v) => {
					return v == TableEnum.Enum.NoviceState.REWARD && !data.father.data[data.index].lock;
				})
			}
			let bTip = false;
			switch (data.index) {
				case 1://0
					bTip = a(0) || a(1);
					break;
				case 2://2
					bTip = a(2) || a(3) || a(4);
					break;
				case 3://4
					bTip = a(5) || a(6) || a(7);
					break;
				case 4://6
					bTip = a(8) || a(9) || a(10);
					break;
				case 5://8
					bTip = a(11) || a(12) || a(13) || a(14);
					break;
				case 6://10
					bTip = a(15) || a(16) || a(17) || a(18);
					break;
				case 7://12
					bTip = a(19) || a(20) || a(21) || a(22);
					break;
			}
			let vis1: boolean = false;
			for (let i = 0; i < this.missionGift[data.index - 1].length; i++) {
				let vis = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.mission_gift, (k, v: number) => {
					return v == this.missionGift[data.index - 1][i].index;
				});
				if (i == 0) {
					if (!vis) {
						vis1 = true;
						i = 4;
					}
				} else if (i == 3) {
					if (!vis && (Game.PlayerInfoSystem.BaseInfo.chargeToken / 10 > this.missionGift[data.index - 1][3].charge_token / 10)) {
						vis1 = true;
						i = 4;
					}
				}
			}
			let vis2 = !(Helper.day() < data.index);//Math.floor((Game.Controller.curServerTime - Game.PlayerInfoSystem.BaseInfo.createTime) / 86400) + 1 
			this.imgRed.visible = (bTip && vis2) || (vis1 && vis2);
		}
	}
	export class ActivityNoviceBtnItmData {
		index: number;
		father: ActivityNovice
	}
} 
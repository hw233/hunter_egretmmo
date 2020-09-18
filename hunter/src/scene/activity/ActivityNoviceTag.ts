namespace zj {
	/** 
	 * @author xing li wei
	 * 
	 * @date 2019-3-26
	 * 
	 * @class 新手狂欢list按钮子项
	 */
	export class ActivityNoviceTag extends eui.ItemRenderer {
		private btnTag: eui.Button;
		private imgRedIcon: eui.Image;
		private missionGift: Array<TableMissionGift[]> = [];
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityNoviceTagSkin.exml";
			cachekeys(<string[]>UIResource["ActivityNoviceTag"], null);

			for (let i = 1; i <= 7; i++) {
				let a = [];
				for (let j = 1; j <= 4; j++) {
					a.push(TableMissionGift.Table()[(j + "0" + i)]);
				}
				this.missionGift.push(a);
			}
		}
		protected dataChanged() {
			let data = this.data as ActivityNoviceTagData;
			let label: eui.Label = <eui.Label>this.btnTag.getChildAt(1);
			switch (data.index) {
				case 0:
					switch (data.father.btnIndex) {
						case 1:
							label.text = "普通副本";
							break;
						case 2:
							label.text = "天空竞技场";
							break;
						case 3:
							label.text = "竞技切磋";
							break;
						case 4:
							label.text = "流星街试炼";
							break;
						case 5:
							label.text = "挑战副本";
							break;
						case 6:
							label.text = "遗迹探索";
							break;
						case 7:
							label.text = "贪婪之岛";
							break;
					}
					break;
				case 1:
					switch (data.father.btnIndex) {
						case 1:
							label.text = "伙伴招募";
							break;
						case 2:
							label.text = "猎人成长";
							break;
						case 3:
							label.text = "公会成长";
							break;
						case 4:
							label.text = "幸运娃娃机";
							break;
						case 5:
							label.text = "获得卡片";
							break;
						case 6:
							label.text = "消耗体力";
							break;
						case 7:
							label.text = "觉醒突破";
							break;
					}
					break;
				case 2:
					label.text = "福利礼包";
					break;
			}
			if (data.father.typeId == data.index + 1) {
				this.btnTag.enabled = false;
			} else {
				this.btnTag.enabled = true;
			}
			this.setInfoTips(data);
		}

		private setInfoTips(data: ActivityNoviceTagData) {
			let bTip = false;
			let vis = (index): boolean => {
				return Table.FindF(data.father.data[index].state, (k, v) => {
					return v == TableEnum.Enum.NoviceState.REWARD && !data.father.data[data.index].lock;
				})
			}
			switch (data.index) {
				case 0:
					switch (data.father.btnIndex) {
						case 1://0
							bTip = vis(0);
							break;
						case 2://2
							bTip = vis(2);
							break;
						case 3://4
							bTip = vis(5);
							break;
						case 4://6
							bTip = vis(8) || vis(9);
							break;
						case 5://8
							bTip = vis(11)
							break;
						case 6://10
							bTip = vis(15) || vis(16) || vis(17);
							break;
						case 7://12
							bTip = vis(20) || vis(21);
							break;
					}
					break;
				case 1:
					switch (data.father.btnIndex) {
						case 1://1
							bTip = vis(1);
							break;
						case 2://3
							bTip = vis(3) || vis(4);
							break;
						case 3://5
							bTip = vis(6) || vis(7);
							break;
						case 4://7
							bTip = vis(10);
							break;
						case 5://9
							bTip = vis(12) || vis(13) || vis(14);
							break;
						case 6://11
							bTip = vis(18);
							break;
						case 7://13
							bTip = vis(21) || vis(22);
							break;
					}
					break;
				case 2:
					for (let i = 0; i < this.missionGift[data.father.btnIndex - 1].length; i++) {
						let vis = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.mission_gift, (k, v: number) => {
							return v == this.missionGift[data.father.btnIndex - 1][i].index;
						});
						if (i == 0) {
							if (!vis) {
								this.imgRedIcon.visible = true;
								return;
							}
						} else if (i == 3) {
							if (!vis && (Game.PlayerInfoSystem.BaseInfo.chargeToken / 10 > this.missionGift[data.father.btnIndex - 1][3].charge_token / 10)) {
								this.imgRedIcon.visible = true;
								return;
							}
						}
					}
					break;
			}
			this.imgRedIcon.visible = bTip;
		}
	}
	export class ActivityNoviceTagData {
		index: number;
		father: ActivityNovice;
	}
}
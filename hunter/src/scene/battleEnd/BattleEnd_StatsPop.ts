namespace zj {
/**
 * @author xing li wei
 * 
 * @date 2019-4-13
 * 
 * @class 结算伤害统计界面
 */
export class BattleEnd_StatsPop extends Dialog {
	private BattleEnd_StatsPop: eui.Group;
	private ButtonClose: eui.Button;
	private TableViewMine: eui.List;
	private TableViewOpp: eui.List;


	private leftData: Array<message.BattleGeneralInfo>;
	private RightData: Array<message.BattleGeneralInfo>;
	private itemsMineGemeral: eui.ArrayCollection = new eui.ArrayCollection();
	private itemsOppGeneral: eui.ArrayCollection = new eui.ArrayCollection();
	public constructor() {
		super();
		this.skinName = "resource/skins/battleEnd/BattleEndStatsPopSkin.exml";

		this.init();
	}

	private init() {
		this.ButtonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);

		this.leftData = Table.copy(Game.PlayerBattleSystem.multiResultInfo.newReplayBattleInfo.leftReplayInfo.generals);
		this.RightData = Table.copy(Game.PlayerBattleSystem.multiResultInfo.newReplayBattleInfo.rightReplayInfo.generals);

		Helper.sortBattleInfoByDamage(this.leftData, this.RightData);
		let [index1, maxValue1] = Helper.GetMvp(this.leftData);
		let [index2, maxValue2] = Helper.GetMvp(this.RightData);
		let maxValue = Math.max(maxValue1, maxValue2);
		this.loadLeftList(index1, maxValue);
		this.loadRightList(index2, maxValue);
	}

	private loadLeftList(index, maxValue) {
		let index1 = 0;
		let index2 = -1;
		for (let i = 0; i < this.leftData.length; i++) {
			if (this.leftData[i].totalDamage > index1) {
				index1 = this.leftData[i].totalDamage;
				if (index1 > 0) {
					index2 = i;
				}
			}
		}
		this.itemsMineGemeral.refresh();
		if (this.TableViewMine == null) {
			return;
		}
		for (let i = Game.PlayerMissionSystem.tableLength(this.leftData) - 1; i >= 0; i--) {
			let data = new BattleEnd_StastPopItemData();
			data.itemInfo = this.leftData[i] as message.BattleGeneralInfo;
			data.maxValue = maxValue;
			data.tag = yuan3(index == i, true, false);
			data.epos = TableEnum.TablePositionType.POSITION_LEFT;
			data.index = i;
			data.indexvis = index2;
			this.itemsMineGemeral.addItem(data);
		}
		this.TableViewMine.dataProvider = this.itemsMineGemeral;
		this.TableViewMine.itemRenderer = BattleEnd_StastPopItem;
	}

	private loadRightList(index, maxValue) {
		let index1 = 0;
		let index2 = -1;
		for (let i = 0; i < this.RightData.length; i++) {
			if (this.RightData[i].totalDamage > index1) {
				index1 = this.RightData[i].totalDamage;
				if (index1 > 0) {
					index2 = i;
				}
			}
		}
		this.itemsOppGeneral.refresh();
		if (this.TableViewOpp == null) {
			return;
		}
		for (let i = Game.PlayerMissionSystem.tableLength(this.RightData) - 1; i >= 0; i--) {
			let data = new BattleEnd_StastPopItemEnemyData();
			data.itemInfo = this.RightData[i] as message.BattleGeneralInfo;
			data.maxValue = maxValue;
			data.tag = yuan3(index == i, true, false);
			data.index = i;
			data.indexvis = index2;
			data.epos = TableEnum.TablePositionType.POSITION_RIGHT;
			this.itemsOppGeneral.addItem(data);
		}
		this.TableViewOpp.dataProvider = this.itemsOppGeneral;
		this.TableViewOpp.itemRenderer = BattleEnd_StastPopItemEnemy;
	}

	/**关闭页面 */
	private onButtonClose() {
		this.close(UI.HIDE_TO_TOP);
	}
}
}
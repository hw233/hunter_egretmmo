namespace zj {
export class BattleSettleWinDrop extends BattleSettleWin {
	public constructor() {
		super();
	}
	public bContinueBattleSettleCome;
	public bContinueBattleNextCome;
	public _touch_id;
	// public SpriteNoDropTip: eui.Image;

	public Init() {
		super.Init();
		this.tableDropItem = [];
		this.bDropCome = false;
		this.bContinueBattleSettleCome = false;
		this.bContinueBattleNextCome = false;
		this._touch_id = 0;
	}
	public Load() {
		super.Load();
		Game.SoundManager.playMusic(SoundManager.playbgmByID(100005), 1);
		this.hideDrops();
	}
	public Update(tick) {
		super.Update(tick);
		this.UpdateDrop(tick);
	}
	public hideDrops() {
		// this.SpriteNoDropTip.visible = false;
	}

	public DropFadeIn(tip) {

		let endFade = () => {
			this.DropsComeIn();
		}
		endFade();
		// if(this.SpriteNoDropTip != null){
		// 	if(Table.g){

		// 	}
		// }

	}
	public UpdateDrop(tick) {
		if (this.bDropCome == false) {//this.total_tick >= ConstantConfig_BattleSettle.dropInfoComeTime * 1000 && 
			this.bDropCome = true;
			this.DropFadeIn(tick);
		}

		//是否弹出连续战斗结算
		if (this.ui_name == "BattleEnd_Win") {
			return;
		}

		if (this.total_tick >= ConstantConfig_BattleSettle.continueBattleSettleTime * 1000) {
			Gmgr.Instance.checkContinueBattleSettle(true, this.nextMobID);
		}

		if (this.total_tick >= ConstantConfig_BattleSettle.continueBattleNextTime * 1000) {
			if (Gmgr.Instance.isKeepContinueBattle()) {
				this.clickNext();
			}
		}
	}

	public LoadDropsList() {
		if (this.TableViewDrops == null) {
			return;
		}
		let TableViewDrops: eui.ArrayCollection = new eui.ArrayCollection();
		for (let i = 0; i < this.scene.getItemInfo.items.length; i++) {
			if (this.scene.getItemInfo.items[i].goodsId != 0) {
				let data = new BattleEndDropItemData();
				data.index = i;
				data.itemInfo = this.scene.getItemInfo.items[i];
				data.father = this;
				TableViewDrops.addItem(data);
			}
		}
		this.TableViewDrops.dataProvider = TableViewDrops;
		this.TableViewDrops.itemRenderer = BattleEndDropItem;
	}

	/**奖励详情 */
	public awardParticulars(xy: number, cx: number, cy: number, info: message.GoodsInfo) {
		let ui = this.getChildByName("UI");
		if (ui) {
			return;
		}
		let UI = TipManager.ShowProp(info, this, xy, cx, cy);
		if (PlayerItemSystem.ItemType(info.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
			(<CommonDesGeneral>UI).reSetGeneral();
		}
		UI.name = "UI";
		this.addChild(UI);
	}
	/**抬起时将按钮缩回去 */ /**抬起移除奖励详情界面 */
	public up() {
		let ui = this.getChildByName("UI");
		if (ui) {
			this.removeChild(ui);
		}
	}

	public DropsComeIn() {
		this.LoadDropsList();
	}
}
}
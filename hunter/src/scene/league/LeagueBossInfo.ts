namespace zj {
//公会BOSS界面（未开启挑战）
//yuqingcaho
export class LeagueBossInfo extends Scene {
	private lbText: eui.Label;
	private lstChangAward: eui.List;
	private imgAwadBoard: eui.Image;
	private imgAwardIcon: eui.Image;
	private lbNum: eui.Label;
	private lbBossName: eui.Label;
	private btnOpen: eui.Button;
	private lbOpenNeed: eui.Label;
	private btnClose: eui.Button;
	private groupAdd: eui.Group;

	private timer: egret.Timer;

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueBossInfoSkin.exml";
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.btnOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOpen, this);
		this.groupAdd.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);

		Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);

		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			if (this.timer) this.timer.stop();
		}, null);

		this.init();

		this.update();
		this.timer = new egret.Timer(1000, 0);
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
		this.timer.start();
	}

	private init() {
		this.lbText.text = RuleConfig.leagueAnimal;
		this.setAwardList();

		this.imgAwadBoard.source = cachekey(PlayerItemSystem.ItemFrame(message.EResourceType.RESOURCE_POWER), this);
		this.imgAwardIcon.source = cachekey(PlayerItemSystem.ItemPath(message.EResourceType.RESOURCE_POWER), this);
		let tblAnimals = Game.ConfigManager.getTable(StringConfig_Table.leagueAnimal + ".json");
		this.lbBossName.text = tblAnimals[1].name;
		this.lbOpenNeed.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter_League.league_boss_cost, tblAnimals[1].consume_res);

		this.update();

		if (Teach.isDone(teachBattle.teachPartID_League_Boss) == false) {
			Teach.CheckAndSetTeach(teachBattle.teachPartID_League_Boss);
		}
	}

	private update() {
		this.lbNum.text = Game.PlayerLeagueSystem.BaseInfo.enliven_all.toString();
	}

	private setAwardList() {
		let arr: eui.ArrayCollection = new eui.ArrayCollection();
		let tblBoss = Game.ConfigManager.getTable(StringConfig_Table.league_boss_reward + ".json");
		let leag = tblBoss[1].reward_goods;
		for (let i = 0; i < leag.length; i++) {
			arr.addItem({
				goodsId: leag[i],
				i,
				father: this
			});
		}
		this.lstChangAward.itemRenderer = LeagueBossInfoAwardItem;
		this.lstChangAward.dataProvider = arr;
	}

	private onBtnOpen() {
		// toast("开坯挑战");
		Game.PlayerLeagueSystem.leagueOpenBoss(1).then(() => {
			Game.PlayerLeagueSystem.leagueInfo().then(() => {
				Game.PlayerLeagueSystem.leagueBossScene().then(() => {
					loadUI(LeagueBossFighting)
						.then((dialog: LeagueBossFighting) => {
							dialog.show(UI.SHOW_FROM_TOP);
							dialog.init();
							this.close();
						});
				});
			});
		});
	}

	private removeShow() {
		let show = this.getChildByName("details");
		if (show) {
			this.removeChild(show);
		}
	}

	private showGoodsProperty(ev: egret.Event) {
		let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
		if (PlayerItemSystem.ItemType(ev.data.info.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
			(<CommonDesGeneral>show).reSetGeneral();
		}
		show.name = "details";
		this.addChild(show);
	}

	private onShowGoodProperty(e: egret.TouchEvent) {
		let info = new message.GoodsInfo();
		info.goodsId = message.EResourceType.RESOURCE_POWER;
		let show = TipManager.ShowProp(info, this, e.localY * 0.75, e.stageX * 1.1, e.stageY);
		show.name = "details";
		this.addChild(show);
	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}
}

}
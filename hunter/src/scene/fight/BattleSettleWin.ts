namespace zj {
export class BattleSettleWin extends BattleSettle {
	public tableAniNode = [];
	public NodeBoard;
	public NodeStar;
	public NodeWin;
	// public container = [];

	public constructor() {
		super();
	}

	public Init() {
		super.Init();
		this.hero_come_time = ConstantConfig_BattleSettle.generalComeTime;
		this.tableDropItem = [];
		//gmsound.playbgmByID ( 100005 )
		//缓存战斗获得数据
		if (Gmgr.Instance.bReplay == false) {
			Game.PlayerBattleSystem.cacheBattleItemInfo = this.scene.getItemInfo;
		} else {
			this.scene.getItemInfo = Game.PlayerBattleSystem.cacheBattleItemInfo;
		}
	}
	public tableDropItem = [];
	public bDropCome = false;
	public fireParticle = null;
	public Load() {
		super.Load();
		this.LoadHerosList();
		this.InitAni();
	}
	public Update(tick) {
		super.Update(tick);
		this.UpdateDrop(tick)
	}
	public InitAni() {
		if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK || Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
			this.InitSingleAni();
		} else {
			this.InitNormalAni();
		}
	}
	public InitSingleAni() {

	}
	public InitNormalAni() {
		this.tableAniNode = [this.NodeBoard, this.NodeStar, this.NodeWin];
		let boardAniName = ["000_diban_chuxian", "001_diban_xunhuan"];
		let boardAniIndex = [0, 1];
		let aniId = 1009;
		let starAniName = [];
		let starAniIndex = [];
		let winAniName = ["010_shengli_chuxian", "011_shengli_xunhuan"];
		let winAniIndex = [10, 11];

		if (Game.PlayerBattleSystem.multiResultInfo.battleStar == message.EBattleStar.BATTLE_STAR_1) {
			starAniName = ["004_yixing_chuxian", "005_yixing_xunhuan"];
			starAniIndex = [4, 5];
		} else if (Game.PlayerBattleSystem.multiResultInfo.battleStar == message.EBattleStar.BATTLE_STAR_2) {
			starAniName = ["006_erxing_chuxian", "007_erxing_xunhuan"];
			starAniIndex = [6, 7];
		} else if (Game.PlayerBattleSystem.multiResultInfo.battleStar == message.EBattleStar.BATTLE_STAR_3) {
			starAniName = ["008_sanxing_chuxian", "009_sanxing_xunhuan"];
			starAniIndex = [8, 9];
		}

		let thisOne = this;
		Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_jiesuan", null, [], [])
			.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
				// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				// 	armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
				// }, null);
				armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
					armatureDisplay.animation.play(boardAniName[1], 0);
				}, thisOne)
				armatureDisplay.animation.play(boardAniName[0], 1);
				armatureDisplay.x = thisOne.NodeBoard.width / 2;
				armatureDisplay.y = thisOne.NodeBoard.height / 2;
				thisOne.NodeBoard.addChild(armatureDisplay);
			});

		Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_jiesuan", null, [], [])
			.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
				// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				// 	armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
				// }, null);
				armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
					armatureDisplay.animation.play(starAniName[1], 0);
				}, thisOne)
				armatureDisplay.animation.play(starAniName[0], 1);
				armatureDisplay.x = thisOne.NodeStar.width / 2;
				armatureDisplay.y = thisOne.NodeStar.height / 2;
				thisOne.NodeStar.addChild(armatureDisplay);
			});

		Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_jiesuan", null, [], [])
			.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
				// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				// 	armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
				// }, null);
				armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
					armatureDisplay.animation.play(winAniName[1], 0);
				}, thisOne)
				armatureDisplay.animation.play(winAniName[0], 1);
				armatureDisplay.x = thisOne.NodeWin.width / 2;
				armatureDisplay.y = thisOne.NodeWin.height / 2;
				thisOne.NodeWin.addChild(armatureDisplay);
			});

	}

	public UpdateDrop(tick) {

	}
	


}
}
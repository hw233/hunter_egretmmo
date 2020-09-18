namespace zj {
/**
 * @author xing li wei
 * 
 * @date 2019-4-19
 * 
 * @class 遗迹探索结算
 */
export class Relic_BigEnd extends Dialog {
	private NodeBoard: eui.Group;
	private NodeAni: eui.Group;
	private NodeStar: eui.Group;
	private NodeWin: eui.Group;
	private TableViewList: eui.List;
	private TableViewAward: eui.List;
	private ButtonOk: eui.Button;
	private SpriteExpBar: eui.Image;
	private SpriteExpBarBg: eui.Image;
	private TextExp: eui.BitmapLabel;
	private SpriteNextLevel: eui.Image;
	private LableNextLevel: eui.Label;

	private ui_name: string;
	private hurtPer: number = 0;
	private star;
	private hurt;
	private instanceTbl: TableInstanceRelic;
	private serverRelicInfo;
	private curLevelPic: eui.Image = new eui.Image();
	public constructor() {
		super();
		this.ui_name = "BattleEnd_Win";
		this.skinName = "resource/skins/battleEnd/Relic_BigEndSkin.exml";

	}

	public Init() {
		this.TextExp.text = "0";
		this.ButtonOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonOk, this);
		this.SpriteExpBar.mask = this.SpriteExpBarBg;
	}

	public SetInfo(star, hurt) {
		this.star = star;
		this.hurt = hurt;
		this.instanceTbl = PlayerDarkSystem.RelicInstance(Game.PlayerMissionSystem.fightExt + 1);
		this.serverRelicInfo = Table.FindR(Game.PlayerInstanceSystem.InstanceInfo.relicInfo, (k, v) => {
			return v.id == Game.PlayerMissionSystem.fightExt + 1;
		})

		if (this.serverRelicInfo == null) {
			this.serverRelicInfo = new message.InstanceRelic()
			this.serverRelicInfo.id = Game.PlayerMissionSystem.fightExt + 1;
		}
		this.InitNorMalAni();
		this.setInfoList();
		this.setProgressAni();
	}

	public setInfoList() {
		let array = new eui.ArrayCollection();
		for (let i = 0; i < this.instanceTbl.max_step; i++) {
			let data = new RelicFinaChestItemData();
			data.chest = this.instanceTbl.open_chest[i];
			data.father = this;
			array.addItem(data);
		}
		this.TableViewList.dataProvider = array;
		this.TableViewList.itemRenderer = RelicFinaChestItem;

		let curLevel = PlayerDarkSystem.GetLevelByHurt(Game.PlayerMissionSystem.fightExt + 1, this.hurt);
		this.curLevelPic.source = cachekey(UIConfig.UIConfig_DarkLand.relicHurtLevel2[curLevel], this);

		let preHurt = this.instanceTbl.damage_zone[curLevel];
		let nextHurt = this.instanceTbl.damage_zone[curLevel + 1] || this.hurt;
		this.hurtPer = ((this.hurt - preHurt) / (nextHurt - preHurt)) < 1 && (this.hurt / nextHurt) || 1;
		let maxLevel = TableEnum.Enum.TableEnumRelicLevel[TableEnum.Enum.TableEnumRelicLevel.length - 1] - 1;
		if (curLevel >= maxLevel) {
			// this.nex
		} else {

			let nextLevel = curLevel + 1;
			let nextDamage = this.instanceTbl.damage_zone[nextLevel];
			let minusValue = nextDamage - this.hurt;
			if (minusValue >= 10000) {
				this.LableNextLevel.text = (minusValue / 10000).toFixed(1) + "万"
			} else if (minusValue >= 100000000) {
				this.LableNextLevel.text = (minusValue / 100000000).toFixed(1) + "亿"
			} else {
				this.LableNextLevel.text = (minusValue / 10000).toFixed(1);
			}
			this.SpriteNextLevel.source = cachekey(UIConfig.UIConfig_DarkLand.relicHurtLevel[nextLevel], this);
		}

		let allGoods: Array<message.GoodsInfo> = [];
		for (let i = 0; i < this.instanceTbl.damage_daily_goods[curLevel].length; i++) {
			let goods = new message.GoodsInfo();
			goods.goodsId = this.instanceTbl.damage_daily_goods[curLevel][i];
			goods.count = this.instanceTbl.damage_daily_count[curLevel][i];
			allGoods.push(goods);
		}
		let array1 = new eui.ArrayCollection();
		for (let i = 0; i < allGoods.length; i++) {
			let data = new SuccessionBattleDropItemData();
			data.index = i;
			data.itemInfo = allGoods[i];
			data.father = this;
			data.showWhite = false;
			array1.addItem(data);
		}
		this.TableViewAward.dataProvider = array1;
		this.TableViewAward.itemRenderer = SuccessionBattleDropItem;
	}

	private InitNorMalAni() {
		let tableAniNode = [this.NodeBoard, this.NodeStar, this.NodeWin];
		let boardAniName = ["000_diban_chuxian", "001_diban_xunhuan"];

		let winAniName = ["014_pingfen_chuxian", "015pingfen_xunhuan"];
		let winAniBones = ["018_wenzi"];
		let winAniPics = [this.curLevelPic];

		let starAniName;

		if (this.star == message.EBattleStar.BATTLE_STAR_NONO) {
			starAniName = ["002_lingxing_chuxian", "003_lingxing_xunhuan"];
		} else if (this.star == message.EBattleStar.BATTLE_STAR_1) {
			starAniName = ["004_yixing_chuxian", "005_yixing_xunhuan"];
		} else if (this.star == message.EBattleStar.BATTLE_STAR_2) {
			starAniName = ["006_erxing_chuxian", "007_erxing_xunhuan"];
		} else if (this.star == message.EBattleStar.BATTLE_STAR_3) {
			starAniName = ["008_sanxing_chuxian", "009_sanxing_xunhuan"];
		} else if (this.star == 4) {
			starAniName = ["010_sixing_chuxian", "011_sixing_xunhuan"];
		} else {
			starAniName = ["012_wuxing_chuxian", "013_wuxing_xunhuan"];
		}
		let thisOne = this;
		Game.DragonBonesManager.getAnimationWithBindImages(this, "jiesuan_heiandalu", null, [], [])
			.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
				// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				// 	armatureDisplay.animation.stop();
				// 	armatureDisplay.animation.reset();
				// 	armatureDisplay.armature.dispose();
				// 	armatureDisplay.dbClear();
				// 	armatureDisplay.dispose(true);
				// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
				// }, null);
				armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
					armatureDisplay.animation.play(boardAniName[1], 0);
				}, this)
				armatureDisplay.animation.play(boardAniName[0], 1);
				armatureDisplay.x = thisOne.NodeBoard.width / 2;
				armatureDisplay.y = thisOne.NodeBoard.height;
				thisOne.NodeBoard.addChild(armatureDisplay);
			});
		Game.DragonBonesManager.getAnimationWithBindImages(this, "jiesuan_heiandalu", null, [], [])
			.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
				// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				// 	armatureDisplay.animation.stop();
				// 	armatureDisplay.animation.reset();
				// 	armatureDisplay.armature.dispose();
				// 	armatureDisplay.dbClear();
				// 	armatureDisplay.dispose(true);
				// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
				// }, null);
				armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
					armatureDisplay.animation.play(starAniName[1], 0);
				}, this)
				armatureDisplay.animation.play(starAniName[0], 1);
				armatureDisplay.x = thisOne.NodeStar.width / 2;
				armatureDisplay.y = thisOne.NodeStar.height;
				thisOne.NodeStar.addChild(armatureDisplay);
			});
		Game.DragonBonesManager.getAnimationWithBindImages(this, "jiesuan_heiandalu", null, winAniPics, winAniBones)
			.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
				// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				// 	armatureDisplay.animation.stop();
				// 	armatureDisplay.animation.reset();
				// 	armatureDisplay.armature.dispose();
				// 	armatureDisplay.dbClear();
				// 	armatureDisplay.dispose(true);
				// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
				// }, null);
				armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
					armatureDisplay.animation.play(winAniName[1], 0);
				}, this)
				armatureDisplay.animation.play(winAniName[0], 1);
				armatureDisplay.x = thisOne.NodeWin.width / 2;
				armatureDisplay.y = thisOne.NodeWin.height;
				thisOne.NodeWin.addChild(armatureDisplay);
			});
	}

	private update;
	private setProgressAni() {
		let delayTime1 = 1;
		let progressTime = this.hurtPer * 0.4;
		let num = Math.floor(this.hurtPer * 30);
		num = num < 1 ? 1 : num;
		let index = 1;
		let a = { width: 274, height: 20 };
		let Update = () => {
			let per = this.hurtPer / num * index
			let hurt = this.hurt / num * index//Set.NumberUnit3()

			if (index == num) {
				per = this.hurtPer
				hurt = this.hurt//Set.NumberUnit3();
			}
			let rect_exp = getPercentSize(a, per);

			this.SpriteExpBarBg.width = rect_exp.width;
			if (hurt >= 10000) {
				this.TextExp.text = (hurt / 10000).toFixed(1) + "万"
			} else if (hurt >= 100000000) {
				this.TextExp.text = (hurt / 100000000).toFixed(1) + "亿"
			} else {
				this.TextExp.text = (hurt / 10000).toFixed(1);
			}

			index = index + 1
			if (index > num) {
				egret.clearInterval(this.update);
			}
		}

		this.update = egret.setInterval(Update, this, progressTime / num);

	}

	private onButtonOk() {
		//关闭战斗
		StageSceneManager.Instance.clearScene();
		this.close();
		Game.UIManager.popAllScenesAndDialogs(() => {
			loadUI(DarkLandHomeScene)
				.then((scene: DarkLandHomeScene) => {
					scene.show(UI.SHOW_FILL_OUT);
					scene.onGroupEnd1();
				});
		});
	}
}
}
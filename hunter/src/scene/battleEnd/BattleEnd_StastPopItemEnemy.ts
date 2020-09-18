namespace zj {
	/**
	 * @author xing li wei
	 * 
	 * @date 2019-4-15
	 * 
	 * @class 结算伤害统计界面子界面右
	 */
	export class BattleEnd_StastPopItemEnemy extends eui.ItemRenderer {
		public SpriteHurtBoard: eui.Image;
		public SpriteHurt: eui.Image;
		public LabelHurtNum: eui.Label;
		public SpriteRecoverBoard: eui.Image;
		public SpriteRecover: eui.Image;
		public LabelRecoverNum: eui.Label;
		public SpriteFrame: eui.Image;
		public SpriteHead: eui.Image;
		public LabelLevel: eui.BitmapLabel;
		public SpriteStar: eui.Image;
		public NodeStar: eui.Group;
		public SpriteBestOpp: eui.Image;
		private SpriteHurtBar: eui.Image;
		private SpriteRecoverBar: eui.Image;


		private update;

		private vis: boolean = true;
		public constructor() {
			super();
			this.skinName = "resource/skins/battleEnd/BattleEnd_StastPopItemEnemySkin.exml";
			cachekeys(<string[]>UIResource["BattleEnd_StastPopItemEnemy"], null);
			this.update = egret.setInterval(this.Update, this, 0, 1 / 60);
			BattleSettle.updates.push(this.update);
			this.SetItemVisble(false);
			this.SpriteBestOpp.alpha = 0;
			this.SpriteHurt.mask = this.SpriteHurtBar;
			this.SpriteRecover.mask = this.SpriteRecoverBar;
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				egret.clearInterval(this.update);
			}, this)
		}
		protected dataChanged() {
			let data = this.data as BattleEnd_StastPopItemEnemyData;
			if (this.data.time < 2) {
				this.update = egret.setInterval(this.Update, this, 0, 1 / 60);
				BattleSettle.updates.push(this.update);
			}
			this.data.maxValue = Math.floor(data.maxValue);
			this.data.maxHurtValue = Math.floor(data.itemInfo.totalDamage);
			this.data.maxRecoverValue = Math.floor(data.itemInfo.recoverValue);

			this.DealProgress(data);
			this.DealSpeed();
			this.SetGeneralInfo(data);

			this.Playering();
			if (data.indexvis == data.index) {
				this.SpriteBestOpp.alpha = 1;
				// egret.Tween.get(this.SpriteBestOpp).to({ alpha: 1 }, 1000);			
			} else {
				this.SpriteBestOpp.alpha = 0;
			}
			this.SpriteHurtBar.width = 133 * this.data.scale / 100;
			this.SpriteRecoverBar.width = 133 * this.data.scale1 / 100;
			this.LabelHurtNum.text = data.num.toString();
			this.LabelRecoverNum.text = data.num1.toString();// this.data.maxRecoverValue.toString();
		}

		private DealProgress(data: BattleEnd_StastPopItemEnemyData) {
			// let 
			// this.SpriteHurt.visible = false;

			// this.SpriteRecover.visible = false;

			let percent = yuan3(this.data.maxValue == 0, 0, this.data.curHurtValue / this.data.maxValue * 100);

		}

		private DealSpeed() {
			this.data.addHurt = Math.floor(this.data.maxValue * ConstantConfig_BattleSettle.hurtPipeTick / ConstantConfig_BattleSettle.hurtPipeTime);
			if (this.data.addHurt <= 0) {
				this.data.addHurt = 1;
			}
			this.data.addRecover = this.data.addHurt;
		}

		private SetGeneralInfo(data: BattleEnd_StastPopItemEnemyData) {
			let headPath = null;
			let bossTag = false;
			let battleType = Game.PlayerBattleSystem.multiResultInfo.battleType;
			if (battleType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK
				|| battleType == message.EFormationType.FORMATION_TYPE_MATCH_ATTACK
				|| battleType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE
			) {
			headPath = PlayerHunterSystem.Head(data.itemInfo.generalInfo);
			} else {
				headPath = Game.PlayerStageSystem.fromMonster(data.itemInfo.generalInfo.general_id).head_path;
				let type = Game.PlayerMobSystem.Instance(data.itemInfo.generalInfo.general_id).role_type;
			}
			this.SpriteHead.source = cachekey(headPath, this);
			this.SpriteFrame.source = cachekey(UIConfig.UIConfig_Role.heroFrame[data.itemInfo.generalInfo.step - 1], this);
			this.LabelLevel.text = data.itemInfo.generalInfo.level.toString();
			this.SpriteStar.visible = false;

			if (data.itemInfo.generalInfo.star > 0 && data.itemInfo.generalInfo.star <= Game.PlayerMissionSystem.tableLength(UIConfig.UIConfig_Role.heroStar)) {
				Helper.SetHeroAwakenStar(this.NodeStar, data.itemInfo.generalInfo.star, 0);
			} else {
				this.NodeStar.visible = false;
			}
		}


		private Update(dt) {
			if (this.data.bStart == false) {
				return;
			}
			this.data.hurtTick += dt * 1000;
			if (this.data.hurtEnd == false) {
				if (this.data.hurtTick >= ConstantConfig_BattleSettle.hurtPipeTick) {
					this.data.hurtTick -= ConstantConfig_BattleSettle.hurtPipeTick;
					let addValue = this.data.addHurt;
					let tmp = this.data.curHurtValue + addValue;
					if (tmp >= this.data.maxHurtValue) {
						addValue = this.data.maxHurtValue - this.data.curHurtValue;
						this.data.hurtEnd = true;
						this.data.time++;
					}
					this.data.curHurtValue += addValue;
					this.data.num = this.data.curHurtValue;
					this.LabelHurtNum.text = this.data.curHurtValue.toString();
				}
			}
			this.data.recoverTick += dt * 1000;
			if (this.data.recoverEnd == false) {
				if (this.data.recoverTick >= ConstantConfig_BattleSettle.hurtPipeTick) {
					this.data.recoverTick -= ConstantConfig_BattleSettle.hurtPipeTick;
					let addValue = this.data.addRecover;
					let tmp = this.data.curRecoverValue + addValue;
					if (tmp >= this.data.maxRecoverValue) {
						addValue = this.data.maxRecoverValue - this.data.curRecoverValue;
						this.data.recoverEnd = true;
						this.data.time++;
					}
					this.data.curRecoverValue += addValue;
					this.data.num1 = this.data.curRecoverValue;
					this.LabelRecoverNum.text = this.data.curRecoverValue.toString();
				}
			}
			this.setProgress();
			if (this.data.time >= 2) {
				egret.clearInterval(this.update);
			}

			if (this.data.recoverEnd == true && this.data.hurtEnd == true && this.data.bMapPlay == false && this.data.tag == true) {
				this.data.bMapPlay = true;
				this.PlayerMvpEffect();
			}
		}

		private PlayerMvpEffect() {
			// let 
		}

		private setProgress() {
			this.data.scale = yuan3(this.data.maxValue == 0, 0, this.data.curHurtValue / this.data.maxValue * 100);
			this.data.scale1 = yuan3(this.data.maxValue == 0, 0, this.data.curRecoverValue / this.data.maxValue * 100);
			this.SpriteHurtBar.width = 133 * this.data.scale / 100;
			this.SpriteRecoverBar.width = 133 * this.data.scale1 / 100;
		}

		private SetItemVisble(tag: boolean) {
			this.SpriteHurtBoard.visible = tag;
			this.SpriteRecoverBoard.visible = tag;

			this.LabelHurtNum.text = "0";
			this.LabelHurtNum.visible = tag;

			this.LabelRecoverNum.text = "0";
			this.LabelRecoverNum.visible = tag;
		}

		private Playering() {
			this.SetItemVisble(true);
			this.data.bStart = true;
		}
}
export class BattleEnd_StastPopItemEnemyData {
		itemInfo: message.BattleGeneralInfo;
		maxValue: number;
		tag: boolean;
		epos: number;
		indexvis: number;
		index: number;
		scale: number = 0;
		scale1: number = 0;
		num: number = -1;
		num1: number = -1;
		maxHurtValue: number = 0;
		maxRecoverValue: number = 0;
		curHurtValue: number = 0;
		addHurt: number = 0;
		addRecover: number = 0;
		bStart: boolean = false;
		hurtTick: number = 0;
		hurtEnd: boolean = false;
		recoverTick: number = 0;
		recoverEnd: boolean = false;
		curRecoverValue: number = 0;
		bMapPlay: boolean = false;
		time: number = 0;
	}
}
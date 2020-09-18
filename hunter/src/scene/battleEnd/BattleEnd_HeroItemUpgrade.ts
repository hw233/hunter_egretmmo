namespace zj {
	export class BattleEnd_HeroItemUpgrade extends eui.ItemRenderer {
		public constructor() {
			super();
			this.skinName = "resource/skins/battleEnd/BattleEndHeroItemUpgradeSkin.exml";
			cachekeys(<string[]>UIResource["BattleEnd_HeroItemUpgrade"], null);
			this.Init();
		}
		protected dataChanged() {
			this.SetItemInfo(this.data);
		}
		public BattleEnd_HeroItemUpgrade: eui.Group;
		public FadeLayer: eui.Group;
		public SpriteFrame: eui.Image;
		public SpriteIcon: eui.Image;
		public LabelLv: eui.BitmapLabel;
		public SpriteBoard: eui.Image;
		public SpriteExpBar: eui.Image;
		public SpriteExpBar1: eui.Image;
		public LabelAddExp: eui.Label;
		public NodeLevelUp: eui.Group;
		public SpriteIconAwaken: eui.Image;
		public SpriteStar: eui.Group;
		public NodeStar: eui.Group;


		// public scene;
		public generalId = -1;
		public generalMapId = -1;

		//public id = nil    
		public bWin = true
		public bEmpty = false
		public generalInfo = null
		public total_tick = 0
		public bFinish = false

		public cssRole = null
		//public cssUpWord = nil
		public isWordPlayed = false

		public expProgress = null
		public maxExp = 0
		public distMaxExp = 0

		public curExp = 0
		public addExp = 0
		public curLv = 0
		public bakeLv = 0
		public nowLv = 0
		public nowExp = 0
		public finalLv = 0
		public expTick = 0

		public curTotalExp = 0
		public totalGetExp = 0

		public bStart = false
		public bHeroIn = false
		public bLayerIn = false
		public bExpIn = false
		public bExpEnd = false;
		public tableLayers = [];
		private update;
		private proWidth;
		//初始化ui
		public Init() {
			this.update = egret.setInterval(this.Update, this, 0, 1 / 60);
			BattleSettle.updates.push(this.update);
			this.tableLayers = [this.SpriteFrame, this.SpriteIcon, this.LabelLv, this.SpriteBoard, this.SpriteExpBar];
			this.setVisible(false);
			this.NodeLevelUp.visible = false;
			this.proWidth = 84;
			this.SpriteExpBar.mask = this.SpriteExpBar1;
			this.Playing();
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				egret.clearInterval(this.update);
			}, this);
		}
		public Playing() {
			this.bStart = true;
		}
		public PlayWordUp() {
			if (this.isWordPlayed == true) {
				return;
			}
			this.isWordPlayed = true;
			this.NodeLevelUp.visible = true;
		}
		public setVisible(tag) {
			for (let i = 0; i < this.tableLayers.length; i++) {
				this.tableLayers[i].visible = tag;
			}
			this.LabelAddExp.visible = tag;
		}
		public Update(dt) {
			if (this.bStart == false) {
				return;
			}
			this.total_tick = this.total_tick + dt * 10000;
			if (this.total_tick >= 0 && this.bHeroIn == false && this.bEmpty == false) {
				this.bHeroIn = true;
			}
			if (this.total_tick >= ConstantConfig_BattleSettle.generalInfoComeTime * 1000 && this.bLayerIn == false) {
				this.bLayerIn = true
				this.LayerFadeIn();
				if (this.bEmpty == true) {
					this.bFinish = true;
				}
			}
			if (this.total_tick >= ConstantConfig_BattleSettle.generalExpComeTime * 1000 && this.bExpIn == false && this.bEmpty == false) {
				this.bExpIn = true;
			}
			if (this.bExpIn == true && this.bExpEnd == false) {
				this.expTick = this.expTick + dt * 1000;
				if (this.expTick >= ConstantConfig_BattleSettle.expPipeTick) {
					this.expTick = this.expTick - ConstantConfig_BattleSettle.expPipeTick;
					let addValue = this.addExp;
					let tmp = this.curExp + addValue;
					if (tmp >= this.distMaxExp) {
						addValue = this.distMaxExp - this.curExp;
						if (addValue <= 0) {
							addValue = 0;
						}
					}
					this.curExp = this.curExp + addValue;
					this.curTotalExp = this.curTotalExp + addValue;
					if (this.curExp >= this.distMaxExp) {
						if (this.curLv != this.finalLv) {
							this.curExp = 0
							this.curLv = this.curLv + 1;
							this.SetLv();
							this.DealExp();
							this.PlayWordUp();
						}
					}
					if (this.curTotalExp >= this.totalGetExp) {
						this.bExpEnd = true;
						this.bFinish = true;
						this.bStart = true;
					}
					this.SetExp();
					this.SetAddTotalExp();
				}
			}
		}
		public DealNobody() {

		}
		public SetItemInfo(info) {

			this.generalInfo = info.generalInfo;
			this.bEmpty = yuan3(this.generalInfo == null || this.generalInfo.general_id <= 0, true, false);
			if (this.bEmpty == true) {
				this.DealNobody();
			} else {
				this.generalId = this.generalInfo.general_id;
				this.generalMapId = TableBaseGeneral.Item(this.generalId % CommonConfig.general_id_to_index_multiple).general_roleId;

				this.curExp = this.generalInfo.exp;
				this.curLv = this.generalInfo.level;
				this.bakeLv = this.curLv;

				let index = Helper.getGeneralIndexById(this.generalId);
				let generalInfo = Game.PlayerHunterSystem.queryAllHunters()[index];
				this.nowLv = generalInfo.level;
				this.nowExp = generalInfo.exp;
				let now_exp = Helper.getGenerlBeforeTotalExp(this.nowLv, PlayerHunterSystem.Table(this.generalInfo.general_id).aptitude % 10) + this.nowExp;
				let old_exp = Helper.getGenerlBeforeTotalExp(this.bakeLv, PlayerHunterSystem.Table(this.generalInfo.general_id).aptitude % 10) + this.generalInfo.exp;
				let get_exp = now_exp - old_exp;
				this.totalGetExp = get_exp;
				//有待优化
				this.finalLv = generalInfo.level;

				this.SetLv();

				this.SetHero();

				this.DealExp();

				this.DealProgress();
				// this.Init();

			}
		}
		public SetLv() {
			this.LabelLv.text = "Lv" + this.curLv;
		}
		public SetHero() {
			let headPath = PlayerHunterSystem.Head(this.generalInfo);
			let path_frame = PlayerHunterSystem.Frame(this.generalInfo.general_id);
		if (Device.isReviewSwitch && Util.isWxMiniGame) {
				this.SpriteIcon.source = cachekey("wx_" + headPath, this);
			} else {
				this.SpriteIcon.source = cachekey(headPath, this);
			}
			this.SpriteFrame.source = cachekey(path_frame, this);
			let awakeLevel = this.generalInfo.awakePassive.level;
			this.SpriteIconAwaken.visible = false;
			if (this.generalInfo.star > 0 && this.generalInfo.star <= Helper.getObjLen(UIConfig.UIConfig_Role.heroStar)) {
				Game.PlayerHunterSystem.allHuntersMap()[this.generalInfo.general_id].awakePassive.level;
				this.NodeStar.visible = true;
				Helper.SetHeroAwakenStar(this.NodeStar, this.generalInfo.star, awakeLevel);
			} else {
				this.NodeStar.visible = false;
			}
		}
		public DealExp() {
			let instance = TableLevel.Item(this.curLv);
			this.maxExp = instance.general_exp[PlayerHunterSystem.Table(this.generalInfo.general_id).aptitude % 10 - 1];
			if (this.curLv == this.finalLv) {
				if (this.bakeLv == this.finalLv) {
					this.distMaxExp = this.generalInfo.exp + this.totalGetExp;
				} else {
					this.distMaxExp = this.nowExp;
				}
			} else {
				this.distMaxExp = this.maxExp;
			}
			this.addExp = Math.floor(this.totalGetExp * ConstantConfig_BattleSettle.expPipeTick / ConstantConfig_BattleSettle.expPipeTime);
			if (this.addExp <= 0) {
				this.addExp = 1;
			}
		}
		public DealProgress() {
			let percent = this.curExp / this.maxExp * 100;
			this.SpriteExpBar1.width = (this.proWidth / 100) * percent;
		}
		public SetExp() {
			let percent = this.curExp / this.maxExp * 100;
			this.SpriteExpBar1.width = (this.proWidth / 100) * percent;
		}
		public SetAddTotalExp() {
			if (message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL == Gmgr.Instance.fightType || message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE == Gmgr.Instance.fightType) {
				if (this.curTotalExp == 0) {
					if (this.bWin == true && this.bakeLv >= CommonConfig.role_max_level) {//common.role_max_level
						this.LabelAddExp.visible = true;
						this.LabelAddExp.text = TextsConfig.TextsConfig_HeroMain.full_level_simple
					} else {
						this.LabelAddExp.visible = false;
					}
				} else {
					this.LabelAddExp.visible = true;
					this.LabelAddExp.text = "Exp+" + this.curTotalExp;
				}
			} else {
				this.LabelAddExp.visible = false;
			}
		}
		public LayerFadeIn() {
			let tableFade = null;
			if (this.bEmpty == true) {
				tableFade = [this.SpriteFrame];
			} else {
				tableFade = this.tableLayers;
			}
			for (let i = 0; i < tableFade.length; i++) {
				tableFade[i].visible = true;
				tableFade[i].alpha = 0;
				egret.Tween.get(tableFade[i]).to({ alpha: 1 }, ConstantConfig_BattleSettle.generalInfoFadeTime);
			}
		}
		public SetWinTag(bTag) {
			this.bWin = bTag;
		}
		public isFinished() {
			return this.bFinish;
		}
		public Close() {
			egret.clearInterval(this.update);
		}
	}
}
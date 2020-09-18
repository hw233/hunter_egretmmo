namespace zj {
	/**
	 * @author xingliwei
	 * 
	 * @date 2019-5-21
	 * 
	 * @class 贪婪之岛战报详情展示list子项 右
	 */
	export class LeagueWarPopItemEnemy extends eui.ItemRenderer {
		private groupMain: eui.Group;
		private groupMain1: eui.Group;
		public SpriteHurtBoard: eui.Image;
		public SpriteHurt: eui.Image;
		public LabelHurtNum: eui.Label;
		public SpriteFrame: eui.Image;
		public SpriteHead: eui.Image;
		public SpriteBossTag: eui.Image;
		public LabelPlayerPower: eui.Label;
		private SpriteStar1: eui.Image;
		private SpriteStar2: eui.Image;
		private SpriteStar3: eui.Image;
		private SpriteStar4: eui.Image;
		private SpriteStar5: eui.Image;
		private SpriteStar6: eui.Image;
		private SpriteHurtbg: eui.Image;
		private maxHp: number = 0;
		private beforeHp: number = 0;
		private curHp: number = 0;
		private curHurt: number = 0;
		private maxValue: number = 0;
		private isDead;
		private yes: boolean = true;
		public constructor() {
			super();
			this.skinName = "resource/skins/league/LeagueWarPopItemEnemySkin.exml";
			this.SpriteHurt.mask = this.SpriteHurtbg;
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				egret.Tween.removeTweens(this);
			}, this)
		}

		protected dataChanged() {
			let data = this.data as LeagueWarPopItemEnemyData;

			if (this.data.itemtype == 0) {
				this.data.itemtype = 1;
				egret.Tween.get(this).to({ height: 0 }, 0).to({ height: 95 }, 200);

				egret.Tween.get(this.groupMain1).to({ x: 300 }, 0).to({ x: -50 }, 200).to({ x: 0 }, 50).call(() => {
					data.father.LoadRightGeneral();
				})
			}

			if (data.generalInfo) {
				this.LabelHurtNum.text = ("Lv " + data.generalInfo.level);
			}
			if (data.father.rightData.length > 12) {
				if (data.index == 11) {
					if (this.yes == true) {
						this.yes = false;
						data.father.RightEnd();
					}
				}
			} else {
				if (data.index == data.father.rightData.length - 1) {
					if (this.yes == true) {
						this.yes = false;
						data.father.RightEnd();
					}

				}
			}
			if (data.itemInfo == undefined || data.itemInfo == null) {
				this.visible = false;
				return;
			}
			if (data.itemInfo.length <= 0) {
				this.visible = false;
				return;
			} else {
				this.visible = true;
			}
			if (this.data.itemInfo) {
				if (data.vis) {
					data.vis = false;
					data.father.RightHpSub(data.itemInfo.cur_rage - data.itemInfo.cur_hp);
				}
			}
			this.maxHp = Math.floor(data.itemInfo.cur_bean);
			this.beforeHp = Math.floor(data.itemInfo.cur_rage);
			this.curHp = Math.floor(data.itemInfo.cur_hp);
			this.curHurt = Math.floor(data.itemInfo.cur_pos);
			this.maxValue = Math.floor(data.maxValue);
			this.isDead = data.itemInfo.is_dead;

			let mpr = fromGeneral(data.itemInfo.monster_id)
			if (data.generalInfo) {
				if (mpr != null) {
					let headPath = PlayerHunterSystem.Head(data.generalInfo)
					this.SpriteHead.source = cachekey(headPath, this);
				} else {
					mpr = TableMapRole.Item(data.generalInfo.fashionId);
					if (mpr != null) {
						this.SpriteHead.source = cachekey(mpr.head_path, this);
					}
				}
			}

			this.SpriteFrame.source = cachekey(UIConfig.UIConfig_Role.heroFrame[data.generalInfo.step], this);
			// let gap = Helper.getSpriteGap(this.SpriteStar1, this.SpriteStar2)
			// let posList = getLinePosition(ccp(sx, sy), gap, this.generalInfo.star)
			this.runItemAction();
			this.SetGeneralInfo(data);


			for (let i = 1; i <= CommonConfig.general_max_star; i++) {
				if (i > data.generalInfo.star) {
					this["SpriteStar" + i].visible = (false)
				} else {
					this["SpriteStar" + i].sourcr = (UIConfig.UIConfig_Role.starOn)
					// this["SpriteStar"+ i]:setPosition(posList[i])
				}
			}

			// this.LabelPlayerPower.text = (Set.numberUnitBattleValue(Math.floor(data.generalInfo.battleValue)));
			if (this.data.itemtype == 1) {
				let a
				if (this.data.father.vis == true) {
					// this.LabelHurtNum.text = (Set.NumberUnit3(this.curHp) + "/" + Set.NumberUnit3(this.maxHp))
					a = this.SpriteHurt.width * (this.curHp / this.maxHp);
				} else {
					// this.LabelHurtNum.text = (Set.NumberUnit3(this.beforeHp) + "/" + Set.NumberUnit3(this.curHurt))
					a = this.SpriteHurt.width * (this.curHurt / this.beforeHp);
				}
				if (data.itemtype == 1) {
					egret.Tween.get(this.SpriteHurtbg).to({ width: a }, 400)
				}
				this.data.itemtype = 2;
			} else {
				let a;
				if (this.data.father.vis == true) {
					a = this.SpriteHurt.width * (this.curHp / this.maxHp);
				} else {
					a = this.SpriteHurt.width * (this.curHurt / this.beforeHp);
				}
				this.SpriteHurtbg.width = a;
			}


		}
		private DealProgress() {
			// this.SpriteRecoverBar.visible = (this.data.barType == TableEnum.Enum.FastResultBarType.HP)
			// this.SpriteHurtBar.visible = (this.data.barType == TableEnum.Enum.FastResultBarType.HURT)
			this.SpriteHurt.visible = (false)

		}

		private runItemAction() {
			this.SpriteBossTag.visible = this.data.itemInfo.is_dead;
		}

		private setProgress(data) {
			// let percent = yuan3(this.maxValue == 0, 0, this.curHurt / this.maxValue * 100)
			// this.hurtProgress:setPercentage(0)

			let percent = yuan3(this.maxHp == 0, 0, this.beforeHp / this.maxHp * 100)
			// this.recoverProgress:setPercentage(percent)

			if (data.barType == TableEnum.Enum.FastResultBarType.HP) {
				this.LabelHurtNum.text = (Set.NumberUnit3(data.beforeHp) + "/" + Set.NumberUnit3(this.maxHp))
			} else {
				this.LabelHurtNum.text = Helper.StringFormat(TextsConfig.TextConfig_League.war_fast_hurt, Set.NumberUnit3(this.curHurt));
			}
		}
		private SetGeneralInfo(data: LeagueWarPopItemEnemyData) {
			let mpr = fromGeneral(data.itemInfo.monster_id)
			if (mpr != null) {
				let headPath = PlayerHunterSystem.Head(data.generalInfo)
				this.SpriteHead.source = cachekey(headPath, this);
			} else {
				let mpr = TableMapRole.Item((data.generalInfo.fashionId));
				if (mpr != null) {
					this.SpriteHead.source = cachekey(mpr.head_path, this);
				}
			}
			this.SpriteFrame.source = cachekey(UIConfig.UIConfig_Role.heroFrame[data.generalInfo.step], this);
			// let gap = getSpriteGap(this.SpriteStar1, this.SpriteStar2)
			// let posList = getLinePosition(ccp(sx, sy), gap, this.generalInfo.star)
			for (let i = 1; i <= CommonConfig.general_max_star; i++) {
				if (i > data.generalInfo.star) {
					this["SpriteStar" + i].visible = (false)
				} else {
					this["SpriteStar" + i].source = cachekey(UIConfig.UIConfig_Role.starOn, this);
					// this["SpriteStar" + i]:setPosition(posList[i])
				}
			}
			this.LabelHurtNum.text = ("Lv " + data.generalInfo.level)
			this.LabelPlayerPower.text = (Set.numberUnitBattleValue(Math.floor(data.generalInfo.battleValue)));
		}

	}
	export class LeagueWarPopItemEnemyData {
		index: number;
		oppNum;
		itemInfo;
		generalInfo;
		maxValue;
		barType;
		father;
		itemtype;
		iteminfo;
		vis: boolean = true;
	}
}
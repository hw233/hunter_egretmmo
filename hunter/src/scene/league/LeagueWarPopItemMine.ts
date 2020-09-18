namespace zj {
	/**
	 * @author xingliwei
	 * 
	 * @date 2019-5-21
	 * 
	 * @class 贪婪之岛战报详情展示list子项 左
	 */
	export class LeagueWarPopItemMine extends eui.ItemRenderer {
		public SpriteRecoverBoard: eui.Image;
		public SpriteRecover: eui.Image;
		public LabelRecoverNum: eui.Label;
		public SpriteFrame: eui.Image;
		public SpriteHead: eui.Image;
		public SpriteBoosTag: eui.Image;
		public LabelPlayerPower: eui.Label;
		public LabelHurtNum: eui.Label;
		public groupMain: eui.Group;
		private groupMain1: eui.Group;
		private SpriteStar1: eui.Image;
		private SpriteStar2: eui.Image;
		private SpriteStar3: eui.Image;
		private SpriteStar4: eui.Image;
		private SpriteStar5: eui.Image;
		private SpriteStar6: eui.Image;
		private SpriteRecoverbg: eui.Image;
		private maxHp: number = 0;
		private beforeHp: number = 0;
		private curHp: number = 0;
		private curHurt: number = 0;
		private maxValue: number = 0;
		private isDead;
		private yes: boolean = true;
		public constructor() {
			super();
			this.skinName = "resource/skins/league/LeagueWarPopItemMineSkin.exml";
			this.SpriteRecover.mask = this.SpriteRecoverbg;
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				egret.Tween.removeTweens(this);
			}, this)
		}

		protected dataChanged() {
			let data = this.data as LeagueWarPopItemMineData;

			if (this.data.itemtype == 0) {
				this.data.itemtype = 1;
				egret.Tween.get(this).to({ height: 0 }, 0).to({ height: 95 }, 200);

				egret.Tween.get(this.groupMain1).to({ x: -300 }, 0).to({ x: 50 }, 200).to({ x: 0 }, 50).call(() => {
					data.father.LoadLeftGeneral();
				})
			}
			if (data.generalInfo) {
				this.LabelRecoverNum.text = ("Lv " + data.generalInfo.level)
			}
			if (data.father.leftData.length > 12) {
				if (data.index == 11) {
					if (this.yes == true) {
						this.yes = false;
						data.father.LeftEnd();
					}
				}
			} else {
				if (data.index == data.father.leftData.length - 1) {
					if (this.yes == true) {
						this.yes = false;
						data.father.LeftEnd();
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
					data.father.LeftHpSub(data.itemInfo.cur_rage - data.itemInfo.cur_hp);
				}
			}
			this.maxHp = Math.floor(data.itemInfo.cur_bean);
			this.beforeHp = Math.floor(data.itemInfo.cur_rage);
			this.curHp = Math.floor(data.itemInfo.cur_hp);
			this.curHurt = Math.floor(data.itemInfo.cur_pos);
			this.maxValue = Math.floor(data.maxValue);
			this.isDead = data.itemInfo.is_dead;

			this.setProgress();
			this.SetGeneralInfo(data);
			this.DealProgress();


			this.runItemAction();
			if (this.data.itemtype == 1) {
				let a
				if (this.data.father.vis == true) {
					this.LabelHurtNum.text = (Set.NumberUnit3(this.curHp) + "/" + Set.NumberUnit3(this.maxHp))
					a = this.SpriteRecover.width * (this.curHp / this.maxHp);
				} else {
					this.LabelHurtNum.text = (Set.NumberUnit3(this.beforeHp) + "/" + Set.NumberUnit3(this.curHurt))
					a = this.SpriteRecover.width * (this.beforeHp / this.curHurt);
				}
				if (data.itemtype == 1) {
					egret.Tween.get(this.SpriteRecoverbg).to({ width: a }, 400)
				}
				this.data.itemtype = 2;
			} else {
				let a;
				if (this.data.father.vis == true) {
					a = this.SpriteRecover.width * (this.curHp / this.maxHp);
				} else {
					a = this.SpriteRecover.width * (this.beforeHp / this.curHurt);
				}
				this.SpriteRecoverbg.width = a;
			}
		}

		private runItemAction() {
			this.SpriteBoosTag.visible = this.data.itemInfo.is_dead;
		}

		private DealProgress() {
			// this.SpriteRecoverBar.visible = (this.data.barType == TableEnum.Enum.FastResultBarType.HP)
			// this.SpriteHurtBar.visible = (this.data.barType == TableEnum.Enum.FastResultBarType.HURT)
			// this.SpriteRecover.visible = (false)

		}

		public setBarType(barType) {
			let data = this.data as LeagueWarPopItemMineData;
			data.barType = barType
			// this.imgRecoverBar.visible = (data.barType == TableEnum.Enum.FastResultBarType.HP);
			// this.imgHurtBar.visible = (data.barType == TableEnum.Enum.FastResultBarType.HURT);
			if (data.barType == TableEnum.Enum.FastResultBarType.HP) {
				this.LabelHurtNum.text = (Set.NumberUnit3(this.beforeHp) + "/" + Set.NumberUnit3(this.maxHp))
			} else {
				this.LabelHurtNum.text = (Helper.StringFormat(TextsConfig.TextConfig_League.war_fast_hurt, Set.NumberUnit3(this.curHurt)));
			}
		}

		private setProgress() {
			let percent = yuan3(this.maxValue == 0, 0, this.curHurt / this.maxValue * 100)
			// this.hurtProgress.setPercentage(0)
			let percent1 = yuan3(this.maxHp == 0, 0, this.beforeHp / this.maxHp * 100)
			// this.recoverProgress:setPercentage(percent)
			if (this.data.barType == TableEnum.Enum.FastResultBarType.HP) {
				this.LabelHurtNum.text = (Set.NumberUnit3(this.beforeHp) + "/" + Set.NumberUnit3(this.maxHp))
			} else {
				this.LabelHurtNum.text = Helper.StringFormat(TextsConfig.TextConfig_League.war_fast_hurt, Set.NumberUnit3(this.curHurt));
			}
		}

		private SetGeneralInfo(data: LeagueWarPopItemMineData) {
			if (data.generalInfo) {
				this.LabelRecoverNum.text = ("Lv " + data.generalInfo.level)
			}
			let mpr = fromGeneral(data.itemInfo.monster_id)
			if (data.generalInfo != null) {
				if (mpr != null) {
					let headPath = PlayerHunterSystem.Head(data.generalInfo)
					this.SpriteHead.source = cachekey(headPath, this);
				} else {
					let mpr = TableMapRole.Item((data.generalInfo.fashionId));
					if (mpr != null) {
						this.SpriteHead.source = cachekey(mpr.head_path, this);
					} else {
						toast("LeagueWarPopItemMine" + 172 + "data.generalInfo.fashionId" + data.generalInfo.fashionId)
					}
				}
			}
			this.SpriteFrame.source = cachekey(UIConfig.UIConfig_Role.heroFrame[data.generalInfo.step], this);
			for (let i = 1; i <= CommonConfig.general_max_star; i++) {
				if (i > data.generalInfo.star) {
					this["SpriteStar" + i].visible = (false)
				} else {
					this["SpriteStar" + i].source = cachekey(UIConfig.UIConfig_Role.starOn, this);
				}
			}

			this.LabelPlayerPower.text = (Set.numberUnitBattleValue(Math.floor(data.generalInfo.battleValue)));
		}
	}

	export class LeagueWarPopItemMineData {
		index: number;
		oppNum;
		itemInfo;
		generalInfo;
		maxValue;
		barType;
		itemtype: number;
		father: LeagueWarPop;
		iteminfo;
		vis: boolean = true;
	}
}
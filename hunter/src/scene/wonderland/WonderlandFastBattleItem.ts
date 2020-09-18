namespace zj {
	/**
	 * @author xingliwei
	 * 
	 * @date 2019-5-21
	 * 
	 * @class 贪婪之岛战报子项
	 */
	export class WonderlandFastBattleItem extends eui.ItemRenderer {
		public imgRightHead: eui.Image;
		public labelRightName: eui.Label;
		public imgRightResult: eui.Image;
		public imgGetOrLoseRight: eui.Image;
		public groupItemRight1: eui.Group;
		public imgItemFrame2_1: eui.Image;
		public imgItemIcon2_1: eui.Image;
		public labelItemRightNum2_1: eui.BitmapLabel;
		public labelFruitNum2_1: eui.Label;
		public groupItemRight2: eui.Group;
		public imgItemFrame2_2: eui.Image;
		public imgItemIcon2_2: eui.Image;
		public labelItemRightNum2_2: eui.BitmapLabel;
		public labelFruitNum2_2: eui.Label;
		public groupItemRight3: eui.Group;
		public imgItemFrame2_3: eui.Image;
		public imgItemIcon2_3: eui.Image;
		public labelItemRightNum2_3: eui.BitmapLabel;
		public labelFruitNum2_3: eui.Label;
		public imgLeftResult: eui.Image;
		public imgLeftHead: eui.Image;
		public labelLeftName: eui.Label;
		public imgGetOrLoseLeft: eui.Image;
		public groupItemLeft3: eui.Group;
		public imgItemFrame1_3: eui.Image;
		public imgItemIcon1_3: eui.Image;
		public labelItemRightNum1_3: eui.BitmapLabel;
		public labelFruitNum1_3: eui.Label;
		public groupItemLeft2: eui.Group;
		public imgItemFrame1_2: eui.Image;
		public imgItemIcon1_2: eui.Image;
		public labelItemRightNum1_2: eui.BitmapLabel;
		public labelFruitNum1_2: eui.Label;
		public groupItemLeft1: eui.Group;
		public imgItemFrame1_1: eui.Image;
		public imgItemIcon1_1: eui.Image;
		public labelItemRightNum1_1: eui.BitmapLabel;
		public labelFruitNum1_1: eui.Label;
		public labelName: eui.Label;
		public labelTime: eui.Label;
		public btnOpen: eui.Button;

		public constructor() {
			super();
			this.skinName = "resource/skins/wonderland/WonderlandFastBattleItemSkin.exml";
			this.btnOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOpen, this);
			cachekeys(<string[]>UIResource["WonderlandFastBattleItem"], null);
		}

		protected dataChanged() {
			let data = this.data as WonderlandFastBattleItemData;
			if (this.data.info.leftRoleBase.id != Game.PlayerInfoSystem.BaseInfo.id) {
				this.data.info.leftRoleBase, this.data.info.rightRoleBase = this.data.info.rightRoleBase, this.data.info.leftRoleBase
				this.data.info.leftArmy, this.data.info.rightArmy = this.data.info.rightArmy, this.data.info.leftArmy
				this.data.info.leftGenerals, this.data.info.rightGenerals = this.data.info.rightGenerals, this.data.info.leftGenerals
				this.data.info.leftAllHp, this.data.info.rightAllHp = this.data.info.rightAllHp, this.data.info.leftAllHp
			}

			this.InitUI();

			if (data.info.goods == null) {
				this.groupItemLeft1.visible = false;
				this.groupItemLeft2.visible = false;
				this.groupItemLeft3.visible = false;
				this.groupItemRight1.visible = false;
				this.groupItemRight2.visible = false;
				this.groupItemRight3.visible = false;
			}
		}

		private InitUI() {
			// if (this.data.infosceneType == message.ESceneType.SCENE_TYPE_LEAGUE_WAR) {
			// 	this.labelName.text = TextsConfig.TextConfig_League.war;
			// } else 
			if (this.data.info.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
				let sceneType = this.data.info.sceneId;
				while (sceneType >= 10) {
					sceneType = Math.floor(sceneType / 10);
				}
				this.labelName.text = (TableDarkland.Item(sceneType).darkland_name);
			} else {
				if (this.data.info.sceneId < 100) {
					this.labelName.text = (TableWonderland.Item(this.data.info.sceneId).wonderland_name);
				} else {
					this.labelName.text = (TableWonderland.Item(Math.floor(this.data.info.sceneId / 100)).wonderland_name)
				}
			}
			this.labelTime.text = (Helper.GetTMStrForActivity(this.data.info.generate_time))
			if (this.data.info.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
				this.imgLeftResult.source = cachekey(UIConfig.UIConfig_RpgScene.resultWinOrLose[1], this);
				this.imgRightResult.source = cachekey(UIConfig.UIConfig_RpgScene.resultWinOrLose[2], this);
			} else {
				this.imgLeftResult.source = cachekey(UIConfig.UIConfig_RpgScene.resultWinOrLose[2], this);
				this.imgRightResult.source = cachekey(UIConfig.UIConfig_RpgScene.resultWinOrLose[1], this);
			}

			if (PlayerItemSystem.ItemType(this.data.info.rightRoleBase.picId) == message.EGoodsType.GOODS_TYPE_NONO ||
				PlayerItemSystem.ItemType(this.data.info.rightRoleBase.picId) == null) {
				let mpr = TableMapRole.Item(this.data.info.rightRoleBase.picId)
				if (mpr != null) {
					this.imgRightHead.source = cachekey(mpr.head_path, this);
				}
				// this.imgRightVip.visible(false);
				// this.imgVipBack.visible(false);
			} else {
				this.imgRightHead.source = cachekey(PlayerItemSystem.ItemPath(this.data.info.rightRoleBase.picId), this);
				// this.imgRightVip.source = (UIConfig.UIConfig.UIConfig_User.vip[this.data.info.rightRoleBase.vipLevel]);
			}

			if (PlayerItemSystem.ItemType(this.data.info.leftRoleBase.picId) == message.EGoodsType.GOODS_TYPE_NONO ||
				PlayerItemSystem.ItemType(this.data.info.leftRoleBase.picId) == null) {
				let mpr = TableMapRole.Item(this.data.info.leftRoleBase.picId)
				if (mpr != null) {
					this.imgLeftHead.source = cachekey(mpr.head_path, this);
				}
				// this.imgRightVip.visible(false);
				// this.imgVipBack.visible(false);
			} else {
				this.imgLeftHead.source = cachekey(PlayerItemSystem.ItemPath(this.data.info.leftRoleBase.picId), this);
				// this.imgRightVip.source = (UIConfig.UIConfig.UIConfig_User.vip[this.data.info.rightRoleBase.vipLevel]);
			}
			let right_name = ""
			if (this.data.info.rightRoleBase.name_type == message.ETextArgType.TEXT_ARG_TYPE_MOBS) {
				right_name = Lang.Des(Number(this.data.info.rightRoleBase.name))  //))langdb.Des(tonumber(
			} else {
				right_name = this.data.info.rightRoleBase.name
			}

			this.labelLeftName.text = ("Lv" + this.data.info.leftRoleBase.level + " " + this.data.info.leftRoleBase.name)
			this.labelRightName.text = ("Lv" + this.data.info.rightRoleBase.level + " " + right_name)
			// this.labelLeftPower.text = (Set.numberUnitBattleValue(this.getGeneralPower(this.data.info.leftGenerals)))
			// this.labelRightPower.text = (Set.numberUnitBattleValue(this.getGeneralPower(this.data.info.rightGenerals)))
			if (this.data.info.goods != null) {
				if ((this.data.info.goods)) {
					if (this.data.info.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
						this.imgGetOrLoseLeft.source = cachekey(UIConfig.UIConfig_League.WarWinGetFoods, this);
						this.imgGetOrLoseRight.source = cachekey(UIConfig.UIConfig_League.WarWinLoseFoods, this);
					}

					else {
						this.imgGetOrLoseLeft.source = cachekey(UIConfig.UIConfig_League.WarWinLoseFoods, this);
						this.imgGetOrLoseRight.source = cachekey(UIConfig.UIConfig_League.WarWinGetFoods, this);
					}
				}

				else {
					this.imgGetOrLoseLeft.visible = (false)
					this.imgGetOrLoseRight.visible = (false)
				}

				for (let i = 0; i < 3; i++) {
					if (this.data.info.goods[i] != null && this.data.info.goods[i].goodsId != 0) {
						let itemSet = PlayerItemSystem.Set(this.data.info.goods[i].goodsId, this.data.info.goods[i].showType, this.data.info.goods[i].count) as any;
						this["imgItemFrame1_" + (i + 1)].text = itemSet.Frame
						this["imgItemIcon1_" + (i + 1)].source = cachekey(itemSet.Clip, this);
						this["labelFruitNum1_" + (i + 1)].text = itemSet.FruitID
						this["labelItemRightNum1_" + (i + 1)].text = this.data.info.goods[i].count

						let itemSet2 = PlayerItemSystem.Set(this.data.info.goods[i].goodsId, this.data.info.goods[i].showType, this.data.info.goods[i].count) as any
						this["imgItemFrame2_" + (i + 1)].source = cachekey(itemSet2.Frame, this);
						this["imgItemIcon2_" + (i + 1)].source = cachekey(itemSet2.Clip, this)
						this["labelFruitNum2_" + (i + 1)].text = itemSet2.FruitID

						this["labelItemRightNum2_" + (i + 1)].text = this.data.info.goods[i].count
					} else {
						this["groupItemLeft" + (i + 1)].visible = false;
						this["groupItemRight" + (i + 1)].visible = false;
					}

				}
			} else {
				this.imgGetOrLoseLeft.visible = false;
				this.imgGetOrLoseRight.visible = false;
			}
		}

		private getGeneralPower(generalList) {
			let generalPowerSub = 0;
			for (let k in generalList) {
				if (generalList.hasOwnProperty(k)) {
					let v = generalList[k];
					generalPowerSub = generalPowerSub + v.battleValue
				}
			}
			return generalPowerSub
		}

		private onBtnOpen() {
			loadUI(LeagueWarPop)
				.then((dialog: LeagueWarPop) => {
					dialog.show();
					dialog.PlayReport(this.data.info);
				})
		}

	}

	export class WonderlandFastBattleItemData {
		index: number;
		info;
	}
}
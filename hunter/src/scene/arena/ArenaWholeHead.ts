namespace zj {
	/**
	 * @author 邢利伟
	 * 
	 * @date 2019-2-28
	 * 
	 * @class 跨服格斗场主界面龙骨动画类
	 */
	export class ArenaWholeHead extends UI {
		private groupAni: eui.Group;
		private groupHero: eui.Group;
		private labelJiFen: eui.Label;
		private imgDead: eui.Image;
		private groupPlayerInfo: eui.Group;
		private labelPlayerName: eui.Label;
		private labelPlayerQu: eui.Label;
		private labelPlayerPower: eui.Label;
		private imgSkill: eui.Image;
		private info: message.CraftRoleInfo;
		private Node = { Node1: null, Node2: null };
		/**判断自身是否能点击 */
		private touchvis: boolean = true;
		private playerInfo = [];
		private index: number;
		public constructor() {
			super();
			this.skinName = "resource/skins/arena/ArenaWholeHeadSkin.exml";
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Down, this);
		}
		protected dataChanged() {

		}

		public setInfo(info: message.CraftRoleInfo, index: number) {
			this.index = index;
			this.info = info;
			if (this.info == null) {
				return;
			}
			this.setInfoAni();
			this.setInfoItem();
		}

		private setInfoItem() {
			let genemy = this.info == null ? 2 : 1;
			// for (let k in this.Node) {
			// 	if (this.Node.hasOwnProperty(k)) {
			// 		let v = this.Node[k];
			// 		v.visible = (Number(k) == genemy)
			// 	}
			// }



			let score = this.info.craft_score > 0 ? this.info.craft_score : 0;
			if (this.info.role_id == -1) {
				// 暂时不写
			}

			let level = singLecraft.GetLevel(score);
			let maproleId = this.getMapRoleInfo(this.info);
			let info = TableMapRole.Item(maproleId).body_spx_id;
			let scale = TableMapRole.Item(maproleId).spine_scale * 0.5;
			let name = TableClientFightAniSpineSource.Item(info).atlas;
			let name1 = TableClientFightAniSpineSource.Item(info).ani_name;

			if (info != -1) {
				this.groupHero.removeChildren();
				Game.DragonBonesManager.getArmatureDisplayAsync(this, name, "armatureName")
					.then(display => {
						display.scaleX = scale;
						display.scaleY = scale;
						setDragonBonesRemove(display);
						// display.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
						// 	display.animation.stop();
						// 	display.animation.reset();
						// 	display.armature.dispose();
						// 	display.dbClear();
						// 	display.dispose(true);
						// 	if (display.parent) display.parent.removeChild(display);
						// }, null);
						// display.anchorOffsetX = -display.width / 2;
						display.anchorOffsetY = -display.height / 2;
						display.animation.play(name1, 0);
						this.groupHero.addChild(display);
					})
					.catch(reason => {
						toast(reason);
					});
			}

			let groupStr = Helper.StringFormat(TextsConfig.TextsConfig_Login.serverDesSimple, singLecraft.decodeGroupName(this.info.group_name, "&", false),
				singLecraft.decodeGroupName(this.info.group_name, "&", true)
			);

			if (Device.isDebug) {
				let str = "Lv." + this.info.role_level + " " + this.info.role_name + " ID: " + this.info.role_id;
				this.labelPlayerName.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Pk.enemy.name, str));
			} else {
				let str = "Lv." + this.info.role_level + " " + this.info.role_name;
				this.labelPlayerName.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Pk.enemy.name, str));
			}
			let honorStr = "<color>r=0,g=249,b=0</color><text>%s</text>"
			let honorCoin = singLecraft.InstanceScore(level).win_coin;
			this.labelPlayerQu.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Pk.enemy.sever, groupStr));
			this.labelPlayerPower.textFlow = Util.RichText(Helper.StringFormat(honorStr, honorCoin));
			this.labelJiFen.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Pk.enemy.score, TextsConfig.TextsConfig_Common.numCH[level - 1] || 0, score));

			this.labelPlayerName.anchorOffsetX = this.labelPlayerName.width / 2;
			this.labelPlayerName.anchorOffsetY = this.labelPlayerName.height / 2;
			this.labelPlayerQu.anchorOffsetX = this.labelPlayerQu.width / 2;
			this.labelPlayerQu.anchorOffsetY = this.labelPlayerQu.height / 2;
			this.labelPlayerPower.anchorOffsetX = this.labelPlayerPower.width / 2;
			this.labelPlayerPower.anchorOffsetY = this.labelPlayerPower.height / 2;

			this.playerInfo = ["Lv." + this.info.role_level + " " + this.info.role_name, groupStr, this.labelJiFen.text, this.info.pic, this.index]
		}

		private setInfoAni() {
			this.groupAni.removeChildren();
			let cssName = TableClientAniCssSource.Item(2001);
			let paths = [this.groupHero, this.labelPlayerName, this.labelPlayerQu, this.labelPlayerPower];
			let bones = ["008_zhantai1_juese", "009_xinxi01", "010_xinxi02", "011_xinxi03"];
			let thisOne = this;
			Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_gedou_01", null, paths, bones)
				.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
					armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
						armatureDisplay.animation.play("002_juese_xunhuan", 0);
					}, thisOne)
					// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
					// 	armatureDisplay.animation.stop();
					// 	armatureDisplay.animation.reset();
					// 	armatureDisplay.armature.dispose();
					// 	armatureDisplay.dbClear();
					// 	armatureDisplay.dispose(true);
					// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
					// }, null);
					armatureDisplay.animation.play("000_juese_chuxian", 1);
					thisOne.groupAni.addChild(armatureDisplay);
				});
			this.touchvis = !this.info.is_win;
			if (this.info.is_win) {
				this.imgSkill.scaleX = this.imgSkill.scaleY = 1.5;
				egret.Tween.get(this.imgSkill).to({ scaleX: 1, scaleY: 1 }, 150)
			} else {
				this.imgSkill.visible = false;
			}
		}

		private getMapRoleInfo(info) {
			let picTable = TableItemPic.Table();  //table_item_pic
			let picMapRoleId = picTable[info.pic].mapRole_id;
			let fashionMapRoleInfo = TableItemFashion.Item(info.fashion_id); StringConfig_Table.itemHead
			let fashionMapRoleId = null;
			if (fashionMapRoleInfo != null) {
				fashionMapRoleId = fashionMapRoleInfo.fashion_roleId;
			}
			return fashionMapRoleId || picMapRoleId;
		}

		private Down() {
			if (this.touchvis) {
				let proccess = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SINGLECRAFT];
				if (proccess.info % 10 == message.CraftStateType.CRAFT_STATE_TYPE_FIGHTING) {
					this.enemFormationReq();
				} else if (proccess.info % 10 == message.CraftStateType.CRAFT_STATE_TYPE_NONO) {
					toast_warning(TextsConfig.TextsConfig_Pk.disenter.skip);
				} else {
					toast_warning(TextsConfig.TextsConfig_Pk.disenter.close);
				}
			}

		}

		private enemFormationReq() {
			let thisOne = this;
			Game.PlayerArenaSystem.craftQueryDetail(thisOne.info.role_id)
				.then((formations: Array<message.CraftFormationInfo>) => {
					loadUI(ArenaWholeEnemy)
						.then((dialog: ArenaWholeEnemy) => {
							dialog.setInfo(thisOne.info, formations, null, null, thisOne.playerInfo, thisOne);
							dialog.show(UI.SHOW_FROM_TOP);
						});
				}).catch((result) => {
					toast_warning(Helper.GetErrorString(result));
				});
		}
	}
}
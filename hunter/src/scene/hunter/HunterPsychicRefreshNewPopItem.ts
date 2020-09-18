namespace zj {
	/**
	 * @author xingliwei
	 * 
	 * @date 2019-7-23
	 * 
	 * @class 猎人念力修炼选择猎人材料界面list子项
	 */
	export class HunterPsychicRefreshNewPopItem extends eui.ItemRenderer {
		private groupFrome: eui.Group;
		private groupNo: eui.Group;
		private labelNoMet: eui.Label;
		private labelMeterialsTip: eui.Label;
		private groupHave: eui.Group;
		private labelMeterialsPower: eui.Label;
		private labelMeterialsNum: eui.Label;
		private imgBigon: eui.Image;
		private btnClick: eui.Image;
		private imgFrame: eui.Image;
		private imgIcon: eui.Image;
		private labelItemNum: eui.BitmapLabel;
		private imgHeroGrade: eui.Image;
		private groupStar: eui.Group;
		private imgShadow: eui.Image;
		private imgLock: eui.Image;

		public constructor() {
			super();
			this.skinName = "resource/skins/hunter/HunterPsychicRefreshNewPopItemSkin.exml";
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				this.data.father = null;
			}, this)

			this.init();
		}

		private init() {
			this.imgBigon.visible = false;
			this.imgShadow.visible = false;
			this.imgLock.visible = false;

			this.btnClick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
		}

		protected dataChanged() {
			if (this.data.index == 0) {
				this.setDefault(this.data);
			} else {
				this.setHunterInfo(this.data)
			}
		}

		private setDefault(data: HunterPsychicRefreshNewPopItemData) {
			let general_id = data.hunterInfo.general_id;
			let level = data.hunterInfo.level;
			let star = data.hunterInfo.star;
			let awaken = data.hunterInfo.awaken;

			let str = Helper.StringFormat("条件：%s级； %s星； %s次觉醒", level, star, awaken);
			this.labelMeterialsTip.text = str;

			if (general_id == 0) {
				this.labelNoMet.text = TextsConfig.TextsConfig_Hunter_Break.noMet
				this.imgHeroGrade.visible = (false)
				this.imgIcon.source = UIConfig.UIConfig_General.hunter_donnot_know
			} else {
				let genTal = PlayerHunterSystem.Table(general_id);
				let path_aptitude = UIConfig.UIConfig_General.hunter_grade[genTal.aptitude];
				let path_head = PlayerHunterSystem.Head(general_id);
				this.labelNoMet.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.hunterMet, genTal.general_name);
				this.imgHeroGrade.visible = true;
				this.imgHeroGrade.source = path_aptitude;
				this.imgIcon.source = path_head;
			}
			this.imgShadow.visible = false;
			this.imgLock.visible = false;

			this.labelItemNum.text = level.toString();
			this.labelItemNum.visible = (level > 0);
			Helper.SetHeroAwakenStar(this.groupStar, star, awaken);

			this.groupNo.visible = true;
			this.groupHave.visible = false;
		}

		private setHunterInfo(data: HunterPsychicRefreshNewPopItemData) {
			let general_id = data.hunterInfo.general_id;
			let level = data.hunterInfo.level;
			let star = data.hunterInfo.star;
			let awaken = data.hunterInfo.awakePassive.level;
			let general = Game.PlayerHunterSystem.queryHunter(general_id);
			let path_aptitude = UIConfig.UIConfig_General.hunter_grade[PlayerHunterSystem.Table(general_id).aptitude];
			let path_head = PlayerHunterSystem.Head(general_id);
			let path_frame = PlayerHunterSystem.Frame(general_id);
			let tag = 0;
			let isSel = Table.FindF(data.consumeSels, (k, v) => {
				if (v == data.hunterInfo.general_id) {
					tag = k;
				}
				return v == data.hunterInfo.general_id;
			});
			this.labelMeterialsPower.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Compound.battleValue, Set.NumberUnit3(general.battleValue));
			this.labelMeterialsNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Compound.cardNum, general.potatoInfo.length);
			this.imgBigon.visible = isSel;
			this.imgShadow.visible = (data.hunterInfo.defenceInfo != null);
			this.imgLock.visible = (data.hunterInfo.defenceInfo != null);

			this.imgFrame.source = path_frame;
			this.imgIcon.source = path_head;
			this.imgHeroGrade.source = path_aptitude;
			this.imgHeroGrade.visible = true;
			this.labelItemNum.visible = (level > 0);
			this.labelItemNum.text = level.toString();
			Helper.SetHeroAwakenStar(this.groupStar, star, awaken);

			this.groupNo.visible = false;
			this.groupHave.visible = true;
		}

		private onBtnClick() {
			let data = this.data as HunterPsychicRefreshNewPopItemData;
			if (data.hunterInfo.defenceInfo != null) {
				toast_warning(TextsConfig.TextsConfig_Hunter_psychic.psychic_defence_general[data.hunterInfo.defenceInfo[0][1]])
			} else {
				if (this.imgBigon.visible) {
					// let tag = this.imgBigon.getTag()
					for (let i = 0; i < data.consumeSels.length; i++) {
						if (data.consumeSels[i] == data.hunterInfo.general_id) {
							data.consumeSels.splice(i);
							i--;
						}
					}
					// table.remove(self._consumeSels, tag)
					this.imgBigon.visible = false;
				} else {
					if (data.consumeSels.length >= data.csmCounts) {
						toast_warning(TextsConfig.TextsConfig_Hunter_psychic.selectPsychic);
					} else {
						data.consumeSels.push(data.hunterInfo.general_id)
						this.imgBigon.visible = true;
					}
					// this.imgBigon:setTag(#self._consumeSels)
				}
			}
		}
	}

	export class HunterPsychicRefreshNewPopItemData {
		index: number;
		consumeSels;
		hunterInfo;
		csmCounts;
		father;
	}
}
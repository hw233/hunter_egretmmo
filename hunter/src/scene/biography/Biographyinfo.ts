namespace zj {
	//传记
	//yuqingchao
	//2019.04.17
	export class Biographyinfo extends Dialog {
		private btnClose: eui.Button;
		private imgHero: eui.Image;				//猎人头像
		private imgName: eui.Image;				//猎人名字
		private imgQuality: eui.Image;			//猎人级别
		private imgSeries: eui.Image;			//猎人系
		private imgType: eui.Image;				//猎人类型
		private imgType1: eui.Image;			//定位1
		private imgType2: eui.Image;			//定位2
		private imgType3: eui.Image;			//定位3
		private imgType4: eui.Image;			//定位4
		private lstHunterSkill: eui.List;
		private arrayCollection: eui.ArrayCollection;
		private lbStory: eui.Label;				//猎人故事
		private info;
		private generalId: number = 0;
		private groupMain: eui.Group;
		private callBack: () => void;

		public constructor() {
			super();
			this.skinName = "resource/skins/biography/BiographyinfoSkin.exml";
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
			Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showDessSkill, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				// this.father = null;
				Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showDessSkill, this);
			}, null);
		}
		private onBtnClose() {
			this.close(UI.HIDE_TO_TOP);
			if (this.callBack) {
				this.callBack();
			}
		}

		public init(info: TableSpgeneralInformation, cb?: () => void) {
			this.callBack = cb;
			this.info = info;
			this.generalId = info.general_id;

			this.setHeroTop();
			this.setHeroSkill();
		}

		private setHeroTop() {
			let pathHead = PlayerHunterSystem.Head(this.generalId);
			this.imgHero.source = cachekey(pathHead, this);
			this.imgQuality.source = cachekey(UIConfig.UIConfig_General.hunter_grade[PlayerHunterSystem.Table(this.generalId).aptitude], this);
			this.imgName.source = cachekey(this.info.name_path, this);
			this.imgSeries.source = cachekey(this.info.general_series, this);
			this.imgType.source = cachekey(this.info.general_type_path, this);
			this.lbStory.text = this.info.general_story;
			let len = PlayerHunterSystem.Table(this.generalId).position.length;
			for (let i = 0; i < 4; i++) {
				if (i < PlayerHunterSystem.Table(this.generalId).position.length) {
					let tion = PlayerHunterSystem.Table(this.generalId).position;
					let p = UIConfig.UIConfig_Comment.position[PlayerHunterSystem.Table(this.generalId).position[i]];
					this[`imgType${i + 1}`].visible = true;
					this[`imgType${i + 1}`].source = cachekey(UIConfig.UIConfig_Comment.position[PlayerHunterSystem.Table(this.generalId).position[i] - 1], this);
				} else {
					this[`imgType${i + 1}`].visible = false;
				}
			}
		}

		private setHeroSkill() {
			let genTbl = PlayerHunterSystem.Table(this.generalId);
			this.arrayCollection = new eui.ArrayCollection();
			for (let k in genTbl.skill_ids) {
				let v = genTbl.skill_ids[k];
				this.arrayCollection.addItem({
					index: Number(k),
					id: this.generalId,
					skillId: v,
				})
			}
			if (genTbl.init_passive[0] != 0) {
				this.arrayCollection.addItem({
					index: 2,
					id: this.generalId,
					skillId: genTbl.init_passive[0]
				})
			}
			if (genTbl.awake_passive != 0) {
				this.arrayCollection.addItem({
					index: 3,
					id: this.generalId,
					skillId: genTbl.awake_passive,
					father: this
				})
			}
			this.lstHunterSkill.dataProvider = this.arrayCollection;
			this.lstHunterSkill.itemRenderer = BiographyDontGetParTherItem;
		}

		private removeShow() {
			let show = this.getChildByName("details");
			if (show) {
				this.removeChild(show);
			}

			let skill = this.getChildByName("groupAwakenSkillInfoDialog");
			if (skill) {
				this.removeChild(skill);
			}
		}

		private showDessSkill(ev: egret.Event) {
			let show;
			if (ev.data.index == 2 || ev.data.index == 3) {
				show = TipManager.ShowInfoLevelSkill(ev.data.talentId, ev.data.generalId, ev.data.index, ev.data.level, this, ev.data.xy, ev.data.cx, ev.data.cy, true);
			} else {
				show = TipManager.ShowDesSkill(ev.data.skillId, ev.data.index, ev.data.level, this, ev.data.xy, ev.data.cx, ev.data.cy);
			}
			show.name = "details";
			this.addChild(show);
		}
	}
}
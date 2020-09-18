namespace zj {
	export class TavernSceneRun extends Dialog {
		public imgSchedule0: eui.Image;
		public imgScheduleMask0: eui.Image;
		public group0: eui.Group;
		public imgRunFrame0: eui.Image;
		public imgRunIcon0: eui.Image;
		public imglingqu0: eui.Image;
		public labelnum0: eui.Label;
		public label0: eui.Label;
		public group1: eui.Group;
		public imgRunFrame1: eui.Image;
		public imgRunIcon1: eui.Image;
		public imglingqu1: eui.Image;
		public labelnum1: eui.Label;
		public label1: eui.Label;
		public group2: eui.Group;
		public imgRunFrame2: eui.Image;
		public imgRunIcon2: eui.Image;
		public imglingqu2: eui.Image;
		public labelnum2: eui.Label;
		public label2: eui.Label;
		public group3: eui.Group;
		public imgRunFrame3: eui.Image;
		public imgRunIcon3: eui.Image;
		public imglingqu3: eui.Image;
		public labelnum3: eui.Label;
		public label3: eui.Label;
		public group4: eui.Group;
		public imgRunFrame4: eui.Image;
		public imgRunIcon4: eui.Image;
		public imglingqu4: eui.Image;
		public labelnum4: eui.Label;
		public label4: eui.Label;
		public group5: eui.Group;
		public imgRunFrame5: eui.Image;
		public imgRunIcon5: eui.Image;
		public imglingqu5: eui.Image;
		public labelnum5: eui.Label;
		public label5: eui.Label;
		public group6: eui.Group;
		public imgRunFrame6: eui.Image;
		public imgRunIcon6: eui.Image;
		public imglingqu6: eui.Image;
		public labelnum6: eui.Label;
		public label6: eui.Label;
		public group7: eui.Group;
		public imgRunFrame7: eui.Image;
		public imgRunIcon7: eui.Image;
		public imglingqu7: eui.Image;
		public labelnum7: eui.Label;
		public label7: eui.Label;
		public group8: eui.Group;
		public imgRunFrame8: eui.Image;
		public imgRunIcon8: eui.Image;
		public imglingqu8: eui.Image;
		public labelnum8: eui.Label;
		public label8: eui.Label;
		public group9: eui.Group;
		public imgRunFrame9: eui.Image;
		public imgRunIcon9: eui.Image;
		public imglingqu9: eui.Image;
		public labelnum9: eui.Label;
		public label9: eui.Label;
		public group10: eui.Group;
		public imgRunFrame10: eui.Image;
		public imgRunIcon10: eui.Image;
		public imglingqu10: eui.Image;
		public labelnum10: eui.Label;
		public label10: eui.Label;
		public btnClose: eui.Button;
		public labeljindu: eui.Label;

		private RumInfo: message.ActivityInfo;
		public constructor() {
			super()
			this.skinName = "resource/skins/tavern/TavernSceneRunSkin.exml";
			this.imgSchedule0.mask = this.imgScheduleMask0;
			this.init();
		}

		private init() {
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { this.close(UI.HIDE_TO_TOP) }, this)
			for (let i = 0; i <= 10; i++) {
				this["group" + i].visible = false;
			}

			this.RumInfo = Table.FindR(Game.PlayerActivitySystem.Activities, (k, v: message.ActivityInfo) => {
				return v.type == 23;
			})[0];
			this.imgScheduleMask0.width = 0;
			this.labeljindu.text = "当前已招募次数：" + this.RumInfo.itemCount.toString();
			for (let i = 0; i < this.RumInfo.missions.length; i++) {
				// this.labelcont.text = "当前阶段：" + this.RumInfo.itemCount + "/" + this.RumInfo.missions[visnumber].mission_condition;
				let vis = Table.FindF(this.RumInfo.rewardIndex, (k, v: number) => {
					return v == i + 1;
				})

				this["group" + i].visible = true;
				this["group" + i].x = 80 + 30 * 2.5 + i * 170 * 2.5 / (this.RumInfo.missions.length - 1);
				let num = (i == 0 ? this.RumInfo.itemCount : (this.RumInfo.itemCount - this.RumInfo.missions[i - 1].mission_condition)) / this.RumInfo.missions[i].mission_condition;
				this["imglingqu" + i].visible = num >= 1 ? true : false;
				if (vis) {
					this["imglingqu" + i].source = "ui_acitivity_serverseven_get_png";
				}
				let generalId = this.RumInfo.missions[i].rewards[0].goodsId;
				let count = this.RumInfo.missions[i].rewards[0].count;
				this["labelnum" + i].text = Set.NumberUnit2(count);
				this["label" + i].text = this.RumInfo.missions[i].mission_condition;
				this["imgRunFrame" + i].source = cachekey(PlayerItemSystem.Set(generalId, null, count).Frame, this);
				this["imgRunIcon" + i].source = cachekey(PlayerItemSystem.ItemPath(generalId), this);
			}
			for (let i = 0; i < this.RumInfo.missions.length; i++) {
				let num = (i == 0 ? this.RumInfo.itemCount : (this.RumInfo.itemCount - this.RumInfo.missions[i - 1].mission_condition)) / (i == 0 ? this.RumInfo.missions[i].mission_condition : (this.RumInfo.missions[i].mission_condition - this.RumInfo.missions[i - 1].mission_condition))
				if (i == 0) {
					if (num > 1) {
						num = 1;
					}
					this.imgScheduleMask0.width += num >= 1 ? 30 : num * 30;
				} else {
					if (num > 1) {
						num = 1;
					}
					this.imgScheduleMask0.width += num >= 1 ? 170 / (this.RumInfo.missions.length - 1) : num * 170 / (this.RumInfo.missions.length - 1);
				}
				if (num < 1) {
					return;
				}
			}
		}
	}
} 
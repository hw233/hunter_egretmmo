namespace zj {
	/**
	 * @author xingliwei
	 * 
	 * @date 2019-6-17
	 * 
	 * @class 贪婪之岛世界Boos结算
	 */
	export class ZorkBossEnd extends Dialog {
		private btnClose: eui.Button;
		public imgWinStar: eui.Image;
		public imgWinSword: eui.Image;
		public imgWinFlag: eui.Image;
		public imgWinLoge: eui.Image;
		public imgLoseSword: eui.Image;
		public imgLoseFlag: eui.Image;
		public imgLoseLogo: eui.Image;
		public labelDemage: eui.Label;
		public listViewList: eui.List;
		public labelMyRank: eui.Label;
		public imgMyFrame: eui.Image;
		public imgicon: eui.Image;
		public labelMyAtk: eui.Label;
		public labelMyName: eui.Label;
		public imgMyPer: eui.Image;
		public imgMyPerBg: eui.Image;
		public labelPer: eui.Label;
		// public imgTip: eui.Image;

		private win = [
			this.imgWinStar,
			this.imgWinSword,
			this.imgWinFlag,
			this.imgWinLoge,
		];
		private lose = [
			this.imgLoseSword,
			this.imgLoseFlag,
			this.imgLoseLogo,
		];
		private isWin: boolean = false;
		private rank = [];
		private display_num = 10;
		private bossBlood = 0;
		public constructor() {
			super();
			this.skinName = "resource/skins/battleEnd/ZorkBossEndSkin.exml";
			this.init();
		}

		private init() {
			// egret.Tween.get(this.imgTip, { loop: true }).to({ alpha: 0 }, 1200).to({ alpha: 1 }, 1200);
			this.imgMyPer.mask = this.imgMyPerBg;
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			if (Game.PlayerZorkSystem.zorkBoss.resultInfo) {
				let data = Game.PlayerZorkSystem.zorkBoss.resultInfo as any
				this.isWin = data.is_kill;
				this.bossBlood = data.max_hp;
			}
			this.win = [
				this.imgWinStar,
				this.imgWinSword,
				this.imgWinFlag,
				this.imgWinLoge,
			];
			this.lose = [
				this.imgLoseSword,
				this.imgLoseFlag,
				this.imgLoseLogo,
			];
			this.SetInfoList();
			this.SetInfoItem();
		}

		private SetInfoList() {
			this.rank = Game.PlayerZorkSystem.zorkBoss.rankItems;
			let rank = this.rank
			this.display_num = rank.length >= this.display_num ? this.display_num : rank.length;

			let array = new eui.ArrayCollection();
			for (let i = 0; i < this.display_num; i++) {
				let data = new ZorkBossEndItemData();
				data.info = rank[i];
				data.blood = this.bossBlood;
				array.addItem(data);
			}
			this.listViewList.dataProvider = array;
			this.listViewList.itemRenderer = ZorkBossEndItem;

			this.UpdateMyRank();
		}

		private UpdateMyRank() {
			let rank = 0;
			this.labelMyRank.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.disAttend);
			this.imgicon.source = PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picId)
			this.imgMyFrame.source = PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picFrameId)
			this.labelMyName.text = (Game.PlayerInfoSystem.BaseInfo.name)
			this.labelMyAtk.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.role_level, Game.PlayerInfoSystem.BaseInfo.level);
			let roleInfo = Game.PlayerZorkSystem.zorkBoss.roleInfo as any;
			if (roleInfo) {
				let a = (roleInfo.bossHurt / this.bossBlood * 100);
				if (a >= 100) {
					a = 100;
				}
				this.imgMyPerBg.width = 276 * a / 100;
				this.labelPer.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.perDemage, Set.NumberUnit4(roleInfo.bossHurt), a.toFixed(2));
			}

			for (let k in this.rank) {
				if (this.rank.hasOwnProperty(k)) {
					let v = this.rank[k];
					if (Game.PlayerInfoSystem.BaseInfo.id == v.baseInfo.id) {
						let rank = v.rank
						this.labelMyRank.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.rewardRank, rank);
						let percent = v.value / this.bossBlood * 100;
						if (percent > 100) {
							percent = 100;
						}
						this.imgMyPerBg.width = 276 * percent / 100;
						this.labelPer.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.perDemage, Set.NumberUnit4(v.value), percent.toFixed(2));
					}
				}
			}
		}

		private SetInfoItem() {
			let data = Game.PlayerZorkSystem.zorkBoss.resultInfo as any
			let str_killer = data.kill_name;
			let str_demage = data.max_hp - data.cur_hp;
			let str_per = str_demage / data.max_hp;
			for (let k in this.win) {
				if (this.win.hasOwnProperty(k)) {
					let v = this.win[k];
					if (v) {
						v.visible = this.isWin;
					}
				}
			}
			for (let k in this.lose) {
				if (this.lose.hasOwnProperty(k)) {
					let v = this.lose[k];
					if (v) {
						v.visible = !this.isWin;
					}
				}
			}
			if (this.isWin) {
				this.labelDemage.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.winKill, str_killer));
			} else {
				this.labelDemage.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.loseKill, Set.NumberUnit3(str_demage), str_per * 100));
			}
		}

		private onBtnClose() {
			StageSceneManager.Instance.clearScene();
			this.close();
			// Game.UIManager.popAllScenesAndDialogs(() => {
			// 	// loadUI(WonderlandScene)
			// 	// 	.then((scene: WonderlandScene) => {
			// 	// 		scene.show(UI.SHOW_FILL_OUT);
			// 	// 		scene.init();
			// 	// 	});
			// 	SceneManager.instance.EnterSceneZorkBoss()
			// });
			SceneManager.instance.EnterSceneZorkBoss()
		}
	}
}
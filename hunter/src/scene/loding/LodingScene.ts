namespace zj {
	enum PATCHER_RESULT {
		SUCCESS = 0,
		COMMON_ERROR = 1,
		NETWORK_ERROR = 2,
		MD5_ERROR = 3,
		ZLIB_ERROR = 4,
		STORAGE_ERROR = 5,
		CANCEL = 6,
		INVALID_ARG = 7,
	}

	/**
	 * 战斗前loading
	 */
	export class LodingScene extends Dialog {
		private Common_Trans: eui.Group;
		private SpriteBG: eui.Image;
		private LayerBar: eui.Group;
		private SpriteBar: eui.Image;
		private NodeBur: eui.Group;
		private LabelLoadingNum: eui.Label;
		private TextTip: eui.Label;
		private imgName: eui.Image;
		private LoadingAniNode: eui.Group;

		private updateTimer: number;

		public constructor() {
			super();
			this.skinName = "resource/skins/common/Common_TransSkin.exml";
			this.init();
		}
		public init() {
			this.SetBGPic();
			this.TextTip.text = this.GetRandomTip();
			this.updateTimer = 0;
			this.SpriteBar.percentWidth = 0;
		}

		/**设置背景图 */
		private SetBGPic() {
			let loadItem = this.GetRandomLoad();
			// if (Device.isReviewSwitch && Util.isWxMiniGame()) {
			// 	this.SpriteBG.source = cachekey("loading_board_review_jpg", this);
			// }
			if (Device.isCopyright || Device.isReviewSwitch && Util.isWxMiniGame()) {
				this.SpriteBG.source = cachekey("ui_login_BoardLoading_h5_jpg", this);
			} else {
				this.SpriteBG.source = cachekey(loadItem.bg, this);
			}

			let back_width = 1344;
			let back_height = 640;
			let rate = UIManager.StageHeight / back_height;
			let rate2 = UIManager.StageWidth / back_width;
			if (rate2 > rate) rate = rate2;
			back_width *= rate;
			back_height *= rate;
			this.SpriteBG.width = back_width;
			this.SpriteBG.height = back_height;

			if (Device.isReviewSwitch || Device.isCopyright) {
				this.imgName.visible = false;
				this.imgName.source = "";
			} else {
				this.imgName.visible = true;
				this.imgName.source = cachekey(loadItem.text, this);
				if (Game.TeachSystem.loadnum == 0) {
					Game.TeachSystem.loadnum = 1;
				}
			}
		}

		/**设置文字提示 */
		private GetRandomTip(): string {
			let randTotal: { [key: string]: TableClientRandomTips } = {};
			let tableTips = TableClientRandomTips.Table();
			if (Game.PlayerInfoSystem.BaseInfo == null) {
				randTotal = tableTips;
			}
			else {
				for (let [k, v] of HelpUtil.GetKV(tableTips)) {
					if (v.level <= Game.PlayerInfoSystem.BaseInfo.level) {
						randTotal[k] = v;
					}
				}
			}

			if (randTotal == null || Util.isEmptyObj(randTotal)) {
				randTotal = tableTips;
			}

			let len = Game.PlayerMissionSystem.tableLength(randTotal);
			let rowTips = Math.floor(Math.random() * (len - 1) + 1);
			let tipRet = randTotal[rowTips].des;
			return tipRet;
		}

		/**计时切换背景图 */
		private Update() {
			this.updateTimer = this.updateTimer + 1;
			if (this.updateTimer > 15 * 30) {
				this.updateTimer = 0;
				this.SetBGPic();
			}
		}

		/**设置进度条 */
		private setImgBar(num) {
			this.SpriteBar.percentWidth = num * 100;//this.barWidth * num;
		}
		public closeFun() {
			this.close();
			if (!Teach.isDone(3001)) {
				// Teach.teachingNow = false;
				// Game.TeachSystem.curPart = -1;
				Teach.checkTeachId();
			}
		}

		private GetHarmoniousLoad(): TableClientRandomLoading {
			let tableLoad = TableClientRandomLoading.Table();
			let ret = tableLoad[1];
			return ret;
		}

		private GetRandomLoad(): TableClientRandomLoading {
			let len = Game.PlayerMissionSystem.tableLength(TableClientRandomLoading.Table());
			let index = Math.floor(Math.random() * (len - 1) + 1);
			let ret = TableClientRandomLoading.Item(index);
			return ret;
		}


	}
}
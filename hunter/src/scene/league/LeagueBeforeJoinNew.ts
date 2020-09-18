namespace zj {
	// 公会-加入公会
	// lizhengqiang
	// 20181213
	export class LeagueBeforeJoinNew extends Dialog {
		private scrollerLeague: eui.Scroller;
		private lstLeague: eui.List; // 公会列表
		private txtName: eui.TextInput; // 帮会关键字
		private btnSearchName: eui.Button; // 搜索按钮
		private btnChange: eui.Button; // 换一批按钮
		private btnFast: eui.Button; // 一键加入
		private btnClose: eui.Button; // 关闭按钮

		private arrCollection: eui.ArrayCollection = new eui.ArrayCollection();;
		private arrSearch: message.LeagueBase[] = [];
		private isBatch: boolean = false;

		private start: number = 0;
		private numEach: number = 20;

		public constructor() {
			super();
			this.skinName = "resource/skins/league/LeagueBeforeJoinNewSkin.exml";

			this.scrollerLeague.addEventListener(eui.UIEvent.CHANGE_END, this.onScrollerEnd, this);
			this.btnSearchName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSearchName, this);
			this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChange, this);
			this.btnFast.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFast, this);
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);

			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);

			Game.EventManager.on(GameEvent.LEAGUE_BEFORE_JOIN_CLOSE, this.onBtnClose, this);

			this.init();
		}

		private init() {
			this.txtName.skinName = "resource/skins/common/TextInputSkin.exml";
			this.txtName.textDisplay.textColor = 0x411A03;
			this.txtName.promptDisplay.textColor = 0x958672;
			this.txtName.promptDisplay.size = 16;
			this.txtName.inputType = egret.TextFieldType.INPUT;
			this.txtName.prompt = TextsConfig.TextConfig_Input.joinLeagueName;

			this.search();
		}

		private search() {
			this.start = 0;
			this.arrSearch = [];
			Game.PlayerLeagueSystem.leagueSearch(0, this.txtName.text, this.start, this.numEach, this.isBatch).then((info: message.LeagueBase[]) => {
				// if (info.length == 0) {
				// 	toast_warning(LANG(TextsConfig.TextsConfig_Common.srhsNone));
				// }

				this.start = this.start + info.length;
				this.arrSearch = info;
				this.loadList();
			});
		}

		private loadList() {
			this.arrCollection.removeAll();
			for (let v of this.arrSearch) {
				this.arrCollection.addItem({ "leagueBase": v, "father": this });
			}
			this.lstLeague.itemRenderer = LeagueBeforeJoinItemNewIR;
			this.lstLeague.dataProvider = this.arrCollection;
		}

		private onScrollerEnd() {
			if (this.lstLeague.scrollV + this.scrollerLeague.height >= this.lstLeague.contentHeight) {
				Game.PlayerLeagueSystem.leagueSearch(0, this.txtName.text, this.start, this.numEach, this.isBatch).then((info: message.LeagueBase[]) => {
					if (info.length == 0) {
						// toast_warning(LANG(TextsConfig.TextsConfig_Common.srhsNone));
						return;
					}

					this.start = this.start + info.length;
					this.arrSearch = this.arrSearch.concat(info);

					let arrCollection = new eui.ArrayCollection();
					for (let v of this.arrSearch) {
						arrCollection.addItem({ "leagueBase": v, "father": this });
					}

					if (arrCollection.source.length == 0) return;
					this.arrCollection.replaceAll(arrCollection.source);
				});

			}
		}

		// 搜索
		private onBtnSearchName() {
			if (this.txtName.text == "") {
				toast_warning(LANG(TextsConfig.TextConfig_Input.joinLeagueName));
			} else {
				this.isBatch = false;
				this.search();
			}
		}

		// 换一批
		private onBtnChange() {
			this.isBatch = true;
			this.search();
		}

		// 一键加入
		private onBtnFast() {
			Game.PlayerLeagueSystem.leagueApplyQuick().then((resp: message.LeagueInfo) => {
				loadUI(LeagueHomeScene).then((scene: LeagueHomeScene) => {
					toast_success(LANG(HelpUtil.textConfigFormat(TextsConfig.TextConfig_League.quick_success, resp.info.name)));
					this.onBtnClose();

					scene.init();
					scene.show(UI.SHOW_FROM_TOP);
				});
			});
		}

		public managePop(msg: message.RoleInfoZip, point: egret.Point) {
			let tmp = this.getChildByName("Chat_UserPopB");
			if (tmp) this.removeChild(tmp);

			let pop = new Chat_UserPopB();
			pop.name = "Chat_UserPopB";
			pop.setMsgInfo(msg);
			pop.x = point.x - pop.width / 2 + 50;
			pop.y = point.y - pop.height / 2 + 10;
			this.addChild(pop);
		}

		private onClose(e: egret.TouchEvent) {
			let tmp = this.getChildByName("Chat_UserPopB");
			if (tmp) {
				let world = tmp["groupAdaptBoard"].localToGlobal();
				world.x -= Game.UIManager.x;
				let rect = new egret.Rectangle(world.x, world.y, tmp["groupAdaptBoard"].width, tmp["groupAdaptBoard"].height);

				if (rect.contains(e.stageX, e.stageY) == false) {
					this.removeChild(tmp);
				}
			}
		}

		private onBtnClose() {
			this.close();
		}
	}

}
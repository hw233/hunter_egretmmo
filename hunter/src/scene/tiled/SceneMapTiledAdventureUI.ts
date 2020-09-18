namespace zj {
	/**
	 * tiledMap 副本大地图UI
	 * zhaiweili
	 * 2019.10.24
	 */
	export class SceneMapTiledAdventureUI extends SceneMapUIBase {
		private dialogBG: eui.Group;
		private groupBR: eui.Group;
		private btnCloseTop: eui.Button;
		private btnHunter: eui.Button;
		private btnDaily: eui.Button;

		private btnDropAwardBox: eui.Button;
		private bubble: Bubble;
		private btnChat: eui.Button;
		private messageHistoryChat: eui.Group;
		private scrollBar: eui.Scroller;
		private simpleChat: eui.List;
		private listBottomData: eui.ArrayCollection = new eui.ArrayCollection();  // 聊天数据

		private groupTR: eui.Group;
		private lbGold: eui.Label; // 金币数
		private lbGemstone: eui.Label; // 钻石数
		private lbStrength: eui.Label; // 体力
		private btnAddGold: eui.Button; // 加金币按钮
		private btnAddGemstone: eui.Button; // 加钻石按钮
		private btnAddStrength: eui.Button; // 加体力按钮
		private imgFlagGold: eui.Image; // 金币标记
		private imgFlagGemstone: eui.Image; // 钻石标记
		private imgFlagStrength: eui.Image; // 体力标记

		private maxArea: number = -1;// 当前地图开启的最大小岛id
		private maxMob: number = -1;// 当前最大关卡bossid

		private maxAreaE: number = -1;// 当前地图挑战开启的最大小岛id
		private maxMobE: number = -1;// 当前挑战最大关卡bossid

		private isOpenNewArea: boolean;
		private isOpenElite: boolean;

		public dialogInfo: AdventureDialog;
		// 打开类型(在弹出UI时打开dialog)：
		// 默认0-只打开地图,1-打开当前最高普通副本列表，2-打开当前最高跳转副本列表, -1-打开指定的area（普通），-2-打开指定的area（挑战）
		private openType: number;
		private openArea: number;

		public constructor() {
			super();
			for (let i = 0; i < 6; ++i) {
				cachekey("map_adv_" + (i + 1) + "_jpg", this);
			}
			for (let i = 0; i < 20; ++i) {
				cachekey("adv_build_" + (i + 1) + "_png", this);
			}
			cachekey("cloud_1_png", this);
			cachekey("cloud_3_png", this);
			cachekey("cloud_4_png", this);

			let list = UIResource["HXH_InstanceFast"];
			for (let i = 0; i < list.length; ++i) {
				cachekey(list[i], this);
			}
		}
		public onSkinName() {
			this.skinName = "resource/skins/adventure/TiledSceneAdventureUISkin.exml";
		}

		public onInit() {
			super.onInit();
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveDialog, this);
			this.btnCloseTop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTouchClose, this);
			this.btnHunter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHunter, this);
			this.btnDaily.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDaily, this);
			this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
			this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
			this.btnAddStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddStrength, this);
			this.btnDropAwardBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDropAwardBox, this);
			this.messageHistoryChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChat, this);
			this.btnChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChat, this);
			this.btnDropAwardBox.visible = false;

			Game.EventManager.on(GameEvent.PLAYER_LEVEL_UP, this.refreshDialog, this);
			Game.EventManager.on(GameEvent.CLOSE_DIALOG, this.checkCloseDialog, this);
			Game.EventManager.on(GameEvent.REFRESH_MAINCITY_BUBBLE, this.refreshBubble, this);
			Game.EventManager.on(GameEvent.PLAYER_MOB_INFO_CHANGE, this.refreshDialog, this);
			Game.EventManager.on(GameEvent.CHAT_RESTART, this.InitChatList, this);
			Game.EventManager.on(GameEvent.PLAYER_COIN_CHANGE, this.updateUIStates, this);
			Game.EventManager.on(GameEvent.PLAYER_POWER_CHANGE, this.updateUIStates, this);
			Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.updateUIStates, this);

			this.isOpenNewArea = false;
			this.isOpenElite = false;
			if (Main.isCurrencysMove()) {
				this.groupTR.right = 100;
			}
			this.openType = 0;
			this.updateData();
			this.addBubble();
			this.initDialog();
			this.closeAdventureInfo();
		}

		public onLoadMap() {
			this.sceneMap = newUI(SceneMapTiledAdventure);
			(this.sceneMap as SceneMapTiledAdventure).init(this, SceneManager.mapIdAdventure);
			this.addChildAt(this.sceneMap, 0);
		}

		public mapLoadFinish() {
			super.mapLoadFinish();
			this.checkOpenType();
		}
		// 场景进入栈顶
		public onEntryTopScene() {
			Gmgr.Instance.setLayerId(TableEnum.TableEnumLayerId.LAYER_WONDERLAND);
			super.onEntryTopScene();

			this.updateUIStates();
			this.InitChatList();
			this.refreshBubble();
			this.refreshDialog();
			this.checkNewAreaStart();
			Teach.checkTeachId();
		}
		// 场景离开栈顶
		public onLeaveTopScene() {
			super.onLeaveTopScene();
			this.refreshBubble();
		}
		/**
		 * 设置打开类型：默认0,1-打开当前最高普通副本，2-打开当前最高跳转副本, -1-打开指定的area（普通），-2-打开指定的area（挑战）
		 */
		public setOpenType(type: number, openArea: number = -1) {
			this.openType = type;
			this.openArea = openArea;
		}
		public checkOpenType() {
			let currInfo;
			let maxArea;
			switch (this.openType) {
				case -1:
					maxArea = TableInstanceArea.Item(Math.min(this.openArea, Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL)));
					if (maxArea) {
						this.showAdventureInfo(maxArea, message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL);
					}
					break;
				case -2:
					maxArea = TableInstanceArea.Item(Math.min(this.openArea, Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE)));
					if (maxArea) {
						this.showAdventureInfo(maxArea, message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE);
					}
					break;
				case 1:
					maxArea = TableInstanceArea.Item(Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL));
					this.showAdventureInfo(maxArea, message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL);
					break;
				case 2:
					maxArea = TableInstanceArea.Item(Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE));
					this.showAdventureInfo(maxArea, message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE);
					break;
			}
		}
		/**
		 * 添加任务框
		 */
		private addBubble() {
			if (!Device.isReviewSwitch) {
				this.bubble.SetMainMissionAfterLogin();
			} else {
				this.bubble.visible = false;
			}
		}
		private refreshBubble() {
			if (!Device.isReviewSwitch) {
				this.bubble.SetMainMissionOnComeBack();
			}
		}
		public showAdventureInfo(data: TableInstanceArea, type = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
			this.dialogInfo.setData(data, type);
			this.openAdventureInfo();
		}
		private initDialog() {
			if (!this.dialogInfo) {
				this.dialogInfo = newUI(AdventureDialog);
				this.dialogBG.width = UIManager.StageWidth;
				this.dialogBG.height = UIManager.StageHeight;
				this.dialogInfo.setOwner(this);
				this.dialogBG.addChild(this.dialogInfo);
				this.dialogBG.visible = false;
				// this.dialogBG.scaleX = this.dialogBG.scaleY = 0;
			}
		}
		private openAdventureInfo() {
			if (this.dialogInfo) {
				this.dialogInfo.show();
				this.dialogBG.visible = true;
			}
		}

		public closeAdventureInfo() {
			this.dialogBG.visible = false;
			this.checkNewAreaStart();
		}

		private checkNewAreaStart(){
			if (this.isOpenNewArea || this.isOpenElite) {
				if(this.dialogBG.visible){
					return;
				}
				if(Game.UIManager.topScene() != this){
					return;
				}
				if(Game.UIManager.dialogCount() > 0){
					return;	
				}
				let newArea = this.isOpenNewArea;
				let newElite = this.isOpenElite;
				this.isOpenNewArea = false;
				this.isOpenElite = false;
				(this.sceneMap as SceneMapTiledAdventure).openAnimation(newArea, newElite);
			}
		}

		public SetMapCanTouch(isCanTouch: boolean) {// 新手引导调用
			this.sceneMap.setLockMap(!isCanTouch);
		}

		public setCanTouch(isCanTouch: boolean) {
			this.touchEnabled = this.touchChildren = isCanTouch;
		}
		public enterMap(data: TableInstanceArea) {
			// 进入跑图
			// loadUI(SceneMapAreaUI).then((scene: SceneMapAreaUI) => {
			// 	scene.setData(data);
			// 	scene.onInit();
			// 	scene.onLoadMap();
			// });
		}
		public isOpen(idx: number) {
			return idx <= Math.min(this.maxArea, SceneManager.adventureOpenMax);
		}
		// 猎人
		private onBtnHunter() {
			loadUI(HunterMainScene)
				.then((scene: HunterMainScene) => {
					scene.show(UI.SHOW_FROM_TOP);
					Teach.delTouchTipSpx();
				});
		}
		// 日常
		private onBtnDaily() {
			if (PlayerMissionSystem.FunOpenTo(FUNC.DAILY, true)) {
				loadUI(Daily_Main)
					.then((dialog: Daily_Main) => {
						dialog.isInstanceMain(true);
						dialog.show(UI.SHOW_FILL_OUT);
					});
			}
		}
		// 通关奖励
		private onBtnDropAwardBox() {
			loadUI(HXH_InstancePassDropInfo)
				.then((dialog: HXH_InstancePassDropInfo) => {
					dialog.show(UI.SHOW_FROM_TOP);
				});
		}
		//添加金币
		private onBtnAddGold() {
			loadUI(HelpGoldDialog)
				.then((dialog: HelpGoldDialog) => {
					dialog.SetInfoList(true);
					dialog.show(UI.SHOW_FROM_TOP);
				});
		}

		private onBtnAddGemstone() {
			// toast_success("加钻石功能未开启");
			loadUI(PayMallScene)
				.then((scene: PayMallScene) => {
					scene.show(UI.SHOW_FROM_TOP);
					scene.init(true);
				});
		}

		private onBtnAddStrength() {
			//增加体力
			loadUI(HXH_HunterUserStrength)
				.then((dialog: HXH_HunterUserStrength) => {
					dialog.SetInfo();
					dialog.show(UI.SHOW_FROM_TOP);
				});
		}
		private onBtnChat() {
			loadUI(Chat_Main)
				.then((dialog: Chat_Main) => {
					Game.SoundManager.playEffect(SoundManager.SoundOpen(30001), 100);
                    dialog.CB(() => {
                        this.Chat_MainCB();
                    });
					dialog.show();
				});
		}
		/**
         * 简易聊天内容list列表
         */
		private InitChatList() {
			this.listBottomData.removeAll();
			let chatInfosMini = Game.PlayerChatDataSystem.chatInfos;
			for (let i = 0; i < chatInfosMini.length; i++) {
				let v = chatInfosMini[i];
				let ChatItem = new FormatChatItem();
				let content = Game.PlayerChatDataSystem.GetChatInfo(v);
                if (Chat_Main.checkLeagueChat(content)) continue;
				let lineNum = 1;
				if (content[0]) {
					lineNum = Game.PlayerChatDataSystem.getStrlineNum(HelpUtil.textConfigFormat(content[0]), 322);
				} else {
					lineNum = Game.PlayerChatDataSystem.getStrlineNum(HelpUtil.textConfigFormat(content[0] + content[1] + content[2]), 322);
				}
				if (lineNum == 1) {
					if (v.type == 5 && v.content != "") {
						ChatItem.itemNum = 42;
					} else {
						ChatItem.itemNum = 20;
					}
				} else {
					ChatItem.itemNum = 42;
				}
				ChatItem.Data = v;
				this.listBottomData.addItem(ChatItem);
			}
			this.simpleChat.dataProvider = this.listBottomData;
			this.simpleChat.itemRenderer = HXH_ChatItem;
			this.scrollBar.viewport = this.simpleChat;
			setTimeout(() => {
				if (this.simpleChat.contentHeight < this.scrollBar.height) {
					this.simpleChat.scrollV = 0;
				} else {
					this.simpleChat.scrollV = this.simpleChat.contentHeight - this.scrollBar.height;
				}
			}, 100)
		}

		private OnTouchClose() {
			SceneManager.initType = 1;
			Game.EventManager.off(GameEvent.PLAYER_MOB_INFO_CHANGE, this.refreshDialog, this);
			Game.EventManager.off(GameEvent.CHAT_RESTART, this.InitChatList, this);
			Game.EventManager.off(GameEvent.PLAYER_COIN_CHANGE, this.updateUIStates, this);
			Game.EventManager.off(GameEvent.PLAYER_POWER_CHANGE, this.updateUIStates, this);
			Game.EventManager.off(GameEvent.PLAYER_TOKEN_CHANGE, this.updateUIStates, this);
			Game.EventManager.off(GameEvent.PLAYER_LEVEL_UP, this.refreshDialog, this);
			Game.EventManager.off(GameEvent.CLOSE_DIALOG, this.checkCloseDialog, this);
			Game.EventManager.off(GameEvent.REFRESH_MAINCITY_BUBBLE, this.refreshBubble, this);
			this.close();
		}

		private updateUIStates() {
			this.lbGold.text = Util.getValueStr(Game.PlayerInfoSystem.Coin);
			this.lbGemstone.text = Util.getValueStr(Game.PlayerInfoSystem.Token);
			this.lbStrength.text = Helper.StringFormat("%d/%d", Util.getValueStr(Game.PlayerInfoSystem.Power), (TableLevel.Item(Game.PlayerInfoSystem.Level).role_power + PlayerVIPSystem.LowLevel().power_add));
			//金币红点
			this.imgFlagGold.visible = Game.PlayerVIPSystem.vipInfo.buy_coin_free_time < PlayerVIPSystem.LowItem().buy_coin_free_time;
			this.imgFlagGemstone.visible = false;
			this.imgFlagStrength.visible = false;

			this.Chat_MainCB();
		}
		
        public Chat_MainCB() {
            let vis = Device.GetSaveIntInfo(Game.PlayerInfoSystem.BaseInfo.id + "imgvisible");
            if (vis == -1) {
                Device.SetSaveIntInfo(Game.PlayerInfoSystem.BaseInfo.id + "imgvisible", true)
            }
            if (Device.GetSaveIntInfo(Game.PlayerInfoSystem.BaseInfo.id + "imgvisible") == true) {
                this.btnChat.visible = false;
                this.messageHistoryChat.visible = true;
            } else {
                this.btnChat.visible = true;
                this.messageHistoryChat.visible = false;
            }
        }

		private checkCloseDialog(ev: egret.Event){
			let className = ev.data.typeName;
			this.checkNewAreaStart();
		}

		private pptId: number;
		private refreshDialog() {
			let lastMaxMobId = this.maxMob;
			let lastAreaId = this.maxArea;
			let lastMaxMobIdeE = this.maxMobE;
			let lastAreaIE = this.maxAreaE;
			this.updateData();
			if(this.dialogBG.visible){
				if(this.maxMob > lastMaxMobId || this.maxMobE > lastMaxMobIdeE){
					this.dialogInfo.updateUI(true);
				} else {
					this.dialogInfo.updateUI(false);
				}
			}
			this.checkOpenNormal(lastAreaId, lastAreaIE);
		}

		private checkOpenNormal(lastAreaId, lastAreaIE) {
			if (this.maxArea > lastAreaId) {// 开启下一建筑关卡
				this.isOpenNewArea = true;
			}
			if (this.maxAreaE > lastAreaIE) {
				this.isOpenElite = true;
			}
		}

		protected Update(tick) {
			super.Update(tick);
			if(this.dialogBG.visible){
				this.dialogInfo.Update(tick);
			}
			return false;
		}

		private updateData() {
			this.maxArea = Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL);
			this.maxMob = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID;
			this.maxAreaE = Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE);
			this.maxMobE = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxMobID;
		}

		private onRemoveDialog() {
			let dialogFirstBlood = this.getChildByName("First_Blood");
			if (dialogFirstBlood) this.removeChild(dialogFirstBlood);

			let dialogDrop = this.getChildByName("DropOrAward") as Common_Item;
			if (dialogDrop) this.removeChild(dialogDrop);

			let dialogAward = this.getChildByName("award");
			if (dialogAward) this.removeChild(dialogAward);

		}

		private test() {
			// this.areaMax = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID;
			// this.chapterMax = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxChapterID;
			// this.mobMax = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID;



			// 副本数据
			// areaNum = Game.PlayerMissionSystem.tableLength(TableInstanceArea.Table());// 表，一共10个小岛

			// FORMATION_TYPE_INSTANCE_NORMAL = 1,// 普天
			// FORMATION_TYPE_INSTANCE_ELITE = 2,// 挑战

			// 当前开启的最大小岛，从1开始
			// this.areaMax = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID;
			// 当前小岛里章id
			// this.chapterMax = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxChapterID;
			// 怪物id
			// this.mobMax = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID;

			// let mobInfos = Game.PlayerInstanceSystem.mobInfos;// 关卡数据列表

			// // 拿到物品id和数量
			// let goodsTbl: Array<number> = Game.PlayerInstanceSystem.ChestItem(vv).goods_ids;
			// let countTbl: Array<number> = Game.PlayerInstanceSystem.ChestItem(vv).goods_counts;
			// let itemSet = PlayerItemSystem.Set(goodsTbl[0], 0, countTbl[0]) as any;

			// this[`imgFrame${index}`].source = cachekey(itemSet.Frame, this);
			// this[`imgIcon${index}`].source = cachekey(itemSet.Path, this);

			// /**挑战 */ 	private onRightBtn2() 是否开启判断
		}
	}
}
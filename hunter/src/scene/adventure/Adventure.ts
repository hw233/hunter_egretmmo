namespace zj {
	export class Adventure extends UI {
		private owner: SceneMapTiledAdventure;
		public imgBuild: eui.Image;
		public imgElite: eui.Image;
		public adventureTitle: AdventureTitle;
		// public blockRect: MapRect;
		private idx: number;
		public touchRect: egret.Rectangle;
		public bornX: number;
		public bornY: number;

		public data: TableInstanceArea;
		public constructor() {
			super();
		}
		public setInfo(owner: SceneMapTiledAdventure, idx: number) {
			this.owner = owner;
			this.idx = idx;
			this.initData();
		}

		private initData() {
			this.imgElite.touchEnabled = false;
			this.adventureTitle.touchEnabled = false;
			this.adventureTitle.touchChildren = false;
			let touch: eui.Group = this["touch"];
			this.touchRect = new egret.Rectangle(this.x + touch.x, this.y - this.anchorOffsetY + touch.y, touch.width, touch.height);
			this.removeChild(touch);
			this.initAni();
		}

		private initAni(){
			let res = "ani";
			let idx = 0;
			while(this[res + idx]){
				let display = this[res + idx];
				let name = display.name;
				if(name){
					let ani = Game.AnimationManager.create(name);
					if(ani){
						ani.x = display.x;
						ani.y = display.y;
						let idx = this.getChildIndex(display);
						this.addChildAt(ani, idx);
						ani.onPlay();
					}
				}
				this.removeChild(display);
				++idx;
			}
		}

		public setData(_data: TableInstanceArea) {
			this.data = _data;
			this.adventureTitle.setData(this.owner, _data);
		}

		public get id() {
			return this.idx;
		}

		public setMaxArea(maxId: number) {
			if(this.id <= SceneManager.adventureOpenMax){
				if (this.id < maxId) {
					this.adventureTitle.setState(1);// 0-未开启，1-开启，2-当前, 3-下一关
				} else if (this.id == maxId) {
					this.adventureTitle.setState(2);
				} else if (this.id == maxId + 1) {
					this.adventureTitle.setState(3, this.checkLockType(maxId));
				} else {
					this.adventureTitle.setState(0);
				}
			} else {
				this.adventureTitle.setState(0);
			}
		}
		private checkLockType(maxId: number) {
			let customInstanceInfo: CustomInstanceInfo = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL];
			let maxMobID = customInstanceInfo.maxMobID;
			// 判断上一关卡是否全部通关
			let lastChapterNormal = TableChapterNormal.Item(maxId);
			let chapters = lastChapterNormal.chapter_pack;
			let modId = chapters[chapters.length - 1];

			let isPass = customInstanceInfo.mobsMap[modId] && customInstanceInfo.mobsMap[modId].star > 0;
			if (isPass) {
				// 等级限制
				if(Game.PlayerInfoSystem.Level < this.data.open_level){
					return Helper.StringFormat(TextsConfig.TextConfig_Instance.instanceLockLevel, this.data.open_level);
				} else {
					// 副本限制
					let chapter: TableChapterNormal = Game.PlayerInstanceSystem.ChapterInstance(this.data.area_normal[0]);
					let instanceData = TableInstance.Item(chapter.chapter_pack[0]);
					if (instanceData.challenge_level > 0) {
						let [chapterLock, idx] = Game.PlayerInstanceSystem.getChapterByInstanceId(instanceData.challenge_level);
						if(chapterLock){
							return TextsConfig.TextConfig_Instance.instanceLockElite + chapterLock.chapter_id + "-" + (idx + 1);
						}
					}
				}
			}
			return TextsConfig.TextConfig_Instance.instanceLockNormal;
		}
		public setMaxElite(maxId: number) {
			if(this.id == maxId && this.id < Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL)){
				this.imgElite.visible = true;
			} else {
				this.imgElite.visible = false;
			}
		}

		public setBorn(x: number, y: number) {
			this.bornX = x;
			this.bornY = y;
		}

		public isTouch(x: number, y: number) {
			return this.touchRect.contains(x, y);
		}

		public setTouch() {
			this.currentState = "down";
		}

		public clearTouch() {
			this.currentState = "up";
		}

		public getAniX() {
			return this.x - this.anchorOffsetX + this.adventureTitle.x + 80;
		}
		public getAniY() {
			return this.y - this.anchorOffsetY + this.adventureTitle.y + 34;
		}
		// public clearBlockRect(){
		// 	if(this.blockRect){
		// 		PoolManager.getInstance().addMapRect(this.blockRect);
		// 		this.blockRect = null;
		// 	}
		// }
	}
}
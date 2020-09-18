namespace zj {
	/**
	 * 副本系统
	 * created by Lian Lei
	 * 2018.12.26
	 */
	export class PlayerInstanceSystem {

		///////////////////////////////////////////////////////////////////////////
		// 私有变量

		private instanceInfo: message.InstanceInfo = new message.InstanceInfo(); // 副本基本数据

		/**副本其他信息 */
		public get InstanceInfo(): message.InstanceInfo {
			return this.instanceInfo;
		}

		/**游戏币副本次数 */
		public get Instance_money(): number {
			return this.instanceInfo.instance_money;
		}

		/**游戏币副本cd剩余时间 */
		public get Instance_money_time(): number {
			return this.instanceInfo.instance_money_time;
		}

		/**经验副本次数 */
		public get Instance_exp(): number {
			return this.instanceInfo.instance_exp;
		}

		/**经验副本cd剩余时间 */
		public get Instance_exp_Time(): number {
			return this.instanceInfo.instance_exp_time;
		}

		/**游戏币副本最高伤害 */
		public get Instance_money_max(): number {
			return this.instanceInfo.instance_money_max;
		}

		/**经验副本最高连击 */
		public get Instance_exp_max(): number {
			return this.instanceInfo.instance_exp_max;
		}

		/**游戏币副本上次伤害 */
		public get Instance_money_last(): number {
			return this.instanceInfo.instance_money_last;
		}

		/**经验副本上次连击 */
		public get Instance_exp_last(): number {
			return this.instanceInfo.instance_exp_last;
		}

		/**普通副本领取状态 */
		public get NormalReward(): Array<message.InstanceReward> {
			return this.instanceInfo.normalReward;
		}

		/**精英副本领取状态 */
		public get EliteReward(): Array<message.InstanceReward> {
			return this.instanceInfo.eliteReward;
		}

		/**特训关卡信息 */
		public get Training(): Array<message.InstanceTraining> {
			return this.instanceInfo.training;
		}

		/**探索副本信息 */
		public get SearchInfo(): Array<message.InstanceSearch> {
			return this.instanceInfo.searchInfo;
		}

		/**上次爬塔刷新时间 */
		public get LastTowerRefreshTime(): number {
			return this.instanceInfo.lastTowerRefreshTime;
		}

		/**本周爬塔怪物索引 */
		public get MonsterTowerIndex(): number {
			return this.instanceInfo.monsterTowerIndex;
		}

		/**是否跳层 */
		public get Is_JumpTower(): boolean {
			return null// this.instanceInfo.is_jumpTower;
		}

		/**探索副本次数 */
		public get SearchTimes(): number {
			return null// this.instanceInfo.searchTimes;
		}

		/**上次高级塔塔怪刷新时间 */
		public get High_lastTowerRefreshTIme(): number {
			return null// this.instanceInfo.high_lastTowerRefreshTime;
		}

		/**本周高级塔塔怪物索引 */
		public get High_monsterTowerIndex(): number {
			return null// this.instanceInfo.high_monsterTowerIndex;
		}

		/**高级塔是否跳层 */
		public get High_is_jumpTower(): boolean {
			return null// this.instanceInfo.high_is_jumpTower;
		}

		/**遗迹副本信息 */
		public get RelicInfo(): Array<message.InstanceRelic> {
			return this.instanceInfo.relicInfo;
		}

		/**获得宝箱(k.id;v.times) */
		public get RelicChest(): Array<message.IIKVPairs> {
			return this.instanceInfo.relicChest;
		}

		/**遗迹挑战次数(k.id;v.times) */
		public get RelicBattleTimes(): Array<message.IIKVPairs> {
			return this.instanceInfo.relicBattleTimes;
		}


		/**副本信息 */
		private _curInstances: { [key: number]: CustomInstanceInfo } = {};

		public get curInstances() {
			return this._curInstances;
		}

		public RandInfo = null;
		/**随机副本是否开启 */
		public static RandInfoVis: boolean = false;

		/***
		 * 索引从1开始 normal也是1
		 */
		public set curInstances(v: { [key: number]: CustomInstanceInfo }) {
			this._curInstances = v;
		}

		public checkCurInstances(type: number) {
			let curInstances = this.curInstances[type];
			let instance = TableInstance.Item(curInstances.curMobID);
			if (!instance) {
				curInstances.curMobID = curInstances.maxMobID;
			}
		}
		/**
		 * 获取当前达到的最高等级的小岛（判断角色等级限制）
		 */
		public getmaxAreaID(type: number): number {
			let maxAreaId = Math.min(this.curInstances[type].maxAreaID, SceneManager.adventureOpenMax);
			if (maxAreaId == 0) {
				maxAreaId = 1;
			}
			if (maxAreaId > 0) {
				let table = TableInstanceArea.Item(maxAreaId);
				if (table) {
					let level = Game.PlayerInfoSystem.Level;
					if (level < table.open_level) {
						for (let i = maxAreaId - 1; i >= 1; --i) {
							table = TableInstanceArea.Item(i);
							if (level >= table.open_level) {
								return i;
							}
						}
					}
				}
			}
			return maxAreaId;
		}

		/**探索上阵信息 */
		private searchFormation: { [key: string]: string } = {};

		public getSearchFormation(key: string) {
			return this.searchFormation[key];
		}

		public setSearchFormation(key: string, value: string) {
			this.searchFormation[key] = value;
		}

		// /**探索阵容 */
		// private searchTeam: {[areaId: number]: Array<Object>} = {};

		// /**
		//  * 存放探索设置阵容
		//  * @param areaId 当前副本ID
		//  * @param index 列表中第几项
		//  * @param value 上阵信息 {第几项: 武将ID}
		//  */
		// public setSearchTeam(areaId:number, index: number, value:Object){
		// 	this.searchTeam[areaId][index] = value;
		// }

		// /**
		//  * 读取探索设置阵容
		//  * @param areaId 当前副本ID
		//  * @param index 列表中第几项
		//  */
		// public getSearchTeam(areaId: number, index: number){
		// 	let v = this.searchTeam[areaId];
		// 	return v ? v[index] :null;
		// }

		public curServerTime = 0;

		public curInstanceType: number = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;

		private _mobInfos: Array<message.MobInfo> = [];
		public get mobInfos() {
			return this._mobInfos;
		}
		public set mobInfos(v: Array<message.MobInfo>) {
			this._mobInfos = v;
		}
		public canSyncLevel: boolean = true;

		public preInstanceInfo = {};
		public isJumpToInstance: boolean = false; // 是否为跳转到副本界面

		private _activityBattleIndex: number = -1; // 活动副本当前索引
		public get activityBattleIndex(): number {
			return this._activityBattleIndex;
		}

		public set activityBattleIndex(v: number) {
			this._activityBattleIndex = v;
		}

		public activityBattleCachInfo = {};


		///////////////////////////////////////////////////////////////////////////
		// 成员方法
		public init() {
			this.InitInstanceInfo();
			this.initLastInstance();
			Game.EventManager.on(GameEvent.PLAYER_BASE_INFO_CHANGE, this.onBaseInfoChange, this);
			Game.EventManager.on(GameEvent.PLAYER_MOB_INFO_CHANGE, this.onMobInfoChange, this);
			Game.EventManager.on(GameEvent.PLAYER_INSTANCE_INFO_CHANGE, this.onInstanceInfoChange, this);
			Game.EventManager.on(GameEvent.PLAYER_LEVEL_UP, this.onLevelUp, this);
		}

		public uninit() {
			this.instanceInfo = new message.InstanceInfo();;
			this.searchFormation = {};
			this.curServerTime = 0;
			this.curInstanceType = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
			this._mobInfos = [];
			this.canSyncLevel = true;
			this.preInstanceInfo = {};
			this.isJumpToInstance = false;
		}

		private onBaseInfoChange(ev: egret.Event) {
			this.freshData();
		}

		private onMobInfoChange(ev: egret.Event) {
			let changeMobInfos = <Array<message.MobInfo>>ev.data;
			if (this.mobInfos.length < 1) {
				this.mobInfos = changeMobInfos;
			}
			else {
				for (let i = 0; i < changeMobInfos.length; i++) {
					let changeMobInfo: message.MobInfo = changeMobInfos[i];
					let push: boolean = true;
					for (let j = 0; j < this.mobInfos.length; j++) {
						let mobInfo: message.MobInfo = this.mobInfos[j];
						if (changeMobInfo.mobId == mobInfo.mobId) {
							this.mobInfos[j] = changeMobInfo;
							push = false;
						}
					}
					if (push) this.mobInfos.push(changeMobInfo);
				}
			}

			this.freshData();
		}

		private onInstanceInfoChange(ev: egret.Event) {
			this.InitInstanceInfo();
			this.instanceInfo = <message.InstanceInfo>ev.data;
			if (this.instanceInfo.activityRandMobs && this.instanceInfo.activityRandMobs.length != 0) {
				if (this.instanceInfo.activityRandMobs != this.RandInfo) {
					this.RandInfo = this.instanceInfo.activityRandMobs;
					PlayerInstanceSystem.RandInfoVis = true;
				}
			}
			this.freshData();
		}

		public onLevelUp(e: egret.Event): void {
			this.freshData();
		}

		private InitInstanceInfo() {
			this._curInstances = {};
			for (let [k, v] of HelpUtil.GetKV(message.EFormationType)) {
				let instancce = new CustomInstanceInfo;
				instancce.instanceType = Number(k);
				this._curInstances[instancce.instanceType] = instancce;
			}
		}

		/**
		* 刷新副本数据，升级的时候没有怪信息传递，所以ExecutePro里面不会刷新副本信息
		* 而普通副本是通过等级来限制的，所以在升级的时候需要主动刷新一下
		*/
		public freshData() {
			for (let [k, v] of HelpUtil.GetKV(this.mobInfos)) {
				let suffix = Math.floor(v.mobId / 100000)
				let instances = ["NORMAL", "ELITE", "MONEY", "EXP"]
				this.curInstances[suffix].mobsMap[v.mobId] = v;
				if (v.mobId > this.curInstances[suffix].maxMobID) {
					this.curInstances[suffix].maxMobID = v.mobId
				}
			}

			this.binaryQuery(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL);
			this.binaryQuery(message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE);
			this.getMaxAreaNORMAL();
			this.getMaxAreaELITE();
		}

		public tableLength(table: Object): number {
			let len = 0;
			for (let k in table) {
				len++;
			}
			return len;
		}

		/**
		 * 得到怪物最大id
		 */
		public getMaxMobID(eType) {
			let tableInstance = TableInstance.Table();
			let ret = 0;
			for (let k in tableInstance) {
				let v = tableInstance[k];
				let kk = parseInt(k);
				if (kk < (eType + 1) * 100000 && kk > eType * 100000 && ret < kk) {
					ret = kk;
				}
			}
			return ret;
		}

		public getMaxAvailableMobID(eType) {
			let ret = this.curInstances[eType].maxMobID;
			while (Game.PlayerInstanceSystem.InstanceFun(ret - 1) != null && Game.PlayerInstanceSystem.CheckAvailable(ret) == false) {
				ret = ret - 1;
			}
			return ret;
		}

		public instances = ["", "NORMAL", "ELITE", "MONEY", "EXP"];

		/**
		 * 用来设置 maxChapterID
		 */
		public binaryQuery(eType) {
			let suffix = this.instances[eType];
			let tableName = StringConfig_Table["chapter" + suffix];

			let tableChapter = Game.ConfigManager.getTable(tableName + ".json");
			//CSV:GetTable(tableName);

			if (this.curInstances[eType].maxMobID > this.getMaxMobID(eType)) {
				this.curInstances[eType].bClear = true;
				this.curInstances[eType].maxChapterID = Game.PlayerInstanceSystem.getLength(tableChapter);
				//为什么 maxChapterID 不设置呢????
			}
			else {
				this.curInstances[eType].bClear = false;
				let low = 1;
				let mid = 1;
				let high = this.getLength(tableChapter);
				while (low <= high) {
					mid = Math.floor((low + high) / 2);
					// let cpl = tableChapter[mid].chapter_pack["length"] - 1;
					if (tableChapter[mid].chapter_pack[this.tableLength(tableChapter[mid].chapter_pack) - 1] < this.getMaxAvailableMobID(eType)) {
						low = mid + 1;
					} else if (tableChapter[mid].chapter_pack[0] > this.getMaxAvailableMobID(eType)) {
						high = mid - 1;
					} else {
						this.curInstances[eType].maxChapterID = mid;
						break;
					}
				}
			}
		}

		public getLength(obj: Object): number {
			let i: number = 0;
			for (let k in obj) {
				i++;
			}
			return i;
		}

		// 每个小岛的普通副本的最后一关列表
		private areaLastInstance: { [key: string]: number };
		private areaLastElite: { [key: string]: number };
		private initLastInstance() {
			this.areaLastInstance = {};
			this.areaLastElite = {};
			let areas: { [key: string]: TableInstanceArea } = TableInstanceArea.Table();
			for (let key in areas) {
				let area: TableInstanceArea = areas[key];
				let chapter = TableChapterNormal.Item(area.area_normal[0]);
				let instanceId = chapter.chapter_pack[chapter.chapter_pack.length - 1];
				this.areaLastInstance[key] = instanceId;

				let elite = TableChapterElite.Item(area.area_elite[0]);
				let eInstanceId = elite.chapter_pack[elite.chapter_pack.length - 1];
				this.areaLastElite[key] = eInstanceId;
			}
		}
		// 根据小岛id，获取小岛的最后一关的关卡id
		public getLastInstance(areaId: number) {
			return this.areaLastInstance[areaId + ""];
		}
		// 根据小岛id，获取小岛挑战关卡最后一关id
		public getLastElite(areaId: number) {
			return this.areaLastElite[areaId + ""];
		}
		// 根据最后一关的关卡ID，获取关卡所在的小岛
		public getAreaIdByLastMobId(mobId: number, type = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
			let map = type == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL ? this.areaLastInstance : this.areaLastElite;
			for (let key in map) {
				if (map[key] == mobId) {
					return key;
				}
			}
			return -1;
		}
		// 判断是否为最后一关
		public isLastMob(type) {
			return this.getAreaIdByLastMobId(this.curInstances[type].curMobID, type) >= 0;
		}
		/**
		 * 这个方法用来设置 maxAreaID 
		 */
		public getMaxAreaNORMAL() {
			let tableChapter: { [key: string]: TableInstanceArea } = TableInstanceArea.Table();
			for (let [kk, vv] of HelpUtil.GetKV(tableChapter)) {
				for (let [ak, av] of HelpUtil.GetKV(vv.area_normal)) {
					if (av < this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxChapterID) {
						this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID = Number(kk);
					}
					else if (av == this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxChapterID) {
						this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID = Number(kk);
						return;
					}
					else {
						return;
					}
				}
			}
		}

		public getMaxAreaELITE() {
			let tableChapter: { [key: string]: TableInstanceArea } = TableInstanceArea.Table();
			for (let [kk, vv] of HelpUtil.GetKV(tableChapter)) {
				for (let [ak, av] of HelpUtil.GetKV(vv.area_elite)) {
					if (av < this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxChapterID) {
						this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxAreaID = Number(kk);
					}
					else if (av == this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxChapterID) {
						this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxAreaID = Number(kk);
						return;
					}
					else {
						return;
					}
				}
			}
		}

		public ckid(id) {
			return id == null || id == -1;
		}

		public AreaInstance(id): TableInstanceArea {// 索引从1开始
			if (this.ckid(id)) {
				return null;
			}
			return TableInstanceArea.Item(id);
		}

		public EliteInstance(id): TableChapterElite {
			if (this.ckid(id)) {
				return null;
			}
			return TableChapterElite.Item(id);
		}

		/**
		 * 副本宝箱表格信息
		 */
		public ChestItem(mobsId): TableInstanceChest {
			if (this.ckid(mobsId)) {
				return null;
			}
			return TableInstanceChest.Item(mobsId);
		}

		public ChapterInstance(id): TableChapterNormal {
			if (this.ckid(id)) {
				return null;
			}
			return TableChapterNormal.Item(id);
		}

		public SearchInstance(id) {
			if (this.ckid(id)) {
				return null;
			}
			return TableInstanceSearch.Item(id);
		}

		public Mob(id: number) {
			let mobId = id || this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curMobID;
			return this.curInstances[this.Type(mobId)].mobsMap[mobId];
		}

		public InstanceFun(id: number): any {
			let mobId = id || this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curMobID;
			if (this.Type(mobId) == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL || this.Type(mobId) == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
				return TableInstance.Item(mobId);
			} else if (this.Type(mobId) == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY || this.Type(mobId) == message.EFormationType.FORMATION_TYPE_INSTANCE_EXP) {
				return TableInstanceVillage.Item(mobId);
			}
		}

		public Type(instanceId: number) {
			return Math.floor(instanceId / 100000);
		}

		public ChapterIdx(id: number) {
			let chapterNormal: { [key: string]: TableChapterNormal; } = TableChapterNormal.Table();//CSV:GetTable(StringConfig_Table.chapterNORMAL)
			let chapterElite: { [key: string]: TableChapterElite; } = TableChapterElite.Table();

			if (this.ckid(id)) {
				return null;
			}

			let tbl = null;
			if (Game.PlayerInstanceSystem.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
				tbl = chapterNormal;
			}
			else if (Game.PlayerInstanceSystem.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
				tbl = chapterElite;
			}
			else if (Game.PlayerInstanceSystem.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY) {
				return null;
			}
			else if (Game.PlayerInstanceSystem.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_EXP) {
				return null;
			}

			for (let [k, v] of HelpUtil.GetKV(tbl)) {
				for (let [kk, vv] of HelpUtil.GetKV(v.chapter_pack)) {
					if (id == vv) {
						return [k, kk];
					}
				}
			}
			return null;
		}

		public Chapter(id: number) {
			let chapterNormal = TableChapterNormal.Table();
			let chapterElite = TableChapterElite.Table();

			let tbl = null;
			if (Game.PlayerInstanceSystem.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
				tbl = chapterNormal;
			}
			else if (Game.PlayerInstanceSystem.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
				tbl = chapterElite;
			}
			else if (Game.PlayerInstanceSystem.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY) {
				return null;
			}
			else if (Game.PlayerInstanceSystem.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_EXP) {
				return null;
			}

			for (let [v, k] of HelpUtil.GetKV(tbl)) {
				for (let [vv, kk] of HelpUtil.GetKV(k.chapter_pack)) {
					if (id == kk) {
						return k;
					}
				}
			}
			return null;
		}
		public CheckCount(id: number) {
			let mobId = id || Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID;
			let ret = false;
			if (TableInstance.Item(mobId).challenge_num == 0) {
				ret = true;
			} else {
				let cur = this.Mob(mobId).dayTime;
				let total = TableInstance.Item(mobId).challenge_num * (1 + this.Mob(mobId).buyTime);
				if (cur < total) {
					ret = true;
				} else {
					ret = false;
				}
			}
			return ret;
		}

		public CheckPower(id: number, count?: number): boolean {
			let mobId: number = id || this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curMobID;
			let mobCnt: number = count || 1;
			let ret: boolean = false;

			let powerCost = (TableInstance.Item(mobId).challenge_win + TableInstance.Item(mobId).challenge_start) * mobCnt;
			if (powerCost <= Game.PlayerInfoSystem.BaseInfo.power) {
				ret = true;
			}
			else {
				ret = false;
			}
			return ret;
		}

		public isOpenAreaById(areaId: number) {
			let area = TableInstanceArea.Item(areaId);
			if (area) {
				return Game.PlayerInfoSystem.Level >= area.open_level;
			}
			return false;
		}

		public isOpenInstanceById(instanceId: number) {
			let [chatper, idx] = this.getChapterByInstanceId(instanceId);
			if (chatper) {
				return this.isOpenAreaById(chatper.chapter_id);
			}
			return false;
		}

		public getChapterByInstanceId(instanceId: number): [TableChapterElite | TableChapterNormal, number] {
			let type = Game.PlayerInstanceSystem.Type(instanceId);
			let chapterMap;
			if (type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
				chapterMap = TableChapterElite.Table();
			} else if (type == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
				chapterMap = TableChapterNormal.Table();
			}
			for (let key in chapterMap) {
				let chapter: TableChapterElite | TableChapterNormal = chapterMap[key];
				let idx = chapter.chapter_pack.indexOf(instanceId);
				if (idx >= 0) {
					return [chapter, idx];
				}
			}
			return [null, 0];
		}

		/**
		 * 副本id列表
		 * 
		 * @param id 物品ID
		 * 
		 * from db_instance.lua
		 */
		public GetPartner(id: number) {
			let tbl = TableInstance.Table();
			let instance: number[] = [];
			for (let k in tbl) {
				if (tbl.hasOwnProperty(k)) {
					let v = tbl[k];
					for (let i = 0; i < v.challenge_goods.length; i++) {
						let vv = v.challenge_goods[i]; // 掉落物品
						if (vv == id) {
							instance.push(v.instance_id);
						}
					}
				}
			}
			return instance;
		}

		/**
		 * 副本属性信息
		 * 
		 * @param id 物品ID
		 * 
		 * from db_instance.lua
		 */
		public GetProp(propId: number): Array<number> {
			let tbl = TableInstance.Table();
			let instance: Array<number> = [];
			for (let [v, k] of HelpUtil.GetKV(tbl)) {
				for (let [vv, kk] of HelpUtil.GetKV(k.challenge_goods)) {
					if (kk == propId) {
						instance.push(k.instance_id);
					}
				}
			}
			return instance;
		}

		/**
		 * 是否打过了指定的副本
		 * 
		 * from db_instance.lua
		 */
		public static CheckPassed(instanceId: number): boolean {
			let ret = false;
			let id = Math.floor(instanceId / 100000);
			if ((id == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID > instanceId) ||
				(id == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE && Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxMobID > instanceId)) {
				ret = true;
			}
			return ret;
		}

		// public ChapterBossInstanceID() {
		// 	return this.ChapterItem().chapter_pack[Helper.getObjLen(this.ChapterItem().chapter_pack) - 1];
		// }

		public ChapterItem(curChapterIdx?): any {
			if (curChapterIdx == null) {
				curChapterIdx = this.curInstances[this.curInstanceType].curChapterID;
			}
			if (curChapterIdx == null || curChapterIdx == -1) {
				console.log("curChapterIdx: " + curChapterIdx);
				return null;
			}
			let [tbl, tblName] = this.ChapterTable();
			return tbl[curChapterIdx];
		}

		public ChapterTable(): [{ [key: string]: TableChapterNormal | TableChapterElite }, string] {
			let _chapter_normal = TableChapterNormal.Table();
			let _chapter_elite = TableChapterElite.Table();
			let type: number = this.curInstanceType;
			if (type == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
				return [_chapter_normal, StringConfig_Table.chapterNORMAL];
			} else if (type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
				return [_chapter_elite, StringConfig_Table.chapterELITE];
			} else {

			}
		}

		public CheckAvailable(id) {
			let mobId = id || this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID;
			let ret = false;
			if (this.Type(mobId) == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL && !this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].bClear) {
				//普通副本，受等级限制
				let ins = this.InstanceFun(mobId);
				if (ins != null) {
					if (ins.challenge_level >= 0 && ins.challenge_level <= CommonConfig.role_max_level) {
						if (ins.challenge_level <= Game.PlayerInfoSystem.BaseInfo.level) {
							ret = true;
						}
					}
					else if (this.Type(ins.challenge_level) == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
						let maxMobID = this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxMobID;
						if (maxMobID > ins.challenge_level) {
							ret = true;
						}
					}
				}
			}
			else if (this.Type(mobId) == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE && !this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].bClear) {
				//精英副本，受普通副本开启限制
				if (this.InstanceFun(mobId) != null && this.InstanceFun(mobId).challenge_level <= this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID - 1) {
					ret = true;
				}
			} else {
				ret = true;
			}
			return ret;
		}



		public getInfo(): CustomInstanceInfo {
			return this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL];
		}

		public GetAreaComplete(areaId) {
			let maxAreaId = this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID;
			if (areaId < maxAreaId) {
				return true;
			}
			else {
				let maxMob = this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID;
				let chapterList = this.AreaInstance(areaId).area_normal;
				let maxChapter = chapterList[chapterList.length - 1];
				let chapterTbl = TableChapterNormal.Item(maxChapter);
				if (chapterTbl != null && maxMob > chapterTbl.chapter_pack[chapterTbl.chapter_pack.length - 1]) {
					return true;
				}
				else {
					return false;
				}
			}
		}

		/**
		 * 是否可以打本区域挑战副本
		 */
		public ElitePackCanChallenge(areaId): any {
			let code = 0;
			if (areaId < this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxAreaID) {
				return [true, code];
			}
			else {
				let chapterList = this.AreaInstance(areaId).area_elite;
				let firChapter = chapterList[0];
				if (firChapter == null) {
					return false;
				}

				let chapterTbl = TableChapterElite.Item(firChapter);
				let first_chapter_info = TableInstance.Item(chapterTbl.chapter_pack[0]);

				//服务器认定是否可打
				// let chapterList = this.AreaInstance(areaId).area_elite
				// let firChapter = chapterList[0]
				// let chapterTbl = TableChapterElite.Item(firChapter);

				let [instance,] = Table.FindR(this.mobInfos, function (k, v) {
					if (v.mobId == chapterTbl.chapter_pack[0]) {
						return true;
					}
				});

				if (this.Type(first_chapter_info.challenge_level) == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
					let maxMob = this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID;
					if (chapterTbl != null && maxMob > first_chapter_info.challenge_level) {
						if ((chapterTbl != null) && (instance != null)) {
							return [true, code];
						}
						else {
							//未通关上一精英副本
							return [false, 2];
						}
					}
					else {
						//普通副本关卡
						return [false, first_chapter_info.challenge_level];
					}
				}
				else if (this.Type(first_chapter_info.challenge_level) == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
					let maxMob = this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxMobID;
					if (chapterTbl != null && maxMob > first_chapter_info.challenge_level) {
						if ((chapterTbl != null) && (instance != null)) {
							return [true, code]
						} else {
							//未通关上一精英副本
							return [false, 2];
						}
					}
					else {
						//精英副本关卡
						return [false, first_chapter_info.challenge_level];
					}
				}
			}
		}

		/**
		 * 判断当前区域是否已经开启(只判断NORMAL)
		 */
		public GetAreaIsLock(areaId: number) { // 从1开始
			if (areaId <= this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID) {
				return false;
			}
			else if (areaId == this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID + 1) {
				let maxMob = this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID;
				let chapterList = this.AreaInstance(this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID).area_normal;
				let maxChapter = chapterList[chapterList.length - 1];
				let chapterTbl = TableChapterNormal.Item(maxChapter);
				let curAreaChapterList = this.AreaInstance(areaId).area_normal;
				if (curAreaChapterList[0] == null) {
					return -1;
				}
				else if (maxMob > chapterTbl.chapter_pack[chapterTbl.chapter_pack.length - 1]) {
					let instanceTbl = this.InstanceFun(maxMob);
					return instanceTbl.challenge_level;
				}
				else {
					return true;
				}
			}
			else {
				return true;
			}
		}

		//当前关卡探索副本是否完成
		public IsCompleteCurSearch(chapter) {
			if (this.instanceInfo.searchInfo == null) {
				return false;
			}
			for (let k: number; k < this.instanceInfo.searchInfo.length; k++) {
				let v = this.instanceInfo.searchInfo[k];
				// if (v.type == chapter) {
				// 	let searchInfo = this.SearchInstance(v.index);
				// 	if (Game.Controller.serverNow().getTime() >= (v.start_time + searchInfo.time)) {
				// 		return true;
				// 	}
				// }
			}
			return false;
		}

		public GetAreaSearchStatus() {
			let ret: Array<boolean> = [];
			let searchInfoMap: { [id: number]: message.InstanceSearch } = {};
			for (let [kk, vv] of HelpUtil.GetKV(this.InstanceInfo.searchInfo)) {
				searchInfoMap[vv.index] = vv;
			}

			let tblArea: { [id: number]: TableInstanceArea } = {};
			tblArea = TableInstanceArea.Table();

			for (let [kk, vv] of HelpUtil.GetKV(tblArea)) {
				let areaSearchList: Array<number> = vv.area_search;
				for (let i = 0; i < areaSearchList.length; i++) {
					let v = areaSearchList[i];
					if (searchInfoMap[v] != null) {
						ret[vv.area_id - 1] = this.CalcSearchStatue(searchInfoMap[v]);
						break;
					}
				}
			}
			return ret;
		}


		public CalcSearchStatue(info: message.InstanceSearch): boolean {
			let tblInfo = this.SearchInstance(info.index);
			// let time = Game.Controller.serverNow().getTime() - info.start_time;
			let date = Game.Controller.serverNow();
			let humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
			let time = (humanDate.getTime() / 1000 - 8 * 60 * 60) - info.start_time;

			if (time >= tblInfo.time) {
				return true;
			} else {
				return false;
			}
		}

		public GetHunterBeInSearch(generalId: number) {
			let generalList = [];
			for (let [k, v] of HelpUtil.GetKV(this.SearchInfo)) {
				for (let [kk, vv] of HelpUtil.GetKV(v.generalId)) {
					generalList.push(vv);
				}
			}
			return Table.FindK(generalList, generalId);
		}

		/**
		 * 存放探索设置阵容
		 * @param index 当前副本ID
		 * @param format 猎人ID数组 初始为["0", "0", "0", "0"]
		 */
		public SearchInstanceSaveFormat(index: number, format: Array<string>) {
			let str: string = "";
			for (let i = 0; i < format.length; i++) {
				let vv = format[i];
				if ((i + 1) == format.length) {
					str = str + vv;
				}
				else {
					str = str + vv + "|";
				}
			}
			this.setSearchFormation(Game.PlayerInfoSystem.BaseInfo.id + "_SearchInstance_" + index, str);
		}

		/**
		 * 读取探索设置阵容
		 * @param index 当前副本ID
		 */
		public SearchInstanceGetFormat(index: number) {
			let ret: Array<string> = ["0", "0", "0", "0"];
			let str: string = this.getSearchFormation(Game.PlayerInfoSystem.BaseInfo.id + "_SearchInstance_" + index);
			// let str = "110001"+"|"+"110002"+"|"+"110003"+"|"+"110004";
			if (str != undefined || str != null) {
				ret = str.split("|");
			}
			return ret;
		}

		/**
		 * 获得所有满足条件的猎人ID
		 * @param level 猎人等级
		 * @param star 猎人星级
		 * @param type 猎人类型
		 */
		public GetSearchGeneralCanFormat(level: number, star: number, type: number) {
			let ret: Array<number> = [];
			let allHunter: Array<message.GeneralInfo> = Game.PlayerHunterSystem.queryAllHunters();
			for (let i = 0; i < allHunter.length; i++) {
				let hunter: message.GeneralInfo = allHunter[i];
				if (hunter != null) {
					if ((hunter.level >= level || level == 0) && (hunter.star >= star || star == 0)) {
						let genTbl: TableBaseGeneral = PlayerHunterSystem.Table(hunter.general_id);
						if ((genTbl.type == type || type == 0) && hunter.is_ware == false) {
							ret.push(hunter.general_id);
						}
					}
				}
			}

			return ret;
		}

		/**
		 * 本地缓存已选探索阵容
		 * @param index 当前副本ID
		 * @param formation 存放已选探索阵容的猎人ID
		 */
		public SetSaveFormation(index: number, formation: Array<string>) {
			// formation.join();
			let hunterIdArr = JSON.stringify(formation);
			let key = `SearchInstance_${index}`;
			return Game.Controller.setRoleStorageItem(key, hunterIdArr);
		}

		/**
		 * 读取本地存储已选探索阵容
		 * @param index 当前副本ID
		 */

		public GetSaveFormation(index: number) {
			let baseId: number = Game.PlayerInfoSystem.BaseInfo.id;
			if (baseId == null || index == null) return ["0", "0", "0", "0"];

			let key = `SearchInstance_${index}`;
			let value = Game.Controller.getRoleStorageItem(key);
			if (!value || value == "") return ["0", "0", "0", "0"];
			let formation: Array<string> = JSON.parse(value);
			return formation;
		}

		public Set(mobId: number) {
			let ins = this.InstanceFun(mobId);
			let chp = this.Chapter(mobId);
			let [var1, var2] = this.ChapterIdx(mobId);

			let mob = {
				Type: this.Type(mobId),
				Boss: this.fromInstance(mobId).head_path,
				Name: Helper.StringFormat("%d_%d %s", var1, (parseInt(var2) + 1).toString(), ins.instance_name),
				Stage: Helper.StringFormat("%d-%d", var1, parseInt(var2) + 1),
				Open: false,
				Clear: false,
				Info: "",
				Color: Helper.RGBToHex("r:241,g:34,b:0")
			}
			if (mob.Type == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL && this.curInstances[mob.Type].maxMobID >= mobId) {
				if (this.InstanceFun(mobId).challenge_level >= 0 && this.InstanceFun(mobId).challenge_level <= CommonConfig.role_max_level) {
					if (this.InstanceFun(mobId).challenge_level <= Game.PlayerInfoSystem.BaseInfo.level) {
						mob.Open = true;
						mob.Clear = this.curInstances[mob.Type].maxMobID > mobId;
					}
				}
				else if (this.Type(this.InstanceFun(mobId).challenge_level) == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
					let maxMobId = this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxMobID;
					if (maxMobId > ins.challenge_level) {
						mob.Open = true;
						mob.Clear = this.curInstances[mob.Type].maxMobID > mobId;
					}
				}
			}
			else if (mob.Type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE &&
				this.curInstances[mob.Type].maxMobID >= mobId &&
				this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID > ins.challenge_level &&
				this.InstanceFun(mobId).challenge_level <= this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID - 1) {
				mob.Open = true;
				mob.Clear = this.curInstances[mob.Type].maxMobID >= mobId;
			}

			if (mob.Type == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
				if (mob.Open) {
					mob.Info = Helper.StringFormat("%s%s", TextsConfig.TextsConfig_HeroMain.instance_normal, TextsConfig.TextsConfig_HeroMain.instance_count);
					mob.Color = Helper.RGBToHex("r:28,g:90,b:0");
				}
				else {
					mob.Info = Helper.StringFormat("%s(%s)", TextsConfig.TextsConfig_HeroMain.instance_normal, TextsConfig.TextsConfig_HeroMain.instance_lock);
					mob.Color = Helper.RGBToHex("r:241,g:34,b:0");
				}
			}
			else if (mob.Type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
				if (mob.Open) {
					let left = (this.Mob(mobId).buyTime + 1) * ins.challenge_num - this.Mob(mobId).dayTime;
					let all = ins.challenge_num;
					mob.Info = Helper.StringFormat("%s(%d/%d)", TextsConfig.TextsConfig_HeroMain.instance_elit, left, all);

					if (left > 0) {
						mob.Color = Helper.RGBToHex("r:18,g:90,b:0");
					}
					else {
						Helper.RGBToHex("r:241,g:34,b:0");
					}
				}
				else {
					mob.Info = Helper.StringFormat("%s(%s)", TextsConfig.TextsConfig_HeroMain.instance_elit, TextsConfig.TextsConfig_HeroMain.instance_lock);
					mob.Color = Helper.RGBToHex("r:241,g:34,b:0");
				}
			}

			if (mob.Open) {
				let [chatper, idx] = this.getChapterByInstanceId(mobId);
				if (chatper) {
					let area = TableInstanceArea.Item(chatper.chapter_id);
					if (Game.PlayerInfoSystem.Level < area.open_level) {
						mob.Open = false;
						mob.Info = Helper.StringFormat(TextsConfig.TextConfig_Instance.instanceLockLevel, area.open_level);
						mob.Color = Helper.RGBToHex("r:241,g:34,b:0");
					}
				}
			}
			return mob;
		}

		public fromInstance(id: number): TableMapRole {
			if (this.ckid(id)) return null;
			let mprId: number = null;
			if (this.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL || this.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
				mprId = TableInstance.Item(id).boss_roleId;
			}
			else if (this.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY || this.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_EXP) {
				mprId = TableInstanceVillage.Item(id).boss_roleId;
			}
			if (this.ckid(mprId)) return null;
			return TableMapRole.Item(mprId);
		}

		public GetAreaIDByChapterID(id: number) {
			let tableChapter = TableInstanceArea.Table();
			for (let [kk, vv] of HelpUtil.GetKV(tableChapter)) {
				for (let [ak, av] of HelpUtil.GetKV(vv.area_normal)) {
					if (av == id) {
						return kk;
					}
				}
			}
		}

		/**
	 * 猎人获取徽章跳转到普通副本
		 * @param mobId 怪物Id
		 * @param itemId 物品id
		 * @param  itemCount 物品数量
		 * @param father 父类
		 */
		public StartFast(mobId: number, itemId: number, itemCount: number, father, cb?) {
			this.preInstanceInfo = Table.DeepCopy(this.curInstances[this.curInstanceType]);
			if (this.preInstanceInfo == null) {
				toast_warning("wrong preInstanceInfo while instanceType is : " + this.curInstanceType);
			}

			this.curInstanceType = this.Type(mobId);
			this.curInstances[this.curInstanceType].curMobID = mobId;
			this.curInstances[this.curInstanceType].curChapterID = this.Chapter(mobId).chapter_id;
			this.curInstances[this.curInstanceType].curAreaID = this.GetAreaIDByChapterID(this.curInstances[this.curInstanceType].curChapterID);

			loadUI(HXH_InstanceFast)
				.then((dialog: HXH_InstanceFast) => {
					dialog.setOutPut(mobId, itemCount, itemId, cb);
					dialog.show(UI.SHOW_FROM_TOP);
				});
		}

		/**
		 * 猎人获取徽章跳转到高级副本
		 * @param mobId 怪物Id
		 * @param itemId 物品id
		 * @param itemCount 物品数量
		 * @param father 父类
		 */

		public Start2(mobId: number, itemId: number, itemCount: number, father, cb?) {
			this.preInstanceInfo = Table.DeepCopy(this.curInstances[this.curInstanceType]);
			if (this.preInstanceInfo == null) {
				toast_warning("wrong preInstanceInfo while instanceType is : " + this.curInstanceType);
			}

			this.curInstanceType = this.Type(mobId);
			this.curInstances[this.curInstanceType].curMobID = mobId;
			this.curInstances[this.curInstanceType].curChapterID = this.Chapter(mobId).chapter_id;
			this.curInstances[this.curInstanceType].curAreaID = this.GetAreaIDByChapterID(this.curInstances[this.curInstanceType].curChapterID);

			// loadUI(Adventurems).then((scene: Adventurems) => {
			// 	scene.getMobIdAndIsJump(mobId, true);
			// 	scene.LoadFromBattleNormal(true);
			// 	scene.show(UI.SHOW_FROM_TOP);
			// });
			SceneManager.instance.EnterAdventure(-1, mobId);
		}

		public TeachNoNextButton() {
			let ids = [100001, 100002, 100004, 100006, 100007, 100009, 100013, 100014, 100028];
			let find = Table.FindF(ids, (k, v) => {
				return Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID == v;
			})
			return find;
		}

		public TeachSearchFormateIndex(generalIds: Array<number>) {
			let upNums = 3;
			let upIndexs = {};
			let upPos = {};
			let downPos = {};

			for (let i = 0; i < upNums; i++) {
				Table.Init(upNums, function (i) {
					return i;
				});
			}

			for (let [k, v] of HelpUtil.GetKV(generalIds)) {
				if (!Table.VIn(CommonConfig.general_limit_use_ids, PlayerHunterSystem.GetGeneralId(v))) {
					upPos[k] = [k, v];
				}
				else {
					downPos[k] = [k, v];
				}
			}

			for (let i = 0; i < upNums; i++) {
				if (upPos[i] != null) {
					upIndexs[i] = Number(upPos[i][0]);
				}
				else if (downPos[i - Game.PlayerMissionSystem.tableLength(upPos)] != null) {
					upIndexs[i] = downPos[i - Game.PlayerMissionSystem.tableLength(upPos)][0];
				}
			}
			return upIndexs;
		}

		/**
		 * 是否通关普通副本本章节
		 * @param {number} chapter 章节ID
		 */
		public IsPassCurChapter(chapter: number) {
			let chapterTbl = TableChapterNormal.Table()[chapter];
			let lastMobs = chapterTbl.chapter_pack[chapterTbl.chapter_pack.length - 1];
			return Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].mobsMap[lastMobs + 1] != null || Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].bClear;
		}


		///////////////////////////////////////////////////////////////////////////
		// 发协议
		public MobsInfo_Req(instanceId: number) {
			return new Promise((resolve, reject) => {
				let request = new message.MobsInfoRequest();
				request.body.battleType = message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE;
				request.body.mobsId = instanceId;

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.MobsInfoResponse>resp;
					if (response.header.result != 0) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}

					resolve({});
					return;
				}, (req: aone.AoneRequest): void => {
					reject(LANG("请求超时"));
					return;
				}, this, false);
				return;
			});
		}

		//扫荡发协议
		public SweepMobsReq(times, is_down, curMobInfo) {
			return new Promise((resolve, reject) => {
				let request = new message.SweepMobsRequest();
				request.body.mobsId = curMobInfo.mobId
				request.body.sweepCount = times
				request.body.is_down = is_down

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.SweepMobsResponse>resp;
					if (response.header.result != 0) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}

					// let gameInfo = response.body.gameInfo;
					resolve(response);
					return;
				}, (req: aone.AoneRequest): void => {
					reject(LANG("请求超时"));
					return;
				}, this, false);
				return;
			});
		}

		// 购买体力发协议
		public BuyMobsTime_Req(instanceId: number) {
			return new Promise((resolve, reject) => {
				let request = new message.BuyMobsTimeRequest();
				request.body.mobsId = instanceId;

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.BuyMobsTimeResponse>resp;
					if (response.header.result != 0) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}

					resolve({});
					return;
				}, (req: aone.AoneRequest): void => {
					reject(LANG("请求超时"));
					return;
				}, this, false, true);
				return;
			});
		}

		/**
		 * 探索完成领取奖励协议
		 * @param id 任务id
		 */
		public RewardSearchingReq(id: number) {
			return new Promise((resolve, reject) => {
				let request = new message.RewardSearchingRequest();
				request.body.id = id;

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.RewardSearchingResponse>resp;
					if (response.header.result != 0) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}

					resolve(response);
					return;
				}, (req: aone.AoneRequest): void => {
					reject(LANG("请求超时"));
					return;
				}, this, false);
				return;
			});
		}

		/**
		 * 开始探索协议
		 * @param id 任务Id
		 * @param formationIds 上阵猎人id
		 */
		public StartSearchingReq(id: number, formationIds: Array<number>) {
			return new Promise((resolve, reject) => {
				let request = new message.StartSearchingRequest();
				request.body.id = id;
				request.body.generals = formationIds;

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.StartSearchingResponse>resp;
					if (response.header.result != 0) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}

					resolve(response);
					return;
				}, (req: aone.AoneRequest): void => {
					reject(LANG("请求超时"));
					return;
				}, this, false);
				return;
			});
		}

		/**
		 * 刷新探索请求
		 * 
		 * @param ids {Array<number>} 要刷新的id
		 */
		public RefreshSearchingReq(ids: Array<number>) {
			return new Promise((resolve, reject) => {
				let request = new message.RefreshSearchingRequest();
				request.body.id = ids;

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.RefreshSearchingResponse>resp;
					if (response.header.result != 0) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}

					resolve(response);
					return;
				}, (req: aone.AoneRequest): void => {
					reject(LANG("请求超时"));
					return;
				}, this, false);
				return;
			});
		}

		/**
		 * 加速探索请求
		 * @param id {number} 任务id
		 */
		public SpeedSearchingReqBody(id: number) {
			return new Promise((resolve, reject) => {
				let request = new message.SpeedSearchingRequest();
				request.body.id = id;

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.SpeedSearchingResponse>resp;
					if (response.header.result != 0) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}

					resolve(response);
					return;
				}, (req: aone.AoneRequest): void => {
					reject(LANG("请求超时"));
					return;
				}, this, false);
				return;
			});
		}

		// 取消探索
		public EndSearchingReq(instanceId: number) {
			// return new Promise((resolve, reject) => {
			// 	let request = new message.EndSearchingRequest();
			// 	request.body.index = instanceId;

			// 	Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
			// 		let response = <message.EndSearchingResponse>resp;
			// 		if (response.header.result != 0) {
			// 			reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
			// 			return;
			// 		}

			// 		resolve({});
			// 		return;
			// 	}, (req: aone.AoneRequest): void => {
			// 		reject(LANG("请求超时"));
			// 		return;
			// 	}, this, false);
			// 	return;
			// });
		}

		/**领取副本宝箱请求
		 * @param mobsId 怪物Id 
		 */
		public InstanceChestReq(mobsId: number) {
			return new Promise((resolve, reject) => {
				let request = new message.InstanceChestRequest();
				request.body.mobsId = mobsId;

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.InstanceChestResponse>resp;
					if (response.header.result != 0) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}

					resolve(response);
					return;
				}, (req: aone.AoneRequest): void => {
					reject(LANG("请求超时"));
					return;
				}, this, false);
				return;
			});
		}

		public BuyPower_Req() {
			return new Promise((resolve, reject) => {
				let request = new message.BuyPowerRequest();

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.BuyPowerResponse>resp;
					if (response.header.result != 0) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}

					resolve();
					return;
				}, (req: aone.AoneRequest): void => {
					reject(LANG("请求超时"));
					return;
				}, this, false);
				return;
			});
		}

		/**
		 * @description 锁定探索副本请求
		 * @param id {number} 探索副本id
		 * @param islock {boolean} 锁定状态
		 */
		public LockSearchingReq(id: number, islock: boolean) {
			return new Promise((resolve, reject) => {
				let request = new message.LockSearchingRequest();
				request.body.id = id;
				request.body.is_lock = islock;

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.LockSearchingResponse>resp;
					if (response.header.result != 0) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}

					resolve(response);
					return;
				}, (req: aone.AoneRequest): void => {
					reject(LANG("请求超时"));
					return;
				}, this, false);
				return;
			});
		}
	}

	export class CustomInstanceInfo {
		mobsMap: Array<message.MobInfo> = [];
		curAreaID: number = 0;
		maxAreaID: number = 0;
		curChapterID: number = 0;
		maxChapterID: number = 0;
		curMobID: number = 0;
		maxMobID: number = 0;
		bClear: boolean = false;
		bReview: boolean = false;
		instanceType: number = 0;
	}
}
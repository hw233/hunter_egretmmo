namespace zj {
export class PlayerZorkSystem {

	///////////////////////////////////////////////////////////////////////////

	public static moraFormatEnemy = [];
	public static moraFormatMy = [];

	// 静态函数
	public static GetWonderlandBossRankGoodsTbl(level: number) {
		if (level == null) {
			level = 40
		}

		let tblWonderBossRank = TableSceneBossReward.Table();		//魔域BOSS伤害统计表
		let tbl = {};
		let index = 0;
		for (const k in tblWonderBossRank) {
			const v = tblWonderBossRank[k];
			let goods = [];
			if (level <= v.bosslevel_max && level >= v.bosslevel_min) {
				let l_reward = [];
				let length = Object.keys(v.reward_goods).length
				for (let j = 0; j < length; j++) {
					goods[j] = [];
					let good = new message.GoodsInfo();
					good.goodsId = tblWonderBossRank[k].reward_goods[j];
					good.count = tblWonderBossRank[k].reward_count[j];
					goods[j] = good;
				}
				l_reward.push(v.rank_min + 1);
				l_reward.push(v.rank_max);
				l_reward.push(goods);
				let a = l_reward;
				tbl[index] = l_reward;
				index = index + 1;
			}
		}
		return tbl;
	}

	///////////////////////////////////////////////////////////////////////////
	// 变量
	public zorkBoss = {
		inZorkBoss: false,
		isZorkBossEnd: false,
		serverSceneId: 0,
		bossInfo: new message.BossInfo(),		//BOSS信息
		roleInfo: {},
		chatInfosMini: [],
		bChatAdd: false,
		rankItems: [],		//攻击BOSS的全体成员信息
		resultInfo: {},
		myRank: 0,		//自己的排名
	}
	public zork = {
		playersMap: {},//魔域中的成员
		timePlayersMap: {},//实时刷新的成员
		chatInfosMini: {},//简易聊天信息
		bChatAdd: false,//是否有新的聊天系统信息
		roleInfo: new message.BossRoleInfo()
	};


	///////////////////////////////////////////////////////////////////////////
	// 成员方法

	public init() {
		
        Game.EventManager.on(GameEvent.SERVER_NOTICE_SCENE_BOSS_RESULT,this.sceneBossResult,this);
	}
	public sceneBossResult(e){
		let request = <message.SceneBossResultNoticeRequest>e.data;
		this.zorkBoss.isZorkBossEnd = true
    	this.zorkBoss.resultInfo = request.body;
    	this.zorkBoss.rankItems = request.body.items;
		Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS] = request.body.progresses[0];
	}

	public static randomHead() {
		let heroTbl = TableBaseGeneral.Table();
		let idTbl = [];
		for (const k in heroTbl) {
			const v = heroTbl[k];
			idTbl.push(v.general_id);
		}
		idTbl.sort(function (a, b) {
			return a - b;
		})
		let leftTbl = [];
		let rightTbl = [];
		for (let i = 0; i < 12; i++) {
			let id = Math.floor(Math.random() * idTbl.length);
			if (i <= 5) {
				leftTbl.push(idTbl[id]);
			} else {
				rightTbl.push(idTbl[id]);
			}
			idTbl.splice(id, 1)
		}
		return [leftTbl, rightTbl];
	}

	public static RewardLevel(index) {
		if (index == null) {
			index == 0;
		}
		let tblReward = TableRunes.Table();
		if (tblReward == null) {
			return;
		}
		let tbl = [];
		let goods = [];
		for (const kk in tblReward[index].reward_goods) {
			const vv = tblReward[index].reward_goods[kk];
			goods[kk] = [];
			let good = new message.GoodsInfo();
			good.goodsId = tblReward[index].reward_goods[kk];
			good.count = tblReward[index].reward_count[kk] > 0 && tblReward[index].reward_count[kk] || 0;
			goods[kk] = good;
		}
		tbl = goods;

		return tbl;
	}

	public static RunesAllGoods() {
		let tblReward = TableRunes.Table();
		if (tblReward == null) {
			return;
		}
		let tbl = [];
		let max = CommonConfig.gain_runes_number;
		let num = 0;
		for (let i = 0; i < max; i++) {
			let goods = [];
			let id = max - num;
			tbl[i] = [];
			for (const kk in tblReward[id].reward_goods) {
				const vv = tblReward[id].reward_goods[kk];
				goods[kk] = [];
				let good = new message.GoodsInfo();
				good.goodsId = tblReward[id].reward_goods[kk];
				good.count = tblReward[id].reward_count[kk] > 0 && tblReward[id].reward_count[kk] || 0;
				goods[kk] = good;
			}
			tbl[i] = goods;

			num = num + 1;
		}
		return tbl;

	}

	public uninit() {
		this.zorkBoss = {
			inZorkBoss: false,
			isZorkBossEnd: false,
			serverSceneId: 0,
			bossInfo: new message.BossInfo(),		//BOSS信息
			roleInfo: [],
			chatInfosMini: [],
			bChatAdd: false,
			rankItems: [],		//攻击BOSS的全体成员信息
			resultInfo: {},
			myRank: 0,		//自己的排名
		}
		this.zork = {
			playersMap: {},//魔域中的成员
			timePlayersMap: {},//实时刷新的成员
			chatInfosMini: {},//简易聊天信息
			bChatAdd: false,//是否有新的聊天系统信息
			roleInfo: new message.BossRoleInfo()
		};
	}

	/**关闭世界boss */
	public closeZorkBoss(callback: Function, thisObj) {
		Game.PlayerZorkSystem.BossExitReq()
			.then((value: any) => {
				Game.PlayerWonderLandSystem.scenePosInfo = {};
				Game.PlayerWonderLandSystem.timePosInfo = {};
				StageSceneManager.Instance.clearScene();
				Game.PlayerZorkSystem.zorkBoss.inZorkBoss = false;
				callback.call(thisObj);
			})
			.catch((reason) => {

			});
	}

	// 拉取boss信息
	public bossInfo(): Promise<{}> {
		return new Promise((resolve, reject) => {
			let request = new message.BossInfoRequest();

			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.BossInfoResponse>resp;
				if (response.header.result != 0) {
					// reject(response.header.result);
					return;
				}
				this.zorkBoss.bossInfo = response.body.bossInfo;
				this.zorkBoss.rankItems = response.body.items;
				Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS] = response.body.progresses[0];
				resolve();
			}, (req: aone.AoneRequest): void => {
				console.log("req:", req);
				reject("timeout");
			}, this, true, false);
		});
	}

	// 进入boss界面
	public bossEntry(scene_x: number, scene_y: number): Promise<{}> {
		return new Promise((resolve, reject) => {
			PlayerWonderLandSystem.MapHeight = 960;
			let request = new message.BossEntryRequest();
			request.body.scene_x = scene_x;
			request.body.scene_y = scene_y;
			Game.PlayerWonderLandSystem.scenePosInfo = {};
			Game.PlayerWonderLandSystem.timePosInfo = {};

			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.BossEntryResponse>resp;
				if (response.header.result != 0) {
					reject(response.header.result);
					return;
				}
				PlayerWonderLandSystem.MapHeight = 960;
				response.body.roleInfo.posInfo.posItem.scene_y = PlayerWonderLandSystem.MapHeight - response.body.roleInfo.posInfo.posItem.scene_y;
				this.zorkBoss.inZorkBoss = true
				this.zorkBoss.roleInfo = response.body.roleInfo;
				this.zorkBoss.serverSceneId = response.body.sceneId;
				Game.PlayerWonderLandSystem.loadRpgScenePos(response.body.posInfos);
				resolve();
			}, (req: aone.AoneRequest): void => {
				console.log("req:", req);
				reject("timeout");
			}, this, false, false);
		});
	}

	// 伤害排行
	public bossRank(): Promise<{}> {
		return new Promise((resolve, reject) => {
			let request = new message.BossRankRequest();

			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.BossRankResponse>resp;
				if (response.header.result != 0) {
					reject(response.header.result);
					return;
				}
				this.zorkBoss.rankItems = response.body.items;
				this.zorkBoss.myRank = response.body.rank;
				resolve();
			}, (req: aone.AoneRequest): void => {
				console.log("req:", req);
				reject("timeout");
			}, this, true, false);
		});
	}

	public static GainRunesReqBody_Visit() {
		return new Promise((resolve, reject) => {
			let request = new message.GainRunesRequest();
			request.body.isNovice = Teach.bInTeaching && Teach.m_bOpenTeach;
			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.GainRunesResponse>resp;
				console.log(response);
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

	public static RunesRewardReqBody_Visit(isget) {
		return new Promise((resolve, reject) => {
			let request = new message.RunesRewardRequest();
			request.body.isNovice = isget;
			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.RunesRewardResponse>resp;
				console.log(response);
				// if (response.header.result != 0) {
				//     return;
				// }
				resolve(response);

				return;
			}, (req: aone.AoneRequest): void => {
				reject(LANG("请求超时"));
				return;
			}, this, false);
			return;
		});
	}

	public static ChangeRunesReqBody_Visit(bteach) {
		return new Promise((resolve, reject) => {
			let request = new message.ChangeRunesRequest();
			request.body.isNovice = (bteach)
			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.ChangeRunesResponse>resp;
				console.log(response);
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

	public BossExitReq() {
		return new Promise((resolve, reject) => {
			let request = new message.BossExitRequest();

			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.BossExitResponse>resp;
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
} 
}
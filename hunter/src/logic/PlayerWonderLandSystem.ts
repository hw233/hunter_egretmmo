namespace zj {

	/**
	 * 
	 * @date 2019-5-21
	 * 
	 * @class 贪婪之岛系统
	 */
	export class PlayerWonderLandSystem {
		public constructor() {
		}
		public init() {
			Game.EventManager.on(GameEvent.PLAYER_ROLE_OTHER_ATTRI_CHANGE, this.dateFun, this);
			Game.EventManager.on(GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO, this.posInfo, this);
			Game.EventManager.on(GameEvent.SERVER_NOTICE_SCENE_ITEM_POS, this.loadRpgPos, this);
			Game.EventManager.on(GameEvent.SERVER_NOTICE_BATTLE_IMITATE_RESULT, this.imitate, this);
			Game.EventManager.on(GameEvent.SERVER_NOTICE_WONDERLAND_ROLE_INFO, this.roleInfoInfo, this);

		}

		public uninit() {
			this.loadPosInfo = {};
			this.joinTime = 0;
			this.scenePosInfo = {};
			this.timePosInfo = {};
			this.loadingPosInfo = {};
			this.resultInfo = null;
			this.noticePosInfo = {};
			this.joinTimeInfo = {};

			this.inWonderland = false;
			this.mapBlockIndex = -1;
			this.wonderlandId = -1;
			this.darklandId = -1;
			this.roleInfo;
			this.chatInfosMini = [];
			this.bChatAdd = false;
			this.getGoods = [];
			this.resultList = [];
			this.serverSceneId = 0;
			this.mobsDebuffTips = false;

			this.otherAttri = null;
		}
		public dateFun(ev: egret.Event) {
			this.otherAttri = ev.data;
		}
		//港口
		public darkland = {
			inDarkland: false,
			mapBlockIndex: -1,
			darklandId: -1,
			roleInfo: {},
			chatInfosMini: {},     // 简易聊天信息
			bChatAdd: false,       // 是否有新的仙境系统信息
			getGoods: [],          //打怪掉落物品存储
			resultList: [],        // 战报存储
			serverSceneId: 0,      // 服务器仙境id
			mobsDebuffTips: false, // 打怪数量提醒
			channelId: 0,          // 当前分线Id
			cityId: 0,             // 当前城市Id
			cityServerInfo: [],    // 当前城市包含服务器信息
			freshChannelTime: 0,   // 刷新更换分线倒计时
		}
		public loadPosInfo = {};
		public joinTime;
		public scenePosInfo = {};
		public timePosInfo = {};
		public loadingPosInfo = {};
		public resultInfo = null;
		public noticePosInfo = {};
		public joinTimeInfo = {};

		public inWonderland = false
		public mapBlockIndex = -1
		public wonderlandId = -1
		public roleInfo;
		public chatInfosMini = [];
		public bChatAdd = false
		public getGoods = []
		public resultList = []
		public serverSceneId = 0
		public mobsDebuffTips = false;
		public freshChannelTime;
		public channelId;
		public cityId;
		public cityServerInfo = [];
		public rankItems;
		public darklandId = -1;


		public otherAttri: message.RoleOtherAttri;//角色属性

		public GetNormalPic(type) {
			//普通头像
			let tbl = [];
			let picTbl = TableItemPic.Table();
			for (let k in picTbl) {
				let v = picTbl[k];
				if (v.type == type) {
					tbl.push(k);
				}
			}
			tbl.sort((a, b) => {
				return a - b;
			});
			return tbl;
		}
		public GetHighPic() {
			//高级头像
			let tbl = [];
			let picIds = [];
			let picTbl = TableItemPic.Table();
			let generalTbl = TableBaseGeneral.Table();
			for (let k in picTbl) {
				let v = picTbl[k];
				if (v.type == 2) {
					tbl.push({ ket: k, value1: 0, value2: 0 });
				}
			}
			for (let i = 0; i < tbl.length; i++) {
				let v = tbl[i];
				let find = Table.FindF(this.otherAttri.picIds, (key, value) => {
					return value == v.key;
				});
				tbl[i].value1 = find && 1 || 0;
			}
			for (let k in generalTbl) {
				let v = generalTbl[k];
				let [_v, _k] = Table.FindR(tbl, (kk, vv) => {
					return vv.key == v.pic_id;
				});
				if (_v != null) {
					tbl[_k].value2 = v.aptitude;
				}
			}
			function sort(a, b) {
				if (a.value1 == b.value1) {
					if (a.value2 == b.value2) {
						return a.key - b.key;
					} else {
						return b.value2 - a.value2;
					}
				} else {
					return b.value1 - a.value1;
				}
			}
			tbl.sort(sort);
			for (let i = 0; i < tbl.length; i++) {
				let v = tbl[i];
				if (v) {
					picIds.push(v.key);
				}
			}
			return picIds;
		}
		public willGoRpg() {
			Gmgr.Instance.bWillGoRpg = true;
			this.scenePosInfo = {};
			this.loadingPosInfo = {};
			this.joinTimeInfo = {};
		}
		/** 根据索引，返回对应语言的描述*/
		public Des(id) {
			let suffix = Device.languageInfo
			let ret = TableLanguage.Item(id);
			if (ret == null) {
				console.log("language id ===" + id + "  is not found");
			}
			return ret[suffix];
		}
		public WonderlandEnterReqBody(): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.WonderlandEnterRequest();
				request.body.id = 2;
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.WonderlandEnterResponse>resp;
					if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}
					resolve(response);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
						return;
					}, this, false);
			})
		}

		public SetFormatReqOnly() {
			return new Promise((resolve, reject) => {
				let request = new message.SetFormationRequest();
				let formation = Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1];
				formation.formationType = message.EFormationType.FORMATION_TYPE_WONDERLAND;
				request.body.formations.push(formation);

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.SetFormationResponse>resp;
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
		public static MapHeight = 1500

		public ReqModifyUserInfo(headId: number, frameId: number, title1Id: number, title2Id: number) {
			return new Promise((resolve, reject) => {
				let request = new message.ModifyRolePicRequest();
				request.body.picId = headId != null ? headId : Game.PlayerInfoSystem.BaseInfo.picId;
				request.body.picFrame = frameId != null ? frameId : Game.PlayerInfoSystem.BaseInfo.picFrameId;
				request.body.titleId = title1Id != null ? title1Id : Game.PlayerInfoSystem.BaseInfo.titleId;
				request.body.viceTitleId = title2Id != null ? title2Id : Game.PlayerInfoSystem.BaseInfo.viceTitleId;

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.ModifyRolePicResponse>resp;
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

		public ReqModifyCarryPet(petId: number) {
			return new Promise((resolve, reject) => {
				let request = new message.PetPlayingRequest();
				request.body.pet_id = petId;

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.PetPlayingResponse>resp;
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

		//进入仙境场景回复
		public OpenwonderlandScene(response: message.WonderlandEnterResponse) {
			PlayerWonderLandSystem.MapHeight = 1500;
			response.body.roleInfo.posInfo.posItem.scene_y = PlayerWonderLandSystem.MapHeight - response.body.roleInfo.posInfo.posItem.scene_y;
			this.roleInfo = response.body.roleInfo;
			this.loadRpgScenePos(response.body.posInfos);
			this.inWonderland = true;
			this.serverSceneId = response.body.sceneId;
		}

		public OpenMainCity(response: message.WonderlandEnterResponse) {
			PlayerWonderLandSystem.MapHeight = 640;//1500;//960
			response.body.roleInfo.posInfo.posItem.scene_y = PlayerWonderLandSystem.MapHeight - response.body.roleInfo.posInfo.posItem.scene_y;
			this.roleInfo = response.body.roleInfo;
			this.loadRpgScenePos(response.body.posInfos);
			// this.inWonderland = true;
			this.serverSceneId = response.body.sceneId;
		}

		public changeLine(response: message.WonderlandChangeBranchInfoResponse){
			PlayerWonderLandSystem.MapHeight = 640;//1500;//960
			response.body.roleInfo.posInfo.posItem.scene_y = PlayerWonderLandSystem.MapHeight - response.body.roleInfo.posInfo.posItem.scene_y;
			this.roleInfo = response.body.roleInfo;
			this.loadRpgScenePos(response.body.posInfos);
			this.serverSceneId = response.body.sceneId;
		}
		
		public loadRpgScenePos(info) {
			for (let i = 0; i < info.length; i++) {
				let key = info[i].roleBase.id;
				// if (Gmgr.Instance.bWillGoRpg == true) {
					// this.joinTimeInfo[key] = getMS()
				// }
				this.scenePosInfo[key] = info[i];
			}
			SceneManager.scenePosInfo = this.scenePosInfo[Game.PlayerInfoSystem.RoleID];
		}

		/**关闭大草原或安多尼拔发协议 */
		public WonderlandLeave(): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.WonderlandLeaveRequest();

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.WonderlandLeaveResponse>resp;
					if (response.header.result != 0) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}
					resolve(response.body);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
					}, this, false);
			});
		}

		/**购买能量胶囊发协议 */
		public BuyPlate(): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.BuyPlateRequest();

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.BuyPlateResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					resolve(response.body);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
					}, this, false, false);
			});
		}

		/**贪婪之岛大草原加速协议 */
		public WonderlandFaster(): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.WonderlandFasterRequest();

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.WonderlandFasterResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					Game.PlayerWonderLandSystem.roleInfo = response.body.roleInfo;
					resolve(response.body);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
					}, this, false);
			});
		}

		/**贪婪之岛港口加速协议 */
		public SceneFaster(): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.SceneFasterRequest();

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.SceneFasterResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					Game.PlayerWonderLandSystem.darkland.roleInfo = response.body.roleInfo;
					resolve(response.body);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
					}, this, false);
			});
		}

		/**贪婪之岛大草原加血协议 */
		public WonderlandAddBlood(): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.WonderlandAddBloodRequest();

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.WonderlandAddBloodResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					Game.PlayerWonderLandSystem.roleInfo = response.body.roleInfo;
					resolve(response.body);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
					}, this, false);
			});
		}
		/**贪婪之岛港口加血协议 */
		public SceneAddBlood(): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.SceneAddBloodRequest();

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.SceneAddBloodResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					Game.PlayerWonderLandSystem.darkland.roleInfo = response.body.roleInfo;
					resolve(response.body);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
					}, this, false);
			});
		}

		/**贪婪之岛大草原清除罪恶值 */
		public WonderlandClearEvil(): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.WonderlandClearEvilRequest();

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.WonderlandClearEvilResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					resolve(response.body);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
					}, this, false);
			});
		}

		/**贪婪之岛 */
		public WonderlandBattleMode(tmpMode: number): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.WonderlandBattleModeRequest();
				request.body.battleMode = tmpMode;
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.WonderlandBattleModeResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					resolve(response.body);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
					}, this, false);
			});
		}

		/**贪婪之岛港口积分排名 */
		public SceneQueryScoreRank(get_all: boolean): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.SceneQueryScoreRankRequest();
				request.body.get_all = get_all;
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.SceneQueryScoreRankResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					resolve(response.body);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
					}, this, false, true);
			});
		}

		/**贪婪之岛港口退出 */
		public SceneLeave(): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.SceneLeaveRequest();
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.SceneLeaveResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					resolve(response.body);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
					}, this, false);
			});
		}

		/**贪婪之岛切换分线 */
		public SceneChangeBranchInfo(selectChannelId: number): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.SceneChangeBranchInfoRequest();
				request.body.scene = selectChannelId;
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.SceneChangeBranchInfoResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					resolve(response.body);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
					}, this, false);
			});
		}

		/**贪婪之岛拉取分线列表 */
		public SceneGetBranchInfo(): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.SceneGetBranchInfoRequest();

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.SceneGetBranchInfoResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					resolve(response.body);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
					}, this, false);
			});
		}
		public posInfo(e) {
			let msg: message.SceneItemPosInfoNoticeRequest = e.data;
			this.loadRpgTimePos(msg.body.posInfos);
		}
		public loadRpgTimePos(info) {
			for (let i = 0; i < info.length; i++) {
				let data = info[i];
				data.posItem.scene_y = PlayerWonderLandSystem.MapHeight - data.posItem.scene_y;
				let key = data.roleBase.id;
				if (Gmgr.Instance.bWillGoRpg == true) {
					this.loadingPosInfo[key] = data;
					let date: Date = new Date();
					this.joinTimeInfo[key] = date.getTime();
				} else {
					this.timePosInfo[key] = data;
				}
				this.scenePosInfo[key] = data;
			}
		}
		public loadRpgPos(e) {
			let msg: message.SceneItemPosNoticeRequest = e.data;
			this.loadRpgPosNotice(msg.body.posInfos);
		}
		public loadRpgPosNotice(info) {
			for (let i = 0; i < info.length; i++) {
				let key = info[i].joiner_id;
				let data = info[i];
				data.scene_y = PlayerWonderLandSystem.MapHeight - data.scene_y;
				this.noticePosInfo[key] = data;
			}
		}
		public imitate(e) {
			let msg: message.BattleImitateResultNoticeRequest = e.data;
			this.battleResult(msg);
		}

		public roleInfoInfo(e) {
			let msg: message.WonderlandRoleInfoNoticeRequest = e.data;
			Game.PlayerWonderLandSystem.roleInfo = msg.body.roleInfo;
		}
		public battleResult(data: any) {
			let para = {}
			para["index"] = 4;
			let inflate = new Zlib.Inflate(data.body.battleResult, para);
			let plain = inflate.decompress();
			let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
			let resultInfo = new message.BattleImitateResult()
			if (!resultInfo.parse_bytes(decoder)) {
				toast(LANG("游戏数据解析失败"));
				return;
			}
			this.resultInfo = resultInfo;
			//战报存储
			if (resultInfo.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND) {
				if (Game.PlayerWonderLandSystem.resultList.length < 10) {
					try {
						resultInfo["goods"] = data.body.gameInfo.goodsInfo;
					} catch (error) {
						resultInfo["goods"] = data.body.goodsInfo[0];
					}
					// resultInfo["goods"] = data.body.gameInfo.goodsInfo;
					Game.PlayerWonderLandSystem.resultList.splice(0, 0, resultInfo);
				} else {
					try {
						resultInfo["goods"] = data.body.gameInfo.goodsInfo;
					} catch (error) {
						resultInfo["goods"] = data.body.goodsInfo[0];
					}
					Game.PlayerWonderLandSystem.resultList = [];
					Game.PlayerWonderLandSystem.resultList.splice(0, 0, resultInfo);
				}
			} else if (resultInfo.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
				if (Game.PlayerWonderLandSystem.resultList.length < 10) {
					try {
						resultInfo["goods"] = data.body.gameInfo.goodsInfo;
					} catch (error) {
						resultInfo["goods"] = data.body.goodsInfo[0];
					}
					Game.PlayerWonderLandSystem.resultList.splice(0, 0, resultInfo);
				} else {
					try {
						resultInfo["goods"] = data.body.gameInfo.goodsInfo;
					} catch (error) {
						resultInfo["goods"] = data.body.goodsInfo[0];
					}
					Game.PlayerWonderLandSystem.resultList = [];
					Game.PlayerWonderLandSystem.resultList.splice(0, 0, resultInfo);
				}
			}
		}

		/**大草原退出场景 */
		public prairieClose(callback: Function, thisObj) {
			Game.PlayerWonderLandSystem.WonderlandLeave().then(() => {
				StageSceneManager.Instance.GetCurScene().delMember(Game.PlayerInfoSystem.BaseInfo.id);
				StageSceneManager.Instance.clearScene();
				Game.PlayerWonderLandSystem.scenePosInfo = {};
				Game.PlayerWonderLandSystem.timePosInfo = {};
				callback.call(thisObj);
			}).catch(() => {

			})
		}

		/**港口退出 */
		public havenClose() {
			Game.PlayerWonderLandSystem.SceneLeave()
				.then(() => {
					StageSceneManager.Instance.GetCurScene().delMember(Game.PlayerInfoSystem.BaseInfo.id);
					Game.PlayerWonderLandSystem.darkland.inDarkland = false;
					Game.PlayerWonderLandSystem.scenePosInfo = {};
					Game.PlayerWonderLandSystem.timePosInfo = {};
					Game.PlayerWonderLandSystem.darkland.serverSceneId = -1;
					// StageSceneManager.Instance.clearScene();
					SceneManager.instance.EnterSceneZorkBoss();
				}).catch((result) => {
				})
		}

		/**港口清除罪恶值 */
		public SceneClearEvil(): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.SceneClearEvilRequest();

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.SceneClearEvilResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					resolve(response.body);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
					}, this, false);
			});
		}

	}
}
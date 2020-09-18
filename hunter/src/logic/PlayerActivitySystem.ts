namespace zj {
	// 活动
	// yuqingchao
	// 20190322
	export class PlayerActivitySystem {

		///////////////////////////////////////////////////////////////////////////
		// 静态函数

		private static Decompress(data: number[]) {
			let para = {}
			para["index"] = 4
			let inflate = new Zlib.Inflate(data, para);
			return inflate.decompress();
		}
		public shareInfo = [];

		// 解压 ActivityInfoZip 信息
		private static DecompressActivityInfoZip(data: number[]): message.ActivityInfoZip {
			if (data.length == 0) return null;
			let plain = PlayerActivitySystem.Decompress(data);
			let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
			let activityInfoZip = new message.ActivityInfoZip()
			if (!activityInfoZip.parse_bytes(decoder)) {
				toast("decompress fail");
				return null;
			}
			return activityInfoZip;
		}

		public static GetActivityUI() {
			let data = [];
			let arr = Game.PlayerActivitySystem.Activities;
			for (let k in Game.PlayerActivitySystem.Activities) {
				let v = Game.PlayerActivitySystem.Activities[k]
				if (v.stopTime > Date.parse(Game.Controller.serverNow().toString()) / 1000) {
					if (v.type == message.ActivityType.ACT_TYPE_UPLEVEL                             //冲级
						|| v.type == message.ActivityType.ACT_TYPE_CONTINUELOGIN                    //连续七天登陆
						|| v.type == message.ActivityType.ACT_TYPE_BUFFS                            //BUFF
						|| v.type == message.ActivityType.ACT_TYPE_OTHER                            //线下活动
						|| v.type == message.ActivityType.ACT_TYPE_ADVERTISEMENT                    //广告
						|| v.type == message.ActivityType.ACT_TYPE_LOTTERY_DOUBLING                 //酒馆积分
						|| v.type == message.ActivityType.ACT_TYPE_CHARGEDAILY                      //每日充值
						|| v.type == message.ActivityType.ACT_TYPE_RED_PACKET                       //红包活动
						|| v.type == message.ActivityType.ACT_TYPE_INSTANCE_RAND                    //随机副本(鼠崽闹春)
					) {
						data.push(v);
					} else if (v.type == message.ActivityType.ACT_TYPE_MISSION) {                   //专题活动
						if (v.rewardIndex.length != v.missions.length) {
							data.push(v);
						}
					} else if (v.type == message.ActivityType.ACT_TYPE_CHARGEADD) {                 //累计充值
						if (v.rankRewards.length != v.rewardZone.length) {
							data.push(v);
						}
					} else if (v.type == message.ActivityType.ACT_TYPE_COLLECT) {                    //搜集道具
						for (let kk in v.exchanges) {
							let vv = v.exchanges[kk];
							let bIsGet = Table.FindF(v.kvInfos, function (key, vvv) {
								//已兑换完
								return vvv.key == vv.index && vvv.value >= vv.exchangeCount
							})
							if (!bIsGet) {
								data.push(v);
								break;
							}
						}
					} else if (v.type == message.ActivityType.ACT_TYPE_MONTHFIT) {                    //月卡福利
						let reward_has_get = Table.FindF(v.rewardIndex, function (_k, _v) {
							return _v == 1
						})
						if (!reward_has_get) {
							data.push(v);
						}
					} else if (v.type == message.ActivityType.ACT_TYPE_CONSUME) {                     //累计消耗
						if (v.rewardIndex.length != v.rewardZone.length) {
							data.push(v);
						}
					} else if (v.type == message.ActivityType.ACT_TYPE_END) {                         //开服活动
						if (Game.PlayerMixUnitInfoSystem.mixunitinfo.lotteryRewards.length != v.rewardZone.length) {
							data.push(v);
						}
					} else if (v.type == message.ActivityType.ACT_TYPE_BOSS_BATTLE) {  				//活动BOSS	
						data.push(v);
					}
				}
			}
			return data;
		}

		/**
		 * 检测是否需要弹出红包
		 */
		public checkShowRedPackage(): boolean {
			let progress: message.ProgressInfo = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_ACTIVITY_REDPACKET]; // 红包进程信息
			let info = Activity_redWarsDialogMain.returnAwardNums(); // 奖励数量 超越人数 当前红包是否领取
			let redPackageInfo: message.ActivityInfo = Table.FindR(Game.PlayerActivitySystem.Activities, function (k, v) { // 红包活动信息
				return v.type == message.ActivityType.ACT_TYPE_RED_PACKET;
			})[0];

			let redPackageTime = Game.Controller.Activity_redpackage_countdown - Game.Controller.curServerTime; // 红包开始后倒计时

			if (!redPackageInfo || progress.leftTime == 0) return false;

			for (const key in Game.PlayerMixUnitInfoSystem.mixunitinfo.activityGrab) {
				if (Game.PlayerMixUnitInfoSystem.mixunitinfo.activityGrab.hasOwnProperty(key)) {
					const element = Game.PlayerMixUnitInfoSystem.mixunitinfo.activityGrab[key];
					if (element.key == progress.info) {
						Activity_redWarsDialogMain.showRedPackageMap[progress.info] = progress.info;
					}
				}
			}

			let isShow: boolean = redPackageInfo != null && Game.Controller.curServerTime > redPackageInfo.openTime && Game.Controller.curServerTime < redPackageInfo.closeTime && redPackageTime > 0;
			if (isShow && info[2] == RED_PACKAGE.UNDONE && Activity_redWarsDialogMain.showRedPackageMap[progress.info] == null && !Teach.teachingNow && Game.PlayerInfoSystem.BaseInfo.level >= 10) {
				Activity_redWarsDialogMain.showRedPackageMap[progress.info] = progress.info;
				return true;
			}
			return false;
		}

		///////////////////////////////////////////////////////////////////////////
		// 私有变量
		private activities: Array<message.ActivityInfo> = [];  // 所有活动信息(不覆盖)

		public static activityBattleCurPos: number = -1;

		///////////////////////////////////////////////////////////////////////////
		// 成员方法

		public init() {
			Game.EventManager.on(GameEvent.PLAYER_ACTIVITY_INFO_CHANGE, this.onActivityInfoChange, this);
			Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.onLoginGameOK, this);
		}

		public uninit() {
			this.activities = [];
		}

		private onActivityInfoChange(ev: egret.Event) {
			let activities = <Array<message.ActivityInfo>>ev.data;
			for (const v of activities) {
				let [info, index] = Table.FindR(this.activities, function (kk, vv) {
					return (vv.type == v.type && vv.index == v.index);
				});
				if (info != null && index != null) {
					this.activities[index] = v;
				} else {
					this.activities.push(v);
				}
			}
		}

		public get Activities() {
			return this.activities;
		}

		private onLoginGameOK() {
			console.log("受邀请查询");
			let shareID = Controller.getGlobalStorageItem("shareID");
			let shareRoleID = Number(Game.Controller.shareRoleID());
			if (shareRoleID == 0) {
				if (shareID && shareID.length > 0) {
					Game.PlayerActivitySystem.QueryShareInfo(shareID).then((data: message.QueryShareInfoRespBody) => {
						let roleId = parseInt(data.user_data);
						if (!roleId) roleId = 0;
						if (roleId != 0) Game.PlayerActivitySystem.ShareRelation(roleId).then(() => {
							Controller.removeGlobalStorageItem("shareID");
						}).catch(() => { });
					});
				}
			}
		}

		// 每日领取体力
		public recievePower(index: number): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.RecievePowerRequest();
				request.body.index = index;

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.RecievePowerResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					resolve();
				}, (req: aone.AoneRequest): void => {
					console.log("req:", req);
					reject("timeout");
				}, this, false, true);
			});
		}

		// 领取升级奖励
		public upLevelReward(index: number): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.UpLevelRewardRequest();
				request.body.index = index;

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.UpLevelRewardResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					resolve(response.body.gameInfo);
				}, (req: aone.AoneRequest): void => {
					console.log("req:", req);
					reject("timeout");
				}, this, false, true);
			});
		}

		//
		public activityReward(type: number, index: number, rewardIndex: number, is_gift: boolean): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.ActivityRewardRequest();
				request.body.type = type;
				request.body.index = index;
				request.body.rewardIndex = rewardIndex;
				request.body.is_gift = is_gift;

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.ActivityRewardResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					resolve(response.body.gameInfo);
				}, (req: aone.AoneRequest): void => {
					console.log("req:", req);
					reject("timeout");
				}, this, false);
			});
		}
		//查看奖励名单
		public upLevelRankReward(index: number): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.UpLevelRankRequest();
				request.body.index = index;
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.UpLevelRankResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					resolve(response.body.rankItem);
				}, (req: aone.AoneRequest): void => {
					console.log("req:", req);
					reject("timeout");
				}, this, false);
			});
		}
		//
		public queryActivitysReward(type: number): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.QueryActivitysRequest();
				request.body.type = type;
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.QueryActivitysResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					resolve();
				}, (req: aone.AoneRequest): void => {
					console.log("req:", req);
					reject("timeout");
				}, this, false);
			});
		}

		//
		public sPgeneralReward(index: number): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.SPgeneralRewardRequest();
				request.body.index = index;
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.SPgeneralRewardResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					resolve(response.body.gameInfo);
				}, (req: aone.AoneRequest): void => {
					console.log("req:", req);
					reject("timeout");
				}, this, false, true);
			});
		}

		public queryActivitys(type: number): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.QueryActivitysRequest();
				request.body.type = type;
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.QueryActivitysResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}

					// update activities
					let activityInfoZip = PlayerActivitySystem.DecompressActivityInfoZip(response.body.activities);
					this.activities = activityInfoZip.activities;

					resolve(activityInfoZip.activities);
				}, (req: aone.AoneRequest): void => {
					console.log("req:", req);
					reject("timeout");
				}, this, false, true);
			});
		}

		public ShareTaskReward(type: number, count: number): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.ShareTaskRewardRequest();
				request.body.type = type;
				request.body.count = count;
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.ShareTaskRewardResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					resolve(response.body.gameInfo);
				}, (req: aone.AoneRequest): void => {
					console.log("req:", req);
					reject("timeout");
				}, this, false);
			});
		}

		public ShareUrl(share_url: string): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.ShareUrlRequest();
				request.body.share_url = share_url;
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.ShareUrlResponse>resp;
					if (response.header.result != 0) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}
					resolve(response.body.gameInfo);
				}, (req: aone.AoneRequest): void => {
					console.log("req:", req);
					reject("timeout");
				}, this, false);
			});
		}

		public PublishShareInfo(): Promise<{}> {
			return new Promise((resolve, reject) => {
				let data = new message.PublishShareInfoReqBody();
				data.device_info = Util.getDeviceInfo();
				data.version_info = Util.getAppVersionInfo();
				data.user_data = Game.Controller.roleID().toString();
				let body = JSON.stringify(data);

				let request = new egret.HttpRequest();
				request.responseType = egret.HttpResponseType.TEXT;
				request.setRequestHeader("Content-Type", "application/json");
				request.open(AppConfig.ApiUrlRoot + `/api/publish_share_info.do`, egret.HttpMethod.POST);
				request.send(body);
				request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
					let request = <egret.HttpRequest>event.currentTarget;
					let json = JSON.parse(request.response);
					if (json.retcode != 0) {
						reject(json.retcode);
						return;
					}

					let response = <message.PublishShareInfoRespBody>json.body;
					resolve(response);
				}, this);

				request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
					reject(-1);
				}, this);
			});
		}

		public QueryShareInfo(shareID: string): Promise<{}> {
			return new Promise((resolve, reject) => {
				let data = new message.QueryShareInfoReqBody();
				data.device_info = Util.getDeviceInfo();
				data.version_info = Util.getAppVersionInfo();
				data.code = "/share/" + shareID;
				let body = JSON.stringify(data);

				let request = new egret.HttpRequest();
				request.responseType = egret.HttpResponseType.TEXT;
				request.setRequestHeader("Content-Type", "application/json");
				request.open(AppConfig.ApiUrlRoot + `/api/query_share_info.do`, egret.HttpMethod.POST);
				request.send(body);
				request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
					let request = <egret.HttpRequest>event.currentTarget;
					let json = JSON.parse(request.response);
					if (json.retcode != 0) {
						reject(json.retcode);
						return;
					}

					let response = <message.QueryShareInfoRespBody>json.body;
					resolve(response);
				}, this);

				request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
					reject(-1);
				}, this);
			});
		}

		public ShareRelation(roleId: number): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.ShareRelationRequest();
				request.body.roleId = roleId;
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.ShareRelationResponse>resp;
					if (response.header.result != 0) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}
					resolve(response.body);
				}, (req: aone.AoneRequest): void => {
					console.log("req:", req);
					reject("timeout");
				}, this, true);
			});
		}

		/**
		 * 领取在线时长奖励协议
		 * 
		 * @param {index} number 在线时长奖励索引(从1开始)
		 */
		public OnlineTimeRewardReq(index: number): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.OnlineTimeRewardRequest();
				request.body.index = index;
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.OnlineTimeRewardResponse>resp;
					if (response.header.result != 0) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}
					resolve(response);
				}, (req: aone.AoneRequest): void => {
					console.log("req:", req);
					reject("timeout");
				}, this, false);
			});
		}

	}

}
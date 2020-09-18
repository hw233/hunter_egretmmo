namespace zj {
	//公会日志的公会事件
	//yuqingchao
	//2018.1.2
	export class LeagueLogContentItem extends eui.ItemRenderer {
		private lbTime: eui.Label;		//时间显示
		private lbContent: eui.Label;		//日志信息
		private father: LeagueLog = new LeagueLog();
		public constructor() {
			super();
			this.skinName = "resource/skins/league/LeagueLogContentItemSkin.exml"
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				this.father = null;
			}, null);
		}
		protected dataChanged() {
			let record: message.LeagueRecord = this.data.records;
			let rcdType = record.type;		//操作类型
			let rcdOpr = record.operater;		//操作对象
			let rcdObj = record.operate_object;		//被操作对象
			let rcdRet = record.operate_result;
			let rcdTime = record.generate_time;		//操作时间

			let tblLog = Game.ConfigManager.getTable(StringConfig_Table.log + ".json");
			let cnt = tblLog[rcdType].count;
			let dee = tblLog[rcdType]["des_0"]

			let tbIns = Game.ConfigManager.getTable(StringConfig_Table.leagueInstance + ".json");
			let tbLang = Game.ConfigManager.getTable(StringConfig_Table.language + ".json");
			let mem = Table.FindR(Game.PlayerLeagueSystem.Members, function (k, v) {
				if (v.monarchbase.name == rcdOpr) {
					return true;
				}
			})

			if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_JOIN) {
				//  1
				dee = HelpUtil.textConfigFormat(dee, rcdOpr);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_QUIT) {
				//  2
				dee = HelpUtil.textConfigFormat(dee, rcdOpr);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_KICK) {
				//  3
				dee = HelpUtil.textConfigFormat(dee, rcdObj, rcdOpr);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_ELDER) {
				//  4
				dee = HelpUtil.textConfigFormat(dee, rcdOpr, rcdObj);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_UNELDER) {
				//  5
				dee = HelpUtil.textConfigFormat(dee, rcdObj, rcdOpr);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_TRANSFER) {
				//  6
				dee = HelpUtil.textConfigFormat(dee, rcdOpr, rcdObj);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_MODIFY_NAME) {
				//  7
				dee = HelpUtil.textConfigFormat(dee, rcdOpr, rcdObj);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_MODIFY_PIC) {
				//  8
				dee = HelpUtil.textConfigFormat(dee, rcdOpr)
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_MODIFY_PICFRAME) {
				//  9
				dee = HelpUtil.textConfigFormat(dee, rcdOpr);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_JOIN_CONDITION) {
				//  10
				dee = HelpUtil.textConfigFormat(dee, rcdOpr, TextsConfig.TextConfig_League.limitCondition[rcdRet - 1])
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_JOIN_LEVEL) {
				//  11
				dee = HelpUtil.textConfigFormat(dee, rcdOpr, rcdRet);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_MODIFY_NOTICE) {
				//  12
				dee = HelpUtil.textConfigFormat(dee, rcdOpr);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_MODIFY_INTRODUCE) {
				//  13
				dee = HelpUtil.textConfigFormat(dee, rcdOpr);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_LEVEL_UP) {
				//  14
				dee = HelpUtil.textConfigFormat(dee, rcdRet);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_SKILL_UP) {
				//  15
				dee = HelpUtil.textConfigFormat(dee, rcdObj, rcdRet);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_SKILL_RESET) {
				//  16
				dee = HelpUtil.textConfigFormat(dee, rcdOpr);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_IMPEACH) {
				//  17
				dee = HelpUtil.textConfigFormat(dee, rcdOpr);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_UNIMPEACH) {
				//  18
				dee = HelpUtil.textConfigFormat(dee, rcdOpr);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_IMPEACH_SUCCESS) {
				//  19
				dee = HelpUtil.textConfigFormat(dee, rcdOpr, rcdObj);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_FEED_NORMAL) {
				//  20
				dee = HelpUtil.textConfigFormat(dee, rcdOpr, rcdRet);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_FEED_SENIOR) {
				//  21
				dee = HelpUtil.textConfigFormat(dee, rcdOpr, rcdRet);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_ANIMAL_ADOPT) {
				//  22
				dee = HelpUtil.textConfigFormat(dee, rcdOpr, rcdObj);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_BOSS_OPEN) {
				//  23
				dee = HelpUtil.textConfigFormat(dee, rcdOpr);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_BOSS_KILL) {
				//  24
				dee = HelpUtil.textConfigFormat(dee, rcdOpr, rcdObj);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_BOSS_NOT_KILL) {
				//  25
				dee = HelpUtil.textConfigFormat(dee, rcdOpr, rcdObj);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_PARTY_ADD) {
				//  26
				dee = HelpUtil.textConfigFormat(dee, rcdOpr);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_DEMISE_ELDER) {
				//  27
				dee = HelpUtil.textConfigFormat(dee, rcdOpr, rcdObj);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_DEMISE_NORMAL) {
				//  28
				dee = HelpUtil.textConfigFormat(dee, rcdOpr, rcdObj);
			}

			//副本日志
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_INSTANCE_OPEN) {
				//  29 开启副本日志
				if (mem[0] != null) {
					dee = HelpUtil.textConfigFormat(dee, TextsConfig.TextConfig_League.officalName[mem[0]["officialId"]], rcdOpr, tbLang[rcdObj].zhcn)
				} else {
					dee = HelpUtil.textConfigFormat(dee, "", rcdOpr, message.ETextArgType.TEXT_ARG_TYPE_LEAUGE_INSTANCE, rcdObj)
				}
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_INSTANCE_KILL) {
				//  30 副本击杀怪物日志
				if (mem[0] != null) {
					dee = HelpUtil.textConfigFormat(dee, TextsConfig.TextConfig_League.officalName[mem[0]["officialId"]], rcdOpr, tbLang[rcdObj].zhcn);
				}
				else {
					dee = HelpUtil.textConfigFormat(dee, "", rcdOpr, message.ETextArgType.TEXT_ARG_TYPE_MOBS, rcdObj)
				}

			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_INSTANCE_PASS) {
				//  31 副本通关日志
				dee = HelpUtil.textConfigFormat(dee, tbIns[rcdObj].instance_name);
			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_INSTANCE_BUY_POWER) {
				//  32 副本购买挑战次数
				let mem = Table.FindR(Game.PlayerLeagueSystem.LeagueInfo.members, (k, v) => {
					if (v.monarchbase.name == rcdOpr) {
						return true;
					}
				})
				if (mem[0] != null)
					dee = HelpUtil.textConfigFormat(dee, TextsConfig.TextConfig_League.officalName[mem[0]["officialId"]], rcdOpr);
				else {
					dee = HelpUtil.textConfigFormat(dee, "", rcdOpr);
				}

			}
			else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_INSTANCE_HURT) {
				//  33 副本伤害日志
				if (mem[0] != null)
					dee = HelpUtil.textConfigFormat(dee, TextsConfig.TextConfig_League.officalName[mem[0]["officialId"]], rcdOpr, rcdObj, rcdRet / 100)
				else {
					dee = HelpUtil.textConfigFormat(dee, "", message.ETextArgType.TEXT_ARG_TYPE_MOBS, rcdObj, rcdRet / 100)
				}

			}

			//日志信息显示
			this.lbContent.textFlow = Util.RichText(dee);

			//时间显示
			let timeTbl = this.data.timeTblnew;
			let des = "";
			//时间显示的格式
			if (timeTbl.h >= 10) {
				if (timeTbl.m >= 10) des = "%d : %d";
				else des = "%d : " + "0" + "%d";
			}
			else {
				if (timeTbl.m >= 10) des = "0" + "%d : " + "%d";
				else des = "0" + "%d : " + "0" + "%d";
			}
			this.lbTime.text = HelpUtil.textConfigFormat(des, timeTbl.h, timeTbl.m);
		}
	}
}
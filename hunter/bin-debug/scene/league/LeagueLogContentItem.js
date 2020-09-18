var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    //公会日志的公会事件
    //yuqingchao
    //2018.1.2
    var LeagueLogContentItem = (function (_super) {
        __extends(LeagueLogContentItem, _super);
        function LeagueLogContentItem() {
            var _this = _super.call(this) || this;
            _this.father = new zj.LeagueLog();
            _this.skinName = "resource/skins/league/LeagueLogContentItemSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            return _this;
        }
        LeagueLogContentItem.prototype.dataChanged = function () {
            var record = this.data.records;
            var rcdType = record.type; //操作类型
            var rcdOpr = record.operater; //操作对象
            var rcdObj = record.operate_object; //被操作对象
            var rcdRet = record.operate_result;
            var rcdTime = record.generate_time; //操作时间
            var tblLog = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.log + ".json");
            var cnt = tblLog[rcdType].count;
            var dee = tblLog[rcdType]["des_0"];
            var tbIns = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.leagueInstance + ".json");
            var tbLang = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.language + ".json");
            var mem = zj.Table.FindR(zj.Game.PlayerLeagueSystem.Members, function (k, v) {
                if (v.monarchbase.name == rcdOpr) {
                    return true;
                }
            });
            if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_JOIN) {
                //  1
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_QUIT) {
                //  2
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_KICK) {
                //  3
                dee = zj.HelpUtil.textConfigFormat(dee, rcdObj, rcdOpr);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_ELDER) {
                //  4
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr, rcdObj);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_UNELDER) {
                //  5
                dee = zj.HelpUtil.textConfigFormat(dee, rcdObj, rcdOpr);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_TRANSFER) {
                //  6
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr, rcdObj);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_MODIFY_NAME) {
                //  7
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr, rcdObj);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_MODIFY_PIC) {
                //  8
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_MODIFY_PICFRAME) {
                //  9
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_JOIN_CONDITION) {
                //  10
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr, zj.TextsConfig.TextConfig_League.limitCondition[rcdRet - 1]);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_JOIN_LEVEL) {
                //  11
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr, rcdRet);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_MODIFY_NOTICE) {
                //  12
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_MODIFY_INTRODUCE) {
                //  13
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_LEVEL_UP) {
                //  14
                dee = zj.HelpUtil.textConfigFormat(dee, rcdRet);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_SKILL_UP) {
                //  15
                dee = zj.HelpUtil.textConfigFormat(dee, rcdObj, rcdRet);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_SKILL_RESET) {
                //  16
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_IMPEACH) {
                //  17
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_UNIMPEACH) {
                //  18
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_IMPEACH_SUCCESS) {
                //  19
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr, rcdObj);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_FEED_NORMAL) {
                //  20
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr, rcdRet);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_FEED_SENIOR) {
                //  21
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr, rcdRet);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_ANIMAL_ADOPT) {
                //  22
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr, rcdObj);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_BOSS_OPEN) {
                //  23
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_BOSS_KILL) {
                //  24
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr, rcdObj);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_BOSS_NOT_KILL) {
                //  25
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr, rcdObj);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_PARTY_ADD) {
                //  26
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_DEMISE_ELDER) {
                //  27
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr, rcdObj);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_DEMISE_NORMAL) {
                //  28
                dee = zj.HelpUtil.textConfigFormat(dee, rcdOpr, rcdObj);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_INSTANCE_OPEN) {
                //  29 开启副本日志
                if (mem[0] != null) {
                    dee = zj.HelpUtil.textConfigFormat(dee, zj.TextsConfig.TextConfig_League.officalName[mem[0]["officialId"]], rcdOpr, tbLang[rcdObj].zhcn);
                }
                else {
                    dee = zj.HelpUtil.textConfigFormat(dee, "", rcdOpr, message.ETextArgType.TEXT_ARG_TYPE_LEAUGE_INSTANCE, rcdObj);
                }
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_INSTANCE_KILL) {
                //  30 副本击杀怪物日志
                if (mem[0] != null) {
                    dee = zj.HelpUtil.textConfigFormat(dee, zj.TextsConfig.TextConfig_League.officalName[mem[0]["officialId"]], rcdOpr, tbLang[rcdObj].zhcn);
                }
                else {
                    dee = zj.HelpUtil.textConfigFormat(dee, "", rcdOpr, message.ETextArgType.TEXT_ARG_TYPE_MOBS, rcdObj);
                }
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_INSTANCE_PASS) {
                //  31 副本通关日志
                dee = zj.HelpUtil.textConfigFormat(dee, tbIns[rcdObj].instance_name);
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_INSTANCE_BUY_POWER) {
                //  32 副本购买挑战次数
                var mem_1 = zj.Table.FindR(zj.Game.PlayerLeagueSystem.LeagueInfo.members, function (k, v) {
                    if (v.monarchbase.name == rcdOpr) {
                        return true;
                    }
                });
                if (mem_1[0] != null)
                    dee = zj.HelpUtil.textConfigFormat(dee, zj.TextsConfig.TextConfig_League.officalName[mem_1[0]["officialId"]], rcdOpr);
                else {
                    dee = zj.HelpUtil.textConfigFormat(dee, "", rcdOpr);
                }
            }
            else if (rcdType == message.LeagueRecordType.LEAGUE_RECORD_TYPE_INSTANCE_HURT) {
                //  33 副本伤害日志
                if (mem[0] != null)
                    dee = zj.HelpUtil.textConfigFormat(dee, zj.TextsConfig.TextConfig_League.officalName[mem[0]["officialId"]], rcdOpr, rcdObj, rcdRet / 100);
                else {
                    dee = zj.HelpUtil.textConfigFormat(dee, "", message.ETextArgType.TEXT_ARG_TYPE_MOBS, rcdObj, rcdRet / 100);
                }
            }
            //日志信息显示
            this.lbContent.textFlow = zj.Util.RichText(dee);
            //时间显示
            var timeTbl = this.data.timeTblnew;
            var des = "";
            //时间显示的格式
            if (timeTbl.h >= 10) {
                if (timeTbl.m >= 10)
                    des = "%d : %d";
                else
                    des = "%d : " + "0" + "%d";
            }
            else {
                if (timeTbl.m >= 10)
                    des = "0" + "%d : " + "%d";
                else
                    des = "0" + "%d : " + "0" + "%d";
            }
            this.lbTime.text = zj.HelpUtil.textConfigFormat(des, timeTbl.h, timeTbl.m);
        };
        return LeagueLogContentItem;
    }(eui.ItemRenderer));
    zj.LeagueLogContentItem = LeagueLogContentItem;
    __reflect(LeagueLogContentItem.prototype, "zj.LeagueLogContentItem");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueLogContentItem.js.map
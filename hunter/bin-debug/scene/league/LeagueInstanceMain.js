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
    //公会-公会副本
    //lizhengqiang
    //2019.01.02
    var LeagueInstanceMain = (function (_super) {
        __extends(LeagueInstanceMain, _super);
        function LeagueInstanceMain() {
            var _this = _super.call(this) || this;
            _this.uiItem = null;
            _this.instanceTable = null;
            _this.leagueInstancesInfo = null;
            _this.animationScaleX = 1;
            _this.animationScaleY = 1;
            _this.buyTime = function () {
                zj.Game.PlayerLeagueSystem.leagueInstanceBuyTime().then(function () {
                    zj.toast_success(zj.LANG(zj.TextsConfig.TextConfig_League.instance_addtimes_success));
                    _this.setInfo();
                });
            };
            _this.skinName = "resource/skins/league/LeagueInstanceMainSkin.exml";
            _this.btnAddTimes.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddTimes, _this);
            _this.btnAddStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddStrength, _this);
            _this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGemstone, _this);
            _this.btnLog.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnLog, _this);
            _this.btnViewAward.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnViewAward, _this);
            _this.btnRule.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRule, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_POWER_CHANGE, _this.setInfo, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.setInfo, _this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_LEAGUE_INSTANCE, _this.refreshInfo, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.PLAYER_POWER_CHANGE, _this.setInfo, _this);
                zj.Game.EventManager.off(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.setInfo, _this);
                zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_LEAGUE_INSTANCE, _this.refreshInfo, _this);
                if (_this.timer)
                    _this.timer.stop();
            }, null);
            return _this;
        }
        LeagueInstanceMain.prototype.onEntryTopScene = function () {
            this.setInfo();
        };
        LeagueInstanceMain.prototype.init = function () {
            var _this = this;
            this.timer = new egret.Timer(0.4 * 1000, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.adaptScene, this);
            this.setInfo();
            this.instanceTable = zj.Game.PlayerLeagueSystem.getAllInstance();
            this.addAnimation();
            zj.Game.PlayerLeagueSystem.leagueInstanceList().then(function () {
                _this.leagueInstancesInfo = zj.Game.PlayerLeagueSystem.Instances;
                _this.initList();
            });
            if (zj.Teach.isDone(zj.teachBattle.teachPartID_League_Instance) == false) {
                zj.Teach.CheckAndSetTeach(zj.teachBattle.teachPartID_League_Instance);
            }
        };
        LeagueInstanceMain.prototype.adaptScene = function () {
            var scaleX = zj.UIManager.StageWidth - 1142 > 0 ? zj.UIManager.StageWidth / 1142 : 1;
            var scaleY = zj.UIManager.StageHeight - 642 > 0 ? zj.UIManager.StageHeight / 642 : 1;
            this.imgBackround.scaleX = scaleX;
            this.imgBackround.scaleY = scaleY;
            var display = this.groupBoss.getChildByName("display");
            if (display) {
                display.x = 0;
                display.y = zj.UIManager.StageHeight;
                display.scaleX = this.animationScaleX * scaleX;
                display.scaleY = this.animationScaleY * scaleY;
            }
            this.groupItem.scaleX = scaleX;
            this.groupItem.scaleY = scaleY;
        };
        LeagueInstanceMain.prototype.addAnimation = function () {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, "gonghuifuben", "armatureName", null, 0)
                .then(function (display) {
                display.x = 0;
                display.y = zj.UIManager.StageHeight;
                display.name = "display";
                _this.groupBoss.addChildAt(display, 1);
                _this.animationScaleX = display.scaleX;
                _this.animationScaleY = display.scaleY;
            });
            this.timer.start();
        };
        LeagueInstanceMain.prototype.setInfo = function () {
            this.lbTimes.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.instance_times_left, zj.Game.PlayerLeagueSystem.Member.instance_buy_time + zj.CommonConfig.league_instance_day_time - zj.Game.PlayerLeagueSystem.Member.instance_time, zj.CommonConfig.league_instance_day_time);
            this.lbStrength.text = zj.Helper.StringFormat("%d/%d", zj.PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_POWER), (zj.TableLevel.Item(zj.Game.PlayerInfoSystem.Level).role_power + zj.PlayerVIPSystem.LowLevel().power_add));
            this.lbGemstone.text = zj.PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_TOKEN);
        };
        LeagueInstanceMain.prototype.refreshInfo = function () {
            var instancesInfo = zj.Game.PlayerLeagueSystem.LeagueInfo.instances;
            for (var k in this.uiItem) {
                this.uiItem[k].freshInfo(Number(k) + 1, instancesInfo[k]);
            }
        };
        LeagueInstanceMain.prototype.initList = function () {
            var item1 = new zj.LeagueInstanceMainItem();
            item1.setInfo(1, this.instanceTable[1], this.leagueInstancesInfo[0]);
            item1.name = "item1";
            this.groupBoss1.addChild(item1);
            var item2 = new zj.LeagueInstanceMainItem();
            item2.setInfo(2, this.instanceTable[2], this.leagueInstancesInfo[1]);
            item2.name = "item2";
            this.groupBoss2.addChild(item2);
            var item3 = new zj.LeagueInstanceMainItem();
            item3.setInfo(3, this.instanceTable[3], this.leagueInstancesInfo[2]);
            item3.name = "item3";
            this.groupBoss3.addChild(item3);
            var item4 = new zj.LeagueInstanceMainItem();
            item4.setInfo(4, this.instanceTable[4], this.leagueInstancesInfo[3]);
            item4.name = "item4";
            this.groupBoss4.addChild(item4);
            var item5 = new zj.LeagueInstanceMainItem();
            item5.setInfo(5, this.instanceTable[5], this.leagueInstancesInfo[4]);
            item5.name = "item5";
            this.groupBoss5.addChild(item5);
            var item6 = new zj.LeagueInstanceMainItem();
            item6.setInfo(6, this.instanceTable[6], this.leagueInstancesInfo[5]);
            item6.name = "item6";
            this.groupBoss6.addChild(item6);
            var item7 = new zj.LeagueInstanceMainItem();
            item7.setInfo(7, this.instanceTable[7], this.leagueInstancesInfo[6]);
            item7.name = "item7";
            this.groupBoss7.addChild(item7);
            this.uiItem = [item1, item2, item3, item4, item5, item6, item7];
        };
        LeagueInstanceMain.prototype.onBtnAddTimes = function () {
            var _this = this;
            // toast("+ 挑战次数");
            if (zj.Game.PlayerLeagueSystem.Member.instance_buy_time == zj.CommonConfig.league_instance_buy_time_max) {
                zj.toast_warning("挑战次数已达购买上限");
                return;
            }
            var cost = zj.CommonConfig.league_instance_buytime_consume(zj.Game.PlayerLeagueSystem.Member.instance_buy_time);
            var buyTime = zj.CommonConfig.league_instance_buy_time_max;
            zj.loadUI(zj.ConfirmCancelDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.setInfo(zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.instance_addtimes_tips, cost, buyTime - zj.Game.PlayerLeagueSystem.Member.instance_buy_time, buyTime));
                dialog.setCB(_this.buyTime);
            });
        };
        LeagueInstanceMain.prototype.onBtnAddStrength = function () {
            // toast("+ 体力");
            zj.loadUI(zj.HXH_HunterUserStrength)
                .then(function (dialog) {
                dialog.SetInfo();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        LeagueInstanceMain.prototype.onBtnAddGemstone = function () {
            // toast("+ 钻石");
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init();
            });
        };
        // 副本日志
        LeagueInstanceMain.prototype.onBtnLog = function () {
            // toast("副本日志");
            zj.Game.PlayerLeagueSystem.leagueLog(2)
                .then(function (records) {
                zj.loadUI(zj.LeagueLog)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.init(zj.TableEnum.Enum.League_LogType.Instance, records);
                });
            });
        };
        // 奖励预览
        LeagueInstanceMain.prototype.onBtnViewAward = function () {
            // toast("奖励预览");
            zj.loadUI(zj.LeagueInstanceViewAward)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        // 玩法说明
        LeagueInstanceMain.prototype.onBtnRule = function () {
            // toast("玩法说明");
            zj.loadUI(zj.Common_RuleDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.init(zj.RuleConfig.leagueInstance);
            });
        };
        LeagueInstanceMain.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TRAIL_OFF);
        };
        return LeagueInstanceMain;
    }(zj.Scene));
    zj.LeagueInstanceMain = LeagueInstanceMain;
    __reflect(LeagueInstanceMain.prototype, "zj.LeagueInstanceMain");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueInstanceMain.js.map
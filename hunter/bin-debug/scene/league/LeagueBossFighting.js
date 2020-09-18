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
    //公会战——挑战后
    //yuqingchao
    //2019.03.06
    var LeagueBossFighting = (function (_super) {
        __extends(LeagueBossFighting, _super);
        function LeagueBossFighting() {
            var _this = _super.call(this) || this;
            _this.id = 0;
            _this.rankItems = null;
            _this.leagueBossRank = null;
            _this.process = null;
            _this.skinName = "resource/skins/league/LeagueBossFightingSkin.exml";
            _this.btnCopper.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnCopper, _this);
            _this.btnGold.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGoldr, _this);
            _this.btnFight.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnFight, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onbtnClose, _this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_LEAGUE_BOSS_RANK, _this.refreshRank, _this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_LEAGUE_BOSS, _this.refreshBlood, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_LEAGUE_BOSS_RANK, _this.refreshRank, _this);
                zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_LEAGUE_BOSS, _this.refreshBlood, _this);
                if (_this.timer)
                    _this.timer.stop();
            }, null);
            return _this;
        }
        LeagueBossFighting.prototype.init = function () {
            var _this = this;
            this.process = zj.Table.FindR(zj.Game.PlayerLeagueSystem.BaseInfo.processes, function (k, v) {
                if (v.type == message.EProcessType.PROCESS_TYPE_LEAGUE_BOSS) {
                    return true;
                }
            })[0];
            this.hpMask = zj.Util.getMaskImgBlack(this.imgHP.width, this.imgHP.height);
            this.hpMask.verticalCenter = 0;
            this.hpMask.left = 7;
            this.hpMask.visible = false;
            this.groupHP.addChild(this.hpMask);
            this.upDate();
            //定时器，一秒刷新一次
            this.timer = new egret.Timer(1000, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.upDate, this);
            this.timer.start();
            this.lbCopperNum.text = zj.CommonConfig.league_boss_inspire_normal.toString();
            this.lbGoldNum.text = zj.CommonConfig.league_boss_inspire_senior.toString();
            zj.Game.PlayerLeagueSystem.leagueBossScene().then(function (msg) {
                _this.setInfo(msg);
            }).catch(function () {
                if (zj.Game.PlayerLeagueSystem.leagueBoss.bStart == false) {
                    if (zj.Game.PlayerLeagueSystem.leagueBoss.bSuccess) {
                        // toast("WIN")
                        zj.loadUI(zj.LeagueBossSccessful)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                        });
                        _this.close();
                    }
                    else {
                        // toast("LOSE")
                        zj.loadUI(zj.LeagueBossLose)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                        });
                        _this.close();
                    }
                }
            });
            if (zj.Teach.isDone(zj.teachBattle.teachPartID_League_Boss) == false) {
                zj.Teach.CheckAndSetTeach(zj.teachBattle.teachPartID_League_Boss);
            }
        };
        LeagueBossFighting.prototype.setInfo = function (msg) {
            this.rankItems = msg.rankItems;
            this.initRank();
            this.initBlood();
            this.initInspireList();
            this.SetFightCount();
        };
        LeagueBossFighting.prototype.isFullScreen = function () {
            return true;
        };
        LeagueBossFighting.prototype.upDate = function () {
            this.setTimeDes();
            this.initBlood();
            if (this.process && this.process.leftTime * 1000 - egret.getTimer() <= 0) {
                if (this.timer)
                    this.timer.stop;
            }
        };
        LeagueBossFighting.prototype.setTimeDes = function () {
            var time = this.process.leftTime - Math.floor(egret.getTimer() / 1000);
            this.lbTime.text = zj.Helper.GetTimeStr(time <= 0 ? 0 : time, false);
        };
        //挑战次数
        LeagueBossFighting.prototype.SetFightCount = function () {
            this.lbEndTime.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextConfig_League.animal_fightCount, zj.CommonConfig.league_boss_battle_number - zj.Game.PlayerLeagueSystem.Member.boss_time, zj.CommonConfig.league_boss_battle_number);
        };
        LeagueBossFighting.prototype.refreshRank = function () {
            if (this.leagueBossRank != null) {
                this.leagueBossRank.refreash();
            }
        };
        LeagueBossFighting.prototype.refreshBlood = function () {
            var a = zj.Game.PlayerLeagueSystem.leagueBoss.bossInfo.monster_pos3[0].curInfo.cur_hp;
            if (zj.Game.PlayerLeagueSystem.leagueBoss.bStart == false) {
                if (zj.Game.PlayerLeagueSystem.leagueBoss.bSuccess) {
                    this.close();
                    zj.loadUI(zj.LeagueBossSccessful)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else if (zj.Game.PlayerLeagueSystem.leagueBoss.bossInfo.monster_pos3[0].curInfo.cur_hp >= 0 && this.process.leftTime - Math.floor(egret.getTimer() / 1000) <= 0) {
                    this.close();
                    zj.loadUI(zj.LeagueBossLose)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            }
        };
        //激励item
        LeagueBossFighting.prototype.initInspireList = function () {
            this.arrayCollection = new eui.ArrayCollection();
            for (var i = 0; i < zj.Game.PlayerLeagueSystem.leagueBoss.Inspires.length; i++) {
                this.arrayCollection.addItem({
                    info: zj.Game.PlayerLeagueSystem.leagueBoss.Inspires[i],
                    i: i
                });
            }
            this.lstInspire.dataProvider = this.arrayCollection;
            this.lstInspire.itemRenderer = zj.LeagueBossFightingIncertive;
        };
        LeagueBossFighting.prototype.initRank = function () {
            this.leagueBossRank = new zj.LeagueBossRank();
            this.leagueBossRank.setInfo(this.rankItems);
            this.groupRank.removeChildren();
            this.groupRank.addChild(this.leagueBossRank);
        };
        //BOSS血量
        LeagueBossFighting.prototype.initBlood = function () {
            var curhp = zj.Game.PlayerLeagueSystem.leagueBoss.bossInfo.monster_pos3[0].curInfo.cur_hp; //BOSS战斗后剩余血量
            var fullhp = zj.Game.PlayerLeagueSystem.leagueBoss.bossInfo.monster_pos3[0].baseInfo.monster_hp; //BOSS总血量
            var curhp1;
            var fullhp1;
            if (curhp >= 100000) {
                curhp1 = (curhp / 10000).toFixed(1) + "万";
            }
            else {
                curhp1 = curhp;
            }
            if (fullhp >= 100000) {
                fullhp1 = (fullhp / 10000).toFixed(1) + "万";
            }
            else {
                fullhp1 = fullhp;
            }
            this.lbNum.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextConfig_League.animal_Exp, curhp1, fullhp1);
            var percent = curhp / fullhp;
            this.hpMask.visible = true;
            this.hpMask.width = this.imgHP.width * percent;
            this.imgHP.mask = this.hpMask;
        };
        //挑战按钮
        LeagueBossFighting.prototype.onBtnFight = function () {
            var _this = this;
            if (zj.Game.PlayerLeagueSystem.Member.boss_time < zj.CommonConfig.league_boss_battle_number) {
                zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS;
                //"HXH_CommonFormationPveMain"
                var msg = zj.Game.PlayerLeagueSystem.leagueBoss.bossInfo;
                zj.Game.PlayerStageSystem.insert(msg);
                zj.PlayerStageSystem.stageInfoTbl = [msg];
                zj.loadUI(zj.CommonFormatePveMain)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(_this.id);
                });
            }
            else {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextConfig_League.animal_maxFight));
                return;
            }
        };
        //普通激励
        LeagueBossFighting.prototype.onBtnCopper = function () {
            this.ReqInspire(1);
        };
        //使劲激励
        LeagueBossFighting.prototype.onBtnGoldr = function () {
            this.ReqInspire(2);
        };
        //全体激励更新
        LeagueBossFighting.prototype.ReqInspire = function (inspireType) {
            var _this = this;
            zj.Game.PlayerLeagueSystem.leagueBossInspire(inspireType).then(function () {
                _this.initInspireList();
            }).catch(function (result) {
                if (result == message.EC.XG_LACK_MONEY) {
                    zj.loadUI(zj.HelpGoldDialog)
                        .then(function (dialog) {
                        dialog.SetInfoList();
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    return;
                }
            });
        };
        LeagueBossFighting.prototype.onbtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return LeagueBossFighting;
    }(zj.Dialog));
    zj.LeagueBossFighting = LeagueBossFighting;
    __reflect(LeagueBossFighting.prototype, "zj.LeagueBossFighting");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueBossFighting.js.map
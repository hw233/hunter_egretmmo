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
    /**
     * @author
     *
     * @date 2019-1-26
     *
     * @class 跨服格斗场主界面
     */
    var ArenaWhole = (function (_super) {
        __extends(ArenaWhole, _super);
        function ArenaWhole() {
            var _this = _super.call(this) || this;
            _this.clickBtn = false;
            _this.challengeTableNumber = zj.TableLicence.Item(zj.Game.PlayerInfoSystem.LecenceLevel).singlecraft_buy;
            _this.myInfo = { craft_rank: null, craft_score: null, craft_rank_self: null, titleId: null, groupName: null };
            _this.singleTimmer = { last_time: null, timmer: null };
            _this.index = 0;
            _this.times = 0;
            _this.formats = [];
            _this.formatsData = [];
            _this.skinName = "resource/skins/arena/ArenaWholeSkin.exml";
            if (_this.imgbg.width < zj.UIManager.StageWidth) {
                _this.imgbg.width = zj.UIManager.StageWidth;
            }
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.clearInterval(_this.update);
                egret.Tween.removeTweens(_this.iconLevel1); // 因为是循环播放，需要特别处理
            }, null);
            _this.update = egret.setInterval(_this.Update, _this, 500);
            _this.init();
            _this.Update();
            return _this;
        }
        ArenaWhole.prototype.init = function () {
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            this.btnInfor.addEventListener(tap, this.onBtnInfor, this);
            this.btnTeam.addEventListener(tap, this.onBtnTeam, this);
            this.btnMall.addEventListener(tap, this.onBtnShop, this);
            this.btnRankServer.addEventListener(tap, this.onBtnRankServer, this);
            this.btnRank.addEventListener(tap, this.onBtnRank, this);
            this.btnGetAward.addEventListener(tap, this.onBtnGetAward, this);
            this.btnBattleView.addEventListener(tap, this.onBtnBattleView, this);
            this.btnAddGemsTone.addEventListener(tap, this.onBtnAddGemsTone, this);
            this.btnSelectEnemy.addEventListener(tap, this.onBtnSelectEnemy, this);
            this.imgExp.mask = this.imgExpOne;
            this.singleTimmer.last_time = -1;
            this.singleTimmer.timmer = null;
            egret.Tween.removeTweens(this.iconLevel1);
            egret.Tween.get(this.iconLevel1, { loop: true }).to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 1500).wait(1000).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 1);
            this.req();
            this.initDefineFormation();
        };
        ArenaWhole.prototype.isFullScreen = function () {
            return true;
        };
        /**点击阵容 */
        ArenaWhole.prototype.onBtnTeam = function () {
            var _this = this;
            zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_CRAFT;
            zj.loadUI(zj.CommonFormationPvpArenaB)
                .then(function (dialog) {
                dialog.setInfo(_this, function () {
                    _this.initDefineFormation();
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**循环 */
        ArenaWhole.prototype.Update = function () {
            this.updateNumber();
            this.updateTimmer();
            this.updateTips();
        };
        ArenaWhole.prototype.setInfo = function () {
            this.setInfoMy();
            this.setInfoEnemy();
        };
        ArenaWhole.prototype.setInfoMy = function () {
            var strScore = zj.TextsConfig.TextsConfig_Pk.norank.score;
            var strRank = zj.TextsConfig.TextsConfig_Pk.norank.rangking;
            var strRankSelf = zj.TextsConfig.TextsConfig_Pk.norank.rangking;
            var preCore = [];
            preCore = zj.singLecraft.LevelProgresBar(this.myInfo.craft_score);
            var strHonor = "";
            this.imgExpOne.x = this.imgExp.x - this.imgExpOne.width + preCore[2] * this.imgExpOne.width;
            if (this.myInfo != null) {
                var level = zj.singLecraft.GetLevel(this.myInfo.craft_score);
                var info = zj.singLecraft.InstanceScore(level);
                strScore = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.grade, this.myInfo.craft_score);
                strRank = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.order, this.myInfo.craft_rank);
                strRankSelf = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.order, this.myInfo.craft_rank_self);
                strHonor = zj.Set.NumberUnit3(zj.Game.PlayerInfoSystem.BaseInfo.honorCoin);
                this.imgGrade.source = zj.cachekey(info.icon_num, this);
                this.iconLevel.source = zj.cachekey(info.title, this);
                this.iconLevel1.source = zj.cachekey(info.title, this);
                if (preCore[3]) {
                    this.labelJiFenNeed.text = zj.TextsConfig.TextsConfig_Pk.getMaxLevel;
                }
                else {
                    this.labelJiFenNeed.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.otherNeedScore, (preCore[1] - this.myInfo.craft_score), (level + 1));
                }
                this.labelJiFen.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.curScores, this.myInfo.craft_score, preCore[1]);
            }
            this.labelMyRank.text = strRank;
            this.labelMyRankServer.text = strRankSelf;
            this.labelMyHonor.text = strHonor;
            var process = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SINGLECRAFT];
            var season = Math.floor(process.info / 1000);
            this.labelSeasonNumber.text = season.toString();
        };
        /**龙骨 */
        ArenaWhole.prototype.setInfoEnemy = function () {
            var _this = this;
            var _loop_1 = function (i) {
                this_1["groupTai" + i].removeChildren();
                var cssName = zj.TableClientAniCssSource.Item(2001);
                zj.Game.DragonBonesManager.playAnimation(this_1, "ui_gedou_01", "armatureName", "003_dianti_xunhuan", 0)
                    .then(function (display) {
                    if (i == 2) {
                        display.scaleX = -1;
                    }
                    _this["groupTai" + i].addChild(display);
                })
                    .catch(function (reason) {
                    zj.toast(reason);
                });
                zj.Game.DragonBonesManager.playAnimation(this_1, "ui_gedou_01", "armatureName", "001_dianti_chuxian", 1)
                    .then(function (display) {
                    if (i == 2) {
                        display.scaleX = -1;
                    }
                    _this["groupTai" + i].addChild(display);
                })
                    .catch(function (reason) {
                    zj.toast(reason);
                });
            };
            var this_1 = this;
            for (var i = 1; i <= 2; i++) {
                _loop_1(i);
            }
            var thisOne = this;
            var _loop_2 = function (i) {
                thisOne["groupHero" + i].removeChildren();
                zj.loadUI(zj.ArenaWholeHead)
                    .then(function (arenaWholeHead) {
                    arenaWholeHead.anchorOffsetX = arenaWholeHead.width / 2;
                    arenaWholeHead.anchorOffsetY = arenaWholeHead.height / 2;
                    arenaWholeHead.setInfo(thisOne.enemyInfo[i], i + 1);
                    thisOne["groupHero" + i].addChild(arenaWholeHead);
                });
            };
            for (var i = 0; i < 3; i++) {
                _loop_2(i);
            }
        };
        /**移除龙骨 */
        ArenaWhole.prototype.removeKeel = function () {
            for (var i = 0; i < 3; i++) {
                this["groupHero" + i].removeChildren();
            }
        };
        /**按钮更换对手倒计时 */
        ArenaWhole.prototype.updateTimmer = function () {
            var date = zj.Game.Controller.serverNow();
            var humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
            var a = humanDate.getTime() / 1000 - 8 * 60 * 60;
            var times = zj.Game.PlayerArenaSystem.singleTimmer.last_time - a; //Math.ceil(Game.PlayerArenaSystem.singleTimmer.last_time - a);
            if (times < 0) {
                times = 0;
            }
            var pointNumber = 3 - (times % 3);
            var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.freshTime, times);
            for (var i = 0; i < pointNumber; i++) {
                str += ".";
            }
            this.labelChangeTime.visible = (times > 0);
            this.btnSelectEnemy.enabled = (times <= 0);
            this.labelChangeTime.text = str;
        };
        /**红点显示判断 */
        ArenaWhole.prototype.updateTips = function () {
            this.imgTips1.visible = false;
            var tips = zj.Tips.getTipsOfMail(message.MailType.MAIL_TYPE_SINGLECRAFT);
            this.imgTips2.visible = tips;
        };
        /**挑战次数更新 */
        ArenaWhole.prototype.updateNumber = function () {
            var curNumber = zj.TableLicence.Item(zj.Game.PlayerInfoSystem.LecenceLevel).singlecraft_free + (zj.Game.PlayerVIPSystem.vipInfo.craft_buy * zj.CommonConfig.singlecraft_buy_time) - zj.Game.PlayerVIPSystem.vipInfo.craft_time;
            var max = zj.TableLicence.Item(zj.Game.PlayerInfoSystem.LecenceLevel).singlecraft_free;
            this.labelTimes.text = curNumber + "/" + max;
        };
        ArenaWhole.prototype.initDefineFormation = function () {
            for (var i = 0; i < 3; i++) {
                this.formats[i] = new message.FormationInfo();
            }
            var buttonNames = ["generals", "reserves", "supports"];
            var a = zj.Game.PlayerFormationSystem.formatsSingleDefine;
            for (var kk in zj.Game.PlayerFormationSystem.formatsSingleDefine) {
                if (zj.Game.PlayerFormationSystem.formatsSingleDefine.hasOwnProperty(kk)) {
                    var vv = zj.Game.PlayerFormationSystem.formatsSingleDefine[kk];
                    if (vv.formationIndex <= 3) {
                        this.formats[vv.formationIndex - 1] = vv;
                    }
                }
            }
            for (var fk in this.formats) {
                if (this.formats.hasOwnProperty(fk)) {
                    var fv = this.formats[fk];
                    for (var k in buttonNames) {
                        if (buttonNames.hasOwnProperty(k)) {
                            var v = buttonNames[k];
                            for (var i = 0; i < 4; i++) {
                                if (fv[v][i] == null) {
                                    fv[v][i] = 0;
                                }
                            }
                        }
                    }
                    this.formats[fk].formationType = message.EFormationType.FORMATION_TYPE_CRAFT;
                    this.formats[fk].formationIndex = Number(fk) + 1;
                    this.formatsData[fk] = [0, 0, 0];
                    for (var i = 0; i < this.formats[fk].generals.length; i++) {
                        if (this.formats[fk].generals[i] != null) {
                            this.formatsData[fk][i] == this.formats[fk].generals[i];
                        }
                    }
                    if (this.formats[fk].supports[0] != null) {
                        this.formatsData[fk][2] = this.formats[fk].supports[0];
                    }
                }
            }
            zj.Game.PlayerFormationSystem.formatsSingleDefine = this.formats;
        };
        //暂存
        ArenaWhole.prototype.updateFormationShow = function () {
            function setGeneral() {
                var noGeneral = true;
                for (var k in zj.Game.PlayerFormationSystem.formatsSingleDefine) {
                    if (zj.Game.PlayerFormationSystem.formatsSingleDefine.hasOwnProperty(k)) {
                        var v = zj.Game.PlayerFormationSystem.formatsSingleDefine[k];
                        for (var kk in v.generals) {
                            if (v.generals.hasOwnProperty(kk)) {
                                var vv = v.generals[kk];
                                if (vv != 0) {
                                    noGeneral = false;
                                    return noGeneral;
                                }
                            }
                        }
                    }
                }
                return noGeneral;
            }
        };
        /**点击规则 */
        ArenaWhole.prototype.onBtnInfor = function () {
            zj.loadUI(zj.Common_RuleDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.init(zj.RuleConfig.singlePk);
            });
        };
        /**点击格斗商店 */
        ArenaWhole.prototype.onBtnShop = function () {
            zj.loadUI(zj.ShopMallDialog)
                .then(function (dialog) {
                dialog.load(4);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**点击本服排行 */
        ArenaWhole.prototype.onBtnRankServer = function () {
            var _this = this;
            zj.loadUI(zj.ArenaWholeRank)
                .then(function (dialog) {
                dialog.setInfo(_this, 1);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**点击世界排行 */
        ArenaWhole.prototype.onBtnRank = function () {
            var _this = this;
            zj.loadUI(zj.ArenaWholeRank)
                .then(function (dialog) {
                dialog.setInfo(_this, 2);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**点击奖励 */
        ArenaWhole.prototype.onBtnGetAward = function () {
            var _this = this;
            zj.loadUI(zj.ArenaWholeAward)
                .then(function (dialog) {
                dialog.setInfo(_this);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**点击战报 */
        ArenaWhole.prototype.onBtnBattleView = function () {
            var _this = this;
            zj.loadUI(zj.MailMainReport)
                .then(function (dialog) {
                dialog.loadFrom(_this, zj.TableEnum.Enum.Mail.PK);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**点击挑战次数增加按钮 */
        ArenaWhole.prototype.onBtnAddGemsTone = function () {
            var _this = this;
            var lowVip = null;
            if (!zj.ckid(zj.Game.PlayerInfoSystem.BaseInfo.vipLevel)) {
                lowVip = zj.TableVipinfo.Item(zj.Game.PlayerInfoSystem.BaseInfo.vipLevel);
            }
            if (zj.Game.PlayerVIPSystem.vipInfo.craft_buy >= this.challengeTableNumber + lowVip.craft_buy_time && !zj.Device.isDebug) {
                if (zj.Device.isReviewSwitch) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Arena.ladderChallengeNumEmpty);
                }
                else {
                    zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Arena.ladderChallengeNumEmpty, function () {
                        return;
                    });
                }
            }
            else {
                var a = zj.CommonConfig.singlecraft_buy_time_consume(zj.Game.PlayerVIPSystem.vipInfo.craft_buy);
                var b = zj.CommonConfig.singlecraft_buy_time;
                var c = this.challengeTableNumber + lowVip.craft_buy_time - zj.Game.PlayerVIPSystem.vipInfo.craft_buy;
                var d = this.challengeTableNumber + lowVip.craft_buy_time;
                var NumberMsg = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.buyNumTip, a, b, c, d);
                zj.TipManager.ShowConfirmCancel(NumberMsg, function () {
                    _this.buyNumberReq();
                }, null);
            }
        };
        /**确认增加条件次数时发协议 */
        ArenaWhole.prototype.buyNumberReq = function () {
            zj.Game.PlayerArenaSystem.craftBuyTime()
                .then(function (roles) {
                zj.toast_success(zj.TextsConfig.TextsConfig_Pk.buyChallengeNumSuccessTip);
            })
                .catch(function (reason) {
                if (reason == "钻石不足") {
                    zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Money.demstone, function () {
                        return;
                    });
                }
                else {
                    zj.toast_warning(reason);
                }
            });
        };
        ArenaWhole.prototype.buyNumReqVisit = function (msg, result) {
            if (result == message.EC.SUCCESS) {
                zj.toast("<font color=0x00ff00>" + zj.TextsConfig.TextsConfig_Pk.buyChallengeNumSuccessTip + "</font>");
            }
            else if (result == message.EC.XG_LACK_TOKEN) {
                // TipManager.sho
            }
            else {
                // toast(getError);
            }
        };
        /**点击更换对手按钮 */
        ArenaWhole.prototype.onBtnSelectEnemy = function () {
            this.clickBtn = true;
            this.btnSelectEnemy.enabled = false;
            var date = zj.Game.Controller.serverNow();
            var humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
            var a = humanDate.getTime() / 1000 - 8 * 60 * 60;
            zj.Game.PlayerArenaSystem.singleTimmer.last_time = a + 10;
            this.times = 10;
            this.req();
        };
        ArenaWhole.prototype.req = function () {
            var process = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SINGLECRAFT];
            if (process != null) {
                if (process.info % 10 == message.CraftStateType.CRAFT_STATE_TYPE_NONO) {
                    if (this.clickBtn) {
                        zj.toast(zj.TextsConfig.TextsConfig_Pk.disenter.skip);
                        this.btnSelectEnemy.enabled = true;
                        return;
                    }
                    else {
                        this.setInfo();
                        return;
                    }
                }
                else if (process.info % 10 == message.CraftStateType.CRAFT_STATE_TYPE_READY) {
                    if (this.clickBtn) {
                        zj.toast(zj.TextsConfig.TextsConfig_Pk.disenter.close);
                        this.btnSelectEnemy.enabled = true;
                        return;
                    }
                    else {
                        this.setInfo();
                        return;
                    }
                }
            }
            //发协议
            var thisOne = this;
            zj.Game.PlayerArenaSystem.craftQueryList(thisOne.clickBtn)
                .then(function (roles) {
                if (thisOne.clickBtn) {
                    thisOne.singleTimmer.last_time = zj.Game.PlayerInstanceSystem.curServerTime + 10;
                }
                thisOne.enemyInfo = [];
                thisOne.myInfo;
                thisOne.index = roles.index;
                thisOne.enemyInfo = zj.Table.DeepCopy(roles.roleinfos);
                thisOne.myInfo.craft_rank = roles.rank;
                thisOne.myInfo.craft_score = roles.score;
                thisOne.myInfo.craft_rank_self = roles.rank_self || 0;
                thisOne.setInfo();
            })
                .catch(function (reason) {
                thisOne.btnSelectEnemy.$setEnabled(true);
                zj.toast(reason);
            });
        };
        /**关闭弹窗*/
        ArenaWhole.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return ArenaWhole;
    }(zj.Dialog));
    zj.ArenaWhole = ArenaWhole;
    __reflect(ArenaWhole.prototype, "zj.ArenaWhole");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaWhole.js.map
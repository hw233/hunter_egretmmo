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
    // 公会战主界面
    // lizhengqiang
    // 20190117
    var LeagueUnionBattleMain = (function (_super) {
        __extends(LeagueUnionBattleMain, _super);
        function LeagueUnionBattleMain() {
            var _this = _super.call(this) || this;
            _this.userOfID = zj.Game.PlayerLeagueSystem.Member.officialId; // 官职;
            _this.shipFocus = 1;
            _this.isPop = false;
            _this.isPop2 = false;
            _this.readyDefendInfo = {};
            _this.readyAirship = {};
            _this.enemyUnionInfo = null;
            _this.starred = [[], [], [], [], []]; // 获得星星信息
            _this.enemyStarred = [[], [], [], [], []]; // 敌方获得星星信息
            _this.currentShipType = 0;
            _this.ourCurrentScore = 0;
            _this.enemyCurrentScore = 0;
            _this.imgReadyScaleX = 1;
            _this.imgReadyScaleY = 1;
            _this.imgBattleScaleX = 1;
            _this.imgBattleScaleY = 1;
            _this.skinName = "resource/skins/league/LeagueUnionBattleMainSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnPlayDes.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnPlayDes, _this);
            _this.btnLastSettlement.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnLastSettlement, _this);
            _this.groupBigAirship.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupBigAirship, _this);
            _this.groupAirshipLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupAirshipLeft, _this);
            _this.groupAirshipRight.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupAirshipRight, _this);
            _this.groupSmallAirshipLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupSmallAirshipLeft, _this);
            _this.groupSmallAirshipRight.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupSmallAirshipRight, _this);
            _this.btnViewDetails.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnViewDetails, _this);
            _this.btnViewSet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnViewSet, _this);
            _this.btnMall.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMall, _this);
            _this.btnSetLineUp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSetLineUp, _this);
            _this.btnUnionRank.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUnionRank, _this);
            _this.btnRewardPreview.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRewardPreview, _this);
            _this.btnSignUP.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSignUP, _this);
            _this.groupSpine1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupSpine1, _this);
            _this.groupSpine2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupSpine2, _this);
            _this.groupSpine3.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupSpine3, _this);
            _this.groupSpine4.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupSpine4, _this);
            _this.groupSpine5.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupSpine5, _this);
            _this.rectBattleOurLoadingBarMask = zj.Util.getMaskImgBlack(_this.imgBattleOurLoadingBar.width, _this.imgBattleOurLoadingBar.height);
            _this.rectBattleOurLoadingBarMask.left = 0;
            _this.rectBattleOurLoadingBarMask.verticalCenter = 0;
            _this.groupBattleOurLoadingBar.addChild(_this.rectBattleOurLoadingBarMask);
            _this.rectBattleOurLoadingBarMask.visible = false;
            _this.rectBattleEnemyLoadingBarMask = zj.Util.getMaskImgBlack(_this.imgBattleEnemyLoadingBar.width, _this.imgBattleEnemyLoadingBar.height);
            _this.rectBattleEnemyLoadingBarMask.right = 0;
            _this.rectBattleEnemyLoadingBarMask.verticalCenter = 0;
            _this.groupBattleEnemyLoadingBar.addChild(_this.rectBattleEnemyLoadingBarMask);
            _this.rectBattleEnemyLoadingBarMask.visible = false;
            _this.btnBattleRecord.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBattleRecord, _this);
            _this.btnBattleSate.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBattleSate, _this);
            _this.btnMyFormation.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMyFormation, _this);
            zj.Game.EventManager.on(zj.GameEvent.LEAGUE_UNION_BATTLE_MAIN_UPDATE2, _this.update2, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                if (_this.timer)
                    _this.timer.stop();
                if (_this.timer2)
                    _this.timer2.stop();
                zj.Game.EventManager.off(zj.GameEvent.LEAGUE_UNION_BATTLE_MAIN_UPDATE2, _this.update2, _this);
            }, null);
            return _this;
        }
        LeagueUnionBattleMain.prototype.init = function () {
            this.imgTip1.visible = false;
            this.imgTip2.visible = false;
            this.imgTip3.visible = false;
            this.imgReadyScaleX = this.imgReady.scaleX;
            this.imgReadyScaleY = this.imgReady.scaleY;
            this.imgBattleScaleX = this.imgBattle.scaleX;
            this.imgBattleScaleY = this.imgBattle.scaleY;
            this.applyData();
            this.timer = new egret.Timer(0.4 * 1000, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
            this.timer.start();
            this.timer2 = new egret.Timer(60 * 1000, 0);
            this.timer2.addEventListener(egret.TimerEvent.TIMER, this.update2, this);
            this.timer2.start();
            this.adaptScene();
        };
        LeagueUnionBattleMain.prototype.adaptScene = function () {
            var imgBackgroundScaleX = zj.UIManager.StageWidth - 1400 > 0 ? zj.UIManager.StageWidth / 1400 : 1;
            var imgBackgroundScaleY = zj.UIManager.StageHeight - 697 > 0 ? zj.UIManager.StageHeight / 697 : 1;
            this.imgReady.scaleX = this.imgReadyScaleX * imgBackgroundScaleX;
            this.imgReady.scaleY = this.imgReadyScaleY * imgBackgroundScaleY;
            this.imgBattle.scaleX = this.imgBattleScaleX * imgBackgroundScaleX;
            this.imgBattle.scaleY = this.imgBattleScaleY * imgBackgroundScaleY;
            var imgSphereScaleX = zj.UIManager.StageWidth - 960 > 0 ? zj.UIManager.StageWidth / 960 : 1;
            var imgSphereScaleY = zj.UIManager.StageHeight - 640 > 0 ? zj.UIManager.StageHeight / 640 : 1;
            this.imgSphere.scaleX = imgSphereScaleX;
            this.imgSphere.scaleY = imgSphereScaleY + 0.05;
            var left = 50 * (zj.UIManager.StageWidth - 1080 > 0 ? zj.UIManager.StageWidth / 960 * 1.2 : 1);
            var right = 50 * (zj.UIManager.StageWidth - 1080 > 0 ? zj.UIManager.StageWidth / 960 * 2.2 : 1);
            this.groupUnionInfo.left = left;
            this.groupReady.right = right;
            this.groupBattle.right = right;
        };
        LeagueUnionBattleMain.prototype.update = function () {
            var _this = this;
            this.adaptScene();
            this.updateTips();
            if (this.status != zj.TableEnum.Enum.UnionBattleStatus.LadderNotRegistered && this.status != zj.TableEnum.Enum.UnionBattleStatus.FinalFourRegistered) {
                this.lbStartCountingDown.text = zj.PlayerLeagueSystem.GetTimeDiffShow(this.status)[0];
                var curSecond = zj.PlayerLeagueSystem.GetCurSecond();
                if (curSecond >= zj.CommonConfig.league_match_start_close_time[0] &&
                    curSecond < zj.CommonConfig.league_match_start_close_time[0] + zj.CommonConfig.league_match_match_opponent_time &&
                    zj.PlayerLeagueSystem.GetDay() != 7 &&
                    zj.Game.PlayerLeagueSystem.unionBattleInfo.isSignInAfternoon == false // 报名时间不是下午
                ) {
                    this.lbStartCountingDown.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.timeDiff[2], zj.PlayerLeagueSystem.GetMatchOpponentTime()); // 匹配倒计时
                }
                else if (curSecond == zj.CommonConfig.league_match_start_close_time[0] + zj.CommonConfig.league_match_match_opponent_time + 1) {
                    this.applyData(); // 匹配倒计时结束刷新面板
                }
                else if (curSecond == zj.CommonConfig.league_match_start_close_time[1]) {
                    zj.Game.PlayerLeagueSystem.unionBattleInfo.isEmpty = false;
                    zj.Game.PlayerLeagueSystem.unionBattleInfo.isSignInAfternoon = false;
                    if (zj.PlayerLeagueSystem.GetDay() == 6) {
                        zj.Game.PlayerLeagueSystem.BaseInfo.match_join = false;
                    }
                    zj.Game.PlayerLeagueSystem.leagueInfo().then(function () {
                        _this.applyData();
                    });
                }
            }
        };
        // 一分钟刷新一次界面
        LeagueUnionBattleMain.prototype.update2 = function () {
            this.applyData();
        };
        // 红点刷新
        LeagueUnionBattleMain.prototype.updateTips = function () {
            var _this = this;
            var bTips = zj.Tips.GetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.LEAGUE_DEFENCE_FORMATE);
            this.imgTip1.visible = bTips;
            this.imgTip3.visible = bTips;
            if (this.isPop == false && bTips && !this.groupPop.visible) {
                this.groupPop.visible = true;
                this.isPop = true;
                setTimeout(function () {
                    _this.groupPop.visible = false;
                }, 3000);
            }
            if (this.isPop2 == false && zj.Game.PlayerLeagueSystem.BaseInfo && !zj.Game.PlayerLeagueSystem.BaseInfo.match_join && !this.groupPop.visible &&
                (this.userOfID == message.ELeagueOfficial.LEAGUE_OFFICIAL_ELDER || this.userOfID == message.ELeagueOfficial.LEAGUE_OFFICIAL_LEADER)) {
                this.groupPop2.visible = true;
                this.isPop2 = true;
                setTimeout(function () {
                    _this.groupPop2.visible = false;
                }, 3000);
            }
            var bTips2 = zj.Tips.GetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.MATCH_MALL);
            this.imgTip2.visible = bTips2;
        };
        // 申请数据
        LeagueUnionBattleMain.prototype.applyData = function () {
            var _this = this;
            var total = 0; // 计数
            var current = 0;
            if (zj.PlayerLeagueSystem.IsTimeInBattle()) {
                total = total + 1;
            }
            if (total == 0)
                this.setInfo();
            if (zj.PlayerLeagueSystem.IsTimeInBattle()) {
                zj.Game.PlayerLeagueSystem.leagueMatchOpponentInfo().then(function (resp) {
                    if (resp.is_air) {
                        zj.Game.PlayerLeagueSystem.unionBattleInfo.isEmpty = true;
                    }
                    else {
                        zj.Game.PlayerLeagueSystem.unionBattleInfo.isEmpty = false;
                        zj.Game.PlayerLeagueSystem.unionBattleInfo.EnemyUnionInfo = resp.opponentInfo;
                    }
                    current = current + 1;
                    if (current == total)
                        _this.setInfo();
                }).catch(function () {
                    current = current + 1;
                    if (current == total)
                        _this.setInfo();
                });
            }
        };
        LeagueUnionBattleMain.prototype.setInfo = function () {
            this.setBookmarks();
            this.status = zj.PlayerLeagueSystem.getStatus();
            zj.Game.PlayerLeagueSystem.unionBattleInfo.UnionStatus = this.status;
            // 判断是否需要弹出上场结算
            if (zj.PlayerLeagueSystem.PushLastSettle()) {
                zj.Game.PlayerLeagueSystem.leagueMatchBattleResult(0).then(function (resp) {
                    if (resp.header.result != 0) {
                        zj.loadUI(zj.LeagueUnionDailySettlement)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                            dialog.updatePanel(resp.body.battleResult);
                        });
                    }
                });
            }
            this.setPanel();
            zj.Tips.SetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.LEAGUE_ENTRANCE);
        };
        LeagueUnionBattleMain.prototype.setPanel = function () {
            var isLadderNotRegistered = (this.status == zj.TableEnum.Enum.UnionBattleStatus.LadderNotRegistered);
            var isLadderRegistered = (this.status == zj.TableEnum.Enum.UnionBattleStatus.LadderRegistered);
            var isBattle = (this.status == zj.TableEnum.Enum.UnionBattleStatus.Battle);
            var isFinalFourRegistered = (this.status == zj.TableEnum.Enum.UnionBattleStatus.FinalFourRegistered);
            var isFinalFourNotRegistered = (this.status == zj.TableEnum.Enum.UnionBattleStatus.FinalFourNotRegistered);
            // 提示气泡
            this.groupPop.visible = false;
            // 提示气泡2
            this.groupPop2.visible = false;
            // 战斗背景
            this.imgBattle.visible = isBattle;
            // 战斗时的红色遮罩
            this.imgSphere.visible = isBattle;
            // 战斗积分条
            this.groupBattleSide.visible = isBattle;
            // 非战斗背景
            this.imgReady.visible = !isBattle;
            // 战斗group
            this.groupBattle.visible = isBattle;
            // 非战斗group
            this.groupReady.visible = !isBattle;
            // 公会状态按钮
            this.btnBattleSate.visible = isBattle;
            // 设置阵容按钮group
            this.groupSetLineUp.visible = !isBattle;
            // 准备状态
            this.imgReadyState.visible = (isLadderRegistered && !zj.Game.PlayerLeagueSystem.unionBattleInfo.isEmpty); // 准备状态并且没有轮空
            // 战斗状态
            this.imgBattleState.visible = isBattle;
            // 轮空状态
            this.imgBattleEmpty.visible = zj.Game.PlayerLeagueSystem.unionBattleInfo.isEmpty;
            // 我的阵容
            this.groupMyFormation.visible = isBattle;
            // 战斗记录按钮
            this.btnBattleRecord.visible = isBattle;
            // 已报名图标
            this.imgRegistered.visible = isLadderRegistered;
            // 报名按钮group
            this.groupSignUp.visible = isLadderNotRegistered;
            // 报名消耗
            this.lbSignUpConsume.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.SignUpConsume, zj.CommonConfig.league_match_sign_consume_enliven);
            // 倒计时
            if (isBattle || isLadderRegistered) {
                this.groupBattleTimeDisplay.visible = true;
                this.lbStartCountingDown.text = zj.PlayerLeagueSystem.GetTimeDiffShow(this.status)[0];
            }
            else {
                this.groupBattleTimeDisplay.visible = false;
            }
            // 信息面板设置
            if (isBattle) {
                this.imgUnionInfoBG.source = zj.cachekey(zj.UIConfig.UIConfig_Union.main.BattleHoloInfoBboard, this);
                this.imgUnionInfoName.source = zj.cachekey(zj.UIConfig.UIConfig_Union.infoPanel[6], this);
                this.imgUnionInfoServer.source = zj.cachekey(zj.UIConfig.UIConfig_Union.infoPanel[7], this);
                this.imgUnionInfoSegment.source = zj.cachekey(zj.UIConfig.UIConfig_Union.infoPanel[8], this);
                this.imgUnionInfoScore.source = zj.cachekey(zj.UIConfig.UIConfig_Union.infoPanel[9], this);
                this.imgUnionInfoRank.source = zj.cachekey(zj.UIConfig.UIConfig_Union.infoPanel[10], this);
                this.stageOfBattle();
            }
            else {
                this.imgUnionInfoBG.source = zj.cachekey(zj.UIConfig.UIConfig_Union.main.HoloInfoBboard, this);
                this.imgUnionInfoName.source = zj.cachekey(zj.UIConfig.UIConfig_Union.infoPanel[1], this);
                this.imgUnionInfoServer.source = zj.cachekey(zj.UIConfig.UIConfig_Union.infoPanel[2], this);
                this.imgUnionInfoSegment.source = zj.cachekey(zj.UIConfig.UIConfig_Union.infoPanel[3], this);
                this.imgUnionInfoScore.source = zj.cachekey(zj.UIConfig.UIConfig_Union.infoPanel[4], this);
                this.imgUnionInfoRank.source = zj.cachekey(zj.UIConfig.UIConfig_Union.infoPanel[5], this);
                this.stageOfReady();
            }
        };
        /* ************************** 通用 ************************** */
        LeagueUnionBattleMain.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        // 设置顶部页签
        LeagueUnionBattleMain.prototype.setBookmarks = function () {
            var wDay = zj.PlayerLeagueSystem.GetDay();
            var textColor = 0x5B2205;
            switch (wDay) {
                case 1:
                    this.imgBookmark1.source = zj.cachekey(zj.UIConfig.UIConfig_Union.main.curBookmark, this);
                    this.lbBookmark1.textColor = textColor;
                    break;
                case 2:
                    this.imgBookmark2.source = zj.cachekey(zj.UIConfig.UIConfig_Union.main.curBookmark, this);
                    this.lbBookmark2.textColor = textColor;
                    break;
                case 3:
                    this.imgBookmark3.source = zj.cachekey(zj.UIConfig.UIConfig_Union.main.curBookmark, this);
                    this.lbBookmark3.textColor = textColor;
                    break;
                case 4:
                    this.imgBookmark4.source = zj.cachekey(zj.UIConfig.UIConfig_Union.main.curBookmark, this);
                    this.lbBookmark4.textColor = textColor;
                    break;
                case 5:
                    this.imgBookmark5.source = zj.cachekey(zj.UIConfig.UIConfig_Union.main.curBookmark, this);
                    this.lbBookmark5.textColor = textColor;
                    break;
                case 6:
                    this.imgBookmark6.source = zj.cachekey(zj.UIConfig.UIConfig_Union.main.curBookmark, this);
                    this.lbBookmark6.textColor = textColor;
                    break;
                case 7:
                    this.imgBookmark7.source = zj.cachekey(zj.UIConfig.UIConfig_Union.main.curBookmark, this);
                    this.lbBookmark7.textColor = textColor;
                    break;
            }
        };
        // 玩法说明
        LeagueUnionBattleMain.prototype.onBtnPlayDes = function () {
            var _this = this;
            egret.Tween.get(this.btnPlayDes).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(function () {
                zj.loadUI(zj.Common_RuleDialog)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.init(zj.RuleConfig.UnionBattle);
                });
                egret.Tween.get(_this.btnPlayDes).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        };
        // 历史战绩
        LeagueUnionBattleMain.prototype.onBtnLastSettlement = function () {
            var _this = this;
            egret.Tween.get(this.btnLastSettlement).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(function () {
                zj.loadUI(zj.LeagueUnionBattleHisRecord)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
                egret.Tween.get(_this.btnLastSettlement).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        };
        // 战功商店
        LeagueUnionBattleMain.prototype.onBtnMall = function () {
            var _this = this;
            egret.Tween.get(this.btnMall).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(function () {
                zj.loadUI(zj.LeagueMatchMallMain)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
                egret.Tween.get(_this.btnMall).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        };
        // 公会排行
        LeagueUnionBattleMain.prototype.onBtnUnionRank = function () {
            var _this = this;
            // toast("公会排行");
            egret.Tween.get(this.btnUnionRank).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(function () {
                zj.loadUI(zj.LeagueUnionBattleRank)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
                egret.Tween.get(_this.btnUnionRank).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        };
        // 奖励预览
        LeagueUnionBattleMain.prototype.onBtnRewardPreview = function () {
            var _this = this;
            egret.Tween.get(this.btnRewardPreview).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(function () {
                zj.loadUI(zj.LeagueUnionRewardPreview)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
                egret.Tween.get(_this.btnRewardPreview).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        };
        /* ********************************************************* */
        /* ************************ 准备阶段 ************************ */
        LeagueUnionBattleMain.prototype.stageOfReady = function () {
            this.readySetUnionInfoPanel();
            this.applyShipInfo();
        };
        LeagueUnionBattleMain.prototype.readySetUnionInfoPanel = function () {
            var leagueBase = zj.Game.PlayerLeagueSystem.BaseInfo;
            this.lbInfoUnionName.text = leagueBase.name;
            this.lbInfoServerName.text = zj.PlayerLeagueSystem.GetServerName(zj.Game.Controller.selectedGroup().group_name);
            this.imgInfoSegment.source = zj.cachekey(zj.PlayerLeagueSystem.GetSegment(leagueBase.match_score)[4], this);
            this.lbInfoRankScore.text = leagueBase.match_score.toString();
            this.lbInfoThisSerRank.text = leagueBase.match_rank.toString();
        };
        LeagueUnionBattleMain.prototype.applyShipInfo = function () {
            var _this = this;
            zj.Game.PlayerLeagueSystem.leagueMatchFortress(6, false).then(function (resp) {
                var info = resp.leagueFortress.leagueFortress;
                _this.readyDefendInfo = {};
                for (var _i = 0, info_1 = info; _i < info_1.length; _i++) {
                    var v = info_1[_i];
                    if (_this.readyDefendInfo[v.type] == undefined) {
                        _this.readyDefendInfo[v.type] = [];
                    }
                    _this.readyDefendInfo[v.type].push(v);
                }
                _this.setAirshipOur();
            });
        };
        LeagueUnionBattleMain.prototype.setAirshipOur = function (bool) {
            if (bool === void 0) { bool = false; }
            this.readyAirship = {};
            for (var i = 1; i <= zj.CommonConfig.league_match_fortress_team_num.length; i++) {
                var airship = new UnionBattleAirshipOur(i, this.readyDefendInfo[i] == undefined ? 0 : this.readyDefendInfo[i].length);
                switch (i) {
                    case 1:
                        this.lbAirship1.textFlow = zj.Util.RichText(airship.getDefendLabelString());
                        break;
                    case 2:
                        this.lbAirship2.textFlow = zj.Util.RichText(airship.getDefendLabelString());
                        break;
                    case 3:
                        this.lbAirship3.textFlow = zj.Util.RichText(airship.getDefendLabelString());
                        break;
                    case 4:
                        this.lbAirship4.textFlow = zj.Util.RichText(airship.getDefendLabelString());
                        break;
                    case 5:
                        this.lbAirship5.textFlow = zj.Util.RichText(airship.getDefendLabelString());
                        break;
                }
                this.readyAirship[i] = airship;
            }
            ;
            this.selectShip(this.shipFocus);
        };
        LeagueUnionBattleMain.prototype.playAnimation = function (index) {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, "xuanzhong_eff", "armatureName", null, 0)
                .then(function (display) {
                switch (index) {
                    case 1:
                        var ani1 = _this.groupBigAirship.getChildByName("ani1");
                        if (!ani1) {
                            display.x = _this.groupBigAirship.width / 2;
                            display.y = _this.groupBigAirship.height / 2;
                            display.name = "ani1";
                            _this.groupBigAirship.addChild(display);
                        }
                        break;
                    case 2:
                        var ani2 = _this.groupAirshipLeft.getChildByName("ani2");
                        if (!ani2) {
                            display.x = _this.groupAirshipLeft.width / 2;
                            display.y = _this.groupAirshipLeft.height / 2;
                            display.scaleX = 0.9;
                            display.scaleY = 0.9;
                            display.name = "ani2";
                            _this.groupAirshipLeft.addChild(display);
                        }
                        break;
                    case 3:
                        var ani3 = _this.groupAirshipRight.getChildByName("ani3");
                        if (!ani3) {
                            display.x = _this.groupAirshipRight.width / 2;
                            display.y = _this.groupAirshipRight.height / 2;
                            display.scaleX = 0.9;
                            display.scaleY = 0.9;
                            display.name = "ani3";
                            _this.groupAirshipRight.addChild(display);
                        }
                        break;
                    case 4:
                        var ani4 = _this.groupSmallAirshipLeft.getChildByName("ani4");
                        if (!ani4) {
                            display.x = _this.groupSmallAirshipLeft.width / 2;
                            display.y = _this.groupSmallAirshipLeft.height / 2;
                            display.scaleX = 0.7;
                            display.scaleY = 0.7;
                            display.name = "ani4";
                            _this.groupSmallAirshipLeft.addChild(display);
                        }
                        break;
                    case 5:
                        var ani5 = _this.groupSmallAirshipRight.getChildByName("ani5");
                        if (!ani5) {
                            display.x = _this.groupSmallAirshipRight.width / 2;
                            display.y = _this.groupSmallAirshipRight.height / 2;
                            display.scaleX = 0.7;
                            display.scaleY = 0.7;
                            display.name = "ani5";
                            _this.groupSmallAirshipRight.addChild(display);
                        }
                        break;
                }
            });
        };
        LeagueUnionBattleMain.prototype.stopAnimation = function (index) {
            switch (index) {
                case 1:
                    var ani1 = this.groupBigAirship.getChildByName("ani1");
                    if (ani1)
                        this.groupBigAirship.removeChild(ani1);
                    break;
                case 2:
                    var ani2 = this.groupAirshipLeft.getChildByName("ani2");
                    if (ani2)
                        this.groupAirshipLeft.removeChild(ani2);
                    break;
                case 3:
                    var ani3 = this.groupAirshipRight.getChildByName("ani3");
                    if (ani3)
                        this.groupAirshipRight.removeChild(ani3);
                    break;
                case 4:
                    var ani4 = this.groupSmallAirshipLeft.getChildByName("ani4");
                    if (ani4)
                        this.groupSmallAirshipLeft.removeChild(ani4);
                    break;
                case 5:
                    var ani5 = this.groupSmallAirshipRight.getChildByName("ani5");
                    if (ani5)
                        this.groupSmallAirshipRight.removeChild(ani5);
                    break;
            }
        };
        LeagueUnionBattleMain.prototype.readyAirShipSelect = function (index) {
            for (var k in this.readyAirship) {
                this.stopAnimation(Number(k));
                switch (Number(k)) {
                    case 1:
                        this.imgAirship1.source = zj.cachekey(this.readyAirship[k].getDefaultTexturePath(), this);
                        break;
                    case 2:
                        this.imgAirship2.source = zj.cachekey(this.readyAirship[k].getDefaultTexturePath(), this);
                        break;
                    case 3:
                        this.imgAirship3.source = zj.cachekey(this.readyAirship[k].getDefaultTexturePath(), this);
                        break;
                    case 4:
                        this.imgAirship4.source = zj.cachekey(this.readyAirship[k].getDefaultTexturePath(), this);
                        break;
                    case 5:
                        this.imgAirship5.source = zj.cachekey(this.readyAirship[k].getDefaultTexturePath(), this);
                        break;
                }
            }
            switch (index) {
                case 1:
                    this.imgAirship1.source = zj.cachekey(this.readyAirship[index].getSelectedTexturePath(), this);
                    break;
                case 2:
                    this.imgAirship2.source = zj.cachekey(this.readyAirship[index].getSelectedTexturePath(), this);
                    break;
                case 3:
                    this.imgAirship3.source = zj.cachekey(this.readyAirship[index].getSelectedTexturePath(), this);
                    break;
                case 4:
                    this.imgAirship4.source = zj.cachekey(this.readyAirship[index].getSelectedTexturePath(), this);
                    break;
                case 5:
                    this.imgAirship5.source = zj.cachekey(this.readyAirship[index].getSelectedTexturePath(), this);
                    break;
            }
            this.playAnimation(index);
        };
        // 刷新飞艇信息面板
        LeagueUnionBattleMain.prototype.updateAirshipInfoPanel = function (index) {
            var airship = this.readyAirship[index];
            this.currentShipType = index;
            this.lbInfoName.textFlow = zj.Util.RichText(airship.getName()); //Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Match.airshipInfo[0], airship.getName()));
            this.lbInfoLevel.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.airshipInfo[1], airship.getLevel());
            this.lbInfoNumber.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.airshipInfo[2], zj.PlayerLeagueSystem.GetMaxScore(airship.getIndex()), zj.PlayerLeagueSystem.GetMaxScore(airship.getIndex()));
            this.lbInfoDefend.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.airshipInfo[3], airship.getDefendInfo()));
            // 是否是会长和副会长
            var isLeader = (this.userOfID == message.ELeagueOfficial.LEAGUE_OFFICIAL_ELDER || this.userOfID == message.ELeagueOfficial.LEAGUE_OFFICIAL_LEADER);
            this.btnViewSet.visible = isLeader;
            this.btnViewDetails.visible = !isLeader;
            var defendCount = 0;
            for (var k in this.readyDefendInfo) {
                defendCount = defendCount + this.readyDefendInfo[k].length;
            }
            this.lbDefendTeam.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.defendTeams, defendCount.toString());
        };
        LeagueUnionBattleMain.prototype.selectShip = function (index) {
            this.shipFocus = index;
            this.readyAirShipSelect(index);
            this.updateAirshipInfoPanel(index);
        };
        LeagueUnionBattleMain.prototype.onGroupBigAirship = function () {
            var index = message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_HARD;
            this.selectShip(index);
        };
        LeagueUnionBattleMain.prototype.onGroupAirshipLeft = function () {
            var index = message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_COMMON_ONE;
            this.selectShip(index);
        };
        LeagueUnionBattleMain.prototype.onGroupAirshipRight = function () {
            var index = message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_COMMON_TWO;
            this.selectShip(index);
        };
        LeagueUnionBattleMain.prototype.onGroupSmallAirshipLeft = function () {
            var index = message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_EASY_ONE;
            this.selectShip(index);
        };
        LeagueUnionBattleMain.prototype.onGroupSmallAirshipRight = function () {
            var index = message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_EASY_TWO;
            this.selectShip(index);
        };
        // 查看详情
        LeagueUnionBattleMain.prototype.onBtnViewDetails = function () {
            var _this = this;
            // toast("查看详情");
            egret.Tween.get(this.btnViewDetails).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(function () {
                zj.loadUI(zj.LeagueMatchMemberFormation)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(_this.currentShipType);
                });
                egret.Tween.get(_this.btnViewDetails).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        };
        // 布置防守
        LeagueUnionBattleMain.prototype.onBtnViewSet = function () {
            var _this = this;
            // toast("布置防守");
            egret.Tween.get(this.btnViewSet).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(function () {
                zj.loadUI(zj.LeagueMatchSelectDefenceFormation)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(_this.currentShipType);
                });
                egret.Tween.get(_this.btnViewSet).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        };
        // 设置阵容
        LeagueUnionBattleMain.prototype.onBtnSetLineUp = function () {
            var _this = this;
            // toast("我的阵容");
            egret.Tween.get(this.btnSetLineUp).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(function () {
                // "HXH_CommonFormationPvpMatch"
                zj.Game.PlayerInstanceSystem.curInstanceType = 25;
                zj.loadUI(zj.CommonFormationPvpMatch)
                    .then(function (dialog) {
                    var isBattle = (_this.status == zj.TableEnum.Enum.UnionBattleStatus.Battle);
                    dialog.setState(isBattle);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
                egret.Tween.get(_this.btnSetLineUp).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        };
        // 报名
        LeagueUnionBattleMain.prototype.onBtnSignUP = function () {
            var _this = this;
            egret.Tween.get(this.lbSignUpConsume).to({ scaleX: 1.1, scaleY: 1.1 }, 120);
            egret.Tween.get(this.btnSignUP).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(function () {
                if (_this.userOfID != message.ELeagueOfficial.LEAGUE_OFFICIAL_ELDER && _this.userOfID != message.ELeagueOfficial.LEAGUE_OFFICIAL_LEADER) {
                    zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Match.sign_conditions[0]));
                    return;
                }
                if (zj.Game.PlayerLeagueSystem.BaseInfo.curNum < zj.CommonConfig.league_match_limit_members) {
                    var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.sign_conditions[1], zj.CommonConfig.league_match_limit_members);
                    zj.toast_warning(str);
                    return;
                }
                if (zj.Game.PlayerLeagueSystem.BaseInfo.enliven_all < zj.CommonConfig.league_match_sign_consume_enliven) {
                    var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.sign_conditions[3], zj.CommonConfig.league_match_sign_consume_enliven);
                    zj.toast_warning(str);
                    return;
                }
                var count = 0;
                for (var k in _this.readyAirship) {
                    if (_this.readyAirship[k].getDefendNumber() == 0) {
                        zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Match.sign_conditions[4]));
                        return;
                    }
                    count = count + _this.readyAirship[k].getDefendNumber();
                }
                if (zj.Game.PlayerLeagueSystem.BaseInfo.level < zj.CommonConfig.league_match_join_limit_level) {
                    var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.sign_conditions[5], zj.CommonConfig.league_match_join_limit_level);
                    zj.toast_warning(str);
                    return;
                }
                zj.Game.PlayerLeagueSystem.leagueMatchSign().then(function () {
                    _this.update2();
                    zj.toast(zj.LANG(zj.TextsConfig.TextsConfig_Match.sign_success));
                    var currentSecond = zj.PlayerLeagueSystem.GetCurSecond(true);
                    if (currentSecond >= zj.CommonConfig.league_match_start_close_time[0]) {
                        zj.Game.PlayerLeagueSystem.unionBattleInfo.isSignInAfternoon = true;
                    }
                });
                egret.Tween.get(_this.lbSignUpConsume).to({ scaleX: 1, scaleY: 1 }, 100);
                egret.Tween.get(_this.btnSignUP).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        };
        /* ********************************************************* */
        /* ************************ 战斗阶段 ************************ */
        LeagueUnionBattleMain.prototype.stageOfBattle = function (bool) {
            if (bool === void 0) { bool = false; }
            this.enemyUnionInfo = zj.Game.PlayerLeagueSystem.unionBattleInfo.EnemyUnionInfo;
            this.battleSetUnionInfoPanel(bool);
        };
        LeagueUnionBattleMain.prototype.applyBattleInfo = function (bool) {
            var _this = this;
            if (bool === void 0) { bool = false; }
            this.starred = [[], [], [], [], []]; // 获得星星信息
            this.enemyStarred = [[], [], [], [], []]; // 敌方获得星星信息
            zj.Game.PlayerLeagueSystem.leagueMatchOpponentFortress(this.enemyUnionInfo.leagueId, 1).then(function (resp) {
                var battleInfo = resp.battleInfo.fortressStar;
                var enemyInfo = resp.matchInfo.fortressStar;
                // 筛选重复数据
                var enemyDataFilter = [];
                for (var _i = 0, enemyInfo_1 = enemyInfo; _i < enemyInfo_1.length; _i++) {
                    var v = enemyInfo_1[_i];
                    var has = false;
                    for (var _a = 0, enemyDataFilter_1 = enemyDataFilter; _a < enemyDataFilter_1.length; _a++) {
                        var vv = enemyDataFilter_1[_a];
                        if (v.key == vv.key) {
                            has = true;
                        }
                    }
                    if (!has) {
                        enemyDataFilter.push(v);
                    }
                }
                var ourDataFilter = [];
                for (var _b = 0, battleInfo_1 = battleInfo; _b < battleInfo_1.length; _b++) {
                    var v = battleInfo_1[_b];
                    var has = false;
                    for (var _c = 0, ourDataFilter_1 = ourDataFilter; _c < ourDataFilter_1.length; _c++) {
                        var vv = ourDataFilter_1[_c];
                        if (v.key == vv.key) {
                            has = true;
                        }
                    }
                    if (!has) {
                        ourDataFilter.push(v);
                    }
                }
                // 格式化
                for (var _d = 0, ourDataFilter_2 = ourDataFilter; _d < ourDataFilter_2.length; _d++) {
                    var v = ourDataFilter_2[_d];
                    _this.starred[Math.floor(v.key / 100) - 1].push(v.value);
                }
                for (var _e = 0, enemyDataFilter_2 = enemyDataFilter; _e < enemyDataFilter_2.length; _e++) {
                    var v = enemyDataFilter_2[_e];
                    _this.enemyStarred[Math.floor(v.key / 100) - 1].push(v.value);
                }
                _this.setAirshipEnemy(bool);
                _this.setScoreBar();
            });
        };
        // 信息面板
        LeagueUnionBattleMain.prototype.battleSetUnionInfoPanel = function (bool) {
            if (bool === void 0) { bool = false; }
            var info = this.enemyUnionInfo;
            this.lbInfoUnionName.text = info.leagueName;
            this.lbInfoServerName.text = zj.PlayerLeagueSystem.GetServerName(info.group_name);
            this.imgInfoSegment.source = zj.cachekey(zj.PlayerLeagueSystem.GetSegment(info.score)[4], this);
            this.lbInfoRankScore.text = info.score.toString();
            this.lbInfoThisSerRank.text = info.rank_self.toString();
            this.applyBattleInfo(bool);
        };
        // 顶部积分条
        LeagueUnionBattleMain.prototype.setScoreBar = function () {
            var ourScore = zj.PlayerLeagueSystem.ScoreCalculation(this.starred); // 我方得分
            var enemyScore = zj.PlayerLeagueSystem.ScoreCalculation(this.enemyStarred); // 敌方得分
            this.ourCurrentScore = ourScore;
            this.enemyCurrentScore = enemyScore;
            var leagueBase = zj.Game.PlayerLeagueSystem.BaseInfo;
            this.rectBattleOurLoadingBarMask.width = (zj.PlayerLeagueSystem.GetMaxScore() - enemyScore) / zj.PlayerLeagueSystem.GetMaxScore() * this.imgBattleOurLoadingBar.width;
            this.rectBattleEnemyLoadingBarMask.width = (zj.PlayerLeagueSystem.GetMaxScore() - ourScore) / zj.PlayerLeagueSystem.GetMaxScore() * this.imgBattleEnemyLoadingBar.width;
            this.rectBattleOurLoadingBarMask.visible = true;
            this.rectBattleEnemyLoadingBarMask.visible = true;
            this.imgBattleOurLoadingBar.mask = this.rectBattleOurLoadingBarMask;
            this.imgBattleEnemyLoadingBar.mask = this.rectBattleEnemyLoadingBarMask;
            this.lbBattleOurScore.text = (zj.PlayerLeagueSystem.GetMaxScore() - enemyScore).toString();
            this.lbBattleEnemyScore.text = (zj.PlayerLeagueSystem.GetMaxScore() - ourScore).toString();
            if (ourScore == enemyScore) {
                this.imgBattleStateLogo.source = zj.cachekey(zj.UIConfig.UIConfig_Union.main.VS_draw, this);
            }
            else if (ourScore < enemyScore) {
                this.imgBattleStateLogo.source = zj.cachekey(zj.UIConfig.UIConfig_Union.main.VS_enemyWin, this);
            }
            else {
                this.imgBattleStateLogo.source = zj.cachekey(zj.UIConfig.UIConfig_Union.main.VS_ourWin, this);
            }
            this.lbAtkTime.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.scoreBar[0], zj.CommonConfig.league_match_member_attack_times - zj.Game.PlayerLeagueSystem.Member.dailyMatchBattleWinTime, zj.CommonConfig.league_match_member_attack_times);
        };
        LeagueUnionBattleMain.prototype.playBattleAnimation = function (index) {
            var _this = this;
            var animation = "";
            switch (index) {
                case 1:
                    animation = "battle";
                    break;
                case 2:
                    animation = "battle2";
                    break;
                case 3:
                    animation = "battle3";
                    break;
                case 4:
                    animation = "battle4";
                    break;
                case 5:
                    animation = "battle5";
                    break;
            }
            zj.Game.DragonBonesManager.playAnimation(this, "cj_bangzhan_feiting", "armatureName", animation, 0)
                .then(function (display) {
                switch (index) {
                    case 1:
                        var ani1 = _this.groupSpine1.getChildByName("ani1");
                        if (!ani1) {
                            display.x = _this.groupSpine1.width / 2;
                            display.y = _this.groupSpine1.height / 2;
                            display.name = "ani1";
                            _this.groupSpine1.addChildAt(display, 0);
                            _this.imgBattleAirship1.visible = false;
                        }
                        break;
                    case 2:
                        var ani2 = _this.groupSpine2.getChildByName("ani2");
                        if (!ani2) {
                            display.x = _this.groupSpine2.width / 2;
                            display.y = _this.groupSpine2.height / 2;
                            display.name = "ani2";
                            _this.groupSpine2.addChildAt(display, 0);
                            _this.imgBattleAirship2.visible = false;
                        }
                        break;
                    case 3:
                        var ani3 = _this.groupSpine3.getChildByName("ani3");
                        if (!ani3) {
                            display.x = _this.groupSpine3.width / 2;
                            display.y = _this.groupSpine3.height / 2;
                            display.name = "ani3";
                            _this.groupSpine3.addChildAt(display, 0);
                            _this.imgBattleAirship3.visible = false;
                        }
                        break;
                    case 4:
                        var ani4 = _this.groupSpine4.getChildByName("ani4");
                        if (!ani4) {
                            display.x = _this.groupSpine4.width / 2;
                            display.y = _this.groupSpine4.height / 2;
                            display.name = "ani4";
                            _this.groupSpine4.addChildAt(display, 0);
                            _this.imgBattleAirship4.visible = false;
                        }
                        break;
                    case 5:
                        var ani5 = _this.groupSpine5.getChildByName("ani5");
                        if (!ani5) {
                            display.x = _this.groupSpine5.width / 2;
                            display.y = _this.groupSpine5.height / 2;
                            display.name = "ani5";
                            _this.groupSpine5.addChildAt(display, 0);
                            _this.imgBattleAirship5.visible = false;
                        }
                        break;
                }
            });
            zj.Game.DragonBonesManager.playAnimation(this, "xuanzhong_eff", "armatureName", "001_xuanzhong2", 0)
                .then(function (display) {
                switch (index) {
                    case 1:
                        var ani1 = _this.groupSpine1.getChildByName("ani11");
                        if (!ani1) {
                            display.x = _this.groupSpine1.width / 2;
                            display.y = _this.groupSpine1.height / 2;
                            display.name = "ani11";
                            _this.groupSpine1.addChild(display);
                        }
                        break;
                    case 2:
                        var ani2 = _this.groupSpine2.getChildByName("ani21");
                        if (!ani2) {
                            display.x = _this.groupSpine2.width / 2;
                            display.y = _this.groupSpine2.height / 2;
                            display.scaleX = 0.9;
                            display.scaleY = 0.9;
                            display.name = "ani21";
                            _this.groupSpine2.addChild(display);
                        }
                        break;
                    case 3:
                        var ani3 = _this.groupSpine3.getChildByName("ani31");
                        if (!ani3) {
                            display.x = _this.groupSpine3.width / 2;
                            display.y = _this.groupSpine3.height / 2;
                            display.scaleX = 0.9;
                            display.scaleY = 0.9;
                            display.name = "ani31";
                            _this.groupSpine3.addChild(display);
                        }
                        break;
                    case 4:
                        var ani4 = _this.groupSpine4.getChildByName("ani41");
                        if (!ani4) {
                            display.x = _this.groupSpine4.width / 2;
                            display.y = _this.groupSpine4.height / 2;
                            display.scaleX = 0.7;
                            display.scaleY = 0.7;
                            display.name = "ani41";
                            _this.groupSpine4.addChild(display);
                        }
                        break;
                    case 5:
                        var ani5 = _this.groupSpine5.getChildByName("ani51");
                        if (!ani5) {
                            display.x = _this.groupSpine5.width / 2;
                            display.y = _this.groupSpine5.height / 2;
                            display.scaleX = 0.7;
                            display.scaleY = 0.7;
                            display.name = "ani51";
                            _this.groupSpine5.addChild(display);
                        }
                        break;
                }
            });
        };
        LeagueUnionBattleMain.prototype.setAirshipEnemy = function (bool) {
            var setStarInfo = function (index, starInfo) {
                var starNumber = 0; // 当前已被打星星数
                var currentScore = 0; // 当前已被打分数
                for (var _i = 0, starInfo_1 = starInfo; _i < starInfo_1.length; _i++) {
                    var v = starInfo_1[_i];
                    starNumber = starNumber + v;
                    currentScore = currentScore + zj.CommonConfig.league_match_fortress_star_socre[index - 1][v - 1];
                }
                if (starInfo.length == zj.CommonConfig.league_match_fortress_team_num[index - 1]) {
                    currentScore = currentScore + zj.CommonConfig.league_match_fortress_extra_socre[index - 1];
                }
                return [starNumber, currentScore];
            };
            for (var i = 1; i <= zj.CommonConfig.league_match_fortress_team_num.length; i++) {
                this.playBattleAnimation(i);
                switch (i) {
                    case 1:
                        this.lbGetStarNum1.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.starInfoGreen, zj.PlayerLeagueSystem.GetMaxScore(i) - setStarInfo(i, this.starred[i - 1])[1], zj.PlayerLeagueSystem.GetMaxScore(i)));
                        break;
                    case 2:
                        this.lbGetStarNum2.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.starInfoGreen, zj.PlayerLeagueSystem.GetMaxScore(i) - setStarInfo(i, this.starred[i - 1])[1], zj.PlayerLeagueSystem.GetMaxScore(i)));
                        break;
                    case 3:
                        this.lbGetStarNum3.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.starInfoGreen, zj.PlayerLeagueSystem.GetMaxScore(i) - setStarInfo(i, this.starred[i - 1])[1], zj.PlayerLeagueSystem.GetMaxScore(i)));
                        break;
                    case 4:
                        this.lbGetStarNum4.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.starInfoGreen, zj.PlayerLeagueSystem.GetMaxScore(i) - setStarInfo(i, this.starred[i - 1])[1], zj.PlayerLeagueSystem.GetMaxScore(i)));
                        break;
                    case 5:
                        this.lbGetStarNum5.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.starInfoGreen, zj.PlayerLeagueSystem.GetMaxScore(i) - setStarInfo(i, this.starred[i - 1])[1], zj.PlayerLeagueSystem.GetMaxScore(i)));
                        break;
                }
            }
            ;
        };
        LeagueUnionBattleMain.prototype.onBtnBattleRecord = function () {
            var _this = this;
            // "HXH_MatchBattleRecord"
            egret.Tween.get(this.btnBattleRecord).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(function () {
                zj.loadUI(zj.LeagueMatchBattleRecord)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(_this.enemyUnionInfo.leagueId);
                });
                egret.Tween.get(_this.btnBattleRecord).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        };
        LeagueUnionBattleMain.prototype.onGroupSpine1 = function () {
            var index = message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_HARD;
            this.selectOpponent(index);
        };
        LeagueUnionBattleMain.prototype.onGroupSpine2 = function () {
            var index = message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_COMMON_ONE;
            this.selectOpponent(index);
        };
        LeagueUnionBattleMain.prototype.onGroupSpine3 = function () {
            var index = message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_COMMON_TWO;
            this.selectOpponent(index);
        };
        LeagueUnionBattleMain.prototype.onGroupSpine4 = function () {
            var index = message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_EASY_ONE;
            this.selectOpponent(index);
        };
        LeagueUnionBattleMain.prototype.onGroupSpine5 = function () {
            var index = message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_EASY_TWO;
            this.selectOpponent(index);
        };
        //公会状态
        LeagueUnionBattleMain.prototype.onBtnBattleSate = function () {
            var _this = this;
            // "HXH_UnionStatus"
            egret.Tween.get(this.btnBattleSate).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(function () {
                zj.loadUI(zj.LeagueUnionStatus)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
                egret.Tween.get(_this.btnBattleSate).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        };
        LeagueUnionBattleMain.prototype.onBtnMyFormation = function () {
            var _this = this;
            // toast("我的阵容");
            egret.Tween.get(this.btnMyFormation).to({ scaleX: 1.1, scaleY: 1.1 }, 120).call(function () {
                // "HXH_CommonFormationPvpMatch"
                zj.Game.PlayerInstanceSystem.curInstanceType = 25;
                zj.loadUI(zj.CommonFormationPvpMatch)
                    .then(function (dialog) {
                    var isBattle = (_this.status == zj.TableEnum.Enum.UnionBattleStatus.Battle);
                    dialog.setState(isBattle);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
                egret.Tween.get(_this.btnMyFormation).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        };
        LeagueUnionBattleMain.prototype.selectOpponent = function (index) {
            var _this = this;
            if (this.enemyUnionInfo != null) {
                zj.loadUI(zj.LeagueMatchSelectOpponent)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(index, _this.enemyUnionInfo, _this.ourCurrentScore, _this.enemyCurrentScore);
                });
            }
        };
        return LeagueUnionBattleMain;
    }(zj.Scene));
    zj.LeagueUnionBattleMain = LeagueUnionBattleMain;
    __reflect(LeagueUnionBattleMain.prototype, "zj.LeagueUnionBattleMain");
    // 己方飞艇
    var UnionBattleAirshipOur = (function () {
        function UnionBattleAirshipOur(index, infoDefend) {
            this.infoNumber = 0;
            this.infoDefend = 0;
            this.defaultTexturePath = "";
            this.selectedTexturePath = "";
            this.index = index;
            this.infoDefend = infoDefend;
            this.setInfo();
        }
        UnionBattleAirshipOur.prototype.setInfo = function () {
            if (this.index == message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_HARD) {
                this.defaultTexturePath = zj.UIConfig.UIConfig_Union.main.bigAirshipPic;
                this.selectedTexturePath = zj.UIConfig.UIConfig_Union.main.bigAirshipSelect;
                this.infoNumber = zj.CommonConfig.league_match_fortress_star_times[0];
            }
            else if (this.index == message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_COMMON_ONE || this.index == message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_COMMON_TWO) {
                this.defaultTexturePath = zj.UIConfig.UIConfig_Union.main.AirshipPic;
                this.selectedTexturePath = zj.UIConfig.UIConfig_Union.main.AirshipSelect;
                this.infoNumber = zj.CommonConfig.league_match_fortress_star_times[1];
            }
            else if (this.index == message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_EASY_ONE || this.index == message.LeagueFortressType.LEAGUE_FORTRESS_TYPE_EASY_TWO) {
                this.defaultTexturePath = zj.UIConfig.UIConfig_Union.main.smallAirshipPic;
                this.selectedTexturePath = zj.UIConfig.UIConfig_Union.main.smallAirshipSelect;
                this.infoNumber = zj.CommonConfig.league_match_fortress_star_times[3];
            }
        };
        UnionBattleAirshipOur.prototype.getIndex = function () {
            return this.index;
        };
        UnionBattleAirshipOur.prototype.getName = function () {
            return zj.TextsConfig.TextsConfig_Match.flyName[this.index - 1];
        };
        UnionBattleAirshipOur.prototype.getLevel = function () {
            return zj.TextsConfig.TextsConfig_Match.level[this.index - 1];
        };
        UnionBattleAirshipOur.prototype.getNumber = function () {
            return this.infoNumber;
        };
        UnionBattleAirshipOur.prototype.getDefendInfo = function () {
            var str = "";
            if (this.infoDefend < zj.CommonConfig.league_match_fortress_team_num[this.index - 1]) {
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.defendPeopleRed, this.infoDefend, zj.CommonConfig.league_match_fortress_team_num[this.index - 1]);
            }
            else {
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.defendPeople, this.infoDefend, zj.CommonConfig.league_match_fortress_team_num[this.index - 1]);
            }
            return str;
        };
        UnionBattleAirshipOur.prototype.getDefendNumber = function () {
            return this.infoDefend;
        };
        UnionBattleAirshipOur.prototype.getSelectedTexturePath = function () {
            return this.selectedTexturePath;
        };
        UnionBattleAirshipOur.prototype.getDefaultTexturePath = function () {
            return this.defaultTexturePath;
        };
        UnionBattleAirshipOur.prototype.getDefendLabelString = function () {
            if (this.infoDefend < zj.CommonConfig.league_match_fortress_team_num[this.index - 1]) {
                return (zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.defendPeopleRed, this.infoDefend, zj.CommonConfig.league_match_fortress_team_num[this.index - 1]));
            }
            else {
                return (zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.defendPeople, this.infoDefend, zj.CommonConfig.league_match_fortress_team_num[this.index - 1]));
            }
        };
        return UnionBattleAirshipOur;
    }());
    zj.UnionBattleAirshipOur = UnionBattleAirshipOur;
    __reflect(UnionBattleAirshipOur.prototype, "zj.UnionBattleAirshipOur");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueUnionBattleMain.js.map
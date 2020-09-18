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
    var ArenaLadder = (function (_super) {
        __extends(ArenaLadder, _super);
        function ArenaLadder() {
            var _this = _super.call(this) || this;
            _this.challengeTblNum = 0;
            _this.ladders = [];
            _this.currentNumber = 0;
            _this.buttonState = 0 /* ButtonNone */;
            _this.array = new eui.ArrayCollection();
            _this.rivalItems = [];
            _this.skinName = "resource/skins/arena/ArenaLadderSkin.exml";
            return _this;
        }
        ArenaLadder.prototype.init = function () {
            var _this = this;
            if (this.imgbg.width < zj.UIManager.StageWidth) {
                this.imgbg.width = zj.UIManager.StageWidth;
            }
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            this.btnDiamond.addEventListener(tap, this.onBtnDiamond, this);
            this.btnShop.addEventListener(tap, this.onBtnShop, this);
            this.btnRank.addEventListener(tap, this.onBtnRank, this);
            this.btnReport.addEventListener(tap, this.onBtnReport, this);
            this.btnAward.addEventListener(tap, this.onBtnAward, this);
            this.btnChange.addEventListener(tap, this.onBtnChange, this);
            this.btnBuy.addEventListener(tap, this.onBtnBuy, this);
            this.btnFormat.addEventListener(tap, this.onBtnFormat, this);
            this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnLeft, this);
            this.btnRight.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnRight, this);
            this.imgTipShop.visible = false;
            this.imgTipReport.visible = false;
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, this.refresh, this);
            this.listRival.useVirtualLayout = false;
            if (zj.Teach.isDone(zj.teachBattle.teachPartID_Arena) == false && zj.Teach.isDone(1003) == true) {
                zj.Teach.CheckAndSetTeach(zj.teachBattle.teachPartID_Arena);
            }
            this.update = egret.setInterval(this.UpdateTips, this, 1000);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.clearInterval(_this.update);
            }, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                _this.timer.stop();
            }, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, function () {
                _this.timer.stop();
            }, this);
            this.timer = new egret.Timer(1, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.update1, this);
            if (zj.Device.isReviewSwitch) {
                this.btnRank.visible = false;
                this.btnReport.visible = false;
                this.btnAward.visible = false;
                this.imgTipReport.visible = false;
                this.groupRanking.visible = false;
                this.jewel.x = 8;
                this.jewel.y = 0;
                this.jewel.width = 40;
                this.jewel.height = 40;
                this.btnDiamond.x = 100;
                this.btnDiamond.y = 3;
                this.btnDiamond.width = 30;
                this.btnDiamond.height = 30;
                this.imgConSume.width = 40;
                this.imgConSume.height = 40;
                this.imgConSume.y = 150;
                this.labelDiamondNumber.width = 85;
            }
        };
        ArenaLadder.prototype.onBtnLeft = function () {
            this.timerType = 1;
            this.timer.start();
        };
        ArenaLadder.prototype.onBtnRight = function () {
            this.timerType = 2;
            this.timer.start();
        };
        ArenaLadder.prototype.update1 = function () {
            if (this.timerType == 1 && this.scroll.viewport.scrollH <= 1450) {
                this.scroll.viewport.scrollH += 10;
            }
            else if (this.timerType == 2 && this.scroll.viewport.scrollH >= 0) {
                this.scroll.viewport.scrollH -= 10;
            }
            else {
                this.timer.stop();
            }
        };
        ArenaLadder.prototype.isFullScreen = function () {
            return true;
        };
        ArenaLadder.prototype.setInfo = function (roleFormationInfo, cb) {
            this.init();
            this.ladders = roleFormationInfo;
            this.callback = cb;
            this.refresh();
            this.UpdateTips();
        };
        ArenaLadder.prototype.UpdateTips = function () {
            if (!zj.Device.isReviewSwitch) {
                var bTips1 = zj.Tips.GetTipsOfMail(message.MailType.MAIL_TYPE_LADDER);
                this.imgTipReport.visible = bTips1;
            }
            var bTips2 = zj.Tips.GetTipsOfId(zj.Tips.TAG.LADDER, zj.Tips.TAG.LADDER_MALL);
            this.imgTipShop.visible = bTips2;
        };
        ArenaLadder.prototype.refresh = function () {
            var token = zj.Game.PlayerInfoSystem.Token;
            // this.labelDiamondNumber.text = PlayerItemSystem.Str_Resoure(token);
            if (token > 100000) {
                this.labelDiamondNumber.text = (token / 10000).toFixed(1) + zj.TextsConfig.TextsConfig_Common.wan;
            }
            else {
                this.labelDiamondNumber.text = token.toString();
            }
            if (this.labelDiamondNumber.width < 80) {
                this.labelDiamondNumber.width = 80;
            }
            var rank = zj.Game.PlayerInfoSystem.BaseInfo.ladderRank;
            this.labelMyRank.text = "第" + rank + "名";
            var vipInfo = zj.Game.PlayerVIPSystem.vipInfo;
            this.currentNumber = vipInfo.buyPvpPower + zj.CommonConfig.ladder_challenge_time - vipInfo.pvpPower; //CommonConfig.ladder_challenge_time * 
            this.labelSurplusNumber.text = this.currentNumber.toString() + "/" + zj.CommonConfig.ladder_challenge_time.toString();
            this.loadRivalList();
            this.updateButon();
            this.loadAwardInfo();
            this.loadFormationList();
            this.loadDefList();
        };
        ArenaLadder.prototype.loadRivalList = function () {
            var _this = this;
            var start = 0;
            var count = zj.CommonConfig.rank_list_max - 1;
            var thisOne = this;
            this.array.removeAll();
            zj.Game.PlayerArenaSystem.rankItemInfo(message.ERankType.RANK_TYPE_LADDER, start, count).then(function (body) {
                for (var i = 0; i < 10; i++) {
                    var v = body.rankItemsInfo[i];
                    var v1 = body.praiseInfo;
                    var data = new zj.ArenaRivalItemData();
                    data.info = v;
                    data.info1 = v1;
                    data.index = i + 1;
                    data.father = _this;
                    data.rivalCount = _this.currentNumber;
                    _this.array.addItem(data);
                }
                for (var i = 0; i < _this.ladders.length; i++) {
                    if (i == 2 && _this.ladders.length != 3) {
                        continue;
                    }
                    var v = _this.ladders[i];
                    var data = new zj.ArenaRivalItemData();
                    data.info = v;
                    data.index = i + 1 + 10;
                    data.father = _this;
                    data.rivalCount = _this.currentNumber;
                    thisOne.array.addItem(data);
                }
                thisOne.listRival.dataProvider = _this.array;
                thisOne.listRival.itemRenderer = zj.ArenaRivalItem;
            });
        };
        ArenaLadder.prototype.getitemList = function () {
            this.rivalItems = [];
            for (var i = 0; i < this.listRival.numChildren; i++) {
                var item = this.listRival.getChildAt(i);
                this.rivalItems.push(item);
            }
        };
        ArenaLadder.prototype.updateButon = function () {
            var _this = this;
            var setBuyConsumeInfo = function (open) {
                _this.imgConSume.visible = open;
                _this.labelConsume.visible = open;
                if (open) {
                    var vipInfo = zj.Game.PlayerVIPSystem.vipInfo;
                    var consume = zj.CommonConfig.ladder_challenge_token(vipInfo.buyPvpPower);
                    _this.labelConsume.text = consume.toString();
                }
            };
            if (this.currentNumber <= 0) {
                if (this.buttonState != 2 /* ButtonBuy */) {
                    this.buttonState = 2 /* ButtonBuy */;
                    setBuyConsumeInfo(true);
                }
            }
            else {
                if (this.buttonState != 1 /* ButtonFresh */) {
                    this.buttonState = 1 /* ButtonFresh */;
                    setBuyConsumeInfo(false);
                }
            }
            this.btnBuy.visible = (this.buttonState == 2 /* ButtonBuy */);
            this.btnChange.visible = (this.buttonState == 1 /* ButtonFresh */);
        };
        ArenaLadder.prototype.loadAwardInfo = function () {
            var currentRank = zj.Game.PlayerInfoSystem.BaseInfo.ladderRank;
            var info = zj.Helper.GetArenaScoreInfo(currentRank)[0];
            if (info == null) {
                for (var i = 1; i <= 4; i++) {
                    this["imgFrame" + i].visible = false;
                    this["imgIcon" + i].visible = false;
                    this["label" + i].visible = false;
                }
                return;
            }
            var paths = [];
            for (var i = 0; i < info.reward_goods.length; i++) {
                var v = info.reward_goods[i];
                var itemInfo = zj.PlayerItemSystem.Table(v);
                var icon = itemInfo.path;
                var frame = zj.PlayerItemSystem.Set(v, null, info.reward_count[i]);
                this["imgFrame" + (i + 1)].source = zj.cachekey(frame.Frame, this);
                this["imgIcon" + (i + 1)].source = zj.cachekey(icon, this);
                paths.push(frame.Frame);
                paths.push(icon);
                this["label" + (i + 1)].text = "x" + zj.Set.NumberUnit3(info.reward_count[i]);
            }
            if (info.reward_goods.length < 4) {
                for (var i = 1; i <= 4; i++) {
                    if (i > info.reward_goods.length) {
                        this["imgFrame" + i].visible = false;
                        this["imgIcon" + i].visible = false;
                        this["label" + i].visible = false;
                    }
                }
            }
        };
        ArenaLadder.prototype.loadFormationList = function () {
            // let formations = Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_LADDER_DEFENCE - 1];
            // for (let i = 0; i < formations.generals.length; i++) {
            //     let v = formations.generals[i];
            // }
        };
        ArenaLadder.prototype.loadDefList = function () {
            zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_LADDER_DEFENCE;
            var a = zj.Game.PlayerFormationSystem.curFormations;
            var formation = new message.FormationInfo();
            for (var i = 0; i < a.length; i++) {
                if (a[i] != null) {
                    if (a[i].formationType == zj.Game.PlayerInstanceSystem.curInstanceType) {
                        var b = new message.FormationInfo();
                        b.generals = a[i].generals;
                        b.supports = a[i].supports;
                        if (b instanceof message.FormationInfo) {
                            formation = a[i];
                        }
                    }
                }
            }
            if (formation.generals.length == 0) {
                for (var i = 0; i < 4; i++) {
                    formation.generals[i] = 0;
                }
            }
            if (formation.supports.length == 0) {
                for (var i = 0; i < 4; i++) {
                    formation.supports[i] = 0;
                }
            }
            this.loadDeftGenerals(formation.generals);
            this.loadDefSupports(formation.supports);
        };
        ArenaLadder.prototype.loadDeftGenerals = function (generals) {
            var dataProvider = new eui.ArrayCollection();
            for (var i = generals.length; i > 0; i--) {
                var v = this.ladders[i - 1];
                var data = new zj.ArenaMainDefendItemData();
                data.generalId = generals[i - 1];
                data.isMain = true;
                if (generals[i - 1] != 0 && zj.Game.PlayerHunterSystem.allHuntersMap()[generals[i - 1]] != null) {
                    data.isEmpty = true;
                }
                else {
                    data.isEmpty = false;
                }
                dataProvider.addItem(data);
            }
            this.listGeneral.dataProvider = dataProvider;
            this.listGeneral.itemRenderer = zj.ArenaMainDefendItem;
        };
        ArenaLadder.prototype.loadDefSupports = function (supports) {
            var dataProvider = new eui.ArrayCollection();
            for (var i = supports.length; i > 0; i--) {
                var v = this.ladders[i - 1];
                var data = new zj.ArenaMainDefendItemData();
                data.generalId = supports[i - 1];
                data.isMain = false;
                if (supports[i - 1] != 0 && zj.Game.PlayerHunterSystem.allHuntersMap()[supports[i - 1]] != null) {
                    data.isEmpty = true;
                }
                else {
                    data.isEmpty = false;
                }
                dataProvider.addItem(data);
            }
            this.listSupport.dataProvider = dataProvider;
            this.listSupport.itemRenderer = zj.ArenaMainDefendItem;
        };
        ArenaLadder.prototype.onBtnRule = function () {
            zj.loadUI(zj.Common_RuleDialog)
                .then(function (dialog) {
                dialog.init(zj.RuleConfig.arena);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        ArenaLadder.prototype.onBtnDiamond = function () {
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(false);
            });
        };
        ArenaLadder.prototype.onBtnShop = function () {
            zj.loadUI(zj.ShopMallDialog)
                .then(function (dialog) {
                dialog.load(2);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        ArenaLadder.prototype.onBtnRank = function () {
            zj.loadUI(zj.ArenaLadderRank)
                .then(function (dialog) {
                dialog.setInfo(message.ERankType.RANK_TYPE_LADDER, function () {
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        ArenaLadder.prototype.onBtnReport = function () {
            var _this = this;
            zj.loadUI(zj.MailMainReport)
                .then(function (dialog) {
                dialog.loadFrom(_this, zj.TableEnum.Enum.Mail.ARENA);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        ArenaLadder.prototype.onBtnAward = function () {
            zj.loadUI(zj.ArenaLadderAward)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        ArenaLadder.prototype.onBtnChange = function () {
            var _this = this;
            zj.Game.PlayerArenaSystem.ladderList(false).then(function (data) {
                _this.ladders = data;
                for (var i = 0; i < _this.ladders.length; i++) {
                    if (i == 2) {
                        continue;
                    }
                    var v = _this.ladders[i];
                    var data1 = new zj.ArenaRivalItemData();
                    data1.info = v;
                    data1.index = i + 1 + 10;
                    data1.father = _this;
                    data1.rivalCount = _this.currentNumber;
                    var index = i;
                    if (i == 3) {
                        index -= 1;
                    }
                    _this.array.replaceItemAt(data1, index + 10);
                }
                zj.ArenaMainScene.roleFormationInfo = data;
                // this.refresh();
            });
        };
        ArenaLadder.prototype.onBtnBuy = function () {
            var _this = this;
            var licenceLevel = zj.Game.PlayerInfoSystem.BaseInfo.licenceLevel;
            var licenceInfo = zj.TableLicence.Item(licenceLevel);
            var vipInfo = zj.Game.PlayerVIPSystem.vipInfo;
            if (vipInfo.buyPvpPower >= licenceInfo.ladder) {
                if (zj.Device.isReviewSwitch) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Arena.ladderChallengeNumEmpty);
                }
                else {
                    if (zj.Device.isVipOpen) {
                        var cb = function () {
                            _this.challengeTblNum = zj.PlayerVIPSystem.Level().ladder;
                        };
                        zj.TipManager.ShowTipsAndGoVip(zj.TextsConfig.TextsConfig_Arena.ladderChallengeNumEmptyToVip, this, zj.TableEnum.Enum.Vip.CHARGE, cb);
                    }
                    else {
                        zj.toast_warning(zj.TextsConfig.TextsConfig_Arena.ladderChallengeNumEmpty);
                    }
                }
            }
            else {
                var token = zj.CommonConfig.ladder_challenge_token(vipInfo.buyPvpPower);
                var time = zj.CommonConfig.ladder_challenge_time;
                var msg = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Arena.buyNumTip, token, "1", licenceInfo.ladder - vipInfo.buyPvpPower, licenceInfo.ladder);
                zj.TipManager.ShowConfirmCancel(msg, function () {
                    zj.Game.PlayerArenaSystem.ladderChallengeAdd()
                        .then(function () {
                        zj.toast_success(zj.TextsConfig.TextsConfig_Arena.buyChallengeNumSuccessTip);
                        // this.refresh();
                        var vipInfo = zj.Game.PlayerVIPSystem.vipInfo;
                        _this.currentNumber = vipInfo.buyPvpPower + zj.CommonConfig.ladder_challenge_time - vipInfo.pvpPower;
                        _this.labelSurplusNumber.text = _this.currentNumber.toString() + "/" + zj.CommonConfig.ladder_challenge_time.toString();
                        _this.updateButon();
                    }).catch(function (reason) {
                        if (reason == "钻石不足") {
                            zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Money.demstone, function () {
                                _this.onBtnDiamond();
                            });
                        }
                        else {
                            zj.toast_warning(reason);
                        }
                    });
                });
            }
            //
        };
        /**点击调整阵容 */
        ArenaLadder.prototype.onBtnFormat = function () {
            var _this = this;
            zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_LADDER_DEFENCE;
            zj.loadUI(zj.CommonFormationPvpArena)
                .then(function (dialog) {
                dialog.setInfo(function () {
                    _this.loadDefList();
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        ArenaLadder.prototype.onBtnClose = function () {
            if (this.callback)
                this.callback();
            this.close(zj.UI.HIDE_TO_TOP);
        };
        ArenaLadder.prototype.onBtnFight = function (data, info) {
            var _this = this;
            if (this.buttonState == 2 /* ButtonBuy */) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Arena.ladderChallengeNumEmptyError);
            }
            else {
                // let progressInfo = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_LADDER];
                // if (progressInfo != null && progressInfo.leftTime > 0) {
                //     let token = CommonConfig.ladder_cooling_token(progressInfo.leftTime);
                //     let tip = Helper.StringFormat(TextsConfig.TextsConfig_Arena.clearCoolingTip, token);
                //     TipManager.ShowConfirmCancel(tip, () => {
                //         Game.PlayerArenaSystem.ladderCollingClear().then(() => {
                //             toast_warning(TextsConfig.TextsConfig_Arena.clearCoolingSuccessTip);
                //         }).catch(() => {
                //         })
                //     });
                // } else {
                //toast_success("上阵 比试");
                zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_LADDER_ATTACK;
                zj.loadUI(zj.CommonFormatePveMain)
                    .then(function (dialog) {
                    zj.Game.EventManager.event(zj.GameEvent.FIGHT_FIELD_ITEM, { info: info, a: _this.ladders });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    var index = 0;
                    if (data.index == 11) {
                        index = 1;
                    }
                    else if (data.index == 12) {
                        index = 2;
                    }
                    else if (data.index == 14 || data.index == 13) {
                        index = 4;
                    }
                    dialog.setInfo(index - 1);
                });
                // }
            }
        };
        ArenaLadder.prototype.onBtnFive = function (data) {
            var _this = this;
            if (this.buttonState == 2 /* ButtonBuy */) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Arena.ladderChallengeNumEmptyError);
            }
            else {
                zj.Game.PlayerArenaSystem.ladderQuickReward(data.info.baseInfo.id).then(function (goods) {
                    zj.loadUI(zj.CommonGetDialog).then(function (dialog) {
                        dialog.init(goods);
                        dialog.show();
                    });
                    _this.refresh();
                });
            }
        };
        return ArenaLadder;
    }(zj.Dialog));
    zj.ArenaLadder = ArenaLadder;
    __reflect(ArenaLadder.prototype, "zj.ArenaLadder");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaLadder.js.map
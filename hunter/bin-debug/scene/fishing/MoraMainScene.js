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
    // 猜拳 主界面
    // wangshenzhuo
    // 2019.05.24
    var MoraMainScene = (function (_super) {
        __extends(MoraMainScene, _super);
        function MoraMainScene() {
            var _this = _super.call(this) || this;
            _this.MyEndIndex = 0;
            _this.EndEneMyIndex = 0;
            _this.game_state = {
                start: 0,
                change: 1,
                finish: 2,
            };
            _this.result_state = {
                win: 1,
                lose: 2,
                tie: 3,
            };
            _this.random_value = {
                scissor: 1,
                rock: 2,
                paper: 3,
            };
            _this.groupNode = [
                _this.group1,
                _this.group2,
                _this.group3,
            ];
            _this.myMoraResult = [];
            _this.enemyMoraResult = [];
            _this.charm_tbl = [];
            _this.charm_index = [];
            _this.bTeach = false;
            _this.skinName = "resource/skins/fishing/MoraMainSceneSkin.exml";
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_COIN_CHANGE, _this.TokenCoin, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.TokenCoin, _this);
            _this.imageRect.visible = false;
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGold, _this);
            _this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGemstone, _this);
            _this.buttonViewAward.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonViewAward, _this);
            _this.buttonTip.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonTip, _this);
            _this.buttonStartMora.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonStartMora, _this);
            _this.buttonGetAward.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonGetAward, _this);
            _this.buttonMoraAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonMoraAgain, _this);
            return _this;
        }
        MoraMainScene.prototype.Init = function () {
            var _this = this;
            this.listEndMy.itemRenderer = zj.MoraMainEndWinItem;
            this.MyEndItem = new eui.ArrayCollection();
            this.listEndEnemy.itemRenderer = zj.MoraMainEndLoseItem;
            this.EndEneMyItem = new eui.ArrayCollection();
            if (!((zj.PlayerZorkSystem.moraFormatMy.length != 0) && zj.PlayerZorkSystem.moraFormatEnemy.length != 0)) {
                _a = zj.PlayerZorkSystem.randomHead(), zj.PlayerZorkSystem.moraFormatEnemy = _a[0], zj.PlayerZorkSystem.moraFormatMy = _a[1];
            }
            this.isRunes = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.runes != 0;
            if (!this.isRunes) {
                zj.Game.PlayerFormationSystem.InitCharmInfo();
            }
            this.tag = this.isRunes == true && 2 || 1;
            this.cost = null;
            this.myMoraResult = []; //  我方猜拳结果排列
            this.enemyMoraResult = [];
            this.gain_runes_time = null;
            this.change_runes_time = null;
            this.charm_tbl = [];
            this.charm_index = [];
            this.charm_count = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.runes;
            this.SetInfo();
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tanlanzhidao_caiquan_eff", "armatureName", "000_zhipai", 0)
                .then(function (display) {
                display.x = 0;
                display.y = 0;
                _this.groupAniA.addChild(display);
            });
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tanlanzhidao_caiquan_eff", "armatureName", "001_jiantou", 0)
                .then(function (display) {
                display.x = 0;
                display.y = 0;
                _this.groupAniB.addChild(display);
            });
            if (zj.Teach.isDone(zj.teachBattle.teachPartID_WONDER_ENTER_2) == false) {
                zj.Teach.SetTeachPart(zj.teachBattle.teachPartID_WONDER_ENTER_2);
            }
            var _a;
        };
        MoraMainScene.prototype.isFullScreen = function () {
            return true;
        };
        MoraMainScene.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        MoraMainScene.prototype.SetInfo = function () {
            this.SetMoraTimes();
            this.UpdateCharms(this.charm_count);
            this.SetEnemyAndMyPosition();
            this.TokenCoin();
        };
        //猜拳阵容
        MoraMainScene.prototype.SetEnemyAndMyPosition = function () {
            this.listEnemy.itemRenderer = zj.MoraMainTeamItem;
            this.listEnemyItem = new eui.ArrayCollection();
            for (var i = 0; i < zj.PlayerZorkSystem.moraFormatEnemy.length; i++) {
                var data = new zj.MoraMainTeamItemData();
                data.father = this;
                data.info = zj.PlayerZorkSystem.moraFormatEnemy[zj.PlayerZorkSystem.moraFormatEnemy.length - 1 - i];
                data.index = zj.PlayerZorkSystem.moraFormatEnemy.length - i;
                this.listEnemyItem.addItem(data);
            }
            this.listEnemy.dataProvider = this.listEnemyItem;
            this.listMy.itemRenderer = zj.MoraMainTeamItem;
            this.listMyItem = new eui.ArrayCollection();
            for (var i = 0; i < zj.PlayerZorkSystem.moraFormatMy.length; i++) {
                var data = new zj.MoraMainTeamItemData();
                data.father = this;
                data.info = zj.PlayerZorkSystem.moraFormatMy[i];
                data.index = i + 1;
                this.listMyItem.addItem(data);
            }
            this.listMy.dataProvider = this.listMyItem;
        };
        MoraMainScene.prototype.UpdateCharms = function (info) {
            var _this = this;
            this.SetNodeShow();
            if (info != null && info != 0) {
                this.dealMoraShowCost();
                this.charm_tbl = zj.Table.DeepCopy(zj.Game.PlayerFormationSystem.curCharmInfos);
                var index = [];
                var id = 0;
                for (var k in this.charm_tbl) {
                    var v = this.charm_tbl[k];
                    if (v == this.result_state.win) {
                        index[id] = k;
                        id = id + 1;
                    }
                }
                this.charm_index = zj.Table.DeepCopy(index);
                // this.dealShowReward();
                this.imageWinNum.source = zj.cachekey(zj.UIConfig.UIConfig_WonderRunes.numberPath[this.charm_count], this);
                this.imageLoseNum.source = zj.cachekey(zj.UIConfig.UIConfig_WonderRunes.numberPath[zj.CommonConfig.gain_runes_number - this.charm_count], this);
                var isEnable = (info != zj.CommonConfig.gain_runes_number);
                this.ChangeCharmEnable(isEnable);
                this.SetInfoUI();
                this.SetListAni();
            }
            else {
                this.groupMid.removeChildren();
                zj.Game.DragonBonesManager.playAnimation(this, "ui_tanlanzhidao_caiquan_eff", "armatureName", "002_caiquan_daiji", 0)
                    .then(function (display) {
                    display.x = _this.groupMid.width / 2;
                    ;
                    display.y = _this.groupMid.height / 2;
                    _this.groupMid.addChild(display);
                });
            }
        };
        MoraMainScene.prototype.SetMoraTimes = function () {
            var level = zj.Game.PlayerInfoSystem.BaseInfo.licenceLevel;
            var tbl = zj.TableLicence.Table();
            this.gain_runes_time = tbl[level].gain_runes_time;
            this.change_runes_time = tbl[level].change_runes_time + zj.PlayerVIPSystem.LowLevel().runes_free_time;
            var can_runes = (this.gain_runes_time - zj.Game.PlayerVIPSystem.vipInfo.gain_runes_time) > 0 && true || false;
            var can_charm = (this.change_runes_time - zj.Game.PlayerVIPSystem.vipInfo.change_runes_time) > 0 && true || false;
            var runesTime = can_runes == true && this.gain_runes_time - zj.Game.PlayerVIPSystem.vipInfo.gain_runes_time || 0;
            var charmTime = can_charm == true && this.change_runes_time - zj.Game.PlayerVIPSystem.vipInfo.change_runes_time || 0;
            var str_runes_id = can_runes == true && 1 || 2;
            var str_charm_id = can_charm == true && 1 || 2;
            var str_runes = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Runes.RunesTime[str_runes_id], runesTime, this.gain_runes_time);
            var str_charm = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Runes.freeCharm[str_charm_id], charmTime, this.change_runes_time);
            this.labelMoraNum.textFlow = zj.Util.RichText(str_runes);
            this.labelMoraFreeNum.textFlow = zj.Util.RichText(str_charm);
            this.SetInfoCost(can_charm);
        };
        MoraMainScene.prototype.SetInfoCost = function (flag) {
            var num_charm = zj.Game.PlayerVIPSystem.vipInfo.change_runes_time - this.change_runes_time;
            if (flag) {
                this.cost = 0;
            }
            else {
                this.cost = zj.CommonConfig.change_runes_consume(num_charm + 1);
            }
        };
        MoraMainScene.prototype.SetNodeShow = function () {
            this.group1.visible = true;
            this.group2.visible = !this.isRunes;
            this.group3.visible = this.isRunes;
            if (this.group3.visible == true) {
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            }
        };
        MoraMainScene.prototype.dealMoraShowCost = function () {
            var num_charm = this.change_runes_time - zj.Game.PlayerVIPSystem.vipInfo.change_runes_time > 0;
            var charmTime = this.change_runes_time - zj.Game.PlayerVIPSystem.vipInfo.change_runes_time;
            this.imageDemon.visible = (charmTime <= 0);
            this.labelMoraFree.visible = !(charmTime <= 0);
            this.labelMoraAgainNum.visible = (charmTime <= 0);
            if (charmTime > 0) {
                var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Runes.CharmLast, charmTime, this.change_runes_time);
                this.labelMoraFree.text = str;
            }
            else {
                this.SetInfoCost(num_charm);
                this.labelMoraAgainNum.text = this.cost;
            }
        };
        //猜拳奖励内容
        MoraMainScene.prototype.dealShowReward = function () {
            if (this.charm_count == null) {
                return;
            }
            var tbl = [];
            if (this.charm_count != 0) {
                tbl = this.GetReward(this.charm_count);
            }
            this.listAward.itemRenderer = zj.MoraMainAwardItemItem;
            this.TableViewItem = new eui.ArrayCollection();
            for (var i = 0; i < tbl.length; i++) {
                var data = new zj.MoraMainAwardItemItemData();
                data.father = this;
                data.good = tbl[i];
                data.index = i;
                this.TableViewItem.addItem(data);
            }
            this.listAward.dataProvider = this.TableViewItem;
            this.buttonMoraAgain.touchEnabled = true;
        };
        MoraMainScene.prototype.GetReward = function (index) {
            var tbl = zj.PlayerZorkSystem.RewardLevel(this.charm_count);
            return tbl;
        };
        MoraMainScene.prototype.ChangeCharmEnable = function (enable) {
            if (enable) {
                this.buttonMoraAgain.enabled = true;
            }
            else {
                this.buttonMoraAgain.enabled = false;
            }
        };
        MoraMainScene.prototype.SetInfoUI = function () {
            var tbl = [];
            var index = [];
            var numWin = this.result_state.win;
            var has_save = zj.Table.FindF(zj.Game.PlayerFormationSystem.curCharmInfos, function (k, v) {
                return v == numWin;
            });
            if (has_save) {
                tbl = zj.Table.DeepCopy(zj.Game.PlayerFormationSystem.curCharmInfos);
            }
            else {
                _a = this.CharmLoi(this.charm_count), tbl = _a[0], index = _a[1];
                zj.Game.PlayerFormationSystem.curCharmInfos = zj.Table.DeepCopy(tbl);
                this.SaveCharm(zj.Game.PlayerFormationSystem.curCharmInfos);
                this.charm_tbl = zj.Table.DeepCopy(tbl);
                this.charm_index = zj.Table.DeepCopy(index);
            }
            for (var i = 0; i < 6; i++) {
                var is_win = this.charm_tbl[i] == 1 && 1 || 2;
                var my_mora = Math.floor(Math.random() * 3) + 1;
                var enemy_mora = this.findOppositeGesture(my_mora, is_win);
                var data = new zj.MoraMainEndWinItemData();
                data.father = this;
                data.good = zj.PlayerZorkSystem.moraFormatMy[i];
                data.index = i;
                data.mora = my_mora;
                data.isshow = this.charm_tbl[i] == 1;
                data.isTween = false;
                this.MyEndItem.addItem(data);
                this.myMoraResult[i] = data;
                var Losedata = new zj.MoraMainEndLoseItemData();
                Losedata.father = this;
                Losedata.good = zj.PlayerZorkSystem.moraFormatEnemy[i];
                Losedata.index = i;
                Losedata.mora = enemy_mora;
                Losedata.isshow = !(this.charm_tbl[i] == 1);
                Losedata.isTween = false;
                this.EndEneMyItem.addItem(Losedata);
                this.enemyMoraResult[i] = Losedata;
            }
            this.listEndMy.dataProvider = this.MyEndItem;
            this.MyEndIndex = this.listEndMy.selectedIndex;
            this.listEndEnemy.dataProvider = this.EndEneMyItem;
            this.EndEneMyIndex = this.listEndEnemy.selectedIndex;
            var _a;
        };
        MoraMainScene.prototype.findOppositeGesture = function (gesture, state) {
            var oppoSite = null;
            var num = 3;
            if (state == this.result_state.tie) {
                oppoSite = gesture;
            }
            else if (state == this.result_state.win) {
                oppoSite = gesture % num + 1;
            }
            else if (state == this.result_state.lose) {
                oppoSite = (1 + num) * num / 2 - gesture - (gesture % num + 1);
            }
            return oppoSite;
        };
        MoraMainScene.prototype.CharmLoi = function (count) {
            var tbl = [];
            if (this.tag == 2) {
                tbl = zj.Table.DeepCopy(this.charm_tbl);
                this.pre_charm_tbl = zj.Table.DeepCopy(this.charm_tbl);
                this.pre_charm_index = zj.Table.DeepCopy(this.charm_index);
                var recount = count - this.pre_charm_index.length;
                if (recount <= 0) {
                    var a = 0;
                }
                else {
                    this.charm_tbl = zj.Table.DeepCopy(zj.Game.PlayerFormationSystem.curCharmInfos);
                    for (var i = 0; i < recount; i++) {
                        var dis_prize = [];
                        for (var k in this.charm_tbl) {
                            var v = this.charm_tbl[k];
                            if (v != this.result_state.win) {
                                dis_prize.push(k);
                            }
                        }
                        if (dis_prize != null) {
                            var posit = Math.floor(Math.random() * dis_prize.length);
                            tbl[dis_prize[posit]] = this.result_state.win;
                        }
                        this.charm_tbl = zj.Table.DeepCopy(tbl);
                    }
                    for (var k in this.charm_tbl) {
                        var v = this.charm_tbl[k];
                        if (v != this.result_state.win) {
                            tbl[k] = this.result_state.lose;
                        }
                    }
                }
            }
            else {
                this.pre_charm_tbl = [];
                this.pre_charm_index = [];
                for (var i = 0; i < zj.CommonConfig.gain_runes_number - count; i++) {
                    tbl[i] = this.result_state.lose;
                }
                for (var j = 0; j < count; j++) {
                    var randNum = Math.floor(Math.random() * (tbl.length + 1));
                    tbl.splice(randNum, 0, this.result_state.win);
                }
            }
            var index = [];
            var id = 0;
            for (var k in tbl) {
                var v = tbl[k];
                if (v == this.result_state.win) {
                    index[id] = k;
                    id = id + 1;
                }
            }
            return [tbl, index];
        };
        MoraMainScene.prototype.GainRunes_Req = function (isNovice) {
            var _this = this;
            this.imageRect.visible = true;
            zj.PlayerZorkSystem.GainRunesReqBody_Visit().then(function (data) {
                _this.groupWinLose.visible = false;
                _this.groupVs.visible = false;
                _this.charm_count = data.body.gameInfo.mixUnitInfo[0].runes;
                _this.dealUpdate(1);
            }).catch(function (reason) {
                _this.imageRect.visible = false;
            });
            // Teach.addTeaching();
        };
        MoraMainScene.prototype.dealUpdate = function (index) {
            if (index == 1) {
                this.tag = 1;
                this.isRunes = true;
                this.UpdateCharm(this.charm_count);
                this.SetInfoAni(true);
            }
            else if (index == 2) {
                this.tag = 2;
                this.UpdateCharm(this.charm_count);
                this.SetInfoAni(false);
            }
            else if (index == 3) {
                this.isRunes = false;
                this.UpdateCharm();
                this.dealShowReward();
            }
        };
        MoraMainScene.prototype.UpdateCharm = function (info) {
            if (info != null) {
                this.dealMoraShowCost();
                this.dealShowCharm();
            }
            else {
                return;
            }
        };
        MoraMainScene.prototype.dealShowCharm = function () {
            _a = this.CharmLoi(this.charm_count), this.charm_tbl = _a[0], this.charm_index = _a[1];
            this.SaveCharm(this.charm_tbl);
            var _a;
        };
        MoraMainScene.prototype.SetInfoAni = function (enable) {
            var _this = this;
            if (enable) {
                this.groupMid.removeChildren();
                zj.Game.DragonBonesManager.playAnimation(this, "ui_tanlanzhidao_caiquan_eff", "armatureName", "003_caiquan_jihuo", 1)
                    .then(function (display) {
                    display.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                        if (display.parent)
                            display.parent.removeChild(display);
                        _this.SetNodeShow();
                        _this.groupWinLose.visible = false;
                        egret.Tween.get(_this.groupVs)
                            .to({ visible: true }, 0)
                            .to({ scaleX: 0.8 }, 0)
                            .to({ scaleY: 0.8 }, 0)
                            .to({ scaleX: 1, scaleY: 1 }, 150).call(function () {
                            _this.SetInfoMoraProcess();
                        });
                    }, _this);
                    display.x = _this.groupMid.width / 2;
                    ;
                    display.y = _this.groupMid.height / 2;
                    _this.groupMid.addChild(display);
                });
            }
            else {
                this.SetInfoMoraProcess();
            }
        };
        MoraMainScene.prototype.SetInfoMoraProcess = function () {
            var _this = this;
            if (this.myMoraResult.length > 0 && this.enemyMoraResult.length > 0) {
                var need_change = [];
                var _loop_1 = function (i) {
                    var find = zj.Table.FindF(this_1.pre_charm_index, function (k, v) {
                        return v == i;
                    });
                    if (!find) {
                        need_change.push(i);
                    }
                };
                var this_1 = this;
                for (var i = 0; i < 6; i++) {
                    _loop_1(i);
                }
                for (var i = 0; i < need_change.length; i++) {
                    var is_win = this.charm_tbl[need_change[i] == 1 && 1 || 2];
                    var my_mora = Math.floor(Math.random() * 3) + 1;
                    var enemy_mora = this.findOppositeGesture(my_mora, is_win);
                    var aa = this.listEndMy.getElementAt(need_change[i]);
                    aa.groupMain.visible = false;
                    aa.SetItemInfo(need_change[i], my_mora, this.charm_tbl[need_change[i]] == 1, zj.PlayerZorkSystem.moraFormatMy[need_change[i]]);
                    egret.Tween.get(aa.groupMain).wait(210 * (i + 1))
                        .to({ visible: true }, 0)
                        .to({ x: -350 }, 0)
                        .to({ x: 0 }, 200, egret.Ease.sineInOut);
                    var bb = this.listEndEnemy.getElementAt(need_change[i]);
                    bb.groupMain.visible = false;
                    // bb.SetInfoTween(need_change[i], true);
                    bb.SetItemInfo(need_change[i], enemy_mora, !(this.charm_tbl[need_change[i]] == 1), zj.PlayerZorkSystem.moraFormatEnemy[need_change[i]]);
                    egret.Tween.get(bb.groupMain).wait((i + 1) * 210)
                        .to({ visible: true }, 0)
                        .to({ x: 350 }, 0)
                        .to({ x: 0 }, 200, egret.Ease.sineInOut);
                    egret.Tween.get(this.groupWinLose).wait(220 * need_change.length)
                        .to({ visible: true }, 0)
                        .to({ scaleX: 0.8, scaleY: 0.8 }, 0)
                        .to({ scaleX: 1, scaleY: 1 }, 150).call(function () {
                        _this.SetListAni();
                        _this.imageRect.visible = false;
                    });
                }
            }
            else {
                for (var i = 0; i < 6; i++) {
                    var is_win = this.charm_tbl[i] == 1 && 1 || 2;
                    var my_mora = Math.floor(Math.random() * 3) + 1;
                    var enemy_mora = this.findOppositeGesture(my_mora, is_win);
                    var data = new zj.MoraMainEndWinItemData();
                    data.father = this;
                    data.good = zj.PlayerZorkSystem.moraFormatMy[i];
                    data.index = i;
                    data.mora = my_mora;
                    data.isshow = this.charm_tbl[i] == 1;
                    data.isTween = true;
                    this.MyEndItem.addItem(data);
                    this.myMoraResult[i] = data;
                    var Losedata = new zj.MoraMainEndLoseItemData();
                    Losedata.father = this;
                    Losedata.good = zj.PlayerZorkSystem.moraFormatEnemy[i];
                    Losedata.index = i;
                    Losedata.mora = enemy_mora;
                    Losedata.isshow = !(this.charm_tbl[i] == 1);
                    Losedata.isTween = true;
                    this.EndEneMyItem.addItem(Losedata);
                    this.enemyMoraResult[i] = Losedata;
                    // this.listMy.getElementAt(1)
                }
                this.listEndMy.dataProvider = this.MyEndItem;
                this.MyEndIndex = this.listEndMy.selectedIndex;
                this.listEndEnemy.dataProvider = this.EndEneMyItem;
                this.EndEneMyIndex = this.listEndEnemy.selectedIndex;
                egret.Tween.get(this.groupWinLose).wait(1260)
                    .to({ visible: true }, 0)
                    .to({ scaleX: 0.8, scaleY: 0.8 }, 0)
                    .to({ scaleX: 1, scaleY: 1 }, 150).call(function () {
                    _this.SetListAni();
                    _this.imageRect.visible = false;
                });
            }
            var isEnable = (this.charm_count != zj.CommonConfig.gain_runes_number);
            this.ChangeCharmEnable(isEnable);
        };
        MoraMainScene.prototype.SetListAni = function () {
            this.dealShowReward();
            this.imageWinNum.source = zj.cachekey(zj.UIConfig.UIConfig_WonderRunes.numberPath[this.charm_count], this);
            this.imageLoseNum.source = zj.cachekey(zj.UIConfig.UIConfig_WonderRunes.numberPath[zj.CommonConfig.gain_runes_number - this.charm_count], this);
        };
        MoraMainScene.prototype.SetShowInfo = function () {
            for (var i = 0; i < 6; i++) {
                var aa = this.listEndMy.getElementAt(i);
                aa.groupMain.visible = false;
                var bb = this.listEndEnemy.getElementAt(i);
                bb.groupMain.visible = false;
            }
        };
        //领取奖励
        MoraMainScene.prototype.onButtonGetAward = function () {
            var _this = this;
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.runes != 0) {
                if ((this.charm_count == zj.CommonConfig.gain_runes_number) || this.bTeach == true) {
                    this.ReqGetReward();
                }
                else {
                    zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Runes.Get, function () { _this.ReqGetReward(); });
                }
            }
            else {
                zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Runes.AlreadyGet);
            }
        };
        MoraMainScene.prototype.ReqGetReward = function (isNovice) {
            var _this = this;
            if (isNovice == null) {
                isNovice = false;
            }
            var isget = (this.bTeach == true);
            zj.PlayerZorkSystem.RunesRewardReqBody_Visit(isget).then(function (data) {
                if (data.header.result == 0) {
                    _this.SetShowInfo();
                    zj.PlayerZorkSystem.moraFormatEnemy = [];
                    zj.PlayerZorkSystem.moraFormatMy = [];
                    _a = zj.PlayerZorkSystem.randomHead(), zj.PlayerZorkSystem.moraFormatEnemy = _a[0], zj.PlayerZorkSystem.moraFormatMy = _a[1];
                    _this.myMoraResult = [];
                    _this.enemyMoraResult = [];
                    _this.MyEndItem.removeAll();
                    _this.EndEneMyItem.removeAll();
                    _this.charm_tbl = [];
                    _this.charm_index = [];
                    if (_this.isRunes) {
                        _this.isRunes = false;
                        _this.SetNodeShow();
                        _this.groupMid.removeChildren();
                        zj.Game.DragonBonesManager.playAnimation(_this, "ui_tanlanzhidao_caiquan_eff", "armatureName", "002_caiquan_daiji", 0)
                            .then(function (display) {
                            display.x = _this.groupMid.width / 2;
                            ;
                            display.y = _this.groupMid.height / 2;
                            _this.groupMid.addChild(display);
                        });
                        _this.charm_count = data.body.gameInfo.mixUnitInfo[0].runes;
                        _this.dealUpdate(3);
                        _this.SetEnemyAndMyPosition();
                        zj.loadUI(zj.CommonGetDialog)
                            .then(function (dialog) {
                            dialog.init(data.body.gameInfo.getGoods);
                            dialog.show();
                            dialog.setCB(function () { _this.SetMoraTimes(); });
                        });
                    }
                }
                else if (data.header.result == 10295) {
                    zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Runes.ReLogin, function () { zj.Game.PlayerFormationSystem.InitCharmInfo(); });
                }
                else if (data.header.result == message.EC.XG_LACK_TOKEN) {
                    _this.onBtnAddGemstone();
                }
                else {
                }
                var _a;
            }).catch(function (reason) { });
        };
        //重新猜拳
        MoraMainScene.prototype.onButtonMoraAgain = function () {
            this.imageRect.visible = true;
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.runes != 0) {
                this.ChangeCharmReq();
            }
            else {
                zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Runes.AlreadyGet);
                this.imageRect.visible = false;
            }
        };
        MoraMainScene.prototype.SetTeach = function () {
            this.bTeach = true;
        };
        MoraMainScene.prototype.ChangeCharmReq = function () {
            var _this = this;
            var isdown = (this.bTeach == true);
            zj.PlayerZorkSystem.ChangeRunesReqBody_Visit(isdown).then(function (data) {
                // if (data.header.result == 0) {
                _this.charm_count = data.body.gameInfo.mixUnitInfo[0].runes;
                _this.groupWinLose.visible = false;
                _this.dealUpdate(2);
                // } else 
            }).catch(function (reason) {
                if (reason == 10295) {
                    zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Runes.AlreadyGet, function () { zj.Game.PlayerFormationSystem.InitCharmInfo(); });
                }
                else if (reason == message.EC.XG_LACK_TOKEN) {
                    zj.TipManager.ShowAddGemStone();
                }
                _this.imageRect.visible = false;
            });
        };
        // 跳转-- 查看奖励
        MoraMainScene.prototype.onButtonViewAward = function () {
            zj.loadUI(zj.MoraMainAwardDialog)
                .then(function (dialog) {
                dialog.SetInfo();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        //跳转规则
        MoraMainScene.prototype.onButtonTip = function () {
            zj.loadUI(zj.Common_RuleDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.init(zj.RuleConfig.runes);
            });
        };
        //开始猜拳
        MoraMainScene.prototype.onButtonStartMora = function () {
            this.GainRunes_Req(false);
        };
        //加钻石
        MoraMainScene.prototype.onBtnAddGemstone = function () {
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init();
            });
        };
        //加金币
        MoraMainScene.prototype.onBtnAddGold = function () {
            zj.loadUI(zj.HelpGoldDialog)
                .then(function (dialog) {
                dialog.SetInfoList();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        MoraMainScene.prototype.SaveCharm = function (tbl) {
            var formatInfo = this.getFormationInfoStreet(tbl);
            zj.Game.PlayerFormationSystem.curCharmInfosMap.push(formatInfo);
            var msg = JSON.stringify(zj.Game.PlayerFormationSystem.curCharmInfosMap);
            var roletext = zj.Game.Controller.roleID() + "charms";
            egret.localStorage.setItem(roletext, msg);
        };
        MoraMainScene.prototype.getFormationInfoStreet = function (tbl) {
            for (var i = 0; i < tbl.length; i++) {
                zj.Game.PlayerFormationSystem.curCharmInfos[i] = tbl[i];
            }
            var formats = [];
            for (var k = 0; k < zj.Game.PlayerFormationSystem.curCharmInfos.length; k++) {
                var v = zj.Game.PlayerFormationSystem.curCharmInfos[k];
                formats.push(v);
            }
            var msg = [];
            msg = formats;
            return msg;
        };
        MoraMainScene.prototype.TokenCoin = function () {
            if (zj.Game.PlayerInfoSystem.Coin > 100000) {
                if (((zj.Game.PlayerInfoSystem.Coin / 1000) >>> 0) % 10 == 0) {
                    this.lbGold.text = ((zj.Game.PlayerInfoSystem.Coin / 10000) >>> 0) + "万";
                }
                else {
                    this.lbGold.text = (zj.Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
                }
            }
            else {
                this.lbGold.text = zj.Game.PlayerInfoSystem.Coin.toString();
            }
            if (this.lbGold.text.length > 6) {
                this.lbGold.size = 12;
            }
            else {
                this.lbGold.size = 16;
            }
            if (zj.Game.PlayerInfoSystem.Token > 100000) {
                if (((zj.Game.PlayerInfoSystem.Token / 1000) >>> 0) % 10 == 0) {
                    this.lbGemstone.text = ((zj.Game.PlayerInfoSystem.Token / 10000) >>> 0) + "万";
                }
                else {
                    this.lbGemstone.text = (zj.Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
                }
            }
            else {
                this.lbGemstone.text = zj.Game.PlayerInfoSystem.Token.toString();
            }
            if (this.lbGemstone.text.length > 6) {
                this.lbGemstone.size = 12;
            }
            else {
                this.lbGemstone.size = 16;
            }
        };
        return MoraMainScene;
    }(zj.Dialog));
    zj.MoraMainScene = MoraMainScene;
    __reflect(MoraMainScene.prototype, "zj.MoraMainScene");
})(zj || (zj = {}));
//# sourceMappingURL=MoraMainScene.js.map
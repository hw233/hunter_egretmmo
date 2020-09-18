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
     * @author xingliwei
     *
     * @date 2019-6-14
     *
     * @class 贪婪之岛港口
     */
    var DarkLandChoose = (function (_super) {
        __extends(DarkLandChoose, _super);
        function DarkLandChoose() {
            var _this = _super.call(this) || this;
            _this.speedCdProgress = null;
            _this.bloodCdProgress = null;
            _this.honorInspireNum = -1;
            _this.tokenInspireNum = -1;
            _this.bFreeSpeed = false;
            _this.bFreeBlood = false;
            _this.showDie = true;
            _this.thisHp = 0;
            _this.tokenBefore = -1;
            _this.plateBefore = -1;
            _this.evilValue = -1;
            _this.time_id = 0;
            _this.leaveSuccessful = false;
            _this.channelInfo = [];
            _this.generalIdList = [];
            _this.box = new egret.Shape();
            _this.skinName = "resource/skins/wonderland/DarkLandChooseSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.imgBar.mask = _this.imgBarBg;
            _this.init();
            _this.time = egret.setTimeout(_this.timeFun, _this, 200);
            return _this;
        }
        DarkLandChoose.prototype.timeFun = function () {
            egret.clearTimeout(this.time);
            var ui = this.getChildByName("__rect_back");
            if (ui) {
                this.removeChild(ui);
            }
        };
        DarkLandChoose.prototype.init = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnPlant.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPlant, this);
            this.btnGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGold, this);
            this.btnRogue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRogue, this);
            this.btnTeam.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTeam, this);
            this.btnReport.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnReport, this);
            this.btnFruit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFruit, this);
            this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn1, this);
            this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn2, this);
            this.btnRevive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRevive, this);
            this.btnAllRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAllRank, this);
            this.btnCity.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnCityBegin, this);
            this.btnCity.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onBtnCityUp, this);
            this.btnCity.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnCityUp, this);
            this.btnSeeChannel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSeeChannel, this);
            this.btnEvil.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEvil, this);
            this.btnChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.AddChatMini, this);
            this.btnEvilClear.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEvilClear, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.Up, this);
            this.scene = zj.StageSceneManager.Instance.GetCurScene();
            this.update = egret.setInterval(this.Update, this, 999);
            this.update1 = egret.setInterval(this.ReqMyRank, this, 5000);
            this.update2 = egret.setInterval(this.updateModel, this, 200);
            this.layerDie.visible = false;
            this.playerInfo();
            this.restsInfo();
            this.initCd();
            this.SetInfoUpdate();
            this.RefreshRes();
            this.RunAni();
            this.ReqMyRank();
            this.CalcFormateBattle();
            this.updateFreshChannelTime();
            this.SetInfoCityAndChannel();
            this.Update();
        };
        DarkLandChoose.prototype.close = function () {
            _super.prototype.close.call(this);
            egret.clearInterval(this.update);
            egret.clearInterval(this.update1);
            egret.clearInterval(this.update2);
            egret.Tween.removeTweens(this.groupRogue);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.Up, this);
            var UI = this.getChildByName("WonderlandChooseEvilEnergy");
            if (UI) {
                UI.close();
                UI = null;
            }
            if (this.bar) {
                this.bar.close();
            }
        };
        DarkLandChoose.prototype.Update = function () {
            this.SetInfoUpdate();
            this.RefreshRes();
            this.updateCd();
            this.updateEvil(null);
            this.setFastRogueButton();
            this.updateFreshChannelTime();
        };
        /**积分排名刷新 */
        DarkLandChoose.prototype.ReqMyRank = function () {
            var _this = this;
            zj.Game.PlayerWonderLandSystem.SceneQueryScoreRank(false)
                .then(function (msg) {
                _this.labelMyRank.text = msg.self_rank.rank.toString();
                if (msg.self_rank.rank == 0 || msg.self_rank.score < zj.CommonConfig.darkland_rank_base_score) {
                    _this.labelMyRank.text = zj.TextsConfig.TextsConfig_WonderlandBoss.disAttend;
                }
                else if (msg.self_rank.rank >= 100) {
                    _this.labelMyRank.text = ("100+");
                }
            }).catch(function () {
            });
        };
        /**安全区域与非安全区域切换时左上角头像上的图标切换 */
        DarkLandChoose.prototype.updateModel = function () {
            var _this = this;
            if (this.playerModel == null) {
                this.playerModel = message.EBattleMode.BATTLE_MODE_PEACE;
                zj.Set.ButtonBackgroud(this.btnChange, zj.UIConfig.UIConfig_DarkLand.peace[1]);
            }
            if (this.scene.playerLeader.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FightShowAtk ||
                this.scene.playerLeader.otherState == zj.TableEnum.TableEnumOtherState.OtherState_FightShowBeAtk) {
                return;
            }
            var paths1, paths2, nextModel;
            if (zj.Table.VIn(this.scene.playerLeader.tiggerAreaEventTbl, zj.TableEnum.Enum.PortNpc.SafeLine) && this.playerModel == message.EBattleMode.BATTLE_MODE_FIGHTING) {
                paths1 = zj.UIConfig.UIConfig_DarkLand.battle;
                paths2 = zj.UIConfig.UIConfig_DarkLand.peace;
                nextModel = message.EBattleMode.BATTLE_MODE_PEACE;
            }
            else if ((!zj.Table.VIn(this.scene.playerLeader.tiggerAreaEventTbl, zj.TableEnum.Enum.PortNpc.SafeLine)) && this.playerModel == message.EBattleMode.BATTLE_MODE_PEACE) {
                paths1 = zj.UIConfig.UIConfig_DarkLand.peace;
                paths2 = zj.UIConfig.UIConfig_DarkLand.battle;
                nextModel = message.EBattleMode.BATTLE_MODE_FIGHTING;
            }
            if (paths1 == null) {
                return;
            }
            egret.Tween.get(this.btnChange)
                .to({ scaleX: 0 }, 300)
                .call(function () {
                zj.Set.ButtonBackgroud(_this.btnChange, paths2[1]);
                _this.playerModel = nextModel;
            })
                .to({ scaleX: 1 }, 300);
        };
        /**左上角玩家信息 */
        DarkLandChoose.prototype.playerInfo = function () {
            this.imgHead.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picId), this);
            this.imgFrame.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picFrameId), this);
            this.labelLevel.text = zj.Game.PlayerInfoSystem.BaseInfo.level.toString();
            this.labelLeagueName.text = zj.Game.PlayerInfoSystem.BaseInfo.leagueName;
            this.labelLeagueName.textColor = zj.ConstantConfig_Common.Color.rpg_color.league_title_color;
            this.leagueName.text = zj.Game.PlayerInfoSystem.BaseInfo.name;
            this.leagueName.textColor = zj.ConstantConfig_Common.Color.wonderland_color.leader_color;
            this.imgBar.source = zj.cachekey(zj.yuan3(this.scene.getDarklandMode() == zj.TableEnum.Enum.WonderlandType.WondType_Fight, zj.UIConfig.UIConfig_LeagueWarScene.roleBloodFightBarUi, zj.UIConfig.UIConfig_LeagueWarScene.roleBloodPeaceBarUi), this);
            this.btnReport.visible = true;
            this.CalcFormateBattle();
        };
        /**其他信息 */
        DarkLandChoose.prototype.restsInfo = function () {
            //加速或加血钻石
            for (var i = 3; i <= 4; i++) {
                this["imgSml" + i].source = zj.UIConfig.UIConfig_LeagueWarScene.warHomeIcon[i];
            }
            //加速或加血需要的钻石数
            this.labelBtn3.text = zj.CommonConfig.scene_add_speed_honor[this.scene.sceneType - 1].toString();
            this.labelBtn4.text = zj.CommonConfig.scene_add_blood_token[this.scene.sceneType - 1].toString();
            //显不显示罪恶值
            var can_fight = zj.TableDarkland.Item(zj.Game.PlayerWonderLandSystem.darkland.darklandId).is_battle == 1;
            this.SetModelShow(can_fight);
        };
        /**时时刷新经验条与包裹上的数量小提示 */
        DarkLandChoose.prototype.SetInfoUpdate = function () {
            if (this.thisHp != this.scene.playerLeader.uiHp) {
                this.thisHp = this.scene.playerLeader.uiHp;
                var size_bar = zj.getPercentSize(this.imgBar, this.thisHp / 100);
                this.imgBarBg.width = size_bar.width;
            }
        };
        /**包裹上面的小提示 */
        DarkLandChoose.prototype.setFastRogueButton = function () {
            var resType = zj.Game.PlayerItemSystem.GetWonderlandRogue();
            var count = 0;
            for (var k in resType) {
                if (resType.hasOwnProperty(k)) {
                    var v = resType[k];
                    count = count + zj.Game.PlayerCardSystem.goodsMap[v].count;
                }
            }
            // if (count > 99) {
            // 	this.labelFruitNum.text = "99+";
            // } else {
            this.labelFruitNum.text = count.toString();
            // }
            this.imgFruitNum.visible = (count > 0);
            this.labelFruitNum.visible = (count > 0);
        };
        /**包裹上的小提示动画 */
        DarkLandChoose.prototype.RunAni = function () {
            var roguey = this.groupRogue.y;
            egret.Tween.get(this.groupRogue, { loop: true }).to({ y: roguey - 10 }, 1000, egret.Ease.sineInOut).to({ y: roguey }, 1000, egret.Ease.sineInOut);
        };
        /**积分排名详情 */
        DarkLandChoose.prototype.onBtnAllRank = function () {
            zj.Game.UIManager.loadUI(zj.DarkLandPortRank)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        DarkLandChoose.prototype.updateEvil = function (notShow) {
            if (zj.Game.PlayerWonderLandSystem.darkland.roleInfo["evil_value"] != this.evilValue) {
                if (this.evilValue > zj.Game.PlayerWonderLandSystem.darkland.roleInfo["evil_value"]) {
                    var subnum = this.evilValue - zj.Game.PlayerWonderLandSystem.darkland.roleInfo["evil_value"];
                    if (!notShow) {
                        zj.Common_Tip.AddTip(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.evil_tips_sub, subnum), this.height, this.width);
                    }
                }
                else {
                    var addnum = zj.Game.PlayerWonderLandSystem.darkland.roleInfo["evil_value"] - this.evilValue;
                    zj.Common_Tip.AddTip(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.evil_tips_add, addnum), this.height, this.width);
                }
                this.evilValue = zj.Game.PlayerWonderLandSystem.darkland.roleInfo["evil_value"];
                this.flashEvilNumber();
            }
        };
        /**点击罪恶值显示详情 */
        DarkLandChoose.prototype.onBtnEvil = function () {
            var UI = this.getChildByName("WonderlandChooseEvilEnergy");
            if (UI) {
                UI.visible = true;
                return;
            }
            var ui = zj.newUI(zj.WonderlandChooseEvilEnergy);
            ui.name = "WonderlandChooseEvilEnergy";
            ui.x = 200;
            ui.y = 200;
            this.addChild(ui);
        };
        DarkLandChoose.prototype.Up = function (e) {
            var UI = this.getChildByName("WonderlandChooseEvilEnergy");
            if (UI) {
                UI.visible = false;
            }
        };
        /**加速信息刷新 */
        DarkLandChoose.prototype.dealSpeed = function (tag, value1) {
            if (tag == false) {
                var value = Math.floor(value1 / 1000) + 1;
                this.bFreeSpeed = false;
                this.imgSpeedCdBoard.visible = true;
                this.labelSpeedCd.visible = true;
                this.labelSpeedCd.textColor = zj.ConstantConfig_Rpg.Color.button_speed;
                this.labelBtn3.visible = true;
                this["imgSml" + 3].visible = true;
                this.labelSpeedCd.text = (value + "s");
                this.labelBtn3.text = zj.CommonConfig.scene_add_speed_honor[this.scene.sceneType - 1].toString();
                this.labelSpeedFree.visible = false;
            }
            else {
                this.bFreeSpeed = true;
                this.imgSpeedCdBoard.visible = false;
                this.labelSpeedCd.visible = false;
                this.labelBtn3.visible = false;
                this["imgSml" + 3].visible = false;
                this.labelSpeedFree.visible = true;
                this.labelSpeedFree.text = zj.TextsConfig.TextsConfig_Rpg.free;
            }
        };
        /**加速加血信息初始化 */
        DarkLandChoose.prototype.initCd = function () {
            var cur = this.scene.playerLeader.addSpeedLeftTime;
            if (cur > 0) {
                this.dealSpeed(false, cur);
            }
            else {
                this.dealSpeed(true, null);
            }
            var cur1 = this.scene.playerLeader.addBloodLeftTime;
            if (cur1 > 0) {
                this.dealBlood(false, cur1);
            }
            else {
                this.dealBlood(true, null);
            }
        };
        /**加速加血信息循环刷新 */
        DarkLandChoose.prototype.updateCd = function () {
            var cur = this.scene.playerLeader.addSpeedLeftTime;
            if (cur > 0) {
                this.dealSpeed(false, cur);
            }
            else {
                if (this.bFreeSpeed == false) {
                    this.dealSpeed(true, null);
                }
            }
            var cur1 = this.scene.playerLeader.addBloodLeftTime;
            if (cur1 > 0) {
                this.dealBlood(false, cur1);
            }
            else {
                if (this.bFreeBlood == false) {
                    this.dealBlood(true, null);
                }
            }
        };
        /**罪恶值 加速 加血显示 */
        DarkLandChoose.prototype.SetModelShow = function (enable) {
            this.btnEvil.visible = enable;
            this.labelEvillValue.visible = enable;
            this.btnEvilClear.visible = enable;
        };
        /**清除罪恶值 */
        DarkLandChoose.prototype.onBtnEvilClear = function () {
            var _this = this;
            if (this.evilValue == 0) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Wonderland.clear_zero);
            }
            else {
                var cost = this.evilValue * zj.CommonConfig.wonderland_evil_token;
                zj.TipManager.ShowConfirmCancel(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.clear_tips, cost, this.evilValue), function () {
                    zj.Game.PlayerWonderLandSystem.SceneClearEvil().then(function () {
                        zj.toast_success(zj.TextsConfig.TextsConfig_Wonderland.clear_success_tips);
                        _this.updateEvil(true);
                        zj.Game.PlayerWonderLandSystem.darkland.roleInfo["evil_value"] = 0;
                    }).catch(function (result) {
                        if (result == message.EC.XG_LACK_TOKEN) {
                            zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Money.demstone, function () {
                                zj.loadUI(zj.PayMallScene)
                                    .then(function (scene) {
                                    scene.show(zj.UI.SHOW_FROM_TOP);
                                    scene.init(true);
                                });
                            });
                        }
                    });
                });
            }
        };
        /**罪恶值赋值 */
        DarkLandChoose.prototype.flashEvilNumber = function () {
            this.labelEvillValue.text = zj.Game.PlayerWonderLandSystem.darkland.roleInfo["evil_value"];
        };
        /**加血信息刷新 */
        DarkLandChoose.prototype.dealBlood = function (tag, value1) {
            if (tag == false) {
                var value = Math.floor(value1 / 1000) + 1;
                this.bFreeBlood = false;
                this.imgBloodCdBoard.visible = true;
                this.labelBloodCd.visible = true;
                this.labelBloodCd.textColor = zj.ConstantConfig_Rpg.Color.button_blood;
                this.labelBtn4.visible = true;
                this["imgSml" + 4].visible = true;
                this.labelBloodCd.text = (value + "s");
                this.labelBtn4.text = zj.CommonConfig.scene_add_blood_token[this.scene.sceneType - 1].toString();
                this.labelBloodFree.visible = false;
            }
            else {
                this.bFreeBlood = true;
                this.imgBloodCdBoard.visible = false;
                this.labelBloodCd.visible = false;
                this.labelBtn4.visible = false;
                this["imgSml" + 4].visible = false;
                this.labelBloodFree.visible = true;
                this.labelBloodFree.text = zj.TextsConfig.TextsConfig_Rpg.free;
            }
        };
        /**胶囊加号按钮点击 */
        DarkLandChoose.prototype.onBtnPlant = function () {
            var _this = this;
            var viplevel = zj.TableVipinfo.Table()[Object.keys(zj.TableVipinfo.Table()).length - 1].level;
            var Licence = function (vipLv) {
                var lv = vipLv ? vipLv : zj.Game.PlayerInfoSystem.BaseInfo.licenceLevel;
                return zj.TableLicence.Item(lv);
            };
            if (zj.Game.PlayerInfoSystem.BaseInfo.vipLevel == viplevel || Licence().buy_plate > zj.Game.PlayerVIPSystem.vipInfo.buyPlate || Licence(zj.Game.PlayerInfoSystem.BaseInfo.licenceLevel + 1).buy_plate <= Licence().buy_plate) {
                var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.buy_plate, zj.CommonConfig.plate_buy_token(zj.Game.PlayerVIPSystem.vipInfo.buyPlate), zj.CommonConfig.role_buy_add_plate, Licence().buy_plate - zj.Game.PlayerVIPSystem.vipInfo.buyPlate, Licence().buy_plate);
                zj.TipManager.ShowConfirmCancel(str, function () {
                    zj.Game.PlayerWonderLandSystem.BuyPlate().then(function () {
                        var str_power = zj.Helper.StringFormat("+%d", zj.CommonConfig.role_buy_add_plate);
                        zj.TipManager.GetResource(str_power, message.EResourceType.RESOURCE_GOLD_PLATE, _this.height / 2);
                        // if this._cb then this._cb() end
                    }).catch(function (result) {
                        if (result == message.EC.XG_POWER_BUY_LIMIT) {
                            var str_1 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.err_buy_plate, zj.Game.PlayerVIPSystem.vipInfo.buyPlate, Licence().buy_plate);
                            zj.TipManager.ShowTipsAndGoVip(str_1, _this, zj.TableEnum.Enum.Vip.CHARGE, null);
                        }
                        else if (result == message.EC.XG_LACK_TOKEN) {
                            zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Money.demstone, function () {
                                zj.loadUI(zj.PayMallScene)
                                    .then(function (scene) {
                                    scene.show(zj.UI.SHOW_FROM_TOP);
                                    scene.init(false);
                                    scene.loadFrom(zj.StageSceneManager.Instance.GetCurScene().mm || zj.TableEnum.Enum.HXHChargeType.Charge);
                                });
                            });
                        }
                        else {
                        }
                    });
                });
            }
            else {
                var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.err_buy_plate, zj.Game.PlayerVIPSystem.vipInfo.buyPlate, Licence().buy_plate);
                zj.TipManager.ShowTipsAndGoVip(str, zj.TableEnum.Enum.Vip.CHARGE);
            }
        };
        /**钻石加号按钮点击 */
        DarkLandChoose.prototype.onBtnGold = function () {
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(false);
            });
        };
        /**包裹 */
        DarkLandChoose.prototype.onBtnRogue = function () {
            var rogue = zj.Game.PlayerItemSystem.GetWonderlandRogue();
            var bPush = zj.Table.FindF(rogue, function (k, v) {
                return zj.Game.PlayerCardSystem.goodsMap[v].count > 0;
            });
            if (bPush) {
                zj.TipManager.OneKeySell(zj.TableEnum.Enum.OneKeySell.Rogue, null);
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Wonderland.no_Rogue);
            }
        };
        /**阵容 */
        DarkLandChoose.prototype.onBtnTeam = function () {
            var _this = this;
            zj.Game.UIManager.loadUI(zj.Wonderland_Formate)
                .then(function (scene) {
                scene.SetFather(_this);
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**战报 */
        DarkLandChoose.prototype.onBtnReport = function () {
            zj.loadUI(zj.WonderlandFastBattle)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**果实背包 */
        DarkLandChoose.prototype.onBtnFruit = function () {
            zj.loadUI(zj.HXH_WonderlandFruitBag)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
            zj.Teach.addTeaching();
        };
        /**加速按钮点击 */
        DarkLandChoose.prototype.onBtn1 = function () {
            var _this = this;
            if (this.scene.playerLeader.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Wonderland.die_error_tips);
                return;
            }
            if (this.scene.isTouchUiEnabled() == false) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Wonderland.battle_error_tips);
                return;
            }
            zj.Game.PlayerWonderLandSystem.SceneFaster().then(function () {
                zj.toast_success(zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.war_buff_speed, (zj.ConstantConfig_RoleBattle.FASTER_SPEED_PROMOTE_PERCENT - 1) * 100, zj.CommonConfig.scene_add_speed_duration[1]));
                _this.RefreshRes();
                _this.scene.playerLeader.dealWonderlandRoleInfo(zj.Game.PlayerWonderLandSystem.darkland.roleInfo);
            }).catch(function () {
            });
        };
        /**加血按钮点击 */
        DarkLandChoose.prototype.onBtn2 = function () {
            var _this = this;
            if (this.scene.playerLeader.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Wonderland.die_error_tips);
                return;
            }
            if (this.scene.isTouchUiEnabled() == false) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Wonderland.battle_error_tips);
                return;
            }
            zj.Game.PlayerWonderLandSystem.SceneAddBlood().then(function () {
                zj.toast_success(zj.TextsConfig.TextConfig_League.war_buff_blood);
                _this.RefreshRes();
                _this.scene.playerLeader.addSceneBuff(zj.TableEnum.Enum.SceneBuffType.RecoverBlood, -1);
                _this.scene.playerLeader.dealWonderlandRoleInfo(zj.Game.PlayerWonderLandSystem.darkland.roleInfo);
            }).catch(function () {
            });
        };
        /**右上角胶囊钻石数据刷新 */
        DarkLandChoose.prototype.RefreshRes = function () {
            if (this.tokenBefore != zj.Game.PlayerInfoSystem.BaseInfo.token) {
                this.tokenBefore = zj.Game.PlayerInfoSystem.BaseInfo.token;
                if (zj.Game.PlayerInfoSystem.BaseInfo.token > 100000) {
                    this.labelGold.text = (zj.Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
                }
                else {
                    this.labelGold.text = zj.Game.PlayerInfoSystem.BaseInfo.token.toString();
                }
            }
            if (this.plateBefore != zj.Game.PlayerInfoSystem.BaseInfo.goldPlate) {
                this.plateBefore = zj.Game.PlayerInfoSystem.BaseInfo.goldPlate;
                this.labelPlant.text = (zj.Game.PlayerInfoSystem.BaseInfo.goldPlate + "/" + zj.CommonConfig.role_gold_plate_max);
            }
        };
        /**立即复活 */
        DarkLandChoose.prototype.onBtnRevive = function () {
            var _this = this;
            this.scene.revivePersonReq(function () {
                _this.time_id = -1;
                egret.clearInterval(_this.time_id); //取消指定的定时器
                _this.layerDie.visible = false;
            });
        };
        /**关闭页面 */
        DarkLandChoose.prototype.onBtnClose = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (scene.playerLeader.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                zj.toast_success(zj.TextsConfig.TextsConfig_Wonderland.die_error_tips);
                return;
            }
            if (scene.isTouchUiEnabled() == false) {
                zj.toast_success(zj.TextsConfig.TextsConfig_Wonderland.battle_error_tips);
                return;
            }
            var _a = scene.isCanLeaveScene(), tag = _a[0], code = _a[1];
            if (tag == true) {
                zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Wonderland.return_tip, function () {
                    zj.Game.PlayerWonderLandSystem.havenClose();
                });
            }
            else {
                if (zj.TextsConfig.TextsConfig_Rpg.leave_error[code] != null) {
                    zj.toast_success(zj.TextsConfig.TextsConfig_Rpg.leave_error[code]);
                }
            }
        };
        /**阵容战斗力 */
        DarkLandChoose.prototype.CalcFormateBattle = function () {
            this.generalIdList = [];
            var serverFormat = zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND];
            var serverFormatTogether = [];
            for (var k in serverFormat.generals) {
                if (serverFormat.generals.hasOwnProperty(k)) {
                    var v = serverFormat.generals[k];
                    serverFormatTogether.push(v);
                }
            }
            for (var k in serverFormat.reserves) {
                if (serverFormat.reserves.hasOwnProperty(k)) {
                    var v = serverFormat.reserves[k];
                    serverFormatTogether.push(v);
                }
            }
            var hasServerFormat = zj.Table.FindF(serverFormatTogether, function (k, v) {
                var haveSame = false;
                for (var kk in serverFormat.generals) {
                    if (serverFormat.generals.hasOwnProperty(k)) {
                        var vv = serverFormat.generals[k];
                        if (vv != 0 && vv != v && zj.PlayerHunterSystem.GetGeneralId(vv) == zj.PlayerHunterSystem.GetGeneralId(v)) {
                            haveSame = true;
                        }
                        if (v != 0 && !haveSame) {
                            return true;
                        }
                        return false;
                    }
                }
            });
            var generalList, isChange;
            if (hasServerFormat) {
                for (var k in serverFormat.generals) {
                    if (serverFormat.generals.hasOwnProperty(k)) {
                        var v = serverFormat.generals[k];
                        if (v != 0) {
                            this.generalIdList.push(v);
                        }
                    }
                }
                for (var k in serverFormat.reserves) {
                    if (serverFormat.reserves.hasOwnProperty(k)) {
                        var v = serverFormat.reserves[k];
                        this.generalIdList.push(v);
                    }
                }
                var a = new message.FormationInfo();
                a.generals = this.generalIdList;
                _a = zj.Game.PlayerHunterSystem.getWonderlandGeneral(a), generalList = _a[0], isChange = _a[1];
            }
            else {
                _b = zj.Game.PlayerHunterSystem.getWonderlandGeneral(null), generalList = _b[0], isChange = _b[1];
            }
            var battle = 0;
            for (var k in generalList) {
                if (generalList.hasOwnProperty(k)) {
                    var v = generalList[k];
                    battle += v.battle;
                }
            }
            this.labelPlayerPower.text = (zj.Set.NumberUnit3(battle));
            var _a, _b;
        };
        DarkLandChoose.prototype.AddChatMini = function () {
            zj.loadUI(zj.Chat_Main)
                .then(function (dialog) {
                dialog.show();
            });
        };
        DarkLandChoose.prototype.SetDieTime = function (time) {
            this.layerDie.visible = (this.showDie);
            this.time_meter = this.scene.playerLeader.dieProtectTime;
            this.labelLeftTime.text = Math.floor(this.time_meter / 1000).toString();
            this.time_id = egret.setInterval(this.OnthisTimeKeeper, this, 333);
            this.labelConsume.text = zj.CommonConfig.scene_clear_dead_cooling_consume[this.scene.sceneType - 1].toString();
            // this.isPushChange = false
            // this.LayerChange:setOpacity(0)
            // this.LayerChange:setScale(0)
            function getWonderlandDieTimeAdd(value) {
                var table = zj.TableEvilZone.Table();
                for (var k in table) {
                    if (table.hasOwnProperty(k)) {
                        var v = table[k];
                        if (value >= v.evil_min && value <= v.evil_max) {
                            return v.revived_time;
                        }
                    }
                }
            }
            var info = zj.Game.PlayerWonderLandSystem.darkland.roleInfo;
            var addTime = getWonderlandDieTimeAdd(info.evil_value);
        };
        DarkLandChoose.prototype.OnthisTimeKeeper = function () {
            if (this.time_id == -1) {
                return;
            }
            if (this.scene.playerLeader == null) {
                return;
            }
            this.time_meter = this.scene.playerLeader.dieProtectTime;
            var _posState = this.scene.playerLeader.posState;
            var realTime = Math.floor(this.time_meter / 1000);
            if (realTime >= 0 && this.scene.playerLeader.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                this.labelLeftTime.text = (realTime).toString();
            }
            else {
                egret.clearInterval(this.time_id);
                this.showDie = true;
                this.layerDie.visible = false;
                this.time_id = -1;
            }
        };
        /**退出场景协议 */
        DarkLandChoose.prototype.LeaveDarkSceneReq = function () {
        };
        //////////////////////////////////////////////////////////////////////////
        /////////////////////////////////城市分区相关//////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        DarkLandChoose.prototype.updateFreshChannelTime = function () {
            if (zj.Game.PlayerWonderLandSystem.darkland.freshChannelTime <= zj.Game.PlayerInstanceSystem.curServerTime) {
                this.labelChangChannelTime.visible = (false);
                this.btnSeeChannel.enabled = (true);
            }
            else {
                var lastTime = zj.Game.PlayerWonderLandSystem.darkland.freshChannelTime - zj.Game.PlayerInstanceSystem.curServerTime;
                this.labelChangChannelTime.visible = (true);
                this.btnSeeChannel.enabled = (false);
                this.labelChangChannelTime.text = Math.floor(lastTime).toString();
            }
        };
        DarkLandChoose.prototype.SetInfoCityAndChannel = function () {
            var channelID = zj.Game.PlayerWonderLandSystem.darkland.channelId % 100;
            this.TextCity.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_DarkLand.curPortCity, zj.Game.PlayerWonderLandSystem.darkland.cityId);
            this.labelSelectedChannel.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_DarkLand.curPortChannel, channelID);
            // this.ChannelList = {}
            // this.CityServerList = {}
            this.SetCityServerList();
            // this.groupCityServer.visible = false;
            this.channelInfo = [];
            // this.selectChannelId = -1;
            this.channelShow = 2;
            // this.channelListScale = this.LayerChannelList:getScale()
            // this.LayerChannelList.setScaleY(0)
        };
        DarkLandChoose.prototype.SetCityServerList = function () {
            var info = zj.Game.PlayerWonderLandSystem.darkland.cityServerInfo;
            for (var k in info) {
                if (info.hasOwnProperty(k)) {
                    var v = info[k];
                    if (v == "") {
                        info.splice(Number(k));
                    }
                }
            }
            var array = new eui.ArrayCollection();
            for (var i = 0; i < info.length; i++) {
                var data = new zj.DarkLandChooseCityItemData();
                data.index = i;
                data.info = info[i];
                array.addItem(data);
            }
            this.TableViewCityServer.dataProvider = array;
            this.TableViewCityServer.itemRenderer = zj.DarkLandChooseCityItem;
        };
        /**切换分线 */
        DarkLandChoose.prototype.ChangeChannel = function () {
            if (this.scene.playerLeader.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Wonderland.die_error_tips);
                return;
            }
            if (this.selectChannelId == -1) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_DarkLand.pleaseChooseChannel);
                return;
            }
            if (this.selectChannelId == zj.Game.PlayerWonderLandSystem.darkland.channelId) {
                var ChannelId = this.selectChannelId % 100;
                zj.toast_warning(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_DarkLand.inThisChannel, ChannelId));
                return;
            }
            if (this.scene.isTouchUiEnabled() == false) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Wonderland.battle_error_tips);
                return;
            }
            var _a = this.scene.isCanLeaveScene(), tag = _a[0], code = _a[1];
            if (tag == true) {
                this.ChangeBranchReq();
            }
            else {
                if (zj.TextsConfig.TextsConfig_Rpg.leave_error[code] != null) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Rpg.leave_error[code]);
                }
            }
        };
        DarkLandChoose.prototype.ChangeBranchReq = function () {
            var _this = this;
            zj.Game.PlayerWonderLandSystem.SceneChangeBranchInfo(this.selectChannelId).then(function () {
                var ChannelId = _this.selectChannelId % 100;
                zj.Game.PlayerWonderLandSystem.darkland.freshChannelTime = zj.Game.Controller.curServerTime + 30;
                zj.toast_success(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_DarkLand.successChannel, ChannelId));
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneDarkland);
            }).catch(function () {
                //拉取分线列表
                _this.ReqChannelList();
            });
        };
        DarkLandChoose.prototype.ReqChannelList = function () {
            var _this = this;
            zj.Game.PlayerWonderLandSystem.SceneGetBranchInfo().then(function (msg) {
                _this.channelInfo = [];
                for (var k in msg.branchInfo) {
                    if (msg.branchInfo.hasOwnProperty(k)) {
                        var v = msg.branchInfo[k];
                        _this.channelInfo.push(v);
                    }
                }
                _this.channelInfo.sort(function (a, b) {
                    return a.key - b.key;
                });
                _this.SetChannelList();
            }).catch(function () {
            });
        };
        DarkLandChoose.prototype.SetChannelList = function () {
            var array = new eui.ArrayCollection();
            for (var i = 0; i < this.channelInfo.length; i++) {
                var data = new zj.DarkLandChooseChannelItemData();
                data.index = i;
                data.info = this.channelInfo[i];
                data.father = this;
                array.addItem(data);
            }
            this.listChannel.dataProvider = array;
            this.listChannel.itemRenderer = zj.DarkLandChooseChannelItem;
        };
        DarkLandChoose.prototype.onBtnCityBegin = function () {
            this.groupCityServer.visible = true;
        };
        DarkLandChoose.prototype.onBtnCityUp = function () {
            this.groupCityServer.visible = false;
        };
        DarkLandChoose.prototype.onBtnSeeChannel = function () {
            var _this = this;
            this.ReqChannelList();
            if (this.channelShow == 0) {
                return;
            }
            if (this.channelShow == 1) {
                this.channelShow = 0;
                egret.Tween.get(this.LayerChannelList).to({ scaleY: 0 }, 300).call(function () {
                    _this.channelShow = 2;
                    _this.LayerChannelList.visible = false;
                });
            }
            else if (this.channelShow == 2) {
                this.channelShow = 0;
                this.LayerChannelList.visible = true;
                egret.Tween.get(this.LayerChannelList).to({ scaleY: 1 }, 300).call(function () {
                    _this.channelShow = 1;
                });
            }
        };
        DarkLandChoose.prototype.addControlPop = function (time, type) {
            if (!this.bar) {
                this.bar = zj.newUI(zj.HXH_WonderlandFruitCollection);
            }
            this.addChild(this.bar);
            this.bar.setInfo(time, type);
        };
        DarkLandChoose.prototype.deleteControlPop = function () {
            if (this.bar && this.bar.parent) {
                this.bar.clearTime();
                this.bar.parent.removeChild(this.bar);
            }
        };
        return DarkLandChoose;
    }(zj.Dialog));
    zj.DarkLandChoose = DarkLandChoose;
    __reflect(DarkLandChoose.prototype, "zj.DarkLandChoose");
})(zj || (zj = {}));
//# sourceMappingURL=DarkLandChoose.js.map
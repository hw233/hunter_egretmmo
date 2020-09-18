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
     * @date 2019-6-13
     *
     * @class 贪婪之岛大草原安多尼拔
     */
    var WonderLandChoose = (function (_super) {
        __extends(WonderLandChoose, _super);
        function WonderLandChoose() {
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
            _this.evilValue = 0;
            _this.time_id = 0;
            _this.skinName = "resource/skins/wonderland/WonderLandChooseSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.time = egret.setTimeout(_this.timeFun, _this, 200);
            _this.init();
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this);
            }, null);
            return _this;
        }
        WonderLandChoose.prototype.timeFun = function () {
            egret.clearTimeout(this.time);
            var ui = this.getChildByName("__rect_back");
            if (ui) {
                this.removeChild(ui);
            }
        };
        WonderLandChoose.prototype.init = function () {
            var _this = this;
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
            this.btnChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.AddChatMini, this);
            this.btnEvilClear.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEvilClear, this);
            this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTest, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.clearInterval(_this.update);
                _this.scene = null;
                egret.Tween.removeTweens(_this.groupRogue);
                zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.RoleInfoNotice_Visit, _this);
            }, this);
            this.scene = zj.StageSceneManager.Instance.GetCurScene();
            this.update = egret.setInterval(this.Update, this, 999, 1 / 60);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, this.RoleInfoNotice_Visit, this);
            this.imgBar.mask = this.imgBarBg;
            this.layerDie.visible = false;
            this.playerInfo();
            this.restsInfo();
            this.initCd();
            this.SetInfoUpdate();
            this.RefreshRes();
            this.RunAni();
            this.flashModel();
            this.flashEvilNumber();
            // this.AddChatMini();
            this.Update();
            if (zj.Device.isReviewSwitch) {
                this.groupBattleArray.visible = false;
                this.RimgGroup.x = 585;
                this.groupParcel.right = 338;
                this.imgRightBg.width = 390;
                this.jewel2.width = 40;
                this.jewel2.height = 40;
                this.jewel.width = 40;
                this.jewel.height = 40;
                this.jewel.y = -8;
                this.imgSml3.width = 40;
                this.imgSml3.height = 40;
                this.imgSml4.width = 40;
                this.imgSml4.height = 40;
                this.groupDieCost.visible = false;
                this.btnRevive.visible = false;
                this.description.visible = false;
            }
        };
        WonderLandChoose.prototype.close = function () {
            _super.prototype.close.call(this);
            egret.clearInterval(this.update);
            this.scene = null;
            egret.Tween.removeTweens(this.groupRogue);
            if (this.bar) {
                this.bar.release();
                this.bar.close();
            }
        };
        WonderLandChoose.prototype.Update = function () {
            this.SetInfoUpdate();
            this.RefreshRes();
            this.updateCd();
            this.updateEvil(null);
            this.setFastRogueButton();
        };
        /**左上角玩家信息 */
        WonderLandChoose.prototype.playerInfo = function () {
            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                this.imgHead.source = zj.cachekey("wx_" + zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picId), this);
            }
            else {
                this.imgHead.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picId), this);
            }
            this.imgFrame.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picFrameId), this);
            this.labelLevel.text = zj.Game.PlayerInfoSystem.BaseInfo.level.toString();
            this.labelLeagueName.text = zj.Game.PlayerInfoSystem.BaseInfo.leagueName;
            this.labelLeagueName.textColor = zj.ConstantConfig_Common.Color.rpg_color.league_title_color;
            this.leagueName.text = zj.Game.PlayerInfoSystem.BaseInfo.name;
            this.leagueName.textColor = zj.ConstantConfig_Common.Color.wonderland_color.leader_color;
            this.imgBar.source = zj.cachekey((zj.yuan3(this.scene.getWonderlandMode() == zj.TableEnum.Enum.WonderlandType.WondType_Fight, zj.UIConfig.UIConfig_LeagueWarScene.roleBloodFightBarUi, zj.UIConfig.UIConfig_LeagueWarScene.roleBloodPeaceBarUi)), this);
            this.btnReport.visible = true;
            this.CalcFormateBattle();
        };
        /**其他信息 */
        WonderLandChoose.prototype.restsInfo = function () {
            //加速或加血钻石
            for (var i = 3; i <= 4; i++) {
                this["imgSml" + i].source = zj.cachekey(zj.UIConfig.UIConfig_LeagueWarScene.warHomeIcon[i], this);
            }
            //加速或加血需要的钻石数
            this.labelBtn3.text = zj.CommonConfig.scene_add_speed_honor[this.scene.sceneType - 1].toString();
            this.labelBtn4.text = zj.CommonConfig.scene_add_blood_token[this.scene.sceneType - 1].toString();
            //显不显示罪恶值
            var can_fight = zj.TableWonderland.Item(zj.Game.PlayerWonderLandSystem.wonderlandId).is_battle == 1;
            this.SetModelShow(can_fight);
        };
        /**加速加血信息初始化 */
        WonderLandChoose.prototype.initCd = function () {
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
        WonderLandChoose.prototype.updateCd = function () {
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
        /**加速信息刷新 */
        WonderLandChoose.prototype.dealSpeed = function (tag, value1) {
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
        /**加血信息刷新 */
        WonderLandChoose.prototype.dealBlood = function (tag, value1) {
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
        /**关闭页面 */
        WonderLandChoose.prototype.onBtnClose = function () {
            var _this = this;
            zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, this.RoleInfoNotice_Visit, this);
            if (zj.StageSceneManager.Instance.GetCurScene().playerLeader.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                zj.toast_success(zj.TextsConfig.TextsConfig_Wonderland.die_error_tips);
                return;
            }
            if (zj.StageSceneManager.Instance.GetCurScene().isTouchUiEnabled() == false) {
                zj.toast_success(zj.TextsConfig.TextsConfig_Wonderland.battle_error_tips);
                return;
            }
            var _a = zj.StageSceneManager.Instance.GetCurScene().isCanLeaveScene(), tag = _a[0], code = _a[1];
            if (tag == true) {
                zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Wonderland.return_tip, function () {
                    zj.Game.PlayerWonderLandSystem.prairieClose(_this.closeFinish, _this);
                });
            }
            else {
                if (zj.TextsConfig.TextsConfig_Rpg.leave_error[code] != null) {
                    zj.toast_success(zj.TextsConfig.TextsConfig_Rpg.leave_error[code]);
                }
            }
        };
        WonderLandChoose.prototype.closeFinish = function () {
            zj.SceneManager.initType = 2;
            zj.SceneManager.instance.EnterMainCityNew();
        };
        /**胶囊加号按钮点击 */
        WonderLandChoose.prototype.onBtnPlant = function () {
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
        WonderLandChoose.prototype.onBtnGold = function () {
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(false);
            });
        };
        /**右上角胶囊钻石数据刷新 */
        WonderLandChoose.prototype.RefreshRes = function () {
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
        /**战斗力 */
        WonderLandChoose.prototype.CalcFormateBattle = function () {
            var serverFormat = zj.Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND];
            var generalList = zj.Game.PlayerHunterSystem.getWonderlandGeneral(serverFormat)[0];
            var battle = 0;
            for (var k in generalList) {
                if (generalList.hasOwnProperty(k)) {
                    var v = generalList[k];
                    battle += v.battle;
                }
            }
            this.labelPlayerPower.text = (zj.Set.NumberUnit3(battle));
        };
        /**罪恶值 加速 加血显示 */
        WonderLandChoose.prototype.SetModelShow = function (enable) {
            this.btnEvil.visible = enable;
            this.labelEvillValue.visible = enable;
            this.btnEvilClear.visible = enable;
        };
        WonderLandChoose.prototype.onBtnTest = function () {
            // let scene: StageSceneWonderland = this.scene;
            // scene.onPrint();
        };
        /**清除罪恶值 */
        WonderLandChoose.prototype.onBtnEvilClear = function () {
            var _this = this;
            if (this.evilValue == 0) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Wonderland.clear_zero);
            }
            else {
                var cost = this.evilValue * zj.CommonConfig.wonderland_evil_token;
                zj.TipManager.ShowConfirmCancel(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.clear_tips, cost, this.evilValue), function () {
                    zj.Game.PlayerWonderLandSystem.WonderlandClearEvil().then(function () {
                        zj.toast_success(zj.TextsConfig.TextsConfig_Wonderland.clear_success_tips);
                        _this.updateEvil(true);
                        zj.Game.PlayerWonderLandSystem.roleInfo.evil_value = 0;
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
        WonderLandChoose.prototype.updateEvil = function (notShow) {
            if (zj.Game.PlayerWonderLandSystem.roleInfo.evil_value != this.evilValue) {
                if (this.evilValue > zj.Game.PlayerWonderLandSystem.roleInfo.evil_value) {
                    var subnum = this.evilValue - zj.Game.PlayerWonderLandSystem.roleInfo.evil_value;
                    if (!notShow) {
                        zj.Common_Tip.AddTip(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.evil_tips_sub, subnum), zj.UIManager.StageHeight, zj.UIManager.StageWidth);
                    }
                }
                else {
                    var addnum = zj.Game.PlayerWonderLandSystem.roleInfo.evil_value - this.evilValue;
                    // Common_Tip.AddTip(Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.evil_tips_add, addnum), UIManager.StageHeight, UIManager.StageWidth);
                }
                this.evilValue = zj.Game.PlayerWonderLandSystem.roleInfo.evil_value;
                this.flashEvilNumber();
            }
        };
        /**罪恶值赋值 */
        WonderLandChoose.prototype.flashEvilNumber = function () {
            this.labelEvillValue.text = zj.Game.PlayerWonderLandSystem.roleInfo.evil_value;
        };
        /**玩家信息右边圆形图标（战斗或和平）切换 */
        WonderLandChoose.prototype.flashModel = function () {
            if (zj.Game.PlayerWonderLandSystem.roleInfo.posInfo.battleMode == message.EBattleMode.BATTLE_MODE_PEACE) {
                zj.Set.ButtonBackgroud(this.btnChange, zj.UIConfig.UIConfig_Wonderland.peace[1], zj.UIConfig.UIConfig_Wonderland.peace[2], zj.UIConfig.UIConfig_Wonderland.peace[3]);
            }
            else if (zj.Game.PlayerWonderLandSystem.roleInfo.posInfo.battleMode == message.EBattleMode.BATTLE_MODE_FIGHTING) {
                zj.Set.ButtonBackgroud(this.btnChange, zj.UIConfig.UIConfig_Wonderland.battle[1], zj.UIConfig.UIConfig_Wonderland.battle[2], zj.UIConfig.UIConfig_Wonderland.battle[3]);
            }
            else if (zj.Game.PlayerWonderLandSystem.roleInfo.posInfo.battleMode == message.EBattleMode.BATTLE_MODE_KILLING) {
                zj.Set.ButtonBackgroud(this.btnChange, zj.UIConfig.UIConfig_Wonderland.kill[1], zj.UIConfig.UIConfig_Wonderland.kill[2], zj.UIConfig.UIConfig_Wonderland.kill[3]);
            }
        };
        /**包裹 */
        WonderLandChoose.prototype.onBtnRogue = function () {
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
        WonderLandChoose.prototype.onBtnTeam = function () {
            var _this = this;
            zj.Game.UIManager.loadUI(zj.Wonderland_Formate)
                .then(function (scene) {
                scene.SetFather(_this);
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**战报 */
        WonderLandChoose.prototype.onBtnReport = function () {
            zj.loadUI(zj.WonderlandFastBattle)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**果实背包 */
        WonderLandChoose.prototype.onBtnFruit = function () {
            zj.loadUI(zj.HXH_WonderlandFruitBag)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
            zj.Teach.addTeaching();
        };
        /**时时刷新经验条与包裹上的数量小提示 */
        WonderLandChoose.prototype.SetInfoUpdate = function () {
            this.thisHp = this.scene.playerLeader.uiHp;
            var size_bar = zj.getPercentSize(this.imgBar, this.thisHp / 100);
            this.imgBarBg.width = size_bar.width;
        };
        /**包裹上面的小提示 */
        WonderLandChoose.prototype.setFastRogueButton = function () {
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
        /**加速按钮点击 */
        WonderLandChoose.prototype.onBtn1 = function () {
            var _this = this;
            if (this.scene.playerLeader.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Wonderland.die_error_tips);
                return;
            }
            if (this.scene.isTouchUiEnabled() == false) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Wonderland.battle_error_tips);
                return;
            }
            zj.Game.PlayerWonderLandSystem.WonderlandFaster().then(function () {
                zj.toast_success(zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.war_buff_speed, (zj.ConstantConfig_RoleBattle.FASTER_SPEED_PROMOTE_PERCENT - 1) * 100, zj.CommonConfig.scene_add_speed_duration[1]));
                _this.RefreshRes();
                _this.scene.playerLeader.dealWonderlandRoleInfo(zj.Game.PlayerWonderLandSystem.roleInfo);
            }).catch(function () {
            });
        };
        /**加血按钮点击 */
        WonderLandChoose.prototype.onBtn2 = function () {
            var _this = this;
            if (this.scene.playerLeader.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Wonderland.die_error_tips);
                return;
            }
            if (this.scene.isTouchUiEnabled() == false) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Wonderland.battle_error_tips);
                return;
            }
            zj.Game.PlayerWonderLandSystem.WonderlandAddBlood().then(function () {
                zj.toast_success(zj.TextsConfig.TextConfig_League.war_buff_blood);
                _this.RefreshRes();
                _this.scene.playerLeader.addSceneBuff(zj.TableEnum.Enum.SceneBuffType.RecoverBlood, -1);
                _this.scene.playerLeader.dealWonderlandRoleInfo(zj.Game.PlayerWonderLandSystem.roleInfo);
            }).catch(function () {
            });
        };
        /**立即复活 */
        WonderLandChoose.prototype.onBtnRevive = function () {
            var _this = this;
            this.scene.revivePersonReq(function () {
                _this.time_id = -1;
                egret.clearInterval(_this.time_id); //取消指定的定时器
                _this.layerDie.visible = false;
            });
        };
        /**外部调用 */
        WonderLandChoose.prototype.SetDieTime = function (time) {
            this.layerDie.visible = (this.showDie);
            this.time_meter = this.scene.playerLeader.dieProtectTime;
            this.labelLeftTime.text = (Math.ceil(this.time_meter / 1000 - zj.TableVipinfo.Item(zj.Game.PlayerInfoSystem.BaseInfo.vipLevel).scene_revive_time)).toString();
            this.time_id = egret.setInterval(this.OnthisTimeKeeper, this, 0.33);
            if (zj.CommonConfig.wonderland_rebirth_token_comsume(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.wonderlandRebirthTime) == 0) {
                this.labelConsume.text = zj.TextsConfig.TextsConfig_Wonderland.first_free;
            }
            else {
                this.labelConsume.text = zj.CommonConfig.wonderland_rebirth_token_comsume(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.wonderlandRebirthTime).toString();
            }
        };
        WonderLandChoose.prototype.OnthisTimeKeeper = function () {
            if (this.time_id == -1 || this.scene.playerLeader == null) {
                return;
            }
            this.time_meter = this.scene.playerLeader.dieProtectTime;
            var _posState = this.scene.playerLeader.posState;
            var realTime = Math.ceil(this.time_meter / 1000 - zj.TableVipinfo.Item(zj.Game.PlayerInfoSystem.BaseInfo.vipLevel).scene_revive_time);
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
        /**获得物品时弹提示 */
        WonderLandChoose.prototype.RoleInfoNotice_Visit = function (e) {
            var request = e.data;
            // if (request.header.id) {
            var goodsList = request.body.gameInfo.getGoods;
            if (goodsList && goodsList.length > 0) {
                var getGold = false;
                var loseGold = false;
                var lose_good = [];
                var good_1 = [];
                var fightGoods = [];
                for (var k in goodsList) {
                    if (goodsList.hasOwnProperty(k)) {
                        var v = goodsList[k];
                        if (zj.Game.PlayerWonderLandSystem.wonderlandId == 1 || zj.Game.PlayerWonderLandSystem.wonderlandId == 4) {
                            getGold = true;
                            good_1.push(v);
                            fightGoods.push(v);
                        }
                        else {
                            if (v.index == 1) {
                                getGold = true;
                                good_1.push(v);
                                fightGoods.push(v);
                            }
                            else if (v.index == 2) {
                                loseGold = true;
                                lose_good.push(v);
                                fightGoods.push(v);
                            }
                        }
                    }
                }
                if (zj.Game.PlayerWonderLandSystem.resultList.length != 0 && zj.Game.PlayerWonderLandSystem.resultList != null && fightGoods != null && fightGoods.length != 0) {
                    if (zj.Game.PlayerWonderLandSystem.resultList[0].goods == null) {
                        zj.Game.PlayerWonderLandSystem.resultList[0].goods = zj.Table.DeepCopy(zj.Game.PlayerWonderLandSystem.getGoods);
                    }
                }
                if (getGold) {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(good_1);
                        dialog.show();
                    });
                }
                if (lose_good) {
                    var i = 0;
                    var _loop_1 = function (k) {
                        if (lose_good.hasOwnProperty(k)) {
                            var v_1 = lose_good[k];
                            var name_1 = zj.PlayerItemSystem.ItemConfig(v_1.goodsId).name;
                            egret.setTimeout(function () {
                                zj.Common_Tip.AddTip(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.wonderland_lose_tips, name_1, v_1.count), zj.UIManager.StageHeight, zj.UIManager.StageWidth, null, zj.UIConfig.UIConfig_Wonderland.tipBoard[1]);
                            }, this_1, i * 1000);
                            i++;
                        }
                    };
                    var this_1 = this;
                    for (var k in lose_good) {
                        _loop_1(k);
                    }
                }
                WonderLandChoose.onTipGet(goodsList);
                // let i = 0;
                // for (let k in request.body.gameInfo.getGoods) {
                // 	if (request.body.gameInfo.getGoods.hasOwnProperty(k)) {
                // 		let v = request.body.gameInfo.getGoods[k];
                // 		if (v.index != 1 && v.index != 2) {
                // 			let tblInfo = (PlayerItemSystem.Item(v.goodsId) as any)
                // 			egret.setTimeout(() => {
                // 				let rgb = Helper.HexToRGB(ConstantConfig_Common.Color.quality_color[tblInfo.quality - 1]);
                // 				rgb.r = Math.floor(rgb.r);
                // 				rgb.g = Math.floor(rgb.g);
                // 				rgb.b = Math.floor(rgb.b);
                // 				Common_Tip.AddTip(Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.wonderland_get_tips, rgb.r, rgb.g, rgb.b, tblInfo.name, v.count), UIManager.StageHeight, UIManager.StageWidth, null, UIConfig.UIConfig_Wonderland.tipBoard[0])
                // 			}, this, i * 1000);
                // 			i++;
                // 		}
                // 	}
            }
            // }
        };
        WonderLandChoose.onTipGet = function (list) {
            var i = 0;
            var _loop_2 = function (k) {
                var v = list[k];
                if (v.index != 1 && v.index != 2) {
                    var tblInfo_1 = zj.PlayerItemSystem.Item(v.goodsId);
                    egret.setTimeout(function () {
                        var rgb = zj.Helper.HexToRGB(zj.ConstantConfig_Common.Color.quality_color[tblInfo_1.quality - 1]);
                        rgb.r = Math.floor(rgb.r);
                        rgb.g = Math.floor(rgb.g);
                        rgb.b = Math.floor(rgb.b);
                        zj.Common_Tip.AddTip(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.wonderland_get_tips, rgb.r, rgb.g, rgb.b, tblInfo_1.name, v.count), zj.UIManager.StageHeight, zj.UIManager.StageWidth, null, zj.UIConfig.UIConfig_Wonderland.tipBoard[0]);
                    }, this_2, i * 1000);
                    i++;
                }
            };
            var this_2 = this;
            for (var k in list) {
                _loop_2(k);
            }
        };
        WonderLandChoose.prototype.ChangeModeReq = function (_tmpMode) {
            var _this = this;
            //切换模式
            zj.Game.PlayerWonderLandSystem.WonderlandBattleMode(_tmpMode).then(function () {
                if (zj.Game.PlayerWonderLandSystem.roleInfo.posInfo.battleMode == message.EBattleMode.BATTLE_MODE_KILLING) {
                    zj.toast_success(zj.TextsConfig.TextsConfig_Wonderland.change_to_kill);
                }
                else if (zj.Game.PlayerWonderLandSystem.roleInfo.posInfo.battleMode == message.EBattleMode.BATTLE_MODE_FIGHTING) {
                    zj.toast_success(zj.TextsConfig.TextsConfig_Wonderland.change_to_battle);
                }
                else {
                    zj.toast_success(zj.TextsConfig.TextsConfig_Wonderland.change_to_peace);
                }
                _this.RefreshRes();
                _this.flashModel();
                _this.scene.playerLeader.dealWonderlandRoleInfo(zj.Game.PlayerWonderLandSystem.roleInfo);
            }).catch(function () {
            });
            this.PopChange();
        };
        WonderLandChoose.prototype.PopChange = function () {
            if (this.scene.playerLeader.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Wonderland.die_error_tips);
                return;
            }
            if (this.scene.isTouchUiEnabled() == false) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Wonderland.battle_error_tips);
                return;
            }
        };
        /**包裹上的小提示动画 */
        WonderLandChoose.prototype.RunAni = function () {
            var roguey = this.groupRogue.y;
            egret.Tween.get(this.groupRogue, { loop: true }).to({ y: roguey - 10 }, 1000, egret.Ease.sineInOut).to({ y: roguey }, 1000, egret.Ease.sineInOut);
        };
        WonderLandChoose.prototype.BattleCB = function () {
            if (zj.Game.PlayerWonderLandSystem.resultInfo.battleType == message.EFormationType.FORMATION_TYPE_WONDERLAND && zj.Game.PlayerWonderLandSystem.getGoods != null) {
                var getGold = false;
                var loseGold = false;
                var lose_good = [];
                var good_2 = [];
                var fightGoods = [];
                for (var k in zj.Game.PlayerWonderLandSystem.getGoods) {
                    if (zj.Game.PlayerWonderLandSystem.getGoods.hasOwnProperty(k)) {
                        var v = zj.Game.PlayerWonderLandSystem.getGoods[k];
                        if (v.index == 2) {
                            loseGold = true;
                            lose_good.push(v);
                            fightGoods.push(v);
                        }
                        else if (v.index == 1) {
                            getGold = true;
                            good_2.push(v);
                            fightGoods.push(v);
                        }
                        else if (v.index == 0) {
                        }
                    }
                }
                if ((zj.Game.PlayerWonderLandSystem.resultList) && (fightGoods)) {
                    if (zj.Game.PlayerWonderLandSystem.resultList[0].goods == null) {
                        zj.Game.PlayerWonderLandSystem.resultList[0].goods = zj.Table.DeepCopy(zj.Game.PlayerWonderLandSystem.getGoods);
                    }
                }
                if (getGold) {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(good_2);
                        dialog.show();
                    });
                }
                if (lose_good) {
                    var i = 0;
                    var _loop_3 = function (k) {
                        var v = lose_good[k];
                        var itemSet = zj.PlayerItemSystem.Set(v.goodsId, v.showType);
                        egret.setTimeout(function () {
                            zj.Common_Tip.AddTip(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.wonderland_lose_tips, itemSet.Info.name, v.count), zj.UIManager.StageHeight, zj.UIManager.StageWidth, null, zj.UIConfig.UIConfig_Wonderland.tipBoard[1]);
                        }, this_3, i * 1000);
                        i++;
                    };
                    var this_3 = this;
                    for (var k in lose_good) {
                        _loop_3(k);
                    }
                }
                if (zj.Game.PlayerWonderLandSystem.mobsDebuffTips) {
                    zj.toast_success(zj.TextsConfig.TextsConfig_Wonderland.mobs_debuff);
                    zj.Game.PlayerWonderLandSystem.mobsDebuffTips = false;
                }
                WonderLandChoose.onTipGet(zj.Game.PlayerWonderLandSystem.getGoods);
                zj.Game.PlayerWonderLandSystem.getGoods = [];
            }
        };
        WonderLandChoose.prototype.addControlPop = function (time, type) {
            if (!this.bar) {
                this.bar = zj.newUI(zj.HXH_WonderlandFruitCollection);
                this.addChild(this.bar);
            }
            this.bar.visible = true;
            this.bar.x = (zj.UIManager.StageWidth - this.bar.width) / 2;
            this.bar.setInfo(time, type);
        };
        WonderLandChoose.prototype.deleteControlPop = function () {
            if (this.bar && this.bar.parent) {
                this.bar.clearTime();
                this.bar.visible = false;
            }
        };
        WonderLandChoose.prototype.AddChatMini = function () {
            zj.loadUI(zj.Chat_Main)
                .then(function (dialog) {
                dialog.show();
            });
        };
        return WonderLandChoose;
    }(zj.Dialog));
    zj.WonderLandChoose = WonderLandChoose;
    __reflect(WonderLandChoose.prototype, "zj.WonderLandChoose");
})(zj || (zj = {}));
//# sourceMappingURL=WonderLandChoose.js.map
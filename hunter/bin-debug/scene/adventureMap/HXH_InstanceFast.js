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
     * 副本扫荡挑战UI(外部跳转调用)
     * created by Lian Lei
     * 2019.03.01
     */
    var HXH_InstanceFast = (function (_super) {
        __extends(HXH_InstanceFast, _super);
        function HXH_InstanceFast() {
            var _this = _super.call(this) || this;
            _this.listData = new eui.ArrayCollection();
            _this.id = 0;
            _this.skinName = "resource/skins/adventureMap/HXH_InstanceFastSkin.exml";
            _this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddPower, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnDekaron.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnDekaron, _this);
            _this.btnSweep.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSweep, _this);
            _this.btnSweep5.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSweep5, _this);
            _this.groupFirst.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnTouchBeginFirstBlood, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveDialog, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
                egret.clearInterval(_this.timer);
            }, null);
            _this.timer = egret.setInterval(_this.update, _this, 1000);
            _this.imgPassStars = [_this["imgPassStar0"], _this["imgPassStar1"], _this["imgPassStar2"]];
            _this.setInfo();
            return _this;
        }
        HXH_InstanceFast.prototype.setInfo = function () {
            this.labelPowerNum.text = zj.Helper.StringFormat("%s/%d", zj.PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_POWER), zj.PlayerVIPSystem.LowItem().power_add + zj.PlayerVIPSystem.Item().role_power);
        };
        HXH_InstanceFast.prototype.setOutPut = function (mobId, needNum, needId, callBack) {
            var _this = this;
            this.mobId = mobId;
            this.callBack = callBack;
            this.instanceId = mobId;
            this.needNum = needNum;
            this.needId = needId;
            this.instanceInfo = zj.TableInstance.Item(mobId);
            var _a = zj.Game.PlayerInstanceSystem.ChapterIdx(this.instanceInfo.instance_id), areaId = _a[0], chapIdx = _a[1];
            this.imgName.source = zj.cachekey("ui_instancenew_area_name_" + areaId + "_png", this);
            this.lbTitle.text = areaId + "-" + (Number(chapIdx) + 1);
            this.lbName.text = this.instanceInfo.instance_name;
            var star = 0;
            var mobInfo = zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].mobsMap[mobId];
            var cardInfo = zj.TableItemPotato.Table();
            var cardId = zj.Table.FindF(cardInfo, function (_k, _v) {
                return _v.id == _this.instanceInfo.first_reward[0][0];
            });
            if (mobInfo != null) {
                star = mobInfo.star;
                this.imgGiftGet.visible = mobInfo.firstReward;
            }
            else {
                this.imgGiftGet.visible = false;
            }
            for (var i = 0; i < 3; ++i) {
                if (i < star) {
                    this.imgPassStars[i].source = zj.cachekey("ui_instancenew_dialog_star_png", this.father);
                }
                else {
                    this.imgPassStars[i].source = zj.cachekey("ui_instancenew_dialog_star_gary_png", this.father);
                }
            }
            this.btnSweep5.visible = (star != 0);
            this.btnSweep.visible = (star != 0);
            var maxMobID = zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID;
            this.imgCurrIcon.visible = (maxMobID == mobId);
            this.imgCurrTitilBG.source = maxMobID == mobId
                ? zj.cachekey("ui_instancenew_dialog_item_title_bg1_png", this.father)
                : zj.cachekey("ui_instancenew_dialog_item_title_bg0_png", this.father);
            this.btnDekaron["labelCount"].text = "" + (this.instanceInfo.challenge_win + this.instanceInfo.challenge_start);
            // this.imgMask.visible = (maxMobID < mobId);
            // this.imgMask.visible = false;
            this.freshInfo();
            // 添加common_Item
            this.loadList();
        };
        HXH_InstanceFast.prototype.FreshInfo = function (levelUp) {
            this.freshInfo(levelUp);
        };
        HXH_InstanceFast.prototype.freshInfo = function (levelUp) {
            this.groupLeftTimes.visible = (this.instanceInfo.challenge_num > 0 && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= this.instanceId);
            if (this.instanceInfo.challenge_num == 0) {
                var star = zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].mobsMap[this.mobId].star;
                if (this.needNum - zj.PlayerItemSystem.Count(this.needId) <= 0) {
                    this.btnSweep5.visible = false;
                }
                else {
                    this.btnSweep5.visible = (star != 0);
                    this.btnSweep5.label = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Common.sweepCount, Math.min(10, this.needNum - zj.PlayerItemSystem.Count(this.needId)));
                }
                return;
            }
            if (zj.Game.PlayerInstanceSystem.Mob(this.instanceId) != null) {
                var cur = zj.Game.PlayerInstanceSystem.Mob(this.instanceId).dayTime;
                var total = this.instanceInfo.challenge_num * (1 + zj.Game.PlayerInstanceSystem.Mob(this.instanceId).buyTime);
                var left = total - cur;
                this.labelTimeNum.text = zj.TextsConfig.TextsConfig_Common.remainder + ":" + (left + "/" + this.instanceInfo.challenge_num);
                if (left <= 0) {
                    this.btnTimeAdd.visible = true;
                    this.btnSweep5.label = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Common.sweepCount, this.instanceInfo.challenge_num.toString());
                }
                else {
                    this.btnTimeAdd.visible = false;
                    this.btnSweep5.label = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Common.sweepCount, left.toString());
                }
            }
        };
        HXH_InstanceFast.prototype.onBtnDekaron = function () {
            var _this = this;
            var power = zj.Game.PlayerInfoSystem.BaseInfo.power;
            var num = this.instanceInfo.challenge_win + this.instanceInfo.challenge_start;
            if (power < num) {
                zj.loadUI(zj.HXH_HunterUserStrength)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.SetInfo();
                });
            }
            else {
                this.curMobInfo = zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].mobsMap[this.instanceId];
                zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curMobID = this.curMobInfo.mobId;
                zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curChapterID = zj.Game.PlayerInstanceSystem.Chapter(this.curMobInfo.mobId).chapter_id;
                if (this.father instanceof zj.AdventureDialog) {
                    zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curAreaID = this.father.getCurrAreaId();
                }
                this.id = this.instanceId;
                zj.Game.PlayerInstanceSystem.MobsInfo_Req(this.instanceId)
                    .then(function (value) {
                    zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
                    zj.Game.PlayerFormationSystem.blowGuide = _this.instanceId;
                    zj.loadUI(zj.CommonFormatePveMain)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setInfo(_this.id);
                    });
                })
                    .catch(function (reason) {
                    zj.toast(zj.Helper.GetErrorString(reason));
                });
                // Teach.addTeaching();
            }
        };
        HXH_InstanceFast.prototype.loadList = function () {
            this.listData.removeAll();
            for (var i = 0; i < this.instanceInfo.challenge_goods.length; i++) {
                var itemData = new zj.Common_ItemData();
                itemData.info = this.instanceInfo.challenge_goods[i];
                itemData.father = this;
                itemData.type = itemData.CurState.GetBadge;
                itemData.scale = 0.74;
                this.listData.addItem(itemData);
            }
            this.listDrag.dataProvider = this.listData;
            this.listDrag.itemRenderer = zj.Common_Item;
            var itemSet = zj.PlayerItemSystem.Set(this.instanceInfo.first_reward[0][0], 1, this.instanceInfo.first_reward[0][1]);
            this.imgFrameFirst.source = zj.cachekey(itemSet.Frame, this.father);
            this.imgIconFirst.source = zj.cachekey(itemSet.Path, this.father);
            this.labelFirstBlood.text = "x" + zj.Set.NumberUnit3(this.instanceInfo.first_reward[0][1]);
            // this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupFirstBlood, "daojuguang");
            this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupFirstBlood);
        };
        //添加龙骨动画
        HXH_InstanceFast.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                //display.y =this.height*0.25;
                display.y = group.explicitHeight / 2;
                group.addChild(display);
                display.scaleX = 0.5;
                display.scaleY = 0.5;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        HXH_InstanceFast.prototype.onBtnSweep = function () {
            if (zj.Game.PlayerInstanceSystem.CheckPower(this.instanceInfo.instance_id, 0) == false) {
                this.buyPower();
            }
            else {
                this.goSweep(1, false);
            }
        };
        HXH_InstanceFast.prototype.buyPower = function () {
            zj.loadUI(zj.HXH_HunterUserStrength)
                .then(function (dialog) {
                dialog.SetInfo();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
            this.freshInfo();
            // this.setOutPut(this.data);
        };
        HXH_InstanceFast.prototype.goSweep = function (times, is_down) {
            var _this = this;
            // this.close();
            // this.visible = false;
            this.alpha = 0;
            this.touchEnabled = false;
            this.touchChildren = false;
            this.CheckChallengeTime();
            if (times == 0) {
                times = 5;
            }
            var mobInfo = zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].mobsMap[this.instanceId];
            if (mobInfo.star < message.EBattleStar.BATTLE_STAR_3) {
                var costUnit = zj.CommonConfig.instance_normal_sweep_consume_token;
                var des = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Instance.warnWipe, costUnit * times, times);
                zj.TipManager.ShowConfirmCancel(des, function () {
                    zj.Game.PlayerInstanceSystem.SweepMobsReq(times, is_down, mobInfo)
                        .then(function (value) {
                        zj.Game.PlayerInstanceSystem.canSyncLevel = false;
                        zj.loadUI(zj.HXH_InstanceSweepFive)
                            .then(function (dialog) {
                            dialog.father = _this;
                            dialog.setSweepGoods(value.body.sweepGoods, value.body.gameInfo.getGoods);
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                        });
                        if (_this.callBack) {
                            _this.callBack();
                        }
                    })
                        .catch(function (reason) {
                        // toast(Helper.GetErrorString(reason));
                    });
                });
            }
            else if (this.CheckChallengeTime() == false) {
                this.onBtnTimeAdd();
            }
            else {
                zj.Game.PlayerInstanceSystem.SweepMobsReq(times, is_down, mobInfo)
                    .then(function (value) {
                    zj.Game.PlayerInstanceSystem.canSyncLevel = false;
                    zj.loadUI(zj.HXH_InstanceSweepFive)
                        .then(function (dialog) {
                        dialog.father = _this;
                        dialog.setSweepGoods(value.body.sweepGoods, value.body.gameInfo.getGoods);
                        dialog.setCB(function () {
                            _this.freshInfo();
                            _this.isVisBtnSweep();
                            _this.closeThis();
                        });
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                })
                    .catch(function (reason) {
                    zj.toast(zj.Helper.GetErrorString(reason));
                });
            }
        };
        HXH_InstanceFast.prototype.isVisBtnSweep = function () {
            if (this.btnSweep5.visible == false) {
                if (this.callBack) {
                    this.callBack();
                }
                this.close();
            }
        };
        HXH_InstanceFast.prototype.closeThis = function () {
            if (this.btnSweep5.visible == false) {
                this.alpha = 0;
                this.touchEnabled = false;
                this.touchChildren = false;
                this.close();
            }
            else {
                this.alpha = 1;
                this.touchEnabled = true;
                this.touchChildren = true;
            }
        };
        HXH_InstanceFast.prototype.CheckChallengeTime = function () {
            if (this.instanceInfo.challenge_num > 0 && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID >= this.instanceId) {
                if (zj.Game.PlayerInstanceSystem.Mob(this.instanceId) != null) {
                    var cur = zj.Game.PlayerInstanceSystem.Mob(this.instanceId).dayTime;
                    var total = this.instanceInfo.challenge_num * (1 + zj.Game.PlayerInstanceSystem.Mob(this.instanceId).buyTime);
                    var left = total - cur;
                    return left > 0;
                }
            }
            else {
                return true;
            }
        };
        HXH_InstanceFast.prototype.onBtnSweep5 = function () {
            if (zj.PlayerVIPSystem.LowLevel().is_sweep == 1 || zj.Game.PlayerInfoSystem.BaseInfo.level >= 30) {
                this.call();
            }
            else {
                var str = zj.TextsConfig.TextConfig_Instance.errWipeTen;
                zj.TipManager.ShowConfirmCancel(str, function () {
                    zj.loadUI(zj.PayMallScene)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                        scene.init(true);
                    });
                });
            }
        };
        HXH_InstanceFast.prototype.call = function () {
            var mobInfo = zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].mobsMap[this.instanceId];
            if (zj.Game.PlayerInstanceSystem.InstanceFun(mobInfo.mobId).challenge_num == 0) {
                var times = 0;
                times = Math.min(10, this.needNum - zj.PlayerItemSystem.Count(this.needId));
                if (zj.Game.PlayerInstanceSystem.CheckPower(mobInfo.mobId, times) == false) {
                    this.buyPower();
                }
                else {
                    this.goSweep(times, true);
                }
            }
            else {
                var cur = zj.Game.PlayerInstanceSystem.Mob(this.instanceId).dayTime;
                var total = zj.Game.PlayerInstanceSystem.InstanceFun(mobInfo.mobId).challenge_num * (1 + zj.Game.PlayerInstanceSystem.Mob(this.instanceId).buyTime);
                if (zj.Game.PlayerInstanceSystem.CheckPower(mobInfo.mobId, total - cur) == false) {
                    this.buyPower();
                }
                else {
                    this.goSweep(total - cur, true);
                }
            }
        };
        HXH_InstanceFast.prototype.onBtnTimeAdd = function () {
            this.buyMobsTime();
        };
        HXH_InstanceFast.prototype.buyMobsTime = function () {
            var _this = this;
            var str = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Instance.errCount, zj.CommonConfig.changlle_time(zj.Game.PlayerInstanceSystem.Mob(this.instanceId).buyTime), 
            // Game.PlayerInstanceSystem.Level(null).buy_mobs - Game.PlayerInstanceSystem.Mob(this.instanceId).buyTime,
            // Game.PlayerInstanceSystem.Level(null).buy_mobs);
            zj.PlayerVIPSystem.Level().buy_mobs - zj.Game.PlayerInstanceSystem.Mob(this.instanceId).buyTime, zj.PlayerVIPSystem.Level().buy_mobs);
            zj.TipManager.ShowConfirmCancel(str, function () {
                _this.buyMobsTime_Req();
            });
        };
        HXH_InstanceFast.prototype.buyMobsTime_Req = function () {
            var _this = this;
            zj.Game.PlayerInstanceSystem.BuyMobsTime_Req(this.instanceId)
                .then(function (value) {
                // this.freshInfo();
                _this.setOutPut(_this.instanceId, _this.needNum, _this.needId, _this.callBack);
            })
                .catch(function (reason) {
                if (reason == message.EC.XG_INSTANCE_BUY_TIMES_MAX) {
                    zj.toast(zj.TextsConfig.TextsConfig_Error.buy_mobs_error);
                }
                else if (reason == message.EC.XG_LACK_TOKEN) {
                    // TipManager.ShowAddGemStone()
                }
                else {
                    zj.toast_warning(zj.Helper.GetErrorString(reason));
                }
            });
        };
        HXH_InstanceFast.prototype.onBtnAddPower = function () {
            zj.loadUI(zj.HXH_HunterUserStrength)
                .then(function (dialog) {
                dialog.SetInfo();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HXH_InstanceFast.prototype.onBtnClose = function () {
            if (this.callBack) {
                this.callBack();
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        HXH_InstanceFast.prototype.onBtnTouchBeginFirstBlood = function (e) {
            var _this = this;
            var newThis = this;
            var touchX = e.stageX;
            var groupY;
            var type = 0; // type == 1 点击位置大于父类高度的一半
            if (e.stageY >= this.height / 2) {
                groupY = e.stageY - e.localY;
                type = 1;
            }
            else {
                groupY = e.stageY + 10;
            }
            var cardInfo = zj.TableItemPotato.Table();
            var cardId = zj.Table.FindF(cardInfo, function (_k, _v) {
                return _v.id == _this.instanceInfo.first_reward[0][0];
            });
            if (!cardId) {
                var _type = zj.PlayerItemSystem.ItemType(this.instanceInfo.first_reward[0][0]);
                if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    zj.loadUI(zj.CommonDesGeneral).then(function (dialog) {
                        dialog.name = "First_Blood";
                        dialog.x = touchX - dialog.width / 2 - 20;
                        if (type == 1) {
                            dialog.y = groupY - dialog.height;
                        }
                        else {
                            dialog.y = groupY;
                        }
                        dialog.setInfo(newThis.instanceInfo.first_reward[0][0], newThis.instanceInfo.first_reward[0][1]);
                        newThis.addChild(dialog);
                    });
                }
                else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                    zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                        dialog.name = "First_Blood";
                        dialog.x = touchX - dialog.width / 2 - 20;
                        if (type == 1) {
                            dialog.y = groupY - dialog.height;
                        }
                        else {
                            dialog.y = groupY;
                        }
                        dialog.setInfo(newThis.instanceInfo.first_reward[0][0], newThis.instanceInfo.first_reward[0][1]);
                        newThis.addChild(dialog);
                    });
                }
                else {
                    zj.loadUI(zj.CommonDesProp).then(function (dialog) {
                        dialog.name = "First_Blood";
                        dialog.x = touchX - dialog.width / 2 - 20;
                        if (type == 1) {
                            dialog.y = groupY - dialog.height;
                        }
                        else {
                            dialog.y = groupY;
                        }
                        dialog.init(newThis.instanceInfo.first_reward[0][0], newThis.instanceInfo.first_reward[0][1]);
                        newThis.addChild(dialog);
                    });
                }
            }
            else {
                var showCardInfo_1 = cardInfo[this.instanceInfo.first_reward[0][0]];
                zj.loadUI(zj.PlayerCardPopDialog)
                    .then(function (dialog) {
                    dialog.loadNotGet(showCardInfo_1, false, function () {
                        dialog.close();
                    });
                    dialog.name = "First_Blood";
                    dialog.show();
                });
            }
        };
        HXH_InstanceFast.prototype.onRemoveDialog = function () {
            var dialogFirstBlood = this.getChildByName("First_Blood");
            if (dialogFirstBlood)
                this.removeChild(dialogFirstBlood);
            var dialogDropOrAward = this.getChildByName("DropOrAward");
            if (dialogDropOrAward)
                this.removeChild(dialogDropOrAward);
        };
        HXH_InstanceFast.prototype.update = function () {
            this.setInfo();
        };
        return HXH_InstanceFast;
    }(zj.Dialog));
    zj.HXH_InstanceFast = HXH_InstanceFast;
    __reflect(HXH_InstanceFast.prototype, "zj.HXH_InstanceFast");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_InstanceFast.js.map
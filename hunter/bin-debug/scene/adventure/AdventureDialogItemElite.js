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
     * 副本界面-关卡列表
     * zhaiweili
     * 2019.11.7
     */
    var AdventureDialogItemElite = (function (_super) {
        __extends(AdventureDialogItemElite, _super);
        function AdventureDialogItemElite() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/adventure/AdventureDialogItemEliteSkin.exml";
            _this.topHeight = _this.groupTop.height;
            _this.bottomHeight = _this.groupBottom.height;
            _this.isOpen = false;
            _this.imgPassStars = [_this["imgPassStar0"], _this["imgPassStar1"], _this["imgPassStar2"]];
            _this.initClose();
            return _this;
        }
        AdventureDialogItemElite.prototype.init = function (father, area, chapter, data, idx) {
            this.father = father;
            this.currArea = area;
            this.currChapter = chapter;
            this.currData = data;
            this.lbTitle.text = chapter.chapter_id + "-" + (idx + 1);
            this.lbName.text = data.instance_name;
            this.btnDekaron.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDekaron, this);
            this.groupFirst.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnTouchBeginFirstBlood, this);
            this.groupFirst1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnTouchBeginFirstBlood, this);
            this.groupTop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchItem, this);
            this.updateUI();
        };
        AdventureDialogItemElite.prototype.getBottomHeight = function () {
            return this.bottomHeight;
        };
        AdventureDialogItemElite.prototype.getTopHeight = function () {
            return this.topHeight;
        };
        AdventureDialogItemElite.prototype.onTouchItem = function () {
            if (this.isOpen) {
                this.father.onTouchItem(this);
            }
        };
        AdventureDialogItemElite.prototype.startAniOpen = function () {
            this.groupBottom.visible = true;
            var tw = egret.Tween.get(this.groupBottom);
            tw.to({ scaleY: 1 }, zj.AdventureDialog.aniTime);
            var twt = egret.Tween.get(this);
            twt.to({ height: this.bottomHeight + this.topHeight }, zj.AdventureDialog.aniTime);
            tw.call(this.openFinish, this);
        };
        AdventureDialogItemElite.prototype.startAniClose = function () {
            var tw = egret.Tween.get(this.groupBottom);
            tw.to({ scaleY: 0 }, zj.AdventureDialog.aniTime);
            var twt = egret.Tween.get(this);
            twt.to({ height: this.topHeight }, zj.AdventureDialog.aniTime);
            tw.call(this.closeFinish, this);
        };
        AdventureDialogItemElite.prototype.openFinish = function () {
            egret.Tween.removeTweens(this);
            egret.Tween.removeTweens(this.groupBottom);
            this.father.onItemAniFinish();
        };
        AdventureDialogItemElite.prototype.closeFinish = function () {
            this.groupBottom.visible = false;
            egret.Tween.removeTweens(this);
            egret.Tween.removeTweens(this.groupBottom);
            this.father.onItemAniFinish();
        };
        AdventureDialogItemElite.prototype.initOpen = function () {
            // 初始为打开状态
            this.groupBottom.scaleY = 1;
            this.groupBottom.visible = true;
            this.height = this.topHeight + this.bottomHeight;
        };
        AdventureDialogItemElite.prototype.initClose = function () {
            // 初始为关闭状态
            this.groupBottom.scaleY = 0;
            this.groupBottom.visible = false;
            this.height = this.topHeight;
        };
        AdventureDialogItemElite.prototype.getCurrInstanceInfo = function () {
            return zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE];
        };
        AdventureDialogItemElite.prototype.updateUI = function () {
            var data = this.currData;
            var currInfo = this.getCurrInstanceInfo();
            var maxMobId = currInfo.maxMobID;
            var myMobId = data.instance_id;
            var mobInfo = currInfo.mobsMap[myMobId];
            this.curMobInfo = mobInfo;
            var type = -1; // 类型：0-已打完，1-当前关卡，2-未开启
            var star = 0;
            this.imgMask.visible = false;
            var color = 0;
            if (myMobId < maxMobId) {
                type = 0;
                star = mobInfo ? mobInfo.star : 0;
                // 星数
                for (var i = 0; i < 3; ++i) {
                    if (i < star) {
                        this.imgPassStars[i].source = zj.cachekey("ui_instancenew_dialog_star_png", this.father);
                    }
                    else {
                        this.imgPassStars[i].source = zj.cachekey("ui_instancenew_dialog_star_gary_png", this.father);
                    }
                }
                color = zj.AdventureDialogItem.colorPass;
            }
            else if (myMobId == maxMobId) {
                type = 1;
                color = zj.AdventureDialogItem.colorCurr;
                for (var i = 0; i < 3; ++i) {
                    this.imgPassStars[i].source = zj.cachekey("ui_instancenew_dialog_star_gary_png", this.father);
                }
            }
            else {
                type = 2;
                // this.imgMask.visible = true;
                color = zj.AdventureDialogItem.colorNo;
                for (var i = 0; i < 3; ++i) {
                    this.imgPassStars[i].source = zj.cachekey("ui_instancenew_dialog_star_gary_png", this.father);
                }
            }
            this.lbName.textColor = type == 2 ? color : 0xFFFFFF;
            this.isOpen = type != 2;
            this.imgCurrIcon.visible = type == 1;
            this.lbTitle.textColor = color;
            if (type == 1) {
                this.imgCurrTitilBG.source = zj.cachekey("ui_instancenew_dialog_item_title_bg1_png", this.father);
            }
            else {
                this.imgCurrTitilBG.source = zj.cachekey("ui_instancenew_dialog_item_title_bg0_png", this.father);
            }
            this.imgGiftGet.visible = false;
            var itemSet = zj.PlayerItemSystem.Set(data.first_reward[0][0], 1, data.first_reward[0][1]);
            if (type != 0) {
                this.imgFrameFirst1.source = zj.cachekey(itemSet.Frame, this.father);
                this.imgIconFirst1.source = zj.cachekey(itemSet.Path, this.father);
                var num = data.first_reward[0][1];
                this.labelFirstBlood1.text = num > 1 ? ("x" + num) : "";
                this.groupFirst1.visible = true;
            }
            else {
                this.groupFirst1.visible = false;
            }
            if (type != 2) {
                // 首杀
                if (mobInfo && mobInfo.firstReward) {
                    // this.groupFirst.visible = false;
                    this.imgGiftGet.visible = true;
                }
                else {
                    var itemSet_1 = zj.PlayerItemSystem.Set(data.first_reward[0][0], 1, data.first_reward[0][1]);
                    this.imgFrameFirst.source = zj.cachekey(itemSet_1.Frame, this.father);
                    this.imgIconFirst.source = zj.cachekey(itemSet_1.Path, this.father);
                    this.labelFirstBlood.text = "x" + zj.Set.NumberUnit3(data.first_reward[0][1]);
                    this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupFirstBlood, "daojuguang");
                    this.groupFirst.visible = true;
                }
                // 体力
                // this.labelStrengthNum.text = "" + (data.challenge_win + data.challenge_start);
                this.btnDekaron["labelCount"].text = "" + (data.challenge_win + data.challenge_start);
            }
        };
        //添加龙骨动画
        AdventureDialogItemElite.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, aniName) {
            zj.Game.DragonBonesManager.playAnimation(this, dbName, "armatureName", animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2 + 1;
                display.y = group.explicitHeight / 2;
                display.name = aniName;
                if (group.getChildByName(aniName) == null) {
                    group.addChild(display);
                }
                display.scaleX = 0.5;
                display.scaleY = 0.5;
            })
                .catch(function (reason) {
                // toast(reason);
            });
        };
        AdventureDialogItemElite.prototype.onBtnDekaron = function () {
            var power = zj.Game.PlayerInfoSystem.BaseInfo.power;
            var num = this.currData.challenge_win + this.currData.challenge_start;
            if (power < num) {
                zj.loadUI(zj.HXH_HunterUserStrength)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.SetInfo();
                });
            }
            else {
                var info = this.getCurrInstanceInfo();
                info.curMobID = this.curMobInfo.mobId;
                info.curChapterID = this.currChapter.chapter_id;
                info.curAreaID = this.currArea.area_id;
                var id_1 = this.currData.instance_id;
                zj.Game.PlayerInstanceSystem.MobsInfo_Req(id_1)
                    .then(function (value) {
                    zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE;
                    zj.Game.PlayerFormationSystem.blowGuide = id_1;
                    zj.loadUI(zj.CommonFormatePveMain)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setInfo(id_1);
                    });
                })
                    .catch(function (reason) {
                    // toast(Helper.GetErrorString(reason));
                });
                // Teach.addTeaching();
            }
        };
        AdventureDialogItemElite.prototype.onBtnSweep = function () {
            if (zj.Game.PlayerInstanceSystem.CheckPower(this.currData.instance_id, 0) == false) {
                this.buyPower();
            }
            else {
                this.goSweep(1, false);
            }
        };
        AdventureDialogItemElite.prototype.buyPower = function () {
            zj.loadUI(zj.HXH_HunterUserStrength)
                .then(function (dialog) {
                dialog.SetInfo();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
            // this.updateUI();
        };
        AdventureDialogItemElite.prototype.goSweep = function (times, is_down) {
            var _this = this;
            // this.CheckChallengeTime();
            if (times == 0) {
                times = 5;
            }
            var mobInfo = this.curMobInfo;
            if (mobInfo.star < message.EBattleStar.BATTLE_STAR_3) {
                var costUnit = zj.CommonConfig.instance_normal_sweep_consume_token;
                var des = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Instance.warnWipe, costUnit * times, times);
                zj.TipManager.ShowConfirmCancel(des, function () {
                    _this.SweepMobsReq(times, is_down, mobInfo);
                });
            }
            else if (!this.CheckChallengeTime()) {
                this.onBtnTimeAdd();
            }
            else {
                this.SweepMobsReq(times, is_down, mobInfo);
                // Game.PlayerInstanceSystem.SweepMobsReq(times, is_down, mobInfo)
                // 	.then((value: message.SweepMobsResponse) => {
                // 		Game.PlayerInstanceSystem.canSyncLevel = false;
                // 		loadUI(HXH_InstanceSweepFive)
                // 			.then((dialog: HXH_InstanceSweepFive) => {
                // 				dialog.father = this;
                // 				dialog.setSweepGoods(value.body.sweepGoods, value.body.gameInfo.getGoods);
                // 				dialog.show(UI.SHOW_FROM_TOP);
                // 				self.updateUI();
                // 			});
                // 	})
                // 	.catch((reason) => {
                // 		// toast(Helper.GetErrorString(reason));
                // 	})
            }
        };
        AdventureDialogItemElite.prototype.SweepMobsReq = function (times, is_down, mobInfo) {
            var _this = this;
            var self = this;
            zj.Game.PlayerInstanceSystem.SweepMobsReq(times, is_down, mobInfo)
                .then(function (value) {
                zj.Game.PlayerInstanceSystem.canSyncLevel = false;
                zj.loadUI(zj.HXH_InstanceSweepFive)
                    .then(function (dialog) {
                    dialog.father = _this;
                    dialog.setSweepGoods(value.body.sweepGoods, value.body.gameInfo.getGoods);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    self.updateUI();
                });
            })
                .catch(function (reason) {
            });
        };
        AdventureDialogItemElite.prototype.CheckChallengeTime = function () {
            if (this.currData.challenge_num > 0 && this.getCurrInstanceInfo().maxMobID >= this.currData.instance_id) {
                if (this.curMobInfo) {
                    return this.currData.challenge_num * (1 + this.curMobInfo.buyTime) - this.curMobInfo.dayTime > 0;
                }
            }
            return true;
        };
        AdventureDialogItemElite.prototype.onBtnTimeAdd = function () {
            this.buyMobsTime();
        };
        AdventureDialogItemElite.prototype.buyMobsTime = function () {
            var _this = this;
            var str = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Instance.errCount, zj.CommonConfig.changlle_time(this.curMobInfo.buyTime), 
            // Game.PlayerInstanceSystem.Level(null).buy_mobs - Game.PlayerInstanceSystem.Mob(this.instanceId).buyTime,
            // Game.PlayerInstanceSystem.Level(null).buy_mobs);
            zj.PlayerVIPSystem.Level().buy_mobs - this.curMobInfo.buyTime, zj.PlayerVIPSystem.Level().buy_mobs);
            zj.TipManager.ShowConfirmCancel(str, function () {
                _this.buyMobsTime_Req();
            });
        };
        AdventureDialogItemElite.prototype.buyMobsTime_Req = function () {
            var _this = this;
            zj.Game.PlayerInstanceSystem.BuyMobsTime_Req(this.currData.instance_id)
                .then(function (value) {
                _this.updateUI();
            })
                .catch(function (reason) {
                if (reason == message.EC.XG_INSTANCE_BUY_TIMES_MAX) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Error.buy_mobs_error);
                }
                else if (reason == "钻石不足") {
                    zj.TipManager.ShowAddGemStone();
                }
                else {
                    zj.toast_warning(reason);
                }
            });
        };
        AdventureDialogItemElite.prototype.onBtnSweep5 = function () {
            // if (Game.PlayerInstanceSystem.LowLevel().is_sweep == 1 || Game.PlayerInfoSystem.BaseInfo.level >= 30) {
            // 	this.call();
            // }
            if (zj.PlayerVIPSystem.LowLevel().is_sweep == 1 || zj.Game.PlayerInfoSystem.BaseInfo.level >= 30) {
                this.call();
            }
            // else {
            // let str = TextsConfig.TextConfig_Instance.errWipeTen;
            // TipMgr:ShowTipsAndGoVip(str, self, Enum.Vip.CHARGE, self._cb)跳转到充值界面
            // }
        };
        AdventureDialogItemElite.prototype.call = function () {
            var mobInfo = this.curMobInfo;
            if (this.currData.challenge_num == 0) {
                var times = 5;
                if (zj.Game.PlayerInstanceSystem.CheckPower(mobInfo.mobId, times) == false) {
                    this.buyPower();
                }
                else {
                    this.goSweep(times, true);
                }
            }
            else {
                var cur = this.curMobInfo.dayTime;
                var total = zj.Game.PlayerInstanceSystem.InstanceFun(mobInfo.mobId).challenge_num * (1 + this.curMobInfo.buyTime);
                if (!zj.Game.PlayerInstanceSystem.CheckPower(mobInfo.mobId, total - cur)) {
                    this.buyPower();
                }
                else {
                    this.goSweep(total - cur, true);
                }
            }
        };
        AdventureDialogItemElite.prototype.onBtnTouchBeginFirstBlood = function (e) {
            var _this = this;
            if (zj.Game.TeachSystem.curPart == 3002)
                return;
            var newThis = this;
            var touchX = e.stageX;
            var groupY;
            var type = 0; // type == 1 点击位置大于父类高度的一半
            if (e.stageY >= this.father.height / 2) {
                groupY = e.stageY - e.localY;
                type = 1;
            }
            else {
                groupY = e.stageY + 10;
            }
            var cardInfo = zj.TableItemPotato.Table();
            var cardId = zj.Table.FindF(cardInfo, function (_k, _v) {
                return _v.id == _this.currData.first_reward[0][0];
            });
            if (!cardId) {
                var _type = zj.PlayerItemSystem.ItemType(this.currData.first_reward[0][0]);
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
                        dialog.setInfo(newThis.currData.first_reward[0][0], newThis.currData.first_reward[0][1]);
                        newThis.father.father.addChild(dialog);
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
                        dialog.setInfo(newThis.currData.first_reward[0][0], newThis.currData.first_reward[0][1]);
                        newThis.father.father.addChild(dialog);
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
                        dialog.init(newThis.currData.first_reward[0][0], newThis.currData.first_reward[0][1]);
                        newThis.father.father.addChild(dialog);
                    });
                }
            }
            else {
                var showCardInfo_1 = cardInfo[this.currData.first_reward[0][0]];
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
        AdventureDialogItemElite.colorPass = 0x16fa5b;
        AdventureDialogItemElite.colorCurr = 0xe84f33;
        AdventureDialogItemElite.colorNo = 0xaaaaaa;
        return AdventureDialogItemElite;
    }(zj.UI));
    zj.AdventureDialogItemElite = AdventureDialogItemElite;
    __reflect(AdventureDialogItemElite.prototype, "zj.AdventureDialogItemElite");
})(zj || (zj = {}));
//# sourceMappingURL=AdventureDialogItemElite.js.map
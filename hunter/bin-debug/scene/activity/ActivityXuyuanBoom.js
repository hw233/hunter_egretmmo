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
    //许愿屋
    //yuqingchao
    //2019.05.06
    var ActivityXuyuanBoom = (function (_super) {
        __extends(ActivityXuyuanBoom, _super);
        function ActivityXuyuanBoom() {
            var _this = _super.call(this) || this;
            _this.takeNum = null;
            _this.canBuyNum = 0;
            _this.maxTime = null;
            _this.useTime = null;
            _this.ownNum = null;
            _this.skinName = "resource/skins/activity/ActivityXuyuanBoomSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnShwoAward.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnShwoAward, _this);
            _this.btnChangeItem.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnChangeItem, _this);
            _this.btnOne.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOne, _this);
            _this.btnMore.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMore, _this);
            _this.btnAddGemstone0.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGemstone0, _this);
            _this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGemstone, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.setFrech, _this);
            _this.rectMask = zj.Util.getMaskImgBlack(_this.skin.width, _this.skin.height);
            _this.rectMask.alpha = 0;
            _this.rectMask.horizontalCenter = 0;
            _this.rectMask.verticalCenter = 0;
            _this.groupAll.addChild(_this.rectMask);
            _this.rectMask.visible = false;
            zj.Game.EventManager.on(zj.GameEvent.XUYUAN_UPDATE, _this.upDate, _this);
            // this.AniTimer = new egret.Timer(3.5, 0);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.XUYUAN_UPDATE, _this.upDate, _this);
                zj.Game.EventManager.off(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.setFrech, _this);
                if (_this.AniTimer)
                    _this.AniTimer.stop();
            }, null);
            return _this;
        }
        ActivityXuyuanBoom.prototype.upDate = function () {
            this.lbCore.text = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_currentScore.toString();
        };
        ActivityXuyuanBoom.prototype.Init = function () {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, "NPC_Wish", "armatureName", null, 0)
                .then(function (display) {
                display.anchorOffsetX = -display.width / 2;
                display.anchorOffsetY = -display.height;
                display.x = -150;
                display.y = -50;
                _this.groupAni0.addChild(display);
            });
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "wishspine", null, [null], ["role"])
                .then(function (armatureDisplay) {
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                //     armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    armatureDisplay.animation.stop();
                }, _this);
                _this.donghua = armatureDisplay;
                armatureDisplay.animation.play("normal", 0);
                armatureDisplay.x = 180;
                armatureDisplay.y = 10;
                _this.groupAni.addChild(armatureDisplay);
            });
            this.setInfo();
            this.gemsTone();
        };
        ActivityXuyuanBoom.prototype.isFullScreen = function () {
            return true;
        };
        ActivityXuyuanBoom.prototype.gemsTone = function () {
            if (zj.Game.PlayerInfoSystem.Token > 100000) {
                if (((zj.Game.PlayerInfoSystem.Token / 1000) >>> 0) % 10 == 0) {
                    this.lbGemstone.text = ((zj.Game.PlayerInfoSystem.Token / 10000) >>> 0).toFixed(1) + "万";
                }
                else {
                    this.lbGemstone.text = (zj.Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
                }
            }
            else {
                this.lbGemstone.text = zj.Game.PlayerInfoSystem.Token.toString();
            }
            this.lbGemstone0.text = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_PROMISE);
        };
        ActivityXuyuanBoom.prototype.setInfo = function () {
            var xuyuanTbl = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.xuyuan_random + ".json"); //读表
            var len = Object.keys(xuyuanTbl).length;
            var index = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].info % len;
            index = index == 0 && len || index;
            this.topicId = index;
            this.leftTime = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].leftTime - Math.floor(egret.getTimer() / 1000);
            this.curTopicInfo = xuyuanTbl[this.topicId];
            this.setInfoTime();
            this.setFrech();
            this.FreshRedTips();
        };
        ActivityXuyuanBoom.prototype.setInfoTime = function () {
            var beginTime = Date.parse(zj.Game.Controller.serverNow().toString()) / 1000 + this.leftTime - this.curTopicInfo.subject_duration;
            var endTime = Date.parse(zj.Game.Controller.serverNow().toString()) / 1000 + this.leftTime;
            var strOpen = zj.Helper.GetTMStrForActivity(beginTime);
            var strClose = zj.Helper.GetTMStrForActivity(endTime);
            this.lbTime.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Activity.timeOpenAndClose, strOpen, strClose);
        };
        ActivityXuyuanBoom.prototype.setInfoXuyuanAni = function (goods) {
            var actionId = 1;
            var haveGoodThing = zj.Table.FindF(goods, function (k, v) {
                var goodTbl = zj.PlayerItemSystem.Item(v.goodsId);
                return goodTbl.quality >= 5;
            });
            if (this.takeNum != 1 || haveGoodThing) {
                actionId = 2;
            }
            var curTime = 0;
            var aniDelayTime = 3.5;
            this.popGoods = goods;
            this.AniTimer = new egret.Timer(3500, 1);
            this.AniTimer.addEventListener(egret.TimerEvent.TIMER, this.xuyuanPop, this);
            this.AniTimer.start();
        };
        ActivityXuyuanBoom.prototype.xuyuanPop = function () {
            var _this = this;
            zj.loadUI(zj.ActivityXuyuanPop)
                .then(function (scene) {
                scene.setInfo(_this.popGoods, _this);
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        ActivityXuyuanBoom.prototype.setFrech = function () {
            this.btnAddGemstone.enabled = true;
            this.btnAddGemstone0.enabled = true;
            var curTimes = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_time;
            var allTimes = this.curTopicInfo.max_time;
            var lastTime = allTimes - curTimes;
            var timeStr = lastTime + "/" + allTimes;
            this.lbThisTime.text = timeStr;
            var curScore = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_currentScore;
            var bFree = zj.TableLicence.Item(zj.Game.PlayerInfoSystem.LecenceLevel).xuyuan_free > zj.Game.PlayerVIPSystem.vipInfo.xuyuan_free;
            var freeTime = zj.TableLicence.Item(zj.Game.PlayerInfoSystem.LecenceLevel).xuyuan_free - zj.Game.PlayerVIPSystem.vipInfo.xuyuan_free;
            if (bFree) {
                this.lbOne.text = zj.TextsConfig.TextsConfig_Egg_Random.free;
            }
            else {
                this.lbOne.text = this.curTopicInfo.consume_token;
            }
            this.imgOne.visible = !bFree;
            this.lbOne.visible = !bFree;
            this.lbOneFree.visible = bFree;
            this.lbOneFree.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Activity.wishing_tree_free, freeTime);
            this.lbOne.text = this.curTopicInfo.consume_pai;
            this.lbMore.text = this.curTopicInfo.consume_pai_ten;
            this.lbCore.text = curScore.toString();
            if (zj.Game.PlayerInfoSystem.Token > 100000) {
                if (((zj.Game.PlayerInfoSystem.Token / 1000) >>> 0) % 10 == 0) {
                    this.lbGemstone.text = ((zj.Game.PlayerInfoSystem.Token / 10000) >>> 0).toFixed(1) + "万";
                }
                else {
                    this.lbGemstone.text = (zj.Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
                }
            }
            else {
                this.lbGemstone.text = zj.Game.PlayerInfoSystem.Token.toString();
            }
            this.lbGemstone0.text = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_PROMISE);
        };
        //本期奖励
        ActivityXuyuanBoom.prototype.onBtnShwoAward = function () {
            var _this = this;
            zj.loadUI(zj.ActivityXuyuanAward)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.setInfo(_this.topicId);
            });
        };
        //兑换礼物
        ActivityXuyuanBoom.prototype.onBtnChangeItem = function () {
            var _this = this;
            zj.loadUI(zj.ActivityXuyuanLive)
                .then(function (dialog) {
                dialog.init(_this);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        //许愿一次
        ActivityXuyuanBoom.prototype.onBtnOne = function () {
            this.xuyuanVisit(1);
        };
        //许愿十次
        ActivityXuyuanBoom.prototype.onBtnMore = function () {
            this.xuyuanVisit(10);
        };
        ActivityXuyuanBoom.prototype.OnAbovePop = function () {
            this.FreshRedTips();
        };
        ActivityXuyuanBoom.prototype.xuyuanVisit = function (time) {
            var _this = this;
            this.xuyuanLotteryReqBody_Visit(time).then(function (data) {
                if (data.header.result == 0) {
                    _this.gemsTone();
                    _this.setInfoXuyuanAni(data.body.gameInfo.getGoods);
                    _this.setFrech();
                    _this.FreshRedTips();
                    _this.takeNum = time;
                    if (time == 1) {
                        _this.rectMask.visible = true;
                        _this.donghua.animation.stop();
                        _this.donghua.animation.play("summon1", 1);
                        _this.donghua.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                            _this.donghua.animation.play("normal", 0);
                            _this.rectMask.visible = false;
                        }, _this);
                    }
                    else if (time == 10) {
                        _this.rectMask.visible = true;
                        _this.donghua.animation.stop();
                        _this.donghua.animation.play("summon2", 1);
                        _this.donghua.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                            _this.donghua.animation.play("normal", 0);
                            _this.rectMask.visible = false;
                        }, _this);
                    }
                }
                else if (data.header.result == message.EC.XG_LACK_TOKEN) {
                    zj.Game.PlayerInfoSystem.playAnnouce = false;
                    zj.loadUI(zj.PayMallScene)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                        scene.init();
                        scene.setCB(function () { _this.setFrech(); });
                    });
                }
                else if (data.header.result == message.EC.XG_LACK_PROMISE) {
                    var costXuyuan = 9;
                    if (time == 10) {
                        costXuyuan = 10 - _this.curTopicInfo.consume_pai_ten;
                    }
                    if (!_this.buyXuyuanTime(false, costXuyuan)) {
                        console.log(data.header.result);
                    }
                }
                else {
                    zj.Game.PlayerInfoSystem.playAnnouce = false;
                    console.log(data.header.result);
                }
            });
        };
        ActivityXuyuanBoom.prototype.xuyuanLotteryReqBody_Visit = function (time) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.XuyuanLotteryRequest();
                request.body.lottery_time = time;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_TOKEN && response.header.result != message.EC.XG_LACK_PROMISE) {
                        zj.toast_warning(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false, true);
                return;
            });
        };
        ActivityXuyuanBoom.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        ActivityXuyuanBoom.prototype.buyXuyuanTime = function (needError, initialNum) {
            var _this = this;
            var bOpen = (zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].info != 0)
                && (zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].leftTime - Math.floor(egret.getTimer() / 1000) != 0);
            if (!bOpen) {
                zj.toast(zj.TextsConfig.TextsConfig_Xuyuan.bEnd);
                return;
            }
            var xuyuanTbl = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.xuyuan_random + ".json"); //读表
            var quickMallInfo = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.fastMall + ".json")[message.EResourceType.RESOURCE_PROMISE];
            var index = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].info % Object.keys(xuyuanTbl).length;
            index = index == 0 && Object.keys(xuyuanTbl).length || index;
            var openIndex = index;
            var xuyuanTbl0 = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.xuyuan_random + ".json")[openIndex];
            if (xuyuanTbl0 != null) {
                this.maxTime = xuyuanTbl0.max_time;
                this.useTime = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_time;
                this.ownNum = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_PROMISE);
                this.canBuyNum = this.maxTime - this.useTime - this.ownNum;
                if (this.canBuyNum <= 0) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Xuyuan.cannotBuyTime);
                    return;
                }
                else {
                    var tokenCanBuyNum = Math.floor(zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_TOKEN) / quickMallInfo.consume_num);
                    this.canBuyNum = this.canBuyNum < tokenCanBuyNum ? this.canBuyNum : tokenCanBuyNum;
                    this.canBuyNum = this.canBuyNum > 99 ? 99 : this.canBuyNum;
                }
            }
            var canPush = false;
            if (this.canBuyNum <= 0 && needError && (Math.floor(zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_TOKEN) / quickMallInfo.consume_num)) != 0) {
                zj.toast(zj.TextsConfig.TextsConfig_Xuyuan.cannotBuyTime);
                return;
            }
            else {
                canPush = true;
                var firstTime_1 = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_PROMISE);
                var num = firstTime_1;
                zj.loadUI(zj.TavernBuyPop)
                    .then(function (tavernBuyPop) {
                    tavernBuyPop.init(_this);
                    tavernBuyPop.setInfo(message.EResourceType.RESOURCE_PROMISE, firstTime_1, _this.canBuyNum);
                    tavernBuyPop.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            return canPush;
        };
        ActivityXuyuanBoom.prototype.setUI = function () {
            this.lbGemstone0.text = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_PROMISE);
        };
        ActivityXuyuanBoom.prototype.onBtnAddGemstone = function () {
            zj.Game.UIManager.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.init();
                scene.show(zj.UI.SHOW_FROM_TOP);
                // scene.setCB(() => { this.setFrech() });
            });
            this.gemsTone();
        };
        ActivityXuyuanBoom.prototype.onBtnAddGemstone0 = function () {
            this.buyXuyuanTime(false, null);
            this.gemsTone();
        };
        ActivityXuyuanBoom.prototype.FreshRedTips = function () {
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_exchangeZone == null)
                return;
            var canConvert = false;
            var canAward = false;
            for (var k in this.curTopicInfo.exchange_goods) {
                var v = this.curTopicInfo.exchange_goods[k];
                var buy_times = zj.Table.FindR(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_exchangeZone, function (k, v) {
                    return v.key == k - 1;
                })[0];
                var coreCanGet = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_currentScore >= this.curTopicInfo.exchange_xuyuan[k];
                var timeCanGet = (buy_times == null) || (buy_times.value < this.curTopicInfo.exchange_count[k]);
                if (coreCanGet && coreCanGet) {
                    canConvert = true;
                }
            }
            for (var i = 0; i < this.curTopicInfo.step_score.length; i++) {
                var any = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_allScore;
                var score = this.curTopicInfo.step_score[i];
                if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_allScore >= this.curTopicInfo.step_score[i]) {
                    if (!zj.Table.VIn(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_freeZone, (i))) {
                        canAward = true;
                    }
                }
            }
            this.imgTip.visible = canAward || canConvert;
        };
        return ActivityXuyuanBoom;
    }(zj.Dialog));
    zj.ActivityXuyuanBoom = ActivityXuyuanBoom;
    __reflect(ActivityXuyuanBoom.prototype, "zj.ActivityXuyuanBoom");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityXuyuanBoom.js.map
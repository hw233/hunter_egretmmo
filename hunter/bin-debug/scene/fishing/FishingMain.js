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
    //钓鱼主界面
    // yuqingchao
    //2019.05.15
    var FishingMain = (function (_super) {
        __extends(FishingMain, _super);
        function FishingMain() {
            var _this = _super.call(this) || this;
            _this.allGold = false;
            _this.exTime = null;
            _this.status = null;
            _this.skinName = "resource/skins/fishing/FishingMainSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnGift.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGift, _this);
            _this.btnPush.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnPush, _this);
            _this.btnPull.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnPull, _this);
            _this.btnFreshPurple.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnFreashPurple, _this);
            _this.btnFresh.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnFresh, _this);
            _this.timer = new egret.Timer(1000, 0);
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.upDate, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                if (_this.timer)
                    _this.timer.stop();
            }, null);
            _this.init();
            return _this;
        }
        FishingMain.prototype.init = function () {
            var _this = this;
            this.exTime = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.leftTime;
            this.setStatus();
            this.upDate();
            this.setFishTimes();
            this.initFishList();
            this.mixInfoo_Visit().then(function (data) {
                if (data.header.result == 0) {
                    _this.freashInfo();
                }
            });
            //Teach
            if (zj.Teach.isDone(zj.teachBattle.teachPartID_WONDER_ENTER_4) == false) {
                zj.Teach.SetTeachPart(zj.teachBattle.teachPartID_WONDER_ENTER_4);
            }
        };
        FishingMain.prototype.upDate = function () {
            if (this.status == zj.TableEnum.Enum.LeagueFishStatus.Fishing) {
                this.setTimeDes();
                if (this.exTime - Math.floor(egret.getTimer() / 1000) <= 0) {
                    this.exTime = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.leftTime;
                    this.timer.stop();
                    this.freashInfo(false);
                }
            }
        };
        FishingMain.prototype.setTimeDes = function () {
            var time = zj.Helper.GetTimeStr(this.exTime - Math.floor(egret.getTimer() / 1000), false);
            this.lbTime.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.fish_curTime, time));
        };
        FishingMain.prototype.setStatus = function () {
            var _this = this;
            if (this.exTime - (Math.floor(egret.getTimer() / 1000)) > 0) {
                this.timer.start();
                this.status = zj.TableEnum.Enum.LeagueFishStatus.Fishing;
                this.setPush(false);
                this.btnPull.enabled = false;
            }
            else if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.goodses.length != 0) {
                this.status = zj.TableEnum.Enum.LeagueFishStatus.CanGet;
                this.setPush(false);
                zj.loadUI(zj.FishingEnd)
                    .then(function (dialog) {
                    dialog.init(_this);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info == 0) {
                this.status = zj.TableEnum.Enum.LeagueFishStatus.CanPush;
                this.setPush(true);
            }
            else if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info != 0) {
                this.status = zj.TableEnum.Enum.LeagueFishStatus.CanPull;
                this.setPush(false);
                this.btnPull.enabled = true;
            }
        };
        FishingMain.prototype.freashInfo = function (playAni) {
            this.exTime = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.leftTime;
            this.setStatus();
            this.setFishTimes();
            this.freashFishList(playAni);
            this.setFreeFreashTimes();
        };
        FishingMain.prototype.initFishList = function () {
            if (zj.Device.firstFish) {
                this.freashFishList(true);
                zj.Device.firstFish = false;
            }
            else {
                this.freashFishList(false);
            }
        };
        FishingMain.prototype.freashFishList = function (playAni) {
            this.setCostAllTime();
            this.arrListView = new eui.ArrayCollection();
            if (zj.Teach.m_bOpenTeach && playAni && zj.Device.firstFish) {
                var tbl = [1, 1, 1];
                for (var i = 0; i < tbl.length; i++) {
                    this.arrListView.addItem({
                        id: tbl[i],
                        playAni: playAni,
                        father: this,
                    });
                }
                this.lstView.dataProvider = this.arrListView;
                this.lstView.itemRenderer = zj.FishingMainItem;
            }
            else {
                for (var j = 0; j < zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.already_fish.length; j++) {
                    this.arrListView.addItem({
                        id: zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.already_fish[j],
                        playAni: playAni,
                        father: this,
                    });
                }
                this.lstView.dataProvider = this.arrListView;
                this.lstView.itemRenderer = zj.FishingMainItem;
            }
            this.allGold = true;
            for (var k in zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.already_fish) {
                var v = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.already_fish[k];
                if (v != 4) {
                    this.allGold = false;
                    return;
                }
            }
        };
        FishingMain.prototype.onBtnGift = function () {
            zj.loadUI(zj.FishingAwardView)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        FishingMain.prototype.setCostAllTime = function () {
            var fishInstance = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.leagueFish + ".json");
            if (this.status == zj.TableEnum.Enum.LeagueFishStatus.CanPull) {
                this.lbTime.textFlow = zj.Util.RichText(zj.TextsConfig.TextConfig_League.fish_canPull);
            }
            else if (this.status != zj.TableEnum.Enum.LeagueFishStatus.CanPull) {
                var costAllTime = 0;
                for (var k in zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.already_fish) {
                    var v = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.already_fish[k];
                    costAllTime = fishInstance[v].fishing_duration + costAllTime;
                }
                this.lbTime.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.fish_costTimeAll, this.formatTime(costAllTime)));
            }
        };
        FishingMain.prototype.formatTime = function (sec) {
            var time = null;
            if (sec < 60) {
                time = sec + zj.TextsConfig.TextConfig_League.fish_costTime_sec;
            }
            else if (sec % 60 != 0) {
                time = Math.ceil(sec / 60) + zj.TextsConfig.TextConfig_League.fish_costTime_min + sec % 60 + zj.TextsConfig.TextConfig_League.fish_costTime_sec;
            }
            else {
                time = Math.ceil(sec / 60) + zj.TextsConfig.TextConfig_League.fish_costTime_min;
            }
            return time;
        };
        FishingMain.prototype.onBtnClose = function () {
            this.timer.stop();
            this.close(zj.UI.HIDE_TO_TOP);
        };
        FishingMain.prototype.setFishTimes = function () {
            this.lbLeft.text = zj.PlayerVIPSystem.Level().league_fishing - zj.Game.PlayerVIPSystem.vipInfo.league_fishing + "/" + zj.PlayerVIPSystem.Level().league_fishing;
        };
        FishingMain.prototype.setFreeFreashTimes = function () {
            if (zj.CommonConfig.league_fishing_free_refresh + zj.PlayerVIPSystem.LowItem().fishing_free_time > zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.fishing_refresh) {
                this.lbFree.visible = true;
                this.imgCopper.visible = false;
                this.lbCopper.visible = false;
                this.lbFree.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.fish_freeFreash, (zj.CommonConfig.league_fishing_free_refresh + zj.PlayerVIPSystem.LowItem().fishing_free_time - zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.fishing_refresh));
            }
            else {
                this.lbFree.visible = false;
                this.imgCopper.visible = true;
                this.lbCopper.visible = true;
                this.lbCopper.text = zj.CommonConfig.league_fishing_refresh_money.toString();
            }
            this.lbGold.text = zj.CommonConfig.refresh_purple_token(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.refresh_purple_time + 1).toString();
        };
        FishingMain.prototype.setPush = function (bPush) {
            this.groupPush.visible = bPush;
            this.btnPull.visible = !bPush;
            if (this.btnPull.visible == true) {
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            }
        };
        FishingMain.prototype.setCanRefresh = function (can) {
            this.btnFresh.enabled = can;
            this.btnFreshPurple.enabled = can;
        };
        //下杆
        FishingMain.prototype.onBtnPush = function () {
            var _this = this;
            this.leagueFishingStart_Visit().then(function (data) {
                if (data.header.result == 0) {
                    _this.freashInfo(false);
                    console.log(zj.TextsConfig.TextConfig_League.fish_start);
                }
            });
        };
        //收杆
        FishingMain.prototype.onBtnPull = function () {
            var _this = this;
            this.leagueFishingEnd_Visit().then(function (data) {
                if (data.header.result == 0) {
                    _this.freashInfo(false);
                }
            });
        };
        //一键刷紫
        FishingMain.prototype.onBtnFreashPurple = function () {
            var _this = this;
            var bTeach = zj.Teach.bInTeaching && zj.Teach.m_bOpenTeach;
            if (this.allGold && !bTeach) {
                zj.loadUI(zj.ConfirmCancelDialog).then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(zj.TextsConfig.TextConfig_League.fish_all_gold_tips);
                    dialog.setCB(function () { _this.leagueFishingRefresh(true); });
                });
            }
            else {
                this.leagueFishingRefresh(true);
            }
        };
        FishingMain.prototype.leagueFishingRefresh = function (isPurple) {
            var _this = this;
            if (isPurple) {
                this.leagueFishingRefresh_Visit(isPurple).then(function (data) {
                    if (data.header.result == 0) {
                        _this.freashInfo(true);
                    }
                    else if (data.header.result == message.EC.XG_LACK_MONEY) {
                        _this.setCanRefresh(true);
                        //addMoney
                    }
                    else if (data.header.result == message.EC.XG_LACK_TOKEN) {
                        _this.setCanRefresh(true);
                        zj.loadUI(zj.PayMallScene)
                            .then(function (scene) {
                            scene.show(zj.UI.SHOW_FROM_TOP);
                            scene.init(true);
                        });
                    }
                    else {
                        _this.setCanRefresh(true);
                        if (data.header.result == message.EC.XG_VIP_LEVEL_NOT_ENOUGH) {
                            if (zj.Device.isVipOpen) {
                                var str = zj.PlayerVIPSystem.League_FishingRefresh();
                            }
                            else {
                                zj.toast(zj.LANG(zj.TextsConfig.TextsConfig_Error.tk_error));
                            }
                        }
                    }
                });
            }
            else {
                this.leagueFishingRefresh_Visit(isPurple).then(function (data) {
                    if (data.header.result == 0) {
                        _this.freashInfo(true);
                    }
                    else if (data.header.result == message.EC.XG_LACK_MONEY) {
                        _this.setCanRefresh(true);
                        //addMoney
                    }
                    else if (data.header.result == message.EC.XG_LACK_TOKEN) {
                        _this.setCanRefresh(true);
                        zj.loadUI(zj.PayMallScene)
                            .then(function (scene) {
                            scene.show(zj.UI.SHOW_FROM_TOP);
                            scene.init(true);
                        });
                    }
                });
            }
        };
        //刷新品质
        FishingMain.prototype.onBtnFresh = function () {
            var _this = this;
            var bTeach = zj.Teach.bInTeaching && zj.Teach.m_bOpenTeach;
            if (this.allGold && !bTeach) {
                zj.loadUI(zj.ConfirmCancelDialog).then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(zj.TextsConfig.TextConfig_League.fish_all_gold_tips);
                    dialog.setCB(function () { _this.leagueFishingRefresh(false); });
                });
            }
            else {
                this.leagueFishingRefresh(false);
            }
        };
        //拉取数据杂项
        FishingMain.prototype.mixInfoo_Visit = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GetLotteryFruitInfoRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        zj.toast_warning(zj.LANG(zj.Game.ConfigManager.getAone2CodeReason(response.header.result)));
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
        /**
         * 下杆协议
         * */
        FishingMain.prototype.leagueFishingStart_Visit = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueFishingStartRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        zj.toast_warning(zj.LANG(zj.Game.ConfigManager.getAone2CodeReason(response.header.result)));
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
        /**
         * 收杆协议
         */
        FishingMain.prototype.leagueFishingEnd_Visit = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueFishingEndRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        zj.toast_warning(zj.LANG(zj.Game.ConfigManager.getAone2CodeReason(response.header.result)));
                        // reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
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
        /**
         * 刷新品质
         * */
        FishingMain.prototype.leagueFishingRefresh_Visit = function (isPurple) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueFishingRefreshRequest();
                request.body.is_key = isPurple;
                request.body.is_teach = zj.Teach.BeInTeaching();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY
                        && response.header.result != message.EC.XG_LACK_TOKEN) {
                        zj.toast_warning(zj.LANG(zj.Game.ConfigManager.getAone2CodeReason(response.header.result)));
                        // reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
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
        return FishingMain;
    }(zj.Dialog));
    zj.FishingMain = FishingMain;
    __reflect(FishingMain.prototype, "zj.FishingMain");
})(zj || (zj = {}));
//# sourceMappingURL=FishingMain.js.map
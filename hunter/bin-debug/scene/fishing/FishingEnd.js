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
    //钓鱼结束奖励
    //yuqingchao
    //2019.05.18
    var FishingEnd = (function (_super) {
        __extends(FishingEnd, _super);
        function FishingEnd() {
            var _this = _super.call(this) || this;
            _this.isDouble = false;
            _this.item_list = [];
            _this.good = [];
            _this.skinName = "resource/skins/fishing/FishingEndSkin.exml";
            _this.btnDouble.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnDouble, _this);
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            _this.child = new zj.FishingEndItem();
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
                _this.child = null;
            }, null);
            return _this;
        }
        FishingEnd.prototype.init = function (father) {
            var _this = this;
            this.isDouble = false;
            this.father = father;
            this.lbGold.text = zj.CommonConfig.refresh_double_token(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.refresh_double_time + 1).toString();
            this.setList();
            this.setCanNotClick();
            setTimeout(function () {
                _this.setCanClick();
            }, 2000);
        };
        FishingEnd.prototype.freashInfo = function () {
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.goodses.length == 0 && !this.isDouble) {
                this.father.freashInfo(false);
            }
            else if (this.isDouble) {
                this.btnDouble.enabled = false;
                this.setList();
            }
        };
        FishingEnd.prototype.setList = function () {
            this.arrLstAward = new eui.ArrayCollection();
            var num = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.goodses.length;
            if (this.btnDouble.enabled) {
                for (var i = 0; i < zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.goodses.length; i++) {
                    this.good.push(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.goodses[i]);
                    this.arrLstAward.addItem({
                        info: zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.goodses[i],
                        id: i,
                        double: this.btnDouble.enabled
                    });
                }
            }
            else {
                for (var i = 0; i < this.good.length; i++) {
                    this.arrLstAward.addItem({
                        info: this.good[i],
                        id: i,
                        double: this.btnDouble.enabled
                    });
                }
            }
            this.lstAward.dataProvider = this.arrLstAward;
            this.lstAward.itemRenderer = zj.FishingEndItem;
        };
        FishingEnd.prototype.setCanNotClick = function () {
            this.btnDouble.visible = false;
            this.btnGet.visible = false;
            this.groupGold.visible = false;
        };
        FishingEnd.prototype.setCanClick = function () {
            this.btnDouble.visible = true;
            this.btnGet.visible = true;
            this.groupGold.visible = true;
            zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
        };
        FishingEnd.prototype.onBtnDouble = function () {
            var _this = this;
            this.isDouble = true;
            this.leagueFishingReward_Visit(true).then(function (data) {
                if (data.header.result == 0) {
                    _this.freashInfo();
                }
                else {
                    if (_this.isDouble) {
                        _this.isDouble = false;
                    }
                    if (data.header.result == 10200 && zj.Device.isTestSwitch) {
                        zj.toast(zj.LANG(zj.TextsConfig.TextsConfig_Error.tk_error));
                    }
                    else if (data.header.result == 10200 && !zj.Device.isTestSwitch) {
                        if (zj.Device.isVipOpen) {
                            return;
                        }
                        else {
                            zj.toast(zj.LANG(zj.TextsConfig.TextsConfig_Error.tk_error));
                        }
                    }
                }
            });
            ;
        };
        FishingEnd.prototype.onBtnGet = function () {
            var _this = this;
            if (this.isDouble) {
                this.father.freashInfo(false);
                this.close(zj.UI.HIDE_TO_TOP);
            }
            else {
                this.leagueFishingReward_Visit(false).then(function (data) {
                    if (data.header.result == 0) {
                        _this.freashInfo();
                    }
                    else {
                        if (_this.isDouble) {
                            _this.isDouble = false;
                        }
                        if (data.header.result == 10200 && zj.Device.isTestSwitch) {
                            zj.toast(zj.LANG(zj.TextsConfig.TextsConfig_Error.tk_error));
                        }
                    }
                });
                this.close(zj.UI.HIDE_TO_TOP);
            }
        };
        //
        FishingEnd.prototype.leagueFishingReward_Visit = function (is_double) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueFishingRewardRequest();
                request.body.is_double = is_double;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        zj.toast(zj.LANG(zj.Game.ConfigManager.getAone2CodeReason(response.header.result)));
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
        return FishingEnd;
    }(zj.Dialog));
    zj.FishingEnd = FishingEnd;
    __reflect(FishingEnd.prototype, "zj.FishingEnd");
})(zj || (zj = {}));
//# sourceMappingURL=FishingEnd.js.map
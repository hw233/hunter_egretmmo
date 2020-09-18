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
     * 2019-9-4
     * xingliwei
     * @class 登录送VIP
     */
    var VipLoginGet = (function (_super) {
        __extends(VipLoginGet, _super);
        function VipLoginGet() {
            var _this = _super.call(this) || this;
            _this.MAX = 12;
            _this.skinName = "resource/skins/vip/VipLoginGetSkin.exml";
            _this.imgExp.mask = _this.imgExpbg;
            _this.init();
            return _this;
        }
        VipLoginGet.prototype.init = function () {
            this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGo, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnGet1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet1, this);
            this.btnGet2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet2, this);
            this.btnGet3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet3, this);
            this.btnGet4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet4, this);
            this.setInfo();
        };
        VipLoginGet.prototype.setInfo = function () {
            this.imgVipLevel.source = "ui_mall_new_VIP" + zj.Game.PlayerInfoSystem.VipLevel + "_png";
            //经验
            var tbl = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.LowVip + ".json"); //读表
            var percent = 0;
            var levelCur = zj.Game.PlayerInfoSystem.VipLevel;
            if (levelCur != this.MAX) {
                percent = Number((zj.Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[levelCur].sum) / (tbl[levelCur].charge + tbl[levelCur].sum));
                this.lbPay.text = ((zj.Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[levelCur].sum) / 10 + "/" + (tbl[levelCur].charge + tbl[levelCur].sum) / 10).toString();
            }
            else {
                percent = Number((zj.Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[levelCur].sum) / tbl[levelCur].sum);
                this.lbPay.text = ((zj.Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[levelCur].sum) / 10 + "/" + tbl[levelCur].sum / 10).toString();
            }
            if (percent > 1) {
                percent = 1;
            }
            if (percent < 0) {
                percent = 0;
            }
            this.imgExpbg.width = 341 * percent;
            for (var i = 1; i <= 4; i++) {
                this["imgGet" + i].visible = false;
            }
            var date = zj.Game.PlayerInfoSystem.BaseInfo.createTime;
            var a = zj.Game.Controller.curServerTime;
            var newDate = new Date(date * 1000);
            var diff = newDate.getHours() * 3600 + newDate.getMinutes() * 60 + newDate.getSeconds();
            var start = date - diff;
            var time = (((a - start) / (24 * 3600)) >> 0) + 1;
            if (time >= 1) {
                this.imgTodayGer1.visible = true;
            }
            if (time >= 2) {
                this.imgTodayGer2.visible = true;
                this.btnGet2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet2, this);
            }
            else {
                this.imgTodayGer2.visible = false;
                this.btnGet2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet2, this);
            }
            if (time >= 3) {
                this.imgTodayGer3.visible = true;
                this.btnGet3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet3, this);
            }
            else {
                this.imgTodayGer3.visible = false;
                this.btnGet3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet3, this);
            }
            for (var _i = 0, _a = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.shareType; _i < _a.length; _i++) {
                var key = _a[_i];
                if (key == 20001) {
                    this.btnGet4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet4, this);
                    this.imgTodayGer4.visible = false;
                    this.imgGet4.visible = true;
                }
                if (key == 20002) {
                    this.btnGet1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet1, this);
                    this.imgTodayGer1.visible = false;
                    this.imgGet1.visible = true;
                }
                if (key == 20003) {
                    this.btnGet2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet2, this);
                    this.imgTodayGer2.visible = false;
                    this.imgGet2.visible = true;
                }
                if (key == 20004) {
                    this.btnGet3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet3, this);
                    this.imgTodayGer3.visible = false;
                    this.imgGet3.visible = true;
                }
            }
            if (this.imgTodayGer1.visible == true) {
                this.imgTodayGer2.visible = false;
                this.btnGet2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet2, this);
            }
            if (this.imgTodayGer2.visible == true || this.imgGet2.visible == false) {
                this.imgTodayGer3.visible = false;
                this.btnGet3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet3, this);
            }
        };
        VipLoginGet.prototype.onBtnGet1 = function () {
            this.receive(20002);
        };
        VipLoginGet.prototype.onBtnGet2 = function () {
            this.receive(20003);
        };
        VipLoginGet.prototype.onBtnGet3 = function () {
            this.receive(20004);
        };
        VipLoginGet.prototype.onBtnGet4 = function () {
            this.receive(20001);
        };
        VipLoginGet.prototype.receive = function (type) {
            var _this = this;
            this.receiveAward(type).then(function (gameInfo) {
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    for (var i = 0; i < gameInfo.getGoods.length; i++) {
                        gameInfo.getGoods[i].count /= 10;
                    }
                    dialog.init(gameInfo.getGoods);
                    dialog.show();
                    dialog.setCB(function () {
                        _this.setInfo();
                    });
                });
            }).catch(function () {
            });
        };
        /**领取奖励发协议 */
        VipLoginGet.prototype.receiveAward = function (type) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.ShareRewardRequest();
                request.body.share_type = type;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        VipLoginGet.prototype.onBtnGo = function () {
            zj.loadUI(zj.VipLow)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FILL_OUT);
                dialog.init(true);
            });
        };
        VipLoginGet.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            if (zj.Teach.m_bOpenTeach == true && zj.Teach.teachingNow == false && !zj.Teach.isDone(zj.teachBattle.teachPartID_First_Charge) && zj.Teach.isDone(3005)) {
                zj.Teach.SetTeachPart(zj.teachBattle.teachPartID_First_Charge);
            }
            else if (zj.Teach.m_bOpenTeach == true && zj.Teach.teachingNow == false && zj.Teach.isDone(zj.teachBattle.teachPartID_First_Charge) && zj.Teach.isDone(3005) && !zj.Teach.isDone(zj.teachBattle.teachPartID_GiftBag)) {
                // Teach.SetTeachPart(teachBattle.teachPartID_GiftBag);
                zj.Game.TeachSystem.isShowGetVip = false;
                zj.Game.EventManager.event(zj.GameEvent.START_NEW_TEACHING, { curPart: zj.teachBattle.teachPartID_GiftBag });
                var ui = zj.Game.UIManager.topScene();
                if (ui instanceof zj.MainCityUI) {
                    ui.sceneUI.setInfoGiftList();
                }
            }
        };
        return VipLoginGet;
    }(zj.Dialog));
    zj.VipLoginGet = VipLoginGet;
    __reflect(VipLoginGet.prototype, "zj.VipLoginGet");
})(zj || (zj = {}));
//# sourceMappingURL=VipLoginGet.js.map
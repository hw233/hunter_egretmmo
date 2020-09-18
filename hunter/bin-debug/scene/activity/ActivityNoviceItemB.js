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
     * @author xing li wei
     *
     * @date 2019-11-13
     *
     * @class 新手狂欢礼包item
     */
    var ActivityNoviceItemB = (function (_super) {
        __extends(ActivityNoviceItemB, _super);
        function ActivityNoviceItemB() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityNoviceItemBSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityNoviceItemB"], null);
            _this.groupPurchase.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            _this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGo, _this);
            return _this;
        }
        ActivityNoviceItemB.prototype.dataChanged = function () {
            this.setinfo();
            this.setInfoAward();
        };
        ActivityNoviceItemB.prototype.setinfo = function () {
            var _this = this;
            var info = this.data.info; //.father.data[this.data.TypeId - 1].dataInfo[this.data.index]
            //礼包名
            this.labelTitle.text = info.name;
            //完成条件
            this.labelTitle1.text = "";
            if (Number(info.vip_level) != 0) {
                // this.labelTitle1.text += "VIP要求" + info.vip_level;
            }
            if (Number(info.charge_token) != 0) {
                var a = zj.Game.PlayerInfoSystem.BaseInfo.chargeToken <= info.charge_token ? zj.Game.PlayerInfoSystem.BaseInfo.chargeToken : info.charge_token;
                this.labelTitle1.text += "已充值" + a / 10 + "/" + info.charge_token / 10;
            }
            if (Number(info.comsume_token) != 0) {
                // this.labelTitle1.text += "原价" + info.comsume_token;
                // this.groupPurchase.visible = true;
                this.labelMoney.text = info.comsume_token.toString();
            }
            else {
                this.groupPurchase.visible = false;
            }
            //原价多少
            if (info.primer != null && info.primer != "") {
                this.labelOriginalPrice.text = info.primer;
                this.groupRed.visible = true;
                this.labelTitle1.text = "";
            }
            else {
                this.groupRed.visible = false;
            }
            //判断是否领取过
            var vis = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.mission_gift, function (k, v) {
                return v == _this.data.info.index;
            });
            this.btnGet.enabled = true;
            if (vis) {
                this.groupPurchase.visible = false;
                this.btnGo.visible = false;
                this.btnGet.visible = false;
                this.imgGet.visible = true;
            }
            else {
                this.imgGet.visible = false;
                // let day = Math.floor((Game.Controller.curServerTime - Game.PlayerInfoSystem.BaseInfo.createTime) / 3600 / 24)
                if (this.data.father.btnIndex <= zj.Helper.day()) {
                    if (info.primer != null && info.primer != "") {
                        this.groupPurchase.visible = true;
                        this.btnGo.visible = false;
                        this.btnGet.visible = false;
                        this.btnGet.enabled = false;
                        this.imgGet.visible = false;
                    }
                    else if (Number(info.charge_token) != 0) {
                        if (zj.Game.PlayerInfoSystem.BaseInfo.chargeToken >= info.charge_token) {
                            this.groupPurchase.visible = false;
                            this.btnGo.visible = false;
                            this.btnGet.visible = true;
                            this.btnGet.enabled = true;
                            this.imgGet.visible = false;
                        }
                        else {
                            this.groupPurchase.visible = false;
                            this.btnGo.visible = false;
                            this.btnGet.visible = true;
                            this.btnGet.enabled = false;
                            this.imgGet.visible = false;
                        }
                    }
                    else {
                        this.groupPurchase.visible = false;
                        this.btnGo.visible = false;
                        this.btnGet.visible = true;
                        this.btnGet.enabled = true;
                        this.imgGet.visible = false;
                    }
                }
                else {
                    this.groupPurchase.visible = false;
                    this.btnGo.visible = false;
                    this.btnGet.visible = true;
                    this.btnGet.enabled = false;
                    this.imgGet.visible = false;
                }
            }
        };
        /**领取 */
        ActivityNoviceItemB.prototype.onBtnGet = function () {
            var _this = this;
            this.buyMissionGift().then(function (gameInfo) {
                var goods = [];
                for (var i = 0; i < _this.data.info.reward_goods.length; i++) {
                    var b = new message.GoodsInfo();
                    b.goodsId = _this.data.info.reward_goods[i];
                    b.count = _this.data.info.reward_count[i];
                    goods.push(b);
                }
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    dialog.init(goods);
                    dialog.setCB(function () {
                        _this.setinfo();
                    });
                    dialog.show();
                });
                _this.data.father.initAfterSetType();
            }).catch(function (result) {
                if (result == 10209) {
                    zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Money.demstone, function () {
                        zj.loadUI(zj.PayMallScene)
                            .then(function (scene) {
                            scene.show(zj.UI.SHOW_FROM_TOP);
                            scene.init();
                        });
                    });
                }
                else if (result == 10347) {
                    zj.loadUI(zj.ConfirmCancelDialog).then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setInfo("VIP不足，是否前往提升VIP等级？");
                        dialog.setCB(function () {
                            zj.loadUI(zj.PayMallScene)
                                .then(function (dialog) {
                                dialog.show(zj.UI.SHOW_FILL_OUT);
                                dialog.init(true);
                            });
                        });
                    });
                }
                else {
                    zj.Game.ConfigManager.getAone2CodeReason(result);
                }
            });
        };
        /**领取协议 */
        ActivityNoviceItemB.prototype.buyMissionGift = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.BuyMissionGiftRequest();
                request.body.index = Number(_this.data.info.index);
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false, true);
            });
        };
        ActivityNoviceItemB.prototype.onBtnGo = function () {
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(true);
            });
        };
        /**加载奖励列表 */
        ActivityNoviceItemB.prototype.setInfoAward = function () {
            var itemInfo = this.data.info.reward_goods;
            var count = this.data.info.reward_count;
            var array = new eui.ArrayCollection();
            for (var i = 0; i < itemInfo.length; i++) {
                var data = new zj.ActivityNoviceItemItemData();
                data.index = i;
                data.itemInfo = [itemInfo[i], count[i]];
                data.father = this;
                array.addItem(data);
            }
            this.listViewAward.dataProvider = array;
            this.listViewAward.itemRenderer = zj.ActivityNoviceItemItem;
        };
        return ActivityNoviceItemB;
    }(eui.ItemRenderer));
    zj.ActivityNoviceItemB = ActivityNoviceItemB;
    __reflect(ActivityNoviceItemB.prototype, "zj.ActivityNoviceItemB");
    var ActivityNoviceItemBData = (function () {
        function ActivityNoviceItemBData() {
        }
        return ActivityNoviceItemBData;
    }());
    zj.ActivityNoviceItemBData = ActivityNoviceItemBData;
    __reflect(ActivityNoviceItemBData.prototype, "zj.ActivityNoviceItemBData");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityNoviceItemB.js.map
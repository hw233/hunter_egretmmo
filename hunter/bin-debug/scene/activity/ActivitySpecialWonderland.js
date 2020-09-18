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
    // 福利-成长基金
    // lizhengqiang
    // 20190323
    var ActivitySpecialWonderland = (function (_super) {
        __extends(ActivitySpecialWonderland, _super);
        function ActivitySpecialWonderland() {
            var _this = _super.call(this) || this;
            _this.setInfoButton = function () {
                _this.btn.enabled = (_this.info["buy_times"] < _this.giftInfo.buy_times);
            };
            _this.skinName = "resource/skins/activity/ActivitySpecialWonderlandSkin.exml";
            return _this;
        }
        ActivitySpecialWonderland.prototype.init = function () {
            var _this = this;
            zj.Game.EventManager.event(zj.GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
            this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtn, this);
            this.giftInfo = zj.PlayerGiftSystem.Instance_item(100302);
            this.info = zj.Table.FindR(zj.PlayerGiftSystem.SortGift(zj.Game.PlayerGiftSystem.giftInfos), function (k, v) {
                return v.gift_index == 100302;
            })[0];
            if (this.info.buy_times == 0) {
                zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xinshou", "armatureName", 1, 0)
                    .then(function (display) {
                    display.touchEnabled = false;
                    _this.groupHand.addChild(display);
                });
            }
            else {
                this.groupHand.removeChildren();
            }
            this.allLevelInfo = zj.PlayerGiftSystem.GetGiftFate(Number(this.giftInfo.daily_index));
            //最高返还多少
            var allGet = 0;
            for (var i = 0; i < this.allLevelInfo.length; i++) {
                for (var j = 0; j < this.allLevelInfo[i].goods_id.length; j++) {
                    if (this.allLevelInfo[i].goods_id[j] == message.EResourceType.RESOURCE_TOKEN)
                        allGet = allGet + this.allLevelInfo[i].goods_count[j];
                }
            }
            var arrCollection = new eui.ArrayCollection();
            for (var i = 0; i < this.allLevelInfo.length; i++) {
                var data = new zj.ActivitySpecialWonderlandItemData();
                data.father = this;
                data.index = i;
                data.info = this.allLevelInfo[i];
                data.id = 100302;
                arrCollection.addItem(data);
            }
            var array = new eui.ArrayCollection();
            var b = [];
            var _loop_1 = function (i) {
                var a = arrCollection.source[i];
                var info = zj.Table.FindR(zj.PlayerGiftSystem.SortGift(zj.Game.PlayerGiftSystem.giftInfos), function (k, v) {
                    return v.gift_index == a.id;
                })[0];
                var find = zj.Table.FindF(info["markIndex"], function (k, v) {
                    return v == zj.PlayerGiftSystem.GetGiftFate(Number(zj.PlayerGiftSystem.Instance_item(info["gift_index"]).daily_index))[a.index].index;
                });
                if (find) {
                    b.push(a);
                }
                else {
                    array.addItem(a);
                }
            };
            for (var i = 0; i < arrCollection.length; i++) {
                _loop_1(i);
            }
            for (var k = 0; k < b.length; k++) {
                array.addItem(b[k]);
            }
            this.lstAward.dataProvider = array;
            this.lstAward.itemRenderer = zj.ActivitySpecialWonderlandItem;
            this.lbCurrencyLevel.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.baselevel, zj.Game.PlayerInfoSystem.BaseInfo.level));
        };
        Object.defineProperty(ActivitySpecialWonderland.prototype, "vis", {
            get: function () {
                if (this.info.buy_times == 1) {
                    return true;
                }
                else {
                    return false;
                }
            },
            enumerable: true,
            configurable: true
        });
        ActivitySpecialWonderland.prototype.onbtn = function () {
            var _this = this;
            if (zj.Game.PlayerInfoSystem.BaseInfo.vipLevel < 3) {
                // toast_warning(LANG(TextsConfig.TextConfig_Instance.vip3BuyGift));
                var str_1 = "<text>达到</text><color>r=200,g=38,b=0</color><text>VIP%s级</text><text>方可购买</text><color>r=200,g=38,b=0</color><text>成长基金</text><text>，是否前往提升VIP等级？</text>";
                zj.loadUI(zj.ConfirmCancelDialog).then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(zj.HelpUtil.textConfigFormat(str_1, 3));
                    dialog.setCB(function () {
                        zj.Game.EventManager.event(zj.GameEvent.CLOSE_ACTIVITY_SCENE);
                        zj.loadUI(zj.PayMallScene).then(function (scene) {
                            scene.show(zj.UI.SHOW_FROM_TOP);
                            scene.init(true);
                            scene.loadFrom(zj.TableEnum.Enum.HXHChargeType.Gift);
                        });
                    });
                });
            }
            else {
                if (!this.info) {
                    zj.toast_warning("基金活动未开启");
                    return;
                }
                zj.Game.PlayerGiftSystem.rewardNewGift(this.info["index"]).then(function (gameInfo) {
                    var cb = function () {
                        _this.setInfoButton();
                        zj.toast_success(zj.LANG(zj.TextsConfig.TextConfig_Tower.mallBuy));
                    };
                    if (gameInfo.giftInfos.length > 0) {
                        for (var _i = 0, _a = gameInfo.giftInfos; _i < _a.length; _i++) {
                            var v = _a[_i];
                            if (v.index == _this.info["index"]) {
                                _this.info = zj.Table.DeepCopy(v);
                                if (_this.info["buy_times"] >= _this.giftInfo.buy_times) {
                                    cb();
                                }
                            }
                        }
                    }
                    egret.Tween.get(_this).wait(100).call(function () {
                        _this.init();
                    });
                }).catch(function (result) {
                    zj.toast_warning(zj.Game.ConfigManager.getAone2CodeReason(result));
                });
            }
        };
        /**抬起移除奖励详情界面 */
        ActivitySpecialWonderland.prototype.up = function () {
            var show = this.getChildByName("details");
            if (show)
                this.removeChild(show);
        };
        ActivitySpecialWonderland.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        return ActivitySpecialWonderland;
    }(zj.UI));
    zj.ActivitySpecialWonderland = ActivitySpecialWonderland;
    __reflect(ActivitySpecialWonderland.prototype, "zj.ActivitySpecialWonderland");
})(zj || (zj = {}));
//# sourceMappingURL=ActivitySpecialWonderland.js.map
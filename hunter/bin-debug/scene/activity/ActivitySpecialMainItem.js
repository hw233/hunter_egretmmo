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
    // 福利item
    // lizhengiang
    // 20190320
    var ActivitySpecialMainItem = (function (_super) {
        __extends(ActivitySpecialMainItem, _super);
        function ActivitySpecialMainItem() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.vis = true;
            _this.skinName = "resource/skins/activity/ActivitySpecialMainItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivitySpecialMainItem"], null);
            return _this;
        }
        ActivitySpecialMainItem.prototype.dataChanged = function () {
            this.index = this.data;
            if (this.vis) {
                this.vis = false;
                if (this.index != 1) {
                    zj.Set.ButtonBackgroud(this.btnTag, zj.cachekey(zj.UIConfig.UIConfig_Special.title[this.data - 1], this), zj.cachekey(zj.UIConfig.UIConfig_Special.title[this.data - 1], this), zj.cachekey(zj.UIConfig.UIConfig_Special.title1[this.data - 1], this));
                }
            }
            if (this.index == 1) {
                this.imgTip.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.AWARD, 1);
            }
            else if (this.index == 2) {
                this.imgTip.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.SPECIAL, zj.Tips.TAG.SPECIAL_GETPOWER);
            }
            else if (this.index == 3) {
                this.imgTip.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.SPECIAL, zj.Tips.TAG.SPECIAL_GATAWARD);
            }
            else if (this.index == 4) {
                var info = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                    return v.gift_index == 100203;
                })[0];
                var info1 = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                    return v.gift_index == 100204;
                })[0];
                if (info == null && info1 == null) {
                    this.imgTip.visible = false;
                }
                else if (info != null && info1 == null) {
                    if ((info.buy_times != 0 && info.mark == 0)) {
                        this.imgTip.visible = true;
                    }
                    else {
                        this.imgTip.visible = false;
                    }
                }
                else if (info == null && info1 != null) {
                    if ((info1.buy_times != 0 && info1.mark == 0)) {
                        this.imgTip.visible = true;
                    }
                    else {
                        this.imgTip.visible = false;
                    }
                }
                else {
                    if ((info.buy_times != 0 && info.mark == 0) || (info1.buy_times != 0 && info1.mark == 0)) {
                        this.imgTip.visible = true;
                    }
                    else {
                        this.imgTip.visible = false;
                    }
                }
            }
            else if (this.index == 5) {
                var info = zj.Table.FindR(zj.PlayerGiftSystem.SortGift(zj.Game.PlayerGiftSystem.giftInfos), function (k, v) {
                    return v.gift_index == 100302;
                })[0];
                if (info) {
                    if (zj.PlayerGiftSystem.getNextLevel(info)) {
                        this.imgTip.visible = zj.PlayerGiftSystem.getNextLevel(info) <= zj.Game.PlayerInfoSystem.BaseInfo.level && info.buy_times != 0;
                    }
                }
                else {
                    this.imgTip.visible = false;
                }
            }
            else if (this.index == 6) {
                var info = zj.Table.FindR(zj.PlayerGiftSystem.SortGift(zj.Game.PlayerGiftSystem.giftInfos), function (k, v) {
                    return v.gift_index == 100303;
                })[0];
                if (info) {
                    if (zj.PlayerGiftSystem.getNextLevel(info)) {
                        this.imgTip.visible = zj.PlayerGiftSystem.getNextLevel(info) <= zj.Game.PlayerInfoSystem.BaseInfo.level && info.buy_times != 0;
                    }
                }
                else {
                    this.imgTip.visible = false;
                }
            }
            else if (this.index == 7) {
                this.imgTip.visible = false;
                var table = zj.TableContinuePay.Table();
                var _loop_1 = function (i) {
                    var info = zj.TableContinuePay.Item(i);
                    var vis = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.pay_reward, function (k, v) {
                        return v == info.id;
                    });
                    if (info.id == zj.Game.PlayerInfoSystem.BaseInfo.pay_day && !vis) {
                        this_1.imgTip.visible = true;
                        i = 1000;
                        return out_i_1 = i, "break";
                    }
                    out_i_1 = i;
                };
                var this_1 = this, out_i_1;
                for (var i = 1; i <= Object.keys(table).length; i++) {
                    var state_1 = _loop_1(i);
                    i = out_i_1;
                    if (state_1 === "break")
                        break;
                }
            }
            else if (this.index >= 4) {
                this.imgTip.visible = zj.Tips.tips_useTime_get(this.index);
            }
            else {
                this.imgTip.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.SPECIAL, zj.Tips.TAG.SPECIAL_UpStar);
            }
            if (this.selected) {
                this.btnTag.enabled = false;
            }
            else {
                this.btnTag.enabled = true;
            }
        };
        return ActivitySpecialMainItem;
    }(eui.ItemRenderer));
    zj.ActivitySpecialMainItem = ActivitySpecialMainItem;
    __reflect(ActivitySpecialMainItem.prototype, "zj.ActivitySpecialMainItem");
})(zj || (zj = {}));
//# sourceMappingURL=ActivitySpecialMainItem.js.map
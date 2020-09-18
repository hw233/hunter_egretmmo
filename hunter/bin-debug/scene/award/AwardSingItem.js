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
    // 签到item
    // lizhengiang
    // 20190320
    var AwardSignItem = (function (_super) {
        __extends(AwardSignItem, _super);
        function AwardSignItem() {
            var _this = _super.call(this) || this;
            _this.refreshInfo = function () {
                zj.closeCache(_this.cacheGroup);
                var info = zj.ServerTableSign.Item(_this.data);
                var itemSet = zj.PlayerItemSystem.Set(info.good_id, info.show_type, info.good_count);
                _this.imgFrame.source = zj.cachekey(itemSet.Frame, _this);
                _this.imgIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(info.good_id), _this);
                _this.lbNum.text = info.good_count.toString();
                _this.groupClip.visible = false;
                if (info.show_type != 0) {
                    _this.groupClip.visible = true;
                    zj.Game.DragonBonesManager.playAnimation(_this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0).then(function (display) {
                        _this.groupClip.addChild(display);
                    }).catch(function (reason) {
                        zj.toast(reason);
                    });
                }
                _this.btnSign.touchEnabled = false;
                var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Award.day, _this.day);
                var infoa = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo;
                //判断是否可领取
                if (!zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.is_signToday && _this.day == zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.sign_time + 1) {
                    str = zj.TextsConfig.TextsConfig_Award.click;
                    _this.btnSign.touchEnabled = true;
                    _this.imgOrn.visible = true;
                    zj.Set.ButtonBackgroud(_this.btnSign, "ui_acitivity_signin_rili2_png", "ui_acitivity_signin_rili2_png");
                    _this.lbDay.textColor = 0xffffff;
                }
                else {
                    zj.Set.ButtonBackgroud(_this.btnSign, "ui_acitivity_signin_rili1_png", "ui_acitivity_signin_rili1_png");
                    _this.imgOrn.visible = false;
                    _this.lbDay.textColor = 0x228935;
                }
                _this.lbDay.textFlow = zj.Util.RichText(str);
                var bSign = (_this.day <= zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.sign_time);
                _this.imgShadow.visible = bSign;
                _this.imgHook.visible = bSign;
                zj.setCache(_this.cacheGroup);
            };
            _this.skinName = "resource/skins/award/AwardSignItemSkin.exml";
            zj.cachekeys(zj.UIResource["AwardSignItem"], null);
            _this.btnSign.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSign, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            return _this;
        }
        AwardSignItem.prototype.dataChanged = function () {
            this.groupClip.removeChildren();
            this.day = this.data;
            this.refreshInfo();
        };
        AwardSignItem.prototype.onShowGoodProperty = function (e) {
            if (this.btnSign.touchEnabled) {
                this.onBtnSign();
                return;
            }
            var info = zj.ServerTableSign.Item(this.data);
            var goodsInfo = new message.GoodsInfo();
            goodsInfo.goodsId = info.good_id;
            goodsInfo.count = info.good_count;
            goodsInfo.showType = info.show_type;
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        AwardSignItem.prototype.onBtnSign = function () {
            var _this = this;
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.is_signToday)
                return;
            zj.Game.PlayerSignSystem.sign().then(function (msg) {
                zj.Tips.SetTipsOfId(zj.Tips.TAG.AWARD, zj.Tips.TAG.AWARD_SIGN);
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    dialog.show();
                    dialog.init(msg.gameInfo.getGoods);
                    dialog.setCB(_this.refreshInfo);
                });
                zj.Game.EventManager.event(zj.GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE);
            });
        };
        return AwardSignItem;
    }(eui.ItemRenderer));
    zj.AwardSignItem = AwardSignItem;
    __reflect(AwardSignItem.prototype, "zj.AwardSignItem");
})(zj || (zj = {}));
//# sourceMappingURL=AwardSingItem.js.map
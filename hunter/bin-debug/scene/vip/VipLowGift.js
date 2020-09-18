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
    //VIP礼包
    //yuqingchao
    //2019.04.12
    var VipLowGift = (function (_super) {
        __extends(VipLowGift, _super);
        function VipLowGift() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.moveLocation = 0; //列表下拉移动位置
            _this.skinName = "resource/skins/vip/VipLowGiftSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.up, _this);
            _this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGo, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            return _this;
            // this.init();
        }
        VipLowGift.prototype.init = function (vipID) {
            var _this = this;
            this.index = 0;
            if (vipID != null) {
                this.moveLocation = vipID;
            }
            zj.Game.DragonBonesManager.playAnimation(this, "stars", "armatureName", null, 0)
                .then(function (display) {
                display.x = _this.groupAni.width / 2;
                display.y = _this.groupAni.height;
                display.scaleX = 1.1;
                display.scaleY = 1.1;
                _this.groupAni.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            zj.Game.DragonBonesManager.playAnimation(this, "viprole", "armatureName", null, 0)
                .then(function (display) {
                display.x = _this.groupAni.width / 2;
                display.y = _this.groupAni.height;
                display.scaleX = 1.1;
                display.scaleY = 1.1;
                _this.groupAni.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            // this.imgBackground.cacheAsBitmap = true;
            this.setLevelGiftInfo();
        };
        VipLowGift.prototype.load = function (i) {
            this.index = i + 1;
            this.setLevelGiftInfo();
        };
        VipLowGift.prototype.setLevelGiftInfo = function () {
            var _this = this;
            zj.closeCache(this.groupImg);
            var giftTbl = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.LowVipWeal + ".json"); //读表
            this.arrayCollection = new eui.ArrayCollection();
            for (var i = 0; i < Object.keys(giftTbl).length; i++) {
                this.arrayCollection.addItem({
                    i: i,
                    info: giftTbl[i],
                    father: this,
                });
            }
            ;
            this.lstView.dataProvider = this.arrayCollection;
            this.lstView.itemRenderer = zj.VipLowGiftItem;
            setTimeout(function () {
                _this.scrollerInfo.viewport = _this.lstView;
                _this.scrollerInfo.viewport.scrollV = _this.moveLocation;
                _this.scrollerInfo.validateNow();
            }, 200);
            this.imgVipLevel.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.low_vip_title_new[zj.Game.PlayerInfoSystem.VipLevel], this);
            zj.setCache(this.groupImg);
        };
        VipLowGift.prototype.onBtnGo = function () {
            var _this = this;
            zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
            zj.loadUI(zj.VipLow)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.CB(function () {
                    zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
                });
                dialog.init();
            });
        };
        /**抬起时将按钮缩回去 */ /**抬起移除奖励详情界面 */
        VipLowGift.prototype.up = function () {
            var show = this.getChildByName("UI");
            if (show) {
                this.removeChild(show);
            }
        };
        /**奖励详情 */
        VipLowGift.prototype.awardParticulars = function (xy, cx, cy, info) {
            var show = this.getChildByName("UI");
            if (show) {
                return;
            }
            var commonDesSkill = zj.TipManager.ShowProp(info, this, xy, cx, cy);
            this.addChild(commonDesSkill);
            commonDesSkill.name = "UI";
        };
        //点击移除
        VipLowGift.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        VipLowGift.prototype.showGoodsProperty = function (ev) {
            if (zj.Game.UIManager.dialogCount() > 1)
                return;
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        VipLowGift.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return VipLowGift;
    }(zj.Scene));
    zj.VipLowGift = VipLowGift;
    __reflect(VipLowGift.prototype, "zj.VipLowGift");
})(zj || (zj = {}));
//# sourceMappingURL=VipLowGift.js.map
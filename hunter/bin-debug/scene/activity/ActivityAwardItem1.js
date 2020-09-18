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
    //ActivityAwardItem1
    //yuqingchao
    var ActivityAwardItem1 = (function (_super) {
        __extends(ActivityAwardItem1, _super);
        function ActivityAwardItem1() {
            var _this = _super.call(this) || this;
            _this.displayAnimatoin = null; // 添加龙骨动画
            _this.skinName = "resource/skins/activity/ActivityAwardItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityAwardItem1"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchTap, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.main = null;
                var displayAnimatoin = _this.displayAnimatoin;
                _this.displayAnimatoin = null;
                if (displayAnimatoin && displayAnimatoin.parent) {
                    displayAnimatoin.parent.removeChild(displayAnimatoin);
                }
            }, null);
            return _this;
        }
        ActivityAwardItem1.prototype.init = function () {
            this.imgFrame.visible = true;
            this.imgIcon.visible = true;
        };
        ActivityAwardItem1.prototype.dataChanged = function () {
            zj.closeCache(this.groupCache);
            this.init();
            if (this.data == null)
                return;
            this.info = this.data.info;
            this.i = this.data.i;
            this.j = this.data.j;
            this.main = this.data.main;
            this.imgFrame.source = zj.cachekey(zj.PlayerItemSystem.Set(this.info.goodsId, this.info.showType, this.info.count).Frame, this);
            this.imgIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.info.goodsId), this);
            if (Number(this.info.count) >= 10000) {
                this.lbNum.text = "x" + (Number(this.info.count) / 10000) + "万";
            }
            else {
                this.lbNum.text = "x" + this.info.count;
            }
            this.imgLogo.visible = false;
            if (this.info.goodsId == 20001) {
                this.groupClip.removeChildren();
                this.displayAnimatoin = null;
            }
            else {
                this.groupClip.removeChildren();
                this.displayAnimatoin = null;
                this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupClip);
            }
            zj.setCache(this.groupCache);
        };
        //添加龙骨动画
        ActivityAwardItem1.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            var _this = this;
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2 + 1;
                display.y = group.explicitHeight / 2;
                group.addChild(display);
                display.scaleX = 0.8;
                display.scaleY = 0.8;
                _this.displayAnimatoin = display;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        ActivityAwardItem1.prototype.touchTap = function (e) {
            var _this = this;
            if (this.info.goodsId == 195001 || this.info.goodsId == 195002) {
                zj.loadUI(zj.ActivityPotato)
                    .then(function (dialog) {
                    dialog.init(_this.info.goodsId, _this);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else {
                this.onChooseItemTap(e);
            }
        };
        // 鼠标点击 掉落 材料说明
        ActivityAwardItem1.prototype.onChooseItemTap = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.data.info, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return ActivityAwardItem1;
    }(eui.ItemRenderer));
    zj.ActivityAwardItem1 = ActivityAwardItem1;
    __reflect(ActivityAwardItem1.prototype, "zj.ActivityAwardItem1");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityAwardItem1.js.map
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
    //
    //	yuqingchao
    // 
    var ActivityAwardItem = (function (_super) {
        __extends(ActivityAwardItem, _super);
        function ActivityAwardItem() {
            var _this = _super.call(this) || this;
            _this.displayAnimatoin = null; // 添加龙骨动画
            _this.skinName = "resource/skins/activity/ActivityAwardItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityAwardItem"], null);
            // this.groupClip.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.data = null;
                var displayAnimatoin = _this.displayAnimatoin;
                _this.displayAnimatoin = null;
                if (displayAnimatoin && displayAnimatoin.parent) {
                    displayAnimatoin.parent.removeChild(displayAnimatoin);
                }
            }, null);
            // 遮罩
            _this.rectMask = new eui.Rect(79, 83, 0x000000);
            _this.rectMask.horizontalCenter = 0;
            _this.rectMask.verticalCenter = -2;
            _this.groupItem.addChild(_this.rectMask);
            return _this;
        }
        ActivityAwardItem.prototype.init = function () {
            this.groupClip.visible = true;
            this.groupItem.visible = true;
            this.imgIcon.visible = true;
            this.imgFrame.visible = true;
            this.imgLogo.visible = true;
            this.imgLogo.visible = false;
        };
        ActivityAwardItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupCache);
            if (this.data == null)
                return;
            this.info = this.data.info;
            this.imgFrame.source = zj.cachekey(zj.PlayerItemSystem.Set(this.info.goodsId, this.info.showType, this.info.count).Frame, this);
            this.imgIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.info.goodsId), this);
            this.lbNum.text = "x" + this.info.count;
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
            // 遮罩
            this.imgIcon.mask = this.rectMask;
            this.init();
            zj.setCache(this.groupCache);
        };
        ActivityAwardItem.prototype.touchBegin = function (e) {
            if (this.data.main != null) {
                // this.onChooseItemTap(e);
            }
            else {
                var info = new message.GoodsInfo();
                info.goodsId = this.info.goodsId;
                info.count = this.info.count;
                zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: info, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
            }
        };
        //添加龙骨动画
        ActivityAwardItem.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
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
        ActivityAwardItem.prototype.onShowGoodProperty = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.data.info, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        // 鼠标点击 掉落 材料说明
        ActivityAwardItem.prototype.onChooseItemTap = function (e) {
            var info = new message.GoodsInfo();
            info.goodsId = this.info.goodsId;
            info.count = this.info.count;
            this.data.main.awardParticulars(e.localY * 0.75, e.stageX, e.stageY, info);
        };
        return ActivityAwardItem;
    }(eui.ItemRenderer));
    zj.ActivityAwardItem = ActivityAwardItem;
    __reflect(ActivityAwardItem.prototype, "zj.ActivityAwardItem");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityAwardItem.js.map
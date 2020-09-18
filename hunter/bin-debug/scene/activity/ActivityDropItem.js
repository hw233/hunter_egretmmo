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
    //ActivityDropItem
    //yuqingchao
    //2018.04.23
    var ActivityDropItem = (function (_super) {
        __extends(ActivityDropItem, _super);
        function ActivityDropItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityDropItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityDropItem"], null);
            _this.groupDown.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onChooseItemTap, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            return _this;
        }
        ActivityDropItem.prototype.dataChanged = function () {
            var _this = this;
            this.info = this.data.info;
            this.father = this.data.father;
            var itemSet = zj.PlayerItemSystem.Set(this.info.goodId, 1, 0);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(itemSet.Clip, this);
            var allNum = this.info.dailyNum;
            var todayNum = 0;
            var goods = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.collect_goods;
            var self = this;
            var todayInfo = zj.Table.FindR(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.collect_goods, function (_k, _v) {
                return _v.key == _this.info.goodId;
            })[0];
            if (todayInfo != null) {
                todayNum = todayInfo.value;
            }
            this.lbItemName.text = (todayNum + "/" + allNum).toString();
            this.groupDown.removeChildren();
            this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupDown);
        };
        //添加龙骨动画
        ActivityDropItem.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2 + 1;
                display.y = group.explicitHeight / 2;
                group.addChild(display);
                display.scaleX = 0.8;
                display.scaleY = 0.8;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        // 鼠标点击 掉落 材料说明
        ActivityDropItem.prototype.onChooseItemTap = function () {
            var _this = this;
            var type = zj.PlayerItemSystem.ItemType(this.info.goodId);
            var itemY;
            var count = 0;
            count = 1;
            var dialog = this.getChildByName("Item-skill-common");
            if (dialog)
                this.removeChild(dialog);
            if (type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                zj.loadUI(zj.Common_DesRandom).then(function (dialog) {
                    dialog.x = _this.father.width / 6;
                    dialog.y = _this.father.height / 7;
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(_this.info.goodId, _this.info.count);
                    _this.father.addChild(dialog);
                });
            }
            else if (type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                    dialog.x = _this.father.width / 6;
                    dialog.y = _this.father.height / 7;
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(_this.info.goodId, _this.info.count);
                    _this.father.addChild(dialog);
                });
            }
            else if (type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                zj.loadUI(zj.CommonDesGeneral).then(function (dialog) {
                    dialog.x = _this.father.width / 6;
                    dialog.y = _this.father.height / 7;
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(_this.info.goodId, count);
                    _this.father.addChild(dialog);
                });
            }
            else {
                zj.loadUI(zj.CommonDesProp).then(function (dialog) {
                    dialog.x = _this.father.width / 6;
                    dialog.y = _this.father.height / 7;
                    dialog.name = "Item-skill-common";
                    dialog.init(_this.info.goodId, _this.info.count);
                    _this.father.addChild(dialog);
                });
            }
        };
        return ActivityDropItem;
    }(eui.ItemRenderer));
    zj.ActivityDropItem = ActivityDropItem;
    __reflect(ActivityDropItem.prototype, "zj.ActivityDropItem");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityDropItem.js.map
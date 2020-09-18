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
    //ZorkBossMainAwardItem
    //yuqingchao
    var ZorkBossMainAwardItem = (function (_super) {
        __extends(ZorkBossMainAwardItem, _super);
        function ZorkBossMainAwardItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/zork/ZorkBossMainAwardItemSkin.exml";
            zj.cachekeys(zj.UIResource["ZorkBossMainAwardItem"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBegin, _this);
            return _this;
        }
        ZorkBossMainAwardItem.prototype.touchBegin = function (e) {
            this.onChooseItemTap(this.data, e);
        };
        ZorkBossMainAwardItem.prototype.dataChanged = function () {
            this.info = this.data.info;
            this.boold = this.data.boold;
            var itemSet = zj.PlayerItemSystem.Set(this.info.goodsId, this.info.showType, this.info.count);
            this.imgIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.info.goodsId), this);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.lbNum.text = this.info.count;
            if (this.boold) {
                this.groupAni.removeChildren();
            }
            else {
                this.groupAni.removeChildren();
                this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupAni);
            }
        };
        // 鼠标点击 掉落 材料说明
        ZorkBossMainAwardItem.prototype.onChooseItemTap = function (data, e) {
            var _this = this;
            var num = data.info.count;
            var reward = data.info.goodsId;
            var type = zj.PlayerItemSystem.ItemType(reward);
            var index = data.i;
            var itemY;
            var count = 0;
            if (e.stageY >= data.father.height / 2) {
                itemY = e.stageY - e.localY;
                count = 1;
            }
            else {
                itemY = e.stageY + this.skin.height - e.localY;
            }
            var dialog = this.getChildByName("Item-skill-common");
            if (dialog)
                this.removeChild(dialog);
            if (type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                zj.loadUI(zj.Common_DesRandom).then(function (dialog) {
                    dialog.x = _this.data.father.width / 2 + index * 40;
                    if (count == 1) {
                        dialog.y = itemY - dialog.height;
                    }
                    else
                        dialog.y = itemY;
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(reward, num);
                    data.father.addChild(dialog);
                });
            }
            else if (type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                    dialog.x = _this.data.father.width / 2 + index * 40;
                    if (count == 1) {
                        dialog.y = itemY - dialog.height;
                    }
                    else
                        dialog.y = itemY;
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(reward, num);
                    data.father.addChild(dialog);
                });
            }
            else {
                zj.loadUI(zj.CommonDesProp).then(function (dialog) {
                    if (index == "2") {
                        dialog.x = _this.data.father.width / 2 + index * 140 - dialog.width;
                        dialog.y = itemY - dialog.height * 0.5;
                    }
                    else {
                        var wid = _this.data.father.width / 2;
                        dialog.x = _this.data.father.width / 2 + index * 80;
                        if (count == 1) {
                            dialog.y = itemY - dialog.height;
                        }
                        else
                            dialog.y = itemY;
                    }
                    dialog.name = "Item-skill-common";
                    dialog.init(reward, num);
                    data.father.addChild(dialog);
                });
            }
        };
        //添加龙骨动画
        ZorkBossMainAwardItem.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
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
        return ZorkBossMainAwardItem;
    }(eui.ItemRenderer));
    zj.ZorkBossMainAwardItem = ZorkBossMainAwardItem;
    __reflect(ZorkBossMainAwardItem.prototype, "zj.ZorkBossMainAwardItem");
})(zj || (zj = {}));
//# sourceMappingURL=ZorkBossMainAwardItem.js.map
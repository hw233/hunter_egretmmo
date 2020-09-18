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
    //HXH_FirstChargeMainItemNew
    //wangshenzhuo
    // 2019/03/30
    var HXH_FirstChargeMainItemNew = (function (_super) {
        __extends(HXH_FirstChargeMainItemNew, _super);
        function HXH_FirstChargeMainItemNew() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/firstCharge/HXH_FirstChargeMainItemNewSkin.exml";
            zj.cachekeys(zj.UIResource["HXH_FirstChargeMainItemNew"], null);
            _this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.data.father.onDropInfoItemTap(true, _this.data);
            }, _this);
            _this.groupMain.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                _this.data.father.onDropInfoItemTap(false, _this.data);
            }, _this);
            return _this;
        }
        HXH_FirstChargeMainItemNew.prototype.dataChanged = function () {
            this.goodsId = this.data.info.reward_goods[this.data.index];
            this.count = this.data.info.reward_count[this.data.index];
            this.showType = this.data.info.show_type[this.data.index];
            var itemSet = zj.PlayerItemSystem.Set(this.goodsId, this.showType, this.count);
            this.itemSet = itemSet;
            this.labelNum.text = this.count;
            this.imageIcon.source = zj.cachekey(itemSet.Clip, this);
            var type = zj.PlayerItemSystem.ItemType(this.goodsId);
            if (type == message.EGoodsType.GOODS_TYPE_FASHION) {
                this.imgpifu.visible = true;
            }
            else {
                this.imgpifu.visible = false;
            }
            this.groupSence.removeChildren();
            if (this.data.itemindex == 0 || this.data.itemindex == 1) {
                if (this.data.index >= 3) {
                    return;
                }
                else {
                    this.addAnimatoin("shouchong_liuguang", "000_liuguang", 0, this.groupSence);
                    this.addAnimatoin2("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupSence);
                }
            }
            else {
                this.addAnimatoin("shouchong_liuguang", "000_liuguang", 0, this.groupSence);
                this.addAnimatoin2("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupSence);
            }
        };
        //添加龙骨动画
        HXH_FirstChargeMainItemNew.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                display.y = group.explicitHeight / 2;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        //添加龙骨动画
        HXH_FirstChargeMainItemNew.prototype.addAnimatoin2 = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                display.y = group.explicitHeight / 2;
                display.scaleX = 0.75;
                display.scaleY = 0.75;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        return HXH_FirstChargeMainItemNew;
    }(eui.ItemRenderer));
    zj.HXH_FirstChargeMainItemNew = HXH_FirstChargeMainItemNew;
    __reflect(HXH_FirstChargeMainItemNew.prototype, "zj.HXH_FirstChargeMainItemNew");
    //子项数据源
    var HXH_FirstChargeMainItemNewData = (function () {
        function HXH_FirstChargeMainItemNewData() {
        }
        return HXH_FirstChargeMainItemNewData;
    }());
    zj.HXH_FirstChargeMainItemNewData = HXH_FirstChargeMainItemNewData;
    __reflect(HXH_FirstChargeMainItemNewData.prototype, "zj.HXH_FirstChargeMainItemNewData");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_FirstChargeMainItemNew.js.map
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
     * @date 2019-3-25
     *
     * @class 新手狂欢奖励list子项
     */
    var ActivityNoviceItemItem = (function (_super) {
        __extends(ActivityNoviceItemItem, _super);
        function ActivityNoviceItemItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityNoviceItemItemSkin.exml";
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBegin, _this);
            zj.cachekeys(zj.UIResource["ActivityNoviceItemItem"], null);
            return _this;
        }
        ActivityNoviceItemItem.prototype.dataChanged = function () {
            var _this = this;
            var data = this.data;
            var itemSet = zj.PlayerItemSystem.Set(data.itemInfo[0]);
            var count = data.itemInfo[1];
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(itemSet.Clip, this);
            this.lableLevel.text = "x" + zj.Set.NumberUnit2(count);
            this.groupStrar.visible = false;
            this.imgIconGrade.visible = false;
            if (data.itemInfo[0] == 10074 || data.itemInfo[0] == 10057 || data.itemInfo[0] == 10058 || data.itemInfo[0] == 10059) {
                var info = zj.TableBaseGeneral.Item(data.itemInfo[0]);
                zj.Helper.SetHeroAwakenStar(this.groupStrar, info.init_star, 1);
                this.imgIconGrade.visible = true;
                this.lableLevel.text = "Lv " + 1;
                this.imgIconGrade.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_grade[zj.PlayerHunterSystem.Table(data.itemInfo[0]).aptitude], this);
            }
            if (data.itemInfo[0] == 100076) {
                zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0)
                    .then(function (display) {
                    display.width = _this.width;
                    display.height = _this.height;
                    display.x = _this.width / 2;
                    display.y = _this.height / 2;
                    display.name = "ui_tongyong_daojuguang";
                    _this.addChild(display);
                })
                    .catch(function (reason) {
                    zj.toast(reason);
                });
            }
            else {
                var a = this.getChildByName("ui_tongyong_daojuguang");
                if (a) {
                    this.removeChild(a);
                }
            }
        };
        ActivityNoviceItemItem.prototype.touchBegin = function (e) {
            var data = this.data;
            var info = new message.GoodsInfo();
            info.goodsId = data.itemInfo[0];
            info.count = data.itemInfo[1];
            data.father.data.father.awardParticulars(e.localY * 0.75, e.stageX, e.stageY, info);
        };
        return ActivityNoviceItemItem;
    }(eui.ItemRenderer));
    zj.ActivityNoviceItemItem = ActivityNoviceItemItem;
    __reflect(ActivityNoviceItemItem.prototype, "zj.ActivityNoviceItemItem");
    var ActivityNoviceItemItemData = (function () {
        function ActivityNoviceItemItemData() {
        }
        return ActivityNoviceItemItemData;
    }());
    zj.ActivityNoviceItemItemData = ActivityNoviceItemItemData;
    __reflect(ActivityNoviceItemItemData.prototype, "zj.ActivityNoviceItemItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityNoviceItemItem.js.map
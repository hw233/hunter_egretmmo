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
    /**猎人合成
     *
     *邢利伟
     *
     *2018.12.19
     */
    var HunterCompoundItem = (function (_super) {
        __extends(HunterCompoundItem, _super);
        function HunterCompoundItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterCompoundItemSkin.exml";
            _this.imgRedDot.visible = false;
            zj.cachekeys(zj.UIResource["HunterCompoundItem"], null);
            return _this;
        }
        /**数据源刷新被动执行 */
        HunterCompoundItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupAll);
            this.updateViews(this.data);
            this.setInfoTipe(this.data);
            zj.setCache(this.groupAll);
        };
        /**更新视图 */
        HunterCompoundItem.prototype.updateViews = function (data) {
            if (data.info.compose_id == 0) {
                this.groupAll.visible = false;
                return;
            }
            var pathHead = zj.PlayerHunterSystem.Head(data.info.compose_id);
            var pathAptitude = zj.UIConfig.UIConfig_General.hunter_grade[zj.PlayerHunterSystem.Table(data.info.compose_id).aptitude];
            var star = zj.PlayerHunterSystem.Table(data.info.compose_id).init_star;
            this.imgIcon.source = zj.cachekey(pathHead, this);
            this.labelLevel.text = "1";
            zj.Helper.SetHeroAwakenStar(this.groupStar, star, 0);
            this.imgGrade.source = zj.cachekey(pathAptitude, this);
            this.imgFrame.source = zj.cachekey(zj.PlayerHunterSystem.GetGeneralFrame(data.info.compose_id), this);
            if (data.isSelected) {
                this.playAni();
            }
            else {
                this.groupAni.removeChildren();
                // let obj = this.groupAni.getChildByName("dzGF");
                // if (obj) {
                //     this.groupAni.removeChild(obj);
                // }
            }
        };
        HunterCompoundItem.prototype.setInfoTipe = function (data) {
            if (data.info.compose_id == 0) {
                this.imgRedDot.visible = false;
                return;
            }
            var bTips = zj.PlayerHunterSystem.IndexTips(data.index);
            this.imgRedDot.visible = bTips;
        };
        /**选中框*/
        HunterCompoundItem.prototype.playAni = function () {
            var group = this.groupAni;
            var obj = group.getChildByName("dzGF");
            if (!obj) {
                zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0)
                    .then(function (display) {
                    display.x = group.width / 2 - 1;
                    display.y = group.height / 2 - 2;
                    display.name = "dzGF";
                    group.addChild(display);
                })
                    .catch(function (reason) {
                    zj.toast(reason);
                });
            }
        };
        return HunterCompoundItem;
    }(eui.ItemRenderer));
    zj.HunterCompoundItem = HunterCompoundItem;
    __reflect(HunterCompoundItem.prototype, "zj.HunterCompoundItem");
    var HunterCompoundItemData = (function () {
        function HunterCompoundItemData() {
        }
        return HunterCompoundItemData;
    }());
    zj.HunterCompoundItemData = HunterCompoundItemData;
    __reflect(HunterCompoundItemData.prototype, "zj.HunterCompoundItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HunterCompoundItem.js.map
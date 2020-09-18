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
     * @class 猎人传记Hero Item
     *
     * @author LianLei
     *
     * @date 2019-10-24
     */
    var BiographyHeroItem = (function (_super) {
        __extends(BiographyHeroItem, _super);
        function BiographyHeroItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/biography/BiographyHeroItemSkin.exml";
            zj.cachekeys(zj.UIResource["BiographyHeroItem"], null);
            return _this;
        }
        BiographyHeroItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        BiographyHeroItem.prototype.updateView = function (data) {
            var bHaveHero = zj.Table.FindK(zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds(), data.info.general_id) != -1;
            this.imgGet.visible = bHaveHero;
            if (!bHaveHero) {
                zj.Helper.SetImageFilterColor(this.imgIcon, "gray");
            }
            else {
                zj.Helper.SetImageFilterColor(this.imgIcon);
            }
            this.imgIcon.source = zj.cachekey(data.info.head_path, this);
            this.imgQuality.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_grade[data.info.aptitude], this);
            if (this.selected) {
                // if (!this.groupAni.getChildByName("selAni")) {
                // 	this.addAnimation();
                // }
                this.imgSel.visible = true;
            }
            else {
                // let ani = this.groupAni.getChildByName("selAni");
                // if (ani) this.groupAni.removeChild(ani);
                this.imgSel.visible = false;
            }
        };
        BiographyHeroItem.prototype.addAnimation = function () {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0).then(function (display) {
                display.name = "selAni";
                _this.groupAni.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
        };
        return BiographyHeroItem;
    }(eui.ItemRenderer));
    zj.BiographyHeroItem = BiographyHeroItem;
    __reflect(BiographyHeroItem.prototype, "zj.BiographyHeroItem");
    var BiographyHeroItemData = (function () {
        function BiographyHeroItemData() {
        }
        return BiographyHeroItemData;
    }());
    zj.BiographyHeroItemData = BiographyHeroItemData;
    __reflect(BiographyHeroItemData.prototype, "zj.BiographyHeroItemData");
})(zj || (zj = {}));
//# sourceMappingURL=BiographyHeroItem.js.map
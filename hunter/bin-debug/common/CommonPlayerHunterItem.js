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
     * @author chen xi
     *
     * @date 2019-2-25
     *
     * @class 查看猎人详情子项
     */
    var CommonPlayerHunterItem = (function (_super) {
        __extends(CommonPlayerHunterItem, _super);
        function CommonPlayerHunterItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/CommonPlayerHunterItemSkin.exml";
            return _this;
        }
        CommonPlayerHunterItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        CommonPlayerHunterItem.prototype.updateView = function (data) {
            var framePath = zj.UIConfig.UIConfig_Role.heroFrame[data.info.step];
            var iconPath = zj.PlayerHunterSystem.Head(data.info.general_id);
            var baseHunterInfo = zj.PlayerHunterSystem.Table(data.info.general_id % zj.CommonConfig.general_id_to_index_multiple);
            var gradePath = zj.UIConfig.UIConfig_General.hunter_grade[baseHunterInfo.aptitude];
            this.imgFame.source = zj.cachekey(framePath, this);
            this.imgIcon.source = zj.cachekey(iconPath, this);
            this.imgIconGrade.source = zj.cachekey(gradePath, this);
            var breakPath = (data.info.break_level == 0) ? "" : zj.UIConfig.UIConfig_Hunter_break.breaklevelIcon[data.info.break_level - 1];
            zj.Helper.GetBreakLevelToPath(this.imgBreak, data.info.break_level);
            zj.Helper.SetHeroAwakenStar(this.groupStar, data.info.star, data.info.awakePassive.level);
            this.labelLevel.text = data.info.level.toString();
            if (data.isSelected) {
                this.playAni();
            }
            else {
                var obj = this.groupAni.getChildByName("dzGF");
                if (obj) {
                    this.groupAni.removeChild(obj);
                }
            }
        };
        CommonPlayerHunterItem.prototype.playAni = function () {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0)
                .then(function (display) {
                if (!_this.groupAni.getChildByName("dzGF")) {
                    display.x = display.width / 2;
                    display.y = display.height / 2 - 5;
                    display.name = "dzGF";
                    _this.groupAni.addChild(display);
                }
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        return CommonPlayerHunterItem;
    }(eui.ItemRenderer));
    zj.CommonPlayerHunterItem = CommonPlayerHunterItem;
    __reflect(CommonPlayerHunterItem.prototype, "zj.CommonPlayerHunterItem");
    var CommonPlayerHunterItemData = (function () {
        function CommonPlayerHunterItemData() {
            this.info = null;
            this.isSelected = false;
        }
        return CommonPlayerHunterItemData;
    }());
    zj.CommonPlayerHunterItemData = CommonPlayerHunterItemData;
    __reflect(CommonPlayerHunterItemData.prototype, "zj.CommonPlayerHunterItemData");
})(zj || (zj = {}));
//# sourceMappingURL=CommonPlayerHunterItem.js.map
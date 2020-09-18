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
     * @author chen xi.
     *
     * @date 2019-1-28
     *
     * @class 本服格斗场防守阵容List子项
     */
    var ArenaMainDefendItem = (function (_super) {
        __extends(ArenaMainDefendItem, _super);
        function ArenaMainDefendItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/arena/ArenaMainDefendItemSkin.exml";
            zj.cachekeys(zj.UIResource["ArenaMainDefendItem"], null);
            return _this;
        }
        ArenaMainDefendItem.prototype.dataChanged = function () {
            if (this.data.isEmpty == true) {
                this.updataView(this.data);
            }
            else {
                this.setEmptyInfo(this.data);
            }
        };
        ArenaMainDefendItem.prototype.updataView = function (data) {
            var generalInfo = zj.Game.PlayerHunterSystem.allHuntersMap()[data.generalId];
            var headPath = zj.PlayerHunterSystem.Head(data.generalId);
            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame) {
                this.imgHead.source = zj.cachekey("wx_" + headPath, this);
            }
            else {
                this.imgHead.source = zj.cachekey(headPath, this);
            }
            this.imgFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[generalInfo.step], this);
            this.labelLevel.text = generalInfo.level.toString();
            var awakeLevel = generalInfo.awakePassive.level;
            zj.Helper.SetHeroAwakenStar(this.groupStar, generalInfo.star, awakeLevel);
            if (data.isMain == true) {
            }
            else {
                this.scaleX = 0.8;
                this.scaleY = 0.8;
            }
        };
        ArenaMainDefendItem.prototype.setEmptyInfo = function (data) {
            this.imgFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[0], this);
            this.imgHead.visible = false;
            this.labelLevel.visible = false;
            this.groupStar.visible = false;
            if (data.isMain == true) {
                // this.
                zj.UIConfig.UIConfig_Role.inFormationIcon;
            }
            else {
                this.scaleX = 0.8;
                this.scaleY = 0.8;
            }
        };
        return ArenaMainDefendItem;
    }(eui.ItemRenderer));
    zj.ArenaMainDefendItem = ArenaMainDefendItem;
    __reflect(ArenaMainDefendItem.prototype, "zj.ArenaMainDefendItem");
    var ArenaMainDefendItemData = (function () {
        function ArenaMainDefendItemData() {
            this.isEmpty = false;
            this.isMain = false;
            this.generalId = null;
        }
        return ArenaMainDefendItemData;
    }());
    zj.ArenaMainDefendItemData = ArenaMainDefendItemData;
    __reflect(ArenaMainDefendItemData.prototype, "zj.ArenaMainDefendItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaMainDefendItem.js.map
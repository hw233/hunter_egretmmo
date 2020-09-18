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
     * @date 2018-11-30
     *
     * @class 猎人出售界面Item
     */
    var HunterStorageItem = (function (_super) {
        __extends(HunterStorageItem, _super);
        function HunterStorageItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterStorageItemSkin.exml";
            return _this;
            // this.groupMain.cacheAsBitmap = true;
        }
        HunterStorageItem.prototype.onLongPress = function (data) {
            if (data.isLongPress == false) {
                return;
            }
            this.isInLongPress = true;
            if (zj.Game.PlayerHunterSystem.huntervis == true) {
                zj.Game.PlayerHunterSystem.huntervis = false;
                zj.loadUI(zj.Common_ViewHeroDetail)
                    .then(function (dialog) {
                    dialog.setInfo(data.generalId, function () {
                        zj.Game.PlayerHunterSystem.huntervis = true;
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        HunterStorageItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupMain);
            this.updateView(this.data);
            zj.setCache(this.groupMain);
        };
        HunterStorageItem.prototype.updateView = function (data) {
            var generalId = data.generalId;
            var isFixCount = (data == null || generalId == null || generalId == 0);
            this.spriteLock.visible = false;
            this.spriteBreak.visible = false;
            this.nodeBingo.visible = false;
            this.spriteFrame.visible = !isFixCount;
            this.spriteIcon.visible = !isFixCount;
            this.nodeStar.visible = !isFixCount;
            this.spriteGrade.visible = !isFixCount;
            this.labelLevel.visible = !isFixCount;
            if (isFixCount) {
                return;
            }
            var frame_path = zj.PlayerHunterSystem.Frame(generalId);
            var head_path = zj.PlayerHunterSystem.Head(generalId);
            var aptitude_path = zj.UIConfig.UIConfig_General.hunter_grade[zj.PlayerHunterSystem.Table(generalId).aptitude];
            this.spriteFrame.source = zj.cachekey(frame_path, this);
            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                this.spriteIcon.source = zj.cachekey("wx_" + head_path, this);
            }
            else {
                this.spriteIcon.source = zj.cachekey(head_path, this);
            }
            this.spriteGrade.source = zj.cachekey(aptitude_path, this);
            var general = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            this.labelLevel.text = String(general.level);
            zj.Helper.SetHeroAwakenStar(this.nodeStar, general.star, general.awakePassive.level);
            zj.Helper.GetBreakLevelToPath(this.spriteBreak, general.break_level);
            this.nodeBingo.visible = data.isSelected;
        };
        // 恢复按钮状态
        HunterStorageItem.prototype.resumeLongPressState = function () {
            this.isInLongPress = false;
        };
        return HunterStorageItem;
    }(zj.HunterBaseItem));
    zj.HunterStorageItem = HunterStorageItem;
    __reflect(HunterStorageItem.prototype, "zj.HunterStorageItem");
})(zj || (zj = {}));
//# sourceMappingURL=HunterStorageItem.js.map
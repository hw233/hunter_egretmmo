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
     * @augments chen xi
     *
     * @date 2018-11-27
     *
     * @class  猎人出售Item
     */
    var HunterHeroSellItem = (function (_super) {
        __extends(HunterHeroSellItem, _super);
        function HunterHeroSellItem() {
            var _this = _super.call(this) || this;
            _this.CurState = {
                Select: 1,
                Empty: 2,
                NoSelect: 3,
                Defence: 4,
            };
            _this.type = _this.CurState.Empty;
            _this.defenceType = 0;
            _this.long = false;
            _this.sel = false;
            _this.skinName = "resource/skins/hunter/HunterHeroSellItemSkin.exml";
            zj.cachekeys(zj.UIResource["HunterHeroSellItem"], null);
            return _this;
            // this.groupMian.cacheAsBitmap = true;
        }
        HunterHeroSellItem.prototype.onLongPress = function (data) {
            if (data.isLongPress == false) {
                return;
            }
            if (data.generalId == 0 || data.generalId == null) {
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
        // 恢复按钮状态
        HunterHeroSellItem.prototype.resumeLongPressState = function () {
            this.isInLongPress = false;
        };
        HunterHeroSellItem.prototype.updateView = function (data) {
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
            if (isFixCount)
                return;
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
            // if (data.isLongPress) {
            //     this.nodeBingo.visible = data.isSelected;
            // } else {
            //     this.nodeBingo.visible = false;
            // }
            this.setInfoItem(data);
        };
        HunterHeroSellItem.prototype.ButtonClick = function () {
            if (this.long) {
                this.long = false;
                return;
            }
            if (this.type == this.CurState.Defence) {
                var str = zj.TextsConfig.TextsConfig_Hunter.sell_defence_general;
                if (this.defenceType == 1) {
                    str = zj.TextsConfig.TextsConfig_Hunter.sell_defence_general1;
                }
                else if (this.defenceType == 2) {
                    str = zj.TextsConfig.TextsConfig_Hunter.sell_defence_general2;
                }
                else if (this.defenceType == 3) {
                    str = zj.TextsConfig.TextsConfig_Hunter.sell_defence_general3;
                }
                else if (this.defenceType == 4) {
                    str = zj.TextsConfig.TextsConfig_Hunter.sell_defence_general4;
                }
                zj.toast_warning(str);
                return true;
            }
            else if (this.type == this.CurState.Empty) {
                return false;
            }
            else if (this.type == this.CurState.NoSelect) {
                var sellLast = zj.Game.PlayerHunterSystem.queryAllHunters().length > this.data.father.sellHunterArray.length + 1;
                var sellFull = this.data.father.sellHunterArray.length >= 16;
                if (sellFull) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter.sell_max);
                    this.nodeBingo.visible = this.sel;
                    this.spriteBingo.visible = this.sel;
                    return true;
                }
                else if (!sellLast) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter.sell_last_general);
                    this.nodeBingo.visible = this.sel;
                    this.spriteBingo.visible = this.sel;
                    return true;
                }
                else {
                    this.sel = true;
                    this.type = this.CurState.Select;
                    this.nodeBingo.visible = this.sel;
                    this.spriteBingo.visible = this.sel;
                    return false;
                }
            }
            else if (this.type == this.CurState.Select) {
                this.sel = false;
                this.type = this.CurState.NoSelect;
                this.nodeBingo.visible = this.sel;
                this.spriteBingo.visible = this.sel;
                return false;
            }
        };
        HunterHeroSellItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupMian);
            this.updateView(this.data);
            zj.setCache(this.groupMian);
        };
        HunterHeroSellItem.prototype.setInfoItem = function (data) {
            if (data.generalId == null || data.generalId == 0) {
                // this.
                return;
            }
            var bInSell = zj.Table.FindF(data.father.sellHunterArray, function (_k, _v) {
                return _v == data.generalId;
            });
            var _a = zj.Table.FindR(zj.PlayerHunterSystem.GeneralsIdInDefence(), function (_k, _v) {
                return _v[0] == data.generalId;
            }), bInDefencev = _a[0], bInDefencek = _a[1];
            if (data.generalId == null || data.generalId == 0) {
                this.type = this.CurState.Empty;
            }
            else if (data.isSelected) {
                this.type = this.CurState.Select;
            }
            else if (bInDefencek != null) {
                this.type = this.CurState.Defence;
                this.defenceType = bInDefencev[1];
            }
            else {
                this.type = this.CurState.NoSelect;
            }
            if (this.type == this.CurState.Select) {
                this.nodeBingo.visible = (true);
                this.spriteBingo.visible = (true);
                this.spriteShadow.visible = (true);
                this.spriteLock.visible = (false);
            }
            else if (this.type == this.CurState.Empty || this.type == this.CurState.NoSelect) {
                this.spriteLock.visible = (false);
                this.nodeBingo.visible = (false);
                this.spriteBingo.visible = (true);
                this.spriteShadow.visible = (true);
            }
            else if (this.type == this.CurState.Defence) {
                this.spriteLock.visible = (true);
                this.nodeBingo.visible = (true);
                this.spriteBingo.visible = (false);
                this.spriteShadow.visible = (true);
            }
        };
        return HunterHeroSellItem;
    }(zj.HunterBaseItem));
    zj.HunterHeroSellItem = HunterHeroSellItem;
    __reflect(HunterHeroSellItem.prototype, "zj.HunterHeroSellItem");
})(zj || (zj = {}));
//# sourceMappingURL=HunterHeroSellItem.js.map
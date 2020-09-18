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
     * @class 快速上阵Item
     *
     * @author LianLei
     *
     * 2019.05.29
     */
    var League_WarBattleLineupItem = (function (_super) {
        __extends(League_WarBattleLineupItem, _super);
        function League_WarBattleLineupItem() {
            var _this = _super.call(this) || this;
            _this.touchBeginTime = 0;
            _this.isInLongPress = false;
            _this.skinName = "resource/skins/wonderland/League_WarBattleLineupItemSkin.exml";
            zj.cachekeys(zj.UIResource["AwardSignItem"], null);
            _this.isInLongPress = false;
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                _this.touchTween();
                if (_this.data.generalInfo != null) {
                    if (_this.data.noTouch) {
                        zj.Game.EventManager.event(zj.GameEvent.MOUSE_BEGIN, { generalId: _this.data.generalInfo.id, index: -1 });
                    }
                    _this.isInLongPress = false;
                    _this.touchBeginTime = egret.setTimeout(_this.onLongPress, _this, 1000, _this.data); // 超时触发（长按）
                }
            }, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_MOVE, function () {
                egret.clearTimeout(_this.touchBeginTime); // 注销超时触发
                zj.Game.EventManager.event(zj.GameEvent.DELAY_EXECUTE, { isInLongPress: _this.isInLongPress });
            }, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                _this.clearTouchTween();
                egret.clearTimeout(_this.touchBeginTime);
            }, _this);
            _this.init();
            return _this;
        }
        League_WarBattleLineupItem.prototype.onLongPress = function () {
            this.isInLongPress = true;
            this.father.onBtnOk();
        };
        League_WarBattleLineupItem.prototype.init = function () {
            this.scaleType = {
                small: 0.8,
                middle: 1.1,
                big: 1.5,
            };
            this.dragType = zj.TableEnum.Enum.LeagueWarDragType.OFF;
            this.barSize = {
                width: this.imgBarHp.width,
                height: this.imgBarHp.height
            };
        };
        League_WarBattleLineupItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        League_WarBattleLineupItem.prototype.updateView = function (data) {
            this.father = data.father;
            if (data.itemType == zj.TableEnum.Enum.FastFormatItemType.LOCK) {
                this.groupName.visible = false;
                return;
            }
            else if (data.itemType == zj.TableEnum.Enum.FastFormatItemType.NORMAL) {
                this.groupName.visible = true;
            }
            else if (data.itemType == zj.TableEnum.Enum.FastFormatItemType.VOID) {
                this.groupName.visible = false;
                return;
            }
            var headPath = zj.PlayerHunterSystem.Head(data.generalInfo.id);
            this.imgHead.source = zj.cachekey(headPath, this);
            this.imgBoard.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[data.generalInfo.step], this);
            this.labelLevel.text = data.generalInfo.level.toString();
            if (data.index > 2) {
                this.imgType.source = zj.cachekey(zj.UIConfig.UIConfig_Role.inFormationIcon[1], this);
            }
            this.imgStar1.visible = false;
            var awakeLevel = zj.Game.PlayerHunterSystem.queryHunter(data.generalInfo.id).awakePassive.level;
            zj.Helper.SetHeroAwakenStar(this.groupStar, data.generalInfo.star, awakeLevel);
            zj.Helper.GetBreakLevelToPath(this.imgBreak, zj.Game.PlayerHunterSystem.queryHunter(data.generalInfo.id).break_level);
            this.imgDead.visible = (data.generalInfo.hp == 0);
            var size_bar = zj.getPercentSize(this.barSize, data.generalInfo.rage);
            size_bar = zj.getPercentSize(this.barSize, data.generalInfo.hp);
            this.imgBarHp.width = size_bar.width;
            this.imgGrade.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_grade[zj.Game.PlayerHunterSystem.Table(data.generalInfo.id).aptitude], this);
        };
        League_WarBattleLineupItem.prototype.SetDragType = function (type) {
            this.dragType = type;
            if (type == zj.TableEnum.Enum.LeagueWarDragType.ON) {
                egret.Tween.get(this.imgHead, { loop: true })
                    .to({ rotation: -5 }, 80, egret.Ease.sineOut)
                    .to({ rotation: 5 }, 80, egret.Ease.sineIn)
                    .to({ rotation: 5 }, 80, egret.Ease.sineOut)
                    .to({ rotation: -5 }, 80, egret.Ease.sineIn);
                this.imgHead.scaleX = this.scaleType.middle;
                this.imgHead.scaleY = this.scaleType.middle;
            }
            else {
                egret.Tween.removeTweens(this.imgHead);
                egret.Tween.get(this.imgHead).to({ rotation: 0, scaleX: 0.8, scaleY: 0.8 }, 80);
            }
        };
        League_WarBattleLineupItem.prototype.touchTween = function () {
            this.data.father.listHero.selectedIndex = this.data.index;
            if (this.data.generalInfo == null)
                return;
            egret.Tween.get(this.imgHead).to({ scaleX: 1.2, scaleY: 1.2 }, 700);
        };
        League_WarBattleLineupItem.prototype.clearTouchTween = function () {
            if (this.data.generalInfo == null)
                return;
            if (this.dragType == zj.TableEnum.Enum.LeagueWarDragType.ON) {
                this.imgHead.scaleX = this.scaleType.middle;
                this.imgHead.scaleY = this.scaleType.middle;
            }
            else {
                egret.Tween.removeTweens(this.imgHead);
                this.imgHead.scaleX = 0.8;
                this.imgHead.scaleY = 0.8;
            }
        };
        return League_WarBattleLineupItem;
    }(eui.ItemRenderer));
    zj.League_WarBattleLineupItem = League_WarBattleLineupItem;
    __reflect(League_WarBattleLineupItem.prototype, "zj.League_WarBattleLineupItem");
    var League_WarBattleLineupItemData = (function () {
        function League_WarBattleLineupItemData() {
            this.noTouch = true;
        }
        return League_WarBattleLineupItemData;
    }());
    zj.League_WarBattleLineupItemData = League_WarBattleLineupItemData;
    __reflect(League_WarBattleLineupItemData.prototype, "zj.League_WarBattleLineupItemData");
})(zj || (zj = {}));
//# sourceMappingURL=League_WarBattleLineupItem.js.map
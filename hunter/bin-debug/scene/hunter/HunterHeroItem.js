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
     * @author lilou
     *
     * @date 2018-11-14
     *
     * @class 猎人英雄Item
     */
    var HunterHeroItem = (function (_super) {
        __extends(HunterHeroItem, _super);
        function HunterHeroItem() {
            var _this = _super.call(this) || this;
            _this.progress = null;
            _this.skinName = "resource/skins/hunter/HunterHeroItemSkin.exml";
            var back = "ui_hunter_BoardBurHunterSoul_png";
            var progress = "ui_hunter_BurHunterSoulA_png";
            _this.progress = new ProgressBar(back, progress);
            // this.groupAll.cacheAsBitmap = true;
            _this.progress.left = 10;
            _this.progress.right = 10;
            _this.progress.bottom = 10;
            _this.progress.height = 20;
            _this.groupAll.addChild(_this.progress);
            zj.cachekeys(zj.UIResource["HunterHeroItem"], null);
            return _this;
        }
        HunterHeroItem.prototype.dataChanged = function () {
            var _this = this;
            zj.closeCache(this.groupAll);
            zj.Game.EventManager.on(zj.GameEvent.SET_HUNTER_ITEM, function (ev) {
                if (zj.PlayerHunterSystem.GetGeneralId(ev.data.generalId) == zj.PlayerHunterSystem.GetGeneralId(_this.data.generalId)) {
                    _this.dataChanged();
                }
            }, this);
            var itemData = this.data;
            if (itemData == null || itemData == undefined)
                return;
            var removeAnimation = function () {
                var obj = _this.groupAni.getChildByName("dzGF");
                if (obj) {
                    _this.groupAni.removeChild(obj);
                }
                var obj1 = _this.groupAni.getChildByName("000_zhaohuan");
                if (obj1)
                    _this.groupAni.removeChild(obj1);
            };
            if (itemData.type == 0 /* Hunter */) {
                if (itemData.generalId == null || itemData.generalId == 0) {
                    removeAnimation();
                    this.groupAll.visible = false;
                    return;
                }
            }
            else if (itemData.type == 1 /* Fragment */) {
                if (itemData.soulId == null || itemData.soulId == 0) {
                    removeAnimation();
                    this.groupAll.visible = false;
                    return;
                }
            }
            this.imgBg.visible = (itemData.type != 2 /* HeroBottom */);
            this.groupAll.visible = true;
            this.imgRedDot.visible = false;
            this.imgWait.visible = false;
            this.imgRecruit.visible = false;
            // 碎片隐藏
            this.groupStar.visible = (itemData.type != 1 /* Fragment */);
            this.labelLevel.visible = (itemData.type != 1 /* Fragment */);
            this.imgBreak.visible = (itemData.type != 1 /* Fragment */);
            this.imgIconGrade.visible = (itemData.type != 1 /* Fragment */);
            // 碎片显示
            this.progress.visible = (itemData.type == 1 /* Fragment */);
            if (itemData.type == 0 /* Hunter */) {
                this.setHunterInfo(itemData);
            }
            else if (itemData.type == 1 /* Fragment */) {
                this.setSoulInfo(itemData);
            }
            else if (itemData.type == 2 /* HeroBottom */) {
                this.setHunterInfo(itemData);
            }
            // add/remove selected animation
            if (itemData.isSelected) {
                this.playAni();
                console.log(this.data.generalId);
            }
            else {
                removeAnimation();
            }
            zj.setCache(this.groupAll);
        };
        HunterHeroItem.prototype.setHunterInfo = function (data) {
            if (data.generalId == 0 || data.generalId == null)
                return;
            if (zj.Game.PlayerFormationSystem.checkGeneralInFormat(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, data.generalId)) {
                this.imgRedDot.visible = zj.Tips.GetTipsOfHero(data.generalId) || zj.Tips.GetTipsOfHero(data.generalId, zj.Tips.TAG.GENERAL_UPLEVEL);
            }
            var hunter = zj.Game.PlayerHunterSystem.queryHunter(data.generalId);
            if (hunter == null)
                return;
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(data.generalId);
            var framePath = zj.PlayerHunterSystem.Frame(data.generalId);
            var headPath = zj.PlayerHunterSystem.Head(data.generalId);
            var gradePath = zj.UIConfig.UIConfig_General.hunter_grade[baseGeneralInfo.aptitude];
            this.imgFame.source = zj.cachekey(framePath, this);
            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                this.imgIcon.source = zj.cachekey("wx_" + headPath, this);
            }
            else {
                this.imgIcon.source = zj.cachekey(headPath, this);
            }
            zj.Helper.SetImageFilterColor(this.imgIcon);
            this.labelLevel.text = String(hunter.level);
            zj.Helper.SetHeroAwakenStar(this.groupStar, hunter.star, hunter.awakePassive.level);
            zj.Helper.GetBreakLevelToPath(this.imgBreak, hunter.break_level);
            this.imgIconGrade.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_grade[zj.Game.PlayerHunterSystem.Table(data.generalId).aptitude], this);
            // this.labelLevel.visible = (baseGeneralInfo.is_open != 0);
            // this.imgWait.visible = (baseGeneralInfo.is_open == 0);
        };
        HunterHeroItem.prototype.setSoulInfo = function (data) {
            var _this = this;
            if (data.soulId == 0 || data.soulId == null)
                return;
            var generalId = zj.PlayerHunterSystem.SoulIdFindGeneral(data.soulId).general_id;
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(generalId);
            var framePath = "ui_frame_FrameHunterAsh_png";
            var headPath = zj.PlayerHunterSystem.Head(generalId);
            this.imgFame.source = zj.cachekey(framePath, this);
            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame) {
                this.imgIcon.source = zj.cachekey("wx_" + headPath, this);
            }
            else {
                this.imgIcon.source = zj.cachekey(headPath, this);
            }
            var _a = zj.PlayerHunterSystem.SoulCount(data.soulId), count = _a[0], enough = _a[1], percent = _a[2];
            this.progress.setProgress(count, enough);
            var removeAnimation = function () {
                var obj = _this.groupAni.getChildByName("000_zhaohuan");
                if (obj)
                    _this.groupAni.removeChild(obj);
            };
            removeAnimation();
            var canEquip = (percent >= 1 && baseGeneralInfo.is_open == 1);
            this.imgRecruit.visible = canEquip;
            if (canEquip) {
                zj.Game.DragonBonesManager.playAnimation(this, "ui_lieren_kezhaohuan", null, "000_zhaohuan", 0)
                    .then(function (display) {
                    if (!_this.groupAni.getChildByName("000_zhaohuan")) {
                        display.name = "000_zhaohuan";
                        _this.groupAni.addChild(display);
                    }
                    else {
                        display.animation.stop();
                        display.animation.reset();
                        display.armature.dispose();
                        display.dbClear();
                        display.dispose(true);
                    }
                });
            }
            if (canEquip) {
                zj.Helper.SetImageFilterColor(this.imgIcon, null);
            }
            else {
                if (baseGeneralInfo.is_open != 1) {
                    zj.Helper.SetImageFilterColor(this.imgIcon, 'cool');
                }
                else {
                    zj.Helper.SetImageFilterColor(this.imgIcon, 'gray');
                }
            }
        };
        HunterHeroItem.prototype.playAni = function () {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0)
                .then(function (display) {
                if (!_this.groupAni.getChildByName("dzGF")) {
                    display.name = "dzGF";
                    _this.groupAni.addChild(display);
                }
                else {
                    display.animation.stop();
                    display.animation.reset();
                    display.armature.dispose();
                    display.dbClear();
                    display.dispose(true);
                }
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        return HunterHeroItem;
    }(eui.ItemRenderer));
    zj.HunterHeroItem = HunterHeroItem;
    __reflect(HunterHeroItem.prototype, "zj.HunterHeroItem");
    /** 列表数据类  */
    var HeroItemData = (function () {
        function HeroItemData() {
            this.type = 0 /* Hunter */;
            /** 武将ID */
            this.generalId = null;
            /** 碎片ID */
            this.soulId = null;
            this.isSelected = false;
        }
        return HeroItemData;
    }());
    zj.HeroItemData = HeroItemData;
    __reflect(HeroItemData.prototype, "zj.HeroItemData");
    /** 自定义进度条界面 */
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        function ProgressBar(backgroundSource, progressSource) {
            var _this = _super.call(this) || this;
            _this.imgBackground = new eui.Image();
            _this.imgBackground.left = 0;
            _this.imgBackground.right = 0;
            _this.imgBackground.top = 0;
            _this.imgBackground.bottom = 0;
            _this.imgBackground.source = zj.cachekey(backgroundSource, _this);
            _this.addChild(_this.imgBackground);
            _this.imgBackground.scale9Grid = new egret.Rectangle(_this.width * 0.5 - 1, _this.height * 0.5 - 1, _this.width * 0.5 - 1, _this.height * 0.5 - 1);
            _this.imgProgress = new eui.Image();
            _this.imgProgress.left = 0;
            _this.imgProgress.width = 0;
            _this.imgProgress.top = 0;
            _this.imgProgress.bottom = 0;
            _this.imgProgress.source = zj.cachekey(progressSource, _this);
            _this.addChild(_this.imgProgress);
            _this.imgProgress.scale9Grid = new egret.Rectangle(_this.width * 0.5 - 1, _this.height * 0.5 - 1, _this.width * 0.5 - 1, _this.height * 0.5 - 1);
            _this.init();
            return _this;
        }
        ProgressBar.prototype.init = function () {
            this.label = new eui.Label();
            this.label.left = 0;
            this.label.right = 0;
            this.label.top = 0;
            this.label.bottom = 0;
            this.label.textAlign = egret.HorizontalAlign.CENTER;
            this.label.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.label.size = 14;
            this.label.text = "0/0";
            this.addChild(this.label);
        };
        ProgressBar.prototype.setProgress = function (current, enough) {
            if (enough < 0)
                return;
            if (current < 0) {
                current = 0;
            }
            var percent = (current / enough) >= 1 ? 1 : (current / enough);
            this.imgProgress.width = this.width * percent;
            this.label.text = current.toString() + "/" + enough.toString();
        };
        ProgressBar.prototype.getCurrentProgress = function () {
            if (this.label == null || this.label == undefined)
                return 0;
            var text = this.label.text;
            var current = text.split('/')[0];
            return Number(current);
        };
        return ProgressBar;
    }(zj.UI));
    zj.ProgressBar = ProgressBar;
    __reflect(ProgressBar.prototype, "zj.ProgressBar");
})(zj || (zj = {}));
//# sourceMappingURL=HunterHeroItem.js.map
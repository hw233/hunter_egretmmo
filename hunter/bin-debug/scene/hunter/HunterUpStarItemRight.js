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
     * @date 2018-12-11
     *
     * @class 猎人升星右侧材料信息item
     */
    var HunterUpStarItemRight = (function (_super) {
        __extends(HunterUpStarItemRight, _super);
        function HunterUpStarItemRight() {
            var _this = _super.call(this) || this;
            _this.index = null;
            _this.generalId = null;
            _this.skinName = "resource/skins/hunter/HunterUpStarItemRightSkin.exml";
            zj.cachekeys(zj.UIResource["HunterUpStarItemRight"], null);
            _this.init();
            return _this;
        }
        HunterUpStarItemRight.prototype.init = function () {
            this.imgStar.visible = false;
            this.imgEmpty.visible = false;
            this.groupIcon.visible = false;
            this.imgLock.visible = false;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        };
        HunterUpStarItemRight.prototype.onTap = function () {
            if (this.generalId > 0 && this.cb != null) {
                this.cb(this.index, this.generalId);
            }
        };
        /**
         * 初始化基本信息
         *
         * @param index 下标索引
         *
         * @description 材料取消选中时需要初始化信息
         */
        HunterUpStarItemRight.prototype.initBaseInfo = function (index) {
            this.index = index;
            this.imgEmpty.visible = true;
            this.imgLock.visible = false;
            this.groupIcon.visible = false;
            this.imgStar.visible = false;
        };
        /**
         * 设置基本信息
         * @param index 界面刷新
         * @param cb 回调函数
         */
        HunterUpStarItemRight.prototype.setInfo = function (index, cb) {
            this.index = index;
            this.cb = cb;
        };
        /**
         * 界面刷新
         * @param id -1 上锁； 0 清空；其他，显示基本信息
         */
        HunterUpStarItemRight.prototype.refresh = function (id, generalId) {
            this.generalId = id;
            if (id == -1) {
                // lock
                this.groupIcon.visible = false;
                this.imgLock.visible = true;
                this.imgStar.visible = false;
                this.imgEmpty.visible = false;
            }
            else if (id == 0) {
                // empty
                this.imgStar.visible = true;
                this.imgEmpty.visible = false;
                this.imgLock.visible = false;
                this.groupIcon.visible = false;
                if (generalId == 0 || generalId == null) {
                    this.imgStar.visible = false;
                }
                else {
                    this.imgStar.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_upstar_bottom[zj.Game.PlayerHunterSystem.queryHunter(generalId).star - 1], this);
                }
            }
            else {
                // generalId
                this.groupIcon.visible = true;
                this.imgLock.visible = false;
                this.imgStar.visible = false;
                this.imgEmpty.visible = false;
                var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(id);
                this.labelLevel.text = hunterInfo.level.toString();
                var aptitude = zj.PlayerHunterSystem.Table(id).aptitude;
                var framePath = zj.PlayerHunterSystem.Frame(id);
                var headPath = zj.PlayerHunterSystem.Head(id);
                var gradePath = zj.UIConfig.UIConfig_General.hunter_grade[aptitude];
                this.imgFrame.source = zj.cachekey(framePath, this);
                if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                    this.imgIcon.source = zj.cachekey("wx_" + headPath, this);
                }
                else {
                    this.imgIcon.source = zj.cachekey(headPath, this);
                }
                this.imgGrade.source = zj.cachekey(gradePath, this);
                zj.Helper.SetHeroAwakenStar(this.groupStar, hunterInfo.star, hunterInfo.awakePassive.level);
                zj.Helper.GetBreakLevelToPath(this.imgBreak, hunterInfo.break_level);
            }
        };
        return HunterUpStarItemRight;
    }(zj.UI));
    zj.HunterUpStarItemRight = HunterUpStarItemRight;
    __reflect(HunterUpStarItemRight.prototype, "zj.HunterUpStarItemRight");
})(zj || (zj = {}));
//# sourceMappingURL=HunterUpStarItemRight.js.map
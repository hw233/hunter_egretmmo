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
    var CommonBossSkillItem = (function (_super) {
        __extends(CommonBossSkillItem, _super);
        function CommonBossSkillItem() {
            var _this = _super.call(this) || this;
            _this.isBegin = false;
            _this.skinName = "resource/skins/common/CommonBossSkillItemSkin.exml";
            zj.cachekeys(zj.UIResource["CommonBossSkillItem"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.down, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.up, _this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, _this.up, _this);
            }, null);
            return _this;
        }
        CommonBossSkillItem.prototype.onAddToStage = function () {
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
        };
        CommonBossSkillItem.prototype.dataChanged = function () {
            var info = zj.TableClientWantedMobsFeature.Item(this.data.mobId);
            var frame = zj.PlayerItemSystem.QualityFrame(info.quality);
            this.imgIcon.source = zj.cachekey(info.path, this);
            this.imgFrame.source = zj.cachekey(frame, this);
        };
        CommonBossSkillItem.prototype.down = function () {
            var father = this.data.father;
            var listWorld = father.groupRight.localToGlobal(father.scroller.x, father.scroller.y);
            listWorld.x -= zj.Game.UIManager.x;
            this.uiTip = new zj.CommonDesTalents();
            this.uiTip.setInfo(this.data.mobId);
            this.uiTip.x = listWorld.x - 53;
            this.uiTip.y = listWorld.y + 58;
            this.stage.addChild(this.uiTip);
            this.isBegin = true;
        };
        CommonBossSkillItem.prototype.up = function () {
            if (this.isBegin) {
                this.stage.removeChild(this.uiTip);
                this.isBegin = false;
            }
        };
        return CommonBossSkillItem;
    }(eui.ItemRenderer));
    zj.CommonBossSkillItem = CommonBossSkillItem;
    __reflect(CommonBossSkillItem.prototype, "zj.CommonBossSkillItem");
    var CommonBossSkillData = (function () {
        function CommonBossSkillData() {
        }
        return CommonBossSkillData;
    }());
    zj.CommonBossSkillData = CommonBossSkillData;
    __reflect(CommonBossSkillData.prototype, "zj.CommonBossSkillData");
})(zj || (zj = {}));
//# sourceMappingURL=CommonBossSkillItem.js.map
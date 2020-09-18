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
     * @class 工作派遣猎人Item
     *
     * @author LianLei
     *
     * @date 2019-11-10
     */
    var WorkSendHeroItem = (function (_super) {
        __extends(WorkSendHeroItem, _super);
        function WorkSendHeroItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/adventureMap/WorkSendHeroItemSkin.exml";
            zj.cachekeys(zj.UIResource["WorkSendHeroItem"], null);
            return _this;
        }
        WorkSendHeroItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        WorkSendHeroItem.prototype.updateView = function (data) {
            if (data.generalInfo == null)
                return;
            var baseInfo = zj.PlayerHunterSystem.Table(data.generalInfo.general_id);
            this.imgFrame.source = zj.cachekey(zj.PlayerHunterSystem.Frame(data.generalInfo.general_id), this);
            this.imgIcon.source = zj.cachekey(zj.PlayerHunterSystem.Head(data.generalInfo.general_id), this);
            zj.Helper.SetHeroAwakenStar(this.groupStar, data.generalInfo.star, data.generalInfo.awakePassive.level);
            this.imgQuality.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_grade[zj.Game.PlayerHunterSystem.Table(data.generalInfo.general_id).aptitude], this);
            this.imgSel.visible = data.isSel;
            this.imgFrame.horizontalCenter = 0;
            if (this.imgIcon.source == "hero_icon_head_gw_moguguai_png")
                this.imgFrame.horizontalCenter = -2;
            // if (this.selected) {
            // 	if (!this.groupAni.getChildByName("selAni")) this.addAnimation();
            // }
            // else {
            // 	let ani = this.groupAni.getChildByName("selAni");
            // 	if (ani) this.groupAni.removeChild(ani);
            // }
        };
        WorkSendHeroItem.prototype.addAnimation = function () {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0).then(function (display) {
                display.name = "selAni";
                _this.groupAni.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
        };
        return WorkSendHeroItem;
    }(eui.ItemRenderer));
    zj.WorkSendHeroItem = WorkSendHeroItem;
    __reflect(WorkSendHeroItem.prototype, "zj.WorkSendHeroItem");
    var WorkSendHeroItemData = (function () {
        function WorkSendHeroItemData() {
        }
        return WorkSendHeroItemData;
    }());
    zj.WorkSendHeroItemData = WorkSendHeroItemData;
    __reflect(WorkSendHeroItemData.prototype, "zj.WorkSendHeroItemData");
})(zj || (zj = {}));
//# sourceMappingURL=WorkSendHeroItem.js.map
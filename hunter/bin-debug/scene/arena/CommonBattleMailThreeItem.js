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
     * @author xingliwei
     *
     * @date 2019-2-22
     *
     * @class 格斗场战报详情list子项
     */
    var CommonBattleMailThreeItem = (function (_super) {
        __extends(CommonBattleMailThreeItem, _super);
        function CommonBattleMailThreeItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/arena/CommonBattleMailThreeItemSkin.exml";
            zj.cachekeys(zj.UIResource["CommonBattleMailThreeItem"], null);
            return _this;
        }
        CommonBattleMailThreeItem.prototype.dataChanged = function () {
            var data1 = this.data;
            if (data1.bWin == null) {
                this.imgResult.visible = false;
            }
            else {
                this.imgResult.source = zj.cachekey(zj.UIConfig.UIConfig_RpgScene.resultWinOrLose[data1.bWin], this);
            }
            this.imgTeamNumber.source = zj.cachekey(zj.UIConfig.UIConfig_RpgScene.resultTeam[data1.index], this);
            var array = new eui.ArrayCollection();
            for (var i = 0; i < Object.keys(data1.info).length; i++) {
                var data = new zj.CommonArenaEnemyTeamItemData();
                data.index = i;
                data.showTeam = false;
                data.simpleInfo = data1.info[i];
                array.addItem(data);
            }
            this.listSupport.dataProvider = array;
            this.listSupport.itemRenderer = zj.CommonArenaEnemyTeamItem;
        };
        return CommonBattleMailThreeItem;
    }(eui.ItemRenderer));
    zj.CommonBattleMailThreeItem = CommonBattleMailThreeItem;
    __reflect(CommonBattleMailThreeItem.prototype, "zj.CommonBattleMailThreeItem");
    /**子项数据源 */
    var CommonBattleMailThreeItemData = (function () {
        function CommonBattleMailThreeItemData() {
            this.info = [];
        }
        return CommonBattleMailThreeItemData;
    }());
    zj.CommonBattleMailThreeItemData = CommonBattleMailThreeItemData;
    __reflect(CommonBattleMailThreeItemData.prototype, "zj.CommonBattleMailThreeItemData");
})(zj || (zj = {}));
//# sourceMappingURL=CommonBattleMailThreeItem.js.map
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
     * @author xing li wei
     *
     * @date 2019-4-13
     *
     * @class 结算伤害统计界面
     */
    var BattleEnd_StatsPop = (function (_super) {
        __extends(BattleEnd_StatsPop, _super);
        function BattleEnd_StatsPop() {
            var _this = _super.call(this) || this;
            _this.itemsMineGemeral = new eui.ArrayCollection();
            _this.itemsOppGeneral = new eui.ArrayCollection();
            _this.skinName = "resource/skins/battleEnd/BattleEndStatsPopSkin.exml";
            _this.init();
            return _this;
        }
        BattleEnd_StatsPop.prototype.init = function () {
            this.ButtonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
            this.leftData = zj.Table.copy(zj.Game.PlayerBattleSystem.multiResultInfo.newReplayBattleInfo.leftReplayInfo.generals);
            this.RightData = zj.Table.copy(zj.Game.PlayerBattleSystem.multiResultInfo.newReplayBattleInfo.rightReplayInfo.generals);
            zj.Helper.sortBattleInfoByDamage(this.leftData, this.RightData);
            var _a = zj.Helper.GetMvp(this.leftData), index1 = _a[0], maxValue1 = _a[1];
            var _b = zj.Helper.GetMvp(this.RightData), index2 = _b[0], maxValue2 = _b[1];
            var maxValue = Math.max(maxValue1, maxValue2);
            this.loadLeftList(index1, maxValue);
            this.loadRightList(index2, maxValue);
        };
        BattleEnd_StatsPop.prototype.loadLeftList = function (index, maxValue) {
            var index1 = 0;
            var index2 = -1;
            for (var i = 0; i < this.leftData.length; i++) {
                if (this.leftData[i].totalDamage > index1) {
                    index1 = this.leftData[i].totalDamage;
                    if (index1 > 0) {
                        index2 = i;
                    }
                }
            }
            this.itemsMineGemeral.refresh();
            if (this.TableViewMine == null) {
                return;
            }
            for (var i = zj.Game.PlayerMissionSystem.tableLength(this.leftData) - 1; i >= 0; i--) {
                var data = new zj.BattleEnd_StastPopItemData();
                data.itemInfo = this.leftData[i];
                data.maxValue = maxValue;
                data.tag = zj.yuan3(index == i, true, false);
                data.epos = zj.TableEnum.TablePositionType.POSITION_LEFT;
                data.index = i;
                data.indexvis = index2;
                this.itemsMineGemeral.addItem(data);
            }
            this.TableViewMine.dataProvider = this.itemsMineGemeral;
            this.TableViewMine.itemRenderer = zj.BattleEnd_StastPopItem;
        };
        BattleEnd_StatsPop.prototype.loadRightList = function (index, maxValue) {
            var index1 = 0;
            var index2 = -1;
            for (var i = 0; i < this.RightData.length; i++) {
                if (this.RightData[i].totalDamage > index1) {
                    index1 = this.RightData[i].totalDamage;
                    if (index1 > 0) {
                        index2 = i;
                    }
                }
            }
            this.itemsOppGeneral.refresh();
            if (this.TableViewOpp == null) {
                return;
            }
            for (var i = zj.Game.PlayerMissionSystem.tableLength(this.RightData) - 1; i >= 0; i--) {
                var data = new zj.BattleEnd_StastPopItemEnemyData();
                data.itemInfo = this.RightData[i];
                data.maxValue = maxValue;
                data.tag = zj.yuan3(index == i, true, false);
                data.index = i;
                data.indexvis = index2;
                data.epos = zj.TableEnum.TablePositionType.POSITION_RIGHT;
                this.itemsOppGeneral.addItem(data);
            }
            this.TableViewOpp.dataProvider = this.itemsOppGeneral;
            this.TableViewOpp.itemRenderer = zj.BattleEnd_StastPopItemEnemy;
        };
        /**关闭页面 */
        BattleEnd_StatsPop.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return BattleEnd_StatsPop;
    }(zj.Dialog));
    zj.BattleEnd_StatsPop = BattleEnd_StatsPop;
    __reflect(BattleEnd_StatsPop.prototype, "zj.BattleEnd_StatsPop");
})(zj || (zj = {}));
//# sourceMappingURL=BattleEnd_StatsPop.js.map
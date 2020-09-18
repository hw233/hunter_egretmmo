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
     * @date 2019-7-23
     *
     * @class 猎人念力修炼选择猎人材料界面
     */
    var HunterPsychicRefreshNewPop = (function (_super) {
        __extends(HunterPsychicRefreshNewPop, _super);
        function HunterPsychicRefreshNewPop() {
            var _this = _super.call(this) || this;
            _this.hunterInfo = [];
            _this.skinName = "resource/skins/hunter/HunterPsychicRefreshNewPopSkin.exml";
            _this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUse, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, _this);
            return _this;
        }
        HunterPsychicRefreshNewPop.prototype.SetInfo = function (consumeSels, hunterInfo, csmCounts, father) {
            this.father = father;
            this.initData(consumeSels, hunterInfo, csmCounts);
            this.initView();
        };
        HunterPsychicRefreshNewPop.prototype.initData = function (consumeSels, hunterInfo, csmCounts) {
            this.consumeSels = consumeSels;
            this.hunterInfo = hunterInfo;
            this.csmCounts = csmCounts;
        };
        HunterPsychicRefreshNewPop.prototype.initView = function () {
            this.initTableView();
        };
        /**加载猎人材料列表 */
        HunterPsychicRefreshNewPop.prototype.initTableView = function () {
            var array = new eui.ArrayCollection();
            for (var i = 0, length_1 = this.hunterInfo.length; i < length_1; i++) {
                var data = new zj.HunterPsychicRefreshNewPopItemData();
                data.index = i;
                data.consumeSels = this.consumeSels;
                data.hunterInfo = zj.Table.DeepCopy(this.hunterInfo[i]);
                data.csmCounts = this.csmCounts;
                data.father = this;
                array.addItem(data);
            }
            this.listViewDrop.dataProvider = array;
            this.listViewDrop.itemRenderer = zj.HunterPsychicRefreshNewPopItem;
            if (this.hunterInfo.length > 1) {
                this.imgNode.visible = false;
            }
            else {
                this.imgNode.visible = true;
            }
        };
        HunterPsychicRefreshNewPop.prototype.onBtnUse = function () {
            this.father.SetConsumeSelection(this.consumeSels);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        HunterPsychicRefreshNewPop.prototype.onBtnClose = function () {
            this.father.SetConsumeSelection([]);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return HunterPsychicRefreshNewPop;
    }(zj.Dialog));
    zj.HunterPsychicRefreshNewPop = HunterPsychicRefreshNewPop;
    __reflect(HunterPsychicRefreshNewPop.prototype, "zj.HunterPsychicRefreshNewPop");
})(zj || (zj = {}));
//# sourceMappingURL=HunterPsychicRefreshNewPop.js.map
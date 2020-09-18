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
 * @author chen xi.
 *
 * @date 2019-1-12
 *
 * @class 猎人念力修炼
 */
    var HunterPsychicRefresh = (function (_super) {
        __extends(HunterPsychicRefresh, _super);
        // private btnClose: eui.Button;
        // private labelOwnNumber: eui.Label;
        // private btnAdd: eui.Button;
        // private groupRefresh: eui.Group;
        // private groupPropertyChange: eui.Group;
        // private listProperty: eui.List;
        // private groupChoose: eui.Group;
        // private groupShowName: eui.Group;
        // private labelShowName: eui.Label;
        // private imgShowNameBigon: eui.Image;
        // private groupShowProperty: eui.Group;
        // private labelShowProperty: eui.Label;
        // private imgShowPropertyBigon: eui.Image;
        // private groupShowAnimation: eui.Group;
        // private labelShowAnimation: eui.Label;
        // private imgShowAnimationBigon: eui.Image;
        // private groupBefore: eui.Group;
        // private listPsychicBefore: eui.List;
        // private groupSave: eui.Group;
        // private btnSave: eui.Button;
        // private btnCancel: eui.Button;
        // private groupCost: eui.Group;
        // private btnRefresh: eui.Button;
        // private labelBaseCostNumber: eui.Label;
        // private labelLockCostNumber: eui.Label;
        // private labelTotalCostNumber: eui.Label;
        // private groupAfter: eui.Group;
        // private listPsychicAfter: eui.List;
        // private btnIllustrate: eui.Button;
        // private generalId: number;
        // private callback: Function;
        // private isShowName: boolean = true;
        // private isShowProperty: boolean = true;
        // private isShowAnimation: boolean = true;
        // private isAnimationEnd: boolean = true;
        // private isSelecteResult: boolean = true;
        // private psychicItemsBefore: Array<HunterPsychicItem> = [];
        // private psychicItemsAfter: Array<HunterPsychicItem> = [];
        // private listPsychicBeforeData: eui.ArrayCollection = new eui.ArrayCollection();
        // private listPsychicAfterData: eui.ArrayCollection = new eui.ArrayCollection();
        // private lockPosition: Array<number> = []; // default is 0
        function HunterPsychicRefresh() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterPsychicRefreshSkin.exml";
            return _this;
            // this.width = UIManager.StageWidth;
            // this.height = UIManager.StageHeight;
            // this.init();
        }
        return HunterPsychicRefresh;
    }(zj.Dialog));
    zj.HunterPsychicRefresh = HunterPsychicRefresh;
    __reflect(HunterPsychicRefresh.prototype, "zj.HunterPsychicRefresh");
})(zj || (zj = {}));
//# sourceMappingURL=HunterPsychicRefresh.js.map
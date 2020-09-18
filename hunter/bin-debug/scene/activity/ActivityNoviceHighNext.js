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
     * @date 2019-3-29
     *
     * @class 高手进阶玛琪篇
     */
    var ActivityNoviceHighNext = (function (_super) {
        __extends(ActivityNoviceHighNext, _super);
        // public imgNpc1: eui.Image;
        // public imgNpc2: eui.Image;
        // public btnClose: eui.Button;
        // public imgTitle: eui.Image;
        // public imgBar: eui.Image;
        // public imgBar1: eui.Image;
        // public labelCount: eui.BitmapLabel;
        // public listViewTag: eui.List;
        // public listViewItem: eui.List;
        // public btnGift: eui.Button;
        // public labelTime: eui.Label;
        // public labelTime1: eui.Label;
        // public labelTime2: eui.Label;
        // public labelTime3: eui.Label;
        // public imgbg: eui.Image;
        function ActivityNoviceHighNext() {
            return _super.call(this) || this;
            // this.skinName = "resource/skins/activity/ActivityNoviceHighNextSkin.exml";
            // this.init();
        }
        return ActivityNoviceHighNext;
    }(zj.noviceBase));
    zj.ActivityNoviceHighNext = ActivityNoviceHighNext;
    __reflect(ActivityNoviceHighNext.prototype, "zj.ActivityNoviceHighNext");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityNoviceHighNext.js.map
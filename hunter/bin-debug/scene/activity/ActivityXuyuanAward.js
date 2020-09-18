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
    //ActivityXuyuanAward
    //yuqingchao
    //2019.05.07
    var ActivityXuyuanAward = (function (_super) {
        __extends(ActivityXuyuanAward, _super);
        function ActivityXuyuanAward() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityXuyuanAwardSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            return _this;
        }
        ActivityXuyuanAward.prototype.setInfo = function (topicId) {
            var tbl = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.xuyuan_random + ".json")[topicId]; //读表
            this.arrayCollection = new eui.ArrayCollection();
            for (var i = 0; i < tbl.client_award.length; i++) {
                var height = Math.ceil(tbl.client_award[i].length / 7) * 70;
                var pic = tbl.client_award_pic[i];
                height = height < 120 && 120 || height;
                var cellHight = Math.ceil(tbl.client_award[i].length / 5) > 1 && 70 || 95;
                this.arrayCollection.addItem({
                    i: i,
                    info: tbl.client_award[i],
                    pic: pic,
                    height: height,
                    cellHight: cellHight,
                });
            }
            this.lstView.dataProvider = this.arrayCollection;
            this.lstView.itemRenderer = zj.ActivityXuyuanAwardItem;
        };
        ActivityXuyuanAward.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        ActivityXuyuanAward.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        ActivityXuyuanAward.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return ActivityXuyuanAward;
    }(zj.Dialog));
    zj.ActivityXuyuanAward = ActivityXuyuanAward;
    __reflect(ActivityXuyuanAward.prototype, "zj.ActivityXuyuanAward");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityXuyuanAward.js.map
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
    //奖励预览
    //yuqingchao
    //2019.05.28
    var DoubleColorViewAward = (function (_super) {
        __extends(DoubleColorViewAward, _super);
        function DoubleColorViewAward() {
            var _this = _super.call(this) || this;
            _this.rewardTbl = [];
            _this.skinName = "resource/skins/fishing/DoubleColorViewAwardSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            _this.init();
            return _this;
        }
        DoubleColorViewAward.prototype.init = function () {
            var tbl = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.color_fruit_reward + ".json");
            for (var i = 1; i < Object.keys(tbl).length + 1; i++) {
                this.rewardTbl.push(tbl[i]);
            }
            this.rewardTbl.sort(function (a, b) {
                return b.id - a.id;
            });
            this.setInfoList();
            zj.setCache(this.groupCache);
        };
        DoubleColorViewAward.prototype.setInfoList = function () {
            this.arrayCollection = new eui.ArrayCollection();
            for (var i = 0; i < this.rewardTbl.length; i++) {
                this.arrayCollection.addItem({
                    i: i,
                    info: this.rewardTbl[i],
                    father: this,
                });
            }
            this.lstRed.dataProvider = this.arrayCollection;
            this.lstRed.itemRenderer = zj.DoubleColorViewAwardItem;
        };
        //移除详情
        DoubleColorViewAward.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        //长按详情添加
        DoubleColorViewAward.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        DoubleColorViewAward.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return DoubleColorViewAward;
    }(zj.Dialog));
    zj.DoubleColorViewAward = DoubleColorViewAward;
    __reflect(DoubleColorViewAward.prototype, "zj.DoubleColorViewAward");
})(zj || (zj = {}));
//# sourceMappingURL=DoubleColorViewAward.js.map
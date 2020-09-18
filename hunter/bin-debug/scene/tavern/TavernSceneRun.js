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
    var TavernSceneRun = (function (_super) {
        __extends(TavernSceneRun, _super);
        function TavernSceneRun() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/tavern/TavernSceneRunSkin.exml";
            _this.imgSchedule0.mask = _this.imgScheduleMask0;
            _this.init();
            return _this;
        }
        TavernSceneRun.prototype.init = function () {
            var _this = this;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.close(zj.UI.HIDE_TO_TOP); }, this);
            for (var i = 0; i <= 10; i++) {
                this["group" + i].visible = false;
            }
            this.RumInfo = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == 23;
            })[0];
            this.imgScheduleMask0.width = 0;
            this.labeljindu.text = "当前已招募次数：" + this.RumInfo.itemCount.toString();
            var _loop_1 = function (i) {
                // this.labelcont.text = "当前阶段：" + this.RumInfo.itemCount + "/" + this.RumInfo.missions[visnumber].mission_condition;
                var vis = zj.Table.FindF(this_1.RumInfo.rewardIndex, function (k, v) {
                    return v == i + 1;
                });
                this_1["group" + i].visible = true;
                this_1["group" + i].x = 80 + 30 * 2.5 + i * 170 * 2.5 / (this_1.RumInfo.missions.length - 1);
                var num = (i == 0 ? this_1.RumInfo.itemCount : (this_1.RumInfo.itemCount - this_1.RumInfo.missions[i - 1].mission_condition)) / this_1.RumInfo.missions[i].mission_condition;
                this_1["imglingqu" + i].visible = num >= 1 ? true : false;
                if (vis) {
                    this_1["imglingqu" + i].source = "ui_acitivity_serverseven_get_png";
                }
                var generalId = this_1.RumInfo.missions[i].rewards[0].goodsId;
                var count = this_1.RumInfo.missions[i].rewards[0].count;
                this_1["labelnum" + i].text = zj.Set.NumberUnit2(count);
                this_1["label" + i].text = this_1.RumInfo.missions[i].mission_condition;
                this_1["imgRunFrame" + i].source = zj.cachekey(zj.PlayerItemSystem.Set(generalId, null, count).Frame, this_1);
                this_1["imgRunIcon" + i].source = zj.cachekey(zj.PlayerItemSystem.ItemPath(generalId), this_1);
            };
            var this_1 = this;
            for (var i = 0; i < this.RumInfo.missions.length; i++) {
                _loop_1(i);
            }
            for (var i = 0; i < this.RumInfo.missions.length; i++) {
                var num = (i == 0 ? this.RumInfo.itemCount : (this.RumInfo.itemCount - this.RumInfo.missions[i - 1].mission_condition)) / (i == 0 ? this.RumInfo.missions[i].mission_condition : (this.RumInfo.missions[i].mission_condition - this.RumInfo.missions[i - 1].mission_condition));
                if (i == 0) {
                    if (num > 1) {
                        num = 1;
                    }
                    this.imgScheduleMask0.width += num >= 1 ? 30 : num * 30;
                }
                else {
                    if (num > 1) {
                        num = 1;
                    }
                    this.imgScheduleMask0.width += num >= 1 ? 170 / (this.RumInfo.missions.length - 1) : num * 170 / (this.RumInfo.missions.length - 1);
                }
                if (num < 1) {
                    return;
                }
            }
        };
        return TavernSceneRun;
    }(zj.Dialog));
    zj.TavernSceneRun = TavernSceneRun;
    __reflect(TavernSceneRun.prototype, "zj.TavernSceneRun");
})(zj || (zj = {}));
//# sourceMappingURL=TavernSceneRun.js.map
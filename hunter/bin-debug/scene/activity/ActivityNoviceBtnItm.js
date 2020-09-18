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
     * @date 2019-11-13
     *
     * @class 新手狂欢按钮
     */
    var ActivityNoviceBtnItm = (function (_super) {
        __extends(ActivityNoviceBtnItm, _super);
        function ActivityNoviceBtnItm() {
            var _this = _super.call(this) || this;
            _this.vis = true;
            _this.missionGift = [];
            _this.skinName = "resource/skins/activity/ActivityNoviceBtnItmSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityNoviceBtnItm"], null);
            for (var i = 1; i <= 7; i++) {
                var a = [];
                for (var j = 1; j <= 4; j++) {
                    a.push(zj.TableMissionGift.Table()[(j + "0" + i)]);
                }
                _this.missionGift.push(a);
            }
            return _this;
        }
        ActivityNoviceBtnItm.prototype.dataChanged = function () {
            var _this = this;
            var data = this.data;
            if (this.vis) {
                this.vis = false;
                zj.Set.ButtonBackgroud(this.btn, "ui_acitivity_novicenew_qieye" + data.index + "-2_png", "ui_acitivity_novicenew_qieye" + data.index + "-2_png", "ui_acitivity_novicenew_qieye" + data.index + "-1_png");
            }
            if (data.father.btnIndex == data.index) {
                this.imgRed.x = 155;
                this.btn.enabled = false;
            }
            else {
                this.imgRed.x = 130;
                this.btn.enabled = true;
            }
            var a = function (index) {
                return zj.Table.FindF(data.father.data[index].state, function (k, v) {
                    return v == zj.TableEnum.Enum.NoviceState.REWARD && !data.father.data[data.index].lock;
                });
            };
            var bTip = false;
            switch (data.index) {
                case 1://0
                    bTip = a(0) || a(1);
                    break;
                case 2://2
                    bTip = a(2) || a(3) || a(4);
                    break;
                case 3://4
                    bTip = a(5) || a(6) || a(7);
                    break;
                case 4://6
                    bTip = a(8) || a(9) || a(10);
                    break;
                case 5://8
                    bTip = a(11) || a(12) || a(13) || a(14);
                    break;
                case 6://10
                    bTip = a(15) || a(16) || a(17) || a(18);
                    break;
                case 7://12
                    bTip = a(19) || a(20) || a(21) || a(22);
                    break;
            }
            var vis1 = false;
            var _loop_1 = function (i) {
                var vis = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.mission_gift, function (k, v) {
                    return v == _this.missionGift[data.index - 1][i].index;
                });
                if (i == 0) {
                    if (!vis) {
                        vis1 = true;
                        i = 4;
                    }
                }
                else if (i == 3) {
                    if (!vis && (zj.Game.PlayerInfoSystem.BaseInfo.chargeToken / 10 > this_1.missionGift[data.index - 1][3].charge_token / 10)) {
                        vis1 = true;
                        i = 4;
                    }
                }
                out_i_1 = i;
            };
            var this_1 = this, out_i_1;
            for (var i = 0; i < this.missionGift[data.index - 1].length; i++) {
                _loop_1(i);
                i = out_i_1;
            }
            var vis2 = !(zj.Helper.day() < data.index); //Math.floor((Game.Controller.curServerTime - Game.PlayerInfoSystem.BaseInfo.createTime) / 86400) + 1 
            this.imgRed.visible = (bTip && vis2) || (vis1 && vis2);
        };
        return ActivityNoviceBtnItm;
    }(eui.ItemRenderer));
    zj.ActivityNoviceBtnItm = ActivityNoviceBtnItm;
    __reflect(ActivityNoviceBtnItm.prototype, "zj.ActivityNoviceBtnItm");
    var ActivityNoviceBtnItmData = (function () {
        function ActivityNoviceBtnItmData() {
        }
        return ActivityNoviceBtnItmData;
    }());
    zj.ActivityNoviceBtnItmData = ActivityNoviceBtnItmData;
    __reflect(ActivityNoviceBtnItmData.prototype, "zj.ActivityNoviceBtnItmData");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityNoviceBtnItm.js.map
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
     * @date 2019-3-26
     *
     * @class 新手狂欢list按钮子项
     */
    var ActivityNoviceTag = (function (_super) {
        __extends(ActivityNoviceTag, _super);
        function ActivityNoviceTag() {
            var _this = _super.call(this) || this;
            _this.missionGift = [];
            _this.skinName = "resource/skins/activity/ActivityNoviceTagSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityNoviceTag"], null);
            for (var i = 1; i <= 7; i++) {
                var a = [];
                for (var j = 1; j <= 4; j++) {
                    a.push(zj.TableMissionGift.Table()[(j + "0" + i)]);
                }
                _this.missionGift.push(a);
            }
            return _this;
        }
        ActivityNoviceTag.prototype.dataChanged = function () {
            var data = this.data;
            var label = this.btnTag.getChildAt(1);
            switch (data.index) {
                case 0:
                    switch (data.father.btnIndex) {
                        case 1:
                            label.text = "普通副本";
                            break;
                        case 2:
                            label.text = "天空竞技场";
                            break;
                        case 3:
                            label.text = "竞技切磋";
                            break;
                        case 4:
                            label.text = "流星街试炼";
                            break;
                        case 5:
                            label.text = "挑战副本";
                            break;
                        case 6:
                            label.text = "遗迹探索";
                            break;
                        case 7:
                            label.text = "贪婪之岛";
                            break;
                    }
                    break;
                case 1:
                    switch (data.father.btnIndex) {
                        case 1:
                            label.text = "伙伴招募";
                            break;
                        case 2:
                            label.text = "猎人成长";
                            break;
                        case 3:
                            label.text = "公会成长";
                            break;
                        case 4:
                            label.text = "幸运娃娃机";
                            break;
                        case 5:
                            label.text = "获得卡片";
                            break;
                        case 6:
                            label.text = "消耗体力";
                            break;
                        case 7:
                            label.text = "觉醒突破";
                            break;
                    }
                    break;
                case 2:
                    label.text = "福利礼包";
                    break;
            }
            if (data.father.typeId == data.index + 1) {
                this.btnTag.enabled = false;
            }
            else {
                this.btnTag.enabled = true;
            }
            this.setInfoTips(data);
        };
        ActivityNoviceTag.prototype.setInfoTips = function (data) {
            var _this = this;
            var bTip = false;
            var vis = function (index) {
                return zj.Table.FindF(data.father.data[index].state, function (k, v) {
                    return v == zj.TableEnum.Enum.NoviceState.REWARD && !data.father.data[data.index].lock;
                });
            };
            switch (data.index) {
                case 0:
                    switch (data.father.btnIndex) {
                        case 1://0
                            bTip = vis(0);
                            break;
                        case 2://2
                            bTip = vis(2);
                            break;
                        case 3://4
                            bTip = vis(5);
                            break;
                        case 4://6
                            bTip = vis(8) || vis(9);
                            break;
                        case 5://8
                            bTip = vis(11);
                            break;
                        case 6://10
                            bTip = vis(15) || vis(16) || vis(17);
                            break;
                        case 7://12
                            bTip = vis(20) || vis(21);
                            break;
                    }
                    break;
                case 1:
                    switch (data.father.btnIndex) {
                        case 1://1
                            bTip = vis(1);
                            break;
                        case 2://3
                            bTip = vis(3) || vis(4);
                            break;
                        case 3://5
                            bTip = vis(6) || vis(7);
                            break;
                        case 4://7
                            bTip = vis(10);
                            break;
                        case 5://9
                            bTip = vis(12) || vis(13) || vis(14);
                            break;
                        case 6://11
                            bTip = vis(18);
                            break;
                        case 7://13
                            bTip = vis(21) || vis(22);
                            break;
                    }
                    break;
                case 2:
                    var _loop_1 = function (i) {
                        var vis_1 = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.mission_gift, function (k, v) {
                            return v == _this.missionGift[data.father.btnIndex - 1][i].index;
                        });
                        if (i == 0) {
                            if (!vis_1) {
                                this_1.imgRedIcon.visible = true;
                                return { value: void 0 };
                            }
                        }
                        else if (i == 3) {
                            if (!vis_1 && (zj.Game.PlayerInfoSystem.BaseInfo.chargeToken / 10 > this_1.missionGift[data.father.btnIndex - 1][3].charge_token / 10)) {
                                this_1.imgRedIcon.visible = true;
                                return { value: void 0 };
                            }
                        }
                    };
                    var this_1 = this;
                    for (var i = 0; i < this.missionGift[data.father.btnIndex - 1].length; i++) {
                        var state_1 = _loop_1(i);
                        if (typeof state_1 === "object")
                            return state_1.value;
                    }
                    break;
            }
            this.imgRedIcon.visible = bTip;
        };
        return ActivityNoviceTag;
    }(eui.ItemRenderer));
    zj.ActivityNoviceTag = ActivityNoviceTag;
    __reflect(ActivityNoviceTag.prototype, "zj.ActivityNoviceTag");
    var ActivityNoviceTagData = (function () {
        function ActivityNoviceTagData() {
        }
        return ActivityNoviceTagData;
    }());
    zj.ActivityNoviceTagData = ActivityNoviceTagData;
    __reflect(ActivityNoviceTagData.prototype, "zj.ActivityNoviceTagData");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityNoviceTag.js.map
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
     * @class 排行榜
     *
     * @author LianLei
     *
     * @date 2019-11-26
     */
    var Activity_RanklistMain = (function (_super) {
        __extends(Activity_RanklistMain, _super);
        function Activity_RanklistMain() {
            var _this = _super.call(this) || this;
            _this.listRankData = new eui.ArrayCollection();
            _this.itemInfo = [];
            _this.rankInfo = [];
            _this.itemOwn = null;
            _this.rankArr = [];
            _this.skinName = "resource/skins/activity/Activity_RanklistMainSkin.exml";
            _this.btnRule.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRule, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            _this.init();
            return _this;
        }
        Activity_RanklistMain.prototype.init = function () {
            // 活动开启
            this.activityInfo = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == message.ActivityType.ACT_TYPE_RANK;
            })[0];
            if (this.activityInfo == null || this.activityInfo.rankRewards == null)
                return;
            this.rankInfo = this.activityInfo.rankRewards;
            var req = new message.QueryActivityRankRequest();
            req.body.index = this.activityInfo.index;
            zj.Game.Controller.send(req, this.QueryActivityRankReqData_Visit, null, this, false);
        };
        Activity_RanklistMain.prototype.QueryActivityRankReqData_Visit = function (req, resp) {
            var response = resp;
            if (response.header.result != 0) {
                // toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            this.itemOwn = response.body.items[response.body.items.length - 1];
            this.itemInfo = zj.Table.DeepCopy(response.body.items);
            this.itemInfo.splice(this.itemInfo.length - 1, 1);
            // let isOnList: boolean = this.itemInfo.length <= 0 ? false : this.itemInfo[0].value >= this.rankInfo[0].ext
            // if (!isOnList) {
            // 	let info = new message.RankBaseItemInfo();
            // 	info.rank = 0;
            // 	info.value = this.rankInfo[0].ext;
            // 	info.baseInfo = null;
            // 	this.itemInfo.splice(0, 0, info)
            // 	for (let i = 0; i < this.itemInfo.length; i++) {
            // 		this.itemInfo[i].rank = this.itemInfo[i].rank + 1;
            // 	}
            // }
            this.loadList();
            this.setInfo();
        };
        Activity_RanklistMain.prototype.setInfo = function () {
            this.labelActivityDes.text = this.activityInfo.des;
            var rank = 0;
            for (var i = 0; i < this.rankArr.length; i++) {
                if (this.rankArr[i].baseInfo != null && this.rankArr[i].baseInfo.id == this.itemOwn.baseInfo.id) {
                    rank = this.rankArr[i].rank;
                    break;
                }
            }
            this.labelOwnRank.text = rank == 0 ? "我的排名：未上榜" : "我的排名：" + rank;
            // this.labelOwnRank.text = (this.itemInfo[this.itemInfo.length - 1].rank == 0 || (this.itemInfo[this.itemInfo.length - 1].rank != 0 && this.itemInfo[this.itemInfo.length - 1].value == 0)) ?
            // 	"我的排名：未上榜" : "我的排名：" + this.itemInfo[this.itemInfo.length - 1].rank;
            var dateClose = new Date(this.activityInfo.closeTime * 1000);
            var dateStart = new Date(this.activityInfo.openTime * 1000);
            var strClose = zj.Helper.StringFormat("%s/%s/%s", dateClose.getFullYear(), dateClose.getMonth() + 1 < 10 ? "0" + (dateClose.getMonth() + 1).toString() : dateClose.getMonth() + 1, dateClose.getDate() < 10 ? "0" + dateClose.getDate().toString() : dateClose.getDate());
            var strStart = zj.Helper.StringFormat("%s/%s/%s", dateStart.getFullYear(), dateStart.getMonth() + 1 < 10 ? "0" + (dateStart.getMonth() + 1).toString() : dateStart.getMonth() + 1, dateStart.getDate() < 10 ? "0" + dateStart.getDate().toString() : dateStart.getDate());
            this.labelActivityTime.text = strStart + " - " + strClose;
            this.imgTitle.source = zj.cachekey("ui_acitivity_rankinglist_title" + this.activityInfo.consumeType + "_png", this);
            this.imgLeft.source = zj.cachekey("ui_acitivity_rankinglist_tupian" + this.activityInfo.consumeType + "_png", this);
            var value = this.itemOwn.value > 100000 ? (((this.itemOwn.value / 1000) >>> 0) % 10 == 0 ? ((this.itemOwn.value / 10000) >>> 0) + "万" : (this.itemOwn.value / 10000).toFixed(1) + "万") : this.itemOwn.value.toString();
            switch (this.activityInfo.consumeType) {
                case 1:
                    this.labelTimes.text = "钻石消耗";
                    this.labelOwnNum.text = "我的消耗数量：" + value;
                    break;
                case 2:
                    this.labelTimes.text = "体力消耗";
                    this.labelOwnNum.text = "我的消耗数量：" + value;
                    break;
                case 3:
                    this.labelTimes.text = "金币消耗";
                    this.labelOwnNum.text = "我的消耗数量：" + value;
                    break;
                case 4:
                    this.labelTimes.text = "流星街总次数";
                    this.labelOwnNum.text = "我的次数：" + value;
                    break;
                case 6:
                    this.labelTimes.text = "本服格斗次数";
                    this.labelOwnNum.text = "我的格斗次数：" + value;
                    break;
                case 9:
                    this.labelTimes.text = "采果子次数";
                    this.labelOwnNum.text = "我的采集数量：" + value;
                    break;
                case 10:
                    this.labelTimes.text = "啤酒抽卡次数";
                    this.labelOwnNum.text = "我的抽卡次数：" + value;
                    break;
                case 12:
                    this.labelTimes.text = "大草原杀人数量";
                    this.labelOwnNum.text = "我的击杀数量：" + value;
                    break;
                case 16:
                    this.labelTimes.text = "娃娃机抽奖次数";
                    this.labelOwnNum.text = "我的抽奖次数：" + value;
                    break;
                case 17:
                    this.labelTimes.text = "许愿次数";
                    this.labelOwnNum.text = "我的许愿次数：" + value;
                    break;
            }
        };
        Activity_RanklistMain.prototype.loadList = function () {
            var zone = {};
            for (var _i = 0, _a = this.rankInfo; _i < _a.length; _i++) {
                var v = _a[_i];
                zone[v.ext] = [v.rankZone[0], v.rankZone[1]];
            }
            var item = {};
            for (var _b = 0, _c = this.itemInfo; _b < _c.length; _b++) {
                var v = _c[_b];
                for (var _d = 0, _e = this.rankInfo; _d < _e.length; _d++) {
                    var w = _e[_d];
                    if (v.value >= w.ext) {
                        if (!item[w.ext])
                            item[w.ext] = [];
                        item[w.ext].push(v);
                        break;
                    }
                }
            }
            var keys = Object.keys(item);
            for (var _f = 0, keys_1 = keys; _f < keys_1.length; _f++) {
                var k = keys_1[_f];
                item[k].sort(function (a, b) {
                    return a.rank - b.rank;
                });
            }
            keys.reverse();
            var rank = 0;
            for (var _g = 0, keys_2 = keys; _g < keys_2.length; _g++) {
                var k = keys_2[_g];
                if (rank < zone[k][0]) {
                    rank = zone[k][0];
                }
                // let rank = zone[k][0];
                for (var _h = 0, _j = item[k]; _h < _j.length; _h++) {
                    var v = _j[_h];
                    v.rank = rank;
                    ++rank;
                }
            }
            var fun = function (rank) {
                for (var key in zone) {
                    if (zone.hasOwnProperty(key)) {
                        var element = zone[key];
                        if (element[0] <= rank && element[1] >= rank) {
                            return Number(key);
                        }
                    }
                }
                return -1;
            };
            this.listRankData.removeAll();
            for (var i = 0; i < 50; ++i) {
                var rank_1 = i + 1;
                var info = new message.RankBaseItemInfo();
                info.rank = rank_1;
                info.value = fun(rank_1);
                info.baseInfo = null;
                this.listRankData.addItem(info);
                this.rankArr.push(info);
            }
            for (var key in item) {
                if (item.hasOwnProperty(key)) {
                    var element = item[key];
                    for (var _k = 0, element_1 = element; _k < element_1.length; _k++) {
                        var v = element_1[_k];
                        if (v.rank > this.listRankData.source.length)
                            continue;
                        this.listRankData.source[v.rank - 1] = v;
                        this.rankArr[v.rank - 1] = v;
                    }
                }
            }
            this.listRank.dataProvider = this.listRankData;
            this.listRank.itemRenderer = zj.Activity_RanklistMainItem;
        };
        Activity_RanklistMain.prototype.onBtnRule = function () {
            zj.loadUI(zj.Activity_RanklistRule).then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        Activity_RanklistMain.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        Activity_RanklistMain.prototype.removeShow = function () {
            var show = this.getChildByName("awards");
            if (show)
                this.removeChild(show);
        };
        Activity_RanklistMain.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "awards";
            this.addChild(show);
        };
        return Activity_RanklistMain;
    }(zj.Dialog));
    zj.Activity_RanklistMain = Activity_RanklistMain;
    __reflect(Activity_RanklistMain.prototype, "zj.Activity_RanklistMain");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_RanklistMain.js.map
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
     * @class 排行榜Item
     *
     * @author LianLei
     *
     * @date 2019-11-26
     */
    var Activity_RanklistMainItem = (function (_super) {
        __extends(Activity_RanklistMainItem, _super);
        function Activity_RanklistMainItem() {
            var _this = _super.call(this) || this;
            _this.listAwardData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/activity/Activity_RanklistMainItemSkin.exml";
            zj.cachekeys(zj.UIResource["Activity_RanklistMainItem"], null);
            return _this;
        }
        Activity_RanklistMainItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        Activity_RanklistMainItem.prototype.updateView = function (data) {
            this.imgRank.visible = data.rank <= 3;
            this.labelRank.visible = data.rank > 3;
            this.imgHead.visible = data.baseInfo == null;
            this.imgFrame.visible = data.baseInfo != null;
            this.imgIcon.visible = data.baseInfo != null;
            this.labelName.visible = data.baseInfo != null;
            if (data.rank <= 3)
                this.imgRank.source = zj.cachekey("ui_acitivity_rankinglist_paiming" + data.rank + "_png", this);
            this.labelRank.text = data.rank.toString();
            if (data.baseInfo != null) {
                var item_frame = zj.TableItemPicFrame.Item(data.baseInfo.picFrameId).path;
                var item_pic = zj.TableItemPic.Item(data.baseInfo.picId).path;
                this.imgFrame.source = zj.cachekey(item_frame, this);
                this.imgIcon.source = zj.cachekey(item_pic, this);
                this.labelName.text = data.baseInfo.name;
            }
            var activityInfo = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == message.ActivityType.ACT_TYPE_RANK;
            })[0];
            if (activityInfo == null || activityInfo.rankRewards == null)
                return;
            var rankInfo = activityInfo.rankRewards;
            var goodsInfo = [];
            for (var i = 0; i < rankInfo.length; i++) {
                if (data.rank >= rankInfo[i].rankZone[0] && data.rank <= rankInfo[i].rankZone[1]) {
                    goodsInfo = rankInfo[i].goodsInfo;
                    break;
                }
            }
            this.listAwardData.removeAll();
            for (var i = 0; i < goodsInfo.length; i++) {
                if (goodsInfo[i].goodsId != 0) {
                    this.listAwardData.addItem({ goodsInfo: goodsInfo[i] });
                }
            }
            this.listAward.dataProvider = this.listAwardData;
            this.listAward.itemRenderer = zj.Activity_RanklistAwardItem;
            // this.labelTime.text = "钻石消耗：" + data.value;
            var value = data.value > 100000 ? (((data.value / 1000) >>> 0) % 10 == 0 ? ((data.value / 10000) >>> 0) + "万" : (data.value / 10000).toFixed(1) + "万") : data.value.toString();
            this.labelTime.text = "钻石消耗：" + value;
            switch (activityInfo.consumeType) {
                case 1:
                    this.labelTime.text = "钻石消耗：" + value;
                    break;
                case 2:
                    this.labelTime.text = "体力消耗：" + value;
                    break;
                case 3:
                    this.labelTime.text = "金币消耗：" + value;
                    break;
                case 4:
                    this.labelTime.text = "总次数：" + value;
                    break;
                case 6:
                    this.labelTime.text = "格斗次数：" + value;
                    break;
                case 9:
                    this.labelTime.text = "采集数量：" + value;
                    break;
                case 10:
                    this.labelTime.text = "抽卡数量：" + value;
                    break;
                case 12:
                    this.labelTime.text = "击杀数量：" + value;
                    break;
                case 16:
                    this.labelTime.text = "抽奖数量：" + value;
                    break;
                case 17:
                    this.labelTime.text = "许愿次数" + value;
                    break;
            }
        };
        return Activity_RanklistMainItem;
    }(eui.ItemRenderer));
    zj.Activity_RanklistMainItem = Activity_RanklistMainItem;
    __reflect(Activity_RanklistMainItem.prototype, "zj.Activity_RanklistMainItem");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_RanklistMainItem.js.map
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
    //RelicRankList
    //hexiaowei
    // 2019/03/06
    var RelicRankList = (function (_super) {
        __extends(RelicRankList, _super);
        function RelicRankList() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/darkLand/RelicRankListSkin.exml";
            zj.cachekeys(zj.UIResource["RelicRankList"], null);
            return _this;
        }
        RelicRankList.prototype.dataChanged = function () {
            this.labelLevel.visible = false;
            var data = this.data;
            var str_level = "";
            var path_best = "";
            if (data.index <= 2) {
                path_best = zj.UIConfig.UIConfig_Rank.best[data.index];
                this.LabelFont.visible = false;
            }
            else {
                this.LabelFont.visible = true;
                str_level = data.index.toString();
                path_best = zj.UIConfig.UIConfig_Common.nothing;
            }
            var str_name = zj.Helper.StringFormat("%s", data.tableRankBase.baseInfo.name);
            var path_icon = zj.PlayerItemSystem.ItemPath(data.tableRankBase.baseInfo.picId);
            var path_frame = zj.PlayerItemSystem.ItemPath(data.tableRankBase.baseInfo.picFrameId);
            this.imgIcon.source = zj.cachekey(path_icon, this);
            this.imgFrame.source = zj.cachekey(path_frame, this);
            this.imgBest.source = zj.cachekey(zj.UIConfig.UIConfig_Rank.best[data.index], this);
            this.labelLevel.text = data.index.toString();
            this.LabelName.text = str_name;
            this.labelLevel.visible = true;
            if (data.father.rankType == 1) {
                this.labelLevel.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Login.serverDesSimple, zj.singLecraft.decodeGroupName(data.tableRankBase.baseInfo.group_name, "&", false), zj.singLecraft.decodeGroupName(data.tableRankBase.baseInfo.group_name, "&", true));
            }
            else {
                this.labelLevel.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Rank.pop_league, data.tableRankBase.baseInfo.leagueName);
            }
            this.LabelFont.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Rank.floor_next, (data.index + 1));
            var hurtPic = zj.UIConfig.UIConfig_DarkLand.relicHurtLevel2[zj.PlayerDarkSystem.GetLevelByHurt(data.father.relicId, data.tableRankBase.value)];
            this.imageHurt.source = zj.cachekey(hurtPic, this);
        };
        return RelicRankList;
    }(eui.ItemRenderer));
    zj.RelicRankList = RelicRankList;
    __reflect(RelicRankList.prototype, "zj.RelicRankList");
    //子项数据源
    var RelicRankListData = (function () {
        function RelicRankListData() {
        }
        return RelicRankListData;
    }());
    zj.RelicRankListData = RelicRankListData;
    __reflect(RelicRankListData.prototype, "zj.RelicRankListData");
})(zj || (zj = {}));
//# sourceMappingURL=RelicRankList.js.map
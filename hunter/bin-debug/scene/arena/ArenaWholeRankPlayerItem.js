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
     * @author
     *
     * @date 2019-1-29
     *
     * @class 跨服排行今日昨日排名子项界面
     */
    var ArenaWholeRankPlayerItem = (function (_super) {
        __extends(ArenaWholeRankPlayerItem, _super);
        function ArenaWholeRankPlayerItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/arena/ArenaWoleRankPlayerItemSkin.exml";
            zj.cachekeys(zj.UIResource["ArenaWholeRankPlayerItem"], null);
            return _this;
        }
        ArenaWholeRankPlayerItem.prototype.dataChanged = function () {
            var data = this.data;
            if (data.info == null) {
                return;
            }
            var colorIndex = zj.ConstantConfig_Common.Color.pk_older_color.length;
            if (data.father.type == 1 || data.father.type == 2) {
                var _a = zj.Table.FindR(zj.ConstantConfig_Common.Color.pk_older_color, function (k, v) {
                    return data.info.craft_rank >= v[1] && data.info.craft_rank <= v[2];
                }), _ = _a[0], findk = _a[1];
                if (findk != null) {
                    colorIndex = findk;
                }
            }
            else if (data.father.type == 4) {
                var _b = zj.Table.FindR(zj.ConstantConfig_Common.Color.pk_older_color, function (k, v) {
                    return data.info.craft_rank_self >= v[1] && data.info.craft_rank_self <= v[2];
                }), _ = _b[0], findk = _b[1];
                if (findk != null) {
                    colorIndex = findk;
                }
            }
            var level = zj.singLecraft.GetLevel(data.info.craft_score);
            var levelStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.rank.level, zj.TextsConfig.TextsConfig_Common.numCH[level - 1] || 0);
            var groupStr = "";
            if (data.info.group_name != "") {
                groupStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Login.serverDesSimple, zj.singLecraft.decodeGroupName(data.info.group_name, "&", false), zj.singLecraft.decodeGroupName(data.info.group_name, "&", true));
            }
            if (data.father.type == 1 || data.father.type == 2) {
                this.labelRank.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.rank.order, data.info.craft_rank);
            }
            this.labelPlayerName.text = data.info.role_name;
            this.labelQu.text = groupStr;
            this.labelGrade.text = levelStr;
            this.labelJiFen.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.rank.score, data.info.craft_score);
            if (data.info.title_id == 0) {
                this.labelChangehao.text = zj.TextsConfig.TextsConfig_Pk.rank.noTitile;
                this.imgTitle.visible = false;
            }
            else {
                this.labelChangehao.visible = data.info.title_id == 160001;
                this.imgTitle.visible = data.info.title_id != 160001;
                var name_1 = zj.TableItemTitle.Item(data.info.title_id).name;
                var logo = zj.TableItemTitle.Item(data.info.title_id).logo;
                this.labelChangehao.text = name_1;
                if (data.info.title_id != 160001) {
                    this.imgTitle.source = zj.cachekey(logo, this);
                }
            }
            if (colorIndex >= 0 && colorIndex < 5) {
                this.labelRank.textColor = zj.ConstantConfig_Common.Color.pk_older_color[colorIndex][0];
                this.labelPlayerName.textColor = zj.ConstantConfig_Common.Color.pk_older_color[colorIndex][0];
                this.labelQu.textColor = zj.ConstantConfig_Common.Color.pk_older_color[colorIndex][0];
                this.labelGrade.textColor = zj.ConstantConfig_Common.Color.pk_older_color[colorIndex][0];
                this.labelJiFen.textColor = zj.ConstantConfig_Common.Color.pk_older_color[colorIndex][0];
                this.labelChangehao.textColor = zj.ConstantConfig_Common.Color.pk_older_color[colorIndex][0];
            }
        };
        return ArenaWholeRankPlayerItem;
    }(eui.ItemRenderer));
    zj.ArenaWholeRankPlayerItem = ArenaWholeRankPlayerItem;
    __reflect(ArenaWholeRankPlayerItem.prototype, "zj.ArenaWholeRankPlayerItem");
    /**子项数据源 */
    var ArenaWholeRankPlayerItemData = (function () {
        function ArenaWholeRankPlayerItemData() {
        }
        return ArenaWholeRankPlayerItemData;
    }());
    zj.ArenaWholeRankPlayerItemData = ArenaWholeRankPlayerItemData;
    __reflect(ArenaWholeRankPlayerItemData.prototype, "zj.ArenaWholeRankPlayerItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaWholeRankPlayerItem.js.map
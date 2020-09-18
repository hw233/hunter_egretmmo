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
     * @date 2019-1-26
     *
     * @class 本服排行子项界面
     */
    var ArenaLadderRankItem = (function (_super) {
        __extends(ArenaLadderRankItem, _super);
        function ArenaLadderRankItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/arena/ArenaLadderRankItemSkin.exml";
            zj.cachekeys(zj.UIResource["ArenaLadderRankItem"], null);
            _this.labelPlayerLayer.visible = false;
            return _this;
        }
        ArenaLadderRankItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupCache);
            var data = this.data;
            var info = data.info;
            var index = data.index;
            this.imgbg.source = zj.cachekey("ui_frame_FrameImageB_png", this);
            var bestPath = "";
            if (info.rank <= 3) {
                bestPath = zj.UIConfig.UIConfig_Rank.best[info.rank - 1];
                this.LabelFont.visible = false;
            }
            else {
                bestPath = zj.UIConfig.UIConfig_Common.nothing;
                this.LabelFont.visible = true;
                this.LabelFont.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Rank.floor_next, info.rank);
            }
            var framePath = zj.PlayerItemSystem.ItemPath(info.baseInfo.picFrameId);
            var iconPath = zj.PlayerItemSystem.ItemPath(info.baseInfo.picId);
            this.imgFrame.source = zj.cachekey(framePath, this);
            this.imgIcon.source = zj.cachekey(iconPath, this);
            this.imgBest.source = zj.cachekey(bestPath, this);
            this.LabelName.text = info.baseInfo.name;
            if (index == 2) {
                this.labelLevel.text = "LV." + info.baseInfo.level.toString();
                this.labelLevel.textColor = zj.Helper.RGBToHex("r:0,g:0,b:0");
            }
            else if (index == 4 || index == 5) {
                this.labelLevel.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Tower.towerCur, (info.value - 1) % 10000);
                this.labelLevel.textColor = zj.Helper.RGBToHex("r:65,g:26,b:3");
            }
            zj.setCache(this.groupCache);
        };
        return ArenaLadderRankItem;
    }(eui.ItemRenderer));
    zj.ArenaLadderRankItem = ArenaLadderRankItem;
    __reflect(ArenaLadderRankItem.prototype, "zj.ArenaLadderRankItem");
    /** 子项数据源 */
    var ArenaLadderRankItemData = (function () {
        function ArenaLadderRankItemData() {
        }
        return ArenaLadderRankItemData;
    }());
    zj.ArenaLadderRankItemData = ArenaLadderRankItemData;
    __reflect(ArenaLadderRankItemData.prototype, "zj.ArenaLadderRankItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaLadderRankItem.js.map
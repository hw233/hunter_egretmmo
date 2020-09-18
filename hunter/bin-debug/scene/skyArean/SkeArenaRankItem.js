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
     * 2019.11.19
     * xingliwei
     * @class 天空竞技场排行Item
     */
    var SkeArenaRankItem = (function (_super) {
        __extends(SkeArenaRankItem, _super);
        function SkeArenaRankItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/skyArean/SkeArenaRankListSkin.exml";
            zj.cachekeys(zj.UIResource["SkeArenaRankItem"], null);
            return _this;
        }
        SkeArenaRankItem.prototype.dataChanged = function () {
            var data = this.data;
            var info = { name: data.info.baseInfo.name, paihang: data.info.rank, frame: zj.PlayerItemSystem.ItemPath(data.info.baseInfo.picFrameId), icon: zj.PlayerItemSystem.ItemPath(data.info.baseInfo.picId), wanjiacengshu: (data.info.value) % 10000 };
            this.imgFrame.source = info.frame;
            this.imgIcon.source = info.icon;
            this.PlayerName.text = info.name;
            if (info.paihang <= 3) {
                this.imgRank.visible = true;
                this.labelRank.visible = false;
                var str = "";
                if (info.paihang == 1) {
                    str = "ui_skyarean_1st_png";
                }
                else if (info.paihang == 2) {
                    str = "ui_skyarean_2nd_png";
                }
                else if (info.paihang == 3) {
                    str = "ui_skyarean_3rd_png";
                }
                this.imgRank.source = str;
            }
            else {
                this.imgRank.visible = false;
                this.labelRank.visible = true;
                this.labelRank.text = info.paihang.toString();
            }
            this.labelTier.text = "第" + info.wanjiacengshu + "层";
        };
        return SkeArenaRankItem;
    }(eui.ItemRenderer));
    zj.SkeArenaRankItem = SkeArenaRankItem;
    __reflect(SkeArenaRankItem.prototype, "zj.SkeArenaRankItem");
    var SkeArenaRankItemData = (function () {
        function SkeArenaRankItemData() {
            this.index = 1;
        }
        return SkeArenaRankItemData;
    }());
    zj.SkeArenaRankItemData = SkeArenaRankItemData;
    __reflect(SkeArenaRankItemData.prototype, "zj.SkeArenaRankItemData");
})(zj || (zj = {}));
//# sourceMappingURL=SkeArenaRankItem.js.map
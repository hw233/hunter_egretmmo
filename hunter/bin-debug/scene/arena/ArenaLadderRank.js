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
     * @author chen xi.
     *
     * @date 2019-1-25
     *
     * @class 排行界面
     */
    var ArenaLadderRank = (function (_super) {
        __extends(ArenaLadderRank, _super);
        function ArenaLadderRank() {
            var _this = _super.call(this) || this;
            _this.listRankData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/arena/ArenaLadderRankSkin.exml";
            _this.init();
            return _this;
        }
        ArenaLadderRank.prototype.init = function () {
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            var baseInfo = zj.Game.PlayerInfoSystem.BaseInfo;
            var iconPath = zj.PlayerItemSystem.ItemPath(baseInfo.picId);
            this.imgIcon.source = zj.cachekey(iconPath, this);
            var framePath = zj.PlayerItemSystem.ItemPath(baseInfo.picFrameId);
            this.imgFrame.source = zj.cachekey(framePath, this);
            this.LabelName.text = baseInfo.name;
            //this.labelValue.text = "LV." + baseInfo.level.toString();
            this.labelPlayerLayer.visible = false;
            this.listRank.itemRenderer = zj.ArenaLadderRankItem;
            this.listRank.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListRankTap, this);
        };
        /**
         * 设置基本信息
         *
         * @param index 索引下标
         * @param cb 回调函数
         */
        ArenaLadderRank.prototype.setInfo = function (index, cb) {
            var _this = this;
            zj.closeCache(this.groupCache);
            this.index = index;
            this.callback = cb;
            var start = 0;
            var count = zj.CommonConfig.rank_list_max - 1;
            zj.Game.PlayerArenaSystem.rankItemInfo(index, start, count).then(function (body) {
                // console.log("--- body = ", body);
                var lastIndex = body.rankItemsInfo.length - 1;
                var value = body.rankItemsInfo[lastIndex].value;
                if (index == 2) {
                    _this.imgTopLog.source = zj.cachekey("ui_arena_WordsTipServerArenaRank_png", _this);
                    _this.labelValue.text = "LV." + zj.Game.PlayerInfoSystem.BaseInfo.level.toString();
                    _this.groupMiRanking.y = 29;
                }
                else if (index == 4) {
                    _this.imgTopLog.source = zj.cachekey("ui_skyarean_WordsSkyRankTipLow_png", _this);
                    _this.labelValue.text = "当前层数：" + (value - 1);
                    ;
                    _this.groupMiRanking.y = 45;
                }
                else if (index == 5) {
                    _this.imgTopLog.source = zj.cachekey("ui_skyarean_WordsSkyRankTipHigh_png", _this);
                    _this.labelValue.text = "当前层数：" + (value - 1);
                    _this.groupMiRanking.y = 45;
                }
                _this.loadList(body.rankItemsInfo);
            });
        };
        ArenaLadderRank.prototype.loadList = function (itemsInfo) {
            if (itemsInfo.length == 0)
                return;
            var lastIndex = itemsInfo.length - 1;
            var rank = itemsInfo[lastIndex].rank;
            if (rank == 0) {
                this.labelLevelRanking.text = zj.TextsConfig.TextsConfig_Activity.Rank_Charge.out;
            }
            else {
                this.labelLevelRanking.text = rank.toString();
            }
            itemsInfo.splice(lastIndex, 1);
            this.listRankData.removeAll();
            for (var i = 0; i < itemsInfo.length; i++) {
                var data = new zj.ArenaLadderRankItemData();
                var v = itemsInfo[i];
                data.index = this.index;
                data.info = v;
                this.listRankData.addItem(data);
            }
            this.listRank.dataProvider = this.listRankData;
            zj.setCache(this.groupCache);
        };
        ArenaLadderRank.prototype.onListRankTap = function (e) {
            var data = this.listRankData.getItemAt(e.itemIndex);
            zj.loadUI(zj.RankDetail).then(function (ui) {
                ui.setInfo(data.info.baseInfo);
                ui.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        ArenaLadderRank.prototype.onBtnClose = function () {
            if (this.callback)
                this.callback();
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return ArenaLadderRank;
    }(zj.Dialog));
    zj.ArenaLadderRank = ArenaLadderRank;
    __reflect(ArenaLadderRank.prototype, "zj.ArenaLadderRank");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaLadderRank.js.map
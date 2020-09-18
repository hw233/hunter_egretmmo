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
    //yuqingchao
    var LeagueUnionRewarPreviewItemItem = (function (_super) {
        __extends(LeagueUnionRewarPreviewItemItem, _super);
        function LeagueUnionRewarPreviewItemItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueUnionRewarPreviewItemItemSkin.exml";
            zj.cachekeys(zj.UIResource["LeagueUnionRewarPreviewItemItem"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBegin, _this);
            return _this;
        }
        LeagueUnionRewarPreviewItemItem.prototype.touchBegin = function (e) {
            this.onChooseItemTap(this.data, e);
        };
        LeagueUnionRewarPreviewItemItem.prototype.dataChanged = function () {
            var id = this.data.i;
            var reward = this.data.reward;
            var j = this.data.j;
            var tbScore = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.leagueMatchScore + ".json");
            var showType;
            if (zj.PlayerItemSystem.ItemType(reward[j][0]) == message.EGoodsType.GOODS_TYPE_TITLE)
                showType = 1;
            this.imgBoard.source = zj.cachekey(zj.PlayerItemSystem.Set(reward[j][0], showType, reward[j][1]).Frame, this);
            this.imgIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(reward[j][0]), this);
            if (reward[j][1] >= 100000) {
                this.lbNum.text = "x" + (reward[j][1] / 10000) + "万";
            }
            else {
                this.lbNum.text = "x" + reward[j][1];
            }
        };
        // 鼠标点击 掉落 材料说明
        LeagueUnionRewarPreviewItemItem.prototype.onChooseItemTap = function (data, e) {
            var num = data.j;
            var reward = data.reward;
            var id = data.i;
            var type = zj.PlayerItemSystem.ItemType(reward[num][0]);
            var index = data.j;
            var itemY;
            var count = 0;
            if (e.stageY >= data.father.height / 2) {
                itemY = e.stageY - e.localY;
                count = 1;
            }
            else {
                itemY = e.stageY + this.skin.height - e.localY;
            }
            var dialog = this.getChildByName("Item-skill-common");
            if (dialog)
                this.removeChild(dialog);
            if (type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                zj.loadUI(zj.Common_DesRandom).then(function (dialog) {
                    dialog.x = 270 + index * 80;
                    if (count == 1) {
                        dialog.y = itemY - dialog.height;
                    }
                    else
                        dialog.y = itemY;
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(reward[num][0], reward[num][1]);
                    data.father.addChild(dialog);
                });
            }
            else if (type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                    dialog.x = 270 + index * 80;
                    if (count == 1) {
                        dialog.y = itemY - dialog.height;
                    }
                    else
                        dialog.y = itemY;
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(reward[num][0], reward[num][1]);
                    data.father.addChild(dialog);
                });
            }
            else {
                zj.loadUI(zj.CommonDesProp).then(function (dialog) {
                    dialog.x = 270 + index * 80;
                    if (count == 1) {
                        dialog.y = itemY - dialog.height;
                    }
                    else
                        dialog.y = itemY;
                    dialog.name = "Item-skill-common";
                    dialog.init(reward[num][0], reward[num][1]);
                    data.father.addChild(dialog);
                });
            }
        };
        return LeagueUnionRewarPreviewItemItem;
    }(eui.ItemRenderer));
    zj.LeagueUnionRewarPreviewItemItem = LeagueUnionRewarPreviewItemItem;
    __reflect(LeagueUnionRewarPreviewItemItem.prototype, "zj.LeagueUnionRewarPreviewItemItem");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueUnionRewarPreviewItemItem.js.map
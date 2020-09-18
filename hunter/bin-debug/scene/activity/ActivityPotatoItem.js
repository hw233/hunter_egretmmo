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
    //ActivityPotatoItem
    //yuqingchao
    //2019.04.02
    var ActivityPotatoItem = (function (_super) {
        __extends(ActivityPotatoItem, _super);
        function ActivityPotatoItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityPotatoItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityPotatoItem"], null);
            return _this;
        }
        ActivityPotatoItem.prototype.dataChanged = function () {
            this.info = this.data.info;
            this.potatoList = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.itemPotato + ".json");
            this.setInfoItem();
        };
        ActivityPotatoItem.prototype.setInfoItem = function () {
            var itemPiece = zj.PlayerItemSystem.Set(this.info[0], 1, this.info[1]);
            var str = itemPiece.Info.name + "x" + this.info[1];
            this.lbName.text = str;
            this.lbName.textColor = 0xFF2600;
            var potatoId = itemPiece.Info.compose_cards[1];
            var potatoTbl;
            for (var k in this.potatoList) {
                var v = this.potatoList[k];
                if (potatoId == Number(k))
                    potatoTbl = v;
            }
            if (potatoTbl == null)
                return;
            var _a = zj.PlayerCardSystem.GetItemFrame(potatoId), outFrame = _a[2];
            var collectNum = itemPiece.Info.compose_counts;
            this.imgCardType.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_type_small[potatoTbl.type - 1], this);
            this.lbCardName.text = potatoTbl.name;
            this.lbNum.text = potatoTbl.num;
            this.imgCard.source = zj.cachekey(potatoTbl.paths, this);
            this.imgCardBoard.source = zj.cachekey(outFrame, this);
            this.lbTips.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter_Card.collect, collectNum);
            var baseStr = zj.PlayerCardSystem.GetCardBaseAttri(potatoTbl.id, potatoTbl.star, 1);
            this.lbAttriMain.text = baseStr[0].toString();
            var _b = zj.PlayerCardSystem.GetCardBaseAttri(potatoTbl.id, zj.CommonConfig.card_max_star, zj.CommonConfig.card_star_max_level[zj.CommonConfig.card_star_max_level.length - 1]), baseStrFull = _b[0], baseStrFullNum = _b[1];
            this.lbAttriMainFull.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_full_attr, zj.CommonConfig.card_star_max_level[zj.CommonConfig.card_star_max_level.length - 1], baseStrFullNum[0]);
            zj.Helper.NodeStarByAlignLeft(this.groupStar, potatoTbl.star, zj.CommonConfig.card_max_star, 1, false, zj.UIConfig.UIConfig_Hunter_Card.card_star);
            var addStr = zj.PlayerCardSystem.GetAddStrNotGet(potatoTbl);
            this.arrayCollection = new eui.ArrayCollection();
            for (var i = 0; i < addStr.length; i++) {
                // let data = new HunterCardAttriItemData();
                // data.index = i;
                // data.description = addStr[i];
                // data.cardInfo = potatoTbl;
                // data.width = this.scrollerAttribute.width;
                // data.fatherArray = addStr.length;
                // this.arrayCollection.addItem(data);
                this.arrayCollection.addItem({
                    addStr: addStr[i],
                });
            }
            this.lstAttri.dataProvider = this.arrayCollection;
            this.lstAttri.itemRenderer = zj.ActivityPotatoItemB;
        };
        return ActivityPotatoItem;
    }(eui.ItemRenderer));
    zj.ActivityPotatoItem = ActivityPotatoItem;
    __reflect(ActivityPotatoItem.prototype, "zj.ActivityPotatoItem");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityPotatoItem.js.map
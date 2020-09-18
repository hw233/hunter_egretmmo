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
    // wang shen zhuo
    // HXH_MoraMainEndWinItem
    // 2019.05.24
    var MoraMainEndWinItem = (function (_super) {
        __extends(MoraMainEndWinItem, _super);
        function MoraMainEndWinItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/fishing/MoraMainEndWinItemSkin.exml";
            zj.cachekeys(zj.UIResource["MoraMainEndWinItem"], null);
            _this.groupMain.x = -350;
            _this.groupMain.visible = false;
            return _this;
        }
        MoraMainEndWinItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupMain);
            this.SetItemInfo(this.data.index, this.data.mora, this.data.isshow, this.data.good);
            this.SetInfoTween(this.data.index, this.data.isTween);
            zj.setCache(this.groupMain);
        };
        MoraMainEndWinItem.prototype.SetItemInfo = function (index, mora, win, hero) {
            var path_head = zj.PlayerHunterSystem.Head(hero);
            this.imageIcon.source = zj.cachekey(path_head, this);
            this.imagePlayer.source = zj.cachekey(zj.UIConfig.UIConfig_WonderRunes.MoraSmallIcon[mora], this);
            if (win) {
                this.imageWinOrLose.source = zj.cachekey(zj.UIConfig.UIConfig_WonderRunes.winOrLose[1], this);
            }
            else {
                this.imageWinOrLose.source = zj.cachekey(zj.UIConfig.UIConfig_WonderRunes.winOrLose[2], this);
            }
        };
        MoraMainEndWinItem.prototype.SetInfoTween = function (index, isTween) {
            if (isTween) {
                egret.Tween.get(this.groupMain).wait(index * 210)
                    .to({ visible: true }, 0)
                    .to({ x: -350 }, 0)
                    .to({ x: 0 }, 200, egret.Ease.sineInOut);
            }
            else {
                this.groupMain.x = 0;
                this.groupMain.visible = true;
            }
        };
        return MoraMainEndWinItem;
    }(eui.ItemRenderer));
    zj.MoraMainEndWinItem = MoraMainEndWinItem;
    __reflect(MoraMainEndWinItem.prototype, "zj.MoraMainEndWinItem");
    var MoraMainEndWinItemData = (function () {
        function MoraMainEndWinItemData() {
            this.isTween = false;
        }
        return MoraMainEndWinItemData;
    }());
    zj.MoraMainEndWinItemData = MoraMainEndWinItemData;
    __reflect(MoraMainEndWinItemData.prototype, "zj.MoraMainEndWinItemData");
})(zj || (zj = {}));
//# sourceMappingURL=MoraMainEndWinItem.js.map
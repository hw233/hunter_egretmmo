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
    // HXH_MoraMainEndLoseItem
    // 2019.05.24
    var MoraMainEndLoseItem = (function (_super) {
        __extends(MoraMainEndLoseItem, _super);
        function MoraMainEndLoseItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/fishing/MoraMainEndLoseItemSkin.exml";
            zj.cachekeys(zj.UIResource["MoraMainEndLoseItem"], null);
            _this.groupMain.x = 350;
            _this.groupMain.visible = false;
            return _this;
        }
        MoraMainEndLoseItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupMain);
            this.SetItemInfo(this.data.index, this.data.mora, this.data.isshow, this.data.good);
            this.SetInfoTween(this.data.index, this.data.isTween);
            zj.setCache(this.groupMain);
        };
        MoraMainEndLoseItem.prototype.SetItemInfo = function (index, mora, win, hero) {
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
        MoraMainEndLoseItem.prototype.SetInfoTween = function (index, isTween) {
            if (isTween) {
                egret.Tween.get(this.groupMain).wait(index * 210)
                    .to({ visible: true }, 0)
                    .to({ x: 350 }, 0)
                    .to({ x: 0 }, 200, egret.Ease.sineInOut);
            }
            else {
                this.groupMain.x = 0;
                this.groupMain.visible = true;
            }
        };
        return MoraMainEndLoseItem;
    }(eui.ItemRenderer));
    zj.MoraMainEndLoseItem = MoraMainEndLoseItem;
    __reflect(MoraMainEndLoseItem.prototype, "zj.MoraMainEndLoseItem");
    var MoraMainEndLoseItemData = (function () {
        function MoraMainEndLoseItemData() {
            this.isTween = false;
        }
        return MoraMainEndLoseItemData;
    }());
    zj.MoraMainEndLoseItemData = MoraMainEndLoseItemData;
    __reflect(MoraMainEndLoseItemData.prototype, "zj.MoraMainEndLoseItemData");
})(zj || (zj = {}));
//# sourceMappingURL=MoraMainEndLoseItem.js.map
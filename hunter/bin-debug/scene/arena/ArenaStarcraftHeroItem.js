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
     * @author xing li wei
     *
     * @date 2019-5-8
     *
     * @class 跨服格斗结算面板上的人物展示子项类
     */
    var ArenaStarcraftHeroItem = (function (_super) {
        __extends(ArenaStarcraftHeroItem, _super);
        function ArenaStarcraftHeroItem() {
            var _this = _super.call(this) || this;
            _this.generalInfo = null;
            _this.bEnemy = false;
            _this.skinName = "resource/skins/arena/ArenaStarcraftHeroItemSkin.exml";
            // this.SpriteSupport.visible = false
            zj.cachekeys(zj.UIResource["ArenaStarcraftHeroItem"], null);
            return _this;
        }
        ArenaStarcraftHeroItem.prototype.setInfo = function (id, isSupport) {
            this.NodeVoid.visible = (id != 0);
            // this.SpriteSupport.visible = isSupport;
            if (id == 0) {
                return;
            }
            this.generalInfo = zj.Game.PlayerHunterSystem.allHuntersMap()[id];
            this.fresh();
        };
        ArenaStarcraftHeroItem.prototype.fresh = function () {
            var headPath = zj.PlayerHunterSystem.Head(this.generalInfo);
            if (this.bEnemy == true) {
                // this.SpriteHead
            }
            this.SpriteHead.source = zj.cachekey(headPath, this);
            this.SpriteBoard.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[this.generalInfo.step], this);
            this.LabelLevel.text = this.generalInfo.level;
            this.SpriteStar1.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroStar[this.generalInfo.star], this);
        };
        ArenaStarcraftHeroItem.prototype.getGroup = function () {
            return this.LayerName;
        };
        ArenaStarcraftHeroItem.prototype.setGeneralInfo = function (generalInfo, isSupport, bEnemy) {
            this.generalInfo = generalInfo;
            this.bEnemy = bEnemy;
            var id = 0;
            if (this.generalInfo != null) {
                id = this.generalInfo.general_id;
            }
            this.NodeVoid.visible = (id != 0);
            if (!isSupport) {
                // this.SpriteSupport.visible = false;
            }
            else {
                // this.SpriteSupport.source = UIConfig.UIConfig_Role.inFormationSimpleWord[3];
            }
            if (id == 0) {
                return;
            }
            this.fresh();
        };
        return ArenaStarcraftHeroItem;
    }(zj.UI));
    zj.ArenaStarcraftHeroItem = ArenaStarcraftHeroItem;
    __reflect(ArenaStarcraftHeroItem.prototype, "zj.ArenaStarcraftHeroItem");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaStarcraftHeroItem.js.map
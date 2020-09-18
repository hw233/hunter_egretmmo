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
     * @date 2018-4-8
     *
     * @class 格斗场段位提升提示窗口
     */
    var ArenaWholeGradeUp = (function (_super) {
        __extends(ArenaWholeGradeUp, _super);
        function ArenaWholeGradeUp() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/arena/ArenaWholeGradeUpSkin.exml";
            _this.init();
            return _this;
        }
        ArenaWholeGradeUp.prototype.init = function () {
            var _this = this;
            egret.Tween.get(this).wait(1000).call(function () {
                _this.imgBG.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.callBack, _this);
            });
        };
        ArenaWholeGradeUp.prototype.setInfo = function (plevel, nlevel) {
            var bincrease = nlevel > plevel;
            var nincrease = bincrease && 1 || 2;
            var path = zj.UIConfig.UIConfig_Pk.level_change[nincrease];
            if (bincrease) {
                this.AddAni(this.SpriteGet, path);
            }
            else {
                this.SpriteGet.source = zj.cachekey(path, this);
                this.SpriteGetB.source = zj.cachekey(path, this);
            }
            var ppic = zj.TableSinglecraftScore.Item(plevel).title;
            var npic = zj.TableSinglecraftScore.Item(nlevel).title;
            this.SpriteGrade.source = zj.cachekey(ppic, this);
            if (bincrease) {
                this.SetGradeChangeUp(npic);
            }
            else {
                this.SetGradeChangeDown(npic);
            }
        };
        ArenaWholeGradeUp.prototype.callBack = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.callBack, this);
            this.close();
        };
        ArenaWholeGradeUp.prototype.AddAni = function (node, path, scaling, seconds) {
            node.visible = false;
            var scaleSold = node.scaleX;
            var cx = node.x;
            var cy = node.y;
            var spriteBg = this.SpriteGetB;
            node.source = zj.cachekey(path, this);
            spriteBg.source = zj.cachekey(path, this);
            spriteBg.visible = false;
            spriteBg.scaleX = spriteBg.scaleY = 0.85 * scaleSold;
        };
        ArenaWholeGradeUp.prototype.SetGradeChangeUp = function (path) {
        };
        ArenaWholeGradeUp.prototype.SetGradeChangeDown = function (path) {
        };
        return ArenaWholeGradeUp;
    }(zj.Dialog));
    zj.ArenaWholeGradeUp = ArenaWholeGradeUp;
    __reflect(ArenaWholeGradeUp.prototype, "zj.ArenaWholeGradeUp");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaWholeGradeUp.js.map
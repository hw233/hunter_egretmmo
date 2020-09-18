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
    //TavernGetGeneralPop
    //hexiaowei
    //2018/11/15
    var TavernGetGeneralPop = (function (_super) {
        __extends(TavernGetGeneralPop, _super);
        function TavernGetGeneralPop() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/tavern/TavernGetGeneralPopSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            //this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonClose, this);
            _this.group1.alpha = 0;
            _this.info();
            return _this;
        }
        TavernGetGeneralPop.prototype.init = function (tavern) {
            this.tavern = tavern;
        };
        TavernGetGeneralPop.prototype.info = function () {
        };
        TavernGetGeneralPop.prototype.onGroupParent = function () {
            this.close();
            //this.tavern.removeChild(this);
        };
        TavernGetGeneralPop.prototype.setInof = function (info) {
            this.taverninfo = info;
            var goodsId = info.goodsId;
            var type = zj.PlayerHunterSystem.Table(goodsId).type;
            this.image1.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pokedex.dpt[type], this);
            // let des = PlayerTalentSystem.Des(PlayerHunterSystem.Table(goodsId).pokedex_attri, 1);
            this.labelHunExplain.text = ""; //TextsConfig.TextsConfig_Hunter.hunter_type_Pokedex[type - 1] + des;
            /*
            egret.Tween.get(this.group1)
                  .to({x:139,y:370}, 2000, egret.Ease.backOut)
                  .to({x:139,y:350}, 500, egret.Ease.backOut)
                  .call(()=>{this._tavern.removeChild(this);});
            */
        };
        return TavernGetGeneralPop;
    }(zj.UI));
    zj.TavernGetGeneralPop = TavernGetGeneralPop;
    __reflect(TavernGetGeneralPop.prototype, "zj.TavernGetGeneralPop");
})(zj || (zj = {}));
//# sourceMappingURL=TavernGetGeneralPop.js.map
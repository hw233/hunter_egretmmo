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
    //HeroesPokedexItem
    //hexiaowei
    // 2018/12/06
    var HeroesPokedexItem = (function (_super) {
        __extends(HeroesPokedexItem, _super);
        function HeroesPokedexItem(pokedxScene) {
            var _this = _super.call(this) || this;
            _this.isdown = false;
            zj.cachekeys(zj.UIResource["HeroesPokedexItem"], null);
            _this._pokedxScene = pokedxScene;
            _this.skinName = "resource/skins/archive/HeroesPokedexItemSkin.exml";
            return _this;
        }
        HeroesPokedexItem.prototype.dataChanged = function () {
            var mapRoleIns = zj.TableMapRole.Item(this.data.mapRoleId);
            var generalIns = zj.PlayerHunterSystem.Table(this.data.generalId);
            this.imgSpriteHunterBoard.visible = false;
            this.imgSpriteHunterName.source = zj.cachekey(generalIns.name_pic, this);
            this.imgSpriteHeroIcon.source = zj.cachekey(mapRoleIns.body_path, this);
            this.imgSpriteHeroGrade.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_grade[this.data.aptitude], this);
            this.imgSpriteHunterAttType.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pokedex.feature[this.data.feature], this);
            this.isdown = this.data.isdown;
            this.imgSel.visible = false;
            this.imgSpriteHunterBoard.visible = false;
            if (this.selected) {
                this.imgSpriteHunterBoard.visible = true;
            }
            else {
                this.imgSel.visible = true;
            }
            if (this.data.isHave != true) {
                zj.Helper.SetImageFilterColor(this.imgSpriteHeroIcon, "black");
            }
            else {
                zj.Helper.SetImageFilterColor(this.imgSpriteHeroIcon);
            }
            // let des = PlayerTalentSystem.Des(generalIns.pokedex_attri, 1);
            this.labelHeroAttri.text = ""; //des;
            // 页面红点
            if (!this.data.isHave) {
                this.imgSpriteIconRed.visible = false;
            }
            else {
                this.imgSpriteIconRed.visible = !zj.PlayerHunterHistorySystem.GetPokedexKey(this.data.generalId);
            }
        };
        HeroesPokedexItem.prototype.FreshTips = function () {
            var general_Id = this.data.generalId;
            if (!zj.PlayerHunterHistorySystem.GetPokedexKey(general_Id)) {
                zj.PlayerHunterHistorySystem.SavePokedexKey(general_Id, 1);
            }
            if (this.imgSpriteIconRed != null && this.data.isHave) {
                this.imgSpriteIconRed.visible = false;
            }
        };
        return HeroesPokedexItem;
    }(eui.ItemRenderer));
    zj.HeroesPokedexItem = HeroesPokedexItem;
    __reflect(HeroesPokedexItem.prototype, "zj.HeroesPokedexItem");
})(zj || (zj = {}));
//# sourceMappingURL=HeroesPokedexItem.js.map
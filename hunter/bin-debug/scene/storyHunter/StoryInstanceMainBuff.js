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
    // HXH_StoryInstanceMainBuff
    // wangshenzhuo
    // 2019-07-18
    var StoryInstanceMainBuff = (function (_super) {
        __extends(StoryInstanceMainBuff, _super);
        function StoryInstanceMainBuff() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/storyHunter/StoryInstanceMainBuffSkin.exml";
            zj.cachekeys(zj.UIResource["StoryInstanceMainBuff"], null);
            return _this;
        }
        StoryInstanceMainBuff.prototype.dataChanged = function () {
            this.imageBuff.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.data.goodsId), this);
            this.labelBuffNum.text = "+" + this.data.per + "%";
        };
        return StoryInstanceMainBuff;
    }(eui.ItemRenderer));
    zj.StoryInstanceMainBuff = StoryInstanceMainBuff;
    __reflect(StoryInstanceMainBuff.prototype, "zj.StoryInstanceMainBuff");
    //子项数据源
    var StoryInstanceMainBuffData = (function () {
        function StoryInstanceMainBuffData() {
        }
        return StoryInstanceMainBuffData;
    }());
    zj.StoryInstanceMainBuffData = StoryInstanceMainBuffData;
    __reflect(StoryInstanceMainBuffData.prototype, "zj.StoryInstanceMainBuffData");
})(zj || (zj = {}));
//# sourceMappingURL=StoryInstanceMainBuff.js.map
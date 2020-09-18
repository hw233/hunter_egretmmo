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
    var MainCityTouchs = (function (_super) {
        __extends(MainCityTouchs, _super);
        function MainCityTouchs() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/main/MainCityTouchsSkin.exml";
            return _this;
        }
        MainCityTouchs.prototype.getBanner = function (stage) {
            var bannerGroup = this["banner"];
            // banner.parent.removeChild(banner);
            var group = stage["group" + "_node_map_title"];
            // group.addChild(banner);
            var banner = zj.newUI(zj.MainCityBanner);
            banner.init();
            banner.x = bannerGroup.x;
            banner.y = bannerGroup.y;
            group.addChild(banner);
            return banner;
        };
        MainCityTouchs.prototype.initTitles = function (stage) {
            var result = {};
            var list = zj.MainCityTouchTitle.funcIdList;
            for (var i = 0; i < list.length; ++i) {
                var touchGroup = this["touchGroup" + list[i]];
                var touchTitle = this["touchTitle" + list[i]];
                if (touchGroup && touchTitle && touchTitle.parent == touchGroup) {
                    var lname = touchGroup.parent.name;
                    var group = stage[lname + "_node_map_title"]; //_node_map_orgin
                    touchGroup.parent.removeChild(touchGroup);
                    group.addChild(touchGroup);
                    touchTitle.initGroup(list[i], touchGroup);
                    result[list[i]] = touchTitle;
                }
                else {
                    egret.error("MainTouchTouchs - init - error: " + list[i]);
                }
            }
            return result;
        };
        MainCityTouchs.prototype.initMainAnis = function (key) {
            var result = [];
            var idx = 0;
            while (this[key + idx]) {
                var item = this[key + idx];
                item.touchEnabled = false;
                if (item) {
                    result.push([item.parent.name, item]);
                }
                ++idx;
            }
            if (result.length == 0) {
                result = null;
            }
            return result;
        };
        MainCityTouchs.key_ani = "ani";
        MainCityTouchs.key_img_flash = "imgFlash";
        MainCityTouchs.key_img_move = "imgMove";
        MainCityTouchs.key_img_cloud = "imgCloud";
        MainCityTouchs.key_img_static = "imgStatic";
        MainCityTouchs.key_img_car = "imgCar";
        MainCityTouchs.key_dragon = "dragon";
        MainCityTouchs.key_img_light = "imgLight";
        return MainCityTouchs;
    }(zj.UI));
    zj.MainCityTouchs = MainCityTouchs;
    __reflect(MainCityTouchs.prototype, "zj.MainCityTouchs");
})(zj || (zj = {}));
//# sourceMappingURL=MainCityTouchs.js.map
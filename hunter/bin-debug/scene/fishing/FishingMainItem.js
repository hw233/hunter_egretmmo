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
    //FishingMainItem
    //yuqingchao
    //2019.05.16
    //FishingMainItem
    //yuqingchao
    var FishingMainItem = (function (_super) {
        __extends(FishingMainItem, _super);
        function FishingMainItem() {
            var _this = _super.call(this) || this;
            _this.id = null;
            //
            //yuqingchao
            _this.skinName = "resource/skins/fishing/FishingMainItemSkin.exml";
            zj.cachekeys(zj.UIResource["FishingMainItem"], null);
            return _this;
        }
        FishingMainItem.prototype.dataChanged = function () {
            this.id = this.data.id;
            this.setFishInfo();
        };
        FishingMainItem.prototype.setFishInfo = function () {
            var fishTbl = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.leagueFish + ".json");
            var fish = fishTbl[this.id];
            this.imgLable.source = zj.cachekey(fish.image_title, this);
            this.imgBoard.source = zj.cachekey(fish.image_board, this);
            this.imgFish.source = zj.cachekey(fish.fish_image, this);
            var costTime = fish.fishing_duration;
            this.lbTime.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.fish_costTime, this.formatTime(costTime));
        };
        FishingMainItem.prototype.formatTime = function (sec) {
            var time = null;
            if (sec < 60) {
                time = sec + zj.TextsConfig.TextConfig_League.fish_costTime_sec;
            }
            else if (sec % 60 != 0) {
                time = Math.ceil(sec / 60) + zj.TextsConfig.TextConfig_League.fish_costTime_min + sec % 60 + zj.TextsConfig.TextConfig_League.fish_costTime_sec;
            }
            else {
                time = Math.ceil(sec / 60) + zj.TextsConfig.TextConfig_League.fish_costTime_min;
            }
            return time;
        };
        return FishingMainItem;
    }(eui.ItemRenderer));
    zj.FishingMainItem = FishingMainItem;
    __reflect(FishingMainItem.prototype, "zj.FishingMainItem");
})(zj || (zj = {}));
//# sourceMappingURL=FishingMainItem.js.map
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
    //DoubleColorViewEndItem
    //yuqingchao
    var DoubleColorViewEndItem = (function (_super) {
        __extends(DoubleColorViewEndItem, _super);
        function DoubleColorViewEndItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/fishing/DoubleColorViewEndItemSkin.exml";
            zj.cachekeys(zj.UIResource["DoubleColorViewAwardItem"], null);
            return _this;
        }
        DoubleColorViewEndItem.prototype.dataChanged = function () {
            var info = this.data.info;
            zj.closeCache(this.groupCache);
            var num = [];
            var people = [];
            var time = null;
            if (info != null) {
                var fruit = zj.Game.PlayerDoubleBallSystem.serverFruit(info.redFruit, info.blueFruit);
                time = this.time(info.creatTime);
                for (var i = 0; i < 5; i++) {
                    num.push(this.fruitId(fruit[i]));
                }
                people[1] = info.bestCount;
                people[2] = info.firstCount;
                people[3] = info.secondCount;
            }
            for (var i = 1; i < 6; i++) {
                this["lbFruit" + i].text = num[i - 1];
            }
            for (var n = 1; n < 4; n++) {
                this["lbAwardPlayer" + n].text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_DoubleColor.reward_people[n - 1], people[n]);
            }
            var des = "%d-" + "%d-" + "%d";
            if (time.M < 10) {
                des = "%d-" + "0" + "%d-" + "%d";
                if (time.D < 10) {
                    des = "%d-" + "0" + "%d-" + "0" + "%d";
                }
            }
            else if (time.D < 10) {
                des = "%d-" + "%d-" + "0" + "%d";
            }
            this.lbTIme.text = zj.Helper.StringFormat(des, time.Y, time.M, time.D);
            zj.setCache(this.groupCache);
        };
        DoubleColorViewEndItem.prototype.fruitId = function (id) {
            return id % 100;
        };
        //时间戳转换为字符串格式
        DoubleColorViewEndItem.prototype.time = function (timestamp) {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            return { Y: Y, M: M, D: D }; //年月日时分秒
        };
        return DoubleColorViewEndItem;
    }(eui.ItemRenderer));
    zj.DoubleColorViewEndItem = DoubleColorViewEndItem;
    __reflect(DoubleColorViewEndItem.prototype, "zj.DoubleColorViewEndItem");
})(zj || (zj = {}));
//# sourceMappingURL=DoubleColorViewEndItem.js.map
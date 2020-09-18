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
    //RelicMain (遗迹探索)
    //hexiaowei
    // 2019/03/05
    var RelicMain = (function (_super) {
        __extends(RelicMain, _super);
        function RelicMain() {
            var _this = _super.call(this) || this;
            _this.selectedIndex = 0;
            _this.b_open = false;
            _this.teachOpenIndex = 0;
            _this.itemList = [];
            _this.skinName = "resource/skins/darkLand/RelicMainSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.buttonToken.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonToken, _this);
            _this.buttonRule.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonRule, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.updateToken, _this);
            _this.setInfoList();
            return _this;
        }
        RelicMain.prototype.setInfoList = function () {
            var relicTbl = zj.TableInstanceRelic.Table();
            this.listTableView.selectedIndex = 0; // 默认选中
            this.listTableView.itemRenderer = zj.RelicMainItem; //
            this.selectedItem = new eui.ArrayCollection();
            for (var k in relicTbl) {
                var v = relicTbl[k];
                var data = new zj.RelicMainItemData();
                data.index = Number(k) + 1;
                data.item = v;
                data.father = this;
                this.selectedItem.addItem(data);
            }
            this.listTableView.dataProvider = this.selectedItem;
            this.selectedIndex = this.listTableView.selectedIndex;
            var OpenIndex = this.teachOpenIndex;
            this.updateToken();
        };
        RelicMain.prototype.updateToken = function () {
            //鑽石
            if (zj.Game.PlayerInfoSystem.Token > 100000) {
                this.labelToken.text = (zj.Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
            }
            else {
                this.labelToken.text = zj.Game.PlayerInfoSystem.Token.toString();
            }
            //晶石
            var id = message.EResourceType.RESOURCE_RELIC_COIN;
            var str_res = zj.PlayerItemSystem.Str_Resoure(id);
            this.labelRElicCoin.text = str_res;
        };
        RelicMain.prototype.onButtonToken = function () {
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init();
            });
        };
        RelicMain.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        RelicMain.prototype.getItemList = function () {
            this.itemList = [];
            var relicTbl = zj.TableInstanceRelic.Table();
            for (var k in relicTbl) {
                var item = this.listTableView.getElementAt(Number(k) - 1);
                this.itemList.push(item);
            }
        };
        RelicMain.prototype.onButtonRule = function () {
            zj.toast_warning("暂未开启！");
        };
        return RelicMain;
    }(zj.Scene));
    zj.RelicMain = RelicMain;
    __reflect(RelicMain.prototype, "zj.RelicMain");
})(zj || (zj = {}));
//# sourceMappingURL=RelicMain.js.map
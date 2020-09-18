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
    // SkeArenaDropInfoDialog(首领奖励)
    // hexiaowei
    // 20019/02/23
    var EnumTower;
    (function (EnumTower) {
        EnumTower[EnumTower["Low"] = 0] = "Low";
        EnumTower[EnumTower["High"] = 1] = "High";
    })(EnumTower || (EnumTower = {}));
    var SkeArenaDropInfoDialog = (function (_super) {
        __extends(SkeArenaDropInfoDialog, _super);
        function SkeArenaDropInfoDialog() {
            var _this = _super.call(this) || this;
            _this.towerState = 0;
            _this.key_floor = 10;
            _this.skinName = "resource/skins/skyArean/SkeArenaDropInfoSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.buttonLow.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onButtonLowScale, _this);
            _this.buttonLow.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonLow, _this);
            _this.buttonHigh.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onButtonHighScale, _this);
            _this.buttonHigh.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonHigh, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveGroup, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            _this.inIt();
            _this.setInfo();
            return _this;
        }
        ;
        SkeArenaDropInfoDialog.prototype.inIt = function () {
            this.towerState = EnumTower.Low;
            //this.InitButtonShow();
            this.buttonLow.enabled = false;
            this.buttonHigh.enabled = true;
        };
        SkeArenaDropInfoDialog.prototype.InitButtonShow = function () {
            var bShow = false;
            // if(Game.PlayerTowerSystem.towerInfo.high_tower_cur != null && Game.PlayerTowerSystem.towerInfo.towerCur != null){
            //      bShow = true;
            // }
            this.buttonLow.enabled = bShow;
            this.buttonHigh.enabled = bShow;
        };
        SkeArenaDropInfoDialog.prototype.setInfo = function () {
            if (this.towerState == 0) {
                this.buttonLow.enabled = false;
                this.buttonHigh.enabled = true;
            }
            else {
                this.buttonLow.enabled = true;
                this.buttonHigh.enabled = false;
            }
            var tbl = zj.PlayerTowerSystem.floorInfo();
            var key_floor_tbl = [];
            for (var k in tbl[this.towerState]) {
                var v = tbl[this.towerState][k];
                if ((Number(k) + 1) % this.key_floor == 0) {
                    key_floor_tbl.push(v);
                }
            }
            key_floor_tbl.sort(function (a, b) { return a.id - b.id; });
            this.listViewDrop.itemRenderer = zj.SkeArenaDropInfoItem; //
            this.dropInfoItem = new eui.ArrayCollection();
            for (var i = 0; i < key_floor_tbl.length; i++) {
                var data = new zj.SkeArenaDropInfoItemData();
                data.dropInfo = key_floor_tbl[i];
                data.index = i;
                data.father = this;
                this.dropInfoItem.addItem(data);
            }
            this.listViewDrop.dataProvider = this.dropInfoItem;
        };
        SkeArenaDropInfoDialog.prototype.showGoodsProperty = function (ev) {
            var a = ev.data;
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        SkeArenaDropInfoDialog.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        SkeArenaDropInfoDialog.prototype.onRemoveGroup = function () {
            this.onRemoveButton();
        };
        SkeArenaDropInfoDialog.prototype.onButtonLow = function () {
            this.towerState = 0;
            this.setInfo();
            this.onRemoveButton();
        };
        SkeArenaDropInfoDialog.prototype.onButtonLowScale = function () {
            this.buttonLow.anchorOffsetX = this.buttonLow.width;
            this.buttonLow.anchorOffsetY = this.buttonLow.height;
            this.buttonLow.scaleX = 1.1;
            this.buttonLow.scaleY = 1.1;
        };
        SkeArenaDropInfoDialog.prototype.onButtonHighScale = function () {
            this.buttonHigh.anchorOffsetX = this.buttonHigh.width / 2;
            this.buttonHigh.anchorOffsetY = this.buttonHigh.height / 2;
            this.buttonHigh.scaleX = 1.1;
            this.buttonHigh.scaleY = 1.1;
        };
        SkeArenaDropInfoDialog.prototype.ontouchend = function () {
            this.onRemoveButton;
        };
        SkeArenaDropInfoDialog.prototype.onRemoveButton = function () {
            this.buttonHigh.scaleX = 1;
            this.buttonHigh.scaleY = 1;
            this.buttonLow.scaleX = 1;
            this.buttonLow.scaleY = 1;
        };
        SkeArenaDropInfoDialog.prototype.onButtonHigh = function () {
            this.towerState = 1;
            this.setInfo();
            this.onRemoveButton();
        };
        SkeArenaDropInfoDialog.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return SkeArenaDropInfoDialog;
    }(zj.Dialog));
    zj.SkeArenaDropInfoDialog = SkeArenaDropInfoDialog;
    __reflect(SkeArenaDropInfoDialog.prototype, "zj.SkeArenaDropInfoDialog");
})(zj || (zj = {}));
//# sourceMappingURL=SkeArenaDropInfoDialog.js.map
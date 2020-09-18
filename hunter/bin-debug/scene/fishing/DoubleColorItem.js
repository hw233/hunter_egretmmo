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
    //DoubleColorItem
    //yuqingchao
    var DoubleColorItem = (function (_super) {
        __extends(DoubleColorItem, _super);
        function DoubleColorItem() {
            var _this = _super.call(this) || this;
            _this.index = null;
            _this.isMy = null;
            _this.enab = null;
            _this.skinName = "resource/skins/fishing/DoubleColorItemSkin.exml";
            zj.cachekeys(zj.UIResource["DoubleColorItem"], null);
            _this.groupDown.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupDown, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            return _this;
        }
        DoubleColorItem.prototype.setInfo = function (index, _father, is_my, enab) {
            this.imgEnd.visible = false;
            this.index = index;
            this.isMy = is_my;
            this.enab = enab;
            this.father = _father;
            var isRed = index == 4 ? 0 : 1;
            this.imgIcon.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_DoubleColor.RedOrBlue2[isRed], this);
            if (this.isMy) {
                this.groupIcon.visible = (!(zj.Game.PlayerDoubleBallSystem.my_id[index] == 0));
                this.imgNode.visible = (zj.Game.PlayerDoubleBallSystem.my_id[index] == 0);
                this.lbNameID.text = zj.Game.PlayerDoubleBallSystem.fruitId(zj.Game.PlayerDoubleBallSystem.my_id[index]).toString();
            }
            else {
                this.groupIcon.visible = true;
                this.lbNameID.text = "?";
                this.imgNode.visible = false;
            }
            // if (enab == true) {
            // 	this.groupDown.touchEnabled = true;
            // } else {
            // 	this.groupDown.touchEnabled = false;
            // }
        };
        DoubleColorItem.prototype.upData = function () {
            if (this.isMy) {
                var _a = zj.Game.PlayerDoubleBallSystem.betReward(zj.Game.PlayerDoubleBallSystem.my_id, zj.Game.PlayerDoubleBallSystem.public_id), ann = _a[0], reward = _a[1];
                var isRight = reward[this.index] && 0 || 1;
                var any = zj.Game.PlayerDoubleBallSystem.my_id[this.index];
                this.imgEnd.visible = zj.Game.PlayerDoubleBallSystem.my_id[this.index] != 0;
                this.imgEnd.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_DoubleColor.RightOrWrong[isRight], this);
            }
            else {
                this.lbNameID.text = zj.Game.PlayerDoubleBallSystem.public_id[this.index].toString();
            }
        };
        DoubleColorItem.prototype.onGroupDown = function () {
            if (this.enab) {
                if (this.father.btnOK.enabled) {
                    this.father.onBtnOk();
                }
            }
        };
        return DoubleColorItem;
    }(eui.ItemRenderer));
    zj.DoubleColorItem = DoubleColorItem;
    __reflect(DoubleColorItem.prototype, "zj.DoubleColorItem");
})(zj || (zj = {}));
//# sourceMappingURL=DoubleColorItem.js.map
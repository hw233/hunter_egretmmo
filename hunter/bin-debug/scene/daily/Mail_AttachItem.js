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
    var Mail_AttachItem = (function (_super) {
        __extends(Mail_AttachItem, _super);
        function Mail_AttachItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/daily/Mail_AttachItemSkin.exml";
            zj.cachekeys(zj.UIResource["Mail_AttachItem"], null);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupAnimate.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            // 徽章遮罩
            _this.rectMask = zj.Util.getMaskImgBlack(50, 50);
            _this.rectMask.horizontalCenter = -1;
            _this.rectMask.verticalCenter = 0;
            _this.groupAnimate.addChild(_this.rectMask);
            _this.rectMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = zj.Util.getMaskImgBlack(50, 50);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = 0;
            _this.groupAnimate.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            return _this;
            // this.groupAll.cacheAsBitmap = true;
        }
        Mail_AttachItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        Mail_AttachItem.prototype.updateView = function (data) {
            var itemSet = zj.PlayerItemSystem.Set(data.goodsId, null, data.count);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(itemSet.Path, this);
            if (data.battleResult == null || data.battleResult == undefined) {
                var strNum = zj.Helper.StringFormat("x%d", data.count);
                this.labelNum.text = strNum;
            }
            else {
                var bWin = (data.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN);
                var strNum = bWin ? "x" + data.count : "-" + data.count;
                var color = bWin ? this.labelNum.textColor : zj.Helper.RGBToHex("r:241,g:34,b:0");
                this.labelNum.text = strNum;
                this.labelNum.textColor = color;
            }
            // 遮罩
            this.imgMask.visible = false;
            this.rectMask.visible = false;
            this.rectMaskCommon.visible = false;
            this.imgIcon.mask = null;
            if (zj.PlayerItemSystem.IsImgMask(data.goodsId)) {
                this.imgMask.visible = true;
                this.imgMask.width = 50;
                this.imgMask.height = 50;
                this.imgIcon.mask = this.imgMask;
            }
            else if (zj.PlayerItemSystem.IsRectMask(data.goodsId)) {
                this.rectMask.visible = true;
                this.rectMask.width = 50;
                this.rectMask.height = 50;
                this.imgIcon.mask = this.rectMask;
            }
            else {
                this.rectMaskCommon.visible = true;
                this.rectMaskCommon.width = 42;
                this.rectMaskCommon.height = 42;
                this.imgIcon.mask = this.rectMaskCommon;
            }
        };
        return Mail_AttachItem;
    }(eui.ItemRenderer));
    zj.Mail_AttachItem = Mail_AttachItem;
    __reflect(Mail_AttachItem.prototype, "zj.Mail_AttachItem");
    var Mail_AttachItemData = (function () {
        function Mail_AttachItemData() {
        }
        return Mail_AttachItemData;
    }());
    zj.Mail_AttachItemData = Mail_AttachItemData;
    __reflect(Mail_AttachItemData.prototype, "zj.Mail_AttachItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Mail_AttachItem.js.map